
Ext.define('SMC4ZEN.view.NFW2_network_router_vrrpViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_router_vrrp',

    data: {
        group_id: __zen('group_id'),
        inter: __zen('inter'),
        priority_level: __zen('priority_level'),
        period: __zen('periods'),
        group_ip: __zen('group_ip'),
        operate_mode: __zen('operate_mode'),
        add: __zen('add'),
        del: __zen('del')
    }

});