import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCourseDetailApi } from '@/services/course.api'
import { Loader2, BookOpen, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

import CourseHeader from './CourseHeader'
import CourseContent from './CourseContent'

export default function CourseDetailPage() {
  const { maKhoaHoc } = useParams<{ maKhoaHoc: string }>()
  const navigate = useNavigate()

  // call api lấy chi tiết khóa học dựa vào mã khóa học từ params 
  const { data: course, isLoading, error } = useQuery({
    queryKey: ['course-detail', maKhoaHoc],
    queryFn: () => getCourseDetailApi(maKhoaHoc!),
    enabled: !!maKhoaHoc,
  })

  // hiển thị thông báo lỗi nếu có lỗi xảy ra
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex flex-col items-center">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
        <p className="text-gray-600 mb-4">Không thể tải thông tin khóa học. Vui lòng thử lại sau.</p>
        <Button onClick={() => navigate(-1)} variant="outline">Quay lại</Button>
      </div>
    )
  }

  // hiển thị loader khi đang tải dữ liệu
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
        <p className="text-gray-600 mt-4">Đang tải thông tin khóa học...</p>
      </div>
    )
  }

  // hiển thị thông báo nếu không tìm thấy khóa học
  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy khóa học</h2>
        <p className="text-gray-600 mb-4">Khóa học này không tồn tại hoặc đã bị xóa.</p>
        <Button onClick={() => navigate('/')} variant="outline">Về trang chủ</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <nav className="text-sm text-gray-600">
            <span className="cursor-pointer hover:text-orange-500" onClick={() => navigate('/')}>
              Trang chủ
            </span>
            <span className="mx-2">/</span>
            <span 
              className="cursor-pointer hover:text-orange-500"
              onClick={() => navigate(`/danh-muc/${course.danhMucKhoaHoc.maDanhMucKhoahoc}`)}
            >
              {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{course.tenKhoaHoc}</span>
          </nav>
        </div>
      </div>
      <CourseHeader course={course} />
      <CourseContent course={course} />
    </div>
  )
}
