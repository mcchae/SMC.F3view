
Ext.define('SMC4ZEN.view.pnl_setting_audit_backup', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_audit_backup',

    requires: [
        'SMC4ZEN.view.pnl_setting_audit_backupViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_setting_audit_backup'
    },
    id: 'pnl_setting_audit_backup',
    scrollable: true,
    layout: 'vbox',
    bodyPadding: 20,
    title: '감사 데이터',

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fs_audit_backup',
            title: '<label><input type="checkbox"/>감사 로그 자동 백업 사용</label>',
            items: [
                {
                    xtype: 'container',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'combobox',
                            margin: 6,
                            width: 310,
                            fieldLabel: '주기 (일)',
                            labelWidth: 120,
                            editable: false
                        },
                        {
                            xtype: 'combobox',
                            margin: 6,
                            width: 295,
                            fieldLabel: '시간',
                            labelAlign: 'right',
                            editable: false
                        }
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'table',
                    items: [
                        {
                            xtype: 'textfield',
                            margin: '0 3 0 6',
                            width: 415,
                            fieldLabel: '백업 경로',
                            labelWidth: 120
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {

                            },
                            margin: 6,
                            maxWidth: 100,
                            width: 90,
                            text: '백업 하기'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {

                            },
                            margin: 6,
                            maxWidth: 100,
                            width: 90,
                            text: '복원 하기'
                        }
                    ]
                }
            ]
        }
    ]

});