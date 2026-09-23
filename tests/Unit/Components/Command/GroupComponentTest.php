<?php

use WireKit\View\Components\Command\Group;

describe('Command\Group', function () {

    describe('props', function () {
        it('accepts a heading', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->heading)->toBe('Suggestions');
        });
    });

    describe('auto-generated id', function () {
        it('generates a non-empty id', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->id)->toBeString()->not->toBeEmpty();
        });

        it('prefixes the id with command-group-', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->id)->toStartWith('command-group-');
        });

        it('generates unique ids across instances', function () {
            $a = new Group(heading: 'A');
            $b = new Group(heading: 'B');

            expect($a->id)->not->toBe($b->id);
        });
    });
});
