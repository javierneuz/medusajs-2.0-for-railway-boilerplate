import { Text } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { getProductsById } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const [pricedProduct] = await getProductsById({
    ids: [product.id!],
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
  })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper" className="rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="relative">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
          />

          
          {/* Badge de descuento simulado */}
          {Math.random() > 0.5 && (
            <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
              {Math.floor(Math.random() * 30 + 10)}% OFF
            </div>
          )}
          {/* Badge de envío gratis */}
          {Math.random() > 0.6 && (
            <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
              Envío gratis
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <Text className="text-sm text-gray-600 mb-2 line-clamp-2 flex-grow" data-testid="product-title">
            {product.title}
          </Text>
          <div className="mt-auto">
            {cheapestPrice && (
              <div className="flex flex-col gap-1">
                <PreviewPrice price={cheapestPrice} />
                <p className="text-xs text-green-600 font-semibold">
                  ¡Último disponible!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  )
}
