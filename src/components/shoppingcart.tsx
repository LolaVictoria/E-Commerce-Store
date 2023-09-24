import { useShoppingCart  } from "../context/shoppingCartContext";
import CartItem from "./cartitem";
import { formatCurrency  } from "../utilities/formatCurrency"
import storeItems from "../database/products.json"

import { AiOutlineCloseSquare } from "react-icons/ai";
const ShoppingCart = () => {
  const  { closeCart,  isClose, cartItems} = useShoppingCart()
  
    return (
     <div className={
        isClose
          ? "bg-white fixed right-0 top-0 h-full w-full ease-in duration-500 py-6 px-5 overflow-hidden"
          : "fixed top-[-100%] "
        }>
    
       <div className="">
          <div onClick={closeCart}>
            <AiOutlineCloseSquare 
              size={40} 
              />
            <h3 className="text-[#2ECF5A] text-4xl font-bold text-center tracking-wider">Cart</h3>
          </div> 
        </div>

        <div className="w-auto">
          {cartItems.length === 0 ? <p>You have not added any item to cart</p> : <p>You </p>}
          {cartItems.map(item => (
             <CartItem key={item.id}{...item} />
          ))}

          <div className="py-5 font-bold text-xl">
              Total {" "} 
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0)  * cartItem.quantity}, 0)
              )}
          </div>
        </div>

       </div> 
    
    );
}
 
export default ShoppingCart;