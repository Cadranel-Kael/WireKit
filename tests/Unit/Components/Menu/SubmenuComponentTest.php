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
use WireKit\View\Components\Menu\Submenu;

describe('Menu\\Submenu', function () {

    describe('defaults', function () {
        it('has an empty heading by default', function () {
            $submenu = new Submenu();

            expect($submenu->heading)->toBe('');
        });

        it('defaults placement to right-start', function () {
            $submenu = new Submenu();

            expect($submenu->placement)->toBe('right-start');
        });
    });

    describe('props', function () {
        it('accepts a heading', function () {
            $submenu = new Submenu(heading: 'More actions');

            expect($submenu->heading)->toBe('More actions');
        });

        it('accepts a placement', function () {
            $submenu = new Submenu(placement: 'left-start');

            expect($submenu->placement)->toBe('left-start');
        });

        it('accepts an explicit id', function () {
            $submenu = new Submenu(id: 'more');

            expect($submenu->id)->toBe('more');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $submenu = new Submenu(id: 'more');

            expect($submenu->resolveId())->toBe('more');
        });

        it('falls back to the wire:key prefixed with submenu- so morphs keep the id stable', function () {
            $submenu = new Submenu();

            expect($submenu->resolveId('more'))->toBe('submenu-more');
        });

        it('prefers an explicit id over the wire:key', function () {
            $submenu = new Submenu(id: 'explicit');

            expect($submenu->resolveId('more'))->toBe('explicit');
        });

        it('prefixes the fallback id with submenu-', function () {
            $submenu = new Submenu();

            expect($submenu->resolveId())->toStartWith('submenu-');
        });

        it('generates unique ids across instances', function () {
            $a = new Submenu();
            $b = new Submenu();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $submenu = new Submenu();
            $submenu->withAttributes(['wire:key' => 'more']);

            expect($submenu->resolveId())->toBe('submenu-more');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $submenu = new Submenu(id: 'explicit');
            $submenu->withAttributes(['wire:key' => 'more']);

            expect($submenu->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $submenu = new Submenu();

            expect($submenu->resolveId())
                ->toBe($submenu->resolveId())
                ->toBe($submenu->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $submenu = new Submenu();

            expect($submenu->attributes)->toBeNull()
                ->and($submenu->resolveId())->toStartWith('submenu-');
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

            expect((new Submenu())->render())->toBeInstanceOf(View::class);
        });
    });
});
