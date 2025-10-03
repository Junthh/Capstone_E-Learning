import EventHeader from './EventHeader'
import EventList from './EventList'
import EventUpcoming from './EventUpcoming'

export default function EventPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <EventHeader />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EventList />
            </div>
            <div className="lg:col-span-1">
              <EventUpcoming />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}