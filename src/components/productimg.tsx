type ProductImgProp = {
         productDetailsImg: string
}

const ProductImg: React.FC<ProductImgProp> = ({productDetailsImg}) => {
    return (
        <div className="w-60 h-64 rounded-lg">
            <img src={productDetailsImg} alt="" className="w-full h-full rounded-lg" style = {{objectFit: "cover" }}/>
        </div>
    )
}
 
export default ProductImg;