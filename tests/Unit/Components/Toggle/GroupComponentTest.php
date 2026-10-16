<?php

use WireKit\View\Components\Toggle\Group;

describe('Toggle\\Group', function () {

    describe('defaults', function () {
        it('is not exclusive by default', function () {
            $group = new Group();

            expect($group->exclusive)->toBeFalse();
        });
    });

    describe('resolveGroupId()', function () {
        it('prefers an explicit id', function () {
            $group = new Group(id: 'align');

            expect($group->resolveGroupId())->toBe('align');
        });

        it('falls back to the wire:key prefixed with toggle-group- so morphs keep the id stable', function () {
            $group = new Group();

            expect($group->resolveGroupId('align'))->toBe('toggle-group-align');
        });

        it('prefers an explicit id over the wire:key', function () {
            $group = new Group(id: 'explicit');

            expect($group->resolveGroupId('align'))->toBe('explicit');
        });

        it('prefixes the fallback id with toggle-group-', function () {
            $group = new Group();

            expect($group->resolveGroupId())->toStartWith('toggle-group-');
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
    });
});
