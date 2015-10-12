
Ext.define('SMC4ZEN.view.win_xtm_alg_ftp', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_xtm_alg_ftpViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'win_xtm_alg_ftp'
    },
    height: 550,
    id: 'win_xtm_alg_ftp',
    width: 900,
    bodyPadding: 10,
    title: 'ALG FTP 설정',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_alg_frame',
            overflowY: 'auto',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_alg_top',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 0.7,
                            itemId: 'fds_alg_basic',
                            margin: '0, 10, 10, 0',
                            title: '기본 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue;

                                        retValue = CheckNotNull(value);

                                        if(!retValue){return true; }

                                        retValue = validIPForm(value, 'v4');

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_public',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 325,
                                    fieldLabel: 'Public FTP Server IP',
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue;

                                        retValue = CheckNotNull(value);

                                        if(!retValue){return true; }

                                        retValue = validIPForm(value, 'v4');

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_real',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 325,
                                    fieldLabel: 'Real FTP Server IP',
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_interface',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 325,
                                    fieldLabel: '인터페이스',
                                    labelWidth: 150,
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    valueField: 'eth'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 65535);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_port',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 325,
                                    fieldLabel: '포트 번호',
                                    labelWidth: 150
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 2147483646);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_usercount',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 325,
                                    fieldLabel: '최대 동시 접속자수',
                                    labelWidth: 150
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            itemId: 'fds_alg_option',
                            margin: '0, 0, 10, 0',
                            title: '옵션',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'rdg_runtype',
                                    margin: '0, 0, 10, 0',
                                    width: 400,
                                    fieldLabel: '동작 방식',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_normal',
                                            name: 'runtype',
                                            boxLabel: '일반게이트 방식',
                                            checked: true,
                                            inputValue: 'normal'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_transparent',
                                            name: 'runtype',
                                            boxLabel: '투명게이트 방식',
                                            inputValue: 'transparent'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'rdg_upload',
                                    margin: '0, 0, 10, 0',
                                    width: 400,
                                    fieldLabel: '파일 업로드',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_accept',
                                            name: 'upload',
                                            boxLabel: 'Accept',
                                            checked: true,
                                            inputValue: 'accept'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_deny',
                                            name: 'upload',
                                            boxLabel: 'Deny',
                                            inputValue: 'deny'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'rdg_download',
                                    margin: '0, 0, 10, 0',
                                    width: 400,
                                    fieldLabel: '파일 다운로드',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_accept',
                                            name: 'download',
                                            boxLabel: 'Accept',
                                            checked: true,
                                            inputValue: 'accept'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_deny',
                                            name: 'download',
                                            boxLabel: 'Deny',
                                            inputValue: 'deny'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_alg_filelimit',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_filelimit',
                                            margin: '0, 20, 0, 0',
                                            width: 130,
                                            fieldLabel: '',
                                            boxLabel: '파일 확장자 제한',
                                            listeners: {
                                                change: 'onCk_filelimitChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            disabled: true,
                                            itemId: 'txf_filelimit',
                                            margin: '0, 10, 0, 0',
                                            maxWidth: 150,
                                            fieldLabel: ''
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            text: '"," 로 분리 예) avi, mpg'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_alg_argslimit',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_argslimit',
                                            margin: '0, 20, 0, 0',
                                            width: 130,
                                            fieldLabel: '',
                                            boxLabel: '명령 인자 제한',
                                            listeners: {
                                                change: 'onCk_argslimitChange'
                                            }
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 1,
                                            disabled: true,
                                            itemId: 'txf_argslimit',
                                            margin: '0, 10, 0, 0',
                                            maxWidth: 150,
                                            fieldLabel: ''
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            text: '"," 로 분리 예) movie, music'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 300,
                    itemId: 'fds_alg_user',
                    margin: '0, 0, 10, 0',
                    title: '사용자 허용 / 차단 리스트',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_alg_userlist',
                            margin: '10, 0, 0, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_type',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 300,
                                    fieldLabel: 'Type',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    valueField: 'value',
                                    listeners: {
                                        afterrender: 'onCmb_typeAfterRender'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(this.up().down('[itemId=cmb_type]') !== 'ip'){

                                            var retValue;

                                            retValue = CheckNotNull(value);

                                            if(!retValue){return true; }

                                            retValue = validIPForm(value, 'v4');

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                    },
                                    flex: 1,
                                    itemId: 'txf_ip',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 300,
                                    fieldLabel: 'IP / ID'
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_act',
                                    margin: '0, 0, 10, 0',
                                    maxWidth: 300,
                                    fieldLabel: '행위 설정',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    valueField: 'value',
                                    listeners: {
                                        afterrender: 'onCmb_actAfterRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_alg_control',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    flex: 1,
                                    itemId: 'bt_add',
                                    maxWidth: 100,
                                    text: '추 가',
                                    listeners: {
                                        click: 'onBt_addClick'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_alg_userlist',
                            margin: '0, 0, 10, 0',
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: '@type',
                                    text: 'Type',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: '#text',
                                    text: 'IP / ID',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: '@action',
                                    text: 'Action',
                                    flex: 1
                                },
                                {
                                    xtype: 'actioncolumn',
                                    align: 'center',
                                    dataIndex: 'bool',
                                    flex: 0.3,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var store = Ext.getStore('st_alg_userlist');

                                                store.removeAt(rowIndex);
                                            },
                                            iconCls: 'ico_grid_row_delete'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                itemclick: 'onGpn_alg_userlistItemClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_alg_command',
                    checkboxToggle: true,
                    title: 'COMMAND 제한',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_command_top',
                            margin: '5, 0, 10, 0',
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_abor',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    boxLabel: 'ABOR'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_acct',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    boxLabel: 'ACCT'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_allo',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'ALLO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_appe',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'APPE'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_cdup',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'CDUP'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_cwd',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'CWD'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_dele',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'DELE'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_help',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'HELP'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_list',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'LIST'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_mail',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'MAIL'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_mdtm',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'MDTM'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_mkd',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'MKD'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_command_mid',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_mlfl',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    boxLabel: 'MLFL',
                                    inputValue: 'MLFL'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_mode',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    boxLabel: 'MODE',
                                    inputValue: 'MODE'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_nlst',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'NLST',
                                    inputValue: 'NLST'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_noop',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'NOOP',
                                    inputValue: 'NOOP'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_pass',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'PASS',
                                    inputValue: 'PASS'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_pasv',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'PASV',
                                    inputValue: 'PASV'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_port',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'PORT',
                                    inputValue: 'PORT'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_pwd',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'PWD',
                                    inputValue: 'PWD'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_quit',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'QUIT',
                                    inputValue: 'QUIT'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_rein',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'REIN',
                                    inputValue: 'REIN'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_rest',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'REST',
                                    inputValue: 'REST'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_retr',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'RETR',
                                    inputValue: 'RETR'
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxgroup',
                            itemId: 'ckg_command_bot',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_rmd',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    boxLabel: 'RMD',
                                    inputValue: 'RMD'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_rnfr',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    boxLabel: 'RNFR',
                                    inputValue: 'RNFR'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_rnto',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'RNTO',
                                    inputValue: 'RNTO'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_site',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'SITE',
                                    inputValue: 'SITE'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_size',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'SIZE',
                                    inputValue: 'SIZE'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_smnt',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'SMNT',
                                    inputValue: 'SMNT'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_stat',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'STAT',
                                    inputValue: 'STAT'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_stor',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'STOR',
                                    inputValue: 'STOR'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_stou',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'STOU',
                                    inputValue: 'STOU'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_stru',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'STRU',
                                    inputValue: 'STRU'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_syst',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'SYST',
                                    inputValue: 'SYST'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_type',
                                    margin: '0, 10, 0, 0',
                                    width: 65,
                                    fieldLabel: '',
                                    boxLabel: 'TYPE',
                                    inputValue: 'TYPE'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_user',
                                    fieldLabel: '',
                                    boxLabel: 'USER',
                                    inputValue: 'USER'
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'ctn_alg_control',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_ok',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '확 인',
                    listeners: {
                        click: 'onBt_okClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_cancle',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: 'onBt_cancleClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_xtm_alg_ftpAfterRender',
        beforedestroy: 'onWin_xtm_alg_ftpBeforeDestroy'
    },

    onCk_filelimitChange: function(field, newValue, oldValue, eOpts) {
        // onCk_filelimitChange ==========================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 파일 확장자 제한기능 사용여부를 설정합니다.
        //
        // ===============================================================================================================================================================================

        if(newValue){

            field.up().down('[itemId=txf_filelimit]').setDisabled(false);

        }
        else{

            field.up().down('[itemId=txf_filelimit]').setValue('');

            field.up().down('[itemId=txf_filelimit]').setDisabled(true);

        }
    },

    onCk_argslimitChange: function(field, newValue, oldValue, eOpts) {
        // onCk_argslimitChange ==========================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 명령 인자 제한기능 사용여부를 설정합니다.
        //
        // ===============================================================================================================================================================================

        if(newValue){

            field.up().down('[itemId=txf_argslimit]').setDisabled(false);

        }
        else{

            field.up().down('[itemId=txf_argslimit]').setValue('');

            field.up().down('[itemId=txf_argslimit]').setDisabled(true);

        }
    },

    onCmb_typeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_alg_usertype',
            'fields' : [
                {	'name' : 'name'	},
                {	'name' : 'value'}
            ],
            'data' : [
                {	'name' : 'ID', 'value' : 'id'	},
                {	'name' : 'IP', 'value' : 'ip'	}
            ]
        }));

        component.setValue('id');
    },

    onCmb_actAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {
            'storeId' : 'st_alg_useract',
            'fields' : [
                {	'name' : 'name'		},
                {	'name' : 'value'	}
            ],
            'data' : [
                {	'name' : 'Accept', 'value' : 'accept'	},
                {	'name' : 'Deny', 'value' : 'deny'	}
            ]
        }));

        component.setValue('accept');
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 추가 버튼 클릭시 사용자 허용 / 차단 리스트에 데이터를 등록합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        if(!this.validityCheck().userlistBlank() || !this.validityCheck().userlistIpCheck() || !this.validityCheck().userlistDuplicationCheck(component.userip.getValue())){

            return false;

        }

        var obj = {};

        obj['#text']   = component.userip.getValue();
        obj['@action'] = component.useract.getValue();
        obj['@type']   = component.usertype.getValue();

        gridData_Add(component.user_grid, obj);
    },

    onGpn_alg_userlistItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_alg_userlistItemClick ===================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 사용자 허용 / 차단 리스트 row 데이터를 클릭시 데이터가 입력 컴포넌트에 초기화됩니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.usertype.setValue(record.data['@type']);
        component.userip.setValue(record.data['#text']);
        component.useract.setValue(record.data['@action']);
    },

    onBt_okClick: function(button, e, eOpts) {
        // onBt_okClick ==================================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : OK 버튼을 선택하면 ALG FTP 정보가 그리드 스토어에 적용됩니다.
        //
        // ===============================================================================================================================================================================

        if(!this.saveData()){

            return;

        }

        this.destroy();
    },

    onBt_cancleClick: function(button, e, eOpts) {
        this.destroy();
    },

    onWin_xtm_alg_ftpAfterRender: function(component, eOpts) {
        // onWin_xtm_alg_ftpAfterRender ================================================================================================================================================
        //
        // 일시 : 2014.08.23
        //
        // 설명 : ALG FTP 설정을 컴포넌트에 설정합니다.
        //
        // =============================================================================================================================================================================

        var componentObj = this.componentStorage();

        componentObj.fds_command.checkboxCmp.setValue(false);

        // 스토어 초기화 =================================================================================================================================================================

        this.initStore();

        // 인터페이스 초기화 ==============================================================================================================================================================

        var st_deveth = Ext.getStore('st_common_deveth');
        var st_algeth = Ext.getStore('st_alg_interface');

        for(var i = 0, max = st_deveth.count(); i < max; i++){

            st_algeth.add({

                'eth' : st_deveth.getAt(i).get('eth')

            });

        }

        st_algeth.insert(0, {	'eth' : 'all'	});


        // 컴포넌트 바인딩

        componentObj.eth.bindStore(st_algeth);
        componentObj.eth.setValue('all');

        if(component.ftpParam){

            componentObj.publicip.setValue(component.ftpParam.advertised_ftp_ip);
            componentObj.realip.setValue(component.ftpParam.ftp_ip);
            componentObj.eth.setValue(component.ftpParam['interface']);
            componentObj.port.setValue(component.ftpParam.port);
            componentObj.usercount.setValue(component.ftpParam.max_user);

            if(component.ftpParam.action)
                componentObj.runtype.setValue({	'runtype'  : (component.ftpParam.action === 0) ? 'normal' : 'transparent'	});

            if(component.ftpParam.upload)
                componentObj.upload.setValue({	'upload'   : (component.ftpParam.upload['@chk_deny'] === 'on') ? 'deny' : 'accept'	});

            if(component.ftpParam.download)
                componentObj.download.setValue({	'download' : (component.ftpParam.download['@chk_deny'] === 'on') ? 'deny' : 'accept'	});

            if(component.ftpParam.extension){

                componentObj.usefilelimit.setValue((component.ftpParam.extension['@chk_use'] === 'on') ? true : false);
                componentObj.filelimit.setValue(component.ftpParam.extension['#text']);

            }

            if(component.ftpParam.argument){

                componentObj.userargslimit.setValue((component.ftpParam.argument['@chk_use'] === 'on') ? true : false);
                componentObj.argslimit.setValue(component.ftpParam.argument['#text']);

            }

            componentObj.user_grid.getStore().add(component.ftpParam.user_list.user);
            componentObj.fds_command.checkboxCmp.setValue((component.ftpParam.command['@chk_use'] === 'on') ? true : false);

            var commandArray = component.ftpParam.command['#text'].split(',');

            for(var i = 0; i < commandArray.length; i++){

                for(var j = 0; j < componentObj.commandtop.items.items.length; j++){

                    if(componentObj.commandtop.items.items[j].boxLabel === commandArray[i]){

                        componentObj.commandtop.items.items[j].setValue(true);

                    }

                }

                for(var k = 0; k < componentObj.commandmid.items.items.length; k++){

                    if(componentObj.commandmid.items.items[k].boxLabel === commandArray[i]){

                        componentObj.commandmid.items.items[k].setValue(true);

                    }

                }

                for(var l = 0; l < componentObj.commandbot.items.items.length; l++){

                    if(componentObj.commandbot.items.items[l].boxLabel === commandArray[i]){

                        componentObj.commandbot.items.items[l].setValue(true);

                    }

                }

            }

        }
    },

    onWin_xtm_alg_ftpBeforeDestroy: function(component, eOpts) {

    },

    componentStorage: function() {
        var obj = {};

        var ctn_frame  = this.down('[itemId=ctn_alg_frame]');

        var ctn_top    = ctn_frame.down('[itemId=ctn_alg_top]');

        var fds_basic  = ctn_top.down('[itemId=fds_alg_basic]');
        var fds_option = ctn_top.down('[itemId=fds_alg_option]');

        var fds_user   = ctn_frame.down('[itemId=fds_alg_user]');
        var fds_command = ctn_frame.down('[itemId=fds_alg_command]');

        obj.fds_command = fds_command;

        // Basic 컴포넌트 ==================================================================================================================================================================

        obj.publicip = fds_basic.down('[itemId=txf_public]');
        obj.realip   = fds_basic.down('[itemId=txf_real]');
        obj.eth      = fds_basic.down('[itemId=cmb_interface]');
        obj.port     = fds_basic.down('[itemId=nfd_port]');
        obj.usercount = fds_basic.down('[itemId=nfd_usercount]');

        // 옵션 컴포넌트 ===================================================================================================================================================================

        obj.runtype  = fds_option.down('[itemId=rdg_runtype]');
        obj.upload   = fds_option.down('[itemId=rdg_upload]');
        obj.download = fds_option.down('[itemId=rdg_download]');

        obj.usefilelimit = fds_option.down('[itemId=ctn_alg_filelimit]').down('[itemId=ck_filelimit]');
        obj.filelimit    = fds_option.down('[itemId=ctn_alg_filelimit]').down('[itemId=txf_filelimit]');

        obj.userargslimit = fds_option.down('[itemId=ctn_alg_argslimit]').down('[itemId=ck_argslimit]');
        obj.argslimit     = fds_option.down('[itemId=ctn_alg_argslimit]').down('[itemId=txf_argslimit]');

        // 사용자 허용 / 차단 컴포넌트 =======================================================================================================================================================

        obj.usertype = fds_user.down('[itemId=ctn_alg_userlist]').down('[itemId=cmb_type]');
        obj.userip   = fds_user.down('[itemId=ctn_alg_userlist]').down('[itemId=txf_ip]');
        obj.useract  = fds_user.down('[itemId=ctn_alg_userlist]').down('[itemId=cmb_act]');
        obj.user_grid = fds_user.down('[itemId=gpn_alg_userlist]');

        // 커멘드 제한 컴포넌트 ==============================================================================================================================================================

        obj.commandtop = fds_command.down('[itemId=ckg_command_top]');
        obj.commandmid = fds_command.down('[itemId=ckg_command_mid]');
        obj.commandbot = fds_command.down('[itemId=ckg_command_bot]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : ALG FTP 데이터 설정에 관한 유효성 검사를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(){

                if(component.publicip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Public FTP Server IP 는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.realip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Real FTP Server IP 는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.port.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '포트 번호는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usercount.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '최대 동시접속자 수는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            validateCheck : function(){

                 if(!component.publicip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.realip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.port.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '포트번호의 범위는 1 ~ 65535 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.usercount.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '동시 접속자수의 범위는 0 ~ 2147483646 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            userlistBlank : function(){

                if(component.userip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP / ID는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            userlistIpCheck : function(){

                if(!component.userip.validate() && component.usertype.getValue() === 'ip'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            userlistDuplicationCheck : function(componentValue){

                if(!duplicationItem(componentValue, '#text', 'st_alg_userlist')){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '같은 ID / IP가 이미 등록되었습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ==================================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 해당 saveData 정보는 deviceAllData에 직접 맵핑되지 않고 그리드 스토어에 맵핑됩니다.
        //
        // ===========================================================================================================================================================================

        var algftpStore   = Ext.getStore('st_alg_ftp');
        var userlistStore = Ext.getStore('st_alg_userlist');

        var componentObj = this.componentStorage();

        // ALG FTP 유효성 검사 =========================================================================================================================================================

        if(!this.validityCheck().blankCheck() || !this.validityCheck().validateCheck()){

            return false;

        }

        var obj = {};

        // 기본 정보 저장 ==============================================================================================================================================================

        obj.advertised_ftp_ip = componentObj.publicip.getValue();
        obj.ftp_ip       = componentObj.realip.getValue();
        obj['interface'] = componentObj.eth.getValue();
        obj.port         = componentObj.port.getValue();
        obj.max_user     = componentObj.usercount.getValue();

        // 옵션 저장 ==================================================================================================================================================================

        obj.action = componentObj.runtype.getValue().runtype;

        var uploadObj = {};

        uploadObj['@chk_deny'] = (componentObj.upload.getValue().upload === 'deny') ? 'on' : 'off';

        obj.upload = uploadObj;

        var downloadObj = {};

        downloadObj['@chk_deny'] = (componentObj.download.getValue().download === 'deny') ? 'on' : 'off';

        obj.download = downloadObj;

        var extensionObj = {};

        extensionObj['@chk_use'] = (componentObj.usefilelimit.getValue() === true) ? 'on' : 'off';
        extensionObj['#text'] = componentObj.filelimit.getValue();

        obj.extension = extensionObj;

        var argumentObj = {};

        argumentObj['@chk_use'] = (componentObj.userargslimit.getValue() === true) ? 'on' : 'off';

        if(componentObj.userargslimit.getValue()){

            argumentObj['#text'] = componentObj.argslimit.getValue();

        }

        obj.argument = argumentObj;

        // 사용자 허용 / 차단 리스트 =======================================================================================================================================================

        var user_listObj = {};

        user_listObj['@count'] = userlistStore.count();
        user_listObj.user = function(){

            var userlistArray = [];

            for(var i = 0; i < userlistStore.count(); i++){

                userlistArray.push(userlistStore.getAt(i).data);

            }

            return userlistArray;

        }();

        obj.user_list = user_listObj;

        // 커멘드 제한 ===================================================================================================================================================================

        var commandObj = {};
        var commandString = '';

        for(var i = 0; i < componentObj.commandtop.items.items.length; i++){

            if(componentObj.commandtop.items.items[i].getValue()){

                commandString += componentObj.commandtop.items.items[i].boxLabel + ',';

            }

        }

        for(var i = 0; i < componentObj.commandmid.items.items.length; i++){

            if(componentObj.commandmid.items.items[i].getValue()){

                commandString += componentObj.commandmid.items.items[i].boxLabel + ',';

            }

        }

        for(var i = 0; i < componentObj.commandbot.items.items.length; i++){

            if(componentObj.commandbot.items.items[i].getValue()){

                commandString += componentObj.commandbot.items.items[i].boxLabel + ',';

            }

        }

        commandObj['@chk_use'] = (componentObj.fds_command.checkboxCmp.getValue() === true) ? 'on' : 'off';
        commandObj['#text']    = commandString.substring(0, commandString.length - 1);

        obj.command = commandObj;

        // 모드에 따른 데이터 처리 분기 =====================================================================================================================================================

        if(this.openmode === 'add'){

            obj['@num'] = 0;

            gridData_Add(this.parent, obj);

            reconfigNum(this.parent.getStore());

        }
        else{

            selectionGrid_Mod(this.parent, obj);

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();
        var st_userlist = Ext.getStore('st_alg_userlist');
        var st_algeth = Ext.getStore('st_alg_interface');

        st_userlist.removeAll();
        st_algeth.removeAll();

        component.user_grid.bindStore(st_userlist);
    }

});