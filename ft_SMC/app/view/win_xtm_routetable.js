
Ext.define('SMC.view.win_xtm_routetable', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_routetable',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    height: 600,
    id: 'win_xtm_routetable',
    minHeight: 600,
    minWidth: 960,
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
                    itemId: 'ctn_route_select',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_select',
                            margin: '0, 10, 0, 0',
                            width: 200,
                            fieldLabel: '',
                            value: 'all',
                            editable: false,
                            displayField: 'name',
                            store: 'st_routing_selectinfo',
                            valueField: 'value',
                            listeners: {
                                change: {
                                    fn: me.onCmb_selectChange,
                                    scope: me
                                }
                            }
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
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_route_info',
                    overflowY: 'auto',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_xtm_routetableAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_xtm_routetableDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_selectChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_selectChange ==========================================================================================================================================================
        //
        // 일시 : 2014.07.22
        //
        // 설명 : 화면에 출력하는 그리드를 설정합니다.
        //
        // 수정 :
        //
        // (2014.11.24 김민수 - 자바스크립트 최적화 코드 적용)
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var ctn_info = component.ctn_info;

        component.ctn_info.removeAll();

        if(newValue === 'all'){

            ctn_info.add(this.makeRouteStatic(newValue));
            ctn_info.add(this.makeRouteOspf(newValue));
            ctn_info.add(this.makeRouteRip(newValue));
            ctn_info.add(this.makeRouteBgp(newValue));

        }
        else if(newValue === 'static'){

            ctn_info.add(this.makeRouteStatic(newValue));

        }
        else if(newValue === 'rip'){

            ctn_info.add(this.makeRouteRip(newValue));

        }
        else if(newValue === 'ospf'){

            ctn_info.add(this.makeRouteOspf(newValue));

        }
        else{

            ctn_info.add(this.makeRouteBgp(newValue));

        }
    },

    onBt_refreshClick: function(button, e, eOpts) {
        // onBt_refreshClick ============================================================================================================================================================
        //
        // 일시 : 2014.07.23
        //
        // 설명 : route Table 데이터를 다시 load 합니다.
        //
        // ==============================================================================================================================================================================

        Ext.getStore('st_routing_static').removeAll();
        Ext.getStore('st_routing_ospf').removeAll();
        Ext.getStore('st_routing_rip').removeAll();
        Ext.getStore('st_routing_bgp').removeAll();
        Ext.getStore('st_routing_v6table').removeAll();

        var component = Ext.getCmp('win_xtm_routetable');

        this.routeLoadData(component.version, component.cid);
    },

    onWin_xtm_routetableAfterRender: function(component, eOpts) {
        // onWin_xtm_routetableAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.07.22
        //
        // 설명 : 라우터 정보를 스토어에 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        component.setTitle(component.title);

        if(component.version === 'v4'){

        // v4 전체 필드셋 생성 ==============================================================================================================================================================

            componentObj.ctn_info.add(this.makeRouteStatic('all'));
            componentObj.ctn_info.add(this.makeRouteOspf('all'));
            componentObj.ctn_info.add(this.makeRouteRip('all'));
            componentObj.ctn_info.add(this.makeRouteBgp('all'));

            this.routeLoadData(component.version, component.cid);

        }
        else{

        // v6 필드셋 생성 ==================================================================================================================================================================

            componentObj.ctn_select.setVisible(false);

            componentObj.ctn_info.add(this.makeRouteV6());

            this.routeLoadData(component.version, component.cid);

        }
    },

    onWin_xtm_routetableDestroy: function(component, eOpts) {
        // onWin_xtm_routetableDestroy ===================================================================================================================================================
        //
        // 일시 : 2014.07.22
        //
        // 설명 : 라우터의 스토어를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        Ext.getStore('st_routing_static').removeAll();
        Ext.getStore('st_routing_ospf').removeAll();
        Ext.getStore('st_routing_rip').removeAll();
        Ext.getStore('st_routing_bgp').removeAll();
        Ext.getStore('st_routing_v6table').removeAll();

        // 장비 리스트 화면 갱신 동작 ========================================================================================================================================================

        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('devlistRefresh');
    },

    routeLoadData: function(version, cid) {
        // routeLoadData ===============================================================================================================================================================
        //
        // 일시 : 2014.07.22
        //
        // 설명 : route 데이터를 IP 버전에 맞게 스토어에 로드합니다.
        //
        // =============================================================================================================================================================================

        var ctnRouteInfo = this.down('[itemId=ctn_route_info]');

        var service      = 'ftSMC',
            serchService = 'getDeviceRouteInfo',
            params       = {

                cid  : Ext.encode(cid),
                isv6 : Ext.encode((version === 'v6') ? true : false)

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                var routeTableData = res.network_router_table;

                if(routeTableData){

                    if(version === 'v4'){

                        if(routeTableData.static_table){

                            Ext.each(routeTableData.static_table.routing_table, function(staticData){

                                Ext.getStore('st_routing_static').add(staticData);

                            });

                        }

                        if(routeTableData.ospf_table){

                            Ext.each(routeTableData.ospf_table.routing_table, function(ospfData){

                                Ext.getStore('st_routing_ospf').add(ospfData);

                            });

                        }

                        if(routeTableData.rip_table){

                            Ext.each(routeTableData.rip_table.routing_table, function(ripData){

                                Ext.getStore('st_routing_rip').add(ripData);

                            });

                        }

                        if(routeTableData.bgp_table){

                            Ext.each(routeTableData.bgp_table.routing_table, function(bgpData){

                                Ext.getStore('st_routing_bgp').add(bgpData);

                            });

                        }

                    }
                    else{

                        if(routeTableData.router_table_v6){

                            Ext.each(routeTableData.router_table_v6, function(v6Data){

                                Ext.getStore('st_routing_v6table').add(v6Data);

                            });

                        }

                    }

                }

            }

        );
    },

    componentStorage: function() {
        var obj = {};

        var ctn_select = this.down('[itemId=ctn_route_select]');
        var ctn_info   = this.down('[itemId=ctn_route_info]');

        var selectgrid = ctn_select.down('[itemId=cmb_select]');

        obj.ctn_select = ctn_select;
        obj.ctn_info   = ctn_info;

        obj.selectgrid = selectgrid;

        return obj;
    },

    makeRouteStatic: function(selectType) {
        // makeRouteStatic =============================================================================================================================================================
        //
        // 일시 : 2014.07.23
        //
        // 설명 : 장비의 Route Table Static 그리드를 생성하여 컨테이너에 추가합니다.
        //
        // =============================================================================================================================================================================

        var staticField = Ext.create('Ext.form.FieldSet', {

            'flex'   : (selectType === 'all') ? 0 : 1,
            'height' : 300,
            'layout' : 'fit',
            'title'  : 'Static',
            'itemId' : 'fds_routing_v6',
            'items'  : [

                {
                    xtype: 'gridpanel',
                    itemId: 'gpn_route_static',
                    margin: '10, 0, 10, 0',
                    store: 'st_routing_static',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'endaddr',
                            text: 'Destination',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'gateway',
                            text: 'GateWay',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'interface',
                            text: 'Interface',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'distance',
                            text: 'Distance',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'metric',
                            text: 'Metric',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'flags',
                            text: 'Flag',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'uptime',
                            text: 'Uptime',
                            flex: 1
                        }

                    ]

                }

            ]

        });

        return staticField;
    },

    makeRouteOspf: function(selectType) {
        // makeRouteOspf ===============================================================================================================================================================
        //
        // 일시 : 2014.07.23
        //
        // 설명 : 장비의 Route Table Ospf 그리드를 생성하여 컨테이너에 추가합니다.
        //
        // =============================================================================================================================================================================

        var ospfField = Ext.create('Ext.form.FieldSet', {

            'flex'   : (selectType === 'all') ? 0 : 1,
            'height' : 300,
            'layout' : 'fit',
            'title'  : 'OSPF',
            'itemId' : 'fds_route_ospf',
            'items'  : [

                {
                    xtype: 'gridpanel',
                    itemId: 'gpn_route_ospf',
                    margin: '10, 0, 10, 0',
                    store: 'st_routing_ospf',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'endaddr',
                            text: 'Destination',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'gateway',
                            text: 'GateWay',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'interface',
                            text: 'Interface',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'distance',
                            text: 'Distance',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'metric',
                            text: 'Metric',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'flags',
                            text: 'Flag',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'uptime',
                            text: 'Uptime',
                            flex: 1
                        }

                    ]

                }

            ]

        });

        return ospfField;
    },

    makeRouteRip: function(selectType) {
        // makeRouteRip =================================================================================================================================================================
        //
        // 일시 : 2014.07.23
        //
        // 설명 : 장비의 Route Table rip 그리드를 생성하여 컨테이너에 추가합니다.
        //
        // ==============================================================================================================================================================================

        var ripField = Ext.create('Ext.form.FieldSet', {

            'flex'   : (selectType === 'all') ? 0 : 1,
            'height' : 300,
            'layout' : 'fit',
            'title'  : 'RIP',
            'itemId' : 'fds_router_rip',
            'items'  : [

                {
                    xtype: 'gridpanel',
                    itemId: 'gpn_route_rip',
                    margin: '10, 0, 10, 0',
                    store: 'st_routing_rip',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'endaddr',
                            text: 'Destination',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'gateway',
                            text: 'GateWay',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'interface',
                            text: 'Interface',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'distance',
                            text: 'Distance',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'metric',
                            text: 'Metric',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'flags',
                            text: 'Flag',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'uptime',
                            text: 'Uptime',
                            flex: 1
                        }

                    ]

                }

            ]

        });

        return ripField;
    },

    makeRouteBgp: function(selectType) {
        // makeRouteBgp ================================================================================================================================================================
        //
        // 일시 : 2014.07.23
        //
        // 설명 : 장비의 Route Table bgp 그리드를 생성하여 컨테이너에 추가합니다.
        //
        // =============================================================================================================================================================================

        var bgpField = Ext.create('Ext.form.FieldSet', {

            'flex'   : (selectType === 'all') ? 0 : 1,
            'height' : 300,
            'layout' : 'fit',
            'title'  : 'BGP',
            'itemId' : 'fds_router_bgp',
            'items'  : [

                {
                    xtype: 'gridpanel',
                    itemId: 'gpn_route_bgp',
                    margin: '10, 0, 10, 0',
                    store: 'st_routing_bgp',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'endaddr',
                            text: 'Destination',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'gateway',
                            text: 'GateWay',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'interface',
                            text: 'Interface',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'distance',
                            text: 'Distance',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'metric',
                            text: 'Metric',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'flags',
                            text: 'Flag',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'uptime',
                            text: 'Uptime',
                            flex: 1
                        }

                    ]

                }

            ]

        });

        return bgpField;
    },

    makeRouteV6: function() {
        // makeRouteV6 =================================================================================================================================================================
        //
        // 일시 : 2014.07.23
        //
        // 설명 : 장비의 Route Table V6 필드와 그리드를 생성하여 컨테이너에 추가합니다.
        //
        // =============================================================================================================================================================================

        var v6Field = Ext.create('Ext.form.FieldSet', {

            'flex'   : 1,
            'layout' : 'fit',
            'title'  : 'V6 Table',
            'itemId' : 'fds_routing_v6',
            'items'  : [

                {
                    xtype: 'gridpanel',
                    itemId: 'gpn_route_v6table',
                    margin: '10, 0, 10, 0',
                    store: 'st_routing_v6table',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'endaddr',
                            text: 'Destination',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'gateway',
                            text: 'GateWay',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'netmask',
                            text: 'Netmask',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'metric',
                            text: 'Metric',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'flags',
                            text: 'Flag',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'interface',
                            text: 'Interface',
                            flex: 1
                        }
                    ]
                }

            ]

        });

        return v6Field;
    }

});