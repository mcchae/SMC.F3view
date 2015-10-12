
Ext.define('SMC4ZEN.view.win_policy_add_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_policy_add_group',

    requires: [
        'SMC4ZEN.view.win_policy_add_groupViewModel',
        'SMC4ZEN.view.win_policy_add_groupViewController',
        'Ext.container.Container',
        'Ext.form.Label',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    controller: 'win_policy_add_group',
    viewModel: {
        type: 'win_policy_add_group'
    },
    id: 'dlg_add_group',
    width: 354,
    bodyPadding: 5,
    title: '그룹 등록',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_policy_mesg',
            margin: '10 0 0 0 ',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    text: '추가할 정책그룹의 이름을 입력하세요'
                }
            ]
        },
        {
            xtype: 'textfield',
            reference: 'zen_group_name',
            itemId: 'txt_grp_name',
            margin: '20 20 20 20',
            width: 296,
            listeners: {
                specialkey: 'onTxt_grp_nameSpecialkey'
            }
        },
        {
            xtype: 'container',
            itemId: 'ctn_policy_addgroupctrl',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    reference: 'zen_bt_addgroup',
                    itemId: 'bt_add',
                    margin: '0, 5, 0, 0',
                    width: 100,
                    text: '그룹 추가',
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
    ]

});