
Ext.define('SMC.view.pnl_xtm_multi_basic_access', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_multi_basic_access',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox'
    ],

    height: 680,
    id: 'pnl_xtm_multi_basic_access',
    width: 800,
    layout: 'anchor',
    bodyPadding: 10,
    title: '접근 설정',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multiaccess_setting',
                    margin: '',
                    checkboxToggle: true,
                    title: '접근 설정',
                    items: [
                        {
                            xtype: 'combobox',
                            anchor: '35%',
                            itemId: 'cmb_manager',
                            margin: '0, 0, 10, 0',
                            width: 300,
                            fieldLabel: '관리자 접속 허용 개수',
                            labelWidth: 150,
                            value: 5,
                            editable: false,
                            queryMode: 'local',
                            store: [
                                1,
                                2,
                                3,
                                4,
                                5,
                                6
                            ]
                        },
                        {
                            xtype: 'combobox',
                            anchor: '35%',
                            itemId: 'cmb_authlimit',
                            margin: '0, 0, 10, 0',
                            fieldLabel: '관리자 인증시도 한계값',
                            labelWidth: 150,
                            value: 5,
                            editable: false,
                            queryMode: 'local',
                            store: [
                                3,
                                4,
                                5
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_multi_basic_accessAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_multi_basic_accessBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_xtm_multi_basic_accessAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_basic_accessAfterRender ========================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄편집 접근설정을 임시 저장한 데이터를 컴포넌트에 설정합니다.
        //
        // ================================================================================================================================================================================

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        this.down('[itemId=fds_multiaccess_setting]').checkboxCmp.setValue(false);

        this.down('[itemId=fds_multiaccess_setting]').checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'access_set', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'access_set', false);

            }

        });

        if(getApplyTarget(wndInstance.apply_target, 'access_set')){

            this.down('[itemId=fds_multiaccess_setting]').checkboxCmp.setValue(true);

            this.down('[itemId=fds_multiaccess_setting]').down('[itemId=cmb_manager]').setValue(wndInstance.system_user_access.access.user);
            this.down('[itemId=fds_multiaccess_setting]').down('[itemId=cmb_authlimit]').setValue(wndInstance.system_user_access.access.limit);

        }
    },

    onPnl_xtm_multi_basic_accessBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multi_basicBeforeClose ==============================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : innerView 가 종료될 때 메인 뷰의 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_multiset');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    saveData: function() {
        // saveData ======================================================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄 편집 접근 설정 데이터를 임시 저장합니다.
        //
        // ===============================================================================================================================================================================

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        if(getApplyTarget(wndInstance.apply_target, 'access_set')){

            wndInstance.system_user_access.access.user = this.down('[itemId=fds_multiaccess_setting]').down('[itemId=cmb_manager]').getValue();
            wndInstance.system_user_access.access.limit = this.down('[itemId=fds_multiaccess_setting]').down('[itemId=cmb_authlimit]').getValue();

        }

        return true;
    }

});