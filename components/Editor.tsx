"use client";
import { BlockNoteEditor } from "@blocknote/core";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  Theme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import CustomToolbar from "./CustomToolbar";
import { useState } from "react";
import CustomFontSelector from "./CustomFontSelector";

// Custom red light theme
const lightGrayTheme = {
  colors: {
    editor: {
      text: "#222222",
      background: "#ffffff",
    },
    menu: {
      text: "#ffffff",
      background: "#050B18",
    },
    tooltip: {
      text: "#ffffff",
      background: "#050B18",
    },
    hovered: {
      text: "#ffffff",
      background: "#0d204a",
    },
    selected: {
      text: "#ffffff",
      background: "#0d204a",
    },
    disabled: {
      text: "#f2f2f2",
      background: "#adb5bd",
      cursor: "cursor-not-allowed",
    },
    shadow: "none",
    border: "#0d204a",
    sideMenu: "#bababa",
    highlightColors: lightDefaultTheme.colors.highlightColors,
  },
  borderRadius: 10,
  fontFamily: "Helvetica Neue, sans-serif",
} satisfies Theme;

// Custom red dark theme
const darkRedTheme = {
  ...lightGrayTheme,
  colors: {
    ...lightGrayTheme.colors,
    editor: {
      text: "#ffffff",
      background: "violet",
    },
    sideMenu: "violet",
    // TODO: Update
    highlightColors: darkDefaultTheme.colors.highlightColors,
  },
} satisfies Theme;

// Combining the custom themes into a single theme object.
const grayTheme = {
  light: lightGrayTheme,
  dark: darkRedTheme,
};

const getGrayTheme = (fontFamily: string) => ({
  light: {
    ...lightGrayTheme,
    fontFamily: fontFamily || lightGrayTheme.fontFamily,
  },
  dark: {
    ...darkRedTheme,
    fontFamily: fontFamily || darkRedTheme.fontFamily,
  },
});

const Editor = () => {
  const [fontSize, setFontSize] = useState("16px");
  const [fontFamily, setFontFamily] = useState("");
  const editor = useBlockNote({});

  const applyFontToSelectedLine = (fontFamily: string) => {
    // Logic to apply the selected font family to the editor
    setFontFamily(fontFamily);
    // You might need to implement additional logic here to update the editor's content
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <CustomToolbar
        editor={editor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        setFontSize={setFontSize}
        setFontFamily={setFontFamily}
      />
      <CustomFontSelector setFontFamily={applyFontToSelectedLine} />
      <BlockNoteView editor={editor} theme={getGrayTheme(fontFamily)} />

      {/* <BlockNoteView editor={editor} theme={grayTheme} /> */}
    </div>
  );
};

export default Editor;
