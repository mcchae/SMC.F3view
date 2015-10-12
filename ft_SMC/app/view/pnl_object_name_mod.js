
Ext.define('SMC.view.pnl_object_name_mod', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    border: false,
    height: 150,
    itemId: 'pnl_object_name_mod',
    minHeight: 150,
    minWidth: 350,
    padding: 10,
    width: 350,
    constrainHeader: true,
    title: '객체명 일괄 변경',
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
                    itemId: 'ctn_name_mod',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 0.8,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_objectname',
                                    fieldLabel: '객체명',
                                    labelWidth: 60
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 0.3,
                            itemId: '',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_name_mod"]').saveData();
                                    },
                                    margin: '0, 10, 0, 0',
                                    width: 100,
                                    text: '확 인'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_name_mod"]').destroy();
                                    },
                                    width: 100,
                                    text: '취 소'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    loadData: function(record) {
        var me = this;

        var cid_array = [];

        Ext.each(record, function(data, idx){
            cid_array.push(data.raw.cid);
        });

        me.cids = cid_array;

        me.show();
    },

    saveData: function() {
        var me = this;

        var name = me.down('textfield[itemId="txf_objectname"]').getValue();

        function arrayCheck(arr) {

            var a = [];
            var i = 0;

            arr.sort();

            while(arr.length > 0) {

                var newKey = arr.shift();

                if(i === 0) {

                    a.push(newKey);
                    i++;

                } else if(a[i-1] != newKey) {

                    a.push(newKey);
                    i++;
                }
            }
            return a;
        }

        me.cids = arrayCheck(me.cids);

        var _svc = 'ftSMC',
            _func = 'modObjectName',
            _params = {
                cid : Ext.encode(me.cids),
                name : Ext.encode(name)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    var h_wnd = Ext.ComponentQuery.query('#pnl_object_hierarchy')[0];
                    var treeTab = h_wnd.down('tabpanel[itemId="typn_hierarchy_tree"]');
                    var activeTab = treeTab.getActiveTab();
                    var activeTabIndex = treeTab.items.findIndex('id', activeTab.id);
                    var treepanel;

                    _func = 'getObjectLinkInfo';

                    if(activeTabIndex === 0)
                    {
                        _params = {
                            cid : Ext.encode(me.data['@cid']),
                            mode : Ext.encode('parent')
                        };

                        treepanel = h_wnd.down('treepanel[itemId="trpn_parent_tree"]');
                    }
                    else
                    {
                        _params = {
                            cid : Ext.encode(me.data['@cid']),
                            mode : Ext.encode('children')
                        };

                        treepanel = h_wnd.down('treepanel[itemId="trpn_children_tree"]');
                    }

                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        _params,
                        function(data){

                            h_wnd.down('gridpanel[itemId="gpn_object_grid"]').getStore().removeAll();
                            h_wnd.down('gridpanel[itemId="gpn_device_grid"]').getStore().removeAll();
                            h_wnd.down('gridpanel[itemId="gpn_policy_grid"]').getStore().removeAll();

                            if(data)
                            {
                                data.expanded = true;
                                data.iconCls = 'ico_' + data._kind + '_16';
                                h_wnd.tree_add_icon(data.children);

                                h_wnd.parentChildren = JSON.stringify(data);

                                h_wnd.grid_add(data.children);

                                treepanel.setRootNode(data);
                                treepanel.getView().refresh();
                            }
                            else
                            {
                                var root_data = {
                                    '_kind': data._kind,
                                    'children': [],
                                    'cid': data['@cid'],
                                    'expanded': false,
                                    'iconCls': 'ico_' + data._kind + '_16',
                                    'text': data.name
                                };

                                treepanel.setRootNode(root_data);
                                treepanel.getView().refresh();
                            }

                            if(typeof me.closeEvent === 'function'){
                                me.closeEvent();
                            }

                            me.destroy();
                        }
                    );
                }
            }
        );
    }

});