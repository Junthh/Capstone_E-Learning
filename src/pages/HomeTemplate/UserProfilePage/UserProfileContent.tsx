
import { Button } from '@/components/ui/button'
import { Loader2, User, Save, X } from 'lucide-react'
import type { UseFormRegister, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import type { UpdateFormInputs } from '.'
import { Input } from '@/components/ui/input'

interface Props {
  isEditing: boolean
  isUpdating: boolean
  userInfo: any
  register: UseFormRegister<UpdateFormInputs>
  errors: FieldErrors<UpdateFormInputs>
  handleSubmit: UseFormHandleSubmit<UpdateFormInputs>
  onSubmit: (data: UpdateFormInputs) => void
  onCancel: () => void
}

export default function UserProfileContent({
  isEditing,
  isUpdating,
  userInfo,
  register,
  errors,
  handleSubmit,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-6 py-8">
        {!isEditing ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Tài khoản" value={userInfo.taiKhoan} />
              <InfoField label="Họ và tên" value={userInfo.hoTen} />
              <InfoField label="Email" value={userInfo.email} />
              <InfoField label="Số điện thoại" value={userInfo.soDT} />
              <InfoField label="Loại người dùng" value={userInfo.maLoaiNguoiDung === 'HV' ? 'Học viên' : 'Giảng viên'} />
              <InfoField label="Mã nhóm" value={userInfo.maNhom} />
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Tài khoản" register={register('taiKhoan')} error={errors.taiKhoan?.message} disabled />
              <FormField label="Họ và tên" register={register('hoTen')} error={errors.hoTen?.message} />
              <FormField label="Email" type="email" register={register('email')} error={errors.email?.message} />
              <FormField label="Số điện thoại" register={register('soDT')} error={errors.soDT?.message} />
              <FormField label="Mật khẩu mới (để trống nếu không đổi)" type="password" register={register('matKhau')} error={errors.matKhau?.message} placeholder="Nhập mật khẩu mới" />
              <FormField label="Mã nhóm" register={register('maNhom')} error={errors.maNhom?.message} disabled />
            </div>
            <input type="hidden" {...register('maLoaiNguoiDung')} />
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isUpdating}>
                <X className="w-4 h-4 mr-2" /> Hủy
              </Button>
              <Button type="submit" disabled={isUpdating} className="bg-orange-500 hover:bg-orange-600 text-white">
                {isUpdating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {isUpdating ? 'Đang cập nhật...' : 'Lưu thay đổi'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

// field xem thông tin
function InfoField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
        {value}
      </div>
    </div>
  )
}

// field nhập form
function FormField({ 
  label, register, error, type = 'text', disabled = false, placeholder 
}: { 
  label: string
  register: any
  error?: string
  type?: string
  disabled?: boolean
  placeholder?: string
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input
        {...register}
        type={type}
        disabled={disabled}
        placeholder={placeholder || `Nhập ${label.toLowerCase()}`}
        className={`${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
