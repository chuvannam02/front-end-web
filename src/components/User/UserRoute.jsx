import PropTypes from "prop-types";
// import AdminHeader from "./AdminHeader";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// import Header from "../Header/Header";
// const AdminLayout = ({ children }) => {
const UserRoute = ({ component: Component, ...rest }) => {
  const isLogin = useSelector((state) => state.auth?.login.isLogin);
  const user = useSelector((state) => state.auth.login?.currentUser);
  return (
    <div>
      {/* <Header /> */}
      {/* {children} */}
      <Route
        {...rest}
        render={(props) => {
          if (isLogin && !(user?.user.admin)) {
            return <Component {...props} />;
          } else {
            return <Redirect to="/" />;
          }
        }}
      />
    </div>
  );
};

UserRoute.propTypes = {
  // children: PropTypes.node.isRequired,
  component: PropTypes.node.isRequired,
};
export default UserRoute;
