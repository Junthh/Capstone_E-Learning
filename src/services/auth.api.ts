import type { CurrentUser } from '@/interfaces/auth.interface';
import api from './api';

type LoginDataRequest = {
  taiKhoan: string;
  matKhau: string;
}


export const loginApi = async (data: LoginDataRequest) =>{
  try {
    const response = await api.post<CurrentUser>("/QuanLyNguoiDung/DangNhap", data)
    return response.data
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}