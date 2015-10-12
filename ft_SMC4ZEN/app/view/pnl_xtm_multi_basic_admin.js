
Ext.define('SMC4ZEN.view.pnl_xtm_multi_basic_admin', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_multi_basic_adminViewModel',
        'SMC4ZEN.view.ctn_multi_control',
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'pnl_xtm_multi_basic_admin'
    },
    height: 680,
    id: 'pnl_xtm_multi_basic_admin',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: '관리자 설정',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_multimanager_main',
            checkboxToggle: true,
            title: '사용자 설정',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_multimanager_top',
                    margin: '10, 0, 10, 0',
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
                            margin: '0, 50, 0, 0',
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
                    itemId: 'ctn_multimanager_mid1',
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
                            margin: '0, 50, 0, 0',
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
                    itemId: 'ctn_multimanager_mid2',
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
                            margin: '0, 50, 0, 0',
                            maxWidth: 300,
                            fieldLabel: '받는 Email',
                            labelWidth: 120,
                            emptyText: '또는 관리자 Email 주소'
                        },
                        {
                            xtype: 'numberfield',
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
                    itemId: 'ctn_multimanager_mid3',
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
                            margin: '0, 50, 0, 0',
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
                    itemId: 'ctn_multimanager_bot',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_trustedhost',
                            width: 468,
                            fieldLabel: 'TrustedHost',
                            labelWidth: 120
                        }
                    ]
                },
                {
                    xtype: 'ctn_multi_control',
                    itemId: 'ctn_multimanager_control',
                    margin: '0, 0, 10, 0',
                    listeners: {
                        afterrender: 'onCtn_multimanager_controlAfterRender'
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_multimanager_userlist',
                    margin: '0, 0, 10, 0',
                    title: '',
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
                        itemclick: 'onGpn_manager_usergridItemClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_multi_basic_adminAfterRender',
        beforeclose: 'onPnl_xtm_multi_basic_adminBeforeClose'
    },

    onCtn_multimanager_controlAfterRender: function(component, eOpts) {
        // onCtn_multimanager_controlAfterRender ========================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 :
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

                    date          = {};
                    date['#text'] = nowDate.AddDate(componentObj.passwdex.getValue()).GetDateString();
                    date['@day' ] = componentObj.passwdex.getValue();

                }
                else{

                    date = "";

                }

                return date;

            }();

            obj.expire_date = dateObj;
            obj.host        = componentObj.trustedhost.getValue();
            obj['@id']      = componentObj.id.getValue();
            obj.mail        = componentObj.email.getValue();
            obj.password    = componentObj.passwd.getValue();
            obj.phone       = componentObj.tel.getValue();
            obj.send_mail   = "";

            var setting     = {};

            setting['@chk_config' ] = (componentObj.setting.getValue() === true) ? "on" : "off";
            setting['@chk_monitor'] = "on";
            setting['@chk_otp']     = "off";
            setting['@chk_rtm']     = "off";

            obj.setting     = setting;

            if(!me.validityCheck().managerBlankCheck() || !me.validityCheck().managerIdDuplicateCheck(componentObj.id.getValue() ,'add') ||
               !me.validityCheck().managerPasswordCheck() || !me.validityCheck().managerHostCountCheck(componentObj.trustedhost.getValue()) ||
               !me.validityCheck().managerAuthorityCount(obj)){

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
               !me.validityCheck().managerPasswordCheck() || !me.validityCheck().managerHostCountCheck(componentObj.trustedhost.getValue())){

                return;

            }

            var obj = {};

            var dateObj = function(){

                var date;
                var nowDate = new Date();

                if(componentObj.passwdex.getValue()){

                    nowDate.AddDate(componentObj.passwdex.getValue());

                    date          = {};
                    date['#text'] = nowDate.AddDate(componentObj.passwdex.getValue()).GetDateString();
                    date['@day' ] = componentObj.passwdex.getValue();

                }
                else{

                    date = "";

                }

                return date;

            }();

            obj.expire_date = dateObj;
            obj.host        = componentObj.trustedhost.getValue();
            obj['@id']      = componentObj.id.getValue();
            obj.mail        = componentObj.email.getValue();
            obj.password    = componentObj.passwd.getValue();
            obj.phone       = componentObj.tel.getValue();
            obj.send_mail   = null;

            var setting     = {};

            setting['@chk_config' ] = (componentObj.setting.getValue() === true) ? "on" : "off";
            setting['@chk_monitor'] = "on";
            setting['@chk_otp']     = "off";
            setting['@chk_rtm']     = "off";

            obj.setting     = setting;

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

            selectionGrid_Del(componentObj.managerGrid);

            reconfigNum(componentObj.managerGrid.getStore());

        });
    },

    onGpn_manager_usergridItemClick1: function(dataview, record, item, index, e, eOpts) {
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

    onPnl_xtm_multi_basic_adminAfterRender: function(component, eOpts) {
        // onPnl_xtm_multi_basic_adminAfterRender =======================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄 변경 관리자 데이터를 설정합니다. 일괄 변경은 데이터가 임시적으로 저장됩니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        componentObj.fds_managermain.checkboxCmp.setValue(false);

        this.initStore();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        // 필드셋 change 이벤트 설정 =======================================================================================================================================================

        componentObj.fds_managermain.checkboxCmp.on('change', function(cb, newValue){

            if(newValue){

                Change_ApplyTarget(wndInstance.apply_target, 'admin_set', true);

            }
            else{

                Change_ApplyTarget(wndInstance.apply_target, 'admin_set', false);

            }

        });

        // 데이터 불러오기 ================================================================================================================================================================

        if(getApplyTarget(wndInstance.apply_target, 'admin_set')){

            componentObj.fds_managermain.checkboxCmp.setValue(true);

            if(wndInstance.system_user_admin.user){

                Ext.each(wndInstance.system_user_admin.user, function(userData, idx){

                    var tmpId = userData.id;

                    userData['@id']      = tmpId;
                    userData.expire_date = (userData.expire_date === null) ? "" : userData.expire_date;
                    userData.host        = (userData.host === null) ? "" : userData.host;
                    userData.mail        = (userData.mail === null) ? "" : userData.mail;
                    userData.password    = (userData.password === null) ? "" : userData.password;
                    userData.phone       = (userData.phone === null) ? "" : userData.phone;

                    Ext.getStore('st_multimanager_list').add(userData);

                });

            }

        }
    },

    onPnl_xtm_multi_basic_adminBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_multi_basicBeforeClose ==============================================================================================================================================
        //
        // 일시 : 2014.09.02
        //
        // 설명 : innerView 가 종료될 때 메인 뷰의 상태를 변경합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_multiset');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_managermain = this.down('[itemId=fds_multimanager_main]');

        obj.fds_managermain = fds_managermain;

        obj.id              = fds_managermain.down('[itemId=ctn_multimanager_top]').down('[itemId=txf_id]');
        obj.tel             = fds_managermain.down('[itemId=ctn_multimanager_top]').down('[itemId=txf_tel]');

        obj.passwd          = fds_managermain.down('[itemId=ctn_multimanager_mid1]').down('[itemId=txf_passwd]');
        obj.passwdCheck     = fds_managermain.down('[itemId=ctn_multimanager_mid1]').down('[itemId=txf_passwdcheck]');

        obj.email           = fds_managermain.down('[itemId=ctn_multimanager_mid2]').down('[itemId=txf_email]');
        obj.passwdex        = fds_managermain.down('[itemId=ctn_multimanager_mid2]').down('[itemId=nfd_passwdexpiry]');

        obj.setting         = fds_managermain.down('[itemId=ctn_multimanager_mid3]').down('[itemId=ck_setting]');

        obj.trustedhost     = fds_managermain.down('[itemId=ctn_multimanager_bot]').down('[itemId=txf_trustedhost]');

        obj.managerGrid     = fds_managermain.down('[itemId=gpn_multimanager_userlist]');

        return obj;
    },

    validityCheck: function() {
        // validateCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 일괄 변경 시스템 관리 정보의 유효성 검사를 수행합니다.
        //
        // - 비밀번호 체크
        // - 설정권한을 가진 계정은 최대 5개
        // - 모니터링 권한을 가진 계정은 최대 10개
        // - trusted host 는 , 기준 최대 5개
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

                    if(!duplicationItem(componentValue, '@id', 'st_multimanager_list')){

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

                    if(!duplicationItem(componentValue, '@id', 'st_multimanager_list') && _managerName !== componentValue){

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

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.09.03
        //
        // 설명 : 관리자 리스트를 저장합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var wndInstance = Ext.getCmp('win_smc_device_multiset').deviceParam;

        var adminStore  = Ext.getStore('st_multimanager_list');

        var component   = this.componentStorage();

        // 관리자 계정 저장 ================================================================================================================================================================

        var dataObj;

        if(getApplyTarget(wndInstance.apply_target, 'admin_set')){

            if(adminStore.count() <= 0 ){

                dataObj = null;

            }
            else{

                dataObj = [];

                for(var i = 0; i < adminStore.count(); i++){

                    var tmpData = adminStore.getAt(i).data;

                    var tmpId = tmpData['@id'];

                    tmpData.id = tmpId;

                    delete tmpData['@id'];

                    dataObj.push(tmpData);

                }

            }

            wndInstance.system_user_admin.user = dataObj;

        }

        return true;
    },

    initStore: function() {
        var st_multi = Ext.getStore('st_multimanager_list');
        var component = this.componentStorage();

        st_multi.removeAll();

        component.managerGrid.bindStore(st_multi);
    }

});