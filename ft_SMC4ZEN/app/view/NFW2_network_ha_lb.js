
Ext.define('SMC4ZEN.view.NFW2_network_ha_lb', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ha_lb',

    requires: [
        'SMC4ZEN.view.NFW2_network_ha_lbViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ha_lb'
    },
    //cls: 'zen_body',
    id: 'NFW2_network_ha_lb',
    defaultListenerScope: true,
    title : '부하 분산',
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose: 'saveData'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }
            ]
    
        }
    ],
    overflowY: 'auto',
    bodyPadding: 5,
    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id: 'fm_lb',
                        layout: 'auto',
                        items: [
                            {
                                xtype: 'container',
                                id: 'con_l2',
                                margin: '5 0 0 0',
                                items: [
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'con_err',
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'errorBox',
                                                bind: {
                                                    text: '{ha_msg2}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'inter',
                                        margin : '0 0 5 0',
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'store_interface',
                                        valueField: 'name',
                                        value : 'eth0',
                                        bind: {
                                            fieldLabel: '{inter}',
                                            value : '{ha_load_balancing_script.load_balancing.checker_sub.interface}'
                                        }
                                    },
                                    {
                                        xtype: 'container',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 125,
                                                bind: {
                                                    text: '{target_ip}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                                    }
                                                    return true;
                                                },
                                                id: 'target_ip',
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                listeners: {
                                                    errorchange: 'onTarget_ipErrorChange',
                                                    focus: 'onTarget_ipFocus',
                                                    blur: 'onTarget_ipBlur'
                                                },
                                                bind : {
                                                    value : '{ha_load_balancing_script.load_balancing.checker_sub.target_ip}'
                                                }
                                                    
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 125,
                                                bind: {
                                                    text: '{target_mac}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidMAC(value)){ return ValidIP('MAC'); }
                                                    }
                                                    return true;
                                                },
                                                id: 'target_mac',
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                listeners: {
                                                    errorchange: 'onTarget_macErrorChange',
                                                    blur: 'onTarget_macBlur'
                                                },
                                                bind : {
                                                    value : '{ha_load_balancing_script.load_balancing.checker_sub.target_mac}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 125,
                                                bind: {
                                                    text: '{check_period}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(value, 1, 20)){ return ValidLimit(1, 20); }
                                                    }
                                                    return true;
                                                },
                                                fieldInfo: '입력범위 : 1 ~ 20',
                                                cls: 'inp_unit',
                                                id: 'period',
                                                width: 120,
                                                afterBodyEl: [
                                                    '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                                ],
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 2,
                                                minLength: 1,
                                                listeners: {
                                                    errorchange: 'onPeriodErrorChange',
                                                    keydown: 'onPeriodKeydown',
                                                    focus: 'onPeriodFocus',
                                                    blur: 'onPeriodBlur'
                                                },
                                                bind : {
                                                    value : '{ha_load_balancing_script.load_balancing.checker_sub.period}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 8 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 125,
                                                bind: {
                                                    text: '{timeout}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                                        if(!LengthCheck(value, 1, 50)){ return ValidLimit(1, 50); }
                                                    }
                                                    return true;
                                                },
                                                fieldInfo: '',
                                                cls: 'inp_unit',
                                                id: 'timeout',
                                                width: 120,
                                                afterBodyEl: [
                                                    '<div class="inp_after">{[__zen(\'times\')]}</div>'
                                                ],
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 2,
                                                minLength: 1,
                                                listeners: {
                                                    errorchange: 'onTimeoutErrorChange',
                                                    keydown: 'onTimeoutKeydown',
                                                    focus: 'onTimeoutFocus',
                                                    blur: 'onTimeoutBlur'
                                                },
                                                bind : {
                                                    value : '{ha_load_balancing_script.load_balancing.checker_sub.timeout}'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                cls: 'mt_info',
                                                bind: {
                                                    text: '{ha_info1}'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                cls: 'btn_b',
                                iconCls: 'icb_add',
                                bind: {
                                    text: '{add}'
                                },
                                listeners: {
                                    click: 'onButtonClick'
                                }
                            },
                            {
                                xtype: 'button',
                                cls: 'btn_b',
                                componentCls: 'btn_auth',
                                margin: '0 0 0 5',
                                iconCls: 'icb_del',
                                bind: {
                                    text: '{del}'
                                },
                                listeners: {
                                    click: 'onButtonClick2'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                margin: '5 0 0 0',
                                columnLines: true,
                                store: 'store_ha_lb_list',
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
                                            if(value === "Single" || value === "Range" || value === "Netmask"){
                                                return record.data.source;
                                            }else{
                                                return value;
                                            }
                                        },
                                        dataIndex: 's_type',
                                        flex: 1,
                                        bind: {
                                            text: '{src}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            if(value === "Single" || value === "Range" || value === "Netmask"){
                                                return record.data.dest;
                                            }else{
                                                return value;
                                            }
                                        },
                                        dataIndex: 'd_type',
                                        flex: 1,
                                        bind: {
                                            text: '{dest}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'action',
                                        flex: 0.5,
                                        bind: {
                                            text: '{action}'
                                        }
                                    }
                                ],
                                viewConfig: {
                                    plugins: [
                                        Ext.create('Ext.grid.plugin.DragDrop', {

                                        })
                                    ],
                                    listeners: {
                                        drop: 'onSetseqloadbalaning'
                                    }
                                },
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                }),
                                listeners: {
                                    celldblclick: 'onGrid_listCellDblClick'
                                }
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

    onTarget_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTarget_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTarget_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('target_ip').validateValue(true);
    },

    onTarget_macErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTarget_macBlur: function(component, event, eOpts) {
        setTipBlur(this, component);
        Ext.getCmp('target_mac').validateValue(true);
    },

    onPeriodErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onPeriodKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onPeriodFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
        component.fieldInfo = __zen('input_range')+'1 ~ 20';
    },

    onPeriodBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('period').validateValue(true);
    },

    onTimeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTimeoutKeydown: function(textfield, e, eOpts) {

        var code = e.getCharCode();

        if(!ValidNumKeydown(code)){

            e.stopEvent();
        }

    },

    onTimeoutFocus: function(component, event, eOpts) {

        setTipFocus(this,component);
        component.fieldInfo = __zen('input_range')+'1 ~ 50';

    },

    onTimeoutBlur: function(component, event, eOpts) {

        setTipBlur(this,component);
        Ext.getCmp('timeout').validateValue(true);

    },

    onButtonClick: function(button, e, eOpts) {

        if(this.disable == true){ 

            return false; 

        }

        var grid = Ext.getCmp("grid_list");

        if(grid.getStore().count() >= 128){

            Ext.Msg.alert("WeGuardia™ ZEN","최대 128개까지 입력 가능합니다.");

        }else{

            var win = Ext.create("SMC4ZEN.view.win_ha_lb");

            win.show();

        }

    },

    onButtonClick2: function(button, e, eOpts) {
        
        var me = this;
        var gpn_list = Ext.getCmp("grid_list");
        var sel_dellist = gpn_list.getSelection();

        if(this.disable == true){ 

            return false; 

        }

        if(sel_dellist.length === 0){

            Ext.Msg.alert("WeGuardia™ ZEN", get_msg("sel_del"));

            return false;

        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN", get_msg("conf_del"), function(btn){
           
            if(btn === "yes"){

                gpn_list.getStore().remove(sel_dellist);

            }

        });

    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        
        var win = Ext.create("SMC4ZEN.view.win_ha_lb",{

            modal : true,
            edit : "edit",
            record : record

        });

        win.show();

    },

    onSetseqloadbalaning : function(node, data, overModel, dropPosition, eOpts){

        var gpn_lb = Ext.getCmp('grid_list');
        var st_loadbalance = gpn_lb.getStore();

        for(var i = 0, max = st_loadbalance.count(); i < max; i++){

            var obj = {};

            obj.num = i + 1;

            st_loadbalance.getAt(i).set(obj);
            st_loadbalance.getAt(i).commit();

        }

    },

    onPanelAfterRender: function(component, eOpts) {
        
        var me = this;
        var vm = me.getViewModel();
        var packetlist = vm.get('ha_load_balancing_script').load_balancing.packet_relay;
        var st_loadbalance = Ext.getCmp('grid_list').getStore();

        this.fieldInfo = makeZenTip();

        // 0. 스토어 바인딩

        if(packetlist){

            var relaylist = [];

            for(var i = 0, max = packetlist.length; i < max; i++){

                var tmp = {};

                tmp.cid = packetlist[i].cid;
                tmp.num = packetlist[i].num;
                tmp.dest = packetlist[i].destination.ip;
                tmp.d_type = packetlist[i].destination.type;
                tmp.action = packetlist[i].action;
                tmp.source = packetlist[i].source.ip;
                tmp.s_type = packetlist[i].source.type;

                relaylist.push(tmp);

            }

            st_loadbalance.loadData(relaylist);

        }

    },

    saveData : function(component, eOpts){

        var me = this;
        var vm = me.parentObj.getViewModel();
        var st_loadbalance = Ext.getCmp('grid_list').getStore().getData();

        var packet_relay = [];

        if(!Ext.getCmp('fm_lb').isValid()){

            me.parentObj.viewState = false;

            return false;

        }

        for(var i = 0, max = st_loadbalance.count(); i < max; i++){

            var tmp = {};

            tmp.cid = st_loadbalance.items[i].get('cid');
            tmp.num = st_loadbalance.items[i].get('num');
            tmp.action = st_loadbalance.items[i].get('action');

            tmp.source = {};
            tmp.source.ip = st_loadbalance.items[i].get('source');
            tmp.source.type = st_loadbalance.items[i].get('s_type');

            tmp.destination = {};
            tmp.destination.ip = st_loadbalance.items[i].get('dest');
            tmp.destination.type = st_loadbalance.items[i].get('d_type');

            packet_relay.push(tmp);

        }

        vm.set('ha_load_balancing_script.load_balancing.packet_relay', packet_relay);

        st_loadbalance.removeAll();

        me.parentObj.viewState = true;

        return true;

    }

});