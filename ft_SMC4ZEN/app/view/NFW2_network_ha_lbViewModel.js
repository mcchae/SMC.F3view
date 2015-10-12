
Ext.define('SMC4ZEN.view.NFW2_network_ha_lbViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_ha_lb',

    data: {
        inter: __zen('inter'),
        target_ip: __zen('target_ip'),
        target_mac: __zen('target_mac'),
        ha_info1: __zen('ha_info1'),
        rank: __zen('rank'),
        src: __zen('src'),
        dest: __zen('dest'),
        action: __zen('action'),
        timeout: __zen('timeout'),
        add: __zen('add'),
        del: __zen('del'),
        check_period: __zen('check_period'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        ha_msg2: __zen('ha_msg2')
    }

});