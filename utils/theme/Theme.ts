import { Theme, darkDefaultTheme, lightDefaultTheme } from "@blocknote/react";

// Custom gray light theme
export const lightGrayTheme = {
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
