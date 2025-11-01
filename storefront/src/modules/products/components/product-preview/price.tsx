import { Text, clx } from "@medusajs/ui"
import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <div className="flex flex-col gap-1">
      {price.price_type === "sale" && (
        <Text
          className="line-through text-gray-400 text-xs"
          data-testid="original-price"
        >
          {price.original_price}
        </Text>
      )}
      <div className="flex items-baseline gap-1">
        <Text
          className={clx("text-2xl font-semibold", {
            "text-gray-800": price.price_type !== "sale",
            "text-green-600": price.price_type === "sale",
          })}
          data-testid="price"
        >
          {price.calculated_price}
        </Text>
        {price.price_type === "sale" && (
          <span className="text-xs text-green-600 font-semibold">
            {Math.floor(((parseFloat(price.original_price?.replace(/[^0-9.-]+/g,"") || "0") - parseFloat(price.calculated_price?.replace(/[^0-9.-]+/g,"") || "0")) / parseFloat(price.original_price?.replace(/[^0-9.-]+/g,"") || "1") * 100))}% OFF
          </span>
        )}
      </div>
    </div>
  )
}
