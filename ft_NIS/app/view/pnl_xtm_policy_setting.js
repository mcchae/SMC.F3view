
Ext.define('SMC.view.pnl_xtm_policy_setting', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_policy_setting',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.grid.plugin.CellEditing',
        'Ext.selection.RowModel',
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer'
    ],

    height: 680,
    id: 'pnl_xtm_policy_setting',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '보안 설정',

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
                    itemId: 'fds_policy_ipv4',
                    margin: '0, 0, 10, 0',
                    title: 'IPv4 보안 정책 (보안정책을 추가하려면 필드를 클릭하세요)',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 0.8,
                            margins: '10, 10, 10, 0',
                            hidden: true,
                            itemId: 'ctn_policy_filter',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'gpn_policy_filterpolicy',
                                    title: 'IPv4 필터링 정책',
                                    store: 'st_policy_filter',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'periodtext',
                                            text: '정책 순위',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: '#text',
                                            text: '정책 선택',
                                            flex: 1.5
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            flex: 0.5,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        // saveData ===============================================================================================================================
                                                        //
                                                        // 일시 : 2014.06.18
                                                        //
                                                        // 수정 : 2014.07.01 (김민수) : Cell 클릭 이벤트로 변경
                                                        //
                                                        // 설명 : 로그 모니터링 설정을 저장합니다.
                                                        //
                                                        // =======================================================================================================================================

                                                        var policyTmp   = Ext.getStore('st_policy_storage');

                                                        var filterStore = Ext.getStore('st_policy_filter');

                                                        policyTmp.getAt(rowIndex).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

                                                        filterStore.getAt(rowIndex).set({	'#text' : '', '@cid' : ''	});

                                                        filterStore.sync();
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    plugins: [
                                        Ext.create('Ext.grid.plugin.CellEditing', {
                                            clicksToEdit: 1
                                        })
                                    ],
                                    selModel: Ext.create('Ext.selection.RowModel', {

                                    }),
                                    listeners: {
                                        cellclick: {
                                            fn: me.onGpn_policy_filterpolicyCellClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            itemId: 'fds_policy_highpolicy',
                            margin: '10, 0, 10, 0',
                            title: 'IPv4 필터링 상위 정책',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margins: '10, 0, 10, 0',
                                    itemId: 'ctn_policy_v4filter1',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_filter',
                                            margin: '0, 10, 0, 0',
                                            width: 400,
                                            fieldLabel: 'IPv4 필터링 정책 1순위',
                                            labelWidth: 150,
                                            emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                            listeners: {
                                                focus: {
                                                    fn: me.onTxf_filterFocus1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_clear',
                                            width: 100,
                                            text: '삭 제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_clearClick11,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margins: '0, 0, 10, 0',
                                    itemId: 'ctn_policy_v4filter2',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_filter',
                                            margin: '0, 10, 0, 0',
                                            width: 400,
                                            fieldLabel: 'IPv4 필터링 정책 2순위',
                                            labelWidth: 150,
                                            emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                            listeners: {
                                                focus: {
                                                    fn: me.onTxf_filterFocus12,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_clear',
                                            width: 100,
                                            text: '삭 제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_clearClick112,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            itemId: 'fds_policy_normalpolicy',
                            title: 'IPv4 필터링 / 주소변환 정책',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margins: '0, 0, 10, 0',
                                    itemId: 'ctn_policy_v4filter3',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_filter',
                                            margin: '0, 10, 0, 0',
                                            width: 400,
                                            fieldLabel: 'IPv4 필터링 정책',
                                            labelWidth: 150,
                                            emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                            listeners: {
                                                focus: {
                                                    fn: me.onTxf_filterFocus121,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_clear',
                                            width: 100,
                                            text: '삭 제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_clearClick1121,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margins: '0, 0, 10, 0',
                                    itemId: 'ctn_policy_addr',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_addr',
                                            margin: '0, 10, 0, 0',
                                            width: 400,
                                            fieldLabel: 'IPv4 주소변환 정책',
                                            labelWidth: 150,
                                            emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                            listeners: {
                                                focus: {
                                                    fn: me.onTxf_filterFocus11,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_clear',
                                            width: 100,
                                            text: '삭 제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_clearClick111,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    hidden: true,
                    itemId: 'fds_policy_ipv6',
                    margin: '0, 0, 10, 0',
                    title: 'IPv6 보안 정책',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_policy_filter',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_filter',
                                    margin: '0, 10, 0, 0',
                                    width: 400,
                                    fieldLabel: '필터링 정책',
                                    labelWidth: 150,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_filterFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '삭 제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_policy_addr',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_addr',
                                    margin: '0, 10, 0, 0',
                                    width: 400,
                                    fieldLabel: '주소변환 정책',
                                    labelWidth: 150,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_addrFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '삭 제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick2,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_policy_etc',
                    title: '기타 정책 설정',
                    items: [
                        {
                            xtype: 'container',
                            hidden: true,
                            itemId: 'ctn_policy_dpi',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_dpi',
                                    margin: '0, 10, 0, 0',
                                    width: 400,
                                    fieldLabel: 'DPI 패턴',
                                    labelWidth: 150,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onCtn_policy_dpiFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '삭 제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick3,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_policy_url',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_url',
                                    margin: '0, 10, 0, 0',
                                    width: 400,
                                    fieldLabel: 'URL 필터',
                                    labelWidth: 150,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_urlFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '삭 제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick4,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_policy_ip',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_ip',
                                    margin: '0, 10, 0, 0',
                                    width: 400,
                                    fieldLabel: 'White / Black IP',
                                    labelWidth: 150,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_ipFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '삭 제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick5,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 300,
                    itemId: 'fds_policy_vlan',
                    margin: '0, 0, 10, 0',
                    layout: 'fit',
                    title: 'VLAN 필터링',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_policy_vlan',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_vlan',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 250,
                                    width: 250,
                                    fieldLabel: 'VLAN',
                                    emptyText: 'Select interface ...',
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_policy_vlaneth',
                                    valueField: 'eth',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onCmb_vlanAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_policy_policyset',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_policy',
                                            margin: '0, 10, 0, 0',
                                            width: 330,
                                            fieldLabel: '정책 설정',
                                            emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                            listeners: {
                                                focus: {
                                                    fn: me.onTxf_policyFocus,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_clear',
                                            width: 100,
                                            text: '삭 제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_clearClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'ctn_network_controlclass1',
                                    itemId: 'ctn_policy_control',
                                    margin: '0, 0, 10, 0',
                                    padding: 10,
                                    listeners: {
                                        afterrender: {
                                            fn: me.onCtn_bridge_controlAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_policy_vlan',
                                    margin: '0, 0, 10, 0',
                                    title: '',
                                    store: 'st_policy_vlan',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'name',
                                            text: 'VLAN 오브젝트명',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value['#text'];
                                            },
                                            dataIndex: 'filtering',
                                            text: 'IPv4 필터링 오브젝트명',
                                            flex: 2
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.RowModel', {
                                        mode: 'MULTI'
                                    })
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_security_settingAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_policy_settingBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_policy_filterpolicyCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 1){

            var returnValue = Ext.create('widget.smc_object_set', {

                'service'       : 'ftSMC',
                'searchService' : 'getGroup',
                'gtype'         : 'obj_spd_ipv4_filter',
                'policyKey'     : 'spd_ipv4_filter',
                'thisObj'       : this,
                'componentObj'  : this.componentStorage().grid_ipv4

            }).show();

        }
    },

    onTxf_filterFocus1: function(component, e, eOpts) {
        // onTxf_filterFocus1 ===========================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 1순위를 적용합니다.
        //
        // ==============================================================================================================================================================================

        var returnValue = Ext.create('widget.smc_object_set', {

            'service'		: 'ftSMC',
            'openType'		: 'Policy',
            'searchService'	: 'getGroup',
            'gtype'			: 'obj_spd_ipv4_filter_1',
            'policyKey'		: 'spd_ipv4_filter_1',
            'thisObj'		: this,
            'componentObj'	: component

        }).show();
    },

    onBt_clearClick11: function(button, e, eOpts) {
        // onBt_clearClick11 =============================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 1순위를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_filter]');

        tmpStore.getAt(0).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        for(var i = 0; i < tmpStore.count(); i ++){

            console.log('policy list -> ', tmpStore.getAt(i).data);

        }

        policyFd.setValue("");
    },

    onTxf_filterFocus12: function(component, e, eOpts) {
        // onTxf_filterFocus12 ===========================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 2순위를 적용합니다.
        //
        // ===============================================================================================================================================================================

        var returnValue = Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Policy',
            'gtype'         : 'obj_spd_ipv4_filter_2',
            'policyKey'     : 'spd_ipv4_filter_2',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick112: function(button, e, eOpts) {
        // onBt_clearClick112 ============================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 2순위를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_filter]');

        tmpStore.getAt(1).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        for(var i = 0; i < tmpStore.count(); i ++){

            console.log('policy list -> ', tmpStore.getAt(i).data);

        }

        policyFd.setValue("");
    },

    onTxf_filterFocus121: function(component, e, eOpts) {
        // onTxf_filterFocus121 ==========================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 3순위를 적용합니다.
        //
        // ===============================================================================================================================================================================

        var returnValue = Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Policy',
            'gtype'         : 'obj_spd_ipv4_filter',
            'policyKey'     : 'spd_ipv4_filter',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick1121: function(button, e, eOpts) {
        // onBt_clearClick113 ============================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 3순위를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_filter]');

        tmpStore.getAt(2).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        for(var i = 0; i < tmpStore.count(); i ++){

            console.log('policy list -> ', tmpStore.getAt(i).data);

        }

        policyFd.setValue("");
    },

    onTxf_filterFocus11: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'gtype'         : 'obj_spd_ipv4_nat',
            'openType'      : 'Policy',
            'policyKey'     : 'spd_ipv4_nat',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick111: function(button, e, eOpts) {
        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_addr]');

        tmpStore.getAt(3).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        for(var i = 0; i < tmpStore.count(); i ++){

            console.log('policy list -> ', tmpStore.getAt(i).data);

        }

        policyFd.setValue("");
    },

    onTxf_filterFocus: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Policy',
            'gtype'         : 'obj_spd_ipv6_filter',
            'policyKey'     : 'spd_ipv6_filter',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick1: function(button, e, eOpts) {
        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_filter]');

        tmpStore.getAt(4).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        policyFd.setValue("");
    },

    onTxf_addrFocus: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Policy',
            'gtype'         : 'obj_spd_ipv6_nat',
            'policyKey'     : 'spd_ipv6_nat',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick2: function(button, e, eOpts) {
        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_addr]');

        tmpStore.getAt(5).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});
        policyFd.setValue("");
    },

    onCtn_policy_dpiFocus: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Dpi',
            'gtype'         : 'obj_spd_ips',
            'policyKey'     : 'spd_ips_pattern',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick3: function(button, e, eOpts) {
        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_dpi]');

        tmpStore.getAt(6).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        policyFd.setValue("");
    },

    onTxf_urlFocus: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_svc_url',
            'policyKey'     : 'svc_url',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick4: function(button, e, eOpts) {
        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_url]');

        tmpStore.getAt(7).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        policyFd.setValue("");
    },

    /*
        일 시 :

        설 명 :

        수 정 :
    */
    onTxf_ipFocus: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_spd_whiteblack',
            'policyKey'     : 'spd_whiteblack',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick5: function(button, e, eOpts) {
        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_ip]');

        tmpStore.getAt(8).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        policyFd.setValue("");
    },

    onCmb_vlanAfterRender: function(component, eOpts) {
        comboAutoSelect(component, 'st_policy_vlaneth');
    },

    onTxf_policyFocus: function(component, e, eOpts) {
        // onTxf_policyFocus =============================================================================================================================================================

        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Policy',
            'gtype'         : 'obj_spd_ipv4_filter',
            'policyKey'     : 'vlan_setting',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick: function(button, e, eOpts) {
        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_policy]');

        tmpStore.getAt(9).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        policyFd.setValue("");
    },

    onCtn_bridge_controlAfterRender: function(component, eOpts) {
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var policyTmp = Ext.getStore('st_policy_storage');
        var vlanData  = Ext.getStore('st_vlan_set');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck() || !me.validityCheck().vlanDuplicationCheck(componentObj.vlan.getValue(), 'add')){

                return;

            }

            var obj       = {};
            var filterObj = {};

            for(var i = 0; i < policyTmp.count(); i++){

                if(policyTmp.getAt(i).get('key') === 'vlan_setting'){

                    filterObj['#text'] = policyTmp.getAt(i).get('value').name;
                    filterObj['@cid']  = policyTmp.getAt(i).get('value')['@cid'];

                    break;
                }
            }

            obj['@num']   = 0;
            obj.filtering = filterObj;
            obj['@id']    = 0;
            obj.name      = componentObj.vlan.getValue();
            obj.vlan      = {	'#text' : componentObj.vlan.getValue()		};

            gridData_Add(componentObj.vlangrid, obj);

            reconfigNum(componentObj.vlangrid.getStore());

            for(var i = 0; i < componentObj.vlangrid.getStore().count(); i++){

                var obj = {};

                obj['@id'] = i + 1;

                componentObj.vlangrid.getStore().getAt(i).set(obj);
            }

        });

        bt_mod.on('click', function(){

            if(!componentObj.vlangrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'VLAN 수정 에러',
                    msg : '수정할 VLAN을 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck() || !me.validityCheck().vlanDuplicationCheck(componentObj.vlan.getValue(), 'modify')){

                return;

            }

            var obj       = {};
            var filterObj = {};

            for(var i = 0; i < policyTmp.count(); i++){

                if(policyTmp.getAt(i).get('key') === 'vlan_setting'){

                    filterObj['#text'] = policyTmp.getAt(i).get('value').name;
                    filterObj['@cid']  = policyTmp.getAt(i).get('value')['@cid'];

                    break;
                }
            }

            obj['@num']   = 0;
            obj.filtering = filterObj;
            obj.id        = 0;
            obj.name      = componentObj.vlan.getValue();
            obj.vlan      = {	'#text' : componentObj.vlan.getValue()		};

            selectionGrid_Mod(componentObj.vlangrid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.vlangrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'VLAN 삭제 에러',
                    msg : '삭제할 VLAN을 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.vlangrid);

            reconfigNum(componentObj.vlangrid.getStore());

            for(var i = 0; i < componentObj.vlangrid.getStore().count(); i++){

                var obj = {};

                obj['@id'] = i + 1;

                componentObj.vlangrid.getStore().getAt(i).set(obj);
            }

        });
    },

    onPnl_xtm_security_settingAfterRender: function(component, eOpts) {
        // onPnl_xtm_security_settingAfterRender =======================================================================================================================================
        //
        // 일시 : 2014.06.18
        //
        // 수정 : 2014.07.01
        //
        // 설명 : 로그 모니터링 데이터를 초기화합니다.
        //
        //
        /* 정책 스토어 인덱스

        [
            0  {	'key' : 'spd_ipv4_filter_1', 'value' : {}	},
            1  {	'key' : 'spd_ipv4_filter_2', 'value' : {}	},
            2  {	'key' : 'spd_ipv4_filter'  , 'value' : {}	},
            3  {	'key' : 'spd_ipv4_nat'     , 'value' : {}	},
            4  {	'key' : 'spd_ipv6_filter'  , 'value' : {}	},
            5  {	'key' : 'spd_ipv6_nat'     , 'value' : {}	},
            6  {	'key' : 'spd_ips_pattern'  , 'value' : {}	},
            7  {	'key' : 'svc_url'          , 'value' : {}	},
            8  {	'key' : 'spd_whiteblack'   , 'value' : {}	}
        ]

        */
        // =============================================================================================================================================================================

        var policyStore  = Ext.getStore('st_policy_storage');
        var vlanStore    = Ext.getStore('st_policy_vlan');

        var componentObj = this.componentStorage();

        this.on('setPolicy', this.setPolicyData);

        this.initStore();

        var deviceData = component.deviceParams;

        if(deviceData){

        // IPv4 필터링 정책 초기화 =======================================================================================================================================================
        //
        //         var filterRecord = Ext.getStore('st_policy_filter').getAt(0);
        //         if(filterRecord){
        //             filterRecord.set({	'@cid' : deviceData.spd_ipv4_filter['@cid'], '#text' : deviceData.spd_ipv4_filter['#text']	});
        //         }
        //         componentObj.grid_ipv4.getStore().sync();
        //	policyStore.getAt(0).set({	'value' : deviceData.spd_ipv4_filter	});
        //
        // ============================================================================================================================================================================

            try{

                componentObj.ipv4_filter1.setValue((deviceData.spd_ipv4_filter_1['#text'] === 'Any') ? '' : deviceData.spd_ipv4_filter_1['#text']);
                componentObj.ipv4_filter1.policyCid = deviceData.spd_ipv4_filter['@cid'];

                policyStore.getAt(0).set({	'value' : deviceData.spd_ipv4_filter_1		});

            }
            catch(err){

                console.log('IPv4 필터링 정책 1 초기화 중 catch 발생 : ', err);

            }

            try{
                componentObj.ipv4_filter2.setValue((deviceData.spd_ipv4_filter_2['#text'] === 'Any') ? '' : deviceData.spd_ipv4_filter_2['#text']);
                componentObj.ipv4_filter2.policyCid = deviceData.spd_ipv4_filter_2['@cid'];

                policyStore.getAt(1).set({	'value' : deviceData.spd_ipv4_filter_2		});

            }
            catch(err){

                console.log('IPv4 필터링 정책 2 초기화 중 catch 발생 : ', err);

            }

            try{

                componentObj.ipv4_filter3.setValue((deviceData.spd_ipv4_filter['#text'] === 'Any') ? '' : deviceData.spd_ipv4_filter['#text']);
                componentObj.ipv4_filter3.policyCid = deviceData.spd_ipv4_filter['@cid'];

                policyStore.getAt(2).set({	'value' : deviceData.spd_ipv4_filter		});

            }
            catch(err){

                console.log('IPv4 필터링 정책 기본 초기화 중 catch 발생 : ', err);

            }


        // IPv4 주소변환 정책 초기화 ======================================================================================================================================================

            try{

                componentObj.ipv4_addr.setValue((deviceData.spd_ipv4_nat['#text'] === 'Any') ? '' : deviceData.spd_ipv4_nat['#text']);
                componentObj.ipv4_addr.policyCid = deviceData.spd_ipv4_nat['@cid'];

                policyStore.getAt(3).set({	'value' : deviceData.spd_ipv4_nat		});

            }
            catch(err){

                console.log('IPv4 주소변환 정책 초기화 중 catch 발생 : ', err);

            }

        // IPv6 보안 정책 초기화 =========================================================================================================================================================

            try{

                componentObj.ipv6_filter.setValue((deviceData.spd_ipv6_filter['#text'] === 'Any') ? '' : deviceData.spd_ipv6_filter['#text']);
                componentObj.ipv6_filter.policyCid = deviceData.spd_ipv6_filter['@cid'];

                policyStore.getAt(4).set({	'value' : deviceData.spd_ipv6_filter		});

            }
            catch(err){

                console.log('IPv6 보안 정책 초기화 중 catch 발생 : ', err);

            }

        // IPv6 주소변환 정책 초기화 =====================================================================================================================================================

            try{

                componentObj.ipv6_addr.setValue((deviceData.spd_ipv6_nat['#text'] === 'Any') ? '' : deviceData.spd_ipv6_nat['#text']);
                componentObj.ipv6_addr.policyCid = deviceData.spd_ipv6_nat['@cid'];

                policyStore.getAt(5).set({	'value' : deviceData.spd_ipv6_nat	});

            }
            catch(err){

                console.log('IPv6 주소변환 정책 초기화 중 catch 발생 : ', err);

            }

        // 기타 정책 설정 초기화 =========================================================================================================================================================

            try{

                componentObj.dpi.setValue((deviceData.spd_ips_pattern['#text'] === 'Any') ? '' : deviceData.spd_ips_pattern['#text']);
                componentObj.dpi.policyCid = deviceData.spd_ips_pattern['@cid'];

                policyStore.getAt(6).set({	'value' : deviceData.spd_ips_pattern	});

            }
            catch(err){

                console.log('기타 정책 1 초기화 중 catch 발생 : ', err);

            }

            try{

                componentObj.url.setValue((deviceData.svc_url['#text'] === 'Any') ? '' : deviceData.svc_url['#text']);
                componentObj.url.policyCid = deviceData.svc_url['@cid'];

                policyStore.getAt(7).set({	'value' : deviceData.svc_url			});

            }
            catch(err){

                console.log('기타 정책 2 초기화 중 catch 발생 : ', err);

            }

            try{

                componentObj.ip.setValue((deviceData.spd_whiteblack['#text'] === 'Any') ? '' : deviceData.spd_whiteblack['#text']);
                componentObj.ip.policyCid = deviceData.spd_whiteblack['@cid'];

                policyStore.getAt(8).set({	'value' : deviceData.spd_whiteblack	});

            }
            catch(err){

                console.log('기타 정책 3 초기화 중 catch 발생 : ', err);

            }

        // VLAN 초기화 =================================================================================================================================================================

            if(deviceData.vlan_setting){

                var obj = deviceData.vlan_setting;

                if(Object.prototype.toString.call(obj) === "[object Array]"){

                    for(var i = 0; i < obj.length; i++){

                        var tmpId = obj[i].id;

                        obj[i]['@id'] = tmpId;

                        delete obj[i].id;

                    }

                    vlanStore.add(obj);

                }
                else{

                    var tmpId = obj.id;

                    obj['@id'] = tmpId;

                    delete obj.id;

                    vlanStore.add(obj);

                }

            }

        }
    },

    onPnl_xtm_policy_settingBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj             = {};

        var fds_ipv4        = this.down('[itemId=fds_policy_ipv4]');
        var fds_ipv6        = this.down('[itemId=fds_policy_ipv6]');
        var fds_etc         = this.down('[itemId=fds_policy_etc]' );
        var fds_vlan        = this.down('[itemId=fds_policy_vlan]');

        // var grid_ipv4       = fds_ipv4.down('[itemId=gpn_policy_filterpolicy]');
        var ctn_ipv4_nat    = fds_ipv4.down('[itemId=fds_policy_normalpolicy]').down('[itemId=ctn_policy_addr]');

        var ipv4_filter1    = fds_ipv4.down('[itemId=fds_policy_highpolicy]').down('[itemId=ctn_policy_v4filter1]').down('[itemId=txf_filter]');
        var ipv4_filter2    = fds_ipv4.down('[itemId=fds_policy_highpolicy]').down('[itemId=ctn_policy_v4filter2]').down('[itemId=txf_filter]');
        var ipv4_filter3    = fds_ipv4.down('[itemId=fds_policy_normalpolicy]').down('[itemId=ctn_policy_v4filter3]').down('[itemId=txf_filter]');

        var ipv4_addr       = ctn_ipv4_nat.down('[itemId=txf_addr]');

        var ctn_ipv6_filter = fds_ipv6.down('[itemId=ctn_policy_filter]');
        var ctn_ipv6_addr   = fds_ipv6.down('[itemId=ctn_policy_addr]');

        var ctn_dpi         = fds_etc.down('[itemId=ctn_policy_dpi]');
        var ctn_url         = fds_etc.down('[itemId=ctn_policy_url]');
        var ctn_ip          = fds_etc.down('[itemId=ctn_policy_ip]');

        var ctn_vlan        = fds_vlan.down('[itemId=ctn_policy_vlan]');

        var ipv6_filter     = ctn_ipv6_filter.down('[itemId=txf_filter]');
        var ipv6_addr       = ctn_ipv6_addr.down('[itemId=txf_addr]');

        var dpi             = ctn_dpi.down('[itemId=txf_dpi]');
        var url             = ctn_url.down('[itemId=txf_url]');
        var ip              = ctn_ip.down('[itemId=txf_ip]');

        var vlan            = ctn_vlan.down('[itemId=cmb_vlan]');
        var vlanpolicy      = ctn_vlan.down('[itemId=txf_policy]');
        var vlangrid        = ctn_vlan.down('[itemId=gpn_policy_vlan]');

        return function(){

        //     obj.grid_ipv4   = grid_ipv4;
            obj.ipv4_addr    = ipv4_addr;

            obj.ipv4_filter1 = ipv4_filter1;
            obj.ipv4_filter2 = ipv4_filter2;
            obj.ipv4_filter3 = ipv4_filter3;

            obj.ipv6_filter  = ipv6_filter;
            obj.ipv6_addr    = ipv6_addr;
            obj.dpi          = dpi;
            obj.url          = url;
            obj.ip           = ip;
            obj.vlan         = vlan;
            obj.vlanpolicy   = vlanpolicy;
            obj.vlangrid     = vlangrid;

            return obj;

        }();
    },

    setPolicyData: function(component, policyKey, policyData) {
        var policyTmp = Ext.getStore('st_policy_storage');

        for(var i = 0; i < policyTmp.count(); i++){

            if(policyKey === policyTmp.getAt(i).get('key')){

                policyTmp.getAt(i).set({	'value' : policyData    });

                break;

            }

        }

        if(component.getXType() === 'textfield'){

            component.setValue(policyData.name);
            component.policyCid = policyData['@cid'];

        }

        if(component.getXType() === 'grid'){

            var obj = {};

            var selectRecord = component.getSelectionModel().getSelection()[0];

            var selectIndex  = component.getStore().indexOf(selectRecord);

            obj['@cid']      = policyData['@cid'];
            obj['#text']     = policyData.name;
            obj.period       = '정책 ' + (selectIndex + 1)+ ' 순위';

            selectRecord.set(obj);

            component.getStore().sync();

        }
    },

    validityCheck: function() {
        // validityCheck ==========================================================================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : VLAN 필터링의 유효성을 검사합니다.
        //
        // - VLAN 오브젝트명 중복 체크
        //
        // ========================================================================================================================================================================

        var component = this.componentStorage();

        var vlanStore = Ext.getStore('st_policy_vlan');

        var validCheckObj = {

            blankCheck : function(){

                if(component.vlan.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'VLAN 오브젝트는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.vlanpolicy.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IPv4 필터링 정책은 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            vlanDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'name', 'st_policy_vlan')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 VLAN이 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _vlanName = component.vlangrid.getSelectionModel().getSelection()[0].get('name');

                    if(!duplicationItem(componentValue, 'name', 'st_policy_vlan') && _vlanName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 VLAN이 이미 등록되었습니다.',
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

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.06.18
        //
        // 수정 : 2014.07.01
        //
        // 설명 : 정책 설정을 저장합니다.
        //
        //
        /* 정책 스토어 인덱스

        [
            0  {	'key' : 'spd_ipv4_filter_1'  , 'value' : {}	},
            1  {	'key' : 'spd_ipv4_filter_2' , 'value' : {}	},
            2  {	'key' : 'spd_ipv4_filter'   , 'value' : {}	},
            3  {	'key' : 'spd_ipv4_nat'     , 'value' : {}	},
            4  {	'key' : 'spd_ipv6_filter'  , 'value' : {}	},
            5  {	'key' : 'spd_ipv6_nat'     , 'value' : {}	},
            6  {	'key' : 'spd_ips_pattern'  , 'value' : {}	},
            7  {	'key' : 'svc_url'          , 'value' : {}	},
            8  {	'key' : 'spd_whiteblack'   , 'value' : {}	}
        ]

        */
        // =============================================================================================================================================================================

        var componentObj     = this.componentStorage();

        var deviceAllData    = Ext.getCmp('win_smc_device_set').deviceParams;

        var tmpPolicy        = Ext.getStore('st_policy_storage');
        var vlanPolicy       = Ext.getStore('st_policy_vlan');

        // IPv4 필터링 정책 저장 ==========================================================================================================================================================

        var v4Policy         = tmpPolicy.getAt(0).get('value');
        var v4PolicyObj      = {};

        v4PolicyObj['#text'] = (v4Policy.name === undefined) ? v4Policy['#text'] : v4Policy.name;
        v4PolicyObj['@cid']  = v4Policy['@cid'];

        var v4Policy2        = tmpPolicy.getAt(1).get('value');
        var v4PolicyObj2     = {};

        v4PolicyObj2['#text'] = (v4Policy2.name === undefined) ? v4Policy2['#text'] : v4Policy2.name;
        v4PolicyObj2['@cid']  = v4Policy2['@cid'];

        var v4Policy3        = tmpPolicy.getAt(2).get('value');
        var v4PolicyObj3     = {};

        v4PolicyObj3['#text'] = (v4Policy3.name === undefined) ? v4Policy3['#text'] : v4Policy3.name;
        v4PolicyObj3['@cid']  = v4Policy3['@cid'];

        deviceAllData.spdinfo.spd_ipv4_filter_1 = v4PolicyObj;
        deviceAllData.spdinfo.spd_ipv4_filter_2 = v4PolicyObj2;
        deviceAllData.spdinfo.spd_ipv4_filter   = v4PolicyObj3;

        // IPv4 주소변환 정책 저장 ========================================================================================================================================================

        var v4Nat            = tmpPolicy.getAt(3).get('value');
        var v4NatObj         = {};

        v4NatObj['#text']    = (v4Nat.name === undefined) ? v4Nat['#text'] : v4Nat.name;
        v4NatObj['@cid']     = v4Nat['@cid'];

        deviceAllData.spdinfo.spd_ipv4_nat = v4NatObj;

        // IPv6 필터링 정책 저장 ==========================================================================================================================================================

        var v6Policy         = tmpPolicy.getAt(4).get('value');
        var v6PolicyObj      = {};

        v6PolicyObj['#text'] = (v6Policy.name === undefined) ? v6Policy['#text'] : v6Policy.name;
        v6PolicyObj['@cid']  = v6Policy['@cid'];

        deviceAllData.spdinfo.spd_ipv6_filter = v6PolicyObj;

        // IPv6 주소변환 정책 저장 ========================================================================================================================================================

        var v6Nat            = tmpPolicy.getAt(5).get('value');
        var v6NatObj         = {};

        v6NatObj['#text']    = (v6Nat.name === undefined) ? v6Nat['#text'] : v6Nat.name;
        v6NatObj['@cid']     = v6Nat['@cid'];

        deviceAllData.spdinfo.spd_ipv6_nat = v6NatObj;

        // DPI 패턴 저장 ================================================================================================================================================================

        var dpiPat           = tmpPolicy.getAt(6).get('value');
        var dpiPatObj        = {};

        dpiPatObj['#text']   = (dpiPat.name === undefined) ? dpiPat['#text'] : dpiPat.name;
        dpiPatObj['@cid']    = dpiPat['@cid'];

        deviceAllData.spdinfo.spd_ips_pattern = dpiPatObj;

        // URL 필터 저장 ================================================================================================================================================================

        var urlPolicy        = tmpPolicy.getAt(7).get('value');
        var urlPolObj        = {};

        urlPolObj['#text']   = (urlPolicy.name === undefined) ? urlPolicy['#text'] : urlPolicy.name;
        urlPolObj['@cid']    = urlPolicy['@cid'];

        deviceAllData.spdinfo.svc_url = urlPolObj;

        // White / Black IP 저장 ========================================================================================================================================================

        var wbIP           = tmpPolicy.getAt(8).get('value');
        var wbIPObj        = {};

        wbIPObj['#text']   = (wbIP.name === undefined) ? wbIP['#text'] : wbIP.name;
        wbIPObj['@cid']    = wbIP['@cid'];

        deviceAllData.spdinfo.spd_whiteblack = wbIPObj;

        // VLAN 저장 ====================================================================================================================================================================

        if(vlanPolicy.count() === 1){

            var tmp = vlanPolicy.data.items[0].data['@id'];

            vlanPolicy.data.items[0].data.id = tmp;

            delete vlanPolicy.data.items[0].data['@id'];

            deviceAllData.spdinfo.vlan_setting = (vlanPolicy.data.items[0].data);

        }
        else if(vlanPolicy.count() > 1){

            var vlanArray = [];

            Ext.each(vlanPolicy.data.items, function(vlanData, index){

                var tmp = vlanData.data['@id'];

                vlanData.data.id = tmp;

                delete vlanData.data['@id'];

                vlanArray.push(vlanData.data);

            });

            deviceAllData.spdinfo.vlan_setting = vlanArray;

        }
        else{

            deviceAllData.spdinfo.vlan_setting = null;

            return true;

        }

        return true;
    },

    initStore: function() {
        var vlanStore   = Ext.getStore('st_policy_vlan');

        vlanStore.removeAll();
    }

});