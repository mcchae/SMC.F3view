
Ext.define('SMC.view.pnl_xtm_route_static', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_route_static',

    requires: [
        'SMC.view.ctn_xtm_route_iptypeclass',
        'SMC.view.ctn_network_controlclass',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.grid.column.CheckColumn',
        'Ext.selection.RowModel'
    ],

    static_num: 0,
    height: 600,
    id: 'pnl_xtm_route_static',
    width: 800,
    title: '정적 라우팅',

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
                    itemId: 'ctn_static_main',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'ctn_xtm_route_iptypeclass1',
                            listeners: {
                                render: {
                                    fn: me.onCtn_static_iptypeRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_static_control1',
                            margin: '0, 0, 5, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    margins: '0, 10, 0, 0',
                                    itemId: 'cmb_policynum',
                                    fieldLabel: 'Policy Num',
                                    value: 'Any',
                                    allowBlank: false,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_route_policynum',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var component = Ext.getCmp('pnl_xtm_route_static').componentStorage().iptype;

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
                                    itemId: 'txf_destination',
                                    fieldLabel: 'Destination',
                                    value: '0.0.0.0',
                                    allowBlank: false,
                                    blankText: '필수 입력 항목입니다.',
                                    enableKeyEvents: true,
                                    validateBlank: true
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var component = Ext.getCmp('pnl_xtm_route_static').componentStorage().iptype;

                                        if(component.getValue().iptype === 'v4'){

                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                        else{

                                            var retValue = LengthCheck(value, 1, 128);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                    },
                                    flex: 1,
                                    itemId: 'txf_netmask',
                                    fieldLabel: '  넷마스크',
                                    value: '0.0.0.0',
                                    allowBlank: false,
                                    blankText: '필수 입력 항목입니다.',
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_static_control2',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var component = Ext.getCmp('pnl_xtm_route_static').componentStorage().iptype;

                                        if(component.getValue().iptype === 'v4'){

                                            var retValue = validIPForm(value, 'v4');

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
                                    itemId: 'txf_gateway',
                                    fieldLabel: '게이트웨이',
                                    allowBlank: false,
                                    blankText: '필수 입력 항목입니다.',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    margins: '0, 10, 0, 0',
                                    itemId: 'cmb_interface',
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
                                    emptyText: 'Select interface ...',
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_totaleth',
                                    valueField: 'eth',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onCmb_interfaceAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 16);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_metric',
                                    fieldLabel: 'Metric',
                                    value: 1,
                                    maxText: 'Metric의 범위는 1~16 입니다.',
                                    maxValue: 16,
                                    minText: 'Metric의 범위는 1~16 입니다.',
                                    minValue: 1
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_static_control3',
                            margin: '0, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_static_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_static_grid',
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
                                                    store: 'st_route_static_ipv4',
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
                                                                var destinationIp = value['#text'].split('/');

                                                                return destinationIp[0];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: 'Destination',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                var destinationIp = value['#text'].split('/');

                                                                return destinationIp[1];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: '넷마스크',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                return value['#text'];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'gateway',
                                                            text: '게이트웨이',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'interface',
                                                            text: '인터페이스',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'metric',
                                                            text: 'Metric',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'checkcolumn',
                                                            dataIndex: '@use',
                                                            text: '사용',
                                                            flex: 1,
                                                            listeners: {
                                                                checkchange: {
                                                                    fn: me.onCheckcolumnCheckChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    listeners: {
                                                        itemclick: {
                                                            fn: me.onGrid_ipv4ItemClick1,
                                                            scope: me
                                                        }
                                                    },
                                                    selModel: Ext.create('Ext.selection.RowModel', {
                                                        mode: 'MULTI'
                                                    })
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
                                                    store: 'st_route_static_ipv6',
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

                                                                var destinationIp = value['#text'].split('/');

                                                                return destinationIp[0];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: 'Destination',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                var destinationIp = value['#text'].split('/');

                                                                return destinationIp[1];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'ip',
                                                            text: '프리픽스',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                                                return value['#text'];
                                                            },
                                                            align: 'center',
                                                            dataIndex: 'gateway',
                                                            text: '게이트웨이',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'interface',
                                                            text: '인터페이스',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            align: 'center',
                                                            dataIndex: 'metric',
                                                            text: 'Metric',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'checkcolumn',
                                                            dataIndex: '@use',
                                                            text: '사용',
                                                            flex: 1,
                                                            listeners: {
                                                                checkchange: {
                                                                    fn: me.onCheckcolumnCheckChange1,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ],
                                                    listeners: {
                                                        itemclick: {
                                                            fn: me.onGrid_ipv4ItemClick2,
                                                            scope: me
                                                        }
                                                    },
                                                    selModel: Ext.create('Ext.selection.RowModel', {
                                                        mode: 'MULTI'
                                                    })
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
                    fn: me.onPnl_xtm_route_staticAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_route_staticBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCtn_static_iptypeRender: function(component, eOpts) {
        var toolbarObj = Ext.ComponentQuery.query('tabpanel[itemId=tpn_route_toolclass]')[0];
        var netmask = this.down('[itemId=txf_netmask]');

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

    onCmb_interfaceAfterRender: function(component, eOpts) {
        comboAutoSelect(component, 'st_common_totaleth');
    },

    onCtn_static_controlAfterRender: function(component, eOpts) {
        // onCtn_static_controlAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 라우터 static 화면의 데이터를 제어하는 기능을 정의합니다.
        //
        // 참고 : 유효성 검사시 파라미터 값은 다음 순서를 지켜야 합니다.
        //
        // [0] policy
        // [1] ip
        // [2] gateway
        // [3] interface
        // [4] metric
        //
        // ==============================================================================================================================================================================

        var btn_add = component.down('button[itemId=bt_add]');
        var btn_mod = component.down('button[itemId=bt_mod]');
        var btn_del = component.down('button[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var ipv4Store   = Ext.getStore('st_route_static_ipv4');
        var ipv6Store   = Ext.getStore('st_route_static_ipv6');

        var me = this;

        btn_add.on('click', function(){

            var validateArray = [];

            var obj = {};

            obj['@cid']      = '';
            obj['@num']      = 0;
            obj['@use']      = true;

            var gateObj      = {};

            gateObj['#text'] = componentObj.gateWay.getValue();
            gateObj['@type'] = "single";
            gateObj['@version'] = componentObj.iptype.getValue().iptype;

            obj.gateway      = gateObj;
            obj['interface'] = componentObj.interFace.getValue();

            var ipObj         = {};

            ipObj['#text']    = componentObj.destination.getValue() + '/' + componentObj.netmask.getValue();
            ipObj['@type']    = (componentObj.iptype.getValue().iptype === 'v4') ? 'netmask' : 'prefix';
            ipObj['@version'] =  componentObj.iptype.getValue().iptype;

            obj.ip           = ipObj;
            obj.metric       = componentObj.metric.getValue();
            obj.policy       = componentObj.policyNum.getValue();

            validateArray.push(componentObj.policyNum.getValue());
            validateArray.push(obj.ip);
            validateArray.push(obj.gateway);
            validateArray.push(componentObj.interFace.getValue());
            validateArray.push(componentObj.metric.getValue());

            var duplicateCheckArray = [];

            duplicateCheckArray.push(componentObj.policyNum.getValue());
            duplicateCheckArray.push(componentObj.destination.getValue());
            duplicateCheckArray.push(componentObj.netmask.getValue());
            duplicateCheckArray.push(componentObj.gateWay.getValue());
            duplicateCheckArray.push(componentObj.interFace.getValue());
            duplicateCheckArray.push(componentObj.metric.getValue());

            if(!me.validityCheck().staticBlankCheck() || !me.validityCheck().staticIpCheck() || !me.validityCheck().staticNetmaskCheck() ||
               !me.validityCheck().staticGateWay()    || !me.validityCheck().staticMetric()  ||
               !me.validityCheck().staticDuplicationCheck(duplicateCheckArray, 'add', componentObj.iptype.getValue().iptype)){

               return;

            }

            if(componentObj.iptype.getValue().iptype === 'v4')	gridData_Add(componentObj.grid_ipv4, obj);
            else                                    gridData_Add(componentObj.grid_ipv6, obj);

            me.sortNum('ADD');

        });

        btn_mod.on('click', function(){

            if(componentObj.iptype.getValue().iptype === 'v4'){

                if(!componentObj.grid_ipv4.getSelectionModel().getSelection()){

                    Ext.Msg.show({

                        title : 'IPv4 Static 데이터 수정 에러',
                        msg : '수정할 IP v4 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }

            }
            else{

                if(!componentObj.grid_ipv6.getSelectionModel().getSelection()){

                    Ext.Msg.show({

                        title : 'IPv6 Static 데이터 수정 에러',
                        msg : '수정할 IP v6 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }

            }

            var obj = {};

            obj['@use']			= true;

            var gateObj			= {};

            gateObj['#text']	= componentObj.gateWay.getValue();
            gateObj['@type']	= "single";
            gateObj['@version'] = componentObj.iptype.getValue().iptype;

            obj.gateway         = gateObj;
            obj['interface']    = componentObj.interFace.getValue();

            var ipObj           = {};

            ipObj['#text']		= componentObj.destination.getValue() + '/' + componentObj.netmask.getValue();
            ipObj['@type']		= (componentObj.iptype.getValue().iptype === 'v4') ? 'netmask' : 'prefix';
            ipObj['@version']	= componentObj.iptype.getValue().iptype;

            obj.ip				= ipObj;
            obj.metric			= componentObj.metric.getValue();
            obj.policy			= componentObj.policyNum.getValue();

            var duplicateCheckArray = [];

            duplicateCheckArray.push(componentObj.policyNum.getValue());
            duplicateCheckArray.push(componentObj.destination.getValue());
            duplicateCheckArray.push(componentObj.netmask.getValue());
            duplicateCheckArray.push(componentObj.gateWay.getValue());
            duplicateCheckArray.push(componentObj.interFace.getValue());
            duplicateCheckArray.push(componentObj.metric.getValue());

            if(!me.validityCheck().staticBlankCheck() || !me.validityCheck().staticIpCheck() || !me.validityCheck().staticNetmaskCheck() ||
               !me.validityCheck().staticGateWay()    || !me.validityCheck().staticMetric()){
        //        !me.validityCheck().staticDuplicationCheck(duplicateCheckArray, 'modify', componentObj.iptype.getValue().iptype)


               return;

            }

            if(componentObj.iptype.getValue().iptype === 'v4')	selectionGrid_Mod(componentObj.grid_ipv4, obj);
            else									selectionGrid_Mod(componentObj.grid_ipv6, obj);

        });

        btn_del.on('click', function(){

            if(componentObj.iptype.getValue().iptype === 'v4'){

                if(!componentObj.grid_ipv4.getSelectionModel().getSelection().length){

                    Ext.Msg.show({

                        title : 'IPv4 Static 데이터 삭제 에러',
                        msg : '삭제할 IP v4 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }

            }
            else{

                if(!componentObj.grid_ipv6.getSelectionModel().getSelection().length){

                    Ext.Msg.show({

                        title : 'IPv6 Static 데이터 삭제 에러',
                        msg : '삭제할 IP v6 데이터를 선택하세요.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return;

                }

            }

            var memberRecord    = componentObj.grid_ipv4.getSelectionModel().getSelection();
            var memberRecord_v6 = componentObj.grid_ipv6.getSelectionModel().getSelection();

            if(memberRecord){

                for(var i = 0; i < memberRecord.length; i++){

                    ipv4Store.remove(memberRecord[i]);

                    me.sortNum('DEL', memberRecord[i].data['@num']);

                }

                componentObj.grid_ipv4.getView().refresh();

            }
            if(memberRecord_v6){

                for(var j = 0; j < memberRecord_v6.length; j++){

                    ipv6Store.remove(memberRecord_v6[j]);

                    me.sortNum('DEL', memberRecord_v6[j].data['@num']);

                    componentObj.grid_ipv6.getView().refresh();

                }

            }

        });
    },

    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        Ext.getStore('st_route_static_ipv4').sync();
    },

    onGrid_ipv4ItemClick1: function(dataview, record, item, index, e, eOpts) {

        var control1 = Ext.ComponentQuery.query('container[itemId=ctn_static_control1]')[0];
        var control2 = Ext.ComponentQuery.query('container[itemId=ctn_static_control2]')[0];
        var ipType = Ext.ComponentQuery.query('radiogroup[itemId=rdg_iptype]')[0];

        control1.down('[itemId=cmb_policynum]').setValue(record.data.policy);
        control1.down('[itemId=txf_destination]').setValue(record.data.ip['#text'].split('/')[0]);
        control1.down('[itemId=txf_netmask]').setValue(record.data.ip['#text'].split('/')[1]);

        control2.down('[itemId=txf_gateway]').setValue(record.data.gateway['#text']);
        control2.down('[itemId=cmb_interface]').setValue(record.data['interface']);
        control2.down('[itemId=nfd_metric]').setValue(record.data.metric);

        ipType.setValue({ 'iptype' : 'v4' });
    },

    onCheckcolumnCheckChange1: function(checkcolumn, rowIndex, checked, eOpts) {
        Ext.getStore('st_route_static_ipv6').sync();
    },

    onGrid_ipv4ItemClick2: function(dataview, record, item, index, e, eOpts) {
        var control1 = Ext.ComponentQuery.query('container[itemId=ctn_static_control1]')[0];
        var control2 = Ext.ComponentQuery.query('container[itemId=ctn_static_control2]')[0];
        var ipType = Ext.ComponentQuery.query('radiogroup[itemId=rdg_iptype]')[0];

        control1.down('[itemId=cmb_policynum]').setValue(record.data.policy);
        control1.down('[itemId=txf_destination]').setValue(record.data.ip['#text'].split('/')[0]);
        control1.down('[itemId=txf_netmask]').setValue(record.data.ip['#text'].split('/')[1]);

        control2.down('[itemId=txf_gateway]').setValue(record.data.gateway['#text']);
        control2.down('[itemId=cmb_interface]').setValue(record.data['interface']);
        control2.down('[itemId=nfd_metric]').setValue(record.data.metric);

        ipType.setValue({ 'iptype' : 'v6' });
    },

    onPnl_xtm_route_staticAfterRender: function(component, eOpts) {
        // onPnl_xtm_route_staticAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.06.05
        //
        // 설명 : 라우터의 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var toolbarObj = Ext.ComponentQuery.query('[itemId=tpn_route_toolclass]')[0];

        var ipv4Store = Ext.getStore('st_route_static_ipv4');
        var ipv6Store = Ext.getStore('st_route_static_ipv6');

        this.initStore();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.list;

                if(deviceData){

                    if(Object.prototype.toString.call(deviceData) === "[object Array]"){

                        Ext.each(deviceData, function(arrayData, idx){

                            var obj = {};

                            obj['@cid'] = arrayData['@cid'];
                            obj['@use'] = (arrayData['@use'] === 'on') ? true : false;
                            obj['@num'] = arrayData['@num'];
                            obj.gateway = arrayData.gateway;
                            obj['interface'] = arrayData['interface'];
                            obj.ip = arrayData.ip;
                            obj.metric = arrayData.metric;
                            obj.policy = arrayData.policy;

                            if(arrayData.ip['@version'] === 'v4')       ipv4Store.add(obj);
                            if(arrayData.ip['@version'] === 'v6')		ipv6Store.add(obj);

                        });

                    }else{

                        var obj = {};

                        obj['@cid'] = deviceData['@cid'];
                        obj['@use'] = (deviceData['@use'] === 'on') ? true : false;
                        obj['@num'] = deviceData['@num'];
                        obj.gateway = deviceData.gateway;
                        obj['interface'] = deviceData['interface'];
                        obj.ip = deviceData.ip;
                        obj.metric = deviceData.metric;
                        obj.policy = deviceData.policy;

                        if(deviceData.ip['@version'] === 'v4')		ipv4Store.add(obj);
                        if(deviceData.ip['@version'] === 'v6')		ipv6Store.add(obj);

                    }

                }

            }

        }
        catch(err){

            console.log('라우터 static 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_route_staticBeforeClose: function(panel, eOpts) {
        var deviceMain    = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var ctn_main = this.down('[itemId=ctn_static_main]');

        var iptype = ctn_main.down('[itemId=ctn_static_iptype]').down('[itemId=rdg_iptype]');

        var toolbarObj = ctn_main.down('[itemId=ctn_static_grid]').down('[itemId=tpn_route_toolclass]');

        var cont1       = ctn_main.down('[itemId=ctn_static_control1]');

        var policyNum   = cont1.down('[itemId=cmb_policynum]');
        var destination = cont1.down('[itemId=txf_destination]');
        var netmask     = cont1.down('[itemId=txf_netmask]');

        var cont2       = ctn_main.down('[itemId=ctn_static_control2]');

        var gateWay     = cont2.down('textfield[itemId=txf_gateway]');
        var interFace   = cont2.down('combobox[itemId=cmb_interface]');
        var metric      = cont2.down('textfield[itemId=nfd_metric]');

        var grid_ipv4 = toolbarObj.down('[itemId=pnl_tab_ipv4]').down('[itemId=gpn_ipv4]');
        var grid_ipv6 = toolbarObj.down('[itemId=pnl_tab_ipv6]').down('[itemId=gpn_ipv6]');

        return function(){

            obj.iptype = iptype;

            obj.toolbarObj = toolbarObj;

            obj.cont1 = cont1;

            obj.policyNum   = policyNum;
            obj.destination = destination;
            obj.netmask     = netmask;

            obj.cont2 = cont2;

            obj.gateWay   = gateWay;
            obj.interFace = interFace;
            obj.metric    = metric;

            obj.grid_ipv4 = grid_ipv4;
            obj.grid_ipv6 = grid_ipv6;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ========================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 라우터의 유효성 검사를 수행합니다. 유효성 검사는 다음과 같습니다.
        //
        // - 라우터 데이터의 Policy Num, Destination, 넷마스크, 게이트웨이, 인터페이스, metric 중복 검사
        //
        // ======================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            staticBlankCheck : function(){

                if(component.destination.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Destination 은 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.netmask.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (component.iptype.getValue().iptype === 'v4') ? 'Netmask 는 필수항목 입니다.' : '프리픽스는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.gateWay.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '게이트웨이는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.metric.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Metric 는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            staticDuplicationCheck : function(componentValue, mode, type){

                var modeValue = mode || 'add';

                var ipv4Store = Ext.getStore('st_route_static_ipv4');
                var ipv6Store = Ext.getStore('st_route_static_ipv6');

                if(mode === 'add'){

                    if(type === 'v4'){

                        for(var i = 0; i < Ext.getStore('st_route_static_ipv4').count(); i++){

                            if(ipv4Store.getAt(i).get('policy')                    === componentValue[0] && ipv4Store.getAt(i).get('ip')['#text'].split('/')[0] === componentValue[1] &&
                               ipv4Store.getAt(i).get('ip')['#text'].split('/')[1] === componentValue[2] && ipv4Store.getAt(i).get('gateway')['#text']          === componentValue[3] &&
                               ipv4Store.getAt(i).get('interface')                 === componentValue[4] && ipv4Store.getAt(i).get('metric')                    === componentValue[5]){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '이미 등록된 IP v4 데이터 입니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                return false;

                            }

                        }

                    }
                    else{

                        for(var i = 0; i < Ext.getStore('st_route_static_ipv6').count(); i++){

                            if(ipv6Store.getAt(i).get('policy')                    === componentValue[0] && ipv6Store.getAt(i).get('ip')['#text'].split('/')[0] === componentValue[1] &&
                               ipv6Store.getAt(i).get('ip')['#text'].split('/')[1] === componentValue[2] && ipv6Store.getAt(i).get('gateway')['#text']          === componentValue[3] &&
                               ipv6Store.getAt(i).get('interface')                 === componentValue[4] && ipv6Store.getAt(i).get('metric')                    === componentValue[5] ){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '이미 등록된 IP v6 데이터 입니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                return false;

                            }

                        }

                    }

                    return true;

                }
                else{

                    var _staticName = (type === 'v4') ? component.grid_ipv4.getSelectionModel().getSelection()[0] : component.grid_ipv6.getSelectionModel().getSelection()[0] ;

                    if(type === 'v4'){

                        for(var i = 0; i < Ext.getStore('st_route_static_ipv4').count(); i++){

                            console.log(_staticName.get('metric'));
                            console.log(componentValue[5]);

                            if(ipv4Store.getAt(i).get('policy') === componentValue[0]                    && _staticName.get('policy')                    !== componentValue[0] &&
                               ipv4Store.getAt(i).get('ip')['#text'].split('/')[0] === componentValue[1] && _staticName.get('ip')['#text'].split('/')[0] !== componentValue[1] &&
                               ipv4Store.getAt(i).get('ip')['#text'].split('/')[1] === componentValue[2] && _staticName.get('ip')['#text'].split('/')[1] !== componentValue[2] &&
                               ipv4Store.getAt(i).get('gateway')['#text']          === componentValue[3] && _staticName.get('gateway')['#text']          !== componentValue[3] &&
                               ipv4Store.getAt(i).get('interface')                 === componentValue[4] && _staticName.get('interface')                 !== componentValue[4] &&
                               ipv4Store.getAt(i).get('metric')                    === componentValue[5] && _staticName.get('metric')                    !== componentValue[5]){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '이미 등록된 IP v4 데이터 입니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                return false;

                            }

                        }

                    }
                    else{

                        for(var i = 0; i < Ext.getStore('st_route_static_ipv6').count(); i++){

                            if((ipv6Store.getAt(i).get('policy') === componentValue[0])                    && _staticName.get('policy')                    !== componentValue[0] &&
                               (ipv6Store.getAt(i).get('ip')['#text'].split('/')[0] === componentValue[1]) && _staticName.get('ip')['#text'].split('/')[0] !== componentValue[1] &&
                               (ipv6Store.getAt(i).get('ip')['#text'].split('/')[1] === componentValue[2]) && _staticName.get('ip')['#text'].split('/')[1] !== componentValue[2] &&
                               (ipv6Store.getAt(i).get('gateway')['#text']          === componentValue[3]) && _staticName.get('gateway')['#text']          !== componentValue[3] &&
                               (ipv6Store.getAt(i).get('interface')                 === componentValue[4]) && _staticName.get('interface')                 !== componentValue[4] &&
                               (ipv6Store.getAt(i).get('metric')                    === componentValue[5]) && _staticName.get('metric')                    !== componentValue[5]){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '이미 등록된 IP v6 데이터 입니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                return false;

                            }

                        }
                    }

                    return true;

                }

            },
            staticIpCheck : function(){

                if(!component.destination.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (component.iptype.getValue().iptype === 'v4') ? 'IP v4 형식에 맞지 않습니다.' : 'IP v6 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            staticNetmaskCheck : function(){

                if(!component.netmask.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (component.iptype.getValue().iptype === 'v4') ? '넷마스크 형식에 맞지 않습니다.' : '프리픽스의 범위는 1 ~ 128 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            staticGateWay : function(){

                if(!component.gateWay.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            staticMetric : function(){

                if(!component.gateWay.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Metric 범위는 1 ~ 16 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {


        var ipv4Store = Ext.getStore('st_route_static_ipv4');
        var ipv6Store = Ext.getStore('st_route_static_ipv6');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        // 데이터가 없을 경우 =================================================================================================

        if(ipv4Store.count() === 0 && ipv6Store.count() === 0){

            deviceAllData.network_router_static = null;

            return true;

        }

        // 데이터가 하나일 경우 ===============================================================================================

        var dataCount = ipv4Store.count() + ipv6Store.count();

        if(dataCount === 1){

            deviceAllData.network_router_static = {};

            if(ipv4Store.count()){

                ipv4Store.getAt(0).data['@use'] = (ipv4Store.getAt(0).data['@use'] === true) ? 'on' : 'off';

                dataObj = ipv4Store.getAt(0).data;

            }
            else{

                ipv6Store.getAt(0).data['@use'] = (ipv6Store.getAt(0).data['@use'] === true) ? 'on' : 'off';

                dataObj = ipv6Store.getAt(0).data;

            }

        }
        else if(dataCount > 1){

            // 데이터가 두 개 이상일 경우 ==========================================================================================

            var tmpArray = [];

            dataObj = [];

            for(var i = 0; i < ipv4Store.count(); i++){

                ipv4Store.getAt(i).data['@use'] = (ipv4Store.getAt(i).data['@use'] === true) ? 'on' : 'off';

                tmpArray.push(ipv4Store.getAt(i).data);

            }

            for(var i = 0; i < ipv6Store.count(); i++){

                ipv6Store.getAt(i).data['@use'] = (ipv6Store.getAt(i).data['@use'] === true) ? 'on' : 'off';

                tmpArray.push(ipv6Store.getAt(i).data);

            }

            tmpArray.sort(function(l, r){

                return l['@num'] - r['@num'];

            });

            dataObj = tmpArray;

        }

        // 데이터 반영 =======================================================================================================

        if(deviceAllData.network_router_static){

            deviceAllData.network_router_static.list = dataObj;

        }
        else{

            deviceAllData.network_router_static = {};

            deviceAllData.network_router_static.list = dataObj;

        }

        return true;
    },

    sortNum: function(mode, delIdx) {
        var ipv4Store = Ext.getStore('st_route_static_ipv4');
        var ipv6Store = Ext.getStore('st_route_static_ipv6');

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

            // @num 정렬 ===================================================================================================================

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
        var ipv4Store = Ext.getStore('st_route_static_ipv4');
        var ipv6Store = Ext.getStore('st_route_static_ipv6');

        ipv4Store.removeAll();
        ipv6Store.removeAll();
    }

});