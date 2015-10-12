
Ext.define('SMC.view.pnl_setting_report', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_report',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    id: 'pnl_setting_report',
    bodyBorder: false,
    title: '감사 보고서',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'toolbar',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_audit_period',
                                    width: 80,
                                    editable: false,
                                    displayField: 'period_text',
                                    queryMode: 'local',
                                    store: 'st_SettingPeriod',
                                    valueField: 'period_value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_audit_periodChange1,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '시작 시간 : '
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'dtf_period_start',
                                    width: 120,
                                    labelPad: 1,
                                    editable: false,
                                    format: 'Y-m-d '
                                },
                                {
                                    xtype: 'timefield',
                                    itemId: 'tmf_time_start',
                                    width: 80,
                                    editable: false,
                                    typeAhead: true,
                                    format: 'H:i',
                                    increment: 1
                                },
                                {
                                    xtype: 'label',
                                    text: '~'
                                },
                                {
                                    xtype: 'label',
                                    text: '끝 시간 : '
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'dtf_period_end',
                                    width: 120,
                                    labelPad: 1,
                                    labelSeparator: '',
                                    labelWidth: 10,
                                    editable: false,
                                    format: 'Y-m-d'
                                },
                                {
                                    xtype: 'timefield',
                                    itemId: 'tmf_time_end',
                                    width: 80,
                                    editable: false,
                                    typeAhead: true,
                                    format: 'H:i',
                                    increment: 1
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = Ext.getCmp('pnl_setting_report');

                                        var audit_store = me.down('gridpanel[itemId="gpn_setting_audit_report"]').getStore();
                                        var start = me.down('datefield[itemId="dtf_period_start"]').getValue();
                                        var end = me.down('datefield[itemId="dtf_period_end"]').getValue();
                                        var start_time = me.down('timefield[itemId="tmf_time_start"]').getSubmitValue().split(':');
                                        var end_time = me.down('timefield[itemId="tmf_time_end"]').getSubmitValue().split(':');
                                        var condition = {};

                                        me.down('gridpanel[itemId="gpn_setting_audit_report"]').show();

                                        start.setHours(start_time[0], start_time[1], 00);

                                        end.setHours(end_time[0], end_time[1], 00);

                                        if(start && end)
                                        {
                                            condition.s_ts = start.getTime()/1000;
                                            condition.e_ts = end.getTime()/1000;
                                        }

                                        audit_store.getProxy().setExtraParam('condition', Ext.encode(condition));

                                        audit_store.load();
                                    },
                                    width: 100,
                                    text: '검색'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = Ext.getCmp('pnl_setting_report');

                                        var selected_report = me.down('gridpanel[itemId="gpn_setting_audit_report"]').getSelectionModel().getSelection();
                                        var urlArray = [];

                                        if(selected_report.length < 1)
                                        {
                                            alertMessage('다운로드할 보고서를 선택하십시오.');
                                        }

                                        Ext.each(selected_report, function(data, idx){
                                            urlArray.push(data.data.url);
                                        });

                                        Ext.each(urlArray, function(data, idx){

                                            makeFrame('/fileDownload?filePath=' + data);

                                        });

                                        function makeFrame( url )
                                        {
                                            ifrm = document.createElement( "IFRAME" );
                                            ifrm.setAttribute( "style", "display:none;" ) ;
                                            ifrm.setAttribute( "src", url ) ;
                                            ifrm.style.width = 0+"px";
                                            ifrm.style.height = 0+"px";
                                            document.body.appendChild( ifrm ) ;

                                        }

                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '다운로드'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    border: false,
                    hidden: true,
                    itemId: 'gpn_setting_audit_report',
                    overflowX: 'auto',
                    overflowY: 'auto',
                    header: false,
                    title: 'My Grid Panel',
                    store: 'st_SettingAuditReport',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 220,
                            dataIndex: 'ts',
                            text: '생성시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            dataIndex: 'type',
                            text: '종류'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '보고서명',
                            flex: 1
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    })
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_setting_reportAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_audit_periodChange1: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var today = new Date();
        var start;

        switch(newValue)
        {
            case 'day':

                start = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);

                me.down('datefield[itemId="dtf_period_start"]').setValue(start);
                me.down('datefield[itemId="dtf_period_end"]').setValue(today);

                me.down('timefield[itemId="tmf_time_start"]').setValue('00:00');
                me.down('timefield[itemId="tmf_time_end"]').setValue('23:59');
                break;
            case 'week':

                start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+1);

                me.down('datefield[itemId="dtf_period_start"]').setValue(start);
                me.down('datefield[itemId="dtf_period_end"]').setValue(today);

                me.down('timefield[itemId="tmf_time_start"]').setValue('00:00');
                me.down('timefield[itemId="tmf_time_end"]').setValue('23:59');
                break;
            case 'month':

                start = new Date(today.getFullYear(), today.getMonth(), 1);

                me.down('datefield[itemId="dtf_period_start"]').setValue(start);
                me.down('datefield[itemId="dtf_period_end"]').setValue(today);

                me.down('timefield[itemId="tmf_time_start"]').setValue('00:00');
                me.down('timefield[itemId="tmf_time_end"]').setValue('23:59');
                break;
        }
    },

    onPnl_setting_reportAfterRender: function(component, eOpts) {
        component.down('combobox[itemId="cmb_audit_period"]').select(component.down('combobox[itemId="cmb_audit_period"]').getStore().getAt(0));

    }

});