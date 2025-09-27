import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const normalizeVN = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d");

type UseUniversalSearchOptions<T> = {
  keyword: string;
  fetchAll: () => Promise<T[]>;
  matcher: (item: T, normalizedKeyword: string) => boolean;
  queryKey: (string | number)[];
  staleTimeMs?: number;
};

export function useUniversalSearch<T>({
  keyword,
  fetchAll,
  matcher,
  queryKey,
  staleTimeMs = 5 * 60 * 1000,
}: UseUniversalSearchOptions<T>) {
  const isSearching = keyword.length > 0;

  const { data = [], isLoading, isError } = useQuery<T[]>({
    queryKey,
    queryFn: fetchAll,
    enabled: isSearching,       // chỉ fetch-all khi có từ khóa
    staleTime: staleTimeMs,
  });

  const results = useMemo(() => {
    if (!isSearching) return [];
    const q = normalizeVN(keyword);
    return (data ?? []).filter((item) => matcher(item, q));
  }, [isSearching, keyword, data, matcher]);

  return { isSearching, loadingSearch: isLoading, errorSearch: isError, results };
}
