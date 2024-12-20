import { FaTrashAlt } from "react-icons/fa"
import { useShoppingCart } from "../context/shoppingCartContext"
import { formatCurrency  } from "../utilities/formatCurrency"
import { useProduct } from "../context/productContext"


type CartItemProps = {
  id: string
  quantity: number
}

const CartItem =({id, quantity} : CartItemProps) => {
  const { removeItemFromCart } = useShoppingCart(); 
  const { products } = useProduct()
  const item = products.find(i => i.id === id) 
  if (item === undefined) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
      <img src={item.image} className="w-auto h-36" alt={item.name} />
      
      <div className="flex justify-between items-center">
         <div className="mt-5 lg:mt-0">
            <div className="flex items-end">
              <p className="font-medium text-lg lg:text-2xl mr-1">{item.name}{' '}</p>
               {quantity > 1 && <span className="text-sm">{quantity}x</span>}
            </div>

           <div>{formatCurrency(item.price)}</div>
         </div>
    

      <div className="font-semibold text-md lg:text-lg">{formatCurrency(item.price * quantity)}</div>
     </div>
      <FaTrashAlt
        size={25}
        className="lg:ml-4 mt-5 border border-gray p-1"
        onClick={() => removeItemFromCart(id)}
      />
    </div>
  );
};

export default CartItem;
