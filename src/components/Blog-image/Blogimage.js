import React from "react";
import "./Blogimage.css";
import Animate from "../Animation/Animate";
import blogImage from "../../images/download.jpg";

function Blogimage() {
  return (
    <div className="Blogimage">
      <img src={blogImage} alt="" />
      <Animate />
    </div>
  );
}

export default Blogimage;
