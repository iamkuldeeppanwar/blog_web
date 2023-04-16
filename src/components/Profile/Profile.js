import React from "react";
import axios from "axios";
import Profilepic from "../Profilepic/Profilepic";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "./Profile.css";
function Profile() {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [avatar, setAvatar] = React.useState();
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();
  const toggle = () => setError(!error);
  const toggle1 = () => setSuccess(!success);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
    setSuccess(false);
  };

  const Profile = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("photo", avatar);

    await fetch(
      `https://blog-post-api-production.up.railway.app/users/${localStorage.getItem(
        "id"
      )}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    )
      .then((data) => data.json())
      .then((data) => {
        if (!data.user) {
          setError(data.message);
        }
      });

    if (avatar === undefined) {
      return setSuccess("Profile updated successfully");
    } else {
      await axios
        .post(
          `https://blog-post-api-production.up.railway.app/users/me/avatar`,
          data,
          {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          }
        )
        .then((image) => {
          if (image.status === 200) {
            setSuccess("Profile Updated successfully");
            window.location.reload();
          } else {
            setError("Unable to Upload!");
          }
        });
    }
  };
  return (
    <div className="profile-container">
      <form className="Profile" onSubmit={Profile}>
        <label className="profile-label">
          {error && (
            <Snackbar
              open={toggle}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity="error">
                {error}
              </Alert>
            </Snackbar>
          )}
          {success && (
            <Snackbar
              open={toggle1}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose}>{success}</Alert>
            </Snackbar>
          )}

          <Profilepic />
          <h1>Upload Your Profile</h1>
        </label>
        <div>
          <input
            className="file-input"
            type="file"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        <br />
        <label className="update-label">Name</label>
        <div>
          <input
            className="update-input"
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
          />
        </div>
        <label className="update-label">Email</label>
        <div>
          <input
            className="update-input"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
        </div>
        <label
          className="update-label"
          onChange={(e) => setPassword(e.target.value)}
        >
          Pass..
        </label>
        <div>
          <input className="update-input" type="password" name="password" />
        </div>
        <div>
          <input className="file-btn" type="submit" value="Update" />
        </div>
      </form>
    </div>
  );
}

export default Profile;
