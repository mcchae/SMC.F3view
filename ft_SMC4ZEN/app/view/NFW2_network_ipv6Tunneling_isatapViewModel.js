
Ext.define('SMC4ZEN.view.NFW2_network_ipv6Tunneling_isatapViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_ipv6tunneling_isatap',

    data: {
        add: __zen('add'),
        ipv6_prefix: __zen('ipv6_prefix'),
        name: __zen('name'),
        inter: __zen('inter'),
        ttl: __zen('ttl'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});