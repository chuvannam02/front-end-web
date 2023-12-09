import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Spin } from "antd";
import React, { lazy, Suspense } from "react";
// import Register from "../src/components/Register/Register";
// import Home from "./components/Home/Home";
// import Login from "./components/Login/Login";
// import Admin from "./components/Admin/Admin";
// import Error from "../src/Error.jsx";
// import NavBar from "./components/NavBar/NavBar";
// import Footer from "./components/Footer/Footer";
// import Products from "./components/Admin/Products/Products";
// import Revenue from "./components/Admin/Dashboard/Revenue/Revenue";
// import Subscription from "./components/Admin/Dashboard/Subscription/Subscription";
// import AllCategories from "./components/Admin/Categories/AllCategories.jsx";
// import AdminRoute from "./components/Admin/AdminRoute";
// import Dashboard from "./components/Admin/Dashboard/Dashboard.jsx";
// import Users from "./components/Admin/User/Users.jsx";
// import Cart from "./components/Cart/Cart";
// import ProductForUser from "./components/ProductForUser/ProductForUser.jsx";
// import ProductDetailed from "./components/ProductForUser/Detail/ProductDetail.jsx";
// import CheckoutSuccess from "./components/Cart/CheckoutSuccess.jsx";
// import ForgetPassword from "./components/User/ResetPassword/ResetPassword.jsx"
const Register = lazy(() => import("../src/components/Register/Register"));
const Home = lazy(() => import("./components/Home/Home"));
const Login = lazy(() => import("./components/Login/Login"));
const Admin = lazy(() => import("./components/Admin/Admin"));
const Error = lazy(() => import("../src/Error.jsx"));
const NavBar = lazy(() => import("./components/NavBar/NavBar"));
const Footer = lazy(() => import("./components/Footer/Footer"));
const Products = lazy(() => import("./components/Admin/Products/Products"));
const Revenue = lazy(() =>
  import("./components/Admin/Dashboard/Revenue/Revenue")
);
const Subscription = lazy(() =>
  import("./components/Admin/Dashboard/Subscription/Subscription")
);
const AllCategories = lazy(() =>
  import("./components/Admin/Categories/AllCategories.jsx")
);
const AdminRoute = lazy(() => import("./components/Admin/AdminRoute"));
const Dashboard = lazy(() =>
  import("./components/Admin/Dashboard/Dashboard.jsx")
);
const Users = lazy(() => import("./components/Admin/User/Users.jsx"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const ProductForUser = lazy(() =>
  import("./components/ProductForUser/ProductForUser.jsx")
);
const ProductDetailed = lazy(() =>
  import("./components/ProductForUser/Detail/ProductDetail.jsx")
);
const CheckoutSuccess = lazy(() =>
  import("./components/Cart/CheckoutSuccess.jsx")
);
const ResetPassword = lazy(() =>
  import("./components/User/ResetPassword/ResetPassword.jsx")
);
const ForgetPassword = lazy(() =>
  import("./components/User/ForgetPassword/ForgetPassword.jsx")
);
import "./App.scss";
function App() {
  return (
    <>
      <Suspense fallback={<Spin spinning={true} className="fullscreen-spin" />}>
        <Router>
          <div>
            <NavBar />
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/register">
                <Route path="/register" component={Register} />
              </Route>
              <Route path="/login">
                <Route path="/login" component={Login} />
              </Route>
              <Route exact path="/products/all">
                <ProductForUser />
              </Route>
              <Route exact path="/products/all/:id">
                <ProductDetailed />
              </Route>

              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/reset_password/:token">
                <ResetPassword />
              </Route>
              <Route path="/forget_password">
                <ForgetPassword />
              </Route>
              <Route path="/checkout-success">
                <CheckoutSuccess />
              </Route>
              <Route exact path="/" component={Home} />
              {/* <Route path="/homepage"><Homepage /></Route> */}
              {/* <UserRoute path="/cart"><Cart /></UserRoute> */}
              {/* <Route path="/about"><About /></Route> */}
              {/* <UserRoute path="/account"><Account /></UserRoute> */}
              {/* <UserRoute path="/reset_password/:token">
                <ResetPassword />
              </UserRoute> */}

              <AdminRoute path="/admin">
                <Admin>
                  <Redirect from="/admin" to="/admin/dashboard" exact />
                  <Route path="/admin/dashboard" component={Dashboard} />
                  <Route
                    path="/admin/product/allProducts"
                    component={Products}
                  />
                  <Route
                    path="/admin/categories/allCategories"
                    component={AllCategories}
                  />
                  <Route path="/admin/user/allUsers" component={Users} />
                  <Route path="/admin/revenue" component={Revenue} />
                  <Route path="/admin/subscription" component={Subscription} />
                </Admin>
              </AdminRoute>
              {/* <AdminRoute path="/admin/user/allusers">
              <AllUsers />
            </AdminRoute> */}
              {/* <AdminRoute path="/admin/user/allusers/:id"></AdminRoute> */}

              {/* <AdminRoute path="/dashboard_admin">
              <ProductManagement />
            </AdminRoute> */}

              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </div>
        </Router>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
