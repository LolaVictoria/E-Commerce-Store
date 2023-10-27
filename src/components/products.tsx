import { Link } from "react-router-dom"
import { formatCurrency } from "../utilities/formatCurrency"
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
        
                <div className="relative bg-[#2ECF5A] w-60 h-auto rounded-lg">
                    <img src={img} alt={title} className="w-60 h-[75%] rounded-t-lg" />
                    <img src="src/assets/img/icons/favorite-icon.png" alt="Favorite" className="absolute top-5 right-5" />
                    <div className="flex flex-col justify-center items-center my-3">
                    <p className="text-[#FFF] text-lg font-normal">{title}</p>
                         <p className="text-[#FFF] text-lg font-normal">{category}</p>
                        <p className="text-[#FFF] text-lg font-normal">{formatCurrency(price)}</p>
                        <p className="text-[#FFF] text-lg font-normal">{ratings}</p>

                        <Link to={`/productdetails/${id}`}>
                        <a
                            href={`/product/${id}`}
                            className="bg-[#181818] rounded-lg w-24 h-8 my-2 text-[#FFF] font-semibold text-base"
                        >
                            See Details
                        </a>
                        </Link>
                    </div>
                </div>
        
    
    );
};

export default Products;

