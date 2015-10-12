
Ext.define('SSL.view.win_ssl_restore_log', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.button.Button'
    ],

    height: 560,
    id: 'win_ssl_restore_log',
    width: 520,
    resizable: false,
    title: '리포트 복원',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onWin_ssl_restore_logAfterRender,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'gpn_ssl_restore_log',
                    header: false,
                    store: 'st_ssl_restore_log',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '파일명',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'time',
                            text: '시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if (value > (1024 * 1024 * 1024))
                                {
                                    return (value / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
                                }
                                else if (value > (1024 * 1024))
                                {
                                    return (value / (1024 * 1024)).toFixed(2) + ' MB';
                                }
                                else if (value > 1024)
                                {
                                    return (value / 1024).toFixed(2) + ' KB';
                                }
                                else
                                {
                                    return '1 KB';
                                }


                            },
                            width: 110,
                            align: 'right',
                            dataIndex: 'size',
                            text: '파일 사이즈'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 6
                },
                {
                    xtype: 'container',
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
                            width: 80,
                            text: '복원',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 6
                        },
                        {
                            xtype: 'button',
                            width: 80,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 6
                }
            ]
        });

        me.callParent(arguments);
    },

    onWin_ssl_restore_logAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftSSL/GetBackupList',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_ssl_restore_log').loadData(resObj);
                }
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        var item = Ext.getCmp('gpn_ssl_restore_log').getSelectionModel().getSelection()[0];

        if (item === undefined)
        {
            Ext.MessageBox.show({
                title: '리포트 복원',
                msg: '파일을 선택하세요',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });
        }

        var dbname = item.raw.name;
        var mask = new Ext.LoadMask(Ext.getBody(), {msg : "잠시만 기다려 주세요."});
        mask.show();

        Ext.Ajax.request(
            {
                url : 'api/ftSSL/logRestore',
                params : {
                    dbname : Ext.encode(dbname)
                },
                success : function(res_data)
                {
                    if (mask !== undefined) mask.hide();

                    Ext.MessageBox.show({
                        title: '리포트 복원',
                        msg: '복원 완료 하였습니다.',
                        buttons: Ext.MessageBox.OK,
                        fn: function()
                        {

                            Ext.getCmp('win_ssl_restore_log').close();
                        }
                    });
                }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_ssl_restore_log').close();
    }

});