import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { createAxios } from "../../createInstance";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequest";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Input, Button, Menu, Select } from "antd";
const { Option } = Select;
import { AudioOutlined } from "@ant-design/icons";

import { BsCart3 } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { SlLogin } from "react-icons/sl";
import "./NavBar.scss";

import { persistor } from "../../redux/store/Store";
const handleButtonClick = (e) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};

const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

// search bar
const { Search } = Input;

const onSearch = (value, _e, info) => console.log(info?.source, value);

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carts?.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart?.forEach((item) => {
      total += Number(item.quantity);
    });
    return total;
  };
  let isLogin = useSelector((state) => state.auth?.login.isLogin);
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  const history = useHistory();
  // useNavigate được sử dụng ở version 6 của react-router-dom
  // const navigate = useNavigate();
  const id = user?.user._id;
  // let accessToken = user?.accessToken;
  // let axiosJWT = createAxios(user, dispatch, logoutSuccess);

  // token,id,dispatch, history, axiosJWT
  const handleLogout = async () => {
    // Spread the user object to create a copy.
    const userObject = { ...user };
    console.log(userObject);
    await dispatch(logoutUser(userObject)).then(() => {
      persistor.purge(); // Xóa state được lưu trữ khi người dùng đăng xuất
    });
    localStorage.setItem("token", "");
    history.push("/login");
  };
  const [fix, setFix] = useState(false);
  useEffect(() => {
    function setFixed() {
      if (window.scrollY >= 100) {
        setFix(true);
      } else {
        setFix(false);
      }
    }

    window.addEventListener("scroll", setFixed);

    return () => window.removeEventListener("scroll", setFixed);
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://mern-stack-backend-kw0h.onrender.com/api/v1/categories/combobox-without-auth`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);
  const handleChange = (value) => {
    setSelectedCategory(value);
  };

  const menu = (
    <Menu onClick={handleChange}>
      {categories.map((category) => (
        <Menu.Item key={category._id} value={category._id}>
          {category.name}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <>
      <nav className={fix ? "navbar_fixed" : "navbar-container"}>
        <NavLink to="/">
          <img
            src="../../../public/images/logo.png"
            alt="LOGO"
            width={100}
            height={100}
          ></img>
        </NavLink>
        <Dropdown overlay={menu}>
          <Button>
            <Space>
              Danh mục sản phẩm <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Search
          aria-label="Search"
          placeholder="Nhập từ khóa tìm kiếm"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
            borderRadius: "4px",
          }}
          className="search-bar"
        />
        <NavLink to="/" exact className="navbar-home">
          Trang chủ
        </NavLink>
        <NavLink to="/products/all" className="navbar-product">
          <HiOutlineShoppingBag />
          Sản phẩm
        </NavLink>
        {user && isLogin ? (
          <>
            <p className="navbar-user">
              Xin Chào, <span> {user.user.name} </span>
            </p>
            {user?.user.admin ? (
              <Redirect to="/admin" />
            ) : (
              <>
                <NavLink to="/account" className="navbar-account">
                  Tài Khoản
                </NavLink>
                {/* <NavLink to="/homepage" className="navbar-homepage">
                  HomePage
                </NavLink> */}
                <NavLink to="/cart" className="navbar-cart-review">
                  <BsCart3 />
                  Giỏ hàng của bạn ({getTotalQuantity() || 0}) sản phẩm
                </NavLink>
                <NavLink
                  to="/"
                  className="navbar-logout"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </NavLink>
              </>
            )}

            <NavLink to="/" className="navbar-logout" onClick={handleLogout}>
              Đăng xuất
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar-login">
              <SlLogin />
              Đăng nhập
            </NavLink>
            <NavLink to="/register" className="navbar-register">
              <VscAccount />
              Đăng ký
            </NavLink>
            <NavLink to="/cart" className="navbar-cart-review">
              <BsCart3 />
              Giỏ hàng của bạn ({getTotalQuantity() || 0}) sản phẩm
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
