<?php

namespace WireKit\View\Components\Tab;

use Illuminate\View\Component;
use Illuminate\View\View;

class Panel extends Component
{
    public string $id;
    public string $tabId;

    public function __construct(
        public string $name = '',
    )
    {
        $this->id = 'panel-' . $this->name;
        $this->tabId = 'tab-' . $this->name;
    }

    public function render(): View
    {
        return view('wire-kit::components.tab.panel');
    }
}
