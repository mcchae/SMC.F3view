
Ext.define('SSL.view.win_ssl_ipv6header', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    height: 352,
    id: 'win_ssl_ipv6header',
    width: 790,
    autoScroll: true,
    title: 'IPv6 헤더 목록',
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
                                    labelWidth: 120,
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
                                    labelWidth: 120,
                                    enforceMaxLength: true,
                                    maxLength: 127
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'fragment',
                                    fieldLabel: '프래그먼트 헤더',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'route',
                                    fieldLabel: '라우팅 헤더',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'hop',
                                    fieldLabel: '홉바이홉 헤더',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'dest',
                                    fieldLabel: '목적지 옵션 헤더',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ah',
                                    fieldLabel: '인증 헤더',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'esp',
                                    fieldLabel: 'ESP 헤더',
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'container',
                                    height: 10
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
        var component = Ext.getCmp('win_ssl_ipv6header');
        var name = component.getComponent('fm').getComponent('ctn').getComponent('name').getValue();
        var desc = component.getComponent('fm').getComponent('ctn').getComponent('desc').getValue();
        var ah = component.getComponent('fm').getComponent('ctn').getComponent('ah').getValue();
        var esp = component.getComponent('fm').getComponent('ctn').getComponent('esp').getValue();
        var hop = component.getComponent('fm').getComponent('ctn').getComponent('hop').getValue();
        var dest = component.getComponent('fm').getComponent('ctn').getComponent('dest').getValue();
        var route = component.getComponent('fm').getComponent('ctn').getComponent('route').getValue();
        var fragment = component.getComponent('fm').getComponent('ctn').getComponent('fragment').getValue();


        var header = 'kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.addIpv6Header';
        var body = {'num':0, 'name':name, 'desc' : desc, 'ip': [], 'ah' : ah, 'esp' : esp, 'hop' : hop, 'dest' : dest, 'fragment' : {'size' : 0, 'use' : fragment}, 'route' : {'cid' : '', 'name' : '', 'use' : route} };


        if (component.isNew === false)
        {
            var raw = Ext.getCmp('win_ssl_address').getComponent('tabControl').getComponent('ipv6_header').getComponent('grid').getSelectionModel().getSelection()[0].raw;
            body.cid = raw.cid;
            body.num = raw.num;
            header = 'kr.co.future.frodo.xtmconf.msgbus.ObjectPlugin.modifyIpv6Header';
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
                    component.destroy();
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
            var item = win_ssl_address.getComponent('tabControl').getComponent('ipv6_header').getComponent('grid').getSelectionModel().getSelection()[0].raw;

            component.getComponent('fm').getComponent('ctn').getComponent('name').setValue(item.name);
            component.getComponent('fm').getComponent('ctn').getComponent('fragment').setValue(item.fragment.use);
            component.getComponent('fm').getComponent('ctn').getComponent('route').setValue(item.route.use);
            component.getComponent('fm').getComponent('ctn').getComponent('desc').setValue(item.desc);
            component.getComponent('fm').getComponent('ctn').getComponent('hop').setValue(item.hop);
            component.getComponent('fm').getComponent('ctn').getComponent('dest').setValue(item.dest);
            component.getComponent('fm').getComponent('ctn').getComponent('ah').setValue(item.ah);
            component.getComponent('fm').getComponent('ctn').getComponent('esp').setValue(item.esp);
        }
    }

});