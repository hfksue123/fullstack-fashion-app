import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const handleAddColor = () => {
    const color = newColorLabel || newColor;
    if (!color.trim()) return;
    setProductData((prev) => ({
      ...prev,
      colors: [...prev.colors, color],
    }));
    setNewColor("#000000");
    setNewColorLabel("");
  };

  const categories = ["Top Wear", "Bottom Wear", "Accessories", "Bags"];
  const materials = ["Cotton", "Fleece", "Denim", "Polyester"];
  const sizesList = ["S", "M", "L", "XL", "XXL", "XXXL", "4XL", "5XL", "6XL"];
  const genders = ["Men", "Women", "Unisex"];

  const [newColor, setNewColor] = useState("#000000");
  const [newColorLabel, setNewColorLabel] = useState("");

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    discountPrice: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    rating: "",
    numReviews: "",
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false); //Image upload state
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    setUploading(true);
  
    try {
      const uploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append('image', file);
        return axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
      });
  
      const results = await Promise.all(uploadPromises);
  
      const uploadedImages = results.map((res) => ({
        url: res.data.imageUrl,
        publicId: res.data.publicId,
        altText: '',
      }));
  
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...uploadedImages],
      }));
    } catch (error) {
      console.error('Error uploading image(s):', error);
    } finally {
      setUploading(false);
    }
  };
  

  const handleDeleteImage = async (index, publicId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        data: { public_id:publicId },
      });

      setProductData((prevData) => ({
        ...prevData,
        images: prevData.images.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Collection */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Collection</label>
          <input
            type="text"
            name="collection"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>
        {/* Brand */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Brand</label>
          <input
            type="text"
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md p-2"
            required
          />
        </div>
        {/* Gender */}
        <div>
          <label className="block font-semibold mb-2">Gender</label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            {genders.map((gen) => (
              <option key={gen}>{gen}</option>
            ))}
          </select>
        </div>
        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Discount Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2">Category</label>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {/* Material: textfield + datalist */}
        <div>
          <label className="block font-semibold mb-2">Material</label>
          <input
            type="text"
            name="material"
            list="materials"
            value={productData.material}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter or select material"
          />
          <datalist id="materials">
            {materials.map((mat, idx) => (
              <option key={idx} value={mat} />
            ))}
          </datalist>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Rating</label>
          <input
            type="number"
            name="rating"
            value={productData.rating}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Num Reviews */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Num Reviews</label>
          <input
            type="number"
            name="Num Reviews"
            value={productData.numReviews}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        {/* Sizes */}
        <div>
          <label className="block font-semibold mb-2">Sizes</label>
          <div className="flex flex-wrap gap-2">
            {sizesList.map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={productData.sizes.includes(size)}
                  onChange={(e) => {
                    const newSizes = e.target.checked
                      ? [...productData.sizes, size]
                      : productData.sizes.filter((s) => s !== size);
                    setProductData((prev) => ({ ...prev, sizes: newSizes }));
                  }}
                />
                {size}
              </label>
            ))}
          </div>
        </div>
        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors</label>
          <div className="flex items-center gap-2 mb-2">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
              className="w-10 h-10 border rounded"
            />
            <input
              type="text"
              placeholder="Color name or hex"
              value={newColorLabel}
              onChange={(e) => setNewColorLabel(e.target.value)}
              className="border border-gray-300 rounded-md p-2 flex-1"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {productData.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-1">
                <div
                  className="w-6 h-6 rounded border"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm">{color}</span>
                <button
                  type="button"
                  onClick={() =>
                    setProductData((prev) => ({
                      ...prev,
                      colors: prev.colors.filter((_, i) => i !== index),
                    }))
                  }
                  className="text-red-500 text-sm ml-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" multiple onChange={handleImageUpload} accept="image/*" />

          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div
                key={index}
                className="relative group w-24 h-24 border border-gray-200 rounded-md overflow-hidden"
              >
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-full h-full object-cover transition duration-300 group-hover:opacity-80"
                />

                <button
                  type="button"
                  onClick={() => handleDeleteImage(index, image.publicId)}
                  className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  title="Remove"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Update Button */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-2 mt-2 rounded-md text-white ${
            uploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {uploading ? "Uploading..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
