import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../../redux/apiRequest";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const openNotification = (type, message) => {
    notification[type]({
      message,
      placement: "topRight",
    });
  };

  const onFinish = (data) => {
    const User_forget = {
      email: data.email,
    };

    if (User_forget) {
      forgetPassword(User_forget, dispatch)
        .then(() => {
          openNotification("success", "Send link reset password to your email successfully!!");
        })
        .catch((error) => {
          openNotification("error", "Failed to send reset password link. Please try again.");
        });
    }
  };

  return (
    <div className="forget">
      <h3 className="title">Forget Password</h3>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgetPassword;