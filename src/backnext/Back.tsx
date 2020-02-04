import React from "react";
import "../App.css";
import { Page } from "../App";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import kitten from "./kitten.svg";

interface Props {
  changePage: (page: Page) => void;
}

const Back: React.FC<Props> = props => {
  return (
    <div className="outer">
      <NavBar />
      <div className="imageContainer">
        <img src={kitten} alt="Kitten" />
      </div>
      <div className="backnext">
        <Button onClick={() => props.changePage(Page.Next)}>
          &lt;Back
        </Button>
        <Button onClick={() => props.changePage(Page.Back)}>
          Next&gt;
        </Button>
      </div>
    </div>
  );
};

export default Back;
