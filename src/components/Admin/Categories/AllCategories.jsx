import React, { useState, useEffect } from "react";
import { Table, Badge, Pagination } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../../redux/apiRequest";
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
    render: () => <Badge status="success" text="active" />,
  },
  {
    title: "Action",
    key: "operation",
    width: 100,
    render: () => <a>action</a>,
  },
];

const AllCategories = () => {
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
  let categories = useSelector(
    (state) => state.categories.categories?.allCategories
  );
  console.log(categories);
  const dispatch = useDispatch();
  let { allCategories, totalPage } = categories || {};

  const handlePaginationChange = async (pageNumber, pageSize) => {
    setCurrentPage(pageNumber);
    setPageSize(pageSize);
    console.log("Page: ", pageNumber);
    console.log("Page Size: ", pageSize);
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
  let memoizedData = React.useMemo(() => {
    return allCategories?.map((category, index) => ({
      ...category,
      key: index,
    }));
  }, [allCategories]);
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
          total: totalPage * pageSize, // Total number of data items
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

export default AllCategories;
