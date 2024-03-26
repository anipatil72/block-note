import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{ backgroundColor: "white", padding: "16px", textAlign: "center" }}
    >
      <p style={{ color: "black", margin: 0 }}>
        ©️ 2024 by Aniruddha Patil{" "}
        <a href="https://github.com/anipatil72">GitHub</a>
      </p>
    </Footer>
  );
};

export default AppFooter;
