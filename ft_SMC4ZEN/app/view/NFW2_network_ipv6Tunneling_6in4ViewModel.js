
Ext.define('SMC4ZEN.view.NFW2_network_ipv6Tunneling_6in4ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_ipv6tunneling_6in4',

    data: {
        ipv4_inter: __zen('ipv4_inter'),
        add: __zen('add'),
        ipv6_dest: __zen('ipv6_dest'),
        tunnel_inter: __zen('tunnel_inter'),
        remote_ipv4: __zen('remote_ipv4'),
        ttl: __zen('ttl'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});
