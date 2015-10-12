
Ext.define('SMC4ZEN.view.win_smc_spdgroup_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_smc_spdgroup_set',

    requires: [
        'SMC4ZEN.view.win_smc_spdgroup_setViewModel',
        'SMC4ZEN.view.win_smc_spdgroup_setViewController',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    controller: 'win_smc_spdgroup_set',
    viewModel: {
        type: 'win_zen_group_set'
    },
    constrain: true,
    border: false,
    height: 150,
    id: 'win_smc_spdgroup_set',
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
                    reference: 'zen_commspd_groupname',
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
        beforerender: {
            fn: 'onWin_smc_spdgroup_setBeforeRender',
            scope: 'controller'
        }
    },

    onTxf_groupnameBlur: function(component, event, eOpts) {
        // onTxf_groupnameBlur ===========================================================================================================================================================
        //
        // 일시 : 2014.10.14
        //
        // 설명 : 타이머로 인해 포커스를 잃을 경우 포커스를 재설정합니다.
        //
        // ===============================================================================================================================================================================

        component.focus();
    }

});