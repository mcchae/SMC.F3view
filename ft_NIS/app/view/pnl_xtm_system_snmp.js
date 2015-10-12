
Ext.define('SMC.view.pnl_xtm_system_snmp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_system_snmp',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_system_snmp',
    width: 800,
    bodyPadding: 10,
    title: 'SNMP',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    border: false,
                    itemId: 'fm_snmp_inputform',
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_snmp_input1',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 0.8,
                                    itemId: 'txf_community',
                                    margin: '0, 150, 0, 0',
                                    fieldLabel: '커뮤니티'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    itemId: 'ck_trap',
                                    fieldLabel: '',
                                    boxLabel: 'TRAP 주소',
                                    listeners: {
                                        change: {
                                            fn: me.onCk_trapChange,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_snmp_input2',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 2,
                                    itemId: 'txf_etcinfo',
                                    margin: '0, 30, 0, 0',
                                    width: 340,
                                    fieldLabel: '기타 정보'
                                },
                                {
                                    xtype: 'radiogroup',
                                    disabled: true,
                                    itemId: 'rdg_iptype',
                                    margin: '0, 30, 0, 0',
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_ipv4',
                                            margin: '0, 30, 0, 0',
                                            name: 'iptype',
                                            boxLabel: 'IPv4',
                                            checked: true,
                                            inputValue: 'v4'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_ipv6',
                                            name: 'iptype',
                                            boxLabel: 'IPv6',
                                            inputValue: 'v6'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var component = Ext.getCmp('pnl_xtm_system_snmp').componentStorage().iptype;

                                        if(component.getValue().iptype === 'v4'){

                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                        else{

                                            var retValue = ValidIPv6(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;

                                        }
                                    },
                                    flex: 1,
                                    disabled: true,
                                    itemId: 'txf_ipaddr',
                                    width: 250,
                                    fieldLabel: '',
                                    enableKeyEvents: true
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_snmp_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_snmp_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_snmp_set',
                    title: '',
                    store: 'st_system_snmp_set',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value.split(':')[0];
                            },
                            dataIndex: 'community',
                            text: '커뮤니티',
                            flex: 1.5
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value.substring(value.split(':')[0].length + 1);
                            },
                            dataIndex: 'community',
                            text: 'TRAP',
                            flex: 1.5
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'location',
                            text: '기타정보',
                            flex: 2
                        }
                    ],
                    listeners: {
                        itemclick: {
                            fn: me.onGpn_snmp_setItemClick,
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
                    fn: me.onPnl_xtm_system_snmpAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_system_snmpBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCk_trapChange: function(field, newValue, oldValue, eOpts) {
        var component = this.componentStorage();

        if(newValue){

            component.iptype.setDisabled(false);

            component.ipaddr.setDisabled(false);

        }
        else{

            component.iptype.setDisabled(true);

            component.ipaddr.setDisabled(true);

        }
    },

    onCtn_snmp_controlAfterRender: function(component, eOpts) {
        // onCtn_snmp_controlAfterRender ================================================================================================================================================
        //
        // 일시 : 2014.09.15
        //
        // 설명 : SNMP 에 대한 추가, 수정, 삭제 기능을 수행한다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().snmpCountCheck() || !me.validityCheck().snmpBlankCheck() || !me.validityCheck().snmpValidCheck(componentObj.iptype.getValue().iptype)){

                return;

            }

            var obj = {};

            if(!componentObj.trap.getValue()){

                obj.community = componentObj.community.getValue() + ':';

            }
            else{

                obj.community = componentObj.community.getValue() + ':' + componentObj.ipaddr.getValue();

            }

            obj.location       = componentObj.etcinfo.getValue();

            var setObj = {};

            setObj['@chk_authtrap'] = (componentObj.trap.getValue() === true) ? "on" : "off";
            setObj['@chk_use'] = "on";
            setObj['@type']    = componentObj.iptype.getValue().iptype;

            obj.setting = setObj;

            gridData_Add(componentObj.snmp_grid, obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.snmp_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'SNMP 수정 에러',
                    msg : '선택된 SNMP 데이터가 없습니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().snmpBlankCheck() || !me.validityCheck().snmpValidCheck(componentObj.iptype.getValue().iptype)){

                return;

            }

            var obj = {};

            if(!componentObj.trap.getValue()){

                obj.community = componentObj.community.getValue() + ':';

            }
            else{

                obj.community = componentObj.community.getValue() + ':' + componentObj.ipaddr.getValue();

            }

            obj.location            = componentObj.etcinfo.getValue();

            var setObj              = {};

            setObj['@chk_authtrap'] = (componentObj.trap.getValue() === true) ? "on" : "off";
            setObj['@chk_use']      = "on";
            setObj['@type']         = componentObj.iptype.getValue().iptype;

            obj.setting = setObj;

            selectionGrid_Mod(componentObj.snmp_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.snmp_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'SNMP 삭제 에러',
                    msg : '선택된 SNMP 데이터가 없습니다.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.snmp_grid);

        });
    },

    onGpn_snmp_setItemClick: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.community.setValue(record.data.community.split(':')[0]);
        component.trap.setValue((record.data.setting['@chk_authtrap'] === 'on') ? true : false);
        component.etcinfo.setValue(record.data.location);
        component.iptype.setValue({ 'iptype' : record.data.setting['@type']});
        component.ipaddr.setValue(record.data.community.substring(record.data.community.split(':')[0].length + 1));
    },

    onPnl_xtm_system_snmpAfterRender: function(component, eOpts) {
        // onPnl_xtm_system_snmpAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.07.13
        //
        // 설명 : 시스템 SNMP 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var snmpStore  = Ext.getStore('st_system_snmp_set');

        this.initStore();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.snmp;

                if(deviceData){

                    snmpStore.add(deviceData);

                }

            }

        }
        catch(err){

            console.log('시스템 SNMP 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_system_snmpBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var ctnInput1 = this.down('[itemId=ctn_snmp_input1]');
        var ctnInput2 = this.down('[itemId=ctn_snmp_input2]');

        var community = ctnInput1.down('[itemId=txf_community]');
        var trap      = ctnInput1.down('[itemId=ck_trap]');

        var etcinfo   = ctnInput2.down('[itemId=txf_etcinfo]');
        var iptype    = ctnInput2.down('[itemId=rdg_iptype]');
        var ipaddr    = ctnInput2.down('[itemId=txf_ipaddr]');

        var snmp_grid = this.down('[itemId=gpn_snmp_set]');

        return function(){

            obj.community = community;
            obj.trap      = trap;
            obj.etcinfo   = etcinfo;
            obj.iptype    = iptype;
            obj.ipaddr    = ipaddr;
            obj.snmp_grid = snmp_grid;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.10
        //
        // 설명 : SNMP의 유효성 검사를 수행합니다.
        //
        // - TRAP IP 유효성 검사
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            snmpBlankCheck : function(){

                if(component.community.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '커뮤니티는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.ipaddr.getValue() === '' && component.trap.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            snmpCountCheck : function(){

                if(component.snmp_grid.getStore().count() >= 5){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'SNMP 는 최대 5개만 등록할 수 있습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            snmpValidCheck : function(type){

                if(!component.ipaddr.validate() && component.trap.getValue()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : (type === 'v4') ? 'IP v4 형식에 맞지 않습니다.' : 'IP v6 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        var snmpStore     = Ext.getStore('st_system_snmp_set');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        if(snmpStore.count() === 1){

            dataObj = {};

            dataObj = snmpStore.getAt(0).data;

        }
        else if(snmpStore.count() > 1){

            dataObj = [];

            for(var i = 0; i < snmpStore.count(); i++){

                dataObj.push(snmpStore.getAt(i).data);

            }

        }
        else{

            deviceAllData.system_snmp = null;

            return true;

        }

        if(deviceAllData.system_snmp){

            deviceAllData.system_snmp.snmp = dataObj;

        }
        else{

            deviceAllData.system_snmp = {};

            deviceAllData.system_snmp.snmp = dataObj;

        }

        return true;
    },

    initStore: function() {
        var snmpStore = Ext.getStore('st_system_snmp_set');

        snmpStore.removeAll();
    }

});