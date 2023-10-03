import React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "./Login.css";

function Login() {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();

  const toggle = () => setError(!error);
  const toggle1 = () => setError(!success);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const Login = async (e) => {
    console.log("Login");
    e.preventDefault();
    await fetch(`https://blog-post-backend-api.onrender.com/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.user) {
          localStorage.setItem("Authorization", res.token);
          localStorage.setItem("id", res.user._id);
          setSuccess("Logged in Successfull");
          window.location.reload();
        } else {
          setError("Unable to login!");
        }
      });
  };

  return (
    <>
      <div className="Login-container">
        {success && (
          <Snackbar
            open={toggle1}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose}>{success}</Alert>
          </Snackbar>
        )}
        {error && (
          <Snackbar open={toggle} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {error}
            </Alert>
          </Snackbar>
        )}
        <form onSubmit={Login}>
          <label className="Login-label">Email</label>
          <div>
            <input
              className="Login-input"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              required
            />
          </div>
          <label className="Login-label">Password</label>
          <div>
            <input
              className="Login-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
            />
          </div>
          <br />
          <div>
            <input className="Login-btn" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
