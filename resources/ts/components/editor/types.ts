import type { Level } from '@tiptap/extension-heading'
import { AnyExtension, Editor } from '@tiptap/core'

export type EditorConfig = {
    headingLevels?: Level[]
    alignments?: string[]
}

export type ToolEntry = {
    extension?: AnyExtension | ((config: any) => AnyExtension) | null
    dependents?: AnyExtension[]
    command?: Command
    isActive?: IsActiveCheck
}

export type Params = Record<string, unknown>

export type Command = (editor: Editor, params?: Params) => void

export type IsActiveCheck = (editor: Editor, params?: Params) => boolean
