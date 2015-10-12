
Ext.define('SMC4ZEN.view.pnl_smc_commspd_zen', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_smc_commspd_zen',

    requires: [
        'SMC4ZEN.view.pnl_smc_commspd_zenViewModel',
        'SMC4ZEN.view.pnl_smc_commspd_zenViewController',
        'Ext.button.Button',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.tree.plugin.TreeViewDragDrop',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Text',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Paging',
        'Ext.selection.CheckboxModel'
    ],

    controller: 'pnl_smc_commspd_zen',
    viewModel: {
        type: 'pnl_smc_commspd_zen'
    },
    id: 'pnl_smc_commspd_mainview',
    layout: 'border',
    title: '',

    items: [
        {
            xtype: 'panel',
            region: 'west',
            split: true,
            id: 'pnl_smc_commspd_zen_west',
            width: 250,
            animCollapse: true,
            collapsible: true,
            title: 'ZEN 공통 객체 그룹',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    reference: 'zen_commspd_groupcontrol',
                    itemId: 'tb_zen_groupset',
                    items: [
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_plus_enable',
                            disabled: true,
                            height: 24,
                            itemId: 'bt_add',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_addClick'
                            }
                        },
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_modify_enable',
                            disabled: true,
                            height: 24,
                            itemId: 'bt_mod',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_modClick'
                            }
                        },
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_delete_enable',
                            disabled: true,
                            height: 24,
                            itemId: 'bt_del',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_delClick'
                            }
                        },
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_search_enable',
                            height: 24,
                            itemId: 'bt_search',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_searchClick'
                            }
                        },
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_rule_send',
                            height: 24,
                            itemId: 'bt_recursive',
                            width: 24,
                            enableToggle: true,
                            text: '',
                            listeners: {
                                click: 'onBt_recursiveClick',
                                toggle: 'onBt_recursiveToggle'
                            }
                        },
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_folder_open',
                            height: 24,
                            itemId: 'bt_expand',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_expandClick'
                            }
                        },
                        {
                            xtype: 'button',
                            border: false,
                            cls: 'common_folder_close',
                            height: 24,
                            itemId: 'bt_fold',
                            width: 24,
                            text: '',
                            listeners: {
                                click: 'onBt_foldClick'
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'treepanel',
                    group_click_count: 0,
                    select_grid_click: 0,
                    flex: 1,
                    reference: 'zen_commspd_group',
                    id: 'pnl_zen_commspd_tree_view',
                    title: '',
                    viewConfig: {
                        plugins: [
                            {
                                ptype: 'treeviewdragdrop'
                            }
                        ],
                        listeners: {
                            drop: 'onViewDrop'
                        }
                    },
                    listeners: {
                        boxready: 'onPnl_zen_commspd_tree_viewBoxReady',
                        afterrender: 'onPnl_zen_commspd_tree_viewAfterRender',
                        select: 'onPnl_zen_commspd_tree_viewSelect'
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            region: 'center',
            reference: 'zen_commspd_center',
            itemId: 'pnl_zen_center',
            title: '',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    reference: 'zen_commspd_search',
                    itemId: 'tb_zen_commspd_search',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            reference: 'chk_commspdinclude',
                            itemId: 'chk_include',
                            fieldLabel: '',
                            boxLabel: '검색어 포함'
                        },
                        {
                            xtype: 'textfield',
                            flex: 1,
                            reference: 'txf_commspdsearch',
                            itemId: 'txf_search',
                            fieldLabel: '',
                            enableKeyEvents: true,
                            listeners: {
                                keypress: 'onTxf_searchKeypress'
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_search',
                            width: 100,
                            text: '검 색',
                            listeners: {
                                click: 'onBt_searchClick1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    reference: 'zen_commspd_control',
                    itemId: 'tb_zen_commspd_managetool',
                    items: [
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_add',
                            width: 100,
                            text: '프로파일 추가',
                            listeners: {
                                click: 'onBt_addClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_mod',
                            width: 100,
                            text: '프로파일 수정',
                            listeners: {
                                click: 'onBt_modClick1'
                            }
                        },
                        {
                            xtype: 'button',
                            disabled: true,
                            itemId: 'bt_del',
                            width: 100,
                            text: '프로파일 삭제',
                            listeners: {
                                click: 'onBt_delClick1'
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    reference: 'zen_commspd_spdlist',
                    id: 'gpn_commspd_list',
                    title: '',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            editRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var _tag = '';

                                if(value){

                                    _tag = Ext.String.format('<div style=\"text-align:right\">{0}</div>', value);

                                }

                                return _tag;
                            },
                            text: 'N',
                            flex: 0.05
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var _tag = '';

                                if(value){

                                    _tag = Ext.String.format('<div style=\"text-align:left\">{0}</div>', value);

                                }

                                return _tag;
                            },
                            align: 'center',
                            dataIndex: 'name',
                            text: '객체 이름',
                            flex: 0.2
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                var _tag = '';

                                if(value){

                                    _tag = Ext.String.format('<div style=\"text-align:left\">{0}</div>', value);

                                }

                                return _tag;
                            },
                            align: 'center',
                            dataIndex: 'desc',
                            text: '객체 설명',
                            flex: 0.7
                        }
                    ],
                    dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            dock: 'bottom',
                            itemId: 'tb_commspd_poilicypageing',
                            width: 360,
                            afterPageText: '전체 페이지 {0}',
                            beforePageText: '현재 페이지',
                            displayInfo: true,
                            displayMsg: '전체 데이터 {1}',
                            emptyMsg: '표시할 프로파일 데이터가 없습니다.',
                            firstText: '처음 페이지',
                            lastText: '마지막 페이지',
                            nextText: '다음 페이지',
                            prevText: '이전 페이지',
                            refreshText: '프로파일 새로고침'
                        }
                    ],
                    selModel: {
                        selType: 'checkboxmodel',
                        listeners: {
                            select: 'onCheckboxModelSelect',
                            deselect: 'onCheckboxModelDeselect'
                        }
                    },
                    listeners: {
                        render: 'onGpn_commspd_listRender',
                        itemdblclick: 'onGpn_commspd_listItemDblClick',
                        itemclick: 'onGpn_commspd_listItemClick',
                        afterrender: 'onGpn_commspd_listAfterRender'
                    }
                }
            ]
        }
    ]

});