
Ext.define('SMC4ZEN.view.NFW2_system_certificate', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_certificate',

    requires: [
        'SMC4ZEN.view.NFW2_system_certificateViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_system_certificate'
    },
    //cls: 'zen_body',
    id: 'NFW2_system_certificate',
    overflowY : 'auto',
    defaultListenerScope: true,
    title : '인증서',
    listeners: {
        afterrender: 'onNFW2_system_certificateAfterRender'
    },
    // 확인 취소 버튼은 SMC4ZEN에서 사용하지 않습니다.
    /*
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
                    handler: function(button, e) {
                        var me = Ext.getCmp('NFW2_system_certificate');
                        var cert_form = Ext.getCmp('cert_form').getForm();
                        var cer_form = Ext.getCmp('cer_form').getForm();

                        if(Ext.getCmp('certificate_up_cert').getValue() === ''){ return false; }
                        if(Ext.getCmp('certificate_radio2').getValue()){
                            if(Ext.getCmp('certificate_up_cer').getValue() === ''){ return false; }
                            if(Ext.getCmp('cer_pass').getValue() === ''){ return false; }
                        }

                        var path;

                        if(Ext.getCmp('certificate_radio1').getValue()){ path = "/ferret/system/cert/cacerts/"; }
                        else{ path = "/ferret/system/cert/certs/"; }

                        showLoadMask();
                        if(cert_form.isValid()){
                            cert_form.submit({
                                url: '/fileUploadCommon',
                                params: {
                                    filePath: Ext.encode(path),
                                    delFlag: Ext.encode('true')
                                },
                                success: function(fp, o) {
                                    hideLoadMask();

                                    var _data = JSON.parse(o.response.responseText);

                                    if(Ext.getCmp('certificate_radio1').getValue()){
                                        var _params = {
                                            func_name : Ext.encode('make_trust_cert_file'),
                                            args : Ext.encode({'certfile':_data.data[0]})
                                        };

                                        request_helper.xmlrpc_call_JsonP(

                                        'ftuctrl',
                                        'execKctrlFunc',
                                        _params,

                                        function(response){

                                            var obj = {};

                                            //                         obj.name = response.type;
                                            obj.subject = response.subject;
                                            obj.issuer = response.issuer;
                                            obj.expire_date = response.expire_date;
                                            obj.cert_name = response.cert_name;
                                            obj.key_name = response.key_name;
                                            obj.type = response.type;

                                            var _params1 = {
                                                basename : Ext.encode('system_certs'),
                                                obj : Ext.encode(obj),
                                                //                             id_info : Ext.encode({'fieldname':'@cid'}),
                                                //                             num_info : Ext.encode({'fieldname':'@num'}),
                                                update : Ext.encode(false)
                                            };

                                            request_helper.xmlrpc_call_JsonP(
                                            'ftuctrl',
                                            'setListTypeObj',
                                            _params1,

                                            function(response){
                                                me.get_certificate();
                                                Ext.Msg.show({
                                                    title: __weguardia,
                                                    msg: get_msg("msg_ok_add"),
                                                    width: 300,
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.window.MessageBox.INFO
                                                });
                                            }
                                            );
                                        }
                                        );
                                    }
                                    else{
                                        if(Ext.getCmp('certificate_radio2').getValue()){
                                            if(cer_form.isValid()){
                                                cer_form.submit({
                                                    url: '/fileUploadCommon',
                                                    params: {
                                                        filePath: Ext.encode('/ferret/system/cert/private/'),
                                                        delFlag: Ext.encode('false')
                                                    },
                                                    success: function(fp, o) {
                                                        hideLoadMask();

                                                        var _datas = JSON.parse(o.response.responseText);

                                                        var _params = {
                                                            func_name : Ext.encode('make_cert_file'),
                                                            args : Ext.encode({'certfile':_data.data[0], 'keyfile':_datas.data[0], 'password':Ext.getCmp('cer_pass').getValue()})
                                                        };

                                                        request_helper.xmlrpc_call_JsonP(

                                                        'ftuctrl',
                                                        'execKctrlFunc',
                                                        _params,

                                                        function(response){

                                                            var obj = {};

                                                            //                                         obj.name = response.type;
                                                            obj.subject = response.subject;
                                                            obj.issuer = response.issuer;
                                                            obj.expire_date = response.expire_date;
                                                            obj.cert_name = response.cert_name;
                                                            obj.key_name = response.key_name;
                                                            obj.type = response.type;
                                                            obj.password = Ext.getCmp('cer_pass').getValue();

                                                            var _params2 = {
                                                                basename : Ext.encode('system_certs'),
                                                                obj : Ext.encode(obj),
                                                                //                                             id_info : Ext.encode({'fieldname':'@cid'}),
                                                                //                                             num_info : Ext.encode({'fieldname':'@num'}),
                                                                update : Ext.encode(false)
                                                            };

                                                            request_helper.xmlrpc_call_JsonP(
                                                            'ftuctrl',
                                                            'setListTypeObj',
                                                            _params2,

                                                            function(response){
                                                                Ext.getCmp('cer_pass').reset();
                                                                me.get_certificate();
                                                                Ext.Msg.show({
                                                                    title: __weguardia,
                                                                    msg: get_msg("msg_ok_add"),
                                                                    width: 300,
                                                                    buttons: Ext.Msg.OK,
                                                                    icon: Ext.window.MessageBox.INFO
                                                                });
                                                            }
                                                            );
                                                        }
                                                        );

                                                        Ext.getCmp('certificate_up_cert').fileInputEl.set({
                                                            accept:'.der,.pem,.key'
                                                        });

                                                        Ext.getCmp('certificate_up_cer').fileInputEl.set({
                                                            accept:'.der,.pem,.key'
                                                        });

                                                    },
                                                    failure : function(fb, o) {
                                                        Ext.Msg.alert(__weguardia, get_msg('msg_file_fail'));
                                                    }
                                                });
                                            }
                                        }
                                    }

                                    Ext.getCmp('certificate_up_cert').fileInputEl.set({
                                        accept:'.der,.pem,.key'
                                    });

                                    Ext.getCmp('certificate_up_cer').fileInputEl.set({
                                        accept:'.der,.pem,.key'
                                    });
                                },
                                failure : function(fb, o) {
                                    Ext.Msg.alert('WeGuardia™ ZEN', get_msg('msg_file_fail'));
                                }
                            });
                        }
                    },
                    cls: 'ft_confirm',
                    id: 'certificate_add_btn',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onCertificate_add_btnClick',
                        blur: 'onCertificate_add_btnBlur'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'certificate_can_btn',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onCertificate_can_btnClick'
                    }
                }
            ]
        }
    ],
    */

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
                                xtype: 'container',
                                items: [
                                    {
                                        xtype: 'container',
                                        width: 400,
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'radiofield',
                                                id: 'certificate_radio1',
                                                checked: true,
                                                listeners: {
                                                    change: 'onRadiofieldChange'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '3 0 0 5',
                                                width: 200,
                                                bind: {
                                                    text: '{root_cert}'
                                                }
                                            },
                                            {
                                                xtype: 'radiofield',
                                                id: 'certificate_radio2',
                                                listeners: {
                                                    change: 'onRadiofieldChange1'
                                                }
                                            },
                                            {
                                                xtype: 'label',
                                                margin: '3 0 0 5',
                                                bind: {
                                                    text: '{certificate}'
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'form',
                                id: 'cert_form',
                                header: false,
                                items: [
                                    {
                                        xtype: 'container',
                                        id: 'cert_up_con',
                                        margin: '8 0 0 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            {
                                                xtype: 'filefield',
                                                id: 'certificate_up_cert',
                                                width: 400,
                                                msgTarget: 'none',
                                                name: 'uploadFile',
                                                buttonMargin: 5,
                                                buttonText: '인증서 추가',
                                                listeners: {
                                                    change: 'onCertificate_up_certChange',
                                                    afterrender: 'onCertificate_up_certAfterRender1'
                                                },
                                                buttonConfig: {
                                                    xtype: 'filebutton',
                                                    cls: 'btn_b',
                                                    bind: {
                                                        text: '{add_cert}'
                                                    }
                                                }
                                            },
                                            {
                                                xtype: 'container',
                                                flex: 1,
                                                id: 'certificate_error_con',
                                                items: [
                                                    {
                                                        xtype: 'label',
                                                        cls: 'errorBox',
                                                        hidden: true,
                                                        id: 'certificate_error',
                                                        margin: '4 0 0 5'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                id: 'key_up_con',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'form',
                                        flex: 1,
                                        id: 'cer_form',
                                        header: false,
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
                                                        xtype: 'filefield',
                                                        id: 'certificate_up_cer',
                                                        width: 383,
                                                        msgTarget: 'none',
                                                        name: 'uploadFile',
                                                        buttonMargin: 5,
                                                        buttonText: 'Key 추가',
                                                        listeners: {
                                                            change: 'onFilefieldChange1',
                                                            afterrender: 'onCertificate_up_certAfterRender'
                                                        },
                                                        buttonConfig: {
                                                            xtype: 'filebutton',
                                                            cls: 'btn_b',
                                                            bind: {
                                                                text: '{add_key}'
                                                            }
                                                        }
                                                    },
                                                    {
                                                        xtype: 'container',
                                                        flex: 1,
                                                        id: 'key_error_con',
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                cls: 'errorBox',
                                                                hidden: true,
                                                                id: 'key_error',
                                                                margin: '4 0 0 5'
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
                                hidden: true,
                                id: 'cer_pass_con',
                                margin: '8 0 0 10',
                                items: [
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            if(value !== true){
                                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            }
                                            return true;
                                        },
                                        cls: 'lb_req',
                                        id: 'cer_pass',
                                        width: 300,
                                        labelSeparator: ' ',
                                        labelWidth: 130,
                                        inputType: 'password',
                                        bind: {
                                            fieldLabel: '{private_pass}'
                                        },
                                        listeners: {
                                            errorchange: 'onCer_passErrorChange',
                                            blur: 'onCer_passBlur'
                                        }
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
                                        componentCls: 'btn_auth',
                                        iconCls: 'icb_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                hidden: true,
                                id: 'cert_con',
                                margin: '8 0 0 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        cls: 'in_grid',
                                        id: 'certificate_grid',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_system_certificate_list',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                width: 60,
                                                align: 'center',
                                                bind: {
                                                    text: '{number}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'subject',
                                                flex: 0.4,
                                                bind: {
                                                    text: '{issue_target}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'issuer',
                                                flex: 0.4,
                                                bind: {
                                                    text: '{issuer}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'expire_date',
                                                flex: 0.3,
                                                bind: {
                                                    text: '{expire_date}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        })
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                id: 'cacert_con',
                                margin: '8 0 0 0',
                                items: [
                                    {
                                        xtype: 'gridpanel',
                                        cls: 'in_grid',
                                        id: 'cacertificate_grid',
                                        header: false,
                                        title: 'My Grid Panel',
                                        columnLines: true,
                                        store: 'store_system_cacertificate_list',
                                        columns: [
                                            {
                                                xtype: 'rownumberer',
                                                width: 60,
                                                align: 'center',
                                                bind: {
                                                    text: '{number}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'subject',
                                                flex: 0.4,
                                                bind: {
                                                    text: '{issue_target}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'issuer',
                                                flex: 0.4,
                                                bind: {
                                                    text: '{issuer}'
                                                }
                                            },
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'expire_date',
                                                flex: 0.3,
                                                bind: {
                                                    text: '{expire_date}'
                                                }
                                            }
                                        ],
                                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                                            selType: 'checkboxmodel'
                                        })
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

    onRadiofieldChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('certificate_radio2').setValue(false);
            Ext.getCmp('key_up_con').hide();
            Ext.getCmp('cacert_con').show();
            Ext.getCmp('cert_con').hide();
            Ext.getCmp('cer_pass_con').hide();
            Ext.getCmp('cer_pass').reset();
            Ext.getCmp('certificate_up_cert').reset();
            Ext.getCmp('certificate_up_cert').fileInputEl.set({
                accept:'.der,.pem,.key'
            });

            Ext.getCmp('certificate_up_cer').fileInputEl.set({
                accept:'.der,.pem,.key'
            });
        }
    },

    onRadiofieldChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            Ext.getCmp('certificate_radio1').setValue(false);
            Ext.getCmp('key_up_con').show();
            Ext.getCmp('cert_con').show();
            Ext.getCmp('cacert_con').hide();
            Ext.getCmp('cer_pass_con').show();
            Ext.getCmp('certificate_up_cert').reset();
            Ext.getCmp('certificate_up_cer').reset();
            Ext.getCmp('cer_pass').reset();
            Ext.getCmp('certificate_up_cert').fileInputEl.set({
                accept:'.der,.pem,.key'
            });

            Ext.getCmp('certificate_up_cer').fileInputEl.set({
                accept:'.der,.pem,.key'
            });
        }
    },

    onCertificate_up_certChange: function(filefield, value, eOpts) {
        var temp = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

        // Ext.getCmp('certificate_error_con').hide();
        // Ext.getCmp('key_error_con').hide();

        if(value !== ""){
        if(temp !== "der" && temp !== "pem"){
            Ext.getCmp('certificate_up_cert').reset();
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('err_filenameext'),
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

            filefield.fileInputEl.set({
                accept:'.der,.pem,.key'
            });
        }
        }

    },

    onCertificate_up_certAfterRender1: function(component, eOpts) {
        component.fileInputEl.set({
            accept:'.der,.pem,.key'
        });
    },

    onFilefieldChange1: function(filefield, value, eOpts) {
        var temp = value.substring(value.lastIndexOf('.') + 1).toLowerCase();

        // Ext.getCmp('certificate_error_con').hide();
        // Ext.getCmp('key_error_con').hide();
        if(value !== ""){
        if(temp !== "key" && temp !== "pem" && temp !== "der"){
            Ext.getCmp('certificate_up_cer').reset();
            Ext.Msg.show({
                title: __weguardia,
                width: 300,
                msg: get_msg('err_filenameext'),
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

            filefield.fileInputEl.set({
                accept:'.der,.pem,.key'
            });
        }
        }
        // Ext.getCmp('certificate_up_cer').validateValue(true);
    },

    onCertificate_up_certAfterRender: function(component, eOpts) {
        component.fileInputEl.set({
            accept:'.der,.pem,.key'
        });
    },

    onCer_passErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onCer_passBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        /*
        var me = Ext.getCmp('NFW2_system_certificate');
        var type;
        if(Ext.getCmp('cert_con').hidden === true){
            var tbl = Ext.getCmp("cacertificate_grid");
        }
        else{
            var tbl = Ext.getCmp("certificate_grid");
        }

        var tbl_sel = tbl.getSelectionModel().getSelection();
        var del = new Array();

        if(tbl_sel.length === 0){
            Ext.Msg.alert("", get_msg("sel_del"));
            return false;
        }
        else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){
                    var use_cert = [];
                    for(var i in tbl_sel){
                        var _params = {
                            func_name : Ext.encode('delete_certfile'),
                            args : Ext.encode({'ca_type': tbl_sel[i].data.type, 'certfile': tbl_sel[i].data.cert_name, 'keyfile': tbl_sel[i].data.key_name})
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'execKctrlFunc',
                            _params,

                            function(response){

                            }
                        );
                        if(tbl_sel[i].data.cnt > 0){
                            use_cert.push(tbl_sel[i].data.cert_name);
                        }

                        del.push(tbl_sel[i].data.id);
                    }
                    var in_use = use_cert.join(" </br> ");
                    if(use_cert.length > 0){ Ext.Msg.alert("",get_msg('err_objdel')+in_use); return false; }

                    var _params2 = {
                        basename : Ext.encode('system_certs'),
                        ids : Ext.encode(del)
                    };

                    request_helper.xmlrpc_call_JsonP(

                        'ftuctrl',
                        'delListTypeObj',
                        _params2,

                        function(response){
                            me.get_certificate();
                            Ext.Msg.show({
                                title: __weguardia,
                                msg: get_msg("msg_ok_del"),
                                width: 300,
                                buttons: Ext.Msg.OK,
                                icon: Ext.window.MessageBox.INFO
                            });
                        }
                    );
                }
            });
        }
        */
    },

    onNFW2_system_certificateAfterRender: function(component, eOpts) {
        var me = this;
        //me.get_certificate();
    },

    onCertificate_add_btnClick: function(button, e, eOpts) {
        if(Ext.getCmp('certificate_up_cert').getValue() === ""){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(get_msg('err_null'));
            Ext.get('certificate_up_cert-inputEl').setStyle('border-color','red');
            return false;
        }
        if(Ext.getCmp('certificate_radio2').getValue()){
            if(Ext.getCmp('certificate_up_cer').getValue() === ""){
                var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                err_fl.addCls('ic_msg_err');
                err_fl.update(get_msg('err_null'));
                Ext.get('certificate_up_cer-inputEl').setStyle('border-color','red');
                return false;
            }
        }
    },

    onCertificate_add_btnBlur: function(component, event, eOpts) {
        var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

        err_fl.removeCls('ic_msg_err');
        err_fl.update('');

        Ext.get('certificate_up_cert-inputEl').setStyle('border-color','');
        Ext.get('certificate_up_cer-inputEl').setStyle('border-color','');
    },

    onCertificate_can_btnClick: function(button, e, eOpts) {
        Ext.getCmp('certificate_up_cer').reset();
        Ext.getCmp('certificate_up_cert').reset();
        Ext.getCmp('cer_pass').reset();
        Ext.getCmp('certificate_radio1').setValue(true);
        Ext.getCmp('certificate_radio2').setValue(false);

        Ext.getCmp('certificate_up_cert').fileInputEl.set({
            accept:'.der,.pem,.key'
        });

        Ext.getCmp('certificate_up_cer').fileInputEl.set({
            accept:'.der,.pem,.key'
        });
    },

    get_certificate: function() {
        var me = this;
        var _params = {
            basename : Ext.encode('system_certs')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObjects',
            _params,

            function(response){
                hideLoadMask();
                setTimeout(function(){ me.setWidth('100%'); },100);
                var record = [];
                var ca_record = [];

                if(response !== null){
                    for(var i in response.list){
                        if(response.list[i].type === "cert"){
                            record.push({
                                'subject' : response.list[i].subject,
                                'issuer' : response.list[i].issuer,
                                'expire_date' : response.list[i].expire_date,
                                'cert_name' : response.list[i].cert_name,
                                'key_name' : response.list[i].key_name,
                                'type' : response.list[i].type,
                                'id' : response.list[i]._id,
                                'cnt' : response.list[i]._ref_cnt
                            });
                        }
                        else{
                            ca_record.push({
                                'subject' : response.list[i].subject,
                                'issuer' : response.list[i].issuer,
                                'expire_date' : response.list[i].expire_date,
                                'cert_name' : response.list[i].cert_name,
                                'key_name' : response.list[i].key_name,
                                'type' : response.list[i].type,
                                'id' : response.list[i]._id,
                                'cnt' : response.list[i]._ref_cnt
                            });
                        }
                    }

                    Ext.data.StoreManager.lookup('store_system_certificate_list').loadData(record);
                    Ext.data.StoreManager.lookup('store_system_cacertificate_list').loadData(ca_record);
                    Ext.getCmp('certificate_up_cert').fileInputEl.set({
                        accept:'.der,.pem,.key'
                    });

                    Ext.getCmp('certificate_up_cer').fileInputEl.set({
                        accept:'.der,.pem,.key'
                    });
                }
            }
        );
    }

});