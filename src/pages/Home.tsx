import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-100 to-purple-200 p-4">
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-700">
          🧠 Sentence Construction Tool
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Test your grammar skills by completing the sentences with the correct words. Ready to play?
        </p>
        <button
          onClick={handleStart}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-indigo-700 transition-all duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
