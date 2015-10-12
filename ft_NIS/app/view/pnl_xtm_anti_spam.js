
Ext.define('SMC.view.pnl_xtm_anti_spam', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.xtm_anti_spam',

    requires: [
        'SMC.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.grid.RowNumberer',
        'Ext.selection.RowModel'
    ],

    height: 600,
    id: 'pnl_xtm_anti_spam',
    width: 800,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '안티 스팸',

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
                    height: 300,
                    itemId: 'fds_spam_antispam',
                    title: '안티 스팸',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_spam_selectspam',
                            margin: '10, 0, 20, 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_spamdb',
                                    margin: '0, 50, 0, 0',
                                    fieldLabel: '스팸 DB',
                                    labelWidth: 60,
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_autodb',
                                    margin: '0, 50, 0, 0',
                                    fieldLabel: '자동 스팸 DB 학습기능',
                                    labelWidth: 150,
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_smtp',
                                    margin: '0, 50, 0, 0',
                                    fieldLabel: 'SMTP',
                                    labelWidth: 60,
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_pop3',
                                    fieldLabel: 'POP3',
                                    labelWidth: 60,
                                    boxLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            height: 36,
                            itemId: 'ctn_spam_rbl',
                            width: 400,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 0.7,
                                    itemId: 'ctn_spam_spamalram',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            flex: 0.5,
                                            itemId: 'rdg_alram',
                                            width: 276,
                                            fieldLabel: 'SPAM',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_drop',
                                                    name: 'spam',
                                                    boxLabel: 'Drop',
                                                    inputValue: 'Detect'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_alert',
                                                    name: 'spam',
                                                    boxLabel: 'Alert',
                                                    checked: true,
                                                    inputValue: 'Alert'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1.1,
                                    itemId: 'fds_spam_rblserver',
                                    checkboxToggle: true,
                                    title: 'RBL 서버명',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_spam_rblname',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_name',
                                                    margin: '0, 5, 0, 0',
                                                    width: 250,
                                                    fieldLabel: '',
                                                    enableKeyEvents: true
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'bt_add',
                                                    width: 100,
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
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'ctn_spam_rbllist',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 1.5,
                                                    itemId: 'gpn_spam_rbllist',
                                                    margin: '0, 10, 10, 0',
                                                    title: '',
                                                    hideHeaders: true,
                                                    store: 'st_spam_rblserver',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 150,
                                                            dataIndex: 'name',
                                                            text: 'RBL 서버 목록',
                                                            flex: 0.8
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            width: 80,
                                                            defaultWidth: 50,
                                                            align: 'center',
                                                            dataIndex: 'bool',
                                                            flex: 0.2,
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                        // RBL 서버명 제거 ================================================================================================================================================================
                                                                        //
                                                                        // 일시 : 2014.09.02
                                                                        //
                                                                        // 설명 : RBL 서버 리스트 중 삭제버튼을 눌렀을때의 동작을 수행합니다.
                                                                        //
                                                                        // ==============================================================================================================================================================================

                                                                        var store = Ext.getStore('st_spam_rblserver');

                                                                        var component = Ext.getCmp('pnl_xtm_anti_spam').componentStorage();

                                                                        if(record.data.name === 'spamlist.or.kr'){

                                                                            component.default_spamlist.setValue(false);

                                                                        }

                                                                        if(record.data.name === 'dnsbl-2.uceprotect.net'){

                                                                            component.default_dnsbl2.setValue(false);

                                                                        }

                                                                        if(record.data.name === 'dnsbl.sorbs.net'){

                                                                            component.default_dnsbl.setValue(false);

                                                                        }

                                                                        store.removeAt(rowIndex);
                                                                    },
                                                                    iconCls: 'ico_grid_row_delete'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_spam_defaultlist',
                                                    margin: '0, 0, 10, 0',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            margin: '0, 0, 20, 0',
                                                            text: '- Default List'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            itemId: 'ck_spamlist',
                                                            boxLabel: 'spamlist.or.kr',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCk_spamlistChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            itemId: 'ck_dnsbl2',
                                                            boxLabel: 'dnsbl-2.uceprotect.net',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCkg_dnsbl2Change,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            itemId: 'ck_dnsbl',
                                                            fieldLabel: '',
                                                            boxLabel: 'dnsbl.sorbs.net',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCk_dnsblChange,
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
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 300,
                    itemId: 'fds_spam_antispamlist',
                    title: '안티 스팸 차단 규칙 / 차단 내용',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cmb_rule',
                            margin: '10, 0, 10, 0',
                            maxWidth: 300,
                            fieldLabel: '차단 규칙',
                            value: 'Whitelist_sender',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'st_spam_rule',
                            valueField: 'value'
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'txf_content',
                            margin: '0, 0, 10, 0',
                            maxWidth: 550,
                            fieldLabel: '차단 내용'
                        },
                        {
                            xtype: 'ctn_network_controlclass1',
                            margins: '0, 0, 10, 0',
                            listeners: {
                                afterrender: {
                                    fn: me.onCtn_spam_controlAfterRender,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_spam_antispamlist',
                            margin: '0, 0, 10, 0',
                            title: '',
                            store: 'st_spam_rulelist',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['@name'];
                                    },
                                    dataIndex: 'blocking',
                                    text: '규칙',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    dataIndex: 'blocking',
                                    text: '내용',
                                    flex: 1
                                }
                            ],
                            listeners: {
                                itemclick: {
                                    fn: me.onGpn_spam_antispamlistItemClick,
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
                    fn: me.onPnl_xtm_anti_spamAfterRender,
                    scope: me
                },
                beforeclose: {
                    fn: me.onPnl_xtm_anti_spamBeforeClose,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : rblname 데이터를 추가합니다.
        //
        // ===============================================================================================================================================================================

        var store = Ext.getStore('st_spam_rblserver');

        if(!this.validityCheck().rblserverNameBlankCheck() || !this.validityCheck().rblserverNameDuplicationCheck(button.up().down('[itemId=txf_name]').getValue())){

            return;

        }

        store.add({	'name' : button.up().down('[itemId=txf_name]').getValue() });
    },

    onCk_spamlistChange: function(field, newValue, oldValue, eOpts) {
        // onCk_spamlistChange ===========================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : spamlist.or.kr 을 기본적으로 서버명에 등록합니다.
        //
        // ===============================================================================================================================================================================

        var rblserverStore = Ext.getStore('st_spam_rblserver');

        if(newValue){

            rblserverStore.add({	'name' : 'spamlist.or.kr'	});

        }
        else{

            rblserverStore.removeAt(rblserverStore.find('name', 'spamlist.or.kr'));

        }
    },

    onCkg_dnsbl2Change: function(field, newValue, oldValue, eOpts) {
        // onCkg_dnsbl2Change ============================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : dnsbl-2.uceprotect.net 을 기본적으로 서버명에 등록합니다.
        //
        // ===============================================================================================================================================================================

        var rblserverStore = Ext.getStore('st_spam_rblserver');

        if(newValue){

            rblserverStore.add({	'name' : 'dnsbl-2.uceprotect.net'	});

        }
        else{

            rblserverStore.removeAt(rblserverStore.find('name', 'dnsbl-2.uceprotect.net'));

        }
    },

    onCk_dnsblChange: function(field, newValue, oldValue, eOpts) {
        // onCk_dnsblChange ==============================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : dnsbl.sorbs.net 을 기본적으로 서버명에 등록합니다.
        //
        // ===============================================================================================================================================================================

        var rblserverStore = Ext.getStore('st_spam_rblserver');

        if(newValue){

            rblserverStore.add({	'name' : 'dnsbl.sorbs.net'	});

        }
        else{

            rblserverStore.removeAt(rblserverStore.find('name', 'dnsbl.sorbs.net'));

        }
    },

    onCtn_spam_controlAfterRender: function(component, eOpts) {
        // onCtn_spam_controlAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 안티 스팸 차단 규칙 / 차단 데이터를 추가, 수정, 삭제기능을 수행하는 버튼의 동작을 정의합니다.
        //
        // ===============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            if(!me.validityCheck().antispamDenyBlankCheck()){

                return;

            }

            var obj = {};

            obj['@num'] = 0;

            var blockObj = {};

            blockObj['#text'] = componentObj.spamcontent.getValue();
            blockObj['@name'] = componentObj.spamrule.getRawValue();
            blockObj['@rule'] = componentObj.spamrule.getValue();

            obj.blocking = blockObj;

            gridData_Add(componentObj.spamlist_grid, obj);

            reconfigNum(componentObj.spamlist_grid.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.spamlist_grid.getSelectionModel().getSelection()[0]){

                Ext.Msg.show({

                    title : '차단 규칙 / 내용 수정 에러',
                    msg : '수정할 규칙 / 내용 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            if(!me.validityCheck().antispamDenyBlankCheck()){

                return;

            }

            var obj = {};

            var blockObj = {};

            blockObj['#text'] = componentObj.spamcontent.getValue();
            blockObj['@name'] = componentObj.spamrule.getRawValue();
            blockObj['@rule'] = componentObj.spamrule.getValue();

            obj.blocking = blockObj;

            selectionGrid_Mod(componentObj.spamlist_grid, obj);

        });

        bt_del.on('click', function(){

            if(!componentObj.spamlist_grid.getSelectionModel().getSelection().length){

                 Ext.Msg.show({

                    title : '차단 규칙 / 내용 삭제 에러',
                    msg : '삭제할 규칙 / 내용 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.spamlist_grid);

            reconfigNum(componentObj.spamlist_grid.getStore());

        });
    },

    onGpn_spam_antispamlistItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_spam_antispamlistItemClick ==============================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 안티 스팸 차단 규칙 / 차단 내용 row를 클릭할 때 컴포넌트에 데이터를 초기화 합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.spamrule.setValue(record.data.blocking['@rule']);
        component.spamcontent.setValue(record.data.blocking['#text']);
    },

    onPnl_xtm_anti_spamAfterRender: function(component, eOpts) {
        // onPnl_xtm_anti_spamAfterRender ===============================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 안티-스팸 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        this.initStore();

        var rblStore = Ext.getStore('st_spam_rblserver');
        var spamruleStore = Ext.getStore('st_spam_rulelist');

        // RBL checkbox 이벤트 정의 =======================================================================================================================================================

        componentObj.fds_rblserver.checkboxCmp.on('change', function(cb, newValue, oldValue, eOpts){

            if(!newValue){

                componentObj.default_spamlist.setValue(false);
                componentObj.default_dnsbl2.setValue(false);
                componentObj.default_dnsbl.setValue(false);

                rblStore.removeAll();

            }

        });

        if(component.deviceParams){

        // DB 옵션 저장 ==================================================================================================================================================================

            if(component.deviceParams.db){

                componentObj.smtp.setValue((component.deviceParams.db.protocol['@chk_smtp'] === 'on') ? true : false);
                componentObj.pop3.setValue((component.deviceParams.db.protocol['@chk_pop3'] === 'on') ? true : false);


        // Setting 옵션 저장 =============================================================================================================================================================

                componentObj.spamdb.setValue((component.deviceParams.db.setting['@chk_spamdb'] === 'on') ? true : false);
                componentObj.autodb.setValue((component.deviceParams.db.setting['@chk_autolearn'] === 'on') ? true : false);

        // 스팸 서버 옵션 저장 =============================================================================================================================================================

                componentObj.spamalram.setValue({	'spam' : component.deviceParams.db.spam		});

        // 서버 이름 저장 =================================================================================================================================================================

                if(component.deviceParams.db.server){

                    componentObj.fds_rblserver.checkboxCmp.setValue(true);

                    var rblNameArray = component.deviceParams.db.server.split(',');

                    if(rblNameArray){

                        for(var i = 0; i < rblNameArray.length; i++){

        // 디폴트 체크 ====================================================================================================================================================================

                            if(rblNameArray[i] === 'spamlist.or.kr'){

                                componentObj.default_spamlist.setValue(true);

                                continue;

                            }

                            if(rblNameArray[i] === 'dnsbl-2.uceprotect.net'){

                                componentObj.default_dnsbl2.setValue(true);

                                continue;

                            }

                            if(rblNameArray[i] === 'dnsbl.sorbs.net'){

                                componentObj.default_dnsbl.setValue(true);

                                continue;

                            }

                            var addObj = {};

                            addObj.name = rblNameArray[i];

                            rblStore.add(addObj);

                        }

                    }

                }
                else{

                    componentObj.fds_rblserver.checkboxCmp.setValue(false);

                }

            }

        // 안티 스팸 차단 규칙 / 차단 내용 ==================================================================================================================================================

            if(component.deviceParams.content){

                spamruleStore.add(component.deviceParams.content);

            }

        }
    },

    onPnl_xtm_anti_spamBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_anti_spamBeforeClose ================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 안티스팸 화면이 종료되면 화면 상태를 변경합니다.
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

        var fds_antispam = this.down('[itemId=fds_spam_antispam]');
        var fds_antispamlist = this.down('[itemId=fds_spam_antispamlist]');

        var selectspam = fds_antispam.down('[itemId=ctn_spam_selectspam]');
        var rblspam    = fds_antispam.down('[itemId=ctn_spam_rbl]');

        obj.spamdb = selectspam.down('[itemId=ck_spamdb]');
        obj.autodb = selectspam.down('[itemId=ck_autodb]');
        obj.smtp   = selectspam.down('[itemId=ck_smtp]');
        obj.pop3   = selectspam.down('[itemId=ck_pop3]');

        obj.spamalram = rblspam.down('[itemId=ctn_spam_spamalram]').down('[itemId=rdg_alram]');

        obj.fds_rblserver = rblspam.down('[itemId=fds_spam_rblserver]');
        obj.rblservername = rblspam.down('[itemId=fds_spam_rblserver]').down('[itemId=ctn_spam_rblname]').down('[itemId=txf_name]');

        var ctn_rbllist = rblspam.down('[itemId=fds_spam_rblserver]').down('[itemId=ctn_spam_rbllist]').down('[itemId=ctn_spam_defaultlist]');

        obj.default_spamlist = ctn_rbllist.down('[itemId=ck_spamlist]');
        obj.default_dnsbl2 = ctn_rbllist.down('[itemId=ck_dnsbl2]');
        obj.default_dnsbl = ctn_rbllist.down('[itemId=ck_dnsbl]');

        obj.spamrule = fds_antispamlist.down('[itemId=cmb_rule]');
        obj.spamcontent = fds_antispamlist.down('[itemId=txf_content]');
        obj.spamlist_grid = fds_antispamlist.down('[itemId=gpn_spam_antispamlist]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ================================================================================================================================================================
        //
        // 일시 : 2014.09.01
        //
        // 설명 : 안티 스팸의 유효성 검사를 수행합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            rblserverNameBlankCheck : function(){

                if(component.rblservername.getValue() === ''){

                    Ext.Msg.show({

                        title : 'RBL 서버명 저장 에러',
                        msg : 'RBL 서버명은 비울 수 없습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            antispamDenyBlankCheck : function(){

                if(component.spamcontent.getValue() === ''){

                    Ext.Msg.show({

                        title : '차단 내용 저장 에러',
                        msg : '차단 내용은 비울 수 없습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            },
            rblserverNameDuplicationCheck : function(componentValue){

                if(!duplicationItem(componentValue, 'name', 'st_spam_rblserver')){

                    Ext.Msg.show({

                        title : 'RBL 서버명 중복 에러',
                        msg : '같은 RBL 서버명이 이미 등록되었습니다.',
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
        // 일시 : 2014.09.02
        //
        // 설명 : 안티스팸 데이터를 저장합니다.
        //
        // 추가 : anti_spam 객체는 기본적으로 db 객체를 자신의 속성으로 가지고있습니다.
        //
        // ============================================================================================================================================================================

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var rblserverStore = Ext.getStore('st_spam_rblserver');
        var ruleStore = Ext.getStore('st_spam_rulelist');

        // 안티스팸 DB 정보 정보 저장 =====================================================================================================================================================

        deviceAllData.anti_spam.db.protocol['@chk_pop3'] = (component.pop3.getValue() === true) ? 'on' : 'off';
        deviceAllData.anti_spam.db.protocol['@chk_smtp'] = (component.smtp.getValue() === true) ? 'on' : 'off';

        if(rblserverStore.count() > 0){

            var serverName = '';

            for(var i = 0; i < rblserverStore.count(); i++){

                serverName += rblserverStore.getAt(i).get('name') + ',';

            }

            deviceAllData.anti_spam.db.server = serverName.substring(0, serverName.length - 1);

        }
        else{

            deviceAllData.anti_spam.db.server = null;

        }

        deviceAllData.anti_spam.db.setting['@chk_autolearn'] = (component.autodb.getValue() === true) ? 'on' : 'off';
        deviceAllData.anti_spam.db.setting['@chk_spamdb'] = (component.spamdb.getValue() === true) ? 'on' : 'off';

        deviceAllData.anti_spam.db.spam = component.spamalram.getValue().spam;

        // 차단규칙, 내용 정보 저장 =======================================================================================================================================================

        if(ruleStore.count() <= 0){

            if(deviceAllData.anti_spam.content){

                delete deviceAllData.anti_spam.content;

            }

        }
        else{

            var contentArray = [];

            for(var i = 0; i < ruleStore.count(); i++){

                contentArray.push(ruleStore.getAt(i).data);

            }

            deviceAllData.anti_spam.content = contentArray;

        }

        return true;
    },

    initStore: function() {
        Ext.getStore('st_spam_rblserver').removeAll();
        Ext.getStore('st_spam_rulelist').removeAll();
    }

});