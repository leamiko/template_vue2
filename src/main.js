import Vue from 'vue';
import store from './store'
import router from './router'
import App from './components/App';
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import '../theme/index.css'

Vue.use(ElementUI, { locale });
window.vm=new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});