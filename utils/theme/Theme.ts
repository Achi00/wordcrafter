import { Theme, darkDefaultTheme, lightDefaultTheme } from "@blocknote/react";

// Custom gray light theme
export const lightGrayTheme = {
  colors: {
    editor: {
      text: "#222222",
      background: "#ffffff",
    },
    menu: {
      text: "#000",
      background: "#ced4da",
    },
    tooltip: {
      text: "#ffffff",
      background: "#050B18",
    },
    hovered: {
      text: "#ffffff",
      background: "#adb5bd",
    },
    selected: {
      text: "#ffffff",
      background: "#000",
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

// Custom gray dark theme
export const darkRedTheme = {
  ...lightGrayTheme,
  colors: {
    ...lightGrayTheme.colors,
    editor: {
      text: "#ffffff",
      background: "gray",
    },
    sideMenu: "gray",
    // TODO: Update
    highlightColors: darkDefaultTheme.colors.highlightColors,
  },
} satisfies Theme;
