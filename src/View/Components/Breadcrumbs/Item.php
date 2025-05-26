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
    ) {
        if ($this->icon) {
            $this->icon = $this->createIcon();
        }
    }

    public function createIcon()
    {
        $icon = match ($this->iconVariant) {
            'outline' => 'o-',
            'solid' => 's-',
            'mini' => 'm-',
            'micro' => 'n-',
            default => ''
        };
        return $icon.$this->icon;
    }

    public function render(): View
    {
        return view('wire-kit::components.breadcrumbs.item');
    }
}
