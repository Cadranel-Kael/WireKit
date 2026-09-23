<div
    x-data="{
        copied: false,
        copy() {
            navigator.clipboard.writeText(this.$refs.code.innerText)
            this.copied = true
            setTimeout(() => (this.copied = false), 2000)
        },
    }"
    {{ $attributes->class('border-border bg-card text-card-foreground relative flex max-h-80 overflow-hidden rounded-b-2xl border-t pb-1.5') }}
>
    <template x-if="!copied">
        <wire:button
            class="absolute top-3 right-4 z-10 !px-0"
            size="sm"
            x-on:click="copy"
            :tooltip="__('Copy to clipboard')"
            icon="copy"
        />
    </template>

    <template x-if="copied">
        <wire:button
            size="sm"
            x-on:click="copy"
            :tooltip="__('Copied')"
            class="absolute top-3 right-4 z-10 !px-0"
            icon="check"
        />
    </template>

    <div class="relative flex max-h-80 overflow-hidden">
        <div class="max-h-80 w-full overflow-auto text-sm" style="scrollbar-gutter: stable; scrollbar-width: thin">
            <pre class="min-w-max"><code x-ref="code" class="language-html">{{ $slot }}</code></pre>
        </div>
    </div>
</div>
