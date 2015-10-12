
Ext.define('SMC4ZEN.view.win_router_checkerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_router_checker',

    data: {
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        inter: __zen('inter'),
        target_ip: __zen('target_ip'),
        operate_mode: __zen('operate_mode'),
        tag_name: __zen('tag_name'),
        trans_cycle: __zen('trans_cycle'),
        checker_info3: __zen('checker_info3'),
        checker_info5: __zen('checker_info5'),
        checker_info6: __zen('checker_info6'),
        decision_method: __zen('decision_method')
    }

});