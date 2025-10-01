import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo } from "react";
import styles from "../UserMangement/UserManagement.module.css"

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
<div
  className={`${styles.pagination} flex items-center justify-center gap-1 mt-4`}
  role="navigation"
  aria-label="Pagination"
>
  {/* Prev */}
  <button
    type="button"
    onClick={handlePrev}
    disabled={currentPage === 1}
    aria-label="Previous page"
    className={`${styles.pageBtn} ${currentPage === 1 ? styles.disabled : ""}`}
  >
    <ChevronLeft className="w-4 h-4" />
  </button>

  {pages.map((page, idx) =>
    page === "..." ? (
      <span key={`dots-${idx}`} className={styles.dots}>
        ...
      </span>
    ) : (
      <button
        type="button"
        key={`page-${page}`}
        onClick={() => onPageChange(page as number)}
        aria-current={currentPage === page ? "page" : undefined}
        className={`${styles.pageBtn} ${
          currentPage === page ? styles.active : ""
        }`}
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
    className={`${styles.pageBtn} ${
      currentPage === totalPages ? styles.disabled : ""
    }`}
  >
    <ChevronRight className="w-4 h-4" />
  </button>
</div>

  );
}
