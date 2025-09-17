import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCoursesByCategoryApi } from '@/services/course.api'
import { getCategoriesApi } from '@/services/category.api'
import CourseCard from '../HomePage/CourseCard'
import { Loader2, BookOpen } from 'lucide-react'

export default function CategoryPage() {
  const { maDanhMuc } = useParams<{ maDanhMuc: string }>()
  const [categoryName, setCategoryName] = useState<string>('')

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
  })

  const { 
    data: courses = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['courses-by-category', maDanhMuc],
    queryFn: () => getCoursesByCategoryApi(maDanhMuc!),
    enabled: !!maDanhMuc,
  })

  // Lọc bỏ khóa học không có maKhoaHoc
  const filteredCourses = courses.filter(c => c.maKhoaHoc && c.maKhoaHoc.trim() !== '')

  useEffect(() => {
    if (categories && maDanhMuc) {
      const category = categories.find(cat => cat.maDanhMuc === maDanhMuc)
      setCategoryName(category?.tenDanhMuc || 'Danh mục không tồn tại')
    }
  }, [categories, maDanhMuc])

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
