// UserManagement.tsx (CourseManagement) — FIXED PAGINATION
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCourse from "./AddCourse/AddCourse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageSize from "../_Components/PageSize";
import Pagination from "../_Components/Pagination";
import type { pageResult } from "@/interfaces/pageResult.interface";
import { toast } from "sonner";
import type { Course } from "@/interfaces/course.interface";
import {
  deleteCourseApi,
  getCourseListApi,
  getCoursePageSizeApi,
} from "@/services/course.api";
import { useAuthStore } from "@/store/auth.store";
import SearchBar from "@/pages/AdminTemplate/_Components/SearchBar";
import {
  useUniversalSearch,
  normalizeVN,
} from "@/pages/AdminTemplate/_Components/useUniversalSearch";
import EditCourse from "./EditCourse/EditCourse";
import RegisterCourseForUser from "./RegisterCourseForUser/RegisterCoureForUser";
import styles from "../CourseManagement/CourseManagement.module.css";
import { UserPlus, Pencil, Trash2 } from "lucide-react";

export default function CourseManagement() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingCourse, setEditingCourse] = useState<string | null>(null);
  const [openRegister, setOpenRegister] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>(
    undefined
  );

  const currentUser = useAuthStore((s) => s.user);
  const taiKhoanDangNhap = currentUser?.taiKhoan ?? "";

  const queryClient = useQueryClient();

  // 🔄 GỘP LÀM MỚI DỮ LIỆU (phân trang + search)
  const refreshCourses = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["manager-course"],
      exact: false,
    });
    await queryClient.invalidateQueries({
      queryKey: ["all-courses"],
      exact: false,
    });
    // ép refetch ngay các query active (đặc biệt all-courses khi đang search)
    await queryClient.refetchQueries({
      queryKey: ["all-courses"],
      exact: false,
      type: "active",
    });
  };

  // List Course
  const { data, isLoading, isError } = useQuery<pageResult<Course>>({
    queryKey: ["manager-course", page, pageSize],
    queryFn: () => getCoursePageSizeApi(page, pageSize),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  // Search ALL
  const { isSearching, loadingSearch, errorSearch, results } =
    useUniversalSearch<Course>({
      keyword: searchTerm,
      fetchAll: getCourseListApi,
      queryKey: ["all-courses"],
      matcher: (c, q) => {
        const fields = [c.maKhoaHoc, c.tenKhoaHoc].map((x) =>
          normalizeVN(String(x ?? ""))
        );
        return fields.some((f) => f.includes(q));
      },
    });

  useEffect(() => {
    setPage(1);
  }, [isSearching, searchTerm]);

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  const paged: Course[] = isSearching ? results : items;

  const loading = isSearching ? loadingSearch : isLoading;
  const hasError = isSearching ? errorSearch : isError;

  const getStt = (idx: number) =>
    isSearching ? idx + 1 : (page - 1) * pageSize + idx + 1;

  const { mutate: deteleCourse } = useMutation({
    mutationFn: (maKhoaHoc: string) => deleteCourseApi(maKhoaHoc),
    onSuccess: async () => {
      toast.success("Đã xoá khóa học thành công!");
      await refreshCourses();
    },
    onError: (err: any) => {
      const d = err?.response?.data;
      const msg =
        (typeof d === "string" ? d : d?.content || d?.message) ||
        err?.message ||
        "Xoá thất bại. Vui lòng thử lại!";
      toast.error(String(msg));
    },
    onSettled: () => setDeletingId(null),
  });

  // Xóa khóa học
  const handleDeleteCourse = async (maKhoaHoc: string) => {
    const ok = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (!ok) return;
    setDeletingId(maKhoaHoc);
    deteleCourse(maKhoaHoc);
  };

  // Sửa khóa học
  const handleEditCourse = (maKhoaHoc: string) => {
    setEditingCourse(maKhoaHoc);
    setOpenEdit(true);
  };

  // Ghi danh khóa học cho user đang đăng nhập
  const handleRegisterCourseForUser = (maKhoaHoc: string) => {
    if (!taiKhoanDangNhap) {
      toast.error("Bạn cần đăng nhập để ghi danh.");
      return;
    }
    setSelectedCourseId(maKhoaHoc);
    setOpenRegister(true);
  };

  return (
    <div className={`${styles.courseWrap} space-y-5 text-left`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className={`${styles.infor} text-xl font-semibold text-gray-800`}>
          Quản lý khóa học
        </h2>

        <div className={`${styles.toolbar} flex items-center gap-3`}>
          {!isSearching && (
            <div className={styles.pageSizeBox}>
              <PageSize
                pageSize={pageSize}
                setPageSize={(v: any) => {
                  setPageSize(v);
                  setPage(1);
                }}
              />
            </div>
          )}

          <div className={styles.searchBox}>
            <SearchBar
              placeholder="Tìm kiếm khóa học"
              onDebouncedChange={setSearchTerm}
            />
          </div>

          {/* Thêm khóa học */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setOpen(true)}
                className={`${styles.addBtn} h-12 px-6 text-lg cursor-pointer`}
              >
                Thêm khóa học
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Thêm khóa học</DialogTitle>
              </DialogHeader>
              <AddCourse
                taiKhoanNguoiTao={taiKhoanDangNhap}
                onSuccess={async () => {
                  setOpen(false);
                  await refreshCourses();
                }}
                onCancel={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>

          {/* Sửa khóa học */}
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent className="sm:max-w-[860px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Sửa khóa học</DialogTitle>
              </DialogHeader>
              {editingCourse && (
                <EditCourse
                  maKhoaHoc={editingCourse}
                  onSuccess={async () => {
                    setOpenEdit(false);
                    await refreshCourses();
                  }}
                  onCancel={() => setOpenEdit(false)}
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Ghi danh khóa học cho user */}
          <Dialog open={openRegister} onOpenChange={setOpenRegister}>
            <DialogContent className="sm:max-w-[820px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Ghi danh khoá học</DialogTitle>
              </DialogHeader>

              {taiKhoanDangNhap && selectedCourseId && (
                <RegisterCourseForUser
                  maKhoaHoc={selectedCourseId}
                  onSuccess={() => setOpenRegister(false)}
                  onCancel={() => setOpenRegister(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className={`${styles.courseCard} ${styles.courseWrap}`}>
        <Table
          className={`${styles.courseTable} ${styles.compact} table-fixed w-full text-gray-700 text-lg`}
        >
          <TableHeader className="bg-gray-50 text-gray-600">
            <TableRow className="divide-x divide-gray-300">
              <TableHead className="px-4 py-3 w-[7%] text-center text-lg">
                STT
              </TableHead>
              <TableHead className="px-4 py-3 w-[15%] text-center text-lg">
                Mã khóa học
              </TableHead>
              <TableHead className="px-4 py-3 w-[18%] text-center text-lg">
                Tên khóa
              </TableHead>
              <TableHead className="px-4 py-3 w-[14%] text-center text-lg">
                Hình ảnh
              </TableHead>
              <TableHead className="px-4 py-3 w-[11%] text-center text-lg">
                Lượt xem
              </TableHead>
              <TableHead className="px-4 py-3 w-[13%] text-center text-lg">
                Người tạo
              </TableHead>
              <TableHead className="px-4 py-3 w-[22%] text-center text-lg">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading && (
              <TableRow>
                <TableCell className="py-6 text-center" colSpan={7}>
                  Đang tải...
                </TableCell>
              </TableRow>
            )}

            {!loading && !hasError && paged.length === 0 && (
              <TableRow>
                <TableCell className="py-6 text-center" colSpan={7}>
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              !hasError &&
              paged.map((u, idx) => (
                <TableRow
                  key={`${u.maKhoaHoc}-${idx}`}
                  className="divide-x divide-gray-300"
                >
                  <TableCell className={`px-4 py-3 text-center text-lg`}>
                    {getStt(idx)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-lg break-words">
                    {u.maKhoaHoc}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-lg">
                    {u.tenKhoaHoc}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-lg">
                    <div className="flex justify-center">
                      <img
                        src={u.hinhAnh}
                        className={`${styles.imgCell} h-14 w-14 rounded-md border object-cover`}
                        loading="lazy"
                        alt={u.tenKhoaHoc}
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-lg break-words">
                    {u.luotXem}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-lg">
                    {u?.nguoiTao?.hoTen ?? "-"}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-lg">
                    <div
                      className={`${styles.actions} flex flex-wrap items-center justify-center gap-2 text-lg`}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className={`${styles.iconAction} text-lg bg-green-600 text-white hover:bg-green-700 hover:text-white cursor-pointer`}
                        onClick={() => handleRegisterCourseForUser(u.maKhoaHoc)}
                      >
                        <span className="hidden sm:inline">Ghi Danh</span>
                        <UserPlus className="block sm:hidden w-4 h-4" />
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className={`${styles.iconAction} text-lg bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer`}
                        onClick={() => handleEditCourse(u.maKhoaHoc)}
                      >
                        <span className="hidden sm:inline">Sửa</span>
                        <Pencil className="block sm:hidden w-4 h-4" />
                      </Button>

                      <Button
                        size="lg"
                        variant="outline"
                        className={`${styles.iconAction} text-lg bg-red-600 text-white hover:bg-red-700 hover:text-white cursor-pointer`}
                        onClick={() => handleDeleteCourse(u.maKhoaHoc)}
                      >
                        <span className="hidden sm:inline">
                          {deletingId === u.maKhoaHoc ? "Đang xoá..." : "Xoá"}
                        </span>
                        <Trash2 className="block sm:hidden w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      {!isSearching && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
