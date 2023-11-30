import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
const Register = () => {
  // handle hide show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  // For validate form register
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    registerUser(newUser, dispatch, history);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  return (
    <>
      <section className="register-container">
        <div className="register-title"> ĐĂNG KÝ TÀI KHOẢN MỚI </div>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control username">
            <label>Tên người dùng</label>
            <input
              {...register("name", { required: true })}
              id="name"
              name="name"
              type="text"
              autoComplete="on"
              placeholder="Enter your username"
            />
            {errors.name?.type === "required" && (
              <p style={{ color: "red" }} role="alert">
                Vui lòng điền vào phần Tên người dùng
              </p>
            )}
          </div>
          <div className="form-control email">
            <label>Email</label>
            <input
              id="email"
              name="email"
              type="text"
              autoComplete="on"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[a-zA-z0-9._%+-]+@gmail.com$/i,
                  message:
                    "Vui lòng nhập đúng định dạng email như sau: abc@gmail.com !",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p style={{ color: "red" }}>{message}</p>
              )}
            />
            {errors.email?.type === "required" && (
              <p style={{ color: "red" }} role="alert">
                Vui lòng điền vào phần email
              </p>
            )}
          </div>

          <div className="form-control password">
            <label>Mật khẩu</label>
            <input
              name="password"
              id="password"
              autoComplete="on"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password in here"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {showPassword ? (
              <span className="show_password" onClick={handlePassword}>
                <FaEye />
              </span>
            ) : (
              <span className="hide_password" onClick={handlePassword}>
                <FaEyeSlash />
              </span>
            )}

            {errors.password?.type === "required" && (
              <p style={{ color: "red" }} role="alert">
                Vui lòng điền vào phần Mật khẩu
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }} role="alert">
                Mật khẩu phải từ 6 ký tự trở lên
              </p>
            )}
          </div>
          <div className="form-control">
            <label>Xác nhận mật khẩu</label>
            <input
              {...register("password_repeat", { required: true })}
              id="password_repeat"
              autoComplete="on"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm above password"
            />
            {showConfirmPassword ? (
              <span
                className="showConfirmPassword"
                onClick={handleConfirmPassword}
              >
                <FaEye />
              </span>
            ) : (
              <span
                className="hideConfirmPassword"
                onClick={handleConfirmPassword}
              >
                <FaEyeSlash />
              </span>
            )}
            {errors.password_repeat?.type === "required" && (
              <p style={{ color: "red" }} role="alert">
                Vui lòng điền vào phần Xác nhận mật khẩu
              </p>
            )}
            {/* errors will return when field validation fails  */}
            {/* here we watch the both password and confirm password filed and if both not match, trigger the validation */}
            {watch("password") !== watch("password_repeat")
              ? getValues("password_repeat") && (
                  <p style={{ color: "red" }} role="alert">
                    Mật khẩu không trùng khớp
                  </p>
                )
              : null}
          </div>
          <button type="submit">Tạo tài khoản mới</button>
        </form>
        <div className="register_account">
          <p>
            Nếu bạn đã có tài khoản rồi
            <br />
            <span onClick={handleLogin}>Vui lòng ấn vào đây để đăng nhập!</span>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
