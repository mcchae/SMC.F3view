
Ext.define('SMC4ZEN.view.ctn_smc_mainmenuViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ctn_smc_mainmenu',

    data: {
        xtm: [
            {
                title: getDefineText('tab_title_dev'),
                className: 'SMC4ZEN.view.pnl_smc_device_view'
            },
            {
                title: getDefineText('tab_title_obj'),
                className: 'SMC4ZEN.view.pnl_object_view'
            },
            {
                title: getDefineText('tab_title_spd'),
                className: 'SMC4ZEN.view.pnl_policy_view'
            }
        ],
        zen: [
            {
                title: getDefineText('tab_title_dev'),
                className: 'SMC4ZEN.view.pnl_smc_device_zen'
            },
            {
                title: getDefineText('tab_title_obj'),
                className: 'SMC4ZEN.view.pnl_zenobj_main'
            },
            {
                title: getDefineText('tab_title_commspd'),
                className: 'SMC4ZEN.view.pnl_smc_commspd_zen'
            }
        ],
        conf: [
            {
                title: getDefineText('tab_title_conf'),
                className: 'SMC4ZEN.view.pnl_setting_view'
            }
        ]
    }

});