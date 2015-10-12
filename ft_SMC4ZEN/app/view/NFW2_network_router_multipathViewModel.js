
Ext.define('SMC4ZEN.view.NFW2_network_router_multipathViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_router_multipath',

    data: {
        line_sel: __zen('line_sel'),
        line_timeout: __zen('line_timeout'),
        network_base_set: __zen('network_base_set'),
        add: __zen('add'),
        del: __zen('del'),
        rank: __zen('rank'),
        src_type: __zen('src_type'),
        src_ip: __zen('src_ip'),
        dest_type: __zen('dest_type'),
        dest_ip: __zen('dest_ip'),
        inter: __zen('inter'),
        line_manager: __zen('line_manager'),
        checker_state_add: __zen('checker_state_add'),
        monitor_period_sec: __zen('monitor_period_sec'),
        limit_down: __zen('limit_down'),
        action: __zen('action'),
        upstream_band: __zen('upstream_band'),
        limit_band_k: __zen('limit_band_k'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});