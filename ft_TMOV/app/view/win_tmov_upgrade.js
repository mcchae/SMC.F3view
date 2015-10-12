
Ext.define('TMOV.view.win_tmov_upgrade', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    height: 350,
    id: 'win_tmov_upgrade',
    width: 800,
    title: '장비 업그레이드',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'gpn_tmov_upgrade',
                    header: false,
                    title: 'My Grid Panel',
                    store: 'st_tmov_upgrade',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'filefield',
                                            buttonMargin: 0,
                                            buttonOnly: true,
                                            buttonConfig: {
                                                xtype: 'filebutton',
                                                width: 80,
                                                text: '파일 추가'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_upgrade_file_delete',
                                            width: 80,
                                            text: '파일 삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_upgrade_file_deleteClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'type',
                            text: '장비 종류'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'cpu',
                            text: 'CPU'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            dataIndex: 'version',
                            text: '버전'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'filename',
                            text: '파일 명',
                            flex: 1
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    })
                },
                {
                    xtype: 'container',
                    padding: 5,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            id: 'btn_upgrade_file',
                            width: 80,
                            text: '전송',
                            listeners: {
                                click: {
                                    fn: me.onBtn_upgrade_fileClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            id: 'btn_close_upgrade_file',
                            width: 80,
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onBtn_close_upgrade_fileClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBtn_upgrade_file_deleteClick: function(button, e, eOpts) {

    },

    onBtn_upgrade_fileClick: function(button, e, eOpts) {

    },

    onBtn_close_upgrade_fileClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_upgrade').close();
    }

});