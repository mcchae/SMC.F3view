
Ext.define('SMC4ZEN.view.win_smc_zendevice_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_smc_zendevice_set',

    requires: [
        'SMC4ZEN.view.win_smc_zendevice_setViewModel',
        'SMC4ZEN.view.win_smc_zendevice_setViewController',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.View',
        'Ext.toolbar.Paging'
    ],

    config: {
        activeView: 0,
        delTempDB: true
    },

    controller: 'win_smc_zendevice_set',
    viewModel: {
        type: 'win_smc_zendevice_set'
    },
    height: 700,
    id: 'win_smc_zendevice_set',
    width: 1280,
    title: 'WeGuardia ZEN',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'tabpanel',
            flex: 1,
            itemId: 'trpn_dev_zensetting',
            activeTab: 0,
            tabPosition: 'left',
            items: [
                {
                    xtype: 'panel',
                    itemId: 'pnl_dev_basic',
                    layout: 'fit',
                    bodyPadding: 5,
                    title: '기본 설정',
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_zen_devicesbasicset',
                            margin: '5, 0, 5, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    itemId: 'fds_basicset_basic',
                                    collapsible: true,
                                    title: '장비 기본 정보',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'form',
                                            flex: 1,
                                            reference: 'zen_dev_basicvalidate',
                                            itemId: 'pnl_zen_validate',
                                            margin: '10, 0, 10, 0',
                                            title: '',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    reference: 'zen_view_devname',
                                                    itemId: 'txf_devname',
                                                    margin: '0, 10, 0, 0',
                                                    fieldLabel: '장비 이름',
                                                    allowBlank: false
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(value){

                                                            var retValue = validIPForm(value, 'v4');

                                                            if(!retValue){

                                                                return false;

                                                            }

                                                        }

                                                        return true;
                                                    },
                                                    flex: 1,
                                                    reference: 'zen_view_devip',
                                                    itemId: 'txf_devip',
                                                    fieldLabel: '장비 IP',
                                                    allowBlank: false
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            reference: 'zen_view_devdesc',
                                            itemId: 'txf_desc',
                                            margin: '0, 0, 10, 0',
                                            fieldLabel: '장비 설명'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    itemId: 'fds_basicset_commspd',
                                    collapsible: true,
                                    title: '공통 프로파일 정보',
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                        pack: 'center',
                                        padding: 5
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_commspd_set1',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_commspd_filter',
                                                    margin: '0, 50, 0, 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'zen_policy_v4filter',
                                                            itemId: 'txf_policy',
                                                            margin: '0, 10, 0, 0',
                                                            width: 400,
                                                            fieldLabel: '보안 설정',
                                                            labelWidth: 150,
                                                            listeners: {
                                                                focus: 'onTxf_ipv4filterFocus'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'bt_init',
                                                            width: 100,
                                                            text: '선택 초기화',
                                                            listeners: {
                                                                click: 'onBt_initClick'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_commspd_filter1',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'zen_policy_v4nat',
                                                            itemId: 'txf_policy',
                                                            margin: '0, 10, 0, 0',
                                                            width: 400,
                                                            fieldLabel: 'NAT 설정',
                                                            labelWidth: 150,
                                                            listeners: {
                                                                focus: 'onTxf_ipv4filterFocus6'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'bt_init',
                                                            width: 100,
                                                            text: '선택 초기화',
                                                            listeners: {
                                                                click: 'onBt_initClick1'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_commspd_set2',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_commspd_filter',
                                                    margin: '0, 50, 0, 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'zen_policy_whitelist',
                                                            itemId: 'txf_policy',
                                                            margin: '0, 10, 0, 0',
                                                            width: 400,
                                                            fieldLabel: '화이트/블랙 리스트 설정',
                                                            labelWidth: 150,
                                                            listeners: {
                                                                focus: 'onTxf_ipv4filterFocus1'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'bt_init',
                                                            width: 100,
                                                            text: '선택 초기화',
                                                            listeners: {
                                                                click: 'onBt_initClick2'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_commspd_filter1',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'zen_policy_ipsec',
                                                            itemId: 'txf_policy',
                                                            margin: '0, 10, 0, 0',
                                                            width: 400,
                                                            fieldLabel: 'IPSec 설정',
                                                            labelWidth: 150,
                                                            listeners: {
                                                                focus: 'onTxf_ipv4filterFocus3'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'bt_init',
                                                            width: 100,
                                                            text: '선택 초기화',
                                                            listeners: {
                                                                click: 'onBt_initClick6'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            itemId: 'ctn_commspd_set3',
                                            margin: '0, 0, 10, 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_commspd_filter',
                                                    margin: '0, 50, 0, 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'zen_policy_nat64',
                                                            itemId: 'txf_policy',
                                                            margin: '0, 10, 0, 0',
                                                            width: 400,
                                                            fieldLabel: 'NAT 64 설정',
                                                            labelWidth: 150,
                                                            listeners: {
                                                                focus: 'onTxf_ipv4filterFocus2'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'bt_init',
                                                            width: 100,
                                                            text: '선택 초기화',
                                                            listeners: {
                                                                click: 'onBt_initClick4'
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    itemId: 'ctn_commspd_margin',
                                                    width: 510
                                                },
                                                {
                                                    xtype: 'container',
                                                    hidden: true,
                                                    itemId: 'ctn_commspd_filter1',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            reference: 'zen_policy_dns64',
                                                            itemId: 'txf_policy',
                                                            margin: '0, 10, 0, 0',
                                                            width: 400,
                                                            fieldLabel: 'DNS 64 설정',
                                                            labelWidth: 150,
                                                            listeners: {
                                                                focus: 'onTxf_ipv4filterFocus4'
                                                            }
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            itemId: 'bt_init',
                                                            width: 100,
                                                            text: '선택 초기화',
                                                            listeners: {
                                                                click: 'onBt_initClick5'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    border: true,
                                    itemId: 'fds_basicset_commspdview',
                                    padding: 5,
                                    layout: 'border',
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            group_click_count: 0,
                                            gtype: 'object_firewall_filter_ipv4',
                                            region: 'west',
                                            split: true,
                                            reference: 'zen_commspd_devgroup',
                                            itemId: 'tprn_policy_group',
                                            width: 250,
                                            title: '',
                                            viewConfig: {

                                            },
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    itemId: 'tb_policy_control',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            baseCls: '',
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
                                                            baseCls: '',
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
                                                            baseCls: '',
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
                                            listeners: {
                                                afterrender: 'onTprn_policy_groupAfterRender',
                                                select: 'onTprn_policy_groupSelect'
                                            }
                                        },
                                        {
                                            xtype: 'panel',
                                            region: 'center',
                                            itemId: 'pnl_policy_center',
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
                                                    reference: 'zen_commspd_searchtoolbydev',
                                                    itemId: 'tb_commspd_searchbydev',
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            reference: 'chk_devcommspdinclude',
                                                            itemId: 'chk_include',
                                                            fieldLabel: '',
                                                            boxLabel: '단어 포함 검색',
                                                            checked: true
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            flex: 1,
                                                            reference: 'txf_devcommspdsearch',
                                                            itemId: 'txf_search',
                                                            fieldLabel: '',
                                                            labelWidth: 80,
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
                                                                click: 'onBt_searchClick'
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 1,
                                                    reference: 'zen_gpn_spdlistbydev',
                                                    itemId: 'gpn_commspd_list',
                                                    title: '',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            text: 'N'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'name',
                                                            text: '프로파일 이름',
                                                            flex: 0.3
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'desc',
                                                            text: '프로파일 설명',
                                                            flex: 0.7
                                                        }
                                                    ],
                                                    dockedItems: [
                                                        {
                                                            xtype: 'pagingtoolbar',
                                                            dock: 'bottom',
                                                            itemId: 'tb_commspd_pageingbydev',
                                                            width: 360,
                                                            afterPageText: '전체 페이지 {0}',
                                                            beforePageText: '현재 페이지',
                                                            displayInfo: true,
                                                            displayMsg: '전체 데이터 {1} 개',
                                                            emptyMsg: '표시할 프로파일 데이터가 없습니다.',
                                                            firstText: '첫 페이지',
                                                            lastText: '마지막 페이지',
                                                            nextText: '다음 페이지',
                                                            prevText: '이전 페이지',
                                                            refreshText: '프로파일 데이터 재요청'
                                                        }
                                                    ],
                                                    listeners: {
                                                        render: 'onGpn_commspd_listRender',
                                                        itemdblclick: 'onGpn_commspd_listItemDblClick'
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    reference: 'zen_view_detail',
                    itemId: 'pnl_dev_detail',
                    layout: 'fit',
                    title: '상세 설정',
                    items: [
                        {
                            xtype: 'container',
                            reference: 'zen_view_detail',
                            itemId: 'ctn_view_detailzen',
                            layout: 'fit',
                            listeners: {
                                beforerender: 'onCtn_view_detailzenBeforeRender'
                            }
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'container',
            itemId: 'ctn_basicset_control',
            margin: '5 5 5 0',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_save',
                    margin: '0, 5, 0, 0,',
                    width: 100,
                    text: '저 장',
                    listeners: {
                        click: 'onBt_saveClick'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_cancel',
                    width: 100,
                    text: '취 소',
                    listeners: {
                        click: 'onBt_cancelClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        beforedestroy: 'onWin_smc_zendevice_setBeforeDestroy',
        beforerender: 'onWin_smc_zendevice_setBeforeRender',
        afterrender: 'onWin_smc_zendevice_setAfterRender'
    },

    onEsc: function() {
        this.destroy();
    }

});