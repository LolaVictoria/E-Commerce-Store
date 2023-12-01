type ProductLinksProps = {
    productIcon: string;
    productType: string;
}


const ProductLinkComponent: React.FC<ProductLinksProps> = ({productIcon, productType}) => {
    return (
        <div className="flex items-center lg:justify-center">
            <img src={productIcon} className="mr-1"/>
            <p className="font-normal text-sm ">{productType}</p>
        </div>
    );
}
 
export default ProductLinkComponent;