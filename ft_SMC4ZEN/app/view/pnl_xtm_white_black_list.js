
Ext.define('SMC4ZEN.view.pnl_xtm_white_black_list', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.field.Text',
        'Ext.tab.Panel',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.tab.Tab'
    ],

    closable: true,

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
                    margin: 3,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var me = button.up('panel');

                                me.saveData();
                            },
                            disabled: true,
                            itemId: 'btn_save',
                            margin: 5,
                            width: 100,
                            text: '저장'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    margin: '0 3 3 3',
                    header: false,
                    title: 'IP검색',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txf_ip_search',
                            margin: 5,
                            maxWidth: 400,
                            width: 300,
                            fieldLabel: 'IP',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var me = button.up('panel').up('panel');

                                var list_store;
                                var search_text = me.down('textfield[itemId="txf_ip_search"]').getValue();
                                var active_tab = me.down('tabpanel[itemId="tpn_white_black_list"]').getActiveTab();

                                if(active_tab.itemId === 'pnl_white_list')
                                {
                                    list_store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();
                                }
                                else if(active_tab.itemId === 'pnl_black_list')
                                {
                                    list_store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();
                                }

                                list_store.clearFilter(true);

                                if(search_text === '')
                                {
                                    list_store.filterBy(function(record){

                                        return true;
                                    });
                                }
                                else
                                {
                                    list_store.filterBy(function(record){

                                        if(record.data.ip === search_text)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }
                                    });
                                }
                            },
                            margin: 5,
                            width: 100,
                            text: '검색'
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txf_desc_search',
                            margin: 5,
                            maxWidth: 400,
                            fieldLabel: '설명',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var me = button.up('panel').up('panel');

                                var list_store;
                                var search_text = me.down('textfield[itemId="txf_ip_search"]').getValue();
                                var active_tab = me.down('tabpanel[itemId="tpn_white_black_list"]').getActiveTab();

                                if(active_tab.itemId === 'pnl_white_list')
                                {
                                    list_store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();
                                }
                                else if(active_tab.itemId === 'pnl_black_list')
                                {
                                    list_store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();
                                }

                                list_store.clearFilter(true);

                                if(search_text !== '')
                                {
                                    list_store.filterBy(function(record){

                                        if(record.data.desc === search_text)
                                        {
                                            return true;
                                        }
                                        else
                                        {
                                            return false;
                                        }
                                    });
                                }
                            },
                            margin: 5,
                            width: 100,
                            text: '검색'
                        }
                    ]
                },
                {
                    xtype: 'tabpanel',
                    flex: 1,
                    itemId: 'tpn_white_black_list',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'pnl_white_list',
                            title: 'White IP',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    border: 0,
                                    margin: 5,
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '10 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var retValue;

                                                        retValue = CheckNotNull(value);

                                                        if(!retValue){return true; }

                                                        if(value.match(','))
                                                        {
                                                            var val_array = value.split(",");

                                                            for(var i=0; i<val_array.length; i++)
                                                            {
                                                                retValue = validIPForm(val_array[i], 'v4');

                                                                if(!retValue)
                                                                {
                                                                    if(val_array[i].match('/'))
                                                                    {
                                                                        retValue = ValidIPv6(val_array[i].split('/')[0]);
                                                                    }
                                                                    else
                                                                    {
                                                                        retValue = ValidIPv6(val_array[i]);
                                                                    }
                                                                }

                                                                if(!retValue){ return false; }

                                                                if(val_array[i].match("-")){
                                                                    var ip_arr = val_array[i].split('-');
                                                                    var first_arr = ip_arr[0].split('.');
                                                                    var last_arr = ip_arr[1].split('.');

                                                                    if(parseInt(first_arr[0]) > parseInt(last_arr[0])){return false;}
                                                                    else if(parseInt(first_arr[0]) === parseInt(last_arr[0]) && parseInt(first_arr[1]) > parseInt(last_arr[1])){return false;}
                                                                    else if(parseInt(first_arr[1]) === parseInt(last_arr[1]) && parseInt(first_arr[2]) > parseInt(last_arr[2])){return false;}
                                                                    else if(parseInt(first_arr[2]) === parseInt(last_arr[2]) && parseInt(first_arr[3]) > parseInt(last_arr[3])){return false;}
                                                                }
                                                            }
                                                        }
                                                        else
                                                        {
                                                            retValue = validIPForm(value, 'v4');

                                                            if(!retValue)
                                                            {
                                                                if(value.match('/'))
                                                                {
                                                                    retValue = ValidIPv6(value.split('/')[0]);
                                                                }
                                                                else
                                                                {
                                                                    retValue = ValidIPv6(value);
                                                                }
                                                            }

                                                            if(!retValue){ return false; }

                                                            if(value.match("-")){
                                                                var ip_arr = value.split('-');
                                                                var first_arr = ip_arr[0].split('.');
                                                                var last_arr = ip_arr[1].split('.');

                                                                if(parseInt(first_arr[0]) > parseInt(last_arr[0])){return false;}
                                                                else if(parseInt(first_arr[0]) === parseInt(last_arr[0]) && parseInt(first_arr[1]) > parseInt(last_arr[1])){return false;}
                                                                else if(parseInt(first_arr[1]) === parseInt(last_arr[1]) && parseInt(first_arr[2]) > parseInt(last_arr[2])){return false;}
                                                                else if(parseInt(first_arr[2]) === parseInt(last_arr[2]) && parseInt(first_arr[3]) > parseInt(last_arr[3])){return false;}
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'txf_white_ip',
                                                    fieldLabel: 'IP',
                                                    labelWidth: 50
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_white_desc',
                                                    fieldLabel: '설명',
                                                    labelWidth: 50
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('panel').up('panel').up('panel');

                                                                var create = unixTimeConvert((new Date().getTime()/1000) , 'YMD');
                                                                var arr_ip = [];
                                                                var white_store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();
                                                                var black_store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();

                                                                if(me.down('textfield[itemId="txf_white_ip"]').getValue())
                                                                {
                                                                    if(me.down('textfield[itemId="txf_white_ip"]').validate())
                                                                    {
                                                                        arr_ip = me.down('textfield[itemId="txf_white_ip"]').getValue().split(',');
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_white_ip"]'));
                                                                        return false;
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    alertMessage('IP주소를 입력하십시오.', me.down('textfield[itemId="txf_white_ip"]'));
                                                                    return false;
                                                                }

                                                                Ext.each(arr_ip, function(ip, idx){

                                                                    if(Object_DuplicateCheck(ip, 'ip', white_store) && Object_DuplicateCheck(ip, 'ip', black_store))
                                                                    {
                                                                        white_store.add({
                                                                            'create' : create,
                                                                            'ip' : ip,
                                                                            'desc' : me.down('textfield[itemId="txf_white_desc"]').getValue()
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('같은 IP주소가 이미 있습니다.', me.down('textfield[itemId="txf_white_ip"]'));
                                                                    }
                                                                });

                                                                if(me.down('button[itemId="btn_save"]').disabled)
                                                                {
                                                                    me.down('button[itemId="btn_save"]').enable();
                                                                }
                                                            },
                                                            margin: '0 5 0 10',
                                                            width: 100,
                                                            text: '추가'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('panel').up('panel').up('panel');

                                                                var record = me.down('gridpanel[itemId="gpn_white_list"]').getSelectionModel().getSelection();
                                                                var store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();

                                                                if(record)
                                                                {
                                                                    Ext.each(record, function(record_data, idx){

                                                                        delObject(record_data, 'ip', store);
                                                                    });

                                                                    if(me.down('button[itemId="btn_save"]').disabled)
                                                                    {
                                                                        me.down('button[itemId="btn_save"]').enable();
                                                                    }
                                                                }
                                                            },
                                                            margin: '0 5 0 0',
                                                            width: 100,
                                                            text: '삭제'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            html: '<input type="file" name="파일 열기" style="display:none;" accept=".txt"/>',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onContainerAfterRender1,
                                                                    scope: me
                                                                }
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    margin: '0 5 0 0',
                                                                    width: 100,
                                                                    text: '파일로 추가',
                                                                    tooltip: '파일(.txt)에 다음과 같은 형태로 입력하여 사용합니다<br/>IP<br/>IP,설명<br/>...',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onButtonClick1,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: '0 5 0 0',
                                                            width: 100,
                                                            text: '파일로 저장',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onButtonClick2,
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
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_white_list',
                                    overflowX: 'auto',
                                    header: false,
                                    title: 'My Grid Panel',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            align: 'center',
                                            text: 'No',
                                            flex: 0.25
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'create',
                                            text: '등록일',
                                            flex: 0.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ip',
                                            text: 'IP',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'desc',
                                            text: '설명',
                                            flex: 2
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            itemId: 'pnl_black_list',
                            title: 'Black IP',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    border: 0,
                                    margin: 5,
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '10 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var retValue;

                                                        retValue = CheckNotNull(value);

                                                        if(!retValue){return true; }

                                                        if(value.match(','))
                                                        {
                                                            var val_array = value.split(",");

                                                            for(var i=0; i<val_array.length; i++)
                                                            {
                                                                retValue = validIPForm(val_array[i], 'v4');

                                                                if(!retValue)
                                                                {
                                                                    if(val_array[i].match('/'))
                                                                    {
                                                                        retValue = ValidIPv6(val_array[i].split('/')[0]);
                                                                    }
                                                                    else
                                                                    {
                                                                        retValue = ValidIPv6(val_array[i]);
                                                                    }
                                                                }

                                                                if(!retValue){ return false; }

                                                                if(val_array[i].match("-")){
                                                                    var ip_arr = val_array[i].split('-');
                                                                    var first_arr = ip_arr[0].split('.');
                                                                    var last_arr = ip_arr[1].split('.');

                                                                    if(parseInt(first_arr[0]) > parseInt(last_arr[0])){return false;}
                                                                    else if(parseInt(first_arr[0]) === parseInt(last_arr[0]) && parseInt(first_arr[1]) > parseInt(last_arr[1])){return false;}
                                                                    else if(parseInt(first_arr[1]) === parseInt(last_arr[1]) && parseInt(first_arr[2]) > parseInt(last_arr[2])){return false;}
                                                                    else if(parseInt(first_arr[2]) === parseInt(last_arr[2]) && parseInt(first_arr[3]) > parseInt(last_arr[3])){return false;}
                                                                }
                                                            }
                                                        }
                                                        else
                                                        {
                                                            retValue = validIPForm(value, 'v4');

                                                            if(!retValue)
                                                            {
                                                                if(value.match('/'))
                                                                {
                                                                    retValue = ValidIPv6(value.split('/')[0]);
                                                                }
                                                                else
                                                                {
                                                                    retValue = ValidIPv6(value);
                                                                }
                                                            }

                                                            if(!retValue){ return false; }

                                                            if(value.match("-")){
                                                                var ip_arr = value.split('-');
                                                                var first_arr = ip_arr[0].split('.');
                                                                var last_arr = ip_arr[1].split('.');

                                                                if(parseInt(first_arr[0]) > parseInt(last_arr[0])){return false;}
                                                                else if(parseInt(first_arr[0]) === parseInt(last_arr[0]) && parseInt(first_arr[1]) > parseInt(last_arr[1])){return false;}
                                                                else if(parseInt(first_arr[1]) === parseInt(last_arr[1]) && parseInt(first_arr[2]) > parseInt(last_arr[2])){return false;}
                                                                else if(parseInt(first_arr[2]) === parseInt(last_arr[2]) && parseInt(first_arr[3]) > parseInt(last_arr[3])){return false;}
                                                            }
                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'txf_black_ip',
                                                    fieldLabel: 'IP',
                                                    labelWidth: 50
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_black_desc',
                                                    fieldLabel: '설명',
                                                    labelWidth: 50
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('panel').up('panel').up('panel');

                                                                var create = unixTimeConvert((new Date().getTime()/1000) , 'YMD');
                                                                var arr_ip = [];
                                                                var white_store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();
                                                                var black_store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();

                                                                if(me.down('textfield[itemId="txf_black_ip"]').getValue())
                                                                {
                                                                    if(me.down('textfield[itemId="txf_black_ip"]').validate())
                                                                    {
                                                                        arr_ip = me.down('textfield[itemId="txf_black_ip"]').getValue().split(',');
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_black_ip"]'));
                                                                        return false;
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    alertMessage('IP주소를 입력하십시오.', me.down('textfield[itemId="txf_black_ip"]'));
                                                                    return false;
                                                                }

                                                                Ext.each(arr_ip, function(ip, idx){

                                                                    if(Object_DuplicateCheck(ip, 'ip', white_store) && Object_DuplicateCheck(ip, 'ip', black_store))
                                                                    {
                                                                        black_store.add({
                                                                            'create' : create,
                                                                            'ip' : ip,
                                                                            'desc' : me.down('textfield[itemId="txf_black_desc"]').getValue()
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('같은 IP주소가 이미 있습니다.', me.down('textfield[itemId="txf_black_ip"]'));
                                                                    }
                                                                });

                                                                if(me.down('button[itemId="btn_save"]').disabled)
                                                                {
                                                                    me.down('button[itemId="btn_save"]').enable();
                                                                }
                                                            },
                                                            margin: '0 5 0 10',
                                                            width: 100,
                                                            text: '추가'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('panel').up('panel').up('panel');

                                                                var record = me.down('gridpanel[itemId="gpn_black_list"]').getSelectionModel().getSelection();
                                                                var store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();

                                                                if(record)
                                                                {
                                                                    Ext.each(record, function(record_data, idx){

                                                                        delObject(record_data, 'ip', store);
                                                                    });

                                                                    if(me.down('button[itemId="btn_save"]').disabled)
                                                                    {
                                                                        me.down('button[itemId="btn_save"]').enable();
                                                                    }
                                                                }
                                                            },
                                                            margin: '0 5 0 0',
                                                            width: 100,
                                                            text: '삭제'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            html: '<input type="file" name="파일 열기" style="display:none;" accept=".txt"/>',
                                                            listeners: {
                                                                afterrender: {
                                                                    fn: me.onContainerAfterRender11,
                                                                    scope: me
                                                                }
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    margin: '0 5 0 0',
                                                                    width: 100,
                                                                    text: '파일로 추가',
                                                                    tooltip: '파일(.txt)에 다음과 같은 형태로 입력하여 사용합니다<br/>IP<br/>IP,설명<br/>...',
                                                                    listeners: {
                                                                        click: {
                                                                            fn: me.onButtonClick11,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            margin: '0 5 0 0',
                                                            width: 100,
                                                            text: '파일로 저장',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onButtonClick21,
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
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_black_list',
                                    overflowX: 'auto',
                                    header: false,
                                    title: 'My Grid Panel',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            align: 'center',
                                            text: 'No',
                                            flex: 0.25
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'create',
                                            text: '등록일',
                                            flex: 0.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ip',
                                            text: 'IP',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'desc',
                                            text: '설명',
                                            flex: 2
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onContainerAfterRender1: function(component, eOpts) {
        var me = this;

        function trim(str) {

            return str.replace(/(\r\n| )/g,"");

        }

        function clearScript() {

            if(component.getEl().dom.getElementsByTagName("input")[0].value)
            {
                component.getEl().dom.getElementsByTagName("input")[0].value = '';
            }
        }

        function readScript(evt) {

            var files = evt.target.files,

                reader = new FileReader();

            reader.onload = function() {

                var result = this.result;
                var obj_data;
                var data_array;
                var ip_string;
                var result_array;
                var type_string;
                var version_string;
                var error_check = 0;
                var error_text = '';
                var white_store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();
                var black_store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();

                if(result)
                {
                    var create = unixTimeConvert((new Date().getTime()/1000) , 'YMD');

                    result_array = result.split(/[\r\n]+/g);

                    for(var i=0; i<result_array.length; i++)
                    {
                        result_array[i] = trim(result_array[i]);

                        if(result_array[i] === '')
                        {
                            result_array.splice(i, 1);
                            i = -1;
                        }
                    }

                    Ext.each(result_array, function(data, idx){

                        obj_data = {};
                        ip_string = '';
                        data_array = data.split(',');


                        if(data_array.length > 2)
                        {
                            error_check += 1;

                            if(error_check < 20)
                            {
                                error_text += 'Invalid IP : ' + data + '<br/>';
                            }
                            else if(error_check === 20)
                            {
                                 error_text += '...<br/>';
                            }

                            return true;
                        }

                        if(!validIPForm(data_array[0], 'v4'))
                        {
                            error_check += 1;

                            if(error_check < 20)
                            {
                                error_text += 'Invalid IP : ' + data + '<br/>';
                            }
                            else if(error_check === 20)
                            {
                                 error_text += '...<br/>';
                            }

                            return true;
                        }
                        else
                        {
                            obj_data.ip = data_array[0];
                        }

                        if(!Object_DuplicateCheck(obj_data.ip, 'ip', white_store) || !Object_DuplicateCheck(obj_data.ip, 'ip', black_store))
                        {
                            error_check += 1;

                            if(error_check < 20)
                            {
                                error_text += 'Duplicate IP : ' + data + '<br/>';
                            }
                            else if(error_check === 20)
                            {
                                error_text += '...<br/>';
                            }

                            return true;
                        }

                        obj_data.create = create;

                        obj_data.desc = data_array[1];

                        console.log('obj_data - ', obj_data);

                        console.log('white_store - ', white_store);
                        console.log('white_store2 - ', me.down('gridpanel[itemId="gpn_white_list"]').getStore());

                        white_store.add(obj_data);

                    });

                    if(error_check > 0)
                    {
                        alertMessage(error_text + '<br/>IP 정보가 올바르지 않은 IP는 저장되지 않았습니다.<br/>파일에서 IP 정보를 수정하고 다시 저장하십시오.');
                    }

                    if(me.up('panel').up('panel').down('button[itemId="btn_save"]').disabled)
                    {
                        me.up('panel').up('panel').down('button[itemId="btn_save"]').enable();
                    }
                }
            };

            reader.readAsText(files[0]);
        }

        component.getEl().dom.getElementsByTagName("input")[0].addEventListener("change", readScript, false);
        component.getEl().dom.getElementsByTagName("input")[0].addEventListener("click", clearScript, false);
    },

    onButtonClick1: function(button, e, eOpts) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent("click", true, true);
        button.up('container').getEl().dom.getElementsByTagName("input")[0].dispatchEvent(evt);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = button.up('panel').up('panel').up('panel');

        var textToWrite = '';

        var list_store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();

        list_store.each(function(record, idx){

        //     textToWrite += idx + 1;

        //     if(record.data.date)
        //     {
        //         textToWrite += ',' + record.data.date;
        //     }

            if(record.data.ip)
            {
                textToWrite += record.data.ip;
            }

            if(record.data.desc)
            {
                textToWrite += ',' + record.data.desc;
            }

            if((idx + 1) < list_store.getCount())
            {
                textToWrite += '\r\n';
            }
        });

        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = me.title + '.txt';

        var evt = document.createEvent('MouseEvents');
        evt.initEvent("click", true, true);

        if(window.navigator.appName === 'Microsoft Internet Explorer')
        {
            window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
        }

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";

        if (window.webkitURL !== null)
        {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else
        {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        function destroyClickedElement(event)
        {
        	document.body.removeChild(event.target);
        }

        downloadLink.dispatchEvent(evt);
    },

    onContainerAfterRender11: function(component, eOpts) {
        var me = this;

        function trim(str) {

            return str.replace(/(\r\n| )/g,"");

        }

        function clearScript() {

            if(component.getEl().dom.getElementsByTagName("input")[0].value)
            {
                component.getEl().dom.getElementsByTagName("input")[0].value = '';
            }
        }

        function readScript(evt) {

            var files = evt.target.files,

                reader = new FileReader();

            reader.onload = function() {

                var result = this.result;
                var obj_data;
                var data_array;
                var ip_string;
                var result_array;
                var type_string;
                var version_string;
                var error_check = 0;
                var error_text = '';
                var white_store = me.down('gridpanel[itemId="gpn_white_list"]').getStore();
                var black_store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();

                if(result)
                {
                    var create = unixTimeConvert((new Date().getTime()/1000) , 'YMD');

                    result_array = result.split(/[\r\n]+/g);

                    for(var i=0; i<result_array.length; i++)
                    {
                        result_array[i] = trim(result_array[i]);

                        if(result_array[i] === '')
                        {
                            result_array.splice(i, 1);
                            i = -1;
                        }
                    }

                    Ext.each(result_array, function(data, idx){

                        obj_data = {};
                        ip_string = '';
                        data_array = data.split(',');

                        if(data_array.length > 2)
                        {
                            error_check += 1;

                            if(error_check < 20)
                            {
                                error_text += 'Invalid IP : ' + data + '<br/>';
                            }
                            else if(error_check === 20)
                            {
                                 error_text += '...<br/>';
                            }

                            return true;
                        }

                        if(!validIPForm(data_array[0], 'v4'))
                        {
                            error_check += 1;

                            if(error_check < 20)
                            {
                                error_text += 'Invalid IP : ' + data + '<br/>';
                            }
                            else if(error_check === 20)
                            {
                                 error_text += '...<br/>';
                            }

                            return true;
                        }
                        else
                        {
                            obj_data.ip = data_array[0];
                        }

                        if(!Object_DuplicateCheck(obj_data.ip, 'ip', white_store) || !Object_DuplicateCheck(obj_data.ip, 'ip', black_store))
                        {
                            error_check += 1;

                            if(error_check < 20)
                            {
                                error_text += 'Duplicate IP : ' + data + '<br/>';
                            }
                            else if(error_check === 20)
                            {
                                error_text += '...<br/>';
                            }

                            return true;
                        }

                        obj_data.create = create;

                        obj_data.desc = data_array[1];

                        black_store.add(obj_data);

                    });

                    if(error_check > 0)
                    {
                        alertMessage(error_text + '<br/>IP 정보가 올바르지 않은 IP는 저장되지 않았습니다.<br/>파일에서 IP 정보를 수정하고 다시 저장하십시오.');
                    }


                    if(me.up('panel').up('panel').down('button[itemId="btn_save"]').disabled)
                    {
                        me.up('panel').up('panel').down('button[itemId="btn_save"]').enable();
                    }
                }
            };

            reader.readAsText(files[0]);
        }

        component.getEl().dom.getElementsByTagName("input")[0].addEventListener("change", readScript, false);
        component.getEl().dom.getElementsByTagName("input")[0].addEventListener("click", clearScript, false);
    },

    onButtonClick11: function(button, e, eOpts) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent("click", true, true);
        button.up('container').getEl().dom.getElementsByTagName("input")[0].dispatchEvent(evt);
    },

    onButtonClick21: function(button, e, eOpts) {
        var me = button.up('panel').up('panel').up('panel');

        var textToWrite = '';

        var list_store = me.down('gridpanel[itemId="gpn_black_list"]').getStore();

        list_store.each(function(record, idx){

        //     textToWrite += idx + 1;

        //     if(record.data.date)
        //     {
        //         textToWrite += ',' + record.data.date;
        //     }

            if(record.data.ip)
            {
                textToWrite += record.data.ip;
            }

            if(record.data.desc)
            {
                textToWrite += ',' + record.data.desc;
            }

            if((idx + 1) < list_store.getCount())
            {
                textToWrite += '\r\n';
            }
        });

        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var fileNameToSaveAs = me.title + '.txt';

        var evt = document.createEvent('MouseEvents');
        evt.initEvent("click", true, true);

        if(window.navigator.appName === 'Microsoft Internet Explorer')
        {
            window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);
        }

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";

        if (window.webkitURL !== null)
        {
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }
        else
        {
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.onclick = destroyClickedElement;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }

        function destroyClickedElement(event)
        {
        	document.body.removeChild(event.target);
        }

        downloadLink.dispatchEvent(evt);
    },

    onPanelAfterRender: function(component, eOpts) {
        component.bind_store();
        component.loadData();
    },

    bind_store: function() {
        var me = this;

        var white_store = Ext.create('Ext.data.Store', {

            fields: [
                {
                    name: 'create'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'ip'
                }
            ]
        });

        var black_store = Ext.create('Ext.data.Store', {

            fields: [
                {
                    name: 'create'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'ip'
                }
            ]
        });

        me.down('gridpanel[itemId="gpn_white_list"]').bindStore(white_store);
        me.down('gridpanel[itemId="gpn_black_list"]').bindStore(black_store);
    },

    loadData: function() {
        var me = this;

        if(me._policy.blacklist)
        {
            me.down('gridpanel[itemId="gpn_black_list"]').getStore().loadData(me._policy.blacklist);
        }

        if(me._policy.whitelist)
        {
            me.down('gridpanel[itemId="gpn_white_list"]').getStore().loadData(me._policy.whitelist);
        }
    },

    saveData: function() {
        var me = this;

        var white_array = [];
        var black_array = [];

        me.down('gridpanel[itemId="gpn_white_list"]').getStore().clearFilter();

        me.down('gridpanel[itemId="gpn_white_list"]').getStore().each(function(white_record){

            white_array.push(white_record.data);
        });

        me.down('gridpanel[itemId="gpn_black_list"]').getStore().clearFilter();

        me.down('gridpanel[itemId="gpn_black_list"]').getStore().each(function(black_record){

            black_array.push(black_record.data);
        });

        me._policy.whitelist = white_array;

        me._policy.blacklist = black_array;

        request_helper.xmlrpc_call_Ajax_Post(
            'ftSMC',
            'modObject',
            {
                obj : Ext.encode(me._policy)
            },
            function(response){

                var _title = '';
                var _msg = '';
                if(response){
                    _title = 'Success message';
                    _msg = Ext.String.format('저장 되었습니다.');

                    if(!me.down('button[itemId="btn_save"]').disabled)
                    {
                        me.down('button[itemId="btn_save"]').disable();
                    }
                }
                else {
                    _title = 'Failed message';
                    _msg = Ext.String.format('errorMsg : {0}', response);
                }
                Ext.Msg.show({
                    title : _title,
                    msg : _msg,
                    width	: 300,
                    buttons	: Ext.Msg.OK,
                    icon	: Ext.window.MessageBox.INFO
                });
            }
        );
    }

});