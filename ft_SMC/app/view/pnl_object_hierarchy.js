
Ext.define('SMC.view.pnl_object_hierarchy', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_object_hierarchy',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.resizer.Splitter',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    border: false,
    height: 550,
    itemId: 'pnl_object_hierarchy',
    minHeight: 550,
    minWidth: 1000,
    padding: '10 20 10 20',
    width: 1000,
    resizable: true,
    constrainHeader: true,
    title: '연결 객체',
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
                    margin: '0 0 10 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            flex: 0.3,
                            itemId: 'typn_hierarchy_tree',
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    padding: 5,
                                    layout: 'fit',
                                    title: '상위 연결',
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            itemId: 'trpn_parent_tree',
                                            useArrows: true,
                                            viewConfig: {

                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    padding: 5,
                                    layout: 'fit',
                                    title: '하위 연결',
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            itemId: 'trpn_children_tree',
                                            useArrows: true,
                                            viewConfig: {

                                            }
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                tabchange: {
                                    fn: me.onTabpanelTabChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'splitter'
                        },
                        {
                            xtype: 'container',
                            flex: 0.7,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'tabpanel',
                                    flex: 1,
                                    itemId: 'tpn_hierarchy_panel',
                                    activeTab: 0,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            padding: 5,
                                            layout: 'fit',
                                            title: '객체',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    itemId: 'gpn_object_grid',
                                                    margin: '0 0 5 0',
                                                    overflowX: 'auto',
                                                    header: false,
                                                    title: '',
                                                    store: 'st_ObjectLink_Object',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            width: 50,
                                                            align: 'center',
                                                            text: 'No'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = 'ico_' + record.data._kind + '_16';
                                                                return value;
                                                            },
                                                            dataIndex: 'text',
                                                            text: '객체명',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'updated',
                                                            text: '수정 시간',
                                                            flex: 0.6
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'modifier',
                                                            text: '수정한 사용자',
                                                            flex: 0.6
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var opt = "";

                                                                var cid = record.data.cid;
                                                                var updated = record.data.updated.replace(/ /gi,"/");

                                                                if(value){

                                                                    opt = '<img width="13" height="13" style="margin-right:3px;margin-bottom:-2px;cursor:pointer" src="../resources/images/icon_option.png" onclick=get_objectlog(\"hierarchy\",\"'+cid+'\",\"'+updated+'\") />';

                                                                }

                                                                return opt;
                                                            },
                                                            hidden: true,
                                                            dataIndex: 'text',
                                                            text: '이력 조회'
                                                        }
                                                    ],
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                                    })
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            padding: 5,
                                            layout: 'fit',
                                            title: '장비',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    itemId: 'gpn_device_grid',
                                                    margin: '0 0 5 0',
                                                    autoScroll: true,
                                                    header: false,
                                                    title: '',
                                                    store: 'st_ObjectLink_Gate',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            width: 50,
                                                            align: 'center',
                                                            text: 'No'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = 'ico_' + record.data._kind + '_16';
                                                                return value;
                                                            },
                                                            dataIndex: 'text',
                                                            text: '장비명',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'updated',
                                                            text: '수정 시간',
                                                            flex: 0.6
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'modifier',
                                                            text: '수정한 사용자',
                                                            flex: 0.6
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var opt = "";

                                                                var cid = record.data.cid;
                                                                var updated = record.data.updated.replace(/ /gi,"/");

                                                                if(value){

                                                                    opt = '<img width="13" height="13" style="margin-right:3px;margin-bottom:-2px;cursor:pointer" src="../resources/images/icon_option.png" onclick=get_objectlog(\"hierarchy\",\"'+cid+'\",\"'+updated+'\") />';

                                                                }

                                                                return opt;
                                                            },
                                                            hidden: true,
                                                            dataIndex: 'text',
                                                            text: '이력 조회'
                                                        }
                                                    ],
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                                    })
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            padding: 5,
                                            layout: 'fit',
                                            title: '보안정책',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    itemId: 'gpn_policy_grid',
                                                    margin: '0 0 5 0',
                                                    autoScroll: true,
                                                    header: false,
                                                    title: '',
                                                    store: 'st_ObjectLink_Policy',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            width: 50,
                                                            align: 'center',
                                                            text: 'No'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = 'ico_' + record.data._kind + '_16';
                                                                return value;
                                                            },
                                                            dataIndex: 'text',
                                                            text: '정책명',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'updated',
                                                            text: '수정 시간',
                                                            flex: 0.6
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'modifier',
                                                            text: '수정한 사용자',
                                                            flex: 0.6
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                var opt = "";

                                                                var cid = record.data.cid;
                                                                var updated = record.data.updated.replace(/ /gi,"/");

                                                                if(value){

                                                                    opt = '<img width="13" height="13" style="margin-right:3px;margin-bottom:-2px;cursor:pointer" src="../resources/images/icon_option.png" onclick=get_objectlog(\"hierarchy\",\"'+cid+'\",\"'+updated+'\") />';

                                                                }

                                                                return opt;
                                                            },
                                                            hidden: true,
                                                            dataIndex: 'text',
                                                            text: '이력 조회'
                                                        }
                                                    ],
                                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                                    })
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
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var me = button.up('window[itemId="pnl_object_hierarchy"]');

                                var hierarchyTab = me.down('tabpanel[itemId="tpn_hierarchy_panel"]');
                                var activeTab = hierarchyTab.getActiveTab();
                                var activeTabIndex = hierarchyTab.items.findIndex('id', activeTab.id);
                                var selected_data;

                                switch(activeTabIndex)
                                {
                                    case 0:
                                    selected_data = activeTab.down('gridpanel[itemId="gpn_object_grid"]').getSelectionModel().getSelection();
                                    break;
                                    case 1:
                                    selected_data = activeTab.down('gridpanel[itemId="gpn_device_grid"]').getSelectionModel().getSelection();
                                    break;
                                    case 2:
                                    selected_data = activeTab.down('gridpanel[itemId="gpn_policy_grid"]').getSelectionModel().getSelection();
                                    break;
                                }

                                if(selected_data)
                                {
                                    if(selected_data.length > 0)
                                    {
                                        var object_name_window = Ext.create('SMC.view.pnl_object_name_mod');

                                        object_name_window.data = me.data;
                                        object_name_window.loadData(selected_data);
                                    }
                                    else
                                    {
                                        alertMessage('데이터를 선택 하시오.');
                                        return false;
                                    }
                                }
                                else
                                {
                                    alertMessage('데이터를 선택 하시오.');
                                    return false;
                                }
                            },
                            margin: '1 10 1 0',
                            minWidth: 140,
                            width: 140,
                            text: '객체명 일괄 변경'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_hierarchy"]').destroy();
                            },
                            margin: 1,
                            width: 100,
                            text: '확인'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_object_hierarchyAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTabpanelTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var me = tabPanel.up('window[itemId="pnl_object_hierarchy"]');

        var activeTabIndex = tabPanel.items.findIndex('id', newCard.id);

        me.down('gridpanel[itemId="gpn_object_grid"]').getStore().removeAll();
        me.down('gridpanel[itemId="gpn_device_grid"]').getStore().removeAll();
        me.down('gridpanel[itemId="gpn_policy_grid"]').getStore().removeAll();

        if(activeTabIndex === 0 && me.parentChildren)
        {
            var parentChildren = JSON.parse(me.parentChildren);

            if(parentChildren.children)
            {
                me.grid_add(parentChildren.children);
            }
        }
        else if(activeTabIndex === 1 && me.childChildren)
        {
            var childChildren = JSON.parse(me.childChildren);

            if(childChildren.children)
            {
                me.grid_add(childChildren.children);
            }
        }

        me.down('gridpanel[itemId="gpn_object_grid"]').getView().refresh();
        me.down('gridpanel[itemId="gpn_device_grid"]').getView().refresh();
        me.down('gridpanel[itemId="gpn_policy_grid"]').getView().refresh();

    },

    onPnl_object_hierarchyAfterRender: function(component, eOpts) {
        var obj_Context_Array = [

            {
                'name' : '엑셀 파일로 출력',
                'itemId' : 'id_objectExcel',
                'children' : null,
                'callback' : function(){
                    component.gridExport();
                }
            },
            {
                'name' : '객체 변경 정보 조회',
                'itemId' : 'id_objectDiff',
                'children' : null,
                'callback' : function(){
                    component.gridDiff();
                }
            }
        ];

        var contextCallback = function(menuInstance){

            var active_tab = component.down('tabpanel[itemId="tpn_hierarchy_panel"]').getActiveTab();
            var idx = component.down('tabpanel[itemId="tpn_hierarchy_panel"]').items.indexOf(active_tab);

            var grid_select;

            menuInstance.down('[itemId=id_objectDiff]').disable();

            switch(idx)
            {
                case 0:
                    grid_select = component.down('gridpanel[itemId="gpn_object_grid"]').getSelectionModel().getSelection()[0];
                    break;
                case 1:
                    grid_select = component.down('gridpanel[itemId="gpn_device_grid"]').getSelectionModel().getSelection()[0];
                    break;
                case 2:
                    grid_select = component.down('gridpanel[itemId="gpn_policy_grid"]').getSelectionModel().getSelection()[0];
                    break;
            }

            if(grid_select)
            {
                menuInstance.down('[itemId=id_objectDiff]').enable();
            }
        };

        makeContextMenu({'itemId' : 'mn_obj_context', 'width' : 180, 'border' : false}, component, contextCallback, obj_Context_Array);

    },

    loadData: function(data, data_parent, data_children) {
        var me = this;

        me.data = data;

        me.down('gridpanel[itemId="gpn_object_grid"]').getStore().removeAll();
        me.down('gridpanel[itemId="gpn_device_grid"]').getStore().removeAll();
        me.down('gridpanel[itemId="gpn_policy_grid"]').getStore().removeAll();

        addExporter(me, 'exportGrid_object', '#gpn_object_grid', '', 'excel');
        addExporter(me, 'exportGrid_device', '#gpn_device_grid', '', 'excel');
        addExporter(me, 'exportGrid_policy', '#gpn_policy_grid', '', 'excel');

        console.log('data - ', data);
        console.log('data_parent - ', data_parent);
        console.log('data_children - ', data_children);

        if(data_parent)
        {
            data_parent.expanded = true;
            data_parent.iconCls = 'ico_' + data_parent._kind + '_16';
            me.tree_add_icon(data_parent.children);

            me.parentChildren = JSON.stringify(data_parent);

            me.grid_add(data_parent.children);

            me.down('treepanel[itemId="trpn_parent_tree"]').setRootNode(data_parent);
            me.down('treepanel[itemId="trpn_parent_tree"]').getView().refresh();
        }
        else
        {
            var root_data;

            if(data._kind === 'devices')
            {
                root_data = {
                    '_kind': 'obj_dev_xtm',
                    'children': [],
                    'cid': data['@cid'],
                    'expanded': false,
                    'iconCls': 'ico_obj_dev_xtm_16',
                    'text': data.name,
                    'updated': '',
                    'modifire': ''
                };
            }
            else
            {
                root_data = {
                    '_kind': data._kind,
                    'children': [],
                    'cid': data['@cid'],
                    'expanded': false,
                    'iconCls': 'ico_' + data._kind + '_16',
                    'text': data.name,
                    'updated': '',
                    'modifire': ''
                };
            }

            me.down('treepanel[itemId="trpn_parent_tree"]').setRootNode(root_data);
            me.down('treepanel[itemId="trpn_parent_tree"]').getView().refresh();
        }

        if(data_children)
        {
            data_children.expanded = true;
            data_children.iconCls = 'ico_' + data_children._kind + '_16';
            me.tree_add_icon(data_children.children);

            me.childChildren = JSON.stringify(data_children);

            me.down('treepanel[itemId="trpn_children_tree"]').setRootNode(data_children);
        }
        else
        {
            if(data._kind === 'devices')
            {
                root_data = {
                    '_kind': 'obj_dev_xtm',
                    'children': [],
                    'cid': data['@cid'],
                    'expanded': false,
                    'iconCls': 'ico_obj_dev_xtm_16',
                    'text': data.name,
                    'updated': '',
                    'modifire': ''
                };
            }
            else
            {
                root_data = {
                    '_kind': data._kind,
                    'children': [],
                    'cid': data['@cid'],
                    'expanded': false,
                    'iconCls': 'ico_' + data._kind + '_16',
                    'text': data.name,
                    'updated': '',
                    'modifire': ''
                };
            }

            me.down('treepanel[itemId="trpn_children_tree"]').setRootNode(root_data);
        }

        me.show();
    },

    tree_add_icon: function(children) {
        for(var i=0; i<children.length; i++)
        {
            children[i].expanded = true;
            children[i].iconCls = 'ico_' + children[i]._kind + '_16';
            if(children[i].children)
                this.tree_add_icon(children[i].children);
        }
    },

    grid_add: function(children) {
        var me = this;

        for(var i=0; i<children.length; i++)
        {
            if(children[i]._kind.match('obj_ip') || children[i]._kind.match('obj_svc') ||
              children[i]._kind.match('obj_schedule') ||children[i]._kind.match('obj_ipsec') ||
              children[i]._kind.match('obj_qos') ||children[i]._kind.match('obj_session_limit') ||
              children[i]._kind.match('obj_usr') ||children[i]._kind.match('obj_ssl') ||
              children[i]._kind.match('obj_waf'))
            {
                me.down('gridpanel[itemId="gpn_object_grid"]').getStore().each(function(record, idx){

                   if(record.data.cid === children[i].cid)
                   {
                       me.down('gridpanel[itemId="gpn_object_grid"]').getStore().removeAt(idx);
                       return false;
                   }

                });

                me.down('gridpanel[itemId="gpn_object_grid"]').getStore().add(children[i]);
            }
            else if(children[i]._kind === 'obj_dev_xtm')
            {
                me.down('gridpanel[itemId="gpn_device_grid"]').getStore().each(function(record, idx){

                    if(record.data.cid === children[i].cid)
                    {
                        me.down('gridpanel[itemId="gpn_device_grid"]').getStore().removeAt(idx);
                        return false;
                    }
                });

                me.down('gridpanel[itemId="gpn_device_grid"]').getStore().add(children[i]);
            }
            else
            {
                me.down('gridpanel[itemId="gpn_policy_grid"]').getStore().each(function(record, idx){

                    if(record.data.cid === children[i].cid)
                    {
                        me.down('gridpanel[itemId="gpn_policy_grid"]').getStore().removeAt(idx);
                        return false;
                    }
                });

                me.down('gridpanel[itemId="gpn_policy_grid"]').getStore().add(children[i]);
            }

            if(children[i].children)
            {
                me.grid_add(children[i].children);
            }
        }
    },

    gridExport: function() {
        var me = this;

        var active_tab = me.down('tabpanel[itemId="tpn_hierarchy_panel"]').getActiveTab();
        var idx = me.down('tabpanel[itemId="tpn_hierarchy_panel"]').items.indexOf(active_tab);

        switch(idx)
        {
            case 0:
                exportGrid(me, 'exportGrid_object');
                break;
            case 1:
                exportGrid(me, 'exportGrid_device');
                break;
            case 2:
                exportGrid(me, 'exportGrid_policy');
                break;
        }
    },

    gridDiff: function() {
        var me = this;

        var active_tab = me.down('tabpanel[itemId="tpn_hierarchy_panel"]').getActiveTab();
        var idx = me.down('tabpanel[itemId="tpn_hierarchy_panel"]').items.indexOf(active_tab);

        var record;

        switch(idx)
        {
            case 0:
                record = me.down('gridpanel[itemId="gpn_object_grid"]').getSelectionModel().getSelection()[0];
                break;
            case 1:
                record = me.down('gridpanel[itemId="gpn_device_grid"]').getSelectionModel().getSelection()[0];
                break;
            case 2:
                record = me.down('gridpanel[itemId="gpn_policy_grid"]').getSelectionModel().getSelection()[0];
                break;
        }
        console.log('record - ', record);
        if(record)
        {
            var cid = record.data.cid;
            var updated = record.data.updated.replace(/ /gi,"/");

            get_objectlog("hierarchy", cid, updated);
        }
    }

});