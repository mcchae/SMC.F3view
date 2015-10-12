
Ext.define('SMC4ZEN.view.win_smc_zensendpolicy', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_smc_zensendpolicy',

    requires: [
        'SMC4ZEN.view.win_smc_zensendpolicyViewModel',
        'SMC4ZEN.view.win_smc_zensendpolicyViewController',
        'Ext.form.field.Display',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.grid.plugin.BufferedRenderer',
        'Ext.ProgressBar',
        'Ext.button.Button'
    ],

    config: {
        policyTask: {
            
        },
        sendcount: 0
    },

    controller: 'win_smc_zensendpolicy',
    viewModel: {
        type: 'win_xtm_sendpolicy'
    },
    height: 300,
    hidden: false,
    id: 'win_smc_zensendpolicy',
    width: 800,
    bodyPadding: 5,
    title: '정책 전송 장비 목록',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: {
            fn: 'onWin_zen_sendpolicyAfterRender',
            scope: 'controller'
        },
        beforedestroy: {
            fn: 'onWin_zen_sendpolicyBeforeDestroy',
            scope: 'controller'
        }
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        itemId: 'ctn_policy_state',
                        margin: '5, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'displayfield',
                                reference: 'zen_dev_sendpolicysummary',
                                id: 'dpf_summary',
                                width: 500,
                                fieldLabel: ''
                            }
                        ]
                    },
                    {
                        xtype: 'gridpanel',
                        selectRecords: [
                            
                        ],
                        selectIndex: [
                            
                        ],
                        flex: 1,
                        reference: 'zen_dev_sendpolicylist',
                        id: 'gpn_policy_list',
                        itemId: 'gpn_policy_list',
                        margin: '0, 0, 5, 0',
                        title: '',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                text: '장비명',
                                flex: 1.5
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'ip',
                                text: 'IP 주소',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return DEVICE_STATUS[value];
                                },
                                align: 'center',
                                dataIndex: 'run_state',
                                text: '장비 상태',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                sortable: true,
                                align: 'center',
                                dataIndex: 'spd_progress',
                                text: '전송 결과',
                                flex: 1.5
                            },
                            {
                                xtype: 'gridcolumn',
                                align: 'center',
                                dataIndex: 'spd_result',
                                text: '정보',
                                flex: 1.5
                            }
                        ],
                        viewConfig: {
                            listeners: {
                                refresh: 'onViewRefresh'
                            }
                        },
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        }),
                        plugins: [
                            Ext.create('Ext.grid.plugin.BufferedRenderer', {
                                pluginId: 'plg_policy_buffered',
                                leadingBufferZone: 200,
                                trailingBufferZone: 200
                            })
                        ],
                        listeners: {
                            render: {
                                fn: 'onGpn_policy_listRender',
                                scope: 'controller'
                            }
                        }
                    },
                    {
                        xtype: 'container',
                        itemId: 'ctn_policy_progress',
                        margin: '0, 0, 5, 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'progressbar',
                                flex: 1,
                                reference: 'zen_dev_sendpolicystate',
                                cls: 'progress_sp_style',
                                itemId: 'pgb_policyprogress',
                                animate: true
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        itemId: 'ctn_policy_control',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                            pack: 'end'
                        },
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'bt_send',
                                margin: '0, 5, 0, 0',
                                width: 100,
                                text: '전 송',
                                listeners: {
                                    click: {
                                        fn: 'onBt_sendClick',
                                        scope: 'controller'
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'bt_close',
                                width: 100,
                                text: '닫 기',
                                listeners: {
                                    click: {
                                        fn: 'onBt_closeClick',
                                        scope: 'controller'
                                    }
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

    onViewRefresh: function(dataview, eOpts) {
        // onViewRefresh =================================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 :
        //
        // ===============================================================================================================================================================================

        var component = Ext.getCmp('gpn_policy_list');

        if (0 >= component.selectRecords.length) {

            return;

        }

        var newRecordsToSelect = [];

        for (var i = 0, max = component.selectIndex.length; i < max; i++) {

            var record = component.getStore().getAt(component.selectIndex[i]);

            if (!Ext.isEmpty(record)) {

                newRecordsToSelect.push(record);

            }

        }

        component.getSelectionModel().select(newRecordsToSelect);
    }

});