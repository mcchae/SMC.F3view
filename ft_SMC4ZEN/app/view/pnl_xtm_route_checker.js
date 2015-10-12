
Ext.define('SMC4ZEN.view.pnl_xtm_route_checker', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_route_checkerViewModel',
        'SMC4ZEN.view.ctn_network_controlclass',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    viewModel: {
        type: 'pnl_xtm_route_checker'
    },
    height: 600,
    id: 'pnl_xtm_route_checker',
    width: 800,
    bodyPadding: 10,
    title: 'Checker',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_route_checkerAfterRender',
        beforeclose: 'onPnl_xtm_route_checkerBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'container',
                        itemId: 'ctn_checker_main',
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'container',
                                flex: 1,
                                itemId: 'ctn_checker_west',
                                margin: '0, 10, 0, 0',
                                padding: 10,
                                width: 289,
                                items: [
                                    {
                                        xtype: 'textfield',
                                        itemId: 'txf_tagname',
                                        width: 250,
                                        fieldLabel: '태그명',
                                        allowBlank: false,
                                        blankText: '필수 입력 항목입니다.'
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cmb_interface',
                                        width: 250,
                                        fieldLabel: '인터페이스',
                                        editable: false,
                                        emptyText: 'Select interface ...',
                                        displayField: 'eth',
                                        queryMode: 'local',
                                        store: 'st_common_pppeth',
                                        valueField: 'eth',
                                        listeners: {
                                            afterrender: 'onCmb_interfaceAfterRender'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            var retValue = ValidIPAddress(value);

                                            if(!retValue){

                                                return false;

                                            }

                                            return true;
                                        },
                                        itemId: 'txf_ipaddress',
                                        width: 250,
                                        fieldLabel: '대상 IP 주소',
                                        allowBlank: false,
                                        blankText: '필수 입력 항목입니다.',
                                        enableKeyEvents: true
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cmb_sendcycle',
                                        width: 200,
                                        fieldLabel: '전송 주기',
                                        value: 1,
                                        store: [
                                            1,
                                            3,
                                            5,
                                            10
                                        ]
                                    },
                                    {
                                        xtype: 'combobox',
                                        itemId: 'cmb_runmode',
                                        width: 250,
                                        fieldLabel: '동작 모드',
                                        editable: false,
                                        displayField: 'runmode',
                                        valueField: 'runmode',
                                        listeners: {
                                            change: 'onCmb_runmodeChange',
                                            afterrender: 'onCmb_runmodeAfterRender'
                                        }
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
                                        hidden: true,
                                        itemId: 'txf_proxymac',
                                        width: 250,
                                        fieldLabel: 'Proxy MAC',
                                        allowBlank: false,
                                        blankText: '필수 입력 항목입니다.',
                                        enableKeyEvents: true
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldset',
                                flex: 1,
                                itemId: 'fds_checker_selectmode',
                                padding: 10,
                                title: '결정 모드',
                                items: [
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_checker_selectmode',
                                        layout: 'anchor',
                                        items: [
                                            {
                                                xtype: 'radiogroup',
                                                itemId: 'rdg_selectmode',
                                                margin: '0, 0, 10, 0',
                                                fieldLabel: '',
                                                items: [
                                                    {
                                                        xtype: 'radiofield',
                                                        itemId: 'rd_stretch',
                                                        name: 'mode',
                                                        boxLabel: '연속                        ',
                                                        checked: true,
                                                        inputValue: 'cont'
                                                    },
                                                    {
                                                        xtype: 'radiofield',
                                                        itemId: 'rd_nonstretch',
                                                        name: 'mode',
                                                        boxLabel: '비연속',
                                                        inputValue: 'non'
                                                    }
                                                ],
                                                listeners: {
                                                    change: 'onRdg_selectmodeChange'
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        itemId: 'ctn_checker_stretch',
                                        margin: '0, 0, 10, 0',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                itemId: 'lab_stretch',
                                                margin: '0, 22, 0, 0',
                                                text: '연속'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                validator: function(value) {
                                                    var retValue = LengthCheck(value, 1, 50);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    return true;
                                                },
                                                itemId: 'nfd_count',
                                                margin: '0, 10, 0, 0',
                                                width: 50,
                                                fieldLabel: '',
                                                maxText: '입력 범위는 1 ~ 50 입니다.',
                                                maxValue: 50,
                                                minText: '입력 범위는 1 ~ 50 입니다.',
                                                minValue: 1
                                            },
                                            {
                                                xtype: 'label',
                                                itemId: 'lab_timeout',
                                                text: '회 Timeout 발생 시'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        disabled: true,
                                        itemId: 'ctn_checker_nonstretch',
                                        layout: {
                                            type: 'hbox',
                                            align: 'middle'
                                        },
                                        items: [
                                            {
                                                xtype: 'label',
                                                itemId: 'lab_nonstretch',
                                                margin: '0, 10, 0, 0',
                                                text: '비연속'
                                            },
                                            {
                                                xtype: 'numberfield',
                                                validator: function(value) {
                                                    var retValue = LengthCheck(value, 1, 50);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    return true;
                                                },
                                                itemId: 'nfd_count',
                                                margin: '0, 10, 0, 0',
                                                width: 50,
                                                fieldLabel: '',
                                                maxText: '입력 범위는 1 ~ 50 입니다.',
                                                maxValue: 50,
                                                minText: '입력 범위는 1 ~ 50 입니다.',
                                                minValue: 1
                                            },
                                            {
                                                xtype: 'label',
                                                itemId: 'lab_nonstretch2',
                                                margin: '0, 10, 0, 0',
                                                text: '회 중 '
                                            },
                                            {
                                                xtype: 'numberfield',
                                                validator: function(value) {
                                                    var retValue = LengthCheck(value, 1, 50);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    return true;
                                                },
                                                itemId: 'nfd_count2',
                                                margin: '0, 10, 0, 0',
                                                width: 50,
                                                fieldLabel: '',
                                                maxText: '입력 범위는 1 ~ 50 입니다.',
                                                maxValue: 50,
                                                minText: '입력 범위는 1 ~ 50 입니다.',
                                                minValue: 1
                                            },
                                            {
                                                xtype: 'label',
                                                itemId: 'lab_timeout',
                                                text: '회 Timeout 발생 시'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'ctn_network_controlclass1',
                        itemId: 'ctn_checker_control',
                        margin: '10, 0, 10, 0',
                        listeners: {
                            afterrender: 'onCtn_checker_controlAfterRender'
                        }
                    },
                    {
                        xtype: 'container',
                        flex: 1,
                        itemId: 'ctn_checker_grid',
                        layout: 'fit',
                        items: [
                            {
                                xtype: 'gridpanel',
                                itemId: 'gpn_checker_set',
                                title: '',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'name',
                                        text: '태그명',
                                        flex: 1
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
                                        text: '대상 IP 주소',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'period',
                                        text: '전송주기',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'decision',
                                        text: '결정 모드',
                                        flex: 2
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return value['@action'];
                                        },
                                        dataIndex: 'setting',
                                        text: '동작 모드',
                                        flex: 1
                                    }
                                ],
                                listeners: {
                                    itemclick: 'onGrid_checker_setItemClick'
                                },
                                selModel: Ext.create('Ext.selection.RowModel', {
                                    selType: 'rowmodel',
                                    mode: 'MULTI'
                                })
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

    onCmb_interfaceAfterRender: function(component, eOpts) {
        comboAutoSelect(component, 'st_common_pppeth');
    },

    onCmb_runmodeChange: function(field, newValue, oldValue, eOpts) {
        var proxymac = field.up().down('[itemId=txf_proxymac]');

        if(newValue === 'Proxy' || newValue === 'Proxy2'){

            proxymac.setVisible(true);

        }else{

            proxymac.setVisible(false);

        }
    },

    onCmb_runmodeAfterRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            'storeId' : 'st_route_checkermode',
            'fields' : [
                {	'name' : 'runmode'		}
            ],
            'data' : [
                {	'runmode' : 'None'		},
                {	'runmode' : 'LineLB'		},
                {	'runmode' : 'Proxy'		},
                {	'runmode' : 'Proxy2'		},
                {	'runmode' : 'standby'		}
            ]

        }));

        component.setValue('None');
    },

    onRdg_selectmodeChange: function(field, newValue, oldValue, eOpts) {
        var fdsObj = Ext.ComponentQuery.query('[itemId=fds_checker_selectmode]')[0];

        var cont = fdsObj.down('container[itemId=ctn_checker_stretch]');

        var non = fdsObj.down('container[itemId=ctn_checker_nonstretch]');

        if(newValue.mode === 'cont'){

            cont.setDisabled(false);
            non.setDisabled(true);
        }
        else{

            cont.setDisabled(true);
            non.setDisabled(false);
        }
    },

    onCtn_checker_controlAfterRender: function(component, eOpts) {
        var btn_add = component.down('button[itemId=bt_add]');
        var btn_mod = component.down('button[itemId=bt_mod]');
        var btn_del = component.down('button[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        btn_add.on('click', function(component, e, eOpts){

            if(!me.validityCheck().checkerBlankCheck() ||
               !me.validityCheck().checkerValidCheck() ||
               !me.validityCheck().checkerDuplicationCheck(componentObj.westCtn.down('[itemId=txf_tagname]').getValue(), 'add')){

                return;

            }

            var obj = {};

            var mode = componentObj.selectMode.getValue().mode;

            obj.decision     = (mode === 'cont') ? "연속 " + componentObj.stretchCtn.down('[itemId=nfd_count]').getValue() + " 회 Timeout 발생 시" :
                                                   "비연속 " + componentObj.nonStretchCtn.down('[itemId=nfd_count]').getValue() +  " 회 중 " + componentObj.nonStretchCtn.down('[itemId=nfd_count2]').getValue() + " 회 Timeout 발생 시";
            obj.fail         = (mode === 'cont') ? componentObj.stretchCtn.down('[itemId=nfd_count]').getValue() : componentObj.nonStretchCtn.down('[itemId=nfd_count2]').getValue();
            obj['interface'] = componentObj.westCtn.down('[itemId=cmb_interface]').getValue();

            var ipObj        = {};

            ipObj['#text']   = componentObj.westCtn.down('[itemId=txf_ipaddress]').getValue();
            ipObj['@type']   = "single";
            ipObj['@version'] = "v4";

            obj.ip           = ipObj;
            obj.name         = componentObj.westCtn.down('[itemId=txf_tagname]').getValue();
            obj.period       = Number(componentObj.westCtn.down('[itemId=cmb_sendcycle]').getValue());

            if(componentObj.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy' || componentObj.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy2'){

                obj.mac      = componentObj.macaddress.getValue();

            }

            obj.pool         = (mode === 'cont') ? null : componentObj.nonStretchCtn.down('[itemId=nfd_count]').getValue();

            var settingObj   = {};

            settingObj['@action']   =componentObj.westCtn.down('[itemId=cmb_runmode]').getValue();
            settingObj['@chk_icmp'] = "off";
            settingObj['@chk_rcv']  = "off";
            settingObj['@type']     = "cont";

            obj.setting      = settingObj;

            gridData_Add(componentObj.checkerGrid, obj);

            reconfigNum(componentObj.checkerGrid.getStore());

        });

        btn_mod.on('click', function(component, e, eOpts){

            if(!componentObj.checkerGrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'Checker 수정 에러',
                    msg : '수정할 Checker 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().checkerBlankCheck() ||
               !me.validityCheck().checkerValidCheck() ||
               !me.validityCheck().checkerDuplicationCheck(componentObj.westCtn.down('[itemId=txf_tagname]').getValue(), 'modify')){

                return;

            }

            var obj = {};

            var mode = componentObj.selectMode.getValue().mode;

            obj.decision     = (mode === 'cont') ? "연속 " + componentObj.stretchCtn.down('[itemId=nfd_count]').getValue() + " 회 Timeout 발생 시" :
                                                   "비연속 " + componentObj.nonStretchCtn.down('[itemId=nfd_count]').getValue() +  " 회 중 " + componentObj.nonStretchCtn.down('[itemId=nfd_count2]').getValue() + " 회 Timeout 발생 시";
            obj.fail         = (mode === 'cont') ? componentObj.stretchCtn.down('[itemId=nfd_count]').getValue() : componentObj.nonStretchCtn.down('[itemId=nfd_count2]').getValue();
            obj['interface'] = componentObj.westCtn.down('[itemId=cmb_interface]').getValue();

            var ipObj        = {};

            ipObj['#text']   = componentObj.westCtn.down('[itemId=txf_ipaddress]').getValue();
            ipObj['@type']   = "single";
            ipObj['@version'] = "v4";

            obj.ip           = ipObj;
            obj.name         = componentObj.westCtn.down('[itemId=txf_tagname]').getValue();
            obj.period       = Number(componentObj.westCtn.down('[itemId=cmb_sendcycle]').getValue());

            if(componentObj.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy' || componentObj.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy2'){

                obj.mac      = componentObj.macaddress.getValue();

            }

            obj.pool         = (mode === 'cont') ? null : componentObj.nonStretchCtn.down('[itemId=nfd_count]').getValue();

            var settingObj   = {};

            settingObj['@action']   =componentObj.westCtn.down('[itemId=cmb_runmode]').getValue();
            settingObj['@chk_icmp'] = "off";
            settingObj['@chk_rcv']  = "off";
            settingObj['@type']     = "cont";

            obj.setting      = settingObj;

            selectionGrid_Mod(componentObj.checkerGrid , obj);

        });

        btn_del.on('click', function(component, e, eOpts){

            if(!componentObj.checkerGrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'Checker 삭제 에러',
                    msg : '삭제할 Checker 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.checkerGrid);

            reconfigNum(componentObj.checkerGrid.getStore());

        });
    },

    onGrid_checker_setItemClick: function(dataview, record, item, index, e, eOpts) {
        var checkerMain = Ext.ComponentQuery.query('container[itemId=ctn_checker_main]')[0];

        var control1 = checkerMain.down('container[itemId=ctn_checker_west]');
        var control2 = checkerMain.down('container[itemId=fds_checker_selectmode]');

        control1.down('[itemId=txf_tagname]').setValue(record.data.name);
        control1.down('[itemId=cmb_interface]').setValue(record.data['interface']);
        control1.down('[itemId=txf_ipaddress]').setValue(record.data.ip['#text']);
        control1.down('[itemId=cmb_sendcycle]').setValue(record.data.period);
        control1.down('[itemId=cmb_runmode]').setValue(record.data.setting['@action']);

        console.log('record data -> ', record.data);

        if(!record.data.pool){

            checkerMain.down('[itemId=ctn_checker_selectmode]').down().setValue({ mode : 'cont'});

            control2.down('[itemId=ctn_checker_stretch]').down('[itemId=nfd_count]').setValue("");
            control2.down('[itemId=ctn_checker_nonstretch]').down('[itemId=nfd_count]').setValue("");
            control2.down('[itemId=ctn_checker_nonstretch]').down('[itemId=nfd_count2]').setValue("");
            control2.down('[itemId=ctn_checker_stretch]').down('[itemId=nfd_count]').setValue(record.data.fail);

        }
        else{

            checkerMain.down('[itemId=ctn_checker_selectmode]').down().setValue({ mode : 'non'});

            control2.down('[itemId=ctn_checker_stretch]').down('[itemId=nfd_count]').setValue("");

            control2.down('[itemId=ctn_checker_nonstretch]').down('[itemId=nfd_count]').setValue("");

            control2.down('[itemId=ctn_checker_nonstretch]').down('[itemId=nfd_count2]').setValue("");

            control2.down('[itemId=ctn_checker_nonstretch]').down('[itemId=nfd_count]').setValue(record.data.pool);

            control2.down('[itemId=ctn_checker_nonstretch]').down('[itemId=nfd_count2]').setValue(record.data.fail);

        }
    },

    onPnl_xtm_route_checkerAfterRender: function(component, eOpts) {
        // onPnl_xtm_route_checkerAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 라우터 체커 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var checkerStore = Ext.getStore('st_route_checker');

        this.initStore();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.checker;

                if(deviceData){

                    checkerStore.add(deviceData);

                }

            }

        }
        catch(err){

            console.log('라우터 체커 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_route_checkerBeforeClose: function(panel, eOpts) {
        var deviceMain    = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var ctnMain       = this.down('[itemId=ctn_checker_main]');

        var checkerGrid   = this.down('[itemId=ctn_checker_grid]').down();

        var selectMode    = ctnMain.down('[itemId=ctn_checker_selectmode]').down();

        var westCtn       = ctnMain.down('[itemId=ctn_checker_west]');
        var stretchCtn    = ctnMain.down('[itemId=fds_checker_selectmode]').down('[itemId=ctn_checker_stretch]');
        var nonStretchCtn = ctnMain.down('[itemId=fds_checker_selectmode]').down('[itemId=ctn_checker_nonstretch]');

        var tagname       = westCtn.down('[itemId=txf_tagname]');
        var ipaddress     = westCtn.down('[itemId=txf_ipaddress]');
        var macaddress    = westCtn.down('[itemId=txf_proxymac]');

        return function(){

            obj.ctnMain       = ctnMain;
            obj.checkerGrid   = checkerGrid;
            obj.selectMode    = selectMode;
            obj.westCtn       = westCtn;
            obj.stretchCtn    = stretchCtn;
            obj.nonStretchCtn = nonStretchCtn;
            obj.tagname       = tagname;
            obj.ipaddress     = ipaddress;
            obj.macaddress    = macaddress;

            return obj;

        }();
    },

    validityCheck: function() {
        // validateCheck ========================================================================================================================
        //
        // 일시 : 2014.07.05
        //
        // 설명 : Check의 유효성 검사를 수행합니다.
        //
        // - 태그명, 연속, 비연속 체크
        //
        // ======================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            checkerBlankCheck : function(){

                var mode = component.selectMode.getValue().mode;

                if(component.westCtn.down('[itemId=txf_tagname]').getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '태그명은 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.ipaddress.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '대상 IP 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if((component.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy' || component.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy2') && component.macaddress.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '프록시 MAC 주소는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.stretchCtn.down('[itemId=nfd_count]').getValue() === null && mode === 'cont'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '결정모드는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.nonStretchCtn.down('[itemId=nfd_count]').getValue() === null && mode === 'non'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '결정모드는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.nonStretchCtn.down('[itemId=nfd_count2]').getValue() === null && mode === 'non'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '결정모드는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            checkerValidCheck : function(){

                var mode = component.selectMode.getValue().mode;

                if(!component.ipaddress.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP v4 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if((component.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy' || component.westCtn.down('[itemId=cmb_runmode]').getValue() === 'Proxy2') && !component.macaddress.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'MAC 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.stretchCtn.down('[itemId=nfd_count]').validate() && mode === 'cont'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '연속 범위는 1 ~ 50 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.nonStretchCtn.down('[itemId=nfd_count]').validate() && mode === 'non'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비연속 범위는 1 ~ 50 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.nonStretchCtn.down('[itemId=nfd_count2]').validate() && mode === 'non'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비연속 범위는 1 ~ 50 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;


            },
            checkerDuplicationCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, 'name', 'st_route_checker')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 태그명이 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _chkName = component.checkerGrid.getSelectionModel().getSelection()[0].get('name');

                    if(!duplicationItem(componentValue, 'name', 'st_route_checker') && _chkName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 태그명이 이미 등록되었습니다.',
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
        var checkerStore  = Ext.getStore('st_route_checker');
        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;
        var dataObj;

        if(checkerStore.count() === 1){

            dataObj = {};

            dataObj = checkerStore.getAt(0).data;

        }
        else if(checkerStore.count() > 1){

            dataObj = [];

            for(var i = 0; i < checkerStore.count(); i++){

                dataObj.push(checkerStore.getAt(i).data);

            }

        }
        else{

            deviceAllData.network_router_checker = null;

            return true;

        }

        if(deviceAllData.network_router_checker){

            deviceAllData.network_router_checker.checker = dataObj;
        }
        else{

            deviceAllData.network_router_checker = {};

            deviceAllData.network_router_checker.checker = dataObj;
        }

        return true;
    },

    initStore: function() {
        var checkerStore = Ext.getStore('st_route_checker');

        checkerStore.removeAll();

        this.down('[itemId=ctn_checker_grid]').down('[itemId=gpn_checker_set]').bindStore(checkerStore);
    }

});