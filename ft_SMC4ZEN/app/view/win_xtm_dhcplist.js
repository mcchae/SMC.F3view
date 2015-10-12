
Ext.define('SMC4ZEN.view.win_xtm_dhcplist', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_xtm_dhcplistViewModel',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'win_xtm_dhcplist'
    },
    height: 600,
    id: 'win_xtm_dhcplist',
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
        afterrender: 'onWindowAfterRender',
        destroy: 'onWindowDestroy'
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
                    text: '새로 고침',
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

    onWindowAfterRender: function(component, eOpts) {
        // onWindowAfterRender =========================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : DHCP 리스트를 로드합니다.
        //
        // =============================================================================================================================================================================

        this.loadDhcpList(component.cid);
    },

    onWindowDestroy: function(component, eOpts) {
        // onWindowDestroy ==============================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : DHCP 스토어를 정리합니다.
        //
        // ==============================================================================================================================================================================

        Ext.getStore('st_dhcp_assign').removeAll();

        // 장비 리스트 화면 갱신 동작 =======================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    onBt_updateClick: function(button, e, eOpts) {
        // onBt_updateClick ============================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : DHCP 리스트를 로드합니다.
        //
        // =============================================================================================================================================================================

        this.loadDhcpList(Ext.getCmp('win_xtm_dhcplist').cid);
    },

    loadDhcpList: function(cid) {
        // loadDhcpList ================================================================================================================================================================
        //
        // 일시 : 2014.07.25
        //
        // 설명 : DHCP 리스트를 로드합니다.
        //
        // =============================================================================================================================================================================

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

            }

        );
    }

});