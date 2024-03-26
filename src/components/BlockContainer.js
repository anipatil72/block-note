import React, { useRef, useEffect } from "react";
import { Layout } from "antd";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";

const { Content } = Layout;

const BlockContainer = ({
  blocks,
  updateBlockContent,
  moveBlock,
  deleteBlock,
  blockRefs,
  blockContainerRef,
}) => {
  // const blockContainerRef = useRef(null);

  useEffect(() => {
    // Update blockRefs with references to each block element
    if (blockContainerRef.current) {
      const blockElements =
        blockContainerRef.current.querySelectorAll(".block");
      blockRefs.current = [...blockElements];
    }
  }, [blocks]);

  return (
    <Content
      style={{ padding: "24px", minHeight: "calc(100vh - 128px)" }}
      ref={blockContainerRef}
    >
      {blocks.map((block, index) => (
        <div
          key={block.id}
          ref={(element) => (blockRefs.current[index] = element)}
          className="block"
        >
          {block.type === "text" ? (
            <TextBlock
              id={block.id}
              content={block.content}
              updateBlockContent={updateBlockContent}
              index={index}
              moveBlock={moveBlock}
              deleteBlock={deleteBlock}
            />
          ) : (
            <ImageBlock
              id={block.id}
              content={block.content}
              updateBlockContent={updateBlockContent}
              index={index}
              moveBlock={moveBlock}
              deleteBlock={deleteBlock}
            />
          )}
        </div>
      ))}
    </Content>
  );
};

export default BlockContainer;
