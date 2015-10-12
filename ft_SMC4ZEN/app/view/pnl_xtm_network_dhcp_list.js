
Ext.define('SMC4ZEN.view.pnl_xtm_network_dhcp_list', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_network_dhcp_listViewModel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'pnl_xtm_network_dhcp_list'
    },
    height: 680,
    id: 'pnl_xtm_network_dhcp_list',
    width: 800,
    bodyPadding: 10,
    title: 'DHCP 현황',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            itemId: 'ctn_dhcplist_update',
            margin: '0, 0, 10, 0',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_update',
                    width: 100,
                    text: '목록 업데이트',
                    listeners: {
                        click: 'onBt_updateClick'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            flex: 1,
            itemId: 'gpn_dhcplist_grid',
            title: '',
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'N'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'string',
                    text: 'Address',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'number',
                    text: 'Issue Range',
                    flex: 1.5
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'date',
                    text: 'Hw Mac',
                    flex: 1
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'bool',
                    text: 'Host Name',
                    flex: 1.5
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_network_dhcp_listAfterRender',
        beforeclose: 'onPnl_xtm_network_dhcp_listBeforeClose'
    },

    onBt_updateClick: function(button, e, eOpts) {
        this.loadDhcpList(Ext.getCmp('pnl_xtm_network_dhcp_list').deviceParams);
    },

    onPnl_xtm_network_dhcp_listAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_dhcp_listAfterRender =======================================================================================================================================
        //
        // 일시 : 2014.07.28
        //
        // 설명 : DHCP 릴레이 리스트를 조회합니다.
        //
        // ==============================================================================================================================================================================

        this.loadDhcpList(component.deviceParams);
    },

    onPnl_xtm_network_dhcp_listBeforeClose: function(panel, eOpts) {
        Ext.getCmp('win_smc_device_set').viewState = true;
    },

    loadDhcpList: function(cid) {
        // loadDhcpList ==========================================================================================================================================================
        //
        // 일시 : 2014.07.25
        //
        // 설명 : DHCP 리스트를 로드합니다.
        //
        // =======================================================================================================================================================================

        var service      = 'ftSMC',
            serchService = 'getDeviceDHCPInfo',
            params       = {

                'cid' : Ext.encode(cid)

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                console.log('RES -> ', res);

            }

        );
    }

});