import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import CourseCard from './CourseCard'
import { Button } from '@/components/ui/button'
import { getCourseListApi } from '@/services/course.api'  

export default function CoursesSection() {
  const [visibleCount, setVisibleCount] = useState(8) // số lượng hiển thị ban đầu sẽ là 8 khóa học

  // call api lấy danh sách khóa học
  const { data: courses = [] } = useQuery({
    queryKey: ['courses'],
    queryFn: getCourseListApi,
  })

  // lọc bỏ các khóa học có maKhoaHoc rỗng hoặc null
  const filteredCourses = courses.filter(course => course.maKhoaHoc && course.maKhoaHoc.trim() !== '')

  // hàm load thêm khóa học khi click vào xem thêm
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 8)
  }

  return (
    <section id="courses-section" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Các khóa học mới nhất
            </h2>
            <p className="text-gray-600">
              Khám phá những khóa học công nghệ hot nhất hiện tại
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.slice(0, visibleCount).map(course => (
            <CourseCard key={course.maKhoaHoc} course={course} />
          ))}
        </div>

        {visibleCount < filteredCourses.length && (
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={handleLoadMore}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 cursor-pointer"
            >
              Xem thêm khóa học
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
