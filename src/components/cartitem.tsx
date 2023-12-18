import { AiOutlineClose } from "react-icons/ai"
import { useShoppingCart } from "../context/shoppingCartContext"
import { formatCurrency  } from "../utilities/formatCurrency"
import storeItems from "../database/products.json"




type CartItemProps = {
  id: number
  quantity: number
}

const CartItem =({id, quantity} : CartItemProps) => {
  const { removeFromCart } = useShoppingCart(); // Replace with the actual function from your shopping cart library

  const item = storeItems.find(i => i.id === id) 
  if (item === undefined) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
      <img src={item.img} className="w-auto h-36" alt={item.title} />
      
      <div className="lg:flex  justify-between items-center">
         <div className="">
            <div className="flex items-end">
              <p className="font-medium text-2xl mr-1">{item.title}{' '}</p>
               {quantity > 1 && <span className="text-sm">{quantity}x</span>}
            </div>

           <div>{formatCurrency(item.price)}</div>
         </div>
    

      <div className="font-semibold text-lg">{formatCurrency(item.price * quantity)}</div>
     </div>
      <AiOutlineClose
        size={30}
        className="ml-4 border border-gray p-1"
        onClick={() => removeFromCart(id)}
      />
    </div>
  );
};

export default CartItem;
