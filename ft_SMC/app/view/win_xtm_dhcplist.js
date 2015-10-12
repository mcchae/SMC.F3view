
Ext.define('SMC.view.win_xtm_dhcplist', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_dhcplist',

    requires: [
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View'
    ],

    height: 600,
    id: 'win_xtm_dhcplist',
    minHeight: 600,
    width: 800,
    bodyPadding: 10,
    title: '',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                                click: {
                                    fn: me.onBt_updateClick,
                                    scope: me
                                }
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
                            dataIndex: 'address',
                            text: 'Address',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'issue',
                            text: 'Issue Range',
                            flex: 1.5
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'mac',
                            text: 'Hw Mac',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'hostname',
                            text: 'Host Name',
                            flex: 1
                        }
                    ],
                    listeners: {
                        render: {
                            fn: me.onGpn_dhcplist_gridRender,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_xtm_dhcplistAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_xtm_dhcplistBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
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

    onGpn_dhcplist_gridRender: function(component, eOpts) {
        var st_dhcplist = Ext.getStore('st_dhcp_assignlist');

        if(!st_dhcplist){

            st_dhcplist = Ext.create('Ext.data.Store', {

                'fields' : [

                    {	'name' : 'address'	},
                    {	'name' : 'hostname'	},
                    {	'name' : 'issue'	},
                    {	'name' : 'mac'		}

                ],
                'storeId' : 'st_dhcp_assignlist'

            });

        }

        component.bindStore(st_dhcplist);
    },

    onWin_xtm_dhcplistAfterRender: function(component, eOpts) {
        // onWindowAfterRender =========================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : DHCP 리스트를 로드합니다.
        //
        // =============================================================================================================================================================================

        this.loadDhcpList(component.cid);
    },

    onWin_xtm_dhcplistBeforeDestroy: function(component, eOpts) {
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
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

        var gpn_dhcplist = this.down('[itemId=gpn_dhcplist_grid]');
        var st_dhcplist = gpn_dhcplist.getStore();

        st_dhcplist.removeAll();

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                var dat_dhcp = res.network;
                var obj_dhcp = {};

                if(dat_dhcp.lease){

                    if(Object.prototype.toString.call(dat_dhcp.lease) === '[object Array]'){

                        var arr_dhcp = [];

                        for(var i = 0, max = dat_dhcp.lease.length; i < max; i++){

                            var tmp = {};

                            tmp.mac = dat_dhcp.lease[i].mac;
                            tmp.issue = dat_dhcp.lease[i].issue;
                            tmp.address = dat_dhcp.lease[i].address;
                            tmp.hostname = dat_dhcp.lease[i].hostname;

                            arr_dhcp.push(tmp);

                        }

                        st_dhcplist.loadData(arr_dhcp);

                    }
                    else{

                        obj_dhcp.mac = dat_dhcp.lease.mac;
                        obj_dhcp.issue = dat_dhcp.lease.issue;
                        obj_dhcp.address = dat_dhcp.lease.address;
                        obj_dhcp.hostname = dat_dhcp.hostname;

                        st_dhcplist.add(obj_dhcp);

                    }

                }

            }

        );
    }

});