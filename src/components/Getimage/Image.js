import React, { useEffect } from "react";
import axios from "axios";

function Image(props) {
  const [pic, setPic] = React.useState();

  useEffect(() => {
    axios
      .get(
        `https://blog-post-api-production.up.railway.app/blogs/${props.id}/avatar`,
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
        src={`https://blog-post-api-production.up.railway.app/public/img/blog/${pic}`}
      />
    </div>
  );
}

export default Image;
