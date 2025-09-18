
import type { UserInfo, UpdateUserRequest } from '@/interfaces/user.interface';
import api from './api';

export const getUserInfoApi = async (): Promise<UserInfo> => {
  try {
    const response = await api.post<UserInfo>("/QuanLyNguoiDung/ThongTinTaiKhoan");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfoApi = async (data: UpdateUserRequest): Promise<UserInfo> => {
  try {
    const response = await api.put<UserInfo>("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};