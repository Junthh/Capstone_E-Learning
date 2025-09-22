import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Loader2, BookOpen, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getUserCoursesApi, unregisterCourseApi } from '@/services/course.api'
import { useAuthStore } from '@/store/auth.store'
import CourseManagementContent from './CourseManagementContent'

export default function CourseManagementPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user } = useAuthStore()
  const [unregisteringCourse, setUnregisteringCourse] = useState<string | null>(null)

  // Call API lấy danh sách khóa học đã đăng ký
  const { data: userCourses, isLoading, error } = useQuery({
    queryKey: ['user-courses'],
    queryFn: getUserCoursesApi,
    enabled: !!user,
  })

  // Mutation hủy đăng ký khóa học
  const { mutate: unregisterCourse } = useMutation({
    mutationFn: unregisterCourseApi,
    onSuccess: () => {
      toast.success('Hủy đăng ký khóa học thành công!')
      queryClient.invalidateQueries({ queryKey: ['user-courses'] })
      setUnregisteringCourse(null)
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Hủy đăng ký khóa học thất bại!'
      toast.error(errorMessage)
      setUnregisteringCourse(null)
    },
  })

  const handleUnregisterCourse = (maKhoaHoc: string) => {
    if (!user) return
    if (window.confirm('Bạn có chắc chắn muốn hủy đăng ký khóa học này không?')) {
      setUnregisteringCourse(maKhoaHoc)
      unregisterCourse({ maKhoaHoc, taiKhoan: user.taiKhoan })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
        <p className="text-gray-600 text-lg font-medium">Đang tải danh sách khóa học...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex flex-col items-center">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
        <p className="text-gray-600 mb-4">Không thể tải danh sách khóa học. Vui lòng thử lại sau.</p>
      </div>
    )
  }

  const registeredCourses = userCourses?.chiTietKhoaHocGhiDanh || []

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
        </div>
      </div>

      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Quản lý khóa học</h1>
            <p className="text-xl text-orange-100">
              Theo dõi và quản lý các khóa học bạn đã đăng ký
            </p>
          </div>
        </div>
      </section>
      <CourseManagementContent
        courses={registeredCourses}
        onUnregister={handleUnregisterCourse}
        unregisteringCourse={unregisteringCourse}
      />
    </div>
  )
}
