<template>
    <div class="center_content">
        <app-widget>
            <template v-if="$route.name=='embassy_edit'">
                <template v-if="$route.params.id">
                    <h2>EDITAR EMBAJADA: {{ruleForm.name}}</h2>
                </template>
            </template>
            <template v-else>
                <h2>REGISTRAR EMBAJADA: {{ruleForm.name}}</h2>
            </template>
            <el-form v-loading="ruleForm.loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Nombre" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Descripción" prop="note">
                            <el-input style="margin-top:5px" type="textarea" v-model="ruleForm.note"></el-input>
                        </el-form-item>

                        <el-form-item label="Foto" prop="file">
                            <el-upload
                                    drag
                                    class="avatar-uploader"
                                    action="/"
                                    :before-upload="imageToForm"
                                    :show-file-list="false">
                                <img v-if="ruleForm.file!='' && ruleForm.file!=null" :src="ruleForm.file" class="avatar">
                                <template v-else>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">Arrastre su imagen aquí o <em>click aquí</em></div>
                                </template>

                            </el-upload>

                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="País Origen" prop="country_origin_id">
                            <el-select ref="selFilter1"  @visible-change="changeselFilter1" filterable
                                       v-model="ruleForm.country_origin_id" placeholder="Paises">
                                <el-option
                                        v-for="item in ruleForm.options_country"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="País Destino" prop="country_destination_id">
                            <el-select ref="selFilter2" @visible-change="changeselFilter2" filterable
                                       v-model="ruleForm.country_destination_id" placeholder="Paises">
                                <el-option
                                        v-for="item in ruleForm.options_country"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Dirección" prop="address">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="Teléfono Local" prop="local_phone">
                            <el-input v-model="ruleForm.local_phone" ></el-input>
                        </el-form-item>
                        <el-form-item label="Teléfono Internacional" prop="international_phone">
                            <el-input v-model="ruleForm.international_phone" ></el-input>
                        </el-form-item>
                        <template v-if="$route.name=='embassy_edit'">
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
          file:'',
          country_origin_id: '',
          country_destination_id: '',
          options_country: '',
          note:'',
          local_phone:'',
          international_phone:'',
          address:'',
          flagactive:'1'
        },
        rules: {
          name: [
            { required: true, message: 'Escriba su nombre por favor', trigger: 'blur' },
          ],
          file: [
            { required: true, message: 'Debe subir una imagen por favor', trigger: 'change' },
          ],
          country_origin_id: [
            { required: true, message: 'Seleccione un pais por favor', trigger: 'change' },
          ],
          country_destination_id: [
            { required: true, message: 'Seleccione un pais por favor', trigger: 'change' },
          ],
           note: [
            { required: true, message: 'Escriba una descripción por favor', trigger: 'blur' },
          ],
          address: [
                { required: true, message: 'Escriba su dirección por favor', trigger: 'blur' }
              ],
           local_phone: [
            { required: true, message: 'Escriba su teléfono por favor', trigger: 'blur',pattern:/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/ }
          ],
           international_phone: [
            { required: true, message: 'Escriba su teléfono por favor', trigger: 'blur',pattern:/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/ }
          ],
        }
      }
    },
    methods: {
    imageToForm(file){
           console.log(file)
           let self=this;
           var reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onload = function () {
            var img = new Image();
            img.src = reader.result;
            img.onload = function() {
                console.log(reader.result)
                self.ruleForm.file=reader.result;
            };
           };
        return false
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
            (self.$route.name=='embassy_edit')?'PUT':'POST',
            (self.$route.name=='embassy_edit')? config.embassy.list+"/"+self.$route.params.id: config.embassy.list,
            {
              name: self.ruleForm.name,
              country_origin_id: self.ruleForm.country_origin_id,
              country_destination_id: self.ruleForm.country_destination_id,
              address: self.ruleForm.address,
              note: self.ruleForm.note,
               local_phone: self.ruleForm.local_phone,
               international_phone: self.ruleForm.international_phone,
               image: self.ruleForm.file,
               flagactive: self.ruleForm.flagactive,

             },
             (state,res)=>{
                 if(state){
                    self.$alert(res.msg, 'Mensaje', {
                      confirmButtonText: 'OK',
                      type: 'success',
                      callback: action => {
                        self.$router.push({ name: 'embassy'})
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
                    if(self.$route.name=='embassy_edit' && self.$route.params.id){
                        api.admin(
                        'GET',
                        config.embassy.list+"/"+self.$route.params.id,
                        null,
                        (state,res)=>{
                            if(state){
                                self.ruleForm.name=res.data.name;
                                self.ruleForm.country_origin_id=res.data.country_origin_id+"";
                                self.ruleForm.country_destination_id=res.data.country_destination_id+"";
                                self.ruleForm.note=res.data.note;
                                self.ruleForm.local_phone=res.data.local_phone;
                                self.ruleForm.international_phone=res.data.international_phone;
                                self.ruleForm.address=res.data.address;
                                self.ruleForm.file=res.data.image;
                                self.ruleForm.flagactive=res.data.flagactive+"";
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
