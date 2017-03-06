<template>
    <div class="widget">
        <div class="widget_section">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="stylus">
    .widget
        background-color: #fff
        border-radius: 5px
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.22)
        padding: 40px 25px
        position: relative
        min-height: 418px
        font-size: 16px
        text-align left

        .widget_section
            h2
                margin-bottom: 20px
                font-weight: 700
                color: #4b4c4c
                text-transform uppercase
</style>