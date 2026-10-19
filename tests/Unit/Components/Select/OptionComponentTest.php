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
use WireKit\View\Components\Select\Option;

describe('Select\\Option', function () {

    describe('defaults', function () {
        it('has an empty value by default', function () {
            $option = new Option();

            expect($option->value)->toBe('');
        });

        it('is not selected by default', function () {
            $option = new Option();

            expect($option->selected)->toBeFalse();
        });
    });

    describe('props', function () {
        it('accepts a value and selected state', function () {
            $option = new Option(value: 'us', selected: true);

            expect($option->value)->toBe('us');
            expect($option->selected)->toBeTrue();
        });

        it('accepts an explicit id', function () {
            $option = new Option(id: 'us-option');

            expect($option->id)->toBe('us-option');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $option = new Option(id: 'us-option');

            expect($option->resolveId())->toBe('us-option');
        });

        it('falls back to the wire:key prefixed with option- so morphs keep the id stable', function () {
            $option = new Option();

            expect($option->resolveId('us'))->toBe('option-us');
        });

        it('prefers an explicit id over the wire:key', function () {
            $option = new Option(id: 'explicit');

            expect($option->resolveId('us'))->toBe('explicit');
        });

        it('prefixes the fallback id with option-', function () {
            $option = new Option();

            expect($option->resolveId())->toStartWith('option-');
        });

        it('generates unique ids across instances', function () {
            $a = new Option();
            $b = new Option();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $option = new Option();
            $option->withAttributes(['wire:key' => 'us']);

            expect($option->resolveId())->toBe('option-us');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $option = new Option(id: 'explicit');
            $option->withAttributes(['wire:key' => 'us']);

            expect($option->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $option = new Option();

            expect($option->resolveId())
                ->toBe($option->resolveId())
                ->toBe($option->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $option = new Option();

            expect($option->attributes)->toBeNull()
                ->and($option->resolveId())->toStartWith('option-');
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

            expect((new Option())->render())->toBeInstanceOf(View::class);
        });
    });
});
