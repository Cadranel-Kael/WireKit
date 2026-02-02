<?php

namespace WireKit;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class WireKitServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void {}

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        include_once __DIR__.'/helpers.php';

        $this->registerBladeComponent();
        $this->compileBladeComponent();
    }

    /**
     * Register the Views and sets the component namespace.
     */
    protected function registerBladeComponent(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'wire-kit');
        Blade::componentNamespace('WireKit\\View\\Components', 'wire');
    }

    /**
     * Precompiles the blade components to be prepared for compilation from blade.
     */
    protected function compileBladeComponent(): void
    {
        $compiler = new WireKitTagCompiler(
            app('blade.compiler')->getClassComponentAliases(),
            app('blade.compiler')->getClassComponentNamespaces(),
            app('blade.compiler')
        );

        app()->bind('wirekit.compiler', fn () => $compiler);

        app('blade.compiler')->precompiler(function ($in) use ($compiler) {
            return $compiler->compile($in);
        });
    }
}
