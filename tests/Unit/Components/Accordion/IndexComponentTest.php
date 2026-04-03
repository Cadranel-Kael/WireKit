<?php

use WireKit\View\Components\Accordion\Index;

describe('Accordion\Index', function () {

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

    describe('auto-generated ids', function () {
        it('generates a unique item id', function () {
            $a = new Index();
            $b = new Index();

            expect($a->id)->toBeString()->not->toBeEmpty();
            expect($b->id)->toBeString()->not->toBeEmpty();
            expect($a->id)->not->toBe($b->id);
        });

        it('prefixes the item id with accordion-item-', function () {
            $component = new Index();

            expect($component->id)->toStartWith('accordion-item-');
        });

        it('generates a unique content id', function () {
            $a = new Index();
            $b = new Index();

            expect($a->contentId)->toBeString()->not->toBeEmpty();
            expect($b->contentId)->toBeString()->not->toBeEmpty();
            expect($a->contentId)->not->toBe($b->contentId);
        });

        it('prefixes the content id with content-', function () {
            $component = new Index();

            expect($component->contentId)->toStartWith('content-');
        });

        it('generates a unique heading id', function () {
            $a = new Index();
            $b = new Index();

            expect($a->headingId)->toBeString()->not->toBeEmpty();
            expect($b->headingId)->toBeString()->not->toBeEmpty();
            expect($a->headingId)->not->toBe($b->headingId);
        });

        it('prefixes the heading id with heading-', function () {
            $component = new Index();

            expect($component->headingId)->toStartWith('heading-');
        });

        it('generates distinct content and heading ids', function () {
            $component = new Index();

            expect($component->contentId)->not->toBe($component->headingId);
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
