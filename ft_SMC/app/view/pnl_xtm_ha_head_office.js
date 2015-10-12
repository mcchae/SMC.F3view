
Ext.define('SMC.view.pnl_xtm_ha_head_office', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_ha_head_office',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel',
        'Ext.form.FieldSet'
    ],

    height: 680,
    id: 'pnl_xtm_ha_head_office',
    width: 800,
    title: '본점',

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
                    margins: '0, 0, 5, 0',
                    itemId: 'ctn_ha_modeselect',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            itemId: 'rdg_mode',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            fieldLabel: 'Mode',
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_master',
                                    name: 'ha_head',
                                    boxLabel: 'Master',
                                    checked: true,
                                    inputValue: 'master'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_backup',
                                    name: 'ha_head',
                                    boxLabel: 'Backup',
                                    inputValue: 'backup'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'rd_bridge',
                                    fieldLabel: '',
                                    name: 'ha_head',
                                    boxLabel: 'Bridge',
                                    inputValue: 'bridge'
                                }
                            ],
                            listeners: {
                                change: {
                                    fn: me.onRdg_modeChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_ha_master_backup',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_ha_interface',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_interface',
                                    width: 250,
                                    fieldLabel: '인터페이스',
                                    value: 'eth0',
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
                            itemId: 'ctn_ha_mode',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_mode',
                                    margin: '0, 100, 0, 0',
                                    width: 250,
                                    fieldLabel: 'Mode',
                                    value: 'Primary',
                                    editable: false,
                                    displayField: 'mode',
                                    store: 'st_ha_mode',
                                    valueField: 'mode',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_modeChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_name',
                                    width: 250,
                                    fieldLabel: '그룹 ID'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ha_target',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!ValidIPAddress(value)){

                                            if(!ValidIPv6(value)){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_targetip',
                                    width: 250,
                                    fieldLabel: '대상 IP 주소',
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ha_virtual',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!ValidIPAddress(value)){

                                            if(value.match('/')){

                                                if(!ValidPrefix(value, 'v6')){

                                                    return false;

                                                }

                                            }
                                            else{

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_virtual',
                                    margin: '0, 10, 0, 0',
                                    width: 250,
                                    fieldLabel: '가상 IP 주소',
                                    enableKeyEvents: true
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: '※ IPv6 가상 IP 입력시에는 Prefix 값도 입력 해야함.'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_ha_timeout',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 10);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_timeout',
                                    margin: '0, 10, 0, 0',
                                    width: 250,
                                    fieldLabel: '타임아웃',
                                    value: 3
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: '회 실패시 타임아웃'
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            itemId: 'ctn_headoffice_control',
                            margins: '10, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_headoffice_controlAfterRender1,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_ha_set',
                            title: '',
                            store: 'st_ha_master_backup_grid',
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
                                    dataIndex: 'mode',
                                    text: 'Mode',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    text: '그룹 ID / 이름',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'target_ip',
                                    text: '대상 IP 주소',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'virtual_ip',
                                    text: '가상 IP 주소',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'info',
                                    text: 'Info',
                                    flex: 1.5
                                }
                            ],
                            listeners: {
                                itemclick: {
                                    fn: me.onGpn_ha_setItemClick,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.RowModel', {
                                mode: 'MULTI'
                            })
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ha_checkop',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_ike',
                                    fieldLabel: '',
                                    boxLabel: 'IKE 통신시 실제 IP주소 사용'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_active',
                                    fieldLabel: '',
                                    boxLabel: 'Active - Standby 로 동작시, 상태유지 기능 사용'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    height: 250,
                    hidden: true,
                    itemId: 'ctn_ha_bridge',
                    width: 400,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_ha_interface',
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
                                    displayField: 'eth',
                                    queryMode: 'local',
                                    store: 'st_common_deveth',
                                    valueField: 'eth'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ha_name',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_name',
                                    width: 250,
                                    fieldLabel: '이름'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ha_destination',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!ValidIPAddress(value)){

                                            if(!ValidIPv6(value)){

                                                return false;

                                            }

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_destination',
                                    width: 250,
                                    fieldLabel: '대상 IP 주소',
                                    enableKeyEvents: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_ha_timeout',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 1, 10);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_timeout',
                                    margin: '0, 10, 0, 0',
                                    width: 250,
                                    fieldLabel: '타임아웃',
                                    value: 3
                                },
                                {
                                    xtype: 'label',
                                    text: '회 실패시 타임아웃'
                                }
                            ]
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            margins: '0, 0, 10, 0',
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
                            itemId: 'gpn_bridge_grid',
                            title: '',
                            store: 'st_ha_bridge_grid',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    text: '인터페이스',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'name',
                                    text: '이름',
                                    flex: 2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'target_ip',
                                    text: '대상 IP 주소',
                                    flex: 1.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'info',
                                    text: 'Info',
                                    flex: 2
                                }
                            ],
                            listeners: {
                                itemclick: {
                                    fn: me.onGpn_bridge_gridItemClick,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.RowModel', {
                                mode: 'MULTI'
                            })
                        },
                        {
                            xtype: 'fieldset',
                            itemId: 'fds_ha_packetrelay',
                            title: 'Packet Relay',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_ha_internal',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_internal',
                                            margin: '0, 100, 0, 0',
                                            width: 250,
                                            fieldLabel: '내부 인터페이스',
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
                                                if(value){

                                                    var retValue = ValidMAC(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_destination',
                                            width: 250,
                                            fieldLabel: '목적지 MAC'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_ha_external',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_external',
                                            margin: '0, 100, 0, 0',
                                            width: 250,
                                            fieldLabel: '외부 인터페이스',
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
                                                if(value){

                                                    var retValue = ValidMAC(value);

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_destination',
                                            width: 250,
                                            fieldLabel: '목적지 MAC'
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
                    fn: me.onPnl_xtm_ha_head_officeAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_ha_head_officeBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onRdg_modeChange: function(field, newValue, oldValue, eOpts) {
        var componentObj = this.componentStorage();

        if(newValue.ha_head === 'bridge'){

            componentObj.bridge.setVisible(true);
            componentObj.mb.setVisible(false);

        }
        else{

            componentObj.bridge.setVisible(false);
            componentObj.mb.setVisible(true);

        }
    },

    onCmb_modeChange: function(field, newValue, oldValue, eOpts) {
        var componentObj = this.componentStorage();

        if(newValue === 'ha-link')	{

            componentObj.groupid.setFieldLabel('이름');

            componentObj.mbmode.down('[itemId=ctn_ha_virtual]').setVisible(false);

        }
        else{

            componentObj.groupid.setFieldLabel('그룹 ID');

            componentObj.mbmode.down('[itemId=ctn_ha_virtual]').setVisible(true);

        }
    },

    onCtn_headoffice_controlAfterRender1: function(component, eOpts) {
        // onCtn_headoffice_controlAfterRender1 =========================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : 본점 데이터를 저장, 수정, 삭제 작업을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            var ha_mode = componentObj.mode.getValue();

        // 유효성 검사 수행 ===============================================================================================================================================================

            if(!me.validityCheck().blankCheck(componentObj.groupid) || !me.validityCheck().blankCheck(componentObj.targetip) ||

        // 빈 값 검사, 타입 검사 ==========================================================================================================================================================

               !me.validityCheck().blankCheck(componentObj.timeout) || !me.validityCheck().blankCheck(componentObj.virtip, (ha_mode === 'ha-link') ? false : true) ||
               !me.validityCheck().valueTypeCheck(componentObj.groupid, ha_mode, '그룹 ID는 1~254 사이의 정수만 입력이 가능합니다.') ||

        // 대상 IP 주소 체크 =============================================================================================================================================================

               !me.validityCheck().ipValidateCheck(componentObj.targetip, ha_mode, 'IP 형식이 맞지 않습니다.') || !me.validityCheck().ipValidateCheck(componentObj.virtip, ha_mode, 'IP 형식이 맞지 않습니다.') ||

        // 타임아웃 범위 검사 =============================================================================================================================================================

               !me.validityCheck().validateCheck(componentObj.timeout, '타임아웃의 범위는 1~10 입니다.') ||

        // 대상 ID 중복 검사 =============================================================================================================================================================

               !me.validityCheck().duplicateCheck('add', (ha_mode === 'ha-link') ? componentObj.groupid.getValue() : Number(componentObj.groupid.getValue()), null, 'name', 'st_ha_master_backup_grid', '그룹ID / 이름은 중복될 수 없습니다.')){

               return;

            }

            var obj = {};

            obj.info         = componentObj.timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.mb_eth.getValue();
            obj.mode         = ha_mode;
            obj.name         = (ha_mode === 'ha-link') ? componentObj.groupid.getValue() : Number(componentObj.groupid.getValue());
            obj.target_ip    = componentObj.targetip.getValue();
            obj.timeout      = componentObj.timeout.getValue();
            obj.virtual_ip   = (ha_mode === 'ha-link') ? null : componentObj.virtip.getValue();

            gridData_Add(componentObj.mbgrid , obj);

        });

        bt_mod.on('click', function(){

            var ha_mode = componentObj.mode.getValue();

            if(!componentObj.mbgrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 Master / Backup 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

        // 유효성 검사 수행 ===============================================================================================================================================================

            if(!me.validityCheck().blankCheck(componentObj.groupid) || !me.validityCheck().blankCheck(componentObj.targetip) ||

        // 빈 값 검사, 타입 검사 ==========================================================================================================================================================

               !me.validityCheck().blankCheck(componentObj.timeout) || !me.validityCheck().blankCheck(componentObj.virtip, (ha_mode === 'ha-link') ? false : true) ||
               !me.validityCheck().valueTypeCheck(componentObj.groupid, ha_mode, '그룹 ID는 1~254 사이의 정수만 입력이 가능합니다.') ||

        // 대상 IP 주소 체크 =============================================================================================================================================================

               !me.validityCheck().ipValidateCheck(componentObj.targetip, ha_mode, 'IP 형식이 맞지 않습니다.') || !me.validityCheck().ipValidateCheck(componentObj.virtip, ha_mode, 'IP 형식이 맞지 않습니다.') ||

        // 타임아웃 범위 검사 =============================================================================================================================================================

               !me.validityCheck().validateCheck(componentObj.timeout, '타임아웃의 범위는 1~10 입니다.') ||

        // 대상 ID 중복 검사 =============================================================================================================================================================

               !me.validityCheck().duplicateCheck('mod', (ha_mode === 'ha-link') ? componentObj.groupid.getValue() : Number(componentObj.groupid.getValue()), componentObj.mbgrid.getSelectionModel().getSelection()[0].get('name'), 'name', 'st_ha_master_backup_grid', '그룹ID / 이름은 중복될 수 없습니다.')){

               return;

            }

            var obj = {};

            obj.info         = componentObj.timeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.mb_eth.getValue();
            obj.mode         = componentObj.mode.getValue();
            obj.name         = (ha_mode === 'ha-link') ? componentObj.groupid.getValue() : Number(componentObj.groupid.getValue());
            obj.target_ip    = componentObj.targetip.getValue();
            obj.timeout      = componentObj.timeout.getValue();
            obj.virtual_ip   = (componentObj.mode.getValue() === 'ha-link') ? null : componentObj.virtip.getValue();

            selectionGrid_Mod(componentObj.mbgrid , obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.mbgrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 Master / Backup 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.mbgrid);

        });
    },

    onGpn_ha_setItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = this.componentStorage();

        componentObj.mb_eth.setValue(record.data['interface']);
        componentObj.mode.setValue(record.data.mode);
        componentObj.groupid.setValue(record.data.name);
        componentObj.targetip.setValue(record.data.target_ip);
        componentObj.virtip.setValue(record.data.virtual_ip);
        componentObj.timeout.setValue(record.data.timeout);
    },

    onCtn_bridge_controlAfterRender: function(component, eOpts) {
        // onCtn_bridge_controlAfterRender =============================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : HA 본점 브릿지 설정을 추가, 수정, 삭제 작업을 수행합니다.
        //
        // =============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().bridgeAddCount() || !me.validityCheck().blankCheck(componentObj.name) || !me.validityCheck().blankCheck(componentObj.bdestip) ||
               !me.validityCheck().blankCheck(componentObj.btimeout) || !me.validityCheck().validateCheck(componentObj.bdestip, 'IP 형식에 맞지 않습니다.') ||
               !me.validityCheck().validateCheck(componentObj.btimeout, '타임아웃의 범위는 1~10 입니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.btimeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.bm_eth.getValue();
            obj.name         = componentObj.name.getValue();
            obj.target_ip    = componentObj.bdestip.getValue();
            obj.timeout      = componentObj.btimeout.getValue();

            gridData_Add(componentObj.bgrid , obj);

        });

        bt_mod.on('click', function(){

            if(!componentObj.bgrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 Bridge 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().bridgeAddCount() || !me.validityCheck().blankCheck(componentObj.name) || !me.validityCheck().blankCheck(componentObj.bdestip) ||
               !me.validityCheck().blankCheck(componentObj.btimeout) || !me.validityCheck().validateCheck(componentObj.bdestip, 'IP 형식에 맞지 않습니다.') ||
               !me.validityCheck().validateCheck(componentObj.btimeout, '타임아웃의 범위는 1~10 입니다.')){

                return;

            }

            var obj = {};

            obj.info         = componentObj.btimeout.getValue() + "회 실패시 타임아웃";
            obj['interface'] = componentObj.bm_eth.getValue();
            obj.name         = componentObj.name.getValue();
            obj.target_ip    = componentObj.bdestip.getValue();
            obj.timeout      = componentObj.btimeout.getValue();

            selectionGrid_Mod(componentObj.bgrid , obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.bgrid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 Bridge 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.bgrid);

        });
    },

    onGpn_bridge_gridItemClick: function(dataview, record, item, index, e, eOpts) {
        var componentObj = this.componentStorage();

        componentObj.bm_eth.setValue(record.raw['interface']);
        componentObj.name.setValue(record.raw.name);
        componentObj.bdestip.setValue(record.raw.target_ip);
        componentObj.btimeout.setValue(record.raw.timeout);
    },

    onPnl_xtm_ha_head_officeAfterRender: function(component, eOpts) {
        // onPnl_xtm_ha_head_officeAfterRender =========================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : HA 본점 데이터를 설정된 모드의 그리드에 출력력력합니다.
        //
        // =============================================================================================================================================================================

        var modeSelect         = component.down('[itemId=rdg_mode]');

        var bridgeStore        = Ext.getStore('st_ha_bridge_grid');
        var master_backupStore = Ext.getStore('st_ha_master_backup_grid');

        var componentObj       = this.componentStorage();

        this.initStore();

        var deviceData = component.deviceParams;

        component.setLoading(true);

        if(deviceData){

            modeSelect.setValue({	'ha_head' : (deviceData.head_mode['@mode'] === null) ? 'master' : deviceData.head_mode['@mode']  });

        // 브릿지 데이터 초기화 ===========================================================================================================================================================

            if(deviceData.bridge){

                var internalEth = null;
                var externalEth = null;

                var headChecker = deviceData.bridge.checker_link;
                var headInternal = deviceData.bridge.packet_relay.internal;
                var headExternal = deviceData.bridge.packet_relay.external;

                if(headChecker){

                    bridgeStore.add(headChecker);

                }

                if(headInternal){

                    internalEth = headInternal.interface;
                    componentObj.indesmac.setValue(deviceData.bridge.packet_relay.internal.mac);

                }

                componentObj.ineth.setValue((internalEth === null) ? 'eth0' : internalEth);


                if(headExternal){

                    externalEth = headExternal.interface;
                    componentObj.exdesmac.setValue(deviceData.bridge.packet_relay.external.mac);

                }

                componentObj.exeth.setValue((externalEth === null) ? 'eth0' : externalEth);

            }

        // 마스터 / 백업 데이터 초기화 =====================================================================================================================================================

            var head_backup = deviceData.master_backup;

            if(head_backup){

                if(head_backup.checker_ha){

                    master_backupStore.add(head_backup.checker_ha);

                }

                if(head_backup.use_keepstate_mode){

                    componentObj.active.setValue((head_backup.use_keepstate_mode['@chk_use'] === 'on') ? true : false);

                }

                if(head_backup.use_real_ip){

                    componentObj.ike.setValue((head_backup.use_real_ip['@chk_use'] === 'on') ? true : false);

                }

            }

        }

        component.setLoading(false);
    },

    onPnl_xtm_ha_head_officeBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        // 필드셋 오브젝트

        var component         = Ext.getCmp('pnl_xtm_ha_head_office');

        var master_backup     = component.down('[itemId=ctn_ha_master_backup]');
        var bridge            = component.down('[itemId=ctn_ha_bridge]');

        // 컴포넌트 모음

        var runmode           = component.down('[itemId=ctn_ha_modeselect]').down('[itemId=rdg_mode]');

        var master_backupMode = component.down('[itemId=ctn_ha_master_backup]');

        var mb_eth            = master_backupMode.down('[itemId=ctn_ha_interface]').down('[itemId=cmb_interface]');
        var mode              = master_backupMode.down('[itemId=ctn_ha_mode]').down('[itemId=cmb_mode]');
        var groupid           = master_backupMode.down('[itemId=ctn_ha_mode]').down('[itemId=txf_name]');

        var targetip          = master_backupMode.down('[itemId=ctn_ha_target]').down('[itemId=txf_targetip]');
        var virtualip         = master_backupMode.down('[itemId=ctn_ha_virtual]').down('[itemId=txf_virtual]');

        var timeout           = master_backupMode.down('[itemId=ctn_ha_timeout]').down('[itemId=nfd_timeout]');

        var gridObj           = master_backupMode.down('[itemId=gpn_ha_set]');

        var ike               = master_backupMode.down('[itemId=ctn_ha_checkop]').down('[itemId=ck_ike]');
        var active            = master_backupMode.down('[itemId=ctn_ha_checkop]').down('[itemId=ck_active]');

        var bm_eth            = bridge.down('[itemId=ctn_ha_interface]').down('[itemId=cmb_interface]');
        var _name             = bridge.down('[itemId=txf_name]');
        var _destinationip    = bridge.down('[itemId=txf_destination]');
        var _timeout          = bridge.down('[itemId=nfd_timeout]');

        var bridgeGrid        = bridge.down('[itemId=gpn_bridge_grid]');

        var _internalEth      = bridge.down('[itemId=fds_ha_packetrelay]').down('[itemId=ctn_ha_internal]').down('[itemId=cmb_internal]');
        var _internalMac      = bridge.down('[itemId=fds_ha_packetrelay]').down('[itemId=ctn_ha_internal]').down('[itemId=txf_destination]');

        var _externalEth      = bridge.down('[itemId=fds_ha_packetrelay]').down('[itemId=ctn_ha_external]').down('[itemId=cmb_external]');
        var _externalMac      = bridge.down('[itemId=fds_ha_packetrelay]').down('[itemId=ctn_ha_external]').down('[itemId=txf_destination]');

        obj.mb       = master_backup;
        obj.bridge   = bridge;
        obj.runmode  = runmode;

        obj.mb_eth   = mb_eth;
        obj.mbmode   = master_backupMode;
        obj.mode     = mode;
        obj.groupid  = groupid;
        obj.targetip = targetip;
        obj.virtip   = virtualip;
        obj.timeout  = timeout;
        obj.mbgrid   = gridObj;
        obj.ike      = ike;
        obj.active   = active;

        obj.bm_eth   = bm_eth;
        obj.name     = _name;
        obj.bdestip  = _destinationip;
        obj.btimeout = _timeout;
        obj.bgrid    = bridgeGrid;
        obj.ineth    = _internalEth;
        obj.indesmac = _internalMac;
        obj.exeth    = _externalEth;
        obj.exdesmac = _externalMac;

        return obj;
    },

    validityCheck: function() {
        // validityCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.07.03
        //
        // 설명 : HA 본점 유효성을 검사합니다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var masterStore = Ext.getStore('st_ha_master_backup_grid');

        var validCheckObj = {

            'blankCheck' : function(component){

                var argument = (arguments[1] === undefined) ? true : arguments[1];

                if(component.getXType() === 'textfield'){

                    if(component.getValue() === '' && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn' : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }
                else{

                    if(component.getValue() === null && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn' : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }

                return true;

            },
            'bridgeMacValidate' : function(){

                if(component.indesmac.getValue() !== '' && !component.indesmac.validate()){

                    Ext.Msg.show({

                        'title' : 'WeGuardia™ SMC 2.0',
                        'msg' : 'Mac 주소 값 형식에 맞지 않습니다.',
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn' : function(res){

                            component.indesmac.focus();

                        }

                    });

                    return false;

                }

                if(component.exdesmac.getValue() !== '' && !component.exdesmac.validate()){

                    Ext.Msg.show({

                        'title' : 'WeGuardia™ SMC 2.0',
                        'msg' : 'Mac 주소 값 형식에 맞지 않습니다.',
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn' : function(res){

                            component.exdesmac.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'validateCheck' : function(component, msg){

                var argument = (arguments[2] === undefined) ? true : arguments[2];

                if(!component.validate() && argument){

                    Ext.Msg.show({

                        'title' : 'WeGuardia™ SMC 2.0',
                        'msg' : msg,
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn' : function(res){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'ipValidateCheck' : function(component, terms, msg){

                var argument = (arguments[2] === undefined) ? true : arguments[2];

                if(terms !== 'ha-link'){

                    if(!component.validate() && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : msg,
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn' : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }
                else{

                    if(component.itemId !== 'txf_virtual'){

                        if(!component.validate() && argument){

                            Ext.Msg.show({

                                'title' : 'WeGuardia™ SMC 2.0',
                                'msg' : msg,
                                'buttons' : Ext.Msg.OK,
                                'icon' : Ext.Msg.ERROR,
                                'fn' : function(res){

                                    component.focus();

                                }

                            });

                            return false;

                        }

                    }

                }

                return true;

            },
            'valueTypeCheck' : function(component, terms, msg){

                if(terms !== 'ha-link'){

                    if(isNaN(parseInt(component.getValue()))){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : msg,
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn' : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }

                return true;

            },
            'bridgeAddCount' : function(){

                if(component.bgrid.getStore().count() >= 1){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Bridge 데이터는 1개만 등록할 수 있습니다.',
                        buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR

                    });

                    return false;
                }

                return true;

            },
            'duplicateCheck' : function(mode, value, value2, field, storeid, msg){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(value, field, storeid)){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    if(!duplicationItem(value, field, storeid) && value !== value2){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
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
        // 일 시 : 2014.06.14
        //
        // 설 명 : HA 본점 설정을 저장합니다.
        //
        // 수 정 :
        //
        // - (2015.09.01 김민수) : Bridge 저장 방식 변경 (internal, external undefined 체크 추가), 브릿지에서 맥 주소값을 검사하는 유효성 코드 추가
        //
        // =============================================================================================================================================================================

        var bridgeStore  = Ext.getStore('st_ha_bridge_grid');
        var masterBackup = Ext.getStore('st_ha_master_backup_grid');

        var component = this.componentStorage();

        // 모드 저장 ====================================================================================================================================================================

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(deviceAllData.ha_head_script.head_mode){

            deviceAllData.ha_head_script.head_mode['@mode'] = component.runmode.getValue().ha_head;

        }
        else{

            deviceAllData.ha_head_script.head_mode = {};

            deviceAllData.ha_head_script.head_mode['@mode'] = component.runmode.getValue().ha_head;

        }

        // 브릿지 저장 ===================================================================================================================================================================

        if(deviceAllData.ha_head_script.bridge.checker_link){

            if(bridgeStore.count()){

                deviceAllData.ha_head_script.bridge.checker_link = bridgeStore.getAt(0).data;

            }
            else{

                delete deviceAllData.ha_head_script.bridge.checker_link;

            }

        }
        else{

            if(bridgeStore.count()){

                deviceAllData.ha_head_script.bridge.checker_link = {};
                deviceAllData.ha_head_script.bridge.checker_link = bridgeStore.getAt(0).data;

            }

        }

        // 브릿지 Mac 주소 유효성 검사 실시 =================================================================================================================================================

        if(!this.validityCheck().bridgeMacValidate()){

            return false;

        }

        var head_internal = deviceAllData.ha_head_script.bridge.packet_relay.internal;
        var head_external = deviceAllData.ha_head_script.bridge.packet_relay.external;

        if(head_internal){

            deviceAllData.ha_head_script.bridge.packet_relay.internal.interface = (component.ineth.getValue() === '') ? null : component.ineth.getValue();
            deviceAllData.ha_head_script.bridge.packet_relay.internal.mac = (component.indesmac.getValue() === '') ? null : component.indesmac.getValue();

        }
        else{

            deviceAllData.ha_head_script.bridge.packet_relay.internal = {};
            deviceAllData.ha_head_script.bridge.packet_relay.internal.interface = (component.ineth.getValue() === '') ? null : component.ineth.getValue();
            deviceAllData.ha_head_script.bridge.packet_relay.internal.mac = (component.indesmac.getValue() === '') ? null : component.indesmac.getValue();

        }

        if(head_external){

            deviceAllData.ha_head_script.bridge.packet_relay.external.interface = (component.exeth.getValue() === '') ? null : component.exeth.getValue();
            deviceAllData.ha_head_script.bridge.packet_relay.external.mac = (component.exdesmac.getValue() === '') ? null : component.exdesmac.getValue();

        }
        else{

            deviceAllData.ha_head_script.bridge.packet_relay.external = {};
            deviceAllData.ha_head_script.bridge.packet_relay.external.interface = (component.exeth.getValue() === '') ? null : component.exeth.getValue();
            deviceAllData.ha_head_script.bridge.packet_relay.external.mac = (component.exdesmac.getValue() === '') ? null : component.exdesmac.getValue();

        }

        // 백업, 마스터 저장 ==============================================================================================================================================================
        //
        // 설명 : 백업과 마스터 데이터를 저장합니다. 데이터가 없으면 전체 장치 데이터가 null로 나타나므로 delete 연산을 통하여 객체를 삭제합니다.
        //       데이터가 한개일 경우 객체타입으로 저장합니다. 객체가 여러개일 경우 배열을 저장합니다.
        //
        // =============================================================================================================================================================================

        // 백업, 마스터가 null 이 아닐 경우 (데이터가 이미 들어있는 경우) =======================================================================================================================

        if(deviceAllData.ha_head_script.master_backup !== null){

            // 백업, 마스터 스토어 데이터 갯수 조회 ==============================================================================================================================================

            var mbCtn = masterBackup.count();

            // 백업, 마스터의 데이터가 한개라도 있을 경우 체크박스의 데이터도 같이 생성되어야 합니다 =====================================================================================================

            if(mbCtn){

                // 백업, 마스터 데이터가 한개라면 ===================================================================================================================================================

                if(mbCtn === 1){

                    if(deviceAllData.ha_head_script.master_backup.checker_ha !== undefined){

                        deviceAllData.ha_head_script.master_backup.checker_ha = masterBackup.getAt(0).data;

                    }
                    else{

                        deviceAllData.ha_head_script.master_backup.checker_ha = {};

                        deviceAllData.ha_head_script.master_backup.checker_ha = masterBackup.getAt(0).data;

                    }

                    if(deviceAllData.ha_head_script.master_backup.use_real_ip === undefined)
                        deviceAllData.ha_head_script.master_backup.use_real_ip        = {};

                    if(deviceAllData.ha_head_script.master_backup.use_keepstate_mode === undefined)
                        deviceAllData.ha_head_script.master_backup.use_keepstate_mode = {};

                    deviceAllData.ha_head_script.master_backup.use_real_ip['@chk_use']        = (component.ike.getValue() === true) ? 'on' : 'off';
                    deviceAllData.ha_head_script.master_backup.use_keepstate_mode['@chk_use'] = (component.active.getValue() === true) ? 'on' : 'off';

                }
                else {

                    // 백업, 마스터 데이터가 여러개라면 =================================================================================================================================================

                    if(deviceAllData.ha_head_script.master_backup.checker_ha){

                        var mbArray = [];

                        for(var i = 0; i < mbCtn; i++){

                            mbArray.push(masterBackup.getAt(i).data);

                        }

                        deviceAllData.ha_head_script.master_backup.checker_ha = mbArray;

                    }
                    else{

                        var mbArray = [];

                        deviceAllData.ha_head_script.master_backup.checker_ha = [];

                        for(var i = 0; i < mbCtn; i++){

                            mbArray.push(masterBackup.getAt(i).data);

                        }

                        deviceAllData.ha_head_script.master_backup.checker_ha = mbArray;

                    }

                    if(deviceAllData.ha_head_script.master_backup.use_real_ip === undefined)
                        deviceAllData.ha_head_script.master_backup.use_real_ip        = {};

                    if(deviceAllData.ha_head_script.master_backup.use_keepstate_mode === undefined)
                        deviceAllData.ha_head_script.master_backup.use_keepstate_mode = {};

                    deviceAllData.ha_head_script.master_backup.use_real_ip['@chk_use']        = (component.ike.getValue() === true) ? 'on' : 'off';
                    deviceAllData.ha_head_script.master_backup.use_keepstate_mode['@chk_use'] = (component.active.getValue() === true) ? 'on' : 'off';

                }

            }
            else{

                // 백업, 마스터 데이터가 없을 경우 ==================================================================================================================================================

                if(deviceAllData.ha_head_script.master_backup.checker_ha !== undefined)
                    delete deviceAllData.ha_head_script.master_backup.checker_ha;

                // 체크된 부분이 있는지 없는지 확인 있으면 객체 생성 후 저장 ============================================================================================================================

                if(component.ike.getValue() === true || component.active.getValue() === true){

                    if(deviceAllData.ha_head_script.master_backup.use_real_ip === undefined)
                        deviceAllData.ha_head_script.master_backup.use_real_ip        = {};

                    if(deviceAllData.ha_head_script.master_backup.use_keepstate_mode === undefined)
                        deviceAllData.ha_head_script.master_backup.use_keepstate_mode = {};

                    deviceAllData.ha_head_script.master_backup.use_real_ip['@chk_use']        = (component.ike.getValue() === true) ? 'on' : 'off';
                    deviceAllData.ha_head_script.master_backup.use_keepstate_mode['@chk_use'] = (component.active.getValue() === true) ? 'on' : 'off';

                }
                else{

                    // 체크된 부분이 없으면 장비 데이터에 체크박스에 관련된 프로퍼티가 있는지 typeof로 조회 후 없으면 있으면 삭제 ==================================================================================

                    if(deviceAllData.ha_head_script.master_backup.use_keepstate_mode !== undefined)
                        delete deviceAllData.ha_head_script.master_backup.use_keepstate_mode;

                    if(deviceAllData.ha_head_script.master_backup.use_real_ip !== undefined)
                        delete deviceAllData.ha_head_script.master_backup.use_real_ip;

                    deviceAllData.ha_head_script.master_backup = null;

                }

            }

        }
        else{

            // 백업, 마스터 데이터가 없을 경우 ==================================================================================================================================================

            // 백업, 마스터 스토어 데이터 갯수 조회 ==============================================================================================================================================

            var mbCtn = masterBackup.count();

            // 백업, 마스터의 데이터가 한개라도 있을 경우 체크박스의 데이터도 같이 생성되어야 합니다 =====================================================================================================

            if(mbCtn){

                deviceAllData.ha_head_script.master_backup = {};

                // 백업, 마스터 데이터가 한개라면 ===================================================================================================================================================

                if(mbCtn === 1){

                    if(deviceAllData.ha_head_script.master_backup.checker_ha){

                        deviceAllData.ha_head_script.master_backup.checker_ha = masterBackup.getAt(0).data;

                    }
                    else{

                        var mbArray = [];

                        deviceAllData.ha_head_script.master_backup.checker_ha = {};

                        deviceAllData.ha_head_script.master_backup.checker_ha = masterBackup.getAt(0).data;

                    }

                    if(deviceAllData.ha_head_script.master_backup.use_real_ip === undefined)
                        deviceAllData.ha_head_script.master_backup.use_real_ip        = {};

                    if(deviceAllData.ha_head_script.master_backup.use_keepstate_mode === undefined)
                        deviceAllData.ha_head_script.master_backup.use_keepstate_mode = {};

                    deviceAllData.ha_head_script.master_backup.use_real_ip['@chk_use']        = (component.ike.getValue() === true) ? 'on' : 'off';
                    deviceAllData.ha_head_script.master_backup.use_keepstate_mode['@chk_use'] = (component.active.getValue() === true) ? 'on' : 'off';

                }
                else {

                    // 백업, 마스터 데이터가 여러개라면 =================================================================================================================================================

                    if(deviceAllData.ha_head_script.master_backup.checker_ha){

                        var mbArray = [];

                        for(var i = 0; i < mbCtn; i++){

                            mbArray.push(masterBackup.getAt(i).data);

                        }

                        deviceAllData.ha_head_script.master_backup.checker_ha = mbArray;

                    }
                    else{

                        var mbArray = [];

                        deviceAllData.ha_head_script.master_backup.checker_ha = [];

                        for(var i = 0; i < mbCtn; i++){

                            mbArray.push(masterBackup.getAt(i).data);

                        }

                        deviceAllData.ha_head_script.master_backup.checker_ha = mbArray;

                    }

                    if(deviceAllData.ha_head_script.master_backup.use_real_ip === undefined)
                        deviceAllData.ha_head_script.master_backup.use_real_ip        = {};

                    if(deviceAllData.ha_head_script.master_backup.use_keepstate_mode === undefined)
                        deviceAllData.ha_head_script.master_backup.use_keepstate_mode = {};

                    deviceAllData.ha_head_script.master_backup.use_real_ip['@chk_use']        = (component.ike.getValue() === true) ? 'on' : 'off';
                    deviceAllData.ha_head_script.master_backup.use_keepstate_mode['@chk_use'] = (component.active.getValue() === true) ? 'on' : 'off';

                }

            }
            else{

                // 백업, 마스터 데이터가 없을 경우 ==================================================================================================================================================

                // 체크된 부분이 있는지 없는지 확인 있으면 객체 생성 후 저장 ============================================================================================================================

                if(component.ike.getValue() === true || component.active.getValue() === true){

                    deviceAllData.ha_head_script.master_backup = {};

                    if(deviceAllData.ha_head_script.master_backup.use_real_ip === undefined)
                        deviceAllData.ha_head_script.master_backup.use_real_ip        = {};

                    if(deviceAllData.ha_head_script.master_backup.use_keepstate_mode === undefined)
                        deviceAllData.ha_head_script.master_backup.use_keepstate_mode = {};

                    deviceAllData.ha_head_script.master_backup.use_real_ip['@chk_use']        = (component.ike.getValue() === true) ? 'on' : 'off';
                    deviceAllData.ha_head_script.master_backup.use_keepstate_mode['@chk_use'] = (component.active.getValue() === true) ? 'on' : 'off';

                }

            }

        }

        return true;
    },

    initStore: function() {
        var headStore   = Ext.getStore('st_ha_headoffice_set');
        var gridStore   = Ext.getStore('st_ha_master_backup_grid');
        var bridgeStore = Ext.getStore('st_ha_bridge_grid');

        headStore.removeAll();
        gridStore.removeAll();
        bridgeStore.removeAll();
    }

});