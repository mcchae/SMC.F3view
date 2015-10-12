
Ext.define('SMC4ZEN.view.NFW2_ipm_ipScanning', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ipm_ipscanning',

    requires: [
        'SMC4ZEN.view.NFW2_ipm_ipScanningViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel'
    ],

    viewModel: {
        type: 'nfw2_ipm_ipscanning'
    },
    //cls: 'zen_body',
    id: 'NFW2_ipm_ipScanning',
    defaultListenerScope: true,
    overflowY: 'auto',
    title : 'IP Scanning',
    items: [
        {
            xtype: 'form',
            header: false,
            bodyPadding: 5,
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            //cls: 'zen_toolbar',
                            items: [
                                {
                                    xtype: 'button',
                                    iconCls: 'ic_add',
                                    text: '추가',
                                    listeners: {
                                        click: 'onButtonClick'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls: 'ic_del',
                                    text: '삭제',
                                    listeners: {
                                        click: 'onButtonClick1'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'ipm_ipscanning_grid',
                            header: false,
                            title: 'My Grid Panel',
                            store: 'store_ipm_scanning_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 60,
                                    align: 'center',
                                    dataIndex: 'string',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    text: '인터페이스',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ip',
                                    text: '네트워크',
                                    flex: 2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value+"분";
                                    },
                                    dataIndex: 'cycle',
                                    text: '실행주기',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value+"/s";
                                    },
                                    width: 60,
                                    dataIndex: 'count',
                                    text: '개수'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return "ARP";
                                    },
                                    text: 'Scan 방법',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    text: '설명',
                                    flex: 3
                                }
                            ],
                            selModel: {
                                selType: 'checkboxmodel',
                                mode: 'SIMPLE'
                            },
                            listeners: {
                                celldblclick: 'onIpm_ipscanning_gridCellDblClick'
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

    onButtonClick: function(button, e, eOpts) {

        var me = this;
        var store = Ext.data.StoreManager.lookup('store_ipm_scanning_list');

        // if(store.getCount() >= me.scanning_cnt){

        //     Ext.MessageBox.alert("WeGuardia™ ZEN",ValidMaxCnt(me.scanning_cnt));

        //     return false;

        // }

        var win = Ext.create('SMC4ZEN.view.win_ipm_ipScanning',{

            modal : true

        });

        win.show();

    },

    onButtonClick1: function(button, e, eOpts) {
        
        var me = this;
        var tbl = Ext.getCmp("ipm_ipscanning_grid");
        var tbl_sel = tbl.getSelection();

        if(tbl_sel.length === 0){

            Ext.Msg.alert("", get_msg("sel_del"));

            return false;

        }
        else{

            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    var del = new Array();

                    for(var i = 0; i < tbl_sel.length; i++){

                        del.push(tbl_sel[i].get('id'));

                    }
                    // SMc4ZEN에서는 UController 통신으로 데이터를 가져오지 않습니다.
                    /*
                    var _params = {

                        basename : Ext.encode('network_ipm_scan'),
                        ids : Ext.encode(del)

                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'delListTypeObj',
                        _params,

                        function(response){
                            me.get_scanning();
                            Ext.Msg.show({
                                title: 'WeGuardia™ ZEN',
                                width: 300,
                                msg: get_msg('msg_ok_del'),
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                            //                     me.chk_interface("");

                        }
                    );
                    */ 
                }
            });
        }
    },

    onIpm_ipscanning_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        
        if(cellIndex === 0){ return false; }

        var win = Ext.create('SMC4ZEN.view.win_ipm_ipScanning', {
            edit : "edit",
            modal : true,
            record : record
        });

        win.show();

    },

    onPanelAfterRender: function(component, eOpts) {

        var me = this;
        var vm = me.getViewModel();
        var ipscan = vm.get('network_ipm_scan');
        var st_ipscan = Ext.data.StoreManager.lookup('store_ipm_scanning_list');

        st_ipscan.loadData(ipscan);        

        // SMC4ZEN 에서 더이상 사용하지 않는 코드입니다.

        // me.scanning_cnt = 0;

        // var _params = {

        //     filename: Ext.encode('/proc/ferret/datasheet/ipm_manage_network')
        // };

        // request_helper.xmlrpc_call_JsonP(

        //     'ftuctrl',
        //     'getFileContent',
        //     _params,

        //     function(response){
        //         me.scanning_cnt = Number(response[0]);
        //     }
        // );

        // me.get_scanning();
    },

    saveData : function(component, eOpts){


        
    }
    // SMc4ZEN에서는 UController 통신으로 데이터를 가져오지 않습니다.
    /*
    get_scanning: function() {
        var _params = {
            basename : Ext.encode("network_ipm_scan")
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(data){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var record = [];
                if(data.list !== null){
                    for(var i in data.list){
                        record.push({
                            'interface' : data.list[i].interface,
                            'ip' : data.list[i].ip,
                            'cycle' : data.list[i].cycle,
                            'count' : data.list[i].count,
                            'desc' : data.list[i].desc,
                            'id' : data.list[i]._id,
                            'cycle_chk' : data.list[i].cycle_chk
                        });
                    }

                    var store = Ext.data.StoreManager.lookup('store_ipm_scanning_list');
                    store.loadData(record);
                }
            }
        );
    }
    */

});