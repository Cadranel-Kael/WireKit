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
use WireKit\View\Components\Radio\Index;

describe('Radio\\Index', function () {

    describe('defaults', function () {
        it('has an empty label by default', function () {
            $radio = new Index();

            expect($radio->label)->toBe('');
        });

        it('is not required by default', function () {
            $radio = new Index();

            expect($radio->required)->toBeFalse();
        });
    });

    describe('props', function () {
        it('accepts a label and required flag', function () {
            $radio = new Index(label: 'Yes', required: true);

            expect($radio->label)->toBe('Yes');
            expect($radio->required)->toBeTrue();
        });

        it('accepts an explicit id', function () {
            $radio = new Index(id: 'agree');

            expect($radio->id)->toBe('agree');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $radio = new Index(id: 'agree');

            expect($radio->resolveId())->toBe('agree');
        });

        it('falls back to the wire:key prefixed with radio- so morphs keep the id stable', function () {
            $radio = new Index();

            expect($radio->resolveId('agree'))->toBe('radio-agree');
        });

        it('prefers an explicit id over the wire:key', function () {
            $radio = new Index(id: 'explicit');

            expect($radio->resolveId('agree'))->toBe('explicit');
        });

        it('prefixes the fallback id with radio-', function () {
            $radio = new Index();

            expect($radio->resolveId())->toStartWith('radio-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $radio = new Index();
            $radio->withAttributes(['wire:key' => 'agree']);

            expect($radio->resolveId())->toBe('radio-agree');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $radio = new Index(id: 'explicit');
            $radio->withAttributes(['wire:key' => 'agree']);

            expect($radio->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $radio = new Index();

            expect($radio->resolveId())
                ->toBe($radio->resolveId())
                ->toBe($radio->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $radio = new Index();

            expect($radio->attributes)->toBeNull()
                ->and($radio->resolveId())->toStartWith('radio-');
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
