import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./LandingPage.css";

const LandingPage = () => {
  const wholeStyle = {
    position: "relative",
    textAlign: "center",
    textShadow: "1px 1px gray",
    zIndex: 1
  };

  const titleStyle = {
    color: "obsidian",
    fontSize: "2rm",
    marginTop: "auto",
    paddingTop: "15vw"
  };

  const subStyle = {
    fontSize: "2.5rem",
    fontWeight: 700
  };
  
  return (
    <div className="landingPage" style={wholeStyle}>
      <div className="title" style={titleStyle}>
        <div style={subStyle}>Know Your Gov</div>
        <br />
        <Link to="/login">
          <Button color="secondary" variant="contained" size="medium">
            Enter
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
