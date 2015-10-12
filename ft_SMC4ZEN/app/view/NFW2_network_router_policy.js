
Ext.define('SMC4ZEN.view.NFW2_network_router_policy', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_policy',

    requires: [
        'SMC4ZEN.view.NFW2_network_router_policyViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.toolbar.Separator',
        'Ext.button.Segmented',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_network_router_policy'
    },
    // cls: 'zen_body',
    id: 'NFW2_network_router_policy',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose: 'saveData'
    },
    overflowY: 'auto',
    title : 'Policy 라우팅',
    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        header: false,
                        title: 'My Form',
                        bodyPadding: 5,
                        items: [
                            {
                                xtype: 'container',
                                id: 'policy_Btn_con',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'toolbar',
                                        flex: 1,
                                        // cls: 'zen_toolbar',
                                        items: [
                                            {
                                                xtype: 'button',
                                                id: 'btn_add',
                                                iconCls: 'ic_add',
                                                bind: {
                                                    text: '{add}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_addClick'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                id: 'btn_del',
                                                iconCls: 'ic_del',
                                                bind: {
                                                    text: '{del}'
                                                },
                                                listeners: {
                                                    click: 'onBtn_delClick'
                                                }
                                            },
                                            {
                                                xtype: 'tbseparator'
                                            },
                                            {
                                                xtype: 'segmentedbutton',
                                                items: [
                                                    {
                                                        id: 'btn_ipv4',
                                                        bind: {
                                                            text: '{ipv4}'
                                                        },
                                                        listeners: {
                                                            click: 'onBtn_ipv4Click'
                                                        }
                                                    },
                                                    {
                                                        id: 'btn_ipv6',
                                                        bind: {
                                                            text: '{ipv6}'
                                                        },
                                                        listeners: {
                                                            click: 'onBtn_ipv6Click'
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'gridpanel',
                                cls: 'in_grid',
                                id: 'policy_grid',
                                margin: '5 0 0 0',
                                header: false,
                                title: 'My Grid Panel',
                                columnLines: true,
                                store: 'store_router_policy_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_n',
                                        width: 60,
                                        align: 'center',
                                        dataIndex: 'num',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return addComma(value);
                                        },
                                        id: 'grid_num',
                                        width: 60,
                                        dataIndex: 'prio_num',
                                        bind: {
                                            text: '{rank}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_srcip',
                                        dataIndex: 'src_ipmask',
                                        flex: 0.2,
                                        bind: {
                                            text: '{src_ipmask}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_dstip',
                                        dataIndex: 'dst_ipmask',
                                        flex: 0.2,
                                        bind: {
                                            text: '{dest_ipmask}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_gate',
                                        dataIndex: 'gateway',
                                        flex: 0.1,
                                        bind: {
                                            text: '{gateway}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_inter',
                                        dataIndex: 'interface',
                                        flex: 0.15,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return (value)?unixTimeConvert(value,"YMDHM","GMT"):"";
                                        },
                                        width: 130,
                                        dataIndex: 'lastupdate',
                                        bind: {
                                            text: '{last_edit}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'grid_desc',
                                        dataIndex: 'desc',
                                        flex: 0.4,
                                        bind: {
                                            text: '{desc}'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width: 50,
                                        align: 'center',
                                        bind: {
                                            text: '{use}'
                                        },
                                        items: [
                                            {
                                                getTip: function(v, metadatam, r) {
                                                    return (r.get('use') === 'on')? __zen("toggle_on"):__zen("toggle_off");
                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var policy = Ext.getCmp('NFW2_network_router_policy');

                                                    var me = this;

                                                    var use = (record.data.use ==="on")?"off":"on";

                                                    var obj = {
                                                        '_id': record.data.id,
                                                        'use': use
                                                    };

                                                    var _params = {
                                                        basename: Ext.encode("network_router_policy"),
                                                        obj : Ext.encode(obj),
                                                        update : Ext.encode(true)
                                                    };

                                                    request_helper.xmlrpc_call_JsonP(
                                                    'ftuctrl',
                                                    'setListTypeObj',
                                                    _params,
                                                    function(response){

                                                        policy.get_store();
                                                    }
                                                    );


                                                },
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                    return (r.get('use') === 'on')? "b_sq_on":"b_sq_off";
                                                }
                                            }
                                        ]
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        if(record.get("use") === "off"){

                                            Ext.Function.defer(function(){
                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                            },100, this);

                                            return "stOff";
                                        }
                                    }
                                },
                                listeners: {
                                    celldblclick: 'onPolicy_gridCellDblClick'
                                },
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel',
                                    mode: 'SIMPLE'
                                })
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onBtn_addClick: function(button, e, eOpts) {
        var win = Ext.create('SMC4ZEN.view.win_router_policy',{
            modal : true
        });

        win.show();
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = this;

        var tbl = Ext.getCmp("policy_grid");
        var tbl_sel = tbl.getSelectionModel().getSelection();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){
                    Ext.data.StoreManager.lookup("store_router_policy_list").remove(tbl_sel);

                    Ext.each(Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_policy, function(record, idx){
                        if(record.route_ip === tbl_sel.data.route_ip && record.data.route_mask === tbl_sel.data.route_mask && record.policy_ip === tbl_sel.data.policy_ip && record.policy_mask === tbl_sel.data.policy_mask &&
                            record.gateway === tbl_sel.data.gateway && record.data.prio_num === tbl_sel.data.prio_num && record.version === tbl_sel.data.version){
                            delete Ext.getCmp('win_zen_device_set').getViewModel().data.network_router_policy[idx];
                            return false;
                        }
                    });
                    // var del = new Array();
                    // for(var i=0; i<tbl_sel.length; i++){
                    //     del.push(tbl_sel[i].data.id);
                    // }

                    // var _params = {
                    //     basename : Ext.encode('network_router_policy'),
                    //     ids : Ext.encode(del)
                    // };

                    // request_helper.xmlrpc_call_JsonP(
                    //     'ftuctrl',
                    //     'delListTypeObj',
                    //     _params,

                    //     function(response){
                    //         Ext.Msg.show({
                    //             title: __weguardia,
                    //             width: 300,
                    //             msg: get_msg('msg_ok_del'),
                    //             buttons: Ext.Msg.OK,
                    //             icon: Ext.window.MessageBox.INFO
                    //         });
                    //         me.get_store();
                    //     }
                    // );
                }
            });
        }
    },

    onBtn_ipv4Click: function(button, e, eOpts) {
        var me = this;

        var ipv4 = Ext.getCmp('btn_ipv4');
        var ipv6 = Ext.getCmp('btn_ipv6');
        var grid_srcip = Ext.getCmp('grid_srcip');
        var grid_dstip = Ext.getCmp('grid_dstip');
        var grid = Ext.getCmp('policy_grid');

        ipv4.toggle(true);
        ipv6.toggle(false);

        grid_srcip.setText(__zen('src_ipmask'));
        grid_dstip.setText(__zen('dest_ipmask'));

        me.ipv = 'v4';

        var records_v4 = [];

        me.get_store();

    },

    onBtn_ipv6Click: function(button, e, eOpts) {
        var me = this;

        var ipv4 = Ext.getCmp('btn_ipv4');
        var ipv6 = Ext.getCmp('btn_ipv6');
        var grid_srcip = Ext.getCmp('grid_srcip');
        var grid_dstip = Ext.getCmp('grid_dstip');
        var grid = Ext.getCmp('policy_grid');

        ipv6.toggle(true);
        ipv4.toggle(false);

        grid_srcip.setText(__zen('src_ippre'));
        grid_dstip.setText(__zen('dest_ippre'));

        me.ipv = 'v6';

        var records_v6 = [];

        me.get_store();

    },

    onPolicy_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 || cellIndex === 9){ return false; }

        var win = Ext.create('SMC4ZEN.view.win_router_policy',{
            edit : "edit",
            modal : true,
            record : record
        });

        win.show();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        var grid = Ext.getCmp('policy_grid');

        var network_interface = Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network;

        if(Ext.getCmp('btn_ipv4').pressed){
            me.ipv= 'v4';
            Ext.getCmp('btn_ipv4').toggle(true);
        }
        else if(Ext.getCmp('btn_ipv6').pressed){
            me.ipv= 'v6';
            Ext.getCmp('btn_ipv6').toggle(true);
        }
        else{
            me.ipv= 'v4';
            Ext.getCmp('btn_ipv4').toggle(true);
        }

        var response = setDevInterface(network_interface.ethernet,network_interface.bridge,network_interface.bonding,network_interface.vlan); 

        var _store = Ext.data.StoreManager.lookup('store_interface');
         _store.loadData(response);

        me.get_store();

    },

    get_store: function() {
        var me = this;

        var records = [];

        var policy_list = me.getViewModel().data.network_router_policy;

        var num = 0;

        for(var i in policy_list){
            if(me.ipv === policy_list[i].version){
                num += 1;
                records.push({
                    num : num,
                    id : policy_list[i]._id,
                    prio_num : policy_list[i].prio_num,
                    interface : policy_list[i].interface,
                    desc : policy_list[i].desc,
                    use : policy_list[i].use,
                    version : policy_list[i].version,
                    gateway : policy_list[i].gateway,
                    src_ipmask : policy_list[i].policy_ip + "/" + policy_list[i].policy_mask,
                    dst_ipmask : policy_list[i].route_ip + "/" + policy_list[i].route_mask,
                    lastupdate : policy_list[i].lastupdate
                });
            }
        }

        var _store = Ext.data.StoreManager.lookup('store_router_policy_list');

        _store.loadData(records);
        console.log(_store);
    },

    saveData: function() {

        console.log('obj - ',Ext.getCmp('win_zen_device_set').getViewModel().data);

        Ext.getCmp('win_zen_device_set').viewState = true;
        return true;
    }

});