import React from "react";
import { Layout } from "antd";
import blockNoteLogo from "./6d501dd3-2cdb-43e5-87a5-03812f6acecd.svg"; // Import the image

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header
      style={{
        backgroundColor: "white",
        padding: "16px",
        display: "flex",
      }}
    >
      <img
        src={blockNoteLogo}
        style={{ borderRadius: "10px", marginRight: "10px" }}
      ></img>
      <h1 style={{ color: "black", margin: 4 }}>Block Note</h1>
    </Header>
  );
};

export default AppHeader;
