// EditCourse.tsx
import { useEffect, useRef, useState } from "react";
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
import {
  BookOpen,
  Tag,
  FileText,
  Eye,
  Star,
  Calendar,
  List,
  Image as ImageIcon,
} from "lucide-react";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getDetailCourse,
  searchByIdCourse,
  updateCourseApi,
} from "@/services/course.api";
import { toast } from "sonner";
import type { DetailCourse } from "@/interfaces/course.interface";
import { useAuthStore } from "@/store/auth.store";
import styles from "@/pages/AdminTemplate/CourseManagement/EditCourse/EditCourse.module.css";

/** Cho phép URL http/https hoặc tên file có đuôi ảnh hợp lệ */
const imagePattern =
  /^(https?:\/\/.+\.(png|jpe?g|webp|gif)$)|(^[^\/\\]+\.(png|jpe?g|webp|gif)$)/i;

const schema = z.object({
  maKhoaHoc: z.string().min(1, "Vui lòng nhập mã khóa học"),
  biDanh: z.string().min(1, "Vui lòng nhập bí danh"),
  tenKhoaHoc: z.string().min(1, "Vui lòng nhập tên khóa học"),
  moTa: z.string().optional(),
  luotXem: z.preprocess(
    (v) => (typeof v === "string" && v.trim() !== "" ? Number(v) : v),
    z.number().int().min(0, "Lượt xem phải ≥ 0")
  ),
  danhGia: z.preprocess(
    (v) => (typeof v === "string" && v.trim() !== "" ? Number(v) : v),
    z.number().int().min(0, "Đánh giá phải ≥ 0")
  ),
  hinhAnh: z
    .string()
    .min(1, "Vui lòng nhập URL hoặc chọn file ảnh")
    .regex(imagePattern, "Hình ảnh không đúng định dạng (.png/.jpg/.jpeg/.webp/.gif)"),
  maNhom: z.string().min(1, "Vui lòng nhập mã nhóm"),
  ngayTao: z.string().min(1, "Vui lòng chọn ngày tạo"),
  maDanhMucKhoaHoc: z.string().min(1, "Vui lòng chọn danh mục"),
  taiKhoanNguoiTao: z.string().min(1, "Thiếu tài khoản người tạo"),
});

type EditCourseForm = z.infer<typeof schema>;

