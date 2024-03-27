import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Button, Tooltip, message } from "antd";
import { DragOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextBlock.css"; // Import custom CSS for TextBlock

const TextBlock = ({
  id,
  content,
  updateBlockContent,
  index,
  moveBlock,
  deleteBlock,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(content);

  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing delete modal
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  // Updated handleTextChange function
  const handleTextChange = (value) => {
    const wordCount = countWords(value);
    if (wordCount <= 250) {
      setInputValue(value);
      updateBlockContent(id, value);
    } else {
      message.error("You can only add up to 250 words.");
    }
  };

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.filter((word) => word !== "").length;
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dragIndex = e.dataTransfer.getData("text/plain");
    moveBlock(dragIndex, index);
  };

  const handleDeleteClick = () => {
    // Close the delete modal
    setShowDeleteModal(false);
    // Delete the TextBlock
    deleteBlock(id);
    message.success("Text block deleted successfully!");
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

  return (
    <div
      className="text-block-container"
      style={{
        width: "75%",
        margin: "16px auto",
        border: "1px solid black",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "16px",
        cursor: "move",
        position: "relative",
        outline: isHovered ? "2px solid #90e0ef" : "none",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <Tooltip title="Edit">
          <EditOutlined
            className="edit-icon"
            onClick={() => setShowDeleteModal(true)}
          />
        </Tooltip>
      )}
      <div style={{ flex: 0.95 }}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={inputValue}
          onChange={handleTextChange}
          style={{
            fontFamily: "Times New Roman",
            fontSize: "12px",
            color: "black",
            border: isEditing ? "1px solid #1890ff" : "none",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        />
      </div>
      <Modal
        title="Delete Text Block"
        visible={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        footer={
          <div style={{ textAlign: "center" }}>
            <Button
              key="cancel"
              onClick={() => setShowDeleteModal(false)}
              style={{ marginRight: "8px" }}
            >
              Cancel
            </Button>
            <Button
              key="delete"
              type="primary"
              onClick={handleDeleteClick}
              style={{
                marginLeft: "8px",
                background: "#6c757d",
                color: "white",
              }}
            >
              Delete
            </Button>
          </div>
        }
        centered // Center the modal on the screen
      >
        <p>Are you sure you want to delete this text block?</p>
      </Modal>
    </div>
  );
};

export default TextBlock;
