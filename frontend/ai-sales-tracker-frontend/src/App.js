// src/App.js
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddCustomer from "./components/AddCustomer";
import CustomersList from "./components/CustomersList";
import DealsList from "./components/DealsList";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<ProtectedRoute><Home /></ProtectedRoute>}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/add-customers"
            element={<ProtectedRoute><AddCustomer /></ProtectedRoute>}
          />
          <Route
            path="/customers-list"
            element={<ProtectedRoute><CustomersList /></ProtectedRoute>}
          />
          <Route
            path="/deals-list"
            element={<ProtectedRoute><DealsList /></ProtectedRoute>}
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
