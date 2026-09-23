import { beforeEach, describe, expect, it } from 'vitest'
import { Context } from './Context'
import { initContext } from './initContext'
import { MenuManager } from '../menu/MenuManager'

function makeContextEl(container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireContext = ''

    const menuEl = document.createElement('div')
    menuEl.setAttribute('wire-data-context-menu', '')
    menuEl.appendChild(document.createElement('ul'))
    el.appendChild(menuEl)

    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
    ;(MenuManager as unknown as { _instance: MenuManager | null })._instance = null
})

describe('initContext()', () => {
    it('returns an empty array when no context elements are on the page', () => {
        expect(initContext()).toEqual([])
    })

    it('returns one Context per [data-wire-context] element', () => {
        makeContextEl()
        makeContextEl()

        const result = initContext()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Context)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeContextEl(root)
        makeContextEl()

        expect(initContext(root)).toHaveLength(1)
    })

    it('defaults to document as root', () => {
        makeContextEl()

        expect(initContext(document)).toHaveLength(1)
    })
})
