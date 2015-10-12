
Ext.define('TMOV.view.win_tmov_server_list', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Display',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    border: false,
    height: 353,
    id: 'win_tmov_server_list',
    padding: '',
    width: 650,
    constrainHeader: true,
    title: '서버팜 설정',
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
                    title: '서버팜 설정',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: 5
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'txt_server_name',
                                    fieldLabel: '서버팜 이름',
                                    labelAlign: 'right',
                                    labelPad: 10
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: 5
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margin: '0 5 0 0',
                                    title: '내부자료 연계서버 주소',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'txt_server_main_inner_ip',
                                            fieldLabel: '주 서버',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' '
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txt_server_sub_inner_ip',
                                            fieldLabel: '보조 서버',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' '
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margin: '0 0 0 5',
                                    title: '외부자료 연계서버 주소',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'txt_server_main_outer_ip',
                                            fieldLabel: '주 서버',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' '
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txt_server_sub_outer_ip',
                                            fieldLabel: '보조 서버',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' '
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    margin: 5,
                    title: '정책 설정',
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: 5
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txt_inner_policy',
                                    fieldLabel: '내부 정책',
                                    labelAlign: 'right',
                                    labelPad: 10,
                                    labelSeparator: ' ',
                                    readOnly: true
                                },
                                {
                                    xtype: 'button',
                                    id: 'bt_select_inner_policy',
                                    margin: '0 0 0 10',
                                    width: 80,
                                    text: '선택',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_select_inner_policyClick,
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
                                    id: 'btn_delete_inner_policy',
                                    width: 80,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_delete_inner_policyClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            margin: '0 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: 5
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txt_outer_policy',
                                    fieldLabel: '외부 정책',
                                    labelAlign: 'right',
                                    labelPad: 10,
                                    labelSeparator: ' ',
                                    readOnly: true
                                },
                                {
                                    xtype: 'button',
                                    id: 'bt_select_outer_policy',
                                    margin: '0 0 0 10',
                                    width: 80,
                                    text: '선택',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_select_outer_policyClick,
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
                                    id: 'btn_delete_outer_policy',
                                    width: 80,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_delete_outer_policyClick,
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
                    flex: 1,
                    border: false,
                    padding: '10 10 0 10'
                },
                {
                    xtype: 'container',
                    width: 600,
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            id: 'bt_save_server_list',
                            width: 80,
                            text: '저장',
                            listeners: {
                                click: {
                                    fn: me.onBt_save_server_listClick,
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
                            id: 'bt_cancel_server_list',
                            width: 80,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onBt_cancel_server_listClick,
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
                    fn: me.onWin_tmov_server_listAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_server_listBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_select_inner_policyClick: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_policy_select', {
            'type' : 'server_farm',
            'mode' : 'inner'
        }).show();
    },

    onBtn_delete_inner_policyClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_server_list').inner_id = '';
        Ext.getCmp('txt_inner_policy').setValue('');
    },

    onBt_select_outer_policyClick: function(button, e, eOpts) {
        Ext.create('TMOV.view.win_tmov_policy_select', {
            'type' : 'server_farm',
            'mode' : 'outer'
        }).show();
    },

    onBtn_delete_outer_policyClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_server_list').outer_id = '';
        Ext.getCmp('txt_outer_policy').setValue('');
    },

    onBt_save_server_listClick: function(button, e, eOpts) {
        var parent = Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw;

        //서버팜 설정
        var name = Ext.getCmp('txt_server_name').getValue();
        var main_inner_ip = Ext.getCmp('txt_server_main_inner_ip').getValue();
        var sub_inner_ip = Ext.getCmp('txt_server_sub_inner_ip').getValue();
        var main_outer_ip = Ext.getCmp('txt_server_main_outer_ip').getValue();
        var sub_outer_ip = Ext.getCmp('txt_server_sub_outer_ip').getValue();

        var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

        if (re.test(main_inner_ip))
        {
            var parts = main_inner_ip.split(".");

            for (var i = 0; i < parts.length; i++)
            {
                if (parseInt(parseFloat(parts[i]), 10) > 255)
                {
                    Ext.Msg.alert('서버 설정', '내부자료 연계 주 서버 IP주소가 올바르지 않습니다.');
                    return false;
                }
            }
        }
        else
        {
            Ext.Msg.alert('서버 설정', '내부자료 연계 주 서버 IP주소가 올바르지 않습니다.');
            return false;
        }


        if (re.test(main_outer_ip))
        {
            var parts = main_outer_ip.split(".");

            for (var i = 0; i < parts.length; i++)
            {
                if (parseInt(parseFloat(parts[i]), 10) > 255)
                {
                    Ext.Msg.alert('서버 설정', '외부자료 연계 주 서버 IP주소가 올바르지 않습니다.');
                    return false;
                }
            }
        }
        else
        {
            Ext.Msg.alert('서버 설정', '외부자료 연계 주 서버 IP주소가 올바르지 않습니다.');
            return false;
        }


        if (sub_inner_ip !== '')
        {
            if (re.test(sub_inner_ip))
            {
                var parts = sub_inner_ip.split(".");

                for (var i = 0; i < parts.length; i++)
                {
                    if (parseInt(parseFloat(parts[i]), 10) > 255)
                    {
                        Ext.Msg.alert('서버 설정', '내부자료 연계 보조 서버 IP주소가 올바르지 않습니다.');
                        return false;
                    }
                }
            }
            else
            {
                Ext.Msg.alert('서버 설정', '내부자료 연계 보조 서버 IP주소가 올바르지 않습니다.');
                return false;
            }
        }

        if (sub_outer_ip !== '')
        {
            if (re.test(sub_outer_ip))
            {
                var parts = sub_outer_ip.split(".");

                for (var i = 0; i < parts.length; i++)
                {
                    if (parseInt(parseFloat(parts[i]), 10) > 255)
                    {
                        Ext.Msg.alert('서버 설정', '외부자료 연계 보조 서버 IP주소가 올바르지 않습니다.');
                        return false;
                    }
                }
            }
            else
            {
                Ext.Msg.alert('서버 설정', '외부자료 연계 보조 서버 IP주소가 올바르지 않습니다.');
                return false;
            }
        }


        //정책 설정

        var inner_policy = {'name' : '', '_id' : ''};

        if (Ext.getCmp('win_tmov_server_list').inner_id !== undefined)
        {
            inner_policy = {'name' : Ext.getCmp('txt_inner_policy').getValue(), '_id' : Ext.getCmp('win_tmov_server_list').inner_id};
        }

        var outer_policy = {'name' : '', '_id' : ''};

        if (Ext.getCmp('win_tmov_server_list').outer_id !== undefined)
        {
            var outer_policy = {'name' : Ext.getCmp('txt_outer_policy').getValue(), '_id' : Ext.getCmp('win_tmov_server_list').outer_id};
        }

        var component = Ext.getCmp('win_tmov_server_list');
        var item = '';

        if (component.isInner === true)
        {
            item = Ext.getCmp('gpn_tmov_inner_server_farm').getSelectionModel().getSelection()[0].raw;
        }
        else
        {
            item = Ext.getCmp('gpn_tmov_outer_server_farm').getSelectionModel().getSelection()[0].raw;
        }

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/ModifyServerList',
                params : {
                    _id : Ext.encode(item._id),
                    name : Ext.encode(name),
                    main_inner_ip : Ext.encode(main_inner_ip),
                    sub_inner_ip : Ext.encode(sub_inner_ip),
                    main_outer_ip : Ext.encode(main_outer_ip),
                    sub_outer_ip : Ext.encode(sub_outer_ip),
                    inner_policy : Ext.encode(inner_policy),
                    outer_policy : Ext.encode(outer_policy),
                    userid : Ext.encode(Ext.getCmp('main').user['@id'])
                },
                success : function(res_data)
                {
                    Ext.getCmp('win_tmov_server_list').close();
                }
            }
        );
    },

    onBt_cancel_server_listClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_server_list').close();
    },

    onWin_tmov_server_listAfterRender: function(component, eOpts) {
        var item = '';

        if (component.isInner === true)
        {
            item = Ext.getCmp('gpn_tmov_inner_server_farm').getSelectionModel().getSelection()[0].raw;

        }
        else
        {
            item = Ext.getCmp('gpn_tmov_outer_server_farm').getSelectionModel().getSelection()[0].raw;
        }

        Ext.getCmp('txt_server_name').setValue(item.name);

        Ext.getCmp('txt_server_main_inner_ip').setValue(item.main_inner_ip);
        Ext.getCmp('txt_server_sub_inner_ip').setValue(item.sub_inner_ip);
        Ext.getCmp('txt_server_main_outer_ip').setValue(item.main_outer_ip);
        Ext.getCmp('txt_server_sub_outer_ip').setValue(item.sub_outer_ip);

        Ext.getCmp('txt_inner_policy').setValue(item.inner_policy.name);
        Ext.getCmp('txt_outer_policy').setValue(item.outer_policy.name);

        component.inner_id = item.inner_policy._id;
        component.outer_id = item.outer_policy._id;
    },

    onWin_tmov_server_listBeforeDestroy: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetServerList',
                params : {
                    parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                    user : Ext.encode(Ext.getCmp('main').user)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_server_list').loadData(resObj);
                }
            }
        );
    }

});