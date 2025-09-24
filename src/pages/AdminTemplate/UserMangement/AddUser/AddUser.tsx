import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InputWithIcon } from "../../_Components/InputWithIcon";
import { User, Users, Lock, Mail, Phone, IdCard } from "lucide-react";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
import { addUserApi } from "@/services/user.api";
import { toast } from "sonner";

const schema = z.object({
  taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
  matKhau: z.string().min(1, "Vui lòng nhập mật khẩu"),
  hoTen: z.string().min(1, "Vui lòng nhập họ tên"),
  email: z.string().min(1, "Vui lòng nhập email"),
  soDT: z.string().regex(/^[0-9]{9,11}$/, "SĐT không hợp lệ"),
  maLoaiNguoiDung: z.string().nonempty("Loai người dùng không được để trống"),
  maNhom: z.string().default("GP01"),
});

type AddUserForm = z.infer<typeof schema>;

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
};


export default function AddUser({onSuccess, onCancel}: Props) {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddUserForm>({
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

  const { mutate: handleAddUser, isPending } = useMutation({
    mutationFn: (payload: AddUserForm) => addUserApi(payload),
    onSuccess: () => {
      toast.success("Thêm người dùng thành công");
      reset();
      onSuccess?.();
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.content ||
        err?.response?.data?.message ||
        err?.message ||
        "Có lỗi xảy ra";
      if (err?.response?.status === 401) {
        toast.error(
          "401 - Không có quyền. Vui lòng đăng nhập bằng tài khoản Quản trị."
        );
      } else {
        toast.error(String(msg));
      }
      console.error("Add user failed:", err);
    },
  });

  const onSubmit = (data: AddUserForm) => {
    const loadingId = toast.loading("Đang thêm người dùng...");
    handleAddUser(
      { ...data, maNhom: data.maNhom || "GP01" },
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
        icon={<User size={18} />}
        placeholder="Nhập tài khoản"
        {...register("taiKhoan")}
        error={errors.taiKhoan?.message}
      />

      <InputWithIcon
        id="matKhau"
        label="Mật khẩu"
        type="password"
        icon={<Lock size={18} />}
        placeholder="Nhập mật khẩu"
        {...register("matKhau")}
        error={errors.matKhau?.message}
      />

      <InputWithIcon
        id="hoTen"
        label="Họ và tên"
        icon={<IdCard size={18} />}
        placeholder="Nhập họ tên"
        {...register("hoTen")}
        error={errors.hoTen?.message}
      />

      <InputWithIcon
        id="email"
        label="Email"
        type="email"
        icon={<Mail size={18} />}
        placeholder="name@example.com"
        {...register("email")}
        error={errors.email?.message}
      />

      <InputWithIcon
        id="soDt"
        label="Số điện thoại"
        icon={<Phone size={18} />}
        placeholder="VD: 0901234567"
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
        <Button
          type="submit"
          className="text-lg h-11 cursor-pointer"
          disabled={isSubmitting || isPending}
        >
          {isPending ? "Đang thêm..." : "Thêm người dùng"}
        </Button>

        <Button
          type="button"
          className="text-lg h-11 bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          onClick={() => onCancel?.()}
          disabled={isSubmitting || isPending}
        >
          Hủy
        </Button>
      </div>
    </form>
  );
}
