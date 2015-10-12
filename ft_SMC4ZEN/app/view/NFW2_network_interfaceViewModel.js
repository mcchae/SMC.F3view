
Ext.define('SMC4ZEN.view.NFW2_network_interfaceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_interface',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        zone: __zen('zone'),
        inter: __zen('inter'),
        section: __zen('section'),
        interface_info: __zen('interface_info'),
        dup_spe_mtu_mss: __zen('dup_spe_mtu_mss'),
        virtual_ip: __zen('virtual_ip'),
        multipath_dhcp: __zen('multipath_dhcp'),
        etc: __zen('etc')
    }

});