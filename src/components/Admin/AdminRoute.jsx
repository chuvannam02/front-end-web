import PropTypes from "prop-types";
// import AdminHeader from "./AdminHeader";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import Header from "../Header/Header";
// const AdminLayout = ({ children }) => {
const AdminRoute = ({ children, ...rest }) => {
  const isLogin = useSelector((state) => state.auth?.login.isLogin);
  const user = useSelector((state) => state.auth.login?.currentUser);
  return (
    <div>
      {/* <Header /> */}
      {/* {children} */}
      <Route
        {...rest}
        render={() => {
          if (isLogin && user?.user.admin) {
            return children;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    </div>
  );
};

AdminRoute.propTypes = {
  children: PropTypes.node, // PropTypes for children
  component: PropTypes.elementType, // PropTypes for component
};
export default AdminRoute;
