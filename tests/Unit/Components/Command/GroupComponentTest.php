<?php

use WireKit\View\Components\Command\Group;

describe('Command\\Group', function () {

    describe('props', function () {
        it('accepts a heading', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->heading)->toBe('Suggestions');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $group = new Group(heading: 'Suggestions', id: 'suggestions');

            expect($group->resolveId())->toBe('suggestions');
        });

        it('falls back to the wire:key prefixed with command-group- so morphs keep the id stable', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->resolveId('suggestions'))->toBe('command-group-suggestions');
        });

        it('prefers an explicit id over the wire:key', function () {
            $group = new Group(heading: 'Suggestions', id: 'explicit');

            expect($group->resolveId('suggestions'))->toBe('explicit');
        });

        it('prefixes the fallback id with command-group-', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->resolveId())->toStartWith('command-group-');
        });

        it('generates unique ids across instances', function () {
            $a = new Group(heading: 'A');
            $b = new Group(heading: 'B');

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });
});
