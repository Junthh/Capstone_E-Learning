import type { CurrentUser } from '@/interfaces/auth.interface';
import api from './api';

type LoginDataRequest = {
  taiKhoan: string;
  matKhau: string;
}

type RegisterDataRequest = {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDt: string;
  maNhom: string;
  email: string;
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

export const registerApi = async (data: RegisterDataRequest) =>{
  try {
    const response = await api.post<CurrentUser>("/QuanLyNguoiDung/DangKy", data)
    // console.log("response register api", response.data)
    return response.data
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}