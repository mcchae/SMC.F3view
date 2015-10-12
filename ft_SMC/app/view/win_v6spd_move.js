
Ext.define('SMC.view.win_v6spd_move', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 150,
    id: 'win_v6spd_move',
    width: 400,
    bodyPadding: 10,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            id: 'lb_start'
                        },
                        {
                            xtype: 'textfield',
                            id: 'ft_num',
                            margin: '0 5',
                            width: 100,
                            labelSeparator: ' '
                        },
                        {
                            xtype: 'label',
                            id: 'lb_end'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '20 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margin: '0 5 0 0',
                            width: 100,
                            text: '정책 이동',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            width: 100,
                            text: '정책 복사',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_nat_moveAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;

        var _params = {
            basename : Ext.encode('firewall_filter_ipv6'),
            obj : Ext.encode({'@uid': me.uid,'@num':parseInt(Ext.getCmp('ft_num').getValue())}),
            id_info : Ext.encode({'fieldname':'@uid'}),
            num_info : Ext.encode({'fieldname':'@num'}),
            update : Ext.encode(true)
        };



        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setPolicy',
            _params,
            function(response){

                 var _store = Ext.data.StoreManager.lookup('store_spd_ipv6_list');
                 _store.load();

                 me.close();

            }
        );



    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var _params = {
            basename : Ext.encode('firewall_filter_ipv6'),
            id_info : Ext.encode({'fieldname':'@uid', 'value':me.uid}),
            num_info : Ext.encode({'fieldname':'@num', 'value':parseInt(Ext.getCmp('ft_num').getValue())}),
            update : Ext.encode(true)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'copyPolicy',
            _params,
            function(response){

                 var _store = Ext.data.StoreManager.lookup('store_spd_ipv6_list');
                 _store.load();

                 me.close();

            }
        );



    },

    onWin_nat_moveAfterRender: function(component, eOpts) {
        var me = this;

        Ext.getCmp('lb_start').setText(me.num+'번 정책을');

        Ext.getCmp('lb_end').setText('(1~'+me.total+')번 정책의 위로');

        Ext.getCmp('ft_num').setValue(me.num);
    }

});