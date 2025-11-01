import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  return (
    <div className="content-container py-8 small:py-12">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
        <div>
          <Text className="text-2xl font-bold text-gray-800">{collection.title}</Text>
          <Text className="text-sm text-gray-600 mt-1">Los mejores productos seleccionados para ti</Text>
        </div>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          <span className="text-blue-600 hover:text-blue-700 font-semibold">Ver todos →</span>
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 large:grid-cols-5 gap-4 small:gap-6">
        {products &&
          products.map((product) => (
            <li key={product.id} className="group">
              {/* @ts-ignore */}
              <ProductPreview product={product} region={region} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  )
}
