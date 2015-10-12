
Ext.define('SMC4ZEN.view.NFW2_system_backupViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.nfw2_system_backup',

    data: {
        setting_backup: __zen('setting_backup'),
        immediate_backup: __zen('immediate_backup'),
        hour: __zen('hour'),
        min: __zen('min'),
        period_backup: __zen('period_backup'),
        backup_period: __zen('backup_period'),
        backup_time: __zen('backup_time'),
        pwd: __zen('pwd'),
        support_ftp: __zen('support_ftp'),
        ftp_server_set: __zen('ftp_server_set'),
        setting_restore: __zen('setting_restore'),
        sel_menually: __zen('sel_menually'),
        sel_backup_list: __zen('sel_backup_list'),
        file_location: __zen('file_location'),
        pwd: __zen('pwd'),
        file_backup: __zen('file_backup'),
        restore_previous: __zen('restore_previous'),
        file_find: __zen('file_find'),
        firmware: __zen('firmware'),
        ramdisk: __zen('ramdisk'),
        image: __zen('image'),
        do_f3: __zen('do_f3'),
        apply_date_firmware: __zen('apply_date_firmware'),
        apply_date_ramdisk: __zen('apply_date_ramdisk'),
        apply_date_image: __zen('apply_date_image'),
        apply_date_do: __zen('apply_date_do'),
        restore_firmware: __zen('restore_firmware'),
        restore_ramdisk: __zen('restore_ramdisk'),
        restore_image: __zen('restore_image'),
        restore_do: __zen('restore_do'),
        restore_process_restart: __zen('restore_process_restart'),
        integrity_chk: __zen('integrity_chk'),
        monitor_device: __zen('monitor_device'),
        immediate_execute: __zen('immediate_execute'),
        period_chk: __zen('period_chk'),
        confirm: __zen('confirm'),
        cancel: __zen('cancel')
    },
    formulas : {
        use_integrity : {
            bind : '{system_integrity.use}',
            get : function(value){
                return (value === 'off') ? false : true;
            },
            set : function(value){
                this.get('system_integrity').use = value
            }
        }
    }

});