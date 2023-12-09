import Admin from "../Admin";
import React, { useState, useEffect } from "react";
import { Table, Divider,Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../../redux/apiRequest";
const columns = [
  // {
  //   title: "ID",
  //   dataIndex: "_id",
  // },
  {
    title: "STT",
    dataIndex: "productId",
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "code",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "name",
  },
  {
    title: "Nhãn hiệu",
    dataIndex: "brand",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
  },
  {
    title: "Ngày ra mắt",
    dataIndex: "releaseDate",
    render: (date) => {
      let d = new Date(date);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    },
  },
  {
    title: "Giá",
    dataIndex: "price",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    render: (date) => {
      let d = new Date(date);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    },
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    render: (date) => {
      let d = new Date(date);
      return d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    },
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
const Products = () => {
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
  let products = useSelector((state) => state.products.products?.allProducts);
  console.log(products);
  const dispatch = useDispatch();
  let { data, totalPage } = products || {};

  const handlePaginationChange = async (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
    // console.log("Page: ", pageNumber);
    // console.log("Page Size: ", pageSize);
  };
  useEffect(() => {
    dispatch(
      getAllProducts({
        userObject: user,
        page: currentPage,
        limit: pageSize,
      })
    );
  }, [currentPage, pageSize, dispatch, user]);
  let memoizedData = React.useMemo(() => {
    return data?.map((product, index) => ({
      ...product,
      key: product.productId,
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
          total: products.totalItems, // Total number of data items
          showSizeChanger: true, // Show options to change the number of items per page
          showQuickJumper: true, // Show a quick jump input
          showTotal: (total) => `Tổng số ${total} sản phẩm`, // Display total items text
          onChange: (currentPage, pageSize) =>
            handlePaginationChange(currentPage, pageSize), // Handle page change
          current: currentPage,
        }}
      />
    </>
  );
};

export default Products;
