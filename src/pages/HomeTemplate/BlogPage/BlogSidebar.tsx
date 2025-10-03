import { Search, TrendingUp, Tag } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const popularPosts = [
  { id: 1, title: "Roadmap học Frontend từ Zero đến Hero", views: "2.5K" },
  { id: 2, title: "Top 10 thư viện React phổ biến nhất 2024", views: "1.8K" },
  { id: 3, title: "Cách làm việc hiệu quả với Git và GitHub", views: "1.5K" },
]

const categories = [
  { name: "ReactJS", count: 24 },
  { name: "JavaScript", count: 32 },
  { name: "TypeScript", count: 18 },
  { name: "NodeJS", count: 15 },
  { name: "CSS", count: 21 },
]

export default function BlogSidebar() {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Search className="w-5 h-5 mr-2 text-orange-500" />
          Tìm kiếm bài viết
        </h3>
        <div className="relative">
          <Input 
            type="text"
            placeholder="Nhập từ khóa..."
            className="pr-10"
          />
          <Button 
            size="sm"
            className="absolute right-1 top-1 bg-orange-500 hover:bg-orange-600"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-orange-500" />
          Bài viết phổ biến
        </h3>
        <div className="space-y-4">
          {popularPosts.map((post) => (
            <div key={post.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-semibold text-sm">
                {post.id}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 hover:text-orange-600 cursor-pointer line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{post.views} lượt xem</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2 text-orange-500" />
          Danh mục
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors"
            >
              <span>{category.name}</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}