
Ext.define('SMC.view.pnl_xtm_ha_sync', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_ha_sync',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox'
    ],

    height: 680,
    id: 'pnl_xtm_ha_sync',
    width: 800,
    overflowY: 'auto',
    layout: 'hbox',
    bodyPadding: 10,
    title: '동기화',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_sync_usesync',
                    margin: '0, 10, 0, 0',
                    checkboxToggle: true,
                    title: '세션 동기화 사용',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            flex: 1,
                            border: false,
                            itemId: 'fpn_sync_usesync',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_interface',
                                    margin: '0, 150, 10, 0',
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_deveth',
                                    valueField: 'eth'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidIPAddress(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    anchor: '120%',
                                    itemId: 'txf_ipaddress',
                                    margin: '0, 100, 10, 0',
                                    fieldLabel: 'IP 주소',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidMAC(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    anchor: '120%',
                                    itemId: 'txf_macaddress',
                                    margin: '0, 100, 10, 0',
                                    fieldLabel: 'MAC 주소',
                                    enableKeyEvents: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_sync_useline',
                    checkboxToggle: true,
                    title: '라인 이중화 사용',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'form',
                            flex: 1,
                            border: false,
                            itemId: 'fpn_sync_useline',
                            margin: '0, 0, 10, 0',
                            bodyPadding: 10,
                            title: '',
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_non_interface',
                                    margin: '0, 150, 10, 0',
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_deveth',
                                    valueField: 'eth'
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidIPAddress(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    anchor: '120%',
                                    itemId: 'txf_non_ipaddress',
                                    margin: '0, 100, 10, 0',
                                    fieldLabel: 'IP 주소',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidMAC(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    anchor: '120%',
                                    itemId: 'txf_non_macaddress',
                                    margin: '0, 100, 10, 0',
                                    fieldLabel: 'MAC 주소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_ha_syncAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_ha_syncBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_xtm_ha_syncAfterRender: function(component, eOpts) {
        // onPnl_xtm_ha_syncAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : HA 동기화 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        componentObj.usesync.checkboxCmp.on('change', function(cb, newValue, oldValue, eOpts){

            if(newValue){

                componentObj.useline.setDisabled(false);
                componentObj.useline.checkboxCmp.setValue(false);

                componentObj.syncInterface.setValue('eth0');
                componentObj._syncInterface.setValue('eth0');

            }
            else{

                componentObj.useline.setDisabled(true);
                componentObj.useline.checkboxCmp.setValue(false);
                componentObj.syncvalid.getForm().reset();

                componentObj.syncInterface.setValue('eth0');
                componentObj._syncInterface.setValue('eth0');

            }

        });

        componentObj.useline.checkboxCmp.on('change', function(cb, newValue, oldValue, eOpts){

            if(newValue)	{

                componentObj.useline.setDisabled(false);

                componentObj._syncInterface.setValue('eth0');

            }
            else{

                componentObj.linevalid.getForm().reset();

                componentObj._syncInterface.setValue('eth0');

            }

        });

        componentObj.syncInterface.setValue('eth0');

        componentObj._syncInterface.setValue('eth0');

        try{

            if(component.deviceParams){

                var syncData = component.deviceParams.backup;

                if(syncData){

                    componentObj.usesync.checkboxCmp.setValue((syncData['@chk_use'] === 'on') ? true : false);
                    componentObj.useline.checkboxCmp.setValue((syncData['@chk_dual'] === 'on') ? true : false);

                    componentObj.syncInterface.setValue(syncData['interface']);
                    componentObj._syncInterface.setValue(syncData.interface2);

                    componentObj.syncAddress.setValue(syncData.ip);
                    componentObj._syncAddress.setValue(syncData.ip2);

                    componentObj.macAddress.setValue(syncData.mac);
                    componentObj._macAddress.setValue(syncData.mac2);

                }

            }

        }
        catch(err){

            console.log('HA 동기화 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_ha_syncBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var usesync        = this.down('[itemId=fds_sync_usesync]');
        var useline        = this.down('[itemId=fds_sync_useline]');

        var syncvalid      = usesync.down('[itemId=fpn_sync_usesync]');
        var linevalid      = useline.down('[itemId=fpn_sync_useline]');

        var syncInterface  = usesync.down('[itemId=cmb_interface]');
        var syncAddress    = usesync.down('[itemId=txf_ipaddress]');
        var macAddress     = usesync.down('[itemId=txf_macaddress]');

        var _syncInterface = useline.down('[itemId=cmb_non_interface]');
        var _syncAddress   = useline.down('[itemId=txf_non_ipaddress]');
        var _macAddress    = useline.down('[itemId=txf_non_macaddress]');

        return function(){

            obj.usesync        = usesync;
            obj.useline        = useline;
            obj.syncvalid      = syncvalid;
            obj.linevalid      = linevalid;
            obj.syncInterface  = syncInterface;
            obj.syncAddress    = syncAddress;
            obj.macAddress     = macAddress;
            obj._syncInterface = _syncInterface;
            obj._syncAddress   = _syncAddress;
            obj._macAddress    = _macAddress;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.04
        //
        // 설명 : HA 동기화의 유효성 검사를 체크합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            syncblankCheck : function(){

                if(component.usesync.checkboxCmp.getValue()){

                    if(component.syncAddress.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 주소는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.macAddress.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'MAC 주소는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.useline.checkboxCmp.getValue()){

                    if(component._syncAddress.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP 주소는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component._macAddress.getValue() === ''){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'MAC 주소는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            syncValidateCheck : function(){

                if(component.usesync.checkboxCmp.getValue()){

                    if(!component.syncAddress.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.macAddress.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'MAC 주소의 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                if(component.useline.checkboxCmp.getValue()){

                    if(!component._syncAddress.validate){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component._macAddress.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'MAC 주소의 형식에 맞지 않습니다.',
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
        var component     = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(!this.validityCheck().syncblankCheck() || !this.validityCheck().syncValidateCheck()){

            return false;
        }

        deviceAllData.sync_session_backup.backup['@chk_dual']  = (component.useline.checkboxCmp.getValue() === true) ? "on" : "off";
        deviceAllData.sync_session_backup.backup['@chk_use']   = (component.usesync.checkboxCmp.getValue() === true) ? "on" : "off";

        if(!component.usesync.checkboxCmp.getValue()){

            delete deviceAllData.sync_session_backup.backup['interface'];
            delete deviceAllData.sync_session_backup.backup.ip;
            delete deviceAllData.sync_session_backup.backup.mac;

        }
        else{

            deviceAllData.sync_session_backup.backup['interface']  = component.syncInterface.getValue();
            deviceAllData.sync_session_backup.backup.ip            = component.syncAddress.getValue();
            deviceAllData.sync_session_backup.backup.mac           = component.macAddress.getValue();

        }

        if(!component.useline.checkboxCmp.getValue()){

            delete deviceAllData.sync_session_backup.backup.interface2;
            delete deviceAllData.sync_session_backup.backup.ip2;
            delete deviceAllData.sync_session_backup.backup.mac2;

        }
        else{

            deviceAllData.sync_session_backup.backup.interface2 = component._syncInterface.getValue();
            deviceAllData.sync_session_backup.backup.ip2           = component._syncAddress.getValue();
            deviceAllData.sync_session_backup.backup.mac2          = component._macAddress.getValue();

        }

        deviceAllData.sync_session_backup.backup.act           = {};
        deviceAllData.sync_session_backup.backup.act['@mode']  = 'master';

        return true;
    }

});