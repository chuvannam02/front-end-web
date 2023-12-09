import React from "react";
import { Form, Input, Button, notification } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetPassword } from "../../../redux/apiRequest";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm(); // Use Form hooks

  const onFinish = async (values) => {
    const { password } = values;
    const userToken = {
      token: token,
    };

    try {
      await resetPassword({ password }, dispatch, history, userToken);
      await notify("success", "Success", "Mật khẩu đã được đặt lại thành công!");
      history.push("/login");
    } catch (error) {
      notify("error", "Error", "Đặt lại mật khẩu thất bại!");
    }
  };

  const notify = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
      placement: "topRight",
    });
  };

  return (
    <div>
      <div className="reset">
        <h3 className="title">Nhập mật khẩu mới của bạn tại đây</h3>
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu của bạn" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;