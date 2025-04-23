import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/slices/adminProductSlice";
import axios from "axios";

const categories = ["Top Wear", "Bottom Wear", "Accessories", "Bags"];
const sizesList = ["S", "M", "L", "XL", "XXL", "XXXL", "One Size"];
const genders = ["Men", "Women", "Unisex"];
const materials = ["Cotton", "Fleece", "Denim", "Polyester Leather", "Wool"];

const AddProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    discountPrice: "",
    countInStock: "",
    sku: "",
    category: categories[0],
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: [],
    images: [],
    rating: "",
    numReviews: "",
  });

  const [uploading, setUploading] = useState(false);
  const [newColor, setNewColor] = useState("#000000");
  const [newColorLabel, setNewColorLabel] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProductData((prevData) => ({
        ...prevData,
        images: [
          ...prevData.images,
          {
            url: data.imageUrl,
            publicId: data.publicId,
            altText: "",
          },
        ],
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (index, publicId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, {
        data: { public_id: publicId },
      });

      setProductData((prevData) => ({
        ...prevData,
        images: prevData.images.filter((_, i) => i !== index),
      }));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    navigate("/admin/products");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name, Brand, SKU, Collections */}
        {["name", "brand", "sku", "collections"].map((field) => (
          <div key={field}>
            <label className="block font-semibold mb-2 capitalize">
              {field}
            </label>
            <input
              type="text"
              name={field}
              value={productData[field]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        ))}
        {/* Description */}
        <div>
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
        {/* Price, Discount, CountInStock, Rating, NumReviews */}
        {["price", "discountPrice", "countInStock", "rating", "numReviews"].map(
          (field) => (
            <div key={field}>
              <label className="block font-semibold mb-2 capitalize">
                {field}
              </label>
              <input
                type="number"
                name={field}
                value={productData[field]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          )
        )}
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
        {/* Gender */}
<div>
  <label className="block font-semibold mb-2">Gender</label>
  <div className="flex gap-4">
    {genders.map((gen) => (
      <label key={gen} className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="gender"
          value={gen}
          checked={productData.gender.includes(gen)}
          onChange={(e) => {
            const { checked, value } = e.target;
            const updatedGender = checked
              ? [...productData.gender, value]
              : productData.gender.filter((g) => g !== value);
            setProductData({ ...productData, gender: updatedGender });
          }}
          className="accent-black"
        />
        {gen}
      </label>
    ))}
  </div>
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
        <div className="col-span-full">
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
{/* Upload  */}
        <div className="col-span-full">
          <label className="block font-semibold mb-2">Product Images</label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploading && (
              <span className="text-sm text-gray-500 animate-pulse">
                Uploading...
              </span>
            )}
          </div>

          {productData.images.length > 0 && (
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
          )}
        </div>

        <div className="col-span-full">
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 mt-4 rounded-md text-white ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {uploading ? "Uploading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
