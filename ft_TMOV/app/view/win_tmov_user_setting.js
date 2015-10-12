
Ext.define('TMOV.view.win_tmov_user_setting', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 369,
    id: 'win_tmov_user_setting',
    width: 563,
    constrainHeader: true,
    title: '사용자 정책 설정',
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
                    xtype: 'fieldset',
                    margin: 5,
                    width: 400,
                    title: '사용자 정보',
                    items: [
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'txf_user_policy_server_farm',
                            fieldLabel: '지역 서버팜'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'txf_user_policy_court',
                            fieldLabel: '법원'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'txf_user_policy_id',
                            fieldLabel: '아이디'
                        },
                        {
                            xtype: 'displayfield',
                            anchor: '100%',
                            id: 'txf_user_policy_name',
                            fieldLabel: '이름'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    height: 86,
                    margin: 5,
                    width: 400,
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
                                    id: 'txf_user_policy_inner',
                                    width: 320,
                                    fieldLabel: '내부 정책',
                                    readOnly: true
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
                                            fn: me.onButtonClick1,
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
                                            fn: me.onButtonClick4,
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
                                    id: 'txf_user_policy_outer',
                                    width: 320,
                                    fieldLabel: '외부 정책',
                                    readOnly: true
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
                                            fn: me.onButtonClick2,
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
                                            fn: me.onButtonClick5,
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
                                    fn: me.onButtonClick3,
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
                                    fn: me.onButtonClick,
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
                afterrender: {
                    fn: me.onWin_tmov_user_settingAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_user_settingBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_policy_select', {
            'type' : 'user_policy',
            'mode' : 'inner'
        }).show();
    },

    onButtonClick4: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_user_setting').inner_id = '';
        Ext.getCmp('txf_user_policy_inner').setValue('');
    },

    onButtonClick2: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_policy_select', {
            'type' : 'user_policy',
            'mode' : 'outer'
        }).show();
    },

    onButtonClick5: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_user_setting').outer_id = '';
        Ext.getCmp('txf_user_policy_outer').setValue('');
    },

    onButtonClick3: function(button, e, eOpts) {
        var component = Ext.getCmp('win_tmov_user_setting');

        var inner_name = Ext.getCmp('txf_user_policy_inner').getValue();
        var outer_name = Ext.getCmp('txf_user_policy_outer').getValue();

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

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/ModifyUserPolicy',
                params : {
                    _id : Ext.encode(component.item._id),
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
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_user_setting').close();
    },

    onWin_tmov_user_settingAfterRender: function(component, eOpts) {
        var item = '';

        if (component.isInner === true)
        {
            item  = Ext.getCmp('gpn_inner_user_policy').getSelectionModel().getSelection()[0].raw;
            component.item = item;
        }
        else
        {
            item  = Ext.getCmp('gpn_outer_user_policy').getSelectionModel().getSelection()[0].raw;
            component.item = item;
        }

        Ext.getCmp('txf_user_policy_inner').setValue(item.inner_policy.name);
        component.inner_id = item.inner_policy._id;

        Ext.getCmp('txf_user_policy_outer').setValue(item.outer_policy.name);
        component.outer_id = item.outer_policy._id;

        Ext.getCmp('txf_user_policy_server_farm').setValue(item.server_farm);
        Ext.getCmp('txf_user_policy_court').setValue(item.court_name);
        Ext.getCmp('txf_user_policy_id').setValue(item.userid);
        Ext.getCmp('txf_user_policy_name').setValue(item.surname);
    },

    onWin_tmov_user_settingBeforeDestroy: function(component, eOpts) {
        Ext.getStore('st_tmov_user_policy').load();
    }

});