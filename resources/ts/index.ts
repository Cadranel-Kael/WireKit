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
import { initTrees } from './components/tree/initTrees'
import { initResizables } from './components/resizable/initResizables'
import { initInlineEdit } from './components/inline-edit/initInlineEdit'
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
    removeLoading()
})

// Most components above only need `livewire:navigated` -- their
// interactivity is native (popover, <dialog>) and keeps working
// regardless of which DOM node currently carries their markup, so a
// plain Livewire AJAX morph (wire:click, etc.) that adds a matching
// element mid-session doesn't need any JS to run again. InlineEdit isn't
// declarative like that: it needs its own constructor to run on whatever
// element currently has the data-wire-inline-edit attribute, including
// one that first appears well after initial load (e.g. a conditional
// `@if/@else` block toggling a whole subtree in and out). `morph.added`
// fires for exactly that case.
document.addEventListener('livewire:init', () => {
    Livewire.hook('morph.added', ({ el }: { el: HTMLElement }) => {
        initInlineEdit(el)
    })
})
