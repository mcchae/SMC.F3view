
Ext.define('SMC.view.mn_smc_device_context', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.smc_device_context',

    requires: [
        'Ext.menu.Separator',
        'Ext.menu.Menu'
    ],

    border: false,
    id: 'mn_smc_device_context',
    width: 180,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'menuitem',
                    itemId: 'mi_add',
                    text: '장비 등록',
                    listeners: {
                        click: {
                            fn: me.onMi_addClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_mod',
                    text: '장비 수정',
                    listeners: {
                        click: {
                            fn: me.onMi_modClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_del',
                    text: '장비 삭제',
                    listeners: {
                        click: {
                            fn: me.onMi_delClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'menuseparator',
                    itemId: 'sp_1'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_copy',
                    text: '장비 복사'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_past',
                    text: '장비 붙여넣기'
                },
                {
                    xtype: 'menuseparator',
                    itemId: 'sp_2'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_groupmov',
                    text: '그룹 이동'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_groupsearch',
                    text: '그룹 찾기'
                },
                {
                    xtype: 'menuseparator',
                    itemId: 'sp_3'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_sendpolicy',
                    text: '선택 장비 정책 전송',
                    listeners: {
                        click: {
                            fn: me.onMi_sendpolicyClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'menuseparator',
                    itemId: 'sp_6'
                },
                {
                    xtype: 'menuitem',
                    itemId: 'mi_file',
                    text: '파일 발급',
                    menu: {
                        xtype: 'menu',
                        itemId: 'mn_file',
                        width: 200,
                        items: [
                            {
                                xtype: 'menuitem',
                                itemId: 'mi_initfile',
                                text: '초기화 파일 발급',
                                listeners: {
                                    click: {
                                        fn: me.onMi_initfileClick,
                                        scope: me
                                    }
                                }
                            },
                            {
                                xtype: 'menuitem',
                                itemId: 'mi_devicefile',
                                text: '장비 설정 정보 (XML) 저장'
                            },
                            {
                                xtype: 'menuitem',
                                itemId: 'mi_rtmlist',
                                text: 'RTM 장비 목록 저장'
                            }
                        ]
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onMi_addClick: function(item, e, eOpts) {
        var treeObj      = Ext.getCmp('pnl_smc_device_tree_view_xtm');

        var service      = 'ftSMC',
            serchService = 'getObjectDefault',
            params       = {

                kind : Ext.encode('obj_dev_xtm')

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                res['@groupcid'] = treeObj.getSelectionModel().getSelection()[0].raw.cid;

                Ext.create('widget.win_device_set', {

                    'deviceParams' : res,

                    'deviceMode'   : 'ADD'

                }).show();

                Ext.getCmp('pnl_smc_device_center').initEthStore(res);

            }

        );
    },

    onMi_modClick: function(item, e, eOpts) {
        var gridObj      = Ext.getCmp('gpn_smc_device_list');

        var selectRecord =  gridObj.getSelectionModel().getSelection()[0];

        var service      = 'ftSMC',
            serchService = 'getDevice',
            params       = {

                cid : Ext.encode(selectRecord.get('@cid'))

            };

        request_helper.xmlrpc_call_Ajax_Post(
            service,
            serchService,
            params,
            function(res){

                Ext.create('widget.win_device_set', {

                    'deviceParams' : res,

                    'deviceMode'   : 'MODIFY'

                }).show();

                Ext.getCmp('pnl_smc_device_center').initEthStore(res);

            }
        );
    },

    onMi_delClick: function(item, e, eOpts) {
        Ext.Msg.show({ title : '장비 삭제 확인', msg : '선택된 장비를 삭제하시겠습니까?', buttons : Ext.Msg.YESNO, icon : Ext.Msg.QUESTION,

            fn : function(res){

                 if(res === 'yes'){

                     try{

                         var gridObj      = Ext.getCmp('gpn_smc_device_list');

                         var selectCid    = gridObj.getSelectionModel().getSelection()[0].data['@cid'];

                         var service      = 'ftSMC',
                             serchService = 'delDevice',
                             params       = {

                                 cid : Ext.encode(selectCid)

                             };

                         request_helper.xmlrpc_call_Ajax_Post(
                             service,
                             serchService,
                             params,
                             function(res){

                                 var groupCid = Ext.getCmp('pnl_smc_device_tree_view_xtm').getSelectionModel().getSelection()[0].raw.cid;

                                 var service = 'ftSMC',
                                     serchService = 'getDeviceList',
                                     params = {

                                         g_cid : Ext.encode(groupCid)

                                     };

                                 request_helper.xmlrpc_call_Ajax_Post(
                                     service,
                                     serchService,
                                     params,
                                     function(res){

                                         Ext.getStore('st_smc_device_list').loadData(res);

                                     }

                                 );

                             }

                         );

                     }
                     catch(err){

                         Ext.Msg.show({ title : '장비 삭제 에러', msg : '다음과 같은 에러가 발생하였습니다.<br><br>?' + err, buttons : Ext.Msg.YESNO, icon : Ext.Msg.QUESTION});

                     }

                 }

            }

        });
    },

    onMi_sendpolicyClick: function(item, e, eOpts) {
        var gridObj   = Ext.getCmp('gpn_smc_device_list');

        var selectRecord = gridObj.getSelectionModel().getSelection();

        var devicelistObj = Ext.getCmp('tpl_smc_device_tab').down('[itemId=pnl_smc_device_devicelist]');

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        if(selectRecord){

            var flag = false;

            var policyWin = Ext.create('widget.xtm_sendpolicy', {

                'deviceData' : function(){

                    var deviceInfoArray = [];

                    for(var i = 0; i < selectRecord.length; i++){

                        if(selectRecord[i].get('ip').match('0.0.0.0') || selectRecord[i].get('run_state') === 0){

                            flag = true;

                            continue;

                        }

                        deviceInfoArray.push(selectRecord[i].data);

                    }

                    return deviceInfoArray;

                }()

            });

            if(flag){

                Ext.Msg.show({

                    title : '정책 전송 알림',
                    msg : '장비 상태가 초기상태이거나 IP가 0.0.0.0 인 장치가 선택되었습니다.<br><br>초기상태이거나 IP가 0.0.0.0 인 장비는 제외합니다.<br>',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.WARNING,
                    fn : function(res){

                        if(res === 'ok'){

                            policyWin.show();

                        }

                    }

                });

            }
            else{

                policyWin.show();

            }

        }
        else{

            Ext.Msg.show({

                title : '정책 전송 에러',
                msg : '선택된 장비가 없습니다.',
                buttons : Ext.Msg.OK,
                icon : Ext.Msg.ERROR

            });

        }
    },

    onMi_initfileClick: function(item, e, eOpts) {
        var devicelistObj = Ext.getCmp('tpl_smc_device_tab').down('[itemId=pnl_smc_device_devicelist]');

        var gridObj      = Ext.getCmp('gpn_smc_device_list');

        var selectRecord =  gridObj.getSelectionModel().getSelection()[0];

        if(devicelistObj.taskObj){

            clearInterval(devicelistObj.taskObj);

        }

        Ext.create('widget.smc_device_initfile', {

            'cid' : selectRecord.data['@cid']

        }).show();
    }

});