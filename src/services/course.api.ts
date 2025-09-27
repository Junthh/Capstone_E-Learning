import type { AddCourse, Course, DetailCourse, SimpleCourse } from '@/interfaces/course.interface';
import type { RegisterCourseRequest, UnregisterCourseRequest, UserCourseDetail } from '@/interfaces/course.interface';
import api from './api';
import type { pageResult } from '@/interfaces/pageResult.interface';
import type { BaseApiResponse } from '@/interfaces/base.interface';

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

export const registerSCourseApi = async (payload: RegisterCourseRequest) => {

  return api.post("/QuanLyKhoaHoc/GhiDanhKhoaHoc", payload).then((r) => r.data);
};


export const getUserEnrolledCoursesApi = async (
  taiKhoan: string
): Promise<SimpleCourse[]> => {
  try {
    const res = await api.post<SimpleCourse[]>(
      "/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet",
      { taiKhoan }
    );
    return res.data;
  } catch (error: any) {
    console.error("Enroll user failed:", error);
    throw error;
  }
};

export const getUserPendingCoursesApi = async (
  taiKhoan: string
): Promise<SimpleCourse[]> => {
  try {
    const res = await api.post<SimpleCourse[]>(
      "/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet",
      { taiKhoan }
    );
    return res.data;
  } catch (error: any) {
    console.error("Pending user failed:", error);
    throw error;
  }
};


export const getCoursePageSizeApi = async (
  page: number,
  pageSize: number
): Promise<pageResult<Course>> => {
  try {
    const url = `/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?MaNhom=GP01&page=${page}&pageSize=${pageSize}`;
    const response = await api.get<pageResult<Course>>(url);
    console.log("Course list:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get course list failed:", error);
    throw error;
  }
};


export const addCourseApi = async (data: AddCourse) => {
  try {
    const res = await api.post("/QuanLyKhoaHoc/ThemKhoaHoc", data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data?.content ?? res.data;
  } catch (error) {
    console.error("Add course failed:", error);
    throw error;
  }
};


export const getDetailCourse = async (): Promise<DetailCourse[]> => {
  try {
    const res = await api.get<DetailCourse[]>("/QuanLyKhoaHoc/LayDanhMucKhoaHoc");
    return res.data;
  } catch (error) {
    console.error("Error course detail:", error);
    throw error;
  }
};


export const deleteCourseApi = async (maKhoaHoc: string) => {
  try {
    const url = `https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`;
    const response = await api.delete(url);
    return response.data
  } catch (error) {
    console.error("delete course failed:", error);
    throw error;
  }
};


export const updateCourseApi = async (data: AddCourse) => {
  try {
    const url = `/QuanLyKhoaHoc/CapNhatKhoaHoc`;
    const body = { ...data, maNhom: data.maNhom || "GP01" };
    const response = await api.put<BaseApiResponse<AddCourse>>(url, body);
    return response.data.content;
  } catch (error) {
    console.error("Edit course failed:", error);
    throw error;
  }
};

export const searchByIdCourse = async (maKhoaHoc: string) => {
  try {
    const url = `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`;
    const response = await api.get<Course>(url);
    return response.data
  } catch (error) {
    console.error("Search course failed:", error);
    throw error;
  }
};