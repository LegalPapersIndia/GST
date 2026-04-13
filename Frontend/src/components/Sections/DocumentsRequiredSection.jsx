// src/components/Sections/DocumentsRequiredSection.jsx

import pan from "../../Assest/Pan.jpg";
import aadhar from "../../Assest/aadhaar.jpg";
import photo from "../../Assest/profile.jpg";
import business from "../../Assest/Bussiness.webp";
import address from "../../Assest/address.webp";  

export default function DocumentsRequiredSection() {
  const documents = [
    {
      title: "PAN card of the owner",
      icon: pan,
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "Aadhar card of the owner",
      icon: aadhar,
      color: "from-indigo-600 to-blue-700",
    },
    {
      title: "Photograph of the owner",
      note: "(JPG format, maximum size – 100 KB)",
      icon: photo,
      color: "from-cyan-500 to-teal-600",
    },
    {
      title: "Details of Your Business",
      icon: business,
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: "Address proof",
      icon: address,
      color: "from-green-600 to-emerald-600",
    },
  ];

  return (
    <section id="documents" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-7xl">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-5 py-2 rounded-full mb-4">
            📋 REQUIRED DOCUMENTS
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Documents Required for<br />GST Registration
          </h2>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Keep these documents ready to complete your GST registration smoothly.
          </p>
        </div>

        {/* Documents Grid */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            
            {documents.map((doc, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Gradient Top Bar */}
                <div className={`h-2 bg-gradient-to-r ${doc.color}`} />

                <div className="p-8 pb-10 flex flex-col items-center text-center">
                  
                  {/* Icon */}
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center mb-7 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={doc.icon} 
                      alt={doc.title}
                      className="w-16 h-16 object-contain drop-shadow-sm" 
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-2">
                    {doc.title}
                  </h3>

                  {/* Note for Photograph */}
                  {doc.note && (
                    <p className="text-sm text-cyan-700 font-medium mt-1">
                      {doc.note}
                    </p>
                  )}
                </div>

                {/* Decorative bottom element */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4 rounded-full" />
              </div>
            ))}
          </div>

          {/* Optional subtle flow line for large screens */}
          <div className="hidden lg:block absolute top-[110px] left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-gray-200 to-transparent -z-10" />
        </div>

        {/* Bottom Note */}
        <div className="mt-14 text-center">
          <div className="inline-flex items-center gap-3 text-gray-600 bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-2xl">ℹ️</span>
            <p className="text-base">
              All documents must be clear, recent and in the prescribed digital format.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}