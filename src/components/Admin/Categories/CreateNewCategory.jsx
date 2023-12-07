import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio, Space, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { createACategory } from "../../../redux/apiRequest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetNewCategory } from "../../../redux/reducer/categorySlice";
const CreateNewCategory = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const newCategoryState = useSelector((state) => state.categories.newCategory);
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
      if (res) {
        notification.success({
          message: "Thành công",
          description: `Tạo mới danh mục ${values.name ?? ""} thành công`,
        });

        form.resetFields(); // Reset the form fields after submission
        dispatch(resetNewCategory);
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          "Có lỗi xảy ra khi cố gắng tạo mới tài danh mục phân loại!",
      });
    }
  };

  const onReset = () => {
    form.resetFields();
    setValues({
      status: "active",
      name: "",
    });
  };
  useEffect(() => {
    if (newCategoryState.error) {
    } else if (newCategoryState.category) {
    }
  }, [newCategoryState]);
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
