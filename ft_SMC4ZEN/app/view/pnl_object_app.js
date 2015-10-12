
Ext.define('SMC4ZEN.view.pnl_object_app', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_object_app',

    requires: [
        'SMC4ZEN.view.pnl_object_appViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.button.Button',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'pnl_object_app'
    },
    border: false,
    height: 550,
    itemId: 'pnl_object_app',
    minHeight: 550,
    minWidth: 1000,
    padding: '0 20 10 20',
    resizable: true,
    width: 1000,
    constrainHeader: true,
    title: '어플리케이션',
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
            margin: '10 0 10 0',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        var retValue = CheckNotNull(value);

                        if(!retValue){return false; }
                        return true;
                    },
                    flex: 0.2,
                    itemId: 'txf_objectName',
                    margin: '0 10 0 0 ',
                    fieldLabel: '오브젝트 이름',
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
            xtype: 'panel',
            flex: 1.2,
            border: false,
            header: false,
            title: '어플리케이션',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
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
                            xtype: 'container',
                            flex: 0.6,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_app_category',
                                    margin: '0 0 5 0',
                                    title: '',
                                    store: 'st_ObjectSelectGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            weight: 180,
                                            width: 247,
                                            defaultWidth: 180,
                                            align: 'center',
                                            dataIndex: '@name',
                                            text: '카테고리',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: 'onGpn_object_select_gridItemDblClick'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    height: 24,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        pack: 'end'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 0.6,
                            margin: '0 10 0 10',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_app_detail',
                                    margin: '0 0 5 0',
                                    title: '',
                                    store: 'st_ObjectSelectGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            weight: 180,
                                            width: 247,
                                            defaultWidth: 180,
                                            align: 'center',
                                            dataIndex: '@name',
                                            text: '세부항목',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: 'onGpn_object_select_gridItemDblClick1'
                                    }
                                },
                                {
                                    xtype: 'container',
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
                                                var select_record = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];
                                                var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

                                                delObject(select_record, '#text', select_store);
                                            },
                                            margins: '0 10 0 0',
                                            width: 100,
                                            text: '전체 추가'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var me = this.up('window[itemId="pnl_object_user_group"]');
                                                var select_record = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];
                                                var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

                                                delObject(select_record, '#text', select_store);
                                            },
                                            width: 100,
                                            text: '선택 추가'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 0.6,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_app_select',
                                    margin: '0 0 5 0',
                                    title: '',
                                    store: 'st_ObjectSelectGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            weight: 180,
                                            width: 247,
                                            defaultWidth: 180,
                                            align: 'center',
                                            dataIndex: '@name',
                                            text: '선택항목',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: 'onGpn_object_select_gridItemDblClick11'
                                    }
                                },
                                {
                                    xtype: 'container',
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
                                                var select_record = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];
                                                var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

                                                delObject(select_record, '#text', select_store);
                                            },
                                            margins: '0 10 0 0',
                                            width: 100,
                                            text: '전체 삭제'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var me = this.up('window[itemId="pnl_object_user_group"]');
                                                var select_record = me.down('gridpanel[itemId="gpn_object_select_grid"]').getSelectionModel().getSelection()[0];
                                                var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

                                                delObject(select_record, '#text', select_store);
                                            },
                                            width: 100,
                                            text: '선택 삭제'
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
            xtype: 'textareafield',
            flex: 0.3,
            margin: '0 0 20 0',
            fieldLabel: '설명',
            labelAlign: 'top'
        },
        {
            xtype: 'container',
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
                        me.saveData();
                    },
                    margin: '0 20 0 0',
                    width: 100,
                    text: '저장'
                },
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        this.up('window[itemId="pnl_object_user_group"]').destroy();
                    },
                    width: 100,
                    text: '취소'
                }
            ]
        }
    ],

    onGpn_object_select_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var tree = this.down('treepanel[itemId="trpn_object_tree"]');

        var tree_name;

        var _svc = 'ftSMC',
            _func = 'getObject';
            _params = {
                cid : Ext.encode(record.data['#text'])
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    if(response._kind === 'obj_usr_list')
                    {
                        tree_name = '사용자';
                    }

                    if(tree_name)
                    {
                        for(var i=0; i<tree.getSelectionModel().store.data.items.length; i++)
                        {
                            var select_tree_text = tree.getSelectionModel().store.data.items[i].data.text.replace(/(^\s*)|(\s*$)/gi, "");

                            if(select_tree_text === tree_name && tree.getSelectionModel().store.data.items[i].data.depth === 1)
                            {
                                if(tree.getSelectionModel().getSelection()[0] && tree.getSelectionModel().getSelection()[0].data.index === i)
                                {
                                    var grid = me.down('gridpanel[itemId="gpn_object_grid"]');

                                    for(var j=0; j<grid.getStore().data.items.length; j++)
                                    {
                                        if(grid.getStore().data.items[j].data.name === record.data['@name'])
                                        {
                                            grid.getSelectionModel().select(j);
                                            return false;
                                        }
                                    }
                                }
                                else
                                {
                                    tree.getSelectionModel().select(i);
                                    return false;
                                }
                            }
                        }
                    }
                }
            );
    },

    onGpn_object_select_gridItemDblClick1: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var tree = this.down('treepanel[itemId="trpn_object_tree"]');

        var tree_name;

        var _svc = 'ftSMC',
            _func = 'getObject';
            _params = {
                cid : Ext.encode(record.data['#text'])
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    if(response._kind === 'obj_usr_list')
                    {
                        tree_name = '사용자';
                    }

                    if(tree_name)
                    {
                        for(var i=0; i<tree.getSelectionModel().store.data.items.length; i++)
                        {
                            var select_tree_text = tree.getSelectionModel().store.data.items[i].data.text.replace(/(^\s*)|(\s*$)/gi, "");

                            if(select_tree_text === tree_name && tree.getSelectionModel().store.data.items[i].data.depth === 1)
                            {
                                if(tree.getSelectionModel().getSelection()[0] && tree.getSelectionModel().getSelection()[0].data.index === i)
                                {
                                    var grid = me.down('gridpanel[itemId="gpn_object_grid"]');

                                    for(var j=0; j<grid.getStore().data.items.length; j++)
                                    {
                                        if(grid.getStore().data.items[j].data.name === record.data['@name'])
                                        {
                                            grid.getSelectionModel().select(j);
                                            return false;
                                        }
                                    }
                                }
                                else
                                {
                                    tree.getSelectionModel().select(i);
                                    return false;
                                }
                            }
                        }
                    }
                }
            );
    },

    onGpn_object_select_gridItemDblClick11: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var tree = this.down('treepanel[itemId="trpn_object_tree"]');

        var tree_name;

        var _svc = 'ftSMC',
            _func = 'getObject';
            _params = {
                cid : Ext.encode(record.data['#text'])
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    if(response._kind === 'obj_usr_list')
                    {
                        tree_name = '사용자';
                    }

                    if(tree_name)
                    {
                        for(var i=0; i<tree.getSelectionModel().store.data.items.length; i++)
                        {
                            var select_tree_text = tree.getSelectionModel().store.data.items[i].data.text.replace(/(^\s*)|(\s*$)/gi, "");

                            if(select_tree_text === tree_name && tree.getSelectionModel().store.data.items[i].data.depth === 1)
                            {
                                if(tree.getSelectionModel().getSelection()[0] && tree.getSelectionModel().getSelection()[0].data.index === i)
                                {
                                    var grid = me.down('gridpanel[itemId="gpn_object_grid"]');

                                    for(var j=0; j<grid.getStore().data.items.length; j++)
                                    {
                                        if(grid.getStore().data.items[j].data.name === record.data['@name'])
                                        {
                                            grid.getSelectionModel().select(j);
                                            return false;
                                        }
                                    }
                                }
                                else
                                {
                                    tree.getSelectionModel().select(i);
                                    return false;
                                }
                            }
                        }
                    }
                }
            );
    },

    loadData: function(record) {
        var me = this;

        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

        me.down('gridpanel[itemId="gpn_object_grid"]').getStore().removeAll();
        select_store.removeAll();

        me.group_object = record;

        if(me.isNew)
        {
            me.show();
        }
        else
        {
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

                        select_store.add({
                            '@name': response.name,
                            '#text': response['@cid']
                        });
                    }
                );

                if(typeof record.member[0] === 'string')
                {
                    me.show();
                }
                else if(idx === record.member[0].length -1)
                {
                    me.show();
                }
            });
        }
    },

    saveData: function() {
        var me = this;
        var select_store = me.down('gridpanel[itemId="gpn_object_select_grid"]').getStore();

        var object_name = me.down('textfield[itemId="txf_objectName"]');
        var object_desc = me.down('textfield[itemId="txf_objectDesc"]');

        if(object_name.validate())
        {
            me.group_object.name = object_name.getValue();
        }
        else
        {
            alertMessage('오브젝트 이름을 입력하시오.', object_name);
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

        if(select_store.data.items.length > 0)
        {
            if(select_store.data.items.length === 1)
            {
                me.group_object.member = select_store.data.items[0].data['#text'];
            }
            else
            {
                var object_member = [];

                for(var i =0; i<select_store.data.items.length; i++)
                {
                    object_member.push(select_store.data.items[i].data['#text']);
                }

                me.group_object.member = object_member;
            }

            me.group_object['@count'] = select_store.data.items.length;
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
                obj : Ext.encode(me.group_object),
                g_cid : Ext.encode(me.group_object['@group_cid'])
            };
        }
        else
        {
            _func = 'modObject';
            _params = {
                obj : Ext.encode(me.group_object)
            };
        }

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                var _grid = Ext.ComponentQuery.query('#gpn_objectList')[0];
                _grid.gridRefresh();

                me.destroy();
            }
        );
    }

});