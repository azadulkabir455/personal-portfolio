"use client";

import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import clsx from "clsx";
import FieldError from "@/designUI/elements/formElement/FieldError/FieldError";
import Icon from "@/designUI/elements/Icon/Icon";
import type { RichTextEditorProps } from "./types";

function toolbarButtonClassName(active: boolean) {
  return clsx(
    "flex h-8 w-8 cursor-pointer items-center justify-center rounded-[6px] font-sans text-[13px] font-bold transition-colors duration-150",
    active ? "bg-[#242423] text-white" : "text-[#171717] hover:bg-[#F0F0F0]",
  );
}

export default function RichTextEditor({
  id,
  label,
  value,
  onChange,
  error,
  containerClassName = "",
}: RichTextEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapImage.configure({
        HTMLAttributes: { class: "rounded-[8px]" },
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        id,
        class:
          "prose prose-sm max-w-none min-h-[240px] px-4 py-3 outline-none font-sans text-[14px] text-[#171717]",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const handleImageFile = (file: File | null) => {
    if (!file || !editor) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        editor.chain().focus().setImage({ src: reader.result }).run();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <span className="font-sans text-[11px] font-semibold text-[#8A8A86] lg:text-[12px]">{label}</span>

      <div
        className={clsx(
          "overflow-hidden rounded-[10px] border bg-white",
          error ? "border-[#E5484D]" : "border-[#E4E4E4]",
        )}
      >
        <div className="flex flex-wrap items-center gap-1 border-b border-[#E4E4E4] bg-[#FAFAFA] px-2 py-1.5">
          <button
            type="button"
            className={toolbarButtonClassName(Boolean(editor?.isActive("bold")))}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            B
          </button>
          <button
            type="button"
            className={clsx(toolbarButtonClassName(Boolean(editor?.isActive("italic"))), "italic")}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            I
          </button>
          <button
            type="button"
            className={clsx(toolbarButtonClassName(Boolean(editor?.isActive("strike"))), "line-through")}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            S
          </button>

          <span className="mx-1 h-5 w-px bg-[#E4E4E4]" />

          <button
            type="button"
            className={toolbarButtonClassName(Boolean(editor?.isActive("heading", { level: 2 })))}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            H2
          </button>
          <button
            type="button"
            className={toolbarButtonClassName(Boolean(editor?.isActive("heading", { level: 3 })))}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            H3
          </button>

          <span className="mx-1 h-5 w-px bg-[#E4E4E4]" />

          <button
            type="button"
            className={toolbarButtonClassName(Boolean(editor?.isActive("bulletList")))}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <Icon name="FaListUl" width={13} height={13} />
          </button>
          <button
            type="button"
            className={toolbarButtonClassName(Boolean(editor?.isActive("orderedList")))}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <Icon name="FaListOl" width={13} height={13} />
          </button>
          <button
            type="button"
            className={toolbarButtonClassName(Boolean(editor?.isActive("blockquote")))}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Icon name="FaQuoteRight" width={12} height={12} />
          </button>

          <span className="mx-1 h-5 w-px bg-[#E4E4E4]" />

          <button
            type="button"
            className={toolbarButtonClassName(false)}
            onClick={() => imageInputRef.current?.click()}
          >
            <Icon name="FaImage" width={13} height={13} />
          </button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              handleImageFile(event.target.files?.[0] ?? null);
              event.target.value = "";
            }}
          />

          <span className="mx-1 h-5 w-px bg-[#E4E4E4]" />

          <button
            type="button"
            className={toolbarButtonClassName(false)}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <Icon name="FaUndo" width={12} height={12} />
          </button>
          <button
            type="button"
            className={toolbarButtonClassName(false)}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <Icon name="FaRedo" width={12} height={12} />
          </button>
        </div>

        <EditorContent editor={editor} />
      </div>

      <FieldError message={error} />
    </div>
  );
}
