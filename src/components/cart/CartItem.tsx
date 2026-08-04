import { FaTrashAlt } from "react-icons/fa"
import { useShoppingCart } from "../../contexts/shoppingCartContext"
import { formatCurrency  } from "../../utils/formatCurrency"
import { CartItemResponse } from "../../types/cart";




const CartItem = ({
    quantity,
    product,
    priceAtTime,
}: CartItemResponse) => {
  const { removeItemFromCart } = useShoppingCart();
 
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 ">
      <img src={product.imageUrl} className="w-auto h-36" alt={product.name} />
      
      <div className="flex justify-between items-center">
         <div className="mt-5 lg:mt-0">
            <div className="flex items-end">
              <p className="font-medium text-lg lg:text-2xl mr-1">{product.name}{' '}</p>
               {quantity > 1 && <span className="text-sm">{quantity}x</span>}
            </div>

           <div>{formatCurrency(priceAtTime)}</div>
         </div>
    

      <div className="font-semibold text-md lg:text-lg">{formatCurrency(priceAtTime * quantity)}</div>
     </div>
      <FaTrashAlt
        size={25}
        className="lg:ml-4 mt-5 border border-gray p-1"
        onClick={() => removeItemFromCart(product.id)}
      />
    </div>
  );
};

export default CartItem;
