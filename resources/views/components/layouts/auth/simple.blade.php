<!doctype html>
<html lang="en">
<head>
    @isset($head)
        @yield('head')
    @endisset
    @if(view()->exists('partials.head'))
        @include('partials.head')
    @endif
</head>
<body class="min-w-screen min-h-screen bg-primary/10 flex items-center justify-center">
<div class="bg-base-100 md:min-w-sm shadow border border-base-200 p-10 rounded-xl">
    @isset($title)
        <div class="text-3xl font-bold">
            {{ $title }}
        </div>
    @endisset
    @isset($subtitle)
        <div class="text-base-content/60">
            {{ $subtitle }}
        </div>
    @endisset
    <div>
        {{ $slot }}
    </div>
    @isset($actions)
        <div class="mt-8">
            {{ $actions }}
        </div>
    @endisset
    @isset($footer)
        <div class="mt-8">
            {{ $footer }}
        </div>
    @endisset
</div>
</body>
</html>
