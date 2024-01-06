"use client";
import React, { useState } from "react";
import { ToggledStyleButton, Toolbar } from "@blocknote/react";
import { BlockNoteEditor } from "@blocknote/core";

interface MyCustomToolbarProps {
  editor: BlockNoteEditor;
}

const CustomToolbar = ({ editor }: MyCustomToolbarProps) => {
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);

  const toggleBold = () => setIsBoldActive(!isBoldActive);
  const toggleItalic = () => setIsItalicActive(!isItalicActive);
  const toggleUnderline = () => setIsUnderlineActive(!isUnderlineActive);

  const buttonClass = (isActive: boolean) => {
    return `flex items-center rounded-lg transition-colors duration-200 ease-in-out ${
      isActive
        ? "bg-[#0d204a] text-white hover:bg-[#0d204a]"
        : "bg-gray-100  hover:bg-gray-200 text-black"
    }`;
  };

  return (
    <Toolbar className="w-full flex">
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
      {/* Additional buttons as needed */}
    </Toolbar>
  );
};

export default CustomToolbar;
