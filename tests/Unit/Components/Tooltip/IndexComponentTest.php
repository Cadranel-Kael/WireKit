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
use WireKit\View\Components\Tooltip\Index;

describe('Tooltip\\Index', function () {

    describe('defaults', function () {
        it('has an empty content by default', function () {
            $tooltip = new Index();

            expect($tooltip->content)->toBe('');
        });

        it('defaults the offset to 4', function () {
            $tooltip = new Index();

            expect($tooltip->offset)->toBe('4');
        });

        it('defaults the placement to bottom', function () {
            $tooltip = new Index();

            expect($tooltip->placement)->toBe('bottom');
        });
    });

    describe('props', function () {
        it('accepts content, offset and placement together', function () {
            $tooltip = new Index(
                content: 'Copy to clipboard',
                offset: '8',
                placement: 'top',
            );

            expect($tooltip->content)->toBe('Copy to clipboard');
            expect($tooltip->offset)->toBe('8');
            expect($tooltip->placement)->toBe('top');
        });

        it('accepts an explicit id', function () {
            $tooltip = new Index(id: 'copy-tooltip');

            expect($tooltip->id)->toBe('copy-tooltip');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $tooltip = new Index(id: 'copy');

            expect($tooltip->resolveId())->toBe('copy');
        });

        it('falls back to the wire:key prefixed with tooltip- so morphs keep the id stable', function () {
            $tooltip = new Index();

            expect($tooltip->resolveId('copy'))->toBe('tooltip-copy');
        });

        it('prefers an explicit id over the wire:key', function () {
            $tooltip = new Index(id: 'explicit');

            expect($tooltip->resolveId('copy'))->toBe('explicit');
        });

        it('prefixes the fallback id with tooltip-', function () {
            $tooltip = new Index();

            expect($tooltip->resolveId())->toStartWith('tooltip-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $tooltip = new Index();
            $tooltip->withAttributes(['wire:key' => 'copy']);

            expect($tooltip->resolveId())->toBe('tooltip-copy');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $tooltip = new Index(id: 'explicit');
            $tooltip->withAttributes(['wire:key' => 'copy']);

            expect($tooltip->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $tooltip = new Index();

            expect($tooltip->resolveId())
                ->toBe($tooltip->resolveId())
                ->toBe($tooltip->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $tooltip = new Index();

            expect($tooltip->attributes)->toBeNull()
                ->and($tooltip->resolveId())->toStartWith('tooltip-');
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
