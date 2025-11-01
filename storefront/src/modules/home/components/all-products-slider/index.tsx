import { HttpTypes } from "@medusajs/types"
import ProductSlider from "@modules/home/components/product-slider"
import { getProductsList } from "@lib/data/products"

export default async function AllProductsSlider({
  region,
  countryCode,
}: {
  region: HttpTypes.StoreRegion
  countryCode: string
}) {
  // Obtener todos los productos sin filtrar por colección
  const { response } = await getProductsList({
    queryParams: { limit: 50 },
    countryCode,
  })

  console.log("🛍️ AllProductsSlider - Total productos:", response.products.length)

  if (!response.products || response.products.length === 0) {
    return (
      <div className="content-container py-8">
        <p className="text-center text-gray-600">
          No hay productos disponibles. Verifica que el backend esté corriendo y tenga productos.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <ProductSlider
        products={response.products}
        region={region}
        title="Todos los Productos"
        subtitle={`${response.products.length} productos disponibles`}
      />
    </div>
  )
}
