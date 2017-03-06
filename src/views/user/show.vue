<template>
    <div class="center_content">
        <app-widget>
            <h2>USUARIO: {{ruleForm.name}}</h2>

            <el-form v-loading="ruleForm.loading" :model="ruleForm"  ref="ruleForm" label-width="120px">
                <h3>Datos Básicos</h3>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Foto" prop="fileList">
                            <el-upload
                                    class="avatar-uploader"
                                    action="/"
                                    :show-file-list="false">
                                <img v-if="ruleForm.file" :src="ruleForm.file" class="avatar">
                                <img v-else src="../../assets/icons/no_photo.png">

                            </el-upload>

                        </el-form-item>
                        <el-form-item label="Nombre" prop="name">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Apellidos" prop="lastname">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.lastname"></el-input>
                        </el-form-item>
                        <el-form-item label="Email" prop="email">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.email"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Tipo de documento" prop="document_type">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.document_type"></el-input>
                        </el-form-item>
                        <el-form-item label="N. de documento" prop="document_number">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.document_number"></el-input>
                        </el-form-item>
                        <el-form-item label="Tipo de sangre" prop="blood">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.blood"></el-input>
                        </el-form-item>
                        <el-form-item label="Tipo de Tarjeta" prop="card_type">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.card_type"></el-input>
                        </el-form-item>
                        <el-form-item label="N. de Tarjeta" prop="card_number">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.card_number"></el-input>
                        </el-form-item>
                        <el-form-item label="País" prop="country">
                            <el-input :disabled="ruleForm.disabled" v-model="ruleForm.country"></el-input>
                        </el-form-item>
                        <el-form-item label="Estado">
                            <el-select :disabled="ruleForm.disabled" v-model="ruleForm.flagactive" placeholder="Estado">
                                <el-option label="Activo" value="1"></el-option>
                                <el-option label="Inactivo" value="0"></el-option>
                            </el-select>
                        </el-form-item>

                    </el-col>
                </el-row>
                <h3>Contactos</h3>
                <el-table
                        :data="ruleForm.contact"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="Nombre">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="Descripción">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="Dirección">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="Correo">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="Teléfono">
                    </el-table-column>
                </el-table>
                <h3>Enfermedades</h3>
                <el-table
                        :data="ruleForm.disease"
                        style="width: 100%">
                    <el-table-column
                            prop="desease"
                            label="Enfermedad">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="Nombre">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="Descripción">
                    </el-table-column>
                </el-table>
                <h3>Doctores</h3>
                <el-table
                        :data="ruleForm.doctor"
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="Enfermedad">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="Descripción">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="Dirección">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="Correo">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="Teléfono">
                    </el-table-column>
                </el-table>
                <h3>Destinos</h3>
                <el-table
                        :data="ruleForm.destination"
                        style="width: 100%">
                    <el-table-column
                            prop="country"
                            label="País">
                    </el-table-column>
                    <el-table-column
                            prop="department"
                            label="Departamento">
                    </el-table-column>
                    <el-table-column
                            prop="reason"
                            label="Razón">
                    </el-table-column>
                    <el-table-column
                            prop="start_trip"
                            label="Inicio de viaje">
                    </el-table-column>
                    <el-table-column
                            prop="end_trip"
                            label="Fin de viaje">
                    </el-table-column>
                </el-table>
            </el-form>
            <div class="text_center" style="margin-top:20px">
                <router-link :to="{ name: 'user' }" >
                    <el-button icon="arrow-left"  >
                        Regresar
                    </el-button>
                </router-link>

            </div>


        </app-widget>
    </div>
</template>
<script>
import AppWidget from '../../components/AppWidget';
import converse from '../../api/jetperu'
import config from '../../api/config'


export default {
  components: {
    AppWidget
  },
  data() {
      return {
        ruleForm: {
          disabled:true,
          loading:false,
          file: '',
          name:'',
          lastname:''
        },
        only_show:false
      }
    },
    methods: {
      handleReset() {
        this.$refs.ruleForm.resetFields();
      },
      handleSubmit(ev) {
      let self=this;
        this.$refs.ruleForm.validate((valid) => {});
      },
       handleRemove(file, fileList) {
        this.ruleForm.fileList=[]
      }
    },
    mounted: function () {
        let self=this;
        converse.admin(
            'GET',
            config.user.list+"/"+self.$route.params.id,
            null,
            (state,res)=>{
                if(state){
                    self.ruleForm.name=res.data.name;
                    self.ruleForm.lastname=res.data.lastname;
                    self.ruleForm.email=res.data.email;
                    self.ruleForm.file=res.data.photo_user;
                    self.ruleForm.blood=res.data.blood;
                    self.ruleForm.card_type=res.data.card_type;
                    self.ruleForm.card_number=res.data.card_number;
                    self.ruleForm.country=res.data.country;
                    self.ruleForm.document_type=res.data.document_type;
                    self.ruleForm.document_number=res.data.document_number;
                    self.ruleForm.flagactive=""+res.data.flagactive;
                    self.ruleForm.contact=res.data.contact;
                    self.ruleForm.disease=res.data.disease;
                    self.ruleForm.doctor=res.data.doctor;
                     self.ruleForm.destination=res.data.destination;
                }
            },
            ()=>self.ruleForm.loading=true,
            ()=>self.ruleForm.loading=false
        )
    }
}
</script>
<style lang="stylus">

    .el-input.is-disabled .el-input__inner
        color #6f6f6f
    .el-dragger__cover__interact
        display none
    .avatar-uploader .el-upload
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 100%;

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

</style>
