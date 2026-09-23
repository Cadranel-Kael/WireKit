import { beforeEach, describe, expect, it } from 'vitest'
import { Tooltip } from './Tooltip'
import { initTooltips } from './initTooltips'

function makeTooltipEl(container: HTMLElement = document.body): HTMLElement {
    const el = document.createElement('div')
    el.dataset.wireTooltip = ''

    const trigger = document.createElement('span')
    trigger.dataset.wireTooltipTrigger = ''
    el.appendChild(trigger)

    const content = document.createElement('div')
    content.dataset.wireTooltipContent = ''
    el.appendChild(content)

    container.appendChild(el)
    return el
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('initTooltips()', () => {
    it('returns an empty array when no tooltips are on the page', () => {
        expect(initTooltips()).toEqual([])
    })

    it('returns one Tooltip per [data-wire-tooltip] element', () => {
        makeTooltipEl()
        makeTooltipEl()

        const result = initTooltips()

        expect(result).toHaveLength(2)
        expect(result[0]).toBeInstanceOf(Tooltip)
    })

    it('searches inside a provided root element', () => {
        const root = document.createElement('div')
        document.body.appendChild(root)

        makeTooltipEl(root)
        makeTooltipEl()

        expect(initTooltips(root)).toHaveLength(1)
    })

    it('defaults to document as root', () => {
        makeTooltipEl()

        expect(initTooltips(document)).toHaveLength(1)
    })
})
