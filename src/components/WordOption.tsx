interface Props {
  word: string;
  onSelect: (word: string) => void;
  disabled: boolean;
}

export default function WordOption({ word, onSelect, disabled }: Props) {
  return (
    <button
      onClick={() => onSelect(word)}
      disabled={disabled}
      className={`px-4 py-2 rounded-xl border font-medium transition shadow-md
        ${disabled
          ? "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
          : "bg-white text-indigo-700 border-indigo-400 hover:bg-indigo-100 dark:bg-gray-800 dark:text-indigo-300 dark:hover:bg-indigo-900 dark:border-indigo-500"
        }`}
    >
      {word}
    </button>
  );
}
