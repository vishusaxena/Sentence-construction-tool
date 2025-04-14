interface Props {
  sentence: string;
  selectedWords: (string | null)[];
  onBlankClick: (index: number) => void;
}

export default function SentenceCard({ sentence, selectedWords, onBlankClick }: Props) {
  const parts = sentence.split(/___+/g);
  const blanksCount = parts.length - 1;

  return (
    <p className="text-xl font-medium text-gray-800 dark:text-gray-100 flex flex-wrap gap-2 leading-loose">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-2">
          {part}
          {i < blanksCount && (
            <button
              onClick={() => onBlankClick(i)}
              className="inline-block min-w-[5rem] px-2 py-1 text-center bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-white rounded-md border border-indigo-300 dark:border-indigo-500"
            >
              {selectedWords[i] || "______"}
            </button>
          )}
        </span>
      ))}
    </p>
  );
}
