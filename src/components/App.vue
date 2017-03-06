<template>
  <div id="app">
    <template v-if="!loggedIn" >
      <app-login></app-login>
    </template>
    <template v-else>
      <template v-if="$route.matched.length">
        <app-header :user="user"></app-header>
        <app-main :role="role"></app-main>
        <router-view></router-view>
      </template>
    </template>
  </div>
</template>
<script>
import AppLogin from '../views/auth/login';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import $ from 'jquery'
import { mapState } from 'vuex'
import store from './../store'

export default {
  components: {
    AppLogin,AppHeader,AppMain
  },
  computed: mapState({
    user: state => state.auth.user,
    role: state => state.auth.role,
    loggedIn: state => state.auth.loggedIn
  }),
  methods: {
    idletime () {
      let t;
      let self=this;
      window.onload = resetTimer;
      document.onmousemove = resetTimer;
      document.onkeypress = resetTimer;

      function logout(){
        if(store.state.auth.loggedIn){
             console.log('Su sesión ha expirado');
              self.$alert('Su sesión ha expirado', 'Alerta', {
              confirmButtonText: 'OK',
              callback: action => {
                self.$router.push({ name: 'logout'})
              }
            });
        }
      }
      function resetTimer() {
          clearTimeout(t);
          t = setTimeout(logout, 15*60*1000)
          // 1000 milisec = 1 sec
      }
    }
  },
  mounted () {
    let self=this;
    this.idletime();
    console.log(store.getters.isExpired);
    if(store.getters.isExpired){
      self.$router.push({ name: 'logout'})
    }
  },
  updated () {
  let self=this;
    if(store.getters.isExpired){
      self.$router.push({ name: 'logout'})
    }
  }
}
</script>
<style lang="stylus">
  @import "../stylus/base/_config.styl"
  @import "../stylus/base/_fonts.styl"
  @import "../stylus/base/_form.styl"
  @import "../stylus/base/_form_validations.styl"
  @import "../stylus/base/_normalize.styl"
  @import "../stylus/base/_resources.styl"
  @import "../stylus/base/_tables.styl"
  @import "../stylus/base/_reset.styl"
</style>