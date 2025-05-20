// src/components/DealsList.js
import React, { Component } from "react";
import Navbar from "./Navbar"

class DealsList extends Component {
  state = {
    deals: [],
  };

  componentDidMount() {
    this.fetchDeals();
  }

  fetchDeals = async () => {
    const res = await fetch("http://localhost:5000/api/deals");
    const data = await res.json();
    if (res.ok) {
      this.setState({ deals: data });
    }
  };

  render() {
    const { deals } = this.state;
    return (
      <div className="add-customer-container">
        <Navbar />
        <div className="card-container">
        <h2>Deals List </h2>
        {
          deals.length < 1 ? (
            <div><h1>nothing here</h1></div>
          ) : (
<div className="customers-container">
  <table className="customers-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Amount</th>
        <th>Status of Deal</th>
      </tr>
    </thead>
    <tbody>
      {deals.map((eachdeal) => (
        <tr key={eachdeal.email}>
          <td>{eachdeal.name}</td>
          <td>{eachdeal.contact}</td>
          <td>{eachdeal.email}</td>
          <td>{eachdeal.amount}</td>
          <td>{eachdeal.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
          )
        }
        </div>
      </div>
    );
  }
}

export default DealsList;
