import { useNavigate } from "react-router-dom";
import { FaCoins } from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-4">
      <div className="text-center w-full max-w-2xl">
        {/* Icon */}
        <div className="text-4xl mb-6 text-gray-600 dark:text-gray-300">
          <span className="inline-block pb-2">
            &#9776;&nbsp;<span className="text-xl align-middle">&#9998;</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Sentence Construction
        </h1>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-300 max-w-xl mx-auto mb-12 text-base">
          Select the correct words to complete the sentence by arranging
          the provided options in the right order.
        </p>

        {/* Stats */}
        <div className="flex justify-center gap-8 text-center text-gray-700 dark:text-gray-200 mb-10">
          <div>
            <p className="font-semibold">Time Per Question</p>
            <p className="text-sm mt-1">30 sec</p>
          </div>
          <div>
            <p className="font-semibold">Total Questions</p>
            <p className="text-sm mt-1">10</p>
          </div>
          <div>
            <p className="font-semibold">Coins</p>
            <p className="flex items-center justify-center text-sm mt-1">
              <FaCoins className="text-yellow-400 mr-1" /> 0
            </p>
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={() => navigate("/quiz")}
          className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition"
        >
          Start
        </button>
      </div>
    </div>
  );
}
