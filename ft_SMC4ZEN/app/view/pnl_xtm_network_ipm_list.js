
Ext.define('SMC4ZEN.view.pnl_xtm_network_ipm_list', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_network_ipm_listViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'pnl_xtm_network_ipm_list'
    },
    height: 680,
    id: 'pnl_xtm_network_ipm_list',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: 'IP 관리 상태',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_ipm_list',
            title: 'IP 관리 상태',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_ipm_search',
                    margin: '10, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_dev',
                            margin: '0, 10, 0, 0',
                            width: 250,
                            fieldLabel: '인터페이스 선택',
                            editable: false,
                            displayField: 'eth',
                            queryMode: 'local',
                            store: 'st_iplist_deveth',
                            valueField: 'eth',
                            listeners: {
                                change: 'onCmb_devChange'
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_ipm_excel',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'bt_export',
                                    width: 110,
                                    text: '엑셀 파일로 출력',
                                    listeners: {
                                        click: 'onBt_exportClick'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_ipm_stat',
                    title: '',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: 'Policy'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'number',
                            text: 'Interface'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'date',
                            text: 'IP'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bool',
                            text: 'Mac'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bool',
                            text: 'Status'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bool',
                            text: 'Last Hit Time'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bool',
                            text: 'Config'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_network_ipm_listAfterRender'
    },

    onCmb_devChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_devChange ===========================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : 선택된 인터페이스에 맞는 IP 관리 정보를 조회합니다.
        //
        // ===========================================================================================================================================================================

        this.loadIpState(this.deviceParams, newValue);
    },

    onBt_exportClick: function(button, e, eOpts) {

    },

    onPnl_xtm_network_ipm_listAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_ipm_listAfterRender =========================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : IP 관리 조회 화면의 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        // 스토어 초기화 ===================================================================================================================================================================

        var devStore    = Ext.getStore('st_common_deveth');
        var allDevStore = Ext.getStore('st_common_alldeveth');

        this.initStore();

        for(var i = 0; i < devStore.count(); i++){

            allDevStore.add({	'eth' : devStore.getAt(i).get('eth')	});

        }

        allDevStore.insert(0, {	'eth' : 'All Interface'	});

        // 콤보박스 값 선택 =================================================================================================================================================================

        this.down('[itemId=fds_ipm_list]').down('[itemId=ctn_ipm_search]').down('[itemId=cmb_dev]').setValue('All Interface');
    },

    loadIpState: function(cid, eth) {
        // loadIpState ===============================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : IP 관리자 설정을 조회합니다. 파라미터는 cid와 eth를 받습니다.
        //
        // ===========================================================================================================================================================================

        var service      = 'ftSMC',
            serchService = 'getDeviceIPMInfo',
            params       = {

                cid  : Ext.encode(cid)

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                console.log('eth -> ', eth);

                console.log('IPM -> ', res);

            }

        );
    },

    initStore: function() {
        var allDevStore = Ext.getStore('st_common_alldeveth');

        allDevStore.removeAll();
    }

});