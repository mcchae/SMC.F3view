
Ext.define('SMC4ZEN.view.pnl_xtm_vpn_branch_office', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_vpn_branch_officeViewModel',
        'SMC4ZEN.view.ctn_vpn_control',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Check',
        'Ext.grid.View',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.selection.RowModel'
    ],

    viewModel: {
        type: 'pnl_xtm_vpn_branch_office'
    },
    height: 680,
    id: 'pnl_xtm_vpn_branch_office',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: '지점',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_vpn_branch_officeAfterRender',
        beforeclose: 'onPnl_xtm_vpn_branch_officeBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'fieldset',
                        height: 200,
                        itemId: 'fds_vpnbranch_autodr',
                        title: 'DR 자동화 설정',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                itemId: 'ctn_vpnbranch_group',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'end'
                                },
                                items: [
                                    {
                                        xtype: 'button',
                                        itemId: 'bt_mod',
                                        width: 100,
                                        text: '그룹 수정',
                                        listeners: {
                                            click: 'onBt_modClick'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
                                itemId: 'gpn_vpnbranch_group',
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
                                            return '그룹 ' + (rowIndex + 1);
                                        },
                                        dataIndex: 'name',
                                        text: '그룹',
                                        flex: 0.5
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        align: 'center',
                                        dataIndex: 'timeout',
                                        text: '결정 시간',
                                        flex: 0.5
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            // primary renderer ==============================================================================================================================================================
                                            //
                                            // 일시 : 2014.10.21
                                            //
                                            // 설명 : 그룹에 설정된 Primary IP를 컬럼에 출력합니다.
                                            //
                                            // ===============================================================================================================================================================================

                                            var primaryStr = '';

                                            if(value){

                                                if(!value.ip.length){

                                                    return value.ip['#text'];

                                                }
                                                else{

                                                    Ext.each(value.ip, function(primaryData, idx){

                                                        primaryStr += primaryData['#text'] + ',';

                                                    });

                                                    return primaryStr.substring(0, primaryStr.length - 1);

                                                }

                                            }

                                            return value;
                                        },
                                        dataIndex: 'primary',
                                        text: 'Primary IP',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            // backup renderer ===============================================================================================================================================================
                                            //
                                            // 일시 : 2014.10.21
                                            //
                                            // 설명 : 그룹에 설정된 Backup IP를 컬럼에 출력합니다.
                                            //
                                            // ===============================================================================================================================================================================

                                            var backupStr = '';

                                            if(value){

                                                if(!value.ip.length){

                                                    return value.ip['#text'];

                                                }
                                                else{

                                                    Ext.each(value.ip, function(backupData, idx){

                                                        backupStr += backupData['#text'] + ',';

                                                    });

                                                    return backupStr.substring(0, backupStr.length - 1);

                                                }

                                            }

                                            return value;
                                        },
                                        dataIndex: 'backup',
                                        text: 'Backup IP',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'checkcolumn',
                                        dataIndex: '@chk_use',
                                        text: '사용',
                                        flex: 0.5
                                    }
                                ],
                                listeners: {
                                    render: 'onGpn_vpnbranch_groupRender',
                                    itemdblclick: 'onGpn_vpnbranch_groupItemDblClick'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        height: 350,
                        itemId: 'fds_vpnbranch_sourcevpn',
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
                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

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
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCmb_typeChange',
                                                    afterrender: 'onCmb_typeAfterRender'
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
                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

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
                                                    var component = Ext.getCmp('pnl_xtm_vpn_branch_office').componentStorage();

                                                    if(component.sourcetype.getValue() === 'Netmask'){

                                                        var retValue = ValidNetMask(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;

                                                    }
                                                    else{

                                                        var retValue = ValidIPAddress(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;

                                                    }
                                                },
                                                hidden: true,
                                                itemId: 'txf_sub',
                                                width: 150,
                                                fieldLabel: '',
                                                enableKeyEvents: true,
                                                listeners: {
                                                    keydown: 'onTxf_subKeydown'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'ctn_vpn_control',
                                itemId: 'ctn_vpnbranch_sourcecontrol',
                                margin: '0, 0, 10, 0',
                                listeners: {
                                    afterrender: 'onCtn_vpnbranch_controlAfterRender'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
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
                                    itemclick: 'onGpn_vpnbranch_sourceipItemClick'
                                },
                                selModel: Ext.create('Ext.selection.RowModel', {
                                    selType: 'rowmodel',
                                    mode: 'MULTI'
                                })
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        height: 350,
                        itemId: 'fds_vpnbranch_destvpn',
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
                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

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
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCmb_typeChange1',
                                                    afterrender: 'onCmb_typeAfterRender1'
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
                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return false;

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
                                                    var component = Ext.getCmp('pnl_xtm_vpn_branch_office').componentStorage();

                                                    if(component.sourcetype.getValue() === 'Netmask'){

                                                        var retValue = ValidNetMask(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;

                                                    }
                                                    else{

                                                        var retValue = ValidIPAddress(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;

                                                    }
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
                                xtype: 'ctn_vpn_control',
                                itemId: 'ctn_vpnbranch_destcontrol',
                                margin: '0, 0, 10, 0',
                                listeners: {
                                    afterrender: 'onCtn_bridge_controlAfterRender1'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                flex: 1,
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
                                    itemclick: 'onGpn_vpnbranch_destipItemClick'
                                },
                                selModel: Ext.create('Ext.selection.RowModel', {
                                    selType: 'rowmodel',
                                    mode: 'MULTI'
                                })
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onBt_modClick: function(button, e, eOpts) {
        // onBt_modClick =================================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 DR을 수정할 수 있는 윈도우 창을 생성합니다.
        //
        // ===============================================================================================================================================================================

        var gpn_groupdr = button.up().up().down('[itemId=gpn_vpnbranch_group]');

        var selectRecord = gpn_groupdr.getSelectionModel().getSelection()[0];

        this.showGroupDrSetting(selectRecord);
    },

    onGpn_vpnbranch_groupRender: function(component, eOpts) {
        // onGpn_vpnbranch_groupRender ===================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그리드에 연결할 일회성 스토어를 생성하여 그리드와 Bind 합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_vpnbranch_grouplist',
            fields: [
                {
                    name : '@num'
                },
                {
                    name : '@chk_use'
                },
                {
                    name : 'backup'
                },
                {
                    name : 'primary'
                },
                {
                    name : 'timeout'
                }
            ]

        }));
    },

    onGpn_vpnbranch_groupItemDblClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_vpnbranch_groupItemDblClick =============================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 DR 데이터를 설정할 수 있는 윈도우를 생성합니다.
        //
        // ===============================================================================================================================================================================

        this.showGroupDrSetting(record);
    },

    onCmb_typeChange: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        if(newValue === 'single'){

            component.source_mid.setVisible(false);
            component.source_sub.setVisible(false);

        }
        else if(newValue === 'range'){

            component.source_mid.setText(' - ');
            component.source_mid.setVisible(true);
            component.source_sub.setVisible(true);

        }
        else{

            component.source_mid.setText(' / ');
            component.source_mid.setVisible(true);
            component.source_sub.setVisible(true);

        }
    },

    onCmb_typeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_vpn_iptype',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}

            ],
            'data' : [
                {	'name' : 'Single' , 'value' : 'single'	},
                {	'name' : 'Range'  , 'value' : 'range'	},
                {	'name' : 'Netmask', 'value' : 'netmask'	}
            ]
        }));

        component.setValue('single');
    },

    onTxf_subKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8 && code !== 190 && code !== 110 && code !== 191 && code !== 111 && code !== 109 && code !== 189){

            e.stopEvent();

        }
    },

    onCtn_vpnbranch_controlAfterRender: function(component, eOpts) {
        // onCtn_bridge_controlAfterRender ===========================================================================================
        //
        // 일시 : 2014.06.13
        //
        // 설명 : IPSec 지점 화면의 출발지를 설정합니다.
        //
        // ===========================================================================================================================

        var bt_add        = component.down('[itemId=bt_add]');
        var bt_mod        = component.down('[itemId=bt_mod]');
        var bt_del        = component.down('[itemId=bt_del]');

        var sourceStore   = Ext.getStore('st_vpn_source');

        var componentObj  = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().sourceBlankCheck(componentObj.sourcetype.getValue()) ||
               !me.validityCheck().sourceValidCheck(componentObj.sourcetype.getValue())){

                return;

            }

            var obj       = {};

            obj.src_ip    = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text']    = componentObj.sourceip.getValue();
            obj.tunnel_ip['@type']    = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            if(componentObj.sourcetype.getValue() === 'single'){

                obj.src_ip['#text']    = componentObj.source_addip.getValue();
                obj.src_ip['@type']    = 'single';
                obj.src_ip['@version'] = 'v4';

            }
            else if(componentObj.sourcetype.getValue() === 'range'){

                obj.src_ip['#text']    = componentObj.source_addip.getValue() + '-' + componentObj.source_sub.getValue();
                obj.src_ip['@type']    = 'range';
                obj.src_ip['@version'] = 'v4';

            }
            else{

                obj.src_ip['#text']    = componentObj.source_addip.getValue() + '/' + componentObj.source_sub.getValue();
                obj.src_ip['@type']    = 'netmask';
                obj.src_ip['@version'] = 'v4';

            }

            gridData_Add(componentObj.grid_source, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.grid_source.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '출발지 수정 에러',
                    msg : '수정할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().sourceBlankCheck(componentObj.sourcetype.getValue()) ||
               !me.validityCheck().sourceValidCheck(componentObj.sourcetype.getValue())){

                return;

            }

            var obj       = {};

            obj.src_ip    = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text']    = componentObj.sourceip.getValue();
            obj.tunnel_ip['@type']    = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            if(componentObj.sourcetype.getValue() === 'single'){

                obj.src_ip['#text']    = componentObj.source_addip.getValue();
                obj.src_ip['@type']    = 'single';
                obj.src_ip['@version'] = 'v4';

            }
            else if(componentObj.sourcetype.getValue() === 'range'){

                obj.src_ip['#text']    = componentObj.source_addip.getValue() + '-' + componentObj.source_sub.getValue();
                obj.src_ip['@type']    = 'range';
                obj.src_ip['@version'] = 'v4';

            }
            else{

                obj.src_ip['#text']    = componentObj.source_addip.getValue() + '/' + componentObj.source_sub.getValue();
                obj.src_ip['@type']    = 'netmask';
                obj.src_ip['@version'] = 'v4';

            }

            selectionGrid_Mod(componentObj.grid_source, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.grid_source.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : '출발지 삭제 에러',
                    msg : '삭제할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.grid_source);

        });
    },

    onGpn_vpnbranch_sourceipItemClick: function(dataview, record, item, index, e, eOpts) {
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

    onCmb_typeChange1: function(field, newValue, oldValue, eOpts) {
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

    onCmb_typeAfterRender1: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_vpn_iptype2',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}

            ],
            'data' : [
                {	'name' : 'Single' , 'value' : 'single'	},
                {	'name' : 'Range'  , 'value' : 'range'	},
                {	'name' : 'Netmask', 'value' : 'netmask'	}
            ]
        }));

        component.setValue('single');
    },

    onCtn_bridge_controlAfterRender1: function(component, eOpts) {
        // onCtn_bridge_controlAfterRender1 ==========================================================================================
        //
        // 일시 : 2014.06.13
        //
        // 설명 : IPSec 지점 화면의 목적지를 설정합니다.
        //
        // ===========================================================================================================================

        var bt_add        = component.down('[itemId=bt_add]');
        var bt_mod        = component.down('[itemId=bt_mod]');
        var bt_del        = component.down('[itemId=bt_del]');

        var sourceStore   = Ext.getStore('st_vpn_destination');

        var componentObj  = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().destBlankCheck(componentObj.desttype.getValue()) ||
               !me.validityCheck().destValidCheck(componentObj.desttype.getValue())){

                return;

            }

            var obj       = {};

            obj.dest_ip   = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text']    = componentObj.destip.getValue();
            obj.tunnel_ip['@type']    = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            if(componentObj.desttype.getValue() === 'single'){

                obj.dest_ip['#text']    = componentObj.dest_addip.getValue();
                obj.dest_ip['@type']    = 'single';
                obj.dest_ip['@version'] = 'v4';

            }
            else if(componentObj.desttype.getValue() === 'range'){

                obj.dest_ip['#text']    = componentObj.dest_addip.getValue() + '-' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type']    = 'range';
                obj.dest_ip['@version'] = 'v4';

            }
            else{

                obj.dest_ip['#text']    = componentObj.dest_addip.getValue() + '/' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type']    = 'netmask';
                obj.dest_ip['@version'] = 'v4';

            }

            gridData_Add(componentObj.grid_dest, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.grid_dest.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '목적지 수정 에러',
                    msg : '수정할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().destBlankCheck(componentObj.desttype.getValue()) ||
               !me.validityCheck().destValidCheck(componentObj.desttype.getValue())){

                return;

            }

            var obj       = {};

            obj.dest_ip   = {};
            obj.tunnel_ip = {};

            obj.tunnel_ip['#text']    = componentObj.destip.getValue();
            obj.tunnel_ip['@type']    = 'single';
            obj.tunnel_ip['@version'] = 'v4';

            if(componentObj.desttype.getValue() === 'single'){

                obj.dest_ip['#text']    = componentObj.dest_addip.getValue();
                obj.dest_ip['@type']    = 'single';
                obj.dest_ip['@version'] = 'v4';

            }
            else if(componentObj.desttype.getValue() === 'range'){

                obj.dest_ip['#text']    = componentObj.dest_addip.getValue() + '-' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type']    = 'range';
                obj.dest_ip['@version'] = 'v4';

            }
            else{

                obj.dest_ip['#text']    = componentObj.dest_addip.getValue() + '/' + componentObj.dest_sub.getValue();
                obj.dest_ip['@type']    = 'netmask';
                obj.dest_ip['@version'] = 'v4';

            }

            selectionGrid_Mod(componentObj.grid_dest, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.grid_dest.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : '목적지 삭제 에러',
                    msg : '삭제할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.grid_dest);

        });
    },

    onGpn_vpnbranch_destipItemClick: function(dataview, record, item, index, e, eOpts) {
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

    onPnl_xtm_vpn_branch_officeAfterRender: function(component, eOpts) {
        // onPnl_xtm_vpn_branch_officeAfterRender ======================================================================================================================================
        //
        // 일시 : 2014.06.13
        //
        // 설명 : IPSec 지점 화면 데이터를 컴포넌트에 설정합니다.
        //
        // =============================================================================================================================================================================

        var sourceStore  = Ext.getStore('st_vpn_source');
        var destStore    = Ext.getStore('st_vpn_destination');
        var groupdrStore = Ext.getStore('st_vpnbranch_grouplist');

        var deviceData = component.deviceParams;

        var componentObj = this.componentStorage();

        this.initStore();

        if(deviceData){

        // Group DR 데이터 입력 ==========================================================================================================================================================

            if(deviceData.head_office_backup_group){

                Ext.each(deviceData.head_office_backup_group.head_office_backup, function(groupdrData, idx){

                    groupdrData['@chk_use'] = (groupdrData['@chk_use'] === 'on') ? true : false;

                    groupdrStore.add(groupdrData);

                });

            }

        // 출발지 데이터 입력 =============================================================================================================================================================

            if(deviceData.vpn_s_policy){

                Ext.each(deviceData.vpn_s_policy, function(s_policyData){

                    sourceStore.add(s_policyData);

                });

            }

        // 목적지 데이터 입력 =============================================================================================================================================================

            if(deviceData.vpn_policy){

                Ext.each(deviceData.vpn_policy, function(policyData){

                    destStore.add(policyData);

                });

            }

        }
    },

    onPnl_xtm_vpn_branch_officeBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    showGroupDrSetting: function(groupData) {
        // showGroupDrSetting ===========================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 DR을 설정할 수 있는 모달 윈도우를 생성합니다.
        //
        // ==============================================================================================================================================================================

        var groupGridObj = this.down('[itemId=fds_vpnbranch_autodr]').down('[itemId=gpn_vpnbranch_group]');

        Ext.create('SMC4ZEN.view.win_xtm_vpn_branch_office', {

            'groupRecord' : groupData,
            'groupGridObj' : groupGridObj

        }).show();
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
        obj.grid_source  = grid_source;

        obj.destip       = destip;
        obj.desttype     = desttype;
        obj.dest_addip   = dest_addip;
        obj.dest_mid     = dest_mid;
        obj.dest_sub     = dest_sub;
        obj.grid_dest    = grid_dest;

        return obj;
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.07.07
        //
        // 설명 : VPN 지점의 유효성을 검사합니다.
        //
        // - IP, 목적지 IP Blank 검사
        //
        // =============================================================================================================================================================================

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

    saveData: function() {
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.06.13
        //
        // 설명 : IPSec 지점 데이터를 저장합니다.
        //
        // 수정 :
        //
        // - (2014.10.21 김민수 - DR GROUP 다중화로 인한 저장 코드 변경)
        //
        // ============================================================================================================================================================================

        var destStore = Ext.getStore('st_vpn_destination');
        var sourceStore = Ext.getStore('st_vpn_source');
        var groupdrStore = Ext.getStore('st_vpnbranch_grouplist');

        var component = this.componentStorage();

        // 그룹 저장 ===================================================================================================================================================================

        var groupdrArray = [];

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        for(var i = 0; i < groupdrStore.count(); i++){

            var groupdrData = groupdrStore.getAt(i).data;

            groupdrData['@chk_use'] = (groupdrData['@chk_use'] === true) ? 'on' : 'off';

            groupdrArray.push(groupdrData);

        }

        deviceAllData.vpn_script.head_office_backup_group.head_office_backup = groupdrArray;

        // 출발지 저장 ==================================================================================================================================================================

        if(sourceStore.count() === 0){

            if(deviceAllData.vpn_script.vpn_s_policy){

                delete deviceAllData.vpn_script.vpn_s_policy;

            }

        }
        else{

            var s_policyData = [];

            for(var i = 0; i < sourceStore.count(); i++){

                s_policyData.push(sourceStore.getAt(i).data);

            }

            if(deviceAllData.vpn_script.vpn_s_policy){

                deviceAllData.vpn_script.vpn_s_policy = s_policyData;

            }
            else{

                deviceAllData.vpn_script.vpn_s_policy = {};

                deviceAllData.vpn_script.vpn_s_policy = s_policyData;

            }

        }

        // 목적지 저장 ==================================================================================================================================================================

        if(destStore.count() === 0){

            if(deviceAllData.vpn_script.vpn_policy){

                delete deviceAllData.vpn_script.vpn_policy;

            }

        }
        else{

            var policyData = [];

            for(var i = 0; i < destStore.count(); i++){

                policyData.push(destStore.getAt(i).data);

            }

            if(deviceAllData.vpn_script.vpn_policy){

                deviceAllData.vpn_script.vpn_policy = policyData;

            }
            else{

                deviceAllData.vpn_script.vpn_policy = {};

                deviceAllData.vpn_script.vpn_policy = policyData;

            }

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();

        var destStore = Ext.getStore('st_vpn_destination');
        var sourceStore = Ext.getStore('st_vpn_source');

        destStore.removeAll();
        sourceStore.removeAll();

        component.grid_dest.bindStore(destStore);
        component.grid_source.bindStore(sourceStore);
    }

});