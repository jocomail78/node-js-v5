import React, { useState, lazy, Suspense } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import ThemeContext from "./ThemeContext";
import NavBar from "./NavBar";

//Previously we had
// import Details from "./Details";
//which ment that when the interpreter arrived to that line, it went to search for Details and
//it was automatically included, even if it wasn't used on the current page, or even if it
//wasn't necessary for the first load.

// The new version is the following:
const Details = lazy(() => import("./Details")); //This is called Dynamic import
//which means we're going to import Details only if it's first time needed

//We're going to do the same to Searchparams as well: Dynamic importing.
// Removing
// import SearchParams from "./SearchParams";
// And adding
const SearchParams = lazy(() => import("./SearchParams"));

const App = () => {
  const themeHook = useState("darkblue");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        {/* This is like a global variable available everywhere in the project*/}
        <div>
          <NavBar />
          {/* This Suspense means that this load will be suspended until it's really needed. 
          And until it will be loaded, the value from the fallback will be shown
          */}
          <Suspense fallback={<h1>Loading Route...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
