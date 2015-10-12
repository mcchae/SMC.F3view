
Ext.define('SMC4ZEN.view.win_ipm_allowHost', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipm_allowhost',

    requires: [
        'SMC4ZEN.view.win_ipm_allowHostViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.column.Action',
        'Ext.form.field.Date',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.Checkbox',
        'Ext.button.Segmented',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_ipm_allowhost'
    },
    //cls: 'zen_win',
    id: 'win_ipm_allowHost',
    title: '허용 호스트 추가',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            bodyPadding: 10,
            header: false,
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'ipm_host_inter',
                                    margin : '0 0 10 5',
                                    width: 350,
                                    fieldLabel: '관리 네트워크',
                                    labelSeparator: ' ',
                                    labelWidth: 130,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_ipm_host_manager_list',
                                    valueField: 'name',
                                    listeners: {
                                        focus: 'onIpm_host_interFocus',
                                        blur: 'onIpm_host_interBlur',
                                        select: 'onIpm_host_interSelect'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            bind: {
                                                text: '{ip}'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    padding: 8,
                                                    width: 255,
                                                    items: [
                                                        {
                                                            xtype: 'gridpanel',
                                                            id: 'ipm_host_ip_grid',
                                                            width: 245,
                                                            header: false,
                                                            allowDeselect: true,
                                                            disableSelection: true,
                                                            hideHeaders: true,
                                                            rowLines: false,
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.tdCls = "cell_text_ipm";
                                                                        return value;
                                                                    },
                                                                    width: 200,
                                                                    dataIndex: 'ip',
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        baseCls: 'cell_text_ipm',
                                                                        padding: '0 0 -2 0',
                                                                        maskRe: /[0-9.]/,
                                                                        listeners: {
                                                                            change: 'onTextfieldChange1',
                                                                            blur: 'onTextfieldBlur1',
                                                                            focus: 'onTextfieldFocus'
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    hidden: true,
                                                                    id: 'ipm_ip_actioncol',
                                                                    width: 45,
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var grid =Ext.getCmp('ipm_host_ip_grid');
                                                                                grid.getPlugin('ipm_host_ip_plug').completeEdit();

                                                                                var store = grid.getStore();

                                                                                store.removeAt(rowIndex);

                                                                                if(store.data.items.length < 2){ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = true; }
                                                                                else{ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = false; }
                                                                                grid.getView().refresh();
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            viewConfig: {
                                                                overItemCls: ' ',
                                                                markDirty: false
                                                            },
                                                            plugins: [
                                                                {
                                                                    ptype: 'cellediting',
                                                                    pluginId: 'ipm_host_ip_plug',
                                                                    clicksToEdit: 1
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
                                    margin: '0 0 0 10',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            width: 130,
                                            bind: {
                                                text: '{mac}'
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    padding: 8,
                                                    width: 255,
                                                    items: [
                                                        {
                                                            xtype: 'gridpanel',
                                                            id: 'ipm_host_mac_grid',
                                                            width: 245,
                                                            header: false,
                                                            title: 'My Grid Panel',
                                                            allowDeselect: true,
                                                            disableSelection: true,
                                                            hideHeaders: true,
                                                            rowLines: false,
                                                            columns: [
                                                                {
                                                                    xtype: 'gridcolumn',
                                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                        metaData.tdCls = "cell_text_ipm";
                                                                        return value;
                                                                    },
                                                                    width: 200,
                                                                    dataIndex: 'mac',
                                                                    editor: {
                                                                        xtype: 'textfield',
                                                                        baseCls: 'cell_text_ipm',
                                                                        padding: '0 0 -2 0',
                                                                        maskRe: /[0-9a-fA-F:]/,
                                                                        listeners: {
                                                                            blur: 'onTextfieldBlur',
                                                                            change: 'onTextfieldChange'
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'actioncolumn',
                                                                    hidden: true,
                                                                    id: 'ipm_mac_actioncol',
                                                                    width: 45,
                                                                    align: 'center',
                                                                    items: [
                                                                        {
                                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                                var grid =Ext.getCmp('ipm_host_mac_grid');
                                                                                grid.getPlugin('ipm_host_mac_plug').completeEdit();

                                                                                var store = grid.getStore();

                                                                                store.removeAt(rowIndex);

                                                                                if(store.data.items.length < 2){ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = true; }
                                                                                else{ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = false; }
                                                                                grid.getView().refresh();
                                                                            },
                                                                            iconCls: 'icr_del'
                                                                        }
                                                                    ]
                                                                }
                                                            ],
                                                            viewConfig: {
                                                                overItemCls: ' ',
                                                                markDirty: false
                                                            },
                                                            plugins: [
                                                                {
                                                                    ptype: 'cellediting',
                                                                    pluginId: 'ipm_host_mac_plug',
                                                                    clicksToEdit: 1
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
                        },
                        {
                            xtype: 'container',
                            margin: '8 0 10 10',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    width: 130,
                                    text: '기간 설정'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch',
                                                pack: 'end'
                                            }
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            id: 'ipm_sel_hour_grid',
                                            margin: '8 0 0 0',
                                            width: 450,
                                            header: false,
                                            title: 'My Grid Panel',
                                            allowDeselect: true,
                                            disableSelection: true,
                                            sortableColumns: false,
                                            columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 150,
                                                    menuDisabled: true,
                                                    bind: {
                                                        text: '{start}'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_date";
                                                                return Ext.Date.format(value, 'Y-m-d');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 120,
                                                            dataIndex: 'src_date',
                                                            menuDisabled: true,
                                                            editor: {
                                                                xtype: 'datefield',
                                                                baseCls: 'cell_date',
                                                                msgTarget: 'none',
                                                                allowBlank: false,
                                                                editable: false,
                                                                format: 'Y-m-d',
                                                                submitFormat: 'Y-m-d',
                                                                listeners: {
                                                                    focus: 'onDatefieldFocus',
                                                                    collapse: 'onDatefieldCollapse'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_combo";
                                                                return value;
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 55,
                                                            dataIndex: 'src_h',
                                                            editor: {
                                                                xtype: 'combobox',
                                                                baseCls: 'cell_combo',
                                                                editable: false,
                                                                displayField: 'name',
                                                                queryMode: 'local',
                                                                store: {
                                                                    data: [
                                                                        {
                                                                            name: '00'
                                                                        },
                                                                        {
                                                                            name: '01'
                                                                        },
                                                                        {
                                                                            name: '02'
                                                                        },
                                                                        {
                                                                            name: '03'
                                                                        },
                                                                        {
                                                                            name: '04'
                                                                        },
                                                                        {
                                                                            name: '05'
                                                                        },
                                                                        {
                                                                            name: '06'
                                                                        },
                                                                        {
                                                                            name: '07'
                                                                        },
                                                                        {
                                                                            name: '08'
                                                                        },
                                                                        {
                                                                            name: '09'
                                                                        },
                                                                        {
                                                                            name: '10'
                                                                        },
                                                                        {
                                                                            name: '11'
                                                                        },
                                                                        {
                                                                            name: '12'
                                                                        },
                                                                        {
                                                                            name: '13'
                                                                        },
                                                                        {
                                                                            name: '14'
                                                                        },
                                                                        {
                                                                            name: '15'
                                                                        },
                                                                        {
                                                                            name: '16'
                                                                        },
                                                                        {
                                                                            name: '17'
                                                                        },
                                                                        {
                                                                            name: '18'
                                                                        },
                                                                        {
                                                                            name: '19'
                                                                        },
                                                                        {
                                                                            name: '20'
                                                                        },
                                                                        {
                                                                            name: '21'
                                                                        },
                                                                        {
                                                                            name: '22'
                                                                        },
                                                                        {
                                                                            name: '23'
                                                                        }
                                                                    ],
                                                                    fields: [
                                                                        {
                                                                            name: 'name'
                                                                        }
                                                                    ]
                                                                },
                                                                valueField: 'name',
                                                                listeners: {
                                                                    focus: 'onComboboxFocus3',
                                                                    collapse: 'onComboboxCollapse3'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return __zen('hour');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 35
                                                        }                                                        
                                                    ]
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        return "-";
                                                    },
                                                    height: 32,
                                                    width: 30,
                                                    menuDisabled: true
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 150,
                                                    menuDisabled: true,
                                                    bind: {
                                                        text: '{end}'
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_date";
                                                                return Ext.Date.format(value, 'Y-m-d');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 120,
                                                            dataIndex: 'dst_date',
                                                            menuDisabled: true,
                                                            editor: {
                                                                xtype: 'datefield',
                                                                baseCls: 'cell_date',
                                                                msgTarget: 'none',
                                                                allowBlank: false,
                                                                editable: false,
                                                                format: 'Y-m-d',
                                                                submitFormat: 'Y-m-d',
                                                                listeners: {
                                                                    focus: 'onDatefieldFocus1',
                                                                    collapse: 'onDatefieldCollapse1'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = "cell_combo";
                                                                return value;
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 55,
                                                            dataIndex: 'dst_h',
                                                            editor: {
                                                                xtype: 'combobox',
                                                                baseCls: 'cell_combo',
                                                                editable: false,
                                                                displayField: 'name',
                                                                queryMode: 'local',
                                                                store: {
                                                                    data: [
                                                                        {
                                                                            name: '00'
                                                                        },
                                                                        {
                                                                            name: '01'
                                                                        },
                                                                        {
                                                                            name: '02'
                                                                        },
                                                                        {
                                                                            name: '03'
                                                                        },
                                                                        {
                                                                            name: '04'
                                                                        },
                                                                        {
                                                                            name: '05'
                                                                        },
                                                                        {
                                                                            name: '06'
                                                                        },
                                                                        {
                                                                            name: '07'
                                                                        },
                                                                        {
                                                                            name: '08'
                                                                        },
                                                                        {
                                                                            name: '09'
                                                                        },
                                                                        {
                                                                            name: '10'
                                                                        },
                                                                        {
                                                                            name: '11'
                                                                        },
                                                                        {
                                                                            name: '12'
                                                                        },
                                                                        {
                                                                            name: '13'
                                                                        },
                                                                        {
                                                                            name: '14'
                                                                        },
                                                                        {
                                                                            name: '15'
                                                                        },
                                                                        {
                                                                            name: '16'
                                                                        },
                                                                        {
                                                                            name: '17'
                                                                        },
                                                                        {
                                                                            name: '18'
                                                                        },
                                                                        {
                                                                            name: '19'
                                                                        },
                                                                        {
                                                                            name: '20'
                                                                        },
                                                                        {
                                                                            name: '21'
                                                                        },
                                                                        {
                                                                            name: '22'
                                                                        },
                                                                        {
                                                                            name: '23'
                                                                        }
                                                                    ],
                                                                    fields: [
                                                                        {
                                                                            name: 'name'
                                                                        }
                                                                    ]
                                                                },
                                                                valueField: 'name',
                                                                listeners: {
                                                                    focus: 'onComboboxFocus1',
                                                                    collapse: 'onComboboxCollapse1'
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                return __zen('hour');
                                                            },
                                                            height: 0,
                                                            style: 'border:none',
                                                            width: 35
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    height: 32,
                                                    hidden: true,
                                                    id: 'sel_hour_actioncol',
                                                    width: 30,
                                                    align: 'center',
                                                    menuDisabled: true,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                
                                                                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                                                                err_fl.removeCls('ic_msg_err');
                                                                err_fl.update('');

                                                                var grid =Ext.getCmp('ipm_sel_hour_grid');
                                                                grid.getPlugin('ipm_sel_hour_plug').completeEdit();

                                                                var store = grid.getStore();

                                                                store.removeAt(rowIndex);

                                                            },
                                                            iconCls: 'icr_del'
                                                        }
                                                    ]
                                                }
                                            ],
                                            plugins: [
                                                {
                                                    ptype: 'cellediting',
                                                    pluginId: 'ipm_sel_hour_plug',
                                                    clicksToEdit: 1
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'ipm_host_desc',
                                    margin : '0 0 0 5',
                                    width: 450,
                                    labelSeparator: ' ',
                                    labelWidth: 130,
                                    enforceMaxLength: true,
                                    maxLength: 160,
                                    maxLengthText: ' ',
                                    bind: {
                                        fieldLabel: '{desc}'
                                    }
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
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender',
        render: 'onWindowRender'
    },

    onIpm_host_interFocus: function(component, event, eOpts) {
        var store = component.getStore();

        if(store.getCount() === 0){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ipm_inter'));
        }
    },

    onIpm_host_interBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onIpm_host_interSelect: function(combo, record, eOpts) {
        
        var value = combo.getValue();

        if(record.data.action === "accept"){

            combo.setFieldStyle('background:#aaddff');

        }
        else{

            combo.setFieldStyle('background:#ffaaaa');

        }

    },

    onTextfieldChange1: function(field, newValue, oldValue, eOpts) {
        if(!ValidIPAddress(newValue)){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ip'));
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        // setTipBlur(this, component);
    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
    },

    onTextfieldChange: function(field, newValue, oldValue, eOpts) {
        if(!ValidMAC(newValue)){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_form'));
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onDatefieldFocus: function(component, event, eOpts) {
        component.expand();
    },

    onDatefieldCollapse: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onComboboxFocus3: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse3: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onDatefieldFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onDatefieldCollapse1: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onComboboxFocus1: function(component, event, eOpts) {
        component.expand();
    },

    onComboboxCollapse1: function(field, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');
        field.blur();
    },

    onButtonClick: function(button, e, eOpts) {
        
        var me = this;

        var ip_store = Ext.getCmp('ipm_host_ip_grid').getStore();
        var mac_store = Ext.getCmp('ipm_host_mac_grid').getStore();
        var hour_store = Ext.getCmp('ipm_sel_hour_grid').getStore();
        var inter_store = Ext.getCmp('ipm_host_inter').getStore();
        var st_ipmallow = Ext.data.StoreManager.lookup('store_ipm_host_list');

        var obj = {};
        var name;
        var inter;
        var action;
        var net_manager;
        var obj_schedule = {};

        var update = (me.edit === "edit") ? true : false;

        if(me.edit === "edit"){ 
            
            obj._id = me._id;

        }

        if(inter_store.getCount() === 0){

            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ipm_inter'));
            Ext.getCmp('ipm_host_inter').focus();

            return false;

        }

        for(var i in inter_store.data.items){

            if(inter_store.data.items[i].get('name') === Ext.getCmp('ipm_host_inter').getValue()){

                name = inter_store.data.items[i].get('name');
                inter = inter_store.data.items[i].get('interface');
                action = inter_store.data.items[i].get('action');
                net_manager = inter_store.data.items[i].get('ip');

            }

        }

        var ip_in_chk = false;
        var ip_null_chk = false;
        var mac_null_chk = false;

        for(var i in ip_store.data.items){

            if(ip_store.data.items[i].get('ip') !== "" && ip_store.data.items[i].get('ip') !== undefined){

                ip_in_chk = true;

            }

        }

        if(ip_in_chk === false){ 

            ip_null_chk = true; 

        }

        var mac_in_chk = false;

        for(var i in mac_store.data.items){

            if(mac_store.data.items[i].get('mac') !== "" && mac_store.data.items[i].get('mac') !== undefined){

                mac_in_chk = true;

            }

        }

        if(mac_in_chk === false){ 

            mac_null_chk = true; 

        }

        if(ip_null_chk === true && mac_null_chk === true){
            
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
            
            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_ipm_ipmac'));

            Ext.getCmp('ipm_host_ip_grid').getPlugin('ipm_host_ip_plug').startEdit(Number(i), 0);
            
            return false;
        
        }

        if(mac_null_chk === true){

            for(var i in ip_store.data.items){

                if(!ValidIPAddress(ip_store.data.items[i].get('ip')) && ip_null_chk === true){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_ip'));

                    Ext.getCmp('ipm_host_ip_grid').getPlugin('ipm_host_ip_plug').startEdit(Number(i), 0);

                    return false;

                }

            }

        }

        if(ip_null_chk === true){
            
            for(var i in mac_store.data.items){
                
                if(!ValidMAC(mac_store.data.items[i].get('mac')) && mac_null_chk === true){
                                    
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];
                    
                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_form'));

                    Ext.getCmp('ipm_host_mac_grid').getPlugin('ipm_host_mac_plug').startEdit(Number(i), 0);
                    
                    return false;
                
                }
            
            }

        }

        obj.ip1 = null;
        obj.ip2 = null;
        obj.ip3 = null;
        obj.ip4 = null;

        obj.mac1 = null;
        obj.mac2 = null;
        obj.mac3 = null;
        obj.mac4 = null;

        var address_cnt = 0;

        for(var i in ip_store.data.items){

            if(ip_store.data.items[i].get('ip') !== ""){ address_cnt++; obj['ip'+address_cnt] = ip_store.data.items[i].get('ip'); }
        
        }

        address_cnt = 0;

        for(var i in mac_store.data.items){
            
            if(mac_store.data.items[i].get('mac') !== ""){ address_cnt++; obj['mac'+address_cnt] = mac_store.data.items[i].get('mac'); }
        
        }

        obj['@chk_use'] = "on";
        obj.name = name;
        obj.desc = Ext.getCmp('ipm_host_desc').getValue();
        obj.action = action;
        obj.schedule = [];
        obj.interface = inter;
        obj.network_manager = net_manager;

        obj_schedule.month = [];
        obj_schedule.week_list = [];
        obj_schedule.day = [];
        obj_schedule.period = [];
        obj_schedule.time = [];

        for(var j in hour_store.data.items){

            var src_h = hour_store.data.items[j].get('src_h');
            var dst_h = hour_store.data.items[j].get('dst_h');
            var src_date = Ext.Date.format(hour_store.data.items[j].get('src_date'), 'Y-m-d');
            var dst_date = Ext.Date.format(hour_store.data.items[j].get('dst_date'), 'Y-m-d');

            if(src_date === "" && src_h === "" && dst_date === "" && dst_h === ""){}
            else if(src_date === "" || src_h === "" || dst_date === "" || dst_h === ""){
                var chk = 0;
                if(src_date === ""){ chk = 0; }
                else if(src_h === ""){ chk = 1; }
                else if(dst_date === ""){ chk = 4; }
                else if(dst_h === ""){ chk = 5; }

                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_null'));

                Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(Number(j), chk);

                return false;

            }

            if(src_date > dst_date){

                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_than'));

                Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(Number(j), 0);

                return false;

            }
            else if(src_date === dst_date){

                if(src_h > dst_h){

                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_than'));

                    Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(Number(j), 0);

                    return false;

                }

            }

            if(src_date !== "" && src_h !== "" && dst_date !== "" && dst_h !== ""){

                obj_schedule.time.push(src_date + " " + src_h + " ~ " + dst_date + " " + dst_h);

            }

        }

        // 스케줄러 데이터 저장
        var tmpip = [];
        var tmpmac = [];

        obj.schedule = obj_schedule;

        // IP 저장

        for(var i = 1, max = 4; i <= max; i++){

            tmpip.push(obj['ip' + i]);
            tmpmac.push(obj['mac' + i]);

            delete obj['ip' + i];
            delete obj['mac' + i];

        }

        obj.ip = tmpip;
        obj.mac = tmpmac;

        // 레코드 ID 삭제

        delete obj.id;

        // 수정모드 혹은 추가모드에서 생성한 객체 입력

        console.log('IPM host data -> ', obj);

        if(me.edit === "edit"){

            me.record.set(obj);
            me.record.commit();
            Ext.getCmp('ipm_host_grid').getView().refresh();

        }
        else{

            st_ipmallow.add(obj);

        }

        me.close();

    },

    onButtonClick1: function(button, e, eOpts) {

        this.close();

    },

    onWindowAfterRender: function(component, eOpts) {
        
        var me = this;
        var vm = me.getViewModel();
        var st_ipmlist = Ext.getStore('store_ipm_host_manager_list');

        // 컴포넌트 객체 선언

        // 관리네트워크 스토어 데이터 복사 

        if(me.edit === "edit"){

            var inter_value = "";

            for(var i in st_ipmlist.data.items){
                
                if(me.record.get('interface') === st_ipmlist.data.items[i].get('interface') && 
                    me.record.get('name') === st_ipmlist.data.items[i].get('name') && 
                    me.record.get('network_manager') === st_ipmlist.data.items[i].get('ip') && 
                    me.record.get('action') === st_ipmlist.data.items[i].get('action')){
                    
                    inter_value = st_ipmlist.data.items[i].get('name');

                }
        
            }

            var ip_record = [];
            var mac_record = [];
            var time_record = [];
            var period_record = [];

            Ext.getCmp('ipm_host_inter').setValue(inter_value);
            Ext.getCmp('ipm_host_desc').setValue(me.record.get('desc'));

            for(var k in me.record.get('ip')){
                                    
                if(me.record.get('ip')[k] !== null){

                    ip_record.push({'ip': me.record.get('ip')[k]});

                }
                else{ 

                    ip_record.push({'ip':''}); 

                }

            }
                                
            for(var l in me.record.get('mac')){
            
                if(me.record.get('mac')[l] !== null){

                    mac_record.push({'mac':me.record.get('mac')[l]});
    
                }
                else{ 

                    mac_record.push({'mac':''}); 

                }
                                
            }
                                
            ip_record.sort(function(a,b){

                if(a.ip > b.ip){ 

                    return -1; 

                }
                else{ 

                    return 1; 

                }
            
            });

            mac_record.sort(function(a,b){

                if(a.mac > b.mac){ 

                    return -1; 

                }
                else{ 

                    return 1; 

                }

            });

            Ext.getCmp('ipm_host_ip_grid').getStore().loadData(ip_record);
            
            if(Ext.getCmp('ipm_host_ip_grid').getStore().data.items.length < 2){ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = true; }
            else{ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = false; }

            Ext.getCmp('ipm_host_ip_grid').getView().refresh();
            Ext.getCmp('ipm_host_mac_grid').getStore().loadData(mac_record);

            if(Ext.getCmp('ipm_host_mac_grid').getStore().data.items.length < 2){ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = true; }
            else{ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = false; }

            Ext.getCmp('ipm_host_mac_grid').getView().refresh();

            if(me.record.get('schedule') !== undefined){

                var month_cnt = 0;
                var day_cnt = 0;
                var week_cnt = 0;

                for(var p in me.record.get('schedule').time){
                    var time = me.record.get('schedule').time[p].split(' ~ ');
                    var src_time = time[0].split(' ');
                    var dst_time = time[1].split(' ');

                    time_record.push({ 'src_date' : src_time[0], 'src_h' : src_time[1], 'dst_date' : dst_time[0], 'dst_h' : dst_time[1] });

                }

                Ext.getCmp('ipm_sel_hour_grid').getStore().loadData(time_record);
                Ext.getCmp('ipm_sel_hour_grid').getView().refresh();
                Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(0, 0);
                Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(0, 4);
                Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').completeEdit();

            }   

        }

        // this.fieldInfo = makeZenTip();
        // chk_zenauth(null);
        // if(me.edit === "edit"){
        //     me.setTitle('허용 호스트 수정');
        // }

        // var _params = {
        //     option : Ext.encode('all')
        // };

        // Ext.data.JsonP.request({

        //     url : "/api/ftuctrl/get_pname_list",
        //     params : _params,
        //     success : function(response){
        //         if(response.retcode){
        //             var _params = {
        //                 basename : Ext.encode("network_ipm_manager")
        //             };

        //             request_helper.xmlrpc_call_JsonP(
        //                 'ftuctrl',
        //                 'getObjects',
        //                 _params,

        //                 function(data){
        //                     var record = [];
        //                     for(var i in data.list){
        //                         record.push({
        //                             'name' : data.list[i].name,
        //                             'interface' : data.list[i].interface,
        //                             'ip' : data.list[i].ip,
        //                             'action' : data.list[i].action
        //                         });
        //                     }
        //                     var store = Ext.data.StoreManager.lookup('store_ipm_host_manager_list');
        //                     store.loadData(record);

        //                     if(data.list !== null){
        //                         if(store.data.items.length !==0){
        //                             Ext.getCmp('ipm_host_inter').setValue(store.data.items[0].data.name);
        //                         }
        //                         else{
        //                             Ext.getCmp('ipm_host_inter').setValue(me.record.data.name);
        //                         }
        //                     }

        //                     if(me.mode === "monitor"){
        //                         var ip_record = [];
        //                         var mac_record = [];

        //                         ip_record.push({'ip':me.record.data.ip});
        //                         mac_record.push({'mac':me.record.data.mac});

        //                         Ext.getCmp('ipm_host_ip_grid').getStore().loadData(ip_record);
        //                         Ext.getCmp('ipm_host_mac_grid').getStore().loadData(mac_record);
        //                     }
        //                     else if(me.edit === "edit"){
        //                         //                         Ext.suspendLayouts();
        //                         //                         me.setTitle('허용 호스트 수정');
        //                         var inter_value;
        //                         console.log(me.record.data);
        //                         console.log(store.data.items);
        //                         for(var i in store.data.items){
        //                             if(me.record.data.interface === store.data.items[i].data.interface && me.record.data.name === store.data.items[i].data.name && me.record.data.network_manager === store.data.items[i].data.ip && me.record.data.action === store.data.items[i].data.action){
        //                                 inter_value = store.data.items[i].data.name;
        //                             }
        //                         }

        //                         Ext.getCmp('ipm_host_inter').setValue(inter_value);
        //                         Ext.getCmp('ipm_host_desc').setValue(me.record.data.desc);

        //                         var ip_record = [];
        //                         var mac_record = [];
        //                         var period_record = [];
        //                         var time_record = [];

        //                         for(var k in me.record.data.ip){
        //                             if(me.record.data.ip[k] !== null){
        //                                 ip_record.push({'ip':me.record.data.ip[k]});
        //                             }
        //                             else{ ip_record.push({'ip':''}); }
        //                         }
        //                         for(var l in me.record.data.mac){
        //                             if(me.record.data.mac[l] !== null){
        //                                 mac_record.push({'mac':me.record.data.mac[l]});
        //                             }
        //                             else{ mac_record.push({'mac':''}); }
        //                         }
        //                         ip_record.sort(function(a,b){
        //                             if(a.ip > b.ip){ return -1; }
        //                             else{ return 1; }
        //                         });
        //                         mac_record.sort(function(a,b){
        //                             if(a.mac > b.mac){ return -1; }
        //                             else{ return 1; }
        //                         });
        //                         //                         if(ip_record.length === 0){ ip_record.push({'ip':''}); }
        //                         Ext.getCmp('ipm_host_ip_grid').getStore().loadData(ip_record);
        //                         if(Ext.getCmp('ipm_host_ip_grid').getStore().data.items.length < 2){ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = true; }
        //                         else{ Ext.getCmp('ipm_ip_actioncol').items[0].disabled = false; }
        //                         Ext.getCmp('ipm_host_ip_grid').getView().refresh();
        //                         //                         if(mac_record.length === 0){ mac_record.push({'mac':''}); }
        //                         Ext.getCmp('ipm_host_mac_grid').getStore().loadData(mac_record);
        //                         if(Ext.getCmp('ipm_host_mac_grid').getStore().data.items.length < 2){ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = true; }
        //                         else{ Ext.getCmp('ipm_mac_actioncol').items[0].disabled = false; }
        //                         Ext.getCmp('ipm_host_mac_grid').getView().refresh();
        //                         Ext.getCmp('ipm_host_tab').setActiveTab(1);
        //                         console.log(me.record.data.schedule);
        //                         if(me.record.data.schedule !== undefined){
        //                             var month_cnt = 0;
        //                             var day_cnt = 0;
        //                             var week_cnt = 0;

        //                             for(var p in me.record.data.schedule.time){
        //                                 var time = me.record.data.schedule.time[p].split(' ~ ');
        //                                 var src_time = time[0].split(' ');
        //                                 var dst_time = time[1].split(' ');
        //                                 time_record.push({ 'src_date' : src_time[0], 'src_h' : src_time[1], 'dst_date' : dst_time[0], 'dst_h' : dst_time[1] });
        //                             }
        //                             console.log(time_record);
        //                             //                             if(time_record.length === 0){ time_record.push({ 'src_h' : '', 'src_m' : '', 'dst_h' : '', 'dst_m' : '' }); }
        //                             Ext.getCmp('ipm_sel_hour_grid').getStore().loadData(time_record);
        //                             Ext.getCmp('ipm_sel_hour_grid').getView().refresh();
        //                             Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(0, 0);
        //                             Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').startEdit(0, 4);
        //                             Ext.getCmp('ipm_sel_hour_grid').getPlugin('ipm_sel_hour_plug').completeEdit();
        //                         }

        //                         //                         Ext.getCmp('ipm_host_tab').setActiveTab(0);
        //                         //                         Ext.resumeLayouts();
        //                     }
        //                 }
        //             );

        //         }
        //     }
        // });
    },

    onWindowRender: function(component, eOpts) {
        var ip_store = {
            data:[
                { 'ip' : '' },
                { 'ip' : '' },
                { 'ip' : '' },
                { 'ip' : '' }
            ],
            fields:[
                { name: 'ip' }
            ]
        };

        var mac_store = {
            data:[
                { 'mac' : '' },
                { 'mac' : '' },
                { 'mac' : '' },
                { 'mac' : '' }
            ],
            fields:[
                { name: 'mac' }
            ]
        };

        var date_store = {
            data:[
                {
                    'src' : '',
                    'dst' : ''
                }
            ],
            fields:[
                { name: 'src' },
                { name: 'dst' }
            ]
        };

        var hour_store = {
            data:[
                {
                    'src_date' : '',
                    'src_h' : '',
                    'dst_date' : '',
                    'dst_h' : ''
                }
            ],
            fields:[
                { name: 'src_h' },
                { name: 'src_m' },
                { name: 'dst_h' },
                { name: 'dst_m' }
            ]
        };

        Ext.getCmp('ipm_host_ip_grid').reconfigure(ip_store);
        Ext.getCmp('ipm_host_mac_grid').reconfigure(mac_store);
        Ext.getCmp('ipm_sel_hour_grid').reconfigure(hour_store);

        Ext.getCmp('ipm_ip_actioncol').items[0].disabled = true;
        Ext.getCmp('ipm_mac_actioncol').items[0].disabled = true;

    },

    set_win: function(btn) {

        if(btn==="no"){

            var win = Ext.WindowManager.getActive();

            if (win) {

                win.close();

            }

        }
        else{

            var store = Ext.getCmp('ipm_host_inter').getStore();

            Ext.ComponentQuery.query('container[cls="fld_msg"]').forEach(function(cls){ cls.removeCls('ic_msg_err'); cls.update(''); });
            Ext.getCmp('ipm_host_desc').reset();

            if(store.getCount() > 0){ Ext.getCmp('ipm_host_inter').setValue(store.data.items[0].data.name); }

            Ext.getCmp('ipm_host_ip_grid').getStore().removeAll();
            Ext.getCmp('ipm_host_mac_grid').getStore().removeAll();
            Ext.getCmp('ipm_sel_hour_grid').getStore().removeAll();

            var ip_record = [{ 'ip' : '' }];
            var mac_record = [{ 'mac' : '' }];
            var date_record = [{ 'src' : '', 'dst' : '' }];
            var hour_record = [{ 'src_h' : '', 'src_m' : '', 'dst_h' : '', 'dst_m' : '' }];

            Ext.getCmp('ipm_host_ip_grid').getStore().loadData(ip_record);
            Ext.getCmp('ipm_host_mac_grid').getStore().loadData(mac_record);
            Ext.getCmp('ipm_sel_hour_grid').getStore().loadData(hour_record);

        }

    }

});