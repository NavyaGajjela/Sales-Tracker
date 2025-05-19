// // src/components/Dashboard.js
import React, { Component } from "react";
import Navbar from "./Navbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  New: "#8884d8",
  InProgress: "#82ca9d",
  Closed: "#ffc658",
};

class Dashboard extends Component {
  state = {
    weeklyData: [],
    statusData: [],
  };

  componentDidMount() {
    this.fetchWeeklyData();
    this.fetchStatusData();
  }

  fetchWeeklyData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/customers/week-data");
      const data = await res.json();
      if (res.ok) {
        this.setState({
          weeklyData: data.map((item) => ({
            week: `Week ${item._id}`,
            count: item.count,
          })),
        });
      }
    } catch (err) {
      console.error("Bar data error:", err);
    }
  };

  fetchStatusData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/customers/status-data");
      const data = await res.json();
      if (res.ok) {
        this.setState({
          statusData: data.map((item) => ({
            name: item._id,
            value: item.count,
          })),
        });
      }
    } catch (err) {
      console.error("Pie data error:", err);
    }
  };

  render() {
    const { weeklyData, statusData } = this.state;
    const formattedWeeklyData = weeklyData.map((item, index) => ({
        label: `Week ${index + 1}`,
        count: item.count,
      }));

    return (
      <div className="dashboard-container bg-dashboard">
  <Navbar />
  <h1 className="dashboard-title">Sales Tracker Dashboard</h1>

  <div className="charts-wrapper">
    <div className="chart-box">
      <h3>Users per Week</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedWeeklyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="chart-box">
      <h3>Status Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {statusData.map((entry, index) => (
  <Cell
    key={`cell-${index}`}
    fill={
      entry.name === "New"
        ? "#00C49F"
        : entry.name === "inProgress"
        ? "#0088FE"
        : entry.name === "Closed"
        ? "#FF8042"
        : "#ccc"
    }
  />
))}

          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>

    );
  }
}

export default Dashboard;



