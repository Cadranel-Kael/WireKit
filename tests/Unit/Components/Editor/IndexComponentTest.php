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
use WireKit\View\Components\Editor\Index;

describe('Editor\\Index', function () {

    describe('defaults', function () {
        it('has an empty toolbar by default', function () {
            $editor = new Index();

            expect($editor->toolbar)->toBe('');
        });

        it('has an empty label by default', function () {
            $editor = new Index();

            expect($editor->label)->toBe('');
        });
    });

    describe('resolveId()', function () {
        it('prefers an explicit id', function () {
            $editor = new Index(id: 'bio');

            expect($editor->resolveId())->toBe('bio');
        });

        it('falls back to the wire:key prefixed with editor- so morphs keep the id stable', function () {
            $editor = new Index();

            expect($editor->resolveId('bio'))->toBe('editor-bio');
        });

        it('prefers an explicit id over the wire:key', function () {
            $editor = new Index(id: 'explicit');

            expect($editor->resolveId('bio'))->toBe('explicit');
        });

        it('prefixes the fallback id with editor-', function () {
            $editor = new Index();

            expect($editor->resolveId())->toStartWith('editor-');
        });

        it('generates unique ids across instances', function () {
            $a = new Index();
            $b = new Index();

            expect($a->resolveId())->not->toBe($b->resolveId());
        });
    });

    describe('toolbarItems()', function () {
        it('splits a space-separated toolbar string into items', function () {
            $editor = new Index(toolbar: 'bold italic underline');

            expect($editor->toolbarItems())->toBe(['bold', 'italic', 'underline']);
        });

        it('converts | into a separator item', function () {
            $editor = new Index(toolbar: 'bold | italic');

            expect($editor->toolbarItems())->toBe(['bold', 'separator', 'italic']);
        });

        it('converts - into a spacer item', function () {
            $editor = new Index(toolbar: 'bold - italic');

            expect($editor->toolbarItems())->toBe(['bold', 'spacer', 'italic']);
        });

        it('handles separators and spacers together', function () {
            $editor = new Index(toolbar: 'bold italic | bullet ordered - undo redo');

            expect($editor->toolbarItems())->toBe([
                'bold', 'italic', 'separator', 'bullet', 'ordered', 'spacer', 'undo', 'redo',
            ]);
        });

        it('returns a single empty-string item for an empty toolbar', function () {
            $editor = new Index(toolbar: '');

            expect($editor->toolbarItems())->toBe(['']);
        });
    });

    describe('resolveId() with the attribute bag', function () {
        it('reads the wire:key Blade applies to the bag after render()', function () {
            $editor = new Index();
            $editor->withAttributes(['wire:key' => 'bio']);

            expect($editor->resolveId())->toBe('editor-bio');
        });

        it('prefers an explicit id over the wire:key from the bag', function () {
            $editor = new Index(id: 'explicit');
            $editor->withAttributes(['wire:key' => 'bio']);

            expect($editor->resolveId())->toBe('explicit');
        });

        it('memoizes the resolved id so it stays stable across calls', function () {
            $editor = new Index();

            expect($editor->resolveId())
                ->toBe($editor->resolveId())
                ->toBe($editor->id);
        });

        it('resolves without an attribute bag, as during render()', function () {
            $editor = new Index();

            expect($editor->attributes)->toBeNull()
                ->and($editor->resolveId())->toStartWith('editor-');
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
