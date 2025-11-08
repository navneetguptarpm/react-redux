import { ShoppingCart, X } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCartItems } from "../redux/cartSlice";
import CartItem from "./CartItem";

const CartSidebar = ({ isOpen, onClose }) => {
  const cartItems = useSelector(selectCartItems);

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <>
      <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="bg-purple-600 text-white p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <p className="text-purple-200 text-sm">{getTotalItems()} items</p>
            </div>
            <button onClick={onClose} className="hover:bg-purple-700 rounded-full p-2 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ShoppingCart className="w-20 h-20 mb-4" />
                <p className="text-lg">Your cart is empty</p>
                <p className="text-sm">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 font-semibold">Subtotal:</span>
                <span className="text-2xl font-bold text-purple-600">${getTotalPrice().toFixed(2)}</span>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors">Proceed to Checkout</button>
              <button onClick={onClose} className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors">
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>

      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-opacity-50 backdrop-blur-[2px] z-1" />}
    </>
  );
};

export default CartSidebar;
