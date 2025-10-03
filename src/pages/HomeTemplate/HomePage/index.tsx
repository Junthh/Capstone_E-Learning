import HeroSection from "./HeroSection"
import CoursesSection from "./CoursesSection"
import QuickLinks from "./QuickLinks"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <QuickLinks />
      <CoursesSection />
    </div>
  )
}