
Ext.define('SMC4ZEN.view.win_policy_spd_modify', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_policy_spd_modify',

    requires: [
        'SMC4ZEN.view.win_policy_spd_modifyViewModel',
        'SMC4ZEN.view.win_policy_spd_modifyViewController',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    controller: 'win_policy_spd_modify',
    viewModel: {
        type: 'win_policy_spd_modify'
    },
    height: 176,
    id: 'dlg_modify_spd',
    width: 354,
    bodyPadding: 5,
    title: '보안정책 수정',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            height: 20,
            itemId: 'ctn_policy_mesg',
            margin: '10, 0, 0, 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'xtm_policy_modmesg',
                    text: '수정할 보안정책 이름을 입력하세요.'
                }
            ]
        },
        {
            xtype: 'textfield',
            reference: 'xtm_policy_name',
            itemId: 'txt_policy_mod_name',
            margin: '20 20 20 20',
            width: 296
        },
        {
            xtype: 'container',
            flex: 1,
            height: 20,
            itemId: 'ctn_policy_modctrl',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_mod',
                    margin: '0, 5, 0, 0',
                    width: 100,
                    text: '정책 수정',
                    listeners: {
                        click: 'onBt_modClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_close',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: 'onBt_closeClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onDlg_modify_spdAfterRender'
    }

});