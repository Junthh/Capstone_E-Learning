import { FileText, Calendar, Info, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const links = [
  {
    title: "Blog & Kiến thức",
    description: "Chia sẻ kiến thức lập trình và kinh nghiệm",
    icon: FileText,
    path: "/blog",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Sự kiện & Hội thảo",
    description: "Tham gia các sự kiện công nghệ",
    icon: Calendar,
    path: "/su-kien",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "Về CyberSoft",
    description: "Tìm hiểu về chúng tôi",
    icon: Info,
    path: "/gioi-thieu",
    color: "from-orange-500 to-orange-600"
  }
]

export default function QuickLinks() {
  const navigate = useNavigate()

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {links.map((link, index) => {
            const Icon = link.icon
            return (
              <button
                key={index}
                onClick={() => navigate(link.path)}
                className="group relative overflow-hidden rounded-xl p-6 text-left transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-90 group-hover:opacity-100 transition-opacity`} />
                
                <div className="relative z-10 text-white">
                  <Icon className="w-10 h-10 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                  <p className="text-sm text-white/90 mb-4">{link.description}</p>
                  
                  <div className="flex items-center text-sm font-semibold">
                    <span>Tìm hiểu thêm</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}