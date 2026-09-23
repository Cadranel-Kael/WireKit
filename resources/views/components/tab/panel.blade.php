@aware(['groupId'])
<div
    data-wire-tab-panel
    role="tabpanel"
    id="panel-{{ $name }}-{{ $groupId }}"
    aria-labelledby="tab-{{ $name }}-{{ $groupId }}"
    {{ $attributes }}
>
    {{ $slot }}
</div>
