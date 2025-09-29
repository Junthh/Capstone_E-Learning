import { useMemo, useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "../../_Components/Pagination";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getCourseListApi,
  getUserEnrolledCoursesApi,
  getUserPendingCoursesApi,
  registerSCourseApi,
  unregisterCourseApi,
} from "@/services/course.api";
import type {
  Course,
  RegisterCourseRequest,
  SimpleCourse,
  UnregisterCourseRequest,
} from "@/interfaces/course.interface";
import { toast } from "sonner";

type Props = {
  taiKhoan: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function RegisterCourse({ taiKhoan, onSuccess }: Props) {
  const [selected, setSelected] = useState<string>("");
  const [pending, _setPending] = useState<{ id: string; name: string }[]>([]);

  const {
    data: courses = [],
    isLoading: loadingCourses,
    isError: errorCourses,
    refetch: refetchCourses,
  } = useQuery({
    queryKey: ["course-list"],
    queryFn: async () => {
      const res = await getCourseListApi();
      return (res ?? []) as Course[];
    },
  });

  const {
    data: enrollCourse = [],
    isLoading: loadingEnrolled,
    isError: errorEnrolled,
    refetch: refetchEnrolled,
  } = useQuery<SimpleCourse[]>({
    queryKey: ["enroll-course", taiKhoan],
    queryFn: () => getUserEnrolledCoursesApi(taiKhoan),
  });

  // Chờ ghi danh
  const {
    data: pendingCourse = [],
    isLoading: loadingPending,
    isError: errorPending,
    refetch: refetchPending,
  } = useQuery<SimpleCourse[]>({
    queryKey: ["pending-course", taiKhoan],
    queryFn: () => getUserPendingCoursesApi(taiKhoan),
  });

  // Hủy đăng ký khóa học
  const { mutate: unregisterCourse, isPending: isUnregistering } = useMutation({
    mutationKey: ["unenroll-course"],
    mutationFn: (payload: UnregisterCourseRequest) =>
      unregisterCourseApi(payload),
    onSuccess: () => {
      toast.success("Hủy ghi danh thành công ✅");
      onSuccess?.();
    },
    onError: (err) => {
      toast.error(err.message || "Hủy ghi danh thất bại");
      console.error(err);
    },
  });

  const enrolled = useMemo(
    () =>
      (enrollCourse ?? []).map((c) => ({
        id: c.maKhoaHoc,
        name: c.tenKhoaHoc,
      })),
    [enrollCourse]
  );

  const pendingList = useMemo(
    () =>
      (pendingCourse ?? []).map((c) => ({
        id: c.maKhoaHoc,
        name: c.tenKhoaHoc,
      })),
    [pendingCourse]
  );

  const [page, setPage] = useState(1);
  const pageSize = 2;
  const totalPages = Math.ceil(enrolled.length / pageSize) || 1;
  const pagedEnrolled = useMemo(() => {
    const start = (page - 1) * pageSize;
    return enrolled.slice(start, start + pageSize);
  }, [enrolled, page]);

  // Pending
  const [pagePending, setPagePending] = useState(1);
  const totalPagesPending = Math.ceil(pendingList.length / pageSize) || 1;
  const pagedPending = useMemo(() => {
    const start = (pagePending - 1) * pageSize;
    return pendingList.slice(start, start + pageSize);
  }, [pendingList, pagePending]);

  // ✅ Mutation ghi danh
  const { mutate: enroll, isPending: enrolling } = useMutation({
    mutationFn: (payload: RegisterCourseRequest) => registerSCourseApi(payload),
    onSuccess: () => {
      toast.success("Ghi danh thành công ✅");
      onSuccess?.();
    },
    onError: (err: any) => {
      console.error(err);
      toast.error("Ghi danh thất bại ❌");
    },
  });

  const handleEnroll = () => {
    if (!selected) return;
    if (
      pending.some((x) => x.id === selected) ||
      enrolled.some((x) => x.id === selected)
    ) {
      toast.info("Khoá học đã có trong danh sách.");
      return;
    }
    enroll({ maKhoaHoc: selected, taiKhoan });
  };

  const handleConfirmCourse = (courseId: string) => {
    enroll({maKhoaHoc: courseId, taiKhoan})
  }

  const handleUnenroll = (courseId: string) => {
    unregisterCourse({ maKhoaHoc: courseId, taiKhoan });
  };

  return (
    <div className="space-y-4 text-lg">
      {/* chọn khóa học */}
      <div className="flex items-center gap-2">
        <Select
          value={selected}
          onValueChange={setSelected}
          disabled={loadingCourses || errorCourses || enrolling}
        >
          <SelectTrigger className="w-[260px] h-11 text-lg">
            <SelectValue
              placeholder={loadingCourses ? "Đang tải..." : "Chọn khóa học"}
            />
          </SelectTrigger>
          <SelectContent>
            {loadingCourses && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Đang tải danh sách…
              </div>
            )}
            {errorCourses && (
              <div className="px-3 py-2 text-sm text-red-600">
                Lỗi tải khóa học.{" "}
                <button className="underline" onClick={() => refetchCourses()}>
                  Thử lại
                </button>
              </div>
            )}

            {!loadingCourses && !errorCourses && courses.length === 0 && (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                Chưa có khóa học
              </div>
            )}
            {!loadingCourses &&
              !errorCourses &&
              courses
                .filter((c) => c?.maKhoaHoc && c.maKhoaHoc.trim() !== "")
                .map((c) => (
                  <SelectItem
                    key={c.maKhoaHoc}
                    value={c.maKhoaHoc}
                    className="text-lg"
                  >
                    {c.tenKhoaHoc}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        <Button
          onClick={handleEnroll}
          className="h-11 px-5 bg-black text-white text-lg"
          disabled={loadingCourses || errorCourses || enrolling}
        >
          {enrolling ? "Đang ghi danh..." : "Ghi danh"}
        </Button>
      </div>

      {/* Khóa học chờ xác thực */}
      <div className="border rounded-md">
        <div className="border-b px-4 py-2 font-semibold">
          Khóa học chờ xác thực
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">STT</TableHead>
              <TableHead>Tên khóa học</TableHead>
              <TableHead className="w-[160px] text-center">
                Trạng thái
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingPending ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Đang tải…
                </TableCell>
              </TableRow>
            ) : errorPending ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Lỗi tải danh sách.{" "}
                  <button
                    className="underline"
                    onClick={() => void refetchPending()}
                  >
                    Thử lại
                  </button>
                </TableCell>
              </TableRow>
            ) : (pagedPending ?? []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  —
                </TableCell>
              </TableRow>
            ) : (
              (pagedPending ?? []).map((c, i) => (
                <TableRow key={c.id}>
                  <TableCell className="text-center">
                    {(pagePending - 1) * pageSize + i + 1}
                  </TableCell>
                  <TableCell className="break-words">{c.name}</TableCell>
                  <TableCell className="text-center text-gray-600">
                    <div className="flex items-center justify-center gap-2 text-lg">
                      <Button
                        onClick={() => handleConfirmCourse(c.id)}
                        variant="destructive"
                        size="sm"
                        className="text-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:text-white cursor-pointer"
                        disabled={loadingCourses || errorCourses || enrolling}
                      >
                        {enrolling ? "Đang xác thực..." : "Xác thực"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="text-lg px-4 py-2 cursor-pointer"
                        disabled={isUnregistering}
                        onClick={() => handleUnenroll(c.id)}
                      >
                        {isUnregistering ? "Đang xóa…" : "Xóa"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination riêng cho pending */}
        
      </div>
      <div className="p-3">
          <Pagination
            currentPage={pagePending}
            totalPages={totalPagesPending}
            onPageChange={setPagePending}
          />
        </div>

      {/* Khóa học đã ghi danh */}
      <div className="border rounded-md">
        <div className="border-b px-4 py-2 font-semibold">
          Khóa học đã ghi danh
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">STT</TableHead>
              <TableHead>Tên khóa học</TableHead>
              <TableHead className="w-[160px] text-center">
                Chờ xác nhận
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingEnrolled ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Đang tải…
                </TableCell>
              </TableRow>
            ) : errorEnrolled ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  Lỗi tải danh sách.{" "}
                  <button
                    className="underline"
                    onClick={() => void refetchEnrolled()}
                  >
                    Thử lại
                  </button>
                </TableCell>
              </TableRow>
            ) : (pagedEnrolled ?? []).length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-4">
                  —
                </TableCell>
              </TableRow>
            ) : (
              (pagedEnrolled ?? []).map((c, i) => (
                <TableRow key={c.id}>
                  <TableCell className="text-center">
                    {(page - 1) * pageSize + i + 1}
                  </TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="text-lg px-4 py-2 cursor-pointer"
                      disabled={isUnregistering}
                      onClick={() => handleUnenroll(c.id)} // ✅ truyền đúng id
                    >
                      {isUnregistering ? "Đang xóa…" : "Xóa"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
