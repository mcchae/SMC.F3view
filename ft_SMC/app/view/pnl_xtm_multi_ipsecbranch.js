
Ext.define('SMC.view.pnl_xtm_multi_ipsecbranch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_multi_ipsecbranch',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_multi_ipsecbranch',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '지점',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_vpnbranch_sourcevpn',
                    width: 150,
                    checkboxToggle: true,
                    title: '출발지 기반 VPN 터널 라우팅',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: '10, 0, 10, 0',
                            text: '상대 VPN이 Active-Active 로 구성된 환경에서 특정 출발지 주소의 패킷을 특정 VPN 터널을 통해 전송하는 기능'
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_vpnbranch_source',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_vpnip',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value){

                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ip',
                                            width: 300,
                                            fieldLabel: 'VPN 터널 IP',
                                            enableKeyEvents: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_type',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_type',
                                            width: 300,
                                            fieldLabel: 'IP 타입',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            valueField: 'value',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_typeChange2,
                                                    scope: me
                                                },
                                                afterrender: {
                                                    fn: me.onCmb_typeAfterRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_addip',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value){

                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ip',
                                            margin: '0, 20, 0, 0',
                                            width: 300,
                                            fieldLabel: '출발지',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'label',
                                            hidden: true,
                                            itemId: 'lab_mid',
                                            margin: '0, 20, 0, 0',
                                            text: ' / '
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value){

                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    return true;

                                                }

                                                return true;
                                            },
                                            hidden: true,
                                            itemId: 'txf_sub',
                                            width: 200,
                                            fieldLabel: '',
                                            enableKeyEvents: true,
                                            listeners: {
                                                keydown: {
                                                    fn: me.onTxf_subKeydown1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'combobox',
                                            hidden: true,
                                            itemId: 'cmb_interface',
                                            width: 300,
                                            fieldLabel: '인터페이스',
                                            value: 'eth0',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            valueField: 'name',
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onCmb_interfaceAfterRender,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_vpnbranch_sourcecontrol',
                            margin: '0, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_vpnbranch_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            height: 150,
                            itemId: 'gpn_vpnbranch_sourceip',
                            margin: '0, 0, 10, 0',
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    dataIndex: 'tunnel_ip',
                                    text: 'VPN 터널 IP',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['@type'];
                                    },
                                    dataIndex: 'src_ip',
                                    text: 'IP 타입',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    dataIndex: 'src_ip',
                                    text: '출발지 IP',
                                    flex: 2
                                }
                            ],
                            listeners: {
                                itemclick: {
                                    fn: me.onGpn_vpnbranch_sourceipItemClick1,
                                    scope: me
                                },
                                render: {
                                    fn: me.onGpn_vpnbranch_sourceipRender,
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
                    xtype: 'fieldset',
                    height: 350,
                    itemId: 'fds_vpnbranch_destvpn',
                    checkboxToggle: true,
                    title: '목적지 기반 VPN 터널 라우팅',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            margin: '10, 0, 10, 0',
                            text: '상대 VPN이 Active-Active 로 구성된 환경에서 특정 목적지 주소의 패킷을 특정 VPN 터널을 통해 전송하는 기능'
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_vpnbranch_destination',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_vpnip',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value){

                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ip',
                                            width: 300,
                                            fieldLabel: 'VPN 터널 IP',
                                            enableKeyEvents: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_type',
                                    layout: 'anchor',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_type',
                                            width: 300,
                                            fieldLabel: 'IP 타입',
                                            value: 'single',
                                            editable: false,
                                            displayField: 'name',
                                            store: 'st_vpn_iptype',
                                            valueField: 'value',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_typeChange11,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_addip',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value){

                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ip',
                                            margin: '0, 20, 0, 0',
                                            width: 300,
                                            fieldLabel: '목적지 IP',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'label',
                                            hidden: true,
                                            itemId: 'lab_mid',
                                            margin: '0, 20, 0, 0',
                                            text: ' / '
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value){

                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    return true;

                                                }

                                                return true;
                                            },
                                            hidden: true,
                                            itemId: 'txf_sub',
                                            width: 150,
                                            fieldLabel: '',
                                            enableKeyEvents: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_vpnbranch_destcontrol',
                            margin: '0, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_vpnbranch_dest_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            height: 150,
                            itemId: 'gpn_vpnbranch_destip',
                            margin: '0, 0, 10, 0',
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    dataIndex: 'tunnel_ip',
                                    text: 'VPN 터널 IP',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['@type'];
                                    },
                                    dataIndex: 'dest_ip',
                                    text: 'IP 타입',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    dataIndex: 'dest_ip',
                                    text: '목적지 IP',
                                    flex: 2
                                }
                            ],
                            listeners: {
                                itemclick: {
                                    fn: me.onGpn_vpnbranch_destipItemClick1,
                                    scope: me
                                },
                                render: {
                                    fn: me.onGpn_vpnbranch_destipRender,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.RowModel', {
                                mode: 'MULTI'
                            })
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_multi_ipsecbranchAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_multi_groupdrBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_typeChange2: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        if(newValue === 'single'){

            component.source_addip.setVisible(true);
            component.source_mid.setVisible(false);
            component.source_sub.setVisible(false);
            component.source_eth.setVisible(false);

        }
        else if(newValue === 'range'){

            component.source_addip.setVisible(true);
            component.source_mid.setText(' - ');
            component.source_mid.setVisible(true);
            component.source_sub.setVisible(true);
            component.source_eth.setVisible(false);

        }
        else if(newValue === "netmask"){

            component.source_addip.setVisible(true);
            component.source_mid.setText(' / ');
            component.source_mid.setVisible(true);
            component.source_sub.setVisible(true);
            component.source_eth.setVisible(false);

        }
        else if(newValue === "interface"){

            component.source_addip.setVisible(false);
            component.source_mid.setVisible(false);
            component.source_sub.setVisible(false);
            component.source_eth.setVisible(true);

        }
        else{

            component.source_addip.setVisible(false);
            component.source_mid.setVisible(false);
            component.source_sub.setVisible(false);
            component.source_eth.setVisible(false);

        }
    },

    /*
        일 시 : 2015.09.03

        설 명 : 장비 일괄편집 기능 중, 출발지 기반 지점의 타입 선택 목록을 추가한다.
    */
    onCmb_typeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_multi_spoltype',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : 'Single' , 'value' : 'single'	},
                {	'name' : 'Range'  , 'value' : 'range'	},
                {	'name' : 'Netmask', 'value' : 'netmask'	},
                {	'name' : 'Interface', 'value' : 'interface'},
                {	'name' : 'IPSEC Host', 'value' : 'ipsechost'}
            ]
        }));

        component.setValue('single');
    },

    onTxf_subKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8 && code !== 190 && code !== 110 && code !== 191 && code !== 111 && code !== 109 && code !== 189){

            e.stopEvent();

        }
    },

    onCmb_interfaceAfterRender: function(component, eOpts) {
        var st_tmpinterface = Ext.getStore('st_multi_ipseceth');

        if(!st_tmpinterface){

            st_tmpinterface = Ext.create('Ext.data.Store', {

                'storeId' : 'st_multi_ipseceth',
                'fields' : [
                    {	'name' : 'name'		}
                ],
                'data' : function(){

                    var arr_interface = [];

                    for(var i = 0, max = 26; i < max; i++){

                        var tmp = {};

                        tmp.name = 'eth' + i;

                        arr_interface.push(tmp);

                    }

                    return arr_interface;

                }()

            });

        }

        component.bindStore(st_tmpinterface);
    },

    onCtn_vpnbranch_controlAfterRender: function(component, eOpts) {
        // onCtn_bridge_controlAfterRender ===========================================================================================
        //
        // 일시 : 2014.06.13
        //
        // 설명 : IPSec 지점 화면의 출발지를 설정합니다.
        //
        // ===========================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var sourceStore = Ext.getStore('st_multi_vpnsource');
        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().sourceBlankCheck(componentObj.sourcetype.getValue()) || !me.validityCheck().sourceValidCheck(componentObj.sourcetype.getValue())){

                return;

            }

            var obj = {};

            obj.src_ip = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text'] = componentObj.sourceip.getValue();
            obj.tunnel_ip['@type'] = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            var sourcetype = componentObj.sourcetype.getValue();

            if(sourcetype === 'single'){

                obj.src_ip['#text'] = componentObj.source_addip.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else if(sourcetype === 'range'){

                obj.src_ip['#text'] = componentObj.source_addip.getValue() + '-' + componentObj.source_sub.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else if(sourcetype === 'netmask'){

                obj.src_ip['#text'] = componentObj.source_addip.getValue() + '/' + componentObj.source_sub.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else if(sourcetype === 'interface'){

                obj.src_ip['#text'] = componentObj.source_eth.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else{

                obj.src_ip['#text'] = "";
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }

            gridData_Add(componentObj.grid_source, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.grid_source.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '수정할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().sourceBlankCheck(componentObj.sourcetype.getValue()) || !me.validityCheck().sourceValidCheck(componentObj.sourcetype.getValue())){

                return;

            }

            var obj = {};

            obj.src_ip = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text'] = componentObj.sourceip.getValue();
            obj.tunnel_ip['@type'] = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            var sourcetype = componentObj.sourcetype.getValue();

            if(sourcetype === 'single'){

                obj.src_ip['#text'] = componentObj.source_addip.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else if(sourcetype === 'range'){

                obj.src_ip['#text'] = componentObj.source_addip.getValue() + '-' + componentObj.source_sub.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else if(sourcetype === 'netmask'){

                obj.src_ip['#text'] = componentObj.source_addip.getValue() + '/' + componentObj.source_sub.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else if(sourcetype === 'interface'){

                obj.src_ip['#text'] = componentObj.source_eth.getValue();
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }
            else{

                obj.src_ip['#text'] = "";
                obj.src_ip['@type'] = sourcetype;
                obj.src_ip['@version'] = 'v4';

            }

            selectionGrid_Mod(componentObj.grid_source, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.grid_source.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '삭제할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.grid_source);

        });
    },

    onGpn_vpnbranch_sourceipItemClick1: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.sourceip.setValue(record.data.tunnel_ip['#text']);
        component.sourcetype.setValue(record.data.src_ip['@type']);

        if(record.data.src_ip['@type'] === 'range'){

            var splitStr = record.data.src_ip['#text'].split('-');

            component.source_addip.setValue(splitStr[0]);
            component.source_sub.setValue(splitStr[1]);

        }
        else if(record.data.src_ip['@type'] === 'netmask'){

            var splitStr = record.data.src_ip['#text'].split('/');

            component.source_addip.setValue(splitStr[0]);
            component.source_sub.setValue(splitStr[1]);

        }
        else{

            component.source_addip.setValue(record.data.src_ip['#text']);
        }
    },

    /*
        일 시 : 2015.09.03

        설 명 : 출발지 IP를 임시 저장하는 스토어를 동적으로 생성하여 그리드와 연결합니다.
    */
    onGpn_vpnbranch_sourceipRender: function(component, eOpts) {
        var st_spolicy = Ext.getStore('st_multi_vpnsource');

        if(!st_spolicy){

            st_spolicy = Ext.create('Ext.data.Store', {
                'storeId': 'st_multi_vpnsource',
                'fields': [
                    {
                        name: 'src_ip'
                    },
                    {
                        name: 'tunnel_ip'
                    }
                ]

            });

        }

        component.bindStore(st_spolicy);
    },

    onCmb_typeChange11: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        if(newValue === 'single'){

            component.dest_mid.setVisible(false);
            component.dest_sub.setVisible(false);

        }
        else if(newValue === 'range'){

            component.dest_mid.setText(' - ');
            component.dest_mid.setVisible(true);
            component.dest_sub.setVisible(true);

        }
        else{

            component.dest_mid.setText(' / ');
            component.dest_mid.setVisible(true);
            component.dest_sub.setVisible(true);

        }
    },

    onCtn_vpnbranch_dest_controlAfterRender: function(component, eOpts) {
        // onCtn_bridge_controlAfterRender1 ==========================================================================================
        //
        // 일시 : 2014.06.13
        //
        // 설명 : IPSec 지점 화면의 목적지를 설정합니다.
        //
        // ===========================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var sourceStore = Ext.getStore('st_multi_vpndest');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().destBlankCheck(componentObj.desttype.getValue()) || !me.validityCheck().destValidCheck(componentObj.desttype.getValue())){

                return;

            }

            var obj = {};

            obj.dest_ip = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text'] = componentObj.destip.getValue();
            obj.tunnel_ip['@type'] = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            if(componentObj.desttype.getValue() === 'single'){

                obj.dest_ip['#text'] = componentObj.dest_addip.getValue();
                obj.dest_ip['@type'] = 'single';
                obj.dest_ip['@version'] = 'v4';

            }
            else if(componentObj.desttype.getValue() === 'range'){

                obj.dest_ip['#text'] = componentObj.dest_addip.getValue() + '-' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type'] = 'range';
                obj.dest_ip['@version'] = 'v4';

            }
            else{

                obj.dest_ip['#text'] = componentObj.dest_addip.getValue() + '/' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type'] = 'netmask';
                obj.dest_ip['@version'] = 'v4';

            }

            gridData_Add(componentObj.grid_dest, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.grid_dest.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '수정할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().destBlankCheck(componentObj.desttype.getValue()) || !me.validityCheck().destValidCheck(componentObj.desttype.getValue())){

                return;

            }

            var obj = {};

            obj.dest_ip = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text'] = componentObj.destip.getValue();
            obj.tunnel_ip['@type'] = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            if(componentObj.desttype.getValue() === 'single'){

                obj.dest_ip['#text'] = componentObj.dest_addip.getValue();
                obj.dest_ip['@type'] = 'single';
                obj.dest_ip['@version'] = 'v4';

            }
            else if(componentObj.desttype.getValue() === 'range'){

                obj.dest_ip['#text'] = componentObj.dest_addip.getValue() + '-' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type'] = 'range';
                obj.dest_ip['@version'] = 'v4';

            }
            else{

                obj.dest_ip['#text'] = componentObj.dest_addip.getValue() + '/' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type'] = 'netmask';
                obj.dest_ip['@version'] = 'v4';

            }

            selectionGrid_Mod(componentObj.grid_dest, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.grid_dest.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                    msg : '삭제할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.grid_dest);

        });
    },

    onGpn_vpnbranch_destipItemClick1: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.destip.setValue(record.data.tunnel_ip['#text']);
        component.desttype.setValue(record.data.dest_ip['@type']);

        if(record.data.dest_ip['@type'] === 'range'){

            var splitStr = record.data.dest_ip['#text'].split('-');

            component.dest_addip.setValue(splitStr[0]);
            component.dest_sub.setValue(splitStr[1]);

        }
        else if(record.data.dest_ip['@type'] === 'netmask'){

            var splitStr = record.data.dest_ip['#text'].split('/');

            component.dest_addip.setValue(splitStr[0]);
            component.dest_sub.setValue(splitStr[1]);

        }
        else{

            component.dest_addip.setValue(record.data.dest_ip['#text']);
        }
    },

    onGpn_vpnbranch_destipRender: function(component, eOpts) {
        var st_multidpolicy = Ext.getStore('st_multi_vpndest');

        if(!st_multidpolicy){

            st_multidpolicy = Ext.create('Ext.data.Store', {
                'storeId': 'st_multi_vpndest',
                'fields': [
                    {
                        name: 'dest_ip'
                    },
                    {
                        name: 'tunnel_ip'
                    }
                ]

            });

        }

        component.bindStore(st_multidpolicy);
    },

    onPnl_xtm_multi_ipsecbranchAfterRender: function(component, eOpts) {
        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        var st_source = Ext.getStore('st_multi_vpnsource');
        var st_destination = Ext.getStore('st_multi_vpndest');

        var fds_source = this.down('[itemId=fds_vpnbranch_sourcevpn]');
        var fds_destination = this.down('[itemId=fds_vpnbranch_destvpn]');

        fds_source.checkboxCmp.setValue(false);
        fds_destination.checkboxCmp.setValue(false);

        st_source.removeAll();
        st_destination.removeAll();

        // 필드셋 체크박스 이벤트 설정 ======================================================================================================================================================

        fds_source.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'ipsec_vpn_s_policy', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'ipsec_vpn_s_policy', false);

            }

        });

        fds_destination.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'ipsec_vpn_d_policy', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'ipsec_vpn_d_policy', false);

            }

        });

        // 출발지, 목적지 IP 데이터 초기화

        var dat_vpnscript = wndInstance.vpn_script;

        if(getApplyTarget(wndInstance.apply_target, 'ipsec_vpn_s_policy')){

            fds_source.checkboxCmp.setValue(true);

            if(dat_vpnscript.vpn_s_policy){

                Ext.each(dat_vpnscript.vpn_s_policy, function(s_policyData){

                    st_source.add(s_policyData);

                });

            }

        }

        if(getApplyTarget(wndInstance.apply_target, 'ipsec_vpn_d_policy')){

            fds_destination.checkboxCmp.setValue(true);

            if(dat_vpnscript.vpn_policy){

                Ext.each(dat_vpnscript.vpn_policy, function(d_policyData){

                    st_destination.add(d_policyData);

                });

            }

        }
    },

    onPnl_xtm_multi_groupdrBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multi_groupdrBeforeClose ============================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 그룹 DR 화면이 종료될 때 데이터를 저장하고 화면 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_multiset');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    saveData: function() {
        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 출발점 IP 데이터 저장

        if(getApplyTarget(wndInstance.apply_target, 'ipsec_vpn_s_policy')){

            var st_source = Ext.getStore('st_multi_vpnsource');

            if(st_source.count() === 0){

                if(wndInstance.vpn_script.vpn_s_policy){

                    delete wndInstance.vpn_script.vpn_s_policy;

                }

            }
            else{

                var s_policyData = [];

                for(var i = 0; i < st_source.count(); i++){

                    s_policyData.push(st_source.getAt(i).data);

                }

                if(wndInstance.vpn_script.vpn_s_policy){

                    wndInstance.vpn_script.vpn_s_policy = s_policyData;

                }
                else{

                    wndInstance.vpn_script.vpn_s_policy = {};
                    wndInstance.vpn_script.vpn_s_policy = s_policyData;

                }

            }

        }

        // 목적지 IP 데이터 저장

        if(getApplyTarget(wndInstance.apply_target, 'ipsec_vpn_d_policy')){

            var st_destination = Ext.getStore('st_multi_vpndest');

            if(st_destination.count() === 0){

                if(wndInstance.vpn_script.vpn_policy){

                    delete wndInstance.vpn_script.vpn_policy;

                }

            }
            else{

                var policyData = [];

                for(var i = 0; i < st_destination.count(); i++){

                    policyData.push(st_destination.getAt(i).data);

                }

                if(wndInstance.vpn_script.vpn_policy){

                    wndInstance.vpn_script.vpn_policy = policyData;

                }
                else{

                    wndInstance.vpn_script.vpn_policy = {};
                    wndInstance.vpn_script.vpn_policy = policyData;

                }

            }

        }

        return true;
    },

    validityCheck: function() {
        var component = this.componentStorage();

        var validCheckObj = {

           sourceBlankCheck : function(type){

                if(component.sourceip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'VPN 터널 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.source_addip.getValue() === '' && type === 'single'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '출발지 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if((component.source_addip.getValue() === '' || component.source_sub.getValue() === '') && type === 'range'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '출발지 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.source_addip.getValue() === '' && type === 'netmask'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '출발지 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }
                else if(component.source_sub.getValue() === '' && type === 'netmask'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            sourceValidCheck : function(type){

                if(!component.sourceip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.source_addip.validate() && type === 'single'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if((!component.source_addip.validate() || !component.source_sub.validate()) && type === 'range'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.source_addip.validate() && type === 'netmask'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }
                else if(!component.source_sub.validate() && type === 'netmask'){

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
            destBlankCheck : function(type){

                if(component.destip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'VPN 터널 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.dest_addip.getValue() === '' && type === 'single'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '목적지 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if((component.dest_addip.getValue() === '' || component.dest_sub.getValue() === '') && type === 'range'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '목적지 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.dest_addip.getValue() === '' && type === 'netmask'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '목적지 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }
                else if(component.dest_sub.getValue() === '' && type === 'netmask'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            destValidCheck : function(type){

                if(!component.destip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.dest_addip.validate() && type === 'single'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if((!component.dest_addip.validate() || !component.dest_sub.validate()) && type === 'range'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.dest_addip.validate() && type === 'netmask'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }
                else if(!component.dest_sub.validate() && type === 'netmask'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 형식에 맞지 않습니다.',
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

    componentStorage: function() {
        var obj = {};

        var fds_source   = this.down('[itemId=fds_vpnbranch_sourcevpn]');
        var fds_dest     = this.down('[itemId=fds_vpnbranch_destvpn]');

        var ctn_source   = fds_source.down('[itemId=ctn_vpnbranch_source]');
        var ctn_vpnip    = ctn_source.down('[itemId=ctn_vpnbranch_vpnip]');
        var sourceip     = ctn_vpnip.down('[itemId=txf_ip]');

        var ctn_type     = ctn_source.down('[itemId=ctn_vpnbranch_type]');
        var sourcetype   = ctn_type.down('[itemId=cmb_type]');

        var ctn_addip    = ctn_source.down('[itemId=ctn_vpnbranch_addip]');

        var source_addip = ctn_addip.down('[itemId=txf_ip]');
        var source_mid   = ctn_addip.down('[itemId=lab_mid]');
        var source_sub   = ctn_addip.down('[itemId=txf_sub]');
        var source_eth   = ctn_addip.down('[itemId=cmb_interface]');

        var grid_source  = fds_source.down('[itemId=gpn_vpnbranch_sourceip]');

        var ctn_dest     = fds_dest.down('[itemId=ctn_vpnbranch_destination]');
        var ctn_dest_vpnip = ctn_dest.down('[itemId=ctn_vpnbranch_vpnip]');

        var destip       = ctn_dest_vpnip.down('[itemId=txf_ip]');
        var ctn_dest_type  = ctn_dest.down('[itemId=ctn_vpnbranch_type]');
        var desttype     = ctn_dest_type.down('[itemId=cmb_type]');

        var ctn_dest_addip = ctn_dest.down('[itemId=ctn_vpnbranch_addip]');

        var dest_addip   = ctn_dest_addip.down('[itemId=txf_ip]');
        var dest_mid     = ctn_dest_addip.down('[itemId=lab_mid]');
        var dest_sub     = ctn_dest_addip.down('[itemId=txf_sub]');

        var grid_dest    = fds_dest.down('[itemId=gpn_vpnbranch_destip]');

        obj.sourceip     = sourceip;
        obj.sourcetype   = sourcetype;
        obj.source_addip = source_addip;
        obj.source_mid   = source_mid;
        obj.source_sub   = source_sub;
        obj.source_eth   = source_eth;
        obj.grid_source  = grid_source;

        obj.destip       = destip;
        obj.desttype     = desttype;
        obj.dest_addip   = dest_addip;
        obj.dest_mid     = dest_mid;
        obj.dest_sub     = dest_sub;
        obj.grid_dest    = grid_dest;

        return obj;
    }

});