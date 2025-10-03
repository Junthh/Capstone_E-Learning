import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function EventHeader() {
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

      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Sự kiện & Hội thảo</h1>
            <p className="text-xl text-blue-100">
              Tham gia các sự kiện công nghệ, hội thảo và workshop cùng CyberSoft
            </p>
          </div>
        </div>
      </section>
    </>
  )
}