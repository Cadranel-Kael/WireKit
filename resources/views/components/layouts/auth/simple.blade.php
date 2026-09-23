<!DOCTYPE html>
<html lang="en">
    <head>
        @isset($head)
            @yield('head')
        @endisset

        @if (view()->exists('partials.head'))
            @include('partials.head')
        @endif
    </head>
    <body class="bg-primary/10 flex min-h-screen min-w-screen items-center justify-center">
        <div class="bg-card border-border rounded-xl border p-10 shadow md:min-w-sm">
            @isset($title)
                <div class="text-3xl font-bold">
                    {{ $title }}
                </div>
            @endisset

            @isset($subtitle)
                <div class="text-muted-foreground">
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
