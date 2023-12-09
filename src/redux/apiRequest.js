import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  forgetFailed,
  forgetStart,
  forgetSuccess,
  // loginFailed,
  // loginStart,
  // loginSuccess,
  // logoutFailed,
  // logoutStart,
  // logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  resetFailed,
  resetStart,
  resetSuccess,
} from "./reducer/authSlice";
import {
  getProductsFailed,
  getProductsStart,
  getProductsSuccess,
  getProductSuccess,
  reset1,
} from "./reducer/productSlice";
// import {
// getUsersFailed,
// getUsersStart,
// getUsersSuccess,
// deleteUserStart,
// deleteUserSuccess,
// deleteUserFailed,
// reset,
// updateUserStart,
// updateUserFailed,
// updateUserSuccess,
// createUserStart,
// createUserFailed,
// createUserSuccess,
// } from "./reducer/userSlice";
import { createAxios } from "../createInstance";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://mern-stack-backend-kw0h.onrender.com/login", user, {
        withCredentials: true,
      });
      const data = response.data;
      // localStorage.setItem("token", res.data.accessToken);

      return data;

      // dispatch(loginSuccess(response.data));
    } catch (error) {
      console.error(error);
      return rejectWithValue("FAILED", error);
    }
  }
);

export const registerUser = async (user, dispatch, history) => {
  dispatch(registerStart());
  try {
    const res = await axios.post("https://mern-stack-backend-kw0h.onrender.com/register", user);
    dispatch(registerSuccess(res.data));
    history.push("/login");
  } catch (error) {
    dispatch(registerFailed());
  }
};

