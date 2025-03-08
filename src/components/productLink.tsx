import ProductLinkComponent from "./productLinkComponent";
import { Link } from "react-router-dom";
import HealthAndBeauty from "/assets/img/icons/health&beauty-icon.png";
import HomeAndOffice from "/assets/img/icons/home-icon.png";
import ApplianceIcon from "/assets/img/icons/appliance-icon.png";
import PhoneIcon from "/assets/img/icons/phone-icon.png";
import ComputerIcon from "/assets/img/icons/computer-icon.png";
import TelevisionIcon from "/assets/img/icons/television-icon.png";
import ClothesIcon from "/assets/img/icons/clothes-icon.png";
import BabyIcon from "/assets/img/icons/baby-icon.png";

const categories = [
  { name: "Health & Beauty", icon: HealthAndBeauty },
  { name: "Home & Office", icon: HomeAndOffice },
  { name: "Appliances", icon: ApplianceIcon },
  { name: "Phones & Tablets", icon: PhoneIcon },
  { name: "Computing", icon: ComputerIcon },
  { name: "Electronics", icon: TelevisionIcon },
  { name: "Clothes", icon: ClothesIcon },
  { name: "Baby Products", icon: BabyIcon },
];

const ProductLink = () => {
  return (
    <ul className="px-5 lg:px-8 my-2 grid grid-cols-2 lg:grid-cols-8 gap-y-4">
      {categories.map(({ name, icon }) => (
        <li key={name}>
         <Link to={`/products?category=${encodeURIComponent(name)}`}>
          <ProductLinkComponent productIcon={icon} productType={name} />
         </Link>


          
        </li>
      ))}
    </ul>
  );
};

export default ProductLink;
