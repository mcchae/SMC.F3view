
Ext.define('SMC.view.pnl_xtm_network_dhcp_server', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_network_dhcp_server',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_network_dhcp_server',
    width: 800,
    bodyPadding: 10,
    title: 'DHCP 서버',

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
                    itemId: 'ctn_dhcpserver_input1',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            flex: 1,
                            itemId: 'cmb_interface',
                            margin: '0, 10, 0, 0',
                            fieldLabel: '인터페이스',
                            labelWidth: 120,
                            value: 'eth0',
                            emptyText: 'Select interface ...',
                            editable: false,
                            displayField: 'eth',
                            queryMode: 'local',
                            store: 'st_common_vlaneth',
                            valueField: 'eth'
                        },
                        {
                            xtype: 'numberfield',
                            validator: function(value) {
                                var retValue = LengthCheck(value, 60, 7200);

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            flex: 1,
                            itemId: 'nfd_sec',
                            margin: '0, 10, 0, 0',
                            fieldLabel: '할당 시간(초)',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txf_tftp',
                            fieldLabel: 'TFTP Server',
                            labelWidth: 120
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_dhcpserver_input2',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            flex: 1,
                            itemId: 'txf_primarydns',
                            margin: '0, 10, 0, 0',
                            fieldLabel: '주 도메인 서버',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            flex: 1,
                            itemId: 'txf_subdns',
                            margin: '0, 10, 0, 0',
                            fieldLabel: '보조 도메인 서버',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            flex: 1,
                            itemId: 'txf_gateway',
                            fieldLabel: '기본 게이트웨이',
                            labelWidth: 120
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_dhcpserver_input3',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            flex: 1,
                            itemId: 'txf_startaddr',
                            margin: '0, 10, 0, 0',
                            fieldLabel: '시작 주소',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            flex: 1,
                            itemId: 'txf_endaddr',
                            margin: '0, 10, 0, 0',
                            fieldLabel: '끝 주소',
                            labelWidth: 120
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue = validIPForm(value, 'v4');

                                if(!retValue){

                                    return false;

                                }

                                return true;
                            },
                            flex: 1,
                            itemId: 'txf_netmask',
                            fieldLabel: '넷마스크',
                            labelWidth: 120
                        }
                    ]
                },
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_dhcpserver_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_dhcpserver_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_dhcpserver_set',
                    overflowX: 'auto',
                    title: '',
                    store: 'st_dhcpserver_set',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 100,
                            dataIndex: 'interface',
                            text: '인터페이스'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'domain1',
                            text: '주 도메인 서버'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'domain2',
                            text: '보조 도메인 서버'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'gateway',
                            text: '기본 게이트웨이'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'saddr',
                            text: '시작 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'daddr',
                            text: '끝 주소'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 120,
                            dataIndex: 'netmask',
                            text: '넷마스크'
                        },
                        {
                            xtype: 'gridcolumn',
                            autoResizeWidth: true,
                            width: 100,
                            dataIndex: 'tftp',
                            text: 'TFTP Server'
                        }
                    ],
                    viewConfig: {
                        listeners: {
                            refresh: {
                                fn: me.onViewRefresh,
                                scope: me
                            }
                        }
                    },
                    listeners: {
                        itemclick: {
                            fn: me.onGpn_dhcpserver_setItemClick,
                            scope: me
                        }
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {
                        mode: 'MULTI'
                    })
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_network_dhcp_serverAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_network_dhcp_serverBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCtn_dhcpserver_controlAfterRender: function(component, eOpts) {
        // onCtn_dhcpserver_controlAfterRender ==========================================================================================================================================
        //
        // 일시 : 2014.07.29
        //
        // 설명 : DHCP 저장, 수정, 삭제 기능을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            var obj = {};

        // 유효성 검사 ===================================================================================================================================================================

            if(!me.validityCheck().dhcpBlankCheck() || !me.validityCheck().dhcpDuplicationCheck(componentObj.eth.getValue(), 'add') || !me.validityCheck().dhcpTimeCheck()){

                return false;

            }

            obj['@cid']      = "";
            obj['@num']      = "";
            obj['@use']      = "on";
            obj.daddr        = componentObj.eaddr.getValue();
            obj.domain1      = componentObj.dns1.getValue();
            obj.domain2      = componentObj.dns2.getValue();
            obj.gateway      = componentObj.gateway.getValue();
            obj['interface'] = componentObj.eth.getValue();
            obj.netmask      = componentObj.netmask.getValue();
            obj.saddr        = componentObj.saddr.getValue();
            obj.tftp         = componentObj.tftp.getValue();
            obj.time         = componentObj.sec.getValue();

            gridData_Add(componentObj.dhcpGrid, obj);

            reconfigNum(componentObj.dhcpGrid.getStore());

        });

        bt_mod.on('click', function(){

            var obj = {};

            if(!componentObj.dhcpGrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'Server 데이터 수정 에러',
                    msg : '수정할 Server 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

        // 유효성 검사 ====================================================================================================================================================================

            if(!me.validityCheck().dhcpBlankCheck() || !me.validityCheck().dhcpDuplicationCheck(componentObj.eth.getValue(), 'modify') || !me.validityCheck().dhcpTimeCheck()){

                return false;

            }

            obj.daddr        = componentObj.eaddr.getValue();
            obj.domain1      = componentObj.dns1.getValue();
            obj.domain2      = componentObj.dns2.getValue();
            obj.gateway      = componentObj.gateway.getValue();
            obj['interface'] = componentObj.eth.getValue();
            obj.netmask      = componentObj.netmask.getValue();
            obj.saddr        = componentObj.saddr.getValue();
            obj.tftp         = componentObj.tftp.getValue();
            obj.time         = componentObj.sec.getValue();

            selectionGrid_Mod(componentObj.dhcpGrid, obj);

            reconfigNum(componentObj.dhcpGrid.getStore());

        });

        bt_del.on('click', function(){

            if(!componentObj.dhcpGrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'Server 데이터 삭제 에러',
                    msg : '삭제할 Server 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return false;

            }

            selectionGrid_Del(componentObj.dhcpGrid);

            reconfigNum(componentObj.dhcpGrid.getStore());

        });
    },

    onViewRefresh: function(dataview, eOpts) {
        Ext.each(dataview.panel.columns, function(col){

            if(col.autoResizeWidth)
                col.autoSize();

        });
    },

    onGpn_dhcpserver_setItemClick: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.eth.setValue(record.data['interface']);
        component.sec.setValue(record.data.time);
        component.tftp.setValue(record.data.tftp);
        component.dns1.setValue(record.data.domain1);
        component.dns2.setValue(record.data.domain2);
        component.gateway.setValue(record.data.gateway);
        component.saddr.setValue(record.data.saddr);
        component.eaddr.setValue(record.data.daddr);
        component.netmask.setValue(record.data.netmask);
    },

    onPnl_xtm_network_dhcp_serverAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_dhcp_serverAfterRender =====================================================================================================================================
        //
        // 일시 : 2014.07.28
        //
        // 설명 : DHCP 서버 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var dhcpserverStore = Ext.getStore('st_dhcpserver_set');

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                if(deviceData.dhcp){

                    dhcpserverStore.add(deviceData.dhcp);

                }

            }

        }
        catch(err){

            console.log('DHCP 서버 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_dhcp_serverBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_network_dhcp_serverBeforeClose ===============================================================================================================================
        //
        // 일시 : 2014.07.29
        //
        // 설명 : DHCP 창이 close 되면 데이터를 저장하고 메인 view 상태를 변경합니다.
        //
        // ========================================================================================================================================================================
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var ctn_input1 = this.down('[itemId=ctn_dhcpserver_input1]');
        var ctn_input2 = this.down('[itemId=ctn_dhcpserver_input2]');
        var ctn_input3 = this.down('[itemId=ctn_dhcpserver_input3]');

        var eth      = ctn_input1.down('[itemId=cmb_interface]');
        var sec      = ctn_input1.down('[itemId=nfd_sec]');
        var tftp     = ctn_input1.down('[itemId=txf_tftp]');

        var dns1     = ctn_input2.down('[itemId=txf_primarydns]');
        var dns2     = ctn_input2.down('[itemId=txf_subdns]');
        var gateway  = ctn_input2.down('[itemId=txf_gateway]');

        var saddr    = ctn_input3.down('[itemId=txf_startaddr]');
        var eaddr    = ctn_input3.down('[itemId=txf_endaddr]');
        var netmask  = ctn_input3.down('[itemId=txf_netmask]');

        var dhcpGrid = this.down('[itemId=gpn_dhcpserver_set]');

        return function(){

            obj.eth      = eth;
            obj.sec      = sec;
            obj.tftp     = tftp;

            obj.dns1     = dns1;
            obj.dns2     = dns2;
            obj.gateway  = gateway;

            obj.saddr    = saddr;
            obj.eaddr    = eaddr;
            obj.netmask  = netmask;

            obj.dhcpGrid = dhcpGrid;

            return obj;

        }();
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.28
        //
        // 설명 : DHCP 서버의 유효성을 검사합니다. 검사항목은 다음과 같습니다.
        //
        // - 인터페이스 중복 체크
        // - 주 도메인 서버, 기본 게이트웨이, 시작주소, 끝주소, 넷마스크 blank 검사
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            dhcpBlankCheck : function(){

                if(component.dns1.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '주 도메인 서버는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.gateway.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '기본 게이트웨이는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.saddr.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '시작 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.eaddr.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '끝 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.netmask.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '넷마스크는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            dhcpTimeCheck : function(){

                if(!component.sec.validate() && component.sec.getValue() !== null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '할당 시간의 범위는 60 ~ 7200 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            dhcpDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'interface', 'st_dhcpserver_set')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 인터페이스가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _dhcpInterface = component.dhcpGrid.getSelectionModel().getSelection()[0].get('interface');

                    if(!duplicationItem(componentValue, 'interface', 'st_dhcpserver_set') && _dhcpInterface !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 인터페이스가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ==============================================================================================================================================================
        //
        // 일시 : 2014.07.28
        //
        // 설명 : DHCP 서버 설정을 저장합니다.
        //
        // =======================================================================================================================================================================

        var dhcpserverStore = Ext.getStore('st_dhcpserver_set');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(!deviceAllData.network_dhcp_server){

            deviceAllData.network_dhcp_server = {};

        }

        if(dhcpserverStore.count() === 0){

            delete deviceAllData.network_dhcp_server.dhcp;

            deviceAllData.network_dhcp_server = null;

        }
        else{

            var dhcpArray = [];

            for(var i = 0; i < dhcpserverStore.count(); i++){

                dhcpArray.push(dhcpserverStore.getAt(i).data);

            }

            deviceAllData.network_dhcp_server.dhcp = dhcpArray;

        }

        return true;
    },

    initStore: function() {
        var dhcpserverStore = Ext.getStore('st_dhcpserver_set');

        dhcpserverStore.removeAll();
    }

});