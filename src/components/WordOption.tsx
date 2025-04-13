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
      className={`px-4 py-2 bg-white border border-indigo-400 rounded-xl shadow-md m-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-indigo-100"
      }`}
    >
      {word}
    </button>
  );
}
