<?php

describe('getColorClass', function () {
    it('uses numbered Tailwind shades for a known palette name', function () {
        expect(getColorClass('red'))->toBe('text-red-800 bg-red-200');
        expect(getColorClass('red', 'solid'))->toBe('text-white bg-red-500');
    });

    it('falls back to opacity-modified single-shade classes for an unknown/semantic color', function () {
        expect(getColorClass('success'))->toBe('text-success bg-success/10');
        expect(getColorClass('danger', 'border'))->toBe('text-danger bg-danger/10 border border-danger');
    });

    it('pairs the solid variant with a {color}-foreground text class, not a hardcoded white', function () {
        expect(getColorClass('success', 'solid'))->toBe('text-success-foreground bg-success');
    });

    it('adds a hover class for semantic colors in a button context', function () {
        expect(getColorClass('accent', 'solid', 'button'))->toBe('text-accent-foreground bg-accent hover:bg-accent/90');
    });
});
