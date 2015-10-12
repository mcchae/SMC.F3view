
Ext.define('SMC4ZEN.view.win_xtm_ipmlist', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_xtm_ipmlistViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'win_xtm_ipmlist'
    },
    height: 600,
    id: 'win_xtm_ipmlist',
    minHeight: 600,
    width: 800,
    bodyPadding: 10,
    title: '',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onWin_xtm_ipmlistAfterRender',
        destroy: 'onWin_xtm_ipmlistDestroy'
    },
    items: [
        {
            xtype: 'fieldset',
            flex: 1,
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
                            queryMode: 'local',
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
                                    text: '엑셀파일로 저장',
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

    onWin_xtm_ipmlistAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_ipm_listAfterRender =======================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : IP 관리자 설정을 조회합니다. 화면이 처음 생성될 경우 All interface 를 조회합니다.
        //
        // 수정 :
        //
        // (김민수 2014.08.12 - 컨텍스트 메뉴로 전환함)
        //
        // =============================================================================================================================================================================

        // 스토어 초기화 =================================================================================================================================================================

        var ipmStore = Ext.getStore('st_ipmanager_deveth');

        if(!ipmStore){

            ipmStore = Ext.create('Ext.data.Store', {
                'storeId' : 'st_ipmanager_deveth',
                'fields' : [
                    {	'name' : 'eth'	}
                ]
            });

        }

        this.initStore();

        // 장비 데이터 조회 ==============================================================================================================================================================

        try{

            var service = 'ftSMC',
                serchService = 'getDeviceStatusInfo',
                params = {

                    cid : Ext.encode(component.cid)

                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                serchService,
                params,
                function(deviceState){

                    try{

        // 데이터가 연결된다면 ============================================================================================================================================================

                        var ethArray = [];

                        Ext.each(deviceState.smc_status['interface'], function(ethData, idx){

                            if(ethData['@name'].substring(0, 3) === 'eth'){

                                ethArray.push(	{	'eth' : ethData['@name']	});

                            }

                        });

                        ipmStore.loadData(ethArray);

                    }
                    catch(err){

                        return;

                    }

                });

        }
        catch(err){

            console.log('장비 상태를 가져오는 도중 에러가 발생하였습니다.\n\n' + err);

        }

        // 콤보박스 값 선택 ==============================================================================================================================================================

        this.down('[itemId=fds_ipm_list]').down('[itemId=ctn_ipm_search]').down('[itemId=cmb_dev]').setValue('All Interface');
    },

    onWin_xtm_ipmlistDestroy: function(component, eOpts) {
        // 장비 리스트 화면 갱신 동작 =======================================================================================================================================================

        var st_ethlist = Ext.getStore('st_ipmanager_deveth');

        var ethArray = [

            { 'eth' : 'All Interface'},
            { 'eth' : 'eth0'  },
            { 'eth' : 'eth1'  },
            { 'eth' : 'eth2'  },
            { 'eth' : 'eth3'  },
            { 'eth' : 'eth4'  },
            { 'eth' : 'eth5'  },
            { 'eth' : 'eth6'  },
            { 'eth' : 'eth7'  },
            { 'eth' : 'eth8'  },
            { 'eth' : 'eth9'  },
            { 'eth' : 'eth10' },
            { 'eth' : 'eth11' },
            { 'eth' : 'eth12' },
            { 'eth' : 'eth13' },
            { 'eth' : 'eth14' },
            { 'eth' : 'eth15' },
            { 'eth' : 'eth16' },
            { 'eth' : 'eth17' },
            { 'eth' : 'eth18' },
            { 'eth' : 'eth19' },
            { 'eth' : 'eth20' },
            { 'eth' : 'eth21' },
            { 'eth' : 'eth22' },
            { 'eth' : 'eth23' },
            { 'eth' : 'eth24' },
            { 'eth' : 'eth25' }

        ];

        st_ethlist.loadData(ethArray);

        this.down('[itemId=fds_ipm_list]').down('[itemId=gpn_ipm_stat]').bindStore(st_ethlist);

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    onCmb_devChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_devChange ===========================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : 선택된 인터페이스에 맞는 IP 관리 정보를 조회합니다.
        //
        // ===========================================================================================================================================================================

        this.loadIpState(Ext.getCmp('win_xtm_ipmlist').cid, newValue);
    },

    onBt_exportClick: function(button, e, eOpts) {

    },

    loadIpState: function(cid, eth) {
        // loadIpState =================================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : IP 관리자 설정을 조회합니다. 파라미터는 cid와 eth를 받습니다.
        //
        // =============================================================================================================================================================================

        var service      = 'ftSMC',
            serchService = 'getDeviceIPMInfo',
            params       = {
                'cid'  : Ext.encode(cid)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){
            }

        );
    },

    initStore: function() {
        // initStore =====================================================================================================================================================================
        //
        // 설명 : 스토어 초기화 기능을 수행합니다.
        //
        // ===============================================================================================================================================================================

        Ext.getStore('st_common_alldeveth').removeAll();
    }

});