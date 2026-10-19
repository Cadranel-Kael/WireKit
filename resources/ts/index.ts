import { initAccordions } from './components/accordion/initAccordions'
import { initContext } from './components/context/initContext'
import { initDropdowns } from './components/dropdown/initDropdowns'
import { initToggles } from './components/toggles/initToggles'
import { initTooltips } from './components/tooltip/initTooltips'
import { initModals } from './components/modal/initModals'
import { initTabList } from './components/tab/initTabList'
import { initInputs } from './components/input/initInputs'
import { removeLoading } from './helpers/removeLoading'
import { initEditor } from './components/editor/initEditor'
import initToasts from './components/toast/initToasts'
import WireToast from './components/toast/WireToast'
import { getTree, initTrees } from './components/tree/initTrees'
import { initResizables } from './components/resizable/initResizables'
import { initInlineEdit } from './components/inline-edit/initInlineEdit'
import { initSidebars } from './components/sidebar/initSidebars'
import WireOtp from './components/otp/WireOtp'

declare global {
    const Livewire: any
}

document.addEventListener('livewire:init', () => {
    // Custom element registration is a true one-time-ever operation --
    // registering the same tag name twice throws. Everything else below
    // needs to run again after every wire:navigate transition (Livewire
    // replaces the whole <body>, so none of these components survive a
    // navigation on their own), so it lives in the livewire:navigated
    // handler instead, which also fires on this initial page load.
    customElements.define('wire-toast', WireToast)
    customElements.define('wire-otp', WireOtp)
})

document.addEventListener('livewire:navigated', () => {
    initToggles()
    initAccordions()
    initContext()
    initTooltips()
    initDropdowns()
    initModals()
    initTabList()
    initInputs()
    initEditor()
    initToasts()
    initTrees()
    initResizables()
    initInlineEdit()
    initSidebars()
    removeLoading()
})

// Most components above only need `livewire:navigated` -- their
// interactivity is native (popover, <dialog>) and keeps working
// regardless of which DOM node currently carries their markup, so a
// plain Livewire AJAX morph (wire:click, etc.) that adds a matching
// element mid-session doesn't need any JS to run again. Four components
// are exceptions. Modal's triggers and close buttons are wired through a
// delegated document-level click listener (see Modal.ts), so a
// morph-added trigger works without re-running init -- but the <dialog>
// itself only gets its Modal instance from initModals(), so a morph that
// adds or replaces the dialog (a conditional subtree, or a whole-subtree
// swap caused by a per-render random id, see #5) leaves the fresh node
// dead until initModals runs on it. InlineEdit needs its own constructor
// to run on whatever element currently has the data-wire-inline-edit
// attribute, including one that first appears well after initial load
// (e.g. a conditional `@if/@else` block toggling a whole subtree in and
// out). Dropdown needs initDropdowns(el) for the same reason -- a
// morph-added [data-wire-dropdown] root (conditional subtree) would
// otherwise have no Dropdown instance. Existing instances survive morphs
// on their own: the popover `toggle` listener is delegated on the root,
// so it catches toggles from whatever menu element currently lives inside
// (see Dropdown.ts, #11). Tree needs the same treatment for a different
// reason: a sortable tree is rendered `wire:ignore` so SortableJS's own
// DOM mutations (and keyboard move-mode) never get clobbered by a
// Livewire re-render -- which also means Livewire can't morph new items
// into it. The supported way to change a sortable tree's membership is
// to replace the whole node (give it a `wire:key` that changes), which
// fires `morph.added` for it. `morph.added` fires for exactly these cases.
//
// A non-wire:ignore tree *can* be morphed into, though -- Livewire adds
// and removes `<li data-wire-tree-item>` elements as the underlying data
// changes. The Tree instance keeps its own `_items` list, which goes
// stale on both additions and removals unless something tells it to
// rescan. `morph.added` covers additions; `morph.removing` covers
// removals (it fires while the node is still attached, so
// `el.closest('[data-wire-tree]')` still resolves). Tree.refresh()
// coalesces multiple calls into a single deferred rebuild, so N morph
// events in one tick produce one rescan, not N.
document.addEventListener('livewire:init', () => {
    Livewire.hook('morph.added', ({ el }: { el: HTMLElement }) => {
        initModals(el)
        initInlineEdit(el)
        const created = initTrees(el)
        initDropdowns(el)

        const treeEl = el.closest<HTMLElement>('[data-wire-tree]')
        if (treeEl && !created.some((tree) => tree.el === treeEl)) {
            getTree(treeEl)?.refresh()
        }
    })

    Livewire.hook('morph.removing', ({ el }: { el: HTMLElement }) => {
        const treeEl = el.closest<HTMLElement>('[data-wire-tree]')
        if (treeEl) {
            getTree(treeEl)?.refresh()
        }
    })
})
