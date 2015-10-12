
Ext.define('SMC.view.win_smc_object_group_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.smc_object_group_set',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    border: false,
    height: 150,
    id: 'win_smc_object_group_set',
    padding: 10,
    width: 350,
    constrainHeader: true,
    title: '그룹 추가',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
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
                            validator: function(value) {
                                var retValue = CheckNotNull(value);

                                if(!retValue){return false; }
                                return true;
                            },
                            flex: 1,
                            itemId: 'txf_groupname',
                            fieldLabel: '그룹명 입력'
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
                                click: {
                                    fn: me.onBt_addClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_cancel',
                            width: 100,
                            text: '취 소',
                            listeners: {
                                click: {
                                    fn: me.onBt_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                render: {
                    fn: me.onWin_smc_group_setRender,
                    scope: me
                },
                afterrender: {
                    fn: me.onWin_smc_object_group_setAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_addClick: function(button, e, eOpts) {
        var me = Ext.getCmp('win_smc_object_group_set');
        // 컴포넌트 목록trpn_objectMenu
        var wndObj = Ext.getCmp('win_smc_object_group_set');
        var treeObj = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];
        var groupName = wndObj.down('[itemId=ctn_groupname]').down('[itemId=txf_groupname]').getValue();

        if(wndObj.mode === 'ADD'){

            if(!wndObj.down('[itemId=ctn_groupname]').down('[itemId=txf_groupname]').validate()){

                Ext.Msg.show({ title : '그룹명 에러', msg : '그룹명은 비울 수 없습니다.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

                return false;
            }

            // 데이터 추가
            var service = 'ftSMC',
            svc_func = 'addGroup',
            params = {
                name : Ext.encode(groupName),
                p_cid : Ext.encode(wndObj.groupParams)
            };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    if(res)
                    {
                        if(!res.errcode)
                        {
                            treeObj.set_obj_tree(res);
                        }
                    }

                    wndObj.destroy();
                }
            );
        }
        else{

            if(!wndObj.down('[itemId=ctn_groupname]').down('[itemId=txf_groupname]').validate()){

                Ext.Msg.show({ title : '그룹명 에러', msg : '그룹명은 비울 수 없습니다.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

                return false;
            }

            // 데이터 수정

            var service = 'ftSMC',
            svc_func = 'modGroup',
            params = {
                name : Ext.encode(groupName),
                cid : Ext.encode(wndObj.groupParams)
            };

            request_helper.xmlrpc_call_Ajax_Post(
                service,
                svc_func,
                params,
                function(res){

                    if(res)
                    {
                        if(!res.errcode)
                        {
                            treeObj.getSelectionModel().getSelection()[0].data.text = res.text;
                            treeObj.getSelectionModel().getSelection()[0].raw.text = res.text;

                            treeObj.getView().refresh();
                        }
                    }

                    wndObj.destroy();
                }
            );
        }
    },

    onBt_cancelClick: function(button, e, eOpts) {
        var wndObj = Ext.getCmp('win_smc_object_group_set');

        wndObj.destroy();
    },

    onWin_smc_group_setRender: function(component, eOpts) {
        component.setTitle(component.wndTitle);
    },

    onWin_smc_object_group_setAfterRender: function(component, eOpts) {
        component.down('textfield[itemId=txf_groupname]').setValue(component.groupName);

        this.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                var me = Ext.getCmp('win_smc_object_group_set');
                // 컴포넌트 목록trpn_objectMenu
                var wndObj = Ext.getCmp('win_smc_object_group_set');
                var treeObj = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];
                var groupName = wndObj.down('[itemId=ctn_groupname]').down('[itemId=txf_groupname]').getValue();
                var select_node = treeObj.getSelectionModel().getSelection()[0];

                if(wndObj.mode === 'ADD'){

                    if(!wndObj.down('[itemId=ctn_groupname]').down('[itemId=txf_groupname]').validate()){

                        Ext.Msg.show({ title : '그룹명 에러', msg : '그룹명은 비울 수 없습니다.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

                        return false;
                    }

                    // 데이터 추가
                    var service = 'ftSMC',
                    svc_func = 'addGroup',
                    params = {
                        name : Ext.encode(groupName),
                        p_cid : Ext.encode(wndObj.groupParams)
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        svc_func,
                        params,
                        function(res){

                            console.log('res - ', res);

                            if(select_node.data.leaf === true || select_node.raw.leaf === true)
                            {
                                select_node.data.leaf = false;
                                select_node.raw.leaf = false;
                            }

                            if(select_node.data.expanded === false || select_node.raw.expanded === false)
                            {
                                select_node.data.expanded = true;
                                select_node.raw.expanded = true;
                            }

                            treeObj.getSelectionModel().getSelection()[0].appendChild(res);
                            treeObj.getSelectionModel().getSelection()[0].data.children.push(res);

                            console.log('treeObj - ', treeObj);

                            treeObj.getView().refresh();
                            wndObj.destroy();

                        }
                    );

                }
                else{

                    if(!wndObj.down('[itemId=ctn_groupname]').down('[itemId=txf_groupname]').validate()){

                        Ext.Msg.show({ title : '그룹명 에러', msg : '그룹명은 비울 수 없습니다.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

                        return false;
                    }

                    // 데이터 수정

                    var service = 'ftSMC',
                    svc_func = 'modGroup',
                    params = {
                        name : Ext.encode(groupName),
                        cid : Ext.encode(wndObj.groupParams)
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        service,
                        svc_func,
                        params,
                        function(res){

                            treeObj.getSelectionModel().getSelection()[0].data.text = res.text;
                            treeObj.getSelectionModel().getSelection()[0].raw.text = res.text;

                            treeObj.getView().refresh();
                            wndObj.destroy();

                        }
                    );
                }
            }
        });
    }

});