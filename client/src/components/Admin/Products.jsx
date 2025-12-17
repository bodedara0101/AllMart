import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import empty from "../../assets/empty-cart.png";
import {
  Plus,
  Search,
  Filter,
  X,
  Upload,
  DollarSign,
  Tag,
  Package,
  BarChart,
  Camera,
} from "lucide-react";
import PRW from "./wireframes/PRW";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);

  // Sample product data

  const categories = [
    "All",
    "Fashion",
    "Furniture",
    "Accessories",
    "Electronics",
  ];

  const [generatedText, setGeneratedText] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [products, setProducts] = useState([]);
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8000/admin/api/products"
        );
        const data = await response.json();
        console.log(data);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
      setLoading(false);
    };

    getAllProducts();

    const getRates = async () => {
      const response = await fetch("https://open.er-api.com/v6/latest/USD");
      const data = await response.json();
      console.log(data);
      setRates(data.rates);
    };
    getRates();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", generatedText);
    fd.append("price", formData.price);
    fd.append("file", file);
    fd.append("quantity", formData.quantity);
    fd.append("category", formData.category);
    console.log(fd);

    const token = localStorage.getItem("token");

    setAdding(true);

    try {
      const response = await fetch(
        "http://localhost:8000/admin/api/products/add",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: fd,
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setAdding(false);
        setIsModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      setAdding(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:8000/admin/api/products/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const sfile = e.target.files[0];
    setFile(sfile);
    console.log(sfile);

    const filedata = new FormData();
    filedata.append("file", sfile);
    setGenerating(true);
    try {
      if(sfile){
        const response = await fetch(
          `http://localhost:8000/admin/api/products/imagetotext`,
          {
            method: "POST",
            body: filedata,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setGeneratedText(data.generated_text);
          setGenerating(false);
        }else{
          const data = await response.json();
          setGenerating(false);
          setGeneratedText("error while generating...");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          {loading ? (
            <h1 className="text-2xl font-bold mb-2">Products Loading...</h1>
          ) : (
            <h1 className="text-2xl font-bold mb-2">
              Products{" "}
              <span className="font-bold text-blue-500">{products.length}</span>
            </h1>
          )}
          <p className="text-gray-500">
            Manage and organize your product inventory
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </button>
      </div>

      {/* Filters and Search */}
      <div className="lg:flex lg:flex-row flex flex-col items-center gap-4 mb-6">
        <div className="relative flex-1 w-[70%] justify-center">
          <Search className="absolute left-3 top-[20px] transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto p-5">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 || loading ? (<div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${loading ? "h-0" : "min-h-80"} gap-6`}>
        {filteredProducts.map((product) => (
          <NavLink key={product.id} to={`/products/${product.id}`}>
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold capitalize text-gray-900">
                      {product.name}
                    </h3>
                    <span className="text-sm capitalize text-gray-500">
                      {product.category}
                    </span>
                  </div>
                  <span
                    title={`${
                      rates ? (product.price * rates.INR).toFixed(2) : ""
                    } INR Rupees`}
                  >
                    <span className="text-black text-sm font-bold">USD </span>
                    <span className="text-lg font-bold text-blue-600">
                      {product.price}
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                        
                        product.quantity >= 20
                        ? "bg-green-100 text-green-800"
                        : product.quantity > 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"

                    }`}
                  >
                    {
                      product.quantity === 0 ?
                        "Out of stock"
                        :             
                        product.quantity + " in stock"         
                    }
                  </span>
                  <button
                    className="text-blue-600 hover:text-blue-700"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteProduct(product.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>) :(
        <div className="min-h-80 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold">No products found for <span className="font-bold text-blue-500">{selectedCategory}</span></h1>  
      </div>
      )}
          {products.length === 0 && (
            <PRW />
          )}

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
                <h3 className="text-lg font-medium text-gray-900">
                  Add New Product
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleAddProduct}>
                <div className="px-6 py-4">
                  {/* Image Upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Image
                    </label>
                    <div className="relative h-40 w-full bg-gray-100 rounded-lg cursor-pointer overflow-hidden">
                      {file ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="h-full w-full text-gray-400" />
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          onChange={(e) => (formData.category = e.target.value)}
                        >
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price
                        </label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="0.00"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter stock quantity"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        rows="3"
                        name="description"
                        value={generating ? "Description Generating..." : generatedText}
                        disabled={generating}
                        onChange={(e) => setGeneratedText(e.target.value)}
                        className={`w-full px-3 py-2 border ${generating && "cursor-not-allowed text-gray-400 text-center"} border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500`}
                        placeholder="Enter product description"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={()=>{
                      if(adding || generating){
                        return true
                      }else{
                        return false
                      }
                    }}
                    className={`px-4 py-2 ${adding && "cursor-not-allowed"} ${generating && "cursor-not-allowed"} bg-blue-600 text-white rounded-lg hover:bg-blue-700`}
                  >
                    {adding ? "Adding..." : "Add Product"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {[
          {
            title: "Total Products",
            value: products.length,
            icon: Package,
            color: "bg-blue-500",
          },
          {
            title: "Categories",
            value: categories.length,
            icon: Tag,
            color: "bg-green-500",
          },
          {
            title: "Total Sales",
            value: "$12,345",
            icon: DollarSign,
            color: "bg-purple-500",
          },
          {
            title: "Revenue",
            value: "+24%",
            icon: BarChart,
            color: "bg-yellow-500",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
