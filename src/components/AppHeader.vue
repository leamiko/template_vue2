<template>
    <div>
        <header>
            <ul class="float_right">
                <li >
                    <el-dropdown>
                      <span class="el-dropdown-link">
                        {{ user }}<i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <router-link :to="{ name: 'profile' }" >Mi Perfil</router-link>
                            </el-dropdown-item>
                            <el-dropdown-item >
                                <router-link :to="{ name: 'logout' }" >Cerrar Sesión</router-link>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            </ul>
        </header>
    </div>
</template>

<script>
    export default {
  props: ['user'],
  methods: {
    close: function () {
    }
  },
  mounted: function () {

  }
  }
</script>

<style lang="stylus">
    @import "../stylus/base/_config.styl"
    @import "../stylus/base/_resources.styl"
    @import "../stylus/libs/jeet/index.styl"
    .el-dropdown-menu__item
        a
            display: inline-block
            width: 100%
    header
        background-image url('../assets/bg_login.png')
        color white
        height 104px
        padding-left 220px
        padding-right 6%
        position: fixed
        width: 100%
        top: 0
        left: 0
        z-index: 10001
        box-shadow: 4px 3px 14px rgba(0, 0, 0, 0.29)
        .nav_logo
            display: inline-block
            opacity: 0.7
            line-height: 103px
            &:hover
                opacity 1
        h1
            font-size: 24px
            color: white
            line-height: 104px
            display inline-block
        ul
            display inline-block
            li
                display inline-block
                .el-dropdown-link
                    min-width: 121px
                    padding: 0px 22px
                    display: inline-block
                    color: #ffffff
                    line-height: 104px
                    cursor: pointer
                    text-decoration: none
                    background: #2e3127
                    box-shadow: black 2px -12px 46px


</style>
