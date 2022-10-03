import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import colors from "./colors";
// import selectArrow from "../assets/share/selectArrow.svg";

export default createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
    white-space: nowrap;
    scroll-behavior: smooth;
  }

  body {
    width: 100%;
    font-size: 16px;
    font-family: 'SF Pro Display', sans-serif;
    overflow: scroll;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;

    body::-webkit-scrollbar {
      display: none;
    }
  }

  a {
    color: ${colors.blackColor};
    text-decoration: none;
  }

  textarea {
    resize: none;
  }

  input,
  textarea {
    border: none;
    outline: none;

    &::placeholder {
      // color: ${colors.blackColor};
      font-weight: 400;
    }
  }
  
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  textarea:focus,
  input:focus {
    outline: none;
  }

  button {
    cursor: pointer;
    outline: none;
    border: none;
    background-color: ${colors.whiteColor};
  }

  select {
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
  }
`;


//background: url(${selectArrow}) no-repeat 95% 50% ${colors.white};