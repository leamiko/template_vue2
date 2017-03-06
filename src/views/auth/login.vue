<template>
    <div class="login_background">
        <div class="bg_middle">

        </div>
        <div class="login_ctn">
                <div class="ctn_form_logo">
                    <img src="../../assets/logo.png">
                </div>
                <template v-if="$route.name=='recover_password'">
                    <el-form v-on:submit.prevent="resetPassword" :model="ruleFormResetPasword" :rules="rulesResetPasword" ref="ruleFormResetPasword" v-loading="ruleFormResetPasword.loading" >
                        <el-form-item label="Contraseña" prop="pass">
                            <el-input
                                    type='password'
                                    autocomplete="off"
                                    placeholder="contraseña"
                                    v-model="ruleFormResetPasword.pass">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="Confirmación de contraseña" prop="passConfirm">
                            <el-input
                                    type='password'
                                    autocomplete="off"
                                    placeholder="contraseña"
                                    v-model="ruleFormResetPasword.passConfirm">
                            </el-input>
                        </el-form-item>
                        <br>
                        <div class="text_center">
                            <el-button  @click="resetPassword" size="large" type="success">Cambiar contraseña</el-button>
                        </div>
                        <br>
                    </el-form>
                </template>
                <template v-else>
                    <div v-if="!activeRecover"  class="content_login">
                        <el-form v-on:submit.prevent="login" :model="ruleFormLogin" :rules="rulesLogin" ref="ruleFormLogin" v-loading="ruleFormLogin.loading" >
                            <el-form-item label="Correo" prop="email">
                                <el-input
                                        type='text'
                                        autocomplete="off"
                                        placeholder="email"
                                        v-model="ruleFormLogin.email">
                                </el-input>
                            </el-form-item>
                            <el-form-item label="Contraseña" prop="pass">
                                <el-input
                                        type='password'
                                        autocomplete="off"
                                        placeholder="contraseña"
                                        v-model="ruleFormLogin.pass">
                                </el-input>
                            </el-form-item>
                            <br>
                            <div class="text_center">
                                <el-button @click="login" size="large" type="success">Iniciar Sesión</el-button>
                            </div>
                            <div class="text_center ctn_form_bottom">
                                <a @click="activeRecover=true" href="javascript:;">¿No recuerda su password?</a>
                            </div>
                            <br>
                            <p v-if="ruleFormLogin.error" class="error">
                                <el-alert
                                        title="Datos incorrectos"
                                        type="error"
                                        show-icon>
                                </el-alert>
                            </p>
                        </el-form>
                    </div>
                    <div v-if="activeRecover" class="content_recover_pass">
                        <el-form v-on:submit.prevent="recoverPassword" :model="ruleFormRecoverPassword" :rules="rulesRecoverPassword" ref="ruleFormRecoverPassword" v-loading="ruleFormRecoverPassword.loading" >
                            <fieldset>
                                <p class="text_center">Por favor ingrese su correo electrónico. Se le enviará un correo para la recuperación de contraseña.</p>
                            </fieldset>

                            <el-form-item label="Correo" prop="emailRecover">
                                <el-input
                                        :disabled="ruleFormRecoverPassword.successRecoverPasword"
                                        type='text'
                                        autocomplete="off"
                                        placeholder="email"
                                        v-model="ruleFormRecoverPassword.emailRecover">
                                </el-input>
                            </el-form-item>
                            <br>
                            <div class="text_center">
                                <el-button :disabled="ruleFormRecoverPassword.successRecoverPasword" @click="recoverPassword" size="large" type="success">Recuperar password</el-button>
                            </div>
                            <br>
                            <div class="text_center ctn_form_bottom">
                                <a @click="activeRecover=false" href="javascript:;">Volver al login</a>
                            </div>
                            <br>
                            <p v-if="ruleFormRecoverPassword.errorRecoverPasword" class="error">
                                <el-alert
                                        title="Este correo no existe."
                                        type="error"
                                        :closable="false"
                                        show-icon>
                                </el-alert>
                            </p>
                            <p v-if="ruleFormRecoverPassword.successRecoverPasword" class="success">
                                <el-alert
                                        title="Se envio un mensaje de recuperación a ese correo."
                                        type="success"
                                        :closable="false"
                                        show-icon>
                                </el-alert>
                            </p>
                        </el-form>

                    </div>
                </template>
        </div>

    </div>
</template>

<script>
import converse from '../../api/jetperu'

