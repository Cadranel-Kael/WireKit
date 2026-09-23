import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import focus from '@alpinejs/focus';
import anchor from '@alpinejs/anchor';
import Tooltip from '@ryangjchandler/alpine-tooltip';
import clipboard from '@ryangjchandler/alpine-clipboard';
import intersect from '@alpinejs/intersect';

Alpine.plugin(intersect);
Alpine.plugin(focus);
Alpine.plugin(collapse);
Alpine.plugin(Tooltip);
Alpine.plugin(clipboard);
Alpine.start();
