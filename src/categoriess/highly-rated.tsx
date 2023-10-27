import Products from "../components/products";
import storeItems from "../database/products.json"

type Product = {
  id: number;
  title: string;
  price: number;
  img: string;
  ratings: number
  category: string
  // Add other properties as needed
};

type HighlyRatedType = {
  highlyRatedItems: Product[];
};


const HighlyRated: React.FC<HighlyRatedType> = () => {
    // Filter highly-rated items before rendering
    const highlyRatedItems = storeItems.filter((item) => (item.ratings || 0) >= 3.5);

    return (
        <div className="px-8 pt-6">
            <h3 className="text-[#000] text-3xl font-semibold mb-8">Highly Rated Products</h3>

            
            <div className="grid grid-cols-4 gap-y-14 place-items-center gap-x-4 my-24">
            {highlyRatedItems.map((item) => (
          <div key={item.id} className="">
            <Products {...item} />
          </div>
        ))}
          </div>
            

        </div>
    );
}
 
export default HighlyRated;