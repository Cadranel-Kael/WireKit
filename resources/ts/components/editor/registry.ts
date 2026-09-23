import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import HardBreak from '@tiptap/extension-hard-break'
import Code from '@tiptap/extension-code'
import { BulletList, OrderedList, ListItem } from '@tiptap/extension-list'
import Blockquote from '@tiptap/extension-blockquote'
import CodeBlock from '@tiptap/extension-code-block'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Heading, { type Level, HeadingOptions } from '@tiptap/extension-heading'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { UndoRedo } from '@tiptap/extensions'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextAlign, { TextAlignOptions } from '@tiptap/extension-text-align'
import { Params, ToolEntry } from './types'

export const CORE_COMMANDS = ['document', 'paragraph', 'text', 'hardBreak', 'undoRedo']

export const registry: Record<string, ToolEntry> = {
    document: {
        extension: Document,
    },
    paragraph: {
        extension: Paragraph,
        command: (e) => e.chain().focus().setParagraph().run(),
    },
    text: {
        extension: Text,
    },
    bold: {
        extension: Bold,
        command: (e) => e.chain().focus().toggleBold().run(),
        isActive: (e) => e.isActive('bold'),
    },
    align: {
        extension: (paramsList: Params[] = []) => {
            const alignments = Array.from(
                new Set(paramsList.map((p) => p.alignment).filter((a): a is string => a !== undefined)),
            )
            return TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: alignments.length ? alignments : ['left', 'center', 'right'],
                defaultAlignment: 'left',
            })
        },
        command: (e, p) =>
            e
                .chain()
                .focus()
                .toggleTextAlign(p!.alignment as string)
                .run(),
        isActive: (e, p) => e.isActive({ textAlign: p!.alignment }),
    },
    heading: {
        extension: (paramsList: Params[] = []) => {
            const levels = Array.from(
                new Set(paramsList.map((p) => p.level).filter((l): l is Level => l !== undefined)),
            )
            return Heading.configure({ levels: levels.length ? levels : [1, 2, 3, 4, 5, 6] })
        },
        command: (e, params) => {
            const level = params?.level as Level | undefined
            if (!level) return
            e.chain().focus().toggleHeading({ level }).run()
        },
        // Scoped to the "heading" node type explicitly (rather than a bare
        // `e.isActive({ level })` attributes check) so a selection spanning
        // a hard break inside a single heading doesn't also match the
        // hardBreak node's absent `level` attribute -- that made both the
        // plain "Heading" trigger icon and the current level's icon show at
        // once for a multiline heading selection.
        isActive: (e, p) => {
            const level = p?.level as Level | undefined
            return level ? e.isActive('heading', { level }) : !e.isActive('heading')
        },
    },
    hardBreak: {
        extension: HardBreak,
        command: (e) => e.chain().focus().setHardBreak().run(),
        isActive: (e) => e.isActive('hardBreak'),
    },
    italic: {
        extension: Italic,
        command: (e) => e.chain().focus().toggleItalic().run(),
        isActive: (e) => e.isActive('italic'),
    },
    strike: {
        extension: Strike,
        command: (e) => e.chain().focus().toggleStrike().run(),
        isActive: (e) => e.isActive('strike'),
    },
    code: {
        extension: Code,
        command: (e) => e.isActive('code'),
        isActive: (e) => e.isActive('code'),
    },
    bulletList: {
        extension: BulletList,
        dependents: [ListItem],
        command: (e) => e.chain().focus().toggleBulletList().run(),
        isActive: (e) => e.isActive('bulletList'),
    },
    orderedList: {
        extension: OrderedList,
        dependents: [ListItem],
        command: (e) => e.chain().focus().toggleOrderedList().run(),
        isActive: (e) => e.isActive('orderedList'),
    },
    blockquote: {
        extension: Blockquote,
        command: (e) => e.chain().focus().toggleBlockquote().run(),
        isActive: (e) => e.isActive('blockquote'),
    },
    codeBlock: {
        extension: CodeBlock,
        command: (e) => e.chain().focus().toggleCodeBlock().run(),
        isActive: (e) => e.isActive('codeBlock'),
    },
    horizontalRule: {
        extension: HorizontalRule,
        command: (e) => e.chain().focus().setHorizontalRule().run(),
        isActive: (e) => e.isActive('horizontalRule'),
    },
    underline: {
        extension: Underline,
        command: (e) => e.chain().focus().toggleUnderline().run(),
        isActive: (e) => e.isActive('underline'),
    },
    subscript: {
        extension: Subscript,
        command: (e) => e.chain().focus().toggleSubscript().run(),
        isActive: (e) => e.isActive('subscript'),
    },
    superscript: {
        extension: Superscript,
        command: (e) => e.chain().focus().toggleSuperscript().run(),
        isActive: (e) => e.isActive('superscript'),
    },
    undo: {
        extension: UndoRedo,
        command: (e) => e.chain().focus().undo().run(),
        isActive: (e) => e.isActive('undo'),
    },
    redo: {
        extension: UndoRedo,
        command: (e) => e.chain().focus().redo().run(),
        isActive: (e) => e.isActive('redo'),
    },
    undoRedo: {
        extension: UndoRedo,
    },
    highlight: {
        extension: Highlight,
        command: (e) => e.chain().focus().toggleHighlight().run(),
        isActive: (e) => e.isActive('highlight'),
    },
    link: {
        extension: Link,
    },
}
