
Ext.define('TMOV.view.win_tmov_batch_policy_setting', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 200,
    id: 'win_tmov_batch_policy_setting',
    width: 545,
    constrainHeader: true,
    title: '정책 설정',

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
                    height: 86,
                    margin: 5,
                    title: '정책 설정',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txf_batch_policy_inner',
                                    width: 320,
                                    fieldLabel: '내부 정책'
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    width: 80,
                                    text: '선택',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick11,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    width: 80,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick41,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 10
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txf_batch_policy_outer',
                                    width: 320,
                                    fieldLabel: '외부 정책'
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    width: 80,
                                    text: '선택',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick21,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    width: 80,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick51,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            width: 80,
                            text: '저장',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick31,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            width: 10
                        },
                        {
                            xtype: 'button',
                            width: 80,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick6,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 10
                }
            ],
            listeners: {
                beforedestroy: {
                    fn: me.onWin_tmov_batch_policy_settingBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick11: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_policy_select', {
            'type' : 'batch_policy',
            'mode' : 'inner'
        }).show();
    },

    onButtonClick41: function(button, e, eOpts) {
        if (Ext.getCmp('win_tmov_user_setting').inner_id === undefined)
            return;

        Ext.getCmp('win_tmov_user_setting').inner_id = '';
        Ext.getCmp('txf_user_policy_inner').setValue('');
    },

    onButtonClick21: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_policy_select', {
            'type' : 'batch_policy',
            'mode' : 'outer'
        }).show();
    },

    onButtonClick51: function(button, e, eOpts) {
        if(Ext.getCmp('win_tmov_user_setting').outer_id === undefined)
            return;

        Ext.getCmp('win_tmov_user_setting').outer_id = '';
        Ext.getCmp('txf_user_policy_outer').setValue('');
    },

    onButtonClick31: function(button, e, eOpts) {
        var component = Ext.getCmp('win_tmov_batch_policy_setting');

        var inner_name = Ext.getCmp('txf_batch_policy_inner').getValue();
        var outer_name = Ext.getCmp('txf_batch_policy_outer').getValue();

        var inner_policy = {'name' : '', 'use' : false, '_id' : ''};
        var outer_policy = {'name' : '', 'use' : false, '_id' : ''};

        if (inner_name !== '')
        {
            inner_policy.name = inner_name;
            inner_policy.use = true;
            inner_policy._id = component.inner_id;
        }

        if (outer_name !== '')
        {
            outer_policy.name = outer_name;
            outer_policy.use = true;
            outer_policy._id = component.outer_id;
        }

        if (component.type === 'user_policy')
        {
            // 선택된 사용자 정책
            var user_policy = '';

            if (component.isInner === true)
            {
                user_policy = Ext.getCmp('gpn_inner_user_policy').getSelectionModel().getSelection();
            }
            else
            {
                user_policy = Ext.getCmp('gpn_outer_user_policy').getSelectionModel().getSelection();
            }

            var user_policy_list = [];

            for(var i=0; i < user_policy.length; i++)
            {
                user_policy_list[i] = user_policy[i].raw._id;
            }

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/ModifyBatchUserPolicy',
                    params : {
                        _id_list : Ext.encode(user_policy_list),
                        inner_policy : Ext.encode(inner_policy),
                        outer_policy : Ext.encode(outer_policy),
                        userid : Ext.encode(Ext.getCmp('main').user['@id'])
                    },
                    success : function(res_data)
                    {
                        component.close();
                    }
                }
            );
        }
        else// server_farm
        {
            var server_farm = '';

            if (component.isInner === true)
            {
                server_farm = Ext.getCmp('gpn_tmov_inner_server_farm').getSelectionModel().getSelection();
            }
            else
            {
                server_farm = Ext.getCmp('gpn_tmov_outer_server_farm').getSelectionModel().getSelection();
            }

            var server_farm_list = [];

            var server_farm_list = [];

            for(var i=0; i < server_farm.length; i++)
            {
                server_farm_list[i] = server_farm[i].raw._id;
            }

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/ModifyBatchServerPolicy',
                    params : {
                        _id_list : Ext.encode(server_farm_list),
                        inner_policy : Ext.encode(inner_policy),
                        outer_policy : Ext.encode(outer_policy),
                        userid : Ext.encode(Ext.getCmp('main').user['@id'])
                    },
                    success : function(res_data)
                    {
                        component.close();
                    }
                }
            );
        }
    },

    onButtonClick6: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_batch_policy_setting').close();
    },

    onWin_tmov_batch_policy_settingBeforeDestroy: function(component, eOpts) {

        console.log(component.type);

        if(component.type === 'user_policy')
        {
            Ext.getStore('st_tmov_user_policy').load();
        }
        else //server_farm
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetServerList',
                    params : {
                        parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                        user : Ext.encode(Ext.getCmp('main').user)
                    },
                    success : function(res)
                    {
                        var retVal = JSON.parse(res.responseText);
                        Ext.getStore('st_tmov_server_list').loadData(retVal);
                    }
                }
            );
        }
    }

});