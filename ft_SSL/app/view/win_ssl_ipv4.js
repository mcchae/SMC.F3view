
Ext.define('SSL.view.win_ssl_ipv4', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    height: 232,
    id: 'win_ssl_ipv4',
    width: 790,
    autoScroll: true,
    title: 'IPv4주소',
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
                    xtype: 'form',
                    flex: 1,
                    itemId: 'fm',
                    autoScroll: true,
                    bodyPadding: 10,
                    title: '',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn',
                            minWidth: 750,
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'name',
                                    width: 500,
                                    fieldLabel: '객체 이름',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'desc',
                                    width: 500,
                                    fieldLabel: '설명',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'ip',
                                    width: 750,
                                    fieldLabel: 'IPv4 주소',
                                    labelCls: 'lb_sq',
                                    labelSeparator: ' ',
                                    enforceMaxLength: true,
                                    maxLength: 255
                                },
                                {
                                    xtype: 'container',
                                    height: 10
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'lb_info',
                                            text: 'IP 객체 입력방법 : 여러개의 객체를 "," 구분하여 입력할 수 있습니다.'
                                        },
                                        {
                                            xtype: 'label',
                                            flex: 1,
                                            cls: 'lb_info',
                                            text: 'IP 객체 입력형태 ex) Single:1.1.1.1 Range:1.1.1.1-1.1.1.5 Mask:1.1.1.1/255.255.0.0 Prefix:1.1.1.1/32'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 15,
                                    items: [
                                        {
                                            xtype: 'label',
                                            cls: 'errorBox',
                                            hidden: true,
                                            id: 'errorBox'
                                        }
                                    ]
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
                                            width: 100,
                                            text: '확인',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '0 0 0 5',
                                            width: 100,
                                            text: '취소',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
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
            ],
            listeners: {
                afterrender: {
                    fn: me.onWindowAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick1: function(button, e, eOpts) {
        var component = Ext.getCmp('win_ssl_ipv4');
        var name = component.getComponent('fm').getComponent('ctn').getComponent('name').getValue();
        var desc = component.getComponent('fm').getComponent('ctn').getComponent('desc').getValue();
        var ip = component.getComponent('fm').getComponent('ctn').getComponent('ip').getValue();
        var ip_list = ip.split(',');

        var header = 'kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.addIpAddress';
        var body = {'num':0, 'name':name, 'desc' : desc, 'ip': []};

        if (ip.search(',') === -1)
        {
            body.ip.push(ip);
        }
        else
        {
            body.ip = ip_list;
        }

        if (component.isNew === false)
        {
            var raw = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv4').getComponent('grid').getSelectionModel().getSelection()[0].raw;
            body.cid = raw.cid;
            body.num = raw.num;
            header = 'kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.modifyIpAddress';
        }

        var _id = Ext.getCmp('pnl_ssl_devices').getComponent('ctn_grid').getComponent('gpn_ssl_devices').getSelectionModel().getSelection()[0].raw._id;

        Ext.Ajax.request(
            {
                url : 'api/ftSSLMsgMgr/sendto',
                params :
                {
                    _id : Ext.encode(_id),
                    header : Ext.encode(header),
                    body : Ext.encode(body)
                },
                success : function(res_data)
                {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftSSLMsgMgr/sendto',
                            params :
                            {
                                _id : Ext.encode(_id),
                                header : Ext.encode('kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.getIpAddress'),
                                body : Ext.encode({})
                            },
                            success : function(res_data)
                            {
                                var item = JSON.parse(res_data.responseText);
                                Ext.getStore('st_ssl_ipv4').loadData(item[1].config);
                                component.destroy();
                            }
                        });
                }
            });
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    onWindowAfterRender: function(component, eOpts) {
        if(component.isNew === false)
        {
            var win_ssl_address = Ext.getCmp('win_ssl_address');
            var item = win_ssl_address.getComponent('tabControl').getComponent('ipv4').getComponent('grid').getSelectionModel().getSelection()[0].raw;

            component.getComponent('fm').getComponent('ctn').getComponent('name').setValue(item.name);
            component.getComponent('fm').getComponent('ctn').getComponent('desc').setValue(item.desc);

            var result = [];

            for (var i in item.ip)
            {
                result.push(item.ip[i].value);
            }

            component.getComponent('fm').getComponent('ctn').getComponent('ip').setValue(result);
        }
    }

});