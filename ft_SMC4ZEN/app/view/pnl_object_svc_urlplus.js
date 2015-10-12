
Ext.define('SMC4ZEN.view.pnl_object_svc_urlplus', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_object_svc_urlplus',

    requires: [
        'SMC4ZEN.view.pnl_object_svc_urlplusViewModel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.button.Button',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Column'
    ],

    viewModel: {
        type: 'pnl_object_svc_urlplus'
    },
    border: false,
    height: 550,
    itemId: 'pnl_object_svc_urlplus',
    minHeight: 550,
    minWidth: 1000,
    padding: '0 20 10 20',
    resizable: true,
    width: 1000,
    constrainHeader: true,
    title: 'HTTP+ URL 차단그룹',
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
            flex: 0.15,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'radiogroup',
                    flex: 0.5,
                    width: 400,
                    items: [
                        {
                            xtype: 'radiofield',
                            boxLabel: '기본 제공 DB'
                        },
                        {
                            xtype: 'radiofield',
                            boxLabel: 'HTTP+ DB'
                        }
                    ]
                },
                {
                    xtype: 'checkboxfield',
                    flex: 0.3,
                    boxLabel: 'Full Matching'
                },
                {
                    xtype: 'textfield',
                    flex: 1,
                    margin: '0 10 0 0'
                },
                {
                    xtype: 'button',
                    flex: 0.2,
                    text: '검색'
                }
            ]
        },
        {
            xtype: 'container',
            flex: 0.8,
            margin: '0 0 10 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 0.5,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'treepanel',
                            flex: 1,
                            itemId: 'trpn_object_tree',
                            margin: '0 10 5 0',
                            title: '',
                            rootVisible: false,
                            useArrows: true,
                            listeners: {
                                afterrender: 'onTrpn_ipv4_treeAfterRender',
                                itemclick: 'onTrpn_ipv4_treeItemClick'
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '0 10 0 0',
                            layout: 'fit',
                            items: [
                                {
                                    xtype: 'combobox'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 0.8,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1.1,
                            itemId: 'gpn_object_grid',
                            margin: '0 10 5 0',
                            header: false,
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 343,
                                    dataIndex: 'name',
                                    text: 'WeGuardia 기본 제공 DB',
                                    flex: 1
                                }
                            ],
                            listeners: {
                                itemdblclick: 'onGpn_ipv4_gridItemDblClick'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 3.5,
                                    itemId: 'txf_search',
                                    margin: '0 10 0 0',
                                    fieldLabel: '',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = this.up('window[itemId="pnl_object_user_group"]');

                                        if(me.down('checkbox[itemId="ck_all_search"]').checked)
                                        {
                                            if(me.down('textfield[itemId="txf_search"]').getValue())
                                            {
                                                var condition = {
                                                    'name' : me.down('textfield[itemId="txf_search"]').getValue()
                                                };

                                                var _svc = 'ftSMC',
                                                    _func = 'findObjectList',
                                                    _params = {
                                                        condition : Ext.encode(condition)
                                                    };
                                                request_helper.xmlrpc_call_Ajax_Post(
                                                _svc,
                                                _func,
                                                _params,
                                                function(response){

                                                    var grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                                    grid.getStore().loadData(response.result);
                                                }
                                                );
                                            }
                                        }
                                        else
                                        {
                                            var grid_data = me.down('gridpanel[itemId="gpn_object_grid"]').getStore().data.items;
                                            var search_object = [];
                                            if(grid_data.length > 0)
                                            {
                                                for(var i=0; i<grid_data.length; i++)
                                                {
                                                    if(grid_data[i].raw.name === me.down('textfield[itemId="txf_search"]').getValue())
                                                    {
                                                        search_object.push(grid_data[i].raw);
                                                    }

                                                }
                                                me.down('gridpanel[itemId="gpn_object_grid"]').getStore().loadData(search_object);
                                            }
                                        }
                                    },
                                    flex: 1,
                                    margins: '0 10 0 0',
                                    text: '확인'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 0.8,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_object_select_grid',
                            margin: '0 0 5 0',
                            title: '',
                            store: 'st_ObjectSelectGrid',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    weight: 180,
                                    width: 247,
                                    defaultWidth: 180,
                                    dataIndex: '@name',
                                    text: 'HTTP+ DB',
                                    flex: 1
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            scrollable: true,
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = this.up('window[itemId="pnl_object_user_group"]');

                                        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

                                        var object_name = me.down('textfield[itemId="txf_objectName"]');
                                        var object_desc = me.down('textfield[itemId="txf_objectDesc"]');

                                        if(object_name.getValue())
                                        {
                                            me.group_object.name = object_name.getValue();
                                        }
                                        else
                                        {
                                            Ext.Msg.alert('Weguardia SMC2.0 Client','오브젝트 이름을 입력하시오.');
                                            return false;
                                        }

                                        if(object_desc.getValue())
                                        {
                                            me.group_object.desc = object_desc.getValue();
                                        }
                                        else
                                        {
                                            me.group_object.desc = null;
                                        }

                                        var object_member = [];

                                        if(select_store.data.items.length > 0)
                                        {
                                            for(var i =0; i<select_store.data.items.length; i++)
                                            {
                                                object_member.push(select_store.data.items[i].raw['@cid']);
                                            }
                                        }
                                        else
                                        {
                                            Ext.Msg.alert('Weguardia SMC2.0 Client','리스트에 데이터가 없습니다.');
                                            return false;
                                        }

                                        me.group_object.member = object_member;

                                        var _svc = 'ftSMC',
                                            _func = 'modObject',
                                            _params = {
                                                obj : Ext.encode(me.group_object)
                                            };

                                        request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            me.destroy();

                                        }
                                        );

                                    },
                                    margins: '0 10 0 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        this.up('window[itemId="pnl_object_user_group"]').destroy();
                                    },
                                    margins: 'wid',
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    onTrpn_ipv4_treeAfterRender: function(component, eOpts) {
        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj_usr')
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){
                var me = component;
                me.setRootNode(response);
                me.getView().refresh();
            }
        );

    },

    onTrpn_ipv4_treeItemClick: function(dataview, record, item, index, e, eOpts) {
        var me = dataview.up('window[itemId="pnl_object_user_group"]');

        var _svc = 'ftSMC',
            _func = 'getObjectList',
            _params = {
                g_cid : Ext.encode(record.raw.cid)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){
                var grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                grid.getStore().loadData(response.result);
            }
        );

    },

    onGpn_ipv4_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = dataview.up('window[itemId="pnl_object_user_group"]');

        if(record)
        {
            var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

            for(var i =0; i<select_store.data.items.length; i++)
            {
                if(select_store.data.items[i].raw['@cid'] === record.raw['@cid'])
                {
                    Ext.Msg.alert('Weguardia SMC2.0 Client','동일한 오브젝트를 사용하고 있습니다.');
                    return false;
                }
            }

            var _svc = 'ftSMC',
            _func = 'getObject',
            _params = {
                cid : Ext.encode(record.raw['@cid'])
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                    if(response.member)
                    {
                        if(response.member.length > 0)
                        {
                            Ext.Msg.alert('Weguardia SMC2.0 Client','그룹 오브젝트를 포함한 그룹 오브젝트는 추가할 수 없습니다.');
                            return false;
                        }
                    }

                    select_store.add(record.raw);
                }
            );
        }

    },

    loadData: function(record) {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();
        console.log('record - ', record);
        Ext.getStore('st_ObjectGroupGrid').removeAll();
        Ext.getStore('st_ObjectSelectGrid').removeAll();

        me.group_object = record;

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        Ext.each(record.member[0], function(data, idx){

            var _svc = 'ftSMC',
            _func = 'getObject',
            _params = {
                cid : Ext.encode(data)
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    select_store.add(response);

                });
        });

        me.show();
    }

});