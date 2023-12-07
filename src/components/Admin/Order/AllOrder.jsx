import React, { useState, useEffect } from "react";
import { Table, Divider,Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrder } from "../../../redux/apiRequest";
const columns = [
  // {
  //   title: "ID",
  //   dataIndex: "_id",
  // },
  {
    title: "Mã đơn hàng",
    dataIndex: "orderId",
    render: (text) => text.toString(),
  },
  {
    title: "Mã giỏ hàng",
    dataIndex: "cartId",
  },
  {
    title: "Mã khách hàng",
    dataIndex: "userId",
  },
  {
    title: "Trạng thái vận chuyển",
    dataIndex: "delivery_status",
    render: (text) => {
        // Hiển thị trạng thái tùy thuộc vào giá trị
        return text === "Pending" ? "Chờ xác nhận" : text;
      },
  },
  {
    title: "Tổng số tiền",
    dataIndex: "total",
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
const AllOrder = () => {
  const viewRecord = (record) => {
    console.log("View Record", record);
    // Implement your view logic here
  };

  const editRecord = (record) => {
    console.log("Edit Record", record);
    // Implement your edit logic here
  };

  const removeRecord = (record) => {
    console.log("Remove Record", record);
    // Implement your remove logic here
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
  let user = useSelector((state) => state.auth.login?.currentUser);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  let orders = useSelector((state) => state.orders.orders?.allOrders);
  const dispatch = useDispatch();
  let { data, totalPage } = orders || {};

  const handlePaginationChange = async (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
    // console.log("Page: ", pageNumber);
    // console.log("Page Size: ", pageSize);
  };
  useEffect(() => {
    dispatch(
      getAllOrder({
        userObject: user,
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, pageSize, dispatch, user]);
  let memoizedData = React.useMemo(() => {
    return data?.map((order, index) => ({
      ...order,
      key: order._id,
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
        //   total: orders.totalItems, // Total number of data items
          showSizeChanger: true, // Show options to change the number of items per page
          showQuickJumper: true, // Show a quick jump input
          showTotal: (total) => `Total ${total} items`, // Display total items text
          onChange: (currentPage, pageSize) =>
            handlePaginationChange(currentPage, pageSize), // Handle page change
          current: currentPage,
        }}
      />
    </>
  );
};

export default AllOrder;
