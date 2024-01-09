"use client";
import {
  BlockNoteEditor,
  defaultBlockSchema,
  defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import {
  BlockNoteView,
  createReactBlockSpec,
  darkDefaultTheme,
  getDefaultReactSlashMenuItems,
  lightDefaultTheme,
  ReactSlashMenuItem,
  Theme,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import CustomToolbar from "./CustomToolbar";
import { SetStateAction, useCallback, useRef, useState } from "react";
import CustomFontSelector from "./CustomFontSelector";
import { RiText } from "react-icons/ri";
import { BrainCircuit } from "lucide-react";
import AIPromptDialog from "./AIPromptDialog";
import { darkRedTheme, lightGrayTheme } from "@/utils/theme/Theme";

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
  const [fontFamily, setFontFamily] = useState("");

  function getCursorPosition() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      range.collapse(true);
      const rect = range.getClientRects()[0];
      console.log("Cursor Position:", rect);
      return rect;
    }
    console.log("No valid cursor position found");
    return null;
  }

  // Creates a paragraph block with custom font.
  const FontParagraphBlock = createReactBlockSpec(
    {
      type: "fontParagraph",
      propSchema: {
        ...defaultProps,
        font: {
          default: "Comic Sans MS",
        },
      },
      content: "inline",
    },
    {
      render: ({ block, contentRef }: any) => {
        console.log("Rendering font block with font:", block.props.font);
        const style = {
          fontFamily: block.props.font,
        };

        return <p ref={contentRef} style={style} />;
      },
      toExternalHTML: ({ contentRef }: any) => <p ref={contentRef} />,
      parse: (element: any) => {
        const font = element.style.fontFamily;

        if (font === "") {
          return;
        }

        return {
          font: font || undefined,
        };
      },
    }
  );

  // Our block schema, which contains the configs for blocks that we want our
  // editor to use.
  const blockSchema = {
    // Adds all default blocks.
    ...defaultBlockSchema,
    // Adds the font paragraph.
    fontParagraph: FontParagraphBlock.config,
  };
  // Our block specs, which contain the configs and implementations for blocks
  // that we want our editor to use.
  const blockSpecs = {
    // Adds all default blocks.
    ...defaultBlockSpecs,
    // Adds the font paragraph.
    fontParagraph: FontParagraphBlock,
  };

  // Creates a slash menu item for inserting a font paragraph block.
  const insertFontParagraph: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Insert Font Paragraph",
    execute: (editor) => {
      const font = prompt("Enter font name");

      editor.insertBlocks(
        [
          {
            type: "fontParagraph",
            props: {
              font: font || undefined,
            },
          },
        ],
        editor.getTextCursorPosition().block,
        "after"
      );
    },
    aliases: ["p", "paragraph", "font"],
    group: "Other",
    icon: <RiText />,
  };

  // New Slash Command for AI Help
  const getAIHelp: ReactSlashMenuItem<typeof blockSchema> = {
    name: "Get AI Help",
    execute: (editor) => {
      console.log("Get AI Help Command Executed");
    },
    aliases: ["ai", "gpt", "help"],
    group: "AI",
    icon: <BrainCircuit />,
  };

  // Creates a new editor instance.
  const editor = useBlockNote({
    // Tells BlockNote which blocks to use.
    blockSpecs: blockSpecs,
    slashMenuItems: [
      getAIHelp,
      ...getDefaultReactSlashMenuItems(blockSchema),
      insertFontParagraph,
    ],
  });

  return (
    <div className="w-full flex flex-col gap-10">
      <CustomToolbar
        editor={editor}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />
      {/* <CustomFontSelector editor={editor} /> */}
      <BlockNoteView editor={editor} theme={getGrayTheme(fontFamily)} />
      {/* <div className="w-full flex justify-center">
        <AIPromptDialog
          onSubmit={handleAISubmission}
        />
      </div> */}
      {/* <BlockNoteView editor={editor} theme={grayTheme} /> */}
    </div>
  );
};

export default Editor;
