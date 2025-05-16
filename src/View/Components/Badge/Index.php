<?php

namespace WireKit\View\Components\Badge;

use Illuminate\View\Component;
use Illuminate\View\View;

class Index extends Component
{
    public function __construct(
        public string $color = '',
        public string $size = '',
        public string $variant = '',
        public string $icon = '',
        public string $iconRight = '',
        public string $as = '',
    ) {}

    public function colorClass(): string
    {
        return match ($this->color) {
            'red' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-red-500 hover:bg-red-400',
                    default => 'text-red-800 bg-red-200 hover:bg-red-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-red-500',
                    default => 'text-red-800 bg-red-200',
                },
            },
            'orange' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-orange-500 hover:bg-orange-400',
                    default => 'text-orange-800 bg-orange-200 hover:bg-orange-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-orange-500',
                    default => 'text-orange-800 bg-orange-200',
                },
            },
            'amber' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-amber-500 hover:bg-amber-400',
                    default => 'text-amber-800 bg-amber-200 hover:bg-amber-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-amber-500',
                    default => 'text-amber-800 bg-amber-200',
                },
            },
            'yellow' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-yellow-500 hover:bg-yellow-400',
                    default => 'text-yellow-800 bg-yellow-200 hover:bg-yellow-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-yellow-500',
                    default => 'text-yellow-800 bg-yellow-200',
                },
            },
            'lime' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-lime-500 hover:bg-lime-400',
                    default => 'text-lime-800 bg-lime-200 hover:bg-lime-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-lime-500',
                    default => 'text-lime-800 bg-lime-200',
                },
            },
            'green' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-green-500 hover:bg-green-400',
                    default => 'text-green-800 bg-green-200 hover:bg-green-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-green-500',
                    default => 'text-green-800 bg-green-200',
                },
            },
            'emerald' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-emerald-500 hover:bg-emerald-400',
                    default => 'text-emerald-800 bg-emerald-200 hover:bg-emerald-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-emerald-500',
                    default => 'text-emerald-800 bg-emerald-200',
                },
            },
            'teal' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-teal-500 hover:bg-teal-400',
                    default => 'text-teal-800 bg-teal-200 hover:bg-teal-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-teal-500',
                    default => 'text-teal-800 bg-teal-200',
                },
            },
            'cyan' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-cyan-500 hover:bg-cyan-400',
                    default => 'text-cyan-800 bg-cyan-200 hover:bg-cyan-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-cyan-500',
                    default => 'text-cyan-800 bg-cyan-200',
                },
            },
            'sky' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-sky-500 hover:bg-sky-400',
                    default => 'text-sky-800 bg-sky-200 hover:bg-sky-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-sky-500',
                    default => 'text-sky-800 bg-sky-200',
                },
            },
            'blue' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-blue-500 hover:bg-blue-400',
                    default => 'text-blue-800 bg-blue-200 hover:bg-blue-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-blue-500',
                    default => 'text-blue-800 bg-blue-200',
                },
            },
            'indigo' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-indigo-500 hover:bg-indigo-400',
                    default => 'text-indigo-800 bg-indigo-200 hover:bg-indigo-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-indigo-500',
                    default => 'text-indigo-800 bg-indigo-200',
                },
            },
            'violet' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-violet-500 hover:bg-violet-400',
                    default => 'text-violet-800 bg-violet-200 hover:bg-violet-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-violet-500',
                    default => 'text-violet-800 bg-violet-200',
                },
            },
            'purple' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-purple-500 hover:bg-purple-400',
                    default => 'text-purple-800 bg-purple-200 hover:bg-purple-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-purple-500',
                    default => 'text-purple-800 bg-purple-200',
                },
            },
            'fuchsia' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-fuchsia-500 hover:bg-fuchsia-400',
                    default => 'text-fuchsia-800 bg-fuchsia-200 hover:bg-fuchsia-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-fuchsia-500',
                    default => 'text-fuchsia-800 bg-fuchsia-200',
                },
            },
            'pink' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-pink-500 hover:bg-pink-400',
                    default => 'text-pink-800 bg-pink-200 hover:bg-pink-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-pink-500',
                    default => 'text-pink-800 bg-pink-200',
                },
            },
            'rose' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-rose-500 hover:bg-rose-400',
                    default => 'text-rose-800 bg-rose-200 hover:bg-rose-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-rose-500',
                    default => 'text-rose-800 bg-rose-200',
                },
            },
            'slate' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-slate-500 hover:bg-slate-400',
                    default => 'text-slate-800 bg-slate-200 hover:bg-slate-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-slate-500',
                    default => 'text-slate-800 bg-slate-200',
                },
            },
            'gray' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-gray-500 hover:bg-gray-400',
                    default => 'text-gray-800 bg-gray-200 hover:bg-gray-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-gray-500',
                    default => 'text-gray-800 bg-gray-200',
                },
            },
            'zinc' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-zinc-500 hover:bg-zinc-400',
                    default => 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-zinc-500',
                    default => 'text-zinc-800 bg-zinc-200',
                },
            },
            'neutral' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-neutral-500 hover:bg-neutral-400',
                    default => 'text-neutral-800 bg-neutral-200 hover:bg-neutral-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-neutral-500',
                    default => 'text-neutral-800 bg-neutral-200',
                },
            },
            'stone' => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-stone-500 hover:bg-stone-400',
                    default => 'text-stone-800 bg-stone-200 hover:bg-stone-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-stone-500',
                    default => 'text-stone-800 bg-stone-200',
                },
            },
            default => match ($this->as) {
                'button' => match ($this->variant) {
                    'solid' => 'text-white bg-stone-500 hover:bg-stone-400',
                    default => 'text-stone-800 bg-stone-200 hover:bg-stone-300',
                },
                default => match ($this->variant) {
                    'solid' => 'text-white bg-stone-500',
                    default => 'text-stone-800 bg-stone-200',
                },
            },
        };
    }

    public function variantClass(): string
    {
        return match ($this->variant) {
            'pill' => 'rounded-full',
            default => 'rounded'
        };
    }

    public function sizeClass(): string
    {
        return match ($this->size) {
            'sm' => match ($this->variant) {
                'pill' => 'text-xs py-1 px-4',
                default => 'text-xs py-1 px-2',
            },
            'large' => match ($this->variant) {
                'pill' => 'text-sm py-1.5 px-4',
                default => 'text-sm py-1.5 px-2',
            },
            default => match ($this->variant) {
                'pill' => 'text-sm py-1 px-4',
                default => 'text-sm py-1 px-2',
            },
        };
    }

    public function render(): View
    {
        return view('livewire-ui-kit::components.badge.index');
    }
}
