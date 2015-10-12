
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    stores: [
        'MyJsonPTreeStore',
        'store1'
    ],
    views: [
        'MyViewport',
        'MyWindow'
    ],
    name: 'MyApp',

    launch: function() {
        Ext.create('MyApp.view.MyViewport');
    }

});
