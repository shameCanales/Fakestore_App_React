import Button from "../UI/Button";
import deleteIcon from "../assets/bin.png";

interface CartItemProps {
  item: {
    id: number;
    title: string;
    price: number;
    image?: string;
    quantity: number;
    total: number;
  };
  clickAdd: () => void;
  clickSubtract: (id: number) => void;
  clickDelete: () => void;
}

export default function CartItem({
  item,
  clickAdd,
  clickSubtract,
  clickDelete,
}: CartItemProps) {
  return (
    <li className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm transition hover:shadow-md">
      <div className="flex items-center w-full sm:w-auto gap-4">
        <img
          className="w-20 h-16 object-cover rounded-lg bg-gray-100"
          src={item.image}
          alt={item.title}
        />
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-base text-gray-900 line-clamp-1">
            {item.title}
          </p>
          <p className="text-sm text-gray-500">₱{item.price}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-between">
        <div className="flex flex-col items-center sm:items-end gap-1 min-w-[90px]">
          <p className="text-xs text-gray-500">
            Quantity:{" "}
            <span className="font-medium text-gray-800">{item.quantity}</span>
          </p>
          <p className="text-xs text-gray-500">
            Total:{" "}
            <span className="font-semibold text-blue-700">₱{item.total}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button handleClick={clickAdd} label="+" />
          <Button handleClick={() => clickSubtract(item.id)} label="-" />
        </div>

        <button
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium transition-colors"
          onClick={clickDelete}
        >
          <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>
    </li>
  );
}
