<?php

namespace WireKit\View\Components;

use Illuminate\Support\Collection;
use Illuminate\View\Component;
use Illuminate\View\View;
use Str;

class Table extends Component
{
    public function __construct(
        public array $headers = [],
        public Collection|array $rows = [],
        public $sortBy = [],
        public bool $selectable = false,
        public string $link = '',
    ) {}

    public function getClass(mixed $header): string
    {
        if (array_key_exists('class', $header)) {
            return $header['class'];
        }

        return '';
    }

    public function isSortedBy(mixed $header): bool
    {
        return $this->sortBy['column'] === ($header['sortBy'] ?? $header['key']);
    }

    public function getSort($header)
    {
        $direction = $this->isSortedBy($header)
            ? ($this->sortBy['direction'] == 'asc') ? 'desc' : 'asc'
            : 'asc';

        return ['column' => $header['sortBy'] ?? $header['key'], 'direction' => $direction];
    }

    public function format(mixed $header, mixed $value): mixed
    {
        if (isset($header['format']) && $header['format'][0] === 'number') {
            // Parse formatting options
            $decimals = 0;
            $decimalSeparator = '.';
            $thousandsSeparator = ',';

            // Optional format string like '0.,'
            $format = $header['format'][1] ?? '0.,';

            if (preg_match('/(\d)([.,]?)([.,]?)/', $format, $matches)) {
                $decimals = (int) $matches[1];
                $decimalSeparator = $matches[2] !== '' ? $matches[2] : '.';
                $thousandsSeparator = $matches[3] !== '' ? $matches[3] : ',';
            }

            $value = is_numeric($value) ? number_format($value, $decimals, $decimalSeparator, $thousandsSeparator) : $value;
        }

        return $value;
    }

    public function getTableIds(): array
    {
        return collect($this->rows)
            ->pluck('id')
            ->map(fn ($id) => (string) $id)
            ->toArray();
    }

    public function getRowLink(mixed $row): string
    {
        if ($this->link && empty($header['disableLink'])) {
            $link = $this->link;

            $link = Str::of($link)->replace('%5B', '{')->replace('%5D', '}');

            $tokens = Str::of($link)->matchAll('/\{(.*?)\}/');

            $tokens->each(function (string $token) use ($row, &$link) {
                $link = Str::of($link)->replace('{'.$token.'}', data_get($row, $token))->toString();
            });

            return $link;
        } else {
            return '#';
        }
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.table');
    }
}
