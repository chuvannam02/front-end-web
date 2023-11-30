import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getAllUsers, updateUser, searchUser } from "../apiRequest";
const initialState = {
  users: {
    allUsers: null,
    isFetching: false,
    error: false,
  },
  messages: "",
  mess: null,
  msg: "",
  newUser: {
    infor: null,
    isFetching: false,
    error: false,
  },
};
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    msg: "",
    messages: "",
    mess: "",
    newUser: {
      infor: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    // createUserStart: (state) => {
    //   state.newUser.isFetching = true;
    // },
    // createUserSuccess: (state, action) => {
    //   state.newUser.isFetching = false;
    //   state.newUser.error = false;
    //   state.newUser.infor = action.payload;
    //   state.mess = "Create User successfully";
    // },
    // createUserFailed: (state, action) => {
    //   state.newUser.error = true;
    //   state.mess = action.payload;
    // },
    // updateUserStart: (state) => {
    //   state.users.isFetching = true;
    //   state.users.error = false;
    // },
    // updateUserSuccess: (state, action) => {
    //   state.users.isFetching = false;
    //   state.users.error = false;
    //   state.msg = action.payload;
    // },
    // updateUserFailed: (state, action) => {
    //   state.users.isFetching = false;
    //   state.users.error = true;
    //   state.msg = action.payload;
    // },
    reset(state) {
      Object.assign(state, initialState);
    },
    // getUsersStart: (state) => {
    //   state.users.isFetching = true;
    // },
    // getUsersSuccess: (state, action) => {
    //   state.users.isFetching = false;
    //   state.users.allUsers = action.payload;
    //   state.users.error = false;
    // },
    // getUsersFailed: (state) => {
    //   state.users.isFetching = false;
    //   state.users.error = true;
    // },
    // deleteUserStart: (state) => {
    //   state.users.isFetching = true;
    // },
    // deleteUserSuccess: (state, action) => {
    //   state.users.isFetching = false;
    //   state.messages = action.payload;
    //   state.users.allUsers =  state.users.allUsers.filter((user)=> user._id !== action.payload._id);
    //   state.users.error = false;
    // },
    // deleteUserFailed: (state, action) => {
    //   state.users.isFetching = false;
    //   state.users.error = true;
    //   state.messages = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.users.isFetching = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users.isFetching = false;
        state.users.allUsers = action.payload;
        state.users.error = false;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.users.isFetching = false;
        state.users.error = true;
      })
      .addCase(deleteUser.pending, (state) => {
        state.users.isFetching = true;
        state.users.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users.isFetching = false;
        state.users.allUsers = state.users.allUsers.filter(
          (user) => user._id !== action.payload
        );
        state.messages = "User deleted successfully";
        state.users.error = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.users.isFetching = false;
        state.users.error = true;
        state.messages = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.users.isFetching = true;
        state.users.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users.isFetching = false;
        state.users.error = false;
        const updatedUser = action.payload;

        const updatedAllUsers = state.users.allUsers.map((user) => {
          if (user._id === updatedUser.data._id) {
            return updatedUser.data; // Update the specific user
          }
          return user; // Keep other users unchanged
        });

        state.users.allUsers = updatedAllUsers;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.users.isFetching = false;
        state.users.error = true;
        state.msg = action.payload;
      })
      .addCase(searchUser.pending, (state) => {
        state.users.isFetching = true;
        state.users.error = false;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.users.isFetching = false;
        state.users.error = false;
        const userSearch = action.payload.data;
        state.users.allUsers = userSearch;
      })
      .addCase(searchUser.rejected, (state, action) => {
        state.users.isFetching = false;
        state.users.error = true;
        state.msg = action.error.message;
      })
      .addCase("CREATE_USER_START", (state) => {
        state.newUser.isFetching = true;
      })
      .addCase("CREATE_USER_SUCCESS", (state, action) => {
        state.newUser.isFetching = false;
        state.newUser.error = false;
        state.newUser.infor = action.payload;
        state.mess = "Create User successfully";
      })
      .addCase("CREATE_USER_FAILED", (state, action) => {
        state.newUser.error = true;
        state.mess = action.payload;
      });

  },

  // // Code logic xử lý async action
  // extraReducers: (builder) => {
  //   // Bắt đầu thực hiện action login (Promise pending)
  //   builder.addCase(login.pending, (state) => {
  //     // Bật trạng thái loading
  //     state.isLoading = true;
  //   });

  //   // Khi thực hiện action login thành công (Promise fulfilled)
  //   builder.addCase(login.fulfilled, (state, action) => {
  //     // Tắt trạng thái loading, lưu thông tin user vào store
  //     state.isLoading = false;
  //     state.currentUser = action.payload;
  //   });

  //   // Khi thực hiện action login thất bại (Promise rejected)
  //   builder.addCase(login.rejected, (state, action) => {
  //     // Tắt trạng thái loading, lưu thông báo lỗi vào store
  //     state.isLoading = false;
  //     state.errorMessage = action.payload.message;
  //   });
  // };
});

export const {
  // createUserStart,
  // createUserSuccess,
  // createUserFailed,
  // getUsersStart,
  // getUsersSuccess,
  // getUsersFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  reset,
  // updateUserStart,
  // updateUserSuccess,
  // updateUserFailed,
} = userSlice.actions;

export default userSlice.reducer;
