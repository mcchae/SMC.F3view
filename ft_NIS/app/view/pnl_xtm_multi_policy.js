
Ext.define('SMC.view.pnl_xtm_multi_policy', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_multi_policy',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 680,
    id: 'pnl_xtm_multi_policy',
    width: 800,
    bodyPadding: 10,
    title: '보안 설정',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_policy_highpolicy1',
                    checkboxToggle: true,
                    title: 'IPv4 필터링 상위 정책 1순위',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_policy_v4filter1',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_filter',
                                    margin: '0, 10, 0, 0',
                                    width: 400,
                                    fieldLabel: 'IPv4 필터링 정책 1순위',
                                    labelWidth: 150,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_filterFocus1,
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
                                            fn: me.onBt_clearClick11,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_policy_highpolicy2',
                    checkboxToggle: true,
                    title: 'IPv4 필터링 상위 정책 2순위',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_policy_v4filter2',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_filter',
                                    margin: '0, 10, 0, 0',
                                    width: 400,
                                    fieldLabel: 'IPv4 필터링 정책 2순위',
                                    labelWidth: 150,
                                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_filterFocus121,
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
                                            fn: me.onBt_clearClick1121,
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
                    fn: me.onPnl_xtm_multipolicyAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_multipolicy_settingBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTxf_filterFocus1: function(component, e, eOpts) {
        // onTxf_filterFocus1 ===========================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 1순위를 적용합니다.
        //
        // ==============================================================================================================================================================================

        var returnValue = Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'gtype'         : 'obj_spd_ipv4_filter_1',
            'policyKey'     : 'spd_ipv4_filter_1',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick11: function(button, e, eOpts) {
        // onBt_clearClick11 =============================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 1순위를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_filter]');

        tmpStore.getAt(0).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        for(var i = 0; i < tmpStore.count(); i ++){

            console.log('policy list -> ', tmpStore.getAt(i).data);

        }

        policyFd.setValue("");
    },

    onTxf_filterFocus121: function(component, e, eOpts) {
        // onTxf_filterFocus12 ===========================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 2순위를 적용합니다.
        //
        // ===============================================================================================================================================================================

        var returnValue = Ext.create('widget.smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'gtype'         : 'obj_spd_ipv4_filter_2',
            'policyKey'     : 'spd_ipv4_filter_2',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick1121: function(button, e, eOpts) {
        // onBt_clearClick112 ============================================================================================================================================================
        //
        // 일시 : 2014.08.29
        //
        // 설명 : IPv4 필터링 정책 2순위를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var tmpStore = Ext.getStore('st_policy_storage');

        var policyFd = button.up().down('[itemId=txf_filter]');

        tmpStore.getAt(1).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        for(var i = 0; i < tmpStore.count(); i ++){

            console.log('policy list -> ', tmpStore.getAt(i).data);

        }

        policyFd.setValue("");
    },

    onPnl_xtm_multipolicyAfterRender: function(component, eOpts) {
        // onPnl_xtm_multipolicyAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : 일괄 편집에 사용하는 보안 정책 설정 화면입니다. ※ 주의 - 단일 장비의 보안 정책 설정과 같은 스토어를 사용합니다.
        //
        //
        /* 정책 스토어 인덱스

        [
            0  {	'key' : 'spd_ipv4_filter_1', 'value' : {}	},
            1  {	'key' : 'spd_ipv4_filter_2', 'value' : {}	}
        ]

        */
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        this.on('setPolicy', this.setPolicyData);

        var policyStore = Ext.getStore('st_policy_storage');

        componentObj.fds_highpolicy1.checkboxCmp.setValue(false);
        componentObj.fds_highpolicy2.checkboxCmp.setValue(false);

        // 필드셋 이벤트 추가 ==============================================================================================================================================================

        componentObj.fds_highpolicy1.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_1', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_1', false);

            }

        });

        componentObj.fds_highpolicy2.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_2', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_2', false);

            }

        });

        // 일괄편집 장비 데이터 ============================================================================================================================================================

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        if(getApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_1')){

            componentObj.fds_highpolicy1.checkboxCmp.setValue(true);

            if(wndInstance.spdinfo){

                try{

                    componentObj.ipv4_filter1.setValue((wndInstance.spdinfo.spd_ipv4_filter_1['#text'] === 'Any') ? '' : wndInstance.spdinfo.spd_ipv4_filter_1['#text']);
                    componentObj.ipv4_filter1.policyCid = wndInstance.spdinfo.spd_ipv4_filter_1['@cid'];

                    policyStore.getAt(0).set({	'value' : wndInstance.spdinfo.spd_ipv4_filter_1		});

                }
                catch(err){

                    console.log('IPv4 필터링 정책 1 초기화 중 catch 발생 : ', err);

                }

            }

        }

        if(getApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_2')){

            componentObj.fds_highpolicy2.checkboxCmp.setValue(true);

            if(wndInstance.spdinfo){

                try{
                    componentObj.ipv4_filter2.setValue((wndInstance.spdinfo.spd_ipv4_filter_2['#text'] === 'Any') ? '' : wndInstance.spdinfo.spd_ipv4_filter_2['#text']);
                    componentObj.ipv4_filter2.policyCid = wndInstance.spdinfo.spd_ipv4_filter_2['@cid'];

                    policyStore.getAt(1).set({	'value' : wndInstance.spdinfo.spd_ipv4_filter_2		});

                }
                catch(err){

                    console.log('IPv4 필터링 정책 2 초기화 중 catch 발생 : ', err);

                }

            }

        }
    },

    onPnl_xtm_multipolicy_settingBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multipolicy_settingBeforeClose =====================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : 화면이 종료될 때 데이터를 저장하고 상태를 변경합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_multiset');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj            = {};

        var fds_highpolicy1 = this.down('[itemId=fds_policy_highpolicy1]');
        var fds_highpolicy2 = this.down('[itemId=fds_policy_highpolicy2]');

        var ipv4_filter1   = fds_highpolicy1.down('[itemId=ctn_policy_v4filter1]').down('[itemId=txf_filter]');
        var ipv4_filter2   = fds_highpolicy2.down('[itemId=ctn_policy_v4filter2]').down('[itemId=txf_filter]');

        obj.fds_highpolicy1 = fds_highpolicy1;
        obj.fds_highpolicy2 = fds_highpolicy2;

        obj.ipv4_filter1 = ipv4_filter1;
        obj.ipv4_filter2 = ipv4_filter2;

        return obj;
    },

    setPolicyData: function(component, policyKey, policyData) {
        // setPolicyData ================================================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : 객체 혹은 정책을 선택한 후 후처리를 정의합니다.
        //
        // ==============================================================================================================================================================================

        var policyTmp = Ext.getStore('st_policy_storage');

        for(var i = 0; i < policyTmp.count(); i++){

            if(policyKey === policyTmp.getAt(i).get('key')){

                policyTmp.getAt(i).set({	'value' : policyData    });

                break;

            }

        }

        if(component.getXType() === 'textfield'){

            component.setValue(policyData.name);
            component.setValue(policyData['@cid']);

        }
    },

    saveData: function() {
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 장비 일괄 편집시 상위 정책 1, 2의 설정을 저장합니다.
        //
        /* 정책 스토어 인덱스

        [
            0  {	'key' : 'spd_ipv4_filter_1' , 'value' : {}	},
            1  {	'key' : 'spd_ipv4_filter_2' , 'value' : {}	}
        ]

        */
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var wndInstance  = Ext.getCmp('win_smc_device_multiset').deviceParam;

        var tmpPolicy    = Ext.getStore('st_policy_storage');

        // IPv4 필터링 정책 저장 ===========================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_1')){

            var v4Policy         = tmpPolicy.getAt(0).get('value');
            var v4PolicyObj      = {};

            v4PolicyObj['#text'] = (v4Policy.name === undefined) ? v4Policy['#text'] : v4Policy.name;
            v4PolicyObj['@cid']  = v4Policy['@cid'];

            wndInstance.spdinfo.spd_ipv4_filter_1 = v4PolicyObj;

        }

        if(getApplyTarget(wndInstance.apply_target, 'spdinfo_ipv4_filter_2')){

            var v4Policy2        = tmpPolicy.getAt(1).get('value');
            var v4PolicyObj2     = {};

            v4PolicyObj2['#text'] = (v4Policy2.name === undefined) ? v4Policy2['#text'] : v4Policy2.name;
            v4PolicyObj2['@cid']  = v4Policy2['@cid'];

            wndInstance.spdinfo.spd_ipv4_filter_2 = v4PolicyObj2;

        }

        // 스토어 초기화 ==================================================================================================================================================================
        //
        // 설명 : st_policy_storage 스토어는 장비의 모든 보안정책을 저장하는 스토어입니다. 이 스토어는 단일장비 추가, 수정의 보안설정에서도 사용하기 때문에 save 뒤에 기본 값으로 초기화 작업을 수행합니다. 기본 값은
        //
        //       any / 0000000000000000000000000000 입니다.
        //
        // ==============================================================================================================================================================================

        tmpPolicy.getAt(0).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});
        tmpPolicy.getAt(1).set({	'value' : {	'#text': 'Any', '@cid': '00000000000000000000000000000000' }	});

        return true;
    }

});