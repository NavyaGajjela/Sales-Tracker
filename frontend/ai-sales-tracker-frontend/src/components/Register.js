import React, { Component } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

class RegisterComponent extends Component {
  state = { name: "", email: "", password: "", message: "" };

  handleRegister = async () => {
    const { name, email, password } = this.state;
    const emailFormatCheck = email.slice(-10); 
    if (password.length < 6 || emailFormatCheck !== "@gmail.com") {
      return alert("password must be atleast 6 characters and provide correct mail example:rossy12@gmail.com");
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (res.status===200) {
      Cookies.set("token", data.token, { expires: 10 });
      this.props.navigate("/");
    } else {
      this.setState({ message: data.message || "Registration failed" });
    }
  };

  render() {
    return (
      <div className="bg-container">
        <div className="register-container">
          <h2 className="login-heading">Register Here</h2>
          <div className="login-input-container register">
            <label>Username</label><br/>
            <input
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
              placeholder="UserName"
            />
          </div>
          <div className="login-input-container register">
            <label>Email</label><br/>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="login-input-container register">
            <label>Create Password</label><br/>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="login-button-container">
            <button className="register-btn" onClick={this.handleRegister}>Register</button>
          </div>
            
          <p className="login-error-msg">{this.state.message}</p>
        </div>
      </div>
    );
  }
}

// withRouter logic inline
function Register(props) {
  const navigate = useNavigate();
  return <RegisterComponent {...props} navigate={navigate} />;
}

export default Register;
