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
import { registerSCourseApi, unregisterCourseApi } from "@/services/course.api";
import type {
  RegisterCourseRequest,
  UnregisterCourseRequest,
} from "@/interfaces/course.interface";
import { toast } from "sonner";
import {
  getAllUserApiForCourse,
  getPendingUserApi,
  getUserOfCourseApi,
} from "@/services/user.api";
import type { pendingUser, User } from "@/interfaces/user.interface";
import styles from "./RegisterCoureForUser.module.css";

type Props = {
  maKhoaHoc: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function RegisterCourseForUser({ maKhoaHoc, onSuccess }: Props) {
  const [selected, setSelected] = useState<string>("");
  const [pending, _setPending] = useState<{ id: string; name: string }[]>([]);

  console.log("mkh", maKhoaHoc);

  const {
    data: Users = [],
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useQuery<User[]>({
    queryKey: ["user-list"],
    queryFn: getAllUserApiForCourse,
  });

  console.log("user", Users);

  // tài khoản ghi danh trong khóa học
  const {
    data: enrollUser = [],
    isLoading: loadingUser,
    isError: errorUser,
    refetch: refetchEnrolled,
  } = useQuery<pendingUser[]>({
    queryKey: ["enroll-user", maKhoaHoc],
    queryFn: () => getUserOfCourseApi(maKhoaHoc),
  });

  // Chờ ghi danh
  const {
    data: pendingUser = [],
    isLoading: loadingPending,
    isError: errorPending,
    refetch: refetchPending,
  } = useQuery<pendingUser[]>({
    queryKey: ["pending-user", maKhoaHoc],
    queryFn: () => getPendingUserApi(maKhoaHoc),
  });

  console.log("pending", pendingUser);

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
      (enrollUser ?? []).map((c) => ({
        id: c.taiKhoan,
        name: c.hoTen,
      })),
    [enrollUser]
  );

  const pendingList = useMemo(
    () =>
      (pendingUser ?? []).map((c) => ({
        id: c.taiKhoan,
        name: c.hoTen,
      })),
    [pendingUser]
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

  const handleEnrollForUser = () => {
    if (!selected) return;
    if (
      pending.some((x) => x.id === selected) ||
      enrolled.some((x) => x.id === selected)
    ) {
      toast.info("Tài khoản đã có trong danh sách.");
      return;
    }
    enroll({ taiKhoan: selected, maKhoaHoc });
  };

  const handleConfirmCourse = (taiKhoan: string) => {
    enroll({ taiKhoan: taiKhoan, maKhoaHoc });
  };

  const handleUnenroll = (taiKhoan: string) => {
    unregisterCourse({ taiKhoan: taiKhoan, maKhoaHoc });
  };

  return (
<div className={`space-y-4 text-lg ${styles.dialogWrap}`}>
  {/* chọn tài khoản */}
  <div className={`${styles.formRow} flex items-center gap-2`}>
    <Select
      value={selected}
      onValueChange={(v) => setSelected(v)}
      disabled={loadingUsers || enrolling}
    >
      <SelectTrigger className={`w-[260px] h-11 text-lg ${styles.selectBox}`}>
        <SelectValue placeholder="Chọn tài khoản" />
      </SelectTrigger>
      <SelectContent>
        {!loadingUsers &&
          !errorUsers &&
          Users.filter((u) => u?.taiKhoan?.trim()).map((u) => (
            <SelectItem
              key={u.taiKhoan}
              value={u.taiKhoan}
              className={`text-lg ${styles.selectItem}`}
            >
              {u.hoTen} ({u.taiKhoan})
            </SelectItem>
          ))}
      </SelectContent>
    </Select>

    <Button
      onClick={handleEnrollForUser}
      className={`h-11 px-5 bg-black text-white text-lg ${styles.submitBtn}`}
      disabled={loadingUsers || !!errorUsers || enrolling}
    >
      {enrolling ? "Đang ghi danh..." : "Ghi danh"}
    </Button>
  </div>

  {/* Học viên chờ xác thực */}
  <div className={`border rounded-md ${styles.sectionCard}`}>
    <div className={`border-b px-4 py-2 font-semibold ${styles.sectionTitle}`}>
      Học viên chờ xác thực
    </div>

    <div className={styles.tableWrap}>
      <Table className={`${styles.rcfTable} ${styles.compact}`}>
        <TableHeader>
          <TableRow>
            <TableHead className={`text-center ${styles.colSTT}`}>STT</TableHead>
            <TableHead className={styles.colAccount}>Tài khoản</TableHead>
            <TableHead className={styles.colName}>Học viên</TableHead>
            <TableHead className={`text-center ${styles.colStatus}`}>
              Trạng thái
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loadingPending ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Đang tải…
              </TableCell>
            </TableRow>
          ) : errorPending ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Lỗi tải danh sách.{" "}
                <button className="underline" onClick={() => void refetchPending()}>
                  Thử lại
                </button>
              </TableCell>
            </TableRow>
          ) : (pagedPending ?? []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                —
              </TableCell>
            </TableRow>
          ) : (
            (pagedPending ?? []).map((c, i) => (
              <TableRow key={c.id}>
                <TableCell className="text-center">
                  {(pagePending - 1) * pageSize + i + 1}
                </TableCell>
                <TableCell className={styles.breakWord}>{c.name}</TableCell>
                <TableCell className={styles.breakWord}>{c.name}</TableCell>
                <TableCell className="text-center text-gray-600">
                  <div className={`flex items-center justify-center gap-2 ${styles.actions}`}>
                    <Button
                      onClick={() => handleConfirmCourse(c.id)}
                      variant="destructive"
                      size="sm"
                      className={`text-lg px-4 py-2 bg-green-600 text-white hover:bg-green-700 hover:text-white cursor-pointer ${styles.actionBtn}`}
                    >
                      {enrolling ? "Đang xác thực..." : "Xác thực"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className={`text-lg px-4 py-2 cursor-pointer ${styles.actionBtn}`}
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
    </div>
  </div>

  <div className={`p-3 ${styles.paginationWrap}`}>
    <Pagination
      currentPage={pagePending}
      totalPages={totalPagesPending}
      onPageChange={setPagePending}
    />
  </div>

  {/* Học viên đã ghi danh */}
  <div className={`border rounded-md ${styles.sectionCard}`}>
    <div className={`border-b px-4 py-2 font-semibold ${styles.sectionTitle}`}>
      Học viên đã ghi danh
    </div>

    <div className={styles.tableWrap}>
      <Table className={`${styles.rcfTable} ${styles.compact}`}>
        <TableHeader>
          <TableRow>
            <TableHead className={`text-center ${styles.colSTT}`}>STT</TableHead>
            <TableHead className={styles.colAccount}>Tài khoản</TableHead>
            <TableHead className={styles.colName}>Học viên</TableHead>
            <TableHead className={`text-center ${styles.colStatus}`}>
              Chờ xác nhận
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loadingUser ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Đang tải…
              </TableCell>
            </TableRow>
          ) : errorUser ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                Lỗi tải danh sách.{" "}
                <button className="underline" onClick={() => void refetchEnrolled()}>
                  Thử lại
                </button>
              </TableCell>
            </TableRow>
          ) : (pagedEnrolled ?? []).length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                —
              </TableCell>
            </TableRow>
          ) : (
            (pagedEnrolled ?? []).map((u, i) => (
              <TableRow key={u.id}>
                <TableCell className="text-center">
                  {(page - 1) * pageSize + i + 1}
                </TableCell>
                <TableCell className={styles.breakWord}>{u.id}</TableCell>
                <TableCell className={styles.breakWord}>{u.name}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="destructive"
                    size="sm"
                    className={`text-lg px-4 py-2 cursor-pointer ${styles.actionBtn}`}
                    disabled={isUnregistering}
                    onClick={() => handleUnenroll(u.id)}
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
  </div>

  <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
</div>

  );
}
