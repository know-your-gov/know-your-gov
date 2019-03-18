import React from "react";
import { Link } from "react-router-dom";
const PoliticianCard = () => {
  let id = 1;
  return (
    <div>
      <Link to={`/politicians/${id}`}>Politician Details</Link>
    </div>
  );
};

export default PoliticianCard;
