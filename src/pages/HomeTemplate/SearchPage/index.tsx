import { useSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchCoursesApi } from '@/services/course.api'
import CourseCard from '../HomePage/CourseCard'
import { Loader2, BookOpen, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const query = searchParams.get('key') || ''
  // goi API tìm kiếm khóa học  
  const { 
    data: courses = [], 
    isLoading, 
    error
  } = useQuery({
    queryKey: ['search-courses', query],
    queryFn: () => searchCoursesApi(query),
    enabled: !!query,
  })
  // lọc kết quả có mã khóa học
  const filteredCourses = courses.filter(course => 
    course.maKhoaHoc &&
    course.maKhoaHoc.trim() !== '' &&
    course.tenKhoaHoc.toLowerCase().includes(query.toLowerCase())
  )

  // hàm quay về trang chủ
  const handleBackToHome = () => {
    navigate('/')
  }
  // lỗi hoặc không có kết quả
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex flex-col items-center">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
        <p className="text-gray-600 mb-4">Không thể tìm kiếm khóa học. Vui lòng thử lại sau.</p>
        <Button onClick={handleBackToHome} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Về trang chủ
        </Button>
      </div>
    )
  }
  // loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
        <p className="text-gray-600 text-lg font-medium">Đang tìm kiếm khóa học...</p>
      </div>
    )
  }
  // không có kết quả
  if (filteredCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 flex flex-col items-center">
        <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy khóa học nào</h2>
        <p className="text-gray-600 mb-4">
          Không có khóa học nào phù hợp với từ khóa "{query}". Hãy thử với từ khóa khác.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Gợi ý:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['React', 'Angular', 'Node.js', 'JavaScript', 'HTML CSS'].map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => navigate(`/tim-kiem?q=${suggestion}`)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </div>
    )
  }
  // có kết quả
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold">Kết quả tìm kiếm</h1>
          <p className="text-xl text-orange-100">
            Khám phá và học tập các khóa học chất lượng cao cùng CYBERSOFT
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Kết quả tìm kiếm</h2>
              <p className="text-gray-600 mt-1">
                Tìm thấy {filteredCourses.length} khóa học cho "{query}"
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.maKhoaHoc} course={course} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Không tìm thấy khóa học phù hợp? Thử tìm:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {['React', 'Angular', 'Node.js', 'JavaScript', 'HTML CSS', 'Frontend', 'Backend'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/tim-kiem?q=${suggestion}`)}
                  className="text-xs hover:bg-orange-50 hover:border-orange-300"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
