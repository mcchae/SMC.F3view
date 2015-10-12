
Ext.define('SMC.view.LogSetting', {
    extend: 'Ext.window.Window',

    buttons: '{\n    text: \'Ok\'\n},\n{\n    text: \'Cancel\'\n}',
    height: 600,
    width: 800,
    title: 'My Window',

    initComponent: function() {
        var me = this;

        me.callParent(arguments);
    }

});