import { Button } from '@/components/ui/button'
import { Star, Users, Clock } from 'lucide-react'
import type { Course } from '@/interfaces/course.interface'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoImage from '@/assets/NoImage.png'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  const [imgSrc, setImgSrc] = useState(course.hinhAnh)
  const navigate = useNavigate()

  // hàm xử lý khi click vào đăng ký khóa học sẽ nhảy sang trang chi tiết khóa học 
  const handleRegisterClick = () => {
    navigate(`/khoa-hoc/${course.maKhoaHoc}`)
  }

  // hiển thị thông tin từng khóa học
  return (
    <div 
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-300 cursor-pointer"
      onClick={handleRegisterClick}
    >
      <div className="relative">
        <img
          src={imgSrc}
          alt={course.tenKhoaHoc}
          className="w-full h-48 object-cover"
          onError={() => setImgSrc(NoImage)} 
        />

        <div className="absolute top-3 left-3">
          <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
            {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc || "Khóa học"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem] hover:text-orange-600 transition-colors">
          {course.tenKhoaHoc}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {course.nguoiTao?.hoTen || "Chưa có giảng viên"}
        </p>

        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-700 ml-2">4.5</span>
          <span className="text-sm text-gray-500 ml-1">(1000)</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{course.soLuongHocVien?.toLocaleString() || 0}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{course.ngayTao}</span>
          </div>
        </div>

        <Button 
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
          onClick={(e) => {
            e.stopPropagation() // ngăn chặn sự kiện click lan ra thẻ cha 
            handleRegisterClick()
          }}
        >
          ĐĂNG KÝ
        </Button>
      </div>
    </div>
  )
}