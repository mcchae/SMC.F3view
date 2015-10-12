
Ext.define('SMC4ZEN.view.pnl_smc_commspd_zenViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pnl_smc_commspd_zen',

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

    getCommspdMenuId: function(kind) {
        switch(kind){

            case 'object_firewall_filter_ipv4' : 	return 'NFW2_firewall_policy_filtering';
            case 'object_firewall_nat_ipv4' :		return 'NFW2_firewall_policy_NAT';
            case 'object_whitelist' : 				return 'NFW2_firewall_policy_white';
            case 'object_blacklist' : 				return 'NFW2_firewall_policy_black';
            case 'object_firewall_nat64' : 			return 'NFW2_firewall_policy_ipv6_NAT64';
            case 'object_firewall_dns64' : 			return 'NFW2_firewall_ipv6_dns64';
            case 'object_vpn_ipsec' : 				return 'NFW2_ipsec_security_securityConf';
            default:
                return false;

        }
    },

    createContextByCommspd: function() {
        var me = this;
        var pnl_main = this.getView();
        var pnl_group = this.lookupReference('zen_commspd_group');
        var pnl_center = this.lookupReference('zen_commspd_center');
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');

        var chk_opin = this.lookupReference('chk_commspdinclude');
        var txf_search = this.lookupReference('txf_commspdsearch');
        var tb_managetool = this.lookupReference('zen_commspd_control');

        var commspd_Context_Array = [

            {
                'name' : getDefineText('ctm_menu_addcommspd'),
                'itemId' : 'mi_commspd_add',
                'children' : null,
                'callback' : function(){

                    var grp_select = pnl_group.getSelection()[0];

                    if(!grp_select){

                        Ext.Msg.show({
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_fail_addspd'),
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });

                        return false;

                    }

                    var grp_kind = grp_select.get('_kind');

                    request_helper.xmlrpc_call_Ajax_Post(
                        'ftZEN',
                        'getObjectDefault',
                        {

                            kind : Ext.encode(grp_kind)

                        },
                        function(res){

                            if(res){

                                var win_detail = Ext.create('SMC4ZEN.view.win_smc_commspdset', {

                                    'viewId' : me.getCommspdMenuId(grp_kind),
                                    'openMode' : 'comm_spd',
                                    'conn_info' : res,
                                    'action_dev' : 'ADD'

                                });

                                win_detail.show();

                            }
                            else{

                                Ext.Msg.show({
                                    title : SMC_SET_PRODUCT,
                                    msg : getDefineMsg('err_null_profkind'),
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR
                                });

                            }

                        });

                }

            },
            {
                'name' : getDefineText('ctm_menu_modcommspd'),
                'itemId' : 'mi_commspd_mod',
                'children' : null,
                'callback' : function(){

                    var grp_select = pnl_group.getSelection()[0];
                    var grp_spdselect = gpn_spdlist.getSelection()[0];

                    if(!grp_select || !grp_spdselect){

                        Ext.Msg.show({
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_fail_modspd'),
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });

                        return false;

                    }

                    var grp_kind = grp_select.get('_kind');

                    request_helper.xmlrpc_call_Ajax_Post(
                        'ftZEN',
                        'getObject',
                        {

                            cid : Ext.encode(grp_spdselect.get('@cid'))

                        },
                        function(res){

                            if(res){

                                var win_zenset = Ext.create('SMC4ZEN.view.win_smc_commspdset', {

                                    'viewId' : me.getCommspdMenuId(grp_kind),
                                    'openMode' : 'comm_spd',
                                    'conn_info' : res,
                                    'action_dev' : 'MOD'

                                });

                                win_zenset.show();

                            }
                            else{

                                Ext.Msg.show({
                                    title : SMC_SET_PRODUCT,
                                    msg : getDefineMsg('err_null_profcid'),
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR
                                });

                            }

                        });

                }

            },
            {
                'name' : getDefineText('ctm_menu_delcommspd'),
                'itemId' : 'mi_commspd_del',
                'children' : null,
                'callback' : function(){

                    var grp_select = pnl_group.getSelection()[0];
                    var grp_spdselect = gpn_spdlist.getSelection();

                    if(!grp_spdselect){

                        Ext.Msg.show({
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_sel_delcommspd'),
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });

                        return false;

                    }

                    Ext.Msg.show({
                        title : SMC_SET_PRODUCT,
                        msg : getDefineMsg('qus_commspd_delete'),
                        buttons : Ext.Msg.YESNO,
                        icon : Ext.Msg.QUESTION,
                        fn : function(res){

                            if(res === 'yes'){

                                try{

                                    zenProfCRUD.delZenProfile(grp_spdselect, function(res){

                                        zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, grp_select, ZEN_GROUP_SPDRECURSIVE, txf_search.getValue(), chk_opin.getValue());

                                    });

                                }
                                catch(err){

                                    Ext.Msg.show({
                                        title : SMC_SET_PRODUCT,
                                        msg : getDefineMsg('err_fail_svcexcept') + '<br><br>' + '[Svc error] : ' + err,
                                        buttons : Ext.Msg.OK,
                                        icon : Ext.Msg.ERROR
                                    });

                                }

                            }

                        }

                    });

                }

            },
            {
                'name' : getDefineText('ctm_menu_cpycommspd'),
                'itemId' : 'mi_commspd_copy',
                'children' : null,
                'callback' : function(){

                    var grp_select = pnl_group.getSelection()[0];
                    var grp_spdselect = gpn_spdlist.getSelection()[0];

                    if(!grp_spdselect){

                        Ext.Msg.show({
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_sel_delcommspd'),
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });

                        return false;

                    }

                    Ext.Msg.show({

                        title : SMC_SET_PRODUCT,
                        msg : getDefineMsg('qus_commspd_copy'),
                        buttons : Ext.Msg.YESNO,
                        icon : Ext.Msg.QUESTION,
                        fn : function(res){

                            if(res === 'yes'){

                                zenProfCRUD.copyZenProfile(grp_spdselect.get('@cid'), function(res){

                                    zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, grp_select, ZEN_GROUP_SPDRECURSIVE, txf_search.getValue(), chk_opin.getValue());

                                });

                            }

                        }

                    });

                }

            },
            {
                'name' : getDefineText('ctm_menu_exportexcelspd'),
                'itemId' : 'mi_commspd_exportxls',
                'children' : null,
                'callback' : function(){

                    var params = {};
                    var condition = {};

                    var grp_select = pnl_group.getSelection()[0];
                    var grp_spdselect = gpn_spdlist.getSelection()[0];

                    var dat_opin = chk_opin.getValue();
                    var dat_search = txf_search.getValue();

                    if(!grp_select){

                        Ext.Msg.show({
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_sel_zengroup'),
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });

                        return false;

                    }

                    if(dat_search === ''){

                        condition.gcid = grp_select.get('cid');
                        condition.isRecursive = ZEN_GROUP_SPDRECURSIVE;

                    }
                    else{

                        condition.name = dat_search;
                        condition.kind = grp_select.get('_kind');

                        if(dat_opin){

                            condition.op_in = true;

                        }
                        else{

                            condition.op_eq = true;

                        }

                    }

                    params.condition = Ext.encode(condition);
                    params.start = Ext.encode(0);
                    params.limit = Ext.encode(gpn_spdlist.getStore().getTotalCount());

                    zenProfCRUD.exportZenObjectlist(params, function(res){

                        zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, grp_select, ZEN_GROUP_SPDRECURSIVE, dat_search, dat_opin);

                    });

                }

            }

        ];

        var contextCallback = function(menuInstance){

            if(!gpn_spdlist){

                menuInstance.down('[itemId=mi_commspd_add]').setDisabled(true);
                menuInstance.down('[itemId=mi_commspd_mod]').setDisabled(true);
                menuInstance.down('[itemId=mi_commspd_del]').setDisabled(true);
                menuInstance.down('[itemId=mi_commspd_copy]').setDisabled(true);
                menuInstance.down('[itemId=mi_commspd_exportxls]').setDisabled(true);

            }
            else{

                var selectRowSize = gpn_spdlist.getSelection().length;

                if(selectRowSize === 1){

                    menuInstance.down('[itemId=mi_commspd_add]').setDisabled(false);
                    menuInstance.down('[itemId=mi_commspd_mod]').setDisabled(false);
                    menuInstance.down('[itemId=mi_commspd_del]').setDisabled(false);
                    menuInstance.down('[itemId=mi_commspd_copy]').setDisabled(false);
                    menuInstance.down('[itemId=mi_commspd_exportxls]').setDisabled(false);

                }

                else if(selectRowSize <= 0){

                    menuInstance.down('[itemId=mi_commspd_add]').setDisabled(false);
                    menuInstance.down('[itemId=mi_commspd_mod]').setDisabled(true);
                    menuInstance.down('[itemId=mi_commspd_del]').setDisabled(true);
                    menuInstance.down('[itemId=mi_commspd_copy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_commspd_exportxls]').setDisabled(false);

                }

                else{

                    menuInstance.down('[itemId=mi_commspd_add]').setDisabled(true);
                    menuInstance.down('[itemId=mi_commspd_mod]').setDisabled(true);
                    menuInstance.down('[itemId=mi_commspd_del]').setDisabled(false);
                    menuInstance.down('[itemId=mi_commspd_copy]').setDisabled(true);
                    menuInstance.down('[itemId=mi_commspd_exportxls]').setDisabled(false);

                }

            }

        };

        makeContextMenu({	'itemId' : 'mn_xtm_context', 'width' : 200, 'border' : true	}, gpn_spdlist, contextCallback, commspd_Context_Array);
    },

    onBt_addClick: function(button, e, eOpts) {
        var groupParams = null;
        var pnl_group = this.lookupReference('zen_commspd_group');
        var grp_select = pnl_group.getSelection()[0];

        if(grp_select)	{

            groupParams = grp_select.get('cid');

        }
        else{

            groupParams = pnl_group.getRootNode().get('cid');

        }

        if(groupParams){

            Ext.create('SMC4ZEN.view.win_smc_spdgroup_set', {

                'mode' : 'ADD',
                'wndTitle' : getDefineText('win_title_addgrp'),
                'groupParams' : groupParams

            }).show();

            return true;
        }
        else{

            Ext.Msg.show({

                title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                msg : getDefineMsg('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return false;

        }
    },

    onBt_modClick: function(button, e, eOpts) {
        var groupParams = null;
        var pnl_group = this.lookupReference('zen_commspd_group');
        var grp_select = pnl_group.getSelection()[0];

        if(grp_select)	{

            groupParams = grp_select.get('cid');

        }
        else{

            groupParams = pnl_group.getRootNode().get('cid');

        }

        if(groupParams){

            Ext.create('SMC4ZEN.view.win_smc_spdgroup_set', {

                mode : 'MOD',
                wndTitle : getDefineText('win_title_modgrp'),
                groupParams : groupParams

            }).show();

            return true;

        }
        else{

            Ext.Msg.show({

                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return false;

        }
    },

    onBt_delClick: function(button, e, eOpts) {
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);
        var pnl_group = this.lookupReference('zen_commspd_group');
        var grp_select = pnl_group.getSelection()[0];

        if(!grp_select){

            Ext.Msg.show(
            {
                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_fail_loadgroup'),
                buttons : Ext.Msg.YESNO,
                icon : Ext.Msg.QUESTION

            });

            return false;

        }

        Ext.Msg.show({

            title : SMC_SET_PRODUCT,
            msg : getDefineMsg('qus_group_delete'),
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    if(pnl_main.taskObj){

                        clearInterval(pnl_main.taskObj);

                    }

                    try{

                        var serviceName = 'ftZEN',
                            rpcFunc = 'delGroup',
                            params = {

                                'cid' : Ext.encode(grp_select.get('cid'))

                            };

                        request_helper.xmlrpc_call_Ajax_Post(
                        serviceName,
                        rpcFunc,
                        params,
                        function(res){

                            var serviceName = 'ftZEN',
                                rpcFunc = 'getGroup',
                                params = {

                                    'gtype' : Ext.encode('object_profile')

                                };

                            treeReload(pnl_group, serviceName, rpcFunc, params);

                        }

                        );

                    }
                    catch(err){

                        Ext.Msg.show(
                        {
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_fail_noreson') + '<br><br>' + '[Error] : ' + err,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

            }

        });
    },

    onBt_searchClick: function(button, e, eOpts) {
        var win_search = SMC_VIEW.make_find_treenode_window('그룹 검색', this.lookupReference('zen_commspd_group'));

        win_search.show();
    },

    onBt_recursiveClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');
        var chk_condition = this.lookupReference('chk_commspdinclude');
        var txf_searchvalue = this.lookupReference('txf_commspdsearch');
        var tb_managetool = this.lookupReference('zen_commspd_control');

        zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, pnl_group.getSelection()[0], ZEN_GROUP_SPDRECURSIVE, txf_searchvalue.getValue(), chk_condition.getValue());
    },

    onBt_recursiveToggle: function(button, pressed, eOpts) {
        if(pressed){

            ZEN_GROUP_SPDRECURSIVE = true;

            button.removeCls('common_rule_send');
            button.addCls('common_rule_pressed');

        }
        else{

            ZEN_GROUP_SPDRECURSIVE = false;

            button.removeCls('common_rule_pressed');
            button.addCls('common_rule_send');

        }
    },

    onBt_expandClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_group = pnl_group.getSelection()[0];

        if(grp_group){

            group_open(pnl_group, grp_group);

        }
    },

    onBt_foldClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_select = pnl_group.getSelection()[0];

        if(grp_select){

            group_close(pnl_group, grp_select);

        }
    },

    onViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');

        deviceGroupToGroup('ftZEN', overModel.get('cid'), data.records[0].get('cid'), 'object_profile', pnl_group);
    },

    onPnl_zen_commspd_tree_viewBoxReady: function(component, width, height, eOpts) {
        var me = this;
        var pnl_group = me.lookupReference('zen_commspd_group');
        var pnl_center = me.lookupReference('zen_commspd_center');

        pnl_group.groupTreeDropTarget = new Ext.dd.DropTarget(pnl_group.body.dom ,{

            'ddGroup' : 'dragDevice',
            'notifyEnter': function(ddSource, e, data) {

                pnl_group.isDD = true;
                pnl_group.on('itemmouseup', pnl_group.onTreeNodeMouseUp, pnl_group);

            },
            'notifyDrop': function(ddSource, e, data) {

                return true;

            }

        });
    },

    onPnl_zen_commspd_tree_viewAfterRender: function(component, eOpts) {
        var me = this;

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getGroup',
        {

            gtype : Ext.encode('object_profile')

        },
        function(res){

            me.initExpandNode(res.children);

            component.setRootNode(res);
            component.setLoading(false);

        }

        );
    },

    onPnl_zen_commspd_tree_viewSelect: function(rowmodel, record, index, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');

        var tb_grouptool = this.lookupReference('zen_commspd_groupcontrol');
        var tb_searcntool = this.lookupReference('zen_commspd_search');
        var tb_managetool = this.lookupReference('zen_commspd_control');

        var chk_opin = this.lookupReference('chk_commspdinclude');
        var txf_search = this.lookupReference('txf_commspdsearch');

        tb_managetool.setDisabled(false);

        // 1. 장비 추가 / 수정 / 삭제 버튼 활성화 여부 설정

        tb_managetool.down('[itemId=bt_add]').setDisabled(false);
        tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
        tb_managetool.down('[itemId=bt_del]').setDisabled(true);

        // 2. 그룹 설정 버튼 활성화 / 비활성화 설정

        if(!record.get('_kind')){

            // 버튼 활성화 / 비활성화 설정

            tb_grouptool.down('[itemId=bt_add]').setDisabled(true);
            tb_grouptool.down('[itemId=bt_mod]').setDisabled(true);
            tb_grouptool.down('[itemId=bt_del]').setDisabled(true);

        }
        else if(record.get('default')){

            tb_grouptool.down('[itemId=bt_add]').setDisabled(false);
            tb_grouptool.down('[itemId=bt_mod]').setDisabled(true);
            tb_grouptool.down('[itemId=bt_del]').setDisabled(true);

        }
        else{

            tb_grouptool.down('[itemId=bt_add]').setDisabled(false);
            tb_grouptool.down('[itemId=bt_mod]').setDisabled(false);
            tb_grouptool.down('[itemId=bt_del]').setDisabled(false);

        }

        zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, record, ZEN_GROUP_SPDRECURSIVE, txf_search.getValue(), chk_opin.getValue());
    },

    onTxf_searchKeypress: function(textfield, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');
        var chk_condition = this.lookupReference('chk_commspdinclude');
        var tb_managetool = this.lookupReference('zen_commspd_control');

        if(e.getKey() === e.ENTER){

            zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, pnl_group.getSelection()[0], ZEN_GROUP_SPDRECURSIVE, textfield.getValue(), chk_condition.getValue());

        }
    },

    onBt_searchClick1: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');
        var chk_condition = this.lookupReference('chk_commspdinclude');
        var txf_searchvalue = this.lookupReference('txf_commspdsearch');
        var tb_managetool = this.lookupReference('zen_commspd_control');

        zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, pnl_group.getSelection()[0], ZEN_GROUP_SPDRECURSIVE, txf_searchvalue.getValue(), chk_condition.getValue());
    },

    onBt_addClick1: function(button, e, eOpts) {
        var me = this;
        var pnl_group = this.lookupReference('zen_commspd_group');
        var grp_select = pnl_group.getSelection()[0];

        var grp_kind = grp_select.get('_kind');

        if(!grp_select){

            Ext.Msg.show({
                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_fail_addspd'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });

            return false;

        }

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getObjectDefault',
        {

            kind : Ext.encode(grp_kind)

        },
        function(res){

            if(res){

                var win_detail = Ext.create('SMC4ZEN.view.win_smc_commspdset', {

                    'viewId' : me.getCommspdMenuId(grp_kind),
                    'openMode' : 'comm_spd',
                    'conn_info' : res,
                    'action_dev' : 'ADD'

                });

                win_detail.show();

            }
            else{

                Ext.Msg.show({
                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_profkind'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            }

        });
    },

    onBt_modClick1: function(button, e, eOpts) {
        var me = this;
        var pnl_group = this.lookupReference('zen_commspd_group');
        var grp_select = pnl_group.getSelection()[0];
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');
        var grp_spdselect = gpn_spdlist.getSelection()[0];

        var grp_kind = grp_select.get('_kind');

        if(!grp_select || !grp_spdselect){

            Ext.Msg.show({
                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_fail_loadgroup'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });

            return false;

        }

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getObject',
        {

            cid : Ext.encode(grp_spdselect.get('@cid'))

        },
        function(res){

            if(res){

                var win_zenset = Ext.create('SMC4ZEN.view.win_smc_commspdset', {

                    'viewId' : me.getCommspdMenuId(grp_kind),
                    'openMode' : 'comm_spd',
                    'conn_info' : res,
                    'action_dev' : 'MOD'

                });

                win_zenset.show();

            }
            else{

                Ext.Msg.show({
                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_profinfo'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            }

        });
    },

    onBt_delClick1: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_group');
        var pnl_center = this.lookupReference('zen_commspd_center');
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');

        var grp_select = pnl_group.getSelection()[0];
        var grp_spdselect = gpn_spdlist.getSelection();

        var chk_opin = this.lookupReference('chk_commspdinclude');
        var txf_search = this.lookupReference('txf_commspdsearch');
        var tb_managetool = this.lookupReference('zen_commspd_control');

        Ext.Msg.show({
            title : SMC_SET_PRODUCT,
            msg : getDefineMsg('qus_commspd_delete'),
            buttons : Ext.Msg.YESNO,
            icon : Ext.Msg.QUESTION,
            fn : function(res){

                if(res === 'yes'){

                    try{

                        zenProfCRUD.delZenProfile(grp_spdselect, function(res){

                            if(res.errorList.length > 0){

                                Ext.Msg.show({
                                    title : SMC_SET_PRODUCT,
                                    msg : getDefineMsg('err_fail_delspd'),
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR
                                });

                            }

                            zenProfCRUD.getZenProfileList(gpn_spdlist, tb_managetool, grp_select, ZEN_GROUP_SPDRECURSIVE,txf_search.getValue(), chk_opin.getValue());

                        });

                    }
                    catch(err){

                        Ext.Msg.show({
                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_fail_noreson') + '<br><br>' + '[Error] : ' + err,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR
                        });

                    }

                }

            }

        });
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        var tb_managetool = this.lookupReference('zen_commspd_control');

        tb_managetool.down('[itemId=bt_add]').setDisabled(false);
        tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
        tb_managetool.down('[itemId=bt_del]').setDisabled(false);
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var gpn_devlist = this.lookupReference('zen_commspd_spdlist');
        var tb_managetool = this.lookupReference('zen_commspd_control');

        if(!gpn_devlist.getSelection().length){

            tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
            tb_managetool.down('[itemId=bt_del]').setDisabled(true);

        }
    },

    onGpn_commspd_listRender: function(component, eOpts) {
        var st_commspd_policylist = Ext.getStore('st_commspd_policylist');

        if(!st_commspd_policylist){

            st_commspd_policylist = Ext.create('Ext.data.Store', {
                pageSize: 100,
                storeId: 'st_commspd_policylist',
                fields: [
                {
                    name: 'name'
                },
                {
                    name: 'desc'
                },
                {
                    name: '_kind'
                }
                ],
                proxy: {
                    type: 'jsonp',
                    url: 'api/ftZEN/getObjectList/',
                    reader: {
                        type: 'json',
                        rootProperty: 'retval.result',
                        totalProperty: 'retval.totalCount'
                    }
                }

            });

        }

        component.bindStore(st_commspd_policylist);
        component.down('[itemId=tb_commspd_poilicypageing]').bindStore(st_commspd_policylist);
    },

    onGpn_commspd_listItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;
        var pnl_group = this.lookupReference('zen_commspd_group');
        var grp_select = pnl_group.getSelection()[0];
        var gpn_spdlist = this.lookupReference('zen_commspd_spdlist');
        var grp_spdselect = gpn_spdlist.getSelection()[0];

        var grp_kind = grp_select.get('_kind');

        if(!grp_select || !grp_spdselect){

            Ext.Msg.show({
                title : SMC_SET_PRODUCT,
                msg : getDefineMsg('err_fail_modspd'),
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR
            });

            return false;

        }

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getObject',
        {

            cid : Ext.encode(grp_spdselect.get('@cid'))

        },
        function(res){

            if(res){

                var win_zenset = Ext.create('SMC4ZEN.view.win_smc_commspdset', {

                    'viewId' : me.getCommspdMenuId(grp_kind),
                    'openMode' : 'comm_spd',
                    'conn_info' : res,
                    'action_dev' : 'MOD'

                });

                win_zenset.show();

            }
            else{

                Ext.Msg.show({
                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_profcid'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            }

        });
    },

    onGpn_commspd_listItemClick: function(dataview, record, item, index, e, eOpts) {
        var tb_managetool = this.lookupReference('zen_commspd_control');

        tb_managetool.down('[itemId=bt_add]').setDisabled(false);
        tb_managetool.down('[itemId=bt_mod]').setDisabled(false);
        tb_managetool.down('[itemId=bt_del]').setDisabled(false);
    },

    onGpn_commspd_listAfterRender: function(component, eOpts) {
        this.createContextByCommspd();
    }

});
