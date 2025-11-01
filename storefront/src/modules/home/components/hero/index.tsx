"use client"

import { Heading } from "@medusajs/ui"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"

const Hero = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Redirigir a la página de búsqueda con el query
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="w-full">
      {/* Hero principal con buscador */}
      <div className="content-container py-8">
        <div className="flex flex-col gap-6">
          {/* Logo y título */}
          
          {/* Buscador prominente */}
          <div className="max-w-3xl mx-auto w-full">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos, marcas y más..."
                className="w-full px-6 py-4 rounded-lg shadow-lg border-2 border-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-800"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Categorías destacadas */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
            {[
              { name: "Suplementos", icon: "💊", search: "suplementos" },
              { name: "Proteínas", icon: "🥤", search: "proteinas" },
              { name: "Vitaminas", icon: "🌟", search: "vitaminas" },
              { name: "Snacks", icon: "🍪", search: "snacks" },
              { name: "Bebidas", icon: "🧃", search: "bebidas" },
              { name: "Ofertas", icon: "🔥", search: "ofertas" },
            ].map((category) => (
              <button
                key={category.name}
                onClick={() => router.push(`/search?q=${category.search}`)}
                className="bg-white hover:bg-gray-50 rounded-lg p-4 shadow-md transition-all hover:shadow-lg flex flex-col items-center gap-2 cursor-pointer"
              >
                <span className="text-3xl">{category.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Beneficios */}
      <div>
        <div className="content-container py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">🚚</span>
              <div>
                <p className="font-semibold text-gray-800">Envío gratis</p>
                <p className="text-sm text-gray-600">En compras desde $50</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">🔒</span>
              <div>
                <p className="font-semibold text-gray-800">Pago seguro</p>
                <p className="text-sm text-gray-600">Protección al comprador</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-3xl">↩️</span>
              <div>
                <p className="font-semibold text-gray-800">Devoluciones fáciles</p>
                <p className="text-sm text-gray-600">30 días para devolver</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
