import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import CourseManagementCard from './CourseManagementCard'
import type { RegisteredCourse } from '@/interfaces/course.interface'
import { useNavigate } from 'react-router-dom'

interface Props {
  courses: RegisteredCourse[]
  onUnregister: (maKhoaHoc: string) => void
  unregisteringCourse: string | null
}

export default function CourseManagementContent({
  courses,
  onUnregister,
  unregisteringCourse
}: Props) {
  const navigate = useNavigate()

  if (courses.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="mb-4">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Chưa đăng ký khóa học nào
        </h2>
        <p className="text-gray-600 mb-6">
          Bạn chưa đăng ký khóa học nào. Hãy khám phá các khóa học của chúng tôi!
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Khám phá khóa học
        </Button>
      </div>
    )
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Khóa học đã đăng ký
            </h2>
            <p className="text-gray-600 mt-1">
              Bạn đã đăng ký {courses.length} khóa học
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseManagementCard 
              key={course.maKhoaHoc} 
              course={course}
              onUnregister={onUnregister}
              isUnregistering={unregisteringCourse === course.maKhoaHoc}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
