import { Button } from '@/components/ui/button'
import { Users, Eye, Calendar, Star, User,  } from 'lucide-react'
import { useState } from 'react'
import NoImage from '@/assets/NoImage.png'
import type { Course } from '@/interfaces/course.interface'

export default function CourseHeader({ course }: { course: Course }) {
  const [imgSrc, setImgSrc] = useState(course.hinhAnh || NoImage)

  return (
    <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <div className="inline-block bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full mb-4">
              {course.danhMucKhoaHoc.tenDanhMucKhoaHoc}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              {course.tenKhoaHoc}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {course.moTa}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat icon={<Users />} value={course.soLuongHocVien} label="Học viên" />
            <Stat icon={<Eye />} value={course.luotXem?.toLocaleString()} label="Lượt xem" />
            <Stat icon={<Calendar />} value={course.ngayTao} label="Ngày tạo" />
            <Stat icon={<Star className="fill-current" />} value="4.8" label="Đánh giá" />
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <User className="w-5 h-5 mr-2 text-yellow-400" /> Giảng viên
            </h3>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-white">{course.nguoiTao.hoTen}</p>
                <p className="text-gray-400 text-sm">{course.nguoiTao.tenLoaiNguoiDung}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg">
              ĐĂNG KÝ NGAY
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
              XEM DEMO
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 shadow-2xl">
            <img
              src={imgSrc}
              alt={course.tenKhoaHoc}
              className="w-full h-64 object-cover rounded-lg shadow-lg"
              onError={() => setImgSrc(NoImage)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode, value: React.ReactNode, label: string }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-2 text-yellow-400">{icon}</div>
      <div className="text-2xl font-bold text-yellow-400">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  )
}
