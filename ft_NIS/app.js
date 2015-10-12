
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    views: [
        'pnl_wips_view'
    ],
    name: 'SMC',

    launch: function() {
        Ext.create('SMC.view.pnl_wips_view', {renderTo: Ext.getBody()});
    }

});
