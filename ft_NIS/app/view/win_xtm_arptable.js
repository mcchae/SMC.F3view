
Ext.define('SMC.view.win_xtm_arptable', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_arptable',

    requires: [
        'Ext.form.FieldSet',
        'Ext.ProgressBar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View'
    ],

    height: 600,
    id: 'win_xtm_arptable',
    minHeight: 600,
    minWidth: 800,
    width: 800,
    bodyPadding: 10,
    title: 'ARP TABLE 정보',
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
                    xtype: 'fieldset',
                    flex: 1,
                    itemId: 'fds_arp_arptable',
                    title: 'ARP Table',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_arp_control',
                            width: 100,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'progressbar',
                                    flex: 1,
                                    height: 25,
                                    hidden: true,
                                    margin: '0, 10, 0, 0',
                                    animate: true,
                                    value: 0.4
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'bt_refresh',
                                    width: 100,
                                    text: '새로 고침',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_refreshClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_arp_arplist',
                            margin: '10, 0, 10, 0',
                            padding: '10, 0, 10, 0',
                            title: '',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_xtm_arptableAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_xtm_arptableDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_refreshClick: function(button, e, eOpts) {
        // onBt_refreshClick =============================================================================================================================================================
        //
        // 일시 : 2014.07.22
        //
        // 설명 : refresh 기능을 수행합니다.
        //
        // ===============================================================================================================================================================================

        var arptableObj = Ext.getCmp('win_xtm_arptable');

        if(arptableObj.version === 'v4'){

            var arplist4Store = Ext.getStore('st_arp_arplist4');

            arplist4Store.removeAll();

            this.arpLoadData(arptableObj.version, arplist4Store, arptableObj.cid);

        }
        else{

            var arplist6Store = Ext.getStore('st_arp_arplist6');

            arplist6Store.removeAll();

            this.arpLoadData(arptableObj.version, arplist6Store, arptableObj.cid);

        }
    },

    onWin_xtm_arptableAfterRender: function(component, eOpts) {
        // onWin_xtm_arptableAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.07.22
        //
        // 설명 : ARP TABLE을 IP 버전에 따라 그리드를 출력합니다.
        //
        // =============================================================================================================================================================================

        component.setTitle(component.title);

        var arpGrid = component.down('[itemId=fds_arp_arptable]').down('[itemId=gpn_arp_arplist]');

        if(component.version === 'v4'){

            var gridColumns = [];

            var arp4Store = Ext.create('Ext.data.Store', {

                'storeId' : 'st_arp_arplist4',
                'fields': [

                    {
                        name: 'ip'
                    },
                    {
                        name: 'hw_type'
                    },
                    {
                        name: 'flags'
                    },
                    {
                        name: 'hw_mac'
                    },
                    {
                        name: 'mask'
                    },
                    {
                        name: 'device'
                    }

                ]

            });

            gridColumns.push({	'xtype': 'rownumberer', 'text' : 'N'						});
            gridColumns.push({	'text' : 'IP'		,	'dataIndex' : 'ip'		, flex : 2	});
            gridColumns.push({	'text' : 'Hw Type'	,	'dataIndex' : 'hw_type'	, flex : 1	});
            gridColumns.push({	'text' : 'Flags'	,	'dataIndex' : 'flags'	, flex : 1	});
            gridColumns.push({	'text' : 'Hw Mac'	,	'dataIndex' : 'hw_mac'	, flex : 1.5	});
            gridColumns.push({	'text' : 'Mask'		,	'dataIndex' : 'mask'	, flex : 1	});
            gridColumns.push({	'text' : 'Interface',	'dataIndex' : 'device'	, flex : 1	});

            arpGrid.reconfigure(arp4Store, gridColumns);

            this.arpLoadData(component.version, arp4Store, component.cid);

        }
        else{

            var gridColumns = [];

            var arp6Store = Ext.create('Ext.data.Store', {

                'storeId' : 'st_arp_arplist6',
                'fields': [

                    {
                        name: 'ip'
                    },
                    {
                        name: 'hw_mac'
                    },
                    {
                        name: 'flags'
                    },
                    {
                        name: 'device'
                    }

                ]

            });

            gridColumns.push({	'xtype': 'rownumberer', 'text' : 'N'						});
            gridColumns.push({	'text' : 'IP'		,	'dataIndex' : 'ip'		, flex : 1	});
            gridColumns.push({	'text' : 'Flags'	,	'dataIndex' : 'flags'	, flex : 1	});
            gridColumns.push({	'text' : 'Hw Mac'	,	'dataIndex' : 'hw_mac'	, flex : 1	});
            gridColumns.push({	'text' : 'Interface',	'dataIndex' : 'device'	, flex : 1	});

            arpGrid.reconfigure(arp6Store, gridColumns);

            this.arpLoadData(component.version, arp6Store, component.cid);

        }
    },

    onWin_xtm_arptableDestroy: function(component, eOpts) {
        // 장비 리스트 화면 갱신 동작 ======================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    arpLoadData: function(version, storeObj, cid) {
        // arpLoadData =================================================================================================================================================================
        //
        // 일시 : 2014.07.22
        //
        // 설명 : ARP 데이터를 IP 버전에 맞게 스토어에 로드합니다.
        //
        // =============================================================================================================================================================================

        if(version){

            var service      = 'ftSMC',
                serchService = 'getDeviceARPInfo',
                params       = {

                    cid  : Ext.encode(cid),
                    isv6 : Ext.encode((version === 'v6') ? true : false)

                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                serchService,
                params,
                function(res){

                    if(version === 'v4'){

                        if(res.network_arp_ipv4.arp){

                            Ext.each(res.network_arp_ipv4.arp, function(arpData){

                                storeObj.add(arpData);

                            });

                        }

                    }
                    else{

                        if(res.network_arp_ipv6.arp){

                            Ext.each(res.network_arp_ipv6.arp, function(arpData){

                                storeObj.add(arpData);

                            });

                        }

                    }

                }

            );

        }
    }

});