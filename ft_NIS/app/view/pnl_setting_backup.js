
Ext.define('SMC.view.pnl_setting_backup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_backup',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.File'
    ],

    id: 'pnl_setting_backup',
    autoScroll: true,
    layout: 'vbox',
    bodyPadding: 20,
    title: '백업 설정',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    title: 'SMC 로그 데이터베이스 백업',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            margin: 6,
                            fieldLabel: '자동 백업 사용',
                            labelWidth: 120
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    margin: 6,
                                    width: 310,
                                    fieldLabel: '주기 (일)',
                                    labelWidth: 120,
                                    editable: false
                                },
                                {
                                    xtype: 'combobox',
                                    margin: 6,
                                    width: 295,
                                    fieldLabel: '시간',
                                    labelAlign: 'right',
                                    editable: false
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    margin: '0 3 0 6',
                                    width: 415,
                                    fieldLabel: '백업 경로',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {

                                    },
                                    margin: 6,
                                    maxWidth: 100,
                                    width: 90,
                                    text: '백업 하기'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {

                                    },
                                    margin: 6,
                                    maxWidth: 100,
                                    width: 90,
                                    text: '복원 하기'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'SMC 감사 데이터 백업',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            margin: 6,
                            fieldLabel: '자동 백업 사용',
                            labelWidth: 120
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    margin: 6,
                                    width: 310,
                                    fieldLabel: '주기 (일)',
                                    labelWidth: 120,
                                    editable: false
                                },
                                {
                                    xtype: 'combobox',
                                    margin: 6,
                                    width: 295,
                                    fieldLabel: '시간',
                                    labelAlign: 'right',
                                    editable: false
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    margin: '0 3 0 6',
                                    width: 415,
                                    fieldLabel: '백업 경로',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {

                                    },
                                    margin: 6,
                                    maxWidth: 100,
                                    width: 90,
                                    text: '백업 하기'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {

                                    },
                                    margin: 6,
                                    maxWidth: 100,
                                    width: 90,
                                    text: '복원 하기'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'SMC 1.0 마이그레이션',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            id: 'form_file',
                            width: 630,
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'filefield',
                                    id: 'ff_file',
                                    margin: 6,
                                    width: 450,
                                    fieldLabel: '파일 업로드',
                                    labelWidth: 120,
                                    name: 'uploadfiles',
                                    buttonText: '...',
                                    listeners: {
                                        change: {
                                            fn: me.onFf_fileChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var _form = Ext.getCmp('form_file').getForm();

                                        var _file = Ext.getCmp('ff_file');

                                        button.disable();

                                        if(_file.getValue() === "")
                                        {
                                            Ext.Msg.alert('WeGuardia™ SMC 2.0', '파일이 업로드되지 않았습니다');
                                            return;
                                        }

                                        Ext.MessageBox.show({
                                            title:'WeGuardia™ SMC 2.0',
                                            msg: '기존 데이터를 삭제하시겠습니까? <br>"아니오"를 선택하면 기존데이터에 정보가 추가됩니니다.',
                                            buttons: Ext.Msg.YESNOCANCEL,
                                            buttonText: {yes: "예",no: "아니오", cancel: "취소"},
                                            fn: function(btn){
                                                if(btn === 'yes')
                                                {
                                                    if(_form.isValid()){

                                                        _form.submit({
                                                            url: '/fileUpload',
                                                            waitMsg: 'Uploading...',
                                                            params: {filepath: '/tmp/'},
                                                            success: function(fp, o) {

                                                                var _data = JSON.parse(o.response.responseText);

                                                                var _fileName = _data.data;

                                                                var _svc = 'ftSMC',
                                                                    _func = 'import_oldBackup',
                                                                    _params = {
                                                                        fileData : Ext.encode(_fileName),
                                                                        init : Ext.encode(true)
                                                                    };

                                                                var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});
                                                                myMask.show();

                                                                request_helper.xmlrpc_call_Ajax_Post(
                                                                _svc,
                                                                _func,
                                                                _params,
                                                                function(response){

                                                                    myMask.destroy();

                                                                    if(response === 'success')
                                                                    {
                                                                        Ext.MessageBox.show({
                                                                            title:'WeGuardia™ SMC 2.0',
                                                                            msg: '마이그레이션이 정상적으로 완료되었습니다. <br>재 로그인 하시기 바랍니다.',
                                                                            buttons : Ext.Msg.OK,
                                                                            buttonText: {OK: "확인"},
                                                                            closable:false,
                                                                            fn: function(btn){
                                                                                Ext.getCmp('vp_SMC_mainView').logout();
                                                                            }
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        Ext.MessageBox.show({
                                                                            title:'WeGuardia™ SMC 2.0',
                                                                            msg: response.errmsg,
                                                                            buttons : Ext.Msg.OK,
                                                                            buttonText: {OK: "확인"}
                                                                        });

                                                                        _form.reset();
                                                                    }
                                                                }
                                                                );
                                                            }

                                                        });

                                                    }
                                                    else
                                                    {
                                                        _form.reset();
                                                    }
                                                }
                                                else if(btn === 'no')
                                                {
                                                    if(_form.isValid()){

                                                        _form.submit({
                                                            url: '/fileUpload',
                                                            waitMsg: 'Uploading...',
                                                            params: {filepath: '/tmp/'},
                                                            success: function(fp, o) {

                                                                var _data = JSON.parse(o.response.responseText);

                                                                var _fileName = _data.data;

                                                                var _svc = 'ftSMC',
                                                                    _func = 'import_oldBackup',
                                                                    _params = {
                                                                        fileData : Ext.encode(_fileName),
                                                                        init : Ext.encode(false)
                                                                    };

                                                                var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});
                                                                myMask.show();

                                                                request_helper.xmlrpc_call_Ajax_Post(
                                                                _svc,
                                                                _func,
                                                                _params,
                                                                function(response){

                                                                    myMask.destroy();

                                                                    if(response === 'success')
                                                                    {
                                                                        Ext.MessageBox.show({
                                                                            title:'WeGuardia™ SMC 2.0',
                                                                            msg: '마이그레이션이 정상적으로 완료되었습니다. <br>재 로그인 하시기 바랍니다.',
                                                                            buttons : Ext.Msg.OK,
                                                                            buttonText: {OK: "확인"},
                                                                            closable:false,
                                                                            fn: function(btn){
                                                                                Ext.getCmp('vp_SMC_mainView').logout();
                                                                            }
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        Ext.MessageBox.show({
                                                                            title:'WeGuardia™ SMC 2.0',
                                                                            msg: response.errmsg,
                                                                            buttons : Ext.Msg.OK,
                                                                            buttonText: {OK: "확인"}
                                                                        });

                                                                        _form.reset();
                                                                    }
                                                                }
                                                                );
                                                            }

                                                        });

                                                    }
                                                    else
                                                    {
                                                        _form.reset();
                                                    }
                                                }
                                                else
                                                {
                                                    _form.reset();
                                                }
                                            }
                                        });
                                    },
                                    disabled: true,
                                    itemId: 'btn_migration',
                                    margin: 6,
                                    text: '마이그레이션 적용'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '10 0 0 0',
                    width: 657,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {

                            },
                            width: 100,
                            text: '저장'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onFf_fileChange: function(filefield, value, eOpts) {
        var me = Ext.getCmp('pnl_setting_backup');

        if(value)
        {
            me.down('button[itemId="btn_migration"]').enable();
        }
        else
        {
            me.down('button[itemId="btn_migration"]').disable();
        }
    },

    loadData: function() {
        var me = this;
        me.show();
    }

});