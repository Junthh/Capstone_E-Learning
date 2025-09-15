import { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getCourseListApi } from '@/services/course.api'  
import type { Course } from '@/interfaces/course.interface'

export default function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([])
  const [visibleCount, setVisibleCount] = useState(8) // số lượng hiển thị ban đầu sẽ là 8 khóa học

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourseListApi()
        setCourses(data)
      } catch (error) {
        console.error("Failed to fetch courses:", error)
      }
    }
    fetchCourses()
  }, [])

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
          
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full border-gray-300 hover:border-orange-500 hover:text-orange-500">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon" className="w-10 h-10 rounded-full border-gray-300 hover:border-orange-500 hover:text-orange-500">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.slice(0, visibleCount).map(course => (
            <CourseCard key={course.maKhoaHoc} course={course} />
          ))}
        </div>

        {visibleCount < courses.length && (
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={handleLoadMore}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
            >
              Xem thêm khóa học
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
