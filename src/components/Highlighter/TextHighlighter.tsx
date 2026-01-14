interface Props {
  text: string;
  searchQuery: string;
}

const TextHighlighter = ({ text, searchQuery }: Props) => {
  if (!searchQuery.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(`(${searchQuery})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      )}
    </>
  );
};

export default TextHighlighter;
