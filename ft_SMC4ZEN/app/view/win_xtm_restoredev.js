
Ext.define('SMC4ZEN.view.win_xtm_restoredev', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_xtm_restoredevViewModel',
        'SMC4ZEN.view.win_xtm_restoredevViewController',
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.button.Button'
    ],

    controller: 'win_xtm_restoredev',
    viewModel: {
        type: 'win_xtm_restoredev'
    },
    height: 450,
    id: 'win_xtm_restoredev',
    width: 700,
    bodyPadding: 5,
    title: '삭제된 장비 복원',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: {
            fn: 'onWin_xtm_restoredevAfterRender',
            scope: 'controller'
        },
        beforedestroy: {
            fn: 'onWin_xtm_restoredevBeforeDestroy',
            scope: 'controller'
        }
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        flex: 1,
                        reference: 'xtm_dev_reslist',
                        itemId: 'gpn_restore_devicelist',
                        margin: '10, 0, 5, 0',
                        title: '',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                text: '장비 명',
                                flex: 1
                            },
                            {
                                xtype: 'datecolumn',
                                dataIndex: '_ts',
                                text: '삭제된 날짜',
                                flex: 2,
                                format: 'Y-m-d H:i:s'
                            }
                        ],
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        })
                    },
                    {
                        xtype: 'container',
                        itemId: 'ctn_restore_control',
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                            pack: 'end'
                        },
                        items: [
                            {
                                xtype: 'button',
                                itemId: 'bt_delete',
                                margin: '0, 5, 0, 0',
                                width: 100,
                                text: '완전 삭제',
                                listeners: {
                                    click: {
                                        fn: 'onBt_deleteClick',
                                        scope: 'controller'
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'bt_restore',
                                margin: '0, 5, 0, 0',
                                width: 100,
                                text: '복 원',
                                listeners: {
                                    click: {
                                        fn: 'onBt_restoreClick',
                                        scope: 'controller'
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                itemId: 'bt_close',
                                margin: '0, 0, 0, 0',
                                width: 100,
                                text: '닫 기',
                                listeners: {
                                    click: 'onBt_closeClick'
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

    onBt_closeClick: function(button, e, eOpts) {
        this.destroy();
    }

});