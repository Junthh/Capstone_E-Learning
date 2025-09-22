
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