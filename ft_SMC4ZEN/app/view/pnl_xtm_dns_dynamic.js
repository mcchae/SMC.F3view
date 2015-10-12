
Ext.define('SMC4ZEN.view.pnl_xtm_dns_dynamic', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_dns_dynamicViewModel',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Number'
    ],

    viewModel: {
        type: 'pnl_xtm_dns_dynamic'
    },
    height: 680,
    id: 'pnl_xtm_dns_dynamic',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: 'DDNS',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_ddns_useservice',
            checkboxToggle: true,
            title: 'DDNS 서비스 사용',
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_ddns_server',
                    title: '서비스 제공 서버',
                    items: [
                        {
                            xtype: 'radiogroup',
                            itemId: 'rdg_server',
                            fieldLabel: '',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_dyndns',
                                    margin: '0, 200, 0, 0',
                                    name: 'server',
                                    boxLabel: 'dyndns.org',
                                    checked: true,
                                    inputValue: 'dyndns.org'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_freedns',
                                    name: 'server',
                                    boxLabel: 'freedns.afraid.org',
                                    inputValue: 'freedns.afraid.org'
                                }
                            ],
                            listeners: {
                                change: 'onRdg_serverChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_ddns_dyndns',
                    title: 'dyndns.org',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_ddns_dyndns1',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_hostname',
                                    margin: '0, 20, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: '호스트 명'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_username',
                                    maxWidth: 300,
                                    fieldLabel: '사용자 명'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_ddns_dyndns2',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_passwd',
                                    margin: '0, 20, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: '비밀번호',
                                    inputType: 'password'
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 60, 7200);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_sec',
                                    maxWidth: 300,
                                    fieldLabel: '갱신주기(초)',
                                    value: 600
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_ddns_freedns',
                    title: 'freedns.afraid.org',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_ddns_freedns1',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_hostname',
                                    margin: '0, 20, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: '호스트 명'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_userhash',
                                    maxWidth: 300,
                                    fieldLabel: '사용자 해시값'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ddns_freedns2',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 60, 7200);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'nfd_sec',
                                    margin: '0, 20, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: '갱신주기(초)',
                                    value: 600
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_ddns_margin',
                                    maxWidth: 300
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_dns_dynamicAfterRender',
        beforeclose: 'onPnl_xtm_dns_dynamicBeforeClose'
    },

    onRdg_serverChange: function(field, newValue, oldValue, eOpts) {
        // onRdg_serverChange ==========================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : Dynamic DNS 서버 선택시 컴포넌트를 설정합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        if(newValue.server === 'dyndns.org'){

            component.fds_dyndns.setVisible(true);
            component.fds_free.setVisible(false);

        }
        else{

            component.fds_dyndns.setVisible(false);
            component.fds_free.setVisible(true);

        }
    },

    onPnl_xtm_dns_dynamicAfterRender: function(component, eOpts) {
        // onPnl_xtm_dns_dynamicAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : Dynamic DNS 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.ddns;

                if(deviceData){

                    this.down('[itemId=fds_ddns_useservice]').checkboxCmp.setValue((deviceData.setting['@chk_use'] === "on") ? true : false);

                    componentObj.selectServer.setValue(	{	'server' : deviceData.server	} );

                    componentObj.dy_host.setValue((componentObj.selectServer.getValue().server === 'dyndns.org') ? deviceData.host : "");
                    componentObj.dy_name.setValue((componentObj.selectServer.getValue().server === 'dyndns.org') ? deviceData.name : "");
                    componentObj.dy_passwd.setValue(deviceData.password);
                    componentObj.dy_sec.setValue(deviceData.cycle);

                    componentObj.fr_host.setValue((componentObj.selectServer.getValue().server === 'freedns.afraid.org') ? deviceData.host : "");
                    componentObj.fr_hash.setValue((componentObj.selectServer.getValue().server === 'freedns.afraid.org') ? deviceData.freedns_hash : "");
                    componentObj.fr_sec.setValue(deviceData.freedns_time);

                }

            }

        }
        catch(err){

            console.log('DDNS 데이터 초기화 중 catch 발생 : ', err);

        }


    },

    onPnl_xtm_dns_dynamicBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_dns_dynamicBeforeClose =============================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : Dynamic DNS 화면이 종료되면 데이터를 저장합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj          = {};

        var fds_server   = this.down('[itemId=fds_ddns_useservice]');
        var fds_dyndns   = this.down('[itemId=fds_ddns_dyndns]');
        var fds_free     = this.down('[itemId=fds_ddns_freedns]');

        obj.fds_server   = fds_server;
        obj.fds_dyndns   = fds_dyndns;
        obj.fds_free     = fds_free;

        obj.selectServer = fds_server.down('[itemId=rdg_server]');

        obj.dy_host      = fds_dyndns.down('[itemId=txf_hostname]');
        obj.dy_name      = fds_dyndns.down('[itemId=txf_username]');
        obj.dy_passwd    = fds_dyndns.down('[itemId=txf_passwd]');
        obj.dy_sec       = fds_dyndns.down('[itemId=nfd_sec]');

        obj.fr_host      = fds_free.down('[itemId=txf_hostname]');
        obj.fr_hash      = fds_free.down('[itemId=txf_userhash]');
        obj.fr_sec       = fds_free.down('[itemId=nfd_sec]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : Dynamic 데이터를 유효성 검사를 실시합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(server){

                if(server === 'dyndns.org'){

                    if(component.fds_server.checkboxCmp.getValue() && component.dy_host.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '호스트 명은 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.fds_server.checkboxCmp.getValue() && component.dy_name.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '사용자 명은 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.fds_server.checkboxCmp.getValue() && component.dy_passwd.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '비밀번호는 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.fds_server.checkboxCmp.getValue() && component.dy_sec.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '갱신주기는 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }
                else{

                    if(component.fds_server.checkboxCmp.getValue() && component.fr_host.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '호스트 명은 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.fds_server.checkboxCmp.getValue() && component.fr_hash.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '사용자 해시값은 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.fds_server.checkboxCmp.getValue() && component.fr_sec.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '갱신주기는 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            dyDnsValidCheck : function(server){

                if(server === 'dyndns.org'){

                    if(!component.dy_sec.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '주기의 범위는 60초 ~ 7200초 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }
                else{

                    if(!component.fr_sec.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '주기의 범위는 60초 ~ 7200초 입니다.',
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
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : Dynamic DNS 데이터를 저장합니다.
        //
        // =============================================================================================================================================================================

        var ipmanagerStore = Ext.getStore('st_ipmanager_set');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component = this.componentStorage();

        if(!this.validityCheck().blankCheck(component.selectServer.getValue().server) || !this.validityCheck().dyDnsValidCheck(component.selectServer.getValue().server)){

            return false;

        }

        deviceAllData.network_ddns.ddns.setting['@chk_use'] = (component.fds_server.checkboxCmp.getValue() === true) ? 'on' : 'off';

        deviceAllData.network_ddns.ddns.freedns_hash = (component.selectServer.getValue().server === 'dyndns.org') ? null : component.fr_hash.getValue();
        deviceAllData.network_ddns.ddns.freedns_time = (component.selectServer.getValue().server === 'dyndns.org') ? null : component.fr_sec.getValue();

        deviceAllData.network_ddns.ddns.host         = (component.selectServer.getValue().server === 'dyndns.org') ? component.dy_host.getValue() : component.fr_host.getValue();
        deviceAllData.network_ddns.ddns.name         = (component.selectServer.getValue().server === 'dyndns.org') ? component.dy_name.getValue() : null;
        deviceAllData.network_ddns.ddns.password     = (component.selectServer.getValue().server === 'dyndns.org') ? component.dy_passwd.getValue() : null;
        deviceAllData.network_ddns.ddns.cycle        = (component.selectServer.getValue().server === 'dyndns.org') ? component.dy_sec.getValue() : null;

        deviceAllData.network_ddns.ddns.server       = component.selectServer.getValue().server;

        return true;
    }

});