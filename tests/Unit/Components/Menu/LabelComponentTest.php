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
use WireKit\View\Components\Menu\Label;

describe('Menu\\Label', function () {

    describe('defaults', function () {
        it('has an empty icon by default', function () {
            $label = new Label();

            expect($label->icon)->toBe('');
        });
    });

    describe('props', function () {
        it('accepts an icon', function () {
            $label = new Label(icon: 'folder');

            expect($label->icon)->toBe('folder');
        });

        it('accepts an explicit id', function () {
            $label = new Label(id: 'section');

            expect($label->id)->toBe('section');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $label = new Label(id: 'section');

            expect($label->resolveId())->toBe('section');
        });

        it('falls back to the wire:key prefixed with menu-label- so morphs keep the id stable', function () {
            $label = new Label();

            expect($label->resolveId('section'))->toBe('menu-label-section');
        });

        it('prefers an explicit id over the wire:key', function () {
            $label = new Label(id: 'explicit');

            expect($label->resolveId('section'))->toBe('explicit');
        });

        it('prefixes the fallback id with menu-label-', function () {
            $label = new Label();

            expect($label->resolveId())->toStartWith('menu-label-');
        });

        it('generates unique ids across instances', function () {
            $a = new Label();
            $b = new Label();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $label = new Label();
            $label->withAttributes(['wire:key' => 'section']);

            expect($label->resolveId())->toBe('menu-label-section');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $label = new Label(id: 'explicit');
            $label->withAttributes(['wire:key' => 'section']);

            expect($label->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $label = new Label();

            expect($label->resolveId())
                ->toBe($label->resolveId())
                ->toBe($label->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $label = new Label();

            expect($label->attributes)->toBeNull()
                ->and($label->resolveId())->toStartWith('menu-label-');
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

            expect((new Label())->render())->toBeInstanceOf(View::class);
        });
    });
});
