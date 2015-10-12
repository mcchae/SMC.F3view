
Ext.define('SMC4ZEN.view.win_multipath_lineViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_multipath_line',

    data: {
        inter: __zen('inter'),
        monitor_period: __zen('monitor_period'),
        sec: __zen('sec'),
        limit_band: __zen('limit_band'),
        limit_down: __zen('limit_down'),
        action: __zen('action'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        add_line_manager: __zen('add_line_manager'),
        edit_line_manager: __zen('edit_line_manager'),
        detect: __zen('detect'),
        inter_down: __zen('inter_down')
    }

});