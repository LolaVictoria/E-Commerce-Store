import HighlyRatedProducts from "../components/highyRatedProducts";
// import Product1 from "src/assets/img/HighlyRatedProducts/product-1.png"
// import {Product2} from "src/assets/img/HighlyRatedProducts/product-2.png"
// import {Product3} from "src/assets/img/HighlyRatedProducts/product-3.png"
// import {Product4} from "src/assets/img/HighlyRatedProducts/product-4.png"
// import {Product5} from "src/assets/img/HighlyRatedProducts/product-5.png"
// import {Product6} from "src/assets/img/HighlyRatedProducts/product-6.png"

const HighlyRated = () => {
    return (
        <div className="px-8 pt-6">
            <h3 className="text-[#000] text-3xl font-semibold mb-8">Highly Rated Products</h3>

            <div className="grid grid-cols-5 ">
                <HighlyRatedProducts productImage= "src/assets/img/products/product-1.png" productName= "Shining Pot"  productPrice= "5000"/>
                <HighlyRatedProducts productImage= "src/assets/img/products/product-2.png" productName= "Shining Pot"  productPrice= "5000"/>
                <HighlyRatedProducts productImage= "src/assets/img/products/product-3.png" productName= "Shining Pot"  productPrice= "5000"/>
                <HighlyRatedProducts productImage= "src/assets/img/products/product-4.png" productName= "Shining Pot"  productPrice= "5000"/>
                <HighlyRatedProducts productImage= "src/assets/img/products/product-5.png" productName= "Shining Pot"  productPrice= "5000"/>
                {/*<Products productImage= "src/assets/img/products/product-6.png" productName= "Shining Pot"  productPrice= "5000"/>*/}
            </div>

        </div>
    );
}
 
export default HighlyRated;