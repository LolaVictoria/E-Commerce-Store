import { AiOutlineClose } from "react-icons/ai";
import { Overlay } from "../ui/Overlay";
import { ProductCategory, ProductResponse } from "../../types/product";
import Message from "../ui/Message";

type Props = {
  open: boolean;
  product: ProductResponse | null;
  categories: {
    value: string;
    label: string;
  }[];
  selectedImage: File | null;
  saving: boolean;
  message: string;
  imageInputRef: React.RefObject<HTMLInputElement>;

  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setProduct: React.Dispatch<
    React.SetStateAction<ProductResponse | null>
  >;
};

const EditProductModal = ({
  open,
  product,
  categories,
  selectedImage,
  saving,
  message,
  imageInputRef,
  onClose,
  onSubmit,
  onImageUpload,
  setProduct,
}: Props) => {
  if (!open || !product) return null;

  const isError =
    message.toLowerCase().includes("failed") ||
    message.toLowerCase().includes("error");

  return (
    <Overlay>
      <div className="w-3/4 md:w-2/4 h-5/6 overflow-y-scroll p-6 bg-white rounded shadow-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold mb-4">
            Edit Product
          </h3>

          <button onClick={onClose}>
            <AiOutlineClose size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-1">
              Product Name
            </label>

            <input
              type="text"
              value={product.name}
              onChange={(e) =>
                setProduct({
                  ...product,
                  name: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Category
            </label>

            <select
              value={product.category}
              onChange={(e) =>
                setProduct({
                  ...product,
                  category:
                    e.target.value as ProductCategory,
                })
              }
              className="w-full border p-2 rounded"
            >
              {categories.map((category) => (
                <option
                  key={category.value}
                  value={category.value}
                >
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Price
            </label>

            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: Number(e.target.value),
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Stock
            </label>

            <input
              type="number"
              value={product.stock}
              onChange={(e) =>
                setProduct({
                  ...product,
                  stock: Number(e.target.value),
                })
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Description
            </label>

            <textarea
              rows={4}
              value={product.description}
              onChange={(e) =>
                setProduct({
                  ...product,
                  description: e.target.value,
                })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">
              Product Image
            </label>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={onImageUpload}
            />

            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : product.imageUrl
              }
              alt="Preview"
              className="w-32 h-32 object-cover mt-3"
            />
          </div>

          {message && (
            <Message
              message={message}
              type={isError ? "error" : "success"}
            />
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default EditProductModal;
