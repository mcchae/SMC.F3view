
Ext.define('SMC4ZEN.view.pnl_xtm_network_bridge', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_xtm_network_bridge11',

    requires: [
        'SMC4ZEN.view.pnl_xtm_network_bridgeViewModel',
        'SMC4ZEN.view.ctn_network_control',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.form.field.Number',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Check',
        'Ext.selection.RowModel'
    ],

    config: {
        static_num: 0,
        deviceParam: ''
    },

    viewModel: {
        type: 'pnl_xtm_network_bridge'
    },
    height: 680,
    id: 'pnl_xtm_network_bridge',
    width: 800,
    bodyPadding: 10,
    title: '브릿지 설정',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_network_bridgeAfterRender',
        beforeclose: 'onPnl_xtm_network_bridgeBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        id: '',
                        itemId: 'ctn_bridge_top',
                        margin: '0, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                itemId: 'cmb_bridgename',
                                margin: '0, 30, 0, 0',
                                maxWidth: 250,
                                width: 250,
                                fieldLabel: '브릿지 이름',
                                value: 'br0',
                                editable: false,
                                displayField: 'br',
                                queryMode: 'local',
                                store: 'st_bridge_name',
                                valueField: 'br'
                            },
                            {
                                xtype: 'checkboxfield',
                                itemId: 'ck_usestp',
                                width: 100,
                                fieldLabel: 'STP 사용',
                                boxLabel: '',
                                listeners: {
                                    change: 'onId_cb_useSTPChange'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'container',
                        flex: 0.5,
                        height: 143,
                        itemId: 'ctn_bridge_mid',
                        margin: '0, 0, 10, 0',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 0.5,
                                height: 136,
                                itemId: 'ctn_bridge_member',
                                margin: '0, 20, 0, 0',
                                maxWidth: 260,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cmb_bridgemember',
                                        margin: '0, 0, 10, 0',
                                        maxWidth: 250,
                                        minWidth: 250,
                                        fieldLabel: '브릿지 멤버',
                                        editable: false,
                                        emptyText: 'Select',
                                        displayField: 'eth',
                                        queryMode: 'local',
                                        store: 'st_common_deveth',
                                        valueField: 'eth',
                                        listeners: {
                                            change: 'onCmb_bridgememberChange'
                                        }
                                    },
                                    {
                                        xtype: 'gridpanel',
                                        flex: 1,
                                        itemId: 'gpn_bridgemember',
                                        title: '',
                                        hideHeaders: true,
                                        columns: [
                                            {
                                                xtype: 'gridcolumn',
                                                align: 'center',
                                                dataIndex: 'member',
                                                text: '브릿지 멤버',
                                                flex: 0.8
                                            },
                                            {
                                                xtype: 'actioncolumn',
                                                align: 'center',
                                                flex: 0.2,
                                                items: [
                                                    {
                                                        handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                            var store = Ext.getStore('st_bridge_bridgemember');

                                                            store.removeAt(rowIndex);
                                                        },
                                                        iconCls: 'ico_grid_row_delete'
                                                    }
                                                ]
                                            }
                                        ],
                                        listeners: {
                                            beforerender: 'onGpn_bridgememberBeforeRender'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                itemId: 'ctn_bridge_learningtime',
                                items: [
                                    {
                                        xtype: 'numberfield',
                                        validator: function(value) {
                                            var retValue = LengthCheck(value, 1, 600);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;
                                        },
                                        disabled: true,
                                        itemId: 'nfd_learningtime',
                                        width: 200,
                                        fieldLabel: 'Learning Time',
                                        value: 1,
                                        maxValue: 600,
                                        minValue: 0
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'ctn_network_control',
                        margin: '10, 0, 10, 0',
                        listeners: {
                            afterrender: 'onCtn_bridge_controlAfterRender'
                        }
                    },
                    {
                        xtype: 'gridpanel',
                        flex: 1,
                        itemId: 'gpn_bridge_set',
                        title: '',
                        columns: [
                            {
                                xtype: 'rownumberer',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'name',
                                text: '이름',
                                flex: 1.5
                            },
                            {
                                xtype: 'checkcolumn',
                                dataIndex: '@chk_stp',
                                text: 'STP 사용',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: '@learning_time',
                                text: 'Learning Time',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'member',
                                text: '브릿지 멤버',
                                flex: 2
                            }
                        ],
                        selModel: Ext.create('Ext.selection.RowModel', {
                            selType: 'rowmodel',
                            mode: 'MULTI'
                        }),
                        listeners: {
                            itemclick: 'onGpn_bridge_setItemClick',
                            beforerender: 'onGpn_bridge_setBeforeRender'
                        }
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onId_cb_useSTPChange: function(field, newValue, oldValue, eOpts) {
        var learningtime = Ext.ComponentQuery.query('[itemId=ctn_bridge_learningtime]')[0].down();

        if(newValue){

            learningtime.setDisabled(false);

        }

        else{

            learningtime.setDisabled(true);

        }
    },

    onCmb_bridgememberChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_bridgememberChange ======================================================================================================================================================
        //
        // 일시 : 2014.07.02
        //
        // 설명 : 브릿지 멤버를 추가 합니다.
        //
        // ===============================================================================================================================================================================

        var memberlist = Ext.getStore('st_bridge_bridgemember');

        if(duplicationItem(newValue, 'member', 'st_bridge_bridgemember') === false){

            Ext.Msg.show({

                title : SMC_SET_PRODUCT,
                msg : '동일한 브릿지 멤버가 이미 추가되어 있습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

            return false;

        }

        memberlist.add({ 'member' : newValue });
    },

    onGpn_bridgememberBeforeRender: function(component, eOpts) {
        component.bindStore(Ext.getStore('st_bridge_bridgemember'));
    },

    onCtn_bridge_controlAfterRender: function(component, eOpts) {
        // onCtn_bridge_controlAfterRender ==============================================================================================================================================
        //
        // 일시 : 2014.06.23
        //
        // 설명 : 브릿지 추가, 수정, 삭제작업을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var bridgeStore = componentObj.bridgegrid.getStore();

        var me = this;

        bt_add.on('click', function(){

        // 중복값 체크 ====================================================================================================================================================================
        //
        // 설명 : 브릿지 이름과 브릿지 멤버가 중복 되어 있을 경우 return 합니다.
        //
        // ==============================================================================================================================================================================

            if(!me.validityCheck().blankCheck() ||
               !me.validityCheck().bridgeDuplicationCheck(componentObj.bridgename.getValue(), 'add') ||
               !me.validityCheck().bridgeTimeCheck(componentObj.learningtime, componentObj.usestp.getValue()) ||
               !me.validityCheck().memberDuplicationCheck('add')
              ){

                return;

            }

            var eth_array = [];

            var member_str = "";

            for(var i = 0; i < componentObj.bridgememberlist.getStore().count(); i++){

                var member = componentObj.bridgememberlist.getStore().getAt(i).get('member');

                member_str += ((i+1) === componentObj.bridgememberlist.getStore().count()) ? member : member + ', ';

                eth_array.push(member);

            }

            var obj = {};

            obj['@chk_stp']       = componentObj.usestp.getValue();
            obj['@cid']           = "";
            obj['@count']         = componentObj.bridgememberlist.getStore().count();
            obj['@groupcid']      = "";
            obj['@learning_time'] = (componentObj.usestp.getValue() === true) ? componentObj.learningtime.getValue() : 1;
            obj['@tag']           = "";
            obj['@zone']          = null;
            obj.desc              = null;

            if(componentObj.bridgememberlist.getStore().count() === 1){

                obj['interface']  = componentObj.bridgememberlist.getStore().getAt(0).get('member');

            }
            else if(componentObj.bridgememberlist.getStore().count() > 1){

                obj['interface']  = eth_array;

            }

            obj.member            = member_str;

            obj.name              = componentObj.bridgename.getValue();

            gridData_Add(componentObj.bridgegrid, obj);

            reconfigNum(componentObj.bridgegrid.getStore());

            addInterface(componentObj.bridgegrid.getStore(), Ext.getStore('st_common_bondeth'), 'name');

            addInterface(componentObj.bridgegrid.getStore(), Ext.getStore('st_common_alleth'), 'name');

        });

        bt_mod.on('click', function(){

            if(!componentObj.bridgegrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 브릿지를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().bridgeDuplicationCheck(componentObj.bridgename.getValue(), 'modify') ||
               !me.validityCheck().memberDuplicationCheck('modify') ||
               !me.validityCheck().bridgeTimeCheck(componentObj.learningtime, componentObj.usestp.getValue()) ||
               !me.validityCheck().blankCheck()){

                return;

            }

            var iface = "";
            var eth   = [];
            var _eth  = "";

            for(var i = 0; i < componentObj.bridgememberlist.getStore().count(); i++){

                if(componentObj.bridgememberlist.getStore().count() <= 1){

                    _eth  = componentObj.bridgememberlist.getStore().getAt(i).get('member');

                    iface = _eth;

                }
                else{

                    var tmp = "";

                    tmp = componentObj.bridgememberlist.getStore().getAt(i).get('member');

                    eth.push(tmp);

                    iface += ((i+1) === componentObj.bridgememberlist.getStore().count()) ? tmp : tmp + ', ';

                }

            }

            var obj = {};

            obj['@chk_stp']       = componentObj.usestp.getValue();
            obj['@count']         = componentObj.bridgememberlist.getStore().count();
            obj['@learning_time'] = (componentObj.usestp.getValue() === true) ? componentObj.learningtime.getValue() : 1;
            obj['interface']      = (_eth === "") ? eth : _eth;
            obj.member            = iface;
            obj.name              = componentObj.bridgename.getValue();

            modInterface(Ext.getStore('st_common_bondeth'),
                         componentObj.bridgegrid.getSelectionModel().getSelection()[0].get('name'),
                         componentObj.bridgename.getValue());

            modInterface(Ext.getStore('st_common_alleth'),
                         componentObj.bridgegrid.getSelectionModel().getSelection()[0].get('name'),
                         componentObj.bridgename.getValue());

            selectionGrid_Mod(componentObj.bridgegrid, obj);

        });

        // 삭제 작업 시 주의사항 ===========================================================================================================================================================
        //
        // 설명 : 브릿지를 추가할 때 브릿지를 bonding과 alleth에 추가합니다. 추가 된 데이터를 삭제 시 다음 화면들에 영향을 미칠 수 있습니다.
        //
        // ==============================================================================================================================================================================

        bt_del.on('click', function(){

            if(!componentObj.bridgegrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 브릿지를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            var delRecord = selectionGrid_Del(componentObj.bridgegrid);

            reconfigNum(componentObj.bridgegrid.getStore());

            for(var i = 0; i < delRecord.length; i++){

                delInterface(Ext.getStore('st_common_bondeth'), delRecord[i].data.name);

                delInterface(Ext.getStore('st_common_alleth'), delRecord[i].data.name);

            }

        });
    },

    onGpn_bridge_setItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = Ext.getCmp('pnl_xtm_network_bridge').componentStorage();

        componentObj.bridgename.setValue(record.data.name);
        componentObj.bridgememberlist.getStore().removeAll();
        componentObj.usestp.setValue(record.data['@chk_stp']);
        componentObj.learningtime.setValue(record.data['@learning_time']);

        Ext.each(record.data['interface'], function(ethData, idx){

            componentObj.bridgememberlist.getStore().add({ 'member' : ethData });

        });
    },

    onGpn_bridge_setBeforeRender: function(component, eOpts) {
        component.bindStore(Ext.getStore('st_bridge_set'));
    },

    onPnl_xtm_network_bridgeAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_bridgeAfterRender ===========================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 브릿지 데이터를 그리드에 출력합니다. (이하 다른 화면에서 그리드의 스토어에 데이터를 넣는 작업을 그리드에 출력함으로 정의함.)
        //
        // ===============================================================================================================================================================================

        var bridgeStore = Ext.getStore('st_bridge_set');

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                if(deviceData.bridge){

                    Ext.each(deviceData.bridge, function(bridgeData){

                        bridgeData['@chk_stp'] = (bridgeData['@chk_stp'] === 'on') ? true : false;

                    });

                    bridgeStore.add(deviceData.bridge);

                }

            }

        }
        catch(err){

            console.log('브릿지 데이터 로드 중 catch가 발생함 : ', err);

        }
    },

    onPnl_xtm_network_bridgeBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};
        var ctn_top = this.down('[itemId=ctn_bridge_top]');
        var ctn_mid = this.down('[itemId=ctn_bridge_mid]');

        var bridgename = ctn_top.down('[itemId=cmb_bridgename]');
        var usestp = ctn_top.down('[itemId=ck_usestp]');
        var bridgemember = ctn_mid.down('[itemId=ctn_bridge_member]').down('[itemId=cmb_bridgemember]');
        var bridgememberlist = ctn_mid.down('[itemId=ctn_bridge_member]').down('[itemId=gpn_bridgemember]');
        var learningtime = ctn_mid.down('[itemId=ctn_bridge_learningtime]').down();

        var bridgegrid = this.down('[itemId=gpn_bridge_set]');

        obj.ctn_top = ctn_top;
        obj.ctn_mid = ctn_mid;
        obj.bridgename = bridgename;
        obj.usestp = usestp;
        obj.bridgemember = bridgemember;
        obj.bridgememberlist = bridgememberlist;
        obj.learningtime = learningtime;
        obj.bridgegrid = bridgegrid;

        return obj;
    },

    validityCheck: function() {
        // validityCheck ========================================================================================================================================================
        //
        // 일시 : 2014.07.02
        //
        // 설명 : 브릿지의 유효성 검사를 수행합니다. 유효성 검사는 다음과 같습니다.
        //
        // - 브릿지 중복 체크
        // - 브릿지 멤버 중복 체크
        // - 브릿지 인터페이스 중복 체크
        //
        // ======================================================================================================================================================================

        var memberlist  = Ext.getStore('st_bridge_bridgemember');
        var bridgeStore = Ext.getStore('st_bridge_set');
        var bridgeGrid  = this.down('[itemId=gpn_bridge_set]');

        var validCheckObj = {

            blankCheck : function(){

                if(memberlist.count() === 0){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '브릿지 멤버는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            bridgeTimeCheck : function(component, stpMode){

                if(!component.validate() && stpMode){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Learning Time 범위는 1 ~ 600 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            bridgeDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'name', 'st_bridge_set')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 브릿지가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _brName = bridgeGrid.getSelectionModel().getSelection()[0].get('name');

                    if(!duplicationItem(componentValue, 'name', 'st_bridge_set') && _brName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 브릿지가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            },
            memberDuplicationCheck : function(mode){

                var modeFlag  = true;

                var modeValue = mode || 'add';

                if(modeValue === 'add'){

                    for(var i = 0; i < bridgeStore.count(); i++){

                        Ext.each(bridgeStore.getAt(i).get('interface'), function(ethData){

                            if(!duplicationItem(ethData, 'member', 'st_bridge_bridgemember')){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '같은 브릿지 멤버가 이미 등록되었습니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                modeFlag = false;

                            }

                        });

                    }

                    return modeFlag;

                }
                else{

                    var selectData = bridgeGrid.getSelectionModel().getSelection()[0];

                    for(var i = 0; i < bridgeStore.count(); i++){

                        if(i === bridgeStore.indexOf(selectData)){

                            continue;

                        }

                        Ext.each(bridgeStore.getAt(i).get('interface'), function(ethData){

                            if(!duplicationItem(ethData, 'member', 'st_bridge_bridgemember')){

                                Ext.Msg.show({

                                    title : 'WeGuardia™ SMC 2.0',
                                    msg : '같은 브릿지 멤버가 이미 등록되었습니다.',
                                    buttons : Ext.Msg.OK,
                                    icon : Ext.Msg.ERROR

                                });

                                modeFlag = false;

                                return false;

                            }
                            else{

                                modeFlag = true;

                            }

                        });

                        if(!modeFlag){

                            break;

                        }

                    }

                    return modeFlag;

                }

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        var bridgeStore   = Ext.getStore('st_bridge_set');
        var memberStore   = Ext.getStore('st_bridge_bridgemember');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        if(bridgeStore.count() > 0){

            dataObj = [];

            for(var i = 0; i < bridgeStore.count(); i++){

                bridgeStore.getAt(i).data['@chk_stp'] = (bridgeStore.getAt(i).data['@chk_stp'] === true) ? 'on' : 'off';

                dataObj.push(bridgeStore.getAt(i).data);

            }

        }
        else{

            deviceAllData.network_bridge = null;

            return true;

        }

        if(deviceAllData.network_bridge){

            deviceAllData.network_bridge.bridge = dataObj;

        }
        else{

            deviceAllData.network_bridge = {};

            deviceAllData.network_bridge.bridge = dataObj;

        }

        return true;
    },

    initStore: function() {
        var bridgeStore   = Ext.getStore('st_bridge_set');
        var memberStore   = Ext.getStore('st_bridge_bridgemember');

        bridgeStore.removeAll();
        memberStore.removeAll();
    }

});