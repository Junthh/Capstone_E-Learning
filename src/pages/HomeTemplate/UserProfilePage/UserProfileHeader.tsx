
import { Button } from '@/components/ui/button'
import { User, Edit3, ArrowLeft } from 'lucide-react'

interface Props {
  isEditing: boolean
  onEdit: () => void
  onBack: () => void
}

export default function UserProfileHeader({ isEditing, onEdit, onBack }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="mb-2 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <User className="w-6 h-6 mr-3 text-orange-500" />
              Thông tin cá nhân
            </h1>
          </div>
          {!isEditing && (
            <Button
              onClick={onEdit}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Cập nhật thông tin
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
