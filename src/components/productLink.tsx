import ProductLinkComponent from "./productLinkComponent";
import { Link } from "react-router-dom";
import HealthAndBeauty from "/public/assets/img/icons/health&beauty-icon.png"
import HomeAndOffice from "/public/assets/img/icons/home-icon.png"
import ApplianceIcon from "/public/assets/img/icons/appliance-icon.png"
import PhoneIcon from "/public/assets/img/icons/phone-icon.png" 
import ComputerIcon from "/public/assets/img/icons/computer-icon.png"
import TelevisionIcon from "/public/assets/img/icons/television-icon.png"
import ClothesIcon from "/public/assets/img/icons/clothes-icon.png"
import BabyIcon from "/public/assets/img/icons/baby-icon.png"

const ProductLink = () => {
  return (
    <ul className="px-8 my-2 grid grid-cols-8">
      <li>
        <Link to="/health_&_beauty">
          <ProductLinkComponent productIcon={HealthAndBeauty}  productType="Health & Beauty" />
        </Link>
      </li>
      <li>
        <Link to="/home_&_office">
          <ProductLinkComponent productIcon={HomeAndOffice}  productType="Home & Office"  />
        </Link>
      </li>

      <li>
        <Link to="/appliances">
          <ProductLinkComponent productIcon={ApplianceIcon}  productType="Appliances"  />
        </Link>
      </li>

      <li>
        <Link to="/phones_&_tablets">
          <ProductLinkComponent productIcon={PhoneIcon}  productType="Phones & Tablets" />
        </Link>
      </li>

      <li>
        <Link to="/computing">
          <ProductLinkComponent productIcon={ComputerIcon}  productType="Computing" />
        </Link>
      </li>

      <li>
        <Link to="/electronics">
          <ProductLinkComponent productIcon={TelevisionIcon}  productType="Electronics" />
        </Link>
      </li>

      <li>
        <Link to="/clothes">
          <ProductLinkComponent productIcon={ClothesIcon}  productType="Thrift(Okirika)" />
        </Link>
      </li>

      <li>
        <Link to="/babyproduct">
          <ProductLinkComponent productIcon={BabyIcon}  productType="Baby Product" />
        </Link>
      </li>
    </ul>
  );
};

export default ProductLink;
