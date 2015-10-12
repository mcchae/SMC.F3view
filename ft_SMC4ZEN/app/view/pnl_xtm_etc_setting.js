
Ext.define('SMC4ZEN.view.pnl_xtm_etc_setting', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_etc_settingViewModel',
        'SMC4ZEN.view.ctn_etc_control',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox'
    ],

    viewModel: {
        type: 'xtm_etc_setting'
    },
    height: 680,
    id: 'pnl_xtm_etc_setting',
    overflowY: 'auto',
    width: 900,
    bodyPadding: 10,
    title: '기타 설정',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        beforerender: 'onPnl_xtm_etc_settingBeforeRender',
        afterrender: 'onPnl_xtm_etc_settingAfterRender',
        beforeclose: 'onPnl_xtm_etc_settingBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'fieldset',
                        itemId: 'fds_etc_multipath',
                        margin: '0, 0, 10, 0',
                        title: 'Multipath Routing',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                itemId: 'cmb_line',
                                margin: '10, 0, 10, 0',
                                maxWidth: 320,
                                fieldLabel: '라인 선택 방법',
                                editable: false,
                                displayField: 'name',
                                queryMode: 'local',
                                valueField: 'value',
                                listeners: {
                                    change: 'onCmb_lineChange',
                                    afterrender: 'onCmb_lineAfterRender'
                                }
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                margins: '0, 0, 10, 0',
                                itemId: 'ctn_etc_explicit',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        itemId: 'ctn_etc_expliciteth',
                                        margin: '0, 0, 10, 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                itemId: 'cmb_interface',
                                                maxWidth: 250,
                                                fieldLabel: '인터페이스',
                                                editable: false,
                                                emptyText: 'Select Interface ...',
                                                displayField: 'eth',
                                                queryMode: 'local',
                                                valueField: 'eth',
                                                listeners: {
                                                    afterrender: 'onCmb_interfaceAfterRender1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        itemId: 'ctn_etc_explicitinfo',
                                        margin: '0, 0, 20, 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                itemId: 'ctn_explicit_source',
                                                margin: '0, 10, 0, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_source',
                                                        margin: '0, 10, 0, 0',
                                                        maxWidth: 130,
                                                        fieldLabel: '출발지',
                                                        labelWidth: 45,
                                                        value: 'single',
                                                        editable: false,
                                                        queryMode: 'local',
                                                        store: [
                                                            'single',
                                                            'range',
                                                            'netmask',
                                                            'any'
                                                        ],
                                                        listeners: {
                                                            change: 'onCmb_sourceChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            var retValue = validIPForm(value, 'v4');

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_ip',
                                                        margin: '0, 10, 0, 0',
                                                        maxWidth: 110,
                                                        fieldLabel: 'IP',
                                                        labelWidth: 20
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        hidden: true,
                                                        itemId: 'lab_mid',
                                                        margin: '0, 10, 0, 0',
                                                        text: '-'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            var retValue = validIPForm(value, 'v4');

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        hidden: true,
                                                        itemId: 'txf_after',
                                                        margin: '0, 10, 0, 0',
                                                        width: 90,
                                                        fieldLabel: '',
                                                        labelWidth: 20
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                itemId: 'ctn_explicit_dest',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle'
                                                },
                                                items: [
                                                    {
                                                        xtype: 'combobox',
                                                        itemId: 'cmb_dest',
                                                        margin: '0, 10, 0, 0',
                                                        maxWidth: 130,
                                                        fieldLabel: '목적지',
                                                        labelWidth: 45,
                                                        value: 'single',
                                                        editable: false,
                                                        queryMode: 'local',
                                                        store: [
                                                            'single',
                                                            'range',
                                                            'netmask',
                                                            'any'
                                                        ],
                                                        listeners: {
                                                            change: 'onCmb_destChange'
                                                        }
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            var retValue = validIPForm(value, 'v4');

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        itemId: 'txf_ip',
                                                        margin: '0, 10, 0, 0',
                                                        maxWidth: 110,
                                                        fieldLabel: 'IP',
                                                        labelWidth: 20
                                                    },
                                                    {
                                                        xtype: 'label',
                                                        hidden: true,
                                                        itemId: 'lab_mid',
                                                        margin: '0, 10, 0, 0',
                                                        text: '-'
                                                    },
                                                    {
                                                        xtype: 'textfield',
                                                        validator: function(value) {
                                                            var retValue = validIPForm(value, 'v4');

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                            return true;
                                                        },
                                                        hidden: true,
                                                        itemId: 'txf_after',
                                                        margin: '0, 10, 0, 0',
                                                        width: 90,
                                                        fieldLabel: '',
                                                        labelWidth: 20
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'ctn_etc_control',
                                        itemId: 'ctn_etc_explicitcontrol',
                                        margin: '0, 0, 10, 0',
                                        flex: 1,
                                        listeners: {
                                            afterrender: 'onCtn_explicit_controlAfterRender'
                                        }
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        height: 150,
                                        itemId: 'gpn_etc_explicit',
                                        margin: '0, 0, 10, 0',
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
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value['@type'];
                                                },
                                                dataIndex: 'src',
                                                text: '출발지 타입',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value['#text'];
                                                },
                                                dataIndex: 'src',
                                                text: '출발지 IP 주소',
                                                flex: 2
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value['@type'];
                                                },
                                                dataIndex: 'dst',
                                                text: '목적지 타입',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return value['#text'];
                                                },
                                                dataIndex: 'dst',
                                                text: '목적지 IP 주소',
                                                flex: 2
                                            }
                                        ],
                                        listeners: {
                                            render: 'onGpn_etc_explicitRender',
                                            itemclick: 'onGpn_etc_explicitItemClick'
                                        },
                                        selModel: Ext.create('Ext.selection.RowModel', {
                                            selType: 'rowmodel',
                                            mode: 'MULTI'
                                        })
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                itemId: 'ctn_etc_basicrouting',
                                margin: '0, 0, 10, 0',
                                layout: 'vbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        itemId: 'ctn_etc_timeout',
                                        margin: '0, 0, 5, 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle',
                                            pack: 'center'
                                        },
                                        items: [
                                            {
                                                xtype: 'numberfield',
                                                validator: function(value) {
                                                    if(!LengthCheck(value, 1, 255)){

                                                        return false;

                                                    }

                                                    return true;

                                                },
                                                itemId: 'nfd_timeout',
                                                margin: '0, 10, 0, 0',
                                                maxWidth: 320,
                                                fieldLabel: '라인 Timeout 결정 시간',
                                                labelWidth: 170,
                                                value: 9
                                            },
                                            {
                                                xtype: 'label',
                                                flex: 1,
                                                text: ' 초 ( Default : 9초 )'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        flex: 1,
                                        itemId: 'ctn_etc_dropaddr',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    var retValue = validIPForm(value, 'v4');

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    return true;
                                                },
                                                itemId: 'txf_addr',
                                                margin: '0, 10, 0, 0',
                                                maxWidth: 320,
                                                fieldLabel: 'Drop 해야 할 출발지 주소',
                                                labelWidth: 170
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '0, 0, 10, 0',
                                                text: '(외부 인터페이스 down 시 특정 출발지의 ICMP 패킷 drop 기능)'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        itemId: 'fds_etc_quality',
                        margin: '0, 0, 10, 0',
                        title: '라인 품질 관리',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'label',
                                flex: 1,
                                margin: '10, 0, 20, 0',
                                text: '※ 라인체커 범위 (60-3600) / (2-20) / (10-3600)'
                            },
                            {
                                xtype: 'container',
                                itemId: 'ctn_etc_linechecker',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_usechecker',
                                        margin: '0, 10, 0, 0',
                                        fieldLabel: '',
                                        boxLabel: '라인 체커가',
                                        listeners: {
                                            change: 'onCk_usecheckerChange'
                                        }
                                    },
                                    {
                                        xtype: 'numberfield',
                                        validator: function(value) {
                                            if(!LengthCheck(value, 60, 3600)){

                                                return false;

                                            }

                                            return true;

                                        },
                                        disabled: true,
                                        itemId: 'nfd_sec',
                                        margin: '0, 10, 0, 0',
                                        width: 70
                                    },
                                    {
                                        xtype: 'numberfield',
                                        validator: function(value) {
                                            if(!LengthCheck(value, 2, 20)){

                                                return false;

                                            }

                                            return true;

                                        },
                                        disabled: true,
                                        itemId: 'nfd_down',
                                        margin: '0, 10, 0, 0',
                                        width: 130,
                                        fieldLabel: '초 동안에',
                                        labelWidth: 60
                                    },
                                    {
                                        xtype: 'numberfield',
                                        validator: function(value) {
                                            if(!LengthCheck(value, 10, 3600)){

                                                return false;

                                            }

                                            return true;

                                        },
                                        disabled: true,
                                        itemId: 'nfd_ethdown',
                                        margin: '0, 10, 0, 0',
                                        width: 170,
                                        fieldLabel: '회 다운될 경우'
                                    },
                                    {
                                        xtype: 'label',
                                        flex: 1,
                                        text: '초 동안 해당 인터페이스를 다운'
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                flex: 1,
                                itemId: 'fds_etc_bandwidthlimit',
                                checkboxToggle: true,
                                title: '라인 대역폭 제한 기능 사용 (※ 주의 - 인터페이스 설정의 Multipath 라우팅 허용이 체크되어 있어야만 추가 가능)',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_etc_inputctn',
                                        margin: '10, 0, 20, 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                flex: 1,
                                                itemId: 'cmb_interface',
                                                margin: '0, 10, 0, 0',
                                                maxWidth: 230,
                                                fieldLabel: '인터페이스',
                                                labelWidth: 80,
                                                editable: false,
                                                emptyText: 'Select Interface ...',
                                                displayField: 'eth',
                                                queryMode: 'local',
                                                valueField: 'eth',
                                                listeners: {
                                                    afterrender: 'onCmb_interfaceAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'numberfield',
                                                validator: function(value) {
                                                    if(!LengthCheck(value, 100, 1000000)){

                                                        return false;

                                                    }

                                                    return true;

                                                },
                                                flex: 1,
                                                itemId: 'nfd_bandwidth',
                                                margin: '0, 10, 0, 0',
                                                maxWidth: 230,
                                                fieldLabel: '제한 대역폭',
                                                labelWidth: 80
                                            },
                                            {
                                                xtype: 'combobox',
                                                flex: 1,
                                                itemId: 'cmb_selectfunc',
                                                margin: '0, 10, 0, 0',
                                                maxWidth: 230,
                                                fieldLabel: '기능 선택',
                                                labelWidth: 80,
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCmb_selectfuncChange',
                                                    afterrender: 'onCmb_selectfuncAfterRender'
                                                }
                                            },
                                            {
                                                xtype: 'numberfield',
                                                validator: function(value) {
                                                    if(!LengthCheck(value, 1, 1440)){

                                                        return false;

                                                    }

                                                    return true;

                                                },
                                                flex: 1,
                                                hidden: true,
                                                itemId: 'nfd_keep',
                                                fieldLabel: '유지시간 (분)'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'ctn_etc_control',
                                        itemId: 'ctn_etc_bandwidthcontrol',
                                        margin: '0, 0, 10, 0',
                                        listeners: {
                                            afterrender: 'onCtn_bandwidth_controlAfterRender'
                                        }
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        flex: 1,
                                        itemId: 'gpn_etc_bandwidthlist',
                                        margin: '0, 0, 10, 0',
                                        title: '',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                text: 'N'
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: '@name',
                                                text: '인터페이스',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: '@limit',
                                                text: '제한 대역폭 (Kbps)',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    return (value === 1) ? 'Alram' : 'Alram / Down';
                                                },
                                                dataIndex: '@type',
                                                text: '선택 기능',
                                                flex: 1
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                dataIndex: '@time',
                                                text: '유지시간 (분)',
                                                flex: 1
                                            }
                                        ],
                                        listeners: {
                                            render: 'onGpn_etc_bandwidthlistRender',
                                            itemclick: 'onGpn_etc_bandwidthlistItemClick'
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
                        xtype: 'fieldset',
                        itemId: 'fds_etc_fw',
                        margin: '0, 0, 10, 0',
                        title: 'F / W',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'checkboxfield',
                                flex: 1,
                                itemId: 'ck_multicast',
                                margin: '10, 0, 10, 0',
                                fieldLabel: '',
                                boxLabel: 'L3 모드에서 multicast 패킷을 routing에 의해 처리되도록 하는 기능'
                            },
                            {
                                xtype: 'container',
                                flex: 1,
                                itemId: 'ctn_etc_ids',
                                margin: '0, 0, 10, 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'middle'
                                },
                                items: [
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_ids',
                                        margin: '0, 10, 0, 0',
                                        fieldLabel: '',
                                        boxLabel: 'IDS 연동',
                                        listeners: {
                                            change: 'onCk_idsChange'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        disabled: true,
                                        itemId: 'cmb_actmode',
                                        margin: '0, 10, 0, 0',
                                        maxWidth: 180,
                                        fieldLabel: '동작모드',
                                        labelWidth: 70,
                                        value: 0,
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        valueField: 'value',
                                        listeners: {
                                            afterrender: 'onCmb_actmodeAfterRender'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        disabled: true,
                                        itemId: 'cmb_port',
                                        margin: '0, 10, 0, 0',
                                        width: 170,
                                        fieldLabel: 'Port',
                                        labelWidth: 70,
                                        value: 'eth0',
                                        editable: false,
                                        displayField: 'eth',
                                        queryMode: 'local',
                                        store: 'st_common_deveth',
                                        valueField: 'eth'
                                    },
                                    {
                                        xtype: 'label',
                                        disabled: true,
                                        text: '(특정포트로 모든 패킷을 미러)'
                                    }
                                ]
                            },
                            {
                                xtype: 'checkboxfield',
                                flex: 1,
                                itemId: 'ck_voip',
                                margin: '0, 0, 10, 0',
                                fieldLabel: '',
                                boxLabel: 'VoIP 사용시 동적포트 할당 지원'
                            },
                            {
                                xtype: 'checkboxfield',
                                flex: 1,
                                itemId: 'ck_sysdebug',
                                margin: '0, 0, 10, 0',
                                fieldLabel: '',
                                boxLabel: 'Sysdebug 기능 사용'
                            },
                            {
                                xtype: 'checkboxfield',
                                flex: 1,
                                itemId: 'ck_steal',
                                margin: '0, 0, 10, 0',
                                fieldLabel: '',
                                boxLabel: '장비도난 방지기능 사용'
                            },
                            {
                                xtype: 'checkboxfield',
                                flex: 1,
                                itemId: 'ck_bandwidth',
                                margin: '0, 0, 10, 0',
                                fieldLabel: '',
                                boxLabel: '회선대역폭 측정 기능 사용 (TCP 5001번 포트에 대한 Accept 룰 필요)'
                            },
                            {
                                xtype: 'checkboxfield',
                                flex: 1,
                                itemId: 'ck_snat',
                                margin: '0, 0, 10, 0',
                                fieldLabel: '',
                                boxLabel: 'SNAT 사용 시 출발지 포트를 10000 ~ 65535 값으로 순차적으로 변경하는 기능'
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

    onCmb_lineChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_lineChange ==============================================================================================================================================================
        //
        // 일시 : 2014.10.07
        //
        // 설명 : 라인 선택 방법 중 Explicit Routing을 선택하면 Explicit 그리드를 화면에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var ctn_explicit = field.up().down('[itemId=ctn_etc_explicit]');

        if(newValue === 5){

            ctn_explicit.setVisible(true);

        }
        else{

            ctn_explicit.setVisible(false);

        }
    },

    onCmb_lineAfterRender: function(component, eOpts) {
        // onCmb_lineRender ==============================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 콤보박스의 스토어를 바인딩합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId': 'st_etc_linetype',
            'fields': [
                {	'name': 'name'	},
                {	'name': 'value' }
            ],
            'data': [
                {
                    name: 'Dest routing base',
                    value: 0
                },
                {
                    name: 'Source IP base',
                    value: 1
                },
                {
                    name: 'Dest IP base',
                    value: 2
                },
                {
                    name: 'Source IP + Dest IP base',
                    value: 3
                },
                {
                    name: 'Per Packet base (VPN Only)',
                    value: 4
                },
                {
                    name: 'Explicit routing',
                    value: 5
                }
            ]
        }));

        component.setValue(0);
    },

    onCmb_interfaceAfterRender1: function(component, eOpts) {
        component.bindStore(Ext.getStore('st_etc_eth'));
    },

    onCmb_sourceChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_sourceChange ============================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 출발지 주소의 입력 타입을 선택합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        if(newValue === 'single'){

            component.explicit_front_ip.setVisible(true);
            component.explicit_front_mid.setVisible(false);
            component.explicit_front_after.setVisible(false);

        }
        else if(newValue === 'range'){

            component.explicit_front_ip.setVisible(true);
            component.explicit_front_mid.setVisible(true);
            component.explicit_front_mid.setText(' - ');
            component.explicit_front_after.setVisible(true);

        }
        else if(newValue === 'netmask'){

            component.explicit_front_ip.setVisible(true);
            component.explicit_front_mid.setVisible(true);
            component.explicit_front_mid.setText(' / ');
            component.explicit_front_after.setVisible(true);

        }
        else{

            component.explicit_front_ip.setVisible(false);
            component.explicit_front_mid.setVisible(false);
            component.explicit_front_after.setVisible(false);

        }
    },

    onCmb_destChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_destChange ==============================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 출발지 주소의 입력 타입을 선택합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        if(newValue === 'single'){

            component.explicit_rear_ip.setVisible(true);
            component.explicit_rear_mid.setVisible(false);
            component.explicit_rear_after.setVisible(false);

        }
        else if(newValue === 'range'){

            component.explicit_rear_ip.setVisible(true);
            component.explicit_rear_mid.setVisible(true);
            component.explicit_rear_mid.setText(' - ');
            component.explicit_rear_after.setVisible(true);

        }
        else if(newValue === 'netmask'){

            component.explicit_rear_ip.setVisible(true);
            component.explicit_rear_mid.setVisible(true);
            component.explicit_rear_mid.setText(' / ');
            component.explicit_rear_after.setVisible(true);

        }
        else{

            component.explicit_rear_ip.setVisible(false);
            component.explicit_rear_mid.setVisible(false);
            component.explicit_rear_after.setVisible(false);

        }
    },

    onCtn_explicit_controlAfterRender: function(component, eOpts) {
        // onCtn_explicit_controlAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.10.15
        //
        // 설명 : explicit routing 설정의 추가, 수정, 삭제 기능을 정의합니다.
        //
        // =============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        // bt_add ======================================================================================================================================================================

        bt_add.on('click', function(){

            var obj = {};

            if(!me.validityCheck().blankCheck(componentObj.explicit_eth)){

                return false;

            }

            obj['interface'] = componentObj.explicit_eth.getValue();

            var source_obj = {};

        // 출발지 데이터 저장 =============================================================================================================================================================

            var sourceType = componentObj.explicit_front_source.getValue();

            if(sourceType === 'single'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_front_ip) || !me.validityCheck().ipValidate(componentObj.explicit_front_ip)){

                    return false;

                }

                source_obj['#text'] = componentObj.explicit_front_ip.getValue();

            }
            else if(sourceType === 'range'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_front_ip) || !me.validityCheck().ipValidate(componentObj.explicit_front_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_front_after)){

                    return false;

                }

                source_obj['#text'] = componentObj.explicit_front_ip.getValue() + '-' + componentObj.explicit_front_after.getValue();

            }
            else if(sourceType === 'netmask'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_front_ip) || !me.validityCheck().ipValidate(componentObj.explicit_front_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_front_after)){

                    return false;

                }

                source_obj['#text'] = componentObj.explicit_front_ip.getValue() + '/' + componentObj.explicit_front_after.getValue();

            }

            source_obj['@type'] = sourceType;
            source_obj['@version'] = 'v4';

            obj.src = source_obj;

            var dest_obj = {};

        // 목적지 데이터 저장 =============================================================================================================================================================

            var destType = componentObj.explicit_rear_dest.getValue();

            if(destType === 'single'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_rear_ip) || !me.validityCheck().ipValidate(componentObj.explicit_rear_ip)){

                    return false;

                }

                dest_obj['#text'] = componentObj.explicit_rear_ip.getValue();

            }
            else if(destType === 'range'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_rear_ip) || !me.validityCheck().ipValidate(componentObj.explicit_rear_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_rear_after)){

                    return false;

                }

                dest_obj['#text'] = componentObj.explicit_rear_ip.getValue() + '-' + componentObj.explicit_rear_after.getValue();

            }
            else if(destType === 'netmask'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_rear_ip) || !me.validityCheck().ipValidate(componentObj.explicit_rear_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_rear_after)){

                    return false;

                }

                dest_obj['#text'] = componentObj.explicit_rear_ip.getValue() + '/' + componentObj.explicit_rear_after.getValue();

            }

            dest_obj['@type'] = destType;
            dest_obj['@version'] = 'v4';

            obj.dst = dest_obj;

            gridData_Add(componentObj.gpn_explicit, obj);

        });

        // bt_mod ======================================================================================================================================================================

        bt_mod.on('click', function(){

            if(!componentObj.gpn_explicit.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            var obj = {};

            if(!me.validityCheck().blankCheck(componentObj.explicit_eth)){

                return false;

            }

            obj['interface'] = componentObj.explicit_eth.getValue();

        // 출발지 데이터 저장 =============================================================================================================================================================

            var source_obj = {};

            var sourceType = componentObj.explicit_front_source.getValue();

            if(sourceType === 'single'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_front_ip) || !me.validityCheck().ipValidate(componentObj.explicit_front_ip)){

                    return false;

                }

                source_obj['#text'] = componentObj.explicit_front_ip.getValue();

            }
            else if(sourceType === 'range'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_front_ip) || !me.validityCheck().ipValidate(componentObj.explicit_front_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_front_after)){

                    return false;

                }

                source_obj['#text'] = componentObj.explicit_front_ip.getValue() + '-' + componentObj.explicit_front_after.getValue();

            }
            else if(sourceType === 'netmask'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_front_ip) || !me.validityCheck().ipValidate(componentObj.explicit_front_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_front_after)){

                    return false;

                }

                source_obj['#text'] = componentObj.explicit_front_ip.getValue() + '/' + componentObj.explicit_front_after.getValue();

            }

            source_obj['@type'] = sourceType;
            source_obj['@version'] = 'v4';

            obj.src = source_obj;

        // 목적지 데이터 저장 =============================================================================================================================================================

            var dest_obj = {};

            var destType = componentObj.explicit_rear_dest.getValue();

            if(destType === 'single'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_rear_ip) || !me.validityCheck().ipValidate(componentObj.explicit_rear_ip)){

                    return false;

                }

                dest_obj['#text'] = componentObj.explicit_rear_ip.getValue();

            }
            else if(destType === 'range'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_rear_ip) || !me.validityCheck().ipValidate(componentObj.explicit_rear_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_rear_after)){

                    return false;

                }

                dest_obj['#text'] = componentObj.explicit_rear_ip.getValue() + '-' + componentObj.explicit_rear_after.getValue();

            }
            else if(destType === 'netmask'){

                if(!me.validityCheck().blankCheck(componentObj.explicit_rear_ip) || !me.validityCheck().ipValidate(componentObj.explicit_rear_ip) ||
                   !me.validityCheck().ipValidate(componentObj.explicit_rear_after)){

                    return false;

                }

                dest_obj['#text'] = componentObj.explicit_rear_ip.getValue() + '/' + componentObj.explicit_rear_after.getValue();

            }

            dest_obj['@type'] = destType;
            dest_obj['@version'] = 'v4';

            obj.dst = dest_obj;

            selectionGrid_Mod(componentObj.gpn_explicit, obj);

        });

        // bt_del ======================================================================================================================================================================

        bt_del.on('click', function(){

            if(!componentObj.gpn_explicit.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.gpn_explicit);

        });
    },

    onGpn_etc_explicitRender: function(component, eOpts) {
        // onGpn_etc_explicitRender ======================================================================================================================================================
        //
        // 일시 : 2014.10.15
        //
        // 설명 : explicit 그리드의 스토어를 동적으로 생성합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_etc_explicit',
            fields: [
                {
                    name: 'dst'
                },
                {
                    name: 'interface'
                },
                {
                    name: 'src'
                }
            ]

        }));
    },

    onGpn_etc_explicitItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_etc_explicitItemClick =================================================================================================================================================
        //
        // 일시 : 2014.10.20
        //
        // 설명 : explicit 그리드 Row를 클릭 시 입력 컴포넌트에 해당하는 값을 설정합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var sourceType = record.data.src['@type'];
        var destType   = record.data.dst['@type'];

        component.explicit_eth.setValue(record.data['interface']);
        component.explicit_front_source.setValue(sourceType);
        component.explicit_rear_dest.setValue(destType);

        if(sourceType === 'any'){

            component.explicit_front_ip.setValue(null);
            component.explicit_front_after.setValue(null);

        }
        else if(sourceType === 'single'){

            component.explicit_front_ip.setValue(record.data.src['#text']);
            component.explicit_front_after.setValue(null);

        }
        else if(sourceType === 'range'){

            var splitIp = record.data.src['#text'].split('-');

            component.explicit_front_ip.setValue(splitIp[0]);
            component.explicit_front_after.setValue(splitIp[1]);

        }
        else{

            var splitIp = record.data.src['#text'].split('/');

            component.explicit_front_ip.setValue(splitIp[0]);
            component.explicit_front_after.setValue(splitIp[1]);

        }

        // 목적지 데이터 설정 =============================================================================================================================================================

        if(destType === 'any'){

            component.explicit_rear_ip.setValue(null);
            component.explicit_rear_after.setValue(null);

        }
        else if(destType === 'single'){

            component.explicit_rear_ip.setValue(record.data.dst['#text']);
            component.explicit_rear_after.setValue(null);

        }
        else if(destType === 'range'){

            var splitIp = record.data.dst['#text'].split('-');

            component.explicit_rear_ip.setValue(splitIp[0]);
            component.explicit_rear_after.setValue(splitIp[1]);

        }
        else{

            var splitIp = record.data.dst['#text'].split('/');

            component.explicit_rear_ip.setValue(splitIp[0]);
            component.explicit_rear_after.setValue(splitIp[1]);

        }
    },

    onCk_usecheckerChange: function(field, newValue, oldValue, eOpts) {
        // onCk_usecheckerChange =========================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 라인 품질 관리의 컴포넌트를 활성화 / 비활성화 합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.linesec.setDisabled(!newValue);
        component.linedowncount.setDisabled(!newValue);
        component.ethdownsec.setDisabled(!newValue);
    },

    onCmb_interfaceAfterRender: function(component, eOpts) {
        component.bindStore(Ext.getStore('st_etc_eth'));
    },

    onCmb_selectfuncChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_selectfuncChange ========================================================================================================================================================
        //
        // 일시 : 2014.10.16
        //
        // 설명 : 기능 선택 콤보박스를 클릭하면 값에 따라 유지시간을 사용자가 설정할 수 있도록 UI에 유지시간 입력필드를 반영합니다.
        //
        // ===============================================================================================================================================================================

        var nfd_keep = field.up().down('[itemId=nfd_keep]');

        if(newValue === 2){

            nfd_keep.setVisible(true);

        }
        else{

            nfd_keep.setVisible(false);

        }
    },

    onCmb_selectfuncAfterRender: function(component, eOpts) {
        // onCmb_selectfuncRender ========================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 콤보박스의 스토어를 바인딩합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            'fields' : [

                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'storeId' : 'st_etc_func',
            'data' : [
                {	'name'  : 'Alram', 'value' : 1			},
                {	'name'  : 'Alram / Down', 'value' : 2	}
            ]

        }));

        component.setValue(1);
    },

    onCtn_bandwidth_controlAfterRender: function(component, eOpts) {
        // onCtn_bandwidth_controlAfterRender ==========================================================================================================================================
        //
        // 일시 : 2014.10.15
        //
        // 설명 : 라인 품질 관리 데이터를 추가, 수정, 삭제 작업을 수행합니다.
        //
        // =============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            var obj = {};

        // 유효성 검사 ===================================================================================================================================================================

            if(!me.validityCheck().blankCheck(componentObj.bandwidtheth) ||
               !me.validityCheck().blankCheck(componentObj.bandwidthlimit) ||
               !me.validityCheck().scaleValidate(componentObj.bandwidthlimit, '대역폭의 범위는 100~1000000 입니다.') ||
               (componentObj.bandwidthact.getValue() === 2) ? !me.validityCheck().blankCheck(componentObj.bandwidthtime) : false ||
               (componentObj.bandwidthact.getValue() === 2) ? !me.validityCheck().scaleValidate(componentObj.bandwidthtime, '유지시간의 범위는 1~1440 입니다.') : false ||
               !me.validityCheck().duplicateCheck('add', componentObj.bandwidtheth.getValue(), null, '@name', 'st_etc_bandwidth', '인터페이스가 중복되었습니다.')){

               return false;

            }

            obj['@limit'] = componentObj.bandwidthlimit.getValue();
            obj['@name']  = componentObj.bandwidtheth.getValue();
            obj['@time']  = (componentObj.bandwidthact.getValue() === 1) ? 0 : componentObj.bandwidthtime.getValue();
            obj['@type']  = componentObj.bandwidthact.getValue();

            gridData_Add(componentObj.gpn_bandwidth, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.gpn_bandwidth.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            var obj = {};

        // 유효성 검사 ===================================================================================================================================================================

            if(!me.validityCheck().blankCheck(componentObj.bandwidtheth) ||
               !me.validityCheck().blankCheck(componentObj.bandwidthlimit) ||
               !me.validityCheck().scaleValidate(componentObj.bandwidthlimit, '대역폭의 범위는 100~1000000 입니다.') ||
               (componentObj.bandwidthact.getValue() === 2) ? !me.validityCheck().blankCheck(componentObj.bandwidthtime) : false ||
               (componentObj.bandwidthact.getValue() === 2) ? !me.validityCheck().scaleValidate(componentObj.bandwidthtime, '유지시간의 범위는 1~1440 입니다.') : false ||
               !me.validityCheck().duplicateCheck('mod', componentObj.bandwidtheth.getValue(), componentObj.gpn_bandwidth.getSelectionModel().getSelection()[0].get('@name'), '@name', 'st_etc_bandwidth', '인터페이스가 중복되었습니다.')){

               return false;

            }

            obj['@limit'] = componentObj.bandwidthlimit.getValue();
            obj['@name']  = componentObj.bandwidtheth.getValue();
            obj['@time']  = (componentObj.bandwidthact.getValue() === 1) ? 0 : componentObj.bandwidthtime.getValue();
            obj['@type']  = componentObj.bandwidthact.getValue();

            selectionGrid_Mod(componentObj.gpn_bandwidth, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.gpn_bandwidth.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.gpn_bandwidth);

        });
    },

    onGpn_etc_bandwidthlistRender: function(component, eOpts) {
        // onGpn_etc_bandwidthlistRender ================================================================================================================================================
        //
        // 일시 : 2014.10.15
        //
        // 설명 : 그리드의 스토어를 동적으로 생성하여 바인딩합니다.
        //
        // ==============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId' : 'st_etc_bandwidth',
            'fields': [
                {
                    name: '@limit'
                },
                {
                    name: '@name'
                },
                {
                    name: '@time'
                },
                {
                    name: '@type'
                }
            ]

        }));
    },

    onGpn_etc_bandwidthlistItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_etc_bandwidthlistItemClick =============================================================================================================================================
        //
        // 일시 : 2014.10.20
        //
        // 설명 : 대역폭 Row 클릭시 해당하는 값을 입력 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        component.bandwidtheth.setValue(record.data['@name']);
        component.bandwidthlimit.setValue(record.data['@limit']);
        component.bandwidthact.setValue(record.data['@type']);
        component.bandwidthtime.setValue(record.data['@time']);
    },

    onCk_idsChange: function(field, newValue, oldValue, eOpts) {
        // onCk_idsChange ================================================================================================================================================================
        //
        // 일시 : 2014.10.08
        //
        // 설명 : IDS 연동에 관련된 컴포넌트의 활성화 / 비활성화 동작을 수행합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        if(newValue){

            componentObj.idsactmode.setDisabled(false);
            componentObj.idsport.setDisabled(false);

        }
        else{

            componentObj.idsactmode.setDisabled(true);
            componentObj.idsport.setDisabled(true);

        }
    },

    onCmb_actmodeAfterRender: function(component, eOpts) {
        // onCmb_actmodeRender ==========================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 콤보박스의 스토어를 바인딩합니다.
        //
        // ==============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId': 'st_etc_idsact',
            'fields': [

                {	'name' : 'name'	},
                {	'name' : 'value'	}

            ],
            'data': [
                {	'name'  : 'None', 'value' : 0		},
                {	'name'  : 'Server', 'value' : 1		},
                {	'name'  : 'Client', 'value' : 2		}
            ]
        }));

        component.setValue(0);
    },

    onPnl_xtm_etc_settingBeforeRender: function(component, eOpts) {
        Ext.create('SMC4ZEN.store.st_etc_eth');
    },

    onPnl_xtm_etc_settingAfterRender: function(component, eOpts) {
        // onPnl_xtm_etc_settingAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.10.06
        //
        // 설명 : 장비의 기타설정 데이터를 컴포넌트에 설정합니다.
        //
        // 파라미터 :
        //
        // [0] fw_script
        // [1] vpn_script
        // [2] network_interface
        // [3] center_setup
        //
        // ============================================================================================================================================================================

        var etcSetting   = component.deviceParams;

        var componentObj = this.componentStorage();

        var st_devStore  = Ext.getStore('st_common_deveth');
        var st_ethStore  = Ext.getStore('st_etc_eth');

        st_ethStore.removeAll();

        // 인터페이스 목록 초기화 =========================================================================================================================================================

        for(var i = 0; i < st_devStore.count(); i++){

            try{

                if(etcSetting[2]['interface'][i].setting['@chk_multipath'] === 'on'){

                    st_ethStore.add({	'eth' : 'eth' + i	});

                }

            }
            catch(err){

                console.log('인터페이스 초기화 중 범위 초과가 감지되었습니다.');

            }

        }

        if(etcSetting[1]){

        // 멀티 라우팅 데이터 초기화 ======================================================================================================================================================

            componentObj.linetype.setValue(etcSetting[1].multipath_type);

        // Explicit routing 데이터 초기화 ===============================================================================================================================================

            if(etcSetting[1].explicit_network.explicit){

                componentObj.gpn_explicit.getStore().add(etcSetting[1].explicit_network.explicit);

            }

        // 라인 타임아웃 결정 시간 =======================================================================================================================================================

            componentObj.timeout.setValue(etcSetting[1].line_timeout);
            componentObj.dropadddr.setValue(etcSetting[1].inout_interface_sync.ip['#text']);

        // 라인 체커 초기화 =============================================================================================================================================================

            componentObj.use_linchecker.setValue((etcSetting[1].isp_quality['@chk_use'] === 'on') ? true : false);
            componentObj.linesec.setValue(Number(etcSetting[1].isp_quality['@time_cycle']));
            componentObj.linedowncount.setValue(Number(etcSetting[1].isp_quality['@down_count']));
            componentObj.ethdownsec.setValue(Number(etcSetting[1].isp_quality['@down_duration']));

        // 라인 대역폭 제한 기능 인터페이스 리스트 ==========================================================================================================================================

            componentObj.use_bandwidth.checkboxCmp.setValue((etcSetting[1].isp_bandwidth['@chk_use'] === 'on') ? true : false);

            if(etcSetting[1].isp_bandwidth.band_iface){

                componentObj.gpn_bandwidth.getStore().add(etcSetting[1].isp_bandwidth.band_iface);

            }

        }


        // F/W Script 데이터 초기화 =====================================================================================================================================================

        if(etcSetting[0]){

            componentObj.usemulticast.setValue((etcSetting[0].mc_forwarding['@chk_use'] === 'on') ? true : false);

            if(etcSetting[0].ids_port){

                componentObj.useids.setValue((etcSetting[0].ids_port['@chk_use'] === 'on') ? true : false);
                componentObj.idsactmode.setValue((etcSetting[0].ids_port.mode === null) ? 0 : etcSetting[0].ids_port.mode);
                componentObj.idsport.setValue((etcSetting[0].ids_port['interface'] === null) ? 'eth0' : etcSetting[0].ids_port['interface']);

            }

            componentObj.fwvoip.setValue((etcSetting[0].sip['@chk_use'] === 'on') ? true : false);
            componentObj.fwsysdebug.setValue((etcSetting[0].sysdebug['@chk_use'] === 'on') ? true : false);

            if(etcSetting[3]){

                componentObj.fwsteal.setValue((etcSetting[3].center.protection === 'on') ? true : false);

            }

            componentObj.fwbandwidth.setValue((etcSetting[0].bandwidth['@chk_use'] === 'on') ? true : false);

        // 장비에 따라 snat_port_force_change, snat_force_change 로 키 이름이 다름 ========================================================================================================

            if(etcSetting[0].snat_port_force_change){

                componentObj.fwsnat.setValue((etcSetting[0].snat_port_force_change['@chk_use'] === 'on') ? true : false);

            }

        }


    },

    onPnl_xtm_etc_settingBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_etc_settingBeforeClose =============================================================================================================================================
        //
        // 일시 : 2014.10.06
        //
        // 설명 : 화면이 이동하거나 닫힐경우 데이터를 저장하고 뷰 상태를 변경합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain   = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_multipath = this.down('[itemId=fds_etc_multipath]');
        var fds_quality   = this.down('[itemId=fds_etc_quality]');
        var fds_fw        = this.down('[itemId=fds_etc_fw]');

        obj.fds_multipath = fds_multipath;
        obj.fds_quality   = fds_quality;
        obj.fds_fw        = fds_fw;

        // multipath ===================================================================================================================================================================

        obj.linetype      = fds_multipath.down('[itemId=cmb_line]');

        var ctn_explicit  = fds_multipath.down('[itemId=ctn_etc_explicit]');
        var ctn_basicrouting = fds_multipath.down('[itemId=ctn_etc_basicrouting]');

        // explicit ====================================================================================================================================================================

        obj.explicit_eth  = ctn_explicit.down('[itemId=ctn_etc_expliciteth]').down('[itemId=cmb_interface]');

        var explicit_front = ctn_explicit.down('[itemId=ctn_etc_explicitinfo]').down('[itemId=ctn_explicit_source]');
        var explicit_rear = ctn_explicit.down('[itemId=ctn_etc_explicitinfo]').down('[itemId=ctn_explicit_dest]');

        obj.explicit_front_source = explicit_front.down('[itemId=cmb_source]');
        obj.explicit_front_ip     = explicit_front.down('[itemId=txf_ip]');
        obj.explicit_front_mid    = explicit_front.down('[itemId=lab_mid]');
        obj.explicit_front_after   = explicit_front.down('[itemId=txf_after]');

        obj.explicit_rear_dest = explicit_rear.down('[itemId=cmb_dest]');
        obj.explicit_rear_ip     = explicit_rear.down('[itemId=txf_ip]');
        obj.explicit_rear_mid    = explicit_rear.down('[itemId=lab_mid]');
        obj.explicit_rear_after   = explicit_rear.down('[itemId=txf_after]');

        obj.gpn_explicit = ctn_explicit.down('[itemId=gpn_etc_explicit]');

        // basicrouting ================================================================================================================================================================

        obj.timeout       = ctn_basicrouting.down('[itemId=ctn_etc_timeout]').down('[itemId=nfd_timeout]');
        obj.dropadddr     = ctn_basicrouting.down('[itemId=ctn_etc_dropaddr]').down('[itemId=txf_addr]');

        // quality =====================================================================================================================================================================

        obj.use_linchecker = fds_quality.down('[itemId=ctn_etc_linechecker]').down('[itemId=ck_usechecker]');
        obj.linesec       = fds_quality.down('[itemId=ctn_etc_linechecker]').down('[itemId=nfd_sec]');
        obj.linedowncount = fds_quality.down('[itemId=ctn_etc_linechecker]').down('[itemId=nfd_down]');
        obj.ethdownsec    = fds_quality.down('[itemId=ctn_etc_linechecker]').down('[itemId=nfd_ethdown]');

        var fds_vandwidth = fds_quality.down('[itemId=fds_etc_bandwidthlimit]');

        obj.use_bandwidth = fds_vandwidth;
        obj.bandwidtheth  = fds_vandwidth.down('[itemId=ctn_etc_inputctn]').down('[itemId=cmb_interface]');
        obj.bandwidthlimit = fds_vandwidth.down('[itemId=ctn_etc_inputctn]').down('[itemId=nfd_bandwidth]');
        obj.bandwidthact  = fds_vandwidth.down('[itemId=ctn_etc_inputctn]').down('[itemId=cmb_selectfunc]');
        obj.bandwidthtime = fds_vandwidth.down('[itemId=ctn_etc_inputctn]').down('[itemId=nfd_keep]');
        obj.gpn_bandwidth = fds_vandwidth.down('[itemId=gpn_etc_bandwidthlist]');

        // fw ==========================================================================================================================================================================

        obj.usemulticast  = fds_fw.down('[itemId=ck_multicast]');
        obj.useids        = fds_fw.down('[itemId=ctn_etc_ids]').down('[itemId=ck_ids]');
        obj.idsactmode    = fds_fw.down('[itemId=ctn_etc_ids]').down('[itemId=cmb_actmode]');
        obj.idsport       = fds_fw.down('[itemId=ctn_etc_ids]').down('[itemId=cmb_port]');

        obj.fwvoip        = fds_fw.down('[itemId=ck_voip]');
        obj.fwsysdebug    = fds_fw.down('[itemId=ck_sysdebug]');
        obj.fwsteal       = fds_fw.down('[itemId=ck_steal]');
        obj.fwbandwidth   = fds_fw.down('[itemId=ck_bandwidth]');
        obj.fwsnat        = fds_fw.down('[itemId=ck_snat]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 기타 설정 화면의 유효성 검사를 수행할 모듈을 정의합니다.
        //
        // =============================================================================================================================================================================

        var validateObject = {

            'blankCheck' : function(component){

                var argument = (arguments[1] === undefined) ? true : arguments[1];

                if(component.getXType() === 'textfield'){

                    if(component.getValue() === '' && argument){

                        Ext.Msg.show({

                            'title': 'WeGuardia™ SMC 2.0',
                            'msg'  : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn'   : function(res){

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
                            'fn'   : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }

                return true;

            },
            'scaleValidate' : function(component, msg){

                var argument = (arguments[2] === undefined) ? true : arguments[2];

                if(!component.validate() && argument){

                    Ext.Msg.show({

                        'title': 'WeGuardia™ SMC 2.0',
                        'msg'  : msg,
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn'   : function(res){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'ipValidate' : function(component){

                if(!component.validate()){

                    Ext.Msg.show({

                        'title' : 'WeGuardia™ SMC 2.0',
                        'msg' : 'IP 형식에 맞지 않습니다.',
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn'   : function(res){

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

        return validateObject;
    },

    saveData: function() {
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.10.06
        //
        // 설명 : 장비의 기타설정을 deviceParam 데이터에 임시 저장합니다.
        //
        // ============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 멀티 라우팅 데이터 저장 ========================================================================================================================================================

        deviceAllData.vpn_script.multipath_type = componentObj.linetype.getValue();

        // Explicit routing 데이터 저장 =================================================================================================================================================

        if(componentObj.linetype.getValue() === 5){

            var explicit_count = componentObj.gpn_explicit.getStore().count();

            if(explicit_count === 0){

                if(deviceAllData.vpn_script.explicit_network.explicit){

                    delete deviceAllData.vpn_script.explicit_network.explicit;

                }

                deviceAllData.vpn_script.explicit_network['@num'] = explicit_count;

            }
            else{

                var explicitArray = [];

                deviceAllData.vpn_script.explicit_network['@num'] = explicit_count;

                for(var i = 0; i < explicit_count; i++){

                    explicitArray.push(componentObj.gpn_explicit.getStore().getAt(i).data);

                }

                deviceAllData.vpn_script.explicit_network.explicit = explicitArray;

            }

        }
        else{

            if(deviceAllData.vpn_script.explicit_network.explicit){

                delete deviceAllData.vpn_script.explicit_network.explicit;

            }

            deviceAllData.vpn_script.explicit_network['@num'] = 0;

        }

        // 라인타임아웃, Drop 출발지 유효성 검사 ===========================================================================================================================================

        if(!this.validityCheck().blankCheck(componentObj.timeout) || !this.validityCheck().scaleValidate(componentObj.timeout, '타임아웃의 범위는 1~255 입니다.') ||
           !this.validityCheck().blankCheck(componentObj.dropadddr) || !this.validityCheck().ipValidate(componentObj.dropadddr)){

            return false;

        }

        // 라인 타임아웃 결정 시간 ========================================================================================================================================================

        deviceAllData.vpn_script.line_timeout = componentObj.timeout.getValue();

        deviceAllData.vpn_script.inout_interface_sync.ip['#text'] = componentObj.dropadddr.getValue();
        deviceAllData.vpn_script.inout_interface_sync.ip['@type'] = 'single';
        deviceAllData.vpn_script.inout_interface_sync.ip['@version'] = 'v4';

        // 라인 품질관리 저장 ============================================================================================================================================================

        // 라인 체커 유효성 검사 =========================================================================================================================================================

        if(!this.validityCheck().blankCheck(componentObj.linesec, componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().scaleValidate(componentObj.linesec, '라인체커의 범위는 60~3600 입니다.', componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().blankCheck(componentObj.linedowncount, componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().scaleValidate(componentObj.linedowncount, '다운 카운트 범위는 2~20 입니다.', componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().blankCheck(componentObj.ethdownsec, componentObj.use_linchecker.getValue()) ||
           !this.validityCheck().scaleValidate(componentObj.ethdownsec, '인터페이스 다운 시간은 10~3600 입니다.', componentObj.use_linchecker.getValue())){

            return false;

        }

        deviceAllData.vpn_script.isp_quality['@chk_use'] = (componentObj.use_linchecker.getValue() === true) ? 'on' : 'off';
        deviceAllData.vpn_script.isp_quality['@time_cycle'] = componentObj.linesec.getValue();
        deviceAllData.vpn_script.isp_quality['@down_count'] = componentObj.linedowncount.getValue();
        deviceAllData.vpn_script.isp_quality['@down_duration'] = componentObj.ethdownsec.getValue();

        // 라인 대역폭 제한 기능 인터페이스 리스트 ==========================================================================================================================================

        deviceAllData.vpn_script.isp_bandwidth['@chk_use'] = (componentObj.use_bandwidth.checkboxCmp.getValue() === true) ? 'on' : 'off';

        var bandwidth_count = componentObj.gpn_bandwidth.getStore().count();

        if(bandwidth_count === 0){

            if(deviceAllData.vpn_script.isp_bandwidth.band_iface){

                delete deviceAllData.vpn_script.isp_bandwidth.band_iface;

            }

        }
        else{

            var bandwidthArray = [];

            for(var i = 0; i < bandwidth_count; i++){

                bandwidthArray.push(componentObj.gpn_bandwidth.getStore().getAt(i).data);

            }

            deviceAllData.vpn_script.isp_bandwidth.band_iface = bandwidthArray;

        }

        // F/W Script 데이터 초기화 =====================================================================================================================================================

        deviceAllData.fw_script.mc_forwarding['@chk_use'] = (componentObj.usemulticast.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.ids_port['@chk_use'] = (componentObj.useids.getValue() === true) ? 'on' : 'off';
        deviceAllData.fw_script.ids_port.mode = (componentObj.idsactmode.getValue() === 0) ? null : componentObj.idsactmode.getValue();
        deviceAllData.fw_script.ids_port['interface'] = componentObj.idsport.getValue();

        deviceAllData.fw_script.sip['@chk_use'] = (componentObj.fwvoip.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.sysdebug['@chk_use'] = (componentObj.fwsysdebug.getValue() === true) ? 'on' : 'off';

        deviceAllData.center_setup.center.protection = (componentObj.fwsteal.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.bandwidth['@chk_use'] = (componentObj.fwbandwidth.getValue() === true) ? 'on' : 'off';

        deviceAllData.fw_script.snat_port_force_change['@chk_use'] = (componentObj.fwsnat.getValue() === true) ? 'on' : 'off';

        return true;
    }

});