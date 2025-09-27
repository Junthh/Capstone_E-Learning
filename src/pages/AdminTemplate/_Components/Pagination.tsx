import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pages = useMemo(() => {
    const p: Array<number | string> = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) p.push(i);
      return p;
    }
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);

    p.push(1);
    if (left > 2) p.push("...");
    for (let i = left; i <= right; i++) p.push(i);
    if (right < totalPages - 1) p.push("...");
    p.push(totalPages);
    return p;
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center justify-center gap-1 mt-4" role="navigation" aria-label="Pagination">
      {/* Prev */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`p-2 border rounded ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-50 cursor-pointer"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page, idx) =>
        page === "..." ? (
          <span key={`dots-${idx}`} className="px-3 py-1 select-none">
            ...
          </span>
        ) : (
          <button
            type="button"
            key={`page-${page}`}
            onClick={() => onPageChange(page as number)}
            aria-current={currentPage === page ? "page" : undefined}
            className={
              currentPage === page
                ? "flex items-center text-sm font-normal rounded-lg cursor-pointer px-3 py-2 shadow-sm hover:shadow-md relative bg-gradient-to-b from-stone-700 to-stone-800 border border-stone-900 text-stone-50 hover:bg-gradient-to-b hover:from-stone-800 hover:to-stone-800 hover:border-stone-900 after:absolute after:inset-0 after:rounded-[inherit] after:box-shadow after:shadow-[inset_0_1px_0px_rgba(255,255,255,0.25),inset_0_-2px_0px_rgba(0,0,0,0.35)] after:pointer-events-none duration-300 ease-in align-middle select-none font-sans text-center antialiased"
                : "px-3 py-1 border rounded hover:bg-gray-50 cursor-pointer"
            }
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`p-2 border rounded ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-50 cursor-pointer"
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
