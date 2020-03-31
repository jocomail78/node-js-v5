//mostly code from docs reactjs.org/docs/error-boundaries.html

import React, { Component } from "react";
import { Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    console.log("Buksi kiszokott");
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    console.log(this.state);
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children; //so basically returning all the children from between <ErrorBoundary> Stuff </ErrorBoundary>
  }
}

export default ErrorBoundary;
