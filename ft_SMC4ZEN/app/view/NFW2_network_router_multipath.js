
Ext.define('SMC4ZEN.view.NFW2_network_router_multipath', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.NFW2_network_router_multipath',

    requires: [
        'SMC4ZEN.view.NFW2_network_router_multipathViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_router_multipath'
    },
    // cls: 'zen_body',
    id: 'NFW2_network_router_multipath',
    width: 900,
    defaultListenerScope: true,
    overflowY: 'auto',
    title : 'Multipath',
    items: [
        {
            xtype: 'form',
            id: 'line_select_form',
            bodyPadding: 5,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    id: 'line_select_container',
                    items: [
                        {
                            xtype: 'container',
                            id: 'line_select_con',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'line_select_box',
                                    labelSeparator: ' ',
                                    labelWidth: 190,
                                    msgTarget: 'none',
                                    editable: false,
                                    displayField: 'path_type',
                                    queryMode: 'local',
                                    store: 'store_multi_line_select_list',
                                    valueField: 'multipath_type',
                                    bind: {
                                        fieldLabel: '{line_sel}',
                                        value: '{network_router_multipath.multipath_type}'
                                    },
                                    listeners: {
                                        change: 'onLine_select_boxChange',
                                        afterrender: 'onLine_select_boxAfterRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            id: 'line_time_con',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req',
                                    width: 205,
                                    bind: {
                                        text: '{line_timeout}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            var _value = removeComma(value);

                                            var setTimeNull = CheckNotNull(_value);

                                            if(!setTimeNull){ return get_msg('err_null'); }
                                            if(_value < 1 || _value > 3600){ return ValidLimit(1, addComma(3600)); }
                                        }
                                        return true;
                                    },
                                    fieldInfo: {
                                        txt: msg_tip_length(1,
                                        3600,
                                        null)
                                    },
                                    cls: 'inp_unit',
                                    id: 'line_time_select',
                                    margin: '0 0 0 -10',
                                    width: 120,
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen("sec")]}</div>'
                                    ],
                                    labelSeparator: ' ',
                                    labelWidth: 200,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9]/,
                                    maxLength: 5,
                                    maxLengthText: ' ',
                                    listeners: {
                                        errorchange: 'onLine_time_selectErrorChange',
                                        focus: 'onLine_time_selectFocus',
                                        blur: 'onLine_time_selectBlur',
                                        change: 'onLine_time_selectChange',
                                        keydown: 'onLine_time_selectKeydown'
                                    },
                                    bind: { 
                                        value: '{network_router_multipath.line_timeout}'
                                    },
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'line_network_set',
                    items: [
                        {
                            xtype: 'fieldset',
                            bind: {
                                title: '{network_base_set}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'search_Btn_container',
                                    margin: '8 0 0 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'Btn_add',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{add}'
                                            },
                                            listeners: {
                                                click: 'onBtn_addClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            id: 'Btn_del',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_del',
                                            bind: {
                                                text: '{del}'
                                            },
                                            listeners: {
                                                click: 'onBtn_delClick'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    id: 'search_container',
                                    margin: '8 0 10 0',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            id: 'multipath_grid',
                                            maxHeight: 158,
                                            header: false,
                                            title: 'My Grid Panel',
                                            store: 'store_network_multipath_list',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 60,
                                                    align: 'center',
                                                    dataIndex: 'num',
                                                    bind: {
                                                        text: '{rank}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return value.charAt(0).toUpperCase() + value.slice(1);
                                                    },
                                                    dataIndex: 'src_type',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{src_type}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'src_ip',
                                                    flex: 1.5,
                                                    bind: {
                                                        text: '{src_ip}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return value.charAt(0).toUpperCase() + value.slice(1);
                                                    },
                                                    dataIndex: 'dst_type',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{dest_type}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'dst_ip',
                                                    flex: 1.5,
                                                    bind: {
                                                        text: '{dest_ip}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'interface',
                                                    flex: 0.7,
                                                    bind: {
                                                        text: '{inter}'
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 45,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.getCmp('multipath_grid').getStore();

                                                                store.removeAt(rowIndex, 1);
                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                celldblclick: 'onMultipath_gridCellDblClick'
                                            },
                                            selModel: {
                                                selType: 'checkboxmodel',
                                                mode: 'SIMPLE'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'line_quality_con',
                    items: [
                        {
                            xtype: 'fieldset',
                            bind: {
                                title: '{line_manager}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: 'Checker(LineLB로 설정 된) 상태로 관리'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{checker_state_add}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_del',
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
                                    margin: '8 0 0 0',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            id: 'grid_multipath_checker',
                                            maxHeight: 158,
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            header: false,
                                            title: 'My Grid Panel',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'inter',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{inter}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return addComma(value);
                                                    },
                                                    dataIndex: 'time',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{monitor_period_sec}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'limit',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{limit_down}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value === "1"){ return __zen("detect"); }
                                                        else{ return __zen("inter_down"); }
                                                    },
                                                    dataIndex: 'action',
                                                    flex: 1.5,
                                                    bind: {
                                                        text: '{action}'
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 45,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.getCmp('grid_multipath_checker').getStore();

                                                                store.removeAt(rowIndex, 1);
                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                celldblclick: 'onGrid_multipath_checkerCellDblClick'
                                            },
                                            selModel: {
                                                selType: 'checkboxmodel',
                                                mode: 'SIMPLE'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '대역폭(Upload)으로 관리'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 0 0',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            iconCls: 'icb_add',
                                            bind: {
                                                text: '{upstream_band}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick2'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_del',
                                            bind: {
                                                text: '{del}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick3'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '8 0 10 0',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            cls: 'in_grid',
                                            id: 'grid_multipath_upload',
                                            maxHeight: 158,
                                            scrollable: {
                                                x: false,
                                                y: true
                                            },
                                            header: false,
                                            title: 'My Grid Panel',
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'inter',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{inter}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return addComma(value);
                                                    },
                                                    dataIndex: 'bandwidth',
                                                    flex: 1,
                                                    bind: {
                                                        text: '{limit_band_k}'
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if(value === "1"){ return __zen("detect"); }
                                                        else{ return __zen("inter_down"); }
                                                    },
                                                    dataIndex: 'action',
                                                    flex: 1.5,
                                                    bind: {
                                                        text: '{action}'
                                                    }
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    width: 45,
                                                    align: 'center',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.getCmp('grid_multipath_upload').getStore();

                                                                store.removeAt(rowIndex, 1);
                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                celldblclick: 'onGrid_multipath_uploadCellDblClick'
                                            },
                                            selModel: {
                                                selType: 'checkboxmodel',
                                                mode: 'SIMPLE'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }//,
                // {
                //     xtype: 'button',
                //     cls: 'ft_confirm',
                //     iconCls: 'ft_confirm_icl',
                //     bind: {
                //         text: '{confirm}'
                //     },
                //     listeners: {
                //         click: 'onButtonClick4'
                //     }
                // },
                // {
                //     xtype: 'button',
                //     cls: 'ft_cancel',
                //     bind: {
                //         text: '{cancel}'
                //     },
                //     listeners: {
                //         click: 'onButtonClick5'
                //     }
                // }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_network_router_multipathAfterRender',
        render: 'onNFW2_network_router_multipathRender',
        beforeclose: 'saveData'
    },

    onLine_select_boxChange: function(field, newValue, oldValue, eOpts) {
        var select = Ext.getCmp('line_select_box');
        var selectValue = select.getValue();
        var search = Ext.getCmp('search_container');
        var searchBtn = Ext.getCmp('search_Btn_container');

        if(selectValue === "4"){
            search.show();
            searchBtn.show();
            Ext.getCmp('line_network_set').show();
        }
        else {
            search.hide();
            searchBtn.hide();
            Ext.getCmp('line_network_set').hide();
            Ext.getCmp('multipath_grid').getStore().removeAll();
        }

    },

    onLine_select_boxAfterRender: function(component, eOpts) {
        var inter = Ext.getCmp('line_select_box').getStore().data;

        if(inter.length > 0){

            Ext.getCmp("line_select_box").setValue(inter.items[0].data['multipath_type']);
        }
    },

    onLine_time_selectErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onLine_time_selectFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onLine_time_selectBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('line_time_select').validateValue(true);
    },

    onLine_time_selectChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onLine_time_selectKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onBtn_addClick: function(button, e, eOpts) {
        var grid = Ext.getCmp("multipath_grid");

        if(grid.getStore().data.length > 63){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(64));
            return false;
        }

        var win = Ext.create('SMC4ZEN.view.win_multipath',{
            modal : true
        });

        win.show();
    },

    onBtn_delClick: function(button, e, eOpts) {
        var me = Ext.getCmp('NFW2_network_router_multipath');

        var tbl = Ext.getCmp('multipath_grid');
        var tbl_sel = tbl.getSelectionModel().getSelection();
        var store = tbl.getStore();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){
                    var record = [];
                    var remove_num = [];
                    for(var i in tbl_sel){
                        for(var j in store.data.items){

                            if(tbl_sel[i].data.num === store.data.items[j].data.num){ remove_num.push(j); }

                        }
                    }

                    for(var k in store.data.items){
                        var chk = false;
                        for(var l in remove_num){
                            if(k === remove_num[l]){ chk = true; }
                        }
                        if(chk === false){
                            record.push({
                                'dst_ip': store.data.items[k].data.dst_ip,
                                'dst_type': store.data.items[k].data.dst_type,
                                'dst_version': store.data.items[k].data.dst_version,
                                'interface': store.data.items[k].data['interface'],
                                'line_timeout': store.data.items[k].data.line_timeout,
                                'multipath_type': store.data.items[k].data.multipath_type,
                                'num': store.data.items[k].data.num,
                                'src_ip': store.data.items[k].data.src_ip,
                                'src_type': store.data.items[k].data.src_type,
                                'src_version': store.data.items[k].data.src_version
                            });
                        }
                    }

                    for(var m = 1;m <= record.length;m++){ record[m-1].num = m; }
                    store.loadData(record);
                }
            });
        }
    },

    onMultipath_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var list = Ext.getCmp("multipath_grid");
        var list_chk = list.getSelectionModel().getSelection();

        var win = Ext.create('SMC4ZEN.view.win_multipath',{
            edit : "edit",
            record : record,
            num : record.data.num,
            index : rowIndex,
            cid : record.data._id,
            chk_use: record.data.chk_use,
            modal : true
        });
        win.show();
    },

    onButtonClick: function(button, e, eOpts) {
        var win = Ext.create('SMC4ZEN.view.win_multipath_line',{
            modal : true,
            mode : 'checker'
        });

        win.show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var tbl = Ext.getCmp('grid_multipath_checker');
        var tbl_sel = tbl.getSelectionModel().getSelection();
        var store = tbl.getStore();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){
                    var record = [];
                    for(var i in store.data.items){
                        var chk = false;
                        for(var j in tbl_sel){
                            if(store.data.items[i].data.inter === tbl_sel[j].data.inter){ chk = true; }
                        }
                        if(chk === false){
                            record.push(store.data.items[i].data);
                        }
                    }

                    store.loadData(record);
                }
            });
        }
    },

    onGrid_multipath_checkerCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('SMC4ZEN.view.win_multipath_line',{
            edit : "edit",
            mode : "checker",
            index : rowIndex,
            record : record,
            modal : true
        });
        win.show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var win = Ext.create('SMC4ZEN.view.win_multipath_line',{
            modal : true,
            mode : 'upload'
        });

        win.show();
    },

    onButtonClick3: function(button, e, eOpts) {
        var tbl = Ext.getCmp('grid_multipath_upload');
        var tbl_sel = tbl.getSelectionModel().getSelection();
        var store = tbl.getStore();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){
                    var record = [];
                    for(var i in store.data.items){
                        var chk = false;
                        for(var j in tbl_sel){
                            if(store.data.items[i].data.inter === tbl_sel[j].data.inter){ chk = true; }
                        }
                        if(chk === false){
                            record.push(store.data.items[i].data);
                        }
                    }

                    store.loadData(record);
                }
            });
        }
    },

    onGrid_multipath_uploadCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0){ return false; }

        var win = Ext.create('SMC4ZEN.view.win_multipath_line',{
            edit : "edit",
            mode : "upload",
            index : rowIndex,
            record : record,
            modal : true
        });
        win.show();
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = this;
        var multipath_type = Ext.getCmp('line_select_box').getValue();
        var store = Ext.getCmp('multipath_grid').getStore();
        var chk_store = Ext.getCmp('grid_multipath_checker').getStore();
        var load_store = Ext.getCmp('grid_multipath_upload').getStore();

        var timechk = Ext.getCmp('line_time_select');
        if(timechk.isValid() === false){ timechk.focus(); return false; }
        // if(Ext.getCmp('multipath_grid').getStore().getCount() === 0 && multipath_type === "4"){
        //     Ext.Msg.show({
        //         title: 'WeGuardia™ DMC',
        //         msg: get_msg('err_pathcnt'),
        //         width: 300,
        //         buttons: Ext.Msg.OK,
        //         icon: Ext.window.MessageBox.INFO
        //     });
        //     return false;
        // }

        var obj = {};
        var explicit_network = [];
        var checker = [];
        var upload = [];

        for(var i in store.data.items){
            explicit_network.push({
                'dst_ip' : store.data.items[i].data.dst_ip,
                'dst_type' : store.data.items[i].data.dst_type,
                'dst_version' : store.data.items[i].data.dst_version,
                'interface' : store.data.items[i].data['interface'],
                'num' : store.data.items[i].data.num,
                'src_ip' : store.data.items[i].data.src_ip,
                'src_type' : store.data.items[i].data.src_type,
                'src_version' : store.data.items[i].data.src_version
            });
        }

        for(var i in chk_store.data.items){
            var downtime = "";
            if(chk_store.data.items[i].data.action !== "1"){
                downtime = chk_store.data.items[i].data.downtime;
            }
            checker.push({
                'interface' : chk_store.data.items[i].data.inter,
                'time' : chk_store.data.items[i].data.time,
                'limit' : chk_store.data.items[i].data.limit,
                'action' : chk_store.data.items[i].data.action,
                'downtime' : downtime
            });
        }

        for(var i in load_store.data.items){
            var downtime = "";
            if(load_store.data.items[i].data.action !== "1"){
                downtime = load_store.data.items[i].data.downtime;
            }
            upload.push({
                'interface' : load_store.data.items[i].data.inter,
                'bandwidth' : load_store.data.items[i].data.bandwidth,
                'action' : load_store.data.items[i].data.action,
                'downtime' : downtime
            });
        }

        obj = {
            '_kind': 'multipath',
            'multipath_type': multipath_type,
            'line_timeout': Ext.getCmp('line_time_select').getValue(),
            'explicit_network' : explicit_network,
            'checker' : checker,
            'upload' : upload
        };


        var _params = {
            basename : Ext.encode('network_router_multipath'),
            obj : Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){
                if(response === true){
                    me.get_multipath();
                    Ext.Msg.show({
                        title: __weguardia,
                        msg: get_msg('msg_ok_add'),
                        width: 300,
                        buttons: Ext.Msg.OK,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            }
        );
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = this;

        Ext.getCmp('line_select_box').setValue(me.back_up.multipath_type);
        Ext.getCmp('line_time_select').setValue(me.back_up.line_timeout);

        var chk_record = [];

        for(var j in me.back_up.checker){
            chk_record.push({
                'inter' : me.back_up.checker[j]['interface'],
                'time' : me.back_up.checker[j].time,
                'limit' : me.back_up.checker[j].limit,
                'action' : me.back_up.checker[j].action,
                'downtime' : me.back_up.checker[j].downtime
            });
        }

        Ext.getCmp('grid_multipath_checker').getStore().loadData(chk_record);
        console.log(Ext.getCmp('grid_multipath_checker').getStore());
        var load_record = [];

        for(var k in me.back_up.upload){
            load_record.push({
                'inter' : me.back_up.upload[j]['interface'],
                'bandwidth' : me.back_up.upload[j].bandwidth,
                'action' : me.back_up.upload[j].action,
                'downtime' : me.back_up.upload[j].downtime
            });
        }

        Ext.getCmp('grid_multipath_upload').getStore().loadData(load_record);

        if(me.back_up.multipath_type === "4"){
            Ext.getCmp('line_network_set').show();
            var record = [];

            for(var i in me.back_up.explicit_network){
                record.push({
                    '_id' : me.back_up.explicit_network[i]._id,
                    'dst_ip' : me.back_up.explicit_network[i].dst_ip,
                    'dst_type' : me.back_up.explicit_network[i].dst_type,
                    'dst_version' : me.back_up.explicit_network[i].dst_version,
                    'interface' : me.back_up.explicit_network[i]['interface'],
                    'num' : me.back_up.explicit_network[i].num,
                    'src_ip' : me.back_up.explicit_network[i].src_ip,
                    'src_type' : me.back_up.explicit_network[i].src_type,
                    'src_version' : me.back_up.explicit_network[i].src_version
                });
            }

            Ext.data.StoreManager.lookup('store_network_multipath_list').loadData(record);
        }
    },

    onNFW2_network_router_multipathAfterRender: function(component, eOpts) {
        var me = this;
        this.fieldInfo = makeZenTip();
        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'isCC',
        //     {},
        //     function(response){
        //         if(response === false){
        //             Ext.getCmp('line_quality_con').show();
        //         }
        //         else{
        //             Ext.getCmp('line_quality_con').hide();
        //         }
        //     }
        // );

        var response = setDevInterface(Ext.getCmp('win_zen_device_set').getViewModel().data.network_interface.network.ethernet);

        var _store = Ext.data.StoreManager.lookup('store_interface');
        _store.loadData(response);

        me.get_multipath();
    },

    onNFW2_network_router_multipathRender: function(component, eOpts) {
        var checker = {
            fields : [
                { name : 'inter' },
                { name : 'time' },
                { name : 'limit' },
                { name : 'action' },
                { name : 'downtime' }
            ]
        };

        Ext.getCmp('grid_multipath_checker').reconfigure(checker);

        var upload = {
            fields : [
                { name : 'inter' },
                { name : 'bandwidth' },
                { name : 'action' },
                { name : 'downtime' }
            ]
        };

        Ext.getCmp('grid_multipath_upload').reconfigure(upload);
    },

    get_multipath: function() {
        var me = Ext.getCmp('NFW2_network_router_multipath');
        var line_select;

        var _params = {
            basename: Ext.encode('network_router_multipath')
        };

        var response = me.getViewModel().data.network_router_multipath;

        if(response !== null){

            me.back_up = response;
            Ext.getCmp('line_select_box').setValue(response.multipath_type);
            Ext.getCmp('line_time_select').setValue(response.line_timeout);

            var chk_record = [];
            var load_record = [];

            for(var j in response.checker){
                chk_record.push({
                    'inter' : response.checker[j]['interface'],
                    'time' : response.checker[j].time,
                    'limit' : response.checker[j].limit,
                    'action' : response.checker[j].action,
                    'downtime' : response.checker[j].downtime
                });
            }

            Ext.getCmp('grid_multipath_checker').getStore().loadData(chk_record);

            for(var k in response.upload){
                load_record.push({
                    'inter' : response.upload[k]['interface'],
                    'bandwidth' : response.upload[k].bandwidth,
                    'action' : response.upload[k].action,
                    'downtime' : response.upload[k].downtime
                });
            }

            Ext.getCmp('grid_multipath_upload').getStore().loadData(load_record);

            if(response.multipath_type === "4"){
                var record = [];

                for(var i in response.explicit_network){
                    record.push({
                        'dst_ip' : response.explicit_network[i].dst_ip,
                        'dst_type' : response.explicit_network[i].dst_type,
                        'dst_version' : response.explicit_network[i].dst_version,
                        'interface' : response.explicit_network[i]['interface'],
                        'num' : response.explicit_network[i].num,
                        'src_ip' : response.explicit_network[i].src_ip,
                        'src_type' : response.explicit_network[i].src_type,
                        'src_version' : response.explicit_network[i].src_version
                    });
                }

                Ext.data.StoreManager.lookup('store_network_multipath_list').loadData(record);
            }
        }
        else{
            var obj = {
                '_kind': 'multipath',
                'multipath_type': "0",
                'line_timeout': "9",
                'checker' : [],
                'upload' : [],
                'explicit_network' : []
            };

            me.getViewModel().data.network_router_multipath = obj;

        }
    },

    saveData: function(){

        var me = this;
        var store = Ext.getCmp('multipath_grid').getStore();
        var chk_store = Ext.getCmp('grid_multipath_checker').getStore();
        var load_store = Ext.getCmp('grid_multipath_upload').getStore();

        var timechk = Ext.getCmp('line_time_select');
        if(timechk.isValid() === false){ timechk.focus(); Ext.getCmp('win_zen_device_set').viewState = false; return false; }

        var explicit_network = [];
        var checker = [];
        var upload = [];

        for(var i in store.data.items){
            explicit_network.push({
                'dst_ip' : store.data.items[i].data.dst_ip,
                'dst_type' : store.data.items[i].data.dst_type,
                'dst_version' : store.data.items[i].data.dst_version,
                'interface' : store.data.items[i].data['interface'],
                'num' : store.data.items[i].data.num,
                'src_ip' : store.data.items[i].data.src_ip,
                'src_type' : store.data.items[i].data.src_type,
                'src_version' : store.data.items[i].data.src_version
            });
        }

        for(var i in chk_store.data.items){
            var downtime = "";
            if(chk_store.data.items[i].data.action !== "1"){
                downtime = chk_store.data.items[i].data.downtime;
            }
            checker.push({
                'interface' : chk_store.data.items[i].data.inter,
                'time' : chk_store.data.items[i].data.time,
                'limit' : chk_store.data.items[i].data.limit,
                'action' : chk_store.data.items[i].data.action,
                'downtime' : downtime
            });
        }

        for(var i in load_store.data.items){
            var downtime = "";
            if(load_store.data.items[i].data.action !== "1"){
                downtime = load_store.data.items[i].data.downtime;
            }
            upload.push({
                'interface' : load_store.data.items[i].data.inter,
                'bandwidth' : load_store.data.items[i].data.bandwidth,
                'action' : load_store.data.items[i].data.action,
                'downtime' : downtime
            });
        }

        if(me.getViewModel().data.network_router_multipath._kind === undefined){
            me.getViewModel().data.network_router_multipath._kind = 'multipath';
        }

        me.getViewModel().data.network_router_multipath.explicit_network = explicit_network;
        me.getViewModel().data.network_router_multipath.checker = checker;
        me.getViewModel().data.network_router_multipath.upload = upload;

        Ext.getCmp('win_zen_device_set').viewState = true; 

        return true;
    }

});