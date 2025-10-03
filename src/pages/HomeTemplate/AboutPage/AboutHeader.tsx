import { Button } from '@/components/ui/button'
import { ArrowLeft, Building2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function AboutHeader() {
  const navigate = useNavigate()

  return (
    <>
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-2 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
        </div>
      </div>

      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Building2 className="w-16 h-16 mb-4 text-yellow-400" />
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Về CyberSoft Academy
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                Hệ thống đào tạo lập trình chuyên sâu theo dự án thực tế, 
                cam kết đầu ra với tỷ lệ có việc làm cao nhất Việt Nam
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="CyberSoft Team"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}