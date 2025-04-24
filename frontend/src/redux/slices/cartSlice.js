import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper functions
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add To Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const productRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
      );
      const { countInStock } = productRes.data;

      if (quantity >= countInStock) {
        return rejectWithValue({ message: "Số lượng vượt quá tồn kho" });
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Lỗi thêm vào giỏ hàng" }
      );
    }
  }
);

// Update Cart Quantity
export const updateCartitemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const productRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${productId}`
      );
      const { countInStock } = productRes.data;

      if (quantity > countInStock) {
        return rejectWithValue({ message: "Số lượng vượt quá tồn kho" });
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Lỗi cập nhật số lượng" }
      );
    }
  }
);

// Remove Item
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, guestId, userId, size, color }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          data: { productId, guestId, userId, size, color },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Merge Guest Cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
  clearCart: (state) => {
    state.cart = { products: [], totalPrice: 0 };
    localStorage.removeItem("cart");
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi tải giỏ hàng";
      })

      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi thêm sản phẩm";
      })

      .addCase(updateCartitemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartitemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartitemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi cập nhật số lượng";
      })

      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi xóa sản phẩm";
      })

      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Lỗi gộp giỏ hàng";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
