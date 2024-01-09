import React from "react";

const handleSlashCommand = () => {
  // Get the viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  // Get dimensions of the popover content if possible, or use estimate size
  const popoverWidth = 300; // Replace with actual width or dynamic measurement
  const popoverHeight = 150; // Replace with actual height or dynamic measurement

  // Calculate position to ensure the popover stays in bounds
  const position = {
    left: Math.min(editorPosition.left, viewportWidth - popoverWidth),
    top: Math.min(editorPosition.top, viewportHeight - popoverHeight),
  };

  // If the position is too close to the bottom or right edge, adjust it
  if (position.left + popoverWidth > viewportWidth) {
    position.left -= position.left + popoverWidth - viewportWidth;
  }
  if (position.top + popoverHeight > viewportHeight) {
    position.top -= position.top + popoverHeight - viewportHeight;
  }

  // Set the position state
  setPosition(position);
};

export default handleSlashCommand;
