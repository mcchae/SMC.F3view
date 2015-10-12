
Ext.define('SMC4ZEN.view.win_smc_commspdsetViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_smc_commspdset',

    getCommspdGroup: function(g_type) {
        var me = this.lookupReference('zen_commspd_devgroup');
        var that = this;

        me.setLoading(getDefineMsg('lod_group'), true);

        request_helper.xmlrpc_call_Ajax_Post(
            'ftZEN',
            'getGroup',
            {

                gtype : Ext.encode(g_type)

            },
            function(res){

                that.initExpandNode(res.children);

                me.setRootNode(res);
                me.setLoading(false);

                me.gtype = g_type;

            }

        );
    },

    initExpandNode: function(children) {
        var me = this;

        for(var i = 0, max = children.length; i < max; i++){

            if(children[i].expanded === "true" || children[i].expanded === "false"){

                children[i].expanded = false;

            }

            if(children[i].children){

                me.initExpandNode(children[i].children);

            }

        }var me = this;

        for(var i = 0, max = children.length; i < max; i++){

            if(children[i].expanded === "true" || children[i].expanded === "false"){

                children[i].expanded = false;

            }

            if(children[i].children){

                me.initExpandNode(children[i].children);

            }

        }
    },

    searchCommspdList: function(g_type, search_value) {
        var tb_searchtool = this.lookupReference('zen_commspd_searchtoolbydev');
        var gpn_commspdlist = this.lookupReference('zen_gpn_spdlistbydev');

        var chk_include = tb_searchtool.donw('[itemId=chk_include]');
        var txf_searchval = tb_searchtool.donw('[itemId=txf_search]');

        var condition = {};

        if(search_value){

            if(chk_include.getValue()){

                condition.name = search_value;
                condition.op_in = true;

            }
            else{

                condition.name = search_value;
                condition.op_eq	= true;

            }

            if(condition){

                condition.kind = g_type;

                gpn_commspdlist.getStore().getProxy().extraParams = {

                    'condition' : Ext.encode(condition)

                };

                gpn_commspdlist.getStore().getProxy().url = 'api/ftZEN/findObjectList/';
                gpn_commspdlist.getStore().loadPage(1);

            }

        }
    },

    onCtn_view_detailzenBeforeRender: function(component, eOpts) {
        var vp = Ext.getCmp(SMC_COMMON_ID.smcviewport);
        var win_detail = this.getView();
        var connect_uri = 'https://' + vp.clientInfo.hostIp + ':9443';

        if(win_detail.viewId){

            connect_uri += '/setDB/' + win_detail.conn_info._database + '?menu=%22' + win_detail.viewId + '%22';

        }
        else{

            Ext.Msg.show({
                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_null_profviewid'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });

        }

        Ext.applyIf(component, {

            'autoEl' : {

                'tag' : "iframe",
                'src' : connect_uri

            }

        });
    },

    onBt_saveClick: function(button, e, eOpts) {
        var that = this;

        var me = that.getView();

        var pnl_main = Ext.getCmp(SMC_COMMSPD_ID.commspdmain);
        var pnl_group = Ext.getCmp(SMC_COMMSPD_ID.commspdgroup);
        var pnl_center = pnl_main.down('[itemId=pnl_zen_center]');

        var tb_searchtool = pnl_center.down('[itemId=tb_zen_commspd_search]');
        var tb_managetool = pnl_center.down('[itemId=tb_zen_commspd_managetool]');

        var dat_opin = tb_searchtool.down('[itemId=chk_include]').getValue();
        var dat_searchVal = tb_searchtool.down('[itemId=txf_search]').getValue();

        var grp_select = pnl_group.getSelection()[0];

        var gpn_commspdlist = Ext.getCmp(SMC_COMMSPD_ID.commspdlist);
        var gpn_commspdselect = gpn_commspdlist.getStore();

        // 장비 기본 정보 저장

        var txf_profname = this.lookupReference('zen_commspd_profname');

        var commspd_name = txf_profname.getValue();
        var commspd_desc = this.lookupReference('zen_commspd_profdesc').getValue();

        if(commspd_name === ""){

            Ext.Msg.show({

                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_null_valid'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR,
                fn : function(){

                    txf_profname.focus();

                }

            });

            return false;

        }

        me.conn_info.name = commspd_name;
        me.conn_info.desc = commspd_desc;

        // 생성된 윈도우에 따라 동작 분기

        if(me.openMode === 'comm_spd'){

            if(me.action_dev === 'ADD'){

                zenProfCRUD.addZenProfile(grp_select.get('cid'), me.conn_info, function(res){

                    zenProfCRUD.getZenProfileList(gpn_commspdlist, tb_managetool, grp_select, ZEN_GROUP_SPDRECURSIVE, dat_searchVal, dat_opin);

                });

                me.delTempDB = false;

                me.close();

            }
            else{

                zenProfCRUD.modZenProfile(me.conn_info, function(res){

                    zenProfCRUD.getZenProfileList(gpn_commspdlist, tb_managetool, grp_select, ZEN_GROUP_SPDRECURSIVE, dat_searchVal, dat_opin);

                });

                me.delTempDB = false;

                me.close();

            }

        }
    },

    onBt_cancelClick: function(button, e, eOpts) {
        this.getView().close();
    },

    onWin_smc_commspdsetAfterRender: function(component, eOpts) {
        this.lookupReference('zen_commspd_profname').setValue(component.conn_info.name);
        this.lookupReference('zen_commspd_profdesc').setValue(component.conn_info.desc);
    },

    onWin_smc_zendevice_setBeforeDestroy: function(component, eOpts) {
        var me = this.getView();
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);
        var pnl_center = pnl_main.down('[itemId=pnl_zen_center]');
        var pnl_group = Ext.getCmp(DEVICE_COMMON_ID.devicezengroup);

        var g_cid = pnl_group.getSelection()[0].get('cid');

        var tb_searchtool = pnl_center.down('[itemId=tb_zen_device_search]');
        var tb_managetool = pnl_center.down('[itemId=tb_zen_device_managetool]');

        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
        var st_zenlist = gpn_zenlist.getStore();

        // 프로파일이 추가 모드로 오픈되었을 경우 DB 삭제 API 호출

        if(component.action_dev === 'ADD'){

            if(me.delTempDB){

                request_helper.xmlrpc_call_Ajax_Post(
                'ftZEN',
                'delTempDevice',
                {

                    cid : Ext.encode(me.conn_info['@cid'])

                },
                function(res){});

            }

        }

        var service = 'ftZEN',
            svc_func = 'clrObject',
            params = {

                'cid' : Ext.encode(me.conn_info['@cid'])

            };

        request_helper.xmlrpc_call_Ajax_Post(
        service,
        svc_func,
        params,
        function(res){}

        );
    }

});
