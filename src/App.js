import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import SearchParams from "./SearchParams";
import SeachParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1 id="something-important">Adopt me!</h1>
      {/* <Pet name="Luna" animal="Dog" breed="Havanese" />
      <Pet name="Pepper" animal="Bird" breed="Cocktaiel" />
      <Pet name="Doink" animal="Cat" breed="Mixed" /> */}
      <SeachParams />
    </div>
  );
};

render(<App />, document.getElementById("root"));
