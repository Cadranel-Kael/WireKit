<?php

namespace WireKit\View\Components\Editor;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $id;

    public function __construct(
        public string $toolbar = '',
        public string $label = '',
    )
    {
        $this->id = uniqid('editor-');
    }

    public function toolbarItems()
    {
        $items = str_replace('|', 'separator', $this->toolbar);
        $items = str_replace('-', 'spacer', $items);
        return explode(' ', $items);
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.index');
    }
}
