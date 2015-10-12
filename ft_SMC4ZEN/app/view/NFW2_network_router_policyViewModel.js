
Ext.define('SMC4ZEN.view.NFW2_network_router_policyViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_router_policy',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        ipv4: __zen('ipv4'),
        ipv6: __zen('ipv6'),
        rank: __zen('rank'),
        src_ipmask: __zen('src_ipmask'),
        dest_ipmask: __zen('dest_ipmask'),
        getaway: __zen('gateway'),
        inter: __zen('inter'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        use: __zen('use')
    }

});