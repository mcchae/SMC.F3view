
Ext.define('SMC4ZEN.view.vp_smc_mainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.vp_smc_main',

    /*
        일 시 : 2015.09.18

        설 명 : 탭이 변경되면 구동되는 타이머를 종료합니다.
    */
    onTpn_smc_maincenterTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        // 장비 타이머 종료

        var pnl_zen_devmain = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);
        var pnl_xtm_devmain = Ext.getCmp(DEVICE_COMMON_ID.devicemain);

        if(pnl_zen_devmain){

            if(pnl_zen_devmain.taskObj){

                clearInterval(pnl_zen_devmain.taskObj);

            }

        }

        if(pnl_xtm_devmain){

            if(pnl_xtm_devmain.taskObj){

                clearInterval(pnl_xtm_devmain.taskObj);

            }

        }
    }

});
