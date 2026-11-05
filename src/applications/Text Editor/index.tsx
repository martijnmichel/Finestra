import React, { useEffect } from "react";
import { Application } from "../application";
import { AppIcon } from "../../components/application/AppIcon";
import Icon from "../../icons/text-editor.png";
import { useAppContext } from "../../store";
import { startApp } from "../../store/actions/startApp";
import { closeApp } from "../../store/actions/closeApp";
import { AppNavigation } from "../../components/application/AppNavigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useOsFormFactor } from "@/hooks/useOsFormFactor";
import { PhoneAppChrome } from "@/components/application/PhoneAppChrome";
import { goHome } from "@/store/actions/goHome";
import { cn } from "@/lib/utils";

export class TextEditor extends Application {
  static appName = "TextEditor";
  public name = "TextEditor";

  static icon = () => <AppIcon src={Icon} alt="TextEdit" />;

  public category = "default";

  component = () => TextEditorApp(this.id);

  constructor() {
    super();
  }
}

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "os-chrome rounded-[6px] px-2 py-1 text-[13px]",
        active
          ? "bg-black/10 dark:bg-white/15"
          : "hover:bg-black/5 dark:hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}

export const TextEditorApp = (id: string) => {
  const { dispatch } = useAppContext();
  const { isIos } = useOsFormFactor();

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing a story…",
      }),
    ],
    content: "<p>Start typing a story…</p>",
    editorProps: {
      attributes: {
        class:
          "tiptap-editor os-chrome min-h-full px-5 py-4 text-[15px] leading-relaxed outline-none focus:outline-none",
      },
    },
  });

  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const navigation = [
    {
      label: "File",
      items: [
        {
          label: "New File",
          function: () => {
            startApp("TextEditor")(dispatch);
          },
        },
        {
          label: "New Window",
          function: () => {
            startApp("TextEditor")(dispatch);
          },
        },
        { label: "separator" },
        {
          label: "Close",
          function: () => {
            closeApp(id)(dispatch);
          },
        },
      ],
    },
    {
      label: "Window",
      items: [
        {
          label: "New File",
          function: () => {
            startApp("TextEditor")(dispatch);
          },
        },
        {
          label: "New Window",
          function: () => {
            startApp("TextEditor")(dispatch);
          },
        },
        { label: "separator" },
        {
          label: "Close",
          function: () => {
            closeApp(id)(dispatch);
          },
        },
      ],
    },
  ];

  return (
    <div className="flex h-full min-h-0 flex-col bg-[var(--window-body,#fff)]">
      {!isIos ? (
        <AppNavigation items={navigation} id={id} appName="TextEdit" />
      ) : (
        <PhoneAppChrome
          title="TextEdit"
          onDone={() => goHome()(dispatch)}
        />
      )}

      {editor ? (
        <div
          className="flex shrink-0 flex-wrap items-center gap-0.5 border-b border-black/[0.08] px-2 py-1.5 dark:border-white/[0.1]"
          style={{ background: "var(--window-toolbar, transparent)" }}
        >
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            • List
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
          >
            H2
          </ToolbarButton>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
};
