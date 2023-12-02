import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequest";

import { UserOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

import { BsCart3 } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { SlLogin } from "react-icons/sl";
import "./NavBar.scss";

const handleButtonClick = (e) => {
  message.info("Click on left button.");
  console.log("click left button", e);
};

const handleMenuClick = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  // {
  //   label: "3rd menu item",
  //   key: "3",
  //   icon: <UserOutlined />,
  //   danger: true,
  // },
  // {
  //   label: "4rd menu item",
  //   key: "4",
  //   icon: <UserOutlined />,
  //   danger: true,
  //   disabled: true,
  // },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

// search bar
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1677ff",
    }}
  />
);
const onSearch = (value, _e, info) => console.log(info?.source, value);

const NavBar = () => {
  let isLogin = useSelector((state) => state.auth?.login.isLogin);
  const user = useSelector((state) => {
    return state.auth.login?.currentUser;
  });
  // console.log(user);
  const history = useHistory();
  const dispatch = useDispatch();
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
    });;
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
  return (
    <>
      <nav className={fix ? "navbar_fixed" : "navbar-container"}>
        <NavLink to="/">
          <img
            src="../../../public/images/logo.png"
            alt="LOGO"
            width={100}
            height={100}></img>
        </NavLink>
        <Space wrap>
          <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
            Dropdown
          </Dropdown.Button>
        </Space>
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
                <NavLink to="/homepage" className="navbar-homepage">
                  HomePage
                </NavLink>
              </>
            )}
            <div className="dropdown">
              <button className="dropbtn">Bảng điều khiển</button>
              <div className="dropdown-content">
                <NavLink
                  to="/"
                  className="navbar-logout"
                  onClick={handleLogout}>
                  Đăng xuất
                </NavLink>
              </div>
            </div>
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
            <NavLink to="/cart-review" className="navbar-cart-review">
              <BsCart3 />
              <p>Giỏ hàng của bạn (0) sản phẩm</p>
            </NavLink>
          </>
        )}
      </nav>
    </>
  );
};

export default NavBar;
