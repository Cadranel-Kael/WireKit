<?php

namespace WireKit\View\Components\Currency;

use Illuminate\View\Component;
use Illuminate\View\View;
use NumberFormatter;

class Index extends Component
{
    public string $formatedValue;

    public function __construct(
        public string $currency = 'USD',
        public string $locale = 'en_US',
        public string $value = '0.00',
    ) {
        $formatter = new NumberFormatter($this->locale, NumberFormatter::CURRENCY);
        $this->formatedValue = $formatter->formatCurrency($this->value, $this->currency);
    }

    public function render(): View
    {
        return view('wire-kit::components.currency.index');
    }
}
