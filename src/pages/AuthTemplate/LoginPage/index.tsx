import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "@/services/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

const schema = z.object({
  taiKhoan: z.string().nonempty("Tài khoản không được để trống"),
  matKhau: z.string().nonempty("Mật khẩu không được để trống"),
});

type LoginFormInputs = z.infer<typeof schema>;

export default function LoginPage() {
  const [rightActive, setRightActive] = useState(false); // điều khiển overlay
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: (data: LoginFormInputs) => loginApi(data),
    onSuccess: (currentUser) => {
      setUser(currentUser);
      navigate(currentUser.maLoaiNguoiDung === "GV" ? "/admin" : "/");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: { taiKhoan: "", matKhau: "" },
  });

  const onSubmit = (data: LoginFormInputs) => handleLogin(data);

  return (
    <div className={styles.wrap}>
      <div
        className={`${styles.container} ${
          rightActive ? styles.containerRightActive : ""
        }`}
      >
        {/* SIGN UP (bên trái ẩn, để đúng hiệu ứng; bạn có thể navigate tới /auth/register) */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <h1 className={styles.title}>Tạo tài khoản</h1>
            <p className={styles.helper}>Hoặc đăng ký bằng email của bạn</p>

            <div className={styles.socialRow}>
              <a className={styles.social} href="#" aria-label="Facebook">f</a>
              <a className={styles.social} href="#" aria-label="Google">G</a>
              <a className={styles.social} href="#" aria-label="LinkedIn">in</a>
            </div>

            <Button
              type="button"
              className={`${styles.btn}`}
              onClick={() => navigate("/auth/register")}
            >
              Đăng ký
            </Button>
          </form>
        </div>

        {/* SIGN IN */}
        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={styles.title}>Đăng nhập</h1>
            <p className={styles.helper}>Hoặc dùng tài khoản của bạn</p>

            <div className={styles.socialRow}>
              <a className={styles.social} href="#" aria-label="Facebook">f</a>
              <a className={styles.social} href="#" aria-label="Google">G</a>
              <a className={styles.social} href="#" aria-label="LinkedIn">in</a>
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

            <a className={styles.link} href="#">Quên mật khẩu?</a>

            <Button type="submit" className={styles.btn} disabled={isPending}>
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1 className={styles.title}>Chào mừng trở lại!</h1>
              <p>Đăng nhập để tiếp tục đồng bộ dữ liệu của bạn</p>
              <Button
                type="button"
                className={`${styles.btn} ${styles.btnGhost}`}
                onClick={() => setRightActive(false)}
              >
                Đăng nhập
              </Button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1 className={styles.title}>Xin chào, bạn mới!</h1>
              <p>Bắt đầu hành trình của bạn cùng chúng tôi</p>
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