export default {
  data () {
  var password =  (rule, value, callback) =>{
            if (value === '') {
                callback(new Error('Escriba su contraseña por favor.'));
            } else {
                if (value.length > 5) {
                    if (value !== '') {
                        this.$refs.ruleFormResetPasword.validateField('passConfirm');
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('Debe tener mínimo 6 caracteres.'));
                }
                callback();
            }
        }
        var passwordConfirmation = (rule, value, callback) =>{
            if (value === '') {
                callback(new Error('Escriba su contraseña de nuevo por favor.'));
            } else if (value !== this.ruleFormResetPasword.pass) {
                callback(new Error('Las contraseñas deben ser iguales'));
            } else {
                callback();
            }
        }
    return {
      activeRecover:false,
      ruleFormLogin:{
        email: '',
        pass: '',
        loading:false,
        error: false
      },
      rulesLogin: {
          email: [
            { required: true, message: 'Escriba su email por favor.', trigger: 'blur' },
          ],
          pass: [
            { required: true, message: 'Escriba su contraseña por favor.', trigger: 'blur' }
          ]
      },

      ruleFormRecoverPassword:{
          loading:false,
          errorRecoverPasword:false,
          successRecoverPasword:false,
          emailRecover:''
      },
      rulesRecoverPassword:{
        emailRecover: [
            { required: true, type:'email', message: 'Escriba su email por favor.', trigger: 'blur' },
          ],
      },
      ruleFormResetPasword: {
          pass:'',
          passConfirm:'',
          loading:false
        },
      rulesResetPasword: {
          pass: [
            { validator: password, trigger: 'blur'},
          ],
          passConfirm: [
            { validator: passwordConfirmation, trigger: 'blur' },
          ]
      }
    }
  },
  methods: {
    login () {
      let self=this;
      self.$refs.ruleFormLogin.validate((valid) => {
          if (valid) {
              converse.login(
              self.ruleFormLogin.email.trim(),
              self.ruleFormLogin.pass.trim(),
              (loggedIn,res)=>{
                  if (!loggedIn) {
                      self.ruleFormLogin.error = true
                    } else {
                      res.data.created=new Date().getTime();
                      res.data.expiration=new Date().getTime() + (2*60*60*1000);
                      localStorage.data=JSON.stringify(res.data);
                      localStorage.token=res.data.apitoken;
                      self.$store.commit('changeStateLogin',true);
                      self.$store.commit('changeUser',res.data.name);
                      self.$store.commit('changeRole',res.data.role_id);
                      self.$router.replace('/')
                    }
              },
              ()=> self.ruleFormLogin.loading=true,
              ()=> self.ruleFormLogin.loading=false
          )
          }
      });

    },
    recoverPassword(){
        let self=this;
        self.$refs.ruleFormRecoverPassword.validate((valid) => {
            if (valid) {
                converse.recoverPassword(
                self.ruleFormRecoverPassword.emailRecover,
                (state,res)=>{
                  if (!state) {
                      self.ruleFormRecoverPassword.errorRecoverPasword = true;
                      self.ruleFormRecoverPassword.successRecoverPasword = false;
                    } else {
                      self.ruleFormRecoverPassword.errorRecoverPasword = false;
                      self.ruleFormRecoverPassword.successRecoverPasword = true;
                    }
              },
              ()=> self.ruleFormRecoverPassword.loading=true,
              ()=> self.ruleFormRecoverPassword.loading=false
                )
            }
        });
    },
    resetPassword(){
        let self=this;
        self.$refs.ruleFormResetPasword.validate((valid) => {
            if (valid) {
                converse.resetPassword(
                    self.ruleFormResetPasword.pass,
                    location.href.split('?code=')[1],
                    (state,res)=>{
                      if (state) {
                        self.$alert('Se realizo la actualización de la contraseña correctamente.', 'Mensaje', {
                            confirmButtonText: 'OK',
                            type: 'success',
                            callback: action => {
                              self.$router.push({ name: 'user'})
                            }
                        });


                        }
                      },
                      ()=> self.ruleFormResetPasword.loading=true,
                      ()=> self.ruleFormResetPasword.loading=false
                )
            }
        });
    }
  }
}
</script>

<style lang="stylus">
    @import "../../stylus/base/_config.styl"
    .bg_middle
        position: fixed
        width: 100%
        height: 60%
        background-color: white
        bottom: 0
    .login_background
        position: fixed
        height: 100%
        width: 100%
        background-image url('../../assets/bg_login.png')
    .ctn_form_logo
        margin-bottom: 20px
        margin-top: 20px
        text-align: center
    .ctn_form_bottom
        margin-top 30px
    .login_ctn
        position: absolute
        width: 400px
        background: #fff
        padding: 20px
        margin-left: auto
        margin-right: auto
        left: 0
        right: 0
        top: 20%
        box-shadow: 1px 1px 32px rgba(0,0,0,0.45)
        min-height: 441px
        .el-form-item__content
            height: 73px;
            margin-bottom 6px
        .el-form-item
            margin-bottom 6px !important

</style>
