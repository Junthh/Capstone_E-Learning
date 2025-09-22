import type { Course } from '@/interfaces/course.interface';
import type { RegisterCourseRequest, UnregisterCourseRequest, UserCourseDetail } from '@/interfaces/course.interface';
import api from './api';

// api lấy danh sách khóa học
export const getCourseListApi = async (): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
    // console.log( response.data);
    return response.data;
  } catch (error) {
    console.error("Get course list failed:", error);
    throw error;
  }
  
};
// api lấy danh mục khóa học
export const getCoursesByCategoryApi = async (maDanhMuc: string): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>(`/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc`, {
      params: { maDanhMuc }
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get courses by category failed:", error);
    throw error;
  }
};
// api lấy chi tiết khóa học
export const getCourseDetailApi = async (maKhoaHoc: string): Promise<Course> => {
  try {
    const response = await api.get<Course>(`/QuanLyKhoaHoc/LayThongTinKhoaHoc`, {
      params: { maKhoaHoc }
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get course detail failed:", error);
    throw error;
  }
};
// api tìm kiếm khóa học
export const searchCoursesApi = async (tenKhoaHoc: string): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>("/QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: { tenKhoaHoc }
    });
    console.log("Search courses:", response.data);
    return response.data;
  } catch (error) {
    console.error("Search courses failed:", error);
    throw error;
  }
};
// api đăng ký khóa học
export const registerCourseApi = async (data: RegisterCourseRequest): Promise<any> => {
  try {
    const response = await api.post("/QuanLyKhoaHoc/DangKyKhoaHoc", data);
    return response.data;
  } catch (error) {
    console.error("Register course failed:", error);
    throw error;
  }
};
// api hủy đăng ký khóa học
export const unregisterCourseApi = async (data: UnregisterCourseRequest): Promise<any> => {
  try {
    const response = await api.post("/QuanLyKhoaHoc/HuyGhiDanh", data);
    return response.data;
  } catch (error) {
    console.error("Unregister course failed:", error);
    throw error;
  }
};

// api lấy thông tin người dùng và khóa học đã đăng ký
export const getUserCoursesApi = async (): Promise<UserCourseDetail> => {
  try {
    const response = await api.post<UserCourseDetail>("/QuanLyNguoiDung/ThongTinNguoiDung");
    return response.data;
  } catch (error) {
    console.error("Get user courses failed:", error);
    throw error;
  }
};