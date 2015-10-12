
Ext.define('SMC.view.pnl_vms_main', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.container.ButtonGroup',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    id: 'pnl_vms_main',
    title: '',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    items: [
                        {
                            xtype: 'buttongroup',
                            title: '전체',
                            columns: 2,
                            items: [
                                {
                                    xtype: 'button',
                                    height: 50,
                                    width: 100,
                                    text: '전체 보기'
                                }
                            ]
                        },
                        {
                            xtype: 'buttongroup',
                            title: '장비 관리 메뉴',
                            columns: 4,
                            items: [
                                {
                                    xtype: 'button',
                                    height: 50,
                                    width: 100,
                                    text: '신 규'
                                },
                                {
                                    xtype: 'button',
                                    height: 50,
                                    width: 100,
                                    text: '설치 / 검수'
                                },
                                {
                                    xtype: 'button',
                                    height: 50,
                                    width: 100,
                                    text: '유지보수'
                                },
                                {
                                    xtype: 'button',
                                    height: 50,
                                    width: 100,
                                    text: '종 료'
                                }
                            ]
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    title: '',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: '사업소 명',
                            flex: 1.5
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'number',
                            text: '지역',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'date',
                            text: '품명',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bool',
                            text: '내부 IP',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bool',
                            text: '유 / 무상',
                            flex: 1
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'bool',
                            text: '설치일',
                            flex: 1
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'bool',
                            text: '검수일',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'bool',
                            text: '기타',
                            flex: 2
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    })
                }
            ]
        });

        me.callParent(arguments);
    }

});