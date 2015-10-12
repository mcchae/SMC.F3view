
Ext.define('SMC4ZEN.view.win_ipm_networkViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ipm_network',

    data: {
        obj_name: __zen('obj_name'),
        inter: __zen('inter'),
        network: __zen('network'),
        detect: __zen('detect'),
        deny: __zen('deny'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});