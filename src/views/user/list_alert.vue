<template>
    <div class="center_content">
        <app-widget>
            <h2>USUARIOS EN ALERTA</h2>
            <div class="header_custom_table">
                <el-row :gutter="20">
                    <el-col :span="3">

                    </el-col>
                </el-row>
            </div>
            <table  v-loading="loading" id="user" v-bind:data-url="url_list" data-cols="id,name,lastname,start_date,end_date" class="js-datatable">
                <thead>
                <tr>
                    <td>ID</td>
                    <td>Nombre</td>
                    <td>Apellidos</td>
                    <td>Fecha Inicio</td>
                    <td>Fecha Fin</td>
                    <td class="no_sort">Acciones</td>
                </tr>
                </thead>
            </table>
            <div class="links_table hide">
                <div class="link_search">
                    <router-link :to="{ name: 'user_show' }" >
                        <el-button type="primary" size="mini" title="Detalle de usuario">
                            <i class="material-icons md-18">remove_red_eye</i>
                        </el-button>
                    </router-link>
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
          url_list: config.user.list_alert
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
                $(row).append('<td>' + link.prop('outerHTML')+'</td>');
                $(row).find('.link_search a').attr('href', link.find('a').attr('href') + '/' + data.id);
                $(row).attr("data-id", data.id);
                $(row).attr("data-status", data.flagactive);
             }
		 );
	  }
}

</script>