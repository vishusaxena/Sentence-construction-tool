interface Props {
  sentence: string;
  selectedWords: string[];
  onBlankClick: (index: number) => void;
}

export default function SentenceCard({ sentence, selectedWords, onBlankClick }: Props) {
  const parts = sentence.split(/___+/g); // match 1 or more underscores
  const blanksCount = parts.length - 1;

  return (
    <p className="text-xl font-medium text-gray-800 flex flex-wrap gap-2">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < blanksCount && (
            <button
              onClick={() => onBlankClick(i)}
              className="underline text-indigo-600 font-semibold mx-1 min-w-[4rem] text-center"
            >
              {selectedWords[i] || "______"}
            </button>
          )}
        </span>
      ))}
    </p>
  );
}
