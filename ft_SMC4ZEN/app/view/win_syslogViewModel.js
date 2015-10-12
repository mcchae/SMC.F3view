
Ext.define('SMC4ZEN.view.win_syslogViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.win_syslog',

    data: {
        ip: __zen('ip'),
        port: __zen('port'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    }

});