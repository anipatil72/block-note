import React, { useState, useRef, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlockContainer from "./components/BlockContainer";
import AddBlockButton from "./components/AddBlockButton";

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const blockContainerRef = useRef(null);
  const blockRefs = useRef([]);
  const prevBlocksLength = useRef(0);
  const { user, loginWithPopup, logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (blockContainerRef.current && blocks.length > prevBlocksLength.current) {
      blockContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
    prevBlocksLength.current = blocks.length;
  }, [blocks.length]);

  const addBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type,
      content: type === "text" ? "" : null,
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockContent = (id, content) => {
    setBlocks(
      blocks.map((block) => (block.id === id ? { ...block, content } : block))
    );
  };

  const moveBlock = (dragIndex, hoverIndex) => {
    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, movedBlock);
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const buttonStyle = {
    background: "#e5e5e5",
    border: "none",
    borderRadius: "10px",
    padding: "8px 16px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, color 0.3s ease",
    marginRight: "26px", // Add transition for smooth color changes
  };

  const hoverButtonStyle = {
    backgroundColor: "black",
    color: "white",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Header />
        {isAuthenticated ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ marginRight: "12px" }}>Welcome, {user.name}</p>
            <button
              style={{ ...buttonStyle, ...hoverButtonStyle }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "black";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e5e5e5";
                e.currentTarget.style.color = "black";
              }}
              onClick={() => logout()}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            style={{ ...buttonStyle, ...hoverButtonStyle }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "black";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#e5e5e5";
              e.currentTarget.style.color = "black";
            }}
            onClick={() => loginWithPopup()}
          >
            Login
          </button>
        )}
      </div>
      <BlockContainer
        blocks={blocks}
        updateBlockContent={updateBlockContent}
        moveBlock={moveBlock}
        deleteBlock={deleteBlock}
        blockRefs={blockRefs}
        blockContainerRef={blockContainerRef}
      />
      <AddBlockButton addBlock={addBlock} />
      <Footer />
    </div>
  );
};

export default App;
