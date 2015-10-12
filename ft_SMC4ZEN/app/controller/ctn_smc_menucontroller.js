
Ext.define('SMC4ZEN.controller.ctn_smc_menucontroller', {
    extend: 'Ext.app.Controller',

    views: [
        'ctn_smc_mainmenu'
    ],

    /*
        일 시 : 2015.07.14

        설 명 : SMC의 메인 설정화면을 출력하는 토글버튼의 메인 이벤트입니다.
    */
    setToggleButton: function(component) {
        Ext.each(Ext.ComponentQuery.query('container[id="ctn_smc_mainmenu"] > container > button'), function(button){

            if(button === component){

                if(!button.pressed){

                    component.toggle();

                }

            }
            else if(button.pressed){

                button.toggle();

            }

        });
    },

    /*
        일 시 : 2015.07.14

        설 명 : 클릭된 버튼의 itemId에 따라 설정화면을 출력합니다.
    */
    showSmcSettingView: function(button, event, eOpts) {
        // 0. 공통변수 선언

        var vp = Ext.getCmp('vp_smc_main');
        var vp_center = vp.down('[itemId=ctn_smc_maincenter]');

        // 1. Center 아이템 모두 삭제

        vp_center.removeAll();

        // 2. 버튼에 따른 동작 분기

        switch(button.getItemId()){

            case 'bt_smc_device':

                vp_center.setLoading(getDefineMsg('chg_devview'), true);
                vp_center.add(Ext.create('SMC4ZEN.view.pnl_smc_device_view'));

                break;

            case 'bt_smc_policies':

                vp_center.setLoading(getDefineMsg('chg_polview'), true);
                vp_center.add(Ext.create('SMC4ZEN.view.pnl_policy_view'));

                break;

            case 'bt_smc_objects':

                vp_center.setLoading(getDefineMsg('chg_objview'), true);
                vp_center.add(Ext.create('SMC4ZEN.view.pnl_object_view'));

                break;

            case 'bt_smc_config':

                vp_center.setLoading(getDefineMsg('chg_cfgview'), true);
                vp_center.add(Ext.create('SMC4ZEN.view.pnl_setting_view'));

                break;

        }

        vp_center.setLoading(false);

        this.setToggleButton(button);
    },

    /*
        일 시 : 2015.07.14

        설 명 : SMC의 메인 메뉴를 구성하는 토글버튼의 이벤트를 정의합니다.
    */
    init: function(application) {
        this.control({

            '#bt_smc_device' : {	'click' : this.showSmcSettingView   },
            '#bt_smc_policies' : {	'click' : this.showSmcSettingView	},
            '#bt_smc_objects' : {	'click' : this.showSmcSettingView	},
            '#bt_smc_config' : {	'click' : this.showSmcSettingView	}

        });
    }

});
