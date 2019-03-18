import React from "react";
import { Link } from "react-router-dom";

const SignedInLinks = () => {
  let userId = 1;
  return (
    <div>
      <h5>SignedInLinks</h5>
      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
      <Link to={`/account/${userId}`}>
        <button> Account </button>
      </Link>
      <Link to="/bills">
        <button> Bills </button>
      </Link>
      <Link to="/politicians">
        <button> Politicians</button>
      </Link>
      <Link to="/">
        <button>Logout </button>
      </Link>
    </div>
  );
};

export default SignedInLinks;

/*

<button> </button>
*/
