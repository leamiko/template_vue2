<template>
    <div class="modal_mask" @click="close" transition="fade" v-show="showModal">
        <div class="modal_container " @click.stop>
            <slot></slot>
            <button @click="close" class="btn_close">x</button>
        </div>
    </div>
</template>
<script>
  export default {
  props: ['showModal'],
  methods: {
    close: function () {
        this.$emit('close')
    }
  },
  mounted: function () {
    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 27) {
        this.close()
      }
    });
  }
  }
</script>

<style lang="stylus">
    @import "../stylus/libs/jeet/index.styl"
    @import "../stylus/base/_config.styl"
    .modal
        &_mask
            position: fixed
            z-index: 10002
            top: 0
            left: 0
            width: 100%
            height: 100%
            background-color: rgba(38, 42, 54, 0.27)
            transition: opacity .3s ease
        &_body
            padding: 20px 30px
            font-size 14px

        &_footer
            padding: 8px 30px
            background-color: #FAFBFD
            border-top: 1px solid #e6e6e6
            font-size 14px
            cf()
        &_header
            padding: 14px 30px
            border-bottom: 1px solid #e6e6e6
        &_container
            max-width: 762px
            margin-top: 7%
            background-color: #fff
            border-radius: 2px
            box-shadow: 0 2px 8px rgba(0,0,0,0.33)
            transition: all 0.3s ease
            position: absolute
            display: inline-block
            margin-left: auto
            margin-right: auto
            left: 0
            right: 0
            .btn_close
                position: absolute
                top: 10px
                right: 10px
                background: none
                border: none
                font-size: 20px
                cursor: pointer
                width: 30px
                height: 30px
                color gray

</style>
