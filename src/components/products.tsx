import { Link } from "react-router-dom"
import { formatCurrency } from "../utilities/formatCurrency"
import FavoriteIcon from "/public/assets/img/icons/favorite-icon.png"
type productObj = {
    id: string; 
    name: string; 
    category: string; 
    price: number; 
    description: string; 
    image: string; 
    sellerId: string;
}

const Products: React.FC<productObj> =({id, name, category, price, image}) => {
    return (
        <Link to={`/productdetails/${id}`} >   
                <div className="relative text-[#181818] w-auto h-auto rounded-lg">
                    <img src={image} alt={name} className="w-40 h-40 lg:w-60 lg:h-60 object-fit" />
                    <img src={FavoriteIcon} alt="Favorite" className="absolute top-4 lg:top-5 right-4 lg:right-5" />
                    <div className="flex flex-col justify-center items-center lmy-1">
                    <p className="text-lg font-bold tracking-md">{name}</p>
                        <p className="text-md font-normal">{formatCurrency(price)}</p>
                        <div className="flex">
                         <p className="text-md font-normal mr-3">{category}</p>
                         {/* <p className="text-md font-normal ml-3">{ratings}</p> */}
                        </div>
                    </div>
                </div>
            </Link>
        
    
    );
};

export default Products;

