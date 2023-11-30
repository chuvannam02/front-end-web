import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "../src/components/Register/Register";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Admin from "./components/Admin/Admin";
import Error from "../src/Error.jsx";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Products from "./components/Admin/Products/Products";
// import UserLayout from "./components/User/UserLayout";
// import AdminLayout from "./components/Admin/AdminLayout";
// import AllUsers from "./components/Admin/User/AllUsers";
import AllCategories from "./components/Admin/Categories/AllCategories.jsx";
import AdminRoute from "./components/Admin/AdminRoute";
// import UserRoute from "./components/User/UserRoute";
function App() {
  return (
    <>
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
              {/* <Products /> */}
            </Route>
            <Route exact path="/products/all/:id">
              {/* <ProductDetailed /> */}
            </Route>

            <Route exact path="/" component={Home} />
            {/* <Route path="/homepage"><Homepage /></Route> */}
            {/* <UserRoute path="/cart"><Cart /></UserRoute> */}
            {/* <Route path="/about"><About /></Route> */}
            {/* <UserRoute path="/account"><Account /></UserRoute> */}
            {/* <UserRoute path="/reset_password/:token">
                <ResetPassword />
              </UserRoute> */}

            <AdminRoute path="/admin" exact>
              <Admin>
                <Route path="/admin/product/allProducts" component={Products} />
                <Route path="/admin/categories/allCategories" component={AllCategories} />
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
    </>
  );
}

export default App;
