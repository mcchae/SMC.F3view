
Ext.define('SMC.view.pnl_setting_config_backup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_config_backup',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.form.Panel',
        'Ext.form.field.File'
    ],

    id: 'pnl_setting_config_backup',
    autoScroll: true,
    layout: 'vbox',
    bodyPadding: 20,
    title: '정책/설정 데이터',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fs_config_backup',
                    width: 650,
                    title: '<label><input type="checkbox"/>SMC 데이터 자동 백업 사용</label>',
                    items: [
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_period',
                                    margin: 6,
                                    fieldLabel: '백업 주기',
                                    labelWidth: 70,
                                    value: 'daily',
                                    editable: false,
                                    displayField: 'type_text',
                                    store: 'st_BackupPeriod',
                                    valueField: 'type_value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_periodChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_weekly',
                                    margin: '6 6 6 24',
                                    fieldLabel: '요일',
                                    labelWidth: 40,
                                    value: 0,
                                    displayField: 'weekday_text',
                                    store: 'st_BackupWeekday',
                                    valueField: 'weekday_value'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'fs_sftp_backup',
                            checkboxToggle: true,
                            title: 'SFTP 백업 사용',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return false; }

                                        if(!validIPForm(value, 'v4')){ return false; }
                                        return true;
                                    },
                                    anchor: '100%',
                                    itemId: 'txf_sftp_server',
                                    fieldLabel: 'Server IP',
                                    msgTarget: 'none'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return false; }

                                        return true;
                                    },
                                    anchor: '100%',
                                    itemId: 'txf_sftp_userid',
                                    fieldLabel: '아이디',
                                    msgTarget: 'none'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){ return false; }

                                        return true;
                                    },
                                    anchor: '100%',
                                    itemId: 'txf_sftp_userpin',
                                    fieldLabel: '비밀번호',
                                    msgTarget: 'none',
                                    inputType: 'password'
                                },
                                {
                                    xtype: 'textfield',
                                    anchor: '100%',
                                    itemId: 'txf_sftp_dir',
                                    fieldLabel: '저장위치'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            text: '* 백업은 해당 일 오전 2시에 실행됩니다.'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = Ext.getCmp('pnl_setting_config_backup');

                                        var value = {};

                                        if(me.backup_smc)
                                        {
                                            value = me.backup_smc;
                                        }
                                        else
                                        {
                                            value = {
                                                'sftp' : {
                                                    'userpin' : '',
                                                    'userid' : '',
                                                    '@chk_use' : 'off',
                                                    'dir' : '',
                                                    'server' : '0.0.0.0'
                                                },
                                                '@chk_use' : 'on',
                                                'period' : 'weekly',
                                                'weekday' : 0
                                            };
                                        }

                                        if(me.down('fieldset[itemId="fs_config_backup"]').titleCmp.el.dom.getElementsByTagName('input')[0].checked)
                                        {
                                            value['@chk_use'] = 'on';
                                        }
                                        else
                                        {
                                            value['@chk_use'] = 'off';
                                        }

                                        if(me.down('combobox[itemId="cmb_period"]').getValue() === 'daily')
                                        {
                                            value.period = 'daily';
                                        }
                                        else if(me.down('combobox[itemId="cmb_period"]').getValue() === 'weekly')
                                        {
                                            value.period = 'weekly';
                                        }

                                        value.weekday = me.down('combobox[itemId="cmb_weekly"]').getValue();

                                        if(me.down('fieldset[itemId="fs_sftp_backup"]').checkboxCmp.getValue())
                                        {
                                            value.sftp['@chk_use'] = 'on';

                                            if(!me.down('textfield[itemId="txf_sftp_server"]').getValue())
                                            {
                                                alertMessage('Server IP가 입력되지 않았습니다.', me.down('textfield[itemId="txf_sftp_server"]'));
                                                return false;
                                            }

                                            if(!me.down('textfield[itemId="txf_sftp_server"]').validate())
                                            {
                                                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_sftp_server"]'));
                                                return false;
                                            }

                                            if(!me.down('textfield[itemId="txf_sftp_userid"]').getValue())
                                            {
                                                alertMessage('아이디가 입력되지 않았습니다.', me.down('textfield[itemId="txf_sftp_userid"]'));
                                                return false;
                                            }

                                            if(!me.down('textfield[itemId="txf_sftp_userpin"]').getValue())
                                            {
                                                alertMessage('비밀번호가 입력되지 않았습니다.', me.down('textfield[itemId="txf_sftp_userpin"]'));
                                                return false;
                                            }
                                        }
                                        else
                                        {
                                            value.sftp['@chk_use'] = 'off';
                                        }

                                        value.sftp.server = me.down('textfield[itemId="txf_sftp_server"]').getValue();
                                        value.sftp.userid = me.down('textfield[itemId="txf_sftp_userid"]').getValue();
                                        value.sftp.userpin = me.down('textfield[itemId="txf_sftp_userpin"]').getValue();
                                        value.sftp.dir = me.down('textfield[itemId="txf_sftp_dir"]').getValue();

                                        var _svc = 'ftSMC',
                                            _func = 'setSMCSetting',
                                            _params = {
                                                key : Ext.encode('/backup/backup_smc'),
                                                value : Ext.encode(value)
                                            };

                                        me.setLoading(true);

                                        request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            me.setLoading(false);

                                            if(response)
                                            {
                                                alertMessage('저장되었습니다.');
                                            }
                                        }
                                        );
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '저장'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    height: 300,
                    itemId: 'gpn_backup_list',
                    width: 650,
                    store: 'st_BackupList',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '백업 파일명',
                            flex: 1
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        listeners: {
                            select: {
                                fn: me.onCheckboxModelSelect,
                                scope: me
                            },
                            deselect: {
                                fn: me.onCheckboxModelDeselect,
                                scope: me
                            }
                        }
                    })
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var me = Ext.getCmp('pnl_setting_config_backup');

                                var _svc = 'ftSMC',
                                    _func = 'downloadSMCBackup',
                                    _params = {};

                                me.setLoading(true);

                                request_helper.xmlrpc_call_Ajax_Post(
                                _svc,
                                _func,
                                _params,
                                function(response){

                                    me.setLoading(false);

                                    if(response)
                                    {
                                        alertMessage('백업이 정상적으로 완료되었습니다.');

                                        makeFrame('/fileDownload?filePath=' + response);
                                    }
                                }

                                );

                                function makeFrame( url )
                                {
                                    ifrm = document.createElement( "IFRAME" );
                                    ifrm.setAttribute( "style", "display:none;" ) ;
                                    ifrm.setAttribute( "src", url ) ;
                                    ifrm.style.width = 0+"px";
                                    ifrm.style.height = 0+"px";
                                    document.body.appendChild( ifrm ) ;

                                }
                            },
                            margin: '6 6 6 0',
                            maxWidth: 100,
                            width: 100,
                            text: '즉시 백업'
                        },
                        {
                            xtype: 'container',
                            disabled: true,
                            itemId: 'ctn_backup_list',
                            width: 544,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var filename = Ext.getCmp('pnl_setting_config_backup').down('gridpanel[itemId="gpn_backup_list"]').getSelectionModel().getSelection()[0].data.name;

                                        var _svc = 'ftSMC',
                                            _func = 'restoreSMCBackup',
                                            _params = {
                                                filename : Ext.encode(filename)
                                            };

                                        var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Loading..."});
                                        myMask.show();

                                        request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            myMask.destroy();

                                            if(response)
                                            {
                                                Ext.MessageBox.show({
                                                    title:'WeGuardia™ SMC 2.0',
                                                    msg: '복원이 정상적으로 완료되었습니다. <br>재 로그인 하시기 바랍니다.',
                                                    buttons : Ext.Msg.OK,
                                                    buttonText: {OK: "확인"},
                                                    closable:false,
                                                    fn: function(btn){
                                                        Ext.getCmp('vp_SMC_mainView').logout();
                                                    }
                                                });
                                            }
                                        }
                                        );
                                    },
                                    margin: 6,
                                    maxWidth: 100,
                                    width: 100,
                                    text: '선택 복원'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = Ext.getCmp('pnl_setting_config_backup');

                                        var files = [];

                                        for(var i=0; i<me.down('gridpanel[itemId="gpn_backup_list"]').getSelectionModel().getSelection().length; i++)
                                        {
                                            files.push(me.down('gridpanel[itemId="gpn_backup_list"]').getSelectionModel().getSelection()[i].data.name);
                                        }

                                        var _svc = 'ftSMC',
                                            _func = 'delSMCBackupList',
                                            _params = {
                                                files : Ext.encode(files)
                                            };

                                        me.setLoading(true);

                                        request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            _func = 'getSMCBackupList';
                                            _params = [];

                                            request_helper.xmlrpc_call_Ajax_Post(
                                            _svc,
                                            _func,
                                            _params,
                                            function(response2){

                                                me.setLoading(false);

                                                if(response2)
                                                {
                                                    alertMessage('삭제되었습니다.');
                                                }

                                                var backup_array = [];

                                                Ext.each(response2, function(data,idx){

                                                    data = {'name' : data};
                                                    backup_array.push(data);

                                                });

                                                me.down('gridpanel[itemId="gpn_backup_list"]').getStore().loadData(backup_array);
                                            }
                                            );
                                        }
                                        );
                                    },
                                    margin: '6 0 6 6',
                                    maxWidth: 100,
                                    width: 100,
                                    text: '삭제'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'form',
                    border: false,
                    id: 'form_file',
                    width: 650,
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'filefield',
                            flex: 1,
                            id: 'ff_file',
                            margin: '6 6 6 0',
                            width: 450,
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
                                            if(_form.isValid())
                                            {
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

                                                            if(response)
                                                            {
                                                                if(typeof response === 'string')
                                                                {
                                                                    var migration_window = Ext.create('SMC.view.pnl_migration_result');

                                                                    migration_window.loadData(response);

                                                                    migration_window.on('destroy', function() {

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
                                                                    });
                                                                }
                                                                else
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
                                            if(_form.isValid())
                                            {
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

                                                            if(response)
                                                            {
                                                                if(typeof response === 'string')
                                                                {
                                                                    var migration_window = Ext.create('SMC.view.pnl_migration_result');

                                                                    migration_window.loadData(response);

                                                                    migration_window.on('destroy', function() {

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
                                                                    });
                                                                }
                                                                else
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
                            margin: '6 0 6 6',
                            width: 100,
                            text: '파일 복원'
                        }
                    ]
                }
            ],
            listeners: {
                show: {
                    fn: me.onPnl_setting_config_backupShow,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_periodChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'weekly')
        {
            this.down('combobox[itemId="cmb_weekly"]').show();
        }
        else
        {
            this.down('combobox[itemId="cmb_weekly"]').hide();
        }
    },

    onCheckboxModelSelect: function(rowmodel, record, index, eOpts) {
        if(record)
        {
            Ext.getCmp('pnl_setting_config_backup').down('container[itemId="ctn_backup_list"]').enable();
        }
    },

    onCheckboxModelDeselect: function(rowmodel, record, index, eOpts) {
        var me = Ext.getCmp('pnl_setting_config_backup');

        if(me.down('gridpanel[itemId="gpn_backup_list"]').getSelectionModel().getSelection() < 1)
        {
            me.down('container[itemId="ctn_backup_list"]').disable();
        }
    },

    onFf_fileChange: function(filefield, value, eOpts) {
        if(value)
        {
            Ext.getCmp('pnl_setting_config_backup').down('button[itemId="btn_migration"]').enable();
        }
        else
        {
            Ext.getCmp('pnl_setting_config_backup').down('button[itemId="btn_migration"]').disable();
        }
    },

    onPnl_setting_config_backupShow: function(component, eOpts) {
        component.loadData();
    },

    loadData: function() {
        var me = this;

        me.down('combobox[itemId="cmb_weekly"]').hide();

        var _svc = 'ftSMC',
            _func = 'getSMCSetting',
            _params = {
                key : Ext.encode('/backup/backup_smc')
            };

        me.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                me.backup_smc = response;

                if(response && me)
                {
                    if(response['@chk_use'] === "on")
                    {
                        me.down('fieldset[itemId="fs_config_backup"]').titleCmp.el.dom.getElementsByTagName('input')[0].checked = true;
                    }
                    else
                    {
                        me.down('fieldset[itemId="fs_config_backup"]').titleCmp.el.dom.getElementsByTagName('input')[0].checked = false;
                    }

                    me.down('combobox[itemId="cmb_period"]').getStore().each(function(data, idx){

                        if(data.data.type_value === response.period)
                        {
                            me.down('combobox[itemId="cmb_period"]').select(me.down('combobox[itemId="cmb_period"]').getStore().getAt(idx));
                        }
                    });

                    me.down('combobox[itemId="cmb_weekly"]').getStore().each(function(data, idx){

                        if(data.data.weekday_value === response.weekday)
                        {
                            me.down('combobox[itemId="cmb_weekly"]').select(me.down('combobox[itemId="cmb_weekly"]').getStore().getAt(idx));
                        }
                    });

                    if(response.sftp)
                    {
                        if(response.sftp['@chk_use'] === "on")
                        {
                            me.down('fieldset[itemId="fs_sftp_backup"]').checkboxCmp.setValue(true);
                        }
                        else
                        {
                            me.down('fieldset[itemId="fs_sftp_backup"]').checkboxCmp.setValue(false);
                        }

                        me.down('textfield[itemId="txf_sftp_server"]').setValue(response.sftp.server);
                        me.down('textfield[itemId="txf_sftp_userid"]').setValue(response.sftp.userid);
                        me.down('textfield[itemId="txf_sftp_userpin"]').setValue(response.sftp.userpin);
                        me.down('textfield[itemId="txf_sftp_dir"]').setValue(response.sftp.dir);
                    }
                    else
                    {
                        me.down('fieldset[itemId="fs_sftp_backup"]').checkboxCmp.setValue(false);
                    }
                }
                else
                {
                    me.down('fieldset[itemId="fs_config_backup"]').titleCmp.el.dom.getElementsByTagName('input')[0].checked = false;
                    me.down('fieldset[itemId="fs_sftp_backup"]').checkboxCmp.setValue(false);
                }

                _func = 'getSMCBackupList';
                _params = [];

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    _func,
                    _params,
                    function(response2){

                        me.setLoading(false);

                        var backup_array = [];

                        Ext.each(response2, function(data,idx){

                            data = {'name' : data};
                            backup_array.push(data);

                        });

                        if(me.down('gridpanel[itemId="gpn_backup_list"]'))
                        {
                            me.down('gridpanel[itemId="gpn_backup_list"]').getStore().loadData(backup_array);
                        }
                    }
                );
            }
        );

    }

});