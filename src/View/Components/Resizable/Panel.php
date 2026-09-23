<?php

namespace WireKit\View\Components\Resizable;

use Illuminate\View\Component;
use Illuminate\View\View;

class Panel extends Component
{
    public function __construct(
        public string|int $defaultSize = '50',
    )
    {
    }

    /**
     * - int (e.g. 200)         -> "200px", fixed (no grow/shrink)
     * - "50" (no unit)         -> percentage, used as flex-grow ratio
     * - "50px"/"2rem"/"40vh"   -> fixed, no grow/shrink
     * - "50%"                  -> same as unitless, flex-grow ratio
     */
    public function flexStyle(): string
    {
        if (is_int($this->defaultSize)) {
            return "0 0 {$this->defaultSize}px";
        }

        $value = trim((string)$this->defaultSize);

        if (preg_match('/^(-?\d*\.?\d+)(px|%|em|rem|vh|vw)$/', $value, $m)) {
            [, $number, $unit] = $m;

            return $unit === '%'
                ? "$number 1 0%"
                : "0 0 $number$unit";
        }

        if (is_numeric($value)) {
            return "$value 1 0%";
        }

        return "1 1 $value";
    }

    public function render(): View
    {
        return view('wire-kit::components.resizable.panel');
    }
}
