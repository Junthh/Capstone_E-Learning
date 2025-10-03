import { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InputWithIcon } from "../../_Components/InputWithIcon";
import { BookOpen, Tag, FileText, Eye, Star, Calendar, User as UserIcon, List, Image as ImageIcon } from "lucide-react";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCourseApi, getDetailCourse } from "@/services/course.api";
import { toast } from "sonner";
import type { DetailCourse } from "@/interfaces/course.interface";
import { useAuthStore } from "@/store/auth.store";
import styles from "@/pages/AdminTemplate/CourseManagement/AddCourse/AddCourse.module.css";

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
  // Cho phép bỏ trống vì có thể dùng file thay cho URL
  hinhAnh: z.string().optional(),
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

const toDDMMYYYY = (yyyyMMdd?: string) => {
  if (!yyyyMMdd) return "";
  const [y, m, d] = yyyyMMdd.split("-");
  return `${d}/${m}/${y}`;
};

export default function AddCourse({ onSuccess, onCancel }: Props) {
  const currentUser = useAuthStore((s) => s.user);
  const taiKhoanDangNhap = currentUser?.taiKhoan ?? "";

  const { handleSubmit, register, control, reset, watch, formState: { errors, isSubmitting } } =
    useForm<AddCourseForm>({
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

  const { data: categories = [], isLoading: loadingCats, isError: catErr } =
    useQuery<DetailCourse[]>({
      queryKey: ["course-categories"],
      queryFn: getDetailCourse,
    });

  // --- File + preview
  const [localPreview, setLocalPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handlePickFile = (file?: File | null) => {
    if (!file) return;
    setSelectedFile(file);
    setLocalPreview(URL.createObjectURL(file));

  };


  const { mutate: handleAddCourse, isPending } = useMutation({
    mutationFn: async (payload: AddCourseForm) => {
      const urlImg = (payload.hinhAnh || "").trim();
      if (!selectedFile && urlImg && !imagePattern.test(urlImg)) {
        throw new Error("URL hình ảnh không đúng định dạng (.png/.jpg/.jpeg/.webp/.gif)");
      }
      if (!selectedFile && !urlImg) {
        throw new Error("Vui lòng chọn file ảnh hoặc nhập URL hợp lệ");
      }

      const fd = new FormData();
      fd.append("maKhoaHoc", payload.maKhoaHoc);
      fd.append("biDanh", payload.biDanh);
      fd.append("tenKhoaHoc", payload.tenKhoaHoc);
      fd.append("moTa", payload.moTa ?? "");
      fd.append("luotXem", String(Number(payload.luotXem) || 0));
      fd.append("danhGia", String(Number(payload.danhGia) || 0));
      fd.append("maNhom", payload.maNhom || "GP01");
      fd.append("ngayTao", toDDMMYYYY(payload.ngayTao));
      fd.append("maDanhMucKhoaHoc", payload.maDanhMucKhoaHoc);
      fd.append("taiKhoanNguoiTao", payload.taiKhoanNguoiTao || taiKhoanDangNhap);

      if (selectedFile) {
        fd.append("hinhAnh", selectedFile, selectedFile.name);
      } else if (urlImg) {
        // Giữ nếu backend accept URL string, nếu không hãy comment dòng dưới để bắt buộc file
        fd.append("hinhAnh", urlImg);
      }

      return addCourseApi(fd);
    },
    onSuccess: () => {
      toast.success("Thêm khóa học thành công ✅");
      reset();
      setLocalPreview("");
      setSelectedFile(null);
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
    <form onSubmit={handleSubmit(onSubmit)} className={`grid grid-cols-1 md:grid-cols-2 gap-6 text-lg ${styles.form} ${styles.twoCols}`}>
      <InputWithIcon id="maKhoaHoc" label="Mã khóa học" icon={<Tag size={18} />} placeholder="VD: NODEJS_01" {...register("maKhoaHoc")} error={errors.maKhoaHoc?.message} />
      <InputWithIcon id="tenKhoaHoc" label="Tên khóa học" icon={<FileText size={18} />} placeholder="VD: NodeJS Căn bản" {...register("tenKhoaHoc")} error={errors.tenKhoaHoc?.message} />

      {/* Danh mục */}
      <div>
        <Label htmlFor="maDanhMucKhoaHoc" className={styles.label}>Danh mục khóa học</Label>
        <div className={styles.selectOuter}>
          <span className={styles.leading}><List size={18} /></span>
          <Controller
            control={control}
            name="maDanhMucKhoaHoc"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} disabled={loadingCats || catErr}>
                <SelectTrigger id="maDanhMucKhoaHoc" className={`h-11 text-sm border-0 focus:ring-0 focus:ring-offset-0 w-full ${styles.selectTrigger}`}>
                  <SelectValue placeholder={loadingCats ? "Đang tải..." : "Chọn danh mục"} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.maDanhMuc} value={c.maDanhMuc} className={styles.selectItem}>
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

      <InputWithIcon id="ngayTao" label="Ngày tạo" type="date" icon={<Calendar size={18} />} {...register("ngayTao")} error={errors.ngayTao?.message} />
      <InputWithIcon id="biDanh" label="Bí danh" icon={<BookOpen size={18} />} placeholder="VD: nodejs-canban" {...register("biDanh")} error={errors.biDanh?.message} />
      <InputWithIcon id="luotXem" label="Lượt xem" type="number" icon={<Eye size={18} />} placeholder="0" {...register("luotXem")} error={errors.luotXem?.message} />
      <InputWithIcon id="danhGia" label="Đánh giá (0-5)" type="number" icon={<Star size={18} />} placeholder="0" {...register("danhGia")} error={errors.danhGia?.message} />

      <InputWithIcon id="taiKhoanNguoiTao" label="Tài khoản người tạo" icon={<UserIcon size={18} />} {...register("taiKhoanNguoiTao")} readOnly />

      {/* Hình ảnh */}
      <div className={`md:col-span-2 ${styles.span2}`}>
        <Label htmlFor="hinhAnh" className={styles.label}>Hình ảnh</Label>
        <div className="flex gap-3 items-start mt-1">
          <div className="flex-1">
            <InputWithIcon
              id="hinhAnh"
              label=""
              icon={<ImageIcon size={18} />}
              placeholder="Dán URL (nếu backend chấp nhận) hoặc bấm 'Chọn file'"
              {...register("hinhAnh")}
              error={errors.hinhAnh?.message}
            />
          </div>
          <div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePickFile(e.target.files?.[0] ?? null)}
            />
            <Button type="button" variant="secondary" onClick={() => fileRef.current?.click()} className={`${styles.btn} cursor-pointer`}>
              Chọn file
            </Button>
          </div>
        </div>

        {(localPreview || imagePattern.test(watch("hinhAnh") || "")) && (
          <img
            src={localPreview || watch("hinhAnh")!}
            alt="preview"
            className="mt-3 h-28 w-28 object-cover rounded-md border"
            onError={() => setLocalPreview("")}
          />
        )}
      </div>

      {/* Mô tả */}
      <div className={`md:col-span-2 ${styles.span2}`}>
        <Label className={styles.label}>Mô tả khóa học</Label>
        <textarea
          className={`mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-gray-200 ${styles.textarea}`}
          rows={5}
          placeholder="Nhập mô tả"
          {...register("moTa")}
        />
        {errors.moTa && <p className="text-sm text-red-600 mt-1">{errors.moTa.message}</p>}
      </div>

      {/* Nút */}
      <div className={`md:col-span-2 flex flex-wrap items-center justify-end gap-2 text-lg ${styles.span2}`}>
        <Button type="submit" className={`text-lg h-11 cursor-pointer ${styles.btn}`} disabled={isSubmitting || isPending}>
          {isPending ? "Đang thêm..." : "Thêm khóa học"}
        </Button>
        <Button type="button" className={`text-lg h-11 bg-red-600 text-white hover:bg-red-700 cursor-pointer ${styles.btn}`} onClick={() => onCancel?.()} disabled={isSubmitting || isPending}>
          Đóng
        </Button>
      </div>
    </form>
  );
}
