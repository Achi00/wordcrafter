"use client";
import {
  Block,
  BlockNoteEditor,
  defaultBlockSchema,
  defaultBlockSpecs,
  defaultProps,
} from "@blocknote/core";
import {
  BlockNoteView,
  createReactBlockSpec,
  getDefaultReactSlashMenuItems,
  ReactSlashMenuItem,
  useBlockNote,
} from "@blocknote/react";
import "@blocknote/core/style.css";
import CustomToolbar from "./CustomToolbar";
import { useEffect, useState } from "react";
import { RiText } from "react-icons/ri";
import { BrainCircuit } from "lucide-react";
import { darkRedTheme, lightGrayTheme } from "@/utils/theme/Theme";
import { useAIResponse } from "@/context/AIResponseContext";
import MinimizableComponent from "./MinimizableComponent";

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

  const { introResponse, expandedContent } = useAIResponse();

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

  // add ai generated content into editor
  useEffect(() => {
    if (editor && introResponse) {
      const updateEditorContent = async () => {
        const blocks = await editor.tryParseMarkdownToBlocks(introResponse);
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      updateEditorContent();
    }
  }, [editor, introResponse]);

  // add ai generated expanded content into editor
  useEffect(() => {
    if (editor && expandedContent) {
      const updateEditorContent = async () => {
        const blocks = await editor.tryParseMarkdownToBlocks(expandedContent);
        editor.replaceBlocks(editor.topLevelBlocks, blocks);
      };
      updateEditorContent();
    }
  }, [editor, expandedContent]);

  // get content from editor and send to server
  const getContentFromEditor = () => {
    const blocks = editor.topLevelBlocks as any;
    let content = "";

    blocks.forEach((block: any) => {
      if (block.content && block.content.length > 0 && block.content[0].text) {
        content += block.content[0].text + "\n";
      }
    });

    return content;
  };

  const handleGetContentForLogging = () => {
    const currentContent = getContentFromEditor();
    console.log(currentContent);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <CustomToolbar
        editor={editor}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
      />
      <BlockNoteView editor={editor} theme={getGrayTheme(fontFamily)} />
      <div className="w-1/5 absolute bottom-0 right-8">
        <MinimizableComponent />
      </div>
    </div>
  );
};

export default Editor;
