import { Button, Card, Space } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import classNames from "classnames/bind";
import styles from "./Subscription.module.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const cx = classNames.bind(styles);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Subcription() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average High & Low Temperature",
      },
    },
  };

  const labels = ["January", "February", "March", "April", "May", "June", "July"];

  const data = {
    labels,
    datasets: [
      {
        label: "High",
        data: [30, 35, 36, 43, 30, 41, 27],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Low",
        data: [17, 19, 13, 14, 16, 12, 18],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const history = useHistory();
  return (
    <Card className={cx("wrapper")}>
      <Space>
        <Button className={cx("more-btn")} onClick={() => history.push("/admin/subscription")}>
          Subcription
        </Button>
        <Button onClick={() => history.push("/admin/revenue")}>Revenue</Button>
      </Space>
      <Line options={options} data={data} />;
    </Card>
  );
}

export default Subcription;