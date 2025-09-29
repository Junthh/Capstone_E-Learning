import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { InputWithIcon } from "../../_Components/InputWithIcon";
import {
  BookOpen, Tag, FileText, Eye, Star, Calendar, User as UserIcon, List, Image as ImageIcon,
} from "lucide-react";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCourseApi, getDetailCourse } from "@/services/course.api";
import { toast } from "sonner";
import type { DetailCourse } from "@/interfaces/course.interface";
import { useAuthStore } from "@/store/auth.store";

/** URL ảnh http/https hoặc tên file có đuôi ảnh hợp lệ */
const imagePattern = /^(https?:\/\/.+\.(png|jpe?g|webp|gif)$)|(^[^\/\\]+\.(png|jpe?g|webp|gif)$)/i;

const schema = z.object({
  maKhoaHoc: z.string().min(1, "Vui lòng nhập mã khóa học"),
  biDanh: z.string().min(1, "Vui lòng nhập bí danh"),
  tenKhoaHoc: z.string().min(1, "Vui lòng nhập tên khóa học"),
  moTa: z.string().min(1, "Vui lòng nhập mô tả"),
  luotXem: z.preprocess(
    (v) => (typeof v === "string" && v.trim() !== "" ? Number(v) : v),
    z.number().int().min(0, "Lượt xem phải ≥ 0")
  ),
  danhGia: z.preprocess(
    (v) => (typeof v === "string" && v.trim() !== "" ? Number(v) : v),
    z.number().int().min(0, "Đánh giá phải ≥ 0").max(5, "Đánh giá tối đa 5")
  ),
  hinhAnh: z.string()
    .min(1, "Vui lòng nhập URL hoặc chọn file ảnh")
    .regex(imagePattern, "Hình ảnh không đúng định dạng (.png/.jpg/.jpeg/.webp/.gif)"),
  maNhom: z.string().min(1, "Vui lòng nhập mã nhóm"),
  ngayTao: z.string().min(1, "Vui lòng chọn ngày tạo"),
  maDanhMucKhoaHoc: z.string().min(1, "Vui lòng chọn danh mục"),
  taiKhoanNguoiTao: z.string().min(1, "Vui lòng nhập tài khoản người tạo"),
});

type AddCourseForm = z.infer<typeof schema>;

type Props = {
  onSuccess?: () => void;
  onCancel?: () => void;
  taiKhoanNguoiTao: string;
};

