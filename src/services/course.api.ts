import type { Course } from '@/interfaces/course.interface';
import api from './api';

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