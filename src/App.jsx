import { useEffect, useState } from "react";
import FilterPanel from "./components/FilterPanel";
import ProductGrid from "./components/ProductGrid";
import ErrorScreen from "./components/ErrorScreen";
import LoadingScreen from "./components/LoadingScreen";
import ActionButtons from "./components/ActionButtons";
import CartSidebar from "./components/CartSidebar";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    rating: "all",
    sortBy: "default",
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prev) => {
      const updatedItems = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + delta } : item
      );
      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const categories = [...new Set(products.map((p) => p.category))];

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.priceRange !== "all") {
      const ranges = {
        "under-20": [0, 20],
        "20-50": [20, 50],
        "50-100": [50, 100],
        "100-500": [100, 500],
        "500-1000": [500, 1000],
        "1000-2000": [1000, 2000],
        "over-2000": [2000, Infinity],
      };
      const [min, max] = ranges[filters.priceRange];
      filtered = filtered.filter((p) => p.price >= min && p.price < max);
    }

    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  const resetFilters = () => {
    setFilters({
      category: "all",
      priceRange: "all",
      rating: "all",
      sortBy: "default",
    });
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50">
      <ActionButtons
        onFilterClick={() => setFilterOpen(!filterOpen)}
        onCartClick={() => setCartOpen(true)}
        totalItems={getTotalItems()}
        filterOpen={filterOpen}
      />

      <FilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        categories={categories}
        onReset={resetFilters}
      />

      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
    </div>
  );
}

export default App;