// Async thunk action creator for getting all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (user) => {
    try {
      const axiosJWT = createAxios(user); // Create Axios instance with the access token
      const res = await axiosJWT.get("https://mern-stack-backend-kw0h.onrender.com/api/v1/user/all", {
        headers: {
          token: user.accessToken,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      // throw new Error('Get all users failed');
      console.log(error);
    }
  }
);
// export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
//   dispatch(getUsersStart());
//   try {
//     const res = await axiosJWT.get("http://localhost:3000/user/all", {
//       headers: {
//         token: accessToken,
//       },
//       withCredentials: true,
//     });
//     dispatch(getUsersSuccess(res.data));
//   } catch (error) {
//     dispatch(getUsersFailed());
//   }
// };

// export const updateUser = async (accessToken, dispatch, id, user) => {
//   dispatch(updateUserStart());
//   try {
//     const res = await axios.patch(
//       "http://localhost:3000/user/update/" + id,
//       user,
//       {
//         headers: {
//           token: accessToken,
//           "Content-type": "application/json",
//         },
//       }
//     );
//     dispatch(updateUserSuccess(res.data));
//   } catch (error) {
//     dispatch(updateUserFailed());
//   }
// };
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ user, id, updatedFields }, { rejectWithValue }) => {
    try {
      // Create Axios instance with the access token
      const axiosJWT = createAxios(user);
      const res = await axiosJWT.patch(
        `https://mern-stack-backend-kw0h.onrender.com/api/v1/user/update/${id}`,
        updatedFields,
        {
          headers: {
            token: user.accessToken,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("FAILED", error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async ({ user, id }, { rejectWithValue }) => {
    try {
      // Create Axios instance with the access token
      // console.log("user: " + user?.user);
      // console.log("id: " + id);
      const axiosJWT = createAxios(user);
      await axiosJWT.delete(`https://mern-stack-backend-kw0h.onrender.com/api/v1/user/delete/${id}`, {
        headers: {
          token: user.accessToken,
          "Content-type": "application/json",
        },
        withCredentials: true,
      });
      return id;
    } catch (error) {
      if (error?.request?.status === 403) {
        return rejectWithValue("You are not allowed to delete other users");
      }
      console.log(error.message);
      return rejectWithValue("FAILED", error);
    }
  }
);

export const searchUser = createAsyncThunk(
  "users/searchUser",
  async ({ userObject, searchString }, { rejectWithValue }) => {
    try {
      // Create Axios instance with the access token
      const axiosJWT = createAxios(userObject);
      const res = await axiosJWT.get(
        `https://mern-stack-backend-kw0h.onrender.com/api/v1/user/search?name=${searchString}`,
        {
          headers: {
            token: userObject.accessToken,
          },
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("FAILED", error);
    }
  }
);
// async (accessToken, dispatch, id, axiosJWT) => {
//   dispatch(reset());
//   dispatch(deleteUserStart());
//   try {
//     const res = await axiosJWT.delete(
//       "http://localhost:3000/user/delete/" + id,
//       {
//         headers: {
//           token: accessToken,
//           "Content-type": "application/json",
//         },
//         withCredentials: true,
//       }
//     );
//     dispatch(deleteUserSuccess(res.message));
//   } catch (error) {
//     if (error.request?.status === 403) {
//       dispatch(deleteUserFailed("You are not allow to delete other users"));
//     }
//      dispatch(deleteUserFailed("FAILED"));
//   }
// };

// export const logoutUser = async (token, id, dispatch) => {
//   dispatch(reset());
//   dispatch(logoutStart());
//   try {
//     await axios.post(
//       "http://localhost:3000/logout",
//       { id: id },
//       {
//         headers: {
//           token: token,
//         },
//         withCredentials: true,
//       }
//     );
//     dispatch(logoutSuccess());
//     // history.push("/login");
//   } catch (error) {
//     dispatch(logoutFailed({ error: error.message }));
//   }
// };

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (userObject, { rejectWithValue }) => {
    // console.log("Dispatching logoutUser thunk");
    // console.log("user:", userObject);
    try {
      // Create Axios instance with the access token
      const axiosJWT = createAxios(userObject);
      const response = await axiosJWT.post(
        "https://mern-stack-backend-kw0h.onrender.com/logout",
        { id: userObject.user._id },
        {
          headers: {
            token: userObject?.accessToken,
          },
          withCredentials: true,
        }
      );
      // console.log("LogoutUser thunk succeeded");
    } catch (error) {
      console.error(error.message);
      return rejectWithValue("FAILED", error);
    }
  }
);

export const forgetPassword = async (email, dispatch) => {
  dispatch(forgetStart());
  try {
    const res = await axios.post(
      "http://localhost:3000/forget-password",
      email
    );
    dispatch(forgetSuccess(res.data));
  } catch (error) {
    dispatch(forgetFailed(error));
  }
};
export const resetPassword = async (password, dispatch, history, token) => {
  dispatch(resetStart());
  try {
    const res = await axios.patch(
      `https://mern-stack-backend-kw0h.onrender.com/reset-password/${token.token}`,
      password,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(resetSuccess(res.data));
    history.push("/login");
  } catch (error) {
    dispatch(resetFailed(error));
  }
};

export const createAnUser = createAsyncThunk(
  "user/create",
  async ({ newUser, user }, { rejectWithValue }) => {
    // console.log("Dispatching createAnUser thunk");
    // console.log("newUser is: ", newUser);
    // console.log("new is: ", user);
    try {
      // Create Axios instance with the access token
      const axiosJWT = createAxios(user);
      const response = await axiosJWT.post(
        "https://mern-stack-backend-kw0h.onrender.com/api/v1/user",
        newUser,
        {
          headers: {
            token: user?.accessToken,
          },
          withCredentials: true,
        }
      );
      return true;
      // console.log("Create new user thunk successfully");
    } catch (error) {
      console.error(error.message);
      return rejectWithValue("FAILED", error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ userObject, page, limit }, { rejectWithValue }) => {
    // getState: Lấy state hiện tại
    // const { categories } = getState();
    // Kiểm tra xem dữ liệu cho trang này đã được tải chưa
    // if (categories[page]) {
    //   // Nếu đã tải, trả về dữ liệu từ state
    //   return categories[page];
    // }
    try {
      const axiosJWT = createAxios(userObject);
      const response = await axiosJWT.get(
        `https://mern-stack-backend-kw0h.onrender.com/api/v1/product/all?page=${page}&limit=${limit}`,
        {
          headers: {
            token: userObject?.accessToken,
          },
          withCredentials: true,
        }
      );
      // Nếu chưa tải, gọi API và lưu dữ liệu vào state
      // return { ...response.data, page };
      return response;
    } catch (error) {
      return rejectWithValue("FAILED", error.message);
    }
  }
);
export const GetAProduct = createAsyncThunk(
  "products/getAProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://mern-stack-backend-kw0h.onrender.com/api/v1/product/find/" + id
      );
      return response;
    } catch (error) {
      return rejectWithValue("FAILED", error.message);
    }
  }
);

export const createACategory = createAsyncThunk(
  "categories/createNewCategory",
  async ({ userObject, newCategory }, { rejectWithValue }) => {
    console.log("Dispatching createACategory thunk");
    console.log("userObject is: ", userObject);
    console.log("newCategory is: ", newCategory);

    try {
      const axiosJWT = createAxios(userObject);
      const response = await axiosJWT.post(
        "https://mern-stack-backend-kw0h.onrender.com/api/v1/categories/create",
        newCategory,
        {
          headers: {
            token: userObject?.accessToken,
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("FAILED", error.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async ({ userObject, page, limit }, { rejectWithValue }) => {
    // getState: Lấy state hiện tại
    // const { categories } = getState();
    // Kiểm tra xem dữ liệu cho trang này đã được tải chưa
    // if (categories[page]) {
    //   // Nếu đã tải, trả về dữ liệu từ state
    //   return categories[page];
    // }
    try {
      const axiosJWT = createAxios(userObject);
      const response = await axiosJWT.get(
        `https://mern-stack-backend-kw0h.onrender.com/api/v1/categories?page=${page}&limit=${limit}`,
        {
          headers: {
            token: userObject?.accessToken,
          },
          withCredentials: true,
        }
      );
      // Nếu chưa tải, gọi API và lưu dữ liệu vào state
      // return { ...response.data, page };
      return response;
    } catch (error) {
      return rejectWithValue("FAILED", error.message);
    }
  }
);

export const removeACategory = createAsyncThunk(
  "categories/removeACategory",
  async ({ userObject, id }, { rejectWithValue }) => {
    try {
      console.log("userObject: ", userObject);
      console.log("id: ", id);
      const axiosJWT = createAxios(userObject);
      const response = await axiosJWT.delete(
        `https://mern-stack-backend-kw0h.onrender.com/api/v1/categories/delete/${id}`,
        {
          headers: {
            token: userObject?.accessToken,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue("FAILED", error.message);
    }
  }
);

export const updateACategory = createAsyncThunk(
  "categories/updateACategory",
  async ({ userObject, id, newInforOfCategory }, { rejectWithValue }) => {
    try {
      console.log("userObject: ", userObject);
      console.log("id: ", id);
      const axiosJWT = createAxios(userObject);
      const response = await axiosJWT.put(
        `https://mern-stack-backend-kw0h.onrender.com/api/v1/categories/update/${id}`,
        newInforOfCategory,
        {
          headers: {
            token: userObject?.accessToken,
          },
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue("FAILED", error.message);
    }
  }
);
export const getAllOrder = createAsyncThunk(
  "orders/getAllOrders",
  async ({ userObject, page, limit }, { rejectWithValue }) => {
    try {
      const axiosJWT = createAxios(userObject);
      const response = await axiosJWT.get(
        `https://mern-stack-backend-kw0h.onrender.com/api/v1/orders/all?page=${page}&limit=${limit}`,
        {
          headers: {
            token: userObject?.accessToken,
          },
          withCredentials: true,
        }
      );
      // console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue("FAILED", error.message);
    }
  }
);
