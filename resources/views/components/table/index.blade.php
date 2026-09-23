<table {{ $attributes->class('table-fixed overflow-x-auto text-sm [:where(&)]:min-w-full') }}>
    {{ $slot }}
</table>
