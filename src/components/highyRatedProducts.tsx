import favoriteIcon from "src/assets/img/icons/favorite-icon.png"
type ProductProps = {
    productImage: string;
    productName: string;
    productPrice: string;
   

}


const HighlyRatedProducts: React.FC<ProductProps> = ({productImage, productName, productPrice}) => {
   

    return (
        <div className="relative bg-[#2ECF5A] w-60 h-96 rounded-lg">
            <img src={productImage} className="w-60 h-64 rounded-t-lg" />
            <img src= {favoriteIcon}className="absolute top-5 right-5" />
            <div className="flex flex-col justify-center items-center my-3">
                <p className="text-[#FFF] text-lg font-bold">{productName}</p>
                <p className="text-[#FFF] text-lg font-normal">{productPrice} NGN</p>
                
               
                
    
                      <button 
                       
                        className="bg-[#181818] rounded-lg w-24 h-8 my-2">
                        <a href="#" className="text-[#FFF] font-semibold text-base">See Details</a>
                      </button>
            
               
            
            

            </div>
        </div>
    );
}
 
export default HighlyRatedProducts;