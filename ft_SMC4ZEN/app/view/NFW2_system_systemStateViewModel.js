
Ext.define('SMC4ZEN.view.NFW2_system_systemStateViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_systemstate',

    data: {
        stop_service: __zen('stop_service'),
        restart_service: __zen('restart_service'),
        shutdown_system: __zen('shutdown_system'),
        restart_system: __zen('restart_system'),
        restart_reserved: __zen('restart_reserved'),
        toggle_off: __zen('toggle_off'),
        toggle_on: __zen('toggle_on'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel'),
        reset: __zen('reset'),
        date_entry: __zen('date_entry'),
        time_entry: __zen('time_entry'),
        system_info4: __zen('system_info4'),
        hour: __zen('hour'),
        min: __zen('min')
    }

});