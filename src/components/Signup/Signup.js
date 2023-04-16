import React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

function Signup() {
  const [name, setName] = React.useState();
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
    setError(false);
  };

  const Signup = async (e) => {
    e.preventDefault();
    await fetch(`https://blog-post-api-production.up.railway.app/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("user", data);
        if (data.keyValue) {
          setError("User already exist!");
          return;
        } else if (data.errors) {
          setError("invalid user input!");
          return;
        } else {
          setSuccess("Signed in SuccessFully");
          localStorage.setItem("Authorization", data.token);
          localStorage.setItem("id", data.user._id);
          window.location.reload();
        }
      });
  };

  return (
    <div className="Login-container">
      {success && (
        <Snackbar open={toggle1} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose}>{success}</Alert>
        </Snackbar>
      )}
      {error && (
        <Snackbar open={toggle} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      <form onSubmit={Signup}>
        <label className="Login-label">Name</label>
        <div>
          <input
            className="Login-input"
            type="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
        </div>
        <label className="Login-label">Email</label>
        <div>
          <input
            className="Login-input"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <label className="Login-label">Password</label>
        <div>
          <input
            className="Login-input"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <br />
        <div>
          <input className="Login-btn" type="submit" value="Signin" />
        </div>
      </form>
    </div>
  );
}

export default Signup;
