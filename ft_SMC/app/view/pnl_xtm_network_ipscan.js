
Ext.define('SMC.view.pnl_xtm_network_ipscan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_network_ipscan',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 680,
    id: 'pnl_xtm_network_ipscan',
    width: 800,
    title: 'IP Scan 설정',

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
                    xtype: 'fieldset',
                    itemId: 'fds_ipscan_setting',
                    title: '설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_ipscan_top',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_interface',
                                    margin: '0, 10, 0, 0',
                                    minWidth: 250,
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
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
                                    margin: '0, 10, 0, 0',
                                    fieldLabel: 'IP',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_scantype',
                                    maxWidth: 250,
                                    fieldLabel: '스캔 방법',
                                    value: 'ARP',
                                    editable: false,
                                    displayField: 'type',
                                    queryMode: 'local',
                                    store: 'st_ipscan_scantype',
                                    valueField: 'type'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_ipscan_bottom',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    itemId: 'cmb_cycle',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 250,
                                    fieldLabel: '실행주기(분)',
                                    value: 5,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_ipscan_cycle',
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_cycleChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 5, 120);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'nfd_usercycle',
                                    margin: '0, 10, 0, 0',
                                    maxWidth: 70,
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'lab_text',
                                    text: '분'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_ipscan_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_bridge_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_ipscan_set',
                    title: '',
                    store: 'st_ipscan_set',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'interface',
                            text: '인터페이스',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value['#text'];
                            },
                            dataIndex: 'ip',
                            text: 'IP 주소',
                            flex: 2
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'cycle',
                            text: '실행 주기(분)',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'type',
                            text: '스캔 방법',
                            flex: 1
                        }
                    ],
                    listeners: {
                        itemclick: {
                            fn: me.onGpn_ipscan_setItemClick,
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
                    fn: me.onPnl_xtm_network_ipscanAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_network_ipscanBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_cycleChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_cycleChange ===========================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : IP 실행 주기를 선택합니다. 사용자 설정 선택시 넘버 필드를 보여줍니다.
        //
        // =============================================================================================================================================================================

        var usrCycle = field.up().down('[itemId=nfd_usercycle]');
        var usrText  = field.up().down('[itemId=lab_text]');

        if(newValue === 'user'){

            usrCycle.setVisible(true);
            usrText.setVisible(true);

        }
        else{

            usrCycle.setVisible(false);
            usrText.setVisible(false);

        }
    },

    onCtn_bridge_controlAfterRender: function(component, eOpts) {
        // onCtn_bridge_controlAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : IP 관리 설정 값을 추가, 수정, 삭제합니다.
        //
        // ============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().blankCheck() || !me.validityCheck().ipTypeCheck()){

                return;

            }

            // usercycle validation check 추가
            if(componentObj.cycle.getValue() === 'user'){

                if(!me.validityCheck().usercycleCheck()){

                    return;
                }
            }

            var obj = {};

            obj['@num']       = 0;
            obj.cycle         = (componentObj.cycle.getValue() === 'user') ? componentObj.usercycle.getValue() : componentObj.cycle.getValue();
            obj['interface']  = componentObj.eth.getValue();

            var ipObj = {};

            ipObj['#text']    = componentObj.ip.getValue();
            ipObj['@type']    = 'single';
            ipObj['@version'] = 'v4';

            obj.ip            = ipObj;
            obj.type          = componentObj.type.getValue();

            gridData_Add(componentObj.ipscan_grid, obj);

            reconfigNum(componentObj.ipscan_grid.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.ipscan_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'IP Scan 수정 에러',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().blankCheck() || !me.validityCheck().ipTypeCheck()){

                return;

            }

            // usercycle validation check 추가
            if(componentObj.cycle.getValue() === 'user'){

                if(!me.validityCheck().usercycleCheck()){

                    return;
                }
            }

            var obj = {};

            obj.cycle         = (componentObj.cycle.getValue() === 'user') ? componentObj.usercycle.getValue() : componentObj.cycle.getValue();
            obj['interface']  = componentObj.eth.getValue();

            var ipObj = {};

            ipObj['#text']    = componentObj.ip.getValue();
            ipObj['@type']    = 'single';
            ipObj['@version'] = 'v4';

            obj.ip            = ipObj;
            obj.type          = componentObj.type.getValue();

            selectionGrid_Mod(componentObj.ipscan_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.ipscan_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'IP Scan 삭제 에러',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.ipscan_grid);

            reconfigNum(componentObj.ipscan_grid.getStore());

        });
    },

    onGpn_ipscan_setItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_ipscan_setItemClick ===================================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : IP Scan 그리드를 클릭하면 해당하는 데이터를 컴포넌트에 표시합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        component.eth.setValue(record.data['interface']);
        component.ip.setValue(record.data.ip['#text']);
        component.type.setValue(record.data.type);
        component.cycle.setValue((record.data.cycle === 5 || record.data.cycle === 10 || record.data.cycle === 30 || record.data.cycle === 60) ? record.data.cycle : 'user');
        component.usercycle.setValue(record.data.cycle);
    },

    onPnl_xtm_network_ipscanAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_ipscanAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : IP Scan 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var ipscanStore = Ext.getStore('st_ipscan_set');

        this.initStore();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.scan;

                if(deviceData){

                    ipscanStore.add(deviceData);

                }

            }

        }
        catch(err){

            console.log('IP Scan 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_ipscanBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_network_ipscanBeforeClose ==========================================================================================================================================
        //
        // 일시 : 2014.08.12
        //
        // 설명 : 화면이 close 되면 데이터를 save 합니다.
        //
        // ==============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_setting = this.down('[itemId=fds_ipscan_setting]');

        obj.eth  = fds_setting.down('[itemId=ctn_ipscan_top]').down('[itemId=cmb_interface]');
        obj.ip   = fds_setting.down('[itemId=ctn_ipscan_top]').down('[itemId=txf_ip]');
        obj.type = fds_setting.down('[itemId=ctn_ipscan_top]').down('[itemId=cmb_scantype]');

        obj.cycle = fds_setting.down('[itemId=ctn_ipscan_bottom]').down('[itemId=cmb_cycle]');
        obj.usercycle = fds_setting.down('[itemId=ctn_ipscan_bottom]').down('[itemId=nfd_usercycle]');

        obj.ipscan_grid = this.down('[itemId=gpn_ipscan_set]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck =============================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : IP 관리 설정의 데이터를 추가, 설정시에 유효성 검사를 수행합니다.
        //
        // ===========================================================================================================================================================================

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
            // usercycle validation check 추가
            usercycleCheck : function(){

                if(!CheckNotNull(component.usercycle.getValue())){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '실행주기는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;
                }

                if(!component.usercycle.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '5 ~ 120 사이의 정수만 입력 가능합니다.',
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
        // saveData ====================================================================================================================================================================
        //
        // 일시 : 2014.08.13
        //
        // 설명 : IP Scan 설정을 저장합니다.
        //
        // =============================================================================================================================================================================

        var ipscanStore = Ext.getStore('st_ipscan_set');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // IP 관리설정 갯수 지정 ==========================================================================================================================================================

        if(ipscanStore.count() === 0){

            deviceAllData.ip_scan = null;

        }
        else{

            if(!deviceAllData.ip_scan){

                deviceAllData.ip_scan = {};

            }

            var ipscanArray = [];

            for(var i = 0; i < ipscanStore.count(); i++){

                ipscanArray.push(ipscanStore.getAt(i).data);

            }

            deviceAllData.ip_scan.scan = ipscanArray;

        }

        return true;
    },

    initStore: function() {
        var ipscanStore = Ext.getStore('st_ipscan_set');

        ipscanStore.removeAll();
    }

});