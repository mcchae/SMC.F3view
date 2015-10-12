
Ext.define('SMC4ZEN.view.NFW2_network_router_checkerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_network_router_checker',

    data: {
        add: __zen('add'),
        del: __zen('del'),
        inter: __zen('inter'),
        target_ip: __zen('target_ip'),
        operate_mode: __zen('operate_mode'),
        tag_name: __zen('tag_name'),
        trans_cycle: __zen('trans_cycle'),
        decision_method: __zen('decision_method')
    }

});