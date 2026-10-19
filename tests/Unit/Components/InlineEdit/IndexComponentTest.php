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
use WireKit\View\Components\InlineEdit\Index;

describe('InlineEdit\\Index', function () {

    describe('defaults', function () {
        it('has an empty value by default', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->value)->toBe('');
        });

        it('triggers on click by default', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->triggerOnClick)->toBeTrue();
        });
    });

    describe('props', function () {
        it('accepts a value and can opt out of triggering on click', function () {
            $inlineEdit = new Index(value: 'Hello', triggerOnClick: false);

            expect($inlineEdit->value)->toBe('Hello');
            expect($inlineEdit->triggerOnClick)->toBeFalse();
        });

        it('accepts an explicit id', function () {
            $inlineEdit = new Index(id: 'custom-id');

            expect($inlineEdit->id)->toBe('custom-id');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $inlineEdit = new Index(id: 'custom-id');

            expect($inlineEdit->resolveId())->toBe('custom-id');
        });

        it('falls back to the wire:key prefixed with inline-edit- so morphs keep the id stable', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->resolveId('title'))->toBe('inline-edit-title');
        });

        it('prefers an explicit id over the wire:key', function () {
            $inlineEdit = new Index(id: 'explicit');

            expect($inlineEdit->resolveId('title'))->toBe('explicit');
        });

        it('prefixes the fallback id with inline-edit-', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->resolveId())->toStartWith('inline-edit-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $inlineEdit = new Index();
            $inlineEdit->withAttributes(['wire:key' => 'title']);

            expect($inlineEdit->resolveId())->toBe('inline-edit-title');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $inlineEdit = new Index(id: 'explicit');
            $inlineEdit->withAttributes(['wire:key' => 'title']);

            expect($inlineEdit->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->resolveId())
                ->toBe($inlineEdit->resolveId())
                ->toBe($inlineEdit->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $inlineEdit = new Index();

            expect($inlineEdit->attributes)->toBeNull()
                ->and($inlineEdit->resolveId())->toStartWith('inline-edit-');
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
