import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../assets/404.png";

class NotFoundPage extends React.Component {
  render() {
    return (
      <Link to="/">
        <img src={PageNotFound} alt="404 Not found page" />
      </Link>
    );
  }
}
export default NotFoundPage;
