
Ext.define('SMC.view.MyWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.test',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    height: 443,
    width: 769,
    title: 'My Window',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    height: 505,
                    itemId: 'ctn_smc_loginview',
                    width: 1046,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1.4,
                            itemId: 'ctn_smc_margintop'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_smc_loginitems',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_smc_marginleft'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_smc_logincenter',
                                    layout: {
                                        type: 'vbox',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_id',
                                            margin: '0, 0, 15, 0',
                                            width: 248,
                                            fieldLabel: '아이디',
                                            labelWidth: 80
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_pw',
                                            margin: '0, 0, 15, 0',
                                            width: 248,
                                            fieldLabel: '비밀번호',
                                            labelWidth: 80,
                                            inputType: 'password'
                                        },
                                        {
                                            xtype: 'button',
                                            baseCls: '',
                                            cls: 'smc_login_button',
                                            height: 31,
                                            itemId: 'bt_login',
                                            margin: '0, 0, 0, 84',
                                            width: 165,
                                            text: '',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_loginClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_smc_marginright'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_smc_marginbott'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onBt_loginClick: function(button, e, eOpts) {
        // onBt_loginClick =====================================================================================================================================================================
        //
        // 일 시 : 2015.07.08
        //
        // 설 명 : execute_login 함수를 호출합니다.
        //
        // =====================================================================================================================================================================================

        this.execute_login();
    }

});