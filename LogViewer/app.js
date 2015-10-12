
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    stores: [
        'id_store_log_user',
        'id_store_log_event'
    ],
    views: [
        'win_log_setting',
        'win_log_login'
    ],
    controllers: [
        'MyController'
    ],
    name: 'SMC',

    launch: function() {
        Ext.create('SMC.view.pnl_log_view', {renderTo: Ext.getBody()});
    }

});
