import { Link } from "react-router-dom"
import { formatCurrency } from "../../utils/formatCurrency"
import FavoriteIcon from "/public/assets/img/icons/favorite-icon.png"
import { ProductResponse } from "../../types/product";


const ProductCard: React.FC<ProductResponse> =({id, name, category, price, imageUrl}) => {
    return (
        <Link to={`/productdetails/${id}`} >   
                <div className="relative text-[#181818] w-auto h-auto rounded-lg">
                    <img src={imageUrl} alt={name} className="w-40 h-40 lg:w-60 lg:h-60 object-fit" />
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

export default ProductCard;

