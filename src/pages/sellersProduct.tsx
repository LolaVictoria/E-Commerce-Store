import { useProduct } from "../context/productContext";
import Logo from "/assets/img/alaba-market-logo.png";

const SellersProduct = () => {
    const { products } = useProduct();

    return (
        <div className="">
             <div className='bg-[#181818] py-4 lg:py-7 px-6 text-[#fff] lg:grid lg:grid-cols-3 '>
            <div className="flex items-center justify-center text-xl font-bold lg:col-span-1">
                    <img src={Logo} className="mr-3 w-10 h-10" alt="Alaba Market Logo" />
                    <div>
                        <span className="text-[#2ECF5A]">Alaba </span>
                        <span className="text-[#fff]">Market</span>
          </div>
                    </div>
            <h2  className="text-2xl font-bold text-center lg:text-justify mt-3 lg:mt-0 col-span-2  ">Manage Products</h2>
                </div>    
             
                
            {
                products.length === 0 ? (
                <>
                <div>
                    <p className="text-center font-semibold my-4">You have {products.length} products for sale</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2">
                {products.map((product) => (
                    <div key={product.id} className="border p-4">
                        <h3 className="text-lg font-bold">{product.name}</h3>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>
                        <img src={product.image} alt={product.name} className="w-32 h-32 object-cover" />
                    </div>
                ))}
            </div>
                </>
                
            )
 : (
    <p className="mt-5 text-lg">You have no products for sale</p>
 )
            }
        </div>
    );
};

export default SellersProduct;
