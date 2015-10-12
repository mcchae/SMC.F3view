
Ext.define('SMC.view.pnl_xtm_network_ipmanage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_network_ipmanage',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_network_ipmanage',
    width: 800,
    title: 'IP 관리 설정',

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: 10
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_ipmanager_set',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 0.3,
                            itemId: 'fds_ipmanager_mac',
                            margin: '0, 10, 0, 0',
                            title: '우회 MAC 설정',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidMAC(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_detourmac',
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 0.7,
                            itemId: 'fds_ipmanager_ipset',
                            margin: '0, 0, 0, 0',
                            title: 'IP 관리 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_ipmanager_3',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            flex: 1,
                                            itemId: 'ck_mac',
                                            fieldLabel: '',
                                            boxLabel: '우회 MAC'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_ipmanager_1',
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
                                            margin: '0, 20, 0, 0',
                                            fieldLabel: '인터페이스',
                                            labelWidth: 80,
                                            value: 'eth0',
                                            emptyText: 'Select interface ...',
                                            editable: false,
                                            displayField: 'eth',
                                            queryMode: 'local',
                                            store: 'st_common_deveth',
                                            valueField: 'eth'
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
                                            flex: 1,
                                            itemId: 'txf_ip',
                                            fieldLabel: 'IP',
                                            labelWidth: 80
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_ipmanager_2',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            itemId: 'cmb_set',
                                            margin: '0, 20, 0, 0',
                                            fieldLabel: '설정',
                                            labelWidth: 80,
                                            value: 'Accept',
                                            displayField: 'action',
                                            store: 'st_ipmanager_action',
                                            valueField: 'action'
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidMAC(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'txf_mac',
                                            fieldLabel: 'MAC',
                                            labelWidth: 80
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_ipmanager_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_ipmanager_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_ipmanager_select',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_select',
                            width: 250,
                            fieldLabel: '인터페이스 선택',
                            editable: false,
                            displayField: 'eth',
                            queryMode: 'local',
                            store: 'st_iplist_deveth',
                            valueField: 'eth',
                            listeners: {
                                change: {
                                    fn: me.onCmb_selectChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_ipmanager_set',
                    title: '',
                    store: 'st_ipmanager_set',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            align: 'center',
                            dataIndex: '@num',
                            text: 'Number',
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
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value['#text'];
                            },
                            dataIndex: 'ip',
                            text: 'IP',
                            flex: 2
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'mac',
                            text: 'MAC',
                            flex: 2
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'action',
                            text: 'Action',
                            flex: 1
                        },
                        {
                            xtype: 'checkcolumn',
                            dataIndex: '@chk_mac',
                            text: '우회 MAC',
                            flex: 2,
                            listeners: {
                                checkchange: {
                                    fn: me.onCheckcolumnCheckChange,
                                    scope: me
                                }
                            }
                        }
                    ],
                    viewConfig: {
                        plugins: [
                            Ext.create('Ext.grid.plugin.DragDrop', {

                            })
                        ],
                        listeners: {
                            drop: {
                                fn: me.onViewDrop,
                                scope: me
                            }
                        }
                    },
                    listeners: {
                        itemclick: {
                            fn: me.onGpn_ipmanager_setItemClick,
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
                    fn: me.onPnl_xtm_network_ipmanageAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_network_ipmanageBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCtn_ipmanager_controlAfterRender: function(component, eOpts) {
        // onCtn_ipmanager_controlAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : IP 관리 설정 값을 추가, 수정, 삭제합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck() || !me.validityCheck().ipTypeCheck() || !me.validityCheck().ipmValidCheck() ||
               !me.validityCheck().ipDuplicationCheck(componentObj.ip.getValue(), 'add')){

                return;

            }

            var obj = {};

            obj['@chk_mac']   = componentObj.usemac.getValue();
            obj['@num']       = 0;
            obj.action        = componentObj.setting.getValue();
            obj['interface']  = componentObj.eth.getValue();

            var ipObj = {};

            ipObj['#text']    = componentObj.ip.getValue();
            ipObj['@type']    = 'single';
            ipObj['@version'] = 'v4';

            obj.ip            = ipObj;
            obj.mac           = componentObj.mac.getValue();

            gridData_Add(componentObj.ip_grid, obj);

            reconfigNum(componentObj.ip_grid.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.ip_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'IP 관리 수정 에러',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck() || !me.validityCheck().ipTypeCheck() || !me.validityCheck().ipmValidCheck() ||
               !me.validityCheck().ipDuplicationCheck(componentObj.ip.getValue(), 'mod')){

                return;

            }

            var obj = {};

            obj['@chk_mac']   = componentObj.usemac.getValue();
            obj.action        = componentObj.setting.getValue();
            obj['interface']  = componentObj.eth.getValue();

            var ipObj = {};

            ipObj['#text']    = componentObj.ip.getValue();
            ipObj['@type']    = 'single';
            ipObj['@version'] = 'v4';

            obj.ip            = ipObj;
            obj.mac           = componentObj.mac.getValue();

            selectionGrid_Mod(componentObj.ip_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.ip_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'IP 관리 삭제 에러',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.ip_grid);

            reconfigNum(componentObj.ip_grid.getStore());

        });
    },

    onCmb_selectChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_selectChange ======================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : 선택된 인터페이스에 맞는 IP 설정을 조회합니다.
        //
        // =========================================================================================================================================================================

        var store = Ext.getStore('st_ipmanager_set');

        store.clearFilter();

        store.filter({

            'property'      : 'interface',
            'value'         : (newValue === 'All Interface') ? '' : newValue,
            'anyMatch'      : true,
            'caseSensitive' : false

        });
    },

    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        var ipmanagerStore = Ext.getStore('st_ipmanager_set');

        ipmanagerStore.sync();
    },

    onViewDrop: function(node, data, overModel, dropPosition, eOpts) {
        var gridStore  = this.componentStorage().ip_grid.getStore();

        for(var i = 0; i < gridStore.count(); i++){

            var obj    = {};

            obj['@num'] = i + 1;

            gridStore.getAt(i).set(obj);

            gridStore.getAt(i).commit();

        }

        gridStore.sync();
    },

    onGpn_ipmanager_setItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_ipmanager_setItemClick ================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : IP 관리 그리드 선택시 컴포넌트를 데이터에 맵핑합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        component.ip.setValue(record.data.ip['#text']);
        component.eth.setValue(record.data['interface']);
        component.mac.setValue(record.data.mac);
        component.setting.setValue(record.data.action);
        component.usemac.setValue(record.data['@chk_mac']);
    },

    onPnl_xtm_network_ipmanageAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_ipmanageAfterRender =========================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : IP 관리 설정에 대한 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var ipmanagerStore = Ext.getStore('st_ipmanager_set');
        var devStore       = Ext.getStore('st_common_deveth');
        var allDevStore    = Ext.getStore('st_common_alldeveth');

        // 스토어 초기화 ===================================================================================================================================================================

        this.initStore();

        for(var i = 0; i < devStore.count(); i++){

            allDevStore.add({	'eth' : devStore.getAt(i).get('eth')	});

        }

        allDevStore.insert(0, {	'eth' : 'All Interface'	});

        component.down('[itemId=ctn_ipmanager_select]').down('[itemId=cmb_select]').setValue('All Interface');

        // 데이터 초기화 ===================================================================================================================================================================

        try{

            var deviceData = component.deviceParams;

            if(deviceData.response)
                component.down('[itemId=txf_detourmac]').setValue(deviceData.response.mac);

            if(deviceData.manager){

                Ext.each(deviceData.manager, function(ipmanagerData, idx){

                    ipmanagerData['@chk_mac'] = (ipmanagerData['@chk_mac'] === 'on') ? true : false;

                    ipmanagerStore.add(ipmanagerData);

                });

            }

        }
        catch(err){

            console.log('IP 관리 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_ipmanageBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj       = {};

        var fds_mac   = this.down('[itemId=fds_ipmanager_mac]');
        var fds_ipset = this.down('[itemId=fds_ipmanager_ipset]');

        var detour    = fds_mac.down('[itemId=txf_detourmac]');
        var ip        = fds_ipset.down('[itemId=txf_ip]');
        var eth       = fds_ipset.down('[itemId=cmb_interface]');
        var mac       = fds_ipset.down('[itemId=txf_mac]');
        var setting   = fds_ipset.down('[itemId=cmb_set]');
        var usemac    = fds_ipset.down('[itemId=ck_mac]');
        var ip_grid   = this.down('[itemId=gpn_ipmanager_set]');

        return function(){

            obj.detour  = detour;
            obj.ip      = ip;
            obj.eth     = eth;
            obj.mac     = mac;
            obj.setting = setting;
            obj.usemac  = usemac;
            obj.ip_grid = ip_grid;

            return obj;

        }();
    },

    validityCheck: function() {
        // validityCheck ============================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : IP 관리 설정의 데이터를 추가, 설정시에 유효성 검사를 수행합니다.
        //
        // ==========================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(){

                if(component.ip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ipTypeCheck : function(){

                if(!component.ip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IPv4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ipmValidCheck : function(){

                if(component.detour.getValue() !== '' && !component.detour.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'MAC 주소의 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.mac.getValue() !== '' && !component.mac.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'MAC 주소의 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ipDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'ip["#text"]', 'st_ipmanager_set')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 IP가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _brName = component.ip_grid.getSelectionModel().getSelection()[0].get('ip');

                    if(!duplicationItem(componentValue, 'ip["#text"]', 'st_ipmanager_set') && _brName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
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

    initStore: function() {
        // initStore ====================================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : IP 관리 설정에서 사용하는 스토어를 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var ipmanagerStore = Ext.getStore('st_ipmanager_set');

        ipmanagerStore.removeAll();
    },

    saveData: function() {
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.04
        //
        // 설명 : IP 관리 설정을 저장합니다.
        //
        // =============================================================================================================================================================================

        var ipmanagerStore = Ext.getStore('st_ipmanager_set');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // =============================================================================================================================================================================

        if(!this.validityCheck().ipmValidCheck()){

            return false;

        }

        if(!deviceAllData.ip_manager){

            deviceAllData.ip_manager = {};

        }

        // MAC 저장 =====================================================================================================================================================================

        var saveMac = this.componentStorage().detour.getValue();

        if(!deviceAllData.ip_manager.response){

            deviceAllData.ip_manager.response = {};

        }

        deviceAllData.ip_manager.response.mac = (saveMac !== '') ? saveMac : null;

        // IP 관리설정 갯수 지정 ==========================================================================================================================================================

        if(ipmanagerStore.count() === 0){

            delete deviceAllData.ip_manager.manager;

        }
        else{

            var ipmanagerArray = [];

            for(var i = 0; i < ipmanagerStore.count(); i++){

                var saveObj = ipmanagerStore.getAt(i).data;

                saveObj['@chk_mac'] = (saveObj['@chk_mac'] === true) ? 'on' : 'off';

                ipmanagerArray.push(saveObj);

            }

            deviceAllData.ip_manager.manager = ipmanagerArray;

        }

        return true;
    }

});