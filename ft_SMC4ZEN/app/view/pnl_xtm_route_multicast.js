
Ext.define('SMC4ZEN.view.pnl_xtm_route_multicast', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_route_multicastViewModel',
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'pnl_xtm_route_multicast'
    },
    height: 600,
    id: 'pnl_xtm_route_multicast',
    overflowY: 'auto',
    width: 800,
    title: 'Multicast',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_route_multicastAfterRender',
        beforeclose: 'onPnl_xtm_route_multicastBeforeClose'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            border: false,
            itemId: 'fpn_multicast_valid',
            layout: 'fit',
            bodyPadding: 10,
            title: '',
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_multicast_usemulticast',
                    checkboxToggle: true,
                    title: '멀티 캐스트 사용',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            margins: '0, 0, 20, 0',
                            itemId: 'rdg_rpmode',
                            width: 400,
                            fieldLabel: 'RP 동작 모드',
                            value: 'bootstrap',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_bootstrap',
                                    name: 'rp',
                                    boxLabel: 'Bootstrap RP',
                                    inputValue: 'bootstrap'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_static',
                                    name: 'rp',
                                    boxLabel: 'Static RP',
                                    inputValue: 'static'
                                }
                            ],
                            listeners: {
                                change: 'onRdg_rpmodeChange'
                            }
                        },
                        {
                            xtype: 'fieldset',
                            margins: '0, 0, 20, 0',
                            hidden: true,
                            itemId: 'fds_multicast_staticrp',
                            padding: 10,
                            layout: 'auto',
                            title: 'Static RP',
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
                                    itemId: 'txf_rpaddress',
                                    fieldLabel: 'RP 주소',
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            hidden: true,
                            itemId: 'fds_multicast_bootstrap',
                            margin: '0, 0, 20, 0',
                            padding: 10,
                            title: 'Bootstrap RP',
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_multicast_bootstrap1',
                                    margin: '0, 0, 10, 0',
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
                                            itemId: 'nfd_order_of_priority',
                                            margin: '0, 10, 0, 0',
                                            fieldLabel: 'Bootstrap 우선순위',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(클수록 높음)'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_multicast_bootstrap2',
                                    margin: '0, 0, 10, 0',
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
                                            itemId: 'nfd_order_of_candidate',
                                            margin: '0, 10, 0, 0',
                                            fieldLabel: 'Candidate 주기',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(Sec)'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_multicast_bootstrap3',
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
                                            itemId: 'nfd_order_of_priority_low',
                                            margin: '0, 10, 0, 0',
                                            fieldLabel: 'Candidate 우선순위',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'label',
                                            text: '(낮을수록 높음)'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'radiogroup',
                            margins: '0, 0, 20, 0',
                            itemId: 'rdg_usemultirp',
                            width: 400,
                            fieldLabel: '다중 RP 사용',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_use',
                                    name: 'multiuse',
                                    boxLabel: '사용'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_none',
                                    name: 'multiuse',
                                    boxLabel: '미사용',
                                    checked: true,
                                    inputValue: 'off'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_multicast_control',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fds_convertspt',
                                    margin: '0, 10, 0, 0',
                                    title: 'SPT 전환 조건',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: 10
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_multicast_register',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 1, 999999);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'nfd_multicast_register',
                                                    margin: '0, 10, 0, 0',
                                                    fieldLabel: 'Register Rate',
                                                    value: 5
                                                },
                                                {
                                                    xtype: 'label',
                                                    itemId: 'lab_kbps',
                                                    text: '(kbps)'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_multicast_serchrate',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 1, 3600);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'nfd_serchrate',
                                                    margin: '0, 10, 0, 0',
                                                    fieldLabel: '검사 주기',
                                                    value: 20
                                                },
                                                {
                                                    xtype: 'label',
                                                    itemId: 'lab_sec',
                                                    text: '(Sec)'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_multicast_datarate',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 1, 999999);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'nfd_datarate',
                                                    margin: '0, 10, 0, 0',
                                                    fieldLabel: 'Data Rate',
                                                    value: 5
                                                },
                                                {
                                                    xtype: 'label',
                                                    itemId: 'lab_kbps',
                                                    text: '(kbps)'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_multicast_sercherate2',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 1, 3600);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    itemId: 'nfd_serchrate2',
                                                    margin: '0, 10, 0, 0',
                                                    fieldLabel: '검사 주기',
                                                    value: 20
                                                },
                                                {
                                                    xtype: 'label',
                                                    itemId: 'lab_sec',
                                                    text: '(Sec)'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 0.5,
                                    height: 300,
                                    itemId: 'fds_useinterface',
                                    padding: 10,
                                    title: '사용 인터페이스',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 0.1,
                                            itemId: 'ctn_multicast_eth',
                                            margin: '0, 0, 10, 0',
                                            width: 100,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cmb_multicast_eth',
                                                    margin: '0, 0, 10, 0',
                                                    width: 200,
                                                    fieldLabel: '',
                                                    editable: false,
                                                    emptyText: 'Select interface ...',
                                                    displayField: 'eth',
                                                    queryMode: 'local',
                                                    store: 'st_common_deveth',
                                                    valueField: 'eth',
                                                    listeners: {
                                                        change: 'onCmb_multicast_ethChange'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_multicast_ethlist',
                                            width: 100,
                                            layout: 'fit',
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    autoScroll: true,
                                                    itemId: 'gpn_ethlist',
                                                    title: '',
                                                    hideHeaders: true,
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'eth',
                                                            text: 'String',
                                                            flex: 0.8
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            align: 'center',
                                                            flex: 0.2,
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {

                                                                        var multicast_list = Ext.getStore('st_route_multicast_ethlist');

                                                                        multicast_list.removeAt(rowIndex);
                                                                    },
                                                                    altText: '인터페이스 삭제',
                                                                    iconCls: 'ico_grid_row_delete'
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    viewConfig: {
                                                        enableTextSelection: false
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],

    onPnl_xtm_route_multicastAfterRender: function(component, eOpts) {
        // onPnl_xtm_route_multicastAfterRender =========================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 멀티케스트 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var gridStore    = Ext.getStore('st_route_multicast_ethlist');

        componentObj.multicastCtn.checkboxCmp.on('change', function(newValue){

            if(!newValue){

                componentObj.multicastValid.getForm().reset();

                gridStore.removeAll();

            }

        });

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                componentObj.multicastCtn.checkboxCmp.setValue((deviceData.multicast['@chk_use'] === "on") ? true : false);

                if(deviceData.multicast.rp['@action'] === "bootstrap")  componentObj.rpmode.items.items[0].setValue(true);
                else													componentObj.rpmode.items.items[1].setValue(true);

                componentObj.staticrp.setValue(deviceData.multicast['static']['@address']);

                if(deviceData.multicast.multirp === "on")   componentObj.usemultirp.items.items[0].setValue(true);
                else										componentObj.usemultirp.items.items[1].setValue(true);

                componentObj.orderofpriority.setValue(deviceData.multicast.bootstrap['@priority']);
                componentObj.orderofpriority_cycle.setValue(deviceData.multicast.candidate['@cycle']);
                componentObj.orderofpriority_low.setValue(deviceData.multicast.candidate['@priority']);

                componentObj.register.setValue(deviceData.multicast.spt.register['@rate']);
                componentObj.searchrate.setValue(deviceData.multicast.spt.register['@cycle']);

                componentObj.datarate.setValue(deviceData.multicast.spt.data['@rate']);
                componentObj.searchrate2.setValue(deviceData.multicast.spt.data['@cycle']);

                var ethArray = [];

                Ext.each(deviceData.multicast['interface'], function(arrayData , idx){

                    ethArray.push(arrayData);

                });

                if(ethArray.length > 0){

                    if(ethArray.length === 1){

                        gridStore.add({		'eth' : ethArray[0]		});

                    }
                    else{

                        Ext.each(ethArray, function(ethData){

                            gridStore.add({		'eth' : ethData		});

                        });

                    }

                }

            }

        }
        catch(err){

            console.log('멀티케스트 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onRdg_rpmodeChange: function(field, newValue, oldValue, eOpts) {

        var staticRP = this.down('[itemId=fds_multicast_staticrp]');
        var bootStrap = this.down('[itemId=fds_multicast_bootstrap]');

        if(newValue.rp === 'bootstrap'){

            staticRP.setVisible(false);
            bootStrap.setVisible(true);

        }
        else if(newValue.rp === 'static'){

            staticRP.setVisible(true);
            bootStrap.setVisible(false);

        }
    },

    onCmb_multicast_ethChange: function(field, newValue, oldValue, eOpts) {
        // 스토어 추가

        var st_memberlist = Ext.getStore('st_route_multicast_ethlist');                   // 인터페이스 스토어

        // 중복 검사

        if(!duplicationItem(newValue, 'eth', 'st_route_multicast_ethlist')){

            Ext.Msg.show({
                 title : '인터페이스 중복 에러',
                 msg : '동일한 인터페이스가 이미 추가되어 있습니다.',
                 buttons : Ext.Msg.OK,
                 icon : Ext.Msg.ERROR
            });

            return;
        }

        var addObj = {
            eth : newValue
        };

        st_memberlist.add(addObj);
    },

    onPnl_xtm_route_multicastBeforeClose: function(panel, eOpts) {
        var deviceMain    = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;

        /*

        try{

            var obj                    = {};

            obj['@chk_use']            = (componentObj.multicastCtn.checkboxCmp.getValue() === true) ? "on" : "off";
            obj.bootstrap              = {};
            obj.bootstrap['@priority'] = componentObj.orderofpriority.getValue();
            obj.candidate              = {};
            obj.candidate['@cycle']    = componentObj.orderofpriority_cycle.getValue();
            obj.candidate['@priority'] = componentObj.orderofpriority_low.getValue();

            if(ethStore.count() === 1){

                obj['interface']       = ethStore.getAt(0).get('eth');

            }
            else if(ethStore.count() > 1){

                var ethArray           = [];

                for(var i = 0; i < ethStore.count(); i++){

                    ethArray.push(ethStore.getAt(i).get('eth'));

                }

                obj['interface']       = ethArray;

            }

            obj.multirp                = componentObj.usemultirp.getValue().multiuse;
            obj.rp                     = {};
            obj.rp['@action']          = componentObj.rpmode.getValue().rp;
            obj.spt                    = {};
            obj.spt.data               = {};
            obj.spt.data['@cycle']     = componentObj.searchrate.getValue();
            obj.spt.data['@rate']      = componentObj.register.getValue();
            obj.spt.register           = {};
            obj.spt.register['@cycle'] = componentObj.searchrate2.getValue();
            obj.spt.register['@rate']  = componentObj.datarate.getValue();
            obj['static']              = {};
            obj['static']['@address']  = componentObj.staticrp.getValue();

            if(deviceAllData.network_router_multicast){

                deviceAllData.network_router_multicast.multicast = obj;

            }

        }
        catch(err){

        }

        */
    },

    componentStorage: function() {
        // 컴포넌트 모음

        var obj = {};

        var multicastValid  = this.down('[itemId=fpn_multicast_valid]');
        var multicastCtn    = this.down('[itemId=fds_multicast_usemulticast]');

        var rpmode          = multicastCtn.down('[itemId=rdg_rpmode]');
        var bootstrap_Field = this.down('[itemId=fds_multicast_bootstrap]');
        var staticrp_Field  = multicastCtn.down('[itemId=fds_multicast_staticrp]');

        var staticrp        = staticrp_Field.down('[itemId=txf_rpaddress]');

        var orderofpriority       = bootstrap_Field.down('[itemId=ctn_multicast_bootstrap1]').down('[itemId=nfd_order_of_priority]');
        var orderofpriority_cycle = bootstrap_Field.down('[itemId=ctn_multicast_bootstrap2]').down('[itemId=nfd_order_of_candidate]');
        var orderofpriority_low   = bootstrap_Field.down('[itemId=ctn_multicast_bootstrap3]').down('[itemId=nfd_order_of_priority_low]');
        var usemultirp            = multicastCtn.down('[itemId=rdg_usemultirp]');

        var convertspt      = multicastCtn.down('[itemId=ctn_multicast_control]').down('[itemId=fds_convertspt]');

        var register        = convertspt.down('[itemId=ctn_multicast_register]').down('[itemId=nfd_multicast_register]');
        var searchrate      = convertspt.down('[itemId=ctn_multicast_serchrate]').down('[itemId=nfd_serchrate]');
        var datarate        = convertspt.down('[itemId=ctn_multicast_datarate]').down('[itemId=nfd_datarate]');
        var searchrate2     = convertspt.down('[itemId=ctn_multicast_sercherate2]').down('[itemId=nfd_serchrate2]');

        var useinterface    = multicastCtn.down('[itemId=ctn_multicast_control]').down('[itemId=fds_useinterface]');

        var interfaceGrid   = useinterface.down('[itemId=ctn_multicast_ethlist]').down();

        return function(){

            obj.multicastValid  = multicastValid;
            obj.multicastCtn    = multicastCtn;
            obj.rpmode          = rpmode;
            obj.bootstrap_Field = bootstrap_Field;
            obj.staticrp_Field  = staticrp_Field;
            obj.staticrp        = staticrp;
            obj.orderofpriority = orderofpriority;
            obj.orderofpriority_cycle = orderofpriority_cycle;
            obj.orderofpriority_low   = orderofpriority_low;
            obj.usemultirp      = usemultirp;
            obj.convertspt      = convertspt;
            obj.register        = register;
            obj.searchrate      = searchrate;
            obj.datarate        = datarate;
            obj.searchrate2     = searchrate2;
            obj.useinterface    = useinterface;
            obj.interfaceGrid   = interfaceGrid;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ========================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : 라우터의 policy Number 중복 검사를 수행합니다.
        //
        // - Policy Num 중복 검사
        //
        // ======================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            multicastBlankCheck : function(){

                if(component.multicastCtn.checkboxCmp.getValue()){

                    if(component.orderofpriority.getValue() === null && component.rpmode.getValue().rp === 'bootstrap'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Bootstrap 우선순위는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.orderofpriority_cycle.getValue() === null && component.rpmode.getValue().rp === 'bootstrap'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Candidate 주기는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.orderofpriority_low.getValue() === null && component.rpmode.getValue().rp === 'bootstrap'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Candidate 우선순위는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.staticrp.getValue() === '' && component.rpmode.getValue().rp === 'static'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Static RP는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.register.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Ragister Rate 는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.searchrate.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '검사 주기는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.datarate.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Data Rate 는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.searchrate2.getValue() === null){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '검사 주기는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.interfaceGrid.getStore().count() === 0){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '사용 인터페이스는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            },
            multicastValidCheck : function(){

                if(component.multicastCtn.checkboxCmp.getValue()){

                    if(!component.orderofpriority.validate() && component.rpmode.getValue().rp === 'bootstrap'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Bootstrap 의 범위는 1 ~ 255 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.orderofpriority_cycle.validate() && component.rpmode.getValue().rp === 'bootstrap'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Candidate 주기 범위는 1 ~ 255 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.orderofpriority_low.validate() && component.rpmode.getValue().rp === 'bootstrap'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Candidate 우선순위의 범위는 1 ~ 255 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.staticrp.validate() && component.rpmode.getValue().rp === 'static'){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'IP v4 형식에 맞지 않습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.register.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Ragister Rate 의 범위는 1 ~ 999999 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.searchrate.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '검사 주기의 범위는 1 ~ 3600 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.datarate.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : 'Data Rate 의 범위는 1 ~ 999999 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(!component.searchrate2.validate()){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '검사 주기의 범위는 1 ~ 3600 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    if(component.interfaceGrid.getStore().count() === 0){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '사용 인터페이스는 필수항목 입니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        var componentObj  = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var ethStore      = Ext.getStore('st_route_multicast_ethlist');

        if((!this.validityCheck().multicastBlankCheck() || !this.validityCheck().multicastValidCheck()) &&
            componentObj.multicastCtn.checkboxCmp.getValue()){

            return false;

        }

        var obj                    = {};

        obj['@chk_use']            = (componentObj.multicastCtn.checkboxCmp.getValue() === true) ? "on" : "off";
        obj.bootstrap              = {};
        obj.bootstrap['@priority'] = componentObj.orderofpriority.getValue();
        obj.candidate              = {};
        obj.candidate['@cycle']    = componentObj.orderofpriority_cycle.getValue();
        obj.candidate['@priority'] = componentObj.orderofpriority_low.getValue();

        if(ethStore.count() === 1){

            obj['interface']       = ethStore.getAt(0).get('eth');

        }
        else if(ethStore.count() > 1){

            var ethArray           = [];

            for(var i = 0; i < ethStore.count(); i++){

                ethArray.push(ethStore.getAt(i).get('eth'));

            }

            obj['interface']       = ethArray;

        }

        obj.multirp                = componentObj.usemultirp.getValue().multiuse;
        obj.rp                     = {};
        obj.rp['@action']          = componentObj.rpmode.getValue().rp;
        obj.spt                    = {};
        obj.spt.data               = {};
        obj.spt.data['@cycle']     = componentObj.searchrate2.getValue();
        obj.spt.data['@rate']      = componentObj.datarate.getValue();
        obj.spt.register           = {};
        obj.spt.register['@cycle'] = componentObj.searchrate.getValue();
        obj.spt.register['@rate']  = componentObj.register.getValue();
        obj['static']              = {};
        obj['static']['@address']  = componentObj.staticrp.getValue();

        if(deviceAllData.network_router_multicast){

            deviceAllData.network_router_multicast.multicast = obj;

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();
        var ethStore = Ext.getStore('st_route_multicast_ethlist');

        ethStore.removeAll();

        component.interfaceGrid.bindStore(ethStore);
    }

});