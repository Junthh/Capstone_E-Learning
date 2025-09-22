import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "../LoginPage/LoginPage.module.css"; // tái sử dụng CSS
import { registerApi } from "@/services/auth.api";

// schema validate
const schema = z.object({
  taiKhoan: z.string().nonempty("Tài khoản không được để trống"),
  matKhau: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
  hoTen: z.string().nonempty("Họ tên không được để trống"),
  soDt: z.string().nonempty("Số điện thoại không được để trống"),
  maNhom: z.literal("GP01"),
  email: z.string().email("Email không hợp lệ"),
});

type RegisterInputs = z.infer<typeof schema>;

export default function RegisterPage() {
  const [rightActive, setRightActive] = useState(true); // mặc định mở Register
  const navigate = useNavigate();

  const { mutate: handleRegister, isPending } = useMutation({
    mutationFn: (data: RegisterInputs) => registerApi(data),
    onSuccess: () => {
      navigate("/auth/login"); // sau khi đăng ký thành công
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDt: "",
      maNhom: "GP01",
      email: "",
    },
  });

  const onSubmit = (data: RegisterInputs) => handleRegister(data);

  return (
    <div className={styles.wrap}>
      <div
        className={`${styles.container} ${
          rightActive ? styles.containerRightActive : ""
        }`}
      >
        {/* REGISTER FORM */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.title}>Tạo tài khoản</h1>
            <p className={styles.helper}>Nhập thông tin bên dưới để đăng ký</p>

            <div className={styles.field}>
              <label className={styles.label}>Họ tên</label>
              <Input
                placeholder="Nhập họ tên"
                className={styles.input}
                {...register("hoTen")}
              />
              <div className={styles.error}>{errors.hoTen?.message}</div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <Input
                type="email"
                placeholder="Nhập email"
                className={styles.input}
                {...register("email")}
              />
              <div className={styles.error}>{errors.email?.message}</div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Số điện thoại</label>
              <Input
                placeholder="Nhập số điện thoại"
                className={styles.input}
                {...register("soDt")}
              />
              <div className={styles.error}>{errors.soDt?.message}</div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tài khoản</label>
              <Input
                placeholder="Nhập tài khoản"
                className={styles.input}
                {...register("taiKhoan")}
              />
              <div className={styles.error}>{errors.taiKhoan?.message}</div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Mật khẩu</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                className={styles.input}
                {...register("matKhau")}
              />
              <div className={styles.error}>{errors.matKhau?.message}</div>
            </div>

            <Button type="submit" className={styles.btn} disabled={isPending}>
              {isPending ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.title}>Chào mừng trở lại!</h1>
              <p>Đăng nhập để tiếp tục</p>
              <Button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => navigate("/auth/login")}
              >
                Đăng nhập
              </Button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.title}>Xin chào, bạn mới!</h1>
              <p>Nhập thông tin để tạo tài khoản</p>
              <Button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setRightActive(true)}
              >
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
