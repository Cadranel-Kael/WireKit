import { beforeEach, describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'

function makeTooltipEl(options: { placement?: string; offset?: string; withTrigger?: boolean; withContent?: boolean } = {}): {
    el: HTMLElement
    trigger: HTMLElement | null
    content: HTMLElement | null
} {
    const el = document.createElement('div')
    el.dataset.wireTooltip = ''
    if (options.placement) el.dataset.wirePlacement = options.placement
    if (options.offset) el.dataset.wireOffset = options.offset

    let trigger: HTMLElement | null = null
    if (options.withTrigger ?? true) {
        trigger = document.createElement('span')
        trigger.dataset.wireTooltipTrigger = ''
        el.appendChild(trigger)
    }

    let content: HTMLElement | null = null
    if (options.withContent ?? true) {
        content = document.createElement('div')
        content.dataset.wireTooltipContent = ''
        el.appendChild(content)
    }

    document.body.appendChild(el)
    return { el, trigger, content }
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('Tooltip', () => {
    describe('missing parts', () => {
        it('does not throw when there is no trigger', () => {
            expect(() => new Tooltip(makeTooltipEl({ withTrigger: false }).el)).not.toThrow()
        })

        it('does not throw when there is no content', () => {
            expect(() => new Tooltip(makeTooltipEl({ withContent: false }).el)).not.toThrow()
        })

        it('does not attach show/hide behaviour when the trigger is missing', () => {
            const { el, content } = makeTooltipEl({ withTrigger: false })
            new Tooltip(el)

            el.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))

            expect(content!.style.display).toBe('')
        })
    })

    describe('show / hide', () => {
        it('shows the tooltip content on mouseenter', () => {
            const { el, trigger, content } = makeTooltipEl()
            new Tooltip(el)

            trigger!.dispatchEvent(new MouseEvent('mouseenter'))

            expect(content!.style.display).toBe('block')
        })

        it('hides the tooltip content on mouseleave', () => {
            const { el, trigger, content } = makeTooltipEl()
            new Tooltip(el)
            trigger!.dispatchEvent(new MouseEvent('mouseenter'))

            trigger!.dispatchEvent(new MouseEvent('mouseleave'))

            expect(content!.style.display).toBe('')
        })

        it('shows the tooltip content on focus', () => {
            const { el, trigger, content } = makeTooltipEl()
            new Tooltip(el)

            trigger!.dispatchEvent(new FocusEvent('focus'))

            expect(content!.style.display).toBe('block')
        })

        it('hides the tooltip content on blur', () => {
            const { el, trigger, content } = makeTooltipEl()
            new Tooltip(el)
            trigger!.dispatchEvent(new FocusEvent('focus'))

            trigger!.dispatchEvent(new FocusEvent('blur'))

            expect(content!.style.display).toBe('')
        })
    })

    describe('positioning', () => {
        it('sets left/top styles on the content after construction', async () => {
            const { el, content } = makeTooltipEl({ placement: 'top', offset: '8' })
            new Tooltip(el)
            await new Promise((resolve) => setTimeout(resolve, 0))

            expect(content!.style.left).toMatch(/px$/)
            expect(content!.style.top).toMatch(/px$/)
        })

        it('does not throw with a custom placement and offset', () => {
            expect(() => new Tooltip(makeTooltipEl({ placement: 'right', offset: '12' }).el)).not.toThrow()
        })
    })
})
