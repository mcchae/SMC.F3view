
Ext.define('SMC.view.pnl_xtm_system_manager', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_system_manager',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.Panel',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.grid.column.CheckColumn'
    ],

    height: 680,
    id: 'pnl_xtm_system_manager',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: '관리자 설정',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tabpanel',
                    itemId: 'tpn_manager_tab',
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            itemId: 'pnl_manager_managerset',
                            bodyPadding: 10,
                            title: '관리자 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'form',
                                    border: false,
                                    itemId: 'fpn_manager_input',
                                    title: '',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_manager_input1',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck2(value, 4, 16);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'txf_id',
                                                    margin: '0, 20, 0, 0',
                                                    maxWidth: 300,
                                                    width: 270,
                                                    fieldLabel: '아이디',
                                                    labelWidth: 120
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_tel',
                                                    maxWidth: 300,
                                                    width: 270,
                                                    fieldLabel: '연락처',
                                                    labelWidth: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_manager_input2',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var retValue = passwordCheck(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'txf_passwd',
                                                    margin: '0, 20, 0, 0',
                                                    maxWidth: 300,
                                                    fieldLabel: '비밀번호',
                                                    labelWidth: 120,
                                                    inputType: 'password'
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        var retValue = passwordCheck(value);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'txf_passwdcheck',
                                                    maxWidth: 300,
                                                    fieldLabel: '비밀번호 확인',
                                                    labelWidth: 120,
                                                    inputType: 'password'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_manager_input3',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_email',
                                                    margin: '0, 20, 0, 0',
                                                    maxWidth: 300,
                                                    fieldLabel: '받는 Email',
                                                    labelWidth: 120,
                                                    emptyText: '또는 관리자 Email 주소'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        var retValue = LengthCheck(value, 7, 365);

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_passwdexpiry',
                                                    maxWidth: 300,
                                                    fieldLabel: '비밀번호 유효기간',
                                                    labelWidth: 120
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_manager_input4',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'checkboxfield',
                                                    disabled: true,
                                                    itemId: 'ck_limitacc',
                                                    margin: '0, 20, 0, 0',
                                                    fieldLabel: '접근 제한',
                                                    labelWidth: 120,
                                                    boxLabel: '로그, 모니터',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'checkboxfield',
                                                    itemId: 'ck_setting',
                                                    fieldLabel: '',
                                                    boxLabel: '설정'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_manager_input5',
                                            margin: '0, 0, 10, 0',
                                            layout: 'anchor',
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        // Trusted Host Validation check 추가 20150916
                                                        if(value === ""){

                                                            return true;

                                                        }else{

                                                            var _value = value.split(/, | |,/);

                                                            if(!ValidTotalIp(_value)){
                                                                return false;
                                                            }

                                                        }

                                                        return true;
                                                    },
                                                    anchor: '60%',
                                                    itemId: 'txf_trustedhost',
                                                    fieldLabel: 'TrustedHost',
                                                    labelWidth: 120
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'ctn_network_controlclass1',
                                    itemId: 'ctn_manager_control',
                                    margin: '0, 0, 10, 0',
                                    listeners: {
                                        afterrender: {
                                            fn: me.onCtn_manager_controlAfterRender,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_manager_usergrid',
                                    title: '',
                                    store: 'st_system_managergrid',
                                    columns: [
                                        {
                                            xtype: 'rownumberer',
                                            text: 'N'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: '@id',
                                            text: '아이디',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'phone',
                                            text: '연락처',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value['#text'];
                                            },
                                            dataIndex: 'expire_date',
                                            text: '비밀번호 유효기간',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'mail',
                                            text: '받는 Email',
                                            flex: 1.5
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'host',
                                            text: 'Trusted host',
                                            flex: 2
                                        }
                                    ],
                                    listeners: {
                                        itemclick: {
                                            fn: me.onGpn_manager_usergridItemClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            itemId: 'pnl_manager_access',
                            layout: 'anchor',
                            bodyPadding: 10,
                            title: '접근 설정',
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_manager_accnum',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_accnum',
                                            width: 250,
                                            fieldLabel: '관리자 접속 허용 개수',
                                            labelWidth: 150,
                                            value: 5,
                                            editable: false,
                                            queryMode: 'local',
                                            store: [
                                                1,
                                                2,
                                                3,
                                                4,
                                                5,
                                                6
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_manager_limit',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_limit',
                                            width: 250,
                                            fieldLabel: '관리자 인증시도 한계값',
                                            labelWidth: 150,
                                            value: 5,
                                            editable: false,
                                            queryMode: 'local',
                                            store: [
                                                3,
                                                4,
                                                5
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_manager_mechanism',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_machanism',
                                            margin: '0, 20, 0, 0',
                                            width: 370,
                                            fieldLabel: 'https, ssh로 로그인 시 사용할 인증 메커니즘',
                                            labelWidth: 270,
                                            value: 1,
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'st_system_auth',
                                            valueField: 'value'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            text: '[네트워크 -> 외부서버 인증] 에서 메커니즘 추가 가능'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            itemId: 'pnl_manager_port',
                            autoScroll: true,
                            layout: 'fit',
                            bodyPadding: 10,
                            title: '관리 포트 설정',
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'gpn_manager_portgrid',
                                    title: '',
                                    store: 'st_system_manager_portset',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 250,
                                            dataIndex: 'interface',
                                            text: '인터페이스'
                                        },
                                        {
                                            xtype: 'checkcolumn',
                                            width: 150,
                                            dataIndex: 'useport',
                                            text: 'Management',
                                            listeners: {
                                                checkchange: {
                                                    fn: me.onCheckcolumnCheckChange,
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
                    fn: me.onPnl_xtm_system_managerAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_system_managerBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCtn_manager_controlAfterRender: function(component, eOpts) {
        // onCtn_manager_controlAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.07.11
        //
        // 설명 : 시스템 관리자 데이터를 추가, 설정, 삭제 기능을 정의합니다.
        //
        // 수정 :
        //
        // (2014.09.27 김민수 - 삭제시 설정 권한 관리자가 적어도 1개 이상 있도록 유효성 검사 수정)
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            var obj = {};

            obj['@cid'] = "";
            obj['@num'] = 0;

            var dateObj = function(){

                var date;
                var nowDate = new Date();

                if(componentObj.passwdex.getValue()){

                    nowDate.AddDate(componentObj.passwdex.getValue());

                    date = {};
                    date['#text'] = nowDate.AddDate(componentObj.passwdex.getValue()).GetDateString();
                    date['@day' ] = componentObj.passwdex.getValue();

                }
                else{

                    date = "";

                }

                return date;

            }();

            obj.expire_date = dateObj;
            obj.host = componentObj.trustedhost.getValue();
            obj['@id'] = componentObj.id.getValue();
            obj.mail = componentObj.email.getValue();
            obj.password = componentObj.passwd.getValue();
            obj.phone = componentObj.tel.getValue();
            obj.send_mail = "";

            var setting     = {};

            setting['@chk_config' ] = (componentObj.setting.getValue() === true) ? "on" : "off";
            setting['@chk_monitor'] = "on";
            setting['@chk_otp'] = "off";
            setting['@chk_rtm'] = "off";

            obj.setting     = setting;

            if(!me.validityCheck().managerBlankCheck() || !me.validityCheck().managerIdDuplicateCheck(componentObj.id.getValue() ,'add') ||
               !me.validityCheck().managerPasswordCheck() || !me.validityCheck().managerHostCountCheck(componentObj.trustedhost.getValue()) ||
               !me.validityCheck().managerAuthorityCount(obj) ||
               // Trusted Host Validation check 추가 20150916
               !me.validityCheck().managerHostValidationCheck() ||
               // 비밀번호 유효기간 체크 추가 20150924
               !me.validityCheck().managerPasswdExCheck()){

                return;

            }

            gridData_Add(componentObj.managerGrid, obj);

            reconfigNum(componentObj.managerGrid.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.managerGrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '관리자 수정 에러',
                    msg : '수정할 관리자 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().managerBlankCheck() || !me.validityCheck().managerIdDuplicateCheck(componentObj.id.getValue() ,'modify') ||
               !me.validityCheck().managerPasswordCheck() || !me.validityCheck().managerHostCountCheck(componentObj.trustedhost.getValue()) ||
               // Trusted Host Validation check 추가 20150916
               !me.validityCheck().managerHostValidationCheck() ||
               // 비밀번호 유효기간 체크 추가 20150924
               !me.validityCheck().managerPasswdExCheck()){

                return;

            }

            var obj = {};

            var dateObj = function(){

                var date;
                var nowDate = new Date();

                if(componentObj.passwdex.getValue()){

                    nowDate.AddDate(componentObj.passwdex.getValue());

                    date = {};
                    date['#text'] = nowDate.AddDate(componentObj.passwdex.getValue()).GetDateString();
                    date['@day' ] = componentObj.passwdex.getValue();

                }
                else{

                    date = "";

                }

                return date;

            }();

            obj.expire_date = dateObj;
            obj.host = componentObj.trustedhost.getValue();
            obj['@id'] = componentObj.id.getValue();
            obj.mail = componentObj.email.getValue();
            obj.password = componentObj.passwd.getValue();
            obj.phone = componentObj.tel.getValue();
            obj.send_mail = null;

            var setting = {};

            setting['@chk_config' ] = (componentObj.setting.getValue() === true) ? "on" : "off";
            setting['@chk_monitor'] = "on";
            setting['@chk_otp'] = "off";
            setting['@chk_rtm'] = "off";

            obj.setting = setting;

            selectionGrid_Mod(componentObj.managerGrid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.managerGrid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '관리자 삭제 에러',
                    msg : '삭제할 관리자 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().managerAuthorityLowCtn()){

                return;

            }

            selectionGrid_Del(componentObj.managerGrid);

            reconfigNum(componentObj.managerGrid.getStore());

        });
    },

    onGpn_manager_usergridItemClick: function(dataview, record, item, index, e, eOpts) {
        var component = this.componentStorage();

        component.id.setValue(record.data['@id']);
        component.tel.setValue(record.data.phone);
        component.passwd.setValue(record.data.password);
        component.passwdCheck.setValue(record.data.password);
        component.email.setValue(record.data.mail);
        component.passwdex.setValue(record.data.expire_date['@day']);
        component.setting.setValue((record.data.setting['@chk_config'] === 'on') ? true : false);
        component.trustedhost.setValue(record.data.host);
    },

    onCheckcolumnCheckChange: function(checkcolumn, rowIndex, checked, eOpts) {
        Ext.getStore('st_system_manager_portset').sync();
    },

    onPnl_xtm_system_managerAfterRender: function(component, eOpts) {
        // onPnl_xtm_system_managerAfterRender ==========================================================================================================================================
        //
        // 일시 : 2014.07.13
        //
        // 설명 : 외부서버의 데이터를 각 화면의 컴포넌트에 설정합니다.
        //
        // 파리미터 : ['system_user_admin', 'system_user_access']
        //
        // ==============================================================================================================================================================================

        var accessStore = Ext.getStore('st_system_manager_accset');
        var gridStore   = Ext.getStore('st_system_managergrid');
        var portStore   = Ext.getStore('st_system_manager_portset');
        var devStore    = Ext.getStore('st_common_deveth');

        this.initStore();

        try{

            var deviceDataArray = component.deviceParams;

            if(deviceDataArray){

                Ext.each(deviceDataArray[0].user, function(userData, idx){

                    var tmpId = userData.id;

                    userData['@id']      = tmpId;
                    userData.expire_date = (userData.expire_date === null) ? "" : userData.expire_date;
                    userData.host        = (userData.host === null) ? "" : userData.host;
                    userData.mail        = (userData.mail === null) ? "" : userData.mail;
                    userData.password    = (userData.password === null) ? "" : userData.password;
                    userData.phone       = (userData.phone === null) ? "" : userData.phone;

                    gridStore.add(userData);

                });

                for(var i = 0; i < devStore.count(); i++){

                    var obj = {};

                    obj['interface'] = devStore.getAt(i).get('eth');
                    obj.userport     = false;

                    portStore.add(obj);

                }

                var managePort;

                if(deviceDataArray[0].global.management_port){

                    if(deviceDataArray[0].global.management_port.length > 1){

                        managePort = deviceDataArray[0].global.management_port.split(',');

                        for(var i = 0; i < devStore.count(); i++){

                            for(var j = 0; j < managePort.length; j++){

                                if(devStore.getAt(i).get('eth') === managePort[j]){

                                    portStore.getAt(i).set({'useport' : true});

                                    break;

                                }

                            }

                        }

                    }
                    else if(deviceDataArray[0].global.management_port.length === 1){

                        managePort = deviceDataArray[0].global.management_port;

                        for(var i = 0; i < devStore.count(); i++){

                            for(var j = 0; j < managePort.length; j++){

                                if(devStore.getAt(i).get('eth') === managePort){

                                    portStore.getAt(i).set({'useport' : true});

                                    break;

                                }

                            }

                        }

                    }

                }

                portStore.sync();

                accessStore.add(deviceDataArray[1]);

            }

        }
        catch(err){

            console.log('시스템 관리자 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_system_managerBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj         = {};

        var managerTab  = this.down('[itemId=tpn_manager_tab]');

        var managerSet  = managerTab.down('[itemId=pnl_manager_managerset]');
        var managerAcc  = managerTab.down('[itemId=pnl_manager_access]');
        var managerPort = managerTab.down('[itemId=pnl_manager_port]');

        var fpn_input   = managerSet.down('[itemId=fpn_manager_input]');

        var id          = fpn_input.down('[itemId=txf_id]');
        var tel         = fpn_input.down('[itemId=txf_tel]');
        var passwd      = fpn_input.down('[itemId=txf_passwd]');
        var passwdCheck = fpn_input.down('[itemId=txf_passwdcheck]');
        var email       = fpn_input.down('[itemId=txf_email]');
        var passwdex    = fpn_input.down('[itemId=nfd_passwdexpiry]');
        var limitacc    = fpn_input.down('[itemId=ck_limitacc]');
        var setting     = fpn_input.down('[itemId=ck_setting]');
        var trustedhost = fpn_input.down('[itemId=txf_trustedhost]');

        var managerGrid = managerSet.down('[itemId=gpn_manager_usergrid]');

        var accnum      = managerAcc.down('[itemId=cmb_accnum]');
        var limit       = managerAcc.down('[itemId=cmb_limit]');
        var machanism   = managerAcc.down('[itemId=cmb_machanism]');

        var portGrid    = managerPort.down('[itemId=gpn_manager_portgrid]');

        obj.id          = id;
        obj.tel         = tel;
        obj.passwd      = passwd;
        obj.passwdCheck = passwdCheck;
        obj.email       = email;
        obj.passwdex    = passwdex;
        obj.limitacc    = limitacc;
        obj.setting     = setting;
        obj.trustedhost = trustedhost;
        obj.managerGrid = managerGrid;
        obj.accnum      = accnum;
        obj.limit       = limit;
        obj.machanism   = machanism;
        obj.portGrid    = portGrid;

        return obj;
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.07.11
        //
        // 설명 : 시스템 관리 정보의 유효성 검사를 수행합니다.
        //
        // - 비밀번호 체크
        // - 설정권한을 가진 계정은 최대 5개
        // - 모니터링 권한을 가진 계정은 최대 10개
        // - trusted host 는 , 기준 최대 5개
        // - 설정권한을 가진 계정은 최소 1개가 있어야 한다.
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            managerBlankCheck : function(){

                if(component.id.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '관리자 ID는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.passwd.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비밀번호는 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(component.passwdCheck.getValue() === ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비밀번호 확인은 필수항목 입니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            managerIdDuplicateCheck : function(componentValue, mode){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(componentValue, '@id', 'st_system_managergrid')){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 ID가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    var _managerName = component.managerGrid.getSelectionModel().getSelection()[0].get('@id');

                    if(!duplicationItem(componentValue, '@id', 'st_system_managergrid') && _managerName !== componentValue){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : '같은 ID가 이미 등록되었습니다.',
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            },
            managerPasswordCheck : function(){

                if(!component.passwd.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비밀번호는 최소 9자 ~ 최대 128자로 특수문자를 섞어 입력해야 합니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.passwdCheck.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비밀번호는 최소 9자 ~ 최대 128자로 특수문자를 섞어 입력해야 합니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(!component.passwdCheck.getValue().match(component.passwd.getValue())){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '입력한 비밀번호와 일치하지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            managerHostCountCheck : function(hostStr){

                if(hostStr.split(',').length > 5){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'TrustedHost 는 최대 5개까지 입력할 수 있습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            managerAuthorityCount : function(recordData){

                var gridStore = component.managerGrid.getStore();

                var setCount = 1, moniterCount = 1;

                for(var i = 0; i < gridStore.count(); i++){

                    if(gridStore.getAt(i).get('setting')['@chk_config'] === 'on'){

                        setCount ++;

                    }

                    if(gridStore.getAt(i).get('setting')['@chk_monitor'] === 'on'){

                        moniterCount++;

                    }

                }

                if(setCount > 5 && recordData.setting['@chk_config'] === 'on'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '설정 권한을 가진 계정은 최대 5개까지 등록할 수 있습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                if(moniterCount > 15 && recordData.setting['@chk_monitor'] === 'on'){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '모니터 권한을 가진 계정은 최대 10개까지 등록할 수 있습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            managerAuthorityLowCtn : function(){

                var gridStore = component.managerGrid.getStore();

                var adminCount = function(store){

                    var adminCount = 0;

                    for(var i = 0; i < store.count(); i++){

                        if(store.getAt(i).get('setting')['@chk_config'] === 'on'){

                            adminCount++;

                        }

                    }

                    return adminCount;

                }(gridStore);

                if(adminCount === 1){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '설정 권한을 가진 계정은 최소 1개가 있어야 합니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            // Trusted Host Validation check 추가 20150916
            managerHostValidationCheck : function(){

                if(!component.trustedhost.validate()){

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
            managerPasswdExCheck : function(){

                if(component.passwdex.getValue() !== null && !component.passwdex.validate()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '비밀번호 유효기간의 범위는 7 ~ 365일 입니다.',
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
        // saveData ==================================================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 관리자 리스트를 저장합니다.
        //
        // ===========================================================================================================================================================================

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var adminStore    = Ext.getStore('st_system_managergrid');
        var portStore     = Ext.getStore('st_system_manager_portset');

        var component     = this.componentStorage();

        // 관리자 계정 저장 =============================================================================================================================================================

        if(adminStore.count() === 1){

            dataObj = {};

            dataObj = adminStore.getAt(0).data;

            var tmpId = dataObj['@id'];

            dataObj.id = tmpId;

            delete dataObj['@id'];

        }
        else if(adminStore.count() > 1){

            dataObj = [];

            for(var i = 0; i < adminStore.count(); i++){

                var tmpData = adminStore.getAt(i).data;

                var tmpId = tmpData['@id'];

                tmpData.id = tmpId;

                delete tmpData['@id'];

                dataObj.push(tmpData);

            }

        }
        else{

            dataObj = null;

        }

        deviceAllData.system_user_admin.user = dataObj;

        // 접근권한 저장 ================================================================================================================================================================

        deviceAllData.system_user_access.access.certificate = component.machanism.getValue();
        deviceAllData.system_user_access.access.limit       = component.limit.getValue();
        deviceAllData.system_user_access.access.user        = component.accnum.getValue();

        // 관리포트 저장 ================================================================================================================================================================

        var tmpEth   = "";

        var portFlag = false;

        for(var i = 0; i < portStore.count(); i++){

            if(portStore.getAt(i).get('useport')){

                portFlag = true;

                tmpEth  += portStore.getAt(i).get('interface') + ',';

            }

        }

        if(portFlag){

            deviceAllData.system_user_admin.global.management_port = tmpEth.substring(0, tmpEth.length - 1);

        }
        else{

            deviceAllData.system_user_admin.global.management_port = null;

        }

        return true;
    },

    initStore: function() {
        var accessStore  = Ext.getStore('st_system_manager_accset');
        var gridStore    = Ext.getStore('st_system_managergrid');
        var portStore = Ext.getStore('st_system_manager_portset');

        accessStore.removeAll();
        portStore.removeAll();
        gridStore.removeAll();
    }

});