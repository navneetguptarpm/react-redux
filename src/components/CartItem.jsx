import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const onUpdateQuantity = (id, delta) => dispatch(updateQuantity({ id, delta }));
  const onRemove = (id) => dispatch(removeFromCart(id));

  return (
    <div className="bg-gray-50 rounded-lg p-4 flex gap-4">
      <img src={item.thumbnail} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">{item.title}</h3>
        <p className="text-purple-600 font-bold mt-1">${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button onClick={() => onUpdateQuantity(item.id, -1)} className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors">
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-gray-800 w-8 text-center">{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, 1)} className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
          <button onClick={() => onRemove(item.id)} className="ml-auto text-red-500 hover:text-red-700 transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
