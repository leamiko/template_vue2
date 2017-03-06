<template>
    <div class="center_content">
        <app-widget>
            <template v-if="$route.name=='admin_edit'">
                <template v-if="$route.params.id">
                    <h2>EDITAR ADMINISTRADOR: {{ruleForm.name}}</h2>
                </template>
            </template>
            <template v-else>
                <h2>REGISTRAR ADMINISTRADOR: {{ruleForm.name}}</h2>
            </template>
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
                        <template v-if="$route.name=='admin_edit'">
                            <template v-if="$route.params.id">
                                <el-form-item label="Estado">
                                    <el-select v-model="ruleForm.flagactive" placeholder="Estado">
                                        <el-option label="Activo" value="1"></el-option>
                                        <el-option label="Inactivo" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </template>
                        <el-form-item label="Contraseña" prop="password">
                            <el-input type="password"  v-model="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item label="Confirmación de contraseña" prop="passwordconfirm">
                            <el-input type="password"  v-model="ruleForm.passwordconfirm"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="success" @click="handleSubmit">GUARDAR</el-button>
                    <el-button @click="handleReset">Limpiar</el-button>
                </el-form-item>
            </el-form>
        </app-widget>
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
  var password =  (rule, value, callback) =>{
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
        var passwordConfirmation = (rule, value, callback) =>{
            if (value === '') {
                callback(new Error('Escriba su contraseña de nuevo por favor.'));
            } else if (value !== this.ruleForm.password) {
                callback(new Error('Las contraseñas deben ser iguales'));
            } else {
                callback();
            }
        }

      return {
        ruleForm: {
          loading:false,
          name: '',
          lastname: '',
          email: '',
          password:'',
          passwordconfirm:'',
          flagactive:'1'
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
          ],
          password: [
            (this.$route.name!='admin_edit')?{ validator: password, trigger: 'blur' }:{}
          ],
          passwordconfirm: [
            (this.$route.name!='admin_edit')?{validator: passwordConfirmation, trigger: 'blur' }:{}
          ]
        }
      }
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        let self=this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            api.admin(
            (self.$route.name=='admin_edit')?'PUT':'POST',
            (self.$route.name=='admin_edit')? config.admin.list+"/"+self.$route.params.id: config.admin.list,
            {
              name: self.ruleForm.name.trim(),
              lastname: self.ruleForm.lastname.trim(),
              email: self.ruleForm.email.trim(),
              password: self.ruleForm.password,
              flagactive: self.ruleForm.flagactive
             },
             (state,res)=>{
                 if(state){
                    self.$alert(res.msg, 'Mensaje', {
                      confirmButtonText: 'OK',
                      type: 'success',
                      callback: action => {
                        self.$router.push({ name: 'admin'})
                      }
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
        if(self.$route.name=='admin_edit'){
            api.admin(
            'GET',
            config.admin.list+"/"+self.$route.params.id,
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
}

</script>