
Ext.define('SMC4ZEN.view.pnl_object_svc_rpc', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_object_svc_rpc',

    requires: [
        'SMC4ZEN.view.pnl_object_svc_rpcViewModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action'
    ],

    viewModel: {
        type: 'pnl_object_svc_rpc'
    },
    border: false,
    height: 600,
    itemId: 'pnl_object_svc_rpc',
    minHeight: 600,
    minWidth: 700,
    padding: '0 10 10 10',
    resizable: true,
    width: 700,
    constrainHeader: true,
    title: 'RPC',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_svc_rpc',
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
                    xtype: 'tabpanel',
                    flex: 1.2,
                    itemId: 'tpn_rpc',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            padding: 10,
                            title: '기본 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 100,
                                            text: '프로토콜 타입 :'
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 0.5,
                                            itemId: 'cmb_protocol',
                                            editable: false,
                                            displayField: 'type',
                                            valueField: 'type'
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
                                            xtype: 'label',
                                            width: 100,
                                            text: '출발지 포트 :'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }

                                                if(!LengthCheckFloat(value,1,65535)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_source_start',
                                            msgTarget: 'none',
                                            value: 1024
                                        },
                                        {
                                            xtype: 'label',
                                            height: 12,
                                            margin: '0 10 0 10',
                                            text: ' ~'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }

                                                if(!LengthCheckFloat(value,1,65535)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_source_end',
                                            fieldLabel: '',
                                            msgTarget: 'none',
                                            value: 65535
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 0.81
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
                                            xtype: 'label',
                                            width: 100,
                                            text: '목적지 포트 :'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }

                                                if(!LengthCheckFloat(value,1,65535)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_dest_start',
                                            msgTarget: 'none',
                                            value: 111
                                        },
                                        {
                                            xtype: 'label',
                                            height: 12,
                                            margin: '0 10 0 10',
                                            text: ' ~'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return false; }

                                                if(!LengthCheckFloat(value,1,65535)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_dest_end',
                                            fieldLabel: '',
                                            msgTarget: 'none',
                                            value: 111
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 0.81
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            bodyPadding: 10,
                            title: 'RPC Number',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 0.7,
                                    itemId: 'gpn_rpc',
                                    scrollable: true,
                                    header: false,
                                    title: 'My Grid Panel',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                var rpc_store = Ext.getStore('st_RPC');

                                                for(var i=0; i<rpc_store.getCount(); i++)
                                                {
                                                    if(value === rpc_store.data.items[i].data.rpcValue)
                                                    {
                                                        return rpc_store.data.items[i].data.rpc + '(' + value + ')';
                                                    }
                                                }

                                                return value;
                                            },
                                            width: 243,
                                            dataIndex: 'rpc',
                                            text: 'RPC Number',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        view.up('window[itemId="pnl_object_svc_rpc"]').down('gridpanel[itemId="gpn_rpc"]').getStore().removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    padding: '0 0 0 20',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    itemId: 'cmb_rpc',
                                                    margin: 1,
                                                    fieldLabel: 'RPC Number',
                                                    labelAlign: 'top',
                                                    editable: false,
                                                    displayField: 'rpc',
                                                    valueField: 'rpcValue'
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
                                                                var me = button.up('window[itemId="pnl_object_svc_rpc"]');

                                                                var Object_Store = me.down('gridpanel[itemId="gpn_rpc"]').getStore();
                                                                var rpc_data = me.down('combobox[itemId="cmb_rpc"]').getValue();

                                                                if(rpc_data)
                                                                {
                                                                    Object_Store.add({
                                                                        'rpc': rpc_data
                                                                    });
                                                                }
                                                            },
                                                            flex: 1,
                                                            margin: '1 10 1 10',
                                                            maxWidth: 100,
                                                            text: '추가'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('window[itemId="pnl_object_svc_rpc"]');

                                                                var Object_Store = me.down('gridpanel[itemId="gpn_rpc"]').getStore();
                                                                var select_record = me.down('gridpanel[itemId="gpn_rpc"]').getSelectionModel().getSelection()[0];

                                                                delObject(select_record, 'rpc', Object_Store);
                                                            },
                                                            flex: 1,
                                                            margin: 1,
                                                            maxWidth: 100,
                                                            text: '삭제'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            padding: '20 0 0 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    flex: 1,
                                                    itemId: 'nfd_rpc',
                                                    margin: 1,
                                                    fieldLabel: '사용자 입력',
                                                    labelAlign: 'top',
                                                    labelWidth: 70,
                                                    msgTarget: 'none'
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
                                                                var me = button.up('window[itemId="pnl_object_svc_rpc"]');

                                                                var Object_Store = me.down('gridpanel[itemId="gpn_rpc"]').getStore();
                                                                var rpc_data = me.down('numberfield[itemId="nfd_rpc"]').getValue();

                                                                if(rpc_data !== null && typeof rpc_data !== 'undefined')
                                                                {
                                                                    if(LengthCheckFloat(rpc_data,0,2147483646))
                                                                    {
                                                                        Object_Store.add({
                                                                            'rpc': rpc_data
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('0 ~ 2147483646 사이의 정수를 입력하시오.', me.down('numberfield[itemId="nfd_rpc"]'));
                                                                        return false;
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    alertMessage('0 ~ 2147483646 사이의 정수를 입력하시오.', me.down('numberfield[itemId="nfd_rpc"]'));
                                                                    return false;
                                                                }
                                                            },
                                                            flex: 1,
                                                            margin: '1 10 1 10',
                                                            maxWidth: 100,
                                                            text: '추가'
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_svc_rpc"]').saveData();
                            },
                            margin: '1 10 1 0',
                            width: 100,
                            text: '저장'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_svc_rpc"]').destroy();
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
        afterrender: 'onPnl_object_svc_rpcAfterRender',
        beforedestroy: 'onPnl_object_svc_rpcBeforeDestroy'
    },

    onPnl_object_svc_rpcAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_svc_rpcBeforeDestroy: function(component, eOpts) {
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

        me.down('combobox[itemId="cmb_protocol"]').bindStore(Ext.create('SMC4ZEN.store.st_RPCPtoyocolType'));
        me.down('gridpanel[itemId="gpn_rpc"]').bindStore(Ext.create('SMC4ZEN.store.st_RPCList'));
        me.down('combobox[itemId="cmb_rpc"]').bindStore(Ext.create('SMC4ZEN.store.st_RPC'));

        var protocol_store = me.down('combobox[itemId="cmb_protocol"]').getStore();
        var rpc_store = me.down('gridpanel[itemId="gpn_rpc"]').getStore();

        me.down('combobox[itemId="cmb_protocol"]').select(protocol_store.getAt(0));

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        me.down('numberfield[itemId="nfd_source_start"]').setValue(record.source.start);
        me.down('numberfield[itemId="nfd_source_end"]').setValue(record.source.end);
        me.down('numberfield[itemId="nfd_dest_start"]').setValue(record.dest.start);
        me.down('numberfield[itemId="nfd_dest_end"]').setValue(record.dest.end);

        protocol_store.each(function(data, idx){

            if(data.data.type === record.protocol)
            {
                me.down('combobox[itemId="cmb_protocol"]').select(protocol_store.getAt(idx));
                return false;
            }
        });

        Ext.each(record.rpc, function(data, idx){

            var rpc_data = {
                'rpc': data
                    };

            rpc_store.add(rpc_data);
        });

        me.down('combobox[itemId="cmb_rpc"]').select(me.down('combobox[itemId="cmb_rpc"]').getStore().getAt(0));

        me.object = record;

        me.show();
    },

    saveData: function() {
        var me = this;

        var rpc_list = me.down('gridpanel[itemId="gpn_rpc"]').getStore();

        if( me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name =  me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.',  me.down('textfield[itemId="txf_objectName"]'));
            return false;
        }

        if(me.down('textfield[itemId="txf_objectDesc"]').getValue())
        {
            me.object.desc = me.down('textfield[itemId="txf_objectDesc"]').getValue();
        }
        else
        {
            me.object.desc = null;
        }

        me.object.protocol = me.down('combobox[itemId="cmb_protocol"]').getValue();

        if(me.down('numberfield[itemId="nfd_source_start"]').validate())
        {
            if(me.down('numberfield[itemId="nfd_source_end"]').validate())
            {
                if(me.down('numberfield[itemId="nfd_source_start"]').getValue() <= me.down('numberfield[itemId="nfd_source_end"]').getValue())
                {
                    me.object.source.start = me.down('numberfield[itemId="nfd_source_start"]').getValue();
                    me.object.source.end = me.down('numberfield[itemId="nfd_source_end"]').getValue();
                }
                else
                {
                    alertMessage('포트번호가 올바르지 않습니다.');
                    me.down('tabpanel[itemId="tpn_rpc"]').setActiveTab(0);
                    return false;
                }
            }
            else
            {
                me.down('tabpanel[itemId="tpn_rpc"]').setActiveTab(0);
                alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_source_end"]'));
                return false;
            }
        }
        else
        {
            me.down('tabpanel[itemId="tpn_rpc"]').setActiveTab(0);
            alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_source_start"]'));
            return false;
        }

        if(me.down('numberfield[itemId="nfd_dest_start"]').validate())
        {
            if(me.down('numberfield[itemId="nfd_dest_end"]').validate())
            {
                if(me.down('numberfield[itemId="nfd_dest_start"]').getValue() <= me.down('numberfield[itemId="nfd_dest_end"]').getValue())
                {
                    me.object.dest.start = me.down('numberfield[itemId="nfd_dest_start"]').getValue();
                    me.object.dest.end = me.down('numberfield[itemId="nfd_dest_end"]').getValue();
                }
                else
                {
                    alertMessage('포트번호가 올바르지 않습니다.');
                    me.down('tabpanel[itemId="tpn_rpc"]').setActiveTab(0);
                    return false;
                }
            }
            else
            {
                me.down('tabpanel[itemId="tpn_rpc"]').setActiveTab(0);
                alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_dest_end"]'));
                return false;
            }
        }
        else
        {
            me.down('tabpanel[itemId="tpn_rpc"]').setActiveTab(0);
            alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_dest_start"]'));
            return false;
        }

        if(rpc_list.getCount() > 1)
        {
            var rpc_array = [];
            rpc_list.each(function(data,idx){
                rpc_array.push(data.data.rpc);
            });

            me.object.rpc =  rpc_array;
            me.object['@count'] = rpc_list.getCount();
        }
        else if(rpc_list.getCount() === 1)
        {
            me.object.rpc = rpc_list.data.items[0].data.rpc;
            me.object['@count'] = rpc_list.getCount();
        }
        else
        {
            me.down('tabpanel[itemId="tpn_rpc"]').setActiveTab(1);
            Ext.Msg.alert('Weguardia SMC2.0 Client','RPC Number를 선택하여 주십시오.');
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