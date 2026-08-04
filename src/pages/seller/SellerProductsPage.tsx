import Logo from "/assets/img/alaba-market-logo.png";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { uploadImage } from "../../services/cloudinary";
import useScrollLock from "../../hooks/useScrollLock";

import ErrorPage from "../errors/ErrorPage";
import { Spinner } from "../../components/ui/Spinner";
import SellerProductCard from "../../components/product/SellerProductCard";
import EditProductModal from "../../components/product/EditProductModal";
import { ProductResponse } from "../../types/product";
import { useProduct } from "../../contexts/productContext";
import { categories } from "../../utils/categories";


const SellerProductsPage = () => {
  const {
    sellerProducts,
    fetchSellerProducts,
    deleteProduct,
    editProduct,
    loading,
  } = useProduct();

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [currentProduct, setCurrentProduct] =
    useState<ProductResponse | null>(null);

  const [sort, setSort] = useState<
    "createdAt,desc" |
    "createdAt,asc" |
    "price,asc" |
    "price,desc"
  >("createdAt,desc");

  const [deletingId, setDeletingId] = useState<number | null>(null);

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  useScrollLock(isEditing);

  useEffect(() => {
    fetchSellerProducts();
  }, [fetchSellerProducts]);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteProduct(id);

      setMessage("Product deleted successfully.");

      setTimeout(() => setMessage(""), 12000);
    } catch {
      setMessage("Failed to delete product.");
      setError(true);
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClick = (product: ProductResponse) => {
    setCurrentProduct(product);
    setIsEditing(true);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleEditSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!currentProduct) return;

    try {
      setSaving(true);

      let imageUrl = currentProduct.imageUrl;

      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      await editProduct(currentProduct.id, {
        name: currentProduct.name,
        description: currentProduct.description,
        category: currentProduct.category,
        price: currentProduct.price,
        stock: currentProduct.stock,
        imageUrl,
      });

      setMessage("Product updated successfully.");

      setIsEditing(false);
      setCurrentProduct(null);
      setSelectedImage(null);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

      setTimeout(() => setMessage(""), 12000);
    } catch {
      setMessage("Failed to update product.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorPage
        description="Unable to load products."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div>
      <div className="bg-[#181818] py-4 lg:py-7 px-6 text-white lg:grid lg:grid-cols-3">
        <Link to="/">
          <div className="flex items-center justify-center text-xl font-bold lg:col-span-1">
            <img
              src={Logo}
              className="mr-3 w-10 h-10"
              alt="Alaba Market Logo"
            />
            <div>
              <span className="text-[#2ECF5A]">Alaba </span>
              <span>Market</span>
            </div>
          </div>
        </Link>

        <h2 className="text-2xl font-bold text-center lg:text-left mt-3 lg:mt-0 col-span-2">
          Manage Products
        </h2>
      </div>

      <div className="max-w-6xl mx-auto p-6">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            My Products
          </h1>

          {sellerProducts.length > 0 && (
            <select
              value={sort}
              onChange={(e) =>
                setSort(
                  e.target.value as
                    | "createdAt,desc"
                    | "createdAt,asc"
                    | "price,asc"
                    | "price,desc"
                )
              }
            >
              <option value="createdAt,desc">Newest</option>
              <option value="createdAt,asc">Oldest</option>
              <option value="price,asc">Price: Low → High</option>
              <option value="price,desc">Price: High → Low</option>
            </select>
          )}
        </div>

        {sellerProducts.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-xl font-semibold">
              You haven't added any products yet.
            </p>

            <p className="text-gray-500 mt-3">
              Start selling by adding your first product.
            </p>

            <Link
              to="/seller-dashboard"
              className="inline-block mt-6 bg-[#2ECF5A] px-6 py-3 rounded font-semibold"
            >
              Add Product
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center font-semibold my-4">
              You have {sellerProducts.length} product
              {sellerProducts.length > 1 ? "s" : ""} for sale.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sellerProducts.map((product) => (
                <SellerProductCard
                  key={product.id}
                  product={product}
                  deleting={deletingId === product.id}
                  onDelete={() => handleDelete(product.id)}
                  onEdit={() => handleEditClick(product)}
                />
              ))}
            </div>
          </>
        )}

        <EditProductModal
          open={isEditing}
          product={currentProduct}
          categories={categories}
          selectedImage={selectedImage}
          saving={saving}
          message={message}
          imageInputRef={imageInputRef}
          onClose={() => {
            setIsEditing(false);
            setCurrentProduct(null);
            setSelectedImage(null);

            if (imageInputRef.current) {
              imageInputRef.current.value = "";
            }
          }}
          onSubmit={handleEditSubmit}
          onImageUpload={handleImageUpload}
          setProduct={setCurrentProduct}
        />
      </div>
    </div>
  );
};

export default SellerProductsPage;
