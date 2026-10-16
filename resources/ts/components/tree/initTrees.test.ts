import { beforeEach, describe, expect, it } from 'vitest'
import { Tree } from './Tree'
import { getTree, initTrees } from './initTrees'

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

    it('constructs an instance when root itself is a [data-wire-tree] node', () => {
        const el = makeTreeEl()

        const result = initTrees(el)

        expect(result).toHaveLength(1)
        expect(result[0]).toBeInstanceOf(Tree)
    })

    it('does not double-construct when root itself matches and is also matched by querySelectorAll', () => {
        const el = makeTreeEl()

        const result = initTrees(el)

        expect(result).toHaveLength(1)
    })
})

describe('getTree()', () => {
    it('returns the Tree instance for an initialised tree element', () => {
        const el = makeTreeEl()
        const [tree] = initTrees()

        expect(getTree(el)).toBe(tree)
    })

    it('returns undefined for an element that has no initialised tree', () => {
        const el = makeTreeEl()

        expect(getTree(el)).toBeUndefined()
    })

    it('returns undefined for an element that is not a tree', () => {
        const el = document.createElement('div')
        document.body.appendChild(el)

        expect(getTree(el)).toBeUndefined()
    })
})
