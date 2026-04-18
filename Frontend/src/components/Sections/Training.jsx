// src/components/Sections/GSTTrainingWebinarSection.jsx

import { FaChalkboardTeacher, FaVideo, FaBalanceScale, FaFileInvoice, FaGlobe, FaClock, FaCertificate } from 'react-icons/fa';

export default function GSTTrainingWebinarSection() {
  return (
    <section
      id="training"
      className="py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-sky-50"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Training &amp; Webinars
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-sky-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert-led training programs and informative webinars to help businesses 
            understand rules, compliance, filing, and best practices.
          </p>
        </div>

        {/* Training Programs */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-10 flex items-center justify-center gap-3">
            <FaChalkboardTeacher className="text-blue-600" />
            Our Training Programs
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaFileInvoice size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4"> Registration & Compliance</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Complete training on registration process, choosing between Regular and Composition Scheme, 
                documentation, and maintaining ongoing compliance.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaBalanceScale size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Return Filing & Reconciliation</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Hands-on training on how to file GSTR-1, GSTR-3B, GSTR-9, and perform accurate reconciliation 
                to avoid notices and penalties.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaGlobe size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Input Tax Credit (ITC) Mastery</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                In-depth session on claiming Input Tax Credit correctly, blocked credits, 
                reconciliation with GSTR-2A/2B, and latest rules.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-9 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100 group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaFileInvoice size={32} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Registration for E-commerce &amp; Export Businesses</h4>
              <p className="text-gray-600 leading-relaxed mb-6">
                Special training covering rules for online sellers, LUT filing, 
                zero-rated supplies, and export refunds.
              </p>
            </div>
          </div>
        </div>

        {/* Webinars Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-center text-gray-800 mb-10 flex items-center justify-center gap-3">
            <FaVideo className="text-sky-600" />
            Popular Webinars
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <FaVideo className="text-sky-600" size={28} />,
                title: "How to Register in 2026",
                desc: "Step-by-step guide for new registration with latest requirements and common mistakes to avoid."
              },
              {
                icon: <FaVideo className="text-sky-600" size={28} />,
                title: "Understanding Composition Scheme vs Regular Scheme",
                desc: "Clear comparison to help small businesses choose the right registration scheme."
              },
              {
                icon: <FaVideo className="text-sky-600" size={28} />,
                title: "Latest Registration Updates & Notifications",
                desc: "Monthly webinar covering recent changes, new rules, and important government notifications."
              },
              {
                icon: <FaVideo className="text-sky-600" size={28} />,
                title: "How to Handle Registration Notices Effectively",
                desc: "Practical tips on responding to registration notices, SCN, and avoiding penalties."
              },
              {
                icon: <FaCertificate className="text-sky-600" size={28} />,
                title: "Registration Basics for Beginners & Startups",
                desc: "Easy-to-understand session specially designed for new entrepreneurs and small businesses."
              }
            ].map((webinar, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-sky-100 group"
              >
                <div className="mb-6">
                  {webinar.icon}
                </div>
                <h4 className="font-semibold text-xl text-gray-900 mb-4 group-hover:text-sky-600 transition-colors">
                  {webinar.title}
                </h4>
                <p className="text-gray-600 text-[15.5px] leading-relaxed">
                  {webinar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}