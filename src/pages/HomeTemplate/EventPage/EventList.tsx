import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

const events = [
  {
    id: 1,
    title: "Workshop: Xây dựng ứng dụng Full-stack với React & Node.js",
    description: "Học cách xây dựng một ứng dụng web hoàn chỉnh từ frontend đến backend. Workshop sẽ được hướng dẫn bởi các chuyên gia có kinh nghiệm thực tế.",
    date: "20/04/2024",
    time: "14:00 - 17:00",
    location: "CyberSoft Academy - Cơ sở Quận 3",
    participants: 45,
    maxParticipants: 50,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    status: "Sắp diễn ra",
    type: "Workshop"
  },
  {
    id: 2,
    title: "Hội thảo: Xu hướng công nghệ Frontend 2024",
    description: "Cập nhật những xu hướng mới nhất trong phát triển Frontend, từ React Server Components đến các framework mới nổi.",
    date: "25/04/2024",
    time: "9:00 - 12:00",
    location: "Online qua Zoom",
    participants: 120,
    maxParticipants: 200,
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=400&fit=crop",
    status: "Đang mở đăng ký",
    type: "Hội thảo"
  },
  {
    id: 3,
    title: "Meetup: Chia sẻ kinh nghiệm phỏng vấn IT",
    description: "Gặp gỡ và học hỏi kinh nghiệm từ những người đã thành công trong các buổi phỏng vấn tại các công ty lớn.",
    date: "15/04/2024",
    time: "18:30 - 20:30",
    location: "CyberSoft Academy - Cơ sở Quận 10",
    participants: 30,
    maxParticipants: 40,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
    status: "Còn chỗ",
    type: "Meetup"
  }
]

export default function EventList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Sắp diễn ra":
        return "bg-yellow-100 text-yellow-700"
      case "Đang mở đăng ký":
        return "bg-green-100 text-green-700"
      case "Còn chỗ":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Sự kiện sắp tới</h2>
        <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          <option>Tất cả sự kiện</option>
          <option>Workshop</option>
          <option>Hội thảo</option>
          <option>Meetup</option>
        </select>
      </div>

      {events.map((event) => (
        <article key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
          <div className="md:flex">
            <div className="md:w-2/5">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-3/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {event.type}
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                {event.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {event.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span>{event.participants}/{event.maxParticipants} người tham gia</span>
                </div>
              </div>
              
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Đăng ký tham gia
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}