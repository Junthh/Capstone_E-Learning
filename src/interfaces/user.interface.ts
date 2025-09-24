
export interface UserInfo {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  soDt: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface UpdateUserRequest {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface User {
  taiKhoan: string;
  hoTen: string;
  email: string;
  maLoaiNguoiDung: string;
  tenLoaiNguoiDung: string;
  soDt?: string;
  soDT?: string;
}

export interface AddUser {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
}

export interface EditUserInterface {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDT: string;
  maLoaiNguoiDung: string;
  maNhom: string;
};