import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onAddToCart }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold text-gray-800 mb-3">Our Products</h1>
                <p className="text-gray-600 text-lg">Discover amazing deals on quality products</p>
                <p className="text-purple-600 font-semibold mt-2">{products.length} products found</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={onAddToCart}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductGrid