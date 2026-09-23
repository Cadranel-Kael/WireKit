import { Editor } from '@tiptap/core';
import { type Level } from '@tiptap/extension-heading';

export type Params = Record<string, unknown>;
export type Command = (editor: Editor, params?: Params) => void;
export type IsActiveCheck = (editor: Editor, params?: Params) => boolean;

export const commands: Record<string, Command> = {
    bold: (e) => e.chain().focus().toggleBold().run(),
    italic: (e) => e.chain().focus().toggleItalic().run(),
    strike: (e) => e.chain().focus().toggleStrike().run(),
    code: (e) => e.chain().focus().toggleCode().run(),
    heading: (e, params) => {
        const level = params?.level as Level | undefined;
        if (!level) return;
        e.chain().focus().toggleHeading({ level }).run();
    },
    hardBreak: (e) => e.chain().focus().setHardBreak().run(),
    bulletList: (e) => e.chain().focus().toggleBulletList().run(),
    orderedList: (e) => e.chain().focus().toggleOrderedList().run(),
    blockquote: (e) => e.chain().focus().toggleBlockquote().run(),
    codeBlock: (e) => e.chain().focus().toggleCodeBlock().run(),
    underline: (e) => e.chain().focus().toggleUnderline().run(),
    horizontalRule: (e) => e.chain().focus().setHorizontalRule().run(),
    subscript: (e) => e.chain().focus().toggleSubscript().run(),
    superscript: (e) => e.chain().focus().toggleSuperscript().run(),
    undo: (e) => e.chain().focus().undo().run(),
    redo: (e) => e.chain().focus().redo().run(),
    highlight: (e) => e.chain().focus().toggleHighlight().run(),
    align: (e, params) => {
        const alignment = params?.alignment as string | undefined;
        if (!alignment) return;
        e.chain().focus().setTextAlign(alignment).run();
    },
};

export const isActiveChecks: Record<string, IsActiveCheck> = {
    bold: (e) => e.isActive('bold'),
    italic: (e) => e.isActive('italic'),
    strike: (e) => e.isActive('strike'),
    code: (e) => e.isActive('code'),
    heading: (e, params) => {
        const level = params?.level as Level | undefined;
        return e.isActive('heading', level ? { level } : {});
    },
    align: (e, params) => {
        const alignment = params?.alignment as string | undefined;
        return alignment ? e.isActive({ textAlign: alignment }) : false;
    },
    bulletList: (e) => e.isActive('bulletList'),
    orderedList: (e) => e.isActive('orderedList'),
    blockquote: (e) => e.isActive('blockquote'),
    subscript: (e) => e.isActive('subscript'),
    superscript: (e) => e.isActive('superscript'),
    underline: (e) => e.isActive('underline'),
    codeBlock: (e) => e.isActive('codeBlock'),
    highlight: (e) => e.isActive('highlight'),
};
