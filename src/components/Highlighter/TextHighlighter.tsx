import { Box } from "@mui/material";
import styles from "./TextHighlighter.module.scss";

interface Props {
  text: string;
  searchQuery: string;
}

const TextHighlighter = ({ text, searchQuery }: Props) => {
  const keywords = searchQuery
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (keywords.length === 0) return <>{text}</>;

  const escapedKeywords = keywords.map((word) =>
    word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  const regex = new RegExp(`(${escapedKeywords.join("|")})`, "gi");

  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        keywords.includes(part.toLowerCase()) ? (
          <Box key={index} component="span" className={styles.highlight}>
            {part}
          </Box>
        ) : (
          part
        )
      )}
    </>
  );
};

export default TextHighlighter;
