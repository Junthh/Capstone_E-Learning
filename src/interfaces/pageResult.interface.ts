export interface pageResult<T> {
    currentPage: number;
    count: number;
    totalPages: number;
    totalCount: number;
    items: T[];
}
