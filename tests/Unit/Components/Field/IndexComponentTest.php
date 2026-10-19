<?php

use Illuminate\Container\Container;
use Illuminate\Contracts\View\Factory as ViewFactory;
use Illuminate\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;
use Illuminate\View\Compilers\BladeCompiler;
use Illuminate\View\ComponentAttributeBag;
use Illuminate\View\Engines\CompilerEngine;
use Illuminate\View\Engines\EngineResolver;
use Illuminate\View\Engines\PhpEngine;
use Illuminate\View\Factory;
use Illuminate\View\FileViewFinder;
use Illuminate\View\View;
use WireKit\View\Components\Field\Index;

describe('Field\\Index', function () {

    describe('defaults', function () {
        it('defaults to a block display', function () {
            $field = new Index();

            expect($field->display)->toBe('block');
        });
    });

    describe('resolveIds()', function () {
        it('prefers explicit ids', function () {
            $field = new Index(labelId: 'my-label', descriptionId: 'my-description');

            $ids = $field->resolveIds();

            expect($ids['labelId'])->toBe('my-label');
            expect($ids['descriptionId'])->toBe('my-description');
        });

        it('falls back to the wire:key with prefixed suffixes so morphs keep the ids stable', function () {
            $field = new Index();

            $ids = $field->resolveIds('email');

            expect($ids['labelId'])->toBe('label-email');
            expect($ids['descriptionId'])->toBe('description-email');
        });

        it('prefers explicit ids over the wire:key', function () {
            $field = new Index(labelId: 'explicit');

            $ids = $field->resolveIds('email');

            expect($ids['labelId'])->toBe('explicit');
            expect($ids['descriptionId'])->toBe('description-email');
        });

        it('prefixes the fallback ids', function () {
            $field = new Index();

            $ids = $field->resolveIds();

            expect($ids['labelId'])->toStartWith('label-');
            expect($ids['descriptionId'])->toStartWith('description-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            $idsA = $a->resolveIds();
            $idsB = $b->resolveIds();

            expect($idsA['labelId'])->not->toBe($idsB['labelId']);
            expect($idsA['descriptionId'])->not->toBe($idsB['descriptionId']);
        });
    });

    describe('props', function () {
        it('accepts a display value', function () {
            $field = new Index(display: 'inline');

            expect($field->display)->toBe('inline');
        });
    });

    describe('descriptionPosition()', function () {
        it('returns the description:position attribute when present', function () {
            $field = new Index();
            $attributes = new ComponentAttributeBag(['description:position' => 'inline']);

            expect($field->descriptionPosition($attributes))->toBe('inline');
        });

        it('defaults to an empty string', function () {
            $field = new Index();
            $attributes = new ComponentAttributeBag();

            expect($field->descriptionPosition($attributes))->toBe('');
        });
    });

    describe('resolveIds() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $field = new Index();
            $field->withAttributes(['wire:key' => 'email']);

            $ids = $field->resolveIds();

            expect($ids['labelId'])->toBe('label-email');
            expect($ids['descriptionId'])->toBe('description-email');
        });

        it('prefers explicit ids over the wire:key from the bag', function () {
            $field = new Index(labelId: 'explicit');
            $field->withAttributes(['wire:key' => 'email']);

            $ids = $field->resolveIds();

            expect($ids['labelId'])->toBe('explicit');
            expect($ids['descriptionId'])->toBe('description-email');
        });

        it('memoizes the resolved ids so they stay stable across calls', function () {
            $field = new Index();

            expect($field->resolveIds())->toBe($field->resolveIds());
        });

        it('resolves without an attribute bag, as during render()', function () {
            $field = new Index();

            expect($field->attributes)->toBeNull();

            $ids = $field->resolveIds();

            expect($ids['labelId'])->toStartWith('label-');
            expect($ids['descriptionId'])->toStartWith('description-');
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
