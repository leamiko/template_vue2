<template>
    <div class="app_section">
        <div class="center_content">
            <app-widget>
                <h2>MI PERFIL: {{ruleForm.name}}</h2>
                <el-form v-loading="ruleForm.loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="Nombre" prop="name">
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="Apellidos" prop="lastname">
                                <el-input v-model="ruleForm.lastname"></el-input>
                            </el-form-item>
                            <el-form-item label="Correo" prop="email">
                                <el-input v-model="ruleForm.email"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Contraseña" prop="password">
                                <el-input type="password" @change="changePassword" v-model="ruleForm.password"></el-input>
                            </el-form-item>
                            <el-form-item label="Confirmación de contraseña" prop="passwordconfirm">
                                <el-input type="password" @change="changePassword" v-model="ruleForm.passwordconfirm"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="success" @click="handleSubmit">GUARDAR</el-button>
                    </el-form-item>
                </el-form>
            </app-widget>
        </div>
    </div>
</template>
<script>
import AppWidget from '../../components/AppWidget';
import api from '../../api/jetperu'
import config from '../../api/config'


export default {
  components: {
    AppWidget
  },
  data() {
      return {
        ruleForm: {
          loading:false,
          name: '',
          lastname: '',
          email: '',
          password:'',
          passwordconfirm:''
        },
        rules: {
          name: [
            { required: true, message: 'Escriba su nombre por favor', trigger: 'blur' },
          ],
          lastname: [
            { required: true, message: 'Escriba sus apellidos por favor', trigger: 'blur' },
          ],
          email: [
            { type: 'email' ,required: true, message: 'Escriba un email por favor', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      changePassword(){
      let password =  (rule, value, callback) =>{
            if (value === '') {
                callback(new Error('Escriba su contraseña por favor.'));
            } else {
                if (value.length > 5) {
                    if (value !== '') {
                        this.$refs.ruleForm.validateField('passwordconfirm');
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('Debe tener mínimo 6 caracteres.'));
                }
                callback();
            }
        }
        let passwordConfirmation = (rule, value, callback) =>{
            if (value === '') {
                callback(new Error('Escriba su contraseña de nuevo por favor.'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('Las contraseñas deben ser iguales'));
            } else {
                callback();
            }
        }

       let self=this;
        if(self.ruleForm.password.trim()=="" && self.ruleForm.passwordconfirm.trim()==""){
            delete self.rules.password;
            delete self.rules.passwordconfirm;
        }else{
            self.rules.password=[{ validator: password, trigger: 'blur'}];
            self.rules.passwordconfirm=[{ validator: passwordConfirmation, trigger: 'blur' }];
        }
      },
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        let self=this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            api.admin(
            'POST',
            config.profile.list,
            {
              name: self.ruleForm.name.trim(),
              lastname: self.ruleForm.lastname.trim(),
              email: self.ruleForm.email.trim(),
              password: self.ruleForm.password
             },
             (state,res)=>{
                 if(state){
                    self.$store.commit('changeUser',self.ruleForm.name);
                    self.$alert(res.msg, 'Mensaje', {
                      confirmButtonText: 'OK',
                      type: 'success'
                    });
                 }
             },
             ()=>self.ruleForm.loading=true,
             ()=>self.ruleForm.loading=false
            )
          }
        });
      }
    },
    mounted: function () {
        let self=this;
        api.admin(
            'GET',
            config.profile.list,
            null,
            (state,res)=>{
                if(state){
                    self.ruleForm.name= res.data.name;
                    self.ruleForm.lastname= res.data.lastname;
                    self.ruleForm.email= res.data.email
                }
            },
            ()=>self.ruleForm.loading= true,
            ()=>self.ruleForm.loading= false
        );
    }
}

</script>