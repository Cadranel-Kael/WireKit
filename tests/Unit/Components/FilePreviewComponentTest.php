<?php

use WireKit\View\Components\FilePreview\Index as FilePreview;

describe('FilePreview', function () {
    describe('defaults', function () {
        it('defaults to no image, the file-text icon, and md rounding', function () {
            $preview = new FilePreview();

            expect($preview->src)->toBe('')
                ->and($preview->icon)->toBe('file-text')
                ->and($preview->roundedClass())->toBe('rounded-md');
        });
    });

    describe('props', function () {
        it('accepts a source, alt text, and extension label', function () {
            $preview = new FilePreview(src: '/media/1/photo.jpg', alt: 'A photo', extension: 'jpg');

            expect($preview->src)->toBe('/media/1/photo.jpg')
                ->and($preview->alt)->toBe('A photo')
                ->and($preview->extension)->toBe('jpg');
        });
    });

    describe('roundedClass()', function () {
        it('returns rounded-lg when rounded is lg', function () {
            $preview = new FilePreview(rounded: 'lg');

            expect($preview->roundedClass())->toBe('rounded-lg');
        });

        it('falls back to rounded-md for any other value', function () {
            $preview = new FilePreview(rounded: 'xl');

            expect($preview->roundedClass())->toBe('rounded-md');
        });
    });
});
