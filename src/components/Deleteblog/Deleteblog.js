import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Deleteblog() {
  const params = useParams();
  const Navigate = useNavigate();
  useEffect(async () => {
    await axios
      .delete(
        `https://blog-post-api-production.up.railway.app/blogs/${params.id}`,
        {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("id1");
        Navigate("/");
      });
  });
  return <div></div>;
}

export default Deleteblog;
