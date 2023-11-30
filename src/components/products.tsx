import { Link } from "react-router-dom"
import { formatCurrency } from "../utilities/formatCurrency"
import FavoriteIcon from "/public/assets/img/icons/favorite-icon.png"
type productObj = {
    id: number;
  title: string;
  price: number;
  img: string;
  ratings?: number 
  category: string
}

const Products: React.FC<productObj> =({img, title, category, price, ratings, id}) => {
    return (
        
                <div className="relative text-[#181818] w-60 h-auto rounded-lg">
                    <img src={img} alt={title} className="w-60 h-72 object-fit" />
                    <img src={FavoriteIcon} alt="Favorite" className="absolute top-5 right-5" />
                    <div className="flex flex-col justify-center items-center my-1">
                    <p className="text-lg font-bold">{title}</p>
                        <p className="text-md font-normal">{formatCurrency(price)}</p>
                        <div className="flex">
                         <p className="text-md font-normal mr-3">{category}</p>
                         <p className="text-md font-normal ml-3">{ratings}</p>
                        </div>

                        <Link to={`/productdetails/${id}`}                       
                            className="bg-[#181818] rounded-lg px-3 py-2 mt-2 mb-2 text-[#FFF] font-semibold text-base">                        
                            See Details                       
                        </Link>
                    </div>
                </div>
        
    
    );
};

export default Products;

