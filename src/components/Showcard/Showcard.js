import React from "react";
import Card from "../Card/Cards";
import "./Showcard.css";

function Showcard({ data }) {
  return (
    <div className="card-container">
      {Array.from(data).map((items) => {
        return (
          <div className="Card">
            <Card
              key={items._id}
              title={items.title}
              header={items.createdAt}
              id={items._id}
              description={items.description}
              name={items.name}
              image={items.image}
              avatar={items.photo}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Showcard;
