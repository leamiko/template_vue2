<template>
    <div class="center_content">
        <app-widget>
            <template v-if="$route.name=='establishment_edit'">
                <template v-if="$route.params.id">
                    <h2>EDITAR ESTABLECIMIENTO: {{ruleForm.name}}</h2>
                </template>
            </template>
            <template v-else>
                <h2>REGISTRAR ESTABLECIMIENTO: {{ruleForm.name}}</h2>
            </template>
            <el-form v-loading="ruleForm.loading" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="12">

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
                        <el-form-item label="Ubicación">
                            <input id="pac-input" class="controls" type="text"
                                   placeholder="Ingrese un lugar">
                            <div id="ubigeo_map" style="height:270px"></div>
                        </el-form-item>

                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Nombre" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="Descripción" prop="description">
                            <el-input style="margin-top:5px" type="textarea" v-model="ruleForm.description"></el-input>
                        </el-form-item>
                        <el-form-item label="País" prop="country_id">
                            <el-select ref="selFilter1" @visible-change="changeselFilter1"  filterable v-model="ruleForm.country_id" placeholder="Países">
                                <el-option
                                        v-for="item in ruleForm.options_country"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Categorías" prop="category_id">
                            <el-select ref="selFilter2" @visible-change="changeselFilter2"  filterable v-model="ruleForm.category_id" placeholder="Categorías">
                                <el-option
                                        v-for="item in ruleForm.options_categories"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="Dirección" prop="address">
                            <el-input v-model="ruleForm.address"></el-input>
                        </el-form-item>
                        <el-form-item label="Teléfono" prop="phone">
                            <el-input v-model="ruleForm.phone" ></el-input>
                        </el-form-item>
                        <el-form-item label="Horario de oficina" prop="office_hours">
                            <el-input v-model="ruleForm.office_hours" ></el-input>
                        </el-form-item>
                        <el-form-item label="Sitio web" prop="website">
                            <el-input v-model="ruleForm.website" ></el-input>
                        </el-form-item>

                        <template v-if="$route.name=='establishment_edit'">
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
          country_id: '',
          category_id:'',
          options_country: '',
          options_categories:'',
          flagactive:'1',
          file:'',
          file_aux:'',
          lat:'',
          long:'',
          address:'',
          phone:'',
          office_hours:'',
          website:'',
          description:''
        },
        rules: {
          name: [
            { required: true, message: 'Escriba su nombre por favor', trigger: 'blur' },
          ],
          description: [
            { required: true, message: 'Escriba una descripción por favor', trigger: 'blur' },
          ],
          country_id: [
            { required: true, message: 'Seeccione un pais por favor', trigger: 'change' },
          ],
          category_id: [
            { required: true, message: 'Seeccione una categoría por favor', trigger: 'change' },
          ],
          file: [
            { required: true, message: 'Por favor suba una imagen por favor', trigger: 'change' },
          ],
          address: [
                { required: true, message: 'Escriba su dirección por favor', trigger: 'blur' }
              ],
          phone: [
            { required: true, message: 'Escriba su teléfono por favor', trigger: 'blur',pattern:/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/ }
          ],
          office_hours: [
            { required: true, message: 'Escriba un horario por favor', trigger: 'blur' }
          ],
           website: [
            { required: true,type: 'string', message: 'Escriba una dirección de su web por favor', trigger: 'blur',pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/ }
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
    initMap(position_ini){
            let self=this;
            let map = new google.maps.Map(document.getElementById('ubigeo_map'), {
                center: position_ini,
                zoom: 13
            });

            let input = document.getElementById('pac-input');

            let types = document.getElementById('type-selector');
            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(input);

            let autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

           let marker = new google.maps.Marker({
               map: map,
               draggable: true,
               animation: google.maps.Animation.DROP,
               position: position_ini
            });
            self.ruleForm.lat=position_ini.lat;
            self.ruleForm.long=position_ini.lng;
            marker.addListener('dragend', function (event) {
                self.ruleForm.lat=event.latLng.lat();
                self.ruleForm.long=event.latLng.lng();
            });
            autocomplete.addListener('place_changed', function() {
                let place = autocomplete.getPlace();
                if (!place.geometry) {
                    window.alert("Autocomplete's returned place contains no geometry");
                    return;
                }
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);  // Why 17? Because it looks good.
                }
                marker.setPosition(place.geometry.location);
                console.log('cambio');
                self.ruleForm.lat=place.geometry.location.lat();
                self.ruleForm.long=place.geometry.location.lng();
            });
            input.addEventListener('keypress', function (e) {
                let key = e.which || e.keyCode;
                if (key === 13) { // 13 is enter
                    e.preventDefault()
                }
            });
        },
     changeselFilter1(e){
            if(e){this.$refs.selFilter1.query="";}
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
            (self.$route.name=='establishment_edit')?'PUT':'POST',
            (self.$route.name=='establishment_edit')? config.establishment.list+"/"+self.$route.params.id: config.establishment.list,
            {
              name: self.ruleForm.name,
              category_id: self.ruleForm.category_id,
              country_id: self.ruleForm.country_id,
              address: self.ruleForm.address,
              phone: self.ruleForm.phone,
              office_hours: self.ruleForm.office_hours,
              website: self.ruleForm.website,
              description: self.ruleForm.description,
              latitude: self.ruleForm.lat,
              longitude: self.ruleForm.long,
              image: (self.ruleForm.file!=self.ruleForm.file_aux)?self.ruleForm.file:'',
              flagactive: self.ruleForm.flagactive+""
            },
             (state,res)=>{
                 if(state){
                    self.$alert(res.msg, 'Mensaje', {
                      confirmButtonText: 'OK',
                      type: 'success',
                      callback: action => {
                        self.$router.push({ name: 'establishment'})
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
                let aux=[],data=res.data;
                for (let i=0;i<data.length;i++) {
                        aux.push({'value':data[i].country_id+'','label':data[i].country});
                }
                self.ruleForm.options_country=aux;
                }

            },
            ()=>self.ruleForm.loading= true,
            ()=>self.ruleForm.loading= false
            );

            api.admin(
            'GET',
            config.category.list,
            null,
            (state,res)=>{
                if(state){
                let aux=[],data=res.data;
                for (let i=0;i<data.length;i++) {
                        if(parseInt(data[i].flagactive)){
                            aux.push({'value':data[i].id+'','label':data[i].name});
                        }
                }
                self.ruleForm.options_categories=aux;
                }

            },
            ()=>self.ruleForm.loading= true,
            ()=>self.ruleForm.loading= false
            );


            if(self.$route.name=='establishment_edit'){
                api.admin(
                'GET',
                config.establishment.list+"/"+self.$route.params.id,
                null,
                (state,res)=>{
                    if(state){
                        self.ruleForm.name=res.data.name;
                        self.ruleForm.country_id=res.data.country_id+"";
                        self.ruleForm.category_id=res.data.category_id+"";
                        self.ruleForm.flagactive=res.data.flagactive+"";
                        self.ruleForm.file=res.data.image;
                        self.ruleForm.file_aux=res.data.image;
                        self.ruleForm.address=res.data.address;
                        self.ruleForm.phone=res.data.phone;
                        self.ruleForm.office_hours=res.data.office_hours;
                        self.ruleForm.website=res.data.website;
                        self.ruleForm.description=res.data.description;

                        let position_ini={lat: parseFloat(res.data.latitude), lng: parseFloat(res.data.longitude)};
                        self.initMap(position_ini);
                    }
                },
                ()=>self.ruleForm.loading= true,
                ()=>self.ruleForm.loading= false
                );
            }else{
                let position_ini={lat: -12.0552608, lng: -77.0627323};
            self.initMap(position_ini);

            }


    }
}


</script>
<style lang="stylus">
    #pac-input
        background-color: #fff
        font-size: 15px
        font-weight: 300
        margin-left: 12px
        padding: 0 11px 0 13px
        text-overflow: ellipsis
        width: 304px
        border: none
        margin-right: 5px
        margin-top: 5px
        box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.42)
        border-radius: 0
        height: 40px
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