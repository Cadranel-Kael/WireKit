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
use WireKit\View\Components\Dropdown\Index;

describe('Dropdown\\Index', function () {

    describe('resolveDropdownId()', function () {
        it('prefers an explicit id', function () {
            $dropdown = new Index(id: 'actions');

            expect($dropdown->resolveDropdownId())->toBe('actions');
        });

        it('falls back to the wire:key prefixed with dropdown- so morphs keep the id stable', function () {
            $dropdown = new Index();

            expect($dropdown->resolveDropdownId('actions'))->toBe('dropdown-actions');
        });

        it('prefers an explicit id over the wire:key', function () {
            $dropdown = new Index(id: 'explicit');

            expect($dropdown->resolveDropdownId('actions'))->toBe('explicit');
        });

        it('prefixes the fallback id with dropdown-', function () {
            $dropdown = new Index();

            expect($dropdown->resolveDropdownId())->toStartWith('dropdown-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveDropdownId())->not->toBe($b->resolveDropdownId());
        });
    });

    describe('resolveDropdownId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $dropdown = new Index();
            $dropdown->withAttributes(['wire:key' => 'account']);

            expect($dropdown->resolveDropdownId())->toBe('dropdown-account');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $dropdown = new Index(id: 'explicit');
            $dropdown->withAttributes(['wire:key' => 'account']);

            expect($dropdown->resolveDropdownId())->toBe('explicit');
        });

        it('memoizes the resolved id so the trigger and menu render the same id', function () {
            $dropdown = new Index();

            expect($dropdown->resolveDropdownId())
                ->toBe($dropdown->resolveDropdownId())
                ->toBe($dropdown->dropdownId);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $dropdown = new Index();

            expect($dropdown->attributes)->toBeNull()
                ->and($dropdown->resolveDropdownId())->toStartWith('dropdown-');
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

            expect((new Index())->render())->toBeInstanceOf(View::class);
        });
    });
});
