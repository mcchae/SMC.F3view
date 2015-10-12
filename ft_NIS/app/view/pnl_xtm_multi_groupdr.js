
Ext.define('SMC.view.pnl_xtm_multi_groupdr', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_multi_groupdr',

    requires: [
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.View'
    ],

    height: 680,
    id: 'pnl_xtm_multi_groupdr',
    width: 800,
    bodyPadding: 10,
    title: 'IPSEC 그룹 설정',

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
                    height: 200,
                    itemId: 'fds_vpnmulti_autodr',
                    checkboxToggle: true,
                    title: 'DR 자동화 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_vpnmulti_groupdr',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'bt_mod',
                                    width: 100,
                                    text: '그룹 수정',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_modClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_vpnbranch_group',
                            margin: '0, 0, 10, 0',
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return '그룹 ' + (rowIndex + 1);
                                    },
                                    dataIndex: 'name',
                                    text: '그룹',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'timeout',
                                    text: '결정 시간',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // primary renderer ==============================================================================================================================================================
                                        //
                                        // 일시 : 2014.10.21
                                        //
                                        // 설명 : 그룹에 설정된 Primary IP를 컬럼에 출력합니다.
                                        //
                                        // ===============================================================================================================================================================================

                                        var primaryStr = '';

                                        if(value){

                                            if(!value.ip.length){

                                                return value.ip['#text'];

                                            }
                                            else{

                                                Ext.each(value.ip, function(primaryData, idx){

                                                    primaryStr += primaryData['#text'] + ',';

                                                });

                                                return primaryStr.substring(0, primaryStr.length - 1);

                                            }

                                        }

                                        return value;
                                    },
                                    dataIndex: 'primary',
                                    text: 'Primary IP',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // backup renderer ===============================================================================================================================================================
                                        //
                                        // 일시 : 2014.10.21
                                        //
                                        // 설명 : 그룹에 설정된 Backup IP를 컬럼에 출력합니다.
                                        //
                                        // ===============================================================================================================================================================================

                                        var backupStr = '';

                                        if(value){

                                            if(!value.ip.length){

                                                return value.ip['#text'];

                                            }
                                            else{

                                                Ext.each(value.ip, function(backupData, idx){

                                                    backupStr += backupData['#text'] + ',';

                                                });

                                                return backupStr.substring(0, backupStr.length - 1);

                                            }

                                        }

                                        return value;
                                    },
                                    dataIndex: 'backup',
                                    text: 'Backup IP',
                                    flex: 1
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@chk_use',
                                    text: '사용',
                                    flex: 0.5
                                }
                            ],
                            listeners: {
                                render: {
                                    fn: me.onGpn_vpnbranch_groupRender,
                                    scope: me
                                },
                                itemdblclick: {
                                    fn: me.onGpn_vpnbranch_groupItemDblClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_multi_groupdrAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_multi_groupdrBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_modClick: function(button, e, eOpts) {
        // onBt_modClick =================================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 DR을 수정할 수 있는 윈도우 창을 생성합니다.
        //
        // ===============================================================================================================================================================================

        var gpn_groupdr = button.up().up().down('[itemId=gpn_vpnbranch_group]');

        var selectRecord = gpn_groupdr.getSelectionModel().getSelection()[0];

        this.showGroupDrSetting(selectRecord);
    },

    onGpn_vpnbranch_groupRender: function(component, eOpts) {
        // onGpn_vpnbranch_groupRender ===================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그리드에 연결할 일회성 스토어를 생성하여 그리드와 Bind 합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_vpnmulti_grouplist',
            fields: [
                {
                    name : '@num'
                },
                {
                    name : '@chk_use'
                },
                {
                    name : 'backup'
                },
                {
                    name : 'primary'
                },
                {
                    name : 'timeout'
                }
            ]

        }));
    },

    onGpn_vpnbranch_groupItemDblClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_vpnbranch_groupItemDblClick =============================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 DR 데이터를 설정할 수 있는 윈도우를 생성합니다.
        //
        // ===============================================================================================================================================================================

        this.showGroupDrSetting(record);
    },

    onPnl_xtm_multi_groupdrAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_groupdrAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 장비 일괄변경의 DR GROUP을 설정합니다.
        //
        // ==============================================================================================================================================================================

        var groupdrStore = Ext.getStore('st_vpnmulti_grouplist');

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        var fds_multpdr = this.down('[itemId=fds_vpnmulti_autodr]');

        fds_multpdr.checkboxCmp.setValue(false);

        // 필드셋 체크박스 이벤트 설정 ======================================================================================================================================================

        fds_multpdr.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'ipsec_groupdr', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'ipsec_groupdr', false);

            }

        });

        // 그룹 DR 데이터 초기화 ===========================================================================================================================================================
        //
        // 설명 : 그룹 DR 데이터는 apply_target 의 여부와 관계없이 초기화가 되어야 합니다.
        //
        // ==============================================================================================================================================================================

        if(wndInstance.vpn_script.head_office_backup_group){

            Ext.each(wndInstance.vpn_script.head_office_backup_group.head_office_backup, function(groupdrData, idx){

                groupdrData['@chk_use'] = (groupdrData['@chk_use'] === 'on') ? true : false;

                groupdrStore.add(groupdrData);

            });

        }

        if(getApplyTarget(wndInstance.apply_target, 'ipsec_groupdr')){

            if(wndInstance){

                fds_multpdr.checkboxCmp.setValue(true);

            }

        }
    },

    onPnl_xtm_multi_groupdrBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multi_groupdrBeforeClose ============================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 그룹 DR 화면이 종료될 때 데이터를 저장하고 화면 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_multiset');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    showGroupDrSetting: function(groupData) {
        // showGroupDrSetting ===========================================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 그룹 DR을 설정할 수 있는 모달 윈도우를 생성합니다. ※ 참고 - 그룹DR을 지정하는 윈도우는 VPN 지점의 그룹DR을 설정하는 윈도우와 동일합니다.
        //
        // ==============================================================================================================================================================================

        var groupGridObj = this.down('[itemId=fds_vpnmulti_autodr]').down('[itemId=gpn_vpnbranch_group]');

        Ext.create('widget.win_xtm_vpn_branch_office', {

            'groupRecord' : groupData,
            'groupGridObj' : groupGridObj

        }).show();
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.11.03
        //
        // 설명 : 일괄수정 Group DR 데이터를 저장합니다.
        //
        // =============================================================================================================================================================================

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        var groupdrStore = Ext.getStore('st_vpnmulti_grouplist');

        // 그룹 저장 ====================================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'ipsec_groupdr')){

            var groupdrArray = [];

            for(var i = 0; i < groupdrStore.count(); i++){

                var groupdrData = groupdrStore.getAt(i).data;

                groupdrData['@chk_use'] = (groupdrData['@chk_use'] === true) ? 'on' : 'off';

                groupdrArray.push(groupdrData);

            }

            wndInstance.vpn_script.head_office_backup_group.head_office_backup = groupdrArray;

        }

        return true;
    }

});