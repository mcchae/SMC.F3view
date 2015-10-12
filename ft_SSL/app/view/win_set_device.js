
Ext.define('SSL.view.win_set_device', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_set_device',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 256,
    id: 'win_set_device',
    width: 400,
    title: '장비 추가',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'fds_device',
                    margin: '10 10 10 10',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue;

                                retValue = CheckNotNull(value);

                                if(!retValue)	return lang.invalid_name_null;

                                return true;
                            },
                            anchor: '100%',
                            itemId: 'tfd_name',
                            margin: '10 0 10 0',
                            fieldLabel: '장비명',
                            labelWidth: 140
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                retValue = CheckNotNull(value);

                                if(!retValue)	return lang.invalid_ip_null;

                                retValue = validIPForm(value, 'v4');

                                if(!retValue)	return lang.invalid_ip;

                                return true;
                            },
                            anchor: '100%',
                            itemId: 'tfd_ip',
                            margin: '0 0 10 0',
                            fieldLabel: '장비 IP',
                            labelWidth: 140,
                            validateBlank: true
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue;

                                retValue = CheckNotNull(value);

                                if(!retValue)	return lang.invalid_id_null;

                                return true;
                            },
                            anchor: '100%',
                            itemId: 'tfd_id',
                            margin: '0 0 10 0',
                            fieldLabel: '관리자 계정',
                            labelWidth: 140,
                            validateBlank: true
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var retValue;

                                retValue = CheckNotNull(value);

                                if(!retValue)	return lang.invalid_pw_null;

                                return true;
                            },
                            anchor: '100%',
                            itemId: 'tfd_pw',
                            margin: '0 0 10 0',
                            fieldLabel: '관리자 계정 패스워드',
                            labelWidth: 140,
                            validateBlank: true
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_btn2',
                    margin: '20 10 10 10',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'btn_add',
                            margin: '0 10 0 10',
                            width: 80,
                            text: '확인',
                            listeners: {
                                click: {
                                    fn: me.onBtn_addClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'btn_cancel',
                            width: 80,
                            text: '취소',
                            listeners: {
                                click: {
                                    fn: me.onBtn_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_set_deviceBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_addClick: function(button, e, eOpts) {
        var component = Ext.getCmp('win_set_device');
        var fds_device = component.getComponent('fds_device');
        var name = fds_device.getComponent('tfd_name').getValue();
        var ip = fds_device.getComponent('tfd_ip').getValue();
        var id = fds_device.getComponent('tfd_id').getValue();
        var pwd = fds_device.getComponent('tfd_pw').getValue();

        var treeComponent = Ext.getCmp('tpn_ssl_tree').getSelectionModel().getSelection()[0];
        var grid = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];
        var data = {};

        Ext.Ajax.request(
            {
                url : 'api/ftSSL/CheckOverlapDevice',
                params : {
                    'ip' : Ext.encode(ip)
                },
                success : function(res_data)
                {
                    if(res_data.responseText === 'false')
                    {
                        if (component.isModify === false)
                        {
                            var parent = treeComponent.raw._id;

                            Ext.Ajax.request(
                                {
                                    url : 'api/ftSSLMsgMgr/add_device',
                                    params : {
                                        'parent' : Ext.encode(parent),
                                        'name' : Ext.encode(name),
                                        'ip' : Ext.encode(ip),
                                        'admin_id' : Ext.encode(id),
                                        'admin_pw' : Ext.encode(pwd)
                                    },
                                    success : function(res_data)
                                    {
                                        Ext.getCmp('win_set_device').close();
                                    }
                                }
                            );

                        }
                        else
                        {
                            if (grid === undefined) return;

                            data = {'_id' : grid.raw._id,
                                    'admin_id' : id,
                                    'admin_pw' : pwd,
                                    'ip' : ip,
                                    'name' : name};

                            Ext.Ajax.request(
                                {
                                    url : 'api/ftSSLMsgMgr/modify_device',
                                    params : {
                                        'item' : Ext.encode(data)
                                    },
                                    success : function(res_data)
                                    {
                                        Ext.getCmp('win_set_device').close();
                                    }
                                }
                            );
                        }

                    }
                    else
                    {
                        if (grid === undefined)
                        {
                            Ext.Msg.show({
                                title : lang.title_add_device,
                                msg : lang.invalid_same_ip,
                                buttons : Ext.Msg.OK,
                                icon : Ext.Msg.ERROR
                            });
                        }

                        if (grid.raw.ip === ip)
                        {
                            data = {'_id' : grid.raw._id,
                                    'admin_id' : id,
                                    'admin_pw' : pwd,
                                    'ip' : ip,
                                    'name' : name};

                            Ext.Ajax.request(
                                {
                                    url : 'api/ftSSLMsgMgr/modify_device',
                                    params : {
                                        'item' : Ext.encode(data)
                                    },
                                    success : function(res_data)
                                    {
                                        Ext.getCmp('win_set_device').close();
                                    }
                                }
                            );
                        }
                        else
                        {
                            Ext.Msg.show({
                                title : lang.title_add_device,
                                msg : lang.invalid_same_ip,
                                buttons : Ext.Msg.OK,
                                icon : Ext.Msg.ERROR
                            });
                        }
                    }
                }
            }
        );
    },

    onBtn_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_set_device').close();

    },

    onWindowAfterRender: function(component, eOpts) {
        if (component.isModify === true)
        {
            component.setTitle("장비 수정");

            var item = Ext.getCmp('gpn_ssl_devices').getSelectionModel().getSelection()[0];

            if (item === undefined)
                return;

            component.getComponent('fds_device').getComponent('tfd_name').setValue(item.raw.name);
            component.getComponent('fds_device').getComponent('tfd_ip').setValue(item.raw.ip);
            component.getComponent('fds_device').getComponent('tfd_id').setValue(item.raw.admin_id);
        }
    },

    onWin_set_deviceBeforeDestroy: function(component, eOpts) {
        var pnl = Ext.getCmp('pnl_ssl_devices');
        pnl.startTimer();
    }

});