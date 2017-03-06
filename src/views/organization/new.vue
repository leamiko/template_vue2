<template>
    <div class="center_content">
        <app-widget>
            <template v-if="$route.name=='organization_edit'">
                <template v-if="$route.params.id">
                    <h2>EDITAR ORGANIZACIÓN: {{ruleForm.name}}</h2>
                </template>
            </template>
            <template v-else>
                <h2>REGISTRAR ORGANIZACIÓN: {{ruleForm.name}}</h2>
            </template>
            <el-form v-loading="ruleForm.loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Nombre" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Paises" prop="country">
                            <el-select ref="selFilter1" @change="changeselFilter1Change" @visible-change="changeselFilter1" filterable
                                       v-model="ruleForm.country" placeholder="Paises">
                                <el-option
                                        v-for="item in ruleForm.options_country"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Departamentos" prop="department">
                            <el-select ref="selFilter2" @visible-change="changeselFilter2" filterable
                                       v-model="ruleForm.department" placeholder="Departamentos">
                                <el-option
                                        v-for="item in ruleForm.options_department"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Descripción" prop="description">
                            <el-input style="margin-top:5px" type="textarea" v-model="ruleForm.description"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Dirección" prop="address">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="Teléfono" prop="phone">
                            <el-input v-model="ruleForm.phone" ></el-input>
                        </el-form-item>
                        <el-form-item label="Teléfono Principal" prop="phone_main">
                            <el-input v-model="ruleForm.phone_main" ></el-input>
                        </el-form-item>
                        <el-form-item label="Sitio web" prop="web">
                            <el-input v-model="ruleForm.web" ></el-input>
                        </el-form-item>
                        <template v-if="$route.name=='organization_create'">
                            <template v-if="$route.params.id">
                                <el-form-item label="Estado">
                                    <el-select v-model="ruleForm.flagactive" placeholder="Estado">
                                        <el-option label="Activo" value="1"></el-option>
                                        <el-option label="Inactivo" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </template>
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

      return {
        ruleForm: {
          loading:false,
          name: '',
          country: '',
          options_country: '',
          description:'',
          department: '',
          options_department: '',
          phone:'',
          phone_main:'',
          web:'',
          address:'',
          flagactive:'1'
        },
        rules: {
          name: [
            { required: true, message: 'Escriba su nombre por favor', trigger: 'blur' },
          ],
          country: [
            { required: true, message: 'Seleccione un pais por favor', trigger: 'change' },
          ],
          department:[
             { required: true, message: 'Seleccione un departamento por favor', trigger: 'change' },
          ],
           description: [
            { required: true, message: 'Escriba una decripción por favor', trigger: 'blur' },
          ],
          address: [
                { required: true, message: 'Escriba su dirección por favor', trigger: 'blur' }
              ],
          web: [
            { required: true,type: 'string', message: 'Escriba una dirección de su web por favor', trigger: 'blur',pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/ }
          ],
           phone: [
            { required: true, message: 'Escriba su teléfono por favor', trigger: 'blur',pattern:/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/ }
          ],
           phone_main: [
            { required: true, message: 'Escriba su teléfono por favor', trigger: 'blur',pattern:/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/ }
          ],
        }
      }
    },
    methods: {
     loadDepartaments(id,fn=()=>{}){
        let self=this;
        api.admin(
            'GET',
            config.ubigeo.list+"/"+id,
            null,
            (state,res)=>{
                if(state){
                    let aux=[];
                    aux  = res.data.map(function(obj) {
                      return {
                      'value': obj.department_id+'',
                      'label': obj.department+''
                        };
                    });
                    self.ruleForm.options_department=aux;
                    fn()
                }
            },
            ()=>self.ruleForm.loading= true,
            ()=>self.ruleForm.loading= false
            );
     },
     changeselFilter1Change(e){
        this.loadDepartaments(e)
     },
     changeselFilter1(e){
     let self=this;
            if(e){
            this.$refs.selFilter1.query="";
            }
     },
        changeselFilter2(e){
            if(e){this.$refs.selFilter2.query="";}
        },
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        let self=this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            api.admin(
            (self.$route.name=='organization_edit')?'PUT':'POST',
            (self.$route.name=='organization_edit')? config.organization.list+"/"+self.$route.params.id: config.organization.list,
            {
              flagactive: self.ruleForm.flagactive,
              name: self.ruleForm.name,
              country_id: self.ruleForm.country,
              department_id: self.ruleForm.department,
              description: self.ruleForm.description,
              address: self.ruleForm.address,
               phone_main: self.ruleForm.phone_main,
                phone: self.ruleForm.phone,
                 web: self.ruleForm.web
             },
             (state,res)=>{
                 if(state){
                    self.$alert(res.msg, 'Mensaje', {
                      confirmButtonText: 'OK',
                      type: 'success',
                      callback: action => {
                        self.$router.push({ name: 'organization'})
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
            api.admin(
            'GET',
            config.ubigeo.list,
            null,
            (state,res)=>{
                if(state){
                    let aux=[];
                    aux  = res.data.map(function(obj) {
                      return {
                      'value': obj.country_id+'',
                      'label': obj.country+''
                        };
                    });
                    self.ruleForm.options_country=aux;
                    if(self.$route.name=='organization_edit' && self.$route.params.id){
                        api.admin(
                        'GET',
                        config.organization.list+"/"+self.$route.params.id,
                        null,
                        (state,res)=>{
                            if(state){
                                self.ruleForm.name=res.data.name;
                                self.ruleForm.country=res.data.country_id+"";
                                self.ruleForm.department=res.data.department_id+"";
                                self.ruleForm.description=res.data.description;
                                self.ruleForm.phone=res.data.phone;
                                self.ruleForm.phone_main=res.data.phone_main;
                                self.ruleForm.web=res.data.web;
                                self.ruleForm.address=res.data.address;
                                self.ruleForm.flagactive=res.data.flagactive;
                            }
                        },
                        ()=>self.ruleForm.loading= true,
                        ()=>self.ruleForm.loading= false
                        );
                    }
                }
            },
            ()=>self.ruleForm.loading= true,
            ()=>self.ruleForm.loading= false
            );


    }
}



</script>