import Vue from 'vue'
import VueRouter from 'vue-router';
import store from './../store'

Vue.use(VueRouter);

function requireAuth (to, from, next) {
    if (!store.state.auth.loggedIn) {
        next({
            path: '/login'
        })
    } else {
        if(to.meta.roles.indexOf(parseInt(store.state.auth.role))>-1){
            next()
        }else{
            next('/')
        }
    }
}
function redirectLogin(){
    return { name: 'user' }
}

const ResetPassword = resolve => require(['./../views/auth/login.vue'], resolve);
const Profile = resolve => require(['./../views/profile/profile.vue'], resolve);

const Admin = resolve => require(['./../views/admin/admin.vue'], resolve);
const AdminList = resolve => require(['./../views/admin/list.vue'], resolve);
const AdminNew = resolve => require(['./../views/admin/new.vue'], resolve);

const User = resolve => require(['./../views/user/user.vue'], resolve);
const UserList = resolve => require(['./../views/user/list.vue'], resolve);
const UserAlert = resolve => require(['./../views/user/list_alert.vue'], resolve);
const UserShow = resolve => require(['./../views/user/show.vue'], resolve);


const Category = resolve => require(['./../views/category/category.vue'], resolve);
const CategoryList = resolve => require(['./../views/category/list.vue'], resolve);
const CategoryNew = resolve => require(['./../views/category/new.vue'], resolve);

const Organization = resolve => require(['./../views/organization/organization.vue'], resolve);
const OrganizationList = resolve => require(['./../views/organization/list.vue'], resolve);
const OrganizationCreate = resolve => require(['./../views/organization/new.vue'], resolve);

const Embassy = resolve => require(['./../views/embassy/embassy.vue'], resolve);
const EmbassyList = resolve => require(['./../views/embassy/list.vue'], resolve);
const EmbassyCreate = resolve => require(['./../views/embassy/new.vue'], resolve);


const Establishment = resolve => require(['./../views/establishment/establishment.vue'], resolve);
const EstablishmentList = resolve => require(['./../views/establishment/list.vue'], resolve);
const EstablishmentCreate = resolve => require(['./../views/establishment/new.vue'], resolve);

const Promotion = resolve => require(['./../views/promotion/promotion.vue'], resolve);
const PromotionList = resolve => require(['./../views/promotion/list.vue'], resolve);
const PromotionCreate = resolve => require(['./../views/promotion/new.vue'], resolve);

export default  new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes: [
        { path: '/', redirect: redirectLogin},
        { path: '/admin',component: Admin,
            children: [
                { path: '', name: 'admin',component: AdminList ,meta:{roles:[1]},beforeEnter: requireAuth},
                { path: 'new', name: 'admin_new',component: AdminNew ,meta:{roles:[1]},beforeEnter: requireAuth},
                { path: 'edit/:id?', name: 'admin_edit',component: AdminNew ,meta:{roles:[1]},beforeEnter: requireAuth}
            ]
        },
        { path: '/recover-password',name: 'recover_password',component: ResetPassword},
        { path: '/profile',name: 'profile', component: Profile,  beforeEnter: requireAuth,meta:{roles:[1,2]}},
        { path: '/user',component: User,
            children: [
                { path: '', name: 'user',component: UserList ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'show/:id?', name: 'user_show',component: UserShow ,meta:{roles:[1,2]},beforeEnter: requireAuth}
            ]
        },
        { path: '/user-alert',component: User,
            children: [
                { path: '', name: 'user_alert',component: UserAlert ,meta:{roles:[1,2]},beforeEnter: requireAuth}
            ]
        },
        { path: '/category',component: Category,
            children: [
                { path: '', name: 'categories',component: CategoryList ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'edit/:id?', name: 'categories_edit',component: CategoryNew ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'new', name: 'categories_new',component: CategoryNew ,meta:{roles:[1,2]},beforeEnter: requireAuth}
            ]
        },
        { path: '/organization',component: Organization,
            children: [
                { path: '', name: 'organization',component: OrganizationList ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'edit/:id?', name: 'organization_edit',component: OrganizationCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'new', name: 'organization_create',component: OrganizationCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth}
            ]
        },
        { path: '/embassy',component: Embassy,
            children: [
                { path: '', name: 'embassy',component: EmbassyList ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'edit/:id?', name: 'embassy_edit',component: EmbassyCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'new', name: 'embassy_create',component: EmbassyCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth}
            ]
        },
        { path: '/establishment',component: Establishment,
            children: [
                { path: '', name: 'establishment',component: EstablishmentList ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'edit/:id?', name: 'establishment_edit',component: EstablishmentCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'new', name: 'establishment_create',component: EstablishmentCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth}
            ]
        },
        { path: '/promotion',component: Promotion,
            children: [
                { path: '', name: 'promotion',component: PromotionList ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'edit/:id?', name: 'promotion_edit',component: PromotionCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth},
                { path: 'new', name: 'promotion_create',component: PromotionCreate ,meta:{roles:[1,2]},beforeEnter: requireAuth}
            ]
        },
        { path: '/logout',name: 'logout',
            beforeEnter (to, from, next) {
                localStorage.clear();
                store.commit('changeStateLogin',false);
                next('/')
            }
        }
    ]
});