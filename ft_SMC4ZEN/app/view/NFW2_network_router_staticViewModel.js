
Ext.define('SMC4ZEN.view.NFW2_network_router_staticViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_router_static',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        fw_export: __zen('fw_export'),
        fw_import: __zen('fw_import'),
        ipv4: __zen('ipv4'),
        ipv6: __zen('ipv6'),
        dest_ipmask: __zen('dest_ipmask'),
        gateway: __zen('gateway'),
        metric: __zen('metric'),
        inter: __zen('inter'),
        last_edit: __zen('last_edit'),
        desc: __zen('desc'),
        use: __zen('use')
    }

});