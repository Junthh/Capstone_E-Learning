
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCoursesByCategoryApi } from '@/services/course.api'
import { getCategoriesApi } from '@/services/category.api'
import CourseCard from '../HomePage/CourseCard'
import { Loader2, BookOpen, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function CategoryPage() {
  const { maDanhMuc } = useParams<{ maDanhMuc: string }>()
  const navigate = useNavigate()
  // call api lấy danh sách danh mục khóa học 
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
  })
  // call api lấy danh sách khóa học theo danh mục
  const { 
    data: courses = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['courses-by-category', maDanhMuc],
    queryFn: () => getCoursesByCategoryApi(maDanhMuc!),
    enabled: !!maDanhMuc,
  })

  // LỌc bỏ khóa học không có maKhoaHoc
  const filteredCourses = courses.filter(c => c.maKhoaHoc && c.maKhoaHoc.trim() !== '')
  // cập nhật tên danh mục
  const categoryName = categories?.find(cat => cat.maDanhMuc === maDanhMuc)?.tenDanhMuc || 'Danh mục không tồn tại'
  // lỗi
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-4">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Có lỗi xảy ra</h2>
            <p className="text-gray-600">Không thể tải danh sách khóa học. Vui lòng thử lại sau.</p>
          </div>
        </div>
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
        </div>
      </div>
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              {categoryName || 'Đang tải...'}
            </h1>
            <p className="text-xl text-orange-100">
              Khám phá và học tập các khóa học chất lượng cao cùng CYBERSOFT
            </p>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
                <p className="text-gray-600 text-lg font-medium">
                  Đang tải khóa học...
                </p>
              </div>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-4">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Chưa có khóa học nào
              </h2>
              <p className="text-gray-600">
                Danh mục này hiện chưa có khóa học. Hãy quay lại sau nhé!
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Tất cả khóa học
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Tìm thấy {filteredCourses.length} khóa học
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.maKhoaHoc} course={course} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
