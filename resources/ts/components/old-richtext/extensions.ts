import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Strike from '@tiptap/extension-strike';
import HardBreak from '@tiptap/extension-hard-break';
import Code from '@tiptap/extension-code';
import type { AnyExtension } from '@tiptap/core';
import { BulletList, OrderedList, ListItem } from '@tiptap/extension-list';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Heading, { type Level } from '@tiptap/extension-heading';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { UndoRedo } from '@tiptap/extensions';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';

const BASE_EXTENSIONS = [Document, Paragraph, Text, HardBreak];

const COMMAND_EXTENSION_MAP: Record<string, { key: string; ext: any; deps?: any[] }> = {
    bold: { key: 'bold', ext: Bold },
    italic: { key: 'italic', ext: Italic },
    strike: { key: 'strike', ext: Strike },
    code: { key: 'code', ext: Code },
    bulletList: { key: 'bulletList', ext: BulletList, deps: [ListItem] },
    orderedList: { key: 'orderedList', ext: OrderedList, deps: [ListItem] },
    blockquote: { key: 'blockquote', ext: Blockquote },
    codeBlock: { key: 'codeBlock', ext: CodeBlock },
    horizontalRule: { key: 'horizontalRule', ext: HorizontalRule },
    underline: { key: 'underline', ext: Underline },
    subscript: { key: 'subscript', ext: Subscript },
    superscript: { key: 'superscript', ext: Superscript },
    undo: { key: 'history', ext: UndoRedo },
    redo: { key: 'history', ext: UndoRedo },
    highlight: { key: 'highlight', ext: Highlight },
    link: { key: 'link', ext: Link.configure({ openOnClick: false }) },
};

export function resolveExtensions(enabledCommands: string[], headingLevels: Level[] = [], alignments: string[] = []) {
    const seen = new Set<string>();
    const extensions: AnyExtension[] = [...BASE_EXTENSIONS];

    for (const cmd of enabledCommands) {
        const entry = COMMAND_EXTENSION_MAP[cmd];
        if (!entry || seen.has(entry.key)) continue;

        seen.add(entry.key);
        extensions.push(entry.ext);

        for (const dep of entry.deps ?? []) {
            if (!seen.has(dep.name)) {
                seen.add(dep.name);
                extensions.push(dep);
            }
        }
    }

    if (headingLevels.length) {
        extensions.push(Heading.configure({ levels: headingLevels }));
    }

    if (alignments.length) {
        extensions.push(TextAlign.configure({ types: ['heading', 'paragraph'], alignments: alignments }));
    }

    return extensions;
}
