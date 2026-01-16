import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./SearchInput.module.scss";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <TextField
      fullWidth
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.searchInput}
      sx={{
        maxWidth: "600px",
        backgroundColor: "#fff",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#eaeaea",
          },
          "&:hover fieldset": {
            borderColor: "#ccc",
          },
        },
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.05)",
        borderRadius: "5px",
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className={styles.searchIcon} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchInput;
