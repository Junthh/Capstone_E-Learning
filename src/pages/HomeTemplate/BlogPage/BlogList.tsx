import { Calendar, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const blogPosts = [
  {
    id: 1,
    title: "10 Mẹo học React hiệu quả cho người mới bắt đầu",
    excerpt: "React là một trong những thư viện JavaScript phổ biến nhất hiện nay. Bài viết này sẽ chia sẻ 10 mẹo giúp bạn học React hiệu quả hơn...",
    author: "Nguyễn Văn A",
    date: "15/03/2024",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    category: "ReactJS"
  },
  {
    id: 2,
    title: "Tổng quan về TypeScript và lợi ích khi sử dụng",
    excerpt: "TypeScript đang ngày càng trở nên phổ biến trong cộng đồng JavaScript. Cùng tìm hiểu tại sao bạn nên sử dụng TypeScript trong dự án của mình...",
    author: "Trần Thị B",
    date: "12/03/2024",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop",
    category: "TypeScript"
  },
  {
    id: 3,
    title: "Cách tối ưu hiệu suất ứng dụng React",
    excerpt: "Hiệu suất là một yếu tố quan trọng trong phát triển ứng dụng web. Bài viết này sẽ hướng dẫn các kỹ thuật tối ưu hiệu suất cho ứng dụng React...",
    author: "Lê Văn C",
    date: "10/03/2024",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    category: "Performance"
  },
  {
    id: 4,
    title: "Giới thiệu về API và cách sử dụng Axios trong React",
    excerpt: "API là cầu nối giữa frontend và backend. Tìm hiểu cách sử dụng Axios để làm việc với API trong React một cách hiệu quả...",
    author: "Phạm Thị D",
    date: "08/03/2024",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
    category: "API"
  }
]

export default function BlogList() {
  return (
    <div className="space-y-8">
      {blogPosts.map((post) => (
        <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
          <div className="md:flex">
            <div className="md:w-2/5">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-3/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors cursor-pointer">
                {post.title}
              </h2>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                  Đọc thêm <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}