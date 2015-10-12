
Ext.define('SMC.view.win_dash_host', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column'
    ],

    height: 400,
    id: 'win_dash_host',
    width: 640,
    layout: 'fit',
    title: '호스트 TOP10',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    id: 'gpn_dash_host',
                    header: false,
                    store: 'st_dash_host_top',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'ip',
                            text: '호스트'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'bps',
                            text: '트래픽(BPS)'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 180,
                            dataIndex: 'pps',
                            text: '트래픽(PPS)'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_dash_hostAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_dash_hostDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onWin_dash_hostAfterRender: function(component, eOpts) {
        Ext.TaskManager.stop(Ext.getCmp('pnl_dash_main').task);

        component.contextObj = new contextMenu();

        component.contextObj.addItem('mn_dash_whois', 'whois', function(){

            var grid = Ext.getCmp('gpn_dash_host');

            if (grid.getSelectionModel().getSelection()[0] !== undefined)
            {
                console.log(grid.getSelectionModel().getSelection()[0].raw.ip);

                Ext.Ajax.request(
                    {
                        url : 'api/ftDashboard/whois',
                        params :
                        {
                            domain : Ext.encode(grid.getSelectionModel().getSelection()[0].raw.ip)
                        },
                        success : function(res_data)
                        {
                            console.log(res_data.responseText);
                            var win = Ext.create('SMC.view.win_dash_whois');
                            Ext.getCmp('txt_dash_whois').setValue(res_data.responseText);
                            win.show();
                        }
                    }
                );

            }

        }, true);

        component.contextObj.addItem('mn_dash_nslookup', 'ns lookup', function(){

            var grid = Ext.getCmp('gpn_dash_host');

            var item = grid.getSelectionModel().getSelection()[0].raw;

            if (grid.getSelectionModel().getSelection()[0] !== undefined)
            {
                console.log(grid.getSelectionModel().getSelection()[0].raw.ip);

                Ext.Ajax.request(
                    {
                        url : 'api/ftDashboard/nslookup',
                        params :
                        {
                            domain : Ext.encode(grid.getSelectionModel().getSelection()[0].raw.ip)
                        },
                        success : function(res_data)
                        {
                            var resObj = JSON.parse(res_data.responseText);
                            Ext.getStore('st_dash_nslookup').loadData(resObj);

                            var win = Ext.create('SMC.view.win_dash_nslookup');
                            win.show();
                        }
                    }
                );

            }

        }, true);


        var grid = Ext.getCmp('gpn_dash_host');

        component.contextObj.connectGrid(grid, function(){});
        component.contextObj.connectContainer(grid, function(){});
    },

    onWin_dash_hostDestroy: function(component, eOpts) {
        Ext.TaskManager.start(Ext.getCmp('pnl_dash_main').task);
    }

});