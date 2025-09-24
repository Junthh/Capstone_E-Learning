
import type { UserInfo, UpdateUserRequest } from '@/interfaces/user.interface';
import api from './api';
import type { pageResult } from "@/interfaces/pageResult.interface";
import type { BaseApiResponse } from "@/interfaces/base.interface";
import type { AddUser, EditUserInterface, User } from "@/interfaces/user.interface";

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

export const getUserListApi = async (
  page: number,
  pageSize: number
): Promise<pageResult<User>> => {
  try {
    const url = `/QuanLyNguoiDung/LayDanhSachNguoiDung_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${pageSize}`;
    const response = await api.get<pageResult<User>>(url);
    console.log("User list:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get user list failed:", error);
    throw error;
  }
};

export const addUserApi = async (data: AddUser) => {
  try {
    const url = `/QuanLyNguoiDung/ThemNguoiDung`;
    const body = { ...data, maNhom: data.maNhom || "GP01" };
    const response = await api.post<BaseApiResponse<AddUser>>(url, body);
    return response.data.content;
  } catch (error) {
    console.error("Add user failed:", error);
    throw error;
  }
};

export const deleteUserApi = async (taiKhoan: string) => {
  try {
    const url = `/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;
    const response = await api.delete(url);
    return response.data
  } catch (error) {
    console.error("delete user failed:", error);
    throw error;
  }
};

export const searchUserApi = async (tuKhoa: string): Promise<User[]> => {
  try {
    const url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${encodeURIComponent(
      tuKhoa
    )}`;
    const res = await api.get<BaseApiResponse<User[]>>(url);
    return res.data.content ?? [];
  } catch (error) {
    console.error("Search user failed:", error);
    throw error;
  }
};


export const getAllUserApi = async (): Promise<User[]> => {
  const res = await api.get<BaseApiResponse<User[]>>(
    "/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
  );
  return res.data?.content ?? [];
};


export const updateUserApi = async (data: EditUserInterface) => {
  try {
    const url = `QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    const body = { ...data, maNhom: data.maNhom || "GP01" };
    const response = await api.put<BaseApiResponse<EditUserInterface>>(url, body);
    return response.data.content;
  } catch (error) {
    console.error("Edit user failed:", error);
    throw error;
  }
};

export const searchTaiKhoan = async (tuKhoa: string) => {
  try {
    const url = `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`;
    const response = await api.get<User>(url);
    return response.data
  } catch (error) {
    console.error("Search user failed:", error);
    throw error;
  }
};