
Ext.define('SMC.view.pnl_object_svc_url', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.TextArea',
        'Ext.form.Label'
    ],

    border: false,
    height: 600,
    itemId: 'pnl_object_svc_url',
    minHeight: 600,
    minWidth: 1000,
    padding: '0 20 10 20',
    width: 1000,
    resizable: true,
    constrainHeader: true,
    title: 'URL 차단 그룹',
    maximizable: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_svc_url',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = CheckNotNull(value);

                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 0.2,
                                    itemId: 'txf_objectName',
                                    margin: '0 10 0 0 ',
                                    fieldLabel: '객체명',
                                    labelAlign: 'top'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 0.1,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '0 20 0 0'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 0.2,
                                            itemId: 'cmb_url_group',
                                            margin: '0 10 0 0 ',
                                            labelAlign: 'top',
                                            value: '게임',
                                            editable: false,
                                            displayField: 'group',
                                            queryMode: 'local',
                                            store: 'st_URL_Group',
                                            valueField: 'group'
                                        },
                                        {
                                            xtype: 'textfield',
                                            flex: 0.33,
                                            itemId: 'txf_deny',
                                            margin: '0 10 0 0 ',
                                            labelAlign: 'top'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var me = button.up('window[itemId="pnl_object_svc_url"]');

                                                var url_text = me.down('textfield[itemId="txf_deny"]').getValue();

                                                if(url_text)
                                                {
                                                    switch(me.down('combobox[itemId="cmb_url_group"]').getValue())
                                                    {
                                                        case '게임':
                                                        me.down('textarea[itemId="txa_deny_game"]').setValue(me.down('textarea[itemId="txa_deny_game"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(0);
                                                        break;
                                                        case '증권':
                                                        me.down('textarea[itemId="txa_deny_stock"]').setValue(me.down('textarea[itemId="txa_deny_stock"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(1);
                                                        break;
                                                        case '인터넷신문':
                                                        me.down('textarea[itemId="txa_deny_news"]').setValue(me.down('textarea[itemId="txa_deny_news"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(2);
                                                        break;
                                                        case '인터넷방송':
                                                        me.down('textarea[itemId="txa_deny_itv"]').setValue(me.down('textarea[itemId="txa_deny_itv"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(3);
                                                        break;
                                                        case '이메일':
                                                        me.down('textarea[itemId="txa_deny_email"]').setValue(me.down('textarea[itemId="txa_deny_email"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(4);
                                                        break;
                                                        case '웹하드':
                                                        me.down('textarea[itemId="txa_deny_webhard"]').setValue(me.down('textarea[itemId="txa_deny_webhard"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(5);
                                                        break;
                                                        case 'P2P':
                                                        me.down('textarea[itemId="txa_deny_p2p"]').setValue(me.down('textarea[itemId="txa_deny_p2p"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(6);
                                                        break;
                                                        case '사용자 정의 그룹':
                                                        me.down('textarea[itemId="txa_deny_user"]').setValue(me.down('textarea[itemId="txa_deny_user"]').getValue() + '\n' + url_text);
                                                        me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(8);
                                                        break;
                                                    }
                                                }
                                            },
                                            width: 100,
                                            text: '추가'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1.2,
                            margin: '0 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: '0 20 0 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 0.1,
                                            margin: '10 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_basic_group',
                                                    margin: '0 10 0 0',
                                                    fieldLabel: '기본 그룹',
                                                    labelWidth: 60
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_svc_url"]');

                                                        var search_text = me.down('textfield[itemId="txf_basic_group"]').getValue();

                                                        if(!CheckNotNull(search_text))
                                                        {
                                                            alertMessage('검색어를 입력해 주십시오.', me.down('textfield[itemId="txf_basic_group"]'));
                                                            return false;
                                                        }

                                                        if(me.down('textarea[itemId="txa_basic_game"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_basic_group"]').setActiveTab(0);

                                                            var start_index = me.down('textarea[itemId="txa_basic_game"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_basic_game"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_basic_stock"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_basic_group"]').setActiveTab(1);

                                                            var start_index = me.down('textarea[itemId="txa_basic_stock"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_basic_stock"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_basic_paper"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_basic_group"]').setActiveTab(2);

                                                            var start_index = me.down('textarea[itemId="txa_basic_paper"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_basic_paper"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_basic_itv"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_basic_group"]').setActiveTab(3);

                                                            var start_index = me.down('textarea[itemId="txa_basic_itv"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_basic_itv"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_basic_email"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_basic_group"]').setActiveTab(4);

                                                            var start_index = me.down('textarea[itemId="txa_basic_email"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_basic_email"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_basic_webhard"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_basic_group"]').setActiveTab(5);

                                                            var start_index = me.down('textarea[itemId="txa_basic_webhard"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_basic_webhard"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_basic_p2p"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_basic_group"]').setActiveTab(6);

                                                            var start_index = me.down('textarea[itemId="txa_basic_p2p"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_basic_p2p"]').selectText(start_index, end_index);
                                                        }
                                                        else
                                                        {
                                                            alertMessage('해당 주소를 찾지 못했습니다.');
                                                        }
                                                    },
                                                    width: 100,
                                                    text: '검색'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'tabpanel',
                                            flex: 1.3,
                                            itemId: 'tpn_basic_group',
                                            collapsible: false,
                                            overlapHeader: true,
                                            activeTab: 0,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '게임',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_basic_game',
                                                            overflowX: 'auto',
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '증권',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_basic_stock',
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '인터넷신문',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_basic_paper',
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '인터넷방송',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_basic_itv',
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '이메일',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_basic_email',
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '웹하드',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_basic_webhard',
                                                            readOnly: true
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: 'P2P',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_basic_p2p',
                                                            readOnly: true
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                tabchange: {
                                                    fn: me.onTpn_basic_groupTabChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 0.1,
                                            margin: '10 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    flex: 1,
                                                    itemId: 'txf_deny_group',
                                                    margin: '0 10 0 0',
                                                    fieldLabel: '차단 그룹',
                                                    labelWidth: 60
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_svc_url"]');

                                                        var search_text = me.down('textfield[itemId="txf_deny_group"]').getValue();

                                                        if(!CheckNotNull(search_text))
                                                        {
                                                            alertMessage('검색어를 입력해 주십시오.', me.down('textfield[itemId="txf_deny_group"]'));
                                                            return false;
                                                        }

                                                        if(me.down('textarea[itemId="txa_deny_game"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(0);

                                                            var start_index = me.down('textarea[itemId="txa_deny_game"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_game"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_deny_stock"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(1);

                                                            var start_index = me.down('textarea[itemId="txa_deny_stock"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_stock"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_deny_news"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(2);

                                                            var start_index = me.down('textarea[itemId="txa_deny_news"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_news"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_deny_itv"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(3);

                                                            var start_index = me.down('textarea[itemId="txa_deny_itv"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_itv"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_deny_email"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(4);

                                                            var start_index = me.down('textarea[itemId="txa_deny_email"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_email"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_deny_webhard"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(5);

                                                            var start_index = me.down('textarea[itemId="txa_deny_webhard"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_webhard"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_deny_p2p"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(6);

                                                            var start_index = me.down('textarea[itemId="txa_deny_p2p"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_p2p"]').selectText(start_index, end_index);
                                                        }
                                                        else if(me.down('textarea[itemId="txa_deny_user"]').getValue().match(search_text))
                                                        {
                                                            me.down('tabpanel[itemId="tpn_deny_group"]').setActiveTab(8);

                                                            var start_index = me.down('textarea[itemId="txa_deny_user"]').getValue().search(search_text);
                                                            var end_index = start_index + search_text.length;

                                                            me.down('textarea[itemId="txa_deny_user"]').selectText(start_index, end_index);
                                                        }
                                                        else
                                                        {
                                                            alertMessage('해당 주소를 찾지 못했습니다.');
                                                        }
                                                    },
                                                    width: 100,
                                                    text: '검색'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'tabpanel',
                                            flex: 1.3,
                                            itemId: 'tpn_deny_group',
                                            activeTab: 0,
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '게임',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_game',
                                                            overflowX: 'scroll'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '증권',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_stock'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '인터넷신문',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_news'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '인터넷방송',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_itv'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '이메일',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_email'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '웹하드',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_webhard'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: 'P2P',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_p2p'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    title: '악성코드 배포지',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            text: '악성코드 배포지 리스트는'
                                                        },
                                                        {
                                                            xtype: 'label',
                                                            flex: 1,
                                                            text: '추가, 수정, 삭제가 불가합니다.'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    padding: 5,
                                                    layout: 'fit',
                                                    title: '사용자 정의 그룹',
                                                    items: [
                                                        {
                                                            xtype: 'textareafield',
                                                            itemId: 'txa_deny_user'
                                                        }
                                                    ]
                                                }
                                            ],
                                            listeners: {
                                                tabchange: {
                                                    fn: me.onTpn_deny_groupTabChange,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_svc_url"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_svc_url"]').destroy();
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                beforedestroy: {
                    fn: me.onPnl_object_svc_urlBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTpn_basic_groupTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var deny_panel = tabPanel.up('window[itemId="pnl_object_svc_url"]').down('tabpanel[itemId="tpn_deny_group"]');
        var activeTabIndex = tabPanel.items.findIndex('id', newCard.id);

        deny_panel.setActiveTab(activeTabIndex);
    },

    onTpn_deny_groupTabChange: function(tabPanel, newCard, oldCard, eOpts) {
        var basic_panel = tabPanel.up('window[itemId="pnl_object_svc_url"]').down('tabpanel[itemId="tpn_basic_group"]');
        var activeTabIndex = tabPanel.items.findIndex('id', newCard.id);

        basic_panel.setActiveTab(activeTabIndex);
    },

    onPnl_object_svc_urlBeforeDestroy: function(component, eOpts) {
        if(!component.isNew)
        {
            var _svc = 'ftSMC',
                _func = 'clrObject',
                _params = {
                    cid : Ext.encode(component.object['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                }
            );
        }
    },

    loadData: function(record) {
        var me = this;

        var ctn_group = me.down('container[itemId="ctn_svc_url"]');

        me.object = record;

        if(!me.isNew)
        {
            var deny_area;
            var deny_string;

            me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
            me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

            if(record.game)
            {
                deny_area = me.down('textarea[itemId="txa_deny_game"]');
                deny_string = '';

                if(typeof record.game === 'string' && record.game !== null)
                {
                    deny_string = record.game;
                }
                else
                {
                    Ext.each(record.game, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.game.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

            if(record.stock)
            {
                deny_area = me.down('textarea[itemId="txa_deny_stock"]');
                deny_string = '';

                if(typeof record.stock === 'string' && record.stock !== null)
                {
                    deny_string = record.stock;
                }
                else
                {
                    Ext.each(record.stock, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.stock.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

            if(record.news)
            {
                deny_area = me.down('textarea[itemId="txa_deny_news"]');
                deny_string = '';

                if(typeof record.news === 'string' && record.news !== null)
                {
                    deny_string = record.news;
                }
                else
                {
                    Ext.each(record.news, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.news.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

            if(record.itv)
            {
                deny_area = me.down('textarea[itemId="txa_deny_itv"]');
                deny_string = '';

                if(typeof record.itv === 'string' && record.itv !== null)
                {
                    deny_string = record.itv;
                }
                else
                {
                    Ext.each(record.itv, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.itv.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

            if(record.email)
            {
                deny_area = me.down('textarea[itemId="txa_deny_email"]');
                deny_string = '';

                if(typeof record.email === 'string' && record.email !== null)
                {
                    deny_string = record.email;
                }
                else
                {
                    Ext.each(record.email, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.email.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

            if(record.webhard)
            {
                deny_area = me.down('textarea[itemId="txa_deny_webhard"]');
                deny_string = '';

                if(typeof record.webhard === 'string' && record.webhard !== null)
                {
                    deny_string = record.webhard;
                }
                else
                {
                    Ext.each(record.webhard, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.webhard.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

            if(record.p2p)
            {
                deny_area = me.down('textarea[itemId="txa_deny_p2p"]');
                deny_string = '';

                if(typeof record.p2p === 'string' && record.p2p !== null)
                {
                    deny_string = record.p2p;
                }
                else
                {
                    Ext.each(record.p2p, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.p2p.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

            if(record.user)
            {
                deny_area = me.down('textarea[itemId="txa_deny_user"]');
                deny_string = '';

                if(typeof record.user === 'string' && record.user !== null)
                {
                    deny_string = record.user;
                }
                else
                {
                    Ext.each(record.user, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === record.user.length -1)
                            {
                                deny_string += data;
                            }
                            else
                            {
                                deny_string += data + '\n';
                            }
                        }
                    });
                }

                deny_area.setValue(deny_string);
            }

        }

        me.show();

        var _svc = 'ftSMC',
            _func = 'getURLDB',
            _params;

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                ctn_group.setLoading(false);

                var basic_area;
                var basic_string;

                if(response.email)
                {
                    basic_area = me.down('textarea[itemId="txa_basic_email"]');
                    basic_string = '';

                    Ext.each(response.email, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === response.email.length -1)
                            {
                                basic_string += data;
                            }
                            else
                            {
                                basic_string += data + '\n';
                            }
                        }

                    });

                    basic_area.setValue(basic_string);
                }

                if(response.game)
                {
                    basic_area = me.down('textarea[itemId="txa_basic_game"]');
                    basic_string = '';

                    Ext.each(response.game, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === response.game.length -1)
                            {
                                basic_string += data;
                            }
                            else
                            {
                                basic_string += data + '\n';
                            }
                        }

                    });

                    basic_area.setValue(basic_string);
                }

                if(response.itv)
                {
                    basic_area = me.down('textarea[itemId="txa_basic_itv"]');
                    basic_string = '';

                    Ext.each(response.itv, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === response.itv.length -1)
                            {
                                basic_string += data;
                            }
                            else
                            {
                                basic_string += data + '\n';
                            }
                        }

                    });

                    basic_area.setValue(basic_string);
                }

                if(response.p2p)
                {
                    basic_area = me.down('textarea[itemId="txa_basic_p2p"]');
                    basic_string = '';

                    Ext.each(response.p2p, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === response.p2p.length -1)
                            {
                                basic_string += data;
                            }
                            else
                            {
                                basic_string += data + '\n';
                            }
                        }

                    });

                    basic_area.setValue(basic_string);
                }

                if(response.paper)
                {
                    basic_area = me.down('textarea[itemId="txa_basic_paper"]');
                    basic_string = '';

                    Ext.each(response.paper, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === response.paper.length -1)
                            {
                                basic_string += data;
                            }
                            else
                            {
                                basic_string += data + '\n';
                            }
                        }

                    });

                    basic_area.setValue(basic_string);
                }

                if(response.stock)
                {
                    basic_area = me.down('textarea[itemId="txa_basic_stock"]');
                    basic_string = '';

                    Ext.each(response.stock, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === response.stock.length -1)
                            {
                                basic_string += data;
                            }
                            else
                            {
                                basic_string += data + '\n';
                            }
                        }

                    });

                    basic_area.setValue(basic_string);
                }

                if(response.webhard)
                {
                    basic_area = me.down('textarea[itemId="txa_basic_webhard"]');
                    basic_string = '';

                    Ext.each(response.webhard, function(data, idx){

                        if(data !== null)
                        {
                            if(idx === response.webhard.length -1)
                            {
                                basic_string += data;
                            }
                            else
                            {
                                basic_string += data + '\n';
                            }
                        }

                    });

                    basic_area.setValue(basic_string);
                }
            }
        );
    },

    saveData: function() {
        var me = this;

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
            return false;
        }

        if(me.down('textfield[itemId="txf_objectDesc"]').getValue())
        {
            me.object.desc = me.down('textfield[itemId="txf_objectDesc"]').getValue();
        }
        else
        {
            me.object.desc = null;
        }

        var txa_deny_array;

        if(me.down('textarea[itemId="txa_deny_game"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_game"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.game = txa_deny_array;
        }
        else
        {
            delete me.object.game;
        }

        if(me.down('textarea[itemId="txa_deny_stock"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_stock"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.stock = txa_deny_array;
        }
        else
        {
            delete me.object.stock;
        }

        if(me.down('textarea[itemId="txa_deny_news"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_news"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.news = txa_deny_array;
        }
        else
        {
            delete me.object.news;
        }

        if(me.down('textarea[itemId="txa_deny_itv"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_itv"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.itv = txa_deny_array;
        }
        else
        {
            delete me.object.itv;
        }

        if(me.down('textarea[itemId="txa_deny_email"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_email"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.email = txa_deny_array;
        }
        else
        {
            delete me.object.email;
        }

        if(me.down('textarea[itemId="txa_deny_webhard"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_webhard"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.webhard = txa_deny_array;
        }
        else
        {
            delete me.object.webhard;
        }

        if(me.down('textarea[itemId="txa_deny_p2p"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_p2p"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.p2p = txa_deny_array;
        }
        else
        {
            delete me.object.p2p;
        }

        if(me.down('textarea[itemId="txa_deny_user"]').getValue())
        {
            txa_deny_array = me.down('textarea[itemId="txa_deny_user"]').getValue().split('\n');

            if(!txa_deny_array[txa_deny_array.length - 1].match("."))
            {
                txa_deny_array.pop();
            }

            Ext.each(txa_deny_array, function(data, idx){

                if(!data.match("."))
                {
                    txa_deny_array[idx] = null;
                }
            });

            me.object.user = txa_deny_array;
        }
        else
        {
            delete me.object.user;
        }

        var _svc = 'ftSMC',
            _func,
            _params;

        if(me.isNew)
        {
            _func = 'addObject';
            _params = {
                obj : Ext.encode(me.object),
                g_cid : Ext.encode(me.object['@groupcid'])
            };
        }
        else
        {
            _func = 'modObject';
            _params = {
                obj : Ext.encode(me.object)
            };
        }

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    if((_func === 'addObject') && response)
                    {
                        me.object['@cid'] = response;
                    }

                    if(typeof me.closeEvent === 'function'){
                        me.closeEvent();
                    }

                    me.destroy();
                }
            }
        );
    }

});