<template>
    <nav class="admin_nav">
        <div class="company_logo">
            <a href="/"><img src="../assets/logo.png" /></a>
        </div>
        <el-menu unique-opened class="admin_menu" @open="handleOpen" @close="handleClose">
            <el-menu-item index="1">
                <router-link :to="{ name: 'user' }" ><i class="el-icon-setting"></i>Usuarios</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link :to="{ name: 'user_alert' }" ><i class="el-icon-setting"></i>Usuarios en Alerta</router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link :to="{ name: 'categories' }" ><i class="el-icon-setting"></i>Categorías</router-link>
            </el-menu-item>
            <el-menu-item index="4">
                <router-link :to="{ name: 'organization' }" ><i class="el-icon-setting"></i>Organizaciones</router-link>
            </el-menu-item>
            <el-menu-item index="5">
                <router-link :to="{ name: 'establishment' }" ><i class="el-icon-setting"></i>Establecimientos</router-link>
            </el-menu-item>
            <el-menu-item index="6">
                <router-link :to="{ name: 'promotion' }" ><i class="el-icon-setting"></i>Promociones</router-link>
            </el-menu-item>
            <el-menu-item index="7">
                <router-link :to="{ name: 'embassy' }" ><i class="el-icon-setting"></i>Embajadas</router-link>
            </el-menu-item>
            <template v-if="role==1">
                <el-submenu index="10">
                    <template slot="title"><i class="el-icon-menu"></i>Administradores</template>
                    <el-menu-item-group title="">
                        <el-menu-item index="5-1"><router-link :to="{ name: 'admin' }" >Listar administradores</router-link></el-menu-item>
                        <el-menu-item index="5-2"><router-link :to="{ name: 'admin_new' }" >Crear administrador</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>
         </el-menu>
    </nav>
</template>

<script>
	export default {
	props: ['role'],
		methods: {
          handleOpen(key, keyPath) {
            //console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            //console.log(key, keyPath);
          }
        }
	}
</script>

<style lang="stylus">
    @import "../stylus/base/_config.styl"
    @import "../stylus/base/_resources.styl"
    .el-submenu
        .el-menu-item
            a
                padding: 0 40px !important
            padding 0 !important
    nav.admin_nav
        box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.15)
        position: fixed
        top: 0
        padding: 15px 0 0px
        background-color: white
        z-index: 10001
        height: 100%
        width: 205px
        overflow: auto;
        .company_logo
            margin 0 auto
            height 211px
            padding-top 10px
            text-align: center
            border-bottom: 1px solid rgba(255, 255, 255, 0.26)
    .admin_menu
        background white
        .el-menu-item
            a
                display: inline-block
                height: 56px
                width: 100%
                cursor pointer
            &.is-active
                & > a
                    color: $color1

</style>
