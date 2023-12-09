import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./Register.scss";
const Register = () => {
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

  const onFinish = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    registerUser(newUser, dispatch, history);
  };

  const notify = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  return (
    <div className="register-container">
      <section className="register-form">
        <div className="register-title"> ĐĂNG KÝ TÀI KHOẢN MỚI </div>
        <hr />
        <Form onFinish={onFinish}>
          <Form.Item
            label="Tên người dùng"
            name="name"
            rules={[{ required: true, message: "Vui lòng điền vào phần Tên người dùng" }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng điền vào phần email" },
              {
                type: "email",
                message: "Vui lòng nhập đúng định dạng email như sau: abc@gmail.com !",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng điền vào phần Mật khẩu" }]}
          >
            <Input.Password
              placeholder="Enter your password in here"
              iconRender={(visible) =>
                visible ? <EyeOutlined onClick={handlePassword} /> : <EyeInvisibleOutlined onClick={handlePassword} />
              }
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="password_repeat"
            rules={[{ required: true, message: "Vui lòng điền vào phần Xác nhận mật khẩu" }]}
          >
            <Input.Password
              placeholder="Confirm above password"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined onClick={handleConfirmPassword} />
                ) : (
                  <EyeInvisibleOutlined onClick={handleConfirmPassword} />
                )
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo tài khoản mới
            </Button>
          </Form.Item>
        </Form>
        <div className="register_account">
          <p>
            Nếu bạn đã có tài khoản rồi
            <br />
            <span onClick={() => history.push("/login")}>Vui lòng ấn vào đây để đăng nhập!</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Register;