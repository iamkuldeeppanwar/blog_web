import React, { useEffect } from "react";
import axios from "axios";
import "./Profilepic.css";

function Profilepic() {
  const [pic, setPic] = React.useState();
  const id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(
        `https://blog-post-api-production.up.railway.app/users/${id}/avatar`,
        {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then((image) => {
        setPic(image.data.data);
      });
  }, []);

  return (
    <div>
      <img
        className="profilepic"
        src={`https://blog-post-api-production.up.railway.app/public/img/user/${pic}`}
      />
    </div>
  );
}

export default Profilepic;
