"use client";
import React, { useState } from "react";
import {
  ToggledStyleButton,
  Toolbar,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlockNoteEditor } from "@blocknote/core";
import AIPromptDialog from "./AIPromptDialog";
import { handleAISubmission } from "@/utils";

interface MyCustomToolbarProps {
  editor: any;
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

  // Extract default slash commands (assuming they're in a format you can use)
  const defaultCommands = getDefaultReactSlashMenuItems();

  // Handler for when a command is selected from the dropdown
  const handleCommandSelect = (value: any) => {
    const command = defaultCommands.find((c) => c.name === value);
    if (command && editor) {
      command.execute(editor);
    }
  };

  const buttonClass = (isActive: boolean) => {
    return `flex items-center rounded-lg transition-colors duration-200 ease-in-out ${
      isActive
        ? "bg-[#0d204a] text-white hover:bg-[#0d204a]"
        : "bg-gray-100  hover:bg-gray-200 text-black"
    }`;
  };

  return (
    <Toolbar className="w-full flex gap-10">
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
      <Select onValueChange={handleCommandSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Choose content type..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Content Types</SelectLabel>
            {defaultCommands.map((command, index) => (
              <SelectItem key={index} value={command.name}>
                {command.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex">
        <AIPromptDialog onSubmit={handleAISubmission} />
      </div>
    </Toolbar>
  );
};

export default CustomToolbar;
