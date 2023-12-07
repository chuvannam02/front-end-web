import { useState } from "react";
import { Form, Input, Button, notification} from "antd";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAnUser } from "../../../redux/apiRequest";
import { EyeInvisibleOutlined,EyeTwoTone } from '@ant-design/icons';
import "./AddNewUser.scss";
const AddNewUser = () => {
  const [form] = Form.useForm();
  //   const [isShowDetail, setIsShowDetail] = useState(false);
  //   const handleHideShow = (status) => {
  //     setIsShowDetail(status);
  //   };
  // handle hide show password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.auth.login?.currentUser);
  //   let token = user?.accessToken;
  // let token1 = localStorage.getItem("token");
  const mess = useSelector((state) => state.users?.mess);
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   getValues,
  //   watch,
  // } = useForm();
  const onFinish = async (values) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      phonenumber: values.phonenumber,
      address: values.address,
    };

    try {
      const res = await dispatch(createAnUser({ newUser, user }));
      if (res) {
        notification.success({
          message: "Thành công",
          description: `Tạo mới thông tin  người dùng ${values.name ?? ""} thành công`,
        });
        form.resetFields();
      }
    } catch (error) {
      console.error("Error creating user:", error);
      notification.error({
        message: "Thất bại",
        description: `Tạo mới thông tin  người dùng ${values.name ?? ""} thất bại`,
      });
    }
  };
  // const onSubmit = async (data) => {
  //   const newUser = {
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     phonenumber: data.phonenumber,
  //     address: data.address,
  //   };
  //   if (newUser) {
  //     const res = await dispatch(createAnUser({ newUser, user }));
  //   }
  // };
  return (
    <>
    <h3>Tạo mới tài khoản người dùng</h3>
      <div className="body">
        <Form
          form={form}
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
          >
            <Input placeholder="Nhập tên của bạn" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email của bạn!" },
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email!",
              },
            ]}
          >
            <Input placeholder="Nhập email của bạn" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu của bạn"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="password_repeat"
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu không trùng khớp!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Vui lòng xác nhận mật khẩu"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            label="Số điện thoại liên lạc"
            name="phonenumber"
            rules={[
              {
                pattern: /^[1-9]{1}[0-9]*$/,
                message: "Số điện thoại không đúng định dạng!",
              },
            ]}
          >
            <Input type="number" placeholder="Nhập số điện thoại của bạn" />
          </Form.Item>

          <Form.Item label="Địa chỉ" name="address">
            <Input placeholder="Nhập địa chỉ nhận hàng" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Xác nhận thêm người dùng mới
            </Button>
          </Form.Item>
        </Form>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend>Thêm người dùng mới</legend>
            <div className="input_user">
              <label>Tên:</label>
              <input
                type="text"
                name="name"
                autoComplete="on"
                className="inputText"
                placeholder="Nhập tên của bạn"
                {...register("name", { required: true })}
              />

              {errors.name?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>
                  Xin hãy điền vào phần thông tin tên
                </p>
              )}
            </div>
            <div className="input_user">
              <label>Email:</label>
              <input
                type="text"
                name="email"
                autoComplete="on"
                placeholder="Nhập email của bạn tại đây"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-z0-9._%+-]+@gmail.com$/i,
                    message: "Please enter format email: xxx@gmail.com !",
                  },
                })}
              />
              {errors.email?.type === "required" && (
                <p role="alert" style={{ color: "red" }}>
                  Xin hãy điền vào phần thông tin Email
                </p>
              )}
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p role="alert" style={{ color: "red" }}>
                    {message}
                  </p>
                )}
              />
            </div>
            <div className="input_user">
              <label>Mật khẩu</label>
              <div className="a">
                <input
                  name="password"
                  id="password"
                  autoComplete="on"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu của bạn tại đây"
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
                    Mật khẩu không được để trống
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p style={{ color: "red" }} role="alert">
                    Mật khẩu phải từ 6 ký tự trở lên
                  </p>
                )}
              </div>
            </div>
            <div className="input_user">
              <label>Xác nhận mật khẩu</label>
              <div className="a">
                <input
                  {...register("password_repeat", { required: true })}
                  id="password_repeat"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Vui lòng xác nhận mật khẩu"
                  autoComplete="on"
                />
                {showConfirmPassword ? (
                  <span
                    className="showConfirmPassword"
                    onClick={handleConfirmPassword}>
                    <FaEye />
                  </span>
                ) : (
                  <span
                    className="hideConfirmPassword"
                    onClick={handleConfirmPassword}>
                    <FaEyeSlash />
                  </span>
                )}
                {errors.password_repeat?.type === "required" && (
                  <p style={{ color: "red" }} role="alert">
                    Phần xác nhận mật khẩu không được để trống!
                  </p>
                )}
                {watch("password") !== watch("password_repeat")
                  ? getValues("password_repeat") && (
                    <p style={{ color: "red" }} role="alert">
                      Mật khẩu không trùng khớp
                    </p>
                  )
                  : null}
              </div>
            </div>
            <div className="input_user">
              <label>Số điện thoại liên lạc:</label>
              <input
                type="number"
                name="phonenumber"
                autoComplete="on"
                placeholder="Nhập số điện thoại"
                {...register("phonenumber", {
                  pattern: {
                    value: /^[1-9]{1}[0-9]*$/,
                    message: "Not begin with 0 digit",
                  },
                })}
              />

              <ErrorMessage
                errors={errors}
                name="phonenumber"
                render={({ message }) => (
                  <p role="alert" style={{ color: "red" }}>
                    {message}
                  </p>
                )}
              />
            </div>
            <div className="input_user">
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="address"
                autoComplete="on"
                placeholder="Nhận địa chỉ nhận hàng"
                {...register("address")}
              />
            </div>
            <div className="btn_user">
              <button>Xác nhận thêm người dùng mới</button>
            </div>
          </fieldset>
                </form>*/}
      </div>

      {/* {isShowDetail === true && (
        <div onClick={()=> {handleHideShow(false)}}>Hide this form add a new User</div>
      )}
      {isShowDetail === false && (
        <div onClick={()=> {handleHideShow(true)}}>Show this form add a new User</div>
      )} */}
      {/* {isShowDetail === true ? (
        <div
          className="hideshow"
          onClick={() => {
            handleHideShow(false);
          }}>
          Ẩn mẫu nhập tạo người dùng mới
        </div>
      ) : (
        <div
          className="hideshow"
          onClick={() => {
            handleHideShow(true);
          }}>
          Hiện mẫu thêm người dùng mới
        </div>
      )} */}
      {/* <div>{mess}</div> */}
    </>
  );
};

export default AddNewUser;
