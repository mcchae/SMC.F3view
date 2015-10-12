
Ext.define('MyApp.view.MyViewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.toolbar.Separator',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.button.Split',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    layout: 'fit',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    frame: true,
                    layout: 'border',
                    items: [
                        {
                            xtype: 'panel',
                            flex: 0.3,
                            region: 'west',
                            split: true,
                            width: 150,
                            layout: 'accordion',
                            collapsible: true,
                            title: 'Log Viewer',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: '추가',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: '수정',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick2,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            text: '삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick3,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'tbseparator'
                                        },
                                        {
                                            xtype: 'button',
                                            text: '검색'
                                        }
                                    ]
                                }
                            ],
                            items: [
                                {
                                    xtype: 'treepanel',
                                    title: 'WeGuardia XTM',
                                    store: 'MyJsonPTreeStore',
                                    rootVisible: false,
                                    viewConfig: {
                                        id: 'id_tree_object',
                                        plugins: [
                                            Ext.create('Ext.tree.plugin.TreeViewDragDrop', {

                                            })
                                        ]
                                    },
                                    listeners: {
                                        itemcontextmenu: {
                                            fn: me.onTreepanelItemContextMenu,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'treepanel',
                                    title: 'SecuwayGate/UTM',
                                    viewConfig: {

                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            region: 'center',
                            header: false,
                            title: 'My Panel',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'panel',
                                    flex: 0.3,
                                    collapsible: true,
                                    title: 'Option',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'form',
                                            bodyPadding: 10,
                                            header: false,
                                            title: 'My Form',
                                            fieldDefaults: {
                                                labelAlign: 'left',
                                                labelWidth: 90,
                                                anchor: '100%'
                                            },
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Label'
                                                },
                                                {
                                                    xtype: 'datefield',
                                                    fieldLabel: 'Label'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    flex: 0.7,
                                    layout: 'fit',
                                    title: 'My Panel',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            frame: false,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    width: 100,
                                                    text: 'chart',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onButtonClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'tbseparator'
                                                },
                                                {
                                                    xtype: 'splitbutton',
                                                    width: 100,
                                                    text: 'Export',
                                                    menu: {
                                                        xtype: 'menu',
                                                        items: [
                                                            {
                                                                xtype: 'menuitem',
                                                                text: 'Menu Item'
                                                            },
                                                            {
                                                                xtype: 'menuitem',
                                                                text: 'Menu Item'
                                                            }
                                                        ]
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            header: false,
                                            title: 'My Grid Panel',
                                            columnLines: true,
                                            columns: [
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
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'string',
                                                    text: 'Source'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text: 'Destination'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    text: 'Description'
                                                }
                                            ],
                                            dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    dock: 'bottom',
                                                    width: 360,
                                                    displayInfo: true
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
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        var record = Ext.getCmp('id_tree_object').getSelectionModel().getSelection()[0];

        if(record === undefined || record.raw.type === '')
            return Ext.Msg.alert('Error','오브젝트를 선택하세요.');

        Ext.Msg.prompt('그룹 등록', '그룹 이름을 입력하세요 :', function(btn, text){
            if (btn == 'ok'){

                //                         var test = Ext.getStore('id_add_group_store');
                //                         test.getProxy().setExtraParam('group_name', Ext.encode(text));
                //                         test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

                //                         test.load();

                record.set('leaf', false);

                record.appendChild({
                    leaf: true,
                    text: text
                });

                record.expand();
            }
        });
    },

    onButtonClick2: function(button, e, eOpts) {
        var record = Ext.getCmp('id_tree_object').getSelectionModel().getSelection()[0];

        if(record === undefined || record.raw.type === '')
            return Ext.Msg.alert('Error','오브젝트를 선택하세요.');

        Ext.Msg.prompt('그룹 수정', '그룹 이름을 입력하세요 :', function(btn, text){
            if (btn == 'ok'){

                //                     var test = Ext.getStore('id_modify_group_store');
                //                     test.getProxy().setExtraParam('group_name', Ext.encode(text));
                //                     test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

                //                     test.load();

                record.set('text', text);

                //         var store_obj = Ext.getStore('id_jsonp_tree_object');
                //         store_obj.sync();
            }
        }, [], 0, record.data.text);
    },

    onButtonClick3: function(button, e, eOpts) {
        var record = Ext.getCmp('id_tree_object').getSelectionModel().getSelection()[0];

        if(record === undefined || record.raw.type === '')
            return Ext.Msg.alert('Error','오브젝트를 선택하세요.');

        if (record.data.depth > 2)
        {
            Ext.Msg.show({
                title:'그룹 삭제',
                msg: '그룹을 삭제하시겠습니까?',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                fn: showResult
            });
        }
        else
        {
            return Ext.Msg.alert('Error','하위 그룹을 선택하세요.');
        }

        function showResult(btn){
            if(btn == 'yes'){

                //                         var test = Ext.getStore('id_delete_group_store');
                //                         test.getProxy().setExtraParam('group_cid', Ext.encode(record.raw.cid));

                //                         test.load();

                record.parentNode.set('leaf', true);
                record.destroy();
            }
        }
    },

    onTreepanelItemContextMenu: function(dataview, record, item, index, e, eOpts) {
        var menu_grid = new Ext.menu.Menu({
            items:
            [
                {
                    text: '그룹 추가',
                    handler: function() {
                        Ext.Msg.prompt('그룹 등록', '그룹 이름을 입력하세요 :', function(btn, text){
                            if (btn == 'ok'){

        //                         var test = Ext.getStore('id_add_group_store');
        //                         test.getProxy().setExtraParam('group_name', Ext.encode(text));
        //                         test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

        //                         test.load();

                                record.set('leaf', false);

                                record.appendChild({
                                    leaf: true,
                                    text: text
                                });

                                record.expand();
                            }
                        });
                    }
                },
                {
                    text: '그룹 수정',
                    handler: function() {
                        Ext.Msg.prompt('그룹 수정', '그룹 이름을 입력하세요 :', function(btn, text){
                        if (btn == 'ok'){

        //                     var test = Ext.getStore('id_modify_group_store');
        //                     test.getProxy().setExtraParam('group_name', Ext.encode(text));
        //                     test.getProxy().setExtraParam('target_cid', Ext.encode(record.raw.cid));

        //                     test.load();

                            record.set('text', text);

                    //         var store_obj = Ext.getStore('id_jsonp_tree_object');
                    //         store_obj.sync();
                        }
                    }, [], 0, record.data.text);
                    }
                },
                {
                    text: '그룹 삭제',
                    handler: function() {
                        if (record.data.depth > 2)
                        {
                            Ext.Msg.show({
                                 title:'그룹 삭제',
                                 msg: '그룹을 삭제하시겠습니까?',
                                 buttons: Ext.Msg.YESNO,
                                 icon: Ext.Msg.QUESTION,
                                 fn: showResult
                            });
                        }
                        else
                        {
                            return Ext.Msg.alert('Error','하위 그룹을 선택하세요.');
                        }

                        function showResult(btn){
                            if(btn == 'yes'){

        //                         var test = Ext.getStore('id_delete_group_store');
        //                         test.getProxy().setExtraParam('group_cid', Ext.encode(record.raw.cid));

        //                         test.load();

                                record.parentNode.set('leaf', true);
                                record.destroy();
                            }
                        }
                    }
                }
            ]
        });

        e.stopEvent();
        menu_grid.showAt(e.getXY());
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('Ext.window.Window', {
            autoShow: true,
            title: 'Resize Me',
            width: 500,
            height: 300,
            layout: 'fit',
            resizable: false,
            plain: true,
        //     items: form,

            buttons: [{
                text: 'Send'
            },{
                text: 'Cancel'
            }]
        });
    }

});