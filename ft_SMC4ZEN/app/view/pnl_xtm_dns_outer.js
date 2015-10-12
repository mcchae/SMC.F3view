
Ext.define('SMC4ZEN.view.pnl_xtm_dns_outer', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_dns_outerViewModel',
        'SMC4ZEN.view.pnl_xtm_dns_outerViewController',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    controller: 'pnl_xtm_dns_outer',
    viewModel: {
        type: 'pnl_xtm_dns_outer'
    },
    height: 680,
    id: 'pnl_xtm_dns_outer',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: '외부 DNS',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPnl_xtm_dns_outerAfterRender',
        beforeclose: 'onPnl_xtm_dns_outerBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        itemId: 'ctn_dnsouter_main',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                itemId: 'ctn_dnsouter_top',
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
                                        margin: '0, 100, 0, 0',
                                        maxWidth: 250,
                                        fieldLabel: '인터페이스',
                                        editable: false,
                                        emptyText: 'Select interface ...',
                                        displayField: 'eth',
                                        queryMode: 'local',
                                        store: 'st_common_deveth',
                                        valueField: 'eth'
                                    },
                                    {
                                        xtype: 'checkboxfield',
                                        itemId: 'ck_usecache',
                                        margin: '0, 100, 0, 0',
                                        fieldLabel: '',
                                        boxLabel: 'DNS Cache 사용'
                                    }
                                ]
                            },
                            {
                                xtype: 'tabpanel',
                                flex: 1,
                                itemId: 'tpn_dnsouter_domain',
                                activeTab: 0,
                                items: [
                                    {
                                        xtype: 'panel',
                                        itemId: 'pnl_dnsouter_domain',
                                        title: '도메인',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch',
                                            padding: 10
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_dnsouter_name',
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
                                                            click: 'onBt_addClick'
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_dnsouter_set',
                                                title: '',
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
                                                                    var store = Ext.getStore('st_dns_outdomain');

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
                                        itemId: 'pnl_dnsouter_enablenetwork',
                                        title: '허용 네트워크',
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch',
                                            padding: 10
                                        },
                                        items: [
                                            {
                                                xtype: 'container',
                                                itemId: 'ctn_dnsouter_input',
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
                                                xtype: 'container',
                                                itemId: 'ctn_dns_control',
                                                margin: '0, 0, 10, 0',
                                                layout: {
                                                    type: 'hbox',
                                                    align: 'middle',
                                                    pack: 'end'
                                                },
                                                listeners: {
                                                    afterrender: {
                                                        fn: 'onCtn_dns_controlAfterRender',
                                                        scope: 'controller'
                                                    }
                                                },
                                                items: [
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_add',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '추 가'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_mod',
                                                        margin: '0, 5, 0, 0',
                                                        width: 100,
                                                        text: '수 정'
                                                    },
                                                    {
                                                        xtype: 'button',
                                                        itemId: 'bt_del',
                                                        width: 100,
                                                        text: '삭 제'
                                                    }
                                                ]
                                            },
                                            {
                                                xtype: 'gridpanel',
                                                flex: 1,
                                                itemId: 'gpn_dnsouter_enablenetwork',
                                                title: '',
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
                                                    itemclick: 'onGpn_dnsouter_enablenetworkItemClick'
                                                },
                                                selModel: Ext.create('Ext.selection.RowModel', {
                                                    selType: 'rowmodel',
                                                    mode: 'MULTI'
                                                })
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onBt_addClick: function(button, e, eOpts) {
        var componentObj = this.componentStorage();

        if(!this.validityCheck().blankCheck(0) || !this.validityCheck().domainDuplicationCheck(componentObj.domain_name.getValue())){

            return;

        }

        gridData_Add(componentObj.dnsouter_grid, { 'name' : componentObj.domain_name.getValue(), '@count' : 0 });
    },

    onGpn_dnsouter_enablenetworkItemClick: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.ipaddr.setValue(record.data.ip);
        component.netmask.setValue(record.data.netmask);
    },

    onPnl_xtm_dns_outerAfterRender: function(component, eOpts) {
        // onPnl_xtm_dns_outerAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.08.14
        //
        // 설명 : 외부 DNS 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

        // 체크 박스, 인터페이스 초기화 =====================================================================================================================================================

                if(deviceData.info){

                    componentObj.enabledns.setValue((deviceData.info.setting['@chk_use'] === "on") ? true : false);
                    componentObj.eth.setValue(deviceData.info.setting['@interface']);
                    componentObj.enablecache.setValue((deviceData.info.setting['@chk_cache'] === "on") ? true : false);

                }

        // 그리드 데이터 초기화 ============================================================================================================================================================

                if(deviceData.domain){

                    componentObj.dnsouter_grid.getStore().add(deviceData.domain);

                }

                if(deviceData.permit){

                    componentObj.network_grid.getStore().add(deviceData.permit);

                }

            }

        }
        catch(err){

            console.log('외부 DNS 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_dns_outerBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_dns_outerBeforeClose ===============================================================================================================================================
        //
        // 일시 : 2014.08.14
        //
        // 설명 : 화면이 이동하거나 파괴될 때의 작업을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    initStore: function() {
        // initStore ====================================================================================================================================================================
        //
        // 일시 : 2014.08.14
        //
        // 설명 : DNS 설정에서 사용하는 스토어를 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var st_outdomain = Ext.getStore('st_dns_outdomain');
        var st_outenable = Ext.getStore('st_dns_outenablenet');

        st_outdomain.removeAll();
        st_outenable.removeAll();

        component.dnsouter_grid.bindStore(st_outdomain);
        component.network_grid.bindStore(st_outenable);
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : Dynamic DNS 데이터를 저장합니다.
        //
        // =============================================================================================================================================================================

        var outdominStore = Ext.getStore('st_dns_outdomain');
        var outerNetStore = Ext.getStore('st_dns_outenablenet');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component = this.componentStorage();

        // DNS 활성화, 인터페이스 저장, 캐시 사용 ===========================================================================================================================================

        deviceAllData.network_splitdns_outerdns.info.setting['@chk_cache']   = (component.enablecache.getValue() === true) ? 'on' : 'off';
        deviceAllData.network_splitdns_outerdns.info.setting['@chk_use']   = (component.enabledns.getValue() === true) ? 'on' : 'off';
        deviceAllData.network_splitdns_outerdns.info.setting['@interface'] = component.eth.getValue();

        // 도메인 저장 ===================================================================================================================================================================

        if(outdominStore.count() > 0){

        // 도메인 데이터가 1개 이상 등록되었을 경우 ==========================================================================================================================================

            var domainArray = [];

            for(var i = 0; i < outdominStore.count(); i++){

                domainArray.push({	'@count' : i, 'name' : outdominStore.getAt(i).get('name')	});

            }

            deviceAllData.network_splitdns_outerdns.domain = domainArray;

        }
        else{

        // 도메인 데이터가 없다면 ==========================================================================================================================================================

            if(deviceAllData.network_splitdns_outerdns.domain){

                delete deviceAllData.network_splitdns_outerdns.domain;

            }

        }

        // 허용 네트워크 저장 =============================================================================================================================================================

        if(outerNetStore.count() > 0){

        // 네트워크 데이터가 1개 이상 등록되었을 경우 =========================================================================================================================================

            var permitArray = [];

            for(var i = 0; i < outerNetStore.count(); i++){

                permitArray.push({	'ip' : outerNetStore.getAt(i).get('ip'), 'netmask' : outerNetStore.getAt(i).get('netmask')	});

            }

            deviceAllData.network_splitdns_outerdns.permit = permitArray;

        }
        else{

        // 네트워크 데이터가 없다면 ========================================================================================================================================================

            if(deviceAllData.network_splitdns_outerdns.permit){

                delete deviceAllData.network_splitdns_outerdns.permit;

            }

        }

        return true;
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

                            title : '외부 DNS 저장 에러',
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

                            title : '외부 DNS 저장 에러',
                            msg : 'IP 주소는 필수입력 사항입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.netmask.getValue() === ''){

                        Ext.Msg.show({

                            title : '외부 DNS 저장 에러',
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

                if(!duplicationItem(componentValue, 'name', 'st_dns_outdomain')){

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

                    if(!duplicationItem(componentValue, 'ip', 'st_dns_outenablenet')){

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

                    var _outerDnsName = component.network_grid.getSelectionModel().getSelection()[0].get('ip');

                    if(!duplicationItem(componentValue, 'ip', 'st_dns_outenablenet') && _innerDnsName !== componentValue){

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

    componentStorage: function() {
        var obj            = {};

        var ctn_top        = this.down('[itemId=ctn_dnsouter_top]');
        var tpn_domain     = this.down('[itemId=tpn_dnsouter_domain]');

        var pnl_domain     = tpn_domain.down('[itemId=pnl_dnsouter_domain]');
        var enable_network = tpn_domain.down('[itemId=pnl_dnsouter_enablenetwork]');

        var enabledns      = ctn_top.down('[itemId=ck_enable]');
        var eth            = ctn_top.down('[itemId=cmb_interface]');
        var enablecache    = ctn_top.down('[itemId=ck_usecache]');

        var domain_name    = pnl_domain.down('[itemId=txf_name]');

        var dnsouter_grid  = pnl_domain.down('[itemId=gpn_dnsouter_set]');

        var ipaddr         = enable_network.down('[itemId=txf_ipaddr]');
        var netmask        = enable_network.down('[itemId=txf_netmask]');

        var network_grid   = enable_network.down('[itemId=gpn_dnsouter_enablenetwork]');

        obj.enabledns     = enabledns;
        obj.eth           = eth;
        obj.enablecache   = enablecache;
        obj.domain_name   = domain_name;
        obj.dnsouter_grid = dnsouter_grid;

        obj.ipaddr        = ipaddr;
        obj.netmask       = netmask;
        obj.network_grid  = network_grid;

        return obj;
    }

});