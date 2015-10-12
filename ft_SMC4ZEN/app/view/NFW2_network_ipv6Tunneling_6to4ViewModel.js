
Ext.define('SMC4ZEN.view.NFW2_network_ipv6Tunneling_6to4ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_ipv6tunneling_6to4',

    data: {
        ipv4_inter: __zen('ipv4_inter'),
        ttl: __zen('ttl'),
        add: __zen('add'),
        ipv6_dest: __zen('ipv6_dest'),
        remote_ipv4: __zen('remote_ipv4'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')

    }

});
