<?php

use WireKit\View\Components\FilePreview\Index;

describe('FilePreview\Index', function () {

    describe('defaults', function () {
        it('has an empty src, alt and extension by default', function () {
            $filePreview = new Index();

            expect($filePreview->src)->toBe('');
            expect($filePreview->alt)->toBe('');
            expect($filePreview->extension)->toBe('');
        });

        it('defaults the icon to file-text', function () {
            $filePreview = new Index();

            expect($filePreview->icon)->toBe('file-text');
        });

        it('defaults rounded to md', function () {
            $filePreview = new Index();

            expect($filePreview->rounded)->toBe('md');
        });
    });

    describe('props', function () {
        it('accepts all props together', function () {
            $filePreview = new Index(
                src: '/files/report.pdf',
                alt: 'Report',
                extension: 'pdf',
                icon: 'file-pdf',
                rounded: 'lg',
            );

            expect($filePreview->src)->toBe('/files/report.pdf');
            expect($filePreview->alt)->toBe('Report');
            expect($filePreview->extension)->toBe('pdf');
            expect($filePreview->icon)->toBe('file-pdf');
            expect($filePreview->rounded)->toBe('lg');
        });
    });

    describe('roundedClass()', function () {
        it('resolves lg', function () {
            $filePreview = new Index(rounded: 'lg');

            expect($filePreview->roundedClass())->toBe('rounded-lg');
        });

        it('falls back to rounded-md for any other value', function () {
            $filePreview = new Index(rounded: 'xl');

            expect($filePreview->roundedClass())->toBe('rounded-md');
        });
    });
});
