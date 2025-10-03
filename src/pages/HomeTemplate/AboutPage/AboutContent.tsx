import { Target, Eye, Heart, Users, MapPin, Phone, Mail } from 'lucide-react'

const values = [
  {
    icon: Target,
    title: "Sứ mệnh",
    description: "Đào tạo nguồn nhân lực IT chất lượng cao, đáp ứng nhu cầu thực tế của doanh nghiệp và thị trường công nghệ."
  },
  {
    icon: Eye,
    title: "Tầm nhìn",
    description: "Trở thành hệ thống đào tạo lập trình hàng đầu Việt Nam, tiên phong trong đổi mới phương pháp giảng dạy."
  },
  {
    icon: Heart,
    title: "Giá trị cốt lõi",
    description: "Chất lượng - Uy tín - Cam kết đầu ra - Học thực hành - Dự án thực tế - Hỗ trợ việc làm trọn đời."
  }
]

const locations = [
  {
    name: "Cơ sở 1 - Quận 3",
    address: "376 Võ Văn Tần, Phường 5, Quận 3, TP.HCM",
    phone: "096 105 1014"
  },
  {
    name: "Cơ sở 2 - Quận 10",
    address: "459 Sư Vạn Hạnh, Phường 12, Quận 10, TP.HCM",
    phone: "098 407 5835"
  },
  {
    name: "Cơ sở 3 - Quận 8",
    address: "348/2 D1 Phạm Hùng, Phường 4, Quận 8, TP.HCM",
    phone: "096 105 1014"
  },
  {
    name: "Cơ sở 4 - Gò Vấp",
    address: "12A Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP.HCM",
    phone: "098 407 5835"
  }
]

export default function AboutContent() {
  return (
    <>
      {/* About Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Câu chuyện của chúng tôi
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  CyberSoft Academy được thành lập năm 2016 với sứ mệnh đào tạo nguồn nhân lực 
                  IT chất lượng cao cho thị trường Việt Nam. Khởi đầu từ một lớp học nhỏ với 20 
                  học viên, chúng tôi đã không ngừng phát triển và mở rộng.
                </p>
                <p>
                  Sau 8 năm hoạt động, CyberSoft đã đào tạo hơn 10,000 học viên với tỷ lệ có 
                  việc làm lên đến 95%. Chúng tôi tự hào là đối tác đào tạo của hơn 200 doanh 
                  nghiệp IT hàng đầu tại Việt Nam.
                </p>
                <p>
                  Phương pháp đào tạo của CyberSoft tập trung vào thực hành và dự án thực tế, 
                  giúp học viên có thể làm việc ngay sau khi tốt nghiệp. Đội ngũ giảng viên 
                  của chúng tôi đều là những chuyên gia có nhiều năm kinh nghiệm trong ngành.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=300&fit=crop"
                alt="Team work"
                className="rounded-lg shadow-md"
              />
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=300&fit=crop"
                alt="Learning"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-xl text-gray-600">
              Những giá trị định hướng mọi hoạt động của CyberSoft
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Tại sao chọn CyberSoft?
            </h2>
            <p className="text-xl text-orange-100">
              6 lý do khiến học viên tin tưởng lựa chọn chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Đào tạo theo dự án thực tế",
              "Giảng viên giàu kinh nghiệm",
              "Cam kết đầu ra việc làm",
              "Hỗ trợ học phí linh hoạt",
              "Cộng đồng học viên lớn mạnh",
              "Cập nhật công nghệ mới nhất"
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-white font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Đội ngũ của chúng tôi
            </h2>
            <p className="text-xl text-gray-600">
              Những người đứng sau thành công của CyberSoft
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Nguyễn Văn A", role: "CEO & Founder", image: "https://i.pravatar.cc/300?img=12" },
              { name: "Trần Thị B", role: "CTO", image: "https://i.pravatar.cc/300?img=45" },
              { name: "Lê Văn C", role: "Head of Education", image: "https://i.pravatar.cc/300?img=33" },
              { name: "Phạm Thị D", role: "Marketing Director", image: "https://i.pravatar.cc/300?img=47" }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <MapPin className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hệ thống cơ sở
            </h2>
            <p className="text-xl text-gray-600">
              4 cơ sở tại TP. Hồ Chí Minh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {location.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <p>{location.address}</p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                    <p>{location.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-3xl font-bold mb-4">
            Bạn muốn tìm hiểu thêm về CyberSoft?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Liên hệ với chúng tôi để được tư vấn chi tiết về các khóa học và lộ trình phù hợp
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:0961051014"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black font-semibold px-8 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Gọi ngay: 096 105 1014
            </a>
            <a 
              href="mailto:info@cybersoft.edu.vn"
              className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email: info@cybersoft.edu.vn
            </a>
          </div>
        </div>
      </section>
    </>
  )
}