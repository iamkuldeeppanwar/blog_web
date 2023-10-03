import React from "react";
import "./Createblog.css";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import Image from "../Getimage/Image";
import { useNavigate } from "react-router-dom";

function Createblog() {
  const Navigate = useNavigate();
  const [image, setImage] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();
  const [error, setError] = React.useState();
  const [success, setSuccess] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState(false);

  const toggle = () => setError(!error);
  const toggle1 = () => setSuccess(!success);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
    setSuccess(false);
  };

  const createBlog = async (e) => {
    const data = new FormData();
    data.append("image", image);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dateObject = new Date();
    const date = dateObject.getDate();
    const month = dateObject.getMonth();
    const year = dateObject.getFullYear();
    const createdAt = date + " " + months[month] + "," + year;

    e.preventDefault();
    console.log("click");
    await fetch(`https://blog-post-backend-api.onrender.com/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("Authorization")}`,
      },
      body: JSON.stringify({
        title,
        description,
        createdAt,
      }),
    })
      .then((blog) => blog.json())
      .then((blog) => {
        if (blog.error) {
          setError("Please Login!");
        } else {
          localStorage.setItem("id1", blog._id);
          setSuccess("Blog is created");
          Navigate("/");
        }
      });

    if (image === undefined) {
      return setSuccess("Blog is Created"), Navigate("/");
    } else {
      await axios
        .patch(
          `https://blog-post-backend-api.onrender.com/blogs/me/avatar/${localStorage.getItem(
            "id1"
          )}`,
          data,
          {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          }
        )
        .then((img) => {
          if (!img.error) {
            Navigate("/");
          } else {
            setSuccess("Created");
          }
        });
    }
  };

  return (
    <div>
      {error && (
        <Snackbar open={toggle} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={toggle1} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose}>{success}</Alert>
        </Snackbar>
      )}
      <div>
        {!errorMsg ? (
          <img
            className="createimage"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLoUIgLT0oJe3YPvtlGZC7Kehyfh43vf93jA&usqp=CAU"
          />
        ) : (
          <Image id={localStorage.getItem("id1")} />
        )}
      </div>

      <div className="input-file">
        <form onSubmit={createBlog}>
          <input
            className="image-file"
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <input className="dlt-edit" type="submit" value="Publish" />
          <div className="input-title">
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title..."
              required
            />
          </div>
          <div className="textarea">
            <textarea
              placeholder="Tell your Story..."
              minLength="70"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Createblog;
