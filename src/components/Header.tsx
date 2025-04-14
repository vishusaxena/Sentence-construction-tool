// components/Header.tsx

interface Props {
  title?: string;
}

export default function Header({ title = "Sentence Construction Tool" }: Props) {
  return (
    <header className="mb-6 text-center w-full max-w-4xl mx-auto px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-indigo-400">
        {title}
      </h1>
    </header>
  );
}
