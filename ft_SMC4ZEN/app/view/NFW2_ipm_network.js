
Ext.define('SMC4ZEN.view.NFW2_ipm_network', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ipm_network',

    requires: [
        'SMC4ZEN.view.NFW2_ipm_networkViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_ipm_network'
    },
    id: 'NFW2_ipm_network',
    defaultListenerScope: true,
    overflowY: 'auto',
    title : '관리 네트워크',
    items: [
        {
            xtype: 'form',
            header: false,
            bodyPadding: 5,
            layout:{
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'toolbar',
                    margin : '0 5 0 -5',
                    // cls: 'zen_toolbar',
                    items: [
                        {
                            xtype: 'button',
                            iconCls: 'ic_add',
                            bind: {
                                text: '{add}'
                            },
                            listeners: {
                                click: 'onButtonClick'
                            }
                        },
                        {
                            xtype: 'button',
                            iconCls: 'ic_del',
                            bind: {
                                text: '{del}'
                            },
                            listeners: {
                                click: 'onButtonClick1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'ipm_network_grid',
                            header: false,
                            columnLines: true,
                            store: 'store_ipm_network_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 40,
                                    align: 'center',
                                    dataIndex: 'string',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    flex: 2,
                                    bind: {
                                        text: '{obj_name}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    flex: 1,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ip',
                                    flex: 2,
                                    bind: {
                                        text: '{network}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === "accept"){ return "탐지"; }
                                        else{ return "차단"; }
                                    },
                                    align: 'center',
                                    dataIndex: 'action',
                                    text: '기본 행위',
                                    flex: 0.8
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if(value === null){ return ""; }

                                        return value + "분";
                                    },
                                    dataIndex: 'cycle',
                                    text: 'IP Scan 실행 주기',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value + "개";
                                    },
                                    dataIndex: 'count',
                                    text: '초당 IP Scan 개수',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    flex: 3,
                                    bind: {
                                        text: '{desc}'
                                    }
                                }
                            ],
                            selModel: {
                                selType: 'checkboxmodel',
                                mode: 'SIMPLE'
                            },
                            listeners: {
                                celldblclick: 'onIpm_network_gridCellDblClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose : 'saveData'
    },

    onIpm_network_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        
        if(cellIndex === 0){ return false; }

        var win = Ext.create('SMC4ZEN.view.win_ipm_network',{
            edit : "edit",
            modal : true,
            record : record
        });

        win.show();

    },

    onButtonClick: function(button, e, eOpts) {

        var me = this;
        var store = Ext.data.StoreManager.lookup('store_ipm_network_list');

        if(store.getCount() >= me.network_cnt){

            Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.network_cnt));

            return false;

        }

        var win = Ext.create('SMC4ZEN.view.win_ipm_network',{

            modal : true

        });

        win.show();

    },

    onButtonClick1: function(button, e, eOpts) {
        
        var me = this;
        var gpn_ipmlist = Ext.getCmp("ipm_network_grid");
        var sel_ipmlist = gpn_ipmlist.getSelection();
        var st_ipmanager = Ext.data.StoreManager.lookup('store_ipm_network_list');

        if(sel_ipmlist.length === 0){

            Ext.Msg.alert(__weguardia, get_msg("sel_del"));

            return false;

        }
        else{

            Ext.MessageBox.confirm(__weguardia, get_msg("conf_del"), function(btn){

                if(btn === "yes"){

                    st_ipmanager.remove(sel_ipmlist);

                }

            });

        }

    },

    onPanelAfterRender: function(component, eOpts) {

        var me = this;
        var vm = me.getViewModel().getData();
        var st_ipmanager = Ext.data.StoreManager.lookup('store_ipm_network_list');
        
        this.fieldInfo = makeZenTip();
        
        if('network_ipm_manager' in vm){

            st_ipmanager.loadData(vm.network_ipm_manager);

        }

    },

    saveData : function(component, eOpts){

        var me = this;
        var vm = component.parentObj.getViewModel();
        var st_ipmanager = Ext.data.StoreManager.lookup('store_ipm_network_list');

        if(vm.getData().network_ipm_manager){

            var vm_savedata = [];
            var ipmanager_data = st_ipmanager.getData();

            for(var i = 0, max = ipmanager_data.items.length; i < max; i++){

                delete ipmanager_data.items[i].get('id');

                vm_savedata.push(ipmanager_data.items[i].data);

            }

            vm.set('network_ipm_manager', vm_savedata);

            st_ipmanager.removeAll();

        }

        me.parentObj.viewState = true;

        return true;

    }

    // SMC4ZEN에서 더이상 사용하지 않습니다.
    /*
    get_ipm_network: function() {
        
        var _params = {
            basename : Ext.encode("network_ipm_manager")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(data){
                        var _params = {
                            basename : Ext.encode("network_ipm_scan")
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'getObjects',
                            _params,

                            function(data2){
                                console.log(data);
                                console.log(data2);
                hideLoadMask();
                var record = [];
                if(data.list !== null){
                    for(var i in data.list){
                        record.push({
                            'name' : data.list[i].name,
                            'interface' : data.list[i].interface,
                            'ip' : data.list[i].ip,
                            'action' : data.list[i].action,
                            'desc' : data.list[i].desc,
                            'id' : data.list[i]._id,
                            //                             'scan_id' : data2.list[i]._id,
                            'cycle' : data.list[i].cycle,
                            'count' : data.list[i].count,
                            'cycle_chk' : data.list[i].cycle_chk
                        });
                    }

                    var store = Ext.data.StoreManager.lookup('store_ipm_network_list');
                    store.loadData(record);

                }
        //     }
        // );
        }
        );
    }
    */

});