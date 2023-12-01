import { useNavigate, useParams } from "react-router-dom"
//import ProductImgDispaly from "../components/productimgcarousel";
import {useShoppingCart} from "../context/shoppingCartContext";
import storeItems from "../database/products.json"
import { formatCurrency } from "../utilities/formatCurrency"
import FavoriteIcon from "/public/assets/img/icons/favorite-icon.png"
import { HiOutlineShoppingCart } from "react-icons/hi";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { AiOutlineCloseSquare } from "react-icons/ai";


type ProductDetails = {
    id: number;
    title: string;
    price: number;
    img: string;
    category: string
    quantity: number
    // Add other properties as needed
  };

  type ProductDetailsProps = {
    products?: ProductDetails[] | null;
    
  };
const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const navigate = useNavigate()  
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
        <div
          className="ml-12 pt-5"
            onClick={(e) => {
              e.preventDefault()
              navigate(-1)
            }}>
            <AiOutlineCloseSquare size={40} />
          </div>
        
      <div className="my-16 grid grid-cols-1 lg:grid-cols-2 gap-x-9 gap-y-7 px-10 lg:px-40">
        {/* <h1 className="font-bold text-xl">Product Details - {id}</h1> */}

          <div className="">
          <img src={product.img} alt={product.title} className="w-full h-full object-fit" />
          </div>

          

          <div className="px-3 grid-cols-1 ">
              <div className="flex justify-between items-center mb-4 ">
              <p
                className="font-bold text-2xl">
                {product.title}
              </p>

              <img src={FavoriteIcon} alt="Favorite" className="w-6 h-6" />

              </div>

              <div className="flex justify-between items-center mb-4">
                <p className="text-md font-semibold mr-3">{product.category}</p>
                <p className="text-md font-semibold ml-3">{product.ratings}</p>
              </div>
              <div>
                <p className="text-md font-semibold">{formatCurrency(product.price)}</p>

              </div>

            <div className="flex justify-center items-center mb-4">
              {quantity === 0 ? (
                    <button 
                      onClick={() => increaseCartQuantity(Number(id))}
                      className="bg-[#2ECF5A] lg:w-2/4 mt-14 font-semibold text-center py-2 px-6 flex items-center justify-center rounded-lg">
                        <span className="mr-2">Add to Cart</span>
                       <HiOutlineShoppingCart size={20} />
                    </button>) :
                    <div className="flex flex-col items-center mt-14">
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
         <Footer />
      </div>
    );
}
 
export default ProductDetails;
        
        