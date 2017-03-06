import store from '../../store';
import '../libs/datatables/js/jquery.dataTables.js'
import jsonLanguageDT from './JsonDataTable'
import {MessageBox,Notification} from 'element-ui'
import converse from '../../api/jetperu'

function validateNull(data) {
    if (data != null && data != "") {
        return data
    } else {
        return "----"
    }
}
function showImagen(data) {
    return '<img src="' + data + '"  />';
}


export function initDT(
    $table,
    cb = ()=> {},
    cbBefore = ()=> {},
    cbComplete = ()=> {},
    cbRow = ()=> {}
   ) {
    let array = $table.attr("data-cols").split(",");
    let  obj = [];
    for (let key in array) {
        if (array[key] == "image") {
            obj.push({

                data: array[key],
                render: showImagen
            });
        } else {
            obj.push({
                data: array[key],
                render: validateNull
            });
        }
    }

    let url=$table.attr("data-url");
    let id=$table.attr('id');
    window['datatable_'+id]=$table.DataTable({
        rowCallback: function (row, data, index) {
            cbRow(row,data,index);
        },
        oLanguage: jsonLanguageDT,
        processing: true,
        serverSide: true,
        searching: true,
        bLengthChange: false,
        autoWidth: false,
        scrollX: false,
        ajax: {
            "url": url,
            "headers": {'Authorization': store.getters.getToken},
            "data": function (d) {
                d.myKey = "myValue";
            },
            "beforeSend": function () {
                cbBefore()
            },
            "complete": function () {
                cbComplete()
            }
        },
        columns: obj,
        columnDefs: [
            {
                'targets': 'no_sort',
                'orderable': false
            }, {
                'targets': 'no_search',
                'searchable': false
            }
        ]
    });

    $(document).on('click','.link_delete button',function(e){
        MessageBox.confirm('¿Está seguro que desea eliminar?', 'Alerta', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
        }).then(() => {
            let table=$('.js-datatable');
            converse.admin(
                'DELETE',
                table.DataTable().ajax.url()+"/"+$(e.currentTarget).closest('tr').data('id'),
                null,
                (state,res)=>{
                    if(state){
                        Notification({
                            title: 'Exito',
                            message: res.msg,
                            type: 'success'
                        });
                        table.DataTable().ajax.reload()
                    }
                }
            )

        });
    });
    $(document).on('click','.link_active button',function(e){
        let id_row=$(e.currentTarget).closest('tr').data('id');
        let status=$(e.currentTarget).closest('tr').data('status');
        let def='',message='';
        if(parseInt(status)){
            def="/inactive/";
            message="¿Está seguro que desea bloquear?";
        }else{
            def="/active/";
            message="¿Está seguro que desea desbloquear?";
        }
        MessageBox.confirm(message, 'Alerta', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancelar',
            type: 'warning'
        }).then(() => {
            let table=$('.js-datatable');
            converse.admin(
                'GET',
                table.DataTable().ajax.url()+def+id_row,
                null,
                (state,res)=>{
                    if(state){
                        Notification({
                            title: 'Exito',
                            message: res.msg,
                            type: 'success'
                        });
                        table.DataTable().ajax.reload()
                    }
                }
            )

        });
    });

};
