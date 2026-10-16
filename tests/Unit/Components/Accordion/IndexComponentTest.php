<?php

use WireKit\View\Components\Accordion\Index;

describe('Accordion\\Index', function () {

    describe('defaults', function () {
        it('has an empty heading by default', function () {
            $component = new Index();

            expect($component->heading)->toBe('');
        });

        it('is collapsed by default', function () {
            $component = new Index();

            expect($component->expanded)->toBeFalse();
        });

        it('is enabled by default', function () {
            $component = new Index();

            expect($component->disabled)->toBeFalse();
        });
    });

    describe('resolveIds()', function () {
        it('prefers explicit ids', function () {
            $component = new Index(id: 'item', contentId: 'content', headingId: 'heading');

            $ids = $component->resolveIds();

            expect($ids['id'])->toBe('item');
            expect($ids['contentId'])->toBe('content');
            expect($ids['headingId'])->toBe('heading');
        });

        it('falls back to the wire:key with prefixed suffixes so morphs keep the ids stable', function () {
            $component = new Index();

            $ids = $component->resolveIds('section');

            expect($ids['id'])->toBe('accordion-item-section');
            expect($ids['contentId'])->toBe('content-section');
            expect($ids['headingId'])->toBe('heading-section');
        });

        it('prefers explicit ids over the wire:key', function () {
            $component = new Index(id: 'explicit');

            $ids = $component->resolveIds('section');

            expect($ids['id'])->toBe('explicit');
            expect($ids['contentId'])->toBe('content-section');
            expect($ids['headingId'])->toBe('heading-section');
        });

        it('prefixes the fallback ids', function () {
            $component = new Index();

            $ids = $component->resolveIds();

            expect($ids['id'])->toStartWith('accordion-item-');
            expect($ids['contentId'])->toStartWith('content-');
            expect($ids['headingId'])->toStartWith('heading-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            $idsA = $a->resolveIds();
            $idsB = $b->resolveIds();

            expect($idsA['id'])->not->toBe($idsB['id']);
            expect($idsA['contentId'])->not->toBe($idsB['contentId']);
            expect($idsA['headingId'])->not->toBe($idsB['headingId']);
        });

        it('generates distinct content and heading ids', function () {
            $component = new Index();

            $ids = $component->resolveIds();

            expect($ids['contentId'])->not->toBe($ids['headingId']);
        });
    });

    describe('props', function () {
        it('accepts a heading string', function () {
            $component = new Index(heading: 'What is WireKit?');

            expect($component->heading)->toBe('What is WireKit?');
        });

        it('can be initialised as expanded', function () {
            $component = new Index(expanded: true);

            expect($component->expanded)->toBeTrue();
        });

        it('can be initialised as disabled', function () {
            $component = new Index(disabled: true);

            expect($component->disabled)->toBeTrue();
        });

        it('accepts all props together', function () {
            $component = new Index(
                heading: 'Section title',
                expanded: true,
                disabled: true,
            );

            expect($component->heading)->toBe('Section title');
            expect($component->expanded)->toBeTrue();
            expect($component->disabled)->toBeTrue();
        });
    });
});
