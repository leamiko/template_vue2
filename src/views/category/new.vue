<template>
    <div class="center_content">
        <app-widget>
            <template v-if="$route.name=='categories_edit'">
                <template v-if="$route.params.id">
                    <h2>EDITAR CATEGORÍA: {{ruleForm.name}}</h2>
                </template>
            </template>
            <template v-else>
                <h2>REGISTRAR CATEGORÍA: {{ruleForm.name}}</h2>
            </template>
            <el-form v-loading="ruleForm.loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Nombre" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Descripción" prop="description">
                            <el-input v-model="ruleForm.description"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <template v-if="$route.name=='categories_edit'">
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
          description:'',
          flagactive:'1'
        },
        rules: {
          name: [
            { required: true, message: 'Escriba su nombre por favor', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'Escriba una descripción por favor', trigger: 'blur' },
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
            (self.$route.name=='categories_edit')?'PUT':'POST',
            (self.$route.name=='categories_edit')? config.category.list+"/"+self.$route.params.id: config.category.list,
            {
              name: self.ruleForm.name,
              description: self.ruleForm.description,
              flagactive: self.ruleForm.flagactive
             },
             (state,res)=>{
                 if(state){
                    self.$alert(res.msg, 'Mensaje', {
                      confirmButtonText: 'OK',
                      type: 'success',
                      callback: action => {
                        self.$router.push({ name: 'categories'})
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
        if(self.$route.name=='categories_edit'){
            api.admin(
            'GET',
            config.category.list+"/"+self.$route.params.id,
            null,
            (state,res)=>{
                if(state){
                    self.ruleForm.name= res.data.name;
                    self.ruleForm.description= res.data.description;
                    self.ruleForm.flagactive= ""+res.data.flagactive
                }
            },
            ()=>self.ruleForm.loading= true,
            ()=>self.ruleForm.loading= false
            );
        }

    }
}

</script>