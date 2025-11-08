import { Package, ShoppingCart, Star, TrendingUp } from "lucide-react";

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group">
            <div className="relative overflow-hidden bg-gray-100 h-56">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain scale-90 group-hover:scale-100 transition-transform duration-300"
                />
                {product.discountPercentage > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        {product.discountPercentage.toFixed(0)}% OFF
                    </div>
                )}
                <div className="absolute top-3 left-3 bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold uppercase">
                    {product.category}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {product.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex items-center gap-1 mb-3">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
                    <span className="text-xs text-gray-500 ml-1">({product.reviews?.length || 0} reviews)</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className={`text-sm font-medium ${product.stock > 50 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div>
                        <div className="text-2xl font-bold text-purple-600">
                            ${product.price.toFixed(2)}
                        </div>
                        {product.discountPercentage > 0 && (
                            <div className="text-xs text-gray-500 line-through">
                                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-4 py-2 flex items-center gap-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        disabled={product.stock === 0}
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;