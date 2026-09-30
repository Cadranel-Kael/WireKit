import { beforeEach, describe, expect, it } from 'vitest'
import { Tree } from './Tree'
import { initTrees } from './initTrees'

function makeTreeEl(container: HTMLElement = document.body, id = 'tree'): HTMLElement {
    const el = document.createElement('ul')
    el.id = id
    el.dataset.wireTree = ''
    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initTrees()', () => {
    it('returns an empty array when no trees are on the page', () => {
        expect(initTrees()).toEqual([])
    })

    it('returns one Tree per [data-wire-tree] element', () => {
        makeTreeEl(document.body, 'a')
        makeTreeEl(document.body, 'b')

        const result = initTrees()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Tree)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeTreeEl(root, 'inside')
        makeTreeEl(document.body, 'outside')

        expect(initTrees(root)).toHaveLength(1)
    })

    it('does not construct a second instance for an element already initialised', () => {
        makeTreeEl()

        initTrees()
        const second = initTrees()

        expect(second).toHaveLength(0)
    })
})
