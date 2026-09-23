<?php

use WireKit\View\Components\Editor\Toolbar\Basic;
use WireKit\View\Components\Editor\Toolbar\Blockquote;
use WireKit\View\Components\Editor\Toolbar\Bold;
use WireKit\View\Components\Editor\Toolbar\Bullet;
use WireKit\View\Components\Editor\Toolbar\Codeblock;
use WireKit\View\Components\Editor\Toolbar\Highlight;
use WireKit\View\Components\Editor\Toolbar\Italic;
use WireKit\View\Components\Editor\Toolbar\Link;
use WireKit\View\Components\Editor\Toolbar\Ordered;
use WireKit\View\Components\Editor\Toolbar\Redo;
use WireKit\View\Components\Editor\Toolbar\Separator;
use WireKit\View\Components\Editor\Toolbar\Spacer;
use WireKit\View\Components\Editor\Toolbar\Strike;
use WireKit\View\Components\Editor\Toolbar\Subscript;
use WireKit\View\Components\Editor\Toolbar\Superscript;
use WireKit\View\Components\Editor\Toolbar\Underline;
use WireKit\View\Components\Editor\Toolbar\Undo;

describe('Editor\Toolbar prop-less buttons', function () {
    $classes = [
        Basic::class,
        Blockquote::class,
        Bold::class,
        Bullet::class,
        Codeblock::class,
        Highlight::class,
        Italic::class,
        Link::class,
        Ordered::class,
        Redo::class,
        Separator::class,
        Spacer::class,
        Strike::class,
        Subscript::class,
        Superscript::class,
        Underline::class,
        Undo::class,
    ];

    foreach ($classes as $class) {
        it("can instantiate {$class} with no arguments", function () use ($class) {
            expect(new $class())->toBeInstanceOf($class);
        });
    }
});
