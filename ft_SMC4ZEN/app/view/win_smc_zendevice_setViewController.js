
Ext.define('SMC4ZEN.view.win_smc_zendevice_setViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.win_smc_zendevice_set',

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

                me.getSelectionModel().select(0);
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

    setCommspdObject: function(commspd_dat) {
        var st_zenpolicy = Ext.getStore('st_policy_zenstore');

        switch(commspd_dat.get('_kind')){

            case 'object_firewall_filter_ipv4' :
                st_zenpolicy.getAt(0).set({	'#text': commspd_dat.get('name'), '@cid': commspd_dat.get('@cid') });
                this.lookupReference('zen_policy_v4filter').setValue(commspd_dat.get('name'));
                break;

            case 'object_firewall_nat_ipv4' :
                st_zenpolicy.getAt(1).set({	'#text': commspd_dat.get('name'), '@cid': commspd_dat.get('@cid') });
                this.lookupReference('zen_policy_v4nat').setValue(commspd_dat.get('name'));
                break;

            case 'object_whitelist' :
                st_zenpolicy.getAt(2).set({ '#text': commspd_dat.get('name'), '@cid': commspd_dat.get('@cid') });
                this.lookupReference('zen_policy_whitelist').setValue(commspd_dat.get('name'));
                break;

            case 'object_vpn_ipsec' :
                st_zenpolicy.getAt(3).set({	'#text': commspd_dat.get('name'), '@cid': commspd_dat.get('@cid') }	);
                this.lookupReference('zen_policy_ipsec').setValue(commspd_dat.get('name'));
                break;

            case 'object_firewall_nat64' :
                st_zenpolicy.getAt(4).set({	'#text': commspd_dat.get('name'), '@cid': commspd_dat.get('@cid') }	);
                this.lookupReference('zen_policy_nat64').setValue(commspd_dat.get('name'));
                break;

        //     case 'object_firewall_dns64' :
        //         st_zenpolicy.getAt(5).set({	'#text': commspd_dat.get('name'), '@cid': commspd_dat.get('@cid') }	);
        //         this.lookupReference('zen_policy_dns64').setValue(commspd_dat.get('name'));
        //         break;

        }
    },

    onTxf_ipv4filterFocus: function(component, event, eOpts) {
        this.getCommspdGroup('object_firewall_filter_ipv4');
    },

    onBt_initClick: function(button, e, eOpts) {
        var st_zenpolicy = Ext.getStore('st_policy_zenstore');

        st_zenpolicy.getAt(0).set({	'#text': 'Any', '@cid': '00000000000000000000000000000000' });

        this.lookupReference('zen_policy_v4filter').setValue("Any");
    },

    onTxf_ipv4filterFocus6: function(component, event, eOpts) {
        this.getCommspdGroup('object_firewall_nat_ipv4');
    },

    onBt_initClick1: function(button, e, eOpts) {
        var st_zenpolicy = Ext.getStore('st_policy_zenstore');

        st_zenpolicy.getAt(1).set({	'#text': 'Any', '@cid': '00000000000000000000000000000000' });

        this.lookupReference('zen_policy_v4nat').setValue("Any");
    },

    onTxf_ipv4filterFocus1: function(component, event, eOpts) {
        this.getCommspdGroup('object_whitelist');
    },

    onBt_initClick2: function(button, e, eOpts) {
        var st_zenpolicy = Ext.getStore('st_policy_zenstore');

        st_zenpolicy.getAt(2).set({	'#text': 'Any', '@cid': '00000000000000000000000000000000' });

        this.lookupReference('zen_policy_whitelist').setValue("Any");
    },

    onTxf_ipv4filterFocus3: function(component, event, eOpts) {
        this.getCommspdGroup('object_vpn_ipsec');
    },

    onBt_initClick6: function(button, e, eOpts) {
        var st_zenpolicy = Ext.getStore('st_policy_zenstore');

        st_zenpolicy.getAt(3).set({	'#text': 'Any', '@cid': '00000000000000000000000000000000' });

        this.lookupReference('zen_policy_ipsec').setValue("Any");
    },

    onTxf_ipv4filterFocus2: function(component, event, eOpts) {
        this.getCommspdGroup('object_firewall_nat64');
    },

    onBt_initClick4: function(button, e, eOpts) {
        var st_zenpolicy = Ext.getStore('st_policy_zenstore');

        st_zenpolicy.getAt(4).set({	'#text': 'Any', '@cid': '00000000000000000000000000000000' });

        this.lookupReference('zen_policy_nat64').setValue("Any");
    },

    onTxf_ipv4filterFocus4: function(component, event, eOpts) {
        this.getCommspdGroup('object_firewall_dns64');
    },

    onBt_initClick5: function(button, e, eOpts) {
        var st_zenpolicy = Ext.getStore('st_policy_zenstore');

        st_zenpolicy.getAt(5).set({	'#text': 'Any', '@cid': '00000000000000000000000000000000' });

        this.lookupReference('zen_policy_dns64').setValue("Any");
    },

    onBt_recursiveClick: function(button, e, eOpts) {
        this.getCommspdList();
    },

    onBt_recursiveToggle: function(button, pressed, eOpts) {
        ZEN_GROUP_SPDRECURSIVEDEV = pressed;

        if(pressed){

            button.removeCls('common_rule_send');
            button.addCls('common_rule_pressed');

        }
        else{

            button.removeCls('common_rule_pressed');
            button.addCls('common_rule_send');

        }
    },

    onBt_expandClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_devgroup');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_select = pnl_group.getSelection()[0];

        if(grp_select){

            group_open(pnl_group, grp_select);

        }
    },

    onBt_foldClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_devgroup');

        if(pnl_group.group_click_count > 0){

            return false;

        }

        pnl_group.group_click_count += 1;

        var grp_select = pnl_group.getSelection()[0];

        if(grp_select){

            group_close(pnl_group, grp_select);

        }
    },

    onTprn_policy_groupAfterRender: function(component, eOpts) {
        var me = this;

        request_helper.xmlrpc_call_Ajax_Post(
        'ftZEN',
        'getGroup',
        {

            gtype : Ext.encode('object_firewall_filter_ipv4')

        },
        function(res){

            me.initExpandNode(res.children);

            component.setRootNode(res);
            component.setLoading(false);
            component.getSelectionModel().select(0);

        }

        );
    },

    onTprn_policy_groupSelect: function(rowmodel, record, index, eOpts) {
        var gpn_spdlist = this.lookupReference('zen_gpn_spdlistbydev');
        var chk_opin = this.lookupReference('chk_devcommspdinclude');
        var txf_search = this.lookupReference('txf_devcommspdsearch');

        zenProfCRUD.getZenProfileList(gpn_spdlist, null, record, ZEN_GROUP_SPDRECURSIVEDEV, txf_search.getValue(), chk_opin.getValue());
    },

    onTxf_searchKeypress: function(textfield, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_devgroup');
        var grp_select = pnl_group.getSelection()[0];
        var gpn_spdlist = this.lookupReference('zen_gpn_spdlistbydev');
        var chk_opin = this.lookupReference('chk_devcommspdinclude');

        if(e.getKey() === e.ENTER){

            zenProfCRUD.getZenProfileList(gpn_spdlist, null, grp_select, ZEN_GROUP_SPDRECURSIVEDEV, textfield.getValue(), chk_opin.getValue());

        }
    },

    onBt_searchClick: function(button, e, eOpts) {
        var pnl_group = this.lookupReference('zen_commspd_devgroup');
        var grp_select = pnl_group.getSelection()[0];
        var gpn_spdlist = this.lookupReference('zen_gpn_spdlistbydev');
        var chk_opin = this.lookupReference('chk_devcommspdinclude');
        var txf_search = this.lookupReference('txf_devcommspdsearch');

        zenProfCRUD.getZenProfileList(gpn_spdlist, null, grp_select, ZEN_GROUP_SPDRECURSIVEDEV, txf_search.getValue(), chk_opin.getValue());
    },

    onGpn_commspd_listRender: function(component, eOpts) {
        var st_commspd_listbydev = Ext.getStore('st_commspd_listbydev');

        if(!st_commspd_listbydev){

            st_commspd_listbydev = Ext.create('Ext.data.Store', {
                pageSize: 100,
                storeId: 'st_commspd_listbydev',
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

        component.bindStore(st_commspd_listbydev);
        component.down('[itemId=tb_commspd_pageingbydev]').bindStore(st_commspd_listbydev);
    },

    onGpn_commspd_listItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.setCommspdObject(record);
    },

    onCtn_view_detailzenBeforeRender: function(component, eOpts) {
        var vp = Ext.getCmp(SMC_COMMON_ID.smcviewport);
        var win_detail = this.getView();
        var connect_uri = 'https://' + vp.clientInfo.hostIp + ':9443';

        if(win_detail.openMode === 'once_dev'){

            connect_uri += '/setDB/' + win_detail.conn_info._database;

        }
        else if(win_detail.openMode === 'comm_spd'){

            if(win_detail.viewId){

                connect_uri += '/setDB/' + win_detail.conn_info._database + '?menu="' + win_detail.viewId + '"';

            }
            else{

                Ext.Msg.show({
                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_profviewid'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR
                });

            }

        }

        Ext.applyIf(component, {

            'autoEl' : {

                'tag' : "iframe",
                'src' : connect_uri

            }

        });
    },

    onBt_saveClick: function(button, e, eOpts) {
        var me = this.getView();
        var pnl_main = Ext.getCmp(DEVICE_COMMON_ID.devicemainzen);

        // 장비 공통 변수 선언

        var pnl_group = Ext.getCmp(DEVICE_COMMON_ID.devicezengroup);
        var pnl_center = pnl_main.down('[itemId=pnl_zen_center]');

        var tb_searchtool = pnl_center.down('[itemId=tb_zen_device_search]');
        var tb_managetool = pnl_center.down('[itemId=tb_zen_device_managetool]');

        var grp_select = pnl_group.getSelection()[0];
        var gpn_zenlist = Ext.getCmp(DEVICE_COMMON_ID.devicezenlist);
        var st_zenlist = gpn_zenlist.getStore();

        var g_cid = grp_select.get('cid');

        // 장비 기본 정보 저장

        var dev_ip = this.lookupReference('zen_view_devip');
        var dev_name = this.lookupReference('zen_view_devname');

        // 생성된 윈도우에 따라 동작 분기

        if(me.openMode === 'once_dev'){

            // 장비 추가 / 수정 유효성 검사 (임시 코드)

            if(dev_name.getValue() === ""){

                Ext.Msg.show({

                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_valid'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR,
                    fn : function(){

                        dev_name.focus();

                    }

                });

                return false;

            }

            if(dev_ip.getValue() === ""){

                Ext.Msg.show({

                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_null_valid'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR,
                    fn : function(){

                        dev_ip.focus();

                    }

                });

                return false;

            }

            if(!dev_ip.validate()){

                Ext.Msg.show({

                    title : SMC_SET_PRODUCT,
                    msg : getDefineMsg('err_valid_ipv4'),
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR,
                    fn : function(){

                        dev_ip.focus();

                    }

                });

                return false;

            }

            me.conn_info.ip = dev_ip.getValue();
            me.conn_info.name = dev_name.getValue();
            me.conn_info.desc = this.lookupReference('zen_view_devdesc').getValue();

            // 프로파일 저장

            var arr_policykey = ['object_firewall_filter_ipv4', 'object_firewall_nat_ipv4', 'object_whitelist', 'object_vpn_ipsec', 'object_firewall_nat64'];
            var st_policy_zenstore = Ext.getStore('st_policy_zenstore');

            for(var i = 0, max = arr_policykey.length; i < max; i++){

                var tmp = st_policy_zenstore.getAt(i).data;

                if('id' in tmp){

                    delete tmp.id;

                }

                me.conn_info.profiles[arr_policykey[i]]['#text'] = tmp['#text'];
                me.conn_info.profiles[arr_policykey[i]]['@cid'] = tmp['@cid'];

            }

            if(me.action_dev === 'ADD'){

                zenDevCRUD.addZenDevice(g_cid, me.conn_info, function(res){

                    if(res){

                        tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
                        tb_managetool.down('[itemId=bt_del]').setDisabled(true);

                        zenDevCRUD.getZenDevicelist(grp_select.get('cid'), ZEN_GROUP_RECURSIVE, false, function(res){

                            st_zenlist.loadData(res);

                            searchDeviceName(st_zenlist, tb_searchtool.down('[itemId=txf_searchstr]').getValue(), ['name', 'ip']);

                        });

                        pnl_center.fireEvent('zendevlistRefresh');

                        me.delTempDB = false;

                        me.close();

                    }
                    else{

                        Ext.Msg.show({

                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_fail_addzen'),
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                    }

                });

            }
            else{

                zenDevCRUD.modZenBasicDevice(me.conn_info, function(res){

                    if(res){

                        tb_managetool.down('[itemId=bt_mod]').setDisabled(true);
                        tb_managetool.down('[itemId=bt_del]').setDisabled(true);

                        zenDevCRUD.getZenDevicelist(grp_select.get('cid'), ZEN_GROUP_RECURSIVE, false, function(res){

                            st_zenlist.loadData(res);

                            searchDeviceName(st_zenlist, tb_searchtool.down('[itemId=txf_searchstr]').getValue(), ['name', 'ip']);

                        });

                        pnl_center.fireEvent('zendevlistRefresh');

                        me.delTempDB = false;

                        me.close();

                    }
                    else{

                        Ext.Msg.show({

                            title : SMC_SET_PRODUCT,
                            msg : getDefineMsg('err_fail_modzen'),
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                    }

                });

            }

        }
    },

    onBt_cancelClick: function(button, e, eOpts) {
        this.getView().close();
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

        // 장비가 추가 모드로 오픈되었을 경우 DB 삭제 API 호출

        if(component.action_dev === 'ADD'){

            if(me.delTempDB){

                request_helper.xmlrpc_call_Ajax_Post(
                'ftZEN',
                'delTempDevice',
                {

                    cid : Ext.encode(me.conn_info['@cid'])

                },
                function(res){

                    zenDevCRUD.getZenDevicelist(g_cid, ZEN_GROUP_RECURSIVE, false, function(res){

                        st_zenlist.loadData(res);

                        searchDeviceName(st_zenlist, tb_searchtool.down('[itemId=txf_searchstr]').getValue(), ['name', 'ip']);

                    });

                });

            }

        }

        pnl_center.fireEvent('zendevlistRefresh');

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
    },

    /*
        일 시 : 2015.09.18

        설 명 : 접속 정보를 기준으로 ZEN 설정화면 주소를 설정합니다. 공통 프로파일을 저장하는 임시스토어를 생성하여 넘어온 공통 프로파일 정보를 스토어에 적용합니다.
    */
    onWin_smc_zendevice_setBeforeRender: function(component, eOpts) {
        var win_detail = this.getView();

        // 1. 임시 스토어 생성 및 초기화

        var st_policy_zenstore = Ext.getStore('st_policy_zenstore');

        // 1-1. 생성된 스토어가 없으면 기본 값으로 생성

        if(!st_policy_zenstore){

            st_policy_zenstore = Ext.create('Ext.data.Store', {
                'data' : [
                {
                    key: 'object_firewall_filter_ipv4',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'object_firewall_nat_ipv4',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'object_whitelist',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'object_vpn_ipsec',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                },
                {
                    key: 'object_firewall_nat64',
                    value: {
                        '#text': 'Any',
                        '@cid': '00000000000000000000000000000000'
                    }
                }
                //             {
                //                 key: 'object_firewall_dns64',
                //                 value: {
                //                     '#text': 'Any',
                //                     '@cid': '00000000000000000000000000000000'
                //                 }
                //             }

                ],
                'fields' : [

                {   'name' : 'name'     },
                {   'name' : 'value'    }

                ],
                'storeId' : 'st_policy_zenstore'

            });

        }

        // 1-2. 넘어온 접속 정보를 기준으로 스토어 데이터 초기화

        var arr_profiles = [];

        var conn_profiles = win_detail.conn_info.profiles;

        console.log('conn_profiles -> ', conn_profiles);

        arr_profiles.push(conn_profiles.object_firewall_filter_ipv4);
        arr_profiles.push(conn_profiles.object_firewall_nat_ipv4);
        arr_profiles.push(conn_profiles.object_whitelist);
        arr_profiles.push(conn_profiles.object_vpn_ipsec);
        arr_profiles.push(conn_profiles.object_firewall_nat64);
        // arr_profiles.push(conn_profiles.object_firewall_dns64);

        st_policy_zenstore.loadData(arr_profiles);
    },

    /*
        일 시 : 2015.09.18

        설 명 : 장비의 기본 설정을 컴포넌트에 연결합니다.
    */
    onWin_smc_zendevice_setAfterRender: function(component, eOpts) {
        var st_policy_zenstore = Ext.getStore('st_policy_zenstore');

        this.lookupReference('zen_view_devip').setValue(component.conn_info.ip);
        this.lookupReference('zen_view_devname').setValue(component.conn_info.name);
        this.lookupReference('zen_view_devdesc').setValue(component.conn_info.desc);

        this.lookupReference('zen_policy_v4filter').setValue(st_policy_zenstore.getAt(0).get('#text'));
        this.lookupReference('zen_policy_v4nat').setValue(st_policy_zenstore.getAt(1).get('#text'));
        this.lookupReference('zen_policy_whitelist').setValue(st_policy_zenstore.getAt(2).get('#text'));
        this.lookupReference('zen_policy_ipsec').setValue(st_policy_zenstore.getAt(3).get('#text'));
        this.lookupReference('zen_policy_nat64').setValue(st_policy_zenstore.getAt(4).get('#text'));
        // this.lookupReference('zen_policy_dns64').setValue(st_policy_zenstore.getAt(5).get('#text'));
    }

});
