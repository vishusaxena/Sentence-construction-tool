import { useEffect, useState } from "react";
import SentenceCard from "../components/SentenceCard";
import WordOption from "../components/WordOption";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";



interface Question {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: string[];
  userAnswer?: (string | null)[];
}

const LOCAL_STORAGE_KEY = "quizState";

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<(string | null)[]>([]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timerResetSignal, setTimerResetSignal] = useState(0);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      setQuestions(parsed.questions);
      setCurrentIndex(parsed.currentIndex);
      setSelectedWords(parsed.selectedWords);
      setUsedWords(parsed.usedWords);
      setLoading(false);
    } else {
      fetch("/public/sample.json")
        .then((res) => res.json())
        .then((data) => {
          const formattedQuestions: Question[] = data.data.questions.map((q: any) => ({
            questionId: q.questionId,
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            userAnswer: Array(q.correctAnswer.length).fill(null),
          }));
          setQuestions(formattedQuestions);
          setSelectedWords(Array(formattedQuestions[0].correctAnswer.length).fill(null));
          setUsedWords([]);
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ questions, currentIndex, selectedWords, usedWords })
      );
    }
  }, [questions, currentIndex, selectedWords, usedWords, loading]);

  useEffect(() => {
    const q = questions[currentIndex];
    setShowNext(q && selectedWords.every((w) => w !== null));
  }, [selectedWords, questions, currentIndex]);

  const handleWordSelect = (word: string) => {
    const emptyIndex = selectedWords.findIndex((w) => w === null);
    if (emptyIndex === -1) return;

    const newSelected = [...selectedWords];
    newSelected[emptyIndex] = word;
    setSelectedWords(newSelected);
    setUsedWords([...usedWords, word]);
  };

  const handleBlankClick = (index: number) => {
    const wordToRemove = selectedWords[index];
    if (!wordToRemove) return;

    const newSelected = [...selectedWords];
    newSelected[index] = null;
    setSelectedWords(newSelected);
    setUsedWords(usedWords.filter((w) => w !== wordToRemove));
  };

  const handleNext = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].userAnswer = [...selectedWords];

    if (currentIndex + 1 === questions.length) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      navigate("/feedback", { state: { questions: updatedQuestions } });
    } else {
      const nextQ = updatedQuestions[currentIndex + 1];
      setQuestions(updatedQuestions);
      setCurrentIndex(currentIndex + 1);
      setSelectedWords(nextQ.userAnswer ?? Array(nextQ.correctAnswer.length).fill(null));
      setUsedWords((nextQ.userAnswer ?? []).filter((w): w is string => w !== null));
      setTimerResetSignal((prev) => prev + 1);
    }
  };

  const handleTimeUp = () => handleNext();

  const confirmQuit = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].userAnswer = [...selectedWords];
    const score = updatedQuestions.reduce((acc, q) => {
      const correct = q.correctAnswer.join(" ");
      const user = q.userAnswer?.join(" ") || "";
      return acc + (correct === user ? 1 : 0);
    }, 0);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    navigate("/feedback", { state: { questions: updatedQuestions, score } });
  };

  if (loading)
    return <div className="text-center mt-10 text-xl text-gray-800 dark:text-gray-200">Loading questions...</div>;

  const q = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4 py-6">
      <Header  />
      <div className="max-w-3xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Question {currentIndex + 1}</h2>
          <Timer onTimeUp={handleTimeUp} resetSignal={timerResetSignal} />
        </div>

        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border dark:border-gray-700 mb-6">
          <SentenceCard sentence={q.question} selectedWords={selectedWords} onBlankClick={handleBlankClick} />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {q.options.map((opt) => (
            <WordOption key={opt} word={opt} onSelect={handleWordSelect} disabled={usedWords.includes(opt)} />
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowQuitModal(true)}
            className="px-6 py-2 rounded-xl font-semibold bg-red-100 text-red-600 border border-red-300 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-500 dark:hover:bg-red-800 transition"
          >
            Quit
          </button>

          <button
            onClick={handleNext}
            disabled={!showNext}
            className={`px-6 py-2 rounded-xl font-semibold shadow-lg transition ${
              showNext
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>

       {showQuitModal && (
  <div className="fixed inset-0 backdrop-blur-sm bg-transparent flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
      <h3 className="text-lg font-semibold mb-4">Do you want to quit?</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Your current progress will be submitted.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setShowQuitModal(false)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          onClick={confirmQuit}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Confirm Quit
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
