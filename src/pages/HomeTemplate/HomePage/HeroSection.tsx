import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'

export default function HeroSection() {

  // hàm scroll đến phần khóa học khi click vào xem khóa học
  const handleScrollToCourses = () => {
    const coursesSection = document.getElementById("courses-section")
    if (coursesSection) {
      coursesSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // phần banner trang chủ
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 border border-yellow-400 rounded-full"></div>
        <div className="absolute top-40 right-32 w-64 h-64 border border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-yellow-400 rounded-full"></div>
        
        <div className="absolute top-32 left-1/4 text-green-400 opacity-30">⚛️</div>
        <div className="absolute top-60 right-1/4 text-blue-400 opacity-30">🔧</div>
        <div className="absolute bottom-40 right-1/3 text-yellow-400 opacity-30">⚡</div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                KHỞI ĐẦU
                <span className="block text-yellow-400">SỰ NGHIỆP</span>
                <span className="block">CỦA BẠN</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Trở thành lập trình viên 
                <br />
                chuyên nghiệp tại CyberSoft
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg"
                onClick={handleScrollToCourses}
              >
                Xem khóa học
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white text-black hover:bg-gray-400 font-semibold px-8 py-4 text-lg"
                onClick={() => window.open("https://www.facebook.com/messages/t/231169113737422", "_blank")}
              >
                Tư vấn học
              </Button>

            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 shadow-2xl">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-yellow-400 flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                          style={{
                            top: '6px',
                            left: '50%',
                            transform: `rotate(${i * 30}deg) translateX(-50%)`,
                            transformOrigin: '50% 58px'
                          }}
                        />
                      ))}
                    </div>
                    
                    <button className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors group">
                      <Play className="w-6 h-6 text-black ml-1 group-hover:scale-110 transition-transform" />
                    </button>
                    
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <p className="text-yellow-400 text-sm font-semibold whitespace-nowrap">
                        CHỌN LỚP TRÌNH
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">5000+</div>
                  <div className="text-sm text-gray-400">Học viên</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">100+</div>
                  <div className="text-sm text-gray-400">Khóa học</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">95%</div>
                  <div className="text-sm text-gray-400">Có việc làm</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  )
}