<?php

use Illuminate\Container\Container;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;
use Illuminate\View\Compilers\BladeCompiler;
use Illuminate\View\Engines\CompilerEngine;
use Illuminate\View\Engines\EngineResolver;
use Illuminate\View\Engines\PhpEngine;
use Illuminate\View\Factory;
use Illuminate\View\FileViewFinder;
use Illuminate\View\View;
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

    describe('resolveGroupId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $group = new Group();
            $group->withAttributes(['wire:key' => 'settings']);

            expect($group->resolveGroupId())->toBe('tab-group-settings');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $group = new Group(id: 'explicit');
            $group->withAttributes(['wire:key' => 'settings']);

            expect($group->resolveGroupId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $group = new Group();

            expect($group->resolveGroupId())
                ->toBe($group->resolveGroupId())
                ->toBe($group->groupId);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $group = new Group();

            expect($group->attributes)->toBeNull()
                ->and($group->resolveGroupId())->toStartWith('tab-group-');
        });
    });

    describe('render()', function () {
        it('renders without an attribute bag, as Blade calls render() before withAttributes()', function () {
            $container = new Container();
            Container::setInstance($container);

            $files = new Filesystem();
            $engines = new EngineResolver();
            $engines->register('php', fn () => new PhpEngine($files));
            $engines->register('blade', fn () => new CompilerEngine(new BladeCompiler($files, sys_get_temp_dir()), $files));
            $finder = new FileViewFinder($files, [sys_get_temp_dir()]);
            $finder->addNamespace('wire-kit', dirname(__DIR__, 4).'/resources/views');

            $container->instance(ViewFactory::class, new Factory($engines, $finder, new Dispatcher($container)));

            expect((new Group())->render())->toBeInstanceOf(View::class);
        });
    });
});
