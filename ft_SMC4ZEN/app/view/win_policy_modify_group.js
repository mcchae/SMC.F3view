
Ext.define('SMC4ZEN.view.win_policy_modify_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_policy_modify_group',

    requires: [
        'SMC4ZEN.view.win_policy_modify_groupViewModel',
        'SMC4ZEN.view.win_policy_modify_groupViewController',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    controller: 'win_policy_modify_group',
    viewModel: {
        type: 'win_policy_modify_group'
    },
    height: 176,
    id: 'dlg_modify_group',
    width: 354,
    title: '그룹 수정',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'center'
    },
    items: [
        {
            xtype: 'container',
            height: 20,
            margin: '10 0 0 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    reference: 'zen_policy_mesg',
                    text: '수정할 그룹 이름을 입력하세요'
                }
            ]
        },
        {
            xtype: 'textfield',
            reference: 'zen_policy_groupname',
            itemId: 'txt_grp_mod_name',
            margin: '20 20 20 20',
            width: 296
        },
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_policy_groupmodctrl',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_mod',
                    margin: '0 5 0 0',
                    width: 100,
                    text: '그룹 수정',
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
        afterrender: 'onDlg_modify_groupAfterRender'
    }

});