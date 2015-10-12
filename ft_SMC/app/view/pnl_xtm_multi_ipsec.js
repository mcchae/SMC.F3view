
Ext.define('SMC.view.pnl_xtm_multi_ipsec', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_multi_ipsec',

    requires: [
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.View'
    ],

    height: 680,
    id: 'pnl_xtm_multi_ipsec',
    width: 800,
    bodyPadding: 10,
    title: 'IPSEC',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_multi_ipsecAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_multi_ipsecBeforeClose,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'fieldset',
                    height: 200,
                    itemId: 'fds_vpnbranch_autodr',
                    title: 'DR 자동화 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_vpnbranch_group',
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
            ]
        });

        me.callParent(arguments);
    },

    onPnl_xtm_multi_ipsecAfterRender: function(component, eOpts) {
        // // onPnl_xtm_multi_ipsecAfterRender ==========================================================================================================================================
        // //
        // // 일시 : 2014.09.03
        // //
        // // 설명 : 일괄 편집 데이터를 저장합니다.
        // //
        // // ===========================================================================================================================================================================

        // var componentObj = this.componentStorage();

        // this.initStore();

        // var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // // Auto DR 체크박스 이벤트 설정 =================================================================================================================================================

        // componentObj.fds_autodr1.checkboxCmp.on('change', function(cb, newValue){

        //     if(newValue){

        //         wndInstance.apply_Target.apply_ipsec_groupdr1 = true;

        //     }
        //     else{

        //         Ext.getStore('st_multiipsec_primary_dr1').removeAll();
        //         Ext.getStore('st_multiipsec_backup_dr1').removeAll();

        //         wndInstance.apply_Target.apply_ipsec_groupdr1 = false;

        //     }

        // });

        // componentObj.fds_autodr2.checkboxCmp.on('change', function(cb, newValue){

        //     if(newValue){

        //         wndInstance.apply_Target.apply_ipsec_groupdr2 = true;

        //     }
        //     else{

        //         Ext.getStore('st_multiipsec_primary_dr2').removeAll();
        //         Ext.getStore('st_multiipsec_backup_dr2').removeAll();

        //         wndInstance.apply_Target.apply_ipsec_groupdr2 = false;

        //     }

        // });

        // componentObj.fds_autodr3.checkboxCmp.on('change', function(cb, newValue){

        //     if(newValue){

        //         wndInstance.apply_Target.apply_ipsec_groupdr3 = true;

        //     }
        //     else{

        //         Ext.getStore('st_multiipsec_primary_dr3').removeAll();
        //         Ext.getStore('st_multiipsec_backup_dr3').removeAll();

        //         wndInstance.apply_Target.apply_ipsec_groupdr3 = false;

        //     }

        // });

        // componentObj.fds_autodr4.checkboxCmp.on('change', function(cb, newValue){

        //     if(newValue){

        //         wndInstance.apply_Target.apply_ipsec_groupdr4 = true;

        //     }
        //     else{

        //         Ext.getStore('st_multiipsec_primary_dr4').removeAll();
        //         Ext.getStore('st_multiipsec_backup_dr4').removeAll();

        //         wndInstance.apply_Target.apply_ipsec_groupdr4 = false;

        //     }

        // });

        // // 데이터 초기화 =================================================================================================================================================================

        // if(wndInstance.apply_Target.apply_ipsec_groupdr1){

        //     Ext.getStore('st_multiipsec_primary_dr1').add();
        //     Ext.getStore('st_multiipsec_backup_dr1').add();

        // }

        // if(wndInstance.apply_Target.apply_ipsec_groupdr2){

        //     Ext.getStore('st_multiipsec_primary_dr2').add();
        //     Ext.getStore('st_multiipsec_backup_dr2').add();

        // }

        // if(wndInstance.apply_Target.apply_ipsec_groupdr3){

        //     Ext.getStore('st_multiipsec_primary_dr3').add();
        //     Ext.getStore('st_multiipsec_backup_dr3').add();

        // }

        // if(wndInstance.apply_Target.apply_ipsec_groupdr4){

        //     Ext.getStore('st_multiipsec_primary_dr4').add();
        //     Ext.getStore('st_multiipsec_backup_dr4').add();

        // }
    },

    onPnl_xtm_multi_ipsecBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multi_ipsecBeforeClose ==============================================================================================================================================
        //
        // 일시 : 2014.09.03
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

            storeId : 'st_multi_grouplist',
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

    validityCheck: function() {

    },

    saveData: function() {
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄 편집 IPSEC 데이터를 임시 저장합니다.
        //
        // ==============================================================================================================================================================================



        return true;
    }

});