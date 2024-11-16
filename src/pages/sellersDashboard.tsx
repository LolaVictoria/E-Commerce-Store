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
                <h2 className="text-2xl font-bold sm:text-center lg:text-justify mt-3 lg:mt-0 sm:col-span-2">Welcome, {currentFirstName} {currentLastName}</h2>
               
            </div>

            <div className="py-8 px-6">
            <div className="my-7">
                    <Link to="/sellersProduct" className="bg-blue-500 text-white p-2 rounded">
                        See my products
                    </Link>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-center">Add Product</h2>
                <div className="sm:w-2/4 mx-auto">

                {addProductMessage && (
                    <Message message={addProductMessage} type={isError(addProductMessage) ? "error" : "success"} />
                )}
                {editProductMessage && (
                    <Message message={editProductMessage} type={isError(editProductMessage) ? "error" : "success"} />
                )}
                </div>
                
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddProduct();
                }} className="bg-white p-6 rounded-lg sm:w-2/4 mx-auto shadow-md space-y-4">
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
                            id="category"
                            name="category"
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
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
                            onChange={handleInputChange}
                            required
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
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
                            onChange={handleImageUpload}
                            required
                            className="border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="flex justify-center">

                    <button
                        type="submit"
                        className="w-auto sm:w-2/5 mx-auto bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Add Product
                    </button>
                        </div>
                </form>
            </div>
        </div>
    );
};

export default SellerDashboard;
