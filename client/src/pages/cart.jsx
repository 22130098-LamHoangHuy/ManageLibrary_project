import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { slugToNameMap } from "../utils/categoriesMap";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { fetchCart, updateQuantity, deleteCart } from "../redux/cartSlice";

export default function Cart() {
  //   const [carts, setCarts] = useState([]);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleIncrease = (bookId) => {
    const item = carts.find((i) => i.bookId === bookId);
    if (!item) return;

    const newQuantity = item.quantity + 1;
    dispatch(updateQuantity({ bookId, quantity: newQuantity }));
  };

  const handleDecrease = (bookId) => {
    const item = carts.find((i) => i.bookId === bookId);
    if (!item || item.quantity <= 1) return;

    const newQuantity = item.quantity - 1;
    dispatch(updateQuantity({ bookId, quantity: newQuantity }));
  };

  const handleDeleteCart = (bookId) => {
    dispatch(deleteCart(bookId));
    toast.success("Xóa thành công");
  };

  return (
    <div className="w-[65%] mx-auto p-4">
      {carts.map((item) => (
        <div
          key={item.bookId}
          className="flex items-center gap-4 p-4 mb-3 border rounded-lg shadow-sm bg-white"
        >
          <input type="checkbox" className="w-5 h-5" />

          <img
            src={item.coverImage}
            alt={item.title}
            className="w-17 object-cover rounded"
          />

          <div className="flex-[5]">
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              {slugToNameMap.get(item.category)} -{" "}
              {slugToNameMap.get(item.subCategory)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Còn lại: {item.stock}</p>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handleDecrease(item.bookId)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              -
            </button>
            <span className="w-7 text-center">{item.quantity}</span>
            <button
              onClick={() => handleIncrease(item.bookId)}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
            >
              +
            </button>
          </div>
          <div className="flex-[1] flex justify-center">
            <button
              className="hover: cursor-pointer flex justify-center"
              onClick={() => handleDeleteCart(item.bookId)}
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ))}

      {carts.length === 0 && (
        <div className="text-center text-gray-500">Giỏ hàng trống</div>
      )}
    </div>
  );
}
