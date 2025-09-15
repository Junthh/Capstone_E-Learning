import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu } from 'lucide-react'
import { getCategoriesApi, type Category } from '@/services/category.api'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategoriesApi()
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    }
    fetchCategories()
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded transform rotate-45 mr-2"></div>
                <span className="text-xl font-bold text-gray-900">CYBERSOFT</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <select className="text-gray-700 bg-transparent border-none outline-none cursor-pointer">
              <option>Danh mục khóa học</option>
              {categories.map(cat => (
                <option key={cat.maDanhMuc} value={cat.maDanhMuc}>
                  {cat.tenDanhMuc}
                </option>
              ))}
            </select>
          </nav>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Tìm khóa học"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden sm:inline-flex border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              Đăng ký
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Đăng nhập
            </Button>
            
            <button 
              className="md:hidden p-2" 
              onClick={() => setIsMobileMenuOpen(prev => !prev)}
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-4 py-3">
            <div className="relative">
              <Input
                type="text"
                placeholder="Tìm khóa học"
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="px-4 py-2 space-y-2">
            <select className="w-full text-gray-700 bg-transparent border border-gray-300 rounded-lg px-3 py-2">
              <option>Danh mục khóa học</option>
              {categories.map(cat => (
                <option key={cat.maDanhMuc} value={cat.maDanhMuc}>
                  {cat.tenDanhMuc}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </header>
  )
}
