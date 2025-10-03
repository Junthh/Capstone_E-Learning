import AboutHeader from './AboutHeader'
import AboutContent from './AboutContent'
import AboutStats from './AboutStats'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHeader />
      <AboutStats />
      <AboutContent />
    </div>
  )
}