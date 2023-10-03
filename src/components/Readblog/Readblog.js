import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import "./Read.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Comment from "../Comment/Comment";
import Avatar from "@mui/material/Avatar";
import ScrollableFeed from "react-scrollable-feed";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Updateblog from "../Updateblog/Updateblog";

function Readblog() {
  const params = useParams();
  const Navigate = useNavigate();
  const [blog, setBlog] = React.useState("");
  const [user, setUser] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [comment, setComment] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  const Delete = () => {
    const confirmBox = window.confirm(
      "Do you really want to delete this Blog?"
    );
    if (confirmBox === true) {
      Navigate("/deleteblog/" + blog._id);
    }
  };

  const getBlog = async () => {
    await fetch(
      `https://blog-post-backend-api.onrender.com/blogs/${params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((blog) => blog.json())
      .then((blog) => {
        setBlog(blog.blog);
        setComment(blog.blog.review);
        if (localStorage.getItem("id") === blog.blog.owner) {
          setUser(true);
        }
      });
    setLoading(true);
  };

  useEffect(async () => {
    getBlog();
  }, []);

  const darkMode = () => {
    var element = document.getElementById("dark");
    element.classList.toggle("dark-mode");
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader isClose={modal} toggle={toggle}>
          Update Blog
        </ModalHeader>
        <ModalBody>
          <Updateblog data={blog} />
        </ModalBody>
      </Modal>
      {loading ? (
        <div className="blog-container">
          <div className="blog-image">
            <img
              className="img"
              src={`https://blog-post-backend-api.onrender.com/public/img/blog/${blog.image}`}
              alt="pic.jpg"
            />
          </div>
          <div className="title">
            <label>Title:{blog.title}</label>
          </div>
          {user && (
            <div className="edit-dlt">
              <div>
                <EditIcon onClick={toggle} fontSize="large"></EditIcon>
              </div>
              <div>
                <DeleteIcon onClick={Delete} fontSize="large"></DeleteIcon>
              </div>
            </div>
          )}
          <div className="createdAt">
            <p>{blog.createdAt}</p>
          </div>

          <div id="dark" className="description">
            <Brightness4Icon
              className="darkbtn"
              onClick={darkMode}
            ></Brightness4Icon>
            <div className="Author">Author: {blog.name}</div>
            <p>{blog.description}</p>
          </div>

          <ScrollableFeed>
            <div className="comment">
              {comment.map((comment) => {
                return (
                  <>
                    <div className="comment-box" key={comment._id}>
                      <div className="cmnts">
                        <div className="first">
                          <Avatar
                            src={`https://blog-post-backend-api.onrender.com/public/img/user/${comment.photo}`}
                          />
                        </div>
                        <div className="name-cmnt">
                          <p style={{ "font-weight": "600" }}>{comment.name}</p>
                          <p style={{ "margin-top": "-15px" }}>
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </ScrollableFeed>
          <Comment id={params.id} />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default Readblog;
