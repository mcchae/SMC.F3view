
Ext.define('SMC4ZEN.view.pnl_xtm_alg_telnet', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_alg_telnetViewModel',
        'SMC4ZEN.view.ctn_alg_control',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    viewModel: {
        type: 'pnl_xtm_alg_telnet'
    },
    height: 680,
    id: 'pnl_xtm_alg_telnet',
    itemId: '',
    width: 800,
    bodyPadding: 10,
    title: 'Telnet',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        afterrender: 'onPnl_xtm_alg_telnetAfterRender',
        beforeclose: 'onPnl_xtm_alg_telnetBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'fieldset',
                        itemId: 'fds_telnet_set',
                        title: 'Telnet',
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
                                itemId: 'txf_publicip',
                                margin: '0, 0, 10, 0',
                                maxWidth: 400,
                                fieldLabel: 'Public Telnet Server IP',
                                labelWidth: 200
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
                                itemId: 'txf_realip',
                                margin: '0, 0, 10, 0',
                                maxWidth: 400,
                                fieldLabel: 'Real Telnet Server IP',
                                labelWidth: 200
                            },
                            {
                                xtype: 'numberfield',
                                validator: function(value) {
                                    var retValue = LengthCheck(value, 1, 65535);

                                    if(!retValue){

                                        return false;

                                    }

                                    return true;
                                },
                                itemId: 'nfd_port',
                                margin: '0, 0, 10, 0',
                                maxWidth: 400,
                                fieldLabel: '포트 번호',
                                labelWidth: 200,
                                value: 23
                            },
                            {
                                xtype: 'numberfield',
                                validator: function(value) {
                                    var retValue = LengthCheck(value, 60, 86400);

                                    if(!retValue){

                                        return false;

                                    }

                                    return true;
                                },
                                itemId: 'nfd_timeout',
                                margin: '0, 0, 10, 0',
                                maxWidth: 400,
                                fieldLabel: '시간 초과',
                                labelWidth: 200,
                                value: 600
                            },
                            {
                                xtype: 'numberfield',
                                validator: function(value) {
                                    var retValue = LengthCheck(value, 1, 100);

                                    if(!retValue){

                                        return false;

                                    }

                                    return true;
                                },
                                itemId: 'nfd_limit',
                                margin: '0, 0, 10, 0',
                                maxWidth: 400,
                                fieldLabel: '최대 접속 수',
                                labelWidth: 200,
                                value: 10
                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'rdg_upload',
                                margin: '0, 0, 10, 0',
                                width: 400,
                                fieldLabel: '업로드',
                                labelWidth: 200,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_accept',
                                        margin: '0, 100, 0, 0',
                                        name: 'upload',
                                        boxLabel: 'Accept',
                                        checked: true,
                                        inputValue: 'accept'
                                    },
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_deny',
                                        name: 'upload',
                                        boxLabel: 'Deny',
                                        inputValue: 'deny'
                                    }
                                ]
                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'rdg_download',
                                margin: '0, 0, 10, 0',
                                width: 400,
                                fieldLabel: '다운로드',
                                labelWidth: 200,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_accept',
                                        margin: '0, 100, 0, 0',
                                        name: 'download',
                                        boxLabel: 'Accept',
                                        checked: true,
                                        inputValue: 'accept'
                                    },
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_deny',
                                        name: 'download',
                                        boxLabel: 'Deny',
                                        inputValue: 'deny'
                                    }
                                ]
                            },
                            {
                                xtype: 'radiogroup',
                                itemId: 'rdg_acttype',
                                margin: '0, 0, 10, 0',
                                width: 400,
                                fieldLabel: '동작방식',
                                labelWidth: 200,
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_normal',
                                        margin: '0, 50, 0, 0',
                                        name: 'act',
                                        boxLabel: '일반게이트 방식',
                                        checked: true,
                                        inputValue: '0'
                                    },
                                    {
                                        xtype: 'radiofield',
                                        itemId: 'rd_clear',
                                        name: 'act',
                                        boxLabel: '투명게이트 방식',
                                        inputValue: '1'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'ctn_alg_control',
                        itemId: 'ctn_telnet_control',
                        margin: '0, 0, 10, 0',
                        listeners: {
                            afterrender: 'onCtn_algtelnet_controlAfterRender'
                        }
                    },
                    {
                        xtype: 'gridpanel',
                        flex: 1,
                        itemId: 'gpn_telnet_set',
                        title: '',
                        columns: [
                            {
                                xtype: 'rownumberer',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 200,
                                dataIndex: 'public_ip',
                                text: 'Public Telnet Server IP'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 150,
                                dataIndex: 'ip',
                                text: 'Telnet Server IP'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 100,
                                dataIndex: 'port',
                                text: '포트 번호'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 100,
                                dataIndex: 'limit',
                                text: '시간 초과'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 120,
                                dataIndex: 'user',
                                text: '최대 접속 수'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 100,
                                dataIndex: 'upload',
                                text: '업로드'
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 100,
                                dataIndex: 'download',
                                text: '다운로드'
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    return (value === 0) ? '일반게이트 방식' : '투명게이트 방식';
                                },
                                width: 120,
                                dataIndex: 'action',
                                text: '동작방식'
                            }
                        ],
                        listeners: {
                            itemclick: 'onGpn_telnet_setItemClick'
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

    onCtn_algtelnet_controlAfterRender: function(component, eOpts) {
        // onCtn_algtelnet_controlAfterRender ===========================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : Telnet 데이터를 추가, 수정, 삭제 기능을 수행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().telnetBlankCheck() || !me.validityCheck().telnetValidateCheck() || !me.validityCheck().telnetDuplicationCheck(componentObj.publicip.getValue(), 'public_ip', 'add') ||
               !me.validityCheck().telnetDuplicationCheck(componentObj.realip.getValue(), 'ip', 'add')){

                return;

            }

            var obj = {};

            obj['@num']  = 0;
            obj.action   = componentObj.acttype.getValue().act;
            obj.download = componentObj.download.getValue().download;
            obj.ip       = componentObj.realip.getValue();
            obj.limit    = componentObj.timeout.getValue();
            obj.port     = componentObj.port.getValue();
            obj.public_ip = componentObj.publicip.getValue();
            obj.upload   = componentObj.upload.getValue().upload;
            obj.user     = componentObj.limit.getValue();

            gridData_Add(componentObj.telnet_grid, obj);

            reconfigNum(componentObj.telnet_grid.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.telnet_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : 'Telnet 데이터 수정 에러',
                    msg : '수정할 Telnet 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().telnetBlankCheck() || !me.validityCheck().telnetValidateCheck() || !me.validityCheck().telnetDuplicationCheck(componentObj.publicip.getValue(), 'public_ip', 'mod') ||
               !me.validityCheck().telnetDuplicationCheck(componentObj.realip.getValue(), 'ip', 'mod')){

                return;

            }

            var obj = {};

            obj.action   = componentObj.acttype.getValue().act;
            obj.download = componentObj.download.getValue().download;
            obj.ip       = componentObj.realip.getValue();
            obj.limit    = componentObj.timeout.getValue();
            obj.port     = componentObj.port.getValue();
            obj.public_ip = componentObj.publicip.getValue();
            obj.upload   = componentObj.upload.getValue().upload;
            obj.user     = componentObj.limit.getValue();

            selectionGrid_Mod(componentObj.telnet_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.telnet_grid.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'Telnet 데이터 삭제 에러',
                    msg : '삭제할 Telnet 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.telnet_grid);

            reconfigNum(componentObj.telnet_grid.getStore());

        });
    },

    onGpn_telnet_setItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_telnet_setItemClick =====================================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : 그리드 클릭시 Row에 지정된 데이터가 컴포넌트에 초기화 됩니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.publicip.setValue(record.data.public_ip);
        component.realip.setValue(record.data.ip);
        component.port.setValue(record.data.port);
        component.timeout.setValue(record.data.limit);
        component.limit.setValue(record.data.user);
        component.upload.setValue(	{	'upload'	: record.data.upload		});
        component.download.setValue({	'download'	: record.data.download		});
        component.acttype.setValue(	{	'act'		: record.data.action		});
    },

    onPnl_xtm_alg_telnetAfterRender: function(component, eOpts) {
        // onPnl_xtm_alg_telnetAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : Telnet 데이터를 그리드에 출력합니다.
        //
        // ===============================================================================================================================================================================

        this.initStore();

        try{

            if(component.deviceParams){

                var deviceData = component.deviceParams.telnet;

                if(deviceData){

                    Ext.getStore('st_alg_telnet').add(deviceData);

                }

            }

        }
        catch(err){

            console.log('ALG TELNET 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_alg_telnetBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_alg_telnetBeforeClose ===============================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : Telnet 화면이 종료될 때 데이터를 저장하고 화면 상태를 변경합니다.
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

        var fds_telnet = this.down('[itemId=fds_telnet_set]');

        obj.publicip = fds_telnet.down('[itemId=txf_publicip]');
        obj.realip   = fds_telnet.down('[itemId=txf_realip]');
        obj.port     = fds_telnet.down('[itemId=nfd_port]');
        obj.timeout  = fds_telnet.down('[itemId=nfd_timeout]');
        obj.limit    = fds_telnet.down('[itemId=nfd_limit]');
        obj.upload   = fds_telnet.down('[itemId=rdg_upload]');
        obj.download = fds_telnet.down('[itemId=rdg_download]');
        obj.acttype  = fds_telnet.down('[itemId=rdg_acttype]');

        obj.telnet_grid = this.down('[itemId=gpn_telnet_set]');

        return obj;
    },

    validityCheck: function() {
        // validateCheck ================================================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : Telnet 데이터 추가, 수정시 유효성 검사를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            telnetBlankCheck : function(){

                if(component.publicip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Public Telnet 서버 IP는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.realip.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Real Telnet 서버 IP는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.port.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '포트 번호는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.timeout.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '시간 초과는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.limit.getValue() === null){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '최대 접속 수는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            telnetDuplicationCheck : function(componentValue, duplicateField, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, duplicateField, 'st_alg_telnet')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg :   (duplicateField === 'public_ip') ? '같은 Public Telnet 서버 IP가 등록되어있습니다.' : '같은 Real Telnet 서버 IP가 등록되어있습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _telnetName = component.telnet_grid.getSelectionModel().getSelection()[0].get(duplicateField);

                    if(!duplicationItem(componentValue, duplicateField, 'st_alg_telnet') && _telnetName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : (duplicateField === 'public_ip') ? '같은 Public Telnet 서버 IP가 등록되어있습니다.' : '같은 Real Telnet 서버 IP가 등록되어있습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            },

            telnetValidateCheck : function(){

                if(!component.publicip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.realip.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.port.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '포트의 범위는 1 ~ 65535 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.timeout.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '시간 초과의 범위는 60 ~ 86400 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.limit.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '최대 접속 수의 범위는 1 ~ 100 입니다.',
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
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.08.19
        //
        // 설명 : Telnet 데이터를 저장합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var telnetStore = Ext.getStore('st_alg_telnet');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(telnetStore.count() > 0){

            if(!deviceAllData.alg_telnet_proxy){

                deviceAllData.alg_telnet_proxy = {};

            }

            var telnetData = [];

            for(var i = 0; i < telnetStore.count(); i++){

                telnetData.push(telnetStore.getAt(i).data);

            }

            deviceAllData.alg_telnet_proxy.telnet = telnetData;

        }
        else{

            if(deviceAllData.alg_telnet_proxy){

                deviceAllData.alg_telnet_proxy = null;

            }

        }

        return true;
    },

    initStore: function() {
        var st_algtelnet = Ext.getStore('st_alg_telnet');

        st_algtelnet.removeAll();

        this.down('[itemId=gpn_telnet_set]').bindStore(st_algtelnet);
    }

});