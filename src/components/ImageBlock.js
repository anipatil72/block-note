import React, { useState } from "react";
import { Upload, Button, Tooltip, Modal, message } from "antd";
import {
  PictureOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ImageBlock = ({
  id,
  content,
  updateBlockContent,
  index,
  moveBlock,
  deleteBlock,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      updateBlockContent(id, reader.result);
    };
    reader.readAsDataURL(file);
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
    deleteBlock(id);
    message.success("Image block deleted successfully!");
  };

  return (
    <div
      style={{
        width: "75%",
        margin: "16px auto",
        border: "1px solid black",
        padding: "8px",
        position: "relative",
        borderRadius: "10px",
        marginBottom: "16px",
        cursor: "move",
        outline: isHovered ? "2px solid #90e0ef" : "none",
      }}
      draggable
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content ? (
        <div style={{ textAlign: "center" }}>
          <img
            src={content}
            alt="Block"
            style={{ maxWidth: "75%", maxHeight: "250px" }}
          />
          {isHovered && (
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                zIndex: 1,
              }}
            >
              <Tooltip title="Edit">
                <EditOutlined
                  style={{
                    color: "black",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowEditModal(true)}
                />
              </Tooltip>
            </div>
          )}
        </div>
      ) : (
        <Upload.Dragger
          showUploadList={false}
          beforeUpload={(file) => handleImageUpload(file)}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        >
          <Button icon={<PictureOutlined />}>Click to upload</Button>
        </Upload.Dragger>
      )}
      <Modal
        title="Edit Image Block"
        visible={showEditModal}
        onCancel={() => setShowEditModal(false)}
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
              onClick={handleDeleteClick}
              style={{
                background: "#6c757d",
                color: "white",
              }}
            >
              Delete
            </Button>
          </div>
        }
        centered
      >
        {content && (
          <img
            src={content}
            alt="Block"
            style={{
              maxWidth: "100%",
              maxHeight: "250px",
              display: "block",
              margin: "0 auto",
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default ImageBlock;
