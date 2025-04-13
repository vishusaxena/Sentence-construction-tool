import { useLocation, useNavigate } from "react-router-dom";

interface Question {
  questionId: string;
  question: string;
  correctAnswer: string[];
  userAnswer?: string[];
}

export default function Feedback() {
  const location = useLocation();
  const navigate = useNavigate();
  const questions: Question[] = location.state?.questions || [];

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
      const isCorrect =
        JSON.stringify(q.correctAnswer) === JSON.stringify(q.userAnswer);
      return score + (isCorrect ? 1 : 0);
    }, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        🎉 Your Results
      </h1>

      <p className="text-xl text-center mb-8">
        You scored <span className="font-bold">{getScore()}</span> out of{" "}
        <span className="font-bold">{questions.length}</span>
      </p>

      <div className="space-y-6">
        {questions.map((q, index) => {
          const isCorrect =
            JSON.stringify(q.correctAnswer) === JSON.stringify(q.userAnswer);

          return (
            <div key={q.questionId} className="bg-white rounded-xl shadow-md p-4">
              <h2 className="font-semibold text-lg mb-2">
                Q{index + 1}: {q.question}
              </h2>

              <p className="mb-1">
                <span className="font-medium">Your Answer:</span>{" "}
                {q.userAnswer?.join(" ") || "—"} {isCorrect ? "✅" : "❌"}
              </p>

              {!isCorrect && (
                <p>
                  <span className="font-medium text-green-700">Correct Answer:</span>{" "}
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
  );
}