type Props = {
  maKhoaHoc: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const toYYYYMMDD = (ddMMyyyy?: string) => {
  if (!ddMMyyyy) return "";
  const [d, m, y] = ddMMyyyy.split("/");
  return `${y}-${m}-${d}`;
};
const toDDMMYYYY = (yyyyMMdd?: string) => {
  if (!yyyyMMdd) return "";
  const [y, m, d] = yyyyMMdd.split("-");
  return `${d}/${m}/${y}`;
};

export default function EditCourse({ maKhoaHoc, onSuccess, onCancel }: Props) {
  const currentUser = useAuthStore((s) => s.user);
  const taiKhoanDangNhap = currentUser?.taiKhoan ?? "";

  // detail khóa học
  const {
    data: courseDetail,
    isLoading: loadingDetail,
    isError: loadDetailErr,
  } = useQuery({
    queryKey: ["course-detail", maKhoaHoc],
    queryFn: () => searchByIdCourse(maKhoaHoc),
    enabled: !!maKhoaHoc,
  });

  // danh mục
  const {
    data: categories = [],
    isLoading: loadingCats,
    isError: catErr,
  } = useQuery<DetailCourse[]>({
    queryKey: ["course-categories"],
    queryFn: getDetailCourse,
  });

  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditCourseForm>({
    resolver: zodResolver(schema as any),
    defaultValues: {
      maKhoaHoc: "",
      biDanh: "",
      tenKhoaHoc: "",
      moTa: "",
      luotXem: 0 as unknown as any,
      danhGia: 0 as unknown as any,
      hinhAnh: "",
      maNhom: "GP01",
      ngayTao: "",
      maDanhMucKhoaHoc: "",
      taiKhoanNguoiTao: taiKhoanDangNhap,
    },
  });

  // --- NEW: Chọn file + preview (giống AddCourse) ---
  const [localPreview, setLocalPreview] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handlePickFile = (file?: File | null) => {
    if (!file) return;
    setLocalPreview(URL.createObjectURL(file));
    // đồng bộ cách làm bên AddCourse: set tên file vào hinhAnh
    setValue("hinhAnh", file.name, { shouldValidate: true });
  };
  // ---------------------------------------------------

  useEffect(() => {
    if (!courseDetail) return;
    setValue("maKhoaHoc", courseDetail.maKhoaHoc);
    setValue("biDanh", courseDetail.biDanh ?? "");
    setValue("tenKhoaHoc", courseDetail.tenKhoaHoc ?? "");
    setValue("moTa", courseDetail.moTa ?? "");
    setValue("luotXem", Number(courseDetail.luotXem ?? 0) as any);
    setValue("danhGia", Number((courseDetail as any)?.danhGia ?? 0) as any);
    setValue("hinhAnh", courseDetail.hinhAnh ?? "");
    setValue("maNhom", courseDetail.maNhom ?? "GP01");
    setValue("ngayTao", toYYYYMMDD(courseDetail.ngayTao ?? ""));

    const maDM =
      (courseDetail as any)?.maDanhMucKhoaHoc ||
      courseDetail?.danhMucKhoaHoc?.maDanhMucKhoahoc ||
      (courseDetail as any)?.maDanhMuc ||
      "";
    setValue("maDanhMucKhoaHoc", String(maDM));
    setValue("taiKhoanNguoiTao", taiKhoanDangNhap);
    // reset preview khi load detail
    setLocalPreview("");
  }, [courseDetail, setValue, taiKhoanDangNhap]);

  const { mutate: handleEditCourse, isPending } = useMutation({
    mutationFn: (payload: EditCourseForm) => {
      const body = {
        maKhoaHoc: payload.maKhoaHoc,
        biDanh: payload.biDanh,
        tenKhoaHoc: payload.tenKhoaHoc,
        moTa: payload.moTa ?? "",
        luotXem: Number(payload.luotXem) || 0,
        danhGia: Number(payload.danhGia) || 0,
        hinhAnh: payload.hinhAnh,
        maNhom: payload.maNhom || "GP01",
        ngayTao: toDDMMYYYY(payload.ngayTao),
        maDanhMucKhoaHoc: payload.maDanhMucKhoaHoc,
        taiKhoanNguoiTao: payload.taiKhoanNguoiTao || taiKhoanDangNhap,
      };
      return updateCourseApi(body);
    },
    onSuccess: () => {
      toast.success("Cập nhật khóa học thành công ✅");
      onSuccess?.();
    },
    onError: (err: any) => {
      const d = err?.response?.data;
      const msg =
        (typeof d === "string" ? d : d?.content || d?.message) ||
        err?.message ||
        "Cập nhật thất bại";
      toast.error(String(msg));
      console.error("Edit course failed:", err);
    },
  });

  const onSubmit = (data: EditCourseForm) => {
    const loadingId = toast.loading("Đang cập nhật khóa học...");
    handleEditCourse(data, { onSettled: () => toast.dismiss(loadingId) });
  };

  if (loadingDetail)
    return (
      <div className="p-6 text-sm text-stone-600">
        Đang tải dữ liệu khóa học…
      </div>
    );
  if (loadDetailErr || !courseDetail)
    return (
      <div className="p-6 text-sm text-red-600">
        Không tải được thông tin khóa học.
      </div>
    );

  return (
    <div className={styles.wrap}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 text-lg ${styles.form} ${styles.twoCols}`}
      >
        {/* Hàng 1: 2 ô */}
        <InputWithIcon
          id="maKhoaHoc"
          label="Mã khóa học"
          icon={<Tag size={14} />}
          placeholder="VD: NODEJS_01"
          {...register("maKhoaHoc")}
          error={errors.maKhoaHoc?.message}
          readOnly
        />

        <InputWithIcon
          id="tenKhoaHoc"
          label="Tên khóa học"
          icon={<FileText size={14} />}
          placeholder="VD: NodeJS Căn bản"
          {...register("tenKhoaHoc")}
          error={errors.tenKhoaHoc?.message}
        />

        {/* Hàng 2: Danh mục (1/2) + Ngày tạo (1/2) */}
        <div className={`${styles.divSelect}`}>
          <Label
            htmlFor="maDanhMucKhoaHoc"
            className={`text-lg ${styles.label}`}
          >
            Danh mục khóa học
          </Label>
          <div
            className={`flex items-center rounded-md border border-gray-300 bg-white overflow-hidden ${styles.selectGroup}`}
          >
            <span
              className={`bg-gray-50 text-gray-500 border-r border-gray-200 flex items-center ${styles.leading}`}
            >
              <List size={14} />
            </span>
            <Controller
              control={control}
              name="maDanhMucKhoaHoc"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={loadingCats || catErr}
                >
                  <SelectTrigger
                    id="maDanhMucKhoaHoc"
                    className={`h-11 text-sm border-0 focus:ring-0 focus:ring-offset-0 w-full ${styles.selectTrigger}`}
                  >
                    <SelectValue
                      placeholder={
                        loadingCats ? "Đang tải..." : "Chọn danh mục"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem
                        key={c.maDanhMuc}
                        value={c.maDanhMuc}
                        className={`text-sm ${styles.selectItem}`}
                      >
                        {c.tenDanhMuc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.maDanhMucKhoaHoc && (
            <p className="text-sm text-red-600">
              {errors.maDanhMucKhoaHoc.message}
            </p>
          )}
        </div>

        <InputWithIcon
          id="ngayTao"
          label="Ngày tạo"
          type="date"
          icon={<Calendar size={14} />}
          placeholder=""
          {...register("ngayTao")}
          error={errors.ngayTao?.message}
        />

        {/* Hàng 3: Bí danh + Lượt xem */}
        <InputWithIcon
          id="biDanh"
          label="Bí danh"
          icon={<BookOpen size={14} />}
          placeholder="VD: nodejs-canban"
          {...register("biDanh")}
          error={errors.biDanh?.message}
        />

        <InputWithIcon
          id="luotXem"
          label="Lượt xem"
          type="number"
          icon={<Eye size={14} />}
          placeholder="0"
          {...register("luotXem")}
          error={errors.luotXem?.message}
        />

        {/* Hàng 4: Đánh giá + spacer */}
        <InputWithIcon
          id="danhGia"
          label="Đánh giá"
          type="number"
          icon={<Star size={14} />}
          placeholder="0"
          {...register("danhGia")}
          error={errors.danhGia?.message}
        />
        <div />

        {/* Full width: Tài khoản người tạo */}
        <div className={`md:col-span-2 ${styles.span2}`}>
          <Label className={`text-lg ${styles.label}`}>
            Tài khoản người tạo
          </Label>
          <div
            className={`${styles.userInput} mt-1 w-full rounded-md border border-gray-300 px-3 py-2 bg-gray-50 text-sm`}
          >
            {taiKhoanDangNhap || "(chưa đăng nhập)"}
          </div>
          <input
            type="hidden"
            {...register("taiKhoanNguoiTao")}
            value={taiKhoanDangNhap}
            readOnly
          />
        </div>

        {/* Full width: Hình ảnh — có nút Chọn file + preview */}
        <div className={`md:col-span-2 ${styles.span2}`}>
          <Label htmlFor="hinhAnh" className={`text-lg ${styles.label}`}>
            Hình ảnh
          </Label>

          <div className="flex gap-3 items-start mt-1">
            <div className="flex-1">
              <InputWithIcon
                id="hinhAnh"
                label=""
                icon={<ImageIcon size={14} />}
                placeholder="Dán URL hoặc bấm 'Chọn file'"
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
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileRef.current?.click()}
                className={`${styles.btn} cursor-pointer`}
              >
                Chọn file
              </Button>
            </div>
          </div>

          {(localPreview || imagePattern.test(watch("hinhAnh") || "")) && (
            <img
              src={localPreview || watch("hinhAnh")}
              alt="preview"
              className={`mt-3 h-28 w-28 object-cover rounded-md border ${styles.imgPreview}`}
              onError={() => setLocalPreview("")}
            />
          )}
        </div>

        {/* Full width: Mô tả */}
        <div className={`md:col-span-2 ${styles.span2}`}>
          <Label className={`text-lg ${styles.label}`}>Mô tả khóa học</Label>
          <textarea
            className={`mt-2 w-full rounded-md border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-gray-200 ${styles.textarea}`}
            rows={4}
            placeholder="Nhập mô tả"
            {...register("moTa")}
          />
          {errors.moTa && (
            <p className="text-sm text-red-600 mt-1">{errors.moTa.message}</p>
          )}
        </div>

        {/* Full width: Nút */}
        <div
          className={`md:col-span-2 flex flex-wrap items-center justify-end gap-2 text-lg ${styles.span2}`}
        >
          <Button
            type="submit"
            className={`text-lg h-11 cursor-pointer ${styles.btn}`}
            disabled={isSubmitting || isPending}
          >
            {isPending ? "Đang cập nhật..." : "Lưu thay đổi"}
          </Button>
          <Button
            type="button"
            className={`text-lg h-11 bg-red-600 text-white hover:bg-red-700 cursor-pointer ${styles.btn}`}
            onClick={() => onCancel?.()}
            disabled={isSubmitting || isPending}
          >
            Đóng
          </Button>
        </div>
      </form>
    </div>
  );
}
