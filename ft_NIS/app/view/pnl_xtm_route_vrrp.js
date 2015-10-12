
Ext.define('SMC.view.pnl_xtm_route_vrrp', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_route_vrrp',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 600,
    id: 'pnl_xtm_route_vrrp',
    width: 800,
    title: 'VRRP',

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
                    flex: 1,
                    itemId: 'ctn_vrrp_main',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            margins: '0, 10, 0, 0',
                            height: 237,
                            itemId: 'fds_vrrp_inputvrrp',
                            padding: 10,
                            overflowY: 'auto',
                            title: 'VRRP 정보 입력',
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vrrp_groupid',
                                    margin: '0, 0, 5, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 1, 255);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_groupid',
                                            width: 250,
                                            fieldLabel: '그룹 ID',
                                            maxText: '그룹 ID의 범위는 1 ~ 255 입니다.',
                                            maxValue: 255,
                                            minText: '그룹 ID의 범위는 1 ~ 255 입니다.',
                                            minValue: 1
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vrrp_interface',
                                    margin: '0, 0, 5, 0',
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
                                    xtype: 'container',
                                    itemId: 'ctn_vrrp_priority',
                                    margin: '0, 0, 5, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 255);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_priority',
                                            width: 250,
                                            fieldLabel: 'Priority',
                                            maxText: 'Priority의 범위는 0 ~ 255 입니다.',
                                            maxValue: 255,
                                            minText: 'Priority의 범위는 0 ~ 255 입니다.',
                                            minValue: 0
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vrrp_period',
                                    margin: '0, 0, 5, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                var retValue = LengthCheck(value, 0, 5);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'nfd_period',
                                            width: 250,
                                            fieldLabel: '주기',
                                            maxText: '주기의 범위는 0 ~ 5 입니다.',
                                            maxValue: 5,
                                            minText: '주기의 범위는 0 ~ 5 입니다.',
                                            minValue: 0
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vrrp_groupip',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue = ValidIPAddress(value);

                                                if(!retValue){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_groupip',
                                            width: 250,
                                            fieldLabel: '그룹 IP',
                                            enableKeyEvents: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            height: 237,
                            itemId: 'fds_vrrp_failover',
                            title: 'Failover',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    itemId: 'rdg_runmode',
                                    margin: '0, 0, 10, 0',
                                    fieldLabel: '동작 모드',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_master',
                                            name: 'mode',
                                            boxLabel: 'Master',
                                            inputValue: 'master'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_backup',
                                            name: 'mode',
                                            boxLabel: 'Backup',
                                            inputValue: 'backup'
                                        },
                                        {
                                            xtype: 'radiofield',
                                            itemId: 'rd_none',
                                            fieldLabel: '',
                                            name: 'mode',
                                            boxLabel: 'None',
                                            checked: true,
                                            inputValue: 'none'
                                        }
                                    ],
                                    listeners: {
                                        change: {
                                            fn: me.onRdg_runmodeChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 5);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    hidden: true,
                                    itemId: 'nfd_boostup',
                                    fieldLabel: 'Boostup'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'ctn_network_controlclass1',
                    itemId: 'ctn_vrrp_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: {
                            fn: me.onCtn_vrrp_controlAfterRender,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_vrrp_grid',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_vrrp_grid',
                            title: '',
                            store: 'st_route_vrrp',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'vid',
                                    text: '그룹 ID',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                        return value['@interface'];
                                    },
                                    dataIndex: 'setting',
                                    text: '인터페이스',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'priority',
                                    text: 'Priority',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'period',
                                    text: '주기',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                        return value['#text'];
                                    },
                                    dataIndex: 'vip',
                                    text: '그룹 IP',
                                    flex: 2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                                        return value['@mode'];
                                    },
                                    dataIndex: 'setting',
                                    text: 'Failover',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'boostup',
                                    text: 'Boostup',
                                    flex: 1
                                }
                            ],
                            listeners: {
                                itemclick: {
                                    fn: me.onGpn_vrrp_gridItemClick,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.RowModel', {
                                mode: 'MULTI'
                            })
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_xtm_route_vrrpAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_route_vrrpBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onRdg_runmodeChange: function(field, newValue, oldValue, eOpts) {
        if(newValue.mode === 'backup'){

            this.down('[itemId=nfd_boostup]').setVisible(true);

        }
        else{

            this.down('[itemId=nfd_boostup]').setVisible(false);

        }
    },

    onCtn_vrrp_controlAfterRender: function(component, eOpts) {
        // onCtn_vrrp_controlAfterRender ================================================================================================================================================
        //
        //
        //
        // ==============================================================================================================================================================================

        var btn_add = component.down('[itemId=bt_add]');
        var btn_mod = component.down('[itemId=bt_mod]');
        var btn_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        btn_add.on('click', function(){

            if(!me.validityCheck().vrrpBlankCheck() ||
               !me.validityCheck().vrrpValidateCheck() ||
               !me.validityCheck().vrrpDuplicationCheck(componentObj.groupid.getValue(), 'add')){

                return;

            }

            var obj = {};

            obj['@num']   = 0;
            obj.boostup   = (componentObj.modeSelect.getValue().mode === 'backup')? componentObj.failOver.down('[itemId=nfd_boostup]').getValue() : null;
            obj.period    = componentObj.period.getValue();
            obj.priority  = componentObj.priority.getValue();

            var settingObj = {};

            settingObj['@chk_lb']      = "off";
            settingObj['@chk_p_relay'] = "off";
            settingObj['@interface']   = componentObj.inputVrrp.down('[itemId=ctn_vrrp_interface]').down().getValue();
            settingObj['@mode']        = (componentObj.modeSelect.getValue().mode === 'master') ? "master" : (componentObj.modeSelect.getValue().mode === 'backup') ? "backup" : null;

            obj.setting   = settingObj;
            obj.vid       = componentObj.groupid.getValue();

            var vipObj    = {};

            vipObj['#text'] = componentObj.groupip.getValue();
            vipObj['@type'] = "single";
            vipObj['@version'] = "v4";

            obj.vip       = vipObj;

            gridData_Add(componentObj.vrrpGrid , obj);

            reconfigNum(componentObj.vrrpGrid.getStore());

        });

        btn_mod.on('click', function(){

            if(!componentObj.vrrpGrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'VRRP 수정 에러',
                    msg : '수정할 VRRP 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().vrrpBlankCheck() ||
               !me.validityCheck().vrrpValidateCheck() ||
               !me.validityCheck().vrrpDuplicationCheck(componentObj.groupid.getValue(), 'modify')){

                return;

            }

            var obj = {};

            obj.boostup    = (componentObj.modeSelect.getValue().mode === 'backup')? componentObj.failOver.down('[itemId=nfd_boostup]').getValue() : null;
            obj.period     = componentObj.period.getValue();
            obj.priority   = componentObj.priority.getValue();

            var settingObj = {};

            settingObj['@interface'] = componentObj.inputVrrp.down('[itemId=ctn_vrrp_interface]').down().getValue();
            settingObj['@mode'] = (componentObj.modeSelect.getValue().mode === 'master') ? "master" : (componentObj.modeSelect.getValue().mode === 'backup') ? "backup" : null;

            obj.setting    = settingObj;
            obj.vid        = componentObj.groupid.getValue();

            var vipObj     = {};

            vipObj['#text'] = componentObj.groupip.getValue();

            obj.vip        = vipObj;

            selectionGrid_Mod(componentObj.vrrpGrid , obj);

        });

        btn_del.on('click', function(){

            if(!componentObj.vrrpGrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'VRRP 삭제 에러',
                    msg : '삭제할 VRRP 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.vrrpGrid);

            reconfigNum(componentObj.vrrpGrid.getStore());

            componentObj.vrrpGrid.getView().refresh();

        });
    },

    onGpn_vrrp_gridItemClick: function(dataview, record, item, index, e, eOpts) {
        var vrrpMain = Ext.ComponentQuery.query('container[itemId=ctn_vrrp_main]')[0];

        var control1 = vrrpMain.down('container[itemId=fds_vrrp_inputvrrp]');
        var control2 = vrrpMain.down('container[itemId=fds_vrrp_failover]');

        control1.down('[itemId=ctn_vrrp_groupid]').down().setValue(record.data.vid);
        control1.down('[itemId=ctn_vrrp_interface]').down().setValue(record.data.setting['@interface']);
        control1.down('[itemId=ctn_vrrp_priority]').down().setValue(record.data.priority);
        control1.down('[itemId=ctn_vrrp_period]').down().setValue(record.data.period);
        control1.down('[itemId=ctn_vrrp_groupip]').down().setValue(record.data.vip['#text']);

        control2.down('[itemId=rdg_runmode]').setValue({ mode : (record.data.setting['@mode'] === null) ? 'none' : record.data.setting['@mode']  });
        control2.down('[itemId=nfd_boostup]').setValue(record.data.boostup);
    },

    onPnl_xtm_route_vrrpAfterRender: function(component, eOpts) {
        // onPnl_xtm_route_vrrpAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : VRRP 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var vrrpStore = Ext.getStore('st_route_vrrp');

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.vrrp;

                if(deviceData){

                    vrrpStore.add(deviceData);

                }

            }

        }
        catch(err){

            console.log('VRRP 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_route_vrrpBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        var vrrpStore  = Ext.getStore('st_route_vrrp');

        this.saveData();

        vrrpStore.removeAll();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var ctnMain   = this.down('[itemId=ctn_vrrp_main]');

        var inputVrrp = ctnMain.down('[itemId=fds_vrrp_inputvrrp]');
        var failOver  = ctnMain.down('[itemId=fds_vrrp_failover]');
        var vrrpGrid  = this.down('[itemId=ctn_vrrp_grid]').down();

        var modeSelect = failOver.down('[itemId=rdg_runmode]');

        var groupid   = inputVrrp.down('[itemId=ctn_vrrp_groupid]').down();
        var priority  = inputVrrp.down('[itemId=ctn_vrrp_priority]').down();
        var period    = inputVrrp.down('[itemId=ctn_vrrp_period]').down();
        var groupip   = inputVrrp.down('[itemId=ctn_vrrp_groupip]').down();

        return function(){

            obj.inputVrrp = inputVrrp;
            obj.failOver  = failOver;
            obj.vrrpGrid  = vrrpGrid;

            obj.modeSelect = modeSelect;

            obj.groupid   = groupid;
            obj.priority  = priority;
            obj.period    = period;
            obj.groupip   = groupip;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : VRRP의 유효성 검사를 수행합니다.
        //
        // - 그룹 ID 중복 검사, 주기 검사, IP 검사, backup boostup 검사
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            vrrpBlankCheck : function(){

                if(component.groupid.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '그룹 ID는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.priority.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '우선 순위는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.period.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '주기는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.groupip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '그룹 IP는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.failOver.down('[itemId=nfd_boostup]').getValue() === null && (component.modeSelect.getValue().mode === 'backup')){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Boostup은 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            vrrpValidateCheck : function(){

                if(!component.groupid.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '그룹 ID 의 범위는 1 ~ 255 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.priority.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Priority 의 범위는 0 ~ 255 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.period.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '주기의 범위는 0 ~ 5 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.groupip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.failOver.down('[itemId=nfd_boostup]').validate() && (component.modeSelect.getValue().mode === 'backup')){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Boostup 의 범위는 0 ~ 5 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            vrrpDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'vid', 'st_route_vrrp')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 그룹 ID가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _vrrpName = component.vrrpGrid.getSelectionModel().getSelection()[0].get('vid');

                    if(!duplicationItem(componentValue, 'vid', 'st_route_vrrp') && _vrrpName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 그룹 ID가 이미 등록되었습니다.',
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
        var vrrpStore     = Ext.getStore('st_route_vrrp');
        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        if(vrrpStore.count() === 1){

            dataObj = {};

            dataObj = vrrpStore.getAt(0).data;

        }
        else if(vrrpStore.count() > 1){

            dataObj = [];

            for(var i = 0; i < vrrpStore.count(); i++){

                dataObj.push(vrrpStore.getAt(i).data);

            }

        }
        else{

            deviceAllData.network_router_vrrp = null;

            return true;

        }

        if(deviceAllData.network_router_vrrp){

            deviceAllData.network_router_vrrp.vrrp = dataObj;

        }
        else{

            deviceAllData.network_router_vrrp = {};

            deviceAllData.network_router_vrrp.vrrp = dataObj;

        }

        return true;
    }

});