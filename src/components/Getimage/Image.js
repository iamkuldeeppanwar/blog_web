import React, { useEffect } from "react";
import axios from "axios";

function Image(props) {
  const [pic, setPic] = React.useState();

  useEffect(() => {
    axios
      .get(
        `https://blog-post-backend-api.onrender.com/blogs/${props.id}/avatar`,
        {
          headers: {
            Authorization: `${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then((image) => {
        console.log(image);
        setPic(image.data.data);
      });
  }, []);
  return (
    <div>
      <img
        className="createimage"
        src={`https://blog-post-backend-api.onrender.com/public/img/blog/${pic}`}
      />
    </div>
  );
}

export default Image;