export default function AddCourse({ onSuccess, onCancel }: Props) {
    const currentUser = useAuthStore((s) => s.user);
  const taiKhoanDangNhap = currentUser?.taiKhoan ?? "";
  console.log("taikhoan", taiKhoanDangNhap);
  
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddCourseForm>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0 as any,
      danhGia: 0 as any,
      hinhAnh: "",                
      maNhom: "GP01",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: taiKhoanDangNhap,
    },
  });

  // Lấy danh mục khóa học
  const { data: categories = [], isLoading: loadingCats, isError: catErr } = useQuery<DetailCourse[]>({
    queryKey: ["course-categories"],
    queryFn: getDetailCourse,
  });

  // Preview ảnh nếu người dùng chọn file
  const [localPreview, setLocalPreview] = useState<string>("");

  const handlePickFile = (file?: File | null) => {
    if (!file) return;
    setLocalPreview(URL.createObjectURL(file));
    setValue("hinhAnh", file.name, { shouldValidate: true });
  };

  const { mutate: handleAddCourse, isPending } = useMutation({
    mutationFn: (payload: AddCourseForm) =>
      addCourseApi({
        ...payload,
        luotXem: Number(payload.luotXem),
        danhGia: Number(payload.danhGia),
        maNhom: payload.maNhom || "GP01",
      }),
    onSuccess: () => {
      toast.success("Thêm khóa học thành công ✅");
      reset();
      setLocalPreview("");
      onSuccess?.();
    },
    onError: (err: any) => {
      const msg =
        err?.response?.data?.content ||
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Có lỗi xảy ra";
      toast.error(String(msg));
      console.error("Add course failed:", err);
    },
  });

  const onSubmit = (data: AddCourseForm) => {
    const loadingId = toast.loading("Đang thêm khóa học...");
    handleAddCourse(data, { onSettled: () => toast.dismiss(loadingId) });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
      <InputWithIcon id="maKhoaHoc" label="Mã khóa học" icon={<Tag size={18} />} placeholder="VD: NODEJS_01"
        {...register("maKhoaHoc")} error={errors.maKhoaHoc?.message} />

      <InputWithIcon id="tenKhoaHoc" label="Tên khóa học" icon={<FileText size={18} />} placeholder="VD: NodeJS Căn bản"
        {...register("tenKhoaHoc")} error={errors.tenKhoaHoc?.message} />

      {/* Danh mục / Ngày tạo */}
      <div className="space-y-1">
        <Label htmlFor="maDanhMucKhoaHoc" className="text-lg">Danh mục khóa học</Label>
        <div className="flex items-center rounded-md border border-gray-300 bg-white overflow-hidden">
          <span className="px-3 bg-gray-50 text-gray-500 border-r border-gray-200 flex items-center">
            <List size={18} />
          </span>
          <Controller
            control={control}
            name="maDanhMucKhoaHoc"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} disabled={loadingCats || catErr}>
                <SelectTrigger id="maDanhMucKhoaHoc" className="h-11 text-sm border-0 focus:ring-0 focus:ring-offset-0 w-full">
                  <SelectValue placeholder={loadingCats ? "Đang tải..." : "Chọn danh mục"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.maDanhMuc} value={c.maDanhMuc} className="text-sm">
                      {c.tenDanhMuc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {errors.maDanhMucKhoaHoc && <p className="text-sm text-red-600">{errors.maDanhMucKhoaHoc.message}</p>}
      </div>

      <InputWithIcon id="ngayTao" label="Ngày tạo" type="date" icon={<Calendar size={18} />} placeholder=""
        {...register("ngayTao")} error={errors.ngayTao?.message} />

      <InputWithIcon id="biDanh" label="Bí danh" icon={<BookOpen size={18} />} placeholder="VD: nodejs-canban"
        {...register("biDanh")} error={errors.biDanh?.message} />

      <InputWithIcon id="luotXem" label="Lượt xem" type="number" icon={<Eye size={18} />} placeholder="0"
        {...register("luotXem")} error={errors.luotXem?.message} />

      <InputWithIcon id="danhGia" label="Đánh giá (0-5)" type="number" icon={<Star size={18} />} placeholder="0"
        {...register("danhGia")} error={errors.danhGia?.message} />

      <InputWithIcon id="taiKhoanNguoiTao" label="Tài khoản người tạo" icon={<UserIcon size={18} />}
        {...register("taiKhoanNguoiTao")} readOnly/>

      <div className="md:col-span-2">
        <Label htmlFor="hinhAnh" className="text-lg">Hình ảnh</Label>
        <div className="flex gap-3 items-start mt-1">
          <div className="flex-1">
            <InputWithIcon
              id="hinhAnh"
              label="" 
              icon={<ImageIcon size={18} />}
              placeholder="Dán URL ảnh (http/https, .jpg/.png/...) hoặc bấm 'Chọn file'"
              {...register("hinhAnh")}
              error={errors.hinhAnh?.message}
            />
          </div>

          <div>
            <input
              id="hiddenFileInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePickFile(e.target.files?.[0] ?? null)}
            />
            <Button type="button" variant="secondary" onClick={() => document.getElementById("hiddenFileInput")?.click()}>
              Chọn file
            </Button>
          </div>
        </div>

        {(localPreview || imagePattern.test(watch("hinhAnh"))) && (
          <img
            src={localPreview || watch("hinhAnh")}
            alt="preview"
            className="mt-3 h-28 w-28 object-cover rounded-md border"
            onError={() => setLocalPreview("")}
          />
        )}
      </div>

      <div className="md:col-span-2">
        <Label className="text-lg">Mô tả khóa học</Label>
        <textarea
          className="mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-gray-200"
          rows={5}
          placeholder="Nhập mô tả"
          {...register("moTa")}
        />
        {errors.moTa && <p className="text-sm text-red-600 mt-1">{errors.moTa.message}</p>}
      </div>

      <div className="md:col-span-2 flex flex-wrap items-center justify-end gap-2 text-lg">
        <Button type="submit" className="text-lg h-11 cursor-pointer" disabled={isSubmitting || isPending}>
          {isPending ? "Đang thêm..." : "Thêm khóa học"}
        </Button>
        <Button
          type="button"
          className="text-lg h-11 bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          onClick={() => onCancel?.()}
          disabled={isSubmitting || isPending}
        >
          Đóng
        </Button>
      </div>
    </form>
  );
}
