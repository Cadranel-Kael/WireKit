<div
    {{ $attributes->class('relative') }}
    x-data="{
        show: false,
        currentItem: null,
        currentIndex: null,
        menuItems: Array.from($refs.menu.querySelectorAll('[data-wire-item]')),
        resetItems() {
            this.menuItems.forEach((item) => {
                item.tabIndex = -1
                item.dataset.wireState = ''
            })
        },
        sibling(index) {
            this.resetItems()

            if (! this.menuItems || this.menuItems.length === 0) return

            if (this.currentIndex === null) {
                this.currentIndex = 0
            } else {
                this.currentIndex =
                    (this.currentIndex + index + this.menuItems.length) %
                    this.menuItems.length
            }

            this.currentItem = this.menuItems[this.currentIndex]
            this.currentItem.dataset.wireState = 'active focus'
            this.currentItem.focus()
            this.currentItem.tabIndex = 0
        },
        next() {
            this.sibling(1)
        },
        prev() {
            this.sibling(-1)
        },
        goTo(e) {
            this.resetItems()

            this.currentItem = e.target

            this.currentIndex = this.menuItems.indexOf(this.currentItem)

            this.currentItem.dataset.wireState = 'active focus'
            this.$refs.menu.ariaActivedescendant = this.currentItem.dataset.wireItem
            this.currentItem.focus()
            this.currentItem.tabIndex = 0
        },
    }"
    x-on:keydown.escape="show = false"
    x-on:keydown.up.prevent="prev"
    x-on:keydown.down.prevent="next"
>
    {{ $slot }}
</div>
