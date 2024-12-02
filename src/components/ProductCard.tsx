import React from 'react';

interface ProductCardProps {
    title: string;
    price: number;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image, rating }) => {
    return (
        <div className='max-w-xs bg-white border dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-4 flex flex-col'>
            <img src={image} alt={title} className='h-40 w-full object-contain mb-4' />
            {/* Product Details */}
            <div className="flex flex-col mt-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                    {title}
                </h3>
                <p className="text-gray-600 dark:text-gray-200 mt-2">${price.toFixed(2)}</p>
                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-200">
                    <span className="text-yellow-500 mr-1">⭐</span>
                    <span className="text-sm">{rating.rate.toFixed(1)} / 5 ({rating.count} reviews)</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;