import React, { useEffect } from "react";
import Blogimage from "../Blog-image/Blogimage";
import Showcard from "../Showcard/Showcard";
import Loader from "../Loader/Loader";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const Navigate = useNavigate();

  useEffect(async () => {
    console.log("effect");
    await fetch(`https://blog-post-api-production.up.railway.app/allblogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setData(data);
      });
    setLoading(true);
  }, []);

  const createBlog = () => {
    Navigate("/createblog");
  };

  return (
    <>
      <Blogimage />
      <Button
        className="create-blogbtn"
        color="primary"
        endIcon={<AddCircleIcon />}
        onClick={createBlog}
      >
        Create Blog
      </Button>
      {loading ? <Showcard data={data} /> : <Loader />}
    </>
  );
}

export default Home;
