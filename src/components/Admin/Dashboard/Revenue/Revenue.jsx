import { Button, Card, Space } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import classNames from "classnames/bind";
import styles from "./Revenue.module.scss";
import { useHistory } from "react-router-dom";

const cx = classNames.bind(styles);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Revenue() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 2",
        data: [100, 130, 123, 153, 124, 175, 143],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(201, 203, 207, 0.5)",
        ],
      },
    ],
  };
  const history = useHistory();
  return (
    <Card className={cx("wrapper")}>
      <Space>
        <Button onClick={() => history.push("/admin/subscription")}>Subcription</Button>
        <Button className={cx("more-btn")} onClick={() => history.push("/admin/revenue")}>
          Revenue
        </Button>
      </Space>
      <Bar options={options} data={data} />
    </Card>
  );
}

export default Revenue;