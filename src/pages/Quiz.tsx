import { useEffect, useState } from "react";
import SentenceCard from "../components/SentenceCard";
import WordOption from "../components/WordOption";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";

interface Question {
  questionId: string;
  question: string;
  options: string[];
  correctAnswer: string[];
  userAnswer?: string[];
}

export default function Quiz() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timerResetSignal, setTimerResetSignal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/public/sample.json")
      .then((res) => res.json())
      .then((data) => {
        const formattedQuestions: Question[] = data.data.questions.map((q: any) => ({
          questionId: q.questionId,
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
        }));
        setQuestions(formattedQuestions);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const q = questions[currentIndex];
    if (q && selectedWords.length === q.correctAnswer.length) {
      setShowNext(true);
    } else {
      setShowNext(false);
    }
  }, [selectedWords, questions, currentIndex]);

  const handleWordSelect = (word: string) => {
    const q = questions[currentIndex];
    if (selectedWords.length < q.correctAnswer.length) {
      setSelectedWords([...selectedWords, word]);
      setUsedWords([...usedWords, word]);
    }
  };

  const handleBlankClick = (index: number) => {
    const wordToRemove = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setUsedWords(usedWords.filter((w) => w !== wordToRemove));
  };

  const handleNext = () => {
    questions[currentIndex].userAnswer = [...selectedWords];

    if (currentIndex + 1 === questions.length) {
      navigate("/feedback", { state: { questions } });
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedWords([]);
      setUsedWords([]);
      setTimerResetSignal((prev) => prev + 1); // trigger timer reset
    }
  };

  const handleTimeUp = () => {
    handleNext();
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading questions...</div>;

  const q = questions[currentIndex];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-700">Question {currentIndex + 1}</h2>
        <Timer onTimeUp={handleTimeUp} resetSignal={timerResetSignal} />
      </div>

      <SentenceCard
        sentence={q.question}
        selectedWords={selectedWords}
        onBlankClick={handleBlankClick}
      />

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {q.options.map((opt) => (
          <WordOption
            key={opt}
            word={opt}
            onSelect={handleWordSelect}
            disabled={usedWords.includes(opt)}
          />
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={handleNext}
          disabled={!showNext}
          className={`px-6 py-2 rounded-xl font-semibold shadow-lg transition ${
            showNext
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
