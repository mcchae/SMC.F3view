
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    stores: [
        'st_ssl_devices',
        'st_ssl_range',
        'st_ssl_log',
        'st_ssl_restore_log'
    ],
    views: [
        'pnl_ssl_log',
        'win_ssl_export_log',
        'win_ssl_backup_log',
        'win_ssl_restore_log'
    ],
    name: 'SSL'
});
