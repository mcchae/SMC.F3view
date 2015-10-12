
Ext.define('SMC4ZEN.view.win_logical_interface', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_logical_interface',

    requires: [
        'SMC4ZEN.view.win_logical_interfaceViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.form.field.Tag',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.XTemplate',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_logical_interface'
    },
    cls: 'zen_win',
    id: 'win_logical_interface',
    scrollable: true,
    width: 600,
    layout: 'anchor',
    modal: true,
    defaultListenerScope: true,
    listeners: {
        afterrender: 'onWindowAfterRender'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        bodyPadding: 10,
                        header: false,
                        title: 'My Form',
                        items: [
                            {
                                xtype: 'fieldset',
                                margin: 5,
                                items: [
                                    {
                                        xtype: 'container',
                                        id: 'cont_interface_kind',
                                        margin: '0 0 10 -10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'combobox',
                                                id: 'cb_interface_kind',
                                                margin: 5,
                                                width: 270,
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                value: 'select',
                                                editable: false,
                                                displayField: 'name',
                                                store: 'store_interfaceKind',
                                                valueField: 'value',
                                                bind: {
                                                    fieldLabel: '{inter_type}'
                                                },
                                                listeners: {
                                                    change: 'onCb_mode1Change'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_interface_name',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                flex: 1,
                                                id: 'lb_interface_name',
                                                margin: '8 0 8 10'
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onFieldsetAfterRender'
                                }
                            },
                            {
                                xtype: 'fieldset',
                                id: 'fs_bonding_basic',
                                margin: 5,
                                scrollable: true,
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 170,
                                                bind: {
                                                    text: '{bonding_num}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'cb_bonding_num',
                                                width: 80,
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                editable: false,
                                                queryMode: 'local',
                                                displayField: 'name',
                                                store: 'store_lname_list',
                                                valueField: 'name'
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
                                                width: 180,
                                                bind: {
                                                    text: '{member}'
                                                }
                                            },
                                            {
                                                xtype: 'tagfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        for(var k in value){
                                                            var store = Ext.getCmp('grid_users').getStore().data.items;
                                                            var mem = Ext.getCmp('win_logical_interface').bonding_mem;

                                                            for(var i in store){
                                                                var chk_num = 0;
                                                                if(store[i].data.net_name.match('bond') || store[i].data.net_name.match('br')){
                                                                    var temp = store[i].data.net_info.split(',');

                                                                    for(var j=1; j < temp.length;j++){
                                                                        if(temp[j] === value[k]){
                                                                            chk_num++;
                                                                        }
                                                                    }
                                                                }
                                                                if(store[i].data.net_name.match('vlan')){
                                                                    var temp = store[i].data.net_info.split(',');

                                                                    for(var j=0; j < temp.length;j++){
                                                                        if(temp[j] === value[k]){
                                                                            chk_num++;
                                                                        }
                                                                    }
                                                                }

                                                                for(var l in mem){
                                                                    if(mem[l] === value[k]){ chk_num--; }
                                                                }

                                                                if(me.edit === "edit"){
                                                                    if(chk_num > 1){ return get_msg('err_configdob'); }
                                                                }
                                                                else{
                                                                    if(chk_num > 0){ return get_msg('err_configdob'); }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    return true;
                                                },
                                                id: 'tag_bonding_member',
                                                width: 320,
                                                msgTarget: 'none',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_pname_list',
                                                valueField: 'name',
                                                listeners: {
                                                    blur: 'onTag_bonding_memberBlur',
                                                    errorchange: 'onTag_bonding_memberErrorChange',
                                                    change: 'onTag_bonding_memberChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                hidden: true,
                                                id: 'cb_bonding_ethernetList',
                                                margin: 5,
                                                fieldLabel: '멤버',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                value: 'select',
                                                editable: false,
                                                displayField: 'name',
                                                store: 'store_pname_list',
                                                valueField: 'name'
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                hidden: true,
                                                iconCls: 'icb_add',
                                                text: '멤버 추가',
                                                listeners: {
                                                    click: 'onButtonClick3'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        hidden: true,
                                        id: 'grid_bonding_member',
                                        margin: '8 0 0 0',
                                        maxHeight: 136,
                                        scrollable: {
                                            x: false,
                                            y: true
                                        },
                                        width: 300,
                                        allowDeselect: true,
                                        disableSelection: true,
                                        hideHeaders: true,
                                        store: 'store_bonding_member',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = 'cell_combo';

                                                    if(value === ""){ return 'Select'; }
                                                    return value;
                                                },
                                                dataIndex: 'member',
                                                text: 'member',
                                                flex: 1,
                                                editor: {
                                                    xtype: 'combobox',
                                                    baseCls: 'cell_combo',
                                                    editable: false,
                                                    emptyText: 'Select',
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_pname_list',
                                                    valueField: 'name',
                                                    listeners: {
                                                        focus: 'onComboboxFocus1',
                                                        collapse: 'onComboboxCollapse1',
                                                        select: 'onComboboxSelect',
                                                        blur: 'onComboboxBlur1'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                width: 45,
                                                align: 'center',
                                                items: [
                                                    {
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            Ext.getCmp('grid_bonding_member').getStore().removeAt(rowIndex, 1);



                                                            // if(Ext.getCmp('cb_bonding_mode').getValue() === "1"){

                                                            //     var memberData = [];

                                                            //     for(var i = 0 ; i < Ext.getCmp('grid_bonding_member').getStore().data.length ; i++){

                                                            //         var data = {'member':Ext.getCmp('grid_bonding_member').getStore().data.items[i].data.member};

                                                            //         memberData[i] = data;

                                                            //     }

                                                            //     Ext.getCmp('cb_bonding_primary').getStore().removeAll();

                                                            //     Ext.getCmp('cb_bonding_primary').getStore().add(memberData);


                                                            // }



                                                            // if(Ext.getCmp('grid_bonding_member').getStore().data.length === 0){

                                                            //     Ext.getCmp('grid_bonding_member').hide();
                                                            // }
                                                        },
                                                        iconCls: 'icr_del'
                                                    }
                                                ]
                                            }
                                        ],
                                        viewConfig: {
                                            markDirty: false
                                        },
                                        plugins: [
                                            Ext.create('Ext.grid.plugin.CellEditing', {
                                                pluginId: 'bonding_plug',
                                                clicksToEdit: 1
                                            })
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 170,
                                                bind: {
                                                    text: '{operate_mode}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'cb_bonding_mode',
                                                width: 150,
                                                labelSeparator: ' ',
                                                value: 'select',
                                                editable: false,
                                                displayField: 'name',
                                                store: 'store_bondingMode',
                                                valueField: 'value',
                                                listeners: {
                                                    change: 'onCb_bonding_modeChange'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_bonding_miimon',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 180,
                                                bind: {
                                                    text: '{link_monitor_cycle}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var _value = removeComma(value);
                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                        var retValue = LengthCheck(_value,"0","1000");

                                                        if(!retValue){

                                                            return ValidLimit("0","1000");

                                                        }
                                                    }
                                                    return true;
                                                },
                                                fieldInfo: '입력범위 : 1 ~ 1,000',
                                                cls: 'inp_unit',
                                                id: 'ft_miimon',
                                                width: 100,
                                                afterBodyEl: [
                                                    '<div class="inp_after">ms</div>'
                                                ],
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                msgTarget: 'none',
                                                enableKeyEvents: true,
                                                enforceMaxLength: true,
                                                maxLength: 5,
                                                listeners: {
                                                    keydown: 'onFt_miimonKeydown',
                                                    errorchange: 'onFt_miimonErrorChange',
                                                    focus: 'onFt_miimonFocus',
                                                    blur: 'onFt_miimonBlur',
                                                    change: 'onFt_miimonChange'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_bonding_updelay',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 180,
                                                bind: {
                                                    text: '{up_delay}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var _value = removeComma(value);

                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                        var retValue = LengthCheck(_value,"0","1000");

                                                        if(!retValue){

                                                            return ValidLimit("0","1000");

                                                        }
                                                    }

                                                    return true;
                                                },
                                                fieldInfo: '입력범위 : 1 ~ 1,000',
                                                cls: 'inp_unit',
                                                id: 'ft_updelay',
                                                width: 100,
                                                afterBodyEl: [
                                                    '<div class="inp_after">ms</div>'
                                                ],
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                msgTarget: 'none',
                                                enableKeyEvents: true,
                                                enforceMaxLength: true,
                                                maxLength: 5,
                                                listeners: {
                                                    keydown: 'onFt_updelayKeydown',
                                                    errorchange: 'onFt_updelayErrorChange',
                                                    focus: 'onFt_updelayFocus',
                                                    blur: 'onFt_updelayBlur',
                                                    change: 'onFt_updelayChange'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                flex: 1,
                                                cls: 'mt_info',
                                                id: 'lb_updelay_text',
                                                bind: {
                                                    text: '{up_delay_info}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_bonding_downdelay',
                                        margin: '8 0 8 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 180,
                                                bind: {
                                                    text: '{down_delay}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var _value = removeComma(value);

                                                        if(!CheckNotNull(_value)){ return get_msg('err_null'); }
                                                        var retValue = LengthCheck(_value,"0","1000");

                                                        if(!retValue){

                                                            return ValidLimit("0","1000");

                                                        }

                                                    }

                                                    return true;
                                                },
                                                fieldInfo: '입력범위 : 1 ~ 1,000',
                                                cls: 'inp_unit',
                                                id: 'ft_downdelay',
                                                width: 100,
                                                afterBodyEl: [
                                                    '<div class="inp_after">ms</div>'
                                                ],
                                                labelSeparator: ' ',
                                                labelWidth: 175,
                                                msgTarget: 'none',
                                                enableKeyEvents: true,
                                                enforceMaxLength: true,
                                                maxLength: 5,
                                                listeners: {
                                                    keydown: 'onFt_downdelayKeydown',
                                                    errorchange: 'onFt_downdelayErrorChange',
                                                    focus: 'onFt_downdelayFocus',
                                                    blur: 'onFt_downdelayBlur',
                                                    change: 'onFt_downdelayChange'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                flex: 1,
                                                cls: 'mt_info',
                                                id: 'lb_downdelay_text',
                                                bind: {
                                                    text: '{down_delay_info}'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        hidden: true,
                                        id: 'cont_arp_interval',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var _value = removeComma(value);


                                                        var retValue = LengthCheck(_value,"0","1000");

                                                        if(!retValue){

                                                            return ValidLimit("0","1000");

                                                        }

                                                    }

                                                    return true;
                                                },
                                                fieldInfo: '입력범위 : 0 ~ 1,000',
                                                cls: 'inp_unit',
                                                id: 'ft_arp_interval',
                                                width: 280,
                                                afterBodyEl: [
                                                    '<div class="inp_after">ms</div>'
                                                ],
                                                labelSeparator: ' ',
                                                labelWidth: 175,
                                                msgTarget: 'none',
                                                enableKeyEvents: true,
                                                enforceMaxLength: true,
                                                maxLength: 5,
                                                maxLengthText: ' ',
                                                bind: {
                                                    fieldLabel: '{arp_cycle}'
                                                },
                                                listeners: {
                                                    keydown: 'onFt_arp_intervalKeydown',
                                                    errorchange: 'onFt_arp_intervalErrorChange',
                                                    focus: 'onFt_arp_intervalFocus',
                                                    blur: 'onFt_arp_intervalBlur',
                                                    change: 'onFt_arp_intervalChange'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_arp_ip',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === "") return true;

                                                    var retValue = ValidIPAddress(value);

                                                    if(!retValue){

                                                        return get_error_msg('err_ipv4');

                                                    }

                                                    return true;
                                                },
                                                flex: 1,
                                                hidden: true,
                                                id: 'ft_arpIp',
                                                margin: 5,
                                                maxWidth: 250,
                                                fieldLabel: 'ARP 대상 IP',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                msgTarget: 'none',
                                                enableKeyEvents: true,
                                                listeners: {
                                                    errorchange: 'onFt_arpIpErrorChange'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                margin: '8 0 8 10',
                                                iconCls: 'icb_add',
                                                bind: {
                                                    text: '{add_arp_id}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick32',
                                                    blur: 'onButtonBlur2'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        id: 'grid_arp_ip',
                                        margin: '0 0 10 10',
                                        maxHeight: 136,
                                        scrollable: {
                                            x: false,
                                            y: true
                                        },
                                        width: 300,
                                        allowDeselect: true,
                                        disableSelection: true,
                                        hideHeaders: true,
                                        store: 'store_arp_ip',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = 'cell_text';

                                                    return value;
                                                },
                                                dataIndex: 'ip',
                                                text: 'String',
                                                flex: 1,
                                                editor: {
                                                    xtype: 'textfield',
                                                    baseCls: 'cell_text',
                                                    listeners: {
                                                        focus: 'onTextfieldFocus',
                                                        blur: 'onTextfieldBlur'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                                                    err_fl.removeCls('ic_msg_err');
                                                    err_fl.update('');

                                                    Ext.getCmp('grid_arp_ip').getStore().removeAt(rowIndex, 1);

                                                    // if(Ext.getCmp('grid_arp_ip').getStore().data.length === 0){

                                                    //     Ext.getCmp('grid_arp_ip').hide();
                                                    // }
                                                },
                                                width: 45,
                                                align: 'center',
                                                items: [
                                                    {
                                                        iconCls: 'icr_del'
                                                    }
                                                ]
                                            }
                                        ],
                                        viewConfig: {
                                            markDirty: false
                                        },
                                        plugins: [
                                            Ext.create('Ext.grid.plugin.CellEditing', {
                                                pluginId: 'arp_plug',
                                                clicksToEdit: 1
                                            })
                                        ]
                                    },
                                    {
                                        xtype: 'combobox',
                                        hidden: true,
                                        id: 'cb_bonding_lacp_rate',
                                        labelSeparator: ' ',
                                        labelWidth: 175,
                                        value: 'select',
                                        editable: false,
                                        displayField: 'name',
                                        store: 'store_lacpRate',
                                        valueField: 'value',
                                        bind: {
                                            fieldLabel: '{lacp_speed}'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        hidden: true,
                                        id: 'cb_bonding_hash',
                                        margin: '8 0 10 0',
                                        labelSeparator: ' ',
                                        labelWidth: 175,
                                        value: 'select',
                                        editable: false,
                                        displayField: 'name',
                                        store: 'store_hashMode',
                                        valueField: 'value',
                                        bind: {
                                            fieldLabel: '{hash_mode}'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        id: 'cb_bonding_primary',
                                        margin: '0 0 10 0',
                                        labelSeparator: ' ',
                                        labelWidth: 175,
                                        editable: false,
                                        displayField: 'member',
                                        queryMode: 'local',
                                        store: 'store_bonding_primary',
                                        valueField: 'member',
                                        bind: {
                                            fieldLabel: '{primary_inter}'
                                        },
                                        listeners: {
                                            focus: 'onCb_bonding_primaryFocus',
                                            blur: 'onCb_bonding_primaryBlur'
                                        }
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onFs_bonding_basicAfterRender'
                                }
                            },
                            {
                                xtype: 'fieldset',
                                id: 'fs_bridge_basic',
                                margin: 5,
                                items: [
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 100,
                                                bind: {
                                                    text: '{bridge_num}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                id: 'cb_bridge_num',
                                                margin: '0 0 0 -10',
                                                width: 80,
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_lname_list',
                                                valueField: 'name'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        margin: '8 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 100,
                                                bind: {
                                                    text: '{stp}'
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                html: '<div id="chk_stp_div"/>',
                                                listeners: {
                                                    render: 'onContainerRender'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        hidden: true,
                                        id: 'chk_stp1',
                                        margin: 5,
                                        fieldLabel: 'STP 사용',
                                        labelSeparator: ' ',
                                        labelWidth: 150,
                                        listeners: {
                                            change: 'onChk_stpChange'
                                        }
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
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === ""){

                                                        return true;

                                                    }else{

                                                        var retValue = LengthCheck(value,"1","600");

                                                        if(!retValue){

                                                            return ValidLimit("1","600");

                                                        }

                                                        return true;

                                                    }


                                                },
                                                fieldInfo: '입력범위 : 1 ~ 600',
                                                cls: 'inp_unit',
                                                disabled: true,
                                                id: 'ft_bridge_time',
                                                width: 220,
                                                afterBodyEl: [
                                                    '<div class="inp_after">{[__zen("sec")]}</div>'
                                                ],
                                                labelSeparator: ' ',
                                                labelWidth: 95,
                                                msgTarget: 'none',
                                                fieldStyle: 'text-align:right',
                                                enableKeyEvents: true,
                                                enforceMaxLength: true,
                                                maxLength: 3,
                                                bind: {
                                                    fieldLabel: '{learn_period}'
                                                },
                                                listeners: {
                                                    errorchange: 'onFt_bridge_timeErrorChange',
                                                    keydown: 'onFt_bridge_timeKeydown',
                                                    focus: 'onFt_bridge_timeFocus',
                                                    blur: 'onFt_bridge_timeBlur'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_bridge_member',
                                        margin: '8 0 10 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                cls: 'lb_req',
                                                width: 100,
                                                bind: {
                                                    text: '{member}'
                                                }
                                            },
                                            {
                                                xtype: 'tagfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        for(var k in value){
                                                            var store = Ext.getCmp('grid_users').getStore().data.items;
                                                            var mem = Ext.getCmp('win_logical_interface').bridge_mem;

                                                            for(var i in store){
                                                                var chk_num = 0;
                                                                if(store[i].data.net_name.match('br') || store[i].data.net_name.match('bond')){
                                                                    var temp = store[i].data.net_info.split(',');

                                                                    for(var j=1; j < temp.length;j++){
                                                                        if(temp[j] === value[k]){
                                                                            chk_num++;
                                                                        }
                                                                    }
                                                                }
                                                                if(store[i].data.net_name.match('vlan')){
                                                                    var temp = store[i].data.net_info.split(',');

                                                                    for(var j=0; j < temp.length;j++){
                                                                        if(temp[j] === value[k]){
                                                                            chk_num++;
                                                                        }
                                                                    }
                                                                }

                                                                for(var l in mem){
                                                                    if(mem[l] === value[k]){ chk_num--; }
                                                                }

                                                                if(me.edit === "edit"){
                                                                    if(chk_num > 1){ return get_msg('err_configdob'); }
                                                                }
                                                                else{
                                                                    if(chk_num > 0){ return get_msg('err_configdob'); }
                                                                }
                                                            }
                                                        }
                                                    }

                                                    return true;
                                                },
                                                id: 'tag_bridge_member',
                                                width: 320,
                                                msgTarget: 'none',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: {
                                                    fields: [
                                                        {
                                                            name: 'name'
                                                        }
                                                    ]
                                                },
                                                valueField: 'name',
                                                listeners: {
                                                    blur: 'onTag_bridge_memberBlur',
                                                    errorchange: 'onTag_bridge_memberErrorChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                hidden: true,
                                                id: 'cb_bridge_ethernetList',
                                                margin: 5,
                                                fieldLabel: '멤버',
                                                labelCls: 'lb_req',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                value: 'select',
                                                editable: false,
                                                displayField: 'name',
                                                store: 'store_pname_list',
                                                valueField: 'name'
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                hidden: true,
                                                iconCls: 'icb_add',
                                                text: '멤버 추가',
                                                listeners: {
                                                    click: 'onButtonClick31',
                                                    blur: 'onButtonBlur'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        hidden: true,
                                        id: 'grid_bridge_member',
                                        margin: '8 0 10 10',
                                        maxHeight: 136,
                                        scrollable: {
                                            x: false,
                                            y: true
                                        },
                                        width: 300,
                                        allowDeselect: true,
                                        disableSelection: true,
                                        hideHeaders: true,
                                        store: 'store_bridge_member',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = 'cell_combo';

                                                    if(value === ""){ return 'Select'; }
                                                    return value;
                                                },
                                                width: 200,
                                                dataIndex: 'member',
                                                text: 'member',
                                                flex: 1,
                                                editor: {
                                                    xtype: 'combobox',
                                                    baseCls: 'cell_combo',
                                                    editable: false,
                                                    emptyText: 'Select',
                                                    displayField: 'name',
                                                    queryMode: 'local',
                                                    store: 'store_pname_list',
                                                    valueField: 'name',
                                                    listeners: {
                                                        focus: 'onComboboxFocus',
                                                        collapse: 'onComboboxCollapse',
                                                        blur: 'onComboboxBlur'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                width: 45,
                                                align: 'center',
                                                items: [
                                                    {
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            Ext.getCmp('grid_bridge_member').getStore().removeAt(rowIndex, 1);

                                                            // if(Ext.getCmp('grid_bridge_member').getStore().data.length === 0){

                                                            //     Ext.getCmp('grid_bridge_member').hide();
                                                            // }
                                                        },
                                                        iconCls: 'icr_del'
                                                    }
                                                ]
                                            }
                                        ],
                                        viewConfig: {
                                            markDirty: false
                                        },
                                        plugins: [
                                            Ext.create('Ext.grid.plugin.CellEditing', {
                                                pluginId: 'bridge_plug',
                                                clicksToEdit: 1
                                            })
                                        ]
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onFs_bridge_basicAfterRender'
                                }
                            },
                            {
                                xtype: 'fieldset',
                                id: 'fs_vlan_basic',
                                margin: 5,
                                items: [
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
                                                width: 100,
                                                bind: {
                                                    text: '{vlan_id}'
                                                }
                                            },
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var temp = removeComma(value);

                                                        if(!CheckNotNull(temp)){ return get_msg('err_null'); }
                                                        if(!ValidNum(Number(temp))){ return get_msg('err_form'); }
                                                        if(!LengthCheck(temp,1,4094)){ return ValidLimit(1,4094); }

                                                        var me = Ext.getCmp("win_logical_interface");
                                                        var store = Ext.getCmp('grid_users').getStore().data.items;
                                                        var chk_name = "vlan"+temp;
                                                        var chk_num = 0;

                                                        for(var i in store){
                                                            if(store[i].data.net_name === chk_name){
                                                                chk_num++;
                                                            }
                                                        }

                                                        if(me.edit === "edit"){
                                                            if(chk_num > 1){ return get_msg('err_configdob'); }
                                                        }
                                                        else{
                                                            if(chk_num > 0){ return get_msg('err_configdob'); }
                                                        }
                                                    }

                                                    return true;
                                                },
                                                fieldInfo: '입력범위 : 1 ~ 4094',
                                                id: 'cb_vlan_num',
                                                width: 80,
                                                msgTarget: 'none',
                                                enforceMaxLength: true,
                                                maskRe: /[0-9]/,
                                                maxLength: 4,
                                                listeners: {
                                                    errorchange: 'onCb_vlan_numErrorChange',
                                                    blur: 'onCb_vlan_numBlur',
                                                    focus: 'onCb_vlan_numFocus',
                                                    change: 'onCb_vlan_numChange'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                hidden: true,
                                                id: 'cb_vlan_num1',
                                                width: 80,
                                                labelSeparator: ' ',
                                                editable: false,
                                                displayField: 'name',
                                                queryMode: 'local',
                                                store: 'store_lname_list',
                                                valueField: 'name'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        id: 'cont_vlan_member',
                                        margin: '8 0 10 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                width: 90,
                                                bind: {
                                                    text: '{member}'
                                                }
                                            },
                                            {
                                                xtype: 'combobox',
                                                validator: function(value) {
                                                    if(value !== true){
                                                        var store = Ext.getCmp('grid_users').getStore().data.items;
                                                        var chk_num = 0;

                                                        for(var i in store){
                                                            if(store[i].data.net_name.match('br') || store[i].data.net_name.match('bond')){
                                                                var temp = store[i].data.net_info.split(',');

                                                                for(var j=1; j < temp.length;j++){
                                                                    if(temp[j] === value){
                                                                        chk_num++;
                                                                    }
                                                                }
                                                            }
                                                        }

                                                        if(me.edit === "edit"){
                                                            if(chk_num > 1){ return get_msg('err_configdob'); }
                                                        }
                                                        else{
                                                            if(chk_num > 0){ return get_msg('err_configdob'); }
                                                        }

                                                    }

                                                    return true;
                                                },
                                                id: 'cb_vlan_ethernetList',
                                                renderData: [
                                                    {
                                                        name: 'name',
                                                        value: 'value'
                                                    }
                                                ],
                                                width: 150,
                                                labelSeparator: ' ',
                                                msgTarget: 'none',
                                                value: 'select',
                                                editable: false,
                                                displayField: 'name',
                                                store: 'store_pname_list',
                                                listeners: {
                                                    afterrender: 'onCb_vlan_ethernetListAfterRender',
                                                    errorchange: 'onCb_vlan_ethernetListErrorChange',
                                                    blur: 'onCb_vlan_ethernetListBlur',
                                                    collapse: 'onCb_vlan_ethernetListCollapse'
                                                },
                                                queryMode: 'local',
                                            }
                                        ]
                                    }
                                ],
                                listeners: {
                                    afterrender: 'onFs_vlan_basicAfterRender'
                                }
                            },
                            {
                                xtype: 'fieldset',
                                id: 'fs_vip_ip',
                                margin: 5,
                                title: '<font size=\'2\'><b>가상 IP</b></font>',
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'form',
                                        flex: 1,
                                        id: 'form_logical_ipv4',
                                        margin: '8 0 0 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === "") return true;

                                                    var retValue = ValidNetMask(value);

                                                    if(!retValue){
                                                        return get_error_msg('err_ipv4');
                                                    }

                                                    return true;
                                                },
                                                hidden: true,
                                                id: 'ft_vip_ipv4',
                                                margin: 5,
                                                width: 400,
                                                fieldLabel: 'IPv4/Netmask',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                msgTarget: 'none',
                                                enableKeyEvents: true,
                                                listeners: {
                                                    keydown: 'onFt_vip_ipv4Keydown',
                                                    errorchange: 'onFt_vip_ipv4ErrorChange'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                iconCls: 'icb_add',
                                                bind: {
                                                    text: '{add_ipv4_mask}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        hidden: true,
                                        id: 'grid_vip_ipv4',
                                        margin: '8 0 0 10',
                                        maxHeight: 136,
                                        maxWidth: 362,
                                        scrollable: {
                                            x: false,
                                            y: true
                                        },
                                        allowDeselect: true,
                                        disableSelection: true,
                                        hideHeaders: true,
                                        store: 'store_vip_ipv4',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = 'cell_text';

                                                    return value;
                                                },
                                                width: 300,
                                                dataIndex: 'ip',
                                                text: 'String',
                                                editor: {
                                                    xtype: 'textfield',
                                                    baseCls: 'cell_text',
                                                    enableKeyEvents: true,
                                                    maskRe: /[0-9.\/]/,
                                                    listeners: {
                                                        blur: 'onTextfieldBlur2',
                                                        keydown: 'onTextfieldKeydown',
                                                        focus: 'onTextfieldFocus1'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                width: 45,
                                                align: 'center',
                                                items: [
                                                    {
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            Ext.getCmp('grid_vip_ipv4').getStore().removeAt(rowIndex, 1);

                                                            // if(Ext.getCmp('grid_vip_ipv4').getStore().data.length === 0){

                                                            //     Ext.getCmp('grid_vip_ipv4').hide();
                                                            // }
                                                        },
                                                        iconCls: 'icr_del'
                                                    }
                                                ]
                                            }
                                        ],
                                        viewConfig: {
                                            markDirty: false
                                        },
                                        plugins: [
                                            Ext.create('Ext.grid.plugin.CellEditing', {
                                                pluginId: 'ipv4_plug',
                                                clicksToEdit: 1
                                            })
                                        ]
                                    },
                                    {
                                        xtype: 'form',
                                        flex: 1,
                                        id: 'form_logical_ipv6',
                                        margin: '8 0 8 10',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'textfield',
                                                validator: function(value) {
                                                    if(value === "") return true;

                                                    var retValue = ValidPrefix(value);

                                                    if(!retValue){

                                                        return get_error_msg('err_ipv4');

                                                    }

                                                    return true;
                                                },
                                                margins: '5',
                                                hidden: true,
                                                id: 'ft_vip_ipv6',
                                                width: 400,
                                                fieldLabel: 'IPv6/Prefix',
                                                labelSeparator: ' ',
                                                labelWidth: 150,
                                                msgTarget: 'none',
                                                enableKeyEvents: true,
                                                listeners: {
                                                    keydown: 'onFt_vip_ipv6Keydown',
                                                    errorchange: 'onFt_vip_ipv6ErrorChange',
                                                    blur: 'onFt_vip_ipv6Blur'
                                                }
                                            },
                                            {
                                                xtype: 'button',
                                                cls: 'btn_b',
                                                iconCls: 'icb_add',
                                                bind: {
                                                    text: '{add_ipv6_pre}'
                                                },
                                                listeners: {
                                                    click: 'onButtonClick1'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        margins: '',
                                        hidden: true,
                                        id: 'grid_vip_ipv6',
                                        margin: '0 0 10 10',
                                        maxHeight: 136,
                                        maxWidth: 362,
                                        scrollable: {
                                            x: false,
                                            y: true
                                        },
                                        allowDeselect: true,
                                        disableSelection: true,
                                        hideHeaders: true,
                                        store: 'store_vip_ipv6',
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                    metaData.tdCls = 'cell_text';

                                                    return value;
                                                },
                                                width: 300,
                                                dataIndex: 'ip',
                                                text: 'String',
                                                editor: {
                                                    xtype: 'textfield',
                                                    baseCls: 'cell_text',
                                                    enableKeyEvents: true,
                                                    listeners: {
                                                        blur: 'onTextfieldBlur1',
                                                        keydown: 'onTextfieldKeydown1',
                                                        focus: 'onFt_vip_ipv6Focus'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                width: 45,
                                                align: 'center',
                                                items: [
                                                    {
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            Ext.getCmp('grid_vip_ipv6').getStore().removeAt(rowIndex);

                                                            // if(Ext.getCmp('grid_vip_ipv6').getStore().data.length === 0){

                                                            //     Ext.getCmp('grid_vip_ipv6').hide();
                                                            // }
                                                        },
                                                        iconCls: 'icr_del'
                                                    }
                                                ]
                                            }
                                        ],
                                        viewConfig: {
                                            markDirty: false
                                        },
                                        plugins: [
                                            Ext.create('Ext.grid.plugin.CellEditing', {
                                                pluginId: 'ipv6_plug',
                                                clicksToEdit: 1
                                            })
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
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'ft_confirm',
                                        iconCls: 'ft_confirm_icl',
                                        bind: {
                                            text: '{confirm}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick2',
                                            blur: 'onButtonBlur1'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        cls: 'ft_cancel',
                                        bind: {
                                            text: '{cancel}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick4'
                                        }
                                    }
                                ]
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

    onCb_mode1Change: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp('fs_bonding_basic').hide();
        Ext.getCmp('fs_bridge_basic').hide();
        Ext.getCmp('fs_vlan_basic').hide();
        Ext.getCmp('fs_vip_ip').hide();


        if(newValue === "bonding"){

            Ext.getCmp('fs_bonding_basic').show();

            var _store = Ext.data.StoreManager.lookup('store_lname_list');

            var all_list = [];
            var unused_list = [];
            var used_check = true;

            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding){
                all_list = setDevInterface(null,null,Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding); 
            }

            for(var i = 0; i < 10; i++){
                used_check = true;
                for(var j in all_list){
                    if('bond' + i === all_list[j].name){
                        used_check = false;
                        break;
                    }
                }
                if(used_check){
                    unused_list.push({"name":i});
                }
            }

            _store.loadData(unused_list);
    
            Ext.getCmp('cb_bonding_num').setValue(_store.data.items[0].data.name);
            Ext.getCmp('cb_bonding_num').setRawValue(_store.data.items[0].data.name);

            var _store = Ext.data.StoreManager.lookup('store_pname_list');

            Ext.getCmp('cb_bonding_ethernetList').setValue(_store.data.items[0].data.name);
            Ext.getCmp('cb_bonding_ethernetList').setRawValue(_store.data.items[0].data.name);

            var _store = Ext.data.StoreManager.lookup('store_bondingMode');

            Ext.getCmp('cb_bonding_mode').setValue(_store.data.items[0].data.name);
            Ext.getCmp('cb_bonding_mode').setRawValue(_store.data.items[0].data.name);

            Ext.getCmp('cont_arp_interval').show();

            Ext.getCmp('cont_arp_ip').show();


        }else if(newValue === "bridge"){

            Ext.getCmp('fs_bridge_basic').show();

            var _store = Ext.data.StoreManager.lookup('store_lname_list');

            var all_list = [];
            var unused_list = [];
            var used_check = true;

            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge){
                all_list = setDevInterface(null,Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge); 
            }

            for(var i = 0; i < 10; i++){
                used_check = true;
                for(var j in all_list){
                    if('br' + i === all_list[j].name){
                        used_check = false;
                        break;
                    }
                }
                if(used_check){
                    unused_list.push({"name":i});
                }
            }

            _store.loadData(unused_list);

            Ext.getCmp('cb_bridge_num').setValue(_store.data.items[0].data.name);
            Ext.getCmp('cb_bridge_num').setRawValue(_store.data.items[0].data.name);

            var _store = Ext.data.StoreManager.lookup('store_pname_list');

            Ext.getCmp('cb_bridge_ethernetList').setValue(_store.data.items[0].data.name);
            Ext.getCmp('cb_bridge_ethernetList').setRawValue(_store.data.items[0].data.name);


        }else if(newValue === "vlan"){

            Ext.getCmp('fs_vlan_basic').show();

            var _store = Ext.data.StoreManager.lookup('store_lname_list');

            var all_list = [];
            var unused_list = [];
            var used_check = true;

            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan){
                all_list = setDevInterface(null,null,null,Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan); 
            }

            for(var i = 0; i < 10; i++){
                used_check = true;
                for(var j in all_list){
                    if('vlan' + i === all_list[j].name){
                        used_check = false;
                        break;
                    }
                }
                if(used_check){
                    unused_list.push({"name":i});
                }
            }

            _store.loadData(unused_list);

            Ext.getCmp('cb_vlan_num').setValue(1);

            Ext.getCmp('cb_vlan_num').setRawValue(1);
            Ext.getCmp('cb_vlan_num').focus();
            Ext.getCmp('cb_vlan_num').blur();


            var _store = Ext.data.StoreManager.lookup('store_pname_list');

            Ext.getCmp('cb_vlan_ethernetList').setValue(_store.data.items[0].data.name);
            Ext.getCmp('cb_vlan_ethernetList').setRawValue(_store.data.items[0].data.name);

        }

        Ext.getCmp('fs_vip_ip').show();
    },

    onFieldsetAfterRender: function(component, eOpts) {
        component.setTitle("<font size='2'><b>"+__zen('inter_type')+"</b></font>");
    },

    onTag_bonding_memberBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTag_bonding_memberErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTag_bonding_memberChange: function(field, newValue, oldValue, eOpts) {
        var pri_record = [];

        for(var i in newValue){
            pri_record.push({'member':newValue[i]});
        }

        Ext.data.StoreManager.lookup('store_bonding_primary').loadData(pri_record);
        if(pri_record.length > 0){
            Ext.getCmp('cb_bonding_primary').setValue(pri_record[0].member);
        }
        else{
            Ext.getCmp('cb_bonding_primary').reset();
        }
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_pname_list');
        var grid = Ext.getCmp('grid_bonding_member');

        if(grid.getStore().getCount() > store.data.items.length-1){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(store.data.items.length));

            return false;
        }

        var record = {
            'member' : ''
        };

        grid.getStore().add(record);

    },

    onComboboxFocus1: function(component, event, eOpts) {
        if(Ext.getCmp('win_logical_interface').set_com === true){
            Ext.getCmp('win_logical_interface').set_com = false;
        }
        else{
            component.expand();
        }
    },

    onComboboxCollapse1: function(field, eOpts) {
        field.blur();
    },

    onComboboxSelect: function(combo, record, eOpts) {
        var memberData = [];


        for(var i = 0 ; i < Ext.getCmp('grid_bonding_member').getStore().data.length ; i++){

            var data = {'member':Ext.getCmp('grid_bonding_member').getStore().data.items[i].data.member};

            memberData[i] = data;

        }

        Ext.getCmp('cb_bonding_primary').getStore().removeAll();

        Ext.getCmp('cb_bonding_primary').getStore().add(memberData);

        if(Ext.getCmp('grid_bonding_member').getStore().getCount() !== 0){
            Ext.getCmp('cb_bonding_primary').setValue(Ext.getCmp('grid_bonding_member').getStore().data.items[0].data.member);
        }
    },

    onComboboxBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onCb_bonding_modeChange: function(field, newValue, oldValue, eOpts) {
        Ext.getCmp('ft_miimon').show();

        Ext.getCmp('cont_bonding_updelay').show();

        Ext.getCmp('cont_bonding_updelay').show();

        Ext.getCmp('cb_bonding_lacp_rate').hide();

        Ext.getCmp('cb_bonding_hash').hide();

        Ext.getCmp('cb_bonding_primary').hide();

        Ext.getCmp('cont_arp_interval').hide();

        Ext.getCmp('cont_arp_ip').hide();

        Ext.getCmp('grid_arp_ip').hide();

        Ext.getCmp('grid_arp_ip').getStore().removeAll();

        if(newValue === "4"){

            var _store = Ext.data.StoreManager.lookup('store_lacpRate');

            _store.load(function(records, operation, success){

                if(records.length > 0){

                    Ext.getCmp('cb_bonding_lacp_rate').setValue(records[0].data.value);

                    Ext.getCmp('cb_bonding_lacp_rate').setRawValue(records[0].data.name);

                }


            });

            var _store = Ext.data.StoreManager.lookup('store_hashMode');

            _store.load(function(records, operation, success){

                if(records.length > 0){

                    Ext.getCmp('cb_bonding_hash').setValue(records[0].data.value);

                    Ext.getCmp('cb_bonding_hash').setRawValue(records[0].data.name);

                }


            });

            Ext.getCmp('cb_bonding_lacp_rate').show();

            Ext.getCmp('cb_bonding_hash').show();

        }else if (newValue === "1"){

            Ext.getCmp('cb_bonding_primary').show();


        }else if (newValue === "0" || newValue === "2"){

            Ext.getCmp('cont_arp_interval').show();

            Ext.getCmp('cont_arp_ip').show();

        }




    },

    onFt_miimonKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_miimonErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_miimonFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onFt_miimonBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_miimon').validateValue(true);
    },

    onFt_miimonChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_updelayKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_updelayErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_updelayFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onFt_updelayBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_updelay').validateValue(true);
    },

    onFt_updelayChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_downdelayKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_downdelayErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_downdelayFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onFt_downdelayBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_downdelay').validateValue(true);
    },

    onFt_downdelayChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_arp_intervalKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_arp_intervalErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_arp_intervalFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onFt_arp_intervalBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('ft_arp_interval').validateValue(true);
    },

    onFt_arp_intervalChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onFt_arpIpErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox0');

        if (error) {
            errUI.setText(error, false);
            errUI.show();
        } else {
            errUI.hide();
        }
    },

    onButtonClick32: function(button, e, eOpts) {
        var me = this;
        // var store = Ext.data.StoreManager.lookup('store_pname_list');
        var store = Ext.getCmp('grid_arp_ip').getStore();
        if(store.getCount() > 15){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(16));
            return false;
        }

        var grid = Ext.getCmp('grid_arp_ip');

        var record = {
            'ip' : ''
        };

        grid.getStore().add(record);

        Ext.getCmp('grid_arp_ip').show();
    },

    onButtonBlur2: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onCb_bonding_primaryFocus: function(component, event, eOpts) {
        if(component.getStore().getCount() === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_bondmem'));
        }
    },

    onCb_bonding_primaryBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onFs_bonding_basicAfterRender: function(component, eOpts) {
        component.setTitle("<font size='2'><b>"+__zen('bonding_info')+"</b></font>");
    },

    onContainerRender: function(component, eOpts) {
        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen("toggle_on"),
            offText: __zen("toggle_off"),
            id:'chk_stp',
            renderTo:'chk_stp_div',
            style:'margin-left:0px',
            resizeHandle: false,
            state: false,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    if(newValue){

                        Ext.getCmp('ft_bridge_time').enable();

                        Ext.getCmp('ft_bridge_time').setValue('1');

                    }else{

                        Ext.getCmp('ft_bridge_time').disable();

                        Ext.getCmp('ft_bridge_time').setValue('');
                    }
                }
            }
        });
    },

    onChk_stpChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){

            Ext.getCmp('ft_bridge_time').enable();

            Ext.getCmp('ft_bridge_time').setValue('1');

        }else{

            Ext.getCmp('ft_bridge_time').disable();

            Ext.getCmp('ft_bridge_time').setValue('');
        }
    },

    onFt_bridge_timeErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onFt_bridge_timeKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onFt_bridge_timeFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onFt_bridge_timeBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
    },

    onTag_bridge_memberBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        component.validateValue(true);
        // component.getStore().load();
    },

    onTag_bridge_memberErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick31: function(button, e, eOpts) {
        var me = this;
        var store = Ext.data.StoreManager.lookup('store_pname_list');
        var grid = Ext.getCmp('grid_bridge_member');

        if(grid.getStore().getCount() > store.data.items.length-1){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update(ValidMaxCnt(store.data.items.length));

            return false;
        }

        var record = {
            'member' : ''
        };

        grid.getStore().add(record);
    },

    onButtonBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onComboboxFocus: function(component, event, eOpts) {
        if(Ext.getCmp('win_logical_interface').set_com === true){
            Ext.getCmp('win_logical_interface').set_com = false;
        }
        else{
            component.expand();
        }
    },

    onComboboxCollapse: function(field, eOpts) {
        field.blur();
    },

    onComboboxBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onFs_bridge_basicAfterRender: function(component, eOpts) {
        component.setTitle("<font size='2'><b>"+__zen('bridge_info')+"</b></font>");
    },

    onCb_vlan_numErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onCb_vlan_numBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        component.validateValue(true);
    },

    onCb_vlan_numFocus: function(component, event, eOpts) {
        // setTipFocus(this,component);
    },

    onCb_vlan_numChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);

        field.setValue(addComma(value));
    },

    onCb_vlan_ethernetListAfterRender: function(component, eOpts) {
        var combo = Ext.getCmp('cb_vlan_ethernetList').getStore().data;

        if(combo.length > 0){
            Ext.getCmp('cb_vlan_ethernetList').setValue(combo.items[0].data['member']);
        }
    },

    onCb_vlan_ethernetListErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onCb_vlan_ethernetListBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onCb_vlan_ethernetListCollapse: function(field, eOpts) {
        field.blur();
    },

    onFs_vlan_basicAfterRender: function(component, eOpts) {
        component.setTitle("<font size='2'><b>"+__zen('vlan_info')+"</b></font>");
    },

    onFt_vip_ipv4Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8 && code !== 190 && code !== 110 && code !== 191 && code !== 111){
            e.stopEvent();
        }
    },

    onFt_vip_ipv4ErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox0');

        if (error) {
            errUI.setText(error, false);
            errUI.show();
        } else {
            errUI.hide();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var record = {
            'ip' : ''
        };

        Ext.getCmp('grid_vip_ipv4').getStore().add(record);
        // var form = Ext.getCmp('form_logical_ipv4').getForm();

        // if(form.isValid() && Ext.getCmp('ft_vip_ipv4').getValue() !== ""){

        //     var ip = Ext.getCmp('ft_vip_ipv4').getValue();

        //     var data = {'ip' : ip};

        //     Ext.getCmp('grid_vip_ipv4').getStore().add(data);

            Ext.getCmp('grid_vip_ipv4').show();

        //     Ext.getCmp('ft_vip_ipv4').setValue('');

        // }
    },

    onTextfieldBlur2: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        // setTipBlur(this,component);
    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onFt_vip_ipv6Keydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        /*
        if(!(code >= 48 && code <= 57) && !(code >= 96 && code <= 105) && code !== 46 && code !== 8 && code !== 191 && code !== 111 && code !== 186){
            e.stopEvent();
        }*/
    },

    onFt_vip_ipv6ErrorChange: function(labelable, error, eOpts) {
        var errUI = Ext.getCmp('errorBox0');

        if (error) {
            errUI.setText(error, false);
            errUI.show();
        } else {
            errUI.hide();
        }
    },

    onFt_vip_ipv6Blur: function(component, event, eOpts) {
        // setTipBlur(this,component);
    },

    onButtonClick1: function(button, e, eOpts) {
        var record = {
            'ip' : ''
        };

        Ext.getCmp('grid_vip_ipv6').getStore().add(record);

        Ext.getCmp('grid_vip_ipv6').show();

    },

    onTextfieldBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        // setTipBlur(this,component);
    },

    onTextfieldKeydown1: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onFt_vip_ipv6Focus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2p');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        ////////////////// VLAN 등록 //////////////////////////

        if(Ext.getCmp('cb_interface_kind').getValue() === "vlan" || me.net_type === "VLAN"){
            var chk_vlan;

            chk_vlan = me.set_network_vlan();


            ////////////////// Bridge 등록 //////////////////////////

        }else if(Ext.getCmp('cb_interface_kind').getValue() === "bridge" || me.net_type === "Bridge"){
            var chk_bridge;

            chk_bridge = me.set_network_bridge();


            ////////////////// Bonding 등록 //////////////////////////
        }else if(Ext.getCmp('cb_interface_kind').getValue() === "bonding" || me.net_type === "Bonding"){
            var chk_bonding;

            chk_bonding = me.set_network_bonding();


        }

        if(!chk_vlan || !chk_bridge || !chk_bonding){
            return false;
        }

        if(me.edit !== "edit"){
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('msg_ok_add'),
                buttons: Ext.Msg.OK,
                fn: setWinClose,
                icon: Ext.window.MessageBox.INFO
            });

        }
        else{
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('msg_ok_edit'),
                buttons: Ext.Msg.OK,
                fn: setWinClose,
                icon: Ext.window.MessageBox.INFO
            });
        }
    },

    onButtonBlur1: function(component, event, eOpts) {
        var me = this;

        if(me.vlan_set === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
        else{
            me.vlan_set = false;
        }
    },

    onButtonClick4: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        me.ips_default =[];
        me.vlan_cnt = 0;
        me.vlan_set = false;
        me.bridge_mem = [];
        me.bonding_mem = [];
        this.fieldInfo = makeZenTip();
        // chk_zenauth(null);
        Ext.getCmp('win_logical_interface').set_com = false;
        Ext.getCmp('win_logical_interface').set_btn = false;
        me.setTitle(__zen('inter_set'));
        // Ext.suspendLayouts();

        Ext.getCmp('fs_bonding_basic').hide();
        Ext.getCmp('fs_bridge_basic').hide();
        Ext.getCmp('fs_vlan_basic').hide();
        Ext.getCmp('fs_vip_ip').hide();

        var _store = Ext.data.StoreManager.lookup('store_pname_list');
        var records = setDevInterface(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.ethernet); 

        _store.loadData(records);

        Ext.getCmp('cb_bridge_ethernetList').setRawValue(records[0].name);

        if(me.edit !== "edit"){

            if(Ext.getCmp('win_zen_device_set').getViewModel().data.ips_default){
                me.ips_default = Ext.getCmp('win_zen_device_set').getViewModel().data.ips_default.static_bridge_mode;
            }

            Ext.getCmp('tag_bridge_member').getStore().loadData(records);

        }

        Ext.getCmp('ft_miimon').setValue(100);
        Ext.getCmp('ft_updelay').setValue(200);
        Ext.getCmp('ft_downdelay').setValue(200);
        Ext.getCmp('ft_arp_interval').setValue(0);

        if(me.net_name === undefined){

            Ext.getCmp('cont_interface_kind').show();

            Ext.getCmp('cont_interface_name').hide();

            var _store = Ext.data.StoreManager.lookup('store_interfaceKind');

            _store.load(function(records, operation, success){

                if(records.length > 0){

                    Ext.getCmp('cb_interface_kind').setValue(records[0].data.value);
                    Ext.getCmp('cb_interface_kind').setRawValue(records[0].data.name);

                }


            });

            Ext.getCmp('fs_bridge_basic').show();

            var _store = Ext.data.StoreManager.lookup('store_lname_list');

            var all_list = [];
            var unused_list = [];
            var used_check = true;

            if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge){
                all_list = setDevInterface(null,Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge); 
            }

            for(var i = 0; i < 10; i++){
                used_check = true;
                for(var j in all_list){
                    if('br' + i === all_list[j].name){
                        used_check = false;
                        break;
                    }
                }
                if(used_check){
                    unused_list.push({"name":i});
                }
            }

            _store.loadData(unused_list);

            Ext.getCmp('cb_bridge_num').setRawValue(_store.data.items[0].data.name);
            Ext.getCmp('cb_bridge_num').setValue(_store.data.items[0].data.name);

            Ext.getCmp('fs_vip_ip').show();

            Ext.getCmp('cb_bonding_num').enable();

            Ext.getCmp('cb_bridge_num').enable();

            Ext.getCmp('cb_vlan_num').enable();


        }else{

            Ext.getCmp('cont_interface_kind').hide();

            Ext.getCmp('cont_interface_name').show();

            if(me.net_type === "Bonding"){

                Ext.getCmp('lb_interface_name').setText("Bonding");

                Ext.getCmp('fs_bonding_basic').show();

                var _store = Ext.data.StoreManager.lookup('store_lname_list');

                var all_list = [];
                var unused_list = [];
                var used_check = true;

                if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding){
                    all_list = setDevInterface(null,null,Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding); 
                }

                for(var i = 0; i < 10; i++){
                    used_check = true;
                    for(var j in all_list){
                        if('bond' + i === all_list[j].name){
                            used_check = false;
                            break;
                        }
                    }
                    if(used_check){
                        unused_list.push({"name":i});
                    }
                }

                _store.loadData(unused_list);

                me.get_network_bonding();


            }else if(me.net_type === "Bridge"){

                Ext.getCmp('lb_interface_name').setText("Bridge");

                Ext.getCmp('fs_bridge_basic').show();

                var _store2 = Ext.data.StoreManager.lookup('store_lname_list');

                var all_list = [];
                var unused_list = [];
                var used_check = true;

                if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge){
                    all_list = setDevInterface(null,Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge); 
                }

                for(var i = 0; i < 10; i++){
                    used_check = true;
                    for(var j in all_list){
                        if('br' + i === all_list[j].name){
                            used_check = false;
                            break;
                        }
                    }
                    if(used_check){
                        unused_list.push({"name":i});
                    }
                }

                _store2.loadData(unused_list);

                me.get_network_bridge();

            }else if(me.net_type === "VLAN"){

                Ext.getCmp('lb_interface_name').setText("VLAN");

                Ext.getCmp('fs_vlan_basic').show();

                var _store = Ext.data.StoreManager.lookup('store_lname_list');

                var all_list = [];
                var unused_list = [];
                var used_check = true;

                if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan){
                    all_list = setDevInterface(null,null,null,Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan); 
                }

                for(var i = 0; i < 10; i++){
                    used_check = true;
                    for(var j in all_list){
                        if('vlan' + i === all_list[j].name){
                            used_check = false;
                            break;
                        }
                    }
                    if(used_check){
                        unused_list.push({"name":i});
                    }
                }

                _store.loadData(unused_list);

                me.get_network_vlan();

            }

            Ext.getCmp('fs_vip_ip').show();

            Ext.getCmp('cb_bonding_num').disable();

            Ext.getCmp('cb_bridge_num').disable();

            Ext.getCmp('cb_vlan_num').disable();

        }
    },

    get_network_bridge: function() {
        //Bridge 수정 시 등록된 데이터 바이딩 하는 함수

        var me = this;

        var response = {
            'net_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge[me.net_name]['default'], 
            'vip_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge[me.net_name]['virtual_ip']
        };

        var tempNum = response.net_info.name.split('br');

        Ext.getCmp('cb_bridge_num').setValue(tempNum[1]);

        if(response.net_info.stp === "on"){

            Ext.getCmp('ft_bridge_time').enable();

        }

        Ext.getCmp('ft_bridge_time').setValue(response.net_info.time);

        Ext.getCmp('cb_bridge_ethernetList').setValue(response.net_info.member[0]);

        me.bridge_mem = response.net_info.member;
        Ext.getCmp('tag_bridge_member').setValue(response.net_info.member);

        //IPv4/Netmask
        if(response.vip_info.ipv4 !== null){

            Ext.getCmp('grid_vip_ipv4').show();

            var ipv4 = [];

            for(var i in response.vip_info.ipv4){

                ipv4[i] = {'ip' : response.vip_info.ipv4[i]};

            }

            Ext.getCmp('grid_vip_ipv4').getStore().removeAll();

            Ext.getCmp('grid_vip_ipv4').getStore().add(ipv4);


        }

        //IPv6/Prefix
        if(response.vip_info.ipv6 !== null){

            Ext.getCmp('grid_vip_ipv6').show();

            var ipv6 = [];

            for(var i in response.vip_info.ipv6){

                ipv6[i] = {'ip' : response.vip_info.ipv6[i]};

            }

            Ext.getCmp('grid_vip_ipv6').getStore().removeAll();

            Ext.getCmp('grid_vip_ipv6').getStore().add(ipv6);


        }
    },

    get_network_bonding: function() {
        //Bonding 수정 시 등록된 데이터 바이딩 하는 함수

        var me = this;

        var response = {
            'net_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding[me.net_name]['default'], 
            'vip_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding[me.net_name]['virtual_ip']
        };

        var tempNum = response.net_info.name.split('bond');

        Ext.getCmp('cb_bonding_num').setValue(tempNum[1]);

        me.bonding_mem = response.net_info.member;

        Ext.getCmp('tag_bonding_member').setValue(response.net_info.member);

        Ext.getCmp('cb_bonding_ethernetList').setValue(response.net_info.member[0]);

        Ext.getCmp('cb_bonding_mode').setValue(response.net_info.mode);	//동작모드

        Ext.getCmp('ft_miimon').setValue(response.net_info.miimon); //링크 모니터링 주기

        Ext.getCmp('ft_updelay').setValue(response.net_info.updelay); //업 딜레이

        Ext.getCmp('ft_downdelay').setValue(response.net_info.downdelay); //다운 딜레이

        if(response.net_info.mode === "0" || response.net_info.mode === "2"){

            Ext.getCmp('ft_arp_interval').setValue(response.net_info.arp_interval); //ARP 주기

            var ip = [];

            for(var i in response.net_info.arp_ip){

                ip[i] = {'ip' : response.net_info.arp_ip[i]};

            }

            Ext.getCmp('grid_arp_ip').getStore().removeAll();

            Ext.getCmp('grid_arp_ip').getStore().add(ip);

            if(ip.length > 0){

                Ext.getCmp('grid_arp_ip').show();

            }

        }else if(response.net_info.mode === "1"){

            Ext.getCmp('cb_bonding_primary').setValue(response.net_info.primary);	//primary인터페이스

        }else if(response.net_info.mode === "4"){

            Ext.getCmp('cb_bonding_lacp_rate').setValue(response.net_info.lacp_rate);	//LACP 속도

            Ext.getCmp('cb_bonding_hash').setValue(response.net_info.hash);	//해시 모드
        }

        //IPv4/Netmask
        if(response.vip_info.ipv4 !== null){

            Ext.getCmp('grid_vip_ipv4').show();

            var ipv4 = [];

            for(var i in response.vip_info.ipv4){

                ipv4[i] = {'ip' : response.vip_info.ipv4[i]};

            }

            Ext.getCmp('grid_vip_ipv4').getStore().removeAll();

            Ext.getCmp('grid_vip_ipv4').getStore().add(ipv4);

        }

        //IPv6/Prefix
        if(response.vip_info.ipv6 !== null){

            Ext.getCmp('grid_vip_ipv6').show();

            var ipv6 = [];

            for(var i in response.vip_info.ipv6){

                ipv6[i] = {'ip' : response.vip_info.ipv6[i]};

            }

            Ext.getCmp('grid_vip_ipv6').getStore().removeAll();

            Ext.getCmp('grid_vip_ipv6').getStore().add(ipv6);

        }
    },

    get_network_vlan: function() {
        //VLAN 수정 시 등록된 데이터 바이딩 하는 함수

        var me = this;

        var response = {
            'net_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan[me.net_name]['default'], 
            'vip_info': Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan[me.net_name]['virtual_ip']
        };

        var tempNum = response.net_info.name.split('vlan');

        Ext.getCmp('cb_vlan_num').setValue(tempNum[1]);

        var temp = response.net_info.member;

        Ext.getCmp('cb_vlan_ethernetList').setValue(temp);

        //IPv4/Netmask
        if(response.vip_info.ipv4 !== null){

            Ext.getCmp('grid_vip_ipv4').show();

            var ipv4 = [];

            for(var i in response.vip_info.ipv4){

                ipv4[i] = {'ip' : response.vip_info.ipv4[i]};

            }

            Ext.getCmp('grid_vip_ipv4').getStore().removeAll();

            Ext.getCmp('grid_vip_ipv4').getStore().add(ipv4);


        }

        //IPv6/Prefix
        if(response.vip_info.ipv6 !== null){

            Ext.getCmp('grid_vip_ipv6').show();

            var ipv6 = [];

            for(var i in response.vip_info.ipv6){

                ipv6[i] = {'ip' : response.vip_info.ipv6[i]};

            }

            Ext.getCmp('grid_vip_ipv6').getStore().removeAll();

            Ext.getCmp('grid_vip_ipv6').getStore().add(ipv6);


        }
    },

    vlan_duplication_check: function(vlanName) {
        var returnValue = true;

        var _params = {};

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_vlan_list',
            _params,
            function(response){

                var retval = response;

                for(var i in retval){

                    if(retval[i].name === vlanName){

                        returnValue = false;
                    }
                }

                return returnValue;


            }
        );
    },

    set_network_vlan: function() {
        var me = this;

        var net_info = new Object();

        if(Ext.getCmp('cb_vlan_num').isValid() === false){ Ext.getCmp('cb_vlan_num').focus(); return false;}
        if(Ext.getCmp('cb_vlan_ethernetList').isValid() === false){ Ext.getCmp('cb_vlan_ethernetList').focus(); return false;}

        net_info.name = "vlan"+removeComma(Ext.getCmp('cb_vlan_num').getValue());

        net_info.id = removeComma(Ext.getCmp('cb_vlan_num').getValue());

        net_info.member = Ext.getCmp('cb_vlan_ethernetList').getValue();

        var vip_info = new Object();

        vip_info.ipv4 = new Object();

        var ipv4Range = [];

        var store = Ext.getCmp('grid_vip_ipv4').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_logical_interface').ipv4_validation(store.data.items[i].data.ip) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_logical_interface').ipv4_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_vip_ipv4').getPlugin('ipv4_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        if(Ext.getCmp('grid_vip_ipv4').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_vip_ipv4').getStore().data.length ; i++){

                ipv4Range[i] = Ext.getCmp('grid_vip_ipv4').getStore().data.items[i].data.ip;

            }

            vip_info.ipv4 = ipv4Range;

        }else{

            vip_info.ipv4 = null;
        }

        vip_info.ipv6 = new Object();

        var ipv6Range = [];

        var store = Ext.getCmp('grid_vip_ipv6').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_logical_interface').ipv6_validation(store.data.items[i].data.ip) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_logical_interface').ipv6_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_vip_ipv6').getPlugin('ipv6_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        if(Ext.getCmp('grid_vip_ipv6').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_vip_ipv6').getStore().data.length ; i++){

                ipv6Range[i] = Ext.getCmp('grid_vip_ipv6').getStore().data.items[i].data.ip;

            }

            vip_info.ipv6 = ipv6Range;

        }else{

            vip_info.ipv6 = null;
        }

        Ext.getCmp('grid_vip_ipv4').getStore().removeAll();
        Ext.getCmp('grid_vip_ipv6').getStore().removeAll();

        var _params = {

            net_info : Ext.encode(net_info),

            vip_info : Ext.encode(vip_info)

        };

        if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan === undefined){
            Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan = {};
        }

        Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.vlan[net_info.name] = {
            'default': net_info,
            'virtual_ip' : vip_info
        };

        Ext.getCmp('pnl_network_interface').get_network_list();

        me.close();
    },

    set_network_bridge: function() {
        var me = this;

        var net_info = new Object();

        if(Ext.getCmp('cb_bridge_num').getValue() === "select"){

            Ext.getCmp('errorBox0').setText('bridge 번호를 선택하세요.', false);
            Ext.getCmp('errorBox0').show();

            return false;
        }

        net_info.name = "br"+Ext.getCmp('cb_bridge_num').getValue();

        net_info.stp = Ext.getCmp('chk_stp').getValue()?"on":"off";

        if(Ext.getCmp('ft_bridge_time').getValue() === ''){
            net_info.time = null;
        }else{
            net_info.time = Ext.getCmp('ft_bridge_time').getValue();
        }

        net_info.member = new Object();

        if(Ext.getCmp('tag_bridge_member').isValid() === false){ Ext.getCmp('tag_bridge_member').focus(); return false;}

        var bridgeMemberRange = [];

        if(Ext.getCmp('tag_bridge_member').getValue().length === 0){
            Ext.getCmp('tag_bridge_member').focus();
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update('멤버를 추가해 주세요.');
            Ext.getCmp('win_logical_interface').set_btn = true;
            return false;
        }
        else{
            bridgeMemberRange = Ext.getCmp('tag_bridge_member').getValue();
            net_info.member = bridgeMemberRange;
        }

        var vip_info = new Object();

        vip_info.ipv4 = new Object();

        var store = Ext.getCmp('grid_vip_ipv4').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_logical_interface').ipv4_validation(store.data.items[i].data.ip) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_logical_interface').ipv4_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_vip_ipv4').getPlugin('ipv4_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        var ipv4Range = [];

        if(Ext.getCmp('grid_vip_ipv4').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_vip_ipv4').getStore().data.length ; i++){

                ipv4Range[i] = Ext.getCmp('grid_vip_ipv4').getStore().data.items[i].data.ip;

            }

            vip_info.ipv4 = ipv4Range;

        }else{

            vip_info.ipv4 = null;
        }

        vip_info.ipv6 = new Object();

        var store = Ext.getCmp('grid_vip_ipv6').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_logical_interface').ipv6_validation(store.data.items[i].data.ip) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_logical_interface').ipv6_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_vip_ipv6').getPlugin('ipv6_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        var ipv6Range = [];

        if(Ext.getCmp('grid_vip_ipv6').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_vip_ipv6').getStore().data.length ; i++){

                ipv6Range[i] = Ext.getCmp('grid_vip_ipv6').getStore().data.items[i].data.ip;

            }

            vip_info.ipv6 = ipv6Range;

        }else{

            vip_info.ipv6 = null;
        }

        Ext.getCmp('grid_vip_ipv4').getStore().removeAll();
        Ext.getCmp('grid_vip_ipv6').getStore().removeAll();

        var _params = {

            net_info : Ext.encode(net_info),

            vip_info : Ext.encode(vip_info)

        };

        if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge === undefined){
            Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge = {};
        }

        Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bridge[net_info.name] = {
            'default': net_info,
            'virtual_ip' : vip_info
        };

        Ext.getCmp('pnl_network_interface').get_network_list();

        me.close();
    },

    set_network_bonding: function() {
        var me = this;

        var net_info = new Object();

        net_info.name = "bond"+Ext.getCmp('cb_bonding_num').getValue();

        net_info.member = new Object();

        var bondingMemberRange = [];

        if(Ext.getCmp('tag_bonding_member').getValue().length === 0){
            Ext.getCmp('tag_bonding_member').focus();
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            err_fl.addCls('ic_msg_err');
            err_fl.update('멤버를 추가해 주세요.');
            Ext.getCmp('win_logical_interface').set_btn = true;
            return false;

        }else{

            var bondingMemberRange = [];
            bondingMemberRange = Ext.getCmp('tag_bonding_member').getValue();
            net_info.member = bondingMemberRange;

        }

        if(Ext.getCmp('ft_miimon').isValid() === false){ Ext.getCmp('ft_miimon').focus(); return false; }
        if(Ext.getCmp('ft_updelay').isValid() === false){ Ext.getCmp('ft_updelay').focus(); return false; }
        if(Ext.getCmp('ft_downdelay').isValid() === false){ Ext.getCmp('ft_downdelay').focus(); return false; }

        net_info.mode = Ext.getCmp('cb_bonding_mode').getValue();

        net_info.miimon = removeComma(Ext.getCmp('ft_miimon').getValue());

        net_info.updelay = removeComma(Ext.getCmp('ft_updelay').getValue());

        net_info.downdelay = removeComma(Ext.getCmp('ft_downdelay').getValue());

        if(Ext.getCmp('cb_bonding_lacp_rate').getValue() === "select"){

            net_info.lacp_rate = null;

        }else{

            net_info.lacp_rate = Ext.getCmp('cb_bonding_lacp_rate').getValue();
        }

        if(net_info.mode === "1"){
            if(Ext.getCmp('cb_bonding_primary').getValue() === ""){

                net_info.primary = null;

            }else{

                net_info.primary = Ext.getCmp('cb_bonding_primary').getValue();
            }
        }
        else{ net_info.primary = null; }

        if(Ext.getCmp('cb_bonding_hash').getValue() === "select"){

            net_info.hash = null;

        }else{

            net_info.hash = Ext.getCmp('cb_bonding_hash').getValue();

        }

        if(Ext.getCmp('ft_arp_interval').getValue() === ""){

            net_info.arp_interval = null;

        }else{

            net_info.arp_interval = removeComma(Ext.getCmp('ft_arp_interval').getValue());

        }


        net_info.arp_ip = new Object();

        var bondingIpRange = [];

        if(Ext.getCmp('grid_arp_ip').getStore().data.length === 0){

            net_info.arp_ip = bondingIpRange;

        }else if(Ext.getCmp('grid_arp_ip').getStore().data.length > 0){

            var bondingMemberRange = [];

            var store = Ext.getCmp('grid_arp_ip').getStore();

            for(var i in store.data.items){
                if(Ext.getCmp('win_logical_interface').arp_validation(store.data.items[i].data.ip) !== true){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                    err_fl.addCls('ic_msg_err');
                    err_fl.update(Ext.getCmp('win_logical_interface').arp_validation(store.data.items[i].data.ip));

                    Ext.getCmp('grid_arp_ip').getPlugin('arp_plug').startEdit(Number(i), 0);
                    return false;
                }
            }

            for(var i = 0 ; i < Ext.getCmp('grid_arp_ip').getStore().data.length ; i++){

                bondingIpRange[i] = Ext.getCmp('grid_arp_ip').getStore().data.items[i].data.ip;

            }

            net_info.arp_ip = bondingIpRange;

        }

        var vip_info = new Object();

        vip_info.ipv4 = new Object();

        var store = Ext.getCmp('grid_vip_ipv4').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_logical_interface').ipv4_validation(store.data.items[i].data.ip) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_logical_interface').ipv4_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_vip_ipv4').getPlugin('ipv4_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        var ipv4Range = [];

        if(Ext.getCmp('grid_vip_ipv4').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_vip_ipv4').getStore().data.length ; i++){

                ipv4Range[i] = Ext.getCmp('grid_vip_ipv4').getStore().data.items[i].data.ip;

            }

            vip_info.ipv4 = ipv4Range;

        }else{

            vip_info.ipv4 = null;
        }

        vip_info.ipv6 = new Object();

        var store = Ext.getCmp('grid_vip_ipv6').getStore();

        for(var i in store.data.items){
            if(Ext.getCmp('win_logical_interface').ipv6_validation(store.data.items[i].data.ip) !== true){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                err_fl.addCls('ic_msg_err');
                err_fl.update(Ext.getCmp('win_logical_interface').ipv6_validation(store.data.items[i].data.ip));

                Ext.getCmp('grid_vip_ipv6').getPlugin('ipv6_plug').startEdit(Number(i), 0);
                return false;
            }
        }

        var ipv6Range = [];

        if(Ext.getCmp('grid_vip_ipv6').getStore().data.length > 0){

            for(var i = 0 ; i < Ext.getCmp('grid_vip_ipv6').getStore().data.length ; i++){

                ipv6Range[i] = Ext.getCmp('grid_vip_ipv6').getStore().data.items[i].data.ip;

            }

            vip_info.ipv6 = ipv6Range;

        }else{

            vip_info.ipv6 = null;
        }

        Ext.getCmp('grid_vip_ipv4').getStore().removeAll();
        Ext.getCmp('grid_vip_ipv6').getStore().removeAll();

        var _params = {

            net_info : Ext.encode(net_info),

            vip_info : Ext.encode(vip_info)

        };

        if(Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding === undefined){
            Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding = {};
        }

        Ext.getCmp('pnl_network_interface').getViewModel().data.network_interface.network.bonding[net_info.name] = {
            'default': net_info,
            'virtual_ip' : vip_info
        };

        Ext.getCmp('pnl_network_interface').get_network_list();

        me.close();
    },

    ipv4_validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }
        var ip_mask = value.split('/');

        var dstip = ValidIPAddress(ip_mask[0]);
        var dstmask = ValidIPAddress(ip_mask[1]);
        var nullChk_ip = CheckNotNull(ip_mask[0]);
        var nullChk_mask = CheckNotNull(ip_mask[1]);

        if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
        if(!dstip){ return get_msg('err_ip'); }
        if(!dstmask){ return get_msg('err_form'); }

        return true;
    },

    ipv6_validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }
        var ip_mask = value.split('/');

        var dstmask = ValidIPAddress(ip_mask[1]);
        var dstipv6 = ValidIPv6(ip_mask[0]);
        if(!CheckNotNull(ip_mask[0]) || !CheckNotNull(ip_mask[1])){ return get_msg('err_null'); }
        if(!dstipv6){ return get_msg('err_ip'); }
        if(ip_mask[1] === undefined){ return get_msg('err_form'); }
        if(!LengthCheck(ip_mask[1], 0 ,64)){ return ValidLimit(0, 64); }

        return true;
    },

    member_validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }

        return true;
    },

    arp_validation: function(value) {
        if(!CheckNotNull(value)){ return get_msg('err_null'); }

        return true;
    }

});