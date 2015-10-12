
Ext.define('TMOV.view.win_tmov_user_policy', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.Display',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    height: 300,
    id: 'win_tmov_user_policy',
    width: 421,
    title: '사용자 정책',

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
                    height: 220,
                    padding: 10,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'txf_user_group',
                            padding: '0 0 5 0',
                            fieldLabel: '지역 서버팜',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'displayfield',
                            id: 'txf_user_court',
                            padding: '0 0 5 0',
                            fieldLabel: '법원',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'displayfield',
                            id: 'txf_user_id',
                            padding: '0 0 5 0',
                            fieldLabel: '사용자 ID',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'displayfield',
                            id: 'txf_user_name',
                            padding: '0 0 5 0',
                            fieldLabel: '이름',
                            labelAlign: 'right'
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'chk_user_each_apply',
                            padding: '0 0 5 0',
                            fieldLabel: '개별 적용 여부',
                            labelAlign: 'right',
                            listeners: {
                                change: {
                                    fn: me.onChk_user_each_applyChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'ctn_user_policy',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: '0 0 5 0'
                            },
                            items: [
                                {
                                    xtype: 'displayfield',
                                    flex: 1,
                                    fieldLabel: '정책',
                                    labelAlign: 'right'
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 0 0 10',
                                    width: 80,
                                    text: '선택'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: 5,
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            width: 80,
                            text: '저장'
                        },
                        {
                            xtype: 'button',
                            margin: '0 0 0 10',
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
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_user_policyAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onChk_user_each_applyChange: function(field, newValue, oldValue, eOpts) {
        if (newValue === true)
        {
            Ext.getCmp('ctn_user_policy').show();
        }
        else
        {
            Ext.getCmp('ctn_user_policy').setVisible(false);
        }
    },

    onWin_tmov_user_policyAfterRender: function(component, eOpts) {
        var item = component.item;

        Ext.getCmp('txf_user_group').setValue(item.location);
        Ext.getCmp('txf_user_court').setValue(item.court);
        Ext.getCmp('txf_user_id').setValue(item.user_id);
        Ext.getCmp('txf_user_name').setValue(item.name);
        Ext.getCmp('chk_user_each_apply').setValue(item.each_apply);


    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_user_policy').close();
    }

});