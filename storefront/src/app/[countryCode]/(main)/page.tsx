import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import PromoBanner from "@modules/home/components/promo-banner"
import DealsSlider from "@modules/home/components/deals-slider"
import OffersBanner from "@modules/home/components/offers-banner"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Nutricell - Tu tienda de nutrición online",
  description:
    "Encuentra los mejores suplementos, proteínas y productos de nutrición al mejor precio.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  console.log("🌍 País solicitado:", countryCode)
  
  const region = await getRegion(countryCode)
  console.log("📍 Región encontrada:", region ? "Sí" : "No")
  
  const collections = await getCollectionsWithProducts(countryCode)
  console.log("📦 Colecciones encontradas:", collections ? collections.length : 0)

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">⚠️ Región no encontrada</h1>
          <p className="text-gray-600 mb-2">País solicitado: <strong>{countryCode}</strong></p>
          <p className="text-gray-600">Verifica que existe una región con este código de país en Medusa</p>
          <a href="/us" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded">
            Probar con /us
          </a>
        </div>
      </div>
    )
  }

  // Si no hay colecciones, mostrar todos los productos sin filtrar
  const hasCollections = collections && collections.length > 0

  return (
    <>
      <PromoBanner />

      <Hero />
      
      {/* Ofertas Relámpago */}
      <div className="bg-white py-4">
        <DealsSlider />
      </div>
      
      <OffersBanner />

      {hasCollections ? (
        // Mostrar productos por colección
        <div className="py-12">
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collections={collections} region={region} />
          </ul>
        </div>
      ) : (
        // Mostrar mensaje informativo si no hay colecciones
        <div className="py-12 bg-gray-50">
          <div className="content-container">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
              <div className="flex items-start">
                <span className="text-3xl mr-4">⚠️</span>
                <div>
                  <h3 className="text-lg font-bold text-yellow-800 mb-2">
                    No hay colecciones creadas
                  </h3>
                  <p className="text-yellow-700 mb-4">
                    Para ver productos organizados, crea colecciones en el admin de Medusa:
                  </p>
                  <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-2">
                    <li>Ve al admin de Medusa (http://localhost:9000/app)</li>
                    <li>Ve a Products → Collections</li>
                    <li>Crea una nueva colección (ej: Proteínas, Vitaminas)</li>
                    <li>Asigna productos a cada colección</li>
                    <li>Recarga esta página</li>
                  </ol>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Mientras tanto, aquí están todos los productos disponibles
            </h2>
          </div>
        </div>
      )}
    </>
  )
}