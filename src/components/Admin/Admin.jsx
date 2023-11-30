import {
  DesktopOutlined,
  // FileOutlined,
  PieChartOutlined,
  // TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FiSettings, FiShoppingCart } from "react-icons/fi";
import { BiCategoryAlt } from "react-icons/bi";
import { PiShoppingBagOpen } from "react-icons/pi";
import { RiShoppingBagLine } from "react-icons/ri";
import { useState } from "react";
// import { Router, Switch, Route } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./Admin.scss";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./../../redux/apiRequest";
import Products from "./Products/Products";
import Users from "./User/Users";
import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AddNewUser from "./User/AddNewUser";
import CreateNewCategory from "./Categories/CreateNewCategory";
import AllCategories from "./Categories/AllCategories";
import { persistor } from "../../redux/store/Store";
import Dashboard from "./Dashboard/Dashboard";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Customers", "sub1", <UserOutlined />, [
    getItem("All Users", "3"),
    getItem("Create New User", "4"),
  ]),
  getItem("Products", "sub2", <PiShoppingBagOpen />, [
    getItem("Product List", "5"),
    getItem("Product Details", "6"),
  ]),
  getItem("Categories", "sub3", <BiCategoryAlt />, [
    getItem("Category List", "7"),
    getItem("Create New Category", "8"),
  ]),
  getItem("Orders", "sub4", <RiShoppingBagLine />, [
    getItem("Order List", "9"),
    getItem("Order Details", "10"),
  ]),
  getItem("Check Out", "11", <FiShoppingCart />),
  getItem("Setting", "12", <FiSettings />),
];
const Admin = () => {
  let user = useSelector((state) => state.auth.login?.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();
  let id = user?.user._id;
  // let accessToken = user?.accessToken;
  // let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  // token,id,dispatch, history, axiosJWT
  const handleLogout = async () => {
    const userObject = { ...user };
    console.log(userObject);
    await dispatch(logoutUser(userObject)).then(() => {
      persistor.purge(); // Xóa state được lưu trữ khi người dùng đăng xuất
    });
    localStorage.setItem("token", "");
    history.push("/login");
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedMenuItem, setSelectedMenuItem] = useState("Dashboard");
  // console.log(selectedMenuItem);
  // const renderProductList = () => {
  //   if (selectedMenuItem === 3) {
  //     return <Products />;
  //   }

  //   return null;
  // };
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={(e) => setSelectedMenuItem(e.key)}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div className="dropdown">
              <button className="dropbtn">Dropdown</button>
              <div className="dropdown-content">
                <a href="#">Profile</a>
                <a href="#">Setting</a>
                <NavLink
                  to="/login"
                  className="navbar-logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </NavLink>
              </div>
            </div>
          </Header>

          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <Switch>
              <Route path="admin/product/allproducts" component={Products} />
              {/* <Route path="*">
                  <p>error</p>
                </Route> */}
              {/* Add more nested routes inside Admin if needed */}
            </Switch>
            {/* <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            > */}

            {selectedMenuItem === "3" && (
              <>
                {/* <Redirect to="/admin/product/allproducts" /> */}
                <Users />
              </>
            )}
            {selectedMenuItem === "1" && (
              <>
                <Dashboard />
              </>
            )}
            {selectedMenuItem === "4" && (
              <>
                <AddNewUser />
              </>
            )}
            {selectedMenuItem === "7" && (
              <>
                <AllCategories />
              </>
            )}
            {selectedMenuItem === "8" && (
              <>
                <CreateNewCategory />
              </>
            )}
            {selectedMenuItem === "5" && (
              <>
                {/* <NavLink to={"/admin/user/allusers"}>aaaa</NavLink> */}
                {/* <Redirect to="/admin/product/allproducts"/> */}
                <Products />
              </>
            )}

            {/* {selectedMenuItem === "ProductList" && <ProductList />} */}
            {/* Add other conditions for rendering components */}
            {/* </div> */}
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default Admin;
