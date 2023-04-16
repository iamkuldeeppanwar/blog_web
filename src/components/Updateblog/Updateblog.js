import React from "react";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import "./Updateblog.css";

function Updateblog(props) {
  const [image, setImage] = React.useState();
  console.log(image);
  const [success, setSuccess] = React.useState();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();

  const toggle1 = () => setSuccess(!success);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
  };

  const UpdateBlog = async (e) => {
    const data = new FormData();
    data.append("image", image);
    e.preventDefault();
    await fetch(
      `https://blog-post-api-production.up.railway.app/blogs/${props.data._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
        body: JSON.stringify({
          title,
          description,
        }),
      }
    ).then((blog) => blog.json());

    if (image === undefined) {
      return setSuccess("Blog Updated Successfully"), window.location.reload();
    } else {
      console.log("axios");
      await axios
        .patch(
          `https://blog-post-api-production.up.railway.app/blogs/me/avatar/${props.data._id}`,
          data,
          {
            headers: {
              Authorization: `${localStorage.getItem("Authorization")}`,
            },
          }
        )
        .then((img) => {
          setSuccess("Blog Updated Successfully");
          window.location.reload();
        });
    }
  };

  return (
    <div>
      {success && (
        <Snackbar open={toggle1} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose}>{success}</Alert>
        </Snackbar>
      )}
      <div>
        <div className="updt-img">
          <img
            alt="img"
            src={`https://blog-post-api-production.up.railway.app/public/img/blog/${props.data.image}`}
          />
        </div>
      </div>
      <div className="input-file">
        <form onSubmit={UpdateBlog}>
          <input
            className="image-file"
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <input className="dlt-edit" type="submit" value="Update" />
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

export default Updateblog;
