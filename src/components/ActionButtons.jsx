import { ChevronDown, Filter, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { selectTotalItems } from "../redux/cartSlice";

const ActionButtons = ({ onFilterClick, onCartClick, filterOpen }) => {
  const totalItems = useSelector(selectTotalItems);

  return (
    <div className="fixed top-6 right-6 z-40 flex gap-3 items-center">
      <button
        onClick={onFilterClick}
        className="bg-white hover:bg-gray-50 text-gray-800 rounded-lg px-4 py-3 shadow-lg transition-all flex items-center gap-2 font-semibold border-2 border-purple-200"
      >
        <Filter className="w-5 h-5 text-purple-600" />
        Filters
        <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? "rotate-180" : ""}`} />
      </button>

      <button onClick={onCartClick} className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 relative">
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">{totalItems}</span>}
      </button>
    </div>
  );
};

export default ActionButtons;
