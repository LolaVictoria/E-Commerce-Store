import { LucideIcon } from "lucide-react";

interface ProductCategoryLinkProps {
    productIcon: LucideIcon;
    productType: string;
    active?: boolean;
}

const ProductCategoryLink = ({
    productIcon: Icon,
    productType,
    active = false,
}: ProductCategoryLinkProps) => {
    return (
        <div
            className={`flex flex-col items-center p-4 rounded-xl transition
                ${
                    active
                        ? "bg-[#2ECF5A] text-white"
                        : "bg-white text-gray-700"
                }`}
        >
            <Icon size={15} />

            <span className="mt-2 text-xs font-small">
                {productType}
            </span>
        </div>
    );
};

export default ProductCategoryLink;
