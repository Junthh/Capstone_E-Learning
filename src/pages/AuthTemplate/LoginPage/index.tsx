import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// npm i react-hook-form zod @hookform/resolvers
import { useForm } from "react-hook-form";
import z from 'zod';

import { loginApi } from '@/services/auth.api';
import { useAuthStore } from '@/store/auth.store';
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  taiKhoan: z.string().nonempty("Tài khoản không được để trống"),
  matKhau: z.string().nonempty("Mật khẩu không được để trống"),
});

type LoginFormInputs = z.infer<typeof schema>;

export default function LoginPage() {

  const { setUser } = useAuthStore()
  const navigate = useNavigate()

 const { mutate : handleLogin , isPending} =  useMutation({
  mutationFn: (data: LoginFormInputs) => loginApi(data),
  onSuccess: (currentUser)=>{
      setUser(currentUser)
      navigate( currentUser.maLoaiNguoiDung === 'GV' ? '/admin'  : "/")
  },
  onError: (error: any)=>{}
 })
  const {register , handleSubmit , formState: { errors } } = useForm<LoginFormInputs>({
    defaultValues : {
      taiKhoan: '',
      matKhau: ''
    }
  });

  const onSubmit= (data: LoginFormInputs)=>{
    handleLogin(data)
  }

  return (
    <div>

      <h1 className='mb-4'>LoginPage</h1>

      <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Tài Khoản</label>
        <Input placeholder='Nhập tài khoản' {...register("taiKhoan")} />
        </div>

        <div>
          <label>Mật Khẩu</label>
          <Input type='password' placeholder='Nhập mật khẩu' {...register("matKhau")} />
        </div>
        
        <Button>
          Đăng Nhập
        </Button>
      </form>
    </div>
  )
}
