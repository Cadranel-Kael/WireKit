<?php

if (! function_exists('getColorClass')) {
    function getColorClass(string $color = 'zinc', string $variant = '', string $context = ''): string
    {
        return match ($color) {
            'red' => match ($variant) {
                'solid' => 'text-white bg-red-500'.($context === 'button' ? ' hover:bg-red-400' : ''),
                'border' => 'text-red-800 bg-red-50 border border-red-800'.($context === 'button' ? ' hover:bg-red-300' : ''),
                default => 'text-red-800 bg-red-200'.($context === 'button' ? ' hover:bg-red-300' : ''),
            },
            'orange' => match ($variant) {
                'solid' => 'text-white bg-orange-500'.($context === 'button' ? ' hover:bg-orange-400' : ''),
                'border' => 'text-orange-800 bg-orange-50 border border-orange-800'.($context === 'button' ? ' hover:bg-orange-300' : ''),
                default => 'text-orange-800 bg-orange-200'.($context === 'button' ? ' hover:bg-orange-300' : ''),
            },
            'amber' => match ($variant) {
                'solid' => 'text-white bg-amber-500'.($context === 'button' ? ' hover:bg-amber-400' : ''),
                'border' => 'text-amber-800 bg-amber-200 border border-amber-800'.($context === 'button' ? ' hover:bg-amber-300' : ''),
                default => 'text-amber-800 bg-amber-200'.($context === 'button' ? ' hover:bg-amber-300' : ''),
            },
            'yellow' => match ($variant) {
                'solid' => 'text-white bg-yellow-500'.($context === 'button' ? ' hover:bg-yellow-400' : ''),
                'border' => 'text-yellow-800 bg-yellow-50 border border-yellow-800'.($context === 'button' ? ' hover:bg-yellow-300' : ''),
                default => 'text-yellow-800 bg-yellow-200'.($context === 'button' ? ' hover:bg-yellow-300' : ''),
            },
            'lime' => match ($variant) {
                'solid' => 'text-white bg-lime-500'.($context === 'button' ? ' hover:bg-lime-400' : ''),
                'border' => 'text-lime-800 bg-lime-50 border border-lime-800'.($context === 'button' ? ' hover:bg-lime-300' : ''),
                default => 'text-lime-800 bg-lime-200'.($context === 'button' ? ' hover:bg-lime-300' : ''),
            },
            'green' => match ($variant) {
                'solid' => 'text-white bg-green-500'.($context === 'button' ? ' hover:bg-green-400' : ''),
                'border' => 'text-green-800 bg-green-50 border border-green-800'.($context === 'button' ? ' hover:bg-green-300' : ''),
                default => 'text-green-800 bg-green-200'.($context === 'button' ? ' hover:bg-green-300' : ''),
            },
            'emerald' => match ($variant) {
                'solid' => 'text-white bg-emerald-500'.($context === 'button' ? ' hover:bg-emerald-400' : ''),
                'border' => 'text-emerald-800 bg-emerald-200 border border-emerald-800'.($context === 'button' ? ' hover:bg-emerald-300' : ''),
                default => 'text-emerald-800 bg-emerald-200'.($context === 'button' ? ' hover:bg-emerald-300' : ''),
            },
            'teal' => match ($variant) {
                'solid' => 'text-white bg-teal-500'.($context === 'button' ? ' hover:bg-teal-400' : ''),
                'border' => 'text-teal-800 bg-teal-200 border border-teal-800'.($context === 'button' ? ' hover:bg-teal-300' : ''),
                default => 'text-teal-800 bg-teal-200'.($context === 'button' ? ' hover:bg-teal-300' : ''),
            },
            'cyan' => match ($variant) {
                'solid' => 'text-white bg-cyan-500'.($context === 'button' ? ' hover:bg-cyan-400' : ''),
                'border' => 'text-cyan-800 bg-cyan-200 border border-cyan-800'.($context === 'button' ? ' hover:bg-cyan-300' : ''),
                default => 'text-cyan-800 bg-cyan-200'.($context === 'button' ? ' hover:bg-cyan-300' : ''),
            },
            'sky' => match ($variant) {
                'solid' => 'text-white bg-sky-500'.($context === 'button' ? ' hover:bg-sky-400' : ''),
                'border' => 'text-sky-800 bg-sky-200 border border-sky-800'.($context === 'button' ? ' hover:bg-sky-300' : ''),
                default => 'text-sky-800 bg-sky-200'.($context === 'button' ? ' hover:bg-sky-300' : ''),
            },
            'blue' => match ($variant) {
                'solid' => 'text-white bg-blue-500'.($context === 'button' ? ' hover:bg-blue-400' : ''),
                'border' => 'text-blue-800 bg-blue-200 border border-blue-800'.($context === 'button' ? ' hover:bg-blue-300' : ''),
                default => 'text-blue-800 bg-blue-200'.($context === 'button' ? ' hover:bg-blue-300' : ''),
            },
            'indigo' => match ($variant) {
                'solid' => 'text-white bg-indigo-500'.($context === 'button' ? ' hover:bg-indigo-400' : ''),
                'border' => 'text-indigo-800 bg-indigo-200 border border-indigo-800'.($context === 'button' ? ' hover:bg-indigo-300' : ''),
                default => 'text-indigo-800 bg-indigo-200'.($context === 'button' ? ' hover:bg-indigo-300' : ''),
            },
            'violet' => match ($variant) {
                'solid' => 'text-white bg-violet-500'.($context === 'button' ? ' hover:bg-violet-400' : ''),
                'border' => 'text-violet-800 bg-violet-200 border border-violet-800'.($context === 'button' ? ' hover:bg-violet-300' : ''),
                default => 'text-violet-800 bg-violet-200'.($context === 'button' ? ' hover:bg-violet-300' : ''),
            },
            'purple' => match ($variant) {
                'solid' => 'text-white bg-purple-500'.($context === 'button' ? ' hover:bg-purple-400' : ''),
                'border' => 'text-purple-800 bg-purple-200 border border-purple-800'.($context === 'button' ? ' hover:bg-purple-300' : ''),
                default => 'text-purple-800 bg-purple-200'.($context === 'button' ? ' hover:bg-purple-300' : ''),
            },
            'fuchsia' => match ($variant) {
                'solid' => 'text-white bg-fuchsia-500'.($context === 'button' ? ' hover:bg-fuchsia-400' : ''),
                'border' => 'text-fuchsia-800 bg-fuchsia-200 border border-fuchsia-800'.($context === 'button' ? ' hover:bg-fuchsia-300' : ''),
                default => 'text-fuchsia-800 bg-fuchsia-200'.($context === 'button' ? ' hover:bg-fuchsia-300' : ''),
            },
            'pink' => match ($variant) {
                'solid' => 'text-white bg-pink-500'.($context === 'button' ? ' hover:bg-pink-400' : ''),
                'border' => 'text-pink-800 bg-pink-200 border border-pink-800'.($context === 'button' ? ' hover:bg-pink-300' : ''),
                default => 'text-pink-800 bg-pink-200'.($context === 'button' ? ' hover:bg-pink-300' : ''),
            },
            'rose' => match ($variant) {
                'solid' => 'text-white bg-rose-500'.($context === 'button' ? ' hover:bg-rose-400' : ''),
                'border' => 'text-rose-800 bg-rose-200 border border-rose-800'.($context === 'button' ? ' hover:bg-rose-300' : ''),
                default => 'text-rose-800 bg-rose-200'.($context === 'button' ? ' hover:bg-rose-300' : ''),
            },
            'gray' => match ($variant) {
                'solid' => 'text-white bg-gray-500'.($context === 'button' ? ' hover:bg-gray-400' : ''),
                'border' => 'text-gray-800 bg-gray-200 border border-gray-800'.($context === 'button' ? ' hover:bg-gray-300' : ''),
                default => 'text-gray-800 bg-gray-200'.($context === 'button' ? ' hover:bg-gray-300' : ''),
            },
            'slate' => match ($variant) {
                'solid' => 'text-white bg-slate-500'.($context === 'button' ? ' hover:bg-slate-400' : ''),
                'border' => 'text-slate-800 bg-slate-200 border border-slate-800'.($context === 'button' ? ' hover:bg-slate-300' : ''),
                default => 'text-slate-800 bg-slate-200'.($context === 'button' ? ' hover:bg-slate-300' : ''),
            },
            'zinc' => match ($variant) {
                'solid' => 'text-white bg-zinc-500'.($context === 'button' ? ' hover:bg-zinc-400' : ''),
                'border' => 'text-zinc-800 bg-zinc-200 border border-zinc-800'.($context === 'button' ? ' hover:bg-zinc-300' : ''),
                default => 'text-zinc-800 bg-zinc-200'.($context === 'button' ? ' hover:bg-zinc-300' : ''),
            },
            'neutral' => match ($variant) {
                'solid' => 'text-white bg-neutral-500'.($context === 'button' ? ' hover:bg-neutral-400' : ''),
                'border' => 'text-neutral-800 bg-neutral-200 border border-neutral-800'.($context === 'button' ? ' hover:bg-neutral-300' : ''),
                default => 'text-neutral-800 bg-neutral-200'.($context === 'button' ? ' hover:bg-neutral-300' : ''),
            },
            'stone' => match ($variant) {
                'solid' => 'text-white bg-stone-500'.($context === 'button' ? ' hover:bg-stone-400' : ''),
                'border' => 'text-stone-800 bg-stone-200 border border-stone-800'.($context === 'button' ? ' hover:bg-stone-300' : ''),
                default => 'text-stone-800 bg-stone-200'.($context === 'button' ? ' hover:bg-stone-300' : ''),
            },
            default => match ($variant) {
                'solid' => "text-white bg-{$color}-500".($context === 'button' ? " hover:bg-{$color}-400" : ''),
                'border' => "text-{$color}-800 bg-{$color}-200 border border-{$color}-800".($context === 'button' ? " hover:bg-{$color}-300" : ''),
                default => "text-{$color}-800 bg-{$color}-200".($context === 'button' ? " hover:bg-{$color}-300" : ''),
            },
        };
    }
}
