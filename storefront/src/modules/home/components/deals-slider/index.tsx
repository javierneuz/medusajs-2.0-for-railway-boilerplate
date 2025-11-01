"use client"

import { useRef, useState, useEffect, MouseEvent } from "react"
import Image from "next/image"

const DealsSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const deals = [
    {
      title: "Proteínas Premium",
      discount: "40% OFF",
      image: "🥤",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Vitaminas Esenciales",
      discount: "35% OFF",
      image: "💊",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Suplementos Deportivos",
      discount: "50% OFF",
      image: "💪",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Barras Energéticas",
      discount: "25% OFF",
      image: "🍫",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Bebidas Fitness",
      discount: "30% OFF",
      image: "🧃",
      color: "from-pink-500 to-pink-600",
    },
  ]

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging && sliderRef.current) {
        const nextIndex = (currentIndex + 1) % deals.length
        setCurrentIndex(nextIndex)
        
        const cardWidth = sliderRef.current.offsetWidth / Math.min(deals.length, 3)
        sliderRef.current.scrollTo({
          left: nextIndex * cardWidth,
          behavior: "smooth",
        })
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isDragging, deals.length])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return
    setIsDragging(true)
    setStartX(e.pageX - sliderRef.current.offsetLeft)
    setScrollLeft(sliderRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !sliderRef.current) return
    e.preventDefault()
    const x = e.pageX - sliderRef.current.offsetLeft
    const walk = (x - startX) * 2
    sliderRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div className="content-container py-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          ⚡ Ofertas Relámpago
          <span className="text-sm font-normal text-gray-600">- Termina en 6:23:45</span>
        </h3>
      </div>

      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {deals.map((deal, index) => (
          <div
            key={index}
            className="flex-none w-[300px] snap-start"
          >
            <div
              className={`bg-gradient-to-r ${deal.color} rounded-lg p-6 text-white h-full shadow-lg hover:shadow-xl transition-all cursor-pointer`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Hasta</p>
                  <p className="text-3xl font-bold">{deal.discount}</p>
                  <p className="text-lg mt-2">{deal.title}</p>
                </div>
                <div className="text-6xl opacity-80">{deal.image}</div>
              </div>
              <button className="mt-4 w-full bg-white text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Comprar ahora
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {deals.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              if (sliderRef.current) {
                const cardWidth = sliderRef.current.offsetWidth / Math.min(deals.length, 3)
                sliderRef.current.scrollTo({
                  left: index * cardWidth,
                  behavior: "smooth",
                })
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-yellow-500 w-6" : "bg-gray-300"
            }`}
            aria-label={`Ir a oferta ${index + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default DealsSlider
