
Ext.define('SMC4ZEN.view.win_smc_zengroup_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_smc_zengroup_set',

    requires: [
        'SMC4ZEN.view.win_smc_zengroup_setViewModel',
        'SMC4ZEN.view.win_smc_zengroup_setViewController',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    controller: 'win_zen_group_set',
    viewModel: {
        type: 'win_zen_group_set'
    },
    constrain: true,
    border: false,
    height: 150,
    id: 'win_smc_zengroup_set',
    padding: 10,
    width: 350,
    title: '그룹 정보 설정',
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 0.8,
            itemId: 'ctn_groupname',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'textfield',
                    flex: 1,
                    reference: 'zen_dev_groupname',
                    itemId: 'txf_groupname',
                    fieldLabel: '그룹명 입력',
                    listeners: {
                        blur: 'onTxf_groupnameBlur'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            flex: 0.3,
            itemId: 'ctn_control',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_add',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '확 인',
                    listeners: {
                        click: {
                            fn: 'onBt_addClick',
                            scope: 'controller'
                        }
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_cancel',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: {
                            fn: 'onBt_cancelClick',
                            scope: 'controller'
                        }
                    }
                }
            ]
        }
    ],
    listeners: {
        render: 'onWin_zen_group_setRender'
    },

    onTxf_groupnameBlur: function(component, event, eOpts) {
        component.focus();
    },

    onWin_zen_group_setRender: function(component, eOpts) {
        component.setTitle(SMC_SET_PRODUCT);
    }

});