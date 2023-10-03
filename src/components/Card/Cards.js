import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Card.css";

function Cards({ header, id, description, avatar, name, image }) {
  const shortName = `${description
    .split(" ")
    .slice(0, 20)
    .join(" ")
    .replace(/<.+?>/g, "")}...`;

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <img
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              className="cardPic"
              alt="img"
              src={`https://blog-post-backend-api.onrender.com/public/img/user/${avatar}`}
            />
          }
          title={name}
          subheader={header}
        />
        <CardMedia
          component="img"
          height="194"
          image={`https://blog-post-backend-api.onrender.com/public/img/blog/${image}`}
          alt="img"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {shortName}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button>
            <Link
              to={{
                pathname: "readblog/" + id,
              }}
            >
              Read Blog
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default Cards;
