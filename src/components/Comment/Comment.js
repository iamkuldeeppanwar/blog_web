import React from "react";
import "./Comment.css";
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

function Comment(props) {
  const [blogId] = React.useState(props.id);
  const [error, setError] = React.useState();
  const [comment, setComment] = React.useState();

  const toggle = () => setError(!error);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const Comment = async (e) => {
    e.preventDefault();
    await fetch(
      `https://blog-post-api-production.up.railway.app/blogs/comment`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
        body: JSON.stringify({
          blogId,
          comment,
        }),
      }
    )
      .then((comment) => comment.json())
      .then((comment) => {
        if (comment.error) {
          setError("Please Login!");
        } else {
          window.location.reload();
        }
      });
  };

  return (
    <div>
      {error && (
        <Snackbar open={toggle} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}
      <div>
        <div className="comment-container">
          <form onSubmit={Comment}>
            <input
              className="comment-field"
              type="text"
              placeholder="Comments..."
              name="comment"
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <input className="cmtbtn" type="submit" value="Send ➣" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comment;
