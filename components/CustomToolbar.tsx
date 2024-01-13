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
import { Separator } from "@/components/ui/separator";
import AIPromptDialog from "./AIPromptDialog";
import { Type } from "lucide-react";
import Menu from "./Menu";
import AIExpandContent from "./AIExpandContent";

interface MyCustomToolbarProps {
  editor: any;

  fontFamily: string;
  setFontFamily: (family: string) => void;
}

const CustomToolbar = ({ editor }: MyCustomToolbarProps) => {
  // if bold, italic or underline is activated
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  // font size and style

  // toogle selection
  const toggleBold = () => setIsBoldActive(!isBoldActive);
  const toggleItalic = () => setIsItalicActive(!isItalicActive);
  const toggleUnderline = () => setIsUnderlineActive(!isUnderlineActive);

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
      <Menu />
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
        <SelectTrigger className="w-[240px]">
          <Type size={18} color="#050505" />
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
      <div className="flex gap-2 items-center">
        <AIPromptDialog />
        <div className="w-[1px] h-7 bg-gray-500"></div>
        <AIExpandContent editor={editor} />
      </div>
      <div className="w-full h-[1px] bg-gray-500"></div>
    </Toolbar>
  );
};

export default CustomToolbar;
