
Ext.define('SMC4ZEN.view.NFW2_log_config_log', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_config_log',

    requires: [
        'SMC4ZEN.view.NFW2_log_config_logViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.form.field.TextArea',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_log_config_log'
    },
    //cls: 'zen_body',
    defaultListenerScope: true,
    overflowY: 'auto',
    title : '기본 설정',
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose : 'saveData'
    },
    items: [
        {
            xtype: 'form',
            id: 'fm_log',
            bodyPadding: 5,
            items: [
                {
                    xtype: 'fieldset',
                    id: 'fs_freeze',
                    padding: '5 0 5 0',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    margin : '0 0 0 5',
                                    validator: function(value) {
                                        if(value === "" || value === true){ return true; }
                                        if(!LengthCheck(value,10,95)){ return ValidLimit('10','95');  }

                                        return true;
                                    },
                                    id: 'ft_freezeText',
                                    width: 60,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 2,
                                    listeners: {
                                        errorchange: 'onFt_freezeTextErrorChange',
                                        focus: 'onFt_freezeTextFocus',
                                        blur: 'onFt_freezeTextBlur',
                                        keydown: 'onFt_freezeTextKeydown'
                                    },
                                    bind : {
                                        value : '{freeze_value}'
                                    }
                                },
                                {
                                    xtype: 'radiogroup',
                                    id: 'rg_freeze',
                                    padding: '0 0 0 15',
                                    labelSeparator: ' ',
                                    labelWidth: 60,
                                    bind: {
                                        fieldLabel: '{log_info2}',
                                        value : '{freeze_type}'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'freeze',
                                            checked: true,
                                            inputValue: 'overwrite',
                                            listeners: {
                                                beforerender: 'onRadiofieldBeforeRender'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        render: 'onFs_freezeRender'
                    }
                },
                {
                    xtype: 'fieldset',
                    id: 'fs_hddsave',
                    margin : '0 0 5 0',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_alarm_use',
                                    margin : '5 0 5 0',
                                    listeners: {
                                        beforerender: 'onChk_alarm_useBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            id: 'cont_hdd',
                                            width: 200,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'rd_hdd1',
                                                    name: 'hdd',
                                                    margin : '0 10 0 0',
                                                    listeners: {
                                                        change: 'onRd_hdd1Change'
                                                    }
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value === "" || value === true){ return true; }
                                                        if(!LengthCheck(value,1,10000000)){ return ValidLimit('1','1,000,000');  }

                                                        return true;
                                                    },
                                                    fieldInfo: '',
                                                    disabled: true,
                                                    id: 'ft_hdd1',
                                                    width: 100,
                                                    enableKeyEvents: true,
                                                    enforceMaxLength: true,
                                                    maskRe: /[0-9]/,
                                                    maxLength: 7,
                                                    listeners: {
                                                        errorchange: 'onTextfieldErrorChange',
                                                        focus: 'onTextfieldFocus',
                                                        blur: 'onTextfieldBlur',
                                                        keydown: 'onTextfieldKeydown'
                                                    }
                                                },
                                                {
                                                    xtype: 'label',
                                                    padding: '0 0 0 12',
                                                    text: 'kbyte /'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rd_hdd2',
                                            name: 'hdd',
                                            margin : '0 10 0 0',
                                            listeners: {
                                                change: 'onRd_hhd2Change'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === "" || value === true){ return true; }
                                                if(!LengthCheck(value,10,95)){ return ValidLimit('10','95');  }

                                                return true;
                                            },
                                            fieldInfo: '입력범위 : 10 ~ 95',
                                            id: 'ft_hdd2',
                                            width: 50,
                                            enforceMaxLength: true,
                                            maxLength: 2,
                                            listeners: {
                                                errorchange: 'onFt_hdd2ErrorChange',
                                                keydown: 'onFt_hdd2Keydown',
                                                focus: 'onFt_hdd2Focus',
                                                blur: 'onFt_hdd2Blur'
                                            }
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '0 0 0 12',
                                            text: '%'
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        render: 'onFs_hddsaveRender'
                    }
                },
                {
                    xtype: 'fieldset',
                    id: 'fs_ftp',
                    padding: '5 0 8 5',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: 'rg_ftp',
                                    width: 700,
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            name: 'ftp',
                                            inputValue: 'sftp',
                                            listeners: {
                                                change: 'onRadiofieldChange2',
                                                beforerender: 'onRadiofieldBeforeRender1'
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'radio_ftp',
                                            name: 'ftp',
                                            inputValue: 'ftp',
                                            listeners: {
                                                change: 'onRadiofieldChange1',
                                                beforerender: 'onRadio_ftpBeforeRender'
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            name: 'ftp',
                                            inputValue: 'none',
                                            listeners: {
                                                change: 'onRadiofieldChange',
                                                beforerender: 'onRadiofieldBeforeRender2'
                                            }
                                        }
                                    ],
                                    listeners: {
                                        change: 'onRg_ftpChange'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    margin: '5 0 0 5',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(value === "" || value === true){ return true; }
                                                if(!ValidIPAddress(value)){ return get_msg('err_ipv4');  }

                                                return true;
                                            },
                                            id: 'ft_logback_ip',
                                            width: 470,
                                            labelSeparator: ' ',
                                            labelWidth: 170,
                                            bind: {
                                                fieldLabel: '{server_ip}',
                                                value : '{log_setting.ftp.ip}'
                                            },
                                            listeners: {
                                                errorchange: 'onFt_logback_ipErrorChange',
                                                focus: 'onFt_logback_ipFocus',
                                                blur: 'onFt_logback_ipBlur'
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin : '0 0 0 5',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === "" || value === true){ return true; }
                                        if(byteCheck(value) > 63){ return ValidByte('63');  }

                                        return true;
                                    },
                                    id: 'ft_logback_id',
                                    width: 470,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    bind: {
                                        fieldLabel: '{id}'
                                    },
                                    listeners: {
                                        errorchange: 'onFt_logback_idErrorChange',
                                        blur: 'onFt_logback_idBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin : '0 0 0 5',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === "" || value === true){ return true; }
                                        if(byteCheck(value) > 63){ return ValidByte('63');  }

                                        return true;
                                    },
                                    id: 'ft_logback_password',
                                    width: 470,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    inputType: 'password',
                                    bind: {
                                        fieldLabel: '{pwd}'
                                    },
                                    listeners: {
                                        errorchange: 'onFt_logback_passwordErrorChange',
                                        blur: 'onFt_logback_passwordBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin : '0 0 0 5',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'ft_path',
                                    width: 470,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    bind: {
                                        fieldLabel: '{save_location}'
                                    }
                                },
                                {
                                    xtype: 'textareafield',
                                    id: 'ssh_auth',
                                    width: 670,
                                    labelSeparator: ' ',
                                    labelWidth: 170,
                                    readOnly: true,
                                    bind: {
                                        fieldLabel: '{ssh_auth}'
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        render: 'onFs_ftpRender'
                    }
                },
                {
                    xtype: 'fieldset',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cb_plain_keep',
                                    width: 400,
                                    labelSeparator: ' ',
                                    labelWidth: 220,
                                    editable: false,
                                    emptyText: 'Select',
                                    displayField: 'name',
                                    store: 'store_logDataDate',
                                    valueField: 'value',
                                    bind: {
                                        fieldLabel: '{log_data_period}'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_logUse',
                                    labelSeparator: ' ',
                                    boxLabel: '',
                                    listeners: {
                                        change: 'onChk_logUseChange',
                                        beforerender: 'onChk_logUseBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chk_backup_ftp',
                                    labelSeparator: ' ',
                                    listeners: {
                                        beforerender: 'onChk_backup_ftpBeforeRender'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cb_text',
                                    width: 370,
                                    labelSeparator: ' ',
                                    labelWidth: 220,
                                    editable: false,
                                    emptyText: 'Select',
                                    displayField: 'name',
                                    store: 'store_logDataDate',
                                    valueField: 'value',
                                    bind: {
                                        fieldLabel: '{com_log_data_control}'
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        render: 'onFieldsetRender'
                    }
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            padding: '5 0 8 0',
                            items: [
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
                                    xtype: 'gridpanel',
                                    cls: 'in_grid',
                                    id: 'grid_network_range',
                                    margin: '5 0 0 0',
                                    width: 300,
                                    columnLines: true,
                                    hideHeaders: true,
                                    store: 'store_network_range',
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
                                                id: 'ft_network_range',
                                                width: 300,
                                                listeners: {
                                                    focus: 'onFt_network_rangeFocus',
                                                    blur: 'onFt_network_rangeBlur'
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 50,
                                            align: 'center',
                                            items: [
                                                {
                                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                        return 'icr_del';
                                                    },
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        Ext.getCmp('grid_network_range').getStore().removeAt(rowIndex);
                                                    }
                                                }
                                            ]
                                        }
                                    ],
                                    viewConfig: {
                                        markDirty: false
                                    },
                                    plugins: [
                                        {
                                            ptype: 'cellediting',
                                            pluginId: 'cell_range',
                                            clicksToEdit: 1
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        render: 'onFieldsetRender1'
                    }
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    id: 'rg_search',
                                    width: 280,
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            width: 150,
                                            name: 'search',
                                            inputValue: 'local',
                                            listeners: {
                                                beforerender: 'onRadiofieldBeforeRender3'
                                            }
                                        },
                                        {
                                            xtype: 'radiofield',
                                            width: 170,
                                            name: 'search',
                                            inputValue: 'outside',
                                            listeners: {
                                                beforerender: 'onRadiofieldBeforeRender4'
                                            }
                                        }
                                    ],
                                    listeners: {
                                        change: 'onRg_searchChange'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    id: 'cont_search',
                                    margin: '0 0 0 15',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(Ext.getCmp('rg_search').getValue().search === "outside"){

                                                    if(value === true){ return true; }
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                                    if(!ValidIPAddress(value)){ return get_error_msg('err_ipv4');  }

                                                    return true;

                                                }else{

                                                    return true;
                                                }
                                            },
                                            id: 'ft_searchIp',
                                            width: 200,
                                            labelSeparator: ' ',
                                            labelWidth: 80,
                                            bind: {
                                                fieldLabel: '{ip}'
                                            },
                                            listeners: {
                                                errorchange: 'onTextfieldErrorChange1',
                                                blur: 'onTextfieldBlur1',
                                                focus: 'onTextfieldFocus1'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(Ext.getCmp('rg_search').getValue().search === "outside"){

                                                    if(value === true){ return true; }
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                    return true;
                                                }else{

                                                    return true;
                                                }
                                            },
                                            id: 'ft_searchId',
                                            padding: '0 0 0 10',
                                            width: 135,
                                            labelSeparator: ' ',
                                            labelWidth: 60,
                                            bind: {
                                                fieldLabel: '{id}'
                                            },
                                            listeners: {
                                                errorchange: 'onFt_searchIdErrorChange',
                                                blur: 'onFt_searchIdBlur'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(Ext.getCmp('rg_search').getValue().search === "outside"){

                                                    if(value === true){ return true; }
                                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                                    return true;
                                                }else{

                                                    return true;
                                                }
                                            },
                                            id: 'ft_searchPw',
                                            padding: '0 0 0 10',
                                            width: 150,
                                            labelSeparator: ' ',
                                            labelWidth: 70,
                                            inputType: 'password',
                                            bind: {
                                                fieldLabel: '{pwd}'
                                            },
                                            listeners: {
                                                errorchange: 'onFt_searchPwErrorChange',
                                                blur: 'onFt_searchPwBlur'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    listeners: {
                        render: 'onFieldsetRender2'
                    }
                },
                {
                    xtype: 'fieldset',
                    id: 'fs_port',
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cb_port',
                                    width: 250,
                                    labelSeparator: ' ',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'store_pname_list',
                                    valueField: 'name',
                                    bind: {
                                        fieldLabel: '{port_setting}'
                                    },
                                    listeners: {
                                        render: 'onCb_portRender'
                                    }
                                }
                            ]
                        }
                    ],
                    listeners: {
                        render: 'onFs_portRender'
                    }
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
                }
    //             {
    //                 xtype: 'button',
    //                 cls: 'ft_confirm',
    //                 iconCls: 'ft_confirm_icl',
    //                 bind: {
    //                     text: '{confirm}'
    //                 },
    //                 listeners: {
    //                     click: 'onButtonClick1'
    //                 }
    //             },
    //             {
    //                 xtype: 'button',
    //                 cls: 'ft_cancel',
    //                 bind: {
    //                     text: '{cancel}'
    //                 },
    //                 listeners: {
    //                     click: 'onButtonClick2'
    //                 }
    //             }
            ]
        }
    ],

    onPanelAfterRender: function(component, eOpts) {
        
        // 0. 공통변수 선언

        var me = this;
        var vm = me.getViewModel();
        var vd = vm.getData().log_setting.log;
        var st_manageport = Ext.data.StoreManager.lookup('store_pname_list');

        console.log('View model obj -> ', vm);
        console.log('View model -> ', vm.getData());
        console.log('View model Data -> ', vd);

        // 1. 컴포넌트 초기화

        this.fieldInfo = makeZenTip();

        if(vd.freeze !== null){

            Ext.getCmp('ft_freezeText').setValue(vd.freeze["#text"]);
            Ext.getCmp('rg_freeze').setValue({'freeze' : vd.freeze["@type"] });

        }

        // HDD 설정
        if(vd.hddsave !== null){

            //HDD 용량 사용 알림
            if(vd.hddsave["@alarm_use"] === "on"){

                Ext.getCmp('chk_alarm_use').setValue(true);
                Ext.getCmp('cont_hdd').enable();

            }
            else{

                Ext.getCmp('chk_alarm_use').setValue(false);
                Ext.getCmp('cont_hdd').disable();

            }

            if(vd.hddsave["@type"] === "kbytes"){

                Ext.getCmp('rd_hdd1').setValue(true);
                Ext.getCmp('ft_hdd1').setValue(vd.hddsave["@value"]);

            }
            else{

                Ext.getCmp('rd_hdd2').setValue(true);
                Ext.getCmp('ft_hdd2').setValue(vd.hddsave["@value"]);

            }

        }

        // 로그백업용(S)FTP서버설정
        if(vd.ftp !== null){

            Ext.getCmp('rg_ftp').setValue({'ftp' : vd.ftp["@chk_type"]});
            Ext.getCmp('ft_logback_ip').setValue(vd.ftp.ip);
            Ext.getCmp('ft_logback_id').setValue(vd.ftp.id);
            Ext.getCmp('ft_logback_password').setValue(vd.ftp.password);
            Ext.getCmp('ft_path').setValue(vd.ftp.path);
            //Ext.getCmp('ft_ssh').setValue(vd.ftp.id);

        }

        // 로그데이터관리
        if(vd.log_manage !== null){

            Ext.getCmp('cb_plain_keep').setValue(vd.log_manage.plain_keep);

            //로그압축사용
            if(vd.log_manage.comp["@chk_use"] === "on"){

                Ext.getCmp('chk_logUse').setValue(true);

                if(vd.ftp["@chk_type"] === "sftp" || vd.ftp["@chk_type"] === "ftp"){

                    Ext.getCmp("chk_backup_ftp").enable();

                }

                Ext.getCmp('cb_text').enable(); //데이터 유지기간 활성화

            }
            else{

                Ext.getCmp('chk_logUse').setValue(false);
                Ext.getCmp('chk_backup_ftp').disable();
                Ext.getCmp('cb_text').disable();//데이터 유지기간 비활성화

            }

            //압축데이터
            if(vd.log_manage.comp["@backup_ftp"] === "on"){

                Ext.getCmp('chk_backup_ftp').setValue(true);

            }else{

                Ext.getCmp('chk_backup_ftp').setValue(false);

            }

            Ext.getCmp('cb_text').setValue(vd.log_manage.comp["#text"]);

        }

        //업무네트워크
        if(vd.network_range !== null){

            if(vd.network_range["@chk_use"] === "on"){

                for(var i in vd.network_range.member){

                    var range = [];

                    for(var i in vd.network_range.member){

                        range[i] = {'ip' : vd.network_range.member[i]};

                    }

                    Ext.getCmp('grid_network_range').getStore().removeAll();
                    Ext.getCmp('grid_network_range').getStore().add(range);
                    Ext.getCmp('grid_network_range').show();

                }

            }

        }

        // 로그검색 서버 설정
        if(vd.search !== null){

            Ext.getCmp('rg_search').setValue({'search' : vd.search["@type"]});

            if(vd.search["@type"] === "outside"){

                Ext.getCmp('cont_search').show();

                Ext.getCmp('ft_searchIp').setValue(vd.search["@outside_svr_ip"]);

                if(vd.search["@outside_svr_id"] !== undefined){

                    Ext.getCmp('ft_searchId').setValue(vd.search["@outside_svr_id"]);

                }

                if(vd.search["@outside_svr_pw"] !== undefined){

                    Ext.getCmp('ft_searchPw').setValue(vd.search["@outside_svr_pw"]);

                }

            }
            else{

                Ext.getCmp('cont_search').hide();

            }

        }

        // 로그 관리 포트
        if(vd.port !== undefined){

            Ext.getCmp('cb_port').setValue(vd.port.port);

        }

        // st_manageport.loadData(records);

        Ext.getCmp('radio_ftp').show();
        Ext.getCmp('cb_plain_keep').show();
        Ext.getCmp('cb_text').show();
        Ext.getCmp("ssh_auth").setValue(__zen('log_info4'));

    },

    onFt_freezeTextErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error,null);

    },

    onFt_freezeTextFocus: function(component, event, eOpts) {

        setTipFocus(this,component);
        component.fieldInfo = __zen('input_range')+'10~95';

    },

    onFt_freezeTextBlur: function(component, event, eOpts) {

        setTipBlur(this,component);
        component.validateValue(true);

    },

    onFt_freezeTextKeydown: function(textfield, e, eOpts) {

        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){

            e.stopEvent();

        }

    },

    onRadiofieldBeforeRender: function(component, eOpts) {

        component.boxLabel = __zen('rewrite_old_log');

    },

    onFs_freezeRender: function(component, eOpts) {

        component.setTitle(__zen('log_info1'));

    },

    onChk_alarm_useBeforeRender: function(component, eOpts) {

        component.boxLabel = __zen('hdd_usage_alarm');

    },

    onRd_hdd1Change: function(field, newValue, oldValue, eOpts) {
        
        if(newValue){

            Ext.getCmp('ft_hdd2').setValue('');
            Ext.getCmp('ft_hdd2').disable();
            Ext.getCmp('ft_hdd1').enable();

        }

    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error,null);

    },

    onTextfieldFocus: function(component, event, eOpts) {

        setTipFocus(this,component);
        component.fieldInfo = __zen('input_range')+'1 ~ 1,000,000';

    },

    onTextfieldBlur: function(component, event, eOpts) {

        setTipBlur(this,component);
        component.validateValue(true);

    },

    onTextfieldKeydown: function(textfield, e, eOpts) {
        
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){

            e.stopEvent();

        }

    },

    onRd_hhd2Change: function(field, newValue, oldValue, eOpts) {
        
        if(newValue){
            
            Ext.getCmp('ft_hdd1').setValue('');
            Ext.getCmp('ft_hdd1').disable();
            Ext.getCmp('ft_hdd2').enable();

        }

    },

    onFt_hdd2ErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error,null);

    },

    onFt_hdd2Keydown: function(textfield, e, eOpts) {
        
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }

    },

    onFt_hdd2Focus: function(component, event, eOpts) {

        setTipFocus(this,component);
        component.fieldInfo = __zen('input_range')+'10 ~ 95';

    },

    onFt_hdd2Blur: function(component, event, eOpts) {

        setTipBlur(this,component);
        component.validateValue(true);

    },

    onFs_hddsaveRender: function(component, eOpts) {

        component.setTitle(__zen('hdd_setting'));

    },

    onRadiofieldChange2: function(field, newValue, oldValue, eOpts) {
        
        if(newValue){

            Ext.getCmp('ft_logback_ip').enable();
            Ext.getCmp('ft_logback_id').enable();
            Ext.getCmp('ft_logback_password').enable();
            Ext.getCmp('ft_path').enable();
            Ext.getCmp('ft_logback_ip').setValue('');
            Ext.getCmp('ft_logback_id').setValue('');
            Ext.getCmp('ft_logback_password').setValue('');
            Ext.getCmp('ft_path').setValue('');

        }

    },

    onRadiofieldBeforeRender1: function(component, eOpts) {

        component.boxLabel = __zen('use_sftp');

    },

    onRadiofieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){

            Ext.getCmp('ft_logback_ip').enable();
            Ext.getCmp('ft_logback_id').enable();
            Ext.getCmp('ft_logback_password').enable();
            Ext.getCmp('ft_path').enable();
            Ext.getCmp('ft_logback_ip').setValue('');
            Ext.getCmp('ft_logback_id').setValue('');
            Ext.getCmp('ft_logback_password').setValue('');
            Ext.getCmp('ft_path').setValue('');

        }

    },

    onRadio_ftpBeforeRender: function(component, eOpts) {

        component.boxLabel = __zen('use_ftp');

    },

    onRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        
        if(newValue){

            Ext.getCmp('ft_logback_ip').disable();
            Ext.getCmp('ft_logback_id').disable();
            Ext.getCmp('ft_logback_password').disable();
            Ext.getCmp('ft_path').disable();

            Ext.getCmp('ft_logback_ip').setValue('');
            Ext.getCmp('ft_logback_id').setValue('');
            Ext.getCmp('ft_logback_password').setValue('');
            Ext.getCmp('ft_path').setValue('');
        }

    },

    onRadiofieldBeforeRender2: function(component, eOpts) {
        
        component.boxLabel = __zen('unused');

    },

    onRg_ftpChange: function(field, newValue, oldValue, eOpts) {
        
        var chk_loguse = Ext.getCmp("chk_logUse");

        if(chk_loguse.getValue()){

            if(newValue.ftp === "sftp" || newValue.ftp === "ftp"){

                Ext.getCmp('chk_backup_ftp').enable();

            }
            else{

                Ext.getCmp('chk_backup_ftp').disable();

            }

        }

    },

    onFt_logback_ipErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error,null);

    },

    onFt_logback_ipFocus: function(component, event, eOpts) {

        var str = disp_help_ip('4s');

        setTipFocus(this,component);
        component.fieldInfo = str;

    },

    onFt_logback_ipBlur: function(component, event, eOpts) {

        setTipBlur(this,component);
        component.validateValue(true);

    },

    onFt_logback_idErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error,null);

    },

    onFt_logback_idBlur: function(component, event, eOpts) {

        component.validateValue(true);

    },

    onFt_logback_passwordErrorChange: function(labelable, error, eOpts) {

        prt_errMsg(error,null);

    },

    onFt_logback_passwordBlur: function(component, event, eOpts) {

        component.validateValue(true);

    },

    onFs_ftpRender: function(component, eOpts) {

        component.setTitle(__zen('log_info3'));

    },

    onChk_logUseChange: function(field, newValue, oldValue, eOpts) {

        if(newValue){

            Ext.getCmp('cb_text').enable();

            if(Ext.getCmp('rg_ftp').getValue().ftp === "sftp" || Ext.getCmp('rg_ftp').getValue().ftp === "ftp"){

                Ext.getCmp('chk_backup_ftp').enable();

            }else{

                Ext.getCmp('chk_backup_ftp').disable();

            }

        }else{

            Ext.getCmp('cb_text').disable();
            Ext.getCmp('chk_backup_ftp').disable();

        }

    },

    onChk_logUseBeforeRender: function(component, eOpts) {

        component.boxLabel = __zen('log_info5');

    },

    onChk_backup_ftpBeforeRender: function(component, eOpts) {

        component.boxLabel = __zen('log_info6');

    },

    onFieldsetRender: function(component, eOpts) {

        component.setTitle(__zen('log_data_control'));

    },

    onButtonClick: function(button, e, eOpts) {

        Ext.getCmp("grid_network_range").getStore().add({'ip':''});

    },

    onFt_network_rangeFocus: function(component, event, eOpts) {

        setTipFocus(this,component);
        var str = disp_help_ip('4r');
        component.fieldInfo = str;
        
    },

    onFt_network_rangeBlur: function(component, event, eOpts) {

        setTipBlur(this,component);
        component.validateValue(true);

    },

    onFieldsetRender1: function(component, eOpts) {
        component.setTitle(__zen('task_network'));
    },

    onRadiofieldBeforeRender3: function(component, eOpts) {
        component.boxLabel = __zen('use_local_host');
    },

    onRadiofieldBeforeRender4: function(component, eOpts) {
        component.boxLabel = __zen('use_external_server');
    },

    onRg_searchChange: function(field, newValue, oldValue, eOpts) {
        if(newValue.search === "outside"){

            Ext.getCmp('cont_search').show();

        }else{

            Ext.getCmp('cont_search').hide();

        }
    },

    onTextfieldErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error,null);
    },

    onTextfieldBlur1: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldFocus1: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onFt_searchIdErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error,null);
    },

    onFt_searchIdBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onFt_searchPwErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error,null);
    },

    onFt_searchPwBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onFieldsetRender2: function(component, eOpts) {
        component.setTitle(__zen('log_server_set'));
    },

    onCb_portRender: function(component, eOpts) {
        component.emptyText = __zen('select');
        component.applyEmptyText();
    },

    onFs_portRender: function(component, eOpts) {
        component.setTitle(__zen('log_manage_port'));
    },

    onButtonClick2: function(button, e, eOpts) {

        Ext.getCmp("fm_log").getForm().reset();

    },

    saveData : function(component, eOpts){

        // 0. 유효성 검사

        var me = this;
        var fm = Ext.getCmp('fm_log');
        var pv = me.parentObj.getViewModel();

        if(!fm.isValid()){

            me.parentObj.viewState = false;

            return false;

        }

        // 1. 컴포넌트 정의

        var valid1 = Ext.getCmp('ft_freezeText').isValid();
        var valid2 = Ext.getCmp('ft_hdd1').isValid();
        var valid3 = Ext.getCmp('ft_hdd2').isValid();
        var valid4 = Ext.getCmp('ft_logback_ip').isValid();
        var valid5 = Ext.getCmp('ft_logback_id').isValid();
        var valid6 = Ext.getCmp('ft_logback_password').isValid();
        var valid8 = Ext.getCmp('ft_searchIp').isValid();

        // if(!valid1 || !valid2 || !valid3 || !valid4 || !valid5 || !valid6 || !valid8){

        //     return false;

        // }

        if(Ext.getCmp('chk_alarm_use').getValue()){

            if(Ext.getCmp('ft_hdd1').getValue() === '' && Ext.getCmp('ft_hdd2').getValue() === ''){

                Ext.Msg.alert(__weguardia, get_msg('err_hdd_alarm'));

                me.parentObj.viewState = false;

                return false;

            }

        }

        //로그 기능 불능시 수행 설정
        var freeze = {};

        freeze["#text"] = parseInt(Ext.getCmp('ft_freezeText').getValue());
        freeze["@type"] = Ext.getCmp('rg_freeze').getValue().freeze;

        //HDD 설정
        var hddsave = {};

        hddsave["@alarm_use"] = Ext.getCmp('chk_alarm_use').getValue()?"on":"off";
        if(Ext.getCmp('chk_alarm_use').getValue()){ //'@alarm_use'=on 일 때만 입력 값을 저장함
            hddsave["@value"] = Ext.getCmp('rd_hdd1').getValue()?parseInt(Ext.getCmp('ft_hdd1').getValue()):parseInt(Ext.getCmp('ft_hdd2').getValue());
            hddsave["@type"] = Ext.getCmp('rd_hdd1').getValue()?"kbytes":"per";
        }

        //로그백업용(S)FTP서버설정
        var ftp = {};

        ftp["@chk_type"] = Ext.getCmp('rg_ftp').getValue().ftp;
        ftp["ip"] = Ext.getCmp('ft_logback_ip').getValue();
        ftp["id"] = Ext.getCmp('ft_logback_id').getValue();
        ftp["password"] = Ext.getCmp('ft_logback_password').getValue();
        ftp["path"] = Ext.getCmp('ft_path').getValue();

        //로그 데이터 관리
        var log_manage = {};

        log_manage["plain_keep"] = Ext.getCmp('cb_plain_keep').getValue();
        log_manage["comp"] = new Object();
        log_manage.comp["@chk_use"] = Ext.getCmp('chk_logUse').getValue()?"on":"off";
        
        if(Ext.getCmp('rg_ftp').getValue().ftp !== 'none' && Ext.getCmp('chk_backup_ftp').getValue()){
            
            log_manage.comp["@backup_ftp"] = "on";

        }
        else{

            log_manage.comp["@backup_ftp"] = "off";

        }

        log_manage.comp["#text"] = Ext.getCmp('cb_text').getValue();

        //업무 네트워크
        var range = [];
        var network_range = {};

        network_range["member"] = {};
        
        if(Ext.getCmp('grid_network_range').getStore().data.length > 0){

            network_range["@chk_use"] = "on";

            var _store = Ext.getCmp("grid_network_range").getStore();

            for(var i = 0 ; i < _store.data.length ; i++){

                var item = _store.data.items[i].get('ip');

                if(!CheckNotNull(item)){

                    prt_errMsg(get_msg('err_null'),null);
                    Ext.getCmp("grid_network_range").getPlugin('cell_range').startEdit(i,0);

                    me.parentObj.viewState = false;

                    return false;

                }

                if(!ValidRange(item)){

                    prt_errMsg('Range '+get_msg('err_form'),null);
                    Ext.getCmp("grid_network_range").getPlugin('cell_range').startEdit(i,0);

                    me.parentObj.viewState = false;

                    return false;

                }

                range[i] = item;
            }

        }
        else{

            network_range["@chk_use"] = "off";

        }

        network_range["member"] = range;

        //로그검색 서버 설정
        var search = {};

        search["@type"] = Ext.getCmp('rg_search').getValue().search;

        if(Ext.getCmp('rg_search').getValue().search === "outside"){

            search["@outside_svr_ip"] = Ext.getCmp('ft_searchIp').getValue();
            search["@outside_svr_id"] = Ext.getCmp('ft_searchId').getValue();
            search["@outside_svr_pw"] = Ext.getCmp('ft_searchPw').getValue();

        }

        //로그관리포트
        var port = {};

        port["port"] = Ext.getCmp('cb_port').getValue();

        // 로그 설정 정리
        var saveLogData = {};
        var saveViewData = {};

        saveLogData.ftp = ftp;
        saveLogData.port = port;
        saveLogData.freeze = freeze;
        saveLogData.search = search;
        saveLogData.hddsave = hddsave;
        saveLogData.log_manage = log_manage;
        saveLogData.network_range = network_range;

        saveViewData.log = saveLogData;

        pv.set('log_setting', saveViewData);

        // 뷰-상태 저장

        me.parentObj.viewState = true;

        return true;

    }

});
