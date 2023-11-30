import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { reset } from "../../../../front_end/src/redux/userSlice";
import { loginUser } from "../../redux/apiRequest";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import "./Login.scss";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = useSelector((state) => state.auth.login?.errorMessage);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const msg = useSelector((state) => state.auth.login?.mss);
  let user = useSelector((state) => state.auth.login?.currentUser);

  // Tránh reload lại trang khi ấn nút submit (continue)
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    const newUser = {
      email: data.email,
      password: data.password,
    };
    setIsLoading(true);
    try {
      if (newUser) {
        await dispatch(loginUser(newUser));
        
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleForget = (e) => {
    e.preventDefault();
    history.push("/forget_password");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(onSubmit)();
    }
  };
  // Use useEffect to perform redirection after user object is updated
  useEffect(() => {
    if (user !== null) {
      if (user?.user.admin === true) {
        history.push("/admin"); // Use history.push to navigate
      } else {
        history.push("/"); // Use history.push to navigate
      }
    }
  }, [user, history]);
  return (
    <>
      <div className="login" onKeyDown={handleKeyDown}>
        <div className="App">
          <h3 className="title">ĐĂNG NHẬP</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <div className="input_container">
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-z0-9._%+-]+@gmail.com$/i,
                      message:
                        "Vui lòng nhập đúng định dạng email như sau: abc@gmail.com !",
                    },
                  })}
                  placeholder=" "
                  type="text"
                  name="email"
                  autoComplete="on"
                  id="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  className="form-input"
                />
                <label className="form-label">Email</label>
              </div>

              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p style={{ color: "red" }}>{message}</p>
                )}
              />
              {errors.email?.type === "required" && (
                <p style={{ color: "red" }} role="alert">
                  Vui lòng điền vào phần email!
                </p>
              )}
            </div>

            <div className="form-control">
              <div className="input_container">
                <input
                  {...register("password", { required: true, minLength: 6 })}
                  placeholder=" "
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="on"
                  className="form-input"
                />
                <label className="form-label">Mật khẩu</label>
                {showPassword ? (
                  <div
                    className="showPassword"
                    onClick={() => setShowPassword(false)}
                  >
                    <FiEye />
                  </div>
                ) : (
                  <div
                    className="hidePassword"
                    onClick={() => setShowPassword(true)}
                  >
                    <FiEyeOff />
                  </div>
                )}
              </div>

              {errors.password?.type === "required" && (
                <p style={{ color: "red" }} role="alert">
                  Vui lòng điền vào phần mật khẩu!
                </p>
              )}
              {errors?.password?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  Mật khẩu của bạn không được phép dưới 6 ký tự
                </p>
              )}
            </div>
            <div className="forget_password">
              <p onClick={handleForget}>Quên mật khẩu?</p>
            </div>
            <div className="btn">
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit(onSubmit)}
                className="btnLogin"
              >
                {isLoading ? (
                  <div className="bounce-loading">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </div>
          </form>
          <div className="login_account">
            <p onClick={handleRegister}>
              Nếu bạn chưa có tài khoản. Hãy ấn vào đây để đăng ký!
            </p>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
