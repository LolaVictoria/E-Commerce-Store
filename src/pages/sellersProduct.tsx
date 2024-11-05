import { useProduct } from "../context/productContext";
import Logo from "/assets/img/alaba-market-logo.png";
import { useEffect, useState } from "react";
import { Product } from "../utilities/types";
import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { Overlay } from "../utilities/overlay";
import { AiOutlineClose } from "react-icons/ai";
import useScrollLock from "../hooks/useScrollLock"; 
import Message from "../utilities/message";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";

const SellersProduct = () => {
    const { products, deleteProduct, editProduct } = useProduct();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true); 
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [message, setMessage] = useState("");
    useScrollLock(isEditing);

    const handleDelete = async (id: string) => {
        await deleteProduct(id);
    };

    const handleEditClick = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCurrentProduct((prevProduct) => prevProduct ? { ...prevProduct, image: reader.result as string } : null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault(); 
        if (currentProduct) {
            await editProduct(currentProduct.id, currentProduct);
            setCurrentProduct(null);
            //setIsEditing(false);
            setMessage("Product edited successfully");
            setTimeout(() => setMessage(""), 3000);
        }
    };

    useEffect(() => {
        setLoading(false); 
    }, [products]);

    
    const isError = (message: string) => {
        return message.toLowerCase().includes("error") || message.toLowerCase().includes("failed");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color="#2ECF5A" size={50} /> 
            </div>
        );
    }

    return (
        <div>
            <div className='bg-[#181818] py-4 lg:py-7 px-6 text-[#fff] lg:grid lg:grid-cols-3 '>
                <Link to="/">
                <div className="flex items-center justify-center text-xl font-bold lg:col-span-1">
                    <img src={Logo} className="mr-3 w-10 h-10" alt="Alaba Market Logo" />
                    <div>
                        <span className="text-[#2ECF5A]">Alaba </span>
                        <span className="text-[#fff]">Market</span>
                    </div>
                </div>
                </Link>
                <h2 className="text-2xl font-bold text-center lg:text-justify mt-3 lg:mt-0 col-span-2">Manage Products</h2>
            </div>

            {products.length > 0 ? (
                <div>
                    <p className="text-center font-semibold my-4">You have {products.length} products for sale</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-2">
                        {products.map((product) => (
                            <div key={product.id} className="border p-4">
                                <div className="flex items-center justify-end">
                                    <button onClick={() => handleDelete(product.id)} className="text-red-500 border p-1.5">
                                       <FaTrashAlt size={20} />
                                    </button>
                                    <button onClick={() => handleEditClick(product)} className="text-blue-500 ml-3 border p-1.5">
                                       <GoPencil size={20} />
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold">{product.name}</h3>
                                <p>Category: {product.category}</p>
                                <p>Price: ${product.price}</p>
                                <p>Description: {product.description}</p>
                                <img src={product.image} alt={product.name} className="w-32 h-32 object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p className="mt-5 text-lg text-center">You have no products for sale</p>
            )}

            {isEditing && currentProduct && (
                <Overlay>
                    <div className="w-3/4 md:w-2/4 h-5/6 overflow-y-scroll p-6 bg-white rounded shadow-lg">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
                            <div className="font-bold text-black">
                                <AiOutlineClose size={20} onClick={() => setIsEditing(false)} />
                            </div>
                        </div>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label htmlFor="product-name" className="block mb-1">Product Name</label>
                                <input
                                    id="product-name"
                                    type="text"
                                    value={currentProduct.name}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="product-category" className="block mb-1">Category</label>
                                <input
                                    id="product-category"
                                    type="text"
                                    value={currentProduct.category}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="product-price" className="block mb-1">Price</label>
                                <input
                                    id="product-price"
                                    type="number"
                                    value={currentProduct.price}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: +e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="product-description" className="block mb-1">Description</label>
                                <textarea
                                    id="product-description"
                                    value={currentProduct.description}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                    className="w-full border p-2 rounded focus:outline-none"
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="product-image" className="block mb-1">Product Image</label>
                                <input
                                    id="product-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full border p-2 rounded focus:outline-none"
                                />
                                {currentProduct.image && (
                                    <img src={currentProduct.image} alt="Product Preview" className="w-32 h-32 mt-2 object-cover" />
                                )}
                            </div>
                            <Message message={message} type={isError(message) ? "error" : "success"}/>
                            <div className="flex justify-end">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </Overlay>
            )}
        </div>
    );
};

export default SellersProduct;
