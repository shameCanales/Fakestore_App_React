import Button from "../UI/button";
import deleteIcon from '../assets/bin.png'

export default function CartItem({
  item,
  clickAdd,
  clickSubtract,
  clickDelete,
}) {
  return (
    <li className="mt-3 bg-stone-300 rounded-2xl flex justify-between items-center p-4">
      <div className="flex items-center">
        <img
          className="w-[60px] aspect-[4/3]"
          src={item.image}
          alt={item.title}
        />

        <div className="ml-5">
          <p className="montserrat-medium text-lg">{item.title}</p>
          <p className="montserrat-bold ">Price: {item.price}</p>
        </div>
      </div>

      <div className="flex justify-between items-center ">
        <div className="mr-5">
          <p className="montserrat-regular">Quantity: {item.quantity}</p>
          <p className="montserrat-extrabold">Total:{item.total}</p>
        </div>

        <div className="gap-2 flex ">
          <Button handleClick={clickAdd} label="+" />
          <Button handleClick={() => clickSubtract(item.id)} label="-" />
        </div>

        <div>
          <button className=" flex items-center poppins-medium mx-4 bg-red-600 text-stone-50 px-4 py-2 rounded-md" onClick={clickDelete}>
            <img src={deleteIcon} alt="Delete" className="w-5 h-5 inline-block mr-2" />
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}
