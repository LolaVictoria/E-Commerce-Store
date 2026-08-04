import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { ProductResponse } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {
    product: ProductResponse;
    deleting: boolean;
    onDelete: (id: number) => void;
    onEdit: (product: ProductResponse) => void;
};

const categoryMap = {
    HEALTH_AND_BEAUTY: "Health & Beauty",
    APPLIANCES: "Appliances",
    COMPUTING: "Computing",
    FASHION: "Fashion",
    HOME_AND_OFFICE: "Home & Office",
    PHONES_AND_TABLETS: "Phones & Tablets",
    ELECTRONICS: "Electronics",
    BABY_PRODUCTS: "Baby Products",
};

const SellerProductCard = ({
    product,
    deleting,
    onDelete,
    onEdit,
}: Props) => {
    return (
        <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
            <div className="flex justify-end gap-3 mb-3">
                <button
                    onClick={() => onDelete(product.id)}
                    disabled={deleting}
                    className="border p-2 text-red-500 rounded"
                >
                    {deleting ? "Deleting..." : <FaTrashAlt size={18} />}
                </button>

                <button
                    onClick={() => onEdit(product)}
                    className="border p-2 text-blue-500 rounded"
                >
                    <GoPencil size={18} />
                </button>
            </div>

            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
            />

            <h3 className="font-bold text-lg mt-3">
                {product.name}
            </h3>

            <p className="text-sm text-gray-500">
                {
                    categoryMap[
                        product.category as keyof typeof categoryMap
                    ]
                }
            </p>

            <p className="font-semibold mt-2">
                {formatCurrency(product.price)}
            </p>

            <p
                className="text-sm mt-2"
                title={product.description}
            >
                {product.description.length > 60
                    ? product.description.slice(0, 60) + "..."
                    : product.description}
            </p>
        </div>
    );
};

export default SellerProductCard;
