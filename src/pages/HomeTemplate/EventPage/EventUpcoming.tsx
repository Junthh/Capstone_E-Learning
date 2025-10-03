import { Calendar, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'

const upcomingEvents = [
  {
    id: 1,
    title: "Live Coding: Build a Todo App",
    date: "18/04/2024",
    time: "19:00",
    type: "Online"
  },
  {
    id: 2,
    title: "Tech Talk: AI trong lập trình",
    date: "22/04/2024",
    time: "14:00",
    type: "Offline"
  },
  {
    id: 3,
    title: "Hackathon: 24h Code Challenge",
    date: "28/04/2024",
    time: "08:00",
    type: "Hybrid"
  }
]

export default function EventUpcoming() {
  return (
    <div className="space-y-6">
      {/* Newsletter */}
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <Bell className="w-12 h-12 mb-4" />
        <h3 className="text-xl font-bold mb-2">Nhận thông báo sự kiện</h3>
        <p className="text-sm text-blue-100 mb-4">
          Đăng ký để nhận thông báo về các sự kiện mới nhất
        </p>
        <input 
          type="email"
          placeholder="Email của bạn"
          className="w-full px-4 py-2 rounded-lg text-gray-900 mb-3 focus:ring-2 focus:ring-white"
        />
        <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
          Đăng ký ngay
        </Button>
      </div>

      {/* Quick Events */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-500" />
          Sự kiện sắp tới
        </h3>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                </div>
                <span className="flex-shrink-0 text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-600 rounded">
                  {event.type}
                </span>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 border-blue-500 text-blue-600 hover:bg-blue-50">
          Xem tất cả sự kiện
        </Button>
      </div>

      {/* Past Events */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Sự kiện đã diễn ra
        </h3>
        <div className="space-y-3">
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            Workshop React Performance (10/03/2024)
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            Meetup JavaScript Lovers (05/03/2024)
          </button>
          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
            Tech Talk: Web3 & Blockchain (28/02/2024)
          </button>
        </div>
      </div>
    </div>
  )
}