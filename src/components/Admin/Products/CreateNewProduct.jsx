import React, { useState, useEffect } from "react";
import {
  Upload,
  Button,
  Modal,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Spin,
  notification
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { Suspense } from "react";
const ComboBoxCategories = React.lazy(() =>
  import("../ComboboxCategoires/ComboboxCategories")
);
import "./CreateNewProduct.scss";
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 20,
  },
};
const CreateNewProduct = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.login?.currentUser);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const uploadButton = (
    <div>
      <UploadOutlined /> Upload
    </div>
  );
  const [form] = Form.useForm();
  const handleUpload = ({ file, fileList }) => {
    if (file.originFileObj instanceof File) {
      const blobUrl = URL.createObjectURL(file.originFileObj);
      file.preview = blobUrl;
    }
    setFileList(fileList);
  };

  const handlePreview = async (file) => {
    if (!file.preview) {
      // Tạo Blob URL trực tiếp từ File
      const blob = new Blob([file.originFileObj], { type: file.type });
      const blobUrl = URL.createObjectURL(blob);
      file.preview = blobUrl;
    }
    setPreviewImage(file.preview);
    setPreviewVisible(true);
  };
  const onFinish = async (values) => {
    // const blobUrls = await Promise.all(
    //   fileList.map((file) => {
    //     const blob = new Blob([file.originFileObj], { type: file.type });
    //     const blobUrl = URL.createObjectURL(blob);
    //     return blobUrl;
    //   })
    // );
    const userObject = { ...user };
    const axiosJWT = createAxios(userObject);
    const newProduct = {
      ...values,
      categoryId: selectedCategory,
      //   images: blobUrls,
    };
    const url = "http://localhost:3000/api/v1/product/create";
    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      formData.append(key, newProduct[key]);
    });

    fileList.forEach((file, index) => {
      formData.append("images", file.originFileObj, `image${index}.jpg`);
    });
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        token: userObject?.accessToken,
      },
      withCredentials: true,
    };
    try {
      const response = await axiosJWT.post(url, formData, config);
      console.log(response.data);
      if (response) {
        form.resetFields();
        setFileList([]);
        setSelectedCategory("");
        notification.success({
          message: "Thành công",
          description: `Tạo mới sản phẩm ${newProduct.name ?? ""} thành công`,
        });
      }
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          `Có lỗi xảy ra khi cố gắng tạo mới sản phẩm ${newProduct.name ?? ""}!`,
      });
    }
  };
  const isFormValid = async () => {
    try {
      await form.validateFields();
      return true;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    form.setFieldsValue({
      categoryId: selectedCategory,
    });
  }, [selectedCategory]);
  return (
    <>
      <h1>Create New Product</h1>
      <Row justify="center">
        <Col xs={24} sm={22} md={20} lg={18} xl={16}>
          <Form
            {...layout}
            layout="horizontal"
            style={{ maxWidth: 800 }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="name"
              label="Tên sản phẩm"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống phần này!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mã sản phẩm" name="code">
              <Input />
            </Form.Item>
            <Form.Item label="Nhãn hiệu" name="brand">
              <Input />
            </Form.Item>
            <Form.Item
              name="categoryId"
              label="Danh mục"
              rules={[
                {
                  required: true,
                  message: "Vui lòng không bỏ trống phần này!",
                },
              ]}
            >
              <Suspense
                fallback={<Spin spinning={true} className="fullscreen-spin" />}
              >
                <ComboBoxCategories
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </Suspense>
            </Form.Item>
            <Form.Item label="Ngày ra mắt" name="releaseDate">
              <DatePicker size="large" placeholder="Lựa chọn ngày" />
            </Form.Item>
            <Form.Item label="Giá sản phẩm" name="price">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Giá khuyến mãi" name="salePrice">
              <InputNumber />
            </Form.Item>
            <Form.Item label="Mô tả sản phẩm" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Ảnh sản phẩm">
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleUpload}
                onPreview={handlePreview}
                beforeUpload={() => false} // return false so file is not auto uploaded
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewVisible}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isFormValid()}
              >
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default CreateNewProduct;
