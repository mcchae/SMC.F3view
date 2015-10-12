
Ext.define('SMC4ZEN.view.ctn_smc_mainmenuViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ctn_smc_mainmenu',

    /*
        일 시 : 2015.09.08

        설 명 : 선택된 장비의 설정화면을 탭-패널에 추가한다.
    */
    showProductView: function(component) {
        // 0. 공통변수 선언

        var me = this;
        var that = me.getView();
        var vm = me.getViewModel();
        var vd = vm.getData();
        var vp = Ext.getCmp(SMC_COMMON_ID.smcviewport);
        var vp_center = vp.down('[itemId=tpn_smc_maincenter]');

        // 1. 센터 - 패널의 아이템 모두 삭제

        vp_center.removeAll();

        // 2. 버튼에 따른 동작 분기

        switch(component.getItemId()){

            case 'bt_smc_xtm':

                for(var i = 0; i < vd.xtm.length; i++){

                    var tab_tmp = Ext.create(vd.xtm[i].className, {

                        'title' : vd.xtm[i].title,
                        'layout' : 'border'

                    });

                    vp_center.add(tab_tmp);

                }

                break;

            case 'bt_smc_zen':

                for(var i = 0, max = vd.zen.length; i < max; i++){

                    var tab_tmp = Ext.create(vd.zen[i].className, {

                        'title' : vd.zen[i].title,
                        'layout' : 'border'

                    });

                    vp_center.add(tab_tmp);

                }

                break;

            case 'bt_smc_config':

                for(var i = 0, max = vd.conf.length; i < max; i++){

                    var tab_tmp = Ext.create(vd.conf[i].className, {

                        'title' : vd.conf[i].title,
                        'layout' : 'border'

                    });

                    vp_center.add(tab_tmp);

                }

                break;

        }

        vp_center.setActiveTab(0);

        me.setProductToggleState(component);
    },

    setProductToggleState: function(component) {
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

    onBt_smc_dashClick: function(button, e, eOpts) {
        this.showProductView(button);
    },

    onBt_smc_zenClick: function(button, e, eOpts) {
        this.showProductView(button);
    },

    onBt_smc_xtmClick: function(button, e, eOpts) {
        this.showProductView(button);
    },

    onBt_smc_configClick: function(button, e, eOpts) {
        this.showProductView(button);
    },

    /*
        일 시 : 2015.07.14

        설 명 : 접속되어있는 SMC의 세션을 종료합니다.
    */
    onBt_smc_logoutClick: function(button, e, eOpts) {
        var vp = Ext.getCmp('vp_smc_main');

        vp.logout(true);
    }

});
