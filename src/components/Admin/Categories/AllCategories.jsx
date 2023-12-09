import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Badge,
  Pagination,
  Divider,
  Modal,
  Switch,
  Input,
  Button,
  notification,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../../redux/apiRequest";
import { removeACategory } from "../../../redux/apiRequest";
import { updateACategory } from "../../../redux/apiRequest";
const AllCategories = () => {
  let user = useSelector((state) => state.auth.login?.currentUser);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let categories = useSelector(
    (state) => state.categories.categories?.allCategories
  );
  console.log(categories);
  // console.log(categories);
  const dispatch = useDispatch();
  let { data, totalPage } = categories || {};
  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "_id",
    // },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Badge
          status={status === "active" ? "success" : "error"}
          text={status}
        />
      ),
    },
    {
      title: "Action",
      key: "operation",
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => viewRecord(record)}>
            View
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => editRecord(record)}>
            Edit
          </Button>
          <Divider type="vertical" />
          <Button type="primary" danger onClick={() => removeRecord(record)}>
            Remove
          </Button>
        </span>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
  const viewRecord = (record) => {
    // console.log("View Record", record);
    setCurrentCategory(record);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [categoryName, setCategoryName] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(false);
  const handleNameChange = useCallback((e) => {
    setCategoryName(e.target.value);
  }, []);
  const handleEditOk = async (user) => {
    if (categoryName && categoryStatus) {
      try {
        let newInforOfCategory = {
          name: categoryName,
          status: categoryStatus ? "active" : "inactive",
        };
        const res = await dispatch(
          updateACategory({
            userObject: user,
            id: currentCategory._id,
            newInforOfCategory,
          })
        );
        dispatch(
          getAllCategories({
            userObject: user,
            page: currentPage,
            limit: pageSize,
          })
        );
        if (res) {
          notification.success({
            message: "Thành công",
            description: `Chỉnh sửa danh mục ${
              currentCategory.name ?? ""
            } thành công`,
          });
        }
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Có lỗi xảy ra",
          description: `Có lỗi xảy ra khi cố gắng tạo chỉnh sửa danh mục phân loại có id: ${currentCategory._id}!`,
        });
      }
      setIsRemoveModalVisible(false);
    }
    // updateCategory(currentCategory._id, categoryName, categoryStatus);
    setIsEditModalVisible(false);
  };
  const handleStatusChange = (checked) => {
    setCategoryStatus(checked);
  };
  const handleRemoveOk = async (user) => {
    if (categoryName && categoryStatus) {
      try {
        const res = await dispatch(
          removeACategory({ userObject: user, id: currentCategory._id })
        );
        dispatch(
          getAllCategories({
            userObject: user,
            page: currentPage,
            limit: pageSize,
          })
        );
        if (res) {
          notification.success({
            message: "Thành công",
            description: `Xoá danh mục ${
              currentCategory.name ?? ""
            } thành công`,
          });
        }
      } catch (error) {
        console.error(error);
        notification.error({
          message: "Có lỗi xảy ra",
          description: `Có lỗi xảy ra khi cố gắng tạo xoá danh mục phân loại ${currentCategory.name}!`,
        });
      }
      setIsRemoveModalVisible(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleRemoveCancel = () => {
    setIsRemoveModalVisible(false);
  };
  const editRecord = (record) => {
    // console.log("Edit Record", record);
    setCurrentCategory(record);
    setIsEditModalVisible(true);
  };

  const removeRecord = (record) => {
    // console.log("Remove Record", record);
    setCurrentCategory(record);
    setIsRemoveModalVisible(true);
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handlePaginationChange = async (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
    // console.log("Page: ", pageNumber);
    // console.log("Page Size: ", pageSize);
  };
  useEffect(() => {
    dispatch(
      getAllCategories({
        userObject: user,
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, pageSize, dispatch, user]);
  useEffect(() => {
    if (currentCategory) {
      setCategoryName(currentCategory.name);
      setCategoryStatus(currentCategory.status === "active");
    }
  }, [currentCategory]);
  let memoizedData = React.useMemo(() => {
    return data?.map((category, index) => ({
      ...category,
      key: index,
    }));
  }, [data]);
  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={memoizedData}
        pagination={{
          // Pagination configuration
          pageSizeOptions: ["5", "10", "15", "20"],
          pageSize: pageSize,
          total: categories.totalItems, // Total number of data items
          showSizeChanger: true, // Show options to change the number of items per page
          showQuickJumper: true, // Show a quick jump input
          showTotal: (total) => `Tổng cộng có ${total} danh mục`, // Display total items text
          onChange: (currentPage, pageSize) =>
            handlePaginationChange(currentPage, pageSize), // Handle page change
          current: currentPage,
        }}
      />
      <Modal
        title="Thông tin chi tiết danh mục"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {currentCategory && (
          <p>
            <strong>Mã danh mục: </strong> {currentCategory._id}
            <br />
            <br />
            <strong>Tên danh mục: </strong> {currentCategory.name}
            <br />
            <br />
            <strong>Trạng thái: </strong>{" "}
            <Switch
              checked={currentCategory.status === "active" ? true : false}
              disabled={true}
            />
          </p>
        )}
      </Modal>
      <Modal
        title="Chú ý"
        open={isRemoveModalVisible}
        onOk={() => handleRemoveOk(user)}
        onCancel={handleRemoveCancel}
      >
        {currentCategory && (
          <p>
            Bạn có chắc chắn muốn xóa danh mục{" "}
            <strong>{currentCategory.name}</strong> không?
          </p>
        )}
      </Modal>
      <Modal
        title="Thông tin chi tiết danh mục"
        open={isEditModalVisible}
        onOk={() => handleEditOk(user)}
        onCancel={handleEditCancel}
      >
        {currentCategory && (
          <p>
            <strong>Mã danh mục: </strong> {currentCategory._id}
            <br />
            <br />
            <strong>Tên danh mục: </strong>{" "}
            <Input value={categoryName} onChange={handleNameChange} />
            <br />
            <br />
            <strong>Trạng thái: </strong>{" "}
            <Switch checked={categoryStatus} onChange={handleStatusChange} />
          </p>
        )}
      </Modal>
    </>
  );
};

export default AllCategories;
