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

        $this->loadViewsFrom(__DIR__.'/../resources/views', 'livewire-ui-kit');

        Blade::component('badge', View\Components\Badge::class);
        Blade::component('sidebar', View\Components\Sidebar::class);
        Blade::component('button', View\Components\Button::class);
        Blade::component('menu-item', View\Components\MenuItem::class);
        Blade::component('sub-menu', View\Components\SubMenu::class);
        Blade::component('search', View\Components\Search::class);
        Blade::component('tabs', View\Components\Tabs::class);
        Blade::component('tab', View\Components\Tab::class);
        Blade::component('alert', View\Components\Alert::class);
        Blade::component('table', View\Components\Table::class);
        Blade::component('icon', View\Components\Icon::class);
        Blade::component('input', View\Components\Input::class);
        Blade::component('layouts.auth.simple', View\Components\Layouts\Auth\Simple::class);
        Blade::component('checkbox', View\Components\Checkbox::class);
        Blade::component('select', View\Components\Select::class);
        Blade::component('radio', View\Components\Radio::class);
    }
}
