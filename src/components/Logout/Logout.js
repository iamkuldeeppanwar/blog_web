import React from "react";
import { useNavigate } from "react-router";

function Logout() {
  const Navigate = useNavigate();
  const Logout = async () => {
    await fetch(
      `https://blog-post-api-production.up.railway.app/users/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("id");
        Navigate("/");
      });
  };
  Logout();
  return <div></div>;
}

export default Logout;
