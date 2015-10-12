
Ext.define('SMC4ZEN.view.NFW2_system_update', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_update',

    requires: [
        'SMC4ZEN.view.NFW2_system_updateViewModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.Label',
        'Ext.form.field.Time',
        'Ext.toolbar.Toolbar'
    ],

    config: {
        obj_d: {
            data: ''
        }
    },
    viewModel: {
        type: 'nfw2_system_update'
    },
    //cls: 'zen_body',
    id: 'NFW2_system_update',
    overflowY : 'auto',
    bodyPadding : 5,
    defaultListenerScope: true,
    items: [
        {
            xtype: 'form',
            layout: 'auto',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            flex: 1,
                            id: 'form_upload',
                            bodyPadding: 10,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            bind: {
                                title: '{file_update}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            bind: {
                                                text: '{file_add}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var form = this.up('form').getForm();

                                                var _cont = Ext.ComponentQuery.query('filefield[itemId="ff_file"]');

                                                if(_cont.length === 0){

                                                    return false;
                                                }

                                                for(var i in _cont){

                                                    if(_cont[i].value === undefined || _cont[i].value === ''){
                                                        Ext.Msg.alert(__weguardia,ValidSelect('파일',2));
                                                        return false;
                                                    }

                                                    var _file = _cont[i].value.split('.');
                                                    _file = '.'+_file[_file.length-1];

                                                    if(_file !== '.bin' && _file !== '.rd' && _file !== '.img' && _file !== '.do' && _file !== '.app' &&
                                                    _file !== '.md' && _file !== '.HD' && _file !== '.DT' && _file !== '.fir' && _file !== '.avf' &&
                                                    _file !== '.avs' && _file !== '.as'){
                                                        Ext.Msg.alert(__weguardia,get_msg('err_filenameext'));
                                                        return false;
                                                    }
                                                }

                                                var file_list = {};

                                                if(form.isValid()){

                                                    //파일업로드중입니다 메세지창 표시 success
                                                    var win = Ext.create('NFW2.view.NFW2_upgradeWaitMsg');

                                                    win.show();

                                                    //파일 업로드 중에는 서버 상태 체크 해제
                                                    clearInterval(Ext.getCmp('NFW2_client').online_interval);

                                                    form.submit({
                                                        url: '/fileUploadCommon',
                                                        params: {
                                                            filePath: Ext.encode('/ferret/system/upgrade/'),
                                                            delFlag: Ext.encode('true')
                                                        },
                                                        success: function(fp, o) {

                                                            var _data = Ext.decode(o.response.responseText);

                                                            var _file_list = [];

                                                            for(var i in _data.data){

                                                                _file_list[i] = _data.data[i];

                                                            }

                                                            var _params = {

                                                                file_list : Ext.encode(_file_list)
                                                            };

                                                            Ext.data.JsonP.request({

                                                                url : "/api/ftuctrl/upgradeStart",
                                                                params : _params,
                                                                timeout : 120000,
                                                                success : function(response){

                                                                    if(response.retcode === true){

                                                                        win.close();

                                                                        //완료 후 서버 상태 체크 재동작
                                                                        clearInterval(Ext.getCmp('NFW2_client').online_interval);

                                                                        Ext.Msg.alert(__weguardia, __zen('update_msg1'));

                                                                        Ext.getCmp('cont_fileUpload').removeAll();

                                                                    }else{

                                                                        win.close();

                                                                        //완료 후 서버 상태 체크 재동작
                                                                        clearInterval(Ext.getCmp('NFW2_client').online_interval);

                                                                        Ext.Msg.alert(__weguardia, __zen('update_msg2'));

                                                                    }

                                                                },
                                                                failure : function(response){

                                                                    win.close();

                                                                    //완료 후 서버 상태 체크 재동작
                                                                    clearInterval(Ext.getCmp('NFW2_client').online_interval);

                                                                    Ext.Msg.alert(__weguardia, __zen('update_msg2'));

                                                                }

                                                            });
                                                        }
                                                    });
                                                }
                                            },
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 10',
                                            bind: {
                                                text: '{file_upload}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            height: 14,
                                            margin: '5 0 0 10',
                                            style: 'background:url(../images/b_help.png);border:none',
                                            width: 14,
                                            listeners: {
                                                render: 'onButtonRender'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'errorBox',
                                    hidden: true,
                                    id: 'err_name',
                                    margin: 10
                                },
                                {
                                    xtype: 'container',
                                    id: 'cont_fileUpload'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'form',
                            bodyPadding: 10,
                            bind: {
                                title: '{sig_db_update}'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeApp',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_app',
                                                    listeners: {
                                                        change: 'onButtonChange',
                                                        beforerender: 'onBtn_appBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_app_version',
                                                    itemId: 'lab_app_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            href: 'https://125.140.117.82:48926/APP_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick1'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeUrlDB',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_url_db',
                                                    listeners: {
                                                        change: 'onButtonChange1',
                                                        beforerender: 'onBtn_url_dbBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_url_db_version',
                                                    itemId: 'lab_url_db_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'btn_url_db_his',
                                            href: 'https://125.140.117.82:48926/KISCOM_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick2'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeHttpDB',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_http_db',
                                                    listeners: {
                                                        change: 'onButtonChange11',
                                                        beforerender: 'onBtn_http_dbBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_http_db_version',
                                                    itemId: 'lab_http_db_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'btn_http_db_his',
                                            href: 'https://125.140.117.82:48926/HTTP_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick3'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeCodeDB',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_code_db',
                                                    listeners: {
                                                        change: 'onButtonChange111',
                                                        beforerender: 'onBtn_code_dbBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_code_db_version',
                                                    itemId: 'lab_code_db_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'btn_code_db_his',
                                            href: 'https://125.140.117.82:48926/BAD_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick4'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeIPS',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_ips_sig',
                                                    listeners: {
                                                        change: 'onButtonChange1111',
                                                        beforerender: 'onBtn_ips_sigBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_ips_sig_version',
                                                    itemId: 'lab_ips_sig_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'btn_ips_sig_his',
                                            href: 'https://125.140.117.82:48926/IPS_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick5'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeAVStream',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_av_stream',
                                                    listeners: {
                                                        change: 'onButtonChange11111',
                                                        beforerender: 'onBtn_av_streamBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_av_stream_version',
                                                    itemId: 'lab_av_stream_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'btn_av_stream_his',
                                            href: 'https://125.140.117.82:48926/AVS_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick6'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeAVFile',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_av_file',
                                                    listeners: {
                                                        change: 'onButtonChange111111',
                                                        beforerender: 'onBtn_av_fileBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_av_file_version',
                                                    itemId: 'lab_av_file_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'btn_av_file_his',
                                            href: 'https://125.140.117.82:48926/AVF_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick7'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    hidden: true,
                                    id: 'cont_upgradeASSignature',
                                    margin: '5 0 0 0',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'container',
                                            cls: 'css_sized_container',
                                            items: [
                                                {
                                                    xtype: 'toggleslide',
                                                    state: false,
                                                    resizeHandle: false,
                                                    resizeContainer: false,
                                                    id: 'btn_as',
                                                    listeners: {
                                                        change: 'onButtonChange1111111',
                                                        beforerender: 'onBtn_asBeforeRender'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '0 0 0 10',
                                            width: 250,
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    id: 'lab_as_version',
                                                    itemId: 'lab_as_version'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            itemId: 'btn_as_his',
                                            href: 'https://125.140.117.82:48926/AS_his.txt',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{chg_content}'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            componentCls: 'btn_auth',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            listeners: {
                                                click: 'onButtonClick8'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '10 0 0 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var me =Ext.getCmp('NFW2_system_update');

                                                if(value === ""){

                                                    if(!me.down('button[itemId="btn_direct_update"]').disabled)
                                                    {
                                                        me.down('button[itemId="btn_direct_update"]').disable();
                                                    }

                                                }else{

                                                    if(Ext.getCmp("btn_app").getValue() || Ext.getCmp("btn_url_db").getValue() ||
                                                    Ext.getCmp("btn_http_db").getValue() || Ext.getCmp("btn_code_db").getValue() ||
                                                    Ext.getCmp("btn_ips_sig").getValue() || Ext.getCmp("btn_av_stream").getValue() ||
                                                    Ext.getCmp("btn_av_file").getValue()){

                                                        me.down('button[itemId="btn_direct_update"]').enable();
                                                    }
                                                }
                                                if(value === true){ return true; }
                                                if(value.indexOf(".")!== -1){
                                                    var _val = value.split(".");
                                                    var _num = Ext.isNumber(Number(_val[0]));
                                                    if(_num){
                                                        if(!ValidIPAddress(value)){ return get_msg('err_form');}
                                                    }else{
                                                        if(!ValidURL2(value)){ return get_msg('err_form'); }
                                                    }
                                                }else{
                                                    if(!ValidURL2(value) || !ValidIPAddress(value)){ return get_msg('err_form'); }
                                                }
                                                return true;

                                                function ValidURL2(value){
                                                    return (/(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST))\/?)/i).test(value)? true:false;
                                                }
                                            },
                                            flex: 1,
                                            id: 'txf_update_url',
                                            itemId: 'txf_update_url',
                                            maxWidth: 505,
                                            labelSeparator: ' ',
                                            labelWidth: 255,
                                            value: 'https://update3.future.co.kr',
                                            bind: {
                                                fieldLabel: '{url_or_server}',
                                                value : '{mus.ip}'
                                            },
                                            listeners: {
                                                errorchange: 'onTxf_update_urlErrorChange',
                                                blur: 'onTxf_update_urlBlur'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'btn_b',
                                            disabled: true,
                                            id: 'btn_direct_update',
                                            itemId: 'btn_direct_update',
                                            margin: '0 0 0 5',
                                            iconCls: 'icb_export',
                                            bind: {
                                                text: '{immediate_update}'
                                            },
                                            listeners: {
                                                click: 'onBtn_direct_updateClick'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'cont_autoUpgrade',
                                    margin: '10 0 0 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_interval_type',
                                                    width: 400,
                                                    labelSeparator: ' ',
                                                    labelWidth: 255,
                                                    value: 'mon',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'store_weeks',
                                                    valueField: 'value',
                                                    bind: {
                                                        fieldLabel: '{execution_period}',
                                                        value : '{mus.set.interval.type}'
                                                    }
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    id: 'tmf_interval_time',
                                                    itemId: 'tmf_interval_time',
                                                    padding: '0 0 0 10',
                                                    width: 145,
                                                    value: '00',
                                                    editable: false,
                                                    format: 'H:i',
                                                    increment: 60,
                                                    bind : {
                                                        value : '{mus.set.interval.time}'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: 'table',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                                    width: 270,
                                                    bind: {
                                                        text: '{update_info14}'
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    items: [
                                                        {
                                                            xtype: 'toggleslide',
                                                            onText: 'ON',
                                                            offText: 'OFF',
                                                            state: false,
                                                            resizeHandle: false,
                                                            componentCls: 'btn_auth',
                                                            id: 'btn_update_config'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            // 확인, 취소 버튼은 SMC4ZEN에서 더이상 사용하지 않습니다.
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
                                        /*
                                        {
                                            xtype: 'button',
                                            cls: 'ft_confirm',
                                            iconCls: 'ft_confirm_icl',
                                            bind: {
                                                text: '{confirm}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick10'
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            cls: 'ft_cancel',
                                            bind: {
                                                text: '{cancel}'
                                            },
                                            listeners: {
                                                click: 'onButtonClick11'
                                            }
                                        }
                                        */
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onViewportAfterRender'
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _cont = Ext.ComponentQuery.query('filefield[itemId="ff_file"]');
        if(_cont.length >= 10){ return false; }

        //mips일 경우 멀티 업로드 못하도록 구현
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isTarget',
            {},
            function(response){

                if(response==='mip'){

                    if(_cont.length < 1){

                        var cont = {

                            xtype: 'container',
                            //itemId: 'cont_upload',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'filefield',
                                    name: 'uploadFile',
                                    itemId:'ff_file',
                                    msgTarget: 'none',
                                    allowBlank: false,
                                    editable: false,
                                    buttonText : __zen('file_find'),
                                    width: 400,
                                    margin: 10,
                                    validator: function(value) {

                                        if(!fileExtensionChk(value)){ return get_msg('err_extension'); }

                                        return true;
                                    },
                                    listeners: {
                                        errorchange: {
                                            fn: me.onFilefieldErrorChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    //flex: 1,
                                    text: __zen('del'),
                                    code : Ext.ComponentQuery.query('container[itemId="cont_upload"]').length,
                                    margin: 10,
                                    listeners: {
                                        click: {
                                            fn: me.fileuploadDelete,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    hidden: true,
                                    margin: 10
                                }
                            ]

                        };

                        var files = Ext.getCmp('cont_fileUpload');

                        files.add(cont);
                    }

                }else{

                    var cont = {

                        xtype: 'container',
                        //itemId: 'cont_upload',
                        margin: '5 0 0 0',
                        layout: {
                            type: 'table'
                        },
                        items: [
                            {
                                xtype: 'filefield',
                                name: 'uploadFile',
                                itemId:'ff_file',
                                msgTarget: 'none',
                                allowBlank: false,
                                editable: false,
                                buttonText : __zen('file_find'),
                                width: 400,
                                validator: function(value) {

                                    if(!fileExtensionChk(value)){ return get_msg('err_extension'); }

                                    return true;
                                },
                                listeners: {
                                    errorchange: {
                                        fn: me.onFilefieldErrorChange,
                                        scope: me
                                    }
                                }
                            },
                            {
                                xtype: 'button',
                                //flex: 1,
                                cls: 'btn_b',
                                iconCls : 'icb_del',
                                code : Ext.ComponentQuery.query('container[itemId="cont_upload"]').length,
                                margin: '0 0 0 15',
                                listeners: {
                                    click: {
                                        fn: me.fileuploadDelete,
                                        scope: me
                                    }
                                }
                            },
                            {
                                xtype: 'label',
                                hidden: true,
                                margin: '0 0 0 10'
                            }
                        ]

                    };

                    var files = Ext.getCmp('cont_fileUpload');
                    files.add(cont);
                }

            }

        );
    },

    onButtonRender: function(component, eOpts) {
        component.tooltip = Ext.create('Ext.tip.ToolTip', {
            target: component.getEl(),
            autoHide: false,
            anchor:'left',
            cls : 'left_light_box',
            shadow: false,
            border : 0,
            items : [
                {
                    xtype : 'container',
                    width : 300,
                    cls:'tip_box',
                    html : '<div class="title">'+__zen('update_info1')+'</div>'+
                    '<div class="list">'+__zen('update_info2')+' : *.bin</div>'+
                    '<div class="list">'+__zen('update_info3')+' : *.rd</div>'+
                    '<div class="list">'+__zen('update_info4')+' : *.img</div>'+
                    '<div class="list">'+__zen('update_info5')+' : *.do</div>'+
                    '<div class="list">'+__zen('update_info6')+' : *.app</div>'+
                    '<div class="list">'+__zen('update_info7')+' : *.md</div>'+
                    '<div class="list">'+__zen('update_info8')+' : *.HD</div>'+
                    '<div class="list">'+__zen('update_info9')+' : *.DT</div>'+
                    '<div class="list">'+__zen('update_info10')+' : *.fir</div>'+
                    '<div class="list">'+__zen('update_info11')+' : *.avs</div>'+
                    '<div class="list">'+__zen('update_info12')+' : *.avf</div>'+
                    '<div class="list">'+__zen('update_info13')+' : *.as</div>'
                }
            ]
        });
    },

    onButtonChange: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_url_db").getValue() && !Ext.getCmp("btn_http_db").getValue() &&
                   !Ext.getCmp("btn_code_db").getValue() && !Ext.getCmp("btn_ips_sig").getValue() &&
                   !Ext.getCmp("btn_av_stream").getValue() && !Ext.getCmp("btn_av_file").getValue() &&
                   !Ext.getCmp("btn_as").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_appBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info6');
        component.onText = __zen('update_info6');
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['APP','off','off','off','off','off','off','off'];

        me.system_update(c_list);
    },

    onButtonChange1: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_app").getValue() && !Ext.getCmp("btn_http_db").getValue() &&
                   !Ext.getCmp("btn_code_db").getValue() && !Ext.getCmp("btn_ips_sig").getValue() &&
                   !Ext.getCmp("btn_av_stream").getValue() && !Ext.getCmp("btn_av_file").getValue() &&
                   !Ext.getCmp("btn_as").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_url_dbBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info7');
        component.onText = __zen('update_info7');
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['off','KISCOM','off','off','off','off','off','off'];

        me.system_update(c_list);
    },

    onButtonChange11: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_app").getValue() && !Ext.getCmp("btn_url_db").getValue() &&
                   !Ext.getCmp("btn_code_db").getValue() && !Ext.getCmp("btn_ips_sig").getValue() &&
                   !Ext.getCmp("btn_av_stream").getValue() && !Ext.getCmp("btn_av_file").getValue() &&
                   !Ext.getCmp("btn_as").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_http_dbBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info8');
        component.onText = __zen('update_info8');
    },

    onButtonClick3: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['off','off','WEB','off','off','off','off','off'];

        me.system_update(c_list);
    },

    onButtonChange111: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_app").getValue() && !Ext.getCmp("btn_url_db").getValue() &&
                   !Ext.getCmp("btn_http_db").getValue() && !Ext.getCmp("btn_ips_sig").getValue() &&
                   !Ext.getCmp("btn_av_stream").getValue() && !Ext.getCmp("btn_av_file").getValue() &&
                   !Ext.getCmp("btn_as").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_code_dbBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info9');
        component.onText = __zen('update_info9');
    },

    onButtonClick4: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['off','off','off','MDL','off','off','off','off'];

        me.system_update(c_list);
    },

    onButtonChange1111: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_app").getValue() && !Ext.getCmp("btn_url_db").getValue() &&
                   !Ext.getCmp("btn_http_db").getValue() && !Ext.getCmp("btn_code_db").getValue() &&
                   !Ext.getCmp("btn_av_stream").getValue() && !Ext.getCmp("btn_av_file").getValue() &&
                   !Ext.getCmp("btn_as").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_ips_sigBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info10');
        component.onText = __zen('update_info10');
    },

    onButtonClick5: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['off','off','off','off','IPS','off','off','off'];

        me.system_update(c_list);
    },

    onButtonChange11111: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_app").getValue() && !Ext.getCmp("btn_url_db").getValue() &&
                   !Ext.getCmp("btn_http_db").getValue() && !Ext.getCmp("btn_code_db").getValue() &&
                   !Ext.getCmp("btn_ips_sig").getValue() && !Ext.getCmp("btn_av_file").getValue() &&
                   !Ext.getCmp("btn_as").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_av_streamBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info11');
        component.onText = __zen('update_info11');
    },

    onButtonClick6: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['off','off','off','off','off','AVS','off','off'];

        me.system_update(c_list);
    },

    onButtonChange111111: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_app").getValue() && !Ext.getCmp("btn_url_db").getValue() &&
                   !Ext.getCmp("btn_http_db").getValue() && !Ext.getCmp("btn_code_db").getValue() &&
                   !Ext.getCmp("btn_ips_sig").getValue() && !Ext.getCmp("btn_av_stream").getValue() &&
                   !Ext.getCmp("btn_as").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_av_fileBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info12');
        component.onText = __zen('update_info12');
    },

    onButtonClick7: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['off','off','off','off','off','off','AVF','off'];

        me.system_update(c_list);
    },

    onButtonChange1111111: function(button, state) {
        var _state = get_zenauth();
        if(_state === true){
            this.down('button[itemId="btn_direct_update"]').disable();
        }else{

            if(state === true){

                if(this.down('button[itemId="btn_direct_update"]').isDisabled() && this.down('textfield[itemId="txf_update_url"]').getValue()){
                    this.down('button[itemId="btn_direct_update"]').enable();
                }

            }else{

                if(!Ext.getCmp("btn_app").getValue() && !Ext.getCmp("btn_url_db").getValue() &&
                   !Ext.getCmp("btn_http_db").getValue() && !Ext.getCmp("btn_code_db").getValue() &&
                   !Ext.getCmp("btn_ips_sig").getValue() && !Ext.getCmp("btn_av_stream").getValue() &&
                   !Ext.getCmp("btn_av_file").getValue()){

                    if(!this.down('button[itemId="btn_direct_update"]').isDisabled()){
                        this.down('button[itemId="btn_direct_update"]').disable();
                    }
                }

            }
        }
    },

    onBtn_asBeforeRender: function(component, eOpts) {
        component.offText = __zen('update_info13');
        component.onText = __zen('update_info13');
    },

    onButtonClick8: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var c_list = ['off','off','off','off','off','off','off','AS'];

        me.system_update(c_list);
    },

    onTxf_update_urlErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error,null);
    },

    onTxf_update_urlBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onBtn_direct_updateClick: function(button, e, eOpts) {
        var me = Ext.getCmp("NFW2_system_update");

        var category = [];
        var list = ['app','url_db','http_db','code_db','ips_sig','av_stream','av_file','as'];
        var c_list = ['APP','KISCOM','WEB','MDL','IPS','AVS','AVF','AS'];

        for(var i=0; i<list.length; i++){
            var val = (Ext.getCmp('btn_'+list[i]).getValue())?c_list[i]:'off';
            category.push(val);
        }

        me.system_update(category);
    },

    onButtonClick10: function(button, e, eOpts) {
        var me = this;

        if(me.obj_d.data)
        {
            me.obj_d.data.mus.ip = me.down('textfield[itemId="txf_update_url"]').getValue();

            if(Ext.getCmp("btn_update_config").getValue())
                 me.obj_d.data.mus.set.update_config = "on";
            else
                 me.obj_d.data.mus.set.update_config = "off";

            me.obj_d.data.mus.set.interval.type = Ext.getCmp("cmb_interval_type").getValue();

            var time = me.down('timefield[itemId="tmf_interval_time"]').getSubmitValue();

            var _time = time.split(':');

            me.obj_d.data.mus.set.interval.time = _time[0];

            if(Ext.getCmp('btn_app').getValue())
                 me.obj_d.data.mus.type.chk_app = "on";
            else
                 me.obj_d.data.mus.type.chk_app = "off";

            if(Ext.getCmp('btn_url_db').getValue())
                 me.obj_d.data.mus.type.chk_url_db = "on";
            else
                 me.obj_d.data.mus.type.chk_url_db = "off";

            if(Ext.getCmp('btn_http_db').getValue())
                 me.obj_d.data.mus.type.chk_http_db = "on";
            else
                 me.obj_d.data.mus.type.chk_http_db = "off";

            if(Ext.getCmp('btn_code_db').getValue())
                 me.obj_d.data.mus.type.chk_code_db = "on";
            else
                 me.obj_d.data.mus.type.chk_code_db = "off";

            if(Ext.getCmp('btn_ips_sig').getValue())
                 me.obj_d.data.mus.type.chk_ips_sig = "on";
            else
                 me.obj_d.data.mus.type.chk_ips_sig = "off";

            if(Ext.getCmp('btn_av_stream').getValue())
                 me.obj_d.data.mus.type.chk_av_stream = "on";
            else
                 me.obj_d.data.mus.type.chk_av_stream = "off";

            if(Ext.getCmp('btn_av_file').getValue())
                 me.obj_d.data.mus.type.chk_av_file = "on";
            else
                 me.obj_d.data.mus.type.chk_av_file = "off";

            if(Ext.getCmp('btn_as').getValue())
                 me.obj_d.data.mus.type.chk_as = "on";
            else
                 me.obj_d.data.mus.type.chk_as = "off";

            me.setObject();
        }
    },

    onButtonClick11: function(button, e, eOpts) {

    },

    onViewportAfterRender: function(component, eOpts) {
        component.getObject();
    },

    fileuploadDelete: function(button, e, eOpts) {
        Ext.getCmp('cont_fileUpload').remove(Ext.getCmp(button.findParentByType('container').id),true);
    },

    onFilefieldErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    version_info: function() {
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'get_version_info',
            {},
            function(response_info){

                if(response_info)
                {
                    var app_count = (response_info.APP[1]!=="")?' ('+commify(response_info.APP[1])+')':'';
                    var kiscom_count = (response_info.KISCOM[1]!=="")?' ('+commify(response_info.KISCOM[1])+')':'';
                    var http_count = (response_info.HTTP[1]!=="")?' ('+commify(response_info.HTTP[1])+')':'';
                    var bad_count = (response_info.BAD[1]!=="")?' ('+commify(response_info.BAD[1])+')':'';
                    var ips_count = (response_info.IPS[1]!=="")?' ('+commify(response_info.IPS[1])+')':'';
                    var av_file_count = (response_info.AV_STREAM[1]!=="")?' ('+commify(response_info.AV_STREAM[1])+')':'';
                    var as_file_count = (response_info.AV_FILE[1]!=="")?' ('+commify(response_info.AV_FILE[1])+')':'';
                    var as_count = (response_info.AS[1]!=="")?' ('+commify(response_info.AS[1])+')':'';
                    Ext.getCmp("lab_app_version").setText(response_info.APP[0]+app_count);
                    Ext.getCmp("lab_url_db_version").setText(response_info.KISCOM[0]+kiscom_count);
                    Ext.getCmp("lab_http_db_version").setText(response_info.HTTP[0]+http_count);
                    Ext.getCmp("lab_code_db_version").setText(response_info.BAD[0]+bad_count);
                    Ext.getCmp("lab_ips_sig_version").setText(response_info.IPS[0]+ips_count);
                    Ext.getCmp("lab_av_stream_version").setText(response_info.AV_STREAM[0]+av_file_count);
                    Ext.getCmp("lab_av_file_version").setText(response_info.AV_FILE[0]+as_file_count);
                    Ext.getCmp("lab_as_version").setText(response_info.AS[0]+as_count);
                }
            }
        );
    },

    getObject: function() {
        var me = this;
        var vm = me.getViewModel();
        var mus = vm.getData().mus;

        // var _params = {
        //     basename : Ext.encode('upgrade_mus')
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'getObject',
        //     _params,
        //     function(response){

                
                // hideLoadMask();

        if(mus){

            // me.obj_d.data = response;

            Ext.getCmp("txf_update_url").setValue(mus.ip);

            if(mus.set.update_config === "on"){
                Ext.getCmp("btn_update_config").state = true;
                Ext.getCmp("btn_update_config").moveHandle(true);
            }else{
                Ext.getCmp("btn_update_config").state = false;
                Ext.getCmp("btn_update_config").moveHandle(false);
            }

            Ext.each(Ext.getCmp("cmb_interval_type").getStore().get('items'), function(data, idx){

                if(data.get('value') === mus.set.interval.type){

                    Ext.getCmp("cmb_interval_type").select(data);

                    return false;

                }

            });
        
            var stat = 0;
        
            Ext.getCmp("tmf_interval_time").setValue(mus.set.interval.time+":00");

            if(response.mus.type.chk_app === "on"){
                
                Ext.getCmp("btn_app").state = true;

                Ext.getCmp("btn_app").moveHandle(true);

                stat++;

            }
            else{
            
                Ext.getCmp("btn_app").state = false;
                Ext.getCmp("btn_app").moveHandle(false);

            }

            if(mus.type.chk_url_db === "on"){
                
                Ext.getCmp("btn_url_db").state = true;
                Ext.getCmp("btn_url_db").moveHandle(true);
                stat++;

            }
            else{

                Ext.getCmp("btn_url_db").state = false;
                Ext.getCmp("btn_url_db").moveHandle(false);

            }

            if(mus.type.chk_http_db === "on"){

                Ext.getCmp("btn_http_db").state = true;
                Ext.getCmp("btn_http_db").moveHandle(true);
                stat++;

            }
            else{
                        
                Ext.getCmp("btn_http_db").state = false;
                Ext.getCmp("btn_http_db").moveHandle(false);

            }

            if(mus.type.chk_code_db === "on"){
                        
                Ext.getCmp("btn_code_db").state = true;
                Ext.getCmp("btn_code_db").moveHandle(true);
                stat++;

            }
            else{
                        
                Ext.getCmp("btn_code_db").state = false;
                Ext.getCmp("btn_code_db").moveHandle(false);

            }

            if(mus.type.chk_ips_sig === "on"){
            
                Ext.getCmp("btn_ips_sig").state = true;
                Ext.getCmp("btn_ips_sig").moveHandle(true);
                stat++;
            
            }
            else{
        
                Ext.getCmp("btn_ips_sig").state = false;
                Ext.getCmp("btn_ips_sig").moveHandle(false);

            }

            if(mus.type.chk_av_stream === "on"){
            
                Ext.getCmp("btn_av_stream").state = true;
                Ext.getCmp("btn_av_stream").moveHandle(true);
                stat++;

            }
            else{
                
                Ext.getCmp("btn_av_stream").state = false;
                Ext.getCmp("btn_av_stream").moveHandle(false);
                    
            }

            if(mus.type.chk_av_file === "on"){

                Ext.getCmp("btn_av_file").state = true;
                Ext.getCmp("btn_av_file").moveHandle(true);
                stat++;
                    
            }
            else{

                Ext.getCmp("btn_av_file").state = false;
                Ext.getCmp("btn_av_file").moveHandle(false);

            }

            if(mus.type.chk_as === "on"){

                Ext.getCmp("btn_as").state = true;
                Ext.getCmp("btn_as").moveHandle(true);
                stat++;

            }
            else{
                        
                Ext.getCmp("btn_as").state = false;
                Ext.getCmp("btn_as").moveHandle(false);

            }

            if(stat > 0){

                Ext.getCmp("btn_direct_update").enable();

            }

            // me.version_info();

        }

            // });

        //라이선스에 따라 화면에 노출 여부 결정
        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_license_info',
        //     {},
        //     function(response){

        //         //상태가 정식 || 만료 일 경우에만 화면에 표시
        //         if(response.flag === '1' || response.flag === '4'){

        //             if(response.module.fw !== null && response.module.fw === 'on'){

        //                 Ext.getCmp('cont_upgradeApp').show();
        //                 Ext.getCmp('cont_upgradeUrlDB').show();
        //                 Ext.getCmp('cont_upgradeHttpDB').show();
        //                 Ext.getCmp('cont_upgradeCodeDB').show();
        //             }

        //             if(response.module.ips !== null && response.module.ips === 'on'){
        //                 Ext.getCmp('cont_upgradeIPS').show();
        //             }

        //             if(response.module.as !== null && response.module.as === 'on'){
        //                 Ext.getCmp('cont_upgradeASSignature').show();
        //             }

        //             if(response.module.av !== null && response.module.av === 'on'){
        //                 Ext.getCmp('cont_upgradeAVStream').show();
        //                 Ext.getCmp('cont_upgradeAVFile').show();
        //             }
        //         }
        //     }
        // );
    },

    system_update: function(category) {
        var me = Ext.getCmp("NFW2_system_update");
        var _ip = '';

        var _params = {
            basename : Ext.encode('upgrade_mus')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){
                _ip = response.mus.ip;

                Ext.Msg.show({
                    title: __weguardia,
                    msg: __zen('server')+' : '+_ip+'<br>'+get_msg('conf_update'),
                    width: 300,
                    buttons: Ext.Msg.YESNO,
                    buttonText:{
                        yes: __zen('confirm'),
                        no: __zen('cancel')
                    },
                    fn: sys_update,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );

        function sys_update(btn){
            if(btn==="yes"){

                me.mask('Loading...');
                var _params = {
                    func_name: Ext.encode('get_signature_from_server'),
                    args: Ext.encode(category)
                };

                request_helper.xmlrpc_call_JsonP(
                    'ftuctrl',
                    'execKctrlFunc',
                    _params,
                    function(response){
                        me.unmask();

                        me.version_info();
                        var win = Ext.create('NFW2.view.win_update_result',{
                            _result : response,
                            _ip: _ip
                        });
                        win.show();
                    }
                );
            }
        }
    },

    setObject: function() {
        var me = this;

        var _params = {
            basename : Ext.encode('upgrade_mus'),
            obj : Ext.encode(me.obj_d.data)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                Ext.Msg.alert(__weguardia, get_msg('msg_ok_add'));

                me.getObject();

            }
        );
    }

});