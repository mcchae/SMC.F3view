
Ext.define('SSL.view.win_ssl_export_log', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.button.Cycle',
        'Ext.menu.Menu',
        'Ext.menu.CheckItem'
    ],

    height: 193,
    id: 'win_ssl_export_log',
    width: 402,
    title: '파일 다운로드',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    margin: '6 6 0 6',
                    items: [
                        {
                            xtype: 'container',
                            height: 8
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txt_ssl_export_excel_name',
                                    width: 355,
                                    fieldLabel: '파일 이름'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    id: 'txt_ssl_export_excel_start',
                                    width: 222,
                                    fieldLabel: '쪽 범위'
                                },
                                {
                                    xtype: 'numberfield',
                                    id: 'txt_ssl_export_excel_end',
                                    width: 133,
                                    fieldLabel: '~',
                                    labelAlign: 'right',
                                    labelSeparator: ' ',
                                    labelWidth: 15
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 7
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 105,
                                    text: '파일 형식'
                                },
                                {
                                    xtype: 'cycle',
                                    id: 'cb_ssl_export_excel_type',
                                    width: 116,
                                    showText: true,
                                    menu: {
                                        xtype: 'menu',
                                        width: 120,
                                        items: [
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: 'csv',
                                                text: 'CSV'
                                            },
                                            {
                                                xtype: 'menucheckitem',
                                                stateId: 'excel',
                                                text: 'Excel'
                                            }
                                        ]
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 6
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 10
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
                            flex: 1,
                            text: '다운로드',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
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
                            flex: 1,
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
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_ssl_export_logAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        name = Ext.getCmp('txt_ssl_export_excel_name').getValue();
        start = Ext.getCmp('txt_ssl_export_excel_start').getValue();
        end = Ext.getCmp('txt_ssl_export_excel_end').getValue();

        var filetype = Ext.getCmp('cb_ssl_export_excel_type').activeItem.stateId;

        var pnl_ssl_log_main = Ext.getCmp('pnl_ssl_log').getComponent('pnl_ssl_log_main');
        var query = pnl_ssl_log_main.getComponent('gpn_ssl_log').query;

        if (filetype === 'csv')
        {
            var path = '/export/' + name + '.csv';

            if (start > end)
            {
                Ext.Msg.show({
                    title : '파일 다운로드',
                    msg : '페이지 설정이 잘못 되었습니다.',
                    buttons : Ext.Msg.OK
                });
                return;
            }

            if (name === '')
            {
                Ext.Msg.show({
                    title : '파일 다운로드',
                    msg : '파일이름을 입력 하세요.',
                    buttons : Ext.Msg.OK
                });
                return;
            }

            Ext.Ajax.request(
                {
                    url : 'api/ftSSL/GetCSVLog',
                    params : {
                        name : Ext.encode(name),
                        query : Ext.encode(query),
                        skip : start,
                        limit : end
                    },
                    success : function(res_data)
                    {
                        Ext.DomHelper.append(document.body, {
                            tag: 'iframe',
                            frameBorder: 0,
                            width: 0,
                            height: 0,
                            src: path
                        });
                    }
                });

            Ext.getCmp('win_ssl_export_log').close();
        }
        else
        {
            var path = '/export/' + name + '.xlsx';

            if (start > end)
            {
                Ext.Msg.show({
                    title : '파일 다운로드',
                    msg : '페이지 설정이 잘못 되었습니다.',
                    buttons : Ext.Msg.OK
                });
                return;
            }

            if (name === '')
            {
                Ext.Msg.show({
                    title : '파일 다운로드',
                    msg : '파일이름을 입력 하세요.',
                    buttons : Ext.Msg.OK
                });
                return;
            }

            Ext.Ajax.request(
                {
                    url : 'api/ftSSL/GetExportLog',
                    params : {
                        name : Ext.encode(name),
                        query : Ext.encode(query),
                        skip : start,
                        limit : end
                    },
                    success : function(res_data)
                    {
                        Ext.DomHelper.append(document.body, {
                            tag: 'iframe',
                            frameBorder: 0,
                            width: 0,
                            height: 0,
                            src: path
                        });
                    }
                });

            Ext.getCmp('win_ssl_export_log').close();
        }

    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_ssl_export_log').close();

    },

    onWin_ssl_export_logAfterRender: function(component, eOpts) {
        var st = Ext.getStore('st_ssl_log');
        page = (parseInt(st.totalCount / 50));

        Ext.getCmp('txt_ssl_export_excel_start').minValue = 1;
        Ext.getCmp('txt_ssl_export_excel_end').minValue = 1;

        Ext.getCmp('txt_ssl_export_excel_start').maxValue = page + 1;
        Ext.getCmp('txt_ssl_export_excel_end').maxValue = page + 1;

    }

});