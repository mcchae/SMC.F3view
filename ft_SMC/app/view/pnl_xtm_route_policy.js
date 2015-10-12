
Ext.define('SMC.view.pnl_xtm_route_policy', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_route_policy',

    requires: [
        'SMC.view.ctn_xtm_route_iptypeclass',
        'SMC.view.ctn_network_controlclass',
        'Ext.form.field.Number',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    static_num: 0,
    height: 600,
    id: 'pnl_xtm_route_policy',
    width: 800,
    title: '정책기반 라우팅',

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 10
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_policy_main',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_policy_iptype',
                            margin: '0, 0, 5, 0',
                            items: [
                                {
                                    xtype: 'ctn_xtm_route_iptypeclass1',
                                    itemId: 'ctn_policy_iptype',
                                    listeners: {
                                        render: {
                                            fn: me.onCtn_policy_iptypeRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_policy_control1',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 30000);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_policynum',
                                    margin: '0, 10, 0, 0',
                                    fieldLabel: 'Policy Num',
                                    maxText: '정책 번호의 범위는 1 ~ 30000 입니다.',
                                    maxValue: 30000,
                                    minText: '정책 번호의 범위는 1 ~ 30000 입니다.',
                                    minValue: 1
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var component = Ext.getCmp('pnl_xtm_route_policy').componentStorage().iptype;

                                        if(component.getValue().iptype === 'v4'){

                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                        else{

                                            var retValue = ValidIPv6(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                    },
                                    flex: 1,
                                    margins: '0, 10, 0, 0',
                                    itemId: 'txf_source',
                                    fieldLabel: '출발지 주소',
                                    allowBlank: false,
                                    blankText: '출발지 주소는 비울 수 없습니다.',
                                    validateBlank: true
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var component = Ext.getCmp('pnl_xtm_route_policy').componentStorage().iptype;

                                        if(component.getValue().iptype === 'v4'){

                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                        else{

                                            var retValue = ValidNum(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            retValue = LengthCheck(parseInt(value), 1, 128);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                    },
                                    flex: 1,
                                    itemId: 'txf_netmask',
                                    fieldLabel: '  넷마스크',
                                    allowBlank: false,
                                    blankText: '넷마스크는 비울 수 없습니다.',
                                    enableKeyEvents: true,
                                    listeners: {
                                        keydown: {
                                            fn: me.onTxf_netmaskKeydown,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_policy_control2',
                            margin: '10, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_policy_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_policy_grid',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    itemId: 'tpn_route_toolclass',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            itemId: 'pnl_tab_ipv4',
                                            layout: 'fit',
                                            title: 'IPv4',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    itemId: 'gpn_ipv4',
                                                    title: '',
                                                    store: 'st_route_policy_ipv4',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            text: 'N'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'policy',
                                                            text: 'Policy Num',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                return value['#text'].split('/')[0];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: '출발지 주소',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                return value['#text'].split('/')[1];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: '넷마스크',
                                                            flex: 1
                                                        }
                                                    ],
                                                    selModel: Ext.create('Ext.selection.RowModel', {
                                                        mode: 'MULTI'
                                                    }),
                                                    listeners: {
                                                        itemclick: {
                                                            fn: me.onGpn_ipv4ItemClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            itemId: 'pnl_tab_ipv6',
                                            layout: 'fit',
                                            title: 'IPv6',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    itemId: 'gpn_ipv6',
                                                    title: '',
                                                    store: 'st_route_policy_ipv6',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            text: 'N'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'policy',
                                                            text: 'Policy Num',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                return value['#text'].split('/')[0];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: '출발지 주소',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                return value['#text'].split('/')[1];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: '프리픽스',
                                                            flex: 1
                                                        }
                                                    ],
                                                    selModel: Ext.create('Ext.selection.RowModel', {
                                                        mode: 'MULTI'
                                                    }),
                                                    listeners: {
                                                        itemclick: {
                                                            fn: me.onGpn_ipv6ItemClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_route_policyAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_route_policyBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCtn_policy_iptypeRender: function(component, eOpts) {
        var toolbarObj = Ext.ComponentQuery.query('tabpanel[itemId=tpn_route_toolclass]')[0];
        var netmask    = this.down('[itemId=txf_netmask]');

        component.down().on('change', function(radiogroup){

            if(radiogroup.getValue().iptype === 'v4'){

                toolbarObj.setActiveTab(0);
                netmask.setFieldLabel('넷마스크');

            }
            else{

                toolbarObj.setActiveTab(1);
                netmask.setFieldLabel('프리픽스');

            }

        });
    },

    onTxf_netmaskKeydown: function(textfield, e, eOpts) {
        var component = this.componentStorage().iptype;

        if(component.getValue().iptype === 'v4'){

            var code = e.browserEvent.keyCode;

            if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8 && code !== 190 && code !== 110 && code !== 191 && code !== 111 && code !== 109 && code !== 189){

                e.stopEvent();

            }

        }
    },

    onCtn_policy_controlAfterRender: function(component, eOpts) {
        // onCtn_policy_controlAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 라우터 policy number 데이터를 추가, 수정, 삭제를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var btn_add = component.down('button[itemId=bt_add]');
        var btn_mod = component.down('button[itemId=bt_mod]');
        var btn_del = component.down('button[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        btn_add.on('click', function(component, e, eOpts){

            if(!me.validityCheck().policyBlankCheck(componentObj.iptype.getValue().iptype) ||
               !me.validityCheck().policyDuplicationCheck(componentObj.policynum.getValue(), 'add', componentObj.iptype.getValue().iptype) ||
               !me.validityCheck().policyNumberCheck() ||
               !me.validityCheck().policyIpCheck(componentObj.iptype.getValue().iptype) ||
               !me.validityCheck().policyNetmaskCheck(componentObj.iptype.getValue().iptype)){

                return;

            }

            var obj = {};

            obj['@num'] = 0;

            var ipObj = {};

            ipObj['#text'] = componentObj.sourceip.getValue() + '/' + componentObj.netmask.getValue();
            ipObj['@type'] = (componentObj.iptype.getValue().iptype === 'v4') ? 'netmask' : 'prefix';
            ipObj['@version'] = componentObj.iptype.getValue().iptype;

            obj.ip = ipObj;

            obj.policy = componentObj.policynum.getValue();

            if(componentObj.iptype.getValue().iptype === 'v4')   {

                gridData_Add(componentObj.grid_ipv4 , obj);

                me.addPolicyNum(componentObj.grid_ipv4.getStore(), Ext.getStore('st_route_policynum'), 'policy');

            }
            else{

                gridData_Add(componentObj.grid_ipv6 , obj);

                me.addPolicyNum(componentObj.grid_ipv6.getStore(), Ext.getStore('st_route_policynum'), 'policy');

            }

            me.sortNum('ADD');

        });

        btn_mod.on('click', function(component, e, eOpts){

            var memberRecord    = componentObj.grid_ipv4.getSelectionModel().getSelection()[0];
            var memberRecord_v6 = componentObj.grid_ipv6.getSelectionModel().getSelection()[0];

            if(componentObj.iptype.getValue().iptype === 'v4'){

                if(!memberRecord){

                    Ext.Msg.show({

                        title : 'IPv4 Policy 데이터 수정 에러',
                        msg : '수정할 IP v4 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }

            }
            else{

                if(!memberRecord_v6){

                    Ext.Msg.show({

                        title : 'IPv6 Policy 데이터 수정 에러',
                        msg : '수정할 IP v6 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }

            }

            if(!me.validityCheck().policyBlankCheck(componentObj.iptype.getValue().iptype) ||
               !me.validityCheck().policyDuplicationCheck(componentObj.policynum.getValue(), 'modify', componentObj.iptype.getValue().iptype) ||
               !me.validityCheck().policyNumberCheck() ||
               !me.validityCheck().policyIpCheck(componentObj.iptype.getValue().iptype) ||
               !me.validityCheck().policyNetmaskCheck(componentObj.iptype.getValue().iptype)){

                return;

            }

            var obj = {};

            if(memberRecord && componentObj.iptype.getValue().iptype === 'v4'){

                obj = {

                    'ip' : {
                        '#text' : componentObj.sourceip.getValue() + '/' + componentObj.netmask.getValue(),
                        '@type' : 'netmask',
                        '@version' : 'v4'
                    },
                    'policy' : componentObj.policynum.getValue()
                };

                 me.modPolicyNum(componentObj.grid_ipv4.getSelectionModel().getSelection()[0].get('policy'), componentObj.policynum.getValue());

                selectionGrid_Mod(componentObj.grid_ipv4, obj);

            }

            if(memberRecord_v6 && componentObj.iptype.getValue().iptype === 'v6'){

                obj = {
                    'ip' : {
                        '#text' : componentObj.sourceip.getValue() + '/' + componentObj.netmask.getValue(),
                        '@type' : 'prefix',
                        '@version' : 'v6'
                    },
                    'policy' : componentObj.policynum.getValue()
                };

                me.modPolicyNum(componentObj.grid_ipv6.getSelectionModel().getSelection()[0].get('policy'), componentObj.policynum.getValue());

                selectionGrid_Mod(componentObj.grid_ipv6, obj);

            }

        });

        btn_del.on('click', function(component, e, eOpts){

            var memberRecord    = componentObj.grid_ipv4.getSelectionModel().getSelection();
            var memberRecord_v6 = componentObj.grid_ipv6.getSelectionModel().getSelection();

            if(componentObj.iptype.getValue().iptype === 'v4'){

                if(!memberRecord.length){

                    Ext.Msg.show({

                        title : 'IPv4 Policy 데이터 삭제 에러',
                        msg : '삭제할 IP v4 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }

            }
            else{

                if(!memberRecord_v6.length){

                    Ext.Msg.show({

                        title : 'IPv6 Policy 데이터 삭제 에러',
                        msg : '삭제할 IP v6 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }
            }

            if(memberRecord && componentObj.iptype.getValue().iptype === 'v4'){

                var delRecord = selectionGrid_Del(componentObj.grid_ipv4);

                for(var i = 0; i < delRecord.length; i++){

                    me.delPolicyNum(Ext.getStore('st_route_policynum'), delRecord[i].policy);

                    me.sortNum('DEL', memberRecord[i].data['@num']);

                }

                componentObj.grid_ipv4.getView().refresh();

            }

            if(memberRecord_v6 && componentObj.iptype.getValue().iptype === 'v6'){

                var delRecord_v6 = selectionGrid_Del(componentObj.grid_ipv6);

                for(var j = 0; j < delRecord_v6.length; j++){

                    me.delPolicyNum(Ext.getStore('st_route_policynum'), delRecord_v6[j].policy);

                    me.sortNum('DEL', memberRecord_v6[j].data['@num']);

                }

                componentObj.grid_ipv6.getView().refresh();

            }

        });
    },

    onGpn_ipv4ItemClick: function(dataview, record, item, index, e, eOpts) {
        var control1 = Ext.ComponentQuery.query('container[itemId=ctn_policy_control1]')[0];
        var ipType = Ext.ComponentQuery.query('radiogroup[itemId=rdg_iptype]')[0];

        control1.down('textfield[itemId=nfd_policynum]').setValue(record.data.policy);
        control1.down('textfield[itemId=txf_source]').setValue(record.data.ip['#text'].split('/')[0]);
        control1.down('textfield[itemId=txf_netmask]').setValue(record.data.ip['#text'].split('/')[1]);

        ipType.setValue({ 'iptype' : 'v4' });
    },

    onGpn_ipv6ItemClick: function(dataview, record, item, index, e, eOpts) {
        var ipType = Ext.ComponentQuery.query('radiogroup[itemId=rdg_iptype]')[0];
        var control1 = Ext.ComponentQuery.query('container[itemId=ctn_policy_control1]')[0];

        control1.down('textfield[itemId=nfd_policynum]').setValue(record.data.policy);
        control1.down('textfield[itemId=txf_source]').setValue(record.data.ip['#text'].split('/')[0]);
        control1.down('textfield[itemId=txf_netmask]').setValue(record.data.ip['#text'].split('/')[1]);

        ipType.setValue({ 'iptype' : 'v6' });

    },

    onPnl_xtm_route_policyAfterRender: function(component, eOpts) {
        // onPnl_xtm_route_policyAfterRender ============================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 라우터 정책 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var toolbarObj = component.down('[itemId=ctn_policy_main]').down('[itemId=ctn_policy_grid]').down();

        var ipv4Store = Ext.getStore('st_route_policy_ipv4');
        var ipv6Store = Ext.getStore('st_route_policy_ipv6');

        this.initStore();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.list;

                if(deviceData){

                    if(Object.prototype.toString.call(deviceData) === "[object Array]"){

                        Ext.each(deviceData, function(arrayData, idx){

                            if(arrayData.ip['@version'] === 'v4')   ipv4Store.add(arrayData);
                            if(arrayData.ip['@version'] === 'v6')	ipv6Store.add(arrayData);

                        });

                    }else{

                        if(deviceData.ip['@version'] === 'v4')	ipv4Store.add(deviceData);
                        if(deviceData.ip['@version'] === 'v6')	ipv6Store.add(deviceData);

                    }

                }

            }

        }
        catch(err){

            console.log('라우터 정책 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_route_policyBeforeClose: function(panel, eOpts) {
        var deviceMain    = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var gridtab   = this.down('[itemId=ctn_policy_main]').down('[itemId=ctn_policy_grid]').down('[itemId=tpn_route_toolclass]');

        var iptype    = this.down('[itemId=ctn_policy_main]').down('[itemId=ctn_policy_iptype]').down('[itemId=rdg_iptype]');

        var policynum = this.down('[itemId=ctn_policy_main]').down('[itemId=ctn_policy_control1]').down('[itemId=nfd_policynum]');
        var sourceip  = this.down('[itemId=ctn_policy_main]').down('[itemId=ctn_policy_control1]').down('[itemId=txf_source]');
        var netmask   = this.down('[itemId=ctn_policy_main]').down('[itemId=ctn_policy_control1]').down('[itemId=txf_netmask]');

        var grid_ipv4 = gridtab.down('[itemId=pnl_tab_ipv4]').down('[itemId=gpn_ipv4]');
        var grid_ipv6 = gridtab.down('[itemId=pnl_tab_ipv6]').down('[itemId=gpn_ipv6]');

        return function(){

            obj.iptype    = iptype;

            obj.policynum = policynum;
            obj.sourceip  = sourceip;
            obj.netmask   = netmask;

            obj.grid_ipv4 = grid_ipv4;
            obj.grid_ipv6 = grid_ipv6;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 라우터의 policy Number 중복 검사를 수행합니다.
        //
        // - Policy Num 중복 검사
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            policyBlankCheck : function(iptype){

                if(component.policynum.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Policy Num 는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.sourceip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '출발지 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.netmask.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (iptype === 'v4') ? '넷마스크는 필수항목 입니다.' : '프리픽스는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            policyNumberCheck : function(){

                if(!component.policynum.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Policy Number 의 범위는 1 ~ 30000 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            policyIpCheck : function(iptype){

                if(!component.sourceip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (iptype === 'v4') ? 'IP v4 형식에 맞지 않습니다.' : 'IP v6 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            policyNetmaskCheck : function(iptype){

                if(!component.netmask.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (iptype === 'v4') ? '넷마스크 형식에 맞지 않습니다.' : '프리픽스의 범위는 1 ~ 128 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            policyDuplicationCheck : function(componentValue, mode, iptype){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'policy', 'st_route_policy_ipv4')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 Policy Number가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }
                    else{

                        if(!duplicationItem(componentValue, 'policy', 'st_route_policy_ipv6')){

                            Ext.Msg.show({

                                title : 'WeGuardia™ SMC 2.0',
                                msg : '같은 Policy Number가 이미 등록되었습니다.',
                                buttons : Ext.Msg.OK,
                                icon : Ext.Msg.ERROR

                            });

                            return false;

                        }

                    }

                    return true;

                }
                else{

                    var _policyName = (iptype === 'v4') ? component.grid_ipv4.getSelectionModel().getSelection()[0] : component.grid_ipv6.getSelectionModel().getSelection()[0] ;

                    if(!duplicationItem(componentValue, 'policy', 'st_route_policy_ipv4') && _policyName.get('policy') !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 Policy Number가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }
                    else{

                        if(!duplicationItem(componentValue, 'policy', 'st_route_policy_ipv6') && _policyName.get('policy') !== componentValue){

                            Ext.Msg.show({

                                title : 'WeGuardia™ SMC 2.0',
                                msg : '같은 Policy Number가 이미 등록되었습니다.',
                                buttons : Ext.Msg.OK,
                                icon : Ext.Msg.ERROR

                            });

                            return false;

                        }

                    }

                    return true;

                }

            }

        };

        return validCheckObj;
    },

    modPolicyNum: function(findValue, changeValue) {
        var component = this.componentStorage();

        var policyStore = Ext.getStore('st_route_policynum');

        if(policyStore.find('value', findValue) > -1){

            policyStore.getAt(policyStore.find('value', findValue)).set({	'name' : changeValue , 'value' : changeValue	});

            return;

        }
    },

    addPolicyNum: function(fromStore, toStore, copyField) {
        for(var i = 0; i < fromStore.count(); i++){

            if(duplicationItem(fromStore.getAt(i).get(copyField), 'value', toStore)){

                toStore.add({ 'name' : fromStore.getAt(i).get(copyField), 'value' : fromStore.getAt(i).get(copyField) });

            }

        }
    },

    delPolicyNum: function(toStore, delValue) {
        for(var i = 0; toStore.count(); i++){

            if(delValue === toStore.getAt(i).get('value')){

                toStore.removeAt(i);

                return;

            }

        }
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 정책기반 라우팅 설정을 저장합니다.
        //
        // =============================================================================================================================================================================

        var ipv4Store = Ext.getStore('st_route_policy_ipv4');
        var ipv6Store = Ext.getStore('st_route_policy_ipv6');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        // 데이터가 없을 경우 =============================================================================================================================================================

        if(ipv4Store.count() === 0 && ipv6Store.count() === 0){

            deviceAllData.network_router_policy = null;

            return true;
        }

        // 데이터가 하나일 경우 ===========================================================================================================================================================

        var dataCount = ipv4Store.count() + ipv6Store.count();

        if(dataCount === 1){

            if(ipv4Store.count()){

                dataObj = ipv4Store.getAt(0).data;

            }
            else{

                dataObj = ipv6Store.getAt(0).data;

            }

        }
        else if(dataCount > 1){

        // 데이터가 두 개 이상일 경우 ======================================================================================================================================================

            var tmpArray = [];

            dataObj = [];

            for(var i = 0; i < ipv4Store.count(); i++){

                tmpArray.push(ipv4Store.getAt(i).data);

            }

            for(var i = 0; i < ipv6Store.count(); i++){

                tmpArray.push(ipv6Store.getAt(i).data);

            }

            tmpArray.sort(function(l, r){

                return l['@num'] - r['@num'];

            });

            console.log('정책기반 라우팅 데이터 -> ', tmpArray);

            dataObj = tmpArray;

        }

        // 데이터 반영 ===================================================================================================================================================================

        if(deviceAllData.network_router_policy){

            deviceAllData.network_router_policy.list = dataObj;

        }
        else{

            deviceAllData.network_router_policy = {};

            deviceAllData.network_router_policy.list = dataObj;

        }

        return true;
    },

    sortNum: function(mode, delIdx) {
        var ipv4Store = Ext.getStore('st_route_policy_ipv4');
        var ipv6Store = Ext.getStore('st_route_policy_ipv6');

        var resortObj = {};

        if(mode === 'ADD'){

            var numArray = [];

            numArray.push(-1);

            for(var i = 0; i < ipv4Store.count(); i++){

                if(ipv4Store.getAt(i).get('@num') === 0){

                    resortObj.version  = 'v4';
                    resortObj.storeIdx = i;

                }

                numArray.push(ipv4Store.getAt(i).get('@num'));

            }

            for(var i = 0; i < ipv6Store.count(); i++){

                if(ipv6Store.getAt(i).get('@num') === 0){

                    resortObj.version  = 'v6';
                    resortObj.storeIdx = i;

                }

                numArray.push(ipv6Store.getAt(i).get('@num'));

            }

            var addNum = numArray.sort(function(l, r){

                return l - r;

            })[numArray.length - 1];

            if(resortObj.version === 'v4'){

                ipv4Store.getAt(resortObj.storeIdx).set({	'@num' : addNum + 1   });

            }
            else{

                ipv6Store.getAt(resortObj.storeIdx).set({	'@num' : addNum + 1   });

            }

        }
        else{

            var numArray = [];

            numArray.push(-1);

            for(var i = 0; i < ipv4Store.count(); i++){

                if(ipv4Store.getAt(i).get('@num') === delIdx){

                    resortObj.version  = 'v4';
                    resortObj.storeIdx = i;

                }

                numArray.push(ipv4Store.getAt(i).get('@num'));

            }

            for(var i = 0; i < ipv6Store.count(); i++){

                if(ipv6Store.getAt(i).get('@num') === delIdx){

                    resortObj.version  = 'v6';
                    resortObj.storeIdx = i;

                }

                numArray.push(ipv6Store.getAt(i).get('@num'));

            }

            var maxNum = numArray.sort(function(l, r){

                return l - r;

            })[numArray.length - 1];

        // @num 정렬 ===================================================================================================================================================================

            if(maxNum < delIdx){

                return;

            }
            else if(delIdx === 1){

                for(var i = 0; i < ipv4Store.count(); i++){

                    ipv4Store.getAt(i).data['@num'] -= 1;

                }

                for(var i = 0; i < ipv6Store.count(); i++){

                    ipv6Store.getAt(i).data['@num'] -= 1;

                }

            }
            else{

                for(var i = 0; i < ipv4Store.count(); i++){

                    if(delIdx < ipv4Store.getAt(i).data['@num'] )
                        ipv4Store.getAt(i).data['@num'] -= 1;

                }

                for(var i = 0; i < ipv6Store.count(); i++){

                    if(delIdx < ipv6Store.getAt(i).data['@num'] )
                        ipv6Store.getAt(i).data['@num'] -= 1;

                }

            }

        }
    },

    initStore: function() {
        var ipv4Store = Ext.getStore('st_route_policy_ipv4');
        var ipv6Store = Ext.getStore('st_route_policy_ipv6');

        ipv4Store.removeAll();
        ipv6Store.removeAll();
    }

});