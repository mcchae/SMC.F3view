
Ext.define('SMC.view.pnl_xtm_vpn_option', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_vpn_option',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.form.Label'
    ],

    height: 680,
    id: 'pnl_xtm_vpn_option',
    width: 800,
    overflowY: 'auto',
    layout: 'anchor',
    bodyPadding: 10,
    title: '기타 설정',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_vpnop_setting',
                    title: '기타 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_standbyset',
                            margin: '10, 0, 10, 0',
                            fieldLabel: '',
                            boxLabel: 'Active - Active 구성에서 Standby 장비로 설정'
                        },
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            itemId: 'ck_esp',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '',
                            boxLabel: 'ESP 패킷을 강제로 UDP 4500번 형태의 패킷으로 전송하는 기능'
                        },
                        {
                            xtype: 'checkboxfield',
                            flex: 1,
                            itemId: 'ck_vpnlog',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '',
                            boxLabel: 'VPN 한글 로그 사용'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_vpnop_xauth',
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
                                    margin: '0, 20, 0, 0',
                                    width: 250,
                                    fieldLabel: 'XAuth IP Pool',
                                    value: '0.0.0.0',
                                    enableKeyEvents: true,
                                    listeners: {
                                        blur: {
                                            fn: me.onTxf_ipBlur,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 20, 0, 0',
                                    text: '/'
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
                                    itemId: 'txf_netmask',
                                    margin: '0, 20, 0, 0',
                                    width: 150,
                                    fieldLabel: '',
                                    value: '0.0.0.0',
                                    enableKeyEvents: true,
                                    listeners: {
                                        blur: {
                                            fn: me.onTxf_netmaskBlur,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '※ 네트워크주소 / 넷마스크'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_vpn_optionAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_vpn_optionBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTxf_ipBlur: function(component, e, eOpts) {
        if(component.getValue() === '')
            component.setValue('0.0.0.0');
    },

    onTxf_netmaskBlur: function(component, e, eOpts) {
        if(component.getValue() === '')
            component.setValue('0.0.0.0');
    },

    onPnl_xtm_vpn_optionAfterRender: function(component, eOpts) {
        // onPnl_xtm_vpn_optionAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.06.11
        //
        // 설명 : IPSec의 기타정보를 컴포넌트에 설정합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                componentObj.standbyset.setValue((deviceData.vpn_standby['@chk_use'] === 'on') ? true : false);
                componentObj.esp.setValue((deviceData.vpn_force_udp_decaps['@chk_use'] === 'on') ? true : false);
                componentObj.vpnlog.setValue((deviceData.vpn_han_log['@chk_use'] === 'on') ? true : false);

                componentObj.ip.setValue(deviceData.vpn_xauth_pool_ip);
                componentObj.netmask.setValue(deviceData.vpn_xauth_pool_mask);

            }

        }
        catch(err){

            console.log('VPN 옵션 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_vpn_optionBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_setting = this.down('[itemId=fds_vpnop_setting]');

        var ctn_xauth   = fds_setting.down('[itemId=ctn_vpnop_xauth]');

        var standbyset  = fds_setting.down('[itemId=ck_standbyset]');
        var esp         = fds_setting.down('[itemId=ck_esp]');
        var vpnlog      = fds_setting.down('[itemId=ck_vpnlog]');

        var ip          = ctn_xauth.down('[itemId=txf_ip]');
        var netmask     = ctn_xauth.down('[itemId=txf_netmask]');

        return function(){

            obj.standbyset = standbyset;
            obj.esp        = esp;
            obj.vpnlog     = vpnlog;
            obj.ip         = ip;
            obj.netmask    = netmask;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ==============================================================================================================================================================
        //
        // 일시 : 2014.07.07
        //
        // 설명 : VPN 기타정보의 유효성을 검사합니다.
        //
        // - IP 체크 검사사사
        //
        // ============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            etcValidCheck : function(){

                if(!component.ip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.netmask.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크 형식에 맞지 않습니다.',
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
        // saveData =======================================================================================================================
        //
        // 일시 : 2014.06.11
        //
        // 설명 : IPSec 기타설정 데이터를 저장합니다. 사용되는 파라미터는 vpn_force_udp_decaps, vpn_han_log, vpn_standby, vpn_xauth_pool_ip, vpn_xauth_pool_mask 입니다.
        //
        // ================================================================================================================================

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(!this.validityCheck().etcValidCheck()){

            return false;

        }

        var component = this.componentStorage();

        deviceAllData.vpn_script.vpn_standby['@chk_use']          = (component.standbyset.getValue() === true) ? 'on' : 'off';
        deviceAllData.vpn_script.vpn_force_udp_decaps['@chk_use'] = (component.esp.getValue() === true) ? 'on' : 'off';
        deviceAllData.vpn_script.vpn_han_log['@chk_use']          = (component.vpnlog.getValue() === true) ? 'on' : 'off';

        deviceAllData.vpn_script.vpn_xauth_pool_ip                = component.ip.getValue();
        deviceAllData.vpn_script.vpn_xauth_pool_mask              = component.netmask.getValue();

        return true;
    }

});