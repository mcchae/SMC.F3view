
Ext.define('SMC4ZEN.view.win_policy_spd_del', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_policy_spd_del',

    requires: [
        'SMC4ZEN.view.win_policy_spd_delViewModel',
        'SMC4ZEN.view.win_policy_spd_delViewController',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    controller: 'win_policy_spd_del',
    viewModel: {
        type: 'win_policy_spd_del'
    },
    height: 150,
    id: 'dlg_del_spd',
    width: 350,
    bodyPadding: 5,
    title: '보안정책 삭제',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            height: 20,
            itemId: 'ctn_policy_errmsg',
            margin: '0, 0, 5, 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    text: '선택한 보안 정책을 삭제 하시겠습니까?'
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'ctn_policy_delctrl',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_del',
                    margin: '0, 10, 0, 0',
                    width: 100,
                    text: '삭 제',
                    listeners: {
                        click: 'onBt_delClick'
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
        afterrender: 'onDlg_del_spdAfterRender'
    }

});