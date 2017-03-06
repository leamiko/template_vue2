<template>
    <div class="center_content">
        <app-widget>
            <template v-if="$route.name=='promotion_edit'">
                <template v-if="$route.params.id">
                    <h2>EDITAR PROMOCIÓN: {{ruleForm.title}}</h2>
                </template>
            </template>
            <template v-else>
                <h2>REGISTRAR PROMOCIÓN: {{ruleForm.title}}</h2>
            </template>
            <el-form v-loading="ruleForm.loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Título" prop="title">
                            <el-input v-model="ruleForm.title"></el-input>
                        </el-form-item>
                        <el-form-item label="Descripción" prop="description">
                            <el-input style="margin-top:5px" type="textarea" v-model="ruleForm.description"></el-input>
                        </el-form-item>
                        <el-form-item label="Imagen" prop="file">
                            <el-upload
                                    drag
                                    class="avatar-uploader"
                                    action="/"
                                    :before-upload="imageToForm"
                                    :show-file-list="false">
                                <template v-if="ruleForm.file!='' && ruleForm.file!=null">
                                    <img :src="ruleForm.file" class="avatar">
                                </template>
                                <template v-else>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">Arrastre su imagen aquí o <em>click aquí</em></div>
                                </template>

                            </el-upload>
                        </el-form-item>


                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Tipo de tarjeta" prop="card">
                            <el-select ref="selFilter5" @visible-change="changeselFilter5" filterable  v-model="ruleForm.card" placeholder="Tipo de tarjeta">
                                <el-option
                                        v-for="item in ruleForm.options_cards"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="País" prop="country">
                            <el-select ref="selFilter1" @change="changeselFilter1Change" @visible-change="changeselFilter1" filterable  v-model="ruleForm.country" placeholder="Paises">
                                <el-option
                                        v-for="item in ruleForm.options_country"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Departamento" prop="department">
                            <el-select ref="selFilter2" @visible-change="changeselFilter2" filterable
                                       v-model="ruleForm.department" placeholder="Departamentos">
                                <el-option
                                        v-for="item in ruleForm.options_department"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Establecimiento" prop="establishment">
                            <el-select ref="selFilter4" @visible-change="changeselFilter4"  filterable v-model="ruleForm.establishment" placeholder="Establecimiento">
                                <el-option
                                        v-for="item in ruleForm.options_establishment"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Categoría" prop="category">
                            <el-select ref="selFilter3" @visible-change="changeselFilter3"  filterable v-model="ruleForm.category" placeholder="Categoría">
                                <el-option
                                        v-for="item in ruleForm.options_category"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <template v-if="$route.name=='promotion_edit'">
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
          title: '',
          establishment: '',
          options_establishment: '',
          category: '',
          department: '',
          card: '',
          country:'',
          options_category: '',
          options_department: '',
          options_country:'',
          options_cards:'',
          flagactive:'1',
          description:'',
           file:'',
          file_aux:''
        },
        rules: {
         file: [
            { required: true, message: 'Por favor suba una imagen por favor', trigger: 'change' },
          ],
          title: [
            { required: true, message: 'Escriba su título por favor', trigger: 'blur' },
          ],
           description: [
            { required: true, message: 'Escriba una descripción por favor', trigger: 'blur' },
          ],
          establishment: [
            { required: true, message: 'Seleccione un establecimiento por favor', trigger: 'change' },
          ],
          category: [
            { required: true, message: 'Seleccione una categoría por favor', trigger: 'change' },
          ],
          card: [
            { required: true, message: 'Seleccione una tarjeta por favor', trigger: 'change' },
          ],
          country: [
            { required: true, message: 'Seleccione el pais por favor', trigger: 'change' },
          ],
          department: [
            { required: true, message: 'Seleccione una departamento por favor', trigger: 'change' },
          ],

        }
      }
    },
    methods: {
     imageToForm(file){
           let self=this;
           var reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onload = function () {
            var img = new Image();
            img.src = reader.result;
            img.onload = function() {
                self.ruleForm.file=reader.result;
            };
           };
        return false
    },
      loadDepartaments(id,fn=()=>{}){
        let self=this;
        api.admin(
            'GET',
            config.ubigeo.list+"/"+id,
            null,
            (state,res)=>{
                if(state){
                    let aux=[];
                    console.log(res.data)
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
         changeselFilter3(e){
            if(e){this.$refs.selFilter3.query="";}
        },
         changeselFilter4(e){
            if(e){this.$refs.selFilter4.query="";}
        },
            changeselFilter5(e){
            if(e){this.$refs.selFilter5.query="";}
        },

      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
        let self=this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            api.admin(
            (self.$route.name=='promotion_edit')?'PUT':'POST',
            (self.$route.name=='promotion_edit')? config.promotion.list+"/"+self.$route.params.id: config.promotion.list,
            {
              title: self.ruleForm.title,
              establishment_id: self.ruleForm.establishment,
              category_id: self.ruleForm.category,
              country_id: self.ruleForm.country,
              department_id: self.ruleForm.department,
              card_id: self.ruleForm.card,
               description: self.ruleForm.description,
                image: (self.ruleForm.file!=self.ruleForm.file_aux)?self.ruleForm.file:'',
                flagactive: self.ruleForm.flagactive,
             },

             (state,res)=>{
                 if(state){
                    self.$alert(res.msg, 'Mensaje', {
                      confirmButtonText: 'OK',
                      type: 'success',
                      callback: action => {
                        self.$router.push({ name: 'promotion'})
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
            config.promotion.establishment,
            null,
            (state,res)=>{
                if(state){
                    let aux=[],data=res.data;
                    for (let i=0;i<data.length;i++) {
                            aux.push({'value':data[i].id+'','label':data[i].name});
                    }
                    self.ruleForm.options_establishment=aux;

                    api.admin(
                    'GET',
                    config.promotion.category,
                    null,
                    (state,res)=>{
                        if(state){
                        let aux=[],data=res.data;
                        for (let i=0;i<data.length;i++) {
                                aux.push({'value':data[i].id+'','label':data[i].name});
                        }
                        self.ruleForm.options_category=aux;
                        api.admin(
                            'GET',
                            config.ubigeo.list,
                            null,
                            (state,res)=>{
                                if(state){
                                let aux=[],data=res.data;
                                for (let i=0;i<data.length;i++) {
                                        aux.push({'value':data[i].country_id+'','label':data[i].country});
                                }
                                self.ruleForm.options_country=aux;

                                 api.admin(
                                    'GET',
                                    config.promotion.card,
                                    null,
                                    (state,res)=>{
                                        if(state){
                                        let aux=[],data=res.data;
                                        for (let i=0;i<data.length;i++) {
                                                aux.push({'value':data[i].id+'','label':data[i].name});
                                        }
                                        self.ruleForm.options_cards=aux;

                                        if(self.$route.name=='promotion_edit'){
                                            api.admin(
                                            'GET',
                                            config.promotion.list+"/"+self.$route.params.id,
                                            null,
                                            (state,res)=>{
                                                if(state){
                                                    self.ruleForm.title=res.data.title;
                                                    self.ruleForm.description=res.data.description;
                                                    self.ruleForm.establishment=res.data.establishment_id+'';
                                                    self.ruleForm.category=res.data.category_id+'';
                                                    self.ruleForm.department=res.data.department_id+'';
                                                    self.ruleForm.card=res.data.card_id+'';
                                                    self.ruleForm.country=res.data.country_id+'';
                                                    self.ruleForm.file=res.data.image;
                                                    self.ruleForm.file_aux=res.data.image;
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
                            },
                            ()=>self.ruleForm.loading= true,
                            ()=>self.ruleForm.loading= false
                            );
                        }

                    },
                    ()=>self.ruleForm.loading= true,
                    ()=>self.ruleForm.loading= false
                    );

                }

            },
            ()=>self.ruleForm.loading= true,
            ()=>self.ruleForm.loading= false
            );





    }
}


</script>
<style lang="stylus">
    .avatar-uploader .el-upload
        border-radius: 6px
        cursor: pointer
        position: relative
        overflow: hidden
        width: 100%
        text-align: center
        padding: 8px
        .el-icon-upload
            font-size: 60px
            color: #4b4c4c

    .avatar-uploader .el-upload:hover
        border-color: #20a0ff;

    .avatar-uploader-icon
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;

    .avatar
        height: 153px
        display: block
        max-width: 100%
        margin 0 auto
</style>