import type { Course } from '@/interfaces/course.interface';
import api from './api';

export const getCourseListApi = async (): Promise<Course[]> => {
  try {
    const response = await api.get<Course[]>("/QuanLyKhoaHoc/LayDanhSachKhoaHoc");
    console.log("Course list:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get course list failed:", error);
    throw error;
  }
};