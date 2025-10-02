import { useAuthStore } from '@/store/auth.store'
import { Navigate, Outlet } from "react-router-dom"

export default function AuthTemplate() {
  const { user } = useAuthStore()
  
  if(user && user.maLoaiNguoiDung === 'GV'){
    return <Navigate to="/admin/user-management" />
  }

  if(user && user.maLoaiNguoiDung === 'HV'){
    return <Navigate to="/" />
  }

  
  return (
    <div>
      <Outlet/>
      </div>
  )
}