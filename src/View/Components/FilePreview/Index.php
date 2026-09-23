<?php

namespace WireKit\View\Components\FilePreview;

use Illuminate\View\Component;
use Illuminate\View\View;

/*
 * Previews a file: an image when a source is given, otherwise a muted
 * square with an icon and an uppercase extension label.
 */

class Index extends Component
{
    public function __construct(
        public string $src = '',
        public string $alt = '',
        public string $extension = '',
        public string $icon = 'file-text',
        public string $rounded = 'md',
    ) {}

    public function roundedClass(): string
    {
        return match ($this->rounded) {
            'lg' => 'rounded-lg',
            default => 'rounded-md',
        };
    }

    public function render(): View
    {
        return view('wire-kit::components.file-preview.index');
    }
}
