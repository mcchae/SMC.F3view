
Ext.define('SMC4ZEN.view.pnl_xtm_system_certificate', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_system_certificateViewModel',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.form.FieldSet',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'undefined'
    },
    height: 680,
    id: 'pnl_xtm_system_certificate',
    overflowY: 'auto',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: '인증서',

    items: [
        {
            xtype: 'tabpanel',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    title: '유효 인증서 목록',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'gridpanel',
                            flex: 2,
                            margin: '0, 0, 10, 0',
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'string',
                                    text: '발급 대상',
                                    flex: 2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'number',
                                    text: '발급자',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'date',
                                    text: '유효 기간',
                                    flex: 2
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            layout: 'fit',
                            title: 'Certficate Usage',
                            items: [
                                {
                                    xtype: 'textareafield',
                                    margin: '10, 0, 10, 0',
                                    fieldLabel: '',
                                    readOnly: true
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    margin: '0, 10, 0, 0',
                                    width: 100,
                                    text: '인증서 생성'
                                },
                                {
                                    xtype: 'button',
                                    margins: '0, 10, 0, 0',
                                    width: 100,
                                    text: '인증서 등록'
                                },
                                {
                                    xtype: 'button',
                                    margins: '0, 10, 0, 0',
                                    width: 100,
                                    text: '인증서 폐기'
                                },
                                {
                                    xtype: 'button',
                                    margins: '0, 10, 0, 0',
                                    width: 100,
                                    text: '상세 정보'
                                },
                                {
                                    xtype: 'button',
                                    width: 100,
                                    text: 'CA 인증서'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    title: '폐기 인증서 목록'
                }
            ]
        }
    ]

});