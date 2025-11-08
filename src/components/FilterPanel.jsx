import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, selectFilters, setFilters } from "../redux/filterSlice";
import { selectProducts, setFilteredProducts } from "../redux/productSlice";
import { getFilteredAndSortedProducts } from "../utils/productFilters";

const FilterPanel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const filters = useSelector(selectFilters);

  const onReset = () => dispatch(resetFilters());
  const onFilterChange = (updated) => dispatch(setFilters(updated));

  const categories = [...new Set(products.map((p) => p.category))];

  useEffect(() => {
    const filtered = getFilteredAndSortedProducts(products, filters);
    dispatch(setFilteredProducts(filtered));
  }, [products, filters, dispatch]);

  return (
    <>
      {isOpen && (
        <div className="fixed top-24 right-6 z-40 bg-white rounded-lg shadow-2xl p-6 w-80 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Filters</h3>
            <button onClick={onReset} className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
              Reset All
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
            <select
              value={filters.priceRange}
              onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="all">All Prices</option>
              <option value="under-20">Under $20</option>
              <option value="20-50">$20 - $50</option>
              <option value="50-100">$50 - $100</option>
              <option value="100-500">$100 - $500</option>
              <option value="500-1000">$500 - $1000</option>
              <option value="1000-2000">$1000 - $2000</option>
              <option value="over-2000">Over $2000</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => onFilterChange({ ...filters, rating: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="all">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
              <option value="1">1+ Stars</option>
            </select>
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      )}

      {isOpen && <div onClick={onClose} className="fixed inset-0 z-30" />}
    </>
  );
};

export default FilterPanel;
