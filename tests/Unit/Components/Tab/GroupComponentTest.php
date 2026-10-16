<?php

use WireKit\View\Components\Tab\Group;

describe('Tab\\Group', function () {

    describe('resolveGroupId()', function () {
        it('prefers an explicit id', function () {
            $group = new Group(id: 'settings-tabs');

            expect($group->resolveGroupId())->toBe('settings-tabs');
        });

        it('falls back to the wire:key prefixed with tab-group- so morphs keep the id stable', function () {
            $group = new Group();

            expect($group->resolveGroupId('settings'))->toBe('tab-group-settings');
        });

        it('prefers an explicit id over the wire:key', function () {
            $group = new Group(id: 'explicit');

            expect($group->resolveGroupId('settings'))->toBe('explicit');
        });

        it('prefixes the fallback id with tab-group-', function () {
            $group = new Group();

            expect($group->resolveGroupId())->toStartWith('tab-group-');
        });

        it('generates unique ids across instances', function () {
            $a = new Group();
            $b = new Group();

            expect($a->resolveGroupId())->not->toBe($b->resolveGroupId());
        });
    });
});
