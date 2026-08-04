type ProductImageProps = {
         productDetailsImg: string
}

const ProductImage: React.FC<ProductImageProps> = ({productDetailsImg}) => {
    return (
        <div className="w-60 h-64 rounded-lg">
            <img src={productDetailsImg} alt="" className="w-full h-full rounded-lg" style = {{objectFit: "cover" }}/>
        </div>
    )
}
 
export default ProductImage;
