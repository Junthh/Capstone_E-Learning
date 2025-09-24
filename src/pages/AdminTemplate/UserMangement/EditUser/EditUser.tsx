import { Button } from "@/components/ui/button";
import { InputWithIcon } from "../../_Components/InputWithIcon";
import { Label } from "@/components/ui/label";
import {
  Users,
  User as UserIcon,
  Lock,
  Mail,
  Phone,
  IdCard,
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { searchTaiKhoan, updateUserApi } from "@/services/user.api";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import type { EditUserInterface } from "@/interfaces/user.interface";
import { toast } from "sonner";

const schema = z.object({
  taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
  matKhau: z.string().optional().or(z.literal("")).default(""),
  hoTen: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().email("Email không hợp lệ"),
  soDT: z.string().regex(/^[0-9]{9,11}$/, "SĐT không hợp lệ"),
  maLoaiNguoiDung: z.string().min(1, "Loại người dùng không được để trống"),
  maNhom: z.string().min(1).default("GP01"),
});

type EditUserForm = z.infer<typeof schema>;

type Props = {
  taiKhoan: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function EditUser({ taiKhoan, onSuccess, onCancel }: Props) {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditUserInterface>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
      maNhom: "GP01",
    },
  });

  const { data: userSearch } = useQuery({
    queryKey: ["get-user", taiKhoan],
    queryFn: () => searchTaiKhoan(taiKhoan),
    enabled: !!taiKhoan,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    select: (list: any) => {
      if (!Array.isArray(list) || list.length === 0) return undefined;
      return list.find((x) => x.taiKhoan === taiKhoan) ?? list[0];
    },
  });

  console.log("data", userSearch);

  useEffect(() => {
    if (!userSearch) return;
    reset({
      taiKhoan: userSearch.taiKhoan ?? "",
      hoTen: userSearch.hoTen ?? "",
      email: userSearch.email ?? "",
      soDT: userSearch.soDT ?? userSearch.soDt ?? "",
      maLoaiNguoiDung: userSearch.maLoaiNguoiDung ?? "",
      maNhom: "GP01",
    });
  }, [userSearch, reset]);

  const { mutate: handleEditUser, isPending } = useMutation({
    mutationFn: (payload: EditUserForm) => updateUserApi(payload),
    onSuccess: () => {
      toast.success("Cập nhật người dùng thành công ✅");
      onSuccess?.();
    },
    onError: (err: any) => {
      toast.error("Cập nhật thất bại");
      console.error(err);
    },
  });

  const onSubmit = (data: EditUserForm) => {
    const loadingId = toast.loading("Đang thêm người dùng...");
    handleEditUser(
      { ...data, taiKhoan: data.taiKhoan, maNhom: data.maNhom || "GP01" },
      {
        onSettled: () => toast.dismiss(loadingId),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-lg">
      <InputWithIcon
        id="taiKhoan"
        label="Tài khoản"
        icon={<UserIcon size={18} />}
        placeholder="Nhập tài khoản"
        readOnly
        autoComplete="username"
        {...register("taiKhoan")}
        error={errors.taiKhoan?.message}
      />

      <InputWithIcon
        id="matKhau"
        label="Mật khẩu (nếu muốn đổi)"
        type="password"
        icon={<Lock size={18} />}
        placeholder="Để trống nếu không đổi"
        autoComplete="current-password"
        {...register("matKhau")}
        error={errors.matKhau?.message}
      />

      <InputWithIcon
        id="hoTen"
        label="Họ và tên"
        icon={<IdCard size={18} />}
        placeholder="Nhập họ tên"
        autoComplete="name"
        {...register("hoTen")}
        error={errors.hoTen?.message}
      />

      <InputWithIcon
        id="email"
        label="Email"
        type="email"
        icon={<Mail size={18} />}
        placeholder="name@example.com"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <InputWithIcon
        id="soDT"
        label="Số điện thoại"
        icon={<Phone size={18} />}
        placeholder="VD: 0901234567"
        autoComplete="tel"
        {...register("soDT")}
        error={errors.soDT?.message}
      />

      <div className="space-y-1">
        <Label htmlFor="maLoaiNguoiDung" className="text-lg">
          Loại người dùng
        </Label>
        <div className="flex items-center rounded-md border border-gray-300 bg-white overflow-hidden">
          <span className="px-3 bg-gray-50 text-gray-500 border-r border-gray-200 flex items-center">
            <Users size={18} />
          </span>

          <Controller
            control={control}
            name="maLoaiNguoiDung"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  id="maLoaiNguoiDung"
                  className="h-11 text-sm border-0 focus:ring-0 focus:ring-offset-0 w-full"
                >
                  <SelectValue placeholder="Chọn loại người dùng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="HV" className="text-sm">
                    Học viên
                  </SelectItem>
                  <SelectItem value="GV" className="text-sm">
                    Giáo vụ
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {errors.maLoaiNguoiDung && (
          <p className="text-sm text-red-600">
            {errors.maLoaiNguoiDung.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 text-lg">
        <Button type="submit" className="text-lg h-11">
          {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
        </Button>

        <Button
          type="button"
          className="text-lg h-11 bg-red-600 text-white hover:bg-red-700"
          onClick={() => onCancel?.()}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
}
