import React, { useState } from "react";
import {
  Button,
  //   Cascader,
  //   Checkbox,
  DatePicker,
  Form,
  Input,
  //   InputNumber,
  Radio,
  //   Select,
  //   Slider,
  //   Switch,
  //   TreeSelect,
  //   Upload,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createACategory } from "../../../redux/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateNewCategory = () => {
  const notify1 = () => {
    toast.success(`Tạo mới danh mục ${values.name ?? ""} thành công`, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const notify2 = () => {
    toast.warn("Có lỗi xảy ra khi cố gắng tạo mới tài danh mục phân loại!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [values, setValues] = useState({
    status: "active",
    name: "",
  });

  const onFinish = async (values) => {
    await setValues(values);
    console.log(values);
    try {
      const res = await dispatch(
        createACategory({ userObject: user, newCategory: values })
      );
      notify1();
      form.resetFields(); // Reset the form fields after submission
    } catch (error) {
      console.error(error);
      notify2();
    }
  };

  const onReset = () => {
    form.resetFields();
    setValues({
      status: "active",
      name: "",
    });
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ minWidth: 600, marginTop: 100 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Trạng Thái"
            name="status"
            initialValue={values.status}
          >
            <Radio.Group>
              <Radio value="active">Hoạt động</Radio>
              <Radio value="inactive">Ngưng hoạt động</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Tên danh mục"
            name="name"
            initialValue={values.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateNewCategory;
