import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {  Calendar, Eye, Loader2, Star, Trash2 } from 'lucide-react'
import NoImage from '@/assets/NoImage.png'
import type { RegisteredCourse } from '@/interfaces/course.interface'

interface CourseManagementCardProps {
  course: RegisteredCourse
  onUnregister: (maKhoaHoc: string) => void
  isUnregistering: boolean
}

export default function CourseManagementCard({ course, onUnregister, isUnregistering }: CourseManagementCardProps) {
  const [imgSrc, setImgSrc] = useState(course.hinhAnh)

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-orange-300">
      <div className="relative">
        <img
          src={imgSrc}
          alt={course.tenKhoaHoc}
          className="w-full h-48 object-cover cursor-pointer"
          onError={() => setImgSrc(NoImage)}
        />
        <div className="absolute top-3 left-3">
          <div className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded flex items-center">
            <Star className="w-3 h-3 mr-1 fill-current" />
            {course.danhGia}
          </div>
        </div>
      </div>

      <div className="p-6">

        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {course.moTa}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            <span>{course.luotXem?.toLocaleString() || 0}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{new Date(course.ngayTao).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <p className="text-sm text-red-500 text-bold">Hủy khóa học</p>
          <Button 
            variant="outline"
            className="flex-shrink-0 border-red-500 text-red-500 hover:bg-red-50 disabled:opacity-50"
            onClick={() => onUnregister(course.maKhoaHoc)}
            disabled={isUnregistering}
            title="Hủy đăng ký khóa học"
          >
            {isUnregistering ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
