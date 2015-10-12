
Ext.define('SMC.view.pnl_object_ssl_server_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.button.Button',
        'Ext.form.Label'
    ],

    border: false,
    height: 550,
    itemId: 'pnl_object_ssl_server_group',
    minHeight: 550,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: '접근 서버 그룹',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: ''
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_ssl_server_group',
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
                            itemId: 'fs_ssl_server_group',
                            margin: '0 0 10 0',
                            title: '접근 서버 그룹',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    flex: 1,
                                    itemId: 'tpn_serverGroup',
                                    header: false,
                                    title: 'My Tree Panel',
                                    useArrows: true,
                                    viewConfig: {

                                    },
                                    listeners: {
                                        itemdblclick: {
                                            fn: me.onTpn_serverGroupItemDblClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: '0 10 10 10'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_serverGroup',
                                            margin: '0 0 5 0',
                                            header: false,
                                            title: 'My Grid Panel',
                                            store: 'st_SSLServerGroup',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 30,
                                                    align: 'center'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = record.data.iconCls;
                                                        return value;
                                                    },
                                                    width: 285,
                                                    dataIndex: '@name',
                                                    text: '선택된 객체 목록',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 30,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                view.up('window[itemId="pnl_object_ssl_server_group"]').down('gridpanel[itemId="gpn_serverGroup"]').getStore().removeAt(rowIndex);
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                itemdblclick: {
                                                    fn: me.onGpn_serverGroupItemDblClick,
                                                    scope: me
                                                }
                                            }
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
                                                        var me = button.up('window[itemId="pnl_object_ssl_server_group"]');

                                                        var server_store = me.down('gridpanel[itemId="gpn_serverGroup"]').getStore();
                                                        var tree_selection = me.down('treepanel[itemId="tpn_serverGroup"]').getSelectionModel().getSelection()[0];

                                                        if(tree_selection)
                                                        {
                                                            if(!Object_DuplicateCheck(tree_selection.raw.cid, '@cid', server_store))
                                                            {
                                                                alertMessage('[ ' + tree_selection.raw.text + '] ' + '동일한 겍체를 사용하고 있습니다.');
                                                                return false;
                                                            }

                                                            var _svc = 'ftSMC',
                                                                _func = 'getObject',
                                                                _params = {
                                                                    cid : Ext.encode(tree_selection.raw.cid)
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
                                                                        alertMessage('그룹 객체를 포함한 그룹 객체는 추가할 수 없습니다.');
                                                                        return false;
                                                                    }
                                                                }

                                                                server_store.add({
                                                                    '@name': response.name,
                                                                    '@cid': response['@cid'],
                                                                    'iconCls': 'ico_' + response._kind + '_16'
                                                                });
                                                            }
                                                            );
                                                        }
                                                    },
                                                    margin: '1 20 1 0',
                                                    maxWidth: 100,
                                                    width: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_ssl_server_group"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_serverGroup"]').getSelectionModel().getSelection()[0];
                                                        var select_store = me.down('gridpanel[itemId="gpn_serverGroup"]').getStore();

                                                        if(select_record)
                                                        {
                                                            select_store.data.each(function(record,idx){

                                                                if(record.data['@cid'] === select_record.data['@cid'])
                                                                {
                                                                    select_store.removeAt(idx);
                                                                    return false;
                                                                }
                                                            });
                                                        }
                                                    },
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    width: 100,
                                                    text: '삭제'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.3,
                            title: '링크될 사용자들이 할당받을 주소 대역',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '10 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return true; }

                                                if(!ValidIPAddress(value)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_ip',
                                            margin: '0 10 0 0',
                                            fieldLabel: 'IP 주소',
                                            labelWidth: 60,
                                            msgTarget: 'none',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return true; }

                                                if(!ValidIPAddress(value)){return false; }
                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_netmask',
                                            fieldLabel: '넷마스크',
                                            labelWidth: 60,
                                            msgTarget: 'none',
                                            enableKeyEvents: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    margin: '10 0 10 65',
                                    text: '※ SSL VPN 기본설정의 클라이언트 할당 주소내역보다 작거나 같아야 함'
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
                                        button.up('window[itemId="pnl_object_ssl_server_group"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ssl_server_group"]').destroy();
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
                    fn: me.onPnl_object_ssl_server_groupAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_ssl_server_groupBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTpn_serverGroupItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var server_store = this.down('gridpanel[itemId="gpn_serverGroup"]').getStore();

        if(record.raw._kind)
        {
            return false;
        }

        if(!Object_DuplicateCheck(record.raw.cid, '@cid', server_store))
        {
            alertMessage('[ ' + record.raw.text + '] ' + '동일한 객체를 사용하고 있습니다.');
            return false;
        }

        var _svc = 'ftSMC',
            _func = 'getObject',
            _params = {
                cid : Ext.encode(record.raw.cid)
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
                        alertMessage('그룹 객체를 포함한 그룹 객체는 추가할 수 없습니다.');
                        return false;
                    }
                }

                server_store.add({
                    '@name': response.name,
                    '@cid': response['@cid'],
                    'iconCls': 'ico_' + response._kind + '_16'
                });
            }
        );
    },

    onGpn_serverGroupItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var select_store = this.down('gridpanel[itemId="gpn_serverGroup"]').getStore();

        if(record)
        {
            select_store.each(function(data,idx){

                if(data.data['@cid'] === record.data['@cid'])
                {
                    select_store.removeAt(idx);
                    return false;
                }
            });
        }
    },

    onPnl_object_ssl_server_groupAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_ssl_server_groupBeforeDestroy: function(component, eOpts) {
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

        var ctn_group = me.down('container[itemId="ctn_ssl_server_group"]');
        var object_server_store = me.down('gridpanel[itemId="gpn_serverGroup"]').getStore();

        object_server_store.removeAll();

        me.object = record;

        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj_ssl_svr')
            };

        me.show();

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    var iconCls = response.iconCls;

                    response.leaf = false;
                    response.expanded = true;
                    response.children.length = 0;

                    _func = 'getObjectList';
                    _params = {
                        g_cid : Ext.encode(response.cid)
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        _params,
                        function(response_data){

                            ctn_group.setLoading(false);

                            Ext.each(response_data.result, function(data, idx){

                                var child_node = {
                                    cid : data['@cid'],
                                    text : data.name,
                                    leaf : true,
                                    iconCls: 'ico_' + data._kind + '_16'
                                };

                                if(data['@groupcid'] === response.cid)
                                {
                                    response.children.push(child_node);
                                }
                            });

                            me.down('treepanel[itemId="tpn_serverGroup"]').setRootNode(response);
                            me.down('treepanel[itemId="tpn_serverGroup"]').getView().refresh();

                            me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
                            me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

                            if(record.ip)
                            {
                                if(record.ip[0])
                                    me.down('textfield[itemId="txf_ip"]').setValue(record.ip[0]);
                            }

                            me.down('textfield[itemId="txf_netmask"]').setValue(record.netmask);

                            if(record.member)
                            {
                                Ext.each(record.member, function(data, idx){

                                    record.member[idx].iconCls = iconCls;
                                    object_server_store.add(data);
                                });
                            }
                        }
                    );
                }
            }
        );
    },

    saveData: function() {
        var me = this;

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
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

        if(me.down('textfield[itemId="txf_ip"]').getValue())
        {
            if(me.down('textfield[itemId="txf_ip"]').validate())
            {
                me.object.ip = me.down('textfield[itemId="txf_ip"]').getValue();
            }
        }
        else
        {
            me.object.ip = '0.0.0.0';
        }

        if(me.down('textfield[itemId="txf_netmask"]').getValue())
        {
            if(me.down('textfield[itemId="txf_netmask"]').validate())
            {
                me.object.netmask = me.down('textfield[itemId="txf_netmask"]').getValue();
            }
        }
        else
        {
            me.object.netmask = '0.0.0.0';
        }

        var server_group_store = me.down('gridpanel[itemId="gpn_serverGroup"]').getStore();

        var data = [];

        if(server_group_store.getCount() > 0)
        {
            server_group_store.each(function(record, idx){

                data.push(record.data);
            });

            me.object.member = data;
        }
        else
        {
            alertMessage('리스트에 데이터가 없습니다.');
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