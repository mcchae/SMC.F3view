
Ext.define('SMC4ZEN.view.win_smc_group_set', {
    extend: 'Ext.window.Window',

    requires: [
        'SMC4ZEN.view.win_smc_group_setViewModel',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_smc_group_set'
    },
    constrain: true,
    border: false,
    height: 150,
    id: 'win_smc_group_set',
    padding: 10,
    width: 350,
    title: '장비 그룹 설정',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 0.8,
            itemId: 'ctn_groupname',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'textfield',
                    flex: 1,
                    itemId: 'txf_groupname',
                    fieldLabel: '그룹명 입력',
                    listeners: {
                        blur: 'onTxf_groupnameBlur'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            flex: 0.3,
            itemId: 'ctn_control',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_add',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '확 인',
                    listeners: {
                        click: 'onBt_addClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_cancel',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: 'onBt_cancelClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        render: 'onWin_smc_group_setRender'
    },

    onTxf_groupnameBlur: function(component, event, eOpts) {
        // onTxf_groupnameBlur ===========================================================================================================================================================
        //
        // 일시 : 2014.10.14
        //
        // 설명 : 타이머로 인해 포커스를 잃을 경우 포커스를 재설정합니다.
        //
        // ===============================================================================================================================================================================

        component.focus();
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick ==============================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 장비의 그룹을 추가합니다.
        //
        // ============================================================================================================================================================================

        var groupInstance = Ext.getCmp('win_smc_group_set'),
            deviceGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup),
            groupName = groupInstance.down('[itemId=ctn_groupname]').down('[itemId=txf_groupname]').getValue();

        if(groupInstance.mode === 'ADD'){

            if(groupName.length <= 0){

                Ext.Msg.show({ title : '그룹명 에러', msg : '그룹명은 비울 수 없습니다.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

                return false;
            }

            // 데이터 추가

            var service = 'ftSMC',
                svc_func = 'addGroup',
                params = {
                    'name' : Ext.encode(groupName),
                    'p_cid' : Ext.encode(groupInstance.groupParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var serviceName = 'ftSMC',
                        rpcFunc = 'getGroup',
                        params = {

                            gtype : Ext.encode('obj_dev')

                        };

                    treeReload(deviceGroup, serviceName, rpcFunc, params);

                }
            );

        }
        else{

            if(groupName.length <= 0){

                Ext.Msg.show(
                    {

                        title : DEVICE_COMMON_CONST.DEVICE_WIN_TITLE,
                        msg : '그룹명은 비울 수 없습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                return false;
            }

            // 데이터 수정

            var service = 'ftSMC',
                svc_func = 'modGroup',
                params = {
                    name : Ext.encode(groupName),
                    cid : Ext.encode(groupInstance.groupParams)
                };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    var serviceName = 'ftSMC',
                        rpcFunc = 'getGroup',
                        params = {

                            gtype : Ext.encode('obj_dev')

                        };

                    treeReload(deviceGroup, serviceName, rpcFunc, params);

                }
            );

        }

        groupInstance.destroy();
    },

    onBt_cancelClick: function(button, e, eOpts) {
        // onBt_cancelClick =============================================================================================================================================================
        //
        // 일시 : 2014.
        //
        // 설명 : 장비 그룹을 설정하는 윈도우를 닫습니다.
        //
        // ==============================================================================================================================================================================

        Ext.getCmp('win_smc_group_set').destroy();
    },

    onWin_smc_group_setRender: function(component, eOpts) {
        component.setTitle(component.wndTitle);
    }

});