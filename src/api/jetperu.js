import $ from 'jquery'
import config from './config'
import store from './../store'
import {Notification} from 'element-ui'

function checkState(res, xhr) {
    if (xhr.status != 200) {
        let msg = '';
        if (res.data_error.length) {
            for (let i = 0, j = res.data_error.length; i < j; i++) {
                msg = res.data_error[i].msg + msg + '\n';
            }
        } else {
            msg = res.msg
        }
        Notification.error({
            title: 'Alerta',
            message: msg,
            type: 'warning'
        });
        return false
    } else {
        return true
    }
}

export default {
    login (email, password, cb = ()=> {
    }, cbBefore = ()=> {
    }, cbComplete = ()=> {
    }) {
        $.ajax({
            method: 'POST',
            url: config.auth.login,
            contentType: "application/json",
            data: JSON.stringify({
                email: email,
                password: password
            }),
            beforeSend: function () {
                cbBefore()
            },
            complete: function () {
                cbComplete()
            },
            success: function (res, status, xhr) {
                if(checkState(res, xhr)){
                    cb(true,res); //retorno como lo necesito en la vista
                }else{
                    cb(false,res)
                }
            }
        });
    },
    recoverPassword(
        email, cb = ()=> {
    }, cbBefore = ()=> {
    }, cbComplete = ()=> {
    }
    ){
        $.ajax({
            method: 'POST',
            url: config.auth.recoverPassword,
            contentType: "application/json",
            data: JSON.stringify({
                email: email
            }),
            beforeSend: function () {
                cbBefore()
            },
            complete: function () {
                cbComplete()
            },
            success: function (res, status, xhr) {
                if(checkState(res, xhr)){
                    cb(true,res);
                }else{
                    cb(false,res)
                }
            }
        });
    },
    resetPassword(
        password,
        token,
        cb = ()=> {
        }, cbBefore = ()=> {
        }, cbComplete = ()=> {
        }
    ){
        $.ajax({
            method: 'POST',
            url: config.auth.resetPassword,
            contentType: "application/json",
            data: JSON.stringify({
                password: password,
                token:token
            }),
            beforeSend:function(){
                cbBefore()
            },
            complete:function(){
                cbComplete()
            },
            success: function(res, status, xhr) {
                if(checkState(res, xhr)){
                    cb(true,res);
                }else{
                    cb(false,res)
                }
            }
        });
    },
    admin(
        method,
        url,
        data=null,
        cb = ()=> {
        }, cbBefore = ()=> {
        }, cbComplete = ()=> {
        }
    ){
        $.ajax({
            method: method.toUpperCase(),
            url: url ,
            headers: { 'Authorization': store.getters.getToken},
            contentType: "application/json",
            data: (data!=null)?JSON.stringify(data):'',
            beforeSend:function(){
                cbBefore()
            },
            complete:function(){
                cbComplete()
            },
            success: function(res, status, xhr) {
                if(checkState(res, xhr)){
                    cb(true,res);
                }else{
                    cb(false,res)
                }
            }
        });

    }

}