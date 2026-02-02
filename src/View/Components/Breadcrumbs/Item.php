<?php

namespace WireKit\View\Components\Breadcrumbs;

use Illuminate\View\Component;
use Illuminate\View\View;

class Item extends Component
{
    public function __construct(
        public string $href = '',
        public string $separator = 'chevron-right',
        public string $icon = '',
        public string $iconVariant = 'outline',
    )
    {
    }

    public function render(): View
    {
        return view('wire-kit::components.breadcrumbs.item');
    }
}
