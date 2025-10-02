import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "@/services/auth.api";
import { useAuthStore } from "@/store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";
import { Home } from "lucide-react";

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
      navigate(
        currentUser.maLoaiNguoiDung === "GV" ? "/admin/user-management" : "/"
      );
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
        
        <Button
          type="button"
          className={`${styles.backHome} cursor-pointer`}
          onClick={() => navigate("/")}
          aria-label="Về trang chủ"
        >
          <Home className={styles.backHomeIcon} />
          <span className={styles.backHomeText}>Trang chủ</span>
        </Button>
        {/* SIGN UP (panel chờ để giữ hiệu ứng overlay bên phải) */}
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
              <p className="text-gray-600 text-lg font-medium">
                Đang tải form đăng ký...
              </p>
            </div>
          </div>
        </div>

        {/* SIGN IN */}
        {!rightActive && (
          <div className={`${styles.formContainer} ${styles.signInContainer}`}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <h1 className={styles.title}>Đăng nhập</h1>

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

              <a className={styles.link} href="#"></a>

              <Button
                type="submit"
                className={`${styles.btn} cursor-pointer`}
                disabled={isPending}
              >
                {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
              </Button>

              {/* Nút Đăng ký chỉ cho iPhone 6/7/8 & Plus (ẩn ở md+) */}
              <div className={styles.mobileCta}>
                <Button
                  type="button"
                  className={`${styles.btn} ${styles.btnAlt} cursor-pointer`}
                  onClick={() => navigate("/auth/register")}
                >
                  Đăng ký
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* OVERLAY (hiện ở iPad/desktop) */}
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
                className={`${styles.btn} ${styles.btnGhost} cursor-pointer`}
                onClick={() => {
                  setRightActive(true);
                  setTimeout(() => {
                    navigate("/auth/register");
                  }, 1400);
                }}
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
