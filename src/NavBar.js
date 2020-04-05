import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import colors from "./colors";

const spin = keyframes`
    to{
        transform: rotate(360deg);
    }
`;

// Second version
//this way we have possibility to manipulate styles programmatically
//since we have the JS and CSS together in one file.
const NavBar = () => {
  const [padding, setPadding] = useState(15);
  return (
    <header
      //onClick={() => setPadding(padding + 15)}
      css={css`
        background-color: ${colors.secondary};
        padding: ${padding}px;
      `}
    >
      <Link to="/"> Adopt Me!</Link>
      <span
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: 1s ${spin} linear infinite;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
            animation: 1s ${spin} linear infinite reverse;
          }
        `}
        role="img"
        aria-label="logo"
      >
        🐩
      </span>
    </header>
  );
};

//First version

// const backgroundColor = "pink";
// const NavBar = () => (
//   <header
//     css={css`
//       /* background-color: #333; */
//       background-color: ${backgroundColor};
//       padding: 15px;
//     `}
//   >
//     <Link to="/"> Adopt Me!</Link>
//     <span role="img" aria-label="logo">
//       🐩
//     </span>
//   </header>
// );

export default NavBar;
