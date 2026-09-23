<?php

namespace WireKit\View\Components\Toast;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public string $direction = 'top';

    public function __construct(
        public string $placement = 'bottom end',
        public int    $max = 3,
        public string $heading = '',
    )
    {
    }

    public function resolvePlacement(): string
    {
        $class = '';
        $placements = explode(' ', $this->placement);

        if (in_array('start', $placements)) {
            $class .= ' mr-auto';
        }
        if (in_array('end', $placements)) {
            $class .= ' ml-auto';
        }
        if (in_array('top', $placements)) {
            $class .= ' mb-auto';
        }
        if (in_array('bottom', $placements)) {
            $class .= ' mt-auto';
        }
        if (in_array('center', $placements)) {
            $class .= ' mx-auto';
        }

        return $class;
    }

    public function resolveDirection(): string
    {
        return in_array('top', explode(' ', $this->placement)) ? 'bottom' : 'top';
    }

    public function render(): View
    {
        return view('wire-kit::components.toast.index');
    }
}
