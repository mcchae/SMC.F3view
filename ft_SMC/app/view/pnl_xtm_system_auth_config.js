
Ext.define('SMC.view.pnl_xtm_system_auth_config', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_system_auth_config',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.Number'
    ],

    height: 680,
    id: 'pnl_xtm_system_auth_config',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '외부서버 인증',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_exserver_radius',
                    margin: '0, 0, 10, 0',
                    layout: 'fit',
                    checkboxToggle: true,
                    title: 'Radius 서버 사용',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_exserver_valid',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_login',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidIPAddress(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ip',
                                            margin: '0, 100, 0, 0',
                                            width: 280,
                                            fieldLabel: '서버 IP',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_passwd',
                                            width: 280,
                                            fieldLabel: '접근암호',
                                            inputType: 'password'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_port',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 1025, 65536);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_auth',
                                            margin: '0, 100, 0, 0',
                                            width: 280,
                                            fieldLabel: 'Auth 포트',
                                            listeners: {
                                                blur: {
                                                    fn: me.onNfd_authBlur,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 1025, 65536);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_account',
                                            width: 280,
                                            fieldLabel: 'Account 포트',
                                            listeners: {
                                                blur: {
                                                    fn: me.onNfd_accountBlur,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_statchk',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 1440);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_statchk',
                                            width: 280,
                                            fieldLabel: '상태체크 (분)',
                                            value: 1,
                                            listeners: {
                                                blur: {
                                                    fn: me.onNfd_statchkBlur3,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_exserver_backup',
                                    margin: '0, 0, 10, 0',
                                    title: '백업 서버',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_exserver_login',
                                            margin: '10, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value){

                                                            var retValue = ValidIPAddress(value);

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'txf_ip',
                                                    margin: '0, 100, 0, 0',
                                                    width: 280,
                                                    fieldLabel: '서버 IP',
                                                    enableKeyEvents: true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txf_passwd',
                                                    width: 280,
                                                    fieldLabel: '접근암호',
                                                    inputType: 'password'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_exserver_port',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 1025, 65536);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'nfd_auth',
                                                    margin: '0, 100, 0, 0',
                                                    width: 280,
                                                    fieldLabel: 'Auth 포트',
                                                    listeners: {
                                                        blur: {
                                                            fn: me.onNfd_authBlur1,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 1025, 65536);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'nfd_account',
                                                    width: 280,
                                                    fieldLabel: 'Account 포트',
                                                    listeners: {
                                                        blur: {
                                                            fn: me.onNfd_accountBlur1,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_exserver_statchk',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 0, 1440);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'nfd_statchk',
                                                    width: 280,
                                                    fieldLabel: '상태체크 (분)',
                                                    value: 1,
                                                    listeners: {
                                                        blur: {
                                                            fn: me.onNfd_statchkBlur2,
                                                            scope: me
                                                        }
                                                    }
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
                    xtype: 'fieldset',
                    itemId: 'fds_exserver_tacacs',
                    margin: '0, 0, 10, 0',
                    layout: 'fit',
                    checkboxToggle: true,
                    title: 'TACACS 서버 사용',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_exserver_valid',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_login',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidIPAddress(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ip',
                                            margin: '0, 100, 0, 0',
                                            width: 280,
                                            fieldLabel: '서버 IP',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_passwd',
                                            width: 280,
                                            fieldLabel: '접근암호',
                                            inputType: 'password'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_statchk',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 1440);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_statchk',
                                            width: 280,
                                            fieldLabel: '상태체크 (분)',
                                            value: 1,
                                            listeners: {
                                                blur: {
                                                    fn: me.onNfd_statchkBlur1,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_exserver_ldap',
                    margin: '0, 0, 10, 0',
                    layout: 'fit',
                    checkboxToggle: true,
                    title: 'LDAP 서버 사용',
                    items: [
                        {
                            xtype: 'form',
                            border: false,
                            itemId: 'fpn_exserver_valid',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_login',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidIPAddress(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ip',
                                            margin: '0, 100, 0, 0',
                                            width: 280,
                                            fieldLabel: '서버 IP',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_passwd',
                                            width: 280,
                                            fieldLabel: '기본 DN'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_bind',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_bind',
                                            margin: '0, 100, 0, 0',
                                            width: 280,
                                            fieldLabel: '바인드 DN'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_bindpasswd',
                                            width: 280,
                                            fieldLabel: '바인드 암호',
                                            inputType: 'password'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_exserver_statchk',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 1440);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_statchk',
                                            width: 280,
                                            fieldLabel: '상태체크 (분)',
                                            value: 1,
                                            listeners: {
                                                blur: {
                                                    fn: me.onNfd_statchkBlur,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_system_auth_configAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_system_auth_configBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onNfd_authBlur: function(component, e, eOpts) {
        var authPort = component.getValue();

        if(authPort === null || authPort < 1025 || authPort > 65535){

            component.setValue(1812);

        }
    },

    onNfd_accountBlur: function(component, e, eOpts) {
        var accountPort = component.getValue();

        if(accountPort === null || accountPort < 1025 || accountPort > 65535){

            component.setValue(1813);

        }
    },

    onNfd_statchkBlur3: function(component, e, eOpts) {
        if(component.getValue() === null){

            component.setValue(1);

        }
    },

    onNfd_authBlur1: function(component, e, eOpts) {
        var authPort = component.getValue();

        if(authPort === null || authPort < 1025 || authPort > 65535){

            component.setValue(1812);

        }
    },

    onNfd_accountBlur1: function(component, e, eOpts) {
        var accountPort = component.getValue();

        if(accountPort === null || accountPort < 1025 || accountPort > 65535){

            component.setValue(1813);

        }
    },

    onNfd_statchkBlur2: function(component, e, eOpts) {
        if(component.getValue() === null){

            component.setValue(1);

        }
    },

    onNfd_statchkBlur1: function(component, e, eOpts) {
        if(component.getValue() === null){

            component.setValue(1);

        }
    },

    onNfd_statchkBlur: function(component, e, eOpts) {
        if(component.getValue() === null){

            component.setValue(1);

        }
    },

    onPnl_xtm_system_auth_configAfterRender: function(component, eOpts) {
        // onPnl_xtm_system_auth_configAfterRender ======================================================================================================================================
        //
        // 일 시 : 2014.07.13
        //
        // 설 명 : 외부서버의 데이터를 컴포넌트에 설정합니다.
        //
        // 수 정 :
        //
        // - (2015.08.31 김민수 : Radius, Tacacs, Ldap 디폴트 데이터 및 Blur 이벤트 추가)
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var exauthStore  = Ext.getStore('st_system_auth');

        var deviceData   = component.deviceParams;

        try{

            // 데이터 초기화 ==================================================================================================================================================================

            var radiusData = null;
            var tacacsData = null;
            var ldapData   = null;

            if(deviceData.radius)
                radiusData = deviceData.radius;

            if(deviceData.tacacs)
                tacacsData = deviceData.tacacs;

            if(deviceData.ldap)
                ldapData   = deviceData.ldap;

            componentObj.fds_radius.checkboxCmp.setValue(false);
            componentObj.fds_tacacs.checkboxCmp.setValue(false);
            componentObj.fds_ldap.checkboxCmp.setValue(false);

            // 체크 박스 이벤트 연결 ===========================================================================================================================================================

            componentObj.fds_radius.checkboxCmp.on('change', function(box, newValue, oldValue, eOpts){

                if(newValue){

                    if(duplicationItem(2,'value','st_system_auth'))
                        exauthStore.add({	name : 'Radius', value : 2	});

                    var authport = componentObj.radius_auth.getValue();
                    var accoutport = componentObj.radius_account.getValue();
                    var statecheck = componentObj.radius_statchk.getValue();
                    var bauthport = componentObj.backup_auth.getValue();
                    var baccountport = componentObj.backup_account.getValue();
                    var bstatecheck = componentObj.backup_statchk.getValue();

                    componentObj.radius_auth.setValue((authport) ? authport : 1812);
                    componentObj.radius_account.setValue((accoutport) ? accoutport : 1813);
                    componentObj.radius_statchk.setValue((statecheck) ? statecheck : 1);

                    componentObj.backup_auth.setValue((bauthport) ? bauthport : 1812);
                    componentObj.backup_account.setValue((baccountport) ? baccountport : 1813);
                    componentObj.backup_statchk.setValue((bstatecheck) ? bstatecheck : 1);

                }
                else{

                    for(var i = 0; i < exauthStore.count(); i++){

                        var delRecord = exauthStore.getAt(i).get('value');

                        if(delRecord === 2){

                            exauthStore.remove(exauthStore.getAt(i));

                            break;

                        }

                    }

                }

            });

            componentObj.fds_tacacs.checkboxCmp.on('change', function(box, newValue, oldValue, eOpts){

                if(newValue){

                    if(duplicationItem(3,'value','st_system_auth'))
                        exauthStore.add({	name : 'TACACS', value : 3	});

                    var tacacschk = componentObj.tacacs_statchk.getValue();

                    componentObj.tacacs_statchk.setValue((tacacschk) ? tacacschk : 1);

                }
                else{

                    for(var i = 0; i < exauthStore.count(); i++){

                        var delRecord = exauthStore.getAt(i).get('value');

                        if(delRecord === 3){

                            exauthStore.remove(exauthStore.getAt(i));

                            break;

                        }
                    }

                }

            });

            componentObj.fds_ldap.checkboxCmp.on('change', function(box, newValue, oldValue, eOpts){

                if(newValue){

                    if(duplicationItem(4,'value','st_system_auth'))
                        exauthStore.add({	name : 'LDAP', value : 4	});

                    var ldapchk = componentObj.ldap_statchk.getValue();

                    componentObj.ldap_statchk.setValue((ldapchk) ? ldapchk : 1);

                }
                else{

                    for(var i = 0; i < exauthStore.count(); i++){

                        var delRecord = exauthStore.getAt(i).get('value');

                        if(delRecord === 4){

                            exauthStore.remove(exauthStore.getAt(i));

                            break;

                        }
                    }

                }

            });

            // Radius 초기화 =================================================================================================================================================================

            if(radiusData){

                componentObj.fds_radius.checkboxCmp.setValue((radiusData['@chk_use']) === "on" ? true : false);

                componentObj.radius_ip.setValue(radiusData.ip);
                componentObj.radius_passwd.setValue(radiusData.password);
                componentObj.radius_auth.setValue(radiusData.auth_port);
                componentObj.radius_account.setValue(radiusData.account_port);
                componentObj.radius_statchk.setValue(radiusData.radius_cycle);

                componentObj.backup_ip.setValue(radiusData.bk_ip);
                componentObj.backup_passwd.setValue(radiusData.bk_password);
                componentObj.backup_auth.setValue(radiusData.bk_auth_port);
                componentObj.backup_account.setValue(radiusData.bk_account_port);
                componentObj.backup_statchk.setValue(radiusData.bk_radius_cycle);

            }

            if(tacacsData){

                componentObj.fds_tacacs.checkboxCmp.setValue((tacacsData['@chk_use']) === "on" ? true : false);

                // TACACS 초기화 =================================================================================================================================================================

                componentObj.tacacs_ip.setValue(tacacsData.ip);
                componentObj.tacacs_passwd.setValue(tacacsData.password);
                componentObj.tacacs_statchk.setValue(tacacsData.cycle);

            }

            if(ldapData){

                componentObj.fds_ldap.checkboxCmp.setValue((ldapData['@chk_use']) === "on" ? true : false);

                // LDAP   초기화 =================================================================================================================================================================

                componentObj.ldap_ip.setValue(ldapData.ip);
                componentObj.ldap_passwd.setValue(ldapData.base);
                componentObj.ldap_bind.setValue(ldapData.binddn);
                componentObj.ldap_bindpw.setValue(ldapData.bindpw);
                componentObj.ldap_statchk.setValue(ldapData.cycle);

            }

        }
        catch(err){

            console.log('외부 서버 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_system_auth_configBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj            = {};

        var fds_radius     = this.down('[itemId=fds_exserver_radius]');
        var fds_backup     = fds_radius.down('[itemId=fds_exserver_backup]');
        var fds_tacacs     = this.down('[itemId=fds_exserver_tacacs]');
        var fds_ldap       = this.down('[itemId=fds_exserver_ldap]');

        var radius_ip      = fds_radius.down('[itemId=txf_ip]');
        var radius_passwd  = fds_radius.down('[itemId=txf_passwd]');
        var radius_auth    = fds_radius.down('[itemId=nfd_auth]');
        var radius_account = fds_radius.down('[itemId=nfd_account]');
        var radius_statchk = fds_radius.down('[itemId=nfd_statchk]');

        var backup_ip      = fds_backup.down('[itemId=txf_ip]');
        var backup_passwd  = fds_backup.down('[itemId=txf_passwd]');
        var backup_auth    = fds_backup.down('[itemId=nfd_auth]');
        var backup_account = fds_backup.down('[itemId=nfd_account]');
        var backup_statchk = fds_backup.down('[itemId=nfd_statchk]');

        var tacacs_ip      = fds_tacacs.down('[itemId=txf_ip]');
        var tacacs_passwd  = fds_tacacs.down('[itemId=txf_passwd]');
        var tacacs_statchk = fds_tacacs.down('[itemId=nfd_statchk]');

        var ldap_ip        = fds_ldap.down('[itemId=txf_ip]');
        var ldap_passwd    = fds_ldap.down('[itemId=txf_passwd]');
        var ldap_bind      = fds_ldap.down('[itemId=txf_bind]');
        var ldap_bindpw    = fds_ldap.down('[itemId=txf_bindpasswd]');
        var ldap_statchk   = fds_ldap.down('[itemId=nfd_statchk]');

        obj.fds_radius = fds_radius;
        obj.fds_backup = fds_backup;
        obj.fds_tacacs = fds_tacacs;
        obj.fds_ldap   = fds_ldap;

        obj.radius_ip      = radius_ip;
        obj.radius_passwd  = radius_passwd;
        obj.radius_auth    = radius_auth;
        obj.radius_account = radius_account;
        obj.radius_statchk = radius_statchk;

        obj.backup_ip      = backup_ip;
        obj.backup_passwd  = backup_passwd;
        obj.backup_auth    = backup_auth;
        obj.backup_account = backup_account;
        obj.backup_statchk = backup_statchk;

        obj.tacacs_ip      = tacacs_ip;
        obj.tacacs_passwd  = tacacs_passwd;
        obj.tacacs_statchk = tacacs_statchk;

        obj.ldap_ip        = ldap_ip;
        obj.ldap_passwd    = ldap_passwd;
        obj.ldap_bind      = ldap_bind;
        obj.ldap_bindpw    = ldap_bindpw;
        obj.ldap_statchk   = ldap_statchk;

        return obj;
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.07.10
        //
        // 설명 : 외부서버 인증 유효성 검사를 수행합니다.
        //
        // - IP, 포트 범위 체크
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            radiusBlankCheck : function(){

                if(component.fds_radius.checkboxCmp.getValue()){

                    if(component.radius_ip.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '서버 IP는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.radius_passwd.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '서버 접근암호는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.radius_auth.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Auth 포트는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.radius_account.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Account 포트번호는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.radius_statchk.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태체크 값은 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && component.backup_passwd.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '접근암호는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && component.backup_auth.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Auth 포트는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && component.backup_account.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Account 포트는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && component.backup_statchk.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태체크 주기는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            tacacsBlankCheck : function(){

                if(component.fds_tacacs.checkboxCmp.getValue()){

                    if(component.tacacs_ip.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '서버 IP는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.tacacs_passwd.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '접근 암호는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.tacacs_statchk.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태 체크는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            ldapBlankCheck : function(){

                if(component.fds_ldap.checkboxCmp.getValue()){

                    if(component.ldap_ip.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '서버 IP는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.ldap_passwd.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '기본 DN은 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.ldap_bind.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '바인드 DN은 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.ldap_bindpw.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '바인드 암호는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.ldap_statchk.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태 체크는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            radiusValidCheck : function(){

                if(component.fds_radius.checkboxCmp.getValue()){

                    if(!component.radius_ip.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식과 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.radius_auth.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Auth 포트의 범위는 1025 ~ 65536 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.radius_account.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Account 포트의 범위는 1025 ~ 65536 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.radius_statchk.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태체크의 범위는 0 ~ 1440 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && !component.backup_ip.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && !component.backup_auth.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Auth 포트의 범위는 1025 ~ 65536 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && !component.backup_account.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Account 포트의 범위는 1025 ~ 65536 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.backup_ip.getValue() !== '' && !component.backup_statchk.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태체크의 범위는 0 ~ 1440 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            tacacsValidCheck : function(){

                if(component.fds_tacacs.checkboxCmp.getValue()){

                    if(!component.tacacs_ip.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.tacacs_statchk.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태체크의 범위는 0 ~ 1440 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            ldapValidCheck : function(){

                if(component.fds_ldap.checkboxCmp.getValue()){

                    if(!component.ldap_ip.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.ldap_statchk.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '상태 체크의 범위는 0 ~ 1440 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.06.10
        //
        // 설명 : 외부서버인증 데이터를 저장합니다.
        //
        // ============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var obj = {};

        if(!this.validityCheck().radiusBlankCheck() || !this.validityCheck().tacacsBlankCheck() || !this.validityCheck().ldapBlankCheck() ||
           !this.validityCheck().radiusValidCheck() || !this.validityCheck().tacacsValidCheck() || !this.validityCheck().ldapValidCheck()){

            return false;

        }

        obj.domain = {};

        obj.domain.directory = {};
        obj.domain.directory['@chk_use'] = "off";
        obj.domain.fs_cycle  = 0;
        obj.domain.id        = null;
        obj.domain.name      = null;
        obj.domain.password  = null;

        if(componentObj.fds_radius.checkboxCmp.getValue()){

            obj.radius = {};

            obj.radius['@chk_use']  = (componentObj.fds_radius.checkboxCmp.getValue() === true) ? "on" : "off";
            obj.radius.ip           = componentObj.radius_ip.getValue();
            obj.radius.password     = componentObj.radius_passwd.getValue();
            obj.radius.account_port = componentObj.radius_account.getValue();
            obj.radius.auth_port    = componentObj.radius_auth.getValue();
            obj.radius.radius_cycle = componentObj.radius_statchk.getValue();

            obj.radius.bk_ip        = componentObj.backup_ip.getValue();
            obj.radius.bk_password  = componentObj.backup_passwd.getValue();
            obj.radius.bk_auth_port = componentObj.backup_auth.getValue();
            obj.radius.bk_account_port = componentObj.backup_account.getValue();
            obj.radius.bk_radius_cycle = componentObj.backup_statchk.getValue();

        }
        else{

            if(deviceAllData.network_radius.radius){

                delete deviceAllData.network_radius.radius;

            }

        }

        if(componentObj.fds_tacacs.checkboxCmp.getValue()){

            obj.tacacs = {};

            obj.tacacs['@chk_use'] = (componentObj.fds_tacacs.checkboxCmp.getValue() === true) ? "on" : "off";
            obj.tacacs.ip          = componentObj.tacacs_ip.getValue();
            obj.tacacs.password    = componentObj.tacacs_passwd.getValue();
            obj.tacacs.cycle       = componentObj.tacacs_statchk.getValue();

        }
        else{

            if(deviceAllData.network_radius.tacacs){

                delete deviceAllData.network_radius.tacacs;

            }

        }

        if(componentObj.fds_ldap.checkboxCmp.getValue()){

            obj.ldap = {};

            obj.ldap['@chk_use'] = (componentObj.fds_ldap.checkboxCmp.getValue() === true) ? "on" : "off";
            obj.ldap.base        = componentObj.ldap_passwd.getValue();
            obj.ldap.binddn      = componentObj.ldap_bind.getValue();
            obj.ldap.bindpw      = componentObj.ldap_bindpw.getValue();
            obj.ldap.cycle       = componentObj.ldap_statchk.getValue();
            obj.ldap.ip          = componentObj.ldap_ip.getValue();

        }
        else{

            if(deviceAllData.network_radius.ldap){

                delete deviceAllData.network_radius.ldap;

            }

        }

        deviceAllData.network_radius = obj;

        return true;
    }

});