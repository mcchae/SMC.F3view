
Ext.define('MyApp.view.MyWindow', {
    extend: 'Ext.window.Window',

    height: 250,
    width: 400,
    resizable: false,
    title: 'My Window',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});