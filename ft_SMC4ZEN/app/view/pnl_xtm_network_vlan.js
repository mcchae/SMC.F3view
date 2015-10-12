
Ext.define('SMC4ZEN.view.pnl_xtm_network_vlan', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_network_vlanViewModel',
        'SMC4ZEN.view.ctn_network_control',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    config: {
        static_num: 0
    },

    viewModel: {
        type: 'pnl_xtm_network_vlan'
    },
    height: 680,
    id: 'pnl_xtm_network_vlan',
    width: 800,
    bodyPadding: 10,
    title: 'VLAN',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_network_vlanAfterRender',
        beforeclose: 'onPnl_xtm_network_vlanBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        itemId: 'ctn_vlan_eth',
                        margin: '0, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                itemId: 'cmb_interface',
                                width: 250,
                                fieldLabel: '인터페이스',
                                value: 'eth0',
                                editable: false,
                                emptyText: 'Select interface ...',
                                displayField: 'eth',
                                queryMode: 'local',
                                store: 'st_common_alleth',
                                valueField: 'eth'
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        itemId: 'ctn_vlan_id',
                        margin: '0, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'numberfield',
                                itemId: 'txf_vlanid',
                                width: 250,
                                fieldLabel: 'VLAN ID',
                                maxText: 'ID의 범위는 0 ~ 2047 입니다.',
                                maxValue: 2047,
                                minText: 'ID의 범위는 0 ~ 2047 입니다.',
                                minValue: 0
                            }
                        ]
                    },
                    {
                        xtype: 'ctn_network_control',
                        itemId: 'ctn_vlan_control',
                        margin: '10, 0, 10, 0',
                        listeners: {
                            afterrender: 'onCtn_vlan_controlAfterRender'
                        }
                    },
                    {
                        xtype: 'gridpanel',
                        flex: 1,
                        itemId: 'gpn_vlan_grid',
                        title: '',
                        columns: [
                            {
                                xtype: 'rownumberer',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                text: 'VLAN 인터페이스',
                                flex: 1.5
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                    return value['#text'];
                                },
                                dataIndex: 'interface',
                                text: '인터페이스',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: '@id',
                                text: 'VLAN ID',
                                flex: 1
                            }
                        ],
                        listeners: {
                            itemclick: 'onGpn_vlan_gridItemClick'
                        },
                        selModel: Ext.create('Ext.selection.RowModel', {
                            selType: 'rowmodel',
                            mode: 'MULTI'
                        })
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onCtn_vlan_controlAfterRender: function(component, eOpts) {
        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck() || !me.validityCheck().vlanIdDuplicationCheck(componentObj.id.getValue(), 'add')){

                return;

            }

            var obj           = {};
            var interface_obj = {};

            interface_obj['#text'] = componentObj.eth.getValue();

            obj['@num']       = 0;
            obj['@tag']       = "";

            obj['@zone']      = null;
            obj.desc          = null;
            obj['@id']        = componentObj.id.getValue();
            obj['interface']  = interface_obj;
            obj.name          = 'vlan' + componentObj.id.getValue();

            gridData_Add(componentObj.vlangrid, obj);

            reconfigNum(componentObj.vlangrid.getStore());

            addInterface(componentObj.vlangrid.getStore(), Ext.getStore('st_common_vlaneth'), 'name');

            addInterface(componentObj.vlangrid.getStore(), Ext.getStore('st_policy_vlaneth'), 'name');

        });

        bt_mod.on('click', function(){

            if(!componentObj.vlangrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'VLAN 수정 에러',
                    msg : '수정할 VLAN 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck() || !me.validityCheck().vlanIdDuplicationCheck(componentObj.id.getValue(), 'modify')){

                return;

            }

            var obj           = {};
            var interface_obj = {};

            obj['@id']       = componentObj.id.getValue();
            interface_obj['#text'] = componentObj.eth.getValue();
            obj['interface'] = interface_obj;
            obj.name         = 'vlan' + componentObj.id.getValue();

            modInterface(Ext.getStore('st_common_vlaneth'),
                         componentObj.vlangrid.getSelectionModel().getSelection()[0].get('interface'),
                         componentObj.id.getValue());

            modInterface(Ext.getStore('st_policy_vlaneth'),
                         componentObj.vlangrid.getSelectionModel().getSelection()[0].get('interface'),
                         componentObj.id.getValue());

            selectionGrid_Mod(componentObj.vlangrid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.vlangrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'VLAN 삭제 에러',
                    msg : '삭제할 VLAN 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            var delRecord = selectionGrid_Del(componentObj.vlangrid);

            reconfigNum(componentObj.vlangrid.getStore());

            for(var i = 0; i < delRecord.length; i++){

                delInterface(Ext.getStore('st_common_vlaneth'), delRecord[i].data.name);

                delInterface(Ext.getStore('st_policy_vlaneth'), delRecord[i].data.name);

            }

        });
    },

    onGpn_vlan_gridItemClick: function(dataview, record, item, index, e, eOpts) {
        var ctnMain = Ext.ComponentQuery.query('[id=pnl_xtm_network_vlan]')[0];

        var eth     = ctnMain.down('[itemId=ctn_vlan_eth]').down();
        var vlanid  = ctnMain.down('[itemId=ctn_vlan_id]').down();

        eth.setValue(record.data['interface']['#text']);

        vlanid.setValue(record.data['@id']);
    },

    onPnl_xtm_network_vlanAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_vlanAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : vlan 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var vlanStore = Ext.getStore('st_vlan_set');

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                if(deviceData.vlan){

                    vlanStore.add(deviceData.vlan);

                }

            }

        }
        catch(err){

            console.log('Vlan 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_vlanBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj          = {};

        var eth          = this.down('[itemId=cmb_interface]');
        var id           = this.down('[itemId=txf_vlanid]');
        var vlangrid     = this.down('[itemId=gpn_vlan_grid]');

        return function(){

            obj.eth      = eth;
            obj.id       = id;
            obj.vlangrid = vlangrid;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck =========================================================================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : vlan의 유효성을 검사합니다.
        //
        // - vlan ID 중복 체크
        //
        // =======================================================================================================================================================================

        var component = this.componentStorage();

        var vlanStore = component.vlangrid.getStore();

        var validCheckObj = {

            blankCheck : function(){

                if(component.id.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'VLAN ID는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    component.id.focus();

                    return false;

                }

                return true;

            },
            vlanIdDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, '@id', 'st_vlan_set')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 VLAN ID가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        component.id.focus();

                        return false;

                    }

                    return true;

                }
                else{

                    var _vlanId = component.vlangrid.getSelectionModel().getSelection()[0].get('@id');

                    if(!duplicationItem(componentValue, '@id', 'st_vlan_set') && _vlanId !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 VLAN ID가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        component.id.focus();

                        return false;

                    }

                    return true;

                }

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        var vlanStore     = Ext.getStore('st_vlan_set');
        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        if(vlanStore.count() === 1){

            dataObj = {};

            dataObj = vlanStore.getAt(0).data;

        }
        else if(vlanStore.count() > 1){

            dataObj = [];

            for(var i = 0; i < vlanStore.count(); i++){

                dataObj.push(vlanStore.getAt(i).data);

            }

        }
        else{

            deviceAllData.network_vlan = null;

            return true;

        }

        if(deviceAllData.network_vlan){

            deviceAllData.network_vlan.vlan = dataObj;

        }
        else{

            deviceAllData.network_vlan = {};

            deviceAllData.network_vlan.vlan = dataObj;

        }

        return true;
    },

    initStore: function() {
        var vlanStore = Ext.getStore('st_vlan_set');

        vlanStore.removeAll();

        // 스토어와 그리드 바인딩

        this.down('[itemId=gpn_vlan_grid]').bindStore(vlanStore);
    }

});