
import ProductImage from './ProductImage';
//import {useEffect, useState} from "react";
import { useParams } from "react-router-dom"
import storeItems from "../../database/products.json"




const ProductImageCarousel = () => {

      const {id} = useParams()
      const product = storeItems.find((item) => item.id === Number(id));

if (!product) {
  return <div>Product Not Found</div>;
}
      

    return (
        <div>    
          <ProductImage productDetailsImg={product.img}/>
                
        </div>     
    );
}
 
export default ProductImageCarousel;
