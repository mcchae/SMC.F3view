
Ext.define('SMC4ZEN.view.NFW2_network_dns_iodnsViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_dns_iodns',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        direction: __zen('direction'),
        domain_name: __zen('domain_name'),
        type4: __zen('type4'),
        host_name: __zen('host_name'),
        host_ip: __zen('host_ip')
    }

});