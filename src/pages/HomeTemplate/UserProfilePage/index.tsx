
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { getUserInfoApi, updateUserInfoApi } from '@/services/user.api'
import { useAuthStore } from '@/store/auth.store'
import type { UpdateUserRequest } from '@/interfaces/user.interface'
import UserProfileHeader from './UserProfileHeader'
import UserProfileContent from './UserProfileContent'

// schema validation
const updateSchema = z.object({
  taiKhoan: z.string().nonempty("Tài khoản không được để trống"),
  matKhau: z
    .string()
    .optional()
    .refine(val => !val || val.length >= 6, {
      message: "Mật khẩu tối thiểu 6 ký tự",
    }),
  hoTen: z.string().nonempty("Họ tên không được để trống"),
  soDT: z.string().nonempty("Số điện thoại không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  maLoaiNguoiDung: z.string(),
  maNhom: z.string(),
})

export type UpdateFormInputs = z.infer<typeof updateSchema>

export default function UserProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user: currentUser, setUser } = useAuthStore()

  // call api lấy thông tin user
  const { data: userInfo, isLoading, error } = useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfoApi,
    enabled: !!currentUser,
  })

  // sử dung mutation call api update
  const { mutate: updateUserInfo, isPending: isUpdating } = useMutation({
    mutationFn: (data: UpdateUserRequest) => updateUserInfoApi(data),
    onSuccess: (updatedUser) => {
      if (currentUser) {
        setUser({
          ...updatedUser,
          accessToken: currentUser.accessToken,
        })
      }
      queryClient.invalidateQueries({ queryKey: ['user-info'] })
      setIsEditing(false)
    },
  })

  // form
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UpdateFormInputs>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      taiKhoan: userInfo?.taiKhoan || '',
      matKhau: '',
      hoTen: userInfo?.hoTen || '',
      soDT: userInfo?.soDT || '',
      email: userInfo?.email || '',
      maLoaiNguoiDung: userInfo?.maLoaiNguoiDung || '',
      maNhom: userInfo?.maNhom || '',
    }
  })

  // reset form khi userInfo thay đổi
  useEffect(() => {
    if (userInfo) {
      reset({
        taiKhoan: userInfo.taiKhoan,
        matKhau: '',
        hoTen: userInfo.hoTen,
        soDT: userInfo.soDT,
        email: userInfo.email,
        maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
        maNhom: userInfo.maNhom,
      })
    }
  }, [userInfo, reset])

  const onSubmit = (data: UpdateFormInputs) => {
    const updateData: UpdateUserRequest = {
      ...data,
      matKhau: data.matKhau || userInfo?.matKhau || '',
    }
    updateUserInfo(updateData)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
        <p className="text-gray-600 text-lg font-medium">Đang tải thông tin cá nhân...</p>
      </div>
    )
  }

  if (error) {
    return <p className="text-center text-red-500">Lỗi tải dữ liệu user!</p>
  }

  if (!userInfo) {
    return <p className="text-center text-gray-600">Không tìm thấy thông tin user.</p>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <UserProfileHeader 
          isEditing={isEditing} 
          onEdit={() => setIsEditing(true)} 
          onBack={() => navigate(-1)} 
        />
        <UserProfileContent
          isEditing={isEditing}
          isUpdating={isUpdating}
          userInfo={userInfo}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    </div>
  )
}
