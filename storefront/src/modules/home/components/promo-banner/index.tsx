"use client"

import { useState } from "react"

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const promos = [
    {
      title: "Descuento hasta 40%",
      subtitle: "En suplementos deportivos",
      bg: "bg-gradient-to-r from-orange-400 to-red-500",
    },
    {
      title: "Envío gratis",
      subtitle: "En compras mayores a $50",
      bg: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    {
      title: "Nuevos productos",
      subtitle: "Descubre nuestra línea premium",
      bg: "bg-gradient-to-r from-purple-400 to-pink-500",
    },
  ]

  return (
    <div className="py-4">
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {promos.map((promo, index) => (
            <div
              key={index}
              className={`min-w-full ${promo.bg} p-12 text-white flex flex-col items-center justify-center`}
            >
              <h2 className="text-4xl font-bold mb-2">{promo.title}</h2>
              <p className="text-xl">{promo.subtitle}</p>
              <button className="mt-6 bg-white text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Comprar ahora
              </button>
            </div>
          ))}
        </div>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Flechas de navegación */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? promos.length - 1 : prev - 1))}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
          aria-label="Slide anterior"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev === promos.length - 1 ? 0 : prev + 1))}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
          aria-label="Slide siguiente"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default PromoBanner
