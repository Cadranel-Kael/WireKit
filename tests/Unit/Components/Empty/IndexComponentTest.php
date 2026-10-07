<?php

use WireKit\View\Components\Empty\Index;

describe('Empty\Index', function () {

    describe('defaults', function () {
        it('has an empty icon, title and description by default', function () {
            $empty = new Index();

            expect($empty->icon)->toBe('');
            expect($empty->title)->toBe('');
            expect($empty->description)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts icon, title and description together', function () {
            $empty = new Index(
                icon: 'inbox',
                title: 'No results',
                description: 'Try a different search.',
            );

            expect($empty->icon)->toBe('inbox');
            expect($empty->title)->toBe('No results');
            expect($empty->description)->toBe('Try a different search.');
        });
    });
});
