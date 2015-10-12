
Ext.define('SMC4ZEN.view.NFW2_network_router_multicastViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_router_multicast',

    data: {
        inter: __zen('inter'),
        operate_rp: __zen('operate_rp'),
        bootstrap_prio: __zen('bootstrap_prio'),
        candidate_period: __zen('candidate_period'),
        candidate_prio: __zen('candidate_prio'),
        rp_address: __zen('rp_address'),
        static_rp: __zen('static_rp'),
        bootstrap_rp: __zen('bootstrap_rp'),
        large_high: __zen('large_high'),
        lower_high: __zen('lower_high'),
        multi_rp: __zen('multi_rp'),
        spt_conversion: __zen('spt_conversion'),
        register_rate: __zen('register_rate'),
        data_rate: __zen('data_rate'),
        monitoring_period: __zen('monitoring_period'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});