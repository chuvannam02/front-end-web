import React, { useEffect, useState } from "react";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ProductForUser.scss";
import { NavLink } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import { Input, Pagination, Select, Alert, Spin } from "antd";
import { Breadcrumb } from "antd";
const { Option } = Select;
// Define a service using a base URL and expected endpoints
export const productService = createApi({
  reducerPath: "productService",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (page = 1, limit = 5, searchTerm = "") => ({
        url: "product-without-auth/all",
        params: { page, limit, name: searchTerm },
      }),
    }),
  }),
});
// Export hooks for usage in functional components
export const { useGetAllProductsQuery } = productService;

const ProductForUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //   const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const cart = useSelector((state) => state.carts?.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  const handleSearch = () => {
    // Gọi lại API khi người dùng click vào nút search
    refetch({ page: currentPage, limit: limit });
  };
  // Use the query hook in the component
  const {
    data: productsList,
    isLoading,
    error,
    refetch,
  } = useGetAllProductsQuery(currentPage, limit, searchTerm);
  // useEffect(() => {
  //   console.log(productsList);
  // }, [productsList]);
  const handlePaginationChange = (page, limit) => {
    setCurrentPage(page);
    setLimit(limit);
    refetch({ page, limit });
  };
  return (
    <>
      {isLoading ? (
        <Spin spinning={true} fullscreen="true" />
      ) : (
        <>
          <Breadcrumb
            style={{ margin: "10px 0 20px 40px" }}
            items={[
              {
                title: <NavLink to="/">Trang chủ</NavLink>,
              },
              {
                title: "Sản phẩm",
              },
            ]}
          />
          <Input
            placeholder="Tìm kiếm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
          <div className="products">
            {productsList?.data?.map((product, index) => {
              return (
                <div key={index}>
                  <div className="card">
                    <h4>{product.name}</h4>                
                    <img
                      src={typeof product.images[0] === 'object' ? product.images[0].url : product.images[0]}
                      alt="products"
                      className="images"
                      width={300}
                      height={300}
                    />

                    <h4 className="price">Giá: {product.price}</h4>
                    <h5>Giá Khuyến Mãi: {product.salePrice}</h5>
                    <button className="detail">
                      <NavLink to={"/products/all/" + product.productId} exact>
                        Chi tiết
                      </NavLink>
                    </button>
                    <button
                      className="add_to_cart"
                      //   onClick={() => addToCart(product)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pagination">
            <Pagination
              showSizeChanger
              showQuickJumper
              pageSizeOptions={["5", "10", "15", "20"]}
              pageSize={limit}
              current={currentPage}
              total={productsList?.totalItems}
              onChange={(currentPage, limit) =>
                handlePaginationChange(currentPage, limit)
              }
              showTotal={(total) => `Tổng số ${total} sản phẩm`}
            />
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductForUser;
