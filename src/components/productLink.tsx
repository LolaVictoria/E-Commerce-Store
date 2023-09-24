import ProductLinkComponent from "./productLinkComponent";
import { Link } from "react-router-dom";

const ProductLink = () => {
  return (
    <ul className="px-8 my-2 grid grid-cols-8">
      <li>
        <Link to="/health_&_beauty">
          <ProductLinkComponent productIcon="src/assets/img/icons/health&beauty-icon.png"  productType="Health & Beauty" />
        </Link>
      </li>
      <li>
        <Link to="/home_&_office">
          <ProductLinkComponent productIcon="src/assets/img/icons/home-icon.png"  productType="Home & Office"  />
        </Link>
      </li>

      <li>
        <Link to="/appliances">
          <ProductLinkComponent productIcon="src/assets/img/icons/appliance-icon.png"  productType="Appliances"  />
        </Link>
      </li>

      <li>
        <Link to="/phones_&_tablets">
          <ProductLinkComponent productIcon="src/assets/img/icons/phone-icon.png"  productType="Phones & Tablets" />
        </Link>
      </li>

      <li>
        <Link to="/computing">
          <ProductLinkComponent productIcon="src/assets/img/icons/computer-icon.png"  productType="Computing" />
        </Link>
      </li>

      <li>
        <Link to="/electronics">
          <ProductLinkComponent productIcon="src/assets/img/icons/television-icon.png"  productType="Electronics" />
        </Link>
      </li>

      <li>
        <Link to="/clothes">
          <ProductLinkComponent productIcon="src/assets/img/icons/clothes-icon.png"  productType="Thrift(Okirika)" />
        </Link>
      </li>

      <li>
        <Link to="/babyproduct">
          <ProductLinkComponent productIcon="src/assets/img/icons/baby-icon.png"  productType="Baby Product" />
        </Link>
      </li>
    </ul>
  );
};

export default ProductLink;
