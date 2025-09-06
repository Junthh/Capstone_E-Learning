import { useAuthStore } from '@/store/auth.store'
import { Navigate, Outlet } from "react-router-dom"

export default function AuthTemplate() {
  const { user } = useAuthStore()
  
  if(user && user.maLoaiNguoiDung === 'GV'){
    return <Navigate to="/admin" />
  }

  if(user && user.maLoaiNguoiDung === 'HV'){
    return <Navigate to="/" />
  }

  
  return (
    <div>
      <h1>Header Của AuthTemplate</h1>
      <Outlet/>
      <footer>
        <p>Footer Của AuthTemplate</p>
      </footer>
      </div>
  )
}