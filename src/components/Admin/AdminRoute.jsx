import PropTypes from "prop-types";
// import AdminHeader from "./AdminHeader";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Revenue from "./Dashboard/Revenue/Revenue";
import Subscription from "./Dashboard/Subscription/Subscription";
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
// const AdminRoute = ({ children, ...rest }) => {
//   const isLogin = useSelector((state) => state.auth?.login.isLogin);
//   const user = useSelector((state) => state.auth.login?.currentUser);
//   return (
//     <div>
//       <Route
//         {...rest}
//         render={({ match: { url } }) => (
//           isLogin && user?.user.admin ? (
//             <>
//               {children}
//               <Route path={`${url}/revenue`} component={Revenue} />
//               <Route path={`${url}/subscription`} component={Subscription} />
//             </>
//           ) : (
//             <Redirect to="/" />
//           )
//         )}
//       />
//     </div>
//   );
// };

AdminRoute.propTypes = {
  children: PropTypes.node, // PropTypes for children
  component: PropTypes.elementType, // PropTypes for component
};
export default AdminRoute;
