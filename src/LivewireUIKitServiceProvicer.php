<?php

namespace CadranelKael\LivewireUIKit\ServiceProvider;

use Illuminate\Support\ServiceProvider;

class LivewireUIKitServiceProvicer extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        dd('test');
    }
}
