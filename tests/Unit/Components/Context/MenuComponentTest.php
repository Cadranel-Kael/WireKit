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
use WireKit\View\Components\Context\Menu;

describe('Context\\Menu', function () {

    describe('resolveMenuId()', function () {
        it('prefers an explicit id', function () {
            $menu = new Menu(id: 'context');

            expect($menu->resolveMenuId())->toBe('context');
        });

        it('falls back to the wire:key prefixed with menu- so morphs keep the id stable', function () {
            $menu = new Menu();

            expect($menu->resolveMenuId('context'))->toBe('menu-context');
        });

        it('prefers an explicit id over the wire:key', function () {
            $menu = new Menu(id: 'explicit');

            expect($menu->resolveMenuId('context'))->toBe('explicit');
        });

        it('prefixes the fallback id with menu-', function () {
            $menu = new Menu();

            expect($menu->resolveMenuId())->toStartWith('menu-');
        });

        it('generates unique ids across instances', function () {
            $a = new Menu();
            $b = new Menu();

            expect($a->resolveMenuId())->not->toBe($b->resolveMenuId());
        });
    });

    describe('resolveMenuId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $menu = new Menu();
            $menu->withAttributes(['wire:key' => 'context']);

            expect($menu->resolveMenuId())->toBe('menu-context');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $menu = new Menu(id: 'explicit');
            $menu->withAttributes(['wire:key' => 'context']);

            expect($menu->resolveMenuId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $menu = new Menu();

            expect($menu->resolveMenuId())
                ->toBe($menu->resolveMenuId())
                ->toBe($menu->menuId);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $menu = new Menu();

            expect($menu->attributes)->toBeNull()
                ->and($menu->resolveMenuId())->toStartWith('menu-');
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

            expect((new Menu())->render())->toBeInstanceOf(View::class);
        });
    });
});
