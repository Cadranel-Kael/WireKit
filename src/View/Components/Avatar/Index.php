<?php

namespace WireKit\View\Components\Avatar;

use Illuminate\View\Component;

class Index extends Component {
    public function __construct()
    {
    }

    public function render() {
        return view('wire-kit::components.avatar.index');
    }
}
