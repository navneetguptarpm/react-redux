import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButtons from "./components/ActionButtons";
import CartSidebar from "./components/CartSidebar";
import ErrorScreen from "./components/ErrorScreen";
import FilterPanel from "./components/FilterPanel";
import LoadingScreen from "./components/LoadingScreen";
import ProductGrid from "./components/ProductGrid";
import { fetchProducts, selectProductsError, selectProductsLoading } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);

  const [cartOpen, setCartOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-pink-50">
      <ActionButtons onFilterClick={() => setFilterOpen(!filterOpen)} onCartClick={() => setCartOpen(true)} filterOpen={filterOpen} />

      <FilterPanel isOpen={filterOpen} onClose={() => setFilterOpen(false)} />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <ProductGrid />
    </div>
  );
}

export default App;
