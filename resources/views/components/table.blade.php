<table
        class="w-full table-fixed"
        x-data="{
            selected: @entangle($attributes->wire('model')),
            tableIds: @js($getTableIds()),
            toggleCheckAll(checked) {
                checked ? this.pushIds() : this.removeIds();
            },
            pushIds() {
                this.$nextTick(() => {
                    this.selected.push(...this.tableIds.filter(i => !this.selected.includes(i)));
                });
            },
            removeIds() {
                this.$nextTick(() => {
                    this.selected = this.selected.filter(i => !this.tableIds.includes(i));
                });
            },
            toggleCheck() {
                this.$nextTick(() => {
                    if (this.selected.length === this.tableIds.length) {
                        $refs.checkAllCheckbox.indeterminate = false;
                        $refs.checkAllCheckbox.checked = true;
                    } else if (this.selected.length === 0) {
                        $refs.checkAllCheckbox.indeterminate = false;
                        $refs.checkAllCheckbox.checked = false;
                    } else {
                        this.selected.length > 0 ? $refs.checkAllCheckbox.indeterminate = true : $refs.checkAllCheckbox.indeterminate = false;
                    }
                });
            }
        }"
>
    <thead>
    <tr>
        @if($selectable)
            <th class="py-3 px-4 border-b border-base-content/10 w-1 whitespace-nowrap">
                <x-checkbox class="w-fit" x-ref="checkAllCheckbox" :label="__('Check all')" label-sr-only @click="toggleCheckAll($el.checked)"/>
            </th>
        @endif
        @foreach($headers as $header)
            <th
                    @if(array_key_exists('sortable', $header))
                        @click="$wire.set('sortBy', {column: '{{ $getSort($header)['column'] }}', direction: '{{ $getSort($header)['direction'] }}'})"
                    @endif
                    @class([
                        'py-3 font-medium px-2 border-b text-left border-base-content/10 overflow-x-ellipsis',
                        'cursor-pointer' => array_key_exists('sortable', $header),
                        $getClass($header),
                    ])
            >
                <div
                    @class([
                        'flex gap-2 group items-center whitespace-nowrap w-fit rounded p-1',
                        'hover:bg-base-200' => array_key_exists('sortable', $header),
                    ])
                >
                    {{ $header['label'] }}
                    @if(array_key_exists('sortable', $header))
                        @if($isSortedBy($header))
                            <x-dynamic-component
                                    :component="'heroicon-' . ($getSort($header)['direction'] == 'asc' ? 'o-arrow-small-down' : 'o-arrow-small-up')"
                                    @class([
                                        '!w-5 !h-5',
                                        'group-hover:opacity-100 transition-opacity' => array_key_exists('sortable', $header),
                                    ])
                            />
                        @else
                            <x-dynamic-component
                                    component="heroicon-o-arrows-up-down"
                                    @class([
                                        '!w-5 !h-5 opacity-0',
                                        'group-hover:opacity-100 transition-opacity' => array_key_exists('sortable', $header),
                                    ])
                            />
                        @endif
                    @endisset
                </div>
            </th>
        @endforeach
    </tr>
    </thead>
    <tbody>
    @foreach($rows as $row)
        @php($id = $row['id'])
        <tr
                class="w-full group"
                wire:key="row-{{ $id }}"
        >
            @if($selectable)
                <td
                        @class([
                            'px-4 py-3 border-b border-base-content/10 w-1 whitespace-nowrap',
                            'group-hover:bg-base-200' => $link
                        ])
                >
                    <input
                            type="checkbox"
                            class="checkbox checkbox-sm checkbox-primary"
                            value="{{ $id }}"
                            x-model="selected"
                            @click="toggleCheck"
                    >
                </td>
            @endif
            @foreach($headers as $header)
                <td
                        @class([
                            'border-b border-base-content/10',
                            key_exists('class', $header) ? $header['class'] : '',
                            'px-2 py-3' => !$link,
                            'group-hover:bg-base-200' => $link,
                        ])
                >
                    @if($link)
                        <a class="block text-nowrap overflow-x-hidden text-ellipsis px-2 py-3 h-full w-full"
                           href="{{ $getRowLink($row) }}">
                            @endif
                            {{ $format($header, data_get($row, $header['key'])) }}
                            @if($link)
                        </a>
                    @endif
                </td>
            @endforeach
        </tr>
    @endforeach
    </tbody>
</table>
