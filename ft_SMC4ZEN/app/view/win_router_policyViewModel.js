
Ext.define('SMC4ZEN.view.win_router_policyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_router_policy',

    data: {
        rank: __zen('rank'),
        src_ipmask: __zen('src_ipmask'),
        src_ippre: __zen('src_ippre'),
        dest_ipmask: __zen('dest_ipmask'),
        dest_ippre: __zen('dest_ippre'),
        gateway: __zen('gateway'),
        inter: __zen('inter'),
        desc: __zen('desc'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});