
Ext.define('SMC4ZEN.view.win_policy_del_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_policy_del_group',

    requires: [
        'SMC4ZEN.view.win_policy_del_groupViewModel',
        'SMC4ZEN.view.win_policy_del_groupViewController',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    controller: 'win_policy_del_group',
    viewModel: {
        type: 'win_policy_del_group'
    },
    id: 'dlg_del_group',
    width: 354,
    bodyPadding: 5,
    title: '그룹 삭제',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_policy_groupmesg',
            margin: '10 0 10 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'zen_group_mesg',
                    text: '그룹을 삭제 하시겠습니까?'
                }
            ]
        },
        {
            xtype: 'container',
            height: 31,
            itemId: 'ctn_policy_delgroup',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_del',
                    margin: '0, 5, 0, 0',
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
                    text: '취소',
                    listeners: {
                        click: 'onBt_closeClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onDlg_del_groupAfterRender'
    }

});