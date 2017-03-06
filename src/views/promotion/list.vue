<template>
    <div class="center_content">
        <app-widget>
            <h2>PROMOCIONES</h2>
            <div class="header_custom_table">
                <el-row :gutter="10">
                    <el-col :span="5">
                        <router-link :to="{ name: 'promotion_create' }" >
                            <el-button type="success" >NUEVA PROMOCIÓN</el-button>
                        </router-link>
                    </el-col>


                        <el-col :span="4">
                            <el-select clearable filterable v-model="establishment" placeholder="Establecimiento" @change="filterByEstablishment">
                                <el-option
                                        v-for="item in options_establishment"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-col>
                    <el-col :span="4">
                        <el-select clearable filterable v-model="card" placeholder="Usuario" @change="filterByUser">
                            <el-option
                                    v-for="item in options_cards"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </div>
            <table  v-loading="loading" id="promotion" v-bind:data-url="url_list" data-cols="id,title,image,description,card" class="js-datatable">
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>Imagen</td>
                    <td>Descripción</td>
                    <td>Usuario</td>
                    <td class="no_sort">Acciones</td>
                </tr>
                </thead>
            </table>
            <div class="links_table hide">
                <div class="link_search">
                    <router-link :to="{ name: 'promotion_edit' }" >
                        <el-button type="primary" size="mini" title="Editar promoción">
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
          url_list: config.promotion.list,
          establishment:'',
          options_establishment:'',
          options_cards:'',
          card:''
      }
    },
    methods:{
        reloadFilters(){
            let self=this;
            window.datatable_promotion.ajax.url(self.url_list+'?&search[establishment_id]='+self.establishment+'&search[card_id]='+self.card+'&').load();
        },
        filterByEstablishment(e){
           this.reloadFilters()
        },
        filterByUser(e){
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
        config.promotion.establishment,
        null,
        (state,res)=>{
            if(state){
                let aux=[],data=res.data;
                for (let i=0;i<data.length;i++) {
                    aux.push({'value':data[i].id+'','label':data[i].name});
                }

                self.options_establishment=aux
            }
        },
        ()=>self.loading=true,
        ()=>self.loading=false
     );

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

                self.options_cards=aux
            }
        },
        ()=>self.loading=true,
        ()=>self.loading=false
     );

    }

}

</script>