import { BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Course } from '@/interfaces/course.interface'

export default function CourseContent({ course }: { course: Course }) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Nội dung chính */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-orange-500" />
              Giới thiệu khóa học
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {course.moTa}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Bạn sẽ học được gì?</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✅ Nắm vững kiến thức cơ bản và nâng cao</li>
                <li>✅ Thực hành với các dự án thực tế</li>
                <li>✅ Được hướng dẫn bởi giảng viên giàu kinh nghiệm</li>
                <li>✅ Nhận chứng chỉ hoàn thành khóa học</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin khóa học</h3>
            <div className="space-y-4">
              <Info label="Mã khóa học:" value={course.maKhoaHoc} />
              <Info label="Alias:" value={course.biDanh} />
              <Info label="Nhóm:" value={course.maNhom} />
              <Info label="Ngày tạo:" value={course.ngayTao} />
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Đăng ký ngay hôm nay!</h3>
            <p className="text-orange-700 mb-4">
              Tham gia cùng {course.soLuongHocVien} học viên khác và bắt đầu hành trình học tập của bạn.
            </p>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
              ĐĂNG KÝ NGAY
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Info({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
