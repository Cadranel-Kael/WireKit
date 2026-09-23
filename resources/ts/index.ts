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
    removeLoading()
})
