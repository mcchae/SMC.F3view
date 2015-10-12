
Ext.define('SMC.view.pnl_xtm_vpn_ipsec', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_vpn_ipsec',

    requires: [
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.View',
        'Ext.button.Button',
        'Ext.form.field.Text'
    ],

    height: 680,
    id: 'pnl_xtm_vpn_ipsec',
    width: 800,
    bodyPadding: 10,
    title: 'IPSEC VPN 기본 설정',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    flex: 0.7,
                    itemId: 'fds_vpn_ipsec',
                    margin: '0, 10, 0, 0',
                    title: 'IPSec',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_ipsec_set',
                            title: '',
                            store: 'st_vpn_ipset',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'interface',
                                    text: '인터페이스',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: 'useipsec',
                                    text: 'IPSEC 사용',
                                    flex: 1,
                                    listeners: {
                                        checkchange: {
                                            fn: me.onCheckcolumnCheckChange,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            viewConfig: {
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    if(record.data['interface'] === 'eth0'){

                                        return 'disabled-row';

                                    }
                                },
                                margin: '0, 0, 10, 0',
                                loadMask: true
                            },
                            listeners: {
                                selectionchange: {
                                    fn: me.onGpn_ipsec_setSelectionChange,
                                    scope: me
                                },
                                beforeselect: {
                                    fn: me.onGpn_ipsec_setBeforeSelect,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ipsec_control',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '초 기 화',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick2,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_vpn_policy',
                    margin: '0, 0, 0, 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_vpn_host',
                            margin: '30, 0, 50, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 0.8,
                                    itemId: 'txf_host',
                                    margin: '0, 10, 0, 0',
                                    width: 330,
                                    fieldLabel: '보안 호스트',
                                    labelWidth: 120,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_hostFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '삭 제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_vpn_list',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 0.8,
                                    itemId: 'txf_list',
                                    margin: '0, 10, 0, 0',
                                    width: 330,
                                    fieldLabel: 'IPSec 장비 리스트',
                                    labelWidth: 120,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_listFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_clear',
                                    width: 100,
                                    text: '삭 제',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_clearClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_vpn_ipsecAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_vpn_ipsecBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var ipsecStore = Ext.getStore('st_vpn_ipset');

        if(rowIndex === 0){

            Ext.Msg.show({

                title : 'IPSec 사용 체크 에러',
                msg : '인터페이스0 은 IPSec을 사용할 수 없습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            ipsecStore.getAt(0).set({	'useipsec' : false    });

            return false;
        }
    },

    onGpn_ipsec_setSelectionChange: function(model, selected, eOpts) {
        if (selected.length > 0) {

            Ext.Array.each(selected, function (record) {

                if (record.data['interface'] === 'eth0') {

                    model.deselect(record, true);

                }

            });

        }
    },

    onGpn_ipsec_setBeforeSelect: function(rowmodel, record, index, eOpts) {
        if(record.data['interface'] === 'eth0')
            return false;
    },

    onBt_clearClick2: function(button, e, eOpts) {
        var ipsecStore   = Ext.getStore('st_vpn_ipset');

        for(var i = 0; i < ipsecStore.count(); i++){

            ipsecStore.getAt(i).set({	'useipsec' : false	});

        }

        ipsecStore.sync();
    },

    onTxf_hostFocus: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_ipsec_host',
            'policyKey'     : 'ipsec_host',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick: function(button, e, eOpts) {
        // onBt_clearClick ===============================================================================================================================================================
        //
        //
        //
        //
        // ===============================================================================================================================================================================

        /*

        IPSec 정책 저장 - 순위는 변경되지 않는다.

            [
                0	{	'key' : 'ipsec_gatelist' , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	},
                1	{	'key' : 'ipsec_host'     , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	},
                2	{	'key' : 'ssl_user'       , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	}
            ]

        */

        var vpnStore     = Ext.getStore('st_vpn_policy');

        var policyFd = button.up().down('[itemId=txf_host]');

        vpnStore.getAt(1).set({	'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	});

        policyFd.setValue("");
    },

    onTxf_listFocus: function(component, e, eOpts) {
        Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Policy',
            'gtype'         : 'obj_ipsec_peer',
            'policyKey'     : 'ipsec_peer',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick1: function(button, e, eOpts) {
        /*

        IPSec에 관련된 데이터

            [0]	vpn_setting
            [1] vpninfo

        IPSec 정책 저장 - 순위는 변경되지 않는다.

            [
                0	{	'key' : 'ipsec_gatelist' , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	},
                1	{	'key' : 'ipsec_host'     , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	},
                2	{	'key' : 'ssl_user'       , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	}
            ]

        */

        var vpnStore     = Ext.getStore('st_vpn_policy');

        var policyFd = button.up().down('[itemId=txf_list]');

        vpnStore.getAt(0).set({	'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	});

        policyFd.setValue("");
    },

    onPnl_xtm_vpn_ipsecAfterRender: function(component, eOpts) {
        // onPnl_xtm_vpn_ipsecAfterRender ===============================================================================================================================================
        //
        // 설명 : IPSec 데이터 초기화를 인터페이스 리스트와 컴포넌트에 설정합니다.
        //
        // 수정 :
        //
        // - (2014.07.09 김민수) - Destroy 이벤트에서 cloase 이벤트로 변경
        //
        // ==============================================================================================================================================================================

        /*

        IPSec에 관련된 데이터

            [0]	vpn_setting
            [1] vpninfo

        IPSec 정책 저장 - 순위는 변경되지 않습니다..

            [
                0	{	'key' : 'ipsec_peer'   , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	},
                1	{	'key' : 'ipsec_host'   , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	},
                2	{	'key' : 'ssl_user'     , 'value' : {	'#text' : 'Any', '@cid' : '00000000000000000000000000000000'	}	}
            ]

        */

        // ==============================================================================================================================================================================

        var ipsecStore   = Ext.getStore('st_vpn_ipset');
        var vpnStore     = Ext.getStore('st_vpn_policy');
        var ethAllStore  = Ext.getStore('st_common_alleth');

        var componentObj = this.componentStorage();

        this.on('setPolicy', this.setPolicyData);

        this.initStore();

        var deviceData  = component.deviceParams;

        // IPSec use check ==============================================================================================================================================================

        try{

            for(var i = 0; i < ethAllStore.count(); i++){

                ipsecStore.add({	'interface' : ethAllStore.getAt(i).get('eth'), 'useipsec' : false		});

            }

            if(deviceData[0]){

                Ext.each(deviceData[0]['interface'], function(ipsecData, idx){

                    try{

                        if(ethAllStore.count() >= idx){

                            ipsecStore.getAt(idx).set({		'useipsec' : (ipsecData.setting['@chk_ipsec'] === "on") ? true : false		});

                        }

                    }
                    catch(err){

                        console.log('IPSec 인덱스 범위를 벗어난 설정이 감지되었습니다. 자동으로 제외합니다.');

                    }

                });

                ipsecStore.sync();

            }

        // Policy Check =================================================================================================================================================================

            vpnStore.getAt(0).set({	'value' : {	'#text' : deviceData[1].ipsec_peer['#text'], '@cid' : deviceData[1].ipsec_peer['@cid']}	});
            componentObj.policylist.setValue((deviceData[1].ipsec_peer['#text'] === 'Any') ? '' : deviceData[1].ipsec_peer['#text']);
            componentObj.policylist.policyCid = deviceData[1].ipsec_peer['@cid'];

            vpnStore.getAt(1).set({	'value' : {	'#text' : deviceData[1].ipsec_host['#text']    , '@cid' : deviceData[1].ipsec_host['@cid']}		});
            componentObj.policyhost.setValue((deviceData[1].ipsec_host['#text'] === 'Any') ? '' : deviceData[1].ipsec_host['#text']);
            componentObj.policyhost.policyCid = deviceData[1].ipsec_host['@cid'];

        }
        catch(err){

            console.log('IPSec 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_vpn_ipsecBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_ipsec  = this.down('[itemId=fds_vpn_ipsec]');

        var ctn_policy = this.down('[itemId=ctn_vpn_policy]');
        var ctn_host   = ctn_policy.down('[itemId=ctn_vpn_host]');
        var ctn_list   = ctn_policy.down('[itemId=ctn_vpn_list]');

        var ipsecgrid  = fds_ipsec.down('[itemId=gpn_ipsec_set]');
        var ipsecclear = fds_ipsec.down('[itemId=bt_clear]');

        var policyhost = ctn_host.down('[itemId=txf_host]');
        var hostclear  = ctn_host.down('[itemId=bt_clear]');

        var policylist = ctn_list.down('[itemId=txf_list]');
        var listclear  = ctn_list.down('[itemId=bt_clear]');

        return function(){

            obj.fds_ipsec  = fds_ipsec;

            obj.ctn_policy = ctn_policy;
            obj.ctn_host   = ctn_host;
            obj.ctn_list   = ctn_list;

            obj.ipsecgrid  = ipsecgrid;
            obj.ipsecclear = ipsecclear;

            obj.policyhost = policyhost;
            obj.hostclear  = hostclear;
            obj.policylist = policylist;
            obj.listclear  = listclear;

            return obj;

        }();
    },

    setPolicyData: function(component, policyKey, policyData) {
        var policyTmp = Ext.getStore('st_vpn_policy');

        for(var i = 0; i < policyTmp.count(); i++){

            if(policyKey === policyTmp.getAt(i).get('key')){

                policyTmp.getAt(i).set({	'value' : policyData    });

                break;

            }

        }

        if(component.getXType() === 'textfield'){

            component.setValue(policyData.name);
            component.policyCid = policyData['@cid'];

        }
    },

    saveData: function() {
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.07.10
        //
        // 설명 : VPN 기본 설정을 저장합니다.
        //
        // 수정 : (김민수 2014.07.10) - IPSec 장비리스트 정책이 저장 안되는 버그 수정
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var ipsecFlag = false;

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var ipsetStore = Ext.getStore('st_vpn_ipset');
        var vpnPolicyStore = Ext.getStore('st_vpn_policy');

        // 인터페이스 상태 저장 ============================================================================================================================================================

        delete deviceAllData.vpn_setting;

        for(var i = 0; i < ipsetStore.count(); i++){

            if(ipsetStore.getAt(i).get('useipsec') === true){

                ipsecFlag = true;

                break;
            }

        }

        deviceAllData.vpn_setting = {};

        if(ipsecFlag){

            deviceAllData.vpn_setting['interface'] = [];

            for(var i = 0; i < ipsetStore.count(); i++){

                var ipsecTmp     = {};

                ipsecTmp.name    = ipsetStore.getAt(i).get('interface');
                ipsecTmp.setting = {};

                ipsecTmp.setting['@chk_ipsec'] = (ipsetStore.getAt(i).get('useipsec') === true) ? "on" : "off";

                deviceAllData.vpn_setting['interface'].push(ipsecTmp);

            }

        }

        ipsetStore.sync();

        // 정책 저장 =====================================================================================================================================================================

        var peerPolicy = vpnPolicyStore.getAt(0).get('value');
        var hostPolicy = vpnPolicyStore.getAt(1).get('value');
        var peerObj    = {};
        var hostObj    = {};

        peerObj['#text'] = (peerPolicy.name === undefined) ? peerPolicy['#text'] : peerPolicy.name;
        peerObj['@cid']  = peerPolicy['@cid'];

        hostObj['#text']     = (hostPolicy.name === undefined) ? hostPolicy['#text'] : hostPolicy.name;
        hostObj['@cid']      = hostPolicy['@cid'];

        deviceAllData.vpninfo.ipsec_peer = peerObj;
        deviceAllData.vpninfo.ipsec_host = hostObj;

        return true;
    },

    initStore: function() {
        var ipsecStore  = Ext.getStore('st_vpn_ipset');

        ipsecStore.removeAll();
    }

});