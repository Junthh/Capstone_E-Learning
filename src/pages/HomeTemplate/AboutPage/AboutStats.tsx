import { Users, BookOpen, Award, Briefcase } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Học viên đã đào tạo",
    color: "text-blue-600"
  },
  {
    icon: BookOpen,
    value: "50+",
    label: "Khóa học chuyên sâu",
    color: "text-green-600"
  },
  {
    icon: Award,
    value: "95%",
    label: "Tỷ lệ có việc làm",
    color: "text-purple-600"
  },
  {
    icon: Briefcase,
    value: "200+",
    label: "Đối tác tuyển dụng",
    color: "text-orange-600"
  }
]

export default function AboutStats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}