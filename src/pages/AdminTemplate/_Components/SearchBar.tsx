import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

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
  className = "relative w-96",
  defaultValue = "",
}: Props) {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    const t = setTimeout(() => onDebouncedChange(value.trim()), delay);
    return () => clearTimeout(t);
  }, [value, delay, onDebouncedChange]);

  return (
    <div className={className}>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-lg"
      />
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
