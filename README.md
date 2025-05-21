# WireKit

## Table of contents

- [Accordion](#accordion)
- [Badge](#badge)

## Accordion

The Accordion component is a user interface pattern that allows content to be collapsed and expanded. It is typically
used to organize large amounts of content in a compact and user-friendly way, allowing users to reveal or hide sections
as needed.

### Tags

#### Accordion

`<x-accordion />`

Groups a list of accordions.

| Prop         | Type   | Default | Description                                                         |
|--------------|--------|---------|---------------------------------------------------------------------|
| `exclusive`  | `bool` | `false` | When `true`, only one accordion item can be open at a time.         |
| `transition` | `bool` | `false` | When `true`, enables open/close animations for the accordion items. |

#### Item

`<x-accordion.item />`

Holds the heading and the content of the accordion

| Prop       | Type     | Default | Description                                                                                                                               |
|------------|----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `heading`  | `string` | `''`    | Shorthand of `<x-accordion.heading>`                                                                                                      |
| `expanded` | `bool`   | `false` | Whether the accordion item is **expanded (open) by default** when the component is rendered.                                              |
| `disabled` | `bool`   | `false` | If `true`, the item **cannot be toggled** open or closed by user interaction. Useful for indicating inactive or non-interactive sections. |

It is recommended by [W3.org](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) that the button of the
accordion (`<x-accordion.heading />`) is wrapped in an element with role heading.
So in most cases it's more appropriate to not use the heading prop.

#### Heading

`<x-accordion.heading />`

The heading and button that controls the state of the accordion content.
It is recommended by [W3.org](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) to wrap it in an element with role
heading.

#### Content

`<x-accordion.content />`

The content of the accordion that conditionally is shown or hidden.

### Example

```html

<x-accordion exclusive>
    <x-accordion.item>
        <h3>
            <x-accordion.heading>
                Can I use multiple accordion items at once?
            </x-accordion.heading>
        </h3>
        <x-accordion.content>
            Yes!
            By default, the accordion allows multiple items to be open simultaneously. However, you can enable the
            exclusive mode to ensure only one item remains open at a time, which mimics traditional accordion behavior.
        </x-accordion.content
    </x-accordion.item>
    <x-accordion.item heading="What happens if an accordion item is disabled?">
        If an item is marked as disabled, it cannot be opened or closed through user interaction. This is useful when
        you want to show content that is temporarily unavailable or still loading.
    </x-accordion.item>
    <x-accordion.item disabled>
        <h3>
            <x-accordion.heading>
                Can I use multiple accordion items at once?
            </x-accordion.heading>
        </h3>
        <x-accordion.content>
            Yes!
            By default, the accordion allows multiple items to be open simultaneously. However, you can enable the
            exclusive mode to ensure only one item remains open at a time, which mimics traditional accordion behavior.
        </x-accordion.content
    </x-accordion.item>
</x-accordion>
```

## Alert

An Alert — also referred to as a Callout — is a UI component used to draw attention to important information, status
messages, or contextual feedback. Alerts are typically color-coded to represent different levels of importance or types
of messages.

### Tags

#### Index

`<x-alert />`

The tag that holds the content of alert

| Prop          | Type     | Default | Description                                                                                                                                            |
|---------------|----------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `variant`     | `string` | `''`    | Controls the visual style of the alert. Supported values include: `primary`, `secondary`, `success`, `danger`, `warning`, `info`, `light`, and `dark`. |
| `icon`        | `string` | `''`    | Optional name of an icon (e.g., from a Heroicons or Lucide set) to visually represent the alert’s purpose.                                             |
| `controls`    | `string` | `''`    | A string of Blade markup or HTML for extra controls (e.g., close button, toggle, dropdown).                                                            |
| `actions`     | `string` | `''`    | A string of Blade markup or HTML for action buttons (e.g., "Undo", "Retry").                                                                           |
| `inline`      | `bool`   | `false` | When set to `true`, the alert is rendered as an **inline element**, allowing it to sit within content flow rather than a block.                        |
| `heading`     | `string` | `''`    | A title or header for the alert, shown prominently.                                                                                                    |
| `description` | `string` | `''`    | A longer body of text providing more context or detail for the alert message.                                                                          |

#### Heading

#### Description

## Badge

A badge

### Tags

#### Badge

`<x-badge />`

| Prop           | Description                                                                                 |
|----------------|---------------------------------------------------------------------------------------------|
| `color`        | The color of the badge, uses tailwinds colors (e.g. `red`, `lime`). By default uses `zinc`. |
| `colorVariant` | The style of colors used. Options: `solid`.                                                 |
| `size`         | The size of the badge. Options: `small`, `large`.                                           |
| `variant`      | The variant style of badge used. Options: `pill`.                                           |
| `icon`         | The left icon of the badge.                                                                 |
| `icon-right`   | The right icon of the badge.                                                                |
| `as`           | The tag surrounding the badge. Options: `button`. Default: `div`.                           |

#### Close

`<x-badge />`

The button used to close the element

### Examples

```html
<x-badge>Badge</x-badge>
```

```html
<x-badge as="button" color="red">
    Badge
</x-badge>
```

```html
<x-badge>
    Badge
    <x-badge.close/>
</x-badge>
```
