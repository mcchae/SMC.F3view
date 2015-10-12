
Ext.define('SMC.view.pnl_xtm_dns_inner', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_dns_inner',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_dns_inner',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: '내부 DNS',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_dnsinner_main',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_dnsinner_top',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_enable',
                                    margin: '0, 100, 0, 0',
                                    fieldLabel: '',
                                    boxLabel: 'DNS 활성화'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_interface',
                                    maxWidth: 250,
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
                                    emptyText: 'Select interface ...',
                                    editable: false,
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_deveth',
                                    valueField: 'eth'
                                }
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            flex: 1,
                            itemId: 'tpn_dnsinner_domain',
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    itemId: 'pnl_dnsinner_domain',
                                    title: '도메인',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: 10
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_dnsinner_name',
                                            margin: '10, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'txf_name',
                                                    margin: '0, 10, 0, 0',
                                                    width: 300,
                                                    fieldLabel: '도메인 이름'
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'bt_add',
                                                    width: 100,
                                                    text: '추 가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBt_addClick,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_dnsinner_set',
                                            title: '',
                                            store: 'st_dns_indomain',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    text: 'N'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 300,
                                                    dataIndex: 'name',
                                                    text: '도메인 이름'
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    align: 'center',
                                                    dataIndex: 'name',
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.getStore('st_dns_indomain');

                                                                store.removeAt(rowIndex);

                                                                store.sync();
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    itemId: 'pnl_dnsinner_enablenetwork',
                                    title: '허용 네트워크',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: 10
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_dnsinner_input',
                                            margin: '10, 0, 10, 0',
                                            layout: 'anchor',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var retValue;

                                                        retValue = CheckNotNull(value);

                                                        if(!retValue){return true; }

                                                        retValue = validIPForm(value, 'v4');

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    anchor: '40%',
                                                    itemId: 'txf_ipaddr',
                                                    margin: '0, 0, 10, 0',
                                                    fieldLabel: 'IP 주소'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var retValue;

                                                        retValue = CheckNotNull(value);

                                                        if(!retValue){return true; }

                                                        retValue = validIPForm(value, 'v4');

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    anchor: '40%',
                                                    itemId: 'txf_netmask',
                                                    margin: '0, 0, 10, 0',
                                                    fieldLabel: '넷마스크'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'ctn_network_controlclass1',
                                            itemId: 'ctn_dnsinner_control',
                                            margin: '0, 0, 10, 0',
                                            padding: 10,
                                            listeners: {
                                                afterrender: {
                                                    fn: me.onCtn_dnsinner_controlAfterRender,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'gridpanel',
                                            flex: 1,
                                            itemId: 'gpn_dnsinner_enablenetwork',
                                            title: '',
                                            store: 'st_dns_enablenet',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    text: 'N'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'ip',
                                                    text: 'IP 주소',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'netmask',
                                                    text: '넷마스크',
                                                    flex: 1
                                                }
                                            ],
                                            listeners: {
                                                itemclick: {
                                                    fn: me.onGpn_dnsinner_enablenetworkItemClick,
                                                    scope: me
                                                }
                                            },
                                            selModel: Ext.create('Ext.selection.RowModel', {
                                                mode: 'MULTI'
                                            })
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
                    fn: me.onPnl_xtm_dns_innerAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_dns_innerBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_addClick: function(button, e, eOpts) {
        var componentObj = this.componentStorage();

        if(!this.validityCheck().blankCheck(0) || !this.validityCheck().domainDuplicationCheck(componentObj.domain_name.getValue())){

            return;

        }

        gridData_Add(componentObj.dnsinner_grid, { 'name' : componentObj.domain_name.getValue(), '@count' : 0 });
    },

    onCtn_dnsinner_controlAfterRender: function(component, eOpts) {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : DNS 내부 허용 네트워크를 설정시에 추가, 수정, 삭제 작업을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add       = component.down('[itemId=bt_add]');
        var bt_mod       = component.down('[itemId=bt_mod]');
        var bt_del       = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck(1) || !me.validityCheck().inDnsValidCheck() || !me.validityCheck().inDnsDuplicationCheck('add', componentObj.ipaddr.getValue())){

                return;

            }

            var obj      = {};

            obj.ip       = componentObj.ipaddr.getValue();
            obj.netmask  = componentObj.netmask.getValue();

            gridData_Add(componentObj.network_grid, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.network_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '내부 DNS 수정 에러',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck(1) || !me.validityCheck().inDnsValidCheck() || !me.validityCheck().inDnsDuplicationCheck('mod', componentObj.ipaddr.getValue())){

                return;

            }

            var obj      = {};

            obj.ip       = componentObj.ipaddr.getValue();
            obj.netmask  = componentObj.netmask.getValue();

            selectionGrid_Mod(componentObj.network_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.network_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : '내부 DNS 삭제 에러',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.network_grid);

        });
    },

    onGpn_dnsinner_enablenetworkItemClick: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.ipaddr.setValue(record.data.ip);
        component.netmask.setValue(record.data.netmask);
    },

    onPnl_xtm_dns_innerAfterRender: function(component, eOpts) {
        // onPnl_xtm_dns_innerAfterRender ================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : 내부 DNS 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                if(deviceData.info){

                    componentObj.enabledns.setValue((deviceData.info.setting['@chk_use'] === "on") ? true : false);
                    componentObj.eth.setValue(deviceData.info.setting['@interface']);

                }

                if(deviceData.domain){

                    componentObj.dnsinner_grid.getStore().add(deviceData.domain);

                }

                if(deviceData.permit){

                    componentObj.network_grid.getStore().add(deviceData.permit);

                }

            }

        }
        catch(err){

            console.log('DNS 내부 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_dns_innerBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_dns_innerBeforeClose ===============================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : DNS 내부 설정 화면이 종료될 때 호출합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj            = {};

        var ctn_top        = this.down('[itemId=ctn_dnsinner_top]');
        var tpn_domain     = this.down('[itemId=tpn_dnsinner_domain]');

        var pnl_domain     = tpn_domain.down('[itemId=pnl_dnsinner_domain]');
        var enable_network = tpn_domain.down('[itemId=pnl_dnsinner_enablenetwork]');

        obj.enabledns     = ctn_top.down('[itemId=ck_enable]');
        obj.eth           = ctn_top.down('[itemId=cmb_interface]');
        obj.domain_name   = pnl_domain.down('[itemId=txf_name]');
        obj.dnsinner_grid = pnl_domain.down('[itemId=gpn_dnsinner_set]');

        obj.ipaddr        = enable_network.down('[itemId=txf_ipaddr]');
        obj.netmask       = enable_network.down('[itemId=txf_netmask]');

        obj.network_grid  = enable_network.down('[itemId=gpn_dnsinner_enablenetwork]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : DNS 내부 데이터를 유효성 검사를 실시합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(ActiveFlag){

                if(ActiveFlag === 0){

                    if(component.domain_name.getValue() === ''){

                        Ext.Msg.show({

                            title : '내부 DNS 저장 에러',
                            msg : '도메인 이름은 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }
                else{

                    if(component.ipaddr.getValue() === ''){

                        Ext.Msg.show({

                            title : '내부 DNS 저장 에러',
                            msg : 'IP 주소는 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.netmask.getValue() === ''){

                        Ext.Msg.show({

                            title : '내부 DNS 저장 에러',
                            msg : '넷마스크는 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            inDnsValidCheck : function(){

                if(!component.ipaddr.validate()){

                    Ext.Msg.show({

                        title : 'DDNS 저장 에러',
                        msg : 'IPv4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.netmask.validate()){

                    Ext.Msg.show({

                        title : 'DDNS 저장 에러',
                        msg : '넷마스크 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            domainDuplicationCheck : function(componentValue){

                if(!duplicationItem(componentValue, 'name', 'st_dns_indomain')){

                    Ext.Msg.show({

                        title : '도메인 중복 에러',
                        msg : '같은 도메인이 이미 등록되었습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            inDnsDuplicationCheck : function(mode, componentValue){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'ip', 'st_dns_enablenet')){

                        Ext.Msg.show({

                            title : 'IP 중복 에러',
                            msg : '같은 IP가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _innerDnsName = component.network_grid.getSelectionModel().getSelection()[0].get('ip');

                    if(!duplicationItem(componentValue, 'ip', 'st_dns_enablenet') && _innerDnsName !== componentValue){

                        Ext.Msg.show({

                            title : 'IP 중복 에러',
                            msg : '같은 IP가 이미 등록되었습니다.',
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
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : Dynamic DNS 데이터를 저장합니다.
        //
        // =============================================================================================================================================================================

        var indominStore  = Ext.getStore('st_dns_indomain');
        var innernetStore = Ext.getStore('st_dns_enablenet');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component = this.componentStorage();

        // DNS 활성화, 인터페이스 저장 =====================================================================================================================================================

        deviceAllData.network_splitdns_innerdns.info.setting['@chk_use']   = (component.enabledns.getValue() === true) ? 'on' : 'off';
        deviceAllData.network_splitdns_innerdns.info.setting['@interface'] = component.eth.getValue();

        // 도메인 저장 ===================================================================================================================================================================

        if(indominStore.count() > 0){

        // 도메인 데이터가 1개 이상 등록되었을 경우 ==========================================================================================================================================

            var domainArray = [];

            for(var i = 0; i < indominStore.count(); i++){

                domainArray.push({	'@count' : i, 'name' : indominStore.getAt(i).get('name')	});

            }

            deviceAllData.network_splitdns_innerdns.domain = domainArray;

        }
        else{

        // 도메인 데이터가 없다면 ==========================================================================================================================================================

            if(deviceAllData.network_splitdns_innerdns.domain){

                delete deviceAllData.network_splitdns_innerdns.domain;

            }

        }

        // 허용 네트워크 저장 =============================================================================================================================================================

        if(innernetStore.count() > 0){

        // 네트워크 데이터가 1개 이상 등록되었을 경우 ========================================================================================================================================

            var permitArray = [];

            for(var i = 0; i < innernetStore.count(); i++){

                permitArray.push({	'ip' : innernetStore.getAt(i).get('ip'), 'netmask' : innernetStore.getAt(i).get('netmask')	});

            }

            deviceAllData.network_splitdns_innerdns.permit = permitArray;

        }
        else{

        // 네트워크 데이터가 없다면 ====================================크==================================================================================================================

            if(deviceAllData.network_splitdns_innerdns.permit){

                delete deviceAllData.network_splitdns_innerdns.permit;

            }

        }

        return true;
    },

    initStore: function() {
        // initStore ====================================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : DNS 설정에서 사용하는 스토어를 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        Ext.getStore('st_dns_indomain').removeAll();
        Ext.getStore('st_dns_enablenet').removeAll();
    }

});