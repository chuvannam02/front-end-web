import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async (user) => {
  try {
    // let refreshToken1 = Cookies.get("refreshToken"); // => 'value'
    const res = await axios.post("http://localhost:3000/refresh", user, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// export const createAxios = (user, dispatch, stateSuccess) => {
//   const newInstance = axios.create();
//   newInstance.interceptors.request.use(
//     async (config) => {
//       let date = new Date();
//       const decodedToken = jwt_decode(user?.accessToken.split(" ")[1]);
//       if (decodedToken.exp < date.getTime() / 1000) {
//         const data = await refreshToken();
//         const refreshUser = {
//           ...user,
//           accessToken: data.accessToken,
//           // refreshToken gắn trong cookies rồi
//           // refreshToken: data.refreshToken,
//         };
//         dispatch(stateSuccess(refreshUser));
//         config.headers["token"] = "Bearer " + data.accessToken;
//       }
//       return config;
//     },
//     (error) => {
//       console.warn('Error status', error.response.status)
//     // return Promise.reject(error)
//     if (error.response) {
//         return error.response.data;
//     } else {
//         return Promise.reject(error)
//     }
//     }
//   );
//   return newInstance;
// };
// Create the Axios instance with token refresh functionality
export const createAxios = (user) => {
  const instance = axios.create();
  instance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      let decodedToken = jwt_decode(user?.accessToken?.split(" ")[1]);
      // console.log(decodedToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        console.log(user.user);
        let data = await refreshToken(user?.user);
        // console.log(data);
        let refreshedUser = {
          ...user.user,
          accessToken: data.accessToken,
        };
        localStorage.setItem("token", `Bearer ${data.accessToken}`);
        config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return { config, refreshedUser };
      }
      config.headers["Authorization"] = user?.user?.accessToken;
      return config;
    },
    (error) => {
      console.log("Error status", error.response.status);
      return Promise.reject(error);
    }
  );

  return instance;
};
