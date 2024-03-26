import React, { useState } from "react";
import { Button, Popover } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddBlockButton = ({ addBlock }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const handleAddTextBlock = () => {
    addBlock("text");
    setVisible(false);
  };

  const handleAddImageBlock = () => {
    addBlock("image");
    setVisible(false);
  };

  const blockOptions = (
    <div style={{ padding: "8px" }}>
      <Button
        type="link"
        onClick={handleAddTextBlock}
        style={{ width: "100%" }}
      >
        Text Block
      </Button>
      <Button
        type="link"
        onClick={handleAddImageBlock}
        style={{ width: "100%" }}
      >
        Image Block
      </Button>
    </div>
  );

  return (
    <Popover
      content={blockOptions}
      title="Add Block"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        style={{ position: "fixed", bottom: "48px", right: "48px" }}
      />
    </Popover>
  );
};

export default AddBlockButton;
