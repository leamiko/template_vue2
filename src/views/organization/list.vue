<template>
    <div class="center_content">
        <app-widget>
            <h2>ORGANIZACIONES</h2>
            <div class="header_custom_table">
                <el-row :gutter="10">
                    <el-col :span="6">
                        <router-link :to="{ name: 'organization_create' }" >
                            <el-button type="success" >NUEVO ORGANIZACIÓN</el-button>
                        </router-link>
                    </el-col>
                    <el-col :span="4">
                        <el-select  @change="changesCountry1" filterable clearable
                                    v-model="country_origin_id" placeholder="Pais">
                            <el-option
                                    v-for="item in options_country"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <table  v-loading="loading" id="organization" v-bind:data-url="url_list" data-cols="id,name,description,address,phone_main,country" class="js-datatable">
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>Descripción</td>
                    <td>Dirección</td>
                    <td>Teléfono</td>
                    <td>País</td>
                    <td class="no_sort">Acciones</td>
                </tr>
                </thead>
            </table>
            <div class="links_table hide">
                <div class="link_search">
                    <router-link :to="{ name: 'organization_edit' }" >
                        <el-button type="primary" size="mini" title="Editar organización">
                            <i class="material-icons md-18">search</i>
                        </el-button>
                    </router-link>
                </div>
                <div class="link_delete">
                    <el-button type="primary" size="mini" title="Eliminar">
                        <i class="material-icons md-18">delete</i>
                    </el-button>
                </div>
                <div class="link_active">
                    <el-button type="primary" size="mini" title="">
                        <i class="material-icons md-18"></i>
                    </el-button>
                </div>
            </div>
        </app-widget>
    </div>
</template>
<script>
import AppWidget from '../../components/AppWidget';
import config from '../../api/config';
import {initDT} from "../../js/helpers/initDataTable.js"
import api from '../../api/jetperu';


export default {
  components: {
    AppWidget
  },
  data() {
      return {
          loading:false,
          url_list: config.organization.list,
           options_country:'',
          country_origin_id:'',
      }
    },
    methods:{
        reloadFilters(){
            let self=this;
            window.datatable_organization.ajax.url(self.url_list+'?&search[country_id]='+self.country_origin_id+'&').load();
        },
        changesCountry1(e){
           this.reloadFilters()
        }
    },
	  mounted: function () {
	    let self=this;
		 initDT(
             $('.js-datatable'),
             null,
             ()=>self.loading=true,
             ()=>self.loading=false,
             (row,data,index)=>{
                 let link = $('.links_table .link_search');
                 let link_delete =  $('.links_table .link_delete');
                 let link_active =  $('.links_table .link_active');
                 if(parseInt(data.flagactive)){
                    link_active.find('button').attr('title','Bloquear').find('i').text('lock_open');
                 }else{
                    link_active.find('button').attr('title','Desbloquear').find('i').text('lock');
                 }
                $(row).append('<td>' + link.prop('outerHTML')+link_active.prop('outerHTML')+link_delete.prop('outerHTML')+'</td>');
                $(row).find('.link_search a').attr('href', link.find('a').attr('href') + '/' + data.id);
                $(row).attr("data-id", data.id);
                $(row).attr("data-status", data.flagactive);
             }
		 );
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
                    self.options_country=aux;
                }
            },
            ()=>self.loading= true,
            ()=>self.loading= false
            );
	  }
}

</script>