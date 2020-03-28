import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
import Details from "./Details";

const App = () => {
  return (
    <div>
      <h1 id="something-important">
        <Link to="/">Adopt me!</Link>
      </h1>
      <Router>
        <SearchParams path="/" />
        <Details path="/details/:id" />
      </Router>
    </div>
  );
};

render(<App />, document.getElementById("root"));
