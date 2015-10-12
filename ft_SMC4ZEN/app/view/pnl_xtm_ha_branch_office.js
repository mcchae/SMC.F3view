
Ext.define('SMC4ZEN.view.pnl_xtm_ha_branch_office', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_ha_branch_officeViewModel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.selection.RowModel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point'
    ],

    viewModel: {
        type: 'pnl_xtm_ha_branch_office'
    },
    height: 680,
    id: 'pnl_xtm_ha_branch_office',
    width: 800,
    bodyPadding: 10,
    title: '지점',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_ha_branch_officeAfterRender',
        beforeclose: 'onPnl_xtm_ha_branch_officeBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        itemId: 'ctn_ha_mode',
                        margin: '0, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'radiogroup',
                                itemId: 'rdg_mode',
                                width: 400,
                                fieldLabel: 'Mode',
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_main',
                                        name: 'ha_mode',
                                        boxLabel: 'Main',
                                        checked: true,
                                        inputValue: 'main'
                                    },
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_sub',
                                        name: 'ha_mode',
                                        boxLabel: 'Sub',
                                        inputValue: 'sub'
                                    }
                                ],
                                listeners: {
                                    change: 'onRdg_modeChange'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        itemId: 'ctn_ha_packetmac',
                        margin: '0, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'txf_mac',
                                width: 550,
                                fieldLabel: 'Packet Relay 시 Sub 장비 인터페이스 MAC',
                                labelWidth: 300
                            }
                        ]
                    },
                    {
                        xtype: 'tabpanel',
                        validityCheck: function() {
                            // validityCheck ================================================================================================================================================================
                            //
                            // 일시 : 2014.07.05
                            //
                            // 설명 : HA 본점 유효성을 검사합니다.
                            //
                            // ==============================================================================================================================================================================

                            var component   = Ext.getCmp('pnl_xtm_ha_branch_office').componentStorage();

                            var validCheckObj = {

                                'blankCheck' : function(component){

                                    var argument = (arguments[1] === undefined) ? true : arguments[1];

                                    if(component.getXType() === 'textfield'){

                                        if(component.getValue() === '' && argument){

                                            Ext.Msg.show({

                                                'title' : 'WeGuardia™ SMC 2.0',
                                                'msg' : '필수 입력 항목입니다.',
                                                'buttons' : Ext.Msg.OK,
                                                'icon' : Ext.Msg.ERROR,
                                                'fn' : function(res){

                                                    component.focus();

                                                }

                                            });

                                            return false;

                                        }

                                    }
                                    else{

                                        if(component.getValue() === null && argument){

                                            Ext.Msg.show({

                                                'title' : 'WeGuardia™ SMC 2.0',
                                                'msg' : '필수 입력 항목입니다.',
                                                'buttons' : Ext.Msg.OK,
                                                'icon' : Ext.Msg.ERROR,
                                                'fn' : function(res){

                                                    component.focus();

                                                }

                                            });

                                            return false;

                                        }

                                    }

                                    return true;

                                },
                                'storeLimitCheck' : function(storeId, msg){

                                    if(Ext.getStore(storeId).count() >= 1){

                                        Ext.Msg.show({

                                            title : 'WeGuardia™ SMC 2.0',
                                            msg : msg,
                                            buttons : Ext.Msg.OK,
                                            icon : Ext.Msg.ERROR

                                        });

                                        return false;

                                    }

                                    return true;

                                },
                                'validateCheck' : function(component, msg){

                                    var argument = (arguments[2] === undefined) ? true : arguments[2];

                                    if(!component.validate() && argument){

                                        Ext.Msg.show({

                                            'title' : 'WeGuardia™ SMC 2.0',
                                            'msg' : msg,
                                            'buttons' : Ext.Msg.OK,
                                            'icon' : Ext.Msg.ERROR,
                                            'fn' : function(res){

                                                component.focus();

                                            }

                                        });

                                        return false;

                                    }

                                    return true;

                                },
                                'duplicateCheck' : function(mode, value, value2, field, storeid, msg){

                                    var modeValue = mode || 'add';

                                    if(mode === 'add'){

                                        if(!duplicationItem(value, field, storeid)){

                                            Ext.Msg.show({

                                                title : 'WeGuardia™ SMC 2.0',
                                                msg : msg,
                                                buttons : Ext.Msg.OK,
                                                icon : Ext.Msg.ERROR

                                            });

                                            return false;

                                        }

                                        return true;

                                    }
                                    else{

                                        if(!duplicationItem(value, field, storeid) && value !== value2){

                                            Ext.Msg.show({

                                                title : 'WeGuardia™ SMC 2.0',
                                                msg : msg,
                                                buttons : Ext.Msg.OK,
                                                icon : Ext.Msg.ERROR

                                            });

                                            return false;

                                        }

                                        return true;

                                    }

                                }

                            };

                            return validCheckObj;
                        },
                        flex: 1,
                        itemId: 'tpn_ha_main',
                        activeTab: 0,
                        items: [
                            {
                                xtype: 'panel',
                                itemId: 'pnl_ha_sub',
                                layout: 'fit',
                                bodyPadding: 10,
                                title: 'Sub 장비 Checker',
                                items: [
                                    {
                                        xtype: 'container',
                                        height: 250,
                                        itemId: 'ctn_ha_sub',
                                        width: 400,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_eth',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_interface',
                                                        width: 250,
                                                        fieldLabel: '인터페이스',
                                                        value: 'eth0',
                                                        editable: false,
                                                        displayField: 'eth',
                                                        queryMode: 'local',
                                                        store: 'st_common_deveth',
                                                        valueField: 'eth'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_name',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        itemId: 'txf_name',
                                                        width: 250,
                                                        fieldLabel: '이름'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_destination',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                if(!ValidIPv6(value)){

                                                                    return false;

                                                                }

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_targetip',
                                                        width: 250,
                                                        fieldLabel: '대상 IP 주소'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_timeout',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'numberfield',
                                                        validator: function(value) {
                                                            var retValue = LengthCheck(value, 1, 10);

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'nfd_timeout',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '타임아웃',
                                                        value: 3
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        text: '회 실패시 타임아웃'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_maincontrol',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle',
                                                    pack: 'end'
                                                },
                                                listeners: {
                                                    afterrender: 'onCtn_ha_maincontrolAfterRender'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_add',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '추 가'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_mod',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '수 정'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_del',
                                                        width: 100,
                                                        text: '삭 제'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_ha_subchecker',
                                                title: '',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'interface',
                                                        text: '인터페이스',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'name',
                                                        text: '이름',
                                                        flex: 2
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'target_ip',
                                                        text: '대상 IP 주소',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'info',
                                                        text: 'Info',
                                                        flex: 1.5
                                                    }
                                                ],
                                                viewConfig: {
                                                    margin: '0, 0, 10, 0'
                                                },
                                                listeners: {
                                                    itemclick: 'onGpn_ha_subcheckerItemClick'
                                                },
                                                selModel: Ext.create('Ext.selection.RowModel', {
                                                    selType: 'rowmodel',
                                                    mode: 'MULTI'
                                                })
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                itemId: 'pnl_ha_external',
                                layout: 'fit',
                                bodyPadding: 10,
                                title: '외부망 Checker',
                                items: [
                                    {
                                        xtype: 'container',
                                        height: 250,
                                        itemId: 'ctn_ha_external',
                                        width: 400,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_eth',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_interface',
                                                        width: 250,
                                                        fieldLabel: '인터페이스',
                                                        editable: false,
                                                        displayField: 'eth',
                                                        queryMode: 'local',
                                                        store: 'st_common_pppeth',
                                                        valueField: 'eth',
                                                        listeners: {
                                                            afterrender: 'onCmb_interfaceAfterRender'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_name',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        itemId: 'txf_name',
                                                        width: 250,
                                                        fieldLabel: '이름'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_target',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                if(!ValidIPv6(value)){

                                                                    return false;

                                                                }

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_target',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '대상 IP 주소'
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        flex: 1,
                                                        itemId: 'cmb_mode',
                                                        margin: '0, 10, 0, 0',
                                                        fieldLabel: 'Mode',
                                                        editable: false,
                                                        displayField: 'mode',
                                                        valueField: 'mode',
                                                        listeners: {
                                                            afterrender: 'onCmb_modeAfterRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        flex: 1,
                                                        itemId: 'cmb_period',
                                                        fieldLabel: '전송 주기',
                                                        value: 1,
                                                        editable: false,
                                                        store: [
                                                            1,
                                                            3,
                                                            5,
                                                            10
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_timeout',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'numberfield',
                                                        validator: function(value) {
                                                            var retValue = LengthCheck(value, 1, 10);

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'nfd_timeout',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '타임아웃'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        text: '회 실패시 타임아웃'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_externalcontrol',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle',
                                                    pack: 'end'
                                                },
                                                listeners: {
                                                    afterrender: 'onCtn_ha_externalcontrolAfterRender'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_add',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '추 가'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_mod',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '수 정'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_del',
                                                        width: 100,
                                                        text: '삭 제'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_ha_bridge_set',
                                                title: '',
                                                columns: [
                                                    {
                                                        xtype: 'rownumberer',
                                                        text: 'N'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'interface',
                                                        text: '인터페이스',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'name',
                                                        text: '이름',
                                                        flex: 2
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'target_ip',
                                                        text: '대상 IP 주소',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'mode',
                                                        text: 'Mode',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'period',
                                                        text: '전송주기',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'info',
                                                        text: 'Info',
                                                        flex: 1.5
                                                    }
                                                ],
                                                viewConfig: {
                                                    margin: '0, 0, 10, 0'
                                                },
                                                listeners: {
                                                    itemclick: 'onGpn_ha_bridge_setItemClick'
                                                },
                                                selModel: Ext.create('Ext.selection.RowModel', {
                                                    selType: 'rowmodel',
                                                    mode: 'MULTI'
                                                })
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onPnl_ha_externalAfterRender'
                                }
                            },
                            {
                                xtype: 'panel',
                                itemId: 'pnl_ha_source',
                                layout: 'fit',
                                title: '출발지 기반 Packet Relay 설정',
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_ha_source',
                                        padding: 10,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                flex: 0,
                                                margin: '0, 0, 10, 0',
                                                text: '※ 순위를 변경하려면 데이터를 마우스로 드래그하여 원하는 위치에 드롭하세요.'
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_type',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_act',
                                                        margin: '0, 100, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '행위',
                                                        editable: false,
                                                        displayField: 'act',
                                                        valueField: 'act',
                                                        listeners: {
                                                            afterrender: 'onCmb_actAfterRender'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_iptype',
                                                        width: 250,
                                                        fieldLabel: 'IP 타입',
                                                        editable: false,
                                                        displayField: 'type',
                                                        valueField: 'type',
                                                        listeners: {
                                                            change: 'onCmb_iptypeChange',
                                                            afterrender: 'onCmb_iptypeAfterRender'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_ipaddress',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_ipaddress',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: 'IP 주소'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        hidden: true,
                                                        itemId: 'lab_midlabel',
                                                        margin: '0, 10, 0, 0',
                                                        text: '~'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        hidden: true,
                                                        itemId: 'txf_ipaddress2',
                                                        width: 150,
                                                        fieldLabel: ''
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_sourcecontrol',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle',
                                                    pack: 'end'
                                                },
                                                listeners: {
                                                    afterrender: 'onCtn_ha_sourcecontrolAfterRender'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_add',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '추 가'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_mod',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '수 정'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_del',
                                                        width: 100,
                                                        text: '삭 제'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_ha_source_set',
                                                title: '',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'number',
                                                        text: 'Number',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'action',
                                                        text: '행위',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value['@type'];
                                                        },
                                                        dataIndex: 'ip',
                                                        text: 'IP 타입',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value['#text'];
                                                        },
                                                        dataIndex: 'ip',
                                                        text: 'IP 주소',
                                                        flex: 3
                                                    }
                                                ],
                                                viewConfig: {
                                                    plugins: [
                                                        Ext.create('Ext.grid.plugin.DragDrop', {

                                                        })
                                                    ],
                                                    listeners: {
                                                        drop: 'onViewDrop'
                                                    }
                                                },
                                                listeners: {
                                                    itemclick: 'onGpn_ha_source_setItemClick'
                                                },
                                                selModel: Ext.create('Ext.selection.RowModel', {
                                                    selType: 'rowmodel',
                                                    mode: 'MULTI'
                                                })
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                itemId: 'pnl_ha_destination',
                                layout: 'fit',
                                title: '목적지 기반 Packet Relay 설정',
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_ha_destination',
                                        padding: 10,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                flex: 0,
                                                margin: '0, 0, 10, 0',
                                                text: '※ 순위를 변경하려면 데이터를 마우스로 드래그하여 원하는 위치에 드롭하세요.'
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_type',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_act',
                                                        margin: '0, 100, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '행위',
                                                        editable: false,
                                                        displayField: 'act',
                                                        valueField: 'act',
                                                        listeners: {
                                                            afterrender: 'onCmb_actAfterRender1'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_iptype',
                                                        width: 250,
                                                        fieldLabel: 'IP 타입',
                                                        editable: false,
                                                        displayField: 'type',
                                                        valueField: 'type',
                                                        listeners: {
                                                            change: 'onCmb_iptypeChange1',
                                                            afterrender: 'onCmb_iptypeAfterRender1'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_ipaddress',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                if(!ValidIPv6(value)){

                                                                    return false;

                                                                }

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_ipaddress',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: 'IP 주소'
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        hidden: true,
                                                        itemId: 'lab_midlabel',
                                                        margin: '0, 10, 0, 0',
                                                        text: '~'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                if(!ValidIPv6(value)){

                                                                    return false;

                                                                }

                                                            }

                                                            return true;
                                                        },
                                                        hidden: true,
                                                        itemId: 'txf_ipaddress2',
                                                        width: 150,
                                                        fieldLabel: ''
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_destcontrol',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle',
                                                    pack: 'end'
                                                },
                                                listeners: {
                                                    afterrender: 'onCtn_ha_destcontrolAfterRender'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_add',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '추 가'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_mod',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '수 정'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_del',
                                                        width: 100,
                                                        text: '삭 제'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_ha_destination_set',
                                                title: '',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'number',
                                                        text: 'Number',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'action',
                                                        text: '행위',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value['@type'];
                                                        },
                                                        dataIndex: 'ip',
                                                        text: 'IP 타입',
                                                        flex: 1.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                            return value['#text'];
                                                        },
                                                        dataIndex: 'ip',
                                                        text: 'IP 주소',
                                                        flex: 3
                                                    }
                                                ],
                                                viewConfig: {
                                                    plugins: [
                                                        Ext.create('Ext.grid.plugin.DragDrop', {

                                                        })
                                                    ],
                                                    listeners: {
                                                        drop: 'onViewDrop1'
                                                    }
                                                },
                                                listeners: {
                                                    itemclick: 'onGpn_ha_source_setItemClick1'
                                                },
                                                selModel: Ext.create('Ext.selection.RowModel', {
                                                    selType: 'rowmodel',
                                                    mode: 'MULTI'
                                                })
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'tabpanel',
                        validityCheck: function() {
                            // validityCheck ===============================================================================================================================================================
                            //
                            // 일시 : 2014.07.03
                            //
                            // 설명 : HA 본점 유효성을 검사합니다.
                            //
                            // =============================================================================================================================================================================

                            var component   = Ext.getCmp('pnl_xtm_ha_branch_office').componentStorage();

                            var validCheckObj = {

                                'blankCheck' : function(component){

                                    var argument = (arguments[1] === undefined) ? true : arguments[1];

                                    if(component.getXType() === 'textfield'){

                                        if(component.getValue() === '' && argument){

                                            Ext.Msg.show({

                                                'title' : 'WeGuardia™ SMC 2.0',
                                                'msg' : '필수 입력 항목입니다.',
                                                'buttons' : Ext.Msg.OK,
                                                'icon' : Ext.Msg.ERROR,
                                                'fn' : function(res){

                                                    component.focus();

                                                }

                                            });

                                            return false;

                                        }

                                    }
                                    else{

                                        if(component.getValue() === null && argument){

                                            Ext.Msg.show({

                                                'title' : 'WeGuardia™ SMC 2.0',
                                                'msg' : '필수 입력 항목입니다.',
                                                'buttons' : Ext.Msg.OK,
                                                'icon' : Ext.Msg.ERROR,
                                                'fn' : function(res){

                                                    component.focus();

                                                }

                                            });

                                            return false;

                                        }

                                    }

                                    return true;

                                },
                                'storeLimitCheck' : function(storeId, msg){

                                    if(Ext.getStore(storeId).count() >= 1){

                                        Ext.Msg.show({

                                            title : 'WeGuardia™ SMC 2.0',
                                            msg : msg,
                                            buttons : Ext.Msg.OK,
                                            icon : Ext.Msg.ERROR

                                        });

                                        return false;

                                    }

                                    return true;

                                },
                                'validateCheck' : function(component, msg){

                                    var argument = (arguments[2] === undefined) ? true : arguments[2];

                                    if(!component.validate() && argument){

                                        Ext.Msg.show({

                                            'title' : 'WeGuardia™ SMC 2.0',
                                            'msg' : msg,
                                            'buttons' : Ext.Msg.OK,
                                            'icon' : Ext.Msg.ERROR,
                                            'fn' : function(res){

                                                component.focus();

                                            }

                                        });

                                        return false;

                                    }

                                    return true;

                                },
                                'duplicateCheck' : function(mode, value, value2, field, storeid, msg){

                                    var modeValue = mode || 'add';

                                    if(mode === 'add'){

                                        if(!duplicationItem(value, field, storeid)){

                                            Ext.Msg.show({

                                                title : 'WeGuardia™ SMC 2.0',
                                                msg : msg,
                                                buttons : Ext.Msg.OK,
                                                icon : Ext.Msg.ERROR

                                            });

                                            return false;

                                        }

                                        return true;

                                    }
                                    else{

                                        if(!duplicationItem(value, field, storeid) && value !== value2){

                                            Ext.Msg.show({

                                                title : 'WeGuardia™ SMC 2.0',
                                                msg : msg,
                                                buttons : Ext.Msg.OK,
                                                icon : Ext.Msg.ERROR

                                            });

                                            return false;

                                        }

                                        return true;

                                    }

                                }

                            };

                            return validCheckObj;
                        },
                        flex: 1,
                        hidden: true,
                        itemId: 'tpn_ha_sub',
                        hideCollapseTool: true,
                        activeTab: 0,
                        items: [
                            {
                                xtype: 'panel',
                                itemId: 'pnl_ha_main',
                                padding: 10,
                                layout: 'fit',
                                title: 'Main 장비 Checker',
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_ha_main',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_eth',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_interface',
                                                        width: 250,
                                                        fieldLabel: '인터페이스',
                                                        value: 'eth0',
                                                        editable: false,
                                                        displayField: 'eth',
                                                        queryMode: 'local',
                                                        store: 'st_common_pppeth',
                                                        valueField: 'eth',
                                                        listeners: {
                                                            afterrender: 'onCmb_interfaceAfterRender1'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_name',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        itemId: 'txf_name',
                                                        width: 250,
                                                        fieldLabel: '이름'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_tergetip',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                if(!ValidIPv6(value)){

                                                                    return false;

                                                                }

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_target',
                                                        margin: '0, 30, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '대상 IP 주소'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_timeout',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'numberfield',
                                                        validator: function(value) {
                                                            var retValue = LengthCheck(value, 1, 10);

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'nfd_timeout',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '타임아웃',
                                                        value: 3
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        text: '회 실패시 타임아웃'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_submaincontrol',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle',
                                                    pack: 'end'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_add',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '추 가'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_mod',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '수 정'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_del',
                                                        width: 100,
                                                        text: '삭 제'
                                                    }
                                                ],
                                                listeners: {
                                                    afterrender: 'onCtn_ha_submaincontrolAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_ha_main',
                                                title: '',
                                                columns: [
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'interface',
                                                        text: '인터페이스',
                                                        flex: 0.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'name',
                                                        text: '이름',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'target_ip',
                                                        text: '대상 IP 주소',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'info',
                                                        text: 'Info',
                                                        flex: 1
                                                    }
                                                ],
                                                listeners: {
                                                    itemclick: 'onGpn_ha_mainItemClick'
                                                },
                                                selModel: Ext.create('Ext.selection.RowModel', {
                                                    selType: 'rowmodel',
                                                    mode: 'MULTI'
                                                })
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'panel',
                                itemId: 'pnl_ha_ext',
                                layout: 'fit',
                                title: '외부망 Checker',
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_ha_ext',
                                        padding: 10,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_eth',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_interface',
                                                        width: 250,
                                                        fieldLabel: '인터페이스',
                                                        value: 'eth0',
                                                        editable: false,
                                                        displayField: 'eth',
                                                        queryMode: 'local',
                                                        store: 'st_common_pppeth',
                                                        valueField: 'eth'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_name',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        itemId: 'txf_name',
                                                        width: 250,
                                                        fieldLabel: '이름'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_terget',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            if(!ValidIPAddress(value)){

                                                                if(!ValidIPv6(value)){

                                                                    return false;

                                                                }

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_target',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '대상 IP 주소'
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        flex: 1,
                                                        itemId: 'cmb_mode',
                                                        margin: '0, 10, 0, 0',
                                                        fieldLabel: 'Mode',
                                                        editable: false,
                                                        displayField: 'mode',
                                                        queryMode: 'local',
                                                        valueField: 'mode',
                                                        listeners: {
                                                            afterrender: 'onCmb_modeAfterRender1'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'combobox',
                                                        flex: 1,
                                                        itemId: 'cmb_period',
                                                        fieldLabel: '전송 주기',
                                                        value: 1,
                                                        editable: false,
                                                        queryMode: 'local',
                                                        store: [
                                                            1,
                                                            3,
                                                            5,
                                                            10
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_timeout',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'numberfield',
                                                        validator: function(value) {
                                                            var retValue = LengthCheck(value, 1, 10);

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'nfd_timeout',
                                                        margin: '0, 10, 0, 0',
                                                        width: 250,
                                                        fieldLabel: '타임아웃',
                                                        value: 3
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        text: '회 실패시 타임아웃'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_ha_subbrenchcontrol',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle',
                                                    pack: 'end'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_add',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '추 가'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_mod',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '수 정'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_del',
                                                        width: 100,
                                                        text: '삭 제'
                                                    }
                                                ],
                                                listeners: {
                                                    afterrender: 'onCtn_ha_subbrenchcontrolAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_ha_ext',
                                                title: '',
                                                columns: [
                                                    {
                                                        xtype: 'rownumberer',
                                                        text: 'N'
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'interface',
                                                        text: '인터페이스',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'name',
                                                        text: '이름',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'target_ip',
                                                        text: '대상 IP 주소',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'mode',
                                                        text: 'Mode',
                                                        flex: 1
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'period',
                                                        text: '전송주기',
                                                        flex: 0.5
                                                    },
                                                    {
                                                        xtype: 'gridcolumn',
                                                        dataIndex: 'info',
                                                        text: 'Info',
                                                        flex: 1
                                                    }
                                                ],
                                                listeners: {
                                                    itemclick: 'onGpn_ha_extItemClick'
                                                },
                                                selModel: Ext.create('Ext.selection.RowModel', {
                                                    selType: 'rowmodel',
                                                    mode: 'MULTI'
                                                })
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onPnl_ha_extAfterRender'
                                }
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

    onRdg_modeChange: function(field, newValue, oldValue, eOpts) {
        // onRdg_modeChange =============================================================================================================================================================
        //
        // 일시 : 2014.10.28
        //
        // 설명 :
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        if(newValue.ha_mode === 'main'){

            componentObj.submac.setVisible(true);

            componentObj.tabmain.setVisible(true);

            componentObj.tabsub.setVisible(false);

        }
        else{

            componentObj.submac.setVisible(false);

            componentObj.tabmain.setVisible(false);

            componentObj.tabsub.setVisible(true);

        }


    },

    onCtn_ha_maincontrolAfterRender: function(component, eOpts) {
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var subStore = Ext.getStore('st_ha_branchmain_subgrid');

        var me = componentObj.tabmain;

        bt_add.on('click', function(){

            if(!me.validityCheck().storeLimitCheck('st_ha_branchmain_subgrid', '하나의 Checker만 입력할 수 있습니다.') ||
               !me.validityCheck().blankCheck(componentObj.sub_name) || !me.validityCheck().blankCheck(componentObj.sub_terget) || !me.validityCheck().blankCheck(componentObj.sub_timeout) ||
               !me.validityCheck().validateCheck(componentObj.sub_terget, 'IP형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.sub_timeout, '타임아웃의 범위는 1~10 입니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.sub_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.sub_eth.getValue();
            obj.mode         = null;
            obj.name         = componentObj.sub_name.getValue();
            obj.period       = 1;
            obj.target_ip    = componentObj.sub_terget.getValue();
            obj.timeout      = componentObj.sub_timeout.getValue();

            gridData_Add(componentObj.sub_grid, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.sub_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 Sub Checker 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(componentObj.sub_name) || !me.validityCheck().blankCheck(componentObj.sub_terget) || !me.validityCheck().blankCheck(componentObj.sub_timeout) ||
               !me.validityCheck().validateCheck(componentObj.sub_terget, 'IP형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.sub_timeout, '타임아웃의 범위는 1~10 입니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.sub_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.sub_eth.getValue();
            obj.name         = componentObj.sub_name.getValue();
            obj.target_ip    = componentObj.sub_terget.getValue();
            obj.timeout      = componentObj.sub_timeout.getValue();

            selectionGrid_Mod(componentObj.sub_grid , obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.sub_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 Sub Checker 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.sub_grid);

        });
    },

    onGpn_ha_subcheckerItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = Ext.getCmp('pnl_xtm_ha_branch_office').componentStorage();

        componentObj.sub_eth.setValue(record.data['interface']);
        componentObj.sub_name.setValue(record.data.name);
        componentObj.sub_terget.setValue(record.data.target_ip);
        componentObj.sub_timeout.setValue(record.data.timeout);
    },

    onCmb_interfaceAfterRender: function(component, eOpts) {
        comboAutoSelect(component, 'st_common_pppeth');
    },

    onCmb_modeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_ha_externalmode',
            'fields' : [
                {	'name' : 'mode'		}
            ],
            'data' : [
                {	'mode' : 'none'	      },
                {	'mode' : 'linelb'	  },
                {	'mode' : 'standby'	  }
            ]

        }));

        component.setValue('none');
    },

    onCtn_ha_externalcontrolAfterRender: function(component, eOpts) {
        // onCtn_external_controlAfterRender ===========================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : HA 지점 외부망 Checker 설정을 추가, 수정, 삭제 기능을 정의합니다.
        //
        // =============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var subStore     = Ext.getStore('st_ha_branchmain_extgrid');

        var me = componentObj.tabmain;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck(componentObj.ext_name) || !me.validityCheck().blankCheck(componentObj.ext_target) || !me.validityCheck().blankCheck(componentObj.ext_timeout) ||
               !me.validityCheck().validateCheck(componentObj.ext_target, 'IP형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.ext_timeout, '타임아웃의 범위는 1~10 입니다.') ||
               !me.validityCheck().duplicateCheck('add', componentObj.ext_name.getValue(), null, 'name', 'st_ha_branchmain_extgrid', '이름은 중복될 수 없습니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.ext_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.ext_eth.getValue();
            obj.mode         = componentObj.ext_mode.getValue();
            obj.name         = componentObj.ext_name.getValue();
            obj.period       = componentObj.ext_period.getValue();
            obj.target_ip    = componentObj.ext_target.getValue();
            obj.timeout      = componentObj.ext_timeout.getValue();

            gridData_Add(componentObj.ext_grid , obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.ext_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 외부망 Checker 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(componentObj.ext_name) || !me.validityCheck().blankCheck(componentObj.ext_target) || !me.validityCheck().blankCheck(componentObj.ext_timeout) ||
               !me.validityCheck().validateCheck(componentObj.ext_target, 'IP형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.ext_timeout, '타임아웃의 범위는 1~10 입니다.') ||
               !me.validityCheck().duplicateCheck('mod', componentObj.ext_name.getValue(), componentObj.ext_grid.getSelectionModel().getSelection()[0].get('name'), 'name', 'st_ha_branchmain_extgrid', '이름은 중복될 수 없습니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.ext_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.ext_eth.getValue();
            obj.mode         = componentObj.ext_mode.getValue();
            obj.name         = componentObj.ext_name.getValue();
            obj.period       = componentObj.ext_period.getValue();
            obj.target_ip    = componentObj.ext_target.getValue();
            obj.timeout      = componentObj.ext_timeout.getValue();

            selectionGrid_Mod(componentObj.ext_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.ext_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 외부망 Checker 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.ext_grid);

        });
    },

    onGpn_ha_bridge_setItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = Ext.getCmp('pnl_xtm_ha_branch_office').componentStorage();

        componentObj.ext_eth.setValue(record.data['interface']);
        componentObj.ext_name.setValue(record.data.name);
        componentObj.ext_target.setValue(record.data.target_ip);
        componentObj.ext_mode.setValue(record.data.mode);
        componentObj.ext_period.setValue(record.data.period);
        componentObj.ext_timeout.setValue(record.data.timeout);
    },

    onPnl_ha_externalAfterRender: function(component, eOpts) {
        var comboObj = component.down('[itemId=ctn_ha_external]').down('[itemId=ctn_ha_eth]').down('[itemId=cmb_interface]');

        comboAutoSelect(comboObj, 'st_common_pppeth');
    },

    onCmb_actAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_ha_sourceact',
            'fields' : [
                {	'name' : 'act'		}
            ],
            'data' : [
                {	'act' : 'accept'	},
                {	'act' : 'redirect'	}
            ]
        }));

        component.setValue('accept');
    },

    onCmb_iptypeChange: function(field, newValue, oldValue, eOpts) {
        var componentObj = this.componentStorage();

        var sou_ipaddr   = componentObj.sou_ipaddr;
        var sou_label    = componentObj.sou_label;
        var sou_ipaddr2  = componentObj.sou_ipaddr2;

        if(newValue === 'single'){

            sou_ipaddr.setVisible(true);

            sou_label.setVisible(false);

            sou_ipaddr2.setVisible(false);

        }
        else if(newValue === 'range'){

            sou_ipaddr.setVisible(true);

            sou_label.setVisible(true);

            sou_label.setText('~');

            sou_ipaddr2.setVisible(true);

        }
        else if(newValue === 'netmask'){

            sou_ipaddr.setVisible(true);

            sou_label.setVisible(true);

            sou_label.setText('/');

            sou_ipaddr2.setVisible(true);

        }
        else{

            sou_ipaddr.setVisible(false);

            sou_label.setVisible(false);

            sou_ipaddr2.setVisible(false);

        }
    },

    onCmb_iptypeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_ha_sourceiptype',
            'fields' : [
                {	'name' : 'type'		}
            ],
            'data' : [
                {	'type' : 'single'	},
                {	'type' : 'range'	},
                {	'type' : 'netmask'	},
                {	'type' : 'odd'		},
                {	'type' : 'even'		}
            ]
        }));

        component.setValue('single');
    },

    onCtn_ha_sourcecontrolAfterRender: function(component, eOpts) {
        // onCtn_branch_controlAfterRender =============================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : HA 지점 출발지 기반 데이터를 추가, 수정, 삭제 기능을 정의합니다.
        //
        // =============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = componentObj.tabmain;

        bt_add.on('click', function(){

            var packetType = componentObj.sou_iptype.getValue();

            if(

        // IP 타입에 따라 유효성 검사 수행 =================================================================================================================================================

                (packetType === 'single') ? !me.validityCheck().blankCheck(componentObj.sou_ipaddr) || !me.validityCheck().validateCheck(componentObj.sou_ipaddr, 'IP 형식에 맞지 않습니다.') :
                (packetType === 'range' || packetType === 'netmask') ? !me.validityCheck().blankCheck(componentObj.sou_ipaddr) || !me.validityCheck().blankCheck(componentObj.sou_ipaddr2) ||
                                                                       !me.validityCheck().validateCheck(componentObj.sou_ipaddr, 'IP 형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.sou_ipaddr2, 'IP 형식에 맞지 않습니다.') : false

               ){

                return;

            }

            var obj = {};

            obj.action  = componentObj.sou_act.getValue();

            var ipObj   = {
                '#text' : (componentObj.sou_iptype.getValue() === 'single' ) ? componentObj.sou_ipaddr.getValue() :
                          (componentObj.sou_iptype.getValue() === 'range'  ) ? componentObj.sou_ipaddr.getValue() + '-' + componentObj.sou_ipaddr2.getValue() :
                          (componentObj.sou_iptype.getValue() === 'netmask') ? componentObj.sou_ipaddr.getValue() + '/' + componentObj.sou_ipaddr2.getValue() :
                          "",
                '@type' : packetType,
                '@version' : 'v4'
            };

            obj.ip      = ipObj;
            obj.number  = componentObj.sou_grid.getStore().count() + 1;

            gridData_Add(componentObj.sou_grid , obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.sou_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(

        // IP 타입에 따라 유효성 검사 수행 =================================================================================================================================================

                (packetType === 'single') ? !me.validityCheck().blankCheck(componentObj.sou_ipaddr) || !me.validityCheck().validateCheck(componentObj.sou_ipaddr, 'IP 형식에 맞지 않습니다.') :
                (packetType === 'range' || packetType === 'netmask') ? !me.validityCheck().blankCheck(componentObj.sou_ipaddr) || !me.validityCheck().blankCheck(componentObj.sou_ipaddr2) ||
                                                                       !me.validityCheck().validateCheck(componentObj.sou_ipaddr, 'IP 형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.sou_ipaddr2, 'IP 형식에 맞지 않습니다.') : false

               ){

                return;

            }

            var obj = {};

            obj.action  = componentObj.sou_act.getValue();

            var ipObj   = {
                '#text' : (componentObj.sou_iptype.getValue() === 'single' ) ? componentObj.sou_ipaddr.getValue() :
                          (componentObj.sou_iptype.getValue() === 'range'  ) ? componentObj.sou_ipaddr.getValue() + '-' + componentObj.sou_ipaddr2.getValue() :
                          (componentObj.sou_iptype.getValue() === 'netmask') ? componentObj.sou_ipaddr.getValue() + '/' + componentObj.sou_ipaddr2.getValue() :
                          "",
                '@type' : componentObj.sou_iptype.getValue(),
                '@version' : 'v4'
            };

            obj.ip      = ipObj;

            selectionGrid_Mod(componentObj.sou_grid , obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.sou_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 출발지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.sou_grid);

        });
    },

    onViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        var gridStore  = this.componentStorage().sou_grid.getStore();

        for(var i = 0; i < gridStore.count(); i++){

            var obj    = {};

            obj.number = i + 1;

            gridStore.getAt(i).set(obj);

            gridStore.getAt(i).commit();
        }
    },

    onGpn_ha_source_setItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = this.componentStorage();

        componentObj.sou_act.setValue(record.data.action);
        componentObj.sou_iptype.setValue(record.data.ip['@type']);

        var ipText = record.data.ip['#text'];

        if(record.data.ip['@type'] === 'range'){

            componentObj.sou_ipaddr.setValue(ipText.split('-')[0]);

            componentObj.sou_ipaddr2.setValue(ipText.split('-')[1]);

        }
        else if(record.data.ip['@type'] === 'netmask'){

            componentObj.sou_ipaddr.setValue(ipText.split('/')[0]);

            componentObj.sou_ipaddr2.setValue(ipText.split('/')[1]);

        }
        else{

            componentObj.sou_ipaddr.setValue(record.data.ip['#text']);

        }
    },

    onCmb_actAfterRender1: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_ha_destact',
            'fields' : [
                {	'name' : 'act'		}
            ],
            'data' : [
                {	'act' : 'accept'	},
                {	'act' : 'redirect'	}
            ]
        }));

        component.setValue('accept');
    },

    onCmb_iptypeChange1: function(field, newValue, oldValue, eOpts) {
        var componentObj = this.componentStorage();

        var des_ipaddr   = componentObj.des_ipaddr;
        var des_label    = componentObj.des_label;
        var des_ipaddr2  = componentObj.des_ipaddr2;

        console.log('des_ipaddr -> ', des_ipaddr);

        if(newValue === 'single'){

            des_ipaddr.setVisible(true);

            des_label.setVisible(false);

            des_ipaddr2.setVisible(false);

        }
        else if(newValue === 'range'){

            des_ipaddr.setVisible(true);

            des_label.setVisible(true);

            des_label.setText('~');

            des_ipaddr2.setVisible(true);

        }
        else if(newValue === 'netmask'){

            des_ipaddr.setVisible(true);

            des_label.setVisible(true);

            des_label.setText('/');

            des_ipaddr2.setVisible(true);

        }
        else{

            des_ipaddr.setVisible(false);

            des_label.setVisible(false);

            des_ipaddr2.setVisible(false);

        }
    },

    onCmb_iptypeAfterRender1: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_ha_destiptype',
            'fields' : [
                {	'name' : 'type'		}
            ],
            'data' : [
                {	'type' : 'single'	},
                {	'type' : 'range'	},
                {	'type' : 'netmask'	},
                {	'type' : 'odd'		},
                {	'type' : 'even'		}
            ]
        }));

        component.setValue('single');
    },

    onCtn_ha_destcontrolAfterRender: function(component, eOpts) {
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = componentObj.tabmain;

        bt_add.on('click', function(){

            var packetType = componentObj.des_iptype.getValue();

            if(

        // IP 타입에 따라 유효성 검사 수행 =================================================================================================================================================

                (packetType === 'single') ? !me.validityCheck().blankCheck(componentObj.des_ipaddr) || !me.validityCheck().validateCheck(componentObj.des_ipaddr, 'IP 형식에 맞지 않습니다.') :
                (packetType === 'range' || packetType === 'netmask') ? !me.validityCheck().blankCheck(componentObj.des_ipaddr) || !me.validityCheck().blankCheck(componentObj.des_ipaddr2) ||
                                                                       !me.validityCheck().validateCheck(componentObj.des_ipaddr, 'IP 형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.des_ipaddr2, 'IP 형식에 맞지 않습니다.') : false

               ){

                return;

            }

            var obj = {};

            obj.action  = componentObj.des_act.getValue();

            var ipObj   = {
                '#text' : (componentObj.des_iptype.getValue() === 'single' ) ? componentObj.des_ipaddr.getValue() :
                          (componentObj.des_iptype.getValue() === 'range'  ) ? componentObj.des_ipaddr.getValue() + '-' + componentObj.des_ipaddr2.getValue() :
                          (componentObj.des_iptype.getValue() === 'netmask') ? componentObj.des_ipaddr.getValue() + '/' + componentObj.des_ipaddr2.getValue() :
                          "",
                '@type' : packetType,
                '@version' : 'v4'
            };

            obj.ip      = ipObj;
            obj.number  = componentObj.des_grid.getStore().count() + 1;

            gridData_Add(componentObj.des_grid , obj);

        });

        bt_mod.on('click', function(){

            var packetType = componentObj.des_iptype.getValue();

            if(!componentObj.des_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 목적지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(

        // IP 타입에 따라 유효성 검사 수행 =================================================================================================================================================

                (packetType === 'single') ? !me.validityCheck().blankCheck(componentObj.des_ipaddr) || !me.validityCheck().validateCheck(componentObj.des_ipaddr, 'IP 형식에 맞지 않습니다.') :
                (packetType === 'range' || packetType === 'netmask') ? !me.validityCheck().blankCheck(componentObj.des_ipaddr) || !me.validityCheck().blankCheck(componentObj.des_ipaddr2) ||
                                                                       !me.validityCheck().validateCheck(componentObj.des_ipaddr, 'IP 형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.des_ipaddr2, 'IP 형식에 맞지 않습니다.') : false

               ){

                return;

            }

            var obj = {};

            obj.action  = componentObj.des_act.getValue();

            var ipObj   = {
                '#text' : (componentObj.des_iptype.getValue() === 'single' ) ? componentObj.des_ipaddr.getValue() :
                          (componentObj.des_iptype.getValue() === 'range'  ) ? componentObj.des_ipaddr.getValue() + '-' + componentObj.des_ipaddr2.getValue() :
                          (componentObj.des_iptype.getValue() === 'netmask') ? componentObj.des_ipaddr.getValue() + '/' + componentObj.des_ipaddr2.getValue() :
                          "",
                '@type' : packetType,
                '@version' : 'v4'
            };

            obj.ip      = ipObj;

            selectionGrid_Mod(componentObj.des_grid , obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.des_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 목적지 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.des_grid);

        });
    },

    onViewDrop1: function(node, data, overModel, dropPosition, eOpts) {
        var gridStore  = this.componentStorage().des_grid.getStore();

        for(var i = 0; i < gridStore.count(); i++){

            var obj    = {};

            obj.number = i + 1;

            gridStore.getAt(i).set(obj);

            gridStore.getAt(i).commit();

        }
    },

    onGpn_ha_source_setItemClick1: function(dataview, record, item, index, e, eOpts) {
        var componentObj = this.componentStorage();

        componentObj.des_act.setValue(record.data.action);
        componentObj.des_iptype.setValue(record.data.ip['@type']);

        var ipText = record.data.ip['#text'];

        if(record.data.ip['@type'] === 'range'){

            componentObj.des_ipaddr.setValue(ipText.split('-')[0]);

            componentObj.des_ipaddr2.setValue(ipText.split('-')[1]);

        }
        else if(record.data.ip['@type'] === 'netmask'){

            componentObj.des_ipaddr.setValue(ipText.split('/')[0]);

            componentObj.des_ipaddr2.setValue(ipText.split('/')[1]);

        }
        else{

            componentObj.des_ipaddr.setValue(record.data.ip['#text']);

        }
    },

    onCmb_interfaceAfterRender1: function(component, eOpts) {
        comboAutoSelect(component, component.getStore());
    },

    onCtn_ha_submaincontrolAfterRender: function(component, eOpts) {
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var mainStore    = Ext.getStore('st_ha_branchsub_maingrid');

        var me = componentObj.tabsub;

        bt_add.on('click', function(){

            if(!me.validityCheck().storeLimitCheck('st_ha_branchsub_maingrid', '하나의 Checker만 입력할 수 있습니다.') ||
               !me.validityCheck().blankCheck(componentObj.main_name) || !me.validityCheck().blankCheck(componentObj.main_target) || !me.validityCheck().blankCheck(componentObj.main_timeout) ||
               !me.validityCheck().validateCheck(componentObj.main_target, 'IP형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.main_timeout, '타임아웃의 범위는 1~10 입니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.main_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.main_eth.getValue();
            obj.mode         = null;
            obj.name         = componentObj.main_name.getValue();
            obj.period       = 1;
            obj.target_ip    = componentObj.main_target.getValue();
            obj.timeout      = componentObj.main_timeout.getValue();

            gridData_Add(componentObj.main_grid , obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.main_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 Main Checker 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(componentObj.main_name) || !me.validityCheck().blankCheck(componentObj.main_target) || !me.validityCheck().blankCheck(componentObj.main_timeout) ||
               !me.validityCheck().validateCheck(componentObj.main_target, 'IP형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.main_timeout, '타임아웃의 범위는 1~10 입니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.main_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.main_eth.getValue();
            obj.mode         = null;
            obj.name         = componentObj.main_name.getValue();
            obj.period       = 1;
            obj.target_ip    = componentObj.main_target.getValue();
            obj.timeout      = componentObj.main_timeout.getValue();

            selectionGrid_Mod(componentObj.main_grid , obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.main_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 Main 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.main_grid);

        });
    },

    onGpn_ha_mainItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = this.componentStorage();

        componentObj.main_eth.setValue(record.data['interface']);
        componentObj.main_name.setValue(record.data.name);
        componentObj.main_target.setValue(record.data.target_ip);
        componentObj.main_timeout.setValue(record.data.timeout);
    },

    onCmb_modeAfterRender1: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_ha_extmode',
            'fields' : [
                {	'name' : 'mode'		}
            ],
            'data' : [
                {	'mode' : 'none'	      },
                {	'mode' : 'linelb'	  },
                {	'mode' : 'standby'	  }
            ]
        }));

        component.setValue('none');
    },

    onCtn_ha_subbrenchcontrolAfterRender: function(component, eOpts) {
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = Ext.getCmp('pnl_xtm_ha_branch_office').componentStorage();

        var me = componentObj.tabsub;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck(componentObj.subext_name) || !me.validityCheck().blankCheck(componentObj.subext_target) || !me.validityCheck().blankCheck(componentObj.subext_timeout) ||
               !me.validityCheck().validateCheck(componentObj.subext_target, 'IP형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.subext_timeout, '타임아웃의 범위는 1~10 입니다.') ||
               !me.validityCheck().duplicateCheck('add', componentObj.subext_name.getValue(), null, 'name', 'st_ha_branchsub_extgrid', '이름은 중복될 수 없습니다.')){

                return;

            }

            var obj          = {};

            obj.info         = componentObj.subext_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.subext_eth.getValue();
            obj.mode         = componentObj.subext_mode.getValue();
            obj.name         = componentObj.subext_name.getValue();
            obj.period       = componentObj.subext_period.getValue();
            obj.target_ip    = componentObj.subext_target.getValue();
            obj.timeout      = componentObj.subext_timeout.getValue();

            gridData_Add(componentObj.subext_grid , obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.subext_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 외부망 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(componentObj.subext_name) || !me.validityCheck().blankCheck(componentObj.subext_target) || !me.validityCheck().blankCheck(componentObj.subext_timeout) ||
               !me.validityCheck().validateCheck(componentObj.subext_target, 'IP 형식에 맞지 않습니다.') || !me.validityCheck().validateCheck(componentObj.subext_timeout, '타임아웃의 범위는 1~10 입니다.') ||
               !me.validityCheck().duplicateCheck('mod', componentObj.subext_name.getValue(), componentObj.subext_grid.getSelectionModel().getSelection()[0].get('name'), 'name', 'st_ha_branchsub_extgrid', '이름은 중복될 수 없습니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.subext_timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.subext_eth.getValue();
            obj.mode         = componentObj.subext_mode.getValue();
            obj.name         = componentObj.subext_name.getValue();
            obj.period       = componentObj.subext_period.getValue();
            obj.target_ip    = componentObj.subext_target.getValue();
            obj.timeout      = componentObj.subext_timeout.getValue();

            selectionGrid_Mod(componentObj.subext_grid , obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.subext_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 외부망 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.subext_grid);

        });
    },

    onGpn_ha_extItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = this.componentStorage();

        componentObj.subext_eth.setValue(record.data['interface']);
        componentObj.subext_name.setValue(record.data.name);
        componentObj.subext_target.setValue(record.data.target_ip);

        componentObj.subext_mode.setValue((record.data.mode === null) ? 'none' : record.data.mode);
        componentObj.subext_period.setValue(record.data.period);
        componentObj.subext_timeout.setValue(record.data.timeout);
    },

    onPnl_ha_extAfterRender: function(component, eOpts) {
        var comboObj = component.down('[itemId=ctn_ha_ext]').down('[itemId=ctn_ha_eth]').down('[itemId=cmb_interface]');

        comboAutoSelect(comboObj, 'st_common_pppeth');
    },

    onPnl_xtm_ha_branch_officeAfterRender: function(component, eOpts) {
        // onPnl_xtm_ha_branch_officeAfterRender ======================================================================================================================================
        //
        // 일시 : 2014.06.16
        //
        // 설명 : HA 지점 데이터를 설정된 모드에 맞게 그리드에 출력력력합니다. 사용하는 파라미터는 ha_branch_script 입니다. 데이터가 없을 경우 ha_branch_script = null 로 데이터가 표현됩니다.
        //
        // ============================================================================================================================================================================

        var subChecker    = Ext.getStore('st_ha_branchmain_subgrid');
        var extChecker    = Ext.getStore('st_ha_branchmain_extgrid');
        var sourcePacket  = Ext.getStore('st_ha_branchmain_sourgrid');
        var destPacket    = Ext.getStore('st_ha_branchmain_destgrid');

        var subMain       = Ext.getStore('st_ha_branchsub_maingrid');
        var subExtChecker = Ext.getStore('st_ha_branchsub_extgrid');

        this.initStore();

        component.setLoading(true);

        var componentObj = this.componentStorage();

        // 데이터 null 체크 =============================================================================================================================================================

        var deviceData = component.deviceParams;

        if(deviceData){

            componentObj.modeselect.setValue({	'ha_mode' : deviceData.branch_mode['@mode']	});

        // Main Checker 초기화 =========================================================================================================================================================

            try{

                if(deviceData.main.checker_sub)
                    subChecker.add(deviceData.main.checker_sub);

            }
            catch(err){

                component.setLoading(false);

                console.log('Main Checker 초기화 중 예외 발생 : ', err);

            }

        // 외부 Checker 초기화 ==========================================================================================================================================================

            try{

                if(deviceData.main.checker_external){

                    Ext.each(deviceData.main.checker_external, function(extCheckerData){

                        extChecker.add(extCheckerData);

                    });

                }

            }
            catch(err){

                component.setLoading(false);

                console.log('외부 Checker 초기화 중 예외 발생 : ', err);

            }

        // 패킷 릴레이 초기화 ============================================================================================================================================================

            try{

                if(deviceData.main.packet_relay){

                    componentObj.submac.setValue(deviceData.main.packet_relay.mac);

        // 출발지 패킷 초기화 ============================================================================================================================================================

                    if(deviceData.main.packet_relay.source_network){

                        Ext.each(deviceData.main.packet_relay.source_network, function(sourceNetData){

                            sourcePacket.add(sourceNetData);

                        });

                    }

        // 목적지 패킷 초기화 ============================================================================================================================================================

                    if(deviceData.main.packet_relay.dest_network){

                        Ext.each(deviceData.main.packet_relay.dest_network, function(destNetData){

                            destPacket.add(destNetData);

                        });

                    }

                }

            }
            catch(err){

                component.setLoading(false);

                console.log('패킷 릴레이 초기화 중 예외 발생 : ', err);

            }

        // Sub 초기화 ==================================================================================================================================================================

            try{

                if(deviceData.sub){

                    if(deviceData.sub.checker_main){

                        subMain.add(deviceData.sub.checker_main);

                    }

                    if(deviceData.sub.checker_external){

                        Ext.each(deviceData.sub.checker_external, function(subCheckerData){

                            subExtChecker.add(subCheckerData);

                        });

                    }

                }

            }
            catch(err){

                component.setLoading(false);

                console.log('HA SUB 데이터 초기화 중 예외 발생 : ', err);

            }

        }

        component.setLoading(false);
    },

    onPnl_xtm_ha_branch_officeBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var modeselect  = this.down('[itemId=ctn_ha_mode]').down('[itemId=rdg_mode]');

        var submac      = this.down('[itemId=txf_mac]');

        var tabmain     = this.down('[itemId=tpn_ha_main]');
        var tabsub      = this.down('[itemId=tpn_ha_sub]');

        // checker comp

        var subchecker  = tabmain.down('[itemId=pnl_ha_sub]').down('[itemId=ctn_ha_sub]');
        var extchecker  = tabmain.down('[itemId=pnl_ha_external]').down('[itemId=ctn_ha_external]');
        var souchecker  = tabmain.down('[itemId=pnl_ha_source]').down('[itemId=ctn_ha_source]');
        var destination = tabmain.down('[itemId=pnl_ha_destination]').down('[itemId=ctn_ha_destination]');

        var mainchecker   = tabsub.down('[itemId=pnl_ha_main]').down('[itemId=ctn_ha_main]');
        var extsubchecker = tabsub.down('[itemId=pnl_ha_ext]').down('[itemId=ctn_ha_ext]');

        // sub checker

        var sub_eth     = subchecker.down('[itemId=cmb_interface]');
        var sub_name    = subchecker.down('[itemId=txf_name]');
        var sub_terget  = subchecker.down('[itemId=txf_targetip]');
        var sub_timeout = subchecker.down('[itemId=nfd_timeout]');
        var sub_grid    = subchecker.down('[itemId=gpn_ha_subchecker]');

        // external checker

        var ext_eth     = extchecker.down('[itemId=cmb_interface]');
        var ext_name    = extchecker.down('[itemId=txf_name]');
        var ext_target  = extchecker.down('[itemId=txf_target]');
        var ext_mode    = extchecker.down('[itemId=cmb_mode]');
        var ext_period  = extchecker.down('[itemId=cmb_period]');
        var ext_timeout = extchecker.down('[itemId=nfd_timeout]');
        var ext_grid    = extchecker.down('[itemId=gpn_ha_bridge_set]');

        // source checker

        var sou_act     = souchecker.down('[itemId=cmb_act]');
        var sou_iptype  = souchecker.down('[itemId=cmb_iptype]');
        var sou_ipaddr  = souchecker.down('[itemId=txf_ipaddress]');
        var sou_label   = souchecker.down('[itemId=lab_midlabel]');
        var sou_ipaddr2 = souchecker.down('[itemId=txf_ipaddress2]');
        var sou_grid    = souchecker.down('[itemId=gpn_ha_source_set]');

        // destination checker

        var des_act     = destination.down('[itemId=cmb_act]');
        var des_iptype  = destination.down('[itemId=cmb_iptype]');
        var des_ipaddr  = destination.down('[itemId=txf_ipaddress]');
        var des_label   = destination.down('[itemId=lab_midlabel]');
        var des_ipaddr2 = destination.down('[itemId=txf_ipaddress2]');
        var des_grid    = destination.down('[itemId=gpn_ha_destination_set]');

        // main checker

        var main_eth     = mainchecker.down('[itemId=cmb_interface]');
        var main_name    = mainchecker.down('[itemId=txf_name]');
        var main_target  = mainchecker.down('[itemId=txf_target]');
        var main_timeout = mainchecker.down('[itemId=nfd_timeout]');
        var main_grid    = mainchecker.down('[itemId=gpn_ha_main]');

        // ext checker

        var subext_eth     = extsubchecker.down('[itemId=cmb_interface]');
        var subext_name    = extsubchecker.down('[itemId=txf_name]');
        var subext_target  = extsubchecker.down('[itemId=txf_target]');
        var subext_mode    = extsubchecker.down('[itemId=cmb_mode]');
        var subext_period  = extsubchecker.down('[itemId=cmb_period]');
        var subext_timeout = extsubchecker.down('[itemId=nfd_timeout]');
        var subext_grid    = extsubchecker.down('[itemId=gpn_ha_ext]');

        return function(){

            obj.modeselect  = modeselect;

            obj.tabmain     = tabmain;
            obj.tabsub      = tabsub;

            obj.submac      = submac;

            obj.sub_eth     = sub_eth;
            obj.sub_name    = sub_name;
            obj.sub_terget  = sub_terget;
            obj.sub_timeout = sub_timeout;
            obj.sub_grid    = sub_grid;

            obj.ext_eth     = ext_eth;
            obj.ext_name    = ext_name;
            obj.ext_target  = ext_target;
            obj.ext_mode    = ext_mode;
            obj.ext_period  = ext_period;
            obj.ext_timeout = ext_timeout;
            obj.ext_grid    = ext_grid;

            obj.sou_act     = sou_act;
            obj.sou_iptype  = sou_iptype;
            obj.sou_ipaddr  = sou_ipaddr;
            obj.sou_label   = sou_label;
            obj.sou_ipaddr2 = sou_ipaddr2;
            obj.sou_grid    = sou_grid;

            obj.des_act     = des_act;
            obj.des_iptype  = des_iptype;
            obj.des_label   = des_label;
            obj.des_ipaddr  = des_ipaddr;
            obj.des_ipaddr2 = des_ipaddr2;
            obj.des_grid    = des_grid;

            obj.main_eth    = main_eth;
            obj.main_name   = main_name;
            obj.main_target = main_target;
            obj.main_timeout= main_timeout;
            obj.main_grid   = main_grid;

            obj.subext_eth  = subext_eth;
            obj.subext_name = subext_name;
            obj.subext_target = subext_target ;
            obj.subext_mode = subext_mode;
            obj.subext_period = subext_period;
            obj.subext_timeout = subext_timeout;
            obj.subext_grid = subext_grid;

            return obj;

        }();
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.06.16
        //
        // 설명 : HA 지점 설정을 저장합니다.
        //
        // =============================================================================================================================================================================

        var subCheckerStore = Ext.getStore('st_ha_branchmain_subgrid');
        var externalStore   = Ext.getStore('st_ha_branchmain_extgrid');
        var sourcePacket    = Ext.getStore('st_ha_branchmain_sourgrid');
        var destPacket      = Ext.getStore('st_ha_branchmain_destgrid');

        var subMainStore    = Ext.getStore('st_ha_branchsub_maingrid');
        var subExStore      = Ext.getStore('st_ha_branchsub_extgrid');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component     = this.componentStorage();

        // 메인 저장 ====================================================================================================================================================================
        //
        // 설명 : 저장된 데이터가 main, sub 둘다 없을 경우 HA 지점의 데이터는 null 로 표시됩니다.
        //
        // =============================================================================================================================================================================

        // 메인 - 서브 체커 저장 ==========================================================================================================================================================

        var subChecker = subCheckerStore.count();

        if(subChecker){

            if(!deviceAllData.ha_branch_script){

                deviceAllData.ha_branch_script = {};

            }

            if(!deviceAllData.ha_branch_script.main){

                deviceAllData.ha_branch_script.main                  = {};
                deviceAllData.ha_branch_script.main.packet_relay     = {};
                deviceAllData.ha_branch_script.main.packet_relay.mac = null;
                deviceAllData.ha_branch_script.sub                   = null;

            }

            if(!deviceAllData.ha_branch_script.main.checker_sub){

                deviceAllData.ha_branch_script.main.checker_sub = {};

            }

            deviceAllData.ha_branch_script.main.checker_sub = subCheckerStore.getAt(0).data;

        }
        else{

            if(deviceAllData.ha_branch_script){

                if(deviceAllData.ha_branch_script.main.checker_sub){

                    delete deviceAllData.ha_branch_script.main.checker_sub;

                }
            }

        }

        // 외부망 Checker ===============================================================================================================================================================

        var externalChecker = externalStore.count();

        if(externalChecker){

            if(!deviceAllData.ha_branch_script){

                deviceAllData.ha_branch_script = {};

            }

            if(!deviceAllData.ha_branch_script.main){

                deviceAllData.ha_branch_script.main                  = {};
                deviceAllData.ha_branch_script.main.packet_relay     = {};
                deviceAllData.ha_branch_script.main.packet_relay.mac = null;
                deviceAllData.ha_branch_script.sub                   = null;

            }

            if(externalChecker === 1){

                deviceAllData.ha_branch_script.main.checker_external = {};

                deviceAllData.ha_branch_script.main.checker_external = externalStore.getAt(0).data;

            }
            else{

                var exCheckerArray = [];

                for(var i = 0; i < externalStore.count(); i++){

                    exCheckerArray.push(externalStore.getAt(i).data);

                }

                deviceAllData.ha_branch_script.main.checker_external = exCheckerArray;

            }

        }
        else{

            if(deviceAllData.ha_branch_script !== null){

                if(deviceAllData.ha_branch_script.main.checker_external){

                    delete deviceAllData.ha_branch_script.main.checker_external;

                }

            }

        }

        // 패킷 릴레이 설정 ==============================================================================================================================================================

        if(deviceAllData.ha_branch_script){

            deviceAllData.ha_branch_script.main.packet_relay.mac = (component.submac.getValue() === '') ? null : component.submac.getValue();

        }

        // 출발지 기반 패킷 릴레이 설정 ====================================================================================================================================================

        var sourceCount = sourcePacket.count();

        if(sourceCount){

            if(!deviceAllData.ha_branch_script){

                deviceAllData.ha_branch_script = {};

            }

            if(!deviceAllData.ha_branch_script.main){

                deviceAllData.ha_branch_script.main                  = {};
                deviceAllData.ha_branch_script.main.packet_relay     = {};
                deviceAllData.ha_branch_script.main.packet_relay.mac = null;
                deviceAllData.ha_branch_script.sub                   = null;

            }

            if(sourceCount === 1){

                deviceAllData.ha_branch_script.main.packet_relay.source_network = {};

                deviceAllData.ha_branch_script.main.packet_relay.source_network = sourcePacket.getAt(0).data;

            }
            else{

                var sourceArray = [];

                for(var i = 0; i < sourceCount; i++){

                    sourceArray.push(sourcePacket.getAt(i).data);

                }

                deviceAllData.ha_branch_script.main.packet_relay.source_network = sourceArray;

            }

        }
        else{

            if(deviceAllData.ha_branch_script !== null){

                if(deviceAllData.ha_branch_script.main.packet_relay.source_network){

                    delete deviceAllData.ha_branch_script.main.packet_relay.source_network;

                }

            }

        }

        // 목적지 기반 패킷 릴레이 설정 ====================================================================================================================================================

        var destCount = destPacket.count();

        if(destCount){

            if(!deviceAllData.ha_branch_script){

                deviceAllData.ha_branch_script = {};

            }

            if(!deviceAllData.ha_branch_script.main){

                deviceAllData.ha_branch_script.main                  = {};
                deviceAllData.ha_branch_script.main.packet_relay     = {};
                deviceAllData.ha_branch_script.main.packet_relay.mac = null;
                deviceAllData.ha_branch_script.sub                   = null;

            }

            if(destCount === 1){

                deviceAllData.ha_branch_script.main.packet_relay.dest_network = {};

                deviceAllData.ha_branch_script.main.packet_relay.dest_network = destPacket.getAt(0).data;

            }
            else{

                var destArray = [];

                for(var i = 0; i < destCount; i++){

                    destArray.push(destPacket.getAt(i).data);

                }

                deviceAllData.ha_branch_script.main.packet_relay.dest_network = destArray;

            }

        }
        else{

            if(deviceAllData.ha_branch_script !== null){

                if(deviceAllData.ha_branch_script.main.packet_relay.dest_network){

                    delete deviceAllData.ha_branch_script.main.packet_relay.dest_network;

                }

            }

        }

        // 서브 저장 ====================================================================================================================================================================

        // 서브 메인 저장 ================================================================================================================================================================

        var subMainCount = subMainStore.count();

        if(subMainCount){

            if(!deviceAllData.ha_branch_script){

                deviceAllData.ha_branch_script = {};

            }

            if(!deviceAllData.ha_branch_script.main){

                deviceAllData.ha_branch_script.main                  = {};
                deviceAllData.ha_branch_script.main.packet_relay     = {};
                deviceAllData.ha_branch_script.main.packet_relay.mac = null;
                deviceAllData.ha_branch_script.sub                   = null;

            }

            if(!deviceAllData.ha_branch_script.sub){

                deviceAllData.ha_branch_script.sub = {};

            }

            if(!deviceAllData.ha_branch_script.sub.checker_main){

                deviceAllData.ha_branch_script.sub.checker_main = {};

            }

            deviceAllData.ha_branch_script.sub.checker_main = subMainStore.getAt(0).data;

        }
        else{

            if(deviceAllData.ha_branch_script !== null){

                if(deviceAllData.ha_branch_script.sub !== null){

                    if(deviceAllData.ha_branch_script.sub.checker_main){

                        delete deviceAllData.ha_branch_script.sub.checker_main;

                    }

                }
            }

        }

        // 서브 외부 저장 ================================================================================================================================================================

        var subExCount = subExStore.count();

        if(subExCount){

            if(!deviceAllData.ha_branch_script){

                deviceAllData.ha_branch_script = {};

            }

            if(!deviceAllData.ha_branch_script.main){

                deviceAllData.ha_branch_script.main                  = {};
                deviceAllData.ha_branch_script.main.packet_relay     = {};
                deviceAllData.ha_branch_script.main.packet_relay.mac = null;
                deviceAllData.ha_branch_script.sub                   = null;

            }

            if(!deviceAllData.ha_branch_script.sub){

                deviceAllData.ha_branch_script.sub = {};

            }

            if(subExCount === 1){

                deviceAllData.ha_branch_script.sub.checker_external = {};

                deviceAllData.ha_branch_script.sub.checker_external = subExStore.getAt(0).data;

            }
            else{

                var subExtArray = [];

                for(var i = 0; i < subExCount; i++){

                    subExtArray.push(subExStore.getAt(i).data);

                }

                deviceAllData.ha_branch_script.sub.checker_external = subExtArray;

            }

        }
        else{

            if(deviceAllData.ha_branch_script !== null){

                if(deviceAllData.ha_branch_script.sub !== null){

                    if(deviceAllData.ha_branch_script.sub.checker_external){

                        delete  deviceAllData.ha_branch_script.sub.checker_external;

                    }

                }

            }

        }

        // SUB 데이터가 존재하고 checker_external, checker_main 데이터가 없는 경우 sub 데이터를 null로 변경 =====================================================================================

        if(deviceAllData.ha_branch_script !== null){

            if(deviceAllData.ha_branch_script.sub){

                if(deviceAllData.ha_branch_script.sub.checker_external === undefined && deviceAllData.ha_branch_script.sub.checker_main === undefined){

                    deviceAllData.ha_branch_script.sub = null;

                }

            }

        }

        // SUB 데이터가 없고 main의 packet_relay 의 mac 을 제외한 모든 값이 존재하지 않고, mac 값이 null 인 경우 =================================================================================

        if(deviceAllData.ha_branch_script){

            if(deviceAllData.ha_branch_script.sub                   === null         &&
               deviceAllData.ha_branch_script.main.checker_sub      === undefined    &&
               deviceAllData.ha_branch_script.main.packet_relay.dest_network === undefined &&
               deviceAllData.ha_branch_script.main.packet_relay.source_network === undefined &&
               deviceAllData.ha_branch_script.main.packet_relay.mac === null   &&
               deviceAllData.ha_branch_script.main.checker_external === undefined){

               Ext.getCmp('win_smc_device_set').deviceParams.ha_branch_script = null;

               return true;

            }

        }

        if(deviceAllData.ha_branch_script){

            if(!deviceAllData.ha_branch_script.branch_mode){

                deviceAllData.ha_branch_script.branch_mode = {};

            }

            deviceAllData.ha_branch_script.branch_mode['@mode'] = component.modeselect.getValue().ha_mode;

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();

        var subChecker = Ext.getStore('st_ha_branchmain_subgrid');
        var extChecker = Ext.getStore('st_ha_branchmain_extgrid');
        var sourcePacket = Ext.getStore('st_ha_branchmain_sourgrid');
        var destPacket = Ext.getStore('st_ha_branchmain_destgrid');

        var subMain= Ext.getStore('st_ha_branchsub_maingrid');
        var subExtChecker = Ext.getStore('st_ha_branchsub_extgrid');

        subChecker.removeAll();
        extChecker.removeAll();
        sourcePacket.removeAll();
        destPacket.removeAll();

        subMain.removeAll();
        subExtChecker.removeAll();

        // 그리드와 스토어 바인딩

        component.sub_grid.bindStore(subChecker);
        component.ext_grid.bindStore(extChecker);
        component.sou_grid.bindStore(sourcePacket);
        component.des_grid.bindStore(destPacket);
        component.main_grid.bindStore(subMain);
        component.subext_grid.bindStore(subExtChecker);
    }

});