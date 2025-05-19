import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles.css"

class LoginComponent extends Component {
  state = { email: "", password: "", message: "" };

  handleLogin = async () => {
    const { email, password } = this.state;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.status===200) {
      Cookies.set("token", data.token, { expires: 10 });
      this.props.navigate("/");
    } else {
      this.setState({ message: data.message || "Login failed" });
    }
  };

  render() {
    return (
      <div className="bg-container">
        <div className="login-container">
        <h2 className="login-heading">Login / Register Here</h2>
        <div className="login-input-container">
          <label className="login-label">Email</label><br/>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>
        <div className="login-input-container">
          <label className="login-label">Password</label><br/>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="login-button-container">        
          <button onClick={this.handleLogin}>Login</button>
          <button onClick={() => this.props.navigate("/register")}>Register</button>
        </div>
        <p className="login-error-msg">{this.state.message}</p>
        </div>
      </div>
    );
  }
}


function Login(props) {
  const navigate = useNavigate();
  return <LoginComponent {...props} navigate={navigate} />;
}

export default Login;
