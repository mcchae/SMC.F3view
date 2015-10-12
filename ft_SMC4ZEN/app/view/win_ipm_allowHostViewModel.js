
Ext.define('SMC4ZEN.view.win_ipm_allowHostViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_ipm_allowhost',

    data: {
        ip: __zen('ip'),
        mac: __zen('mac'),
        start: __zen('start'),
        end: __zen('end'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});