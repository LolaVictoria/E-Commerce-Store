type ProductLinksProps = {
    productIcon: string;
    productType: string;
}


const ProductLinkComponent: React.FC<ProductLinksProps> = ({productIcon, productType}) => {
    return (
        <div className="flex items-center justify-center">
            <img src={productIcon} className="mr-1"/>
            <a href="#" className="font-normal text-sm">{productType}</a>
        </div>
    );
}
 
export default ProductLinkComponent;