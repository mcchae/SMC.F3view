
Ext.define('TMOV.view.win_tmov_device', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    height: 370,
    id: 'win_tmov_device',
    width: 350,
    resizable: false,
    constrainHeader: true,
    manageHeight: false,
    title: '장비 추가',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 290,
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'txt_tmov_dev_name',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '장비 이름',
                            labelWidth: 140
                        },
                        {
                            xtype: 'textfield',
                            id: 'txt_tmov_dev_ip',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: 'IP 주소',
                            labelWidth: 140
                        },
                        {
                            xtype: 'textfield',
                            id: 'txt_tmov_dev_community',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '커뮤니티',
                            labelWidth: 140
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            id: 'txt_tmov_dev_user',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '사용자 이름',
                            labelWidth: 140
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'cmb_tmov_dev_auth_pro',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '인증 프로토콜',
                            labelWidth: 140,
                            value: 'MD5',
                            emptyText: 'MD5',
                            editable: false,
                            store: [
                                'MD5',
                                'SHA'
                            ]
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            id: 'txt_tmov_dev_auth_pass',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '인증 암호',
                            labelWidth: 140
                        },
                        {
                            xtype: 'combobox',
                            hidden: true,
                            id: 'cmb_tmov_dev_pri_pro',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '프라이버시 프로토콜',
                            labelWidth: 140,
                            value: 'DES',
                            editable: false,
                            store: [
                                'DES',
                                'AES'
                            ]
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            id: 'txt_tmov_dev_pri_pass',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '프라이버시 암호',
                            labelWidth: 140
                        },
                        {
                            xtype: 'textfield',
                            hidden: true,
                            id: 'txt_tmov_dev_etc',
                            margin: '6 6 6 6',
                            width: 320,
                            fieldLabel: '기타 정보',
                            labelWidth: 140
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            id: 'btn_tmov_dev_ok',
                            width: 80,
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onBtn_tmov_dev_okClick,
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
                            id: 'btn_tmov_dev_cancel',
                            width: 80,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_deviceAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_deviceBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_tmov_dev_okClick: function(button, e, eOpts) {
        var parent = Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw;
        var name = Ext.getCmp('txt_tmov_dev_name').getValue();

        if (name === "")
        {
            Ext.MessageBox.show({ title: '장비 추가', msg: '장비 이름을 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var ip = Ext.getCmp('txt_tmov_dev_ip').getValue();
        if (ip === "")
        {
            Ext.MessageBox.show({ title: '장비 추가', msg: 'IP주소를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

        if (re.test(ip))
        {
            var parts = ip.split(".");

            for (var i = 0; i < parts.length; i++)
            {
                if (parseInt(parseFloat(parts[i]), 10) > 255)
                {
                    Ext.Msg.alert('장비 추가', 'IP주소가 올바르지 않습니다.');
                    return false;
                }
            }
        }
        else
        {
            Ext.Msg.alert('장비 추가', 'IP주소가 올바르지 않습니다.');
            return false;
        }

        var item = {
            'name' : name,
            'ip' : ip,
            'version' : 2,
            'community' : '',
            'user_name' : '',
            'auth_protocol' : '',
            'auth_password' : '',
            'priv_protocol' : '',
            'priv_password' : '',
            'parent' : parent._id,
            'state' : 0,
            'cpu' : 0,
            'memory' : 0,
            'disk' : 0,
            'process' : 0,
            'all_user' : 0,
            'cur_user' : 0,
            'all_transfer_file' : 0,
            'i_o_transfer_file' : 0,
            'o_i_transfer_file' : 0,
            'all_success_file' : 0,
            'i_o_success_file' : 0,
            'o_i_success_file' : 0,
            'all_failed_file' : 0,
            'i_o_failed_file' : 0,
            'o_i_failed_file' : 0,
            'all_daemon_service' : 0,
            'cur_daemon_service' : 0,
            'etc' : Ext.getCmp('txt_tmov_dev_etc').getValue()
        };


        var community = Ext.getCmp('txt_tmov_dev_community').getValue();
        if (community === "")
        {
            Ext.MessageBox.show({
                title: '장비 추가',
                msg: '커뮤니티를 입력하세요',
                buttons: Ext.MessageBox.OK,
                fn: function()
                {
                    return;
                },
                icon : Ext.Msg.ERROR
            });

            return;
        }

        item.community = community;

        if (Ext.getCmp('win_tmov_device').isModify === true)
        {
            item._id = Ext.getCmp('gpn_tmov_main').getSelectionModel().getSelection()[0].raw._id;

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOVMsgMgr/modify_device',
                    params : {
                        item : Ext.encode(item)
                    },
                    success : function(res_data)
                    {
                        Ext.Ajax.request(
                            {
                                url : 'api/ftTMOV/GetDevices',
                                params : {
                                    parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                                    user : Ext.encode(Ext.getCmp('main').user)
                                },
                                success : function(res_data)
                                {
                                    var resObj = JSON.parse(res_data.responseText);
                                    Ext.getStore('st_tmov_device').loadData(resObj);
                                }
                            }
                        );


                        org = Ext.getCmp('gpn_tmov_main').getSelectionModel().getSelection()[0].raw;

                        var log = '';

                        if (org.name !== name )
                        {
                            log = '장비 이름 : ' + org.name + ' -> ' + name;
                        }

                        if (org.ip !== ip)
                        {
                            if (log === '')
                            {
                                log = log + ', ';
                            }

                            log = log + 'IP 주소 : ' + org.ip + ' -> ' + ip;
                        }

                        if (org.community !== community)
                        {
                            if (log === '')
                            {
                                log = log + ', ';
                            }

                            log = log + '커뮤니티 : ' + org.community + ' -> ' + community;
                        }

                        Ext.Ajax.request(
                            {
                                url : 'api/ftTMOV/AddEventLog',
                                params : {
                                    logtype : Ext.encode('모니터'),
                                    userid : Ext.encode(Ext.getCmp('main').user['@id']),
                                    subtype : Ext.encode('수정'),
                                    content : Ext.encode(log)
                                },
                                success : function(res_data)
                                {

                                }
                            }
                        );

                        Ext.getCmp('win_tmov_device').close();
                    }
                }
            );
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftTMOVMsgMgr/add_device',
                    params : {
                        item : Ext.encode(item)
                    },
                    success : function(res_data)
                    {
                        Ext.Ajax.request(
                            {
                                url : 'api/ftTMOV/GetDevices',
                                params : {
                                    parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                                    user : Ext.encode(Ext.getCmp('main').user)
                                },
                                success : function(res_data)
                                {
                                    var resObj = JSON.parse(res_data.responseText);
                                    Ext.getStore('st_tmov_device').loadData(resObj);
                                }
                            }
                        );

                        var log = '장비 이름 : ' + name + ', IP 주소 : ' + ip + ', 커뮤니티 : ' + community;
                        Ext.Ajax.request(
                            {
                                url : 'api/ftTMOV/AddEventLog',
                                params : {
                                    logtype : Ext.encode('모니터'),
                                    userid : Ext.encode(Ext.getCmp('main').user['@id']),
                                    subtype : Ext.encode('추가'),
                                    content : Ext.encode(log)
                                },
                                success : function(res_data)
                                {

                                }
                            }
                        );

                        Ext.getCmp('win_tmov_device').close();
                    }
                }
            );
        }

    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_device').close();
    },

    onWin_tmov_deviceAfterRender: function(component, eOpts) {
        clearInterval(Ext.getCmp('pnl_tmov_main').timer);

        if (component.isModify === true)
        {
            var item = Ext.getCmp('gpn_tmov_main').getSelectionModel().getSelection()[0].raw;

            Ext.getCmp('txt_tmov_dev_name').setValue(item.name);
            Ext.getCmp('txt_tmov_dev_ip').setValue(item.ip);
            Ext.getCmp('txt_tmov_dev_etc').setValue(item.etc);
            Ext.getCmp('txt_tmov_dev_community').setValue(item.community);

        }
    },

    onWin_tmov_deviceBeforeDestroy: function(component, eOpts) {
        Ext.getCmp('pnl_tmov_main').timer_tick();
    }

});