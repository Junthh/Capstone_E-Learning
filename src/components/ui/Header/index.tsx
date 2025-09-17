import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, ChevronDown } from 'lucide-react'
import { getCategoriesApi} from '@/services/category.api'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesApi,
  })

  const handleCategoryClick = (maDanhMuc: string) => {
    navigate(`/danh-muc/${maDanhMuc}`)
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/tim-kiem?key=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
    }
  }

  const handleSearchInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={handleLogoClick}>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded transform rotate-45 mr-2"></div>
                <span className="text-xl font-bold text-gray-900">CYBERSOFT</span>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-700 hover:text-orange-500 transition-colors"
              >
                <span>Danh mục khóa học</span>
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <div className="py-2">
                      {categories.map(cat => (
                        <button
                          key={cat.maDanhMuc}
                          onClick={() => handleCategoryClick(cat.maDanhMuc)}
                          className="w-full text-left px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {cat.tenDanhMuc}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>

          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Tìm khóa học"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchInputKeyDown}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-orange-500 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden sm:inline-flex border-orange-500 text-orange-500 hover:bg-orange-50"
              onClick={() => navigate('/auth/register')}
            >
              Đăng ký
            </Button>
            <Button 
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => navigate('/auth/login')}
            >
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
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Tìm khóa học"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearchInputKeyDown}
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-orange-500 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>
          <div className="px-4 py-2 space-y-2">
            <div className="border border-gray-300 rounded-lg">
              <button
                className="w-full px-3 py-2 text-left text-gray-700 font-medium border-b border-gray-200"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Danh mục khóa học
              </button>
              {isDropdownOpen && (
                <div className="bg-gray-50">
                  {categories.map(cat => (
                    <button
                      key={cat.maDanhMuc}
                      onClick={() => handleCategoryClick(cat.maDanhMuc)}
                      className="w-full text-left px-6 py-2 text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                    >
                      {cat.tenDanhMuc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}