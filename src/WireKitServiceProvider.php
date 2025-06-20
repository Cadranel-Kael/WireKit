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
        include_once(__DIR__.'/helpers.php');

        $this->loadViewsFrom(__DIR__.'/../resources/views', 'wire-kit');

        Blade::component('sidebar', View\Components\Sidebar::class);
        Blade::component('menu-item', View\Components\MenuItem::class);
//        Blade::component('sub-menu', View\Components\SubMenu::class);
        Blade::component('search', View\Components\Search::class);
//        Blade::component('tabs', View\Components\Tabs::class);
//        Blade::component('tab', View\Components\Tab::class);
        Blade::component('icon', View\Components\Icon::class);
        Blade::component('input', View\Components\Input::class);
        Blade::component('layouts.auth.simple', View\Components\Layouts\Auth\Simple::class);
        Blade::component('checkbox', View\Components\Checkbox\Index::class);
        Blade::component('checkbox.group', View\Components\Checkbox\Group::class);
        Blade::component('select', View\Components\Select\Index::class);
        Blade::component('select.option', View\Components\Select\Option::class);
        Blade::component('radio', View\Components\Radio\Index::class);
        Blade::component('radio.group', View\Components\Radio\Group::class);
        Blade::component('label', View\Components\Label::class);
        Blade::component('field', View\Components\Field::class);
        Blade::component('fieldset', View\Components\Fieldset::class);
        Blade::component('legend', View\Components\Legend::class);

        Blade::component('accordion', View\Components\Accordion\Index::class);
        Blade::component('accordion.item', View\Components\Accordion\Item::class);
        Blade::component('accordion.heading', View\Components\Accordion\Heading::class);
        Blade::component('accordion.content', View\Components\Accordion\Content::class);

        Blade::component('alert', View\Components\Alert\Index::class);
        Blade::component('alert.heading', View\Components\Alert\Heading::class);
        Blade::component('alert.description', View\Components\Alert\Description::class);

        Blade::component('avatar', View\Components\Avatar\Index::class);

        Blade::component('badge', View\Components\Badge\Index::class);
        Blade::component('badge.close', View\Components\Badge\Close::class);

        Blade::component('button', View\Components\Button\Index::class);
        Blade::component('button.group', View\Components\Button\Group::class);

        Blade::component('breadcrumbs', View\Components\Breadcrumbs\Index::class);
        Blade::component('breadcrumbs.item', View\Components\Breadcrumbs\Item::class);

        Blade::component('context', View\Components\Context::class);

        Blade::component('dropdown', View\Components\Dropdown\Index::class);
        Blade::component('dropdown.button', View\Components\Dropdown\Button::class);
        Blade::component('dropdown.menu', View\Components\Dropdown\Menu::class);
        Blade::component('dropdown.item', View\Components\Dropdown\Item::class);

        Blade::component('menu', View\Components\Menu\Index::class);
        Blade::component('menu.item', View\Components\Menu\Item::class);

        Blade::component('table', View\Components\Table\Index::class);
        Blade::component('table.columns', View\Components\Table\Columns::class);
        Blade::component('table.column', View\Components\Table\Column::class);
        Blade::component('table.rows', View\Components\Table\Rows::class);
        Blade::component('table.row', View\Components\Table\Row::class);
        Blade::component('table.cell', View\Components\Table\Cell::class);

        Blade::component('tooltip', View\Components\Tooltip\Index::class);
    }
}
