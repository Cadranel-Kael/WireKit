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

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $group = new Group(heading: 'Suggestions');
            $group->withAttributes(['wire:key' => 'suggestions']);

            expect($group->resolveId())->toBe('command-group-suggestions');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $group = new Group(heading: 'Suggestions', id: 'explicit');
            $group->withAttributes(['wire:key' => 'suggestions']);

            expect($group->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->resolveId())
                ->toBe($group->resolveId())
                ->toBe($group->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $group = new Group(heading: 'Suggestions');

            expect($group->attributes)->toBeNull()
                ->and($group->resolveId())->toStartWith('command-group-');
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

            expect((new Group(heading: 'Suggestions'))->render())->toBeInstanceOf(View::class);
        });
    });
});
