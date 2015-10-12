
Ext.define('SMC4ZEN.view.win_policy_spd_add', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_policy_spd_add',

    requires: [
        'SMC4ZEN.view.win_policy_spd_addViewModel',
        'SMC4ZEN.view.win_policy_spd_addViewController',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    controller: 'win_policy_spd_add',
    viewModel: {
        type: 'win_policy_spd_add'
    },
    id: 'win_policy_spd_add',
    width: 350,
    bodyPadding: 5,
    title: '보안정책 등록',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            itemId: 'ctn_policy_addmesg',
            margin: '10, 0, 0, 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'xtm_policy_addmesg',
                    text: '추가할 보안정책 이름을 입력하세요.'
                }
            ]
        },
        {
            xtype: 'textfield',
            reference: 'xtm_policy_name',
            itemId: 'txt_policy_name',
            margin: '20 20 20 20',
            width: 296
        },
        {
            xtype: 'container',
            itemId: 'ctn_policy_addctrl',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_add',
                    margin: '0, 5, 0, 0',
                    width: 100,
                    text: '정책 추가',
                    listeners: {
                        click: 'onBt_addClick'
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
        afterrender: 'onWin_policy_spd_addAfterRender'
    }

});