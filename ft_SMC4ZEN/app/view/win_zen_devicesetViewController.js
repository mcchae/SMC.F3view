
Ext.define('SMC4ZEN.view.win_zen_devicesetViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_zen_deviceset',

    onCtn_zen_devicesetviewBeforeRender: function(component, eOpts) {
        var tmpZenUri = 'https://10.31.1.91:8443';

        Ext.applyIf(component, {

            'autoEl' : {

                'tag' : "iframe",
                'src' : tmpZenUri

            }

        });
    },

    /*
        일 시 : 2015.09.13

        설 명 : ZEN 장비의 환경설정 윈도우를 종료합니다.
    */
    onBt_closeClick: function(button, e, eOpts) {
        var me = this.getView();

        me.close();
    }

});
