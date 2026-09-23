<?php

namespace WireKit\View\Components\InlineEdit;

use Illuminate\View\Component;
use Illuminate\View\View;

/*
 * Click-to-rename text: shows the value as static content until triggered
 * (by clicking the display, or an external element with
 * data-wire-inline-edit-trigger="{id}"), then swaps in a text input. Enter
 * or blur commits and dispatches an "inline-edit:save" event (detail:
 * { value }); Escape cancels.
 */

class Index extends Component
{
    public string $id;

    public function __construct(
        public string $value = '',
        public bool $triggerOnClick = true,
        ?string $id = null,
    ) {
        $this->id = $id ?? 'inline-edit-'.uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.inline-edit.index');
    }
}
