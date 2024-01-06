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

// Custom red light theme
const lightRedTheme = {
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
  ...lightRedTheme,
  colors: {
    ...lightRedTheme.colors,
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
const redTheme = {
  light: lightRedTheme,
  dark: darkRedTheme,
};

const Editor = () => {
  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({});
  return (
    <div className="w-full flex flex-col gap-10">
      <CustomToolbar editor={editor} />
      <BlockNoteView editor={editor} theme={redTheme} />
    </div>
  );
};

export default Editor;
