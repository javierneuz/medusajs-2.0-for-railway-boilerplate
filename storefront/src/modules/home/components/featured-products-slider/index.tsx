import { HttpTypes } from "@medusajs/types"
import ProductSlider from "@modules/home/components/product-slider"

export default async function FeaturedProductsSlider({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  console.log("🎨 FeaturedProductsSlider - Total colecciones:", collections?.length)
  
  // Filtrar colecciones que tienen productos
  const collectionsWithProducts = collections.filter(
    (collection) => collection.products && collection.products.length > 0
  )

  console.log("🎨 Colecciones con productos:", collectionsWithProducts.length)
  collectionsWithProducts.forEach(col => {
    console.log(`  - ${col.title}: ${col.products?.length} productos`)
  })

  if (collectionsWithProducts.length === 0) {
    return (
      <div className="content-container py-8">
        <p className="text-center text-gray-600">No hay productos disponibles en este momento.</p>
      </div>
    )
  }

  return (
    <>
      {collectionsWithProducts.map((collection) => {
        const products = collection.products as HttpTypes.StoreProduct[]

        return (
          <div key={collection.id} className="bg-white rounded-lg shadow-sm">
            <ProductSlider
              products={products}
              region={region}
              title={collection.title || "Productos Destacados"}
              subtitle={`${products.length} productos disponibles`}
            />
          </div>
        )
      })}
    </>
  )
}
