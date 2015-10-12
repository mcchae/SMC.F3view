
Ext.define('SMC.view.pnl_xtm_mgt_rtm', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_mgt_rtm',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.Label',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.form.field.Date'
    ],

    height: 680,
    id: 'pnl_xtm_mgt_rtm',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: 'RTM 설정',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_rtm_server',
                    title: 'RTM 정보 전송',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_basic',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_usertm',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 300,
                                    width: 300,
                                    fieldLabel: '',
                                    boxLabel: 'RTM 사용',
                                    listeners: {
                                        change: {
                                            fn: me.onCk_usertmChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    disabled: true,
                                    itemId: 'ck_userpm',
                                    maxWidth: 300,
                                    width: 300,
                                    fieldLabel: '',
                                    boxLabel: 'RPM 정보 전송'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_serverinfo1',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    disabled: true,
                                    itemId: 'txf_id',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: 'ID'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    disabled: true,
                                    itemId: 'txf_pw',
                                    maxWidth: 300,
                                    fieldLabel: '비밀번호',
                                    inputType: 'password'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_serverinfo2',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
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
                                    flex: 1,
                                    disabled: true,
                                    itemId: 'txf_serverip',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: 'RTM 서버 IP',
                                    value: '0.0.0.0'
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'lab_rtm_margin',
                                    width: 300,
                                    text: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    itemId: 'fds_rtm_basic',
                    title: '기본 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_device',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
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
                                    flex: 1,
                                    itemId: 'txf_deviceip',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: '장비 IP',
                                    value: '0.0.0.0'
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
                                    itemId: 'txf_subdeviceip',
                                    maxWidth: 300,
                                    fieldLabel: '장비 보조 IP',
                                    value: '0.0.0.0'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_linecheck',
                            margin: '0, 0, 10, 0',
                            width: 400,
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === ''){

                                            return true;

                                        }

                                        var splitIp = value.split(/,/);

                                        if(splitIp.length > 2){

                                            return 2;

                                        }

                                        if(!ValidTotalIp(splitIp)){

                                            return false;

                                        }

                                        return true;
                                    },
                                    flex: 1,
                                    itemId: 'txf_checkip',
                                    margin: '0, 50, 0, 0',
                                    maxWidth: 300,
                                    fieldLabel: '회선점검대상 IP',
                                    value: '0.0.0.0'
                                },
                                {
                                    xtype: 'label',
                                    width: 300,
                                    text: '※ 콤마 (,) 로 구분하여 최대 두 개 입력 가능'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_rtm_refresh',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            },
                            items: [
                                {
                                    xtype: 'numberfield',
                                    validator: function(value) {
                                        var retValue = LengthCheck(value, 0, 60);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'nfd_refresh',
                                    margin: '0, 50, 0, 0',
                                    width: 300,
                                    fieldLabel: '정보 갱신 주기',
                                    value: 2,
                                    maxValue: 60,
                                    minValue: 0
                                },
                                {
                                    xtype: 'label',
                                    itemId: 'lab_rtm_margin1',
                                    width: 300,
                                    text: ''
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    itemId: 'fds_rtm_eth',
                    margin: '0, 0, 10, 0',
                    title: '인터페이스 검사',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_rtm_eth',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_rtm_selecteth',
                                    margin: '10, 10, 0, 0',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_eth',
                                            fieldLabel: '인터페이스 선택',
                                            emptyText: 'Select interface ...',
                                            editable: false,
                                            displayField: 'eth',
                                            queryMode: 'local',
                                            store: 'st_common_deveth',
                                            valueField: 'eth',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_ethChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_rtm_ethlist',
                                    layout: 'fit',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            disabled: true,
                                            height: 150,
                                            itemId: 'gpn_rtm_ethlist',
                                            title: '',
                                            store: 'st_rtm_checketh',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    text: 'N'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'eth',
                                                    text: '검사할 인터페이스 목록',
                                                    flex: 0.8
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    align: 'center',
                                                    dataIndex: 'number',
                                                    flex: 0.2,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.getStore('st_rtm_checketh');

                                                                store.removeAt(rowIndex);
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
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
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    itemId: 'fds_rtm_bandwidth',
                    title: '회선 대역폭 측정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_rtm_bandwidth',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_rtm_selecteth',
                                    margin: '10, 10, 0, 0',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_eth',
                                            fieldLabel: '인터페이스 선택',
                                            emptyText: 'Select interface ...',
                                            editable: false,
                                            displayField: 'eth',
                                            queryMode: 'local',
                                            store: 'st_common_deveth',
                                            valueField: 'eth',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_ethChange1,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_rtm_ethlist',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            disabled: true,
                                            height: 150,
                                            itemId: 'gpn_rtm_ethlist',
                                            title: '',
                                            store: 'st_rtm_checkbandwidth',
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    text: 'N'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'eth',
                                                    text: '측정 인터페이스 목록',
                                                    flex: 0.8
                                                },
                                                {
                                                    xtype: 'actioncolumn',
                                                    align: 'center',
                                                    dataIndex: 'number',
                                                    flex: 0.2,
                                                    items: [
                                                        {
                                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                var store = Ext.getStore('st_rtm_checkbandwidth');

                                                                store.removeAt(rowIndex);
                                                            },
                                                            iconCls: 'ico_grid_row_delete'
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
                },
                {
                    xtype: 'fieldset',
                    disabled: true,
                    itemId: 'fds_rtm_checkexcept',
                    title: '점검제외 설정',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_exceptstr',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretchmax'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    itemId: 'txf_exceptstr',
                                    margin: '0, 50, 0, 0',
                                    fieldLabel: '점검 제외시 알람 문구',
                                    labelWidth: 150
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_exceptdate',
                            margin: '0, 0, 10, 0',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_exceptdate',
                                    fieldLabel: '',
                                    boxLabel: '점검제외 기간 설정'
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_rtm_date',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'datefield',
                                            disabled: true,
                                            itemId: 'dtf_startdate',
                                            margin: '0, 50, 0, 0',
                                            fieldLabel: '시작 날짜',
                                            format: 'Y/m/d'
                                        },
                                        {
                                            xtype: 'datefield',
                                            disabled: true,
                                            itemId: 'dtf_enddate',
                                            fieldLabel: '종료 날짜',
                                            format: 'Y/m/d'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            itemId: 'ctn_rtm_excepttime',
                            margin: '0, 0, 10, 0',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_excepttime',
                                    fieldLabel: '',
                                    boxLabel: '점검제외 시간 설정',
                                    listeners: {
                                        change: {
                                            fn: me.onCk_excepttimeChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_rtm_time',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            disabled: true,
                                            itemId: 'cmb_starttime',
                                            margin: '0, 50, 0, 0',
                                            fieldLabel: '시작 시간',
                                            value: '00:00',
                                            editable: false,
                                            displayField: 'time',
                                            queryMode: 'local',
                                            store: 'st_rtm_starttime',
                                            valueField: 'time'
                                        },
                                        {
                                            xtype: 'combobox',
                                            disabled: true,
                                            itemId: 'cmb_endtime',
                                            fieldLabel: '종료 시간',
                                            value: '23:59',
                                            editable: false,
                                            displayField: 'time',
                                            queryMode: 'local',
                                            store: 'st_rtm_endtime',
                                            valueField: 'time',
                                            listeners: {
                                                change: {
                                                    fn: me.onCmb_endtimeChange,
                                                    scope: me
                                                }
                                            }
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
                    fn: me.onPnl_xtm_mgt_rtmAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_mgt_rtmBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCk_usertmChange: function(field, newValue, oldValue, eOpts) {
        // onCk_usertmChange ============================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : RTM 사용 여부에 대한 이벤트를 설정합니다.
        //
        // 수정 :
        //
        // - (2015.01.21 김민수 : 체크박스 해제시 컴포넌트 값이 초기화되는 부분 제거)
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        if(newValue){

        // 컴포넌트 활성화 ================================================================================================================================================================

            component.rtmid.setDisabled(false);
            component.rtmpw.setDisabled(false);
            component.rtmip.setDisabled(false);
            component.userpm.setDisabled(false);

            component.fds_basic.setDisabled(false);

            component.fds_eth.setDisabled(false);
            component.checkethlist.setDisabled(false);
            component.fds_bandwidth.setDisabled(false);
            component.checkbandethlist.setDisabled(false);
            component.fds_except.setDisabled(false);

        }
        else{

        // 컴포넌트 데이터 초기화 ==========================================================================================================================================================

        // 2015.01.21 김민수 - 컴포넌트 값 초기화 부분 삭제

        //     component.userpm.setValue(false);
        //     component.deviceip.setValue('0.0.0.0');
        //     component.subdeviceip.setValue('0.0.0.0');

        //     component.rtmid.setValue('');
        //     component.rtmpw.setValue('');
        //     component.rtmip.setValue('');
        //     component.rtmperiod.setValue(2);

        //     component.checkethlist.getStore().removeAll();

        //     component.checkbandethlist.getStore().removeAll();

        //     component.exceptstr.setValue('');
        //     component.useexceptdate.setValue(false);
        //     component.exceptstartdate.setValue(new Date());
        //     component.exceptenddate.setValue(new Date());
        //     component.useexcepttime.setValue(false);
        //     component.exceptstarttime.setValue('00:00');
        //     component.exceptendtime.setValue('23:59');

        // 컴포넌트 비활성화 ==============================================================================================================================================================

            component.userpm.setDisabled(true);
            component.rtmid.setDisabled(true);
            component.rtmpw.setDisabled(true);
            component.rtmip.setDisabled(true);

            component.fds_basic.setDisabled(true);

            component.fds_eth.setDisabled(true);
            component.checkethlist.setDisabled(true);
            component.fds_bandwidth.setDisabled(true);
            component.checkbandethlist.setDisabled(true);
            component.fds_except.setDisabled(true);

        }
    },

    onCmb_ethChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_ethChange ===============================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : 점검할 인터페이스를 선택합니다. 선택시 그리드 스토어에 추가됩니다.
        //
        // ===============================================================================================================================================================================

        var checkethStore = Ext.getStore('st_rtm_checketh');

        if(!this.validityCheck().ethDuplicationCheck(newValue)){

            return;
        }

        checkethStore.add({ 'eth' : newValue });
    },

    onCmb_ethChange1: function(field, newValue, oldValue, eOpts) {
        // onCmb_ethChange1 ==============================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : 점검할 인터페이스를 선택합니다. 선택시 그리드 스토어에 추가됩니다.
        //
        // ===============================================================================================================================================================================

        var checkBandwidthStore = Ext.getStore('st_rtm_checkbandwidth');

        if(!this.validityCheck().bandwidthDuplicationCheck(newValue)){

            return;
        }

        checkBandwidthStore.add({ 'eth' : newValue });
    },

    onCk_excepttimeChange: function(field, newValue, oldValue, eOpts) {

    },

    onCmb_endtimeChange: function(field, newValue, oldValue, eOpts) {

    },

    onPnl_xtm_mgt_rtmAfterRender: function(component, eOpts) {
        // onPnl_xtm_mgt_rtmAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : RTM 설정 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var exceptStartStore = Ext.getStore('st_rtm_starttime');
        var exceptEndStore   = Ext.getStore('st_rtm_endtime');

        var ethCheckStore       = Ext.getStore('st_rtm_checketh');
        var bandwidthCheckStore = Ext.getStore('st_rtm_checkbandwidth');

        var componentObj = this.componentStorage();

        // 컴포넌트 이벤트 설정 ============================================================================================================================================================

        componentObj.useexceptdate.on('change', function(component, newValue, oldValue, eOpts ){

            if(newValue){

                componentObj.exceptstartdate.setDisabled(false);
                componentObj.exceptenddate.setDisabled(false);

            }
            else{

                componentObj.exceptstartdate.setDisabled(true);
                componentObj.exceptenddate.setDisabled(true);

            }

        });

        componentObj.useexcepttime.on('change', function(component, newValue, oldValue, eOpts ){

            if(newValue){

                componentObj.exceptstarttime.setDisabled(false);
                componentObj.exceptendtime.setDisabled(false);

            }
            else{

                componentObj.exceptstarttime.setDisabled(true);
                componentObj.exceptendtime.setDisabled(true);

            }

        });

        // 스토어 초기화 ==================================================================================================================================================================

        this.initStore();

        // 점검 제외 컴포넌트 데이터 초기화 ==================================================================================================================================================

        componentObj.exceptstartdate.setValue(new Date());
        componentObj.exceptenddate.setValue(new Date());

        for(var i = 0; i <= 23; i++){

            exceptStartStore.add({	'time' : (i < 10) ? '0' + i + ':' + '00' : i + ':' + '00'	});

            if(i !== 23){

                exceptStartStore.add({	'time' : (i < 10) ? '0' + i + ':' + '30' : i + ':' + '30'	});

            }
            else{

                exceptStartStore.add({	'time' : '23:59'	});

            }

        }

        for(var i = 23; i >= 0; i--){

            if(i !== 23){

                exceptEndStore.add({	'time' : (i < 10) ? '0' + i + ':' + '30' : i + ':' + '30'	});

            }
            else{

                exceptEndStore.add({	'time' : '23:59'	});

            }

            if(i !== 0){

                exceptEndStore.add({	'time' : (i < 10) ? '0' + i + ':' + '00' : i + ':' + '00'	});

            }

        }

        // 컴포넌트 데이터 초기화 ==========================================================================================================================================================

        try{

            var rtmData = component.deviceParams.setting.rtm;

        // 기본 설정 =====================================================================================================================================================================

            componentObj.rtmperiod.setValue(rtmData.setting.updatetime);
            componentObj.deviceip.setValue(rtmData.setting.ip1);
            componentObj.subdeviceip.setValue(rtmData.setting.ip2);
            componentObj.linecheckip.setValue(rtmData.setting.linecheckip);

        // RTM 서버 설정  ================================================================================================================================================================

            componentObj.usertm.setValue((rtmData['@chk_use'] === 'on') ? true : false);
            componentObj.userpm.setValue((rtmData['@chk_rpm'] === 'on') ? true : false);
            componentObj.rtmid.setValue(rtmData.id);
            componentObj.rtmpw.setValue(rtmData.password);
            componentObj.rtmip.setValue(rtmData.server);

        // 인터페이스 검사 ================================================================================================================================================================

            if(rtmData.setting['interface']){

                for(var i = 0; i < rtmData.setting['interface'].length; i++){

                    ethCheckStore.add({	'eth' : rtmData.setting['interface'][i]	});

                }

            }

        // 회선 대역폭 측정 ===============================================================================================================================================================

            if(rtmData.setting.bandwidth){

                for(var i = 0; i < rtmData.setting.bandwidth.length; i++){

                    bandwidthCheckStore.add({	'eth' : rtmData.setting.bandwidth[i]	});

                }

            }

        // 점검제외 설정 ==================================================================================================================================================================

            componentObj.exceptstr.setValue(rtmData.setting.exceptmsg);
            componentObj.useexceptdate.setValue((rtmData.setting.exceptdate['@chk_use'] === 'on') ? true : false);

            if(rtmData.setting.exceptdate.start){

                var startArray = rtmData.setting.exceptdate.start.split('/');

                componentObj.exceptstartdate.setValue(new Date(Number(startArray[0]), Number(startArray[1]), Number(startArray[2])));

            }
            else{

                componentObj.exceptstartdate.setValue(new Date());

            }

            if(rtmData.setting.excepttime.end){

                var endArray = rtmData.setting.exceptdate.end.split('/');

                componentObj.exceptenddate.setValue(new Date(Number(endArray[0]), Number(endArray[1]), Number(endArray[2])));

            }
            else{

                componentObj.exceptenddate.setValue(new Date());

            }

            componentObj.useexcepttime.setValue((rtmData.setting.excepttime['@chk_use'] === 'on') ? true : false);
            componentObj.exceptstarttime.setValue(rtmData.setting.excepttime.start);
            componentObj.exceptendtime.setValue(rtmData.setting.excepttime.end);

        }
        catch(err){

            console.log('RTM 설정 데이터를 초기화 중 예외 발생 -> ', err);

        }


    },

    onPnl_xtm_mgt_rtmBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_mgt_rtmBeforeClose ==================================================================================================================================================
        //
        // 일시 : 2014.09.18
        //
        // 설명 : rtm 설정 화면이 종료될 때 데이터를 임시 저장하고 view 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        // 필드셋 변수 ====================================================================================================================================================================

        var fds_basic  = this.down('[itemId=fds_rtm_basic]');
        var fds_server = this.down('[itemId=fds_rtm_server]');
        var fds_eth    = this.down('[itemId=fds_rtm_eth]');
        var fds_bandwidth = this.down('[itemId=fds_rtm_bandwidth]');
        var fds_except = this.down('[itemId=fds_rtm_checkexcept]');

        obj.fds_basic  = fds_basic;
        obj.fds_server = fds_server;
        obj.fds_eth = fds_eth;
        obj.fds_bandwidth = fds_bandwidth;
        obj.fds_except = fds_except;

        // 기본 정보 컴포넌트 ==============================================================================================================================================================

        obj.deviceip = fds_basic.down('[itemId=ctn_rtm_device]').down('[itemId=txf_deviceip]');
        obj.subdeviceip = fds_basic.down('[itemId=ctn_rtm_device]').down('[itemId=txf_subdeviceip]');
        obj.linecheckip = fds_basic.down('[itemId=ctn_rtm_linecheck]').down('[itemId=txf_checkip]');
        obj.rtmperiod = fds_basic.down('[itemId=ctn_rtm_refresh]').down('[itemId=nfd_refresh]');

        // 서버 정보 컴포넌트 ==============================================================================================================================================================

        obj.rtmid = fds_server.down('[itemId=ctn_rtm_serverinfo1]').down('[itemId=txf_id]');
        obj.rtmpw = fds_server.down('[itemId=ctn_rtm_serverinfo1]').down('[itemId=txf_pw]');
        obj.rtmip = fds_server.down('[itemId=ctn_rtm_serverinfo2]').down('[itemId=txf_serverip]');
        obj.usertm = fds_server.down('[itemId=ctn_rtm_basic]').down('[itemId=ck_usertm]');
        obj.userpm = fds_server.down('[itemId=ctn_rtm_basic]').down('[itemId=ck_userpm]');

        // 인터페이스 검사 컴포넌트 =========================================================================================================================================================

        obj.checketh = fds_eth.down('[itemId=ctn_rtm_eth]').down('[itemId=ctn_rtm_selecteth]').down('[itemId=cmb_eth]');
        obj.checkethlist = fds_eth.down('[itemId=ctn_rtm_ethlist]').down('[itemId=gpn_rtm_ethlist]');

        // 대역폭 검사 컴포넌트 ============================================================================================================================================================

        obj.checkbandeth = fds_bandwidth.down('[itemId=ctn_rtm_bandwidth]').down('[itemId=ctn_rtm_selecteth]').down('[itemId=cmb_eth]');
        obj.checkbandethlist = fds_bandwidth.down('[itemId=ctn_rtm_bandwidth]').down('[itemId=ctn_rtm_ethlist]').down('[itemId=gpn_rtm_ethlist]');

        // 점검 제외 설정 컴포넌트 ==========================================================================================================================================================

        obj.exceptstr = fds_except.down('[itemId=ctn_rtm_exceptstr]').down('[itemId=txf_exceptstr]');
        obj.useexceptdate = fds_except.down('[itemId=ctn_rtm_exceptdate]').down('[itemId=ck_exceptdate]');
        obj.exceptstartdate = fds_except.down('[itemId=ctn_rtm_exceptdate]').down('[itemId=ctn_rtm_date]').down('[itemId=dtf_startdate]');
        obj.exceptenddate = fds_except.down('[itemId=ctn_rtm_exceptdate]').down('[itemId=ctn_rtm_date]').down('[itemId=dtf_enddate]');
        obj.useexcepttime = fds_except.down('[itemId=ctn_rtm_excepttime]').down('[itemId=ck_excepttime]');
        obj.exceptstarttime = fds_except.down('[itemId=ctn_rtm_excepttime]').down('[itemId=ctn_rtm_time]').down('[itemId=cmb_starttime]');
        obj.exceptendtime = fds_except.down('[itemId=ctn_rtm_excepttime]').down('[itemId=ctn_rtm_time]').down('[itemId=cmb_endtime]');

        return obj;
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : RTM 설정 유효성 검사를 수행합니다.
        //
        // =============================================================================================================================================================================

        var component    = this.componentStorage();

        var validCheckObj = {

            blankCheck : function(){

                if(component.usertm.getValue() && component.deviceip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '장비 IP는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && component.rtmid.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '서버 ID는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && component.rtmpw.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '서버 패스워드는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && component.rtmperiod.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '정보 갱신 주기는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && component.checkethlist.getStore().count() <= 0){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '하나 이상의 인터페이스를 등록하십시오.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            validateCheck : function(){

                if(component.usertm.getValue() && !component.deviceip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && !component.subdeviceip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && component.subdeviceip.validate() === 2){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '회선점검대상 IP는 최대 2개까지 입력 가능합니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && !component.linecheckip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.usertm.getValue() && !component.rtmip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            ethDuplicationCheck : function(componentValue){

                if(!duplicationItem(componentValue, 'eth', 'st_rtm_checketh')){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '같은 인터페이스가 이미 등록되었습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            bandwidthDuplicationCheck : function(componentValue){

                if(!duplicationItem(componentValue, 'eth', 'st_rtm_checkbandwidth')){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '같은 인터페이스가 이미 등록되었습니다.',
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
        // 일시 : 2014.09.18
        //
        // 설명 : RTM 데이터를 임시 저장합니다.
        //
        // =============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var ethCheckStore       = Ext.getStore('st_rtm_checketh');
        var bandwidthCheckStore = Ext.getStore('st_rtm_checkbandwidth');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(componentObj.usertm.getValue()){

            if(!this.validityCheck().blankCheck() || !this.validityCheck().validateCheck()){

                return false;

            }

            if(!deviceAllData.log_setting.setting.rtm.setting){

                deviceAllData.log_setting.setting.rtm.setting = {};

            }

        // 기본 설정 ====================================================================================================================================================================

            deviceAllData.log_setting.setting.rtm.setting.ip1 = componentObj.deviceip.getValue();
            deviceAllData.log_setting.setting.rtm.setting.ip2 = componentObj.subdeviceip.getValue();
            deviceAllData.log_setting.setting.rtm.setting.linecheckip = componentObj.linecheckip.getValue();
            deviceAllData.log_setting.setting.rtm.setting.updatetime = componentObj.rtmperiod.getValue();

        // RTM 서버 정보 ================================================================================================================================================================

            deviceAllData.log_setting.setting.rtm['@chk_use'] = (componentObj.usertm.getValue() === true) ? 'on' : 'off';
            deviceAllData.log_setting.setting.rtm['@chk_rpm'] = (componentObj.userpm.getValue() === true) ? 'on' : 'off';
            deviceAllData.log_setting.setting.rtm.id = componentObj.rtmid.getValue();
            deviceAllData.log_setting.setting.rtm.password = componentObj.rtmpw.getValue();
            deviceAllData.log_setting.setting.rtm.server = componentObj.rtmip.getValue();

        // 인터페이스 데이터 저장 =========================================================================================================================================================

            var ethArray = [];

            for(var i =0; i < ethCheckStore.count(); i++){

                ethArray.push(ethCheckStore.getAt(i).get('eth'));

            }

            deviceAllData.log_setting.setting.rtm.setting['interface'] = ethArray;

        // 회선 대역폭 데이터 저장 ========================================================================================================================================================

            var bandwidthArray = [];

            for(var i =0; i < bandwidthCheckStore.count(); i++){

                bandwidthArray.push(bandwidthCheckStore.getAt(i).get('eth'));

            }

            deviceAllData.log_setting.setting.rtm.setting.bandwidth = bandwidthArray;

        // 점검제외 설정 =================================================================================================================================================================

            deviceAllData.log_setting.setting.rtm.setting.exceptmsg = componentObj.exceptstr.getValue();

            var exceptdateObj = {};

            exceptdateObj['@chk_use'] = (componentObj.useexceptdate.getValue()) ? 'on' : 'off';

            var exceptStartDate = componentObj.exceptstartdate.getValue();
            var exceptEndDate   = componentObj.exceptenddate.getValue();

            exceptdateObj.start = exceptStartDate.getFullYear() + '/' + ((exceptStartDate.getMonth() < 10) ? '0' + exceptStartDate.getMonth() : exceptStartDate.getMonth()) + '/' + exceptStartDate.getDate();
            exceptdateObj.end   = exceptEndDate.getFullYear() + '/' + ((exceptEndDate.getMonth() < 10) ? '0' + exceptEndDate.getMonth() : exceptEndDate.getMonth()) + '/' + exceptEndDate.getDate();

            deviceAllData.log_setting.setting.rtm.setting.exceptdate = exceptdateObj;

            var excepttimeObj = {};

            excepttimeObj['@chk_use'] = (componentObj.useexcepttime.getValue()) ? 'on' : 'off';
            excepttimeObj.start = componentObj.exceptstarttime.getValue();
            excepttimeObj.end = componentObj.exceptendtime.getValue();

            deviceAllData.log_setting.setting.rtm.setting.excepttime = excepttimeObj;

        }
        else{

        // RTM 사용이 off 되면 모든 데이터가 기본값으로 초기화 ================================================================================================================================

            deviceAllData.log_setting.setting.rtm['@chk_use'] = 'off';
            deviceAllData.log_setting.setting.rtm['@chk_rpm'] = 'off';
            deviceAllData.log_setting.setting.rtm.id = '';
            deviceAllData.log_setting.setting.rtm.password = '';
            deviceAllData.log_setting.setting.rtm.server = '0.0.0.0';

            deviceAllData.log_setting.setting.rtm.setting.bandwidth = [];
            deviceAllData.log_setting.setting.rtm.setting.exceptdate['@chk_use'] = 'off';
            deviceAllData.log_setting.setting.rtm.setting.exceptdate.start = '';
            deviceAllData.log_setting.setting.rtm.setting.exceptdate.end = '';

            deviceAllData.log_setting.setting.rtm.setting.exceptmsg = '';

            deviceAllData.log_setting.setting.rtm.setting.excepttime['@chk_use'] = 'off';
            deviceAllData.log_setting.setting.rtm.setting.excepttime.start = '';
            deviceAllData.log_setting.setting.rtm.setting.excepttime.end = '';

            deviceAllData.log_setting.setting.rtm.setting['interface'] = [];

            deviceAllData.log_setting.setting.rtm.setting.ip1 = '0.0.0.0';
            deviceAllData.log_setting.setting.rtm.setting.ip2 = '0.0.0.0';
            deviceAllData.log_setting.setting.rtm.setting.updatetime = 2;

        }

        return true;
    },

    initStore: function() {
        // initStore =====================================================================================================================================================================
        //
        // 일시 : 2014.09.19
        //
        // 설명 : 화면이 렌더링 된 후 사용하는 스토어 데이터를 모두 삭제합니다.
        //
        // ===============================================================================================================================================================================

        var exceptStartStore = Ext.getStore('st_rtm_starttime');
        var exceptEndStore   = Ext.getStore('st_rtm_endtime');

        var ethCheckStore       = Ext.getStore('st_rtm_checketh');
        var bandwidthCheckStore = Ext.getStore('st_rtm_checkbandwidth');

        ethCheckStore.removeAll();
        bandwidthCheckStore.removeAll();
    }

});