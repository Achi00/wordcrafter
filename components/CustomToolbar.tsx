"use client";
import React, { useState } from "react";
import { ToggledStyleButton, Toolbar } from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";

interface MyCustomToolbarProps {
  editor: BlockNoteEditor;
  fontSize: string;
  fontFamily: string;
  setFontSize: (size: string) => void;
  setFontFamily: (family: string) => void;
}

const fontSizes = ["12px", "14px", "16px", "18px", "20px"]; // Example font sizes
const fontFamilies = ["Arial", "Times New Roman", "Georgia", "Courier New"]; // Example font families

const CustomToolbar = ({
  editor,
  fontSize,
  fontFamily,
  setFontSize,
  setFontFamily,
}: MyCustomToolbarProps) => {
  // if bold, italic or underline is activated
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  // font size and style

  // toogle selection
  const toggleBold = () => setIsBoldActive(!isBoldActive);
  const toggleItalic = () => setIsItalicActive(!isItalicActive);
  const toggleUnderline = () => setIsUnderlineActive(!isUnderlineActive);

  // toggle font changes
  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontSize(event.target.value);
  };

  const handleFontFamilyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFontFamily(event.target.value);
  };

  const buttonClass = (isActive: boolean) => {
    return `flex items-center rounded-lg transition-colors duration-200 ease-in-out ${
      isActive
        ? "bg-[#0d204a] text-white hover:bg-[#0d204a]"
        : "bg-gray-100  hover:bg-gray-200 text-black"
    }`;
  };

  return (
    <Toolbar className="w-full flex gap-5">
      <div className="flex gap-2">
        <span className={buttonClass(isBoldActive)} onClick={toggleBold}>
          <ToggledStyleButton editor={editor} toggledStyle="bold" />
        </span>
        <span className={buttonClass(isItalicActive)} onClick={toggleItalic}>
          <ToggledStyleButton editor={editor} toggledStyle="italic" />
        </span>
        <span
          className={buttonClass(isUnderlineActive)}
          onClick={toggleUnderline}
        >
          <ToggledStyleButton editor={editor} toggledStyle="underline" />
        </span>
      </div>
      <div className="flex gap-2">
        <select value={fontFamily} onChange={handleFontFamilyChange}>
          {fontFamilies.map((fontFamily) => (
            <option key={fontFamily} value={fontFamily}>
              {fontFamily}
            </option>
          ))}
        </select>

        <select value={fontSize} onChange={handleFontSizeChange}>
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </Toolbar>
  );
};

export default CustomToolbar;
