
Ext.define('SMC4ZEN.view.win_router_staticViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_router_static',

    data: {
        dest_ipmask: __zen('dest_ipmask'),
        dest_ippre: __zen('dest_ippre'),
        gateway: __zen('gateway'),
        inter: __zen('inter'),
        metric: __zen('metric'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});