
Ext.define('SMC.view.pnl_xtm_anomaly_portscan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_anomaly_portscan',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.form.field.Number',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.View',
        'Ext.grid.plugin.RowEditing',
        'Ext.button.Button',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action'
    ],

    height: 680,
    id: 'pnl_xtm_anomaly_portscan',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: 'Portscan Anomaly',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_checkportscan',
                    margin: '0, 0, 10, 0',
                    fieldLabel: '',
                    boxLabel: 'Portscan Anomaly 검사'
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_portscan_select',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_protocol',
                            margin: '0, 50, 0, 0',
                            width: 250,
                            fieldLabel: 'Protocol',
                            value: 'Any',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'st_anomaly_protocol',
                            valueField: 'value'
                        },
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_sensitive',
                            width: 250,
                            fieldLabel: '민감도',
                            value: 'Low',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'st_anomaly_sensitive',
                            valueField: 'value'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 150,
                    itemId: 'fds_portscan_extention',
                    margin: '0, 0, 10, 0',
                    title: 'Scan Type Extention',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_portscan_extention',
                            margin: '10, 0, 10, 0',
                            title: '',
                            store: 'st_portscan_extention',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: '@scan_type',
                                    text: '스캔 방법',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 'alert') ? '탐지' : '차단';
                                    },
                                    dataIndex: '@action',
                                    text: '액션',
                                    flex: 1,
                                    editor: {
                                        xtype: 'combobox',
                                        itemId: 'cmb_action',
                                        value: 'alert',
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'st_anomaly_action',
                                        valueField: 'value'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: '@time',
                                    text: '차단 시간',
                                    flex: 1,
                                    editor: {
                                        xtype: 'numberfield',
                                        itemId: 'nfd_time'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 1) ? '① Protocol, 출발지 IP, Port 차단 (1 : N)' : '② Protocol, 목적지 IP, Port 차단 (N : 1)';
                                    },
                                    dataIndex: '@drop_type',
                                    text: '차단 유형',
                                    flex: 2.5,
                                    editor: {
                                        xtype: 'combobox',
                                        itemId: 'cmb_blocktype',
                                        value: 1,
                                        editable: false,
                                        displayField: 'name',
                                        queryMode: 'local',
                                        store: 'st_portscan_blocktype',
                                        valueField: 'value'
                                    }
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@use',
                                    text: '사 용',
                                    flex: 1,
                                    listeners: {
                                        checkchange: {
                                            fn: me.onCheckcolumnCheckChange,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            plugins: [
                                Ext.create('Ext.grid.plugin.RowEditing', {
                                    pluginId: 'plg_portscan_rowedit',
                                    clicksToEdit: 1,
                                    listeners: {
                                        beforeedit: {
                                            fn: me.onRowEditingBeforeEdit,
                                            scope: me
                                        }
                                    }
                                })
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 300,
                    itemId: 'fds_portscan_watchip',
                    margin: '0, 0, 10, 0',
                    title: 'Destination Watch IP',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
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
                            itemId: 'txf_ip',
                            margin: '10, 0, 10, 0',
                            maxWidth: 300,
                            fieldLabel: 'IP 주소'
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
                            itemId: 'txf_netmask',
                            margin: '0, 0, 10, 0',
                            maxWidth: 300,
                            fieldLabel: '넷마스크'
                        },
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_portscan_add',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    flex: 1,
                                    itemId: 'bt_add',
                                    maxWidth: 100,
                                    text: '추 가',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_addClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_portscan_watch',
                            margin: '0, 0, 10, 0',
                            title: '',
                            store: 'st_portscan_watchip',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'ip',
                                    text: 'IP 주소',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'netmask',
                                    text: '넷마스크',
                                    flex: 1
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 200,
                                    align: 'center',
                                    dataIndex: 'number',
                                    flex: 0.5,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                // handler =======================================================================================================================================================================
                                                //
                                                // 일시 : 2014.09.29
                                                //
                                                // 설명 : 버튼에 있는 Row 를 삭제합니다.
                                                //
                                                // ===============================================================================================================================================================================

                                                var watchStore = Ext.getStore('st_portscan_watchip');

                                                watchStore.removeAt(rowIndex);
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
                    xtype: 'fieldset',
                    height: 300,
                    itemId: 'fds_portscan_sourceip',
                    margin: '0, 0, 10, 0',
                    title: 'Exception Source IP',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
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
                            itemId: 'txf_ip',
                            margin: '10, 0, 10, 0',
                            maxWidth: 300,
                            fieldLabel: 'IP 주소'
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
                            itemId: 'txf_netmask',
                            margin: '0, 0, 10, 0',
                            maxWidth: 300,
                            fieldLabel: '넷마스크'
                        },
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_portscan_add',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    flex: 1,
                                    itemId: 'bt_add',
                                    maxWidth: 100,
                                    text: '추 가',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_addClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_portscan_destination',
                            margin: '0, 0, 10, 0',
                            title: '',
                            store: 'st_portscan_sourceip',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'ip',
                                    text: 'IP 주소',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'netmask',
                                    text: '넷마스크',
                                    flex: 1
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 200,
                                    align: 'center',
                                    dataIndex: 'number',
                                    flex: 0.5,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                // handler =======================================================================================================================================================================
                                                //
                                                // 일시 : 2014.09.29
                                                //
                                                // 설명 : 버튼에 있는 Row 를 삭제합니다.
                                                //
                                                // ===============================================================================================================================================================================

                                                var sourceipStore = Ext.getStore('st_portscan_sourceip');

                                                sourceipStore.removeAt(rowIndex);
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
                    xtype: 'fieldset',
                    height: 300,
                    itemId: 'fds_portscan_destinationip',
                    margin: '0, 0, 10, 0',
                    title: 'Exception Destination IP',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
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
                            itemId: 'txf_ip',
                            margin: '10, 0, 10, 0',
                            maxWidth: 300,
                            fieldLabel: 'IP 주소'
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
                            itemId: 'txf_netmask',
                            margin: '0, 0, 10, 0',
                            maxWidth: 300,
                            fieldLabel: '넷마스크'
                        },
                        {
                            xtype: 'container',
                            margins: '0, 0, 10, 0',
                            itemId: 'ctn_portscan_add',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    flex: 1,
                                    itemId: 'bt_add',
                                    maxWidth: 100,
                                    text: '추 가',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_addClick11,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_portscan_destination',
                            margin: '0, 0, 10, 0',
                            title: '',
                            store: 'st_portscan_destinationip',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'ip',
                                    text: 'IP 주소',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'netmask',
                                    text: '넷마스크',
                                    flex: 1
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 200,
                                    align: 'center',
                                    dataIndex: 'number',
                                    flex: 0.5,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                // handler =======================================================================================================================================================================
                                                //
                                                // 일시 : 2014.09.29
                                                //
                                                // 설명 : 버튼에 있는 Row 를 삭제합니다.
                                                //
                                                // ===============================================================================================================================================================================

                                                var destinationipStore = Ext.getStore('st_portscan_destinationip');

                                                destinationipStore.removeAt(rowIndex);
                                            },
                                            iconCls: 'ico_grid_row_delete'
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
                    fn: me.onPnl_xtm_anomaly_portscanAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_anomaly_portscanBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        // onCheckcolumnCheckChange ======================================================================================================================================================
        //
        // 일시 : 2014.10.06
        //
        // 설명 : 사용 Checkbox를 클릭하면 Checkbox의 상태가 Store에 적용됩니다.
        //
        // ===============================================================================================================================================================================

        Ext.getStore('st_portscan_extention').sync();
    },

    onRowEditingBeforeEdit: function(editor, context, eOpts) {
        // onRowEditingBeforeEdit ========================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 :
        //
        // ===============================================================================================================================================================================

        var extentionList = this.componentStorage().extentionList;

        if(context.record.data['@action'] === 'alert'){

            extentionList.getPlugin('plg_portscan_rowedit').editor.form.findField('@time').disable();
            extentionList.getPlugin('plg_portscan_rowedit').editor.form.findField('@drop_type').disable();

        }
        else{

            extentionList.getPlugin('plg_portscan_rowedit').editor.form.findField('@time').enable();
            extentionList.getPlugin('plg_portscan_rowedit').editor.form.findField('@drop_type').enable();

        }
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.09.29
        //
        // 설명 : 추가 버튼 클릭시 IP와 넷마스크를 그리드에 추가합니다.
        //
        // ===============================================================================================================================================================================

        var watchStore = Ext.getStore('st_portscan_watchip');

        var component  = this.componentStorage();

        var watchIpAddr  = component.watchIpAddr.getValue();
        var watchNetMask = component.watchNetmask.getValue();

        // 유효성 검사 =====================================================================================================================================================================

        if(!this.validityCheck().componentBlankCheck(watchIpAddr, 'Watch IP 추가 에러', 'IP 가 입력되지 않았습니다.')    ||
           !this.validityCheck().componentBlankCheck(watchNetMask, 'Watch Netmask 추가 에러', 'Netmask 가 입력되지 않았습니다.') ||
           !this.validityCheck().ipAddressCheck(component.watchIpAddr)  ||
           !this.validityCheck().netmaskCheck(component.watchNetmask) ||
           !this.validityCheck().ipDuplicationCheck(watchIpAddr, 'st_portscan_watchip')){

            return;

        }

        watchStore.add({	'ip' : watchIpAddr, 'netmask' : watchNetMask	});
    },

    onPnl_xtm_anomaly_portscanAfterRender: function(component, eOpts) {
        // onPnl_xtm_anomaly_portscanAfterRender ========================================================================================================================================
        //
        // 일 시 : 2014.09.29
        //
        // 설 명 : 비정상 PortScan 데이터를 각 그리드에 출력합니다.
        //
        // 수 정 :
        //
        // (2015.06.23 김민수 : 파이어폭스에서 watch 객체를 프로토타입의 watch 함수로 인식하는 버그 발견. 조건 검사 강화)
        //
        // ==============================================================================================================================================================================

        this.initStore();

        var deviceData = component.deviceParams;
        var componentObj = this.componentStorage();

        // 스토어 정의 ====================================================================================================================================================================

        var extentionStore = Ext.getStore('st_portscan_extention');
        var watchipStore   = Ext.getStore('st_portscan_watchip');
        var sourceipStore  = Ext.getStore('st_portscan_sourceip');
        var destinationStore = Ext.getStore('st_portscan_destinationip');

        // extention 정보 초기화 ==========================================================================================================================================================

        var extentionInfo = [
            {	'@action' : 'alert', '@drop_type' : 1, '@scan_type' : 'Portscan'     , '@time' : 30, '@use' : false	},
            {	'@action' : 'alert', '@drop_type' : 1, '@scan_type' : 'PortSweep'    , '@time' : 30, '@use' : false	},
            {	'@action' : 'alert', '@drop_type' : 1, '@scan_type' : 'Decoy_Distrib', '@time' : 30, '@use' : false	}
        ];

        extentionStore.loadData(extentionInfo);

        extentionStore.sync();

        // 포트 스캔 기본 정보 초기화 =======================================================================================================================================================

        if(deviceData.portscan.setting){

            componentObj.check_portscan.setValue((deviceData.portscan.setting['@chk_use'] === 'on') ? true : false);
            componentObj.protocol.setValue(deviceData.portscan.setting['@protocol']);
            componentObj.sensitive.setValue(deviceData.portscan.setting['@level']);

        }

        // 예외 타입 정보 초기화 ===========================================================================================================================================================

        if(deviceData.extention.setting){

            for(var i = 0; i < extentionStore.count(); i++){

                var extentionTmp = {};

                extentionTmp['@action'] = deviceData.extention.setting[i]['@action'];
                extentionTmp['@drop_type'] = deviceData.extention.setting[i]['@drop_type'];
                extentionTmp['@scan_type'] = deviceData.extention.setting[i]['@scan_type'];
                extentionTmp['@time'] = deviceData.extention.setting[i]['@time'];
                extentionTmp['@use'] = (deviceData.extention.setting[i]['@use'] === 'on') ? true : false;

                extentionStore.getAt(i).set(extentionTmp);

            }

        }

        // watch ip 정보 초기화 ===========================================================================================================================================================

        if(typeof deviceData.watch !== "function" && deviceData.watch !== undefined){

            watchipStore.add(deviceData.watch);

        }

        // Source ip 정보 초기화 ==========================================================================================================================================================

        if(deviceData.scanner){

            sourceipStore.add(deviceData.scanner);

        }

        // Destination ip 정보 초기화 =====================================================================================================================================================

        if(deviceData.scanned){

            destinationStore.add(deviceData.scanned);

        }
    },

    onPnl_xtm_anomaly_portscanBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_anomaly_portscanBeforeClose =========================================================================================================================================
        //
        // 일시 : 2014.09.29
        //
        // 설명 : 화면이 이동하거나 파괴될 때의 작업을 수행합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    onBt_addClick1: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.09.29
        //
        // 설명 : 추가 버튼 클릭시 IP와 넷마스크를 그리드에 추가합니다.
        //
        // ===============================================================================================================================================================================

        var sourceipStore = Ext.getStore('st_portscan_sourceip');

        var component     = this.componentStorage();

        var sourceIpAddr  = component.sourceIpAddr.getValue();
        var sourceNetMask = component.sourceNetmask.getValue();

        // 유효성 검사 =====================================================================================================================================================================

        if(!this.validityCheck().componentBlankCheck(sourceIpAddr, 'Source IP 추가 에러', 'IP 가 입력되지 않았습니다.')  ||
           !this.validityCheck().componentBlankCheck(sourceNetMask, 'Source Netmask 추가 에러', 'Netmask 가 입력되지 않았습니다.') ||
           !this.validityCheck().ipAddressCheck(component.sourceIpAddr)  ||
           !this.validityCheck().netmaskCheck(component.sourceNetmask) ||
           !this.validityCheck().ipDuplicationCheck(sourceIpAddr, 'st_portscan_sourceip')){

            return;

        }

        sourceipStore.add({	'ip' : sourceIpAddr, 'netmask' : sourceNetMask	});
    },

    onBt_addClick11: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.09.29
        //
        // 설명 : 추가 버튼 클릭시 IP와 넷마스크를 그리드에 추가합니다.
        //
        // ===============================================================================================================================================================================

        var destinationipStore = Ext.getStore('st_portscan_destinationip');

        var component   = this.componentStorage();

        var destIpAddr  = component.destinationIpAddr.getValue();
        var destNetMask = component.destinationNetmask.getValue();

        // 유효성 검사 =====================================================================================================================================================================

        if(!this.validityCheck().componentBlankCheck(destIpAddr, 'Destination IP 추가 에러', 'IP 가 입력되지 않았습니다.')  ||
           !this.validityCheck().componentBlankCheck(destNetMask, 'Destination Netmask 추가 에러', 'Netmask 가 입력되지 않았습니다.') ||
           !this.validityCheck().ipAddressCheck(component.destinationIpAddr)  ||
           !this.validityCheck().netmaskCheck(component.destinationNetmask) ||
           !this.validityCheck().ipDuplicationCheck(destIpAddr, 'st_portscan_destinationip')){

            return;

        }

        destinationipStore.add({	'ip' : destIpAddr, 'netmask' :destNetMask	});
    },

    componentStorage: function() {
        var obj = {};

        obj.check_portscan = this.down('[itemId=ck_checkportscan]');
        obj.protocol       = this.down('[itemId=ctn_portscan_select]').down('[itemId=cmb_protocol]');
        obj.sensitive      = this.down('[itemId=ctn_portscan_select]').down('[itemId=cmb_sensitive]');

        // Extention 컴포넌트 ==============================================================================================================================================================

        obj.extentionList  = this.down('[itemId=fds_portscan_extention]').down('[itemId=gpn_portscan_extention]');

        // Watch IP 컴포넌트 ===============================================================================================================================================================

        obj.watchIpAddr    = this.down('[itemId=fds_portscan_watchip]').down('[itemId=txf_ip]');
        obj.watchNetmask = this.down('[itemId=fds_portscan_watchip]').down('[itemId=txf_netmask]');

        // Source IP 컴포넌트 ==============================================================================================================================================================

        obj.sourceIpAddr    = this.down('[itemId=fds_portscan_sourceip]').down('[itemId=txf_ip]');
        obj.sourceNetmask = this.down('[itemId=fds_portscan_sourceip]').down('[itemId=txf_netmask]');

        // Destination IP 컴포넌트 =========================================================================================================================================================

        obj.destinationIpAddr    = this.down('[itemId=fds_portscan_destinationip]').down('[itemId=txf_ip]');
        obj.destinationNetmask = this.down('[itemId=fds_portscan_destinationip]').down('[itemId=txf_netmask]');

        return obj;
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

            componentBlankCheck : function(value, titleMsg, contentMsg){

                if(value === ''){

                    Ext.Msg.show({

                        title : titleMsg,
                        msg : contentMsg,
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ipAddressCheck : function(componentObj){

                if(!componentObj.validate()){

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
            netmaskCheck : function(componentObj){

                if(!componentObj.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Netmask 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ipDuplicationCheck : function(componentValue, checkStoreId){

                if(!duplicationItem(componentValue, 'ip', checkStoreId)){

                    Ext.Msg.show({

                        title : 'IWeGuardia™ SMC 2.0',
                        msg : '같은 IP가 이미 등록되었습니다.',
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
        // saveData ===================================================================================================================================================================
        //
        // 일시 : 2014.09.29
        //
        // 설명 : port scan 설정 데이터를 저장합니다.
        //
        // ============================================================================================================================================================================

        var deviceAllData  = Ext.getCmp('win_smc_device_set').deviceParams;

        var component      = this.componentStorage();

        var extentionStore = Ext.getStore('st_portscan_extention');
        var watchipStore   = Ext.getStore('st_portscan_watchip');
        var sourceipStore  = Ext.getStore('st_portscan_sourceip');
        var destinationStore = Ext.getStore('st_portscan_destinationip');

        // 기본 설정 저장 ===============================================================================================================================================================

        if(!deviceAllData.network_anomaly_portscan.portscan.setting){

            deviceAllData.network_anomaly_portscan.portscan.setting = {};

        }

        deviceAllData.network_anomaly_portscan.portscan.setting['@chk_use']  = (component.check_portscan.getValue() === true) ? 'on' : 'off';
        deviceAllData.network_anomaly_portscan.portscan.setting['@level']    = component.sensitive.getValue();
        deviceAllData.network_anomaly_portscan.portscan.setting['@protocol'] = component.protocol.getValue();

        // extention 설정 저장 =========================================================================================================================================================

        var extentionArray = [];

        for(var i = 0; i < extentionStore.count(); i++){

            var tmpuse = (extentionStore.getAt(i).data['@use'] === true) ? 'on' : 'off';

            extentionStore.getAt(i).data['@use'] = tmpuse;

            extentionArray.push(extentionStore.getAt(i).data);

        }

        deviceAllData.network_anomaly_portscan.extention.setting = extentionArray;

        // watch ip 설정 저장 ==========================================================================================================================================================

        var watchipCount = watchipStore.count();

        if(watchipCount <= 0){

            if(deviceAllData.network_anomaly_portscan.watch){

                delete deviceAllData.network_anomaly_portscan.watch;

            }

        }
        else{

            var watchArray = [];

            for(var i = 0; i < watchipCount; i++){

                watchArray.push(watchipStore.getAt(i).data);

            }

            deviceAllData.network_anomaly_portscan.watch = watchArray;

        }

        // source ip 설정 저장 =========================================================================================================================================================

        var sourceipCount = sourceipStore.count();

        if(sourceipCount <= 0){

            if(deviceAllData.network_anomaly_portscan.scanner){

                delete deviceAllData.network_anomaly_portscan.scanner;

            }

        }
        else{

            var sourceipArray = [];

            for(var i = 0; i < sourceipCount; i++){

                sourceipArray.push(sourceipStore.getAt(i).data);

            }

            deviceAllData.network_anomaly_portscan.scanner = sourceipArray;

        }

        // destination ip 설정 저장 ====================================================================================================================================================

        var destinationCount = destinationStore.count();

        if(destinationCount <= 0){

            if(deviceAllData.network_anomaly_portscan.scanned){

                delete deviceAllData.network_anomaly_portscan.scanned;

            }

        }
        else{

            var destinationArray = [];

            for(var i = 0; i < destinationCount; i++){

                destinationArray.push(destinationStore.getAt(i).data);

            }

            deviceAllData.network_anomaly_portscan.scanned = destinationArray;

        }

        return true;
    },

    initStore: function() {
        // initStore =====================================================================================================================================================================
        //
        // 일시 : 2014.09.29
        //
        // 설명 : portscan 에서 사용한 store 데이터를 모두 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var watchipStore       = Ext.getStore('st_portscan_watchip');
        var sourceipStore      = Ext.getStore('st_portscan_sourceip');
        var destinationipStore = Ext.getStore('st_portscan_destinationip');

        watchipStore.removeAll();
        sourceipStore.removeAll();
        destinationipStore.removeAll();
    }

});