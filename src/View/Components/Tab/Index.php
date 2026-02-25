<?php

namespace WireKit\View\Components\Tab;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $id;
    public string $panelId;

    public function __construct(
        public string $name,
        public string $icon = '',
    )
    {
        $this->id = 'tab-' . $this->name;
        $this->panelId = 'panel-' . $this->name;
    }

    public function render(): View
    {
        return view('wire-kit::components.tab.index');
    }
}
