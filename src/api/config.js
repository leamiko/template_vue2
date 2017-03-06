let domain='http://local.jetperu.pe';
export default {
    domain:domain,
    auth:{
        login: domain+"/admin/v1/login",
        recoverPassword: domain+"/admin/v1/password/email",
        resetPassword: domain+"/admin/v1/password/recover"
    },
    profile:{
        list:domain+"/admin/v1/profile"
    },
    user:{
        list:domain+"/admin/v1/user",
        list_alert:domain+"/admin/v1/alert",
    },
    admin:{
        list:domain+"/admin/v1/admin"
    },
    organization:{
        list:domain+"/admin/v1/organization"
    },
    embassy:{
        list:domain+"/admin/v1/embassy"
    },
    ubigeo:{
        list:domain+"/admin/v1/ubigeo",
    },
    category:{
        list:domain+"/admin/v1/category"
    },
    establishment:{
        list:domain+"/admin/v1/establishment",
        category:domain+"/admin/v1/establishment/category"
    },
    promotion:{
        list:domain+"/admin/v1/promotion",
        establishment:domain+"/admin/v1/promotion/establishment",
        category:domain+"/admin/v1/promotion/category",
        card:domain+"/admin/v1/promotion/card"
    },
}