<template>
    <div class="center_content">
        <app-widget>
            <h2>ADMINISTRADORES</h2>
            <div class="header_custom_table">
                <el-row :gutter="10">
                    <el-col :span="3">
                        <router-link :to="{ name: 'admin_new' }" >
                            <el-button type="success" >NUEVO ADMINISTRADOR</el-button>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <table  v-loading="loading" id="administrator" v-bind:data-url="url_list" data-cols="id,name,lastname,email" class="js-datatable">
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>Apellidos</td>
                    <td>Email</td>
                    <td class="no_sort">Acciones</td>
                </tr>
                </thead>
            </table>
            <div class="links_table hide">
                <div class="link_search">
                    <router-link :to="{ name: 'admin_edit' }" >
                        <el-button type="primary" size="mini" title="Editar administrador">
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

export default {
  components: {
    AppWidget
  },
  data() {
      return {
          loading:false,
          url_list: config.admin.list
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
	  }
}

</script>