// UserManagement.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
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
import AddUser from "./AddUser/AddUser";
import EditUser from "./EditUser/EditUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageSize from "../_Components/PageSize";
import Pagination from "../_Components/Pagination";
import { deleteUserApi, getUserListApi } from "@/services/user.api";
import type { pageResult } from "@/interfaces/pageResult.interface";
import type { User } from "@/interfaces/user.interface";
import { toast } from "sonner";
import RegisterCourse from "./RegisterCourse/RegisterCourse";
import styles from "./UserManagement.module.css";
import { UserPlus, Pencil, Trash2 } from "lucide-react";

const normalizeVN = (s: string) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d");

export default function UserManagement() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [tuKhoa, setTuKhoa] = useState("");
  const [debouncedTuKhoa, setDebouncedTuKhoa] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingAll, setLoadingAll] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const firstAllLoadTriggered = useRef(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<pageResult<User>>({
    queryKey: ["manager-user", page, pageSize],
    queryFn: () => getUserListApi(page, pageSize),
    placeholderData: (prev) => prev,
    refetchOnWindowFocus: false,
  });

  const { mutate: deteleUser } = useMutation({
    mutationFn: (taiKhoan: string) => deleteUserApi(taiKhoan),
    onSuccess: (_, taiKhoan) => {
      toast.success("Đã xoá người dùng thành công!");
      queryClient.invalidateQueries({ queryKey: ["manager-user"] });
      setAllUsers((prev) => prev.filter((u) => u.taiKhoan !== taiKhoan));
    },
    onError: () => {
      toast.error("Xoá thất bại. Vui lòng thử lại!");
    },
    onSettled: () => setDeletingId(null),
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 1;

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTuKhoa(tuKhoa.trim()), 300);
    return () => clearTimeout(t);
  }, [tuKhoa]);

  const isSearching = debouncedTuKhoa.length > 0;

  const fetchAllUsers = async () => {
    if (loadingAll || allLoaded) return;
    setLoadingAll(true);
    try {
      const BIG_SIZE = 1000;
      const first = await getUserListApi(1, BIG_SIZE);
      let collected = first.items ?? [];
      const tp = first.totalPages ?? 1;

      if (tp > 1) {
        const restPages = Array.from({ length: tp - 1 }, (_, i) => i + 2);
        const chunks = await Promise.all(
          restPages.map((p) => getUserListApi(p, BIG_SIZE))
        );
        for (const ch of chunks) {
          collected = collected.concat(ch.items ?? []);
        }
      }

      const map = new Map<string, User>();
      for (const u of collected) {
        if (u?.taiKhoan) map.set(u.taiKhoan, u);
      }
      setAllUsers(Array.from(map.values()));
      setAllLoaded(true);
    } catch (e) {
      console.error("Fetch all users failed:", e);
    } finally {
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    if (isSearching && !allLoaded && !firstAllLoadTriggered.current) {
      firstAllLoadTriggered.current = true;
      void fetchAllUsers();
    }
  }, [isSearching]);

  const filteredItems = useMemo(() => {
    const key = normalizeVN(debouncedTuKhoa);
    if (!isSearching) return items;

    const source = allLoaded ? allUsers : items;
    return source.filter((u) => {
      const tk = normalizeVN(u.taiKhoan ?? "");
      const ht = normalizeVN(u.hoTen ?? "");
      return tk.includes(key) || ht.includes(key);
    });
  }, [isSearching, debouncedTuKhoa, items, allUsers, allLoaded]);

  const getStt = (idx: number) =>
    isSearching ? idx + 1 : idx + 1 + (page - 1) * pageSize;

  const handleDeleteUser = async (taiKhoan: string) => {
    const ok = window.confirm("Bạn có chắc muốn xóa người dùng này?");
    if (!ok) return;
    setDeletingId(taiKhoan);
    deteleUser(taiKhoan);
  };

  const handleEditUser = (taiKhoan: string) => {
    setEditingAccount(taiKhoan);
    setOpenEdit(true);
  };

  const handleRegisterCourse = (taiKhoan: string) => {
    setEditingAccount(taiKhoan);
    setOpenRegister(true); // 👈 mở dialog ghi danh
  };

  const loading = isSearching
    ? loadingAll && !allLoaded && items.length === 0
    : isLoading;

  return (
    <div className={`${styles.wrap} space-y-5 text-left`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className={`${styles.infor} text-xl font-semibold text-gray-800`}>
          Quản lý người dùng
        </h2>

        <div className={`${styles.toolbar} flex items-center gap-3`}>
          {!isSearching && (
            <div className={styles.pageSizeBox}>
              <PageSize
                pageSize={pageSize}
                setPageSize={(v: number) => {
                  setPageSize(v);
                  setPage(1);
                }}
              />
            </div>
          )}

          {/* search: thêm styles.searchBox */}
          <div className={`${styles.searchBox} relative w-96`}>
            <Input
              type="text"
              value={tuKhoa}
              onChange={(e) => {
                setTuKhoa(e.target.value);
                if (page !== 1) setPage(1);
              }}
              placeholder="Tìm kiếm tài khoản, họ tên"
              className="h-12 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-lg"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
            </svg>
          </div>

          {/* Dialog addUser */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setOpen(true)}
                className={`${styles.addBtn} h-12 px-6 text-lg cursor-pointer`}
              >
                Thêm người dùng
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[640px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Thêm người dùng</DialogTitle>
              </DialogHeader>
              <AddUser
                onSuccess={() => setOpen(false)}
                onCancel={() => setOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DialogContent className="sm:max-w-[640px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Sửa người dùng</DialogTitle>
              </DialogHeader>
              {editingAccount && (
                <EditUser
                  taiKhoan={editingAccount}
                  onSuccess={() => setOpenEdit(false)}
                  onCancel={() => setOpenEdit(false)}
                />
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={openRegister} onOpenChange={setOpenRegister}>
            <DialogContent className="sm:max-w-[820px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Ghi danh khoá học</DialogTitle>
              </DialogHeader>
              {editingAccount && (
                <RegisterCourse
                  taiKhoan={editingAccount}
                  onSuccess={() => setOpenRegister(false)}
                  onCancel={() => setOpenRegister(false)}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* bảng: thêm styles.tableWrap + styles.table */}
      <div className={`${styles.tableCard} ${styles.tableWrap}`}>
        <Table
          className={`${styles.table} ${styles.compact} table-fixed w-full text-gray-700 text-lg`}
        >
          <TableHeader className="bg-gray-50 text-gray-600">
            <TableRow className="divide-x divide-gray-300">
              <TableHead className="px-4 py-3 w-[7%] text-center text-lg">
                STT
              </TableHead>
              <TableHead className="px-4 py-3 w-[13%] text-center text-lg">
                Tài khoản
              </TableHead>
              <TableHead className="px-4 py-3 w-[10%] text-center text-lg">
                Người dùng
              </TableHead>
              <TableHead className="px-4 py-3 w-[15%] text-center text-lg">
                Họ và tên
              </TableHead>
              <TableHead className="px-4 py-3 w-[21%] text-center text-lg">
                Email
              </TableHead>
              <TableHead className="px-4 py-3 w-[12%] text-center text-lg">
                Số điện thoại
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

            {!loading && !isError && filteredItems.length === 0 && (
              <TableRow>
                <TableCell className="py-6 text-center" colSpan={7}>
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}

            {!loading &&
              !isError &&
              filteredItems.map((u, idx) => (
                <TableRow
                  key={`${u.taiKhoan}-${idx}`}
                  className="divide-x divide-gray-300"
                >
                  <TableCell
                    className={`px-4 py-3 text-center text-lg ${styles.nowrap}`}
                  >
                    {getStt(idx)}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3 text-center text-lg ${styles.nowrap}`}
                  >
                    {(u.taiKhoan ?? "").trim()}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3 text-center text-lg ${styles.nowrap}`}
                  >
                    {u.tenLoaiNguoiDung}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-left text-lg whitespace-normal break-words">
                    {u.hoTen}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-left text-lg whitespace-normal break-words">
                    {u.email}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-3 text-center text-lg ${styles.nowrap}`}
                  >
                    {(u as any).soDt ?? (u as any).soDT ?? "-"}
                  </TableCell>
                  <TableCell className={`px-4 py-3 text-center text-lg`}>
                    <div
                      className={`${styles.actions} flex flex-wrap items-center justify-center gap-2 text-lg`}
                    >
                      {/* Ghi danh */}
                      <Button
                        size="lg"
                        variant="outline"
                        className={`${styles.iconAction} text-lg bg-green-600 text-white hover:bg-green-700 hover:text-white cursor-pointer`}
                        onClick={() => handleRegisterCourse(u.taiKhoan)}
                      >
                        <span className="hidden sm:inline">Ghi Danh</span>
                        <UserPlus className="block sm:hidden w-4 h-4" />{" "}
                        {/* 👈 hiện icon khi mobile */}
                      </Button>

                      {/* Sửa */}
                      <Button
                        size="lg"
                        variant="outline"
                        className={`${styles.iconAction} text-lg bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer`}
                        onClick={() => handleEditUser(u.taiKhoan)}
                      >
                        <span className="hidden sm:inline">Sửa</span>
                        <Pencil className="block sm:hidden w-4 h-4" />
                      </Button>
                      {/* Xoá */}
                      <Button
                        size="lg"
                        variant="outline"
                        className={`${styles.iconAction} text-lg bg-red-600 text-white hover:bg-red-700 hover:text-white cursor-pointer`}
                        onClick={() => handleDeleteUser(u.taiKhoan)}
                      >
                        <span className="hidden sm:inline">
                          {deletingId === u.taiKhoan ? "Đang xoá..." : "Xoá"}
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
          onPageChange={(p: number) => setPage(p)}
        />
      )}
    </div>
  );
}
