// src/components/CustomersList.js
import React, { Component } from "react";
import Navbar from "./Navbar"

class CustomersList extends Component {
  state = {
    customers: [],
  };

  componentDidMount() {
    this.fetchCustomers();
  }

  fetchCustomers = async () => {
    const res = await fetch("http://localhost:5000/api/customers");
    const data = await res.json();
    if (res.ok) {
      this.setState({ customers: data });
    }
  };

  render() {
    const { customers } = this.state;

    return (
      <div className="add-customer-container">
        <Navbar />
        <div className="card-container">
        <h2>Customers List </h2>
        {
          customers.length < 1 ? (
            <div><h1>nothing here</h1></div>
          ) : (
<div className="customers-container">
  <table className="customers-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Contact</th>
        <th>Email</th>
        <th>Number of Deals</th>
      </tr>
    </thead>
    <tbody>
      {customers.map((customer) => (
        <tr key={customer.email}>
          <td>{customer.name}</td>
          <td>{customer.contact}</td>
          <td>{customer.email}</td>
          <td>{customer.count}</td>
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

export default CustomersList;
