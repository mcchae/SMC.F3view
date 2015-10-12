
Ext.define('SSL.view.MyViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View'
    ],

    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'pnl_ssl_log',
                    itemId: 'pnl_ssl_log',
                    layout: 'border',
                    header: false,
                    items: [
                        {
                            xtype: 'panel',
                            region: 'west',
                            split: true,
                            itemId: 'pnl_ssl_tree',
                            width: 300,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'treepanel',
                                    flex: 1,
                                    itemId: 'tpn_ssl_tree',
                                    width: 250,
                                    title: '장비그룹',
                                    viewConfig: {

                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_ssl_devices',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'string',
                                            text: 'String'
                                        },
                                        {
                                            xtype: 'numbercolumn',
                                            dataIndex: 'number',
                                            text: 'Number'
                                        },
                                        {
                                            xtype: 'datecolumn',
                                            dataIndex: 'date',
                                            text: 'Date'
                                        },
                                        {
                                            xtype: 'booleancolumn',
                                            dataIndex: 'bool',
                                            text: 'Boolean'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            region: 'center',
                            border: false,
                            title: '검색결과'
                        },
                        {
                            xtype: 'panel',
                            region: 'east',
                            split: true,
                            width: 300,
                            title: '검색조건'
                        }
                    ],
                    listeners: {
                        afterrender: {
                            fn: me.onPnl_ssl_logAfterRender,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onPnl_ssl_logAfterRender: function(component, eOpts) {
        obj = {};
        obj.pnl_ssl_tree = component.getComponent('pnl_ssl_tree');
        obj.tpn_ssl_tree = component.getComponent('pnl_ssl_tree').getComponent('tpn_ssl_tree');
        obj.gpn_ssl_devices = component.getComponent('pnl_ssl_tree').getComponent('gpn_ssl_devices');

        obj.store = Ext.create('Ext.data.Store', {
            fields : [
                {
                    name : 'name'
                },
                {
                    name : 'ip'
                }
            ]
        });

        obj.column = [
            { text:'장비 이름', dataIndex:'name', width:150 },
            { text:'IP 주소', dataIndex:'ip', width:140 }
        ];

        obj.gpn_ssl_devices.reconfigure(obj.store, obj.column);


        obj.tpn_ssl_tree.addListener('itemclick', function(node, record, item, index, event, eOpts)
                                     {
                                         Ext.Ajax.request(
                                             {
                                                 url : 'api/ftSSL/GetDevices',
                                                 params : {
                                                     parent : Ext.encode(record.raw._id)
                                                 },
                                                 success : function(res_data)
                                                 {
                                                     var resObj = JSON.parse(res_data.responseText);
                                                     console.log(resObj);
                                                     obj.store.loadData(resObj);
                                                 }
                                             }
                                         );
                                     });

        Ext.Ajax.request(
            {
                url : 'api/ftSSL/GetGroup',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    obj.tpn_ssl_tree.setRootNode(resObj);
                }
            }
        );


    }

});