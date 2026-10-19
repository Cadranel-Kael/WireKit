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
use WireKit\View\Components\Select\Index;

describe('Select\\Index', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $select = new Index();

            expect($select->label)->toBe('');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $select = new Index(id: 'country');

            expect($select->resolveId())->toBe('country');
        });

        it('falls back to the wire:key prefixed with select- so morphs keep the id stable', function () {
            $select = new Index();

            expect($select->resolveId('country'))->toBe('select-country');
        });

        it('prefers an explicit id over the wire:key', function () {
            $select = new Index(id: 'explicit');

            expect($select->resolveId('country'))->toBe('explicit');
        });

        it('prefixes the fallback id with select-', function () {
            $select = new Index();

            expect($select->resolveId())->toStartWith('select-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('props', function () {
        it('accepts a label', function () {
            $select = new Index(label: 'Country');

            expect($select->label)->toBe('Country');
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $select = new Index();
            $select->withAttributes(['wire:key' => 'country']);

            expect($select->resolveId())->toBe('select-country');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $select = new Index(id: 'explicit');
            $select->withAttributes(['wire:key' => 'country']);

            expect($select->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $select = new Index();

            expect($select->resolveId())
                ->toBe($select->resolveId())
                ->toBe($select->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $select = new Index();

            expect($select->attributes)->toBeNull()
                ->and($select->resolveId())->toStartWith('select-');
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
