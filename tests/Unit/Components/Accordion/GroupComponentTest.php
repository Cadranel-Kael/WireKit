<?php

use WireKit\View\Components\Accordion\Group;

describe('Accordion\\Group', function () {

    describe('defaults', function () {
        it('is not exclusive by default', function () {
            $group = new Group();

            expect($group->exclusive)->toBeFalse();
        });

        it('has transitions disabled by default', function () {
            $group = new Group();

            expect($group->transition)->toBeFalse();
        });
    });

    describe('resolveGroupId()', function () {
        it('prefers an explicit id', function () {
            $group = new Group(id: 'faq');

            expect($group->resolveGroupId())->toBe('faq');
        });

        it('falls back to the wire:key prefixed with group- so morphs keep the id stable', function () {
            $group = new Group();

            expect($group->resolveGroupId('faq'))->toBe('group-faq');
        });

        it('prefers an explicit id over the wire:key', function () {
            $group = new Group(id: 'explicit');

            expect($group->resolveGroupId('faq'))->toBe('explicit');
        });

        it('prefixes the fallback id with group-', function () {
            $group = new Group();

            expect($group->resolveGroupId())->toStartWith('group-');
        });

        it('generates unique ids across instances', function () {
            $a = new Group();
            $b = new Group();

            expect($a->resolveGroupId())->not->toBe($b->resolveGroupId());
        });
    });

    describe('props', function () {
        it('can be set as exclusive', function () {
            $group = new Group(exclusive: true);

            expect($group->exclusive)->toBeTrue();
        });

        it('can have transitions enabled', function () {
            $group = new Group(transition: true);

            expect($group->transition)->toBeTrue();
        });

        it('accepts both exclusive and transition together', function () {
            $group = new Group(exclusive: true, transition: true);

            expect($group->exclusive)->toBeTrue();
            expect($group->transition)->toBeTrue();
        });
    });
});
