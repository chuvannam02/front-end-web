import { Button, Space } from "antd";
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import Revenue from "./Revenue/Revenue";
import Subscription from "./Subscription/Subscription";
import { useHistory, Switch, Route } from "react-router-dom";
const cx = classNames.bind(styles);

const Dashboard = () => {
    const history = useHistory();
  return (
    <div className={cx("wrapper")}>
    <Space>
      <Button onClick={() => history.push("/admin/subscription")}>Subcription</Button>
      <Button onClick={() => history.push("/admin/revenue")}>Revenue</Button>
    </Space>
    <Switch>
        <Route path="/admin/subscription">
          <Subscription />
        </Route>
        <Route path="/admin/revenue">
          <Revenue />
        </Route>
      </Switch>
  </div>
  );
};

export default Dashboard;
