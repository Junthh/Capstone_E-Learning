
import { Outlet } from "react-router-dom" 
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export default function HomeTemplate() {
  return (
    <div >
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
