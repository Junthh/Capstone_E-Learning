import api from './api'

export interface Category {
  maDanhMuc: string
  tenDanhMuc: string
}

export const getCategoriesApi = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>('/QuanLyKhoaHoc/LayDanhMucKhoaHoc')
    console.log('Categories:', response.data)
    return response.data
  } catch (error) {
    console.error('Get categories failed:', error)
    throw error
  }
}
