
Ext.define('SMC.view.pnl_xtm_multi_report', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_multi_report',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.CheckboxGroup'
    ],

    height: 680,
    id: 'pnl_xtm_multi_report',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '일일리포팅 설정',

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
                    flex: 1,
                    itemId: 'fds_multi_logreport',
                    checkboxToggle: true,
                    title: '일일리포팅 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_report_usereport',
                            margin: '10, 0, 10, 0',
                            width: 400,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_use',
                                    margin: '0, 150, 0, 0',
                                    boxLabel: '일일 리포팅 사용'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_createreport',
                                    margin: '0, 10, 0, 0',
                                    width: 300,
                                    fieldLabel: '일일 리포팅 생성 시간 설정',
                                    labelWidth: 200,
                                    value: 1,
                                    editable: false,
                                    store: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6,
                                        7,
                                        8,
                                        9,
                                        10,
                                        11,
                                        12,
                                        13,
                                        14,
                                        15,
                                        16,
                                        17,
                                        18,
                                        19,
                                        20,
                                        21,
                                        22,
                                        23,
                                        24
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: '시'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'fds_report_fw',
                            layout: 'fit',
                            title: '방화벽',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    itemId: 'ckg_report_fw',
                                    margin: '10, 0, 10, 0',
                                    fieldLabel: '',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_user',
                                            width: 200,
                                            labelWidth: 200,
                                            boxLabel: '사용자별 Top10'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_destination',
                                            width: 200,
                                            labelWidth: 200,
                                            boxLabel: '목적지별 Top10'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_service',
                                            width: 200,
                                            fieldLabel: '',
                                            boxLabel: '서비스별 Top10'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_protocol',
                                            fieldLabel: '',
                                            boxLabel: '프로토콜별 Top10'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'fds_report_dpi',
                            layout: 'fit',
                            title: 'DPI',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    itemId: 'ckg_report_dpi',
                                    margin: '10, 0, 10, 0',
                                    fieldLabel: '',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_attack',
                                            width: 200,
                                            boxLabel: '공격자별 Top10'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_attackdest',
                                            width: 200,
                                            boxLabel: '공격 목적지별 Top10'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_attacktype',
                                            width: 200,
                                            fieldLabel: '',
                                            boxLabel: '공격 유형별 Top10'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_attackflow',
                                            fieldLabel: '',
                                            boxLabel: '공격 Flow별 Top10'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'fds_report_system',
                            layout: 'fit',
                            title: 'System',
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    itemId: 'ckg_report_system',
                                    margin: '10, 0, 10, 0',
                                    fieldLabel: '',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_interface',
                                            width: 200,
                                            boxLabel: '인터페이스별'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_resource',
                                            width: 200,
                                            boxLabel: 'CPU, Hdd, Memory, Session'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_policy',
                                            width: 200,
                                            fieldLabel: '',
                                            boxLabel: 'Hit Policy Rule'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_serious',
                                            fieldLabel: '',
                                            boxLabel: 'Serious Log'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'fds_report_url',
                            title: 'URL',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    flex: 1,
                                    itemId: 'ckg_report_url',
                                    margin: '10, 0, 10, 0',
                                    width: 400,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_alluser',
                                            width: 200,
                                            boxLabel: 'URL 전체 사용자별 Top 10'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_domainurl',
                                            boxLabel: 'URL 도메인별 Top 10'
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
                    fn: me.onPnl_xtm_multi_reportAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_multi_logBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_xtm_multi_reportAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_reportAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.10.30
        //
        // 설명 : 일괄편집의 일일리포팅 데이터를 컴포넌트에 설정합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 필드셋 체크박스 이벤트 설정 =======================================================================================================================================================

        componentObj.fds_level.checkboxCmp.on('change', function(cd, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'log_level', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'log_level', false);

            }

        });

        // 데이터 임시 저장 ================================================================================================================================================================
    },

    onPnl_xtm_multi_logBeforeClose: function(panel, eOpts) {
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

    componentStorage: function() {
        var obj = {};

        var fds_report = this.down('[itemId=fds_multi_logreport]');

        obj.fds_report = fds_report;



        return obj;
    },

    saveData: function() {
        return true;
    }

});