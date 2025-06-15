import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { userLogin } from "services/auth";
const Admin_Consultant_Login = () => {
  const [role, setRole] = useState("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    if (role === "admin") {
      const response = await userLogin(formData, role);
      if (response?.success) {
        toast.success("Successfully logged in as admin");
        navigate.push("/admin", { role: "admin" });
      } else if (
        response?.error?.msg === "Invalid email id" ||
        response?.error?.msg === "Invalid Password"
      ) {
        toast.error(response.error.msg);
        return;
      } else {
        toast.error("An unknown network has occured please try again later");
      }
      console.log("this is response", response);
    } else {
      const response = await userLogin(formData, role);
      if (response?.success) {
        toast.success("Successfully logged in as Consultant");
        console.log(response);
        navigate.push("/admin", { role: "consultant", consultant_id: response.id });
      } else if (
        response?.error?.msg === "Invalid email id" ||
        response?.error?.msg === "Invalid Password"
      ) {
        toast.error(response.error.msg);
        return;
      } else {
        toast.error("An unknown network has occured please try again later");
      }
    }
  };

  const toggleRole = () => {
    setRole((prev) => (prev === "admin" ? "consultant" : "admin"));
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "80px auto",
    padding: "30px",
    border: "1px solid #e0e0e0",
    borderRadius: "10px",
    boxShadow: "0 0 12px rgba(0,0,0,0.05)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
  };

  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#444",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  };

  const switchButtonStyle = {
    marginBottom: "15px",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>
        {role === "admin" ? "Admin Login" : "Consultant Login"}
      </h2>
      <button onClick={toggleRole} style={switchButtonStyle}>
        Switch to {role === "admin" ? "Consultant" : "Admin"}
      </button>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <label style={labelStyle}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Admin_Consultant_Login;
