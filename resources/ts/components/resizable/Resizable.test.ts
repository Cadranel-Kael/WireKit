import { beforeEach, describe, expect, it } from 'vitest'
import { Resizable } from './Resizable'

function mockRect(el: HTMLElement, width: number, height: number) {
    el.getBoundingClientRect = () =>
        ({ width, height, top: 0, left: 0, right: width, bottom: height, x: 0, y: 0, toJSON() {} }) as DOMRect
}

function makeResizableEl(options: { orientation?: 'horizontal' | 'vertical' } = {}): {
    root: HTMLElement
    prev: HTMLElement
    separator: HTMLElement
    next: HTMLElement
} {
    const root = document.createElement('div')
    root.dataset.wireResizable = ''
    root.dataset.orientation = options.orientation ?? 'horizontal'

    const prev = document.createElement('div')
    const separator = document.createElement('div')
    separator.dataset.wireResizableSeparator = ''
    const next = document.createElement('div')

    root.appendChild(prev)
    root.appendChild(separator)
    root.appendChild(next)

    mockRect(prev, 200, 200)
    mockRect(next, 200, 200)

    document.body.appendChild(root)
    return { root, prev, separator, next }
}

function pointerDown(el: HTMLElement, clientX = 0, clientY = 0) {
    el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, clientX, clientY, pointerId: 1 }))
}

function pointerMove(clientX = 0, clientY = 0) {
    document.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX, clientY, pointerId: 1 }))
}

function pointerUp() {
    document.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: 1 }))
}

beforeEach(() => {
    document.body.innerHTML = ''
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
})

describe('Resizable', () => {
    describe('horizontal dragging (default orientation)', () => {
        it('grows the previous panel and shrinks the next panel by the same delta', () => {
            const { root, prev, separator, next } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 0)
            pointerMove(150, 0)

            expect(prev.style.flex).toBe('0 0 250px')
            expect(next.style.flex).toBe('0 0 150px')
        })

        it('shrinks the previous panel and grows the next panel when dragging the other way', () => {
            const { root, prev, separator, next } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 0)
            pointerMove(70, 0)

            expect(prev.style.flex).toBe('0 0 170px')
            expect(next.style.flex).toBe('0 0 230px')
        })

        it('uses clientX for movement, ignoring clientY', () => {
            const { root, prev, separator, next } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 100)
            pointerMove(100, 300)

            expect(prev.style.flex).toBe('0 0 200px')
            expect(next.style.flex).toBe('0 0 200px')
        })

        it('sets the cursor to ew-resize and disables text selection while dragging', () => {
            const { root, separator } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 0)

            expect(document.body.style.cursor).toBe('ew-resize')
            expect(document.body.style.userSelect).toBe('none')
        })

        it('restores the previous cursor and user-select on pointerup', () => {
            document.body.style.cursor = 'default'
            const { root, separator } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 0)
            pointerUp()

            expect(document.body.style.cursor).toBe('default')
            expect(document.body.style.userSelect).toBe('')
        })

        it('stops resizing after pointerup', () => {
            const { root, prev, separator } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 0)
            pointerMove(150, 0)
            pointerUp()
            pointerMove(300, 0)

            expect(prev.style.flex).toBe('0 0 250px')
        })
    })

    describe('vertical orientation', () => {
        it('uses clientY for movement based on data-orientation="vertical"', () => {
            const { root, prev, separator, next } = makeResizableEl({ orientation: 'vertical' })
            new Resizable(root)

            pointerDown(separator, 0, 100)
            pointerMove(0, 150)

            expect(prev.style.flex).toBe('0 0 250px')
            expect(next.style.flex).toBe('0 0 150px')
        })

        it('sets the cursor to ns-resize while dragging', () => {
            const { root, separator } = makeResizableEl({ orientation: 'vertical' })
            new Resizable(root)

            pointerDown(separator, 0, 100)

            expect(document.body.style.cursor).toBe('ns-resize')
        })
    })

    describe('minimum panel size', () => {
        it('clamps the previous panel to the minimum size and gives the remainder to the next panel', () => {
            const { root, prev, separator, next } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 0)
            pointerMove(-500, 0)

            expect(prev.style.flex).toBe('0 0 80px')
            expect(next.style.flex).toBe('0 0 320px')
        })

        it('clamps the next panel to the minimum size and gives the remainder to the previous panel', () => {
            const { root, prev, separator, next } = makeResizableEl()
            new Resizable(root)

            pointerDown(separator, 100, 0)
            pointerMove(500, 0)

            expect(prev.style.flex).toBe('0 0 320px')
            expect(next.style.flex).toBe('0 0 80px')
        })
    })

    describe('ignored interactions', () => {
        it('does nothing when pointerdown does not originate from a separator', () => {
            const { root, prev, next } = makeResizableEl()
            new Resizable(root)

            pointerDown(root, 100, 0)
            pointerMove(150, 0)

            expect(prev.style.flex).toBe('')
            expect(next.style.flex).toBe('')
        })

        it('does nothing when the separator has no previous sibling', () => {
            const root = document.createElement('div')
            root.dataset.wireResizable = ''
            const separator = document.createElement('div')
            separator.dataset.wireResizableSeparator = ''
            const next = document.createElement('div')
            mockRect(next, 200, 200)
            root.appendChild(separator)
            root.appendChild(next)
            document.body.appendChild(root)
            new Resizable(root)

            expect(() => {
                pointerDown(separator, 100, 0)
                pointerMove(150, 0)
            }).not.toThrow()
            expect(next.style.flex).toBe('')
        })

        it('does not react to a separator belonging to a nested resizable group', () => {
            const { root: outerRoot, prev: outerPrev, next: outerNext } = makeResizableEl()

            const innerRoot = document.createElement('div')
            innerRoot.dataset.wireResizable = ''
            const innerPrev = document.createElement('div')
            const innerSeparator = document.createElement('div')
            innerSeparator.dataset.wireResizableSeparator = ''
            const innerNext = document.createElement('div')
            mockRect(innerPrev, 200, 200)
            mockRect(innerNext, 200, 200)
            innerRoot.appendChild(innerPrev)
            innerRoot.appendChild(innerSeparator)
            innerRoot.appendChild(innerNext)
            outerRoot.appendChild(innerRoot)

            new Resizable(outerRoot)
            new Resizable(innerRoot)

            pointerDown(innerSeparator, 100, 0)
            pointerMove(150, 0)

            // Only the inner pair should have resized; the outer root's own
            // (unrelated) panels must be untouched.
            expect(innerPrev.style.flex).toBe('0 0 250px')
            expect(innerNext.style.flex).toBe('0 0 150px')
            expect(outerPrev.style.flex).toBe('')
            expect(outerNext.style.flex).toBe('')
        })
    })
})
