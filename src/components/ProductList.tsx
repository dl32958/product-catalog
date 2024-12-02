import React, { useState, useEffect } from 'react';
import { fetchProducts } from "../api/api";
import ProductCard from './ProductCard';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
            setFilteredProducts(data);
            setLoading(false);
        };
        getProducts();
    }, []);

    useEffect(() => {
        setFilteredProducts(
          products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
        setCurrentPage(1);
      }, [searchQuery, products]);

    if (loading) {
        return <p className="text-center text-gray-500">Loading products...</p>;
    }

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6">
                <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        rating={product.rating}
                    />
                ))}
            </div>

            <div className='flex justify-center mt-4 space-x-1'>
                {Array.from({ length: totalPages}, (_, index) => (
                    <button 
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-4 py-2 border rounded ${
                            currentPage === index + 1
                                ? "bg-blue-500 text-white dark:bg-blue-400"
                                : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ProductList;