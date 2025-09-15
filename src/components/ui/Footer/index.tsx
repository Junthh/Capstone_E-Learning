import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Academy1 from '@/assets/academy1.jpg'
import Academy2 from '@/assets/academy2.jpg'
import Academy3 from '@/assets/academy3.jpg'
import Academy4 from '@/assets/academy4.jpg'

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded transform rotate-45 mr-2"></div>
              <span className="text-xl font-bold">CYBERSOFT</span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              CyberSoft Academy - Hệ thống đào tạo lập trình chuyên sâu theo dự án thực tế.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p>📍 Cơ sở 1: 376 Võ Văn Tần - Quận 3</p>
              <p>📍 Cơ sở 2: 459 Sư Vạn Hạnh - Quận 10</p>
              <p>📍 Cơ sở 3: 348/2 D1 Phạm Hùng - Quận 8</p>
              <p>📍 Cơ sở 4: 12A Nguyễn Văn Bảo - Gò Vấp</p>
              <p>📞 096 105 1014 - 098 407 5835</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Khóa học</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Lập trình Front End</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Lập trình React JS</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Lập trình React Native</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Lập trình Angular</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Lập trình Node JS</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Lập trình Backend</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Học lập trình trực tuyến</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Nhận tin sự kiện & khuyến mãi</h3>
            <p className="text-gray-300 text-sm mb-4">
              CyberSoft sẽ gửi các khóa học trực tuyến & các chương trình CyberLive miễn phí
            </p>
            <div className="space-y-3">
              <Input 
                placeholder="Họ và tên *"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
              />
              <Input 
                placeholder="Email liên hệ *"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
              />
              <Input 
                placeholder="Điện thoại liên hệ *"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                ĐĂNG KÝ TƯ VẤN
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">CyberSoft Academy</h3>
            <div className="grid grid-cols-2 gap-2">
              <img
                src={Academy1}
                alt="Academy 1"
                className="h-20 w-full object-cover rounded-lg"
              />
              <img
                src={Academy2}
                alt="Academy 2"
                className="h-20 w-full object-cover rounded-lg"
              />
              <img
                src={Academy3}
                alt="Academy 3"
                className="h-20 w-full object-cover rounded-lg"
              />
              <img
                src={Academy4}
                alt="Academy 4"
                className="h-20 w-full object-cover rounded-lg"
              />
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p>📧 Góp ý:</p>
              <p>🌐 Anh ngữ giao tiếp - Khởi động</p>
              <p>📱 Anh ngữ giao tiếp - Bài mẫy ăn ngày giao tiếp</p>
              <p>📚 Anh ngữ giao tiếp - Lấy đà</p>
              <p>💼 Anh ngữ giao tiếp - Thực chiến</p>
              <p>🎯 Chương trình học giao tiếp - Tập 1</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CyberSoft Academy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="https://www.facebook.com/lophocviet/" className="text-gray-400 hover:text-orange-500 transition-colors" target="_blank">
                <div className="w-8 h-8 bg-blue-600 rounded items-center justify-center flex">
                  <FontAwesomeIcon icon={faFacebook} size="lg" />
                </div>
              </a>
              <a href="https://www.youtube.com/channel/UCWc3ASTJcb0FeO2oFfX8IDQ" className="text-gray-400 hover:text-orange-500 transition-colors" target="_blank">
                <span className="sr-only">YouTube</span>
                <div className="w-8 h-8 bg-red-600 rounded items-center justify-center flex">
                  <FontAwesomeIcon icon={faYoutube} size="lg" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}