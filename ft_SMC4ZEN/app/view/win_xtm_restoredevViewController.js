
Ext.define('SMC4ZEN.view.win_xtm_restoredevViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_xtm_restoredev',

    searchRestoreDevice: function() {
        var gpn_reslist = this.lookupReference('xtm_dev_reslist');

        var service = 'ftSMC',
            serchService = 'getRestoreObjectList',
            params = {

                'kind' : Ext.encode('obj_dev_xtm')

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                gpn_reslist.getStore().loadData(res);

            }

        );
    },

    onBt_deleteClick: function(button, e, eOpts) {
        var me = this;
        var win_instance = me.getView();
        var gpn_reslist = me.lookupReference('xtm_dev_reslist');
        var grp_select = gpn_reslist.getSelection();

        if(grp_select.length <= 0){

            Ext.Msg.show({

                'title' : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                'msg'   : '삭제할 장비를 선택 해주세요.',
                'icon'  : Ext.Msg.ERROR,
                'buttons' : Ext.Msg.OK

            });

            return;

        }

        Ext.Msg.show({
            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : '삭제된 장비가 영구삭제됩니다. 장비를 삭제하시겠습니까?',
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    var cidArray = [];

                    for(var i = 0; i < grp_select.length; i++){

                        cidArray.push(grp_select[i].get('@cid'));

                    }

                    var service = 'ftSMC',
                        serchService = 'delRestoreDevice',
                        params = {
                            'cid' : Ext.encode(cidArray)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                    service,
                    serchService,
                    params,
                    function(res){

                        me.searchRestoreDevice();

                    }

                    );

                }

            }

        });
    },

    onBt_restoreClick: function(button, e, eOpts) {
        var me = this;
        var win_instance = me.getView();
        var gpn_reslist = me.lookupReference('xtm_dev_reslist');
        var gpn_devlist = Ext.getCmp(DEVICE_COMMON_ID.devicelist);
        var grp_select = gpn_reslist.getSelection();

        if(grp_select.length <= 0){

            Ext.Msg.show({

                'title' : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                'msg'   : '복원할 장비를 선택 해주세요.',
                'icon'  : Ext.Msg.ERROR,
                'buttons' : Ext.Msg.OK

            });

            return;

        }

        Ext.Msg.show({
            title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
            msg : '선택된 장비가 복원됩니다. 장비를 복원하시겠습니까?',
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    var cidArray = [];

                    for(var i = 0; i < grp_select.length; i++){

                        cidArray.push(grp_select[i].get('@cid'));

                    }

                    var service      = 'ftSMC',
                        serchService = 'restoreDevice',
                        params       = {

                            'cid'   : Ext.encode(cidArray),
                            'g_cid' : Ext.encode(win_instance.groupCid)

                        };

                    request_helper.xmlrpc_call_Ajax_Post(
                    service,
                    serchService,
                    params,
                    function(res){

                        me.searchRestoreDevice();
                        deviceCUD.getDeviceList(win_instance.groupCid, gpn_devlist);

                    }

                    );

                }

            }

        });
    },

    onWin_xtm_restoredevAfterRender: function(component, eOpts) {
        this.lookupReference('xtm_dev_reslist').bindStore(Ext.getStore('st_restore_device'));

        this.searchRestoreDevice();
    },

    onWin_xtm_restoredevBeforeDestroy: function(component, eOpts) {
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    }

});
