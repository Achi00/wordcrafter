import React from "react";

const CustomFontSelector = ({ editor }: any) => {
  const handleFontChange = (event: any) => {
    const selectedFont = event.target.value;
    const cursorPosition = editor.getTextCursorPosition();

    editor.insertBlocks(
      [
        {
          type: "fontParagraph",
          props: {
            font: selectedFont,
          },
        },
      ],
      cursorPosition.block,
      "after"
    );
  };

  return (
    <select onChange={handleFontChange}>
      <option value="Arial">Arial</option>
      <option value="Courier New">Courier New</option>
      <option value="Georgia">Georgia</option>
      <option value="Impact">Impact</option>
      <option value="Lucida Console">Lucida Console</option>
      <option value="Trebuchet MS">Trebuchet MS</option>
      <option value="Verdana">Verdana</option>
      <option value="Comic Sans MS">Comic Sans MS</option>
      <option value="Palatino Linotype">Palatino Linotype</option>
      <option value="Times New Roman">Times New Roman</option>
    </select>
  );
};

export default CustomFontSelector;
