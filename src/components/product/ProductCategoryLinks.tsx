import ProductCategoryLink from "./ProductCategoryLink";
import { Link } from "react-router-dom";
import { categories } from "../../utils/categories";
import { Grid2x2 } from "lucide-react";

const ProductCategoryLinks = () => {
    return (
        <ul className="px-5 lg:px-8 my-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">

            {/* All Products */}

            <li>
                <Link to="/products">
                    <ProductCategoryLink
                        productIcon={Grid2x2}
                        productType="All"
                    />
                </Link>
            </li>

            {categories.map(({ value, label, icon }) => (
                <li key={value}>
                    <Link
                        to={`/products?category=${encodeURIComponent(value)}`}
                    >
                        <ProductCategoryLink
                            productIcon={icon}
                            productType={label}
                        />
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ProductCategoryLinks;
