
Ext.define('SMC4ZEN.view.pnl_object_select', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_object_select',

    requires: [
        'SMC4ZEN.view.pnl_object_selectViewModel',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.resizer.Splitter',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.toolbar.Paging',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_object_select'
    },
    border: false,
    height: 400,
    itemId: 'pnl_object_select',
    minHeight: 400,
    minWidth: 800,
    padding: 10,
    resizable: true,
    width: 800,
    constrainHeader: true,
    title: '객체 선택',
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
            itemId: 'ctn_select',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    margin: '0 0 10 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'treepanel',
                            getGridList: function(record) {
                                var me = this.up('window[itemId="pnl_object_select"]');

                                var object_grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                var object_store = object_grid.getStore();
                                var paging_toolbar = me.down('pagingtoolbar[itemId="ptb_objectList"]');
                                console.log('record - ', record);
                                if(record.data._kind === 'obj_dev_xtm' || record.data._kind === 'obj_ip_v6_addr' || record.data._kind === 'obj_ip_v6_group' || record.data._kind === 'obj_ssl_svr_group')
                                {
                                    if(object_store.getProxy().url !== 'api/ftSMC/getObjectList/')
                                    {
                                        object_store.getProxy().url = 'api/ftSMC/getObjectList/';
                                    }

                                    object_store.getProxy().extraParams = {
                                        g_cid : Ext.encode(record.data.cid),
                                        isRecursive : Ext.encode(true)
                                    };

                                    object_store.loadPage(1);
                                }
                                else
                                {
                                    object_store.removeAll();
                                }
                            },
                            flex: 0.5,
                            itemId: 'trpn_object_tree',
                            margin: 1,
                            title: '',
                            hideHeaders: true,
                            useArrows: true,
                            listeners: {
                                select: 'onTrpn_object_treeSelect'
                            }
                        },
                        {
                            xtype: 'splitter'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_object_grid',
                                    margin: '0 0 5 0',
                                    header: false,
                                    title: '',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            width: 30,
                                            align: 'center'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(record.data._kind  === 'devices')
                                                {
                                                    metaData.tdCls = 'ico_obj_dev_xtm_16';
                                                }
                                                else
                                                {
                                                    metaData.tdCls = 'ico_' + record.data._kind + '_16';
                                                }
                                                return value;
                                            },
                                            width: 163,
                                            dataIndex: 'name',
                                            text: '객체명'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 221,
                                            dataIndex: 'desc',
                                            text: '객체 설명',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        itemdblclick: 'onGpn_object_gridItemDblClick'
                                    },
                                    dockedItems: [
                                        {
                                            xtype: 'pagingtoolbar',
                                            dock: 'bottom',
                                            itemId: 'ptb_objectList',
                                            margin: '0 0 1 0',
                                            width: 360,
                                            afterPageText: '전체 페이지 {0}',
                                            beforePageText: '페이지',
                                            displayInfo: true,
                                            displayMsg: '{2} 결과 중 {0} - {1}',
                                            emptyMsg: '결과 없음',
                                            firstText: '처음 페이지',
                                            lastText: '마지막 페이지',
                                            nextText: '다음 페이지',
                                            prevText: '이전 페이지',
                                            refreshText: '새로고침'
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
                                            xtype: 'textfield',
                                            flex: 3.5,
                                            itemId: 'txf_search',
                                            margin: '1 10 1 0',
                                            fieldLabel: '',
                                            labelWidth: 80
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var me = button.up('window[itemId="pnl_object_select"]');

                                                var object_grid = me.down('gridpanel[itemId="gpn_object_grid"]');
                                                var object_store = object_grid.getStore();
                                                var search_name = me.down('textfield[itemId="txf_search"]').getValue();
                                                var paging_toolbar = me.down('pagingtoolbar[itemId="ptb_objectList"]');
                                                var treeObj = me.down('treepanel[itemId="trpn_object_tree"]');

                                                var _svc = 'ftSMC',
                                                    _func = '',
                                                    _params = {
                                                        g_cid : Ext.encode(me.group_cid)
                                                    };

                                                if(search_name)
                                                {
                                                    var _kind =[];

                                                    if(me.object_type === 'obj_ssl_svr_group')
                                                    {
                                                        _func = 'getObjectList';
                                                        _kind = ['obj_ssl_svr_group'];

                                                    }
                                                    else if(me.object_type === 'obj_ip')
                                                    {
                                                        _func = 'getObjectList';
                                                        _kind = ['obj_ip_v6_addr', 'obj_ip_v6_group'];

                                                        if(treeObj.getSelectionModel().getSelection()[0])
                                                        {
                                                            if(treeObj.getSelectionModel().getSelection()[0].raw._kind)
                                                            {
                                                                _kind = [treeObj.getSelectionModel().getSelection()[0].raw._kind];
                                                            }
                                                            else if(treeObj.getSelectionModel().getSelection()[0].raw.gtype)
                                                            {
                                                                _kind = [treeObj.getSelectionModel().getSelection()[0].raw.gtype];
                                                            }
                                                        }
                                                    }
                                                    else if(me.object_type === 'obj_dev')
                                                    {
                                                        _func = 'getDeviceList';
                                                        _kind = ['obj_dev_xtm'];
                                                    }

                                                    var condition = {
                                                        name : search_name,
                                                        op_in : true,
                                                        kind : _kind
                                                    };

                                                    if(condition)
                                                    {
                                                        object_store.getProxy().extraParams = {
                                                            condition : Ext.encode(condition)
                                                        };

                                                        if(object_store.getProxy().url !== 'api/ftSMC/findObjectList/')
                                                        {
                                                            object_store.getProxy().url = 'api/ftSMC/findObjectList/';
                                                        }

                                                        object_store.loadPage(1);
                                                    }
                                                }
                                            },
                                            margin: 1,
                                            width: 100,
                                            text: '검색'
                                        }
                                    ]
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
                                button.up('window[itemId="pnl_object_select"]').saveData();
                            },
                            margin: '1 10 1 0',
                            width: 100,
                            text: '선택'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_select"]').destroy();
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
        afterrender: 'onPnl_object_selectAfterRender'
    },

    onTrpn_object_treeSelect: function(rowmodel, record, index, eOpts) {
        this.down('treepanel[itemId="trpn_object_tree"]').getGridList(record);
    },

    onGpn_object_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        this.saveData();
    },

    onPnl_object_selectAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    loadData: function(kind) {
        var me =this;

        me.down('gridpanel[itemId="gpn_object_grid"]').bindStore(Ext.create('SMC4ZEN.store.st_ObjectGroupGrid'));
        me.down('toolbar[itemId="ptb_objectList"]').bindStore(me.down('gridpanel[itemId="gpn_object_grid"]').getStore());

        var ctn_group = me.down('container[itemId="ctn_select"]');
        var tree = me.down('treepanel[itemId="trpn_object_tree"]');

        me.object_type = kind;

        me.show();

        ctn_group.setLoading(true);

        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode(kind)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                ctn_group.setLoading(false);

                me.group_cid = response.cid;

                if(kind === 'obj_ip')
                {
                    for(var i=0; i<response.children.length; i++)
                    {
                        if(response.children[i].gtype !== 'obj_ip_v6_group' && response.children[i].gtype !== 'obj_ip_v6_addr')
                        {
                            response.children.splice(i,1);
                            i = -1;
                        }
                    }
                    tree.rootVisible = false;
                }

                tree_children_expand(response.children);
                tree.setRootNode(response);
                tree.getView().refresh();

            }
        );
    },

    saveData: function() {
        var me = this;

        var select_grid = me.down('gridpanel[itemId="gpn_object_grid"]').getSelectionModel().getSelection()[0];

        if(select_grid)
        {
            switch(me.object_type)
            {
                case 'obj_ssl_svr_group':
                    var wnd_user = Ext.ComponentQuery.query('window[itemId="pnl_object_user"]')[0];

                    if(!wnd_user.object.group)
                    {
                        wnd_user.object.group = {
                            '#text': '',
                            '#@cid': null,
                            '#@otype' : ''
                        };
                    }

                    wnd_user.object.group['#text'] = select_grid.data.name;
                    wnd_user.object.group['@cid'] = select_grid.data['@cid'];
                    wnd_user.object.group['@otype'] = 'Any';
                    wnd_user.down('textfield[itemId="txf_group"]').setValue(select_grid.data.name);
                    break;
                case 'obj_ip':
                    var wnd_ipv6_header = Ext.ComponentQuery.query('window[itemId="pnl_object_ipv6_header"]')[0];

                    wnd_ipv6_header.object.route.member['#text'] = select_grid.data.name;
                    wnd_ipv6_header.object.route.member['@cid'] = select_grid.data['@cid'];

                    if(select_grid.data._kind === 'obj_ip_v6_group')
                    {
                        wnd_ipv6_header.object.route.member['@otype'] = 'group';
                    }
                    else if(select_grid.data._kind === 'obj_ip_v6_addr')
                    {
                        wnd_ipv6_header.object.route.member['@otype'] = 'single';
                    }

                    wnd_ipv6_header.down('textfield[itemId="txf_route"]').setValue(select_grid.data.name);
                    break;
                case 'obj_dev':
                    var wnd_gate = Ext.ComponentQuery.query('window[itemId="pnl_object_ipsec_gate"]')[0];

                    wnd_gate.down('textfield[itemId="txf_id"]').setValue(select_grid.data.name);
                    wnd_gate.down('textfield[itemId="txf_cid"]').setValue(select_grid.data['@cid']);
                    break;
            }

            if(typeof me.closeEvent === 'function'){
                me.closeEvent();
            }

            me.destroy();
        }
    }

});