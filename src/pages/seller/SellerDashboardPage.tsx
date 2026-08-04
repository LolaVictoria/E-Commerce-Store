import React, { useRef, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import Logo from "/assets/img/alaba-market-logo.png";
import Message from '../../components/ui/Message';
import { uploadImage } from "../../services/cloudinary";
import {
  ProductCategory,
  ProductRequest,
} from "../../types/product";
import { useProduct } from "../../contexts/productContext";


const categories = [
  {
    value: "HEALTH_AND_BEAUTY",
    label: "Health & Beauty",
  },
  {
    value: "APPLIANCES",
    label: "Appliances",
  },
  {
    value: "COMPUTING",
    label: "Computing",
  },
  {
    value: "FASHION",
    label: "Fashion",
  },
  {
    value: "HOME_AND_OFFICE",
    label: "Home & Office",
  },
  {
    value: "PHONES_AND_TABLETS",
    label: "Phones & Tablets",
  },
  {
    value: "ELECTRONICS",
    label: "Electronics",
  },
  {
    value: "BABY_PRODUCTS",
    label: "Baby Products",
  },
];

const SellerDashboard = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { currentName } = useAuth();
    const { addProduct } = useProduct();
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [newProduct, setNewProduct] = useState<ProductRequest>({
        name: "",
        category: "" as ProductCategory,
        price: 0,
        stock: 0,
        description: "",
        imageUrl: "",
    });
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    const handleInputChange = (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
            >
            ) => {
            const { name, value } = e.target;

            setNewProduct((prev) => ({
                ...prev,
                [name]:
                name === "price" || name === "stock"
                    ? Number(value)
                    : value,
            }));
        };


    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files?.length) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleAddProduct = async (
        e: React.FormEvent<HTMLFormElement>
            ) => {
            e.preventDefault();

            if (!selectedImage) {
                setMessage("Please select an image.");
                setTimeout(() => {
                    setMessage("");
                }, 12000);
                return;
            }

        try {
            setLoading(true);
            setMessage("");

            const imageUrl = await uploadImage(selectedImage);

            await addProduct({
                ...newProduct,
                imageUrl,
            });

            setMessage("Product added successfully.");
            setNewProduct({
                name: "",
                description: "",
                category: "" as ProductCategory,
                stock: 0,
                price: 0,
                imageUrl: "",
            });

            setSelectedImage(null);
            setTimeout(() => {
                setMessage("");
            }, 12000);
            if (imageInputRef.current) {
                imageInputRef.current.value = "";
            }
        } catch (error: unknown) {
            setMessage(
                (axios.isAxiosError(error) && error.response?.data?.message) ??
                "Failed to add product."
            );
        } finally {
            setLoading(false);
        }
    };

    const isError = (message: string) => {
        return message.toLowerCase().includes("error") || message.toLowerCase().includes("failed");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-[#181818] py-4 lg:py-7 px-2 sm:px-6 text-[#fff] lg:grid lg:grid-cols-3 ">
               <Link to="/">
                <div className="flex items-center justify-center text-xl font-bold lg:col-span-1">
                    <img src={Logo} className="mr-3 w-10 h-10" alt="Alaba Market Logo" />
                    <div>
                        <span className="text-[#2ECF5A]">Alaba </span>
                        <span className="text-[#fff]">Market</span>
                    </div>
                </div>
                </Link>
                
                <h2 className="text-2xl font-bold sm:text-center lg:text-justify mt-3 lg:mt-0 sm:col-span-2">Welcome, {currentName}</h2>
               
            </div>

            <div className="py-8 px-6">
            <div className="my-7">
                    <Link to="/sellersproduct" className="bg-blue-500 text-white p-2 rounded">
                        See my products
                    </Link>

                    <Link
                        to="/seller/orders"
                        className="bg-green-500 text-white p-2 rounded ml-4"
                    >
                        Customer Orders
                    </Link>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-center">Add Product</h2>
                <div className="sm:w-2/4 mx-auto flex justify-start">

                {message && (
                    <Message
                        message={message}
                        type={isError(message) ? "error" : "success"}
                    />
                )}
                </div>
                
                <form onSubmit={handleAddProduct} className="bg-white p-6 rounded-lg sm:w-2/4 mx-auto shadow-md space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-semibold">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter Product Name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="category" className="font-semibold">Category</label>
                        <select
                            required
                            name="category"
                            value={newProduct.category}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.value} value={category.value}>
                                {category.label}
                                </option>
                            ))}
                    </select>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="price" className="font-semibold">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            placeholder="Enter Price"
                            value={newProduct.price}
                            onFocus={(e) => {
                                if (e.target.value === "0") {
                                e.target.value = "";
                                }
                            }}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">
                            Stock
                        </label>

                        <input
                            type="number"
                            name="stock"
                            value={newProduct.stock}
                            onFocus={(e) => {
                                if (e.target.value === "0") {
                                e.target.value = "";
                                }
                            }}
                            onChange={handleInputChange}
                            className="p-2 border rounded-md"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-semibold">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Enter Product Description"
                            value={newProduct.description}
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="image" className="font-semibold">Upload Image</label>
                        <input
                            type="file"
                            ref={imageInputRef}
                            onChange={handleImageUpload}
                            required
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="flex justify-center">

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-auto sm:w-2/5 mx-auto ${loading ? "bg-blue-200" : "bg-blue-500"}  text-white p-2 rounded-md  transition duration-200`}
                    >
                        {loading ? "Wait for product to be added..." :  "Add Product"}
                    </button>
                        </div>
                </form>
            </div>
        </div>
    );
};

export default SellerDashboard;
