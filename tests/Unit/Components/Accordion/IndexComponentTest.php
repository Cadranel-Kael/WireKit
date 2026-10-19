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
use WireKit\View\Components\Accordion\Index;

describe('Accordion\\Index', function () {

    describe('defaults', function () {
        it('has an empty heading by default', function () {
            $component = new Index();

            expect($component->heading)->toBe('');
        });

        it('is collapsed by default', function () {
            $component = new Index();

            expect($component->expanded)->toBeFalse();
        });

        it('is enabled by default', function () {
            $component = new Index();

            expect($component->disabled)->toBeFalse();
        });
    });

    describe('resolveIds()', function () {
        it('prefers explicit ids', function () {
            $component = new Index(id: 'item', contentId: 'content', headingId: 'heading');

            $ids = $component->resolveIds();

            expect($ids['id'])->toBe('item');
            expect($ids['contentId'])->toBe('content');
            expect($ids['headingId'])->toBe('heading');
        });

        it('falls back to the wire:key with prefixed suffixes so morphs keep the ids stable', function () {
            $component = new Index();

            $ids = $component->resolveIds('section');

            expect($ids['id'])->toBe('accordion-item-section');
            expect($ids['contentId'])->toBe('content-section');
            expect($ids['headingId'])->toBe('heading-section');
        });

        it('prefers explicit ids over the wire:key', function () {
            $component = new Index(id: 'explicit');

            $ids = $component->resolveIds('section');

            expect($ids['id'])->toBe('explicit');
            expect($ids['contentId'])->toBe('content-section');
            expect($ids['headingId'])->toBe('heading-section');
        });

        it('prefixes the fallback ids', function () {
            $component = new Index();

            $ids = $component->resolveIds();

            expect($ids['id'])->toStartWith('accordion-item-');
            expect($ids['contentId'])->toStartWith('content-');
            expect($ids['headingId'])->toStartWith('heading-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            $idsA = $a->resolveIds();
            $idsB = $b->resolveIds();

            expect($idsA['id'])->not->toBe($idsB['id']);
            expect($idsA['contentId'])->not->toBe($idsB['contentId']);
            expect($idsA['headingId'])->not->toBe($idsB['headingId']);
        });

        it('generates distinct content and heading ids', function () {
            $component = new Index();

            $ids = $component->resolveIds();

            expect($ids['contentId'])->not->toBe($ids['headingId']);
        });
    });

    describe('props', function () {
        it('accepts a heading string', function () {
            $component = new Index(heading: 'What is WireKit?');

            expect($component->heading)->toBe('What is WireKit?');
        });

        it('can be initialised as expanded', function () {
            $component = new Index(expanded: true);

            expect($component->expanded)->toBeTrue();
        });

        it('can be initialised as disabled', function () {
            $component = new Index(disabled: true);

            expect($component->disabled)->toBeTrue();
        });

        it('accepts all props together', function () {
            $component = new Index(
                heading: 'Section title',
                expanded: true,
                disabled: true,
            );

            expect($component->heading)->toBe('Section title');
            expect($component->expanded)->toBeTrue();
            expect($component->disabled)->toBeTrue();
        });
    });

    describe('resolveIds() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $component = new Index();
            $component->withAttributes(['wire:key' => 'section']);

            $ids = $component->resolveIds();

            expect($ids['id'])->toBe('accordion-item-section');
            expect($ids['contentId'])->toBe('content-section');
            expect($ids['headingId'])->toBe('heading-section');
        });

        it('prefers explicit ids over the wire:key from the bag', function () {
            $component = new Index(id: 'explicit');
            $component->withAttributes(['wire:key' => 'section']);

            $ids = $component->resolveIds();

            expect($ids['id'])->toBe('explicit');
            expect($ids['contentId'])->toBe('content-section');
            expect($ids['headingId'])->toBe('heading-section');
        });

        it('memoizes the resolved ids so they stay stable across calls', function () {
            $component = new Index();

            expect($component->resolveIds())->toBe($component->resolveIds());
        });

        it('resolves without an attribute bag, as during render()', function () {
            $component = new Index();

            expect($component->attributes)->toBeNull();

            $ids = $component->resolveIds();

            expect($ids['id'])->toStartWith('accordion-item-');
            expect($ids['contentId'])->toStartWith('content-');
            expect($ids['headingId'])->toStartWith('heading-');
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
