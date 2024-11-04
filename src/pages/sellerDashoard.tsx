import React, { useState } from 'react';
import { useProduct } from '../context/productContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import Logo from "/assets/img/alaba-market-logo.png";
import Message from '../utilities/message';

const SellerDashboard = () => {
    const { addProduct, addProductMessage, editProductMessage } = useProduct();
    const { currentFirstName, currentLastName } = useAuth();

    const categories = [
        'Appliances',
        'Baby Products',
        'Clothes',
        'Computing',
        'Electronics',
        'Health & Beauty',
        'Home & Offices',
        'Phones & Tablets'
    ];
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: 0,
        description: '',
        image: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct({
                    ...newProduct,
                    image: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = async () => {
        await addProduct(newProduct);
        setNewProduct({
            name: '',
            category: '',
            price: 0,
            description: '',
            image: '',
        });
    };

    const isError = (message: string) => {
        return message.toLowerCase().includes("error") || message.toLowerCase().includes("failed");
    };

    return (
        <div>
            <div className="bg-[#181818] py-4 lg:py-7 px-6 text-[#fff] lg:grid lg:grid-cols-3 ">
                <Link to="/">
                    <div className="flex items-center justify-center text-xl font-bold lg:col-span-1">
                        <img src={Logo} className="mr-3 w-10 h-10" alt="Alaba Market Logo" />
                        <div>
                            <span className="text-[#2ECF5A]">Alaba </span>
                            <span className="text-[#fff]">Market</span>
                        </div>
                    </div>    
                </Link>
                <h1 className="text-2xl font-bold text-center lg:text-justify mt-3 lg:mt-0 col-span-2">
                    {currentFirstName} {currentLastName} Seller's Dashboard
                </h1>
            </div>

            <div className="mx-auto p-4">
                <div className="my-7">
                    <Link to="/sellersProduct" className="bg-blue-500 text-white p-2 rounded">
                        See my products
                    </Link>
                </div>
                <h2 className="text-xl font-semibold mb-2">Add New Product</h2>
                <div className="grid grid-cols-1 gap-4 w-3/4 mx-auto">
                    <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                        className="border p-2"
                    />
                    <select
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="border p-2"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        placeholder="Price"
                        className="border p-2"
                    />
                    <textarea
                        name="description"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        placeholder="Product Description"
                        className="border p-2"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="border p-2"
                    />

                    {(addProductMessage || editProductMessage) && (
                        <Message
                            bgColor={isError(addProductMessage || editProductMessage) ? "bg-red-800" : "bg-green-800"}
                            message={addProductMessage || editProductMessage}
                        />
                    )}

                    <button
                        onClick={handleAddProduct}
                        className="bg-green-500 text-white p-2 rounded md:w-1/2 mx-auto"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboard;
