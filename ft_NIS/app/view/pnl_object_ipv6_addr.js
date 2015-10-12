
Ext.define('SMC.view.pnl_object_ipv6_addr', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.button.Button',
        'Ext.form.Label'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_ipv6_addr',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: 'IPv6 주소',
    maximizable: true,
    modal: true,

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
                    flex: 1,
                    itemId: 'ctn_ipv6_addr',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 0.2,
                                    itemId: 'txf_objectName',
                                    margin: '0 10 0 0 ',
                                    fieldLabel: '객체명',
                                    labelAlign: 'top',
                                    msgTarget: 'none'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: 'IP 주소목록',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 0.4,
                                    margins: '5',
                                    itemId: 'gpn_ipAddress',
                                    header: false,
                                    title: 'My Grid Panel',
                                    store: 'st_ObjectIpGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 220,
                                            defaultWidth: 220,
                                            dataIndex: '#text',
                                            text: 'IP 주소',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        view.up('window[itemId="pnl_object_ipv6_addr"]').down('gridpanel[itemId="gpn_ipAddress"]').getStore().removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        itemclick: {
                                            fn: me.onGpn_ipAddressItemClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.6,
                                    margins: '5',
                                    layout: {
                                        type: 'vbox',
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
                                                        if(val_array[i].match('/'))
                                                        {
                                                            retValue = ValidIPv6(val_array[i].split('/')[0]);
                                                        }
                                                        else
                                                        {
                                                            retValue = ValidIPv6(val_array[i]);
                                                        }

                                                        if(!retValue){ return false; }
                                                    }
                                                }
                                                else
                                                {
                                                    if(value.match('/'))
                                                    {
                                                        retValue = ValidIPv6(value.split('/')[0]);
                                                    }
                                                    else
                                                    {
                                                        retValue = ValidIPv6(value);
                                                    }

                                                    if(!retValue){ return false; }
                                                }
                                                return true;


                                            },
                                            itemId: 'txf_ipAddress',
                                            width: 220,
                                            fieldLabel: 'IP 주소',
                                            labelAlign: 'top',
                                            msgTarget: 'none',
                                            listeners: {
                                                keydown: {
                                                    fn: me.onTxf_ipAddressKeydown,
                                                    scope: me
                                                },
                                                change: {
                                                    fn: me.onTxf_ipAddressChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = this.up('window[itemId="pnl_object_ipv6_addr"]');

                                                        var object_store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
                                                        var txf_ipaddr = me.down('textfield[itemId="txf_ipAddress"]');
                                                        var arr_ip = [];
                                                        var ip_object;

                                                        if(txf_ipaddr.getValue())
                                                        {
                                                            if(txf_ipaddr.validate())
                                                            {
                                                                arr_ip = txf_ipaddr.getValue().split(",");
                                                            }
                                                            else
                                                            {
                                                                alertMessage('IP형식이 올바르지 않습니다.', txf_ipaddr);
                                                                return false;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            arr_ip.push('0:0:0:0:0:0:0:0');
                                                        }

                                                        Ext.each(arr_ip, function(ip, idx){

                                                            if(Object_DuplicateCheck(ip, '#text', object_store))
                                                            {
                                                                object_store.add({
                                                                    '#text': ip,
                                                                    "@version": "v6",
                                                                    "@type": "single"
                                                                });
                                                            }
                                                            else
                                                            {
                                                                alertMessage('같은 IP주소가 이미 있습니다.', txf_ipaddr);
                                                            }
                                                        });
                                                    },
                                                    margin: '1 10 1 1',
                                                    width: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = this.up('window[itemId="pnl_object_ipv6_addr"]');

                                                        var object_grid = me.down('gridpanel[itemId="gpn_ipAddress"]');
                                                        var object_store = object_grid.getStore();
                                                        var txf_ipaddr = me.down('textfield[itemId="txf_ipAddress"]');
                                                        var select_record = me.down('gridpanel[itemId="gpn_ipAddress"]').getSelectionModel().getSelection()[0];
                                                        var row = object_store.indexOf(select_record);
                                                        var arr_ip = [];
                                                        var ip;

                                                        if(txf_ipaddr.getValue())
                                                        {
                                                            if(txf_ipaddr.validate())
                                                            {
                                                                arr_ip = txf_ipaddr.getValue().split(",");
                                                            }
                                                            else
                                                            {
                                                                alertMessage('IP형식이 올바르지 않습니다.', txf_ipaddr);
                                                                return false;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            arr_ip.push('0:0:0:0:0:0:0:0');
                                                        }

                                                        Ext.each(arr_ip, function(ip, idx){

                                                            if(Object_DuplicateCheck(ip, '#text', object_store))
                                                            {
                                                                if(select_record && ip)
                                                                {
                                                                    if(idx === 0)
                                                                    {
                                                                        object_store.each(function(record,idx2){

                                                                            if(record.data['#text'] === select_record.data['#text'] && idx2 === row)
                                                                            {
                                                                                record.set('#text', ip);

                                                                                record.commit();

                                                                                return false;
                                                                            }
                                                                        });

                                                                        object_grid.getView().refresh();
                                                                    }
                                                                    else
                                                                    {
                                                                        object_store.add({
                                                                            '#text': ip,
                                                                            "@version": "v6",
                                                                            "@type": "single"
                                                                        });
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                if(select_record.data['#text'] !== ip)
                                                                {
                                                                    alertMessage('같은 IP주소가 이미 있습니다.', txf_ipaddr);
                                                                }
                                                            }
                                                        });

                                                        object_grid.reconfigure();
                                                    },
                                                    margin: '1 10 1 0',
                                                    width: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_ipv6_addr"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_ipAddress"]').getSelectionModel().getSelection()[0];
                                                        var object_store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();

                                                        delObject(select_record, '#text', object_store);
                                                    },
                                                    margin: 1,
                                                    width: 100,
                                                    text: '삭제'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '20 0 0 0',
                                            text: 'IP객체 입력형태 : '
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '10 0 10 0',
                                            text: ' ex) Single : 2001::1'
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Prefix : 2001::/64'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipv6_addr"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipv6_addr"]').destroy();
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_object_ipv6_addrAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_ipv6_addrBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_ipAddressItemClick: function(dataview, record, item, index, e, eOpts) {
        this.down('textfield[itemId="txf_ipAddress"]').setValue(record.data['#text']);
    },

    onTxf_ipAddressKeydown: function(textfield, e, eOpts) {
        if(e.browserEvent.keyCode === 32)
        {
            e.stopEvent();
        }
    },

    onTxf_ipAddressChange: function(field, newValue, oldValue, eOpts) {
        if(newValue.match(' '))
        {
            newValue = newValue.trim();
            field.setValue(newValue.split(' ').join(','));
        }
    },

    onPnl_object_ipv6_addrAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_ipv6_addrBeforeDestroy: function(component, eOpts) {
        if(!component.isNew)
        {
            var _svc = 'ftSMC',
                _func = 'clrObject',
                _params = {
                    cid : Ext.encode(component.object['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                }
            );
        }
    },

    loadData: function(record) {
        var me = this;

        var ip_grid_store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
        var txf_object_name = me.down('textfield[itemId="txf_objectName"]');
        var txf_object_desc = me.down('textfield[itemId="txf_objectDesc"]');

        ip_grid_store.removeAll();

        txf_object_name.setValue(record.name);
        txf_object_desc.setValue(record.desc);

        Ext.each(record.ip, function(data, idx){

            ip_grid_store.add(data);

        });

        me.object = record;

        me.show();
    },

    saveData: function() {
        var me = this;

        var object_store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
        var txf_object_name = me.down('textfield[itemId="txf_objectName"]');
        var txf_object_desc = me.down('textfield[itemId="txf_objectDesc"]');
        var txf_ipaddr = me.down('textfield[itemId="txf_ipAddress"]');

        if(txf_object_name.validate())
        {
            me.object.name = txf_object_name.getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.', txf_object_name);
            return false;
        }

        if(txf_object_desc.getValue())
        {
            me.object.desc = txf_object_desc.getValue();
        }
        else
        {
            me.object.desc = null;
        }

        if(object_store.getCount() >= 1)
        {
            var array_ip = [];

            object_store.each(function(record, idx){

                array_ip.push({
                    '#text': record.data['#text'],
                    '@type': record.data['@type'],
                    '@version': record.data['@version']
                });
            });

            me.object.ip = array_ip;
            me.object['@count'] = object_store.getCount();
        }
        else
        {
            alertMessage('리스트에 데이터가 없습니다.', txf_ipaddr);
            return false;
        }

        var _svc = 'ftSMC',
            _func,
            _params;

        if(me.isNew)
        {
            _func = 'addObject';
            _params = {
                obj : Ext.encode(me.object),
                g_cid : Ext.encode(me.object['@groupcid'])
            };
        }
        else
        {
            _func = 'modObject';
            _params = {
                obj : Ext.encode(me.object)
            };
        }

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    if((_func === 'addObject') && response)
                    {
                        me.object['@cid'] = response;
                    }

                    if(typeof me.closeEvent === 'function'){
                        me.closeEvent();
                    }

                    me.destroy();
                }
            }
        );
    }

});