import { useParams } from "react-router-dom"
import ProductImgDispaly from "../components/productimgcarousel";
import {useShoppingCart} from "../context/shoppingCartContext";
import storeItems from "../database/products.json"

//import {ShoppingCartProvider} from "../context/shoppingCartContext";

import { HiOutlineShoppingCart } from "react-icons/hi";
import Navbar from "../components/navbar";
type ProductDetails = {
    id: number;
    title: string;
    price: number;
    img: string;
    category: string
    // Add other properties as needed
  };

  type ProductDetailsProps = {
    products: ProductDetails[] | null;
    quantity: number
  };
const ProductDetails: React.FC<ProductDetailsProps> = () => {
    
    const {id} = useParams()
   
const {
  getItemQuantity,
  increaseCartQuantity,
  decreaseCartQuantity,
  removeFromCart
} = useShoppingCart()

const product = storeItems.find((item) => item.id === Number(id));

if (!product) {
  return <div>Product Not Found</div>;
}

    const quantity = getItemQuantity(Number(id));

    return (
    <div>
       <Navbar/>
        
      <div className="mt-5 grid grid-cols-1 place-items-center">
        <h1 className="font-bold text-xl">Product Details - {id}</h1>

          <div className="">
            <ProductImgDispaly/>
          </div>

          

          <div className="w-96 46">
            <div className="flex justify-between">
              <p>Category:</p> 
              <p>{product.category}</p>
            </div>

              <div className="flex justify-between">
                <p>Title:</p> 
                <p>{product.title}</p>
              </div>

              
            </div>
            
          

            <div className="bg-[#181818] p-6 w-full mt-24 flex justify-center items-center fixed bottom-0">
                
                <div className="w-96 flex justify-between items-center">
                  <button className="bg-[#2ECF5A] w-40 text-center py-2 flex items-center justify-center rounded-lg">Add to favorites</button>
                
                    {quantity === 0 ? (
                    <button 
                      onClick={() => increaseCartQuantity(Number(id))}
                      className="bg-[#2ECF5A] w-40 text-center py-2 flex items-center justify-center rounded-lg">
                      Add to Cart <HiOutlineShoppingCart size={20}/>
                    </button>) :
                    <div className="flex flex-col items-center">
                      <div className="flex w-40 py-1">
                       <button 
                          onClick={() => decreaseCartQuantity(Number(id))}
                          className="bg-[#fff] w-[20%] rounded-l-lg">-</button> 
                       <div className="bg-[#2ECF5A] w-[60%] text-center py-1 flex items-center justify-center">
                          <span>{quantity}</span> in cart
                       </div>
                       <button 
                       onClick={() => increaseCartQuantity(Number(id))}
                       className="bg-[#fff] w-[20%] rounded-r-lg">+</button>
                      </div>
                       <button 
                       onClick={() => removeFromCart(Number(id))}
                       className="bg-[#fff] w-20 py-1 text-center rounded-b-lg">Remove</button>
                    </div>
                  
                    }
                
              </div>
            </div>
      </div>
      </div>
    );
}
 
export default ProductDetails;
        
        