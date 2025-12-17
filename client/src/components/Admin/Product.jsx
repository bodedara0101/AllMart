// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// const Product = () => {

//     const {id} = useParams();
//     const [product, setProduct] = useState(null)

//     useEffect(() => {
//         const fetchProduct = async () => {
//             const response = await fetch(`http://localhost:8000/admin/api/products/${id}`);
//             const data = await response.json();
//             setProduct(data);
//         };
//         fetchProduct();
//     }, [])

//   return (
//     <>
//       <div className='p-6'>
//         <h1 className='text-3xl mx-auto w-20 text-center capitalize'>{product.name}</h1>
//       </div>
//     </>
//   )
// }

// export default Product

import React, { useEffect } from "react";
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Product = () => {
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch(
        `http://localhost:8000/admin/api/products/${id}`
      );
      const data = await response.json();
      setProduct(data.product);
      setUser(data.user);
    };
    fetchProduct();
  }, []);

  return (
    <>
      {product ? (
        <div className="sm:w-[80%] mt-[50px] mx-auto p-4">
          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6 group transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" />
            <NavLink to="/admin/products">
              <span>Back</span>
            </NavLink>
          </button>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors duration-200"
                >
                  <Heart
                    className={`w-5 h-5 transform hover:scale-110 transition-transform duration-200 ${
                      isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
                    }`}
                  />
                </button>
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl capitalize font-bold text-gray-900 mb-2">
                        {product.name}
                      </h1>
                      <p className="text-sm text-gray-500 mb-4 capitalize">
                        by {user.username}
                      </p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-600 capitalize mb-6">
                    {product.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-black mr-2"></div>
                      <span className="text-sm text-gray-600">
                        Phantom Black
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      {["S", "M", "L"].map((size) => (
                        <button
                          key={size}
                          className="px-3 py-1 border rounded-md text-sm hover:bg-gray-50 transition-colors duration-200"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      <span>USD </span>
                      {product.price}
                    </span>
                    <span
                      className={`text-center text-sm ${
                        
                        product.quantity === 0 ?
                          "text-red-500 bg-red-200 px-4 py-1 rounded-lg":
                        product.quantity >= 20
                          ? "text-green-500 bg-green-200 px-4 py-1 rounded-lg"
                          :product.quentity > 10
                          ? "text-yellow-500 bg-yellow-200 px-4 py-1 rounded-lg"
                          :"text-red-500 bg-red-200 px-4 py-1 rounded-lg"
                      }`}
                    >
                      {product.quantity >20 ? 
                      <p>In Stock {product.quantity}</p>
                      :product.quantity === 0 ?
                      <p>Out of Stock</p> : 
                      <p>Low Stock {product.quantity}</p>
                      }
                    </span>
                  </div>

                  <button className="w-full bg-black text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-200">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[80%] h-full mx-auto p-4">
          <h1>Product loading...</h1>
        </div>
      )}
    </>
  );
};

export default Product;
