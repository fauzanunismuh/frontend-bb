"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";

type ToolbarButton = {
  command: string;
  label: string;
  value?: string;
  title: string;
};

type RichTextEditorProps = {
  id?: string;
  value: string;
  onChange: (html: string) => void;
  onUploadImage?: (file: File) => Promise<string>;
  onUploadError?: (message: string | null) => void;
};

const toolbarButtons: ToolbarButton[] = [
  {
    command: "formatBlock",
    value: "<p>",
    label: "Par",
    title: "Paragraf biasa",
  },
  { command: "formatBlock", value: "<h2>", label: "H2", title: "Heading 2" },
  {
    command: "formatBlock",
    value: "<blockquote>",
    label: "“”",
    title: "Kutipan",
  },
  { command: "bold", label: "B", title: "Tebal" },
  { command: "italic", label: "I", title: "Miring" },
  { command: "underline", label: "U", title: "Garis bawah" },
  { command: "strikeThrough", label: "S", title: "Coret" },
  { command: "insertUnorderedList", label: "•", title: "Bullet list" },
  { command: "insertOrderedList", label: "1.", title: "Number list" },
  { command: "justifyLeft", label: "L", title: "Rata kiri" },
  { command: "justifyCenter", label: "C", title: "Rata tengah" },
  { command: "justifyRight", label: "R", title: "Rata kanan" },
];

const RichTextEditor = ({
  id,
  value,
  onChange,
  onUploadImage,
  onUploadError,
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const savedSelection = useRef<Range | null>(null);
  const saveSelection = () => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    const editor = editorRef.current;
    if (
      !selection ||
      selection.rangeCount === 0 ||
      !editor ||
      !selection.anchorNode
    ) {
      return;
    }
    if (editor.contains(selection.anchorNode)) {
      savedSelection.current = selection.getRangeAt(0);
    }
  };

  const handleToolbarClick = (command: string, value?: string) => {
    execCommand(command, value);
    handleInput();
  };
  const handleToolbarMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    saveSelection();
    event.preventDefault();
  };

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const execCommand = (command: string, commandValue?: string) => {
    if (typeof document === "undefined") return;
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    const selection = window.getSelection();
    if (selection && savedSelection.current) {
      selection.removeAllRanges();
      selection.addRange(savedSelection.current);
    }
    document.execCommand(command, false, commandValue);
    if (command === "removeFormat") {
    document.execCommand("formatBlock", false, "<p>");
    }
  };

  const handleLink = () => {
    if (typeof window === "undefined") return;
    const url = window.prompt("Masukkan URL:", "https://");
    if (url) {
      execCommand("createLink", url);
    }
  };

  const handleImageButton = () => {
    if (onUploadImage) {
      fileInputRef.current?.click();
      return;
    }
    if (typeof window === "undefined") return;
    const url = window.prompt("Tempel URL gambar:", "https://");
    if (url) {
      execCommand("insertImage", url);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onUploadImage) {
      event.target.value = "";
      return;
    }
    setUploadingImage(true);
    onUploadError?.(null);
    try {
      const imageUrl = await onUploadImage(file);
      execCommand("insertImage", imageUrl);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Gagal mengunggah gambar. Coba lagi.";
      onUploadError?.(message);
    } finally {
      setUploadingImage(false);
      event.target.value = "";
    }
  };

  const handleClearFormatting = () => {
    execCommand("removeFormat");
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const currentFormat = () => {
    if (typeof window === "undefined") {
      return "P";
    }
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return "P";
    let node = selection.anchorNode as Node | null;
    const editor = editorRef.current;
    if (!editor) return "P";
    while (node && node !== editor) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName;
        if (["H1", "H2", "H3", "H4", "P", "BLOCKQUOTE"].includes(tag)) {
          return tag;
        }
      }
      node = node.parentNode;
    }
    return "P";
  };

  return (
    <div className="rounded-md border border-stroke text-sm dark:border-gray-700">
      <div className="richtext-toolbar flex flex-wrap gap-2 border-b border-stroke bg-gray-50 p-2 text-xs font-semibold text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
        {toolbarButtons.map((btn) => {
          const editor = editorRef.current;
          const isBrowser = typeof document !== "undefined" && !!editor;
          const normalizedValue = btn.value
            ? btn.value.replace(/[<>]/g, "").toUpperCase()
            : "";
          const blockActive =
            btn.command === "formatBlock" &&
            currentFormat() === normalizedValue;
          const inlineActive = (() => {
            if (!isBrowser) return false;
            if (
              btn.command === "bold" ||
              btn.command === "italic" ||
              btn.command === "underline" ||
              btn.command === "strikeThrough"
            ) {
              return document.queryCommandState(btn.command);
            }
            if (
              btn.command === "formatBlock" &&
              normalizedValue === "BLOCKQUOTE"
            ) {
              return currentFormat() === "BLOCKQUOTE";
            }
            return false;
          })();
          const listActive =
            btn.command === "insertUnorderedList" ||
            btn.command === "insertOrderedList"
              ? isBrowser
                ? document.queryCommandState(
                    btn.command === "insertOrderedList"
                      ? "insertOrderedList"
                      : "insertUnorderedList",
                  )
                : false
              : false;
          const alignActive =
            btn.command === "justifyLeft" ||
            btn.command === "justifyCenter" ||
            btn.command === "justifyRight"
              ? isBrowser
                ? document.queryCommandState(btn.command)
                : false
              : false;
          const isActive = Boolean(
            blockActive || inlineActive || listActive || alignActive,
          );
          return (
            <button
              type="button"
              key={`${btn.command}-${btn.value ?? "default"}`}
              onClick={() => handleToolbarClick(btn.command, btn.value)}
              className={`rounded border border-transparent px-2 py-1 transition hover:border-primary hover:text-primary dark:hover:border-primary ${
                isActive ? "focus:outline-none" : ""
              }`}
              title={btn.title}
              aria-label={btn.title}
              onMouseDown={handleToolbarMouseDown}
              data-active={isActive ? "true" : undefined}
            >
              {btn.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={handleLink}
          onMouseDown={handleToolbarMouseDown}
          className="rounded border border-transparent px-2 py-1 transition hover:border-primary hover:text-primary dark:hover:border-primary"
          title="Sisipkan tautan"
          aria-label="Sisipkan tautan"
        >
          Link
        </button>
        <button
          type="button"
          onClick={handleImageButton}
          onMouseDown={handleToolbarMouseDown}
          className="rounded border border-transparent px-2 py-1 transition hover:border-primary hover:text-primary dark:hover:border-primary"
          title="Sisipkan gambar"
          aria-label="Sisipkan gambar"
        >
          Img
        </button>
        <button
          type="button"
          onClick={handleClearFormatting}
          onMouseDown={handleToolbarMouseDown}
          className="rounded border border-transparent px-2 py-1 transition hover:border-primary hover:text-primary dark:hover:border-primary"
          title="Hapus format"
          aria-label="Hapus format"
        >
          Clear
        </button>
      </div>
      <div
        id={id}
        ref={editorRef}
        className="richtext-editor-body min-h-[200px] bg-white p-4 leading-relaxed outline-hidden dark:bg-gray-900 dark:text-gray-100"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onMouseUp={saveSelection}
        onKeyUp={saveSelection}
        onKeyDown={saveSelection}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {uploadingImage && (
        <p className="border-t border-stroke px-4 py-2 text-xs text-body-color dark:border-gray-700 dark:text-gray-300">
          Mengunggah gambar ke server...
        </p>
      )}
    </div>
  );
};

export default RichTextEditor;
