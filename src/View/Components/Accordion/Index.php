<?php

namespace WireKit\View\Components\Accordion;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public $id;

    public string $contentId;

    public string $headingId;

    public function __construct(
        public string $heading = '',
        public bool $expanded = false,
        public bool $disabled = false,
    ) {
        $this->id = 'accordion-item-'.uniqid();
        $this->contentId = 'content-'.uniqid();
        $this->headingId = 'heading-'.uniqid();
    }

    public function render(): View
    {
        return view('wire-kit::components.accordion.index');
    }
}
