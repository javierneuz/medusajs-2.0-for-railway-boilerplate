const OffersBanner = () => {
  return (
    <div className="content-container py-8">
      {/* Banner de ofertas */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white shadow-lg mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold mb-2">🔥 Ofertas del día</h2>
            <p className="text-lg">Hasta 50% de descuento en productos seleccionados</p>
          </div>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Ver todas las ofertas
          </button>
        </div>
      </div>

      {/* Tarjetas de beneficios adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <span className="text-5xl">🎁</span>
            <div>
              <h3 className="text-xl font-bold">Envío gratis</h3>
              <p className="text-sm">En miles de productos</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <span className="text-5xl">⭐</span>
            <div>
              <h3 className="text-xl font-bold">Mejores marcas</h3>
              <p className="text-sm">Productos garantizados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OffersBanner
