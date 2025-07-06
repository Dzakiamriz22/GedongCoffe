import Image from "next/image"
import { ShoppingCart, Star, Coffee } from "lucide-react"

const ProductCard = ({ product }) => {
  const handleOrderNow = () => {
    // Handle order functionality here
    console.log(`Ordering ${product.name}`)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Product Image */}
      <div className="h-56 relative overflow-hidden">
        <Image 
          src={product.imageUrl || "/home-user/Home Image.png"} 
          alt={product.name} 
          fill 
          className="object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {/* Overlay with coffee icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-4 right-4">
            <Coffee className="w-6 h-6 text-white" />
          </div>
        </div>
        
        {/* Badge for featured products */}
        {product.featured && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
          {product.name}
        </h3>
        
        {/* Product Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
        
        {/* Rating (if available) */}
        {product.rating && (
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.rating})</span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl font-bold text-amber-700">
            Rp {product.price?.toLocaleString('id-ID')}
          </div>
          {product.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              Rp {product.originalPrice.toLocaleString('id-ID')}
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <button 
          onClick={handleOrderNow}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="w-5 h-5" />
          <span>Order Now</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard