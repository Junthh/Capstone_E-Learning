import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import styles from "./SearchBar.module.css"; // 👈 import css riêng

type Props = {
  onDebouncedChange: (value: string) => void;
  placeholder?: string;
  delay?: number;
  className?: string;
  defaultValue?: string;
};

function SearchBar({
  onDebouncedChange,
  placeholder = "Tìm kiếm...",
  delay = 300,
  className = "",
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const t = setTimeout(() => onDebouncedChange(value.trim()), delay);
    return () => clearTimeout(t);
  }, [value, delay, onDebouncedChange]);

  return (
    <div className={`${styles.searchBox} ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`${styles.searchInput}`}
      />
      <svg
        className={`${styles.searchIcon}`}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
      </svg>
    </div>
  );
}

export default SearchBar;
