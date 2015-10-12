
Ext.define('SMC4ZEN.view.NFW2_system_updateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_update',

    data: {
        file_update: __zen('file_update'),
        file_add: __zen('file_add'),
        file_upload: __zen('file_upload'),
        sig_db_update: __zen('sig_db_update'),
        chg_content: __zen('chg_content'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        url_or_server: __zen('url_or_server'),
        immediate_update: __zen('immediate_update'),
        execution_period: __zen('execution_period'),
        update_info14: __zen('update_info14')
    }

});