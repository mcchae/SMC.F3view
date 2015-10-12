
// @require @packageOverrides
Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    stores: [
        'st_tmov_extension',
        'st_tmov_extension_list',
        'st_tmov_policy',
        'st_tmov_send_policy',
        'st_tmov_upgrade',
        'st_tmov_extension_window',
        'st_tmov_send_agent',
        'st_tmov_send_pattern',
        'st_tmov_signature',
        'st_tmov_policy_select',
        'st_tmov_user_send',
        'st_tmov_event_log',
        'st_tmov_file_log',
        'st_tmov_agent_log',
        'st_tmov_url_log',
        'st_tmov_agent',
        'st_tmov_tmm_server',
        'st_tmov_send_tmm',
        'st_tmov_url_stats',
        'st_tmov_agent_stats',
        'st_tmov_file_stats'
    ],
    views: [
        'win_tmov_agent',
        'win_tmov_pattern',
        'win_tmov_user_send',
        'win_tmov_tmus_setting',
        'pnl_tmov_log',
        'win_tmov_pattern_config',
        'win_tmov_agent_config',
        'win_tmov_tmm_config',
        'win_tmov_tmm',
        'win_tmov_basic_policy',
        'win_tmov_chart',
        'win_tmov_key'
    ],
    name: 'TMOV',

    launch: function() {
        Ext.create('TMOV.view.main_view');
    }

});
