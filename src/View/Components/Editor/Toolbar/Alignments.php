<?php

namespace WireKit\View\Components\Editor\Toolbar;

use Illuminate\View\Component;
use Illuminate\View\View;

class Alignments extends Component
{
    public function __construct(
        public array $alignments = ['left', 'center', 'right'],
    )
    {
    }

    public function resolveIcon(string $alignment)
    {
        return match ($alignment) {
            'left' => 'text-align-start',
            'justify' => 'text-align-justify',
            'right' => 'text-align-end',
            'center' => 'text-align-center',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.editor.toolbar.alignments');
    }
}
