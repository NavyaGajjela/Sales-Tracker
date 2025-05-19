// src/components/AddCustomer.js
import React, { Component } from "react";
import Navbar from "./Navbar"

class AddCustomer extends Component {
  state = {
    name: "",
    contact: "",
    email:"",
    amount:"",
    status:"",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,contact,amount,status}=this.state
    if(!email.endsWith("@gmail.com") || contact.length<10 || name==="" || amount==="" || status===""){
      this.setState({ name: "", contact: "", email: "", amount: "", status: "" });
      return alert("All fields should be filled and correct email, contact number");      
    }
    const response = await fetch("http://localhost:5000/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state),
    });

    if (response.ok) {
      alert("Customer added successfully!");
      this.setState({ name: "", contact: "", email: "", amount: "", status: "" });
    } else {
      alert("Error adding customer");
    }
  };

  render() {
    const {name,email,contact,status,amount}=this.state
    return (
      <div className="add-customer-container">
          <Navbar />
        <div className="card-container">
          <h2>Add New Customer</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name: </label><br/>
              <input name="name" value={name} placeholder="Enter Name" onChange={this.handleChange} required />
            </div>
            <div>
              <label>Contact Number: </label><br/>
              <input name="contact" value={contact} placeholder="Enter contact number" onChange={this.handleChange} required />
            </div>
            <div>
              <label>Email Id: </label><br/>
              <input name="email" value={email} placeholder="Enter email eg: rossy21@gmail.com" onChange={this.handleChange} required />
            </div>
            <div>
              <label>Deal Amount: </label><br/>
              <input name="amount" value={amount} placeholder="Enter Amount in numbers" onChange={this.handleChange} required />
            </div>
            <div>
              <label>Current Status: </label><br/>
              <select
              name="status"
              onChange={this.handleChange}
              required
              className="drop-down"
              value={status}
            >
              <option value="">Select Stage</option>
              <option value="New">New</option>
              <option value="inProgress">In-progress</option>
              <option value="Closed">Closed</option>
            </select>
            </div>
            <div className="add-customer-btn">
              <button type="submit">Add Customer</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddCustomer;
