
Ext.define('SMC.view.pnl_object_delete_fail', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.resizer.Splitter',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_delete_fail',
    minHeight: 400,
    minWidth: 700,
    padding: '10 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: '삭제 되지 않은 객체',
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
                    xtype: 'label',
                    margin: '0 0 10 0',
                    text: '디폴트 객체와 다른 곳에서 사용중인 객체는 삭제되지 않습니다.'
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_delete_fail',
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
                                            overflowX: 'auto',
                                            header: false,
                                            title: '',
                                            store: 'st_ObjectGroupGrid',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 30,
                                                    align: 'center'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        metaData.tdCls = 'ico_' + record.data._kind + '_16';
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
                                                select: {
                                                    fn: me.onGpn_object_gridSelect,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'splitter'
                                },
                                {
                                    xtype: 'treepanel',
                                    flex: 0.5,
                                    itemId: 'trpn_object_tree',
                                    margin: '0 10 5 0',
                                    autoScroll: true,
                                    title: '연결 객체',
                                    useArrows: true,
                                    viewConfig: {

                                    }
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
                                        button.up('window[itemId="pnl_object_delete_fail"]').destroy();
                                    },
                                    margin: '1 10 1 1',
                                    width: 100,
                                    text: '확인'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_object_selectAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_object_gridSelect: function(rowmodel, record, index, eOpts) {
        var me = this;

        var tree = me.down('treepanel[itemId="trpn_object_tree"]');
        var cid = record.data['@cid'];

        var _svc = 'ftSMC',
            _func = 'getObjectLinkInfo',
            _params = {
                cid : Ext.encode(cid),
                mode : Ext.encode('parent')
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    response.expanded = true;
                    response.iconCls = 'ico_' + response._kind + '_16';

                    if(response.children)
                    {
                        me.tree_add_icon(response.children);
                    }

                    tree.setRootNode(response);
                    tree.getView().refresh();
                }
                else
                {
                    var root_data = {
                        '_kind': record.data._kind,
                        'children': [],
                        'cid': record.data['@cid'],
                        'expanded': false,
                        'iconCls': 'ico_' + record.data._kind + '_16',
                        'text': record.data.name
                    };

                    tree.setRootNode(root_data);
                    tree.getView().refresh();
                }

            }
        );
    },

    onPnl_object_selectAfterRender: function(component, eOpts) {
        var grid = component.down('gridpanel[itemId="gpn_object_grid"]');

        grid.getSelectionModel().select(grid.getStore().getAt(0));

        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                me.destroy();
            }
        });

        var obj_Context_Array = [

            {
                'name' : '엑셀 파일로 출력',
                'itemId' : 'id_objectExcel',
                'children' : null,
                'callback' : function(){
                    component.gridExport();
                }
            }
        ];

        var contextCallback = function(menuInstance){};

        makeContextMenu({'itemId' : 'mn_obj_context', 'width' : 180, 'border' : false}, component, contextCallback, obj_Context_Array);

    },

    loadData: function(data) {
        var me =this;

        var ctn_group = me.down('container[itemId="ctn_delete_fail"]');
        var store = me.down('gridpanel[itemId="gpn_object_grid"]').getStore();

        store.removeAll();

        addExporter(me, 'exportGrid', '#gpn_object_grid', '', 'excel');

        me.show();

        var _svc = 'ftSMC',
            _func = 'getObject';

        var count = 0;

        ctn_group.setLoading(true);

        for(var i in data)
        {
            var obj_array = [];

            _params = {
                cid : Ext.encode(data[i]['@cid'])
            };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    count++;

                    store.add(response);

                    if(count === data.length)
                    {
                        ctn_group.setLoading(false);

                        me.down('gridpanel[itemId="gpn_object_grid"]').getSelectionModel().select(0);
                    }
                }
            );
        }
    },

    tree_add_icon: function(children, treeChildren) {
        var me = this;

        for(var i=0; i<children.length; i++)
        {
            children[i].expanded = true;
            children[i].iconCls = 'ico_' + children[i]._kind + '_16';
            if(children[i].children)
            {
                me.tree_add_icon(children[i].children);
            }
        }
    },

    tree_children: function(children) {
        var me = this;

        for(var i=0; i<children.length; i++)
        {
            if(children[i].children)
                me.children_array.push(children[i].children);

            if(children[i].children)
            {
                me.tree_children(children[i].children);
            }
        }
    },

    gridExport: function() {
        exportGrid(this, 'exportGrid');
    }

});