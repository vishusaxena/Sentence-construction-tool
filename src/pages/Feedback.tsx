import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { CheckCircle, XCircle } from "lucide-react";

interface Question {
  questionId: string;
  question: string;
  correctAnswer: string[];
  userAnswer?: string[];
}

export default function Feedback() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const questions: Question[] = state?.questions || [];

  if (!questions.length) {
    return (
      <div className="text-center mt-10">
        <p>No data available. Please take the quiz first.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const getScore = () =>
    questions.reduce((score, q) => {
      const isCorrect = JSON.stringify(q.correctAnswer) === JSON.stringify(q.userAnswer);
      return score + (isCorrect ? 1 : 0);
    }, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
      <Header  />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-300">
          Your Results
        </h1>

        <p className="text-xl text-center mb-8">
          You scored <span className="font-bold">{getScore()}</span> out of{" "}
          <span className="font-bold">{questions.length}</span>
        </p>

        <div className="space-y-6">
          {questions.map((q, index) => {
            const isCorrect = JSON.stringify(q.correctAnswer) === JSON.stringify(q.userAnswer);

            return (
              <div
                key={q.questionId}
                className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 border dark:border-gray-700"
              >
                <h2 className="font-semibold text-lg mb-2">
                  Q{index + 1}: {q.question}
                </h2>

                <div className="flex items-center gap-2 mb-1">
                  {isCorrect ? (
                    <CheckCircle className="text-green-600" size={20} />
                  ) : (
                    <XCircle className="text-red-500" size={20} />
                  )}
                  <p>
                    <span className="font-medium">Your Answer:</span>{" "}
                    {q.userAnswer?.join(" ") || "—"}
                  </p>
                </div>

                {!isCorrect && (
                  <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                    <span className="font-medium">Correct Answer:</span>{" "}
                    {q.correctAnswer.join(" ")}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}
