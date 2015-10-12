
Ext.define('SMC4ZEN.view.win_xtm_vpn_branch_office', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_xtm_vpn_branch_officeViewModel',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'win_xtm_vpn_branch_office'
    },
    id: 'win_xtm_vpn_branch_office',
    overflowY: 'auto',
    width: 700,
    bodyPadding: 10,
    title: '그룹 DR 자동화 설정',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_vpnbranch_dr',
            margin: '0, 0, 10, 0',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_useauto',
                    fieldLabel: '',
                    boxLabel: '그룹 DR 자동화 사용',
                    listeners: {
                        change: 'onCk_useautoChange'
                    }
                },
                {
                    xtype: 'container',
                    disabled: true,
                    itemId: 'ctn_vpnbranch_timeout',
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
                            itemId: 'nfd_timeout',
                            margin: '0, 10, 0, 0',
                            width: 300,
                            fieldLabel: 'DR 자동화 시 타임아웃 결정 시간',
                            labelWidth: 200,
                            value: 30
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: '초 (Default : 30초)'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    margins: '0, 0, 10, 0',
                    disabled: true,
                    itemId: 'ctn_vpnbranch_addip',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_vpnbranch_primary',
                            margin: '0, 50, 0, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_ip',
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
                                            flex: 0.7,
                                            itemId: 'txf_ip',
                                            margin: '0, 10, 0, 0',
                                            fieldLabel: 'Primary IP',
                                            labelWidth: 80
                                        },
                                        {
                                            xtype: 'button',
                                            flex: 0.3,
                                            itemId: 'bt_add',
                                            text: '추 가',
                                            listeners: {
                                                click: 'onBt_addClick'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_vpnbranch_primary',
                                    overflowY: 'auto',
                                    title: '',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: '#text',
                                            text: 'Primary',
                                            flex: 0.8
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            flex: 0.2,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        // handler =======================================================================================================================================================================
                                                        //
                                                        // 일시 : 2014.10.10
                                                        //
                                                        // 설명 : 선택된 그리드의 Row index를 이용하여 스토어에서 데이터를 삭제합니다.
                                                        //
                                                        // ===============================================================================================================================================================================

                                                        var store = Ext.getStore('st_groupdr_primaryip');

                                                        store.removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        render: 'onGpn_vpnbranch_primaryRender'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_vpnbranch_backup',
                            margin: '0, 0, 0, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_vpnbranch_ip',
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
                                            flex: 0.7,
                                            itemId: 'txf_ip',
                                            margin: '0, 10, 0, 0',
                                            fieldLabel: 'Backup IP',
                                            labelWidth: 80
                                        },
                                        {
                                            xtype: 'button',
                                            flex: 0.3,
                                            itemId: 'bt_add',
                                            text: '추 가',
                                            listeners: {
                                                click: 'onBt_addClick1'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_vpnbranch_backup',
                                    overflowY: 'auto',
                                    title: '',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: '#text',
                                            text: 'Backup',
                                            flex: 0.8
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            flex: 0.2,
                                            iconCls: '',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        // handler =======================================================================================================================================================================
                                                        //
                                                        // 일시 : 2014.10.10
                                                        //
                                                        // 설명 : 선택된 그리드의 Row index를 가져와 스토어에서 데이터를 삭제합니다.
                                                        //
                                                        // ===============================================================================================================================================================================

                                                        var store = Ext.getStore('st_groupdr_backupip');

                                                        store.removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        render: 'onGpn_vpnbranch_backupRender'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'ctn_vpnbranch_control',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_save',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '저 장',
                    listeners: {
                        click: 'onBt_saveClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_close',
                    width: 100,
                    text: '닫 기',
                    listeners: {
                        click: 'onBt_closeClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_xtm_vpn_branch_officeAfterRender'
    },

    onCk_useautoChange: function(field, newValue, oldValue, eOpts) {
        // onCk_useautoChange ============================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 AUTO DR 사용 여부를 체크합니다. 사용하지 않을경우 하위 컴포넌트들이 비활성화 됩니다.
        //
        // ===============================================================================================================================================================================

        var ctn_main = field.up();

        var ctn_timeout = ctn_main.down('[itemId=ctn_vpnbranch_timeout]');
        var ctn_addip   = ctn_main.down('[itemId=ctn_vpnbranch_addip]');

        ctn_timeout.setDisabled(!newValue);
        ctn_addip.setDisabled(!newValue);
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.10.15
        //
        // 설명 : DR 그룹 Primary IP를 설정합니다.
        //
        // 수정 :
        //
        // - (2014.10.21 김민수 VPN 지점 Panel 컴포넌트에서 Win_xtm_vpn_branch_office 로 컴포넌트 이동)
        //
        // ===============================================================================================================================================================================

        var primaryStore = Ext.getStore('st_groupdr_primaryip');

        var primaryIp    = button.up().down('[itemId=txf_ip]');

        var addObj       = {};

        // 유효성 검사 =====================================================================================================================================================================

        if(!this.validityCheck().blankCheck(primaryIp) || !this.validityCheck().ipValidate(primaryIp) || !this.validityCheck().duplicateCheck(primaryIp.getValue(), '#text', 'st_groupdr_primaryip')){

            return false;

        }

        // 데이터 입력 =====================================================================================================================================================================

        addObj['#text']    = primaryIp.getValue();
        addObj['@type']    = 'single';
        addObj['@version'] = 'v4';

        primaryStore.add(addObj);

        primaryIp.setValue('');
    },

    onGpn_vpnbranch_primaryRender: function(component, eOpts) {
        // onGpn_vpnbranch_primaryRender =================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 그리드의 스토어를 생성하고 바인딩 합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_groupdr_primaryip',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@type'
                },
                {
                    name: '@version'
                }
            ]

        }));
    },

    onBt_addClick1: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.10.15
        //
        // 설명 : DR 그룹1 Backup IP를 설정합니다.
        //
        // ===============================================================================================================================================================================

        var backupStore = Ext.getStore('st_groupdr_backupip');

        var backupIp    = button.up().down('[itemId=txf_ip]');

        var addObj      = {};

        // 유효성 검사 수행 =================================================================================================================================================================

        if(!this.validityCheck().blankCheck(backupIp) || !this.validityCheck().ipValidate(backupIp) || !this.validityCheck().duplicateCheck(backupIp.getValue(), '#text', 'st_groupdr_backupip')){

            return false;

        }

        // 데이터 입력 =====================================================================================================================================================================

        addObj['#text']    = backupIp.getValue();
        addObj['@type']    = 'single';
        addObj['@version'] = 'v4';

        backupStore.add(addObj);

        backupIp.setValue('');
    },

    onGpn_vpnbranch_backupRender: function(component, eOpts) {
        // onGpn_vpnbranch_backupRender ==================================================================================================================================================
        //
        // 일시 : 2014.10.10
        //
        // 설명 : 그리드의 스토어를 생성하고 바인딩 합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_groupdr_backupip',
            fields: [
                {
                    name: '#text'
                },
                {
                    name: '@type'
                },
                {
                    name: '@version'
                }
            ]

        }));
    },

    onBt_saveClick: function(button, e, eOpts) {
        // onBt_saveClick ===============================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : DR 그룹 설정을 스토어에 저장합니다.
        //
        // ==============================================================================================================================================================================

        var primaryStore = Ext.getStore('st_groupdr_primaryip');
        var backupStore  = Ext.getStore('st_groupdr_backupip');

        var componentObj = this.componentStorage();

        var obj = {

            '@num'     : 0,
            '@chk_use' : 'off',
            'backup'   : null,
            'primary'  : null,
            'timeout'  : 30

        };

        // 유효성 검사 수행 ================================================================================================================================================================

        if(!this.validityCheck().blankCheck(componentObj.nfd_timeout, componentObj.ck_groupdr.getValue()) ||
           !this.validityCheck().scaleValidate(componentObj.nfd_timeout, '타임아웃의 범위는 1 ~ 255입니다.', componentObj.ck_groupdr.getValue()) ||
           !this.validityCheck().comparisonStore(primaryStore, backupStore)){

            return false;

        }

        obj['@num'] = this.groupRecord.data['@num'];

        // 그룹 DR 자동화 사용값 저장 =======================================================================================================================================================

        obj['@chk_use'] = componentObj.ck_groupdr.getValue();

        // 타임아웃 값 저장 ================================================================================================================================================================

        obj.timeout = componentObj.nfd_timeout.getValue();

        // primary IP 저장 ===============================================================================================================================================================

        var primaryCount = primaryStore.count();

        if(primaryCount === 0){

            if(obj.primary){

                obj.primary = null;

            }

        }
        else{

            var primaryArray = [];

            if(!obj.primary){

                obj.primary = {};

            }

            for(var i = 0; i < primaryCount; i++){

                var tmp = {};

                tmp['#text'] = primaryStore.getAt(i).get('#text');
                tmp['@type'] = 'single';
                tmp['@version'] = 'v4';

                primaryArray.push(tmp);

            }

            obj.primary.ip = primaryArray;

        }

        // backup IP 저장 ================================================================================================================================================================

        var backupCount = backupStore.count();

        if(backupCount === 0){

            if(obj.backup){

                obj.backup = null;

            }

        }
        else{

            var backupArray = [];

            if(!obj.backup){

                obj.backup = {};

            }

            for(var i = 0; i < backupCount; i++){

                var tmp = {};

                tmp['#text'] = backupStore.getAt(i).get('#text');
                tmp['@type'] = 'single';
                tmp['@version'] = 'v4';

                backupArray.push(tmp);

            }

            obj.backup.ip = backupArray;

        }

        selectionGrid_Mod(this.groupGridObj, obj);

        this.destroy();
    },

    onBt_closeClick: function(button, e, eOpts) {
        this.destroy();
    },

    onWin_xtm_vpn_branch_officeAfterRender: function(component, eOpts) {
        // onWin_xtm_vpn_branch_officeAfterRender ========================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 DR에 대한 자동화 설정 데이터를 그리드에 설정합니다.
        //
        // ===============================================================================================================================================================================

        var primaryStore = Ext.getStore('st_groupdr_primaryip');
        var backupStore  = Ext.getStore('st_groupdr_backupip');

        var groupdrData  = this.groupRecord;

        var componentObj = this.componentStorage();

        if(groupdrData){

            componentObj.ck_groupdr.setValue(groupdrData.data['@chk_use']);

            componentObj.nfd_timeout.setValue(groupdrData.data.timeout);

            if(groupdrData.data.primary){

                primaryStore.add(groupdrData.data.primary.ip);

            }

            if(groupdrData.data.backup){

                backupStore.add(groupdrData.data.backup.ip);

            }

        }
    },

    componentStorage: function() {
        var obj = {};

        obj.ck_groupdr  = this.down('[itemId=ctn_vpnbranch_dr]').down('[itemId=ck_useauto]');

        obj.nfd_timeout = this.down('[itemId=ctn_vpnbranch_dr]').down('[itemId=ctn_vpnbranch_timeout]').down('[itemId=nfd_timeout]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.10.21
        //
        // 설명 : 그룹 DR 데이터를 추가하거나 저장할 때 유효성 검사를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var validateObject = {

            'blankCheck' : function(component){

                var argument = (arguments[1] === undefined) ? true : arguments[1];

                if(component.getValue() === null && argument){

                    Ext.Msg.show({

                        'title'   : 'WeGuardia™ SMC 2.0',
                        'msg'     : '필수 입력 항목입니다.',
                        'buttons' : Ext.Msg.OK,
                        'icon'    : Ext.Msg.ERROR,
                        'fn'      : function(){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'scaleValidate' : function(component, msg){

                var argument = (arguments[2] === undefined) ? true : arguments[1];

                if(!component.validate() && argument){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : msg,
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR,
                        fn : function(){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'ipValidate' : function(component){

                if(!component.validate()){

                    Ext.Msg.show({

                        title   : 'WeGuardia™ SMC 2.0',
                        msg     : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon    : Ext.Msg.ERROR,
                        fn      : function(){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'duplicateCheck' : function(value, field, storeid){

                if(!duplicationItem(value, field, storeid)){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '동일한 IP가 이미 추가되어 있습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            'comparisonStore' : function(firstStore, secondStore){

                if(firstStore.count() !== secondStore.count()){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'Primary IP와 Backup IP의 갯수는 동일해야 합니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validateObject;
    }

});