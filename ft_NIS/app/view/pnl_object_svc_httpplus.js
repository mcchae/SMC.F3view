
Ext.define('SMC.view.pnl_object_svc_httpplus', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.Label',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.TextArea',
        'Ext.tree.Panel',
        'Ext.tree.View'
    ],

    border: false,
    height: 600,
    itemId: 'pnl_object_svc_httpplus',
    minHeight: 600,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: 'HTTP+',
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
                    margin: '10 0 10 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 0.2,
                            itemId: 'txf_objectName',
                            margin: '0 10 0 0 ',
                            fieldLabel: '오브젝트 이름',
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
                    xtype: 'tabpanel',
                    flex: 1.2,
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            padding: 40,
                            title: '기본 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_protocol',
                                            margin: '0 0 10 0',
                                            width: 303,
                                            fieldLabel: '프로토콜 타입 :',
                                            labelWidth: 90,
                                            editable: false,
                                            displayField: 'name',
                                            store: 'st_HttpProtocolType',
                                            valueField: 'name'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            flex: 0.8,
                                            itemId: 'nfd_source_start',
                                            fieldLabel: '출발지 포트 :',
                                            labelWidth: 90
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 0.1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.5
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    height: 12,
                                                    text: ' ~'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'numberfield',
                                            flex: 0.6,
                                            itemId: 'nfd_source_end',
                                            fieldLabel: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            flex: 0.8,
                                            itemId: 'nfd_dest_start',
                                            fieldLabel: '목적지 포트 :',
                                            labelWidth: 90
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 0.1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.5
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    height: 12,
                                                    text: ' ~'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'numberfield',
                                            flex: 0.6,
                                            itemId: 'nfd_dest_end',
                                            fieldLabel: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 10 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            flex: 0.8,
                                            width: 400,
                                            fieldLabel: 'Redirection',
                                            labelWidth: 90,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    margin: '0 40 0 0',
                                                    boxLabel: 'URL'
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    boxLabel: 'IMAGE'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'http://',
                                    labelSeparator: '/',
                                    labelWidth: 90
                                },
                                {
                                    xtype: 'label',
                                    margin: '0 0 0 95',
                                    text: '미 입력시 기본 페이지로 이동'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            padding: 40,
                            title: '컨텐츠 필터링',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textareafield',
                                    itemId: 'txf_content',
                                    margin: '0 0 10 0',
                                    fieldLabel: 'URL 패턴 매칭'
                                },
                                {
                                    xtype: 'label',
                                    margin: '0 0 0 100',
                                    text: 'ex) *future*, *weguardia* ( 최대 2048 Byte )'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            padding: 20,
                            title: '유해 사이트 차단',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_site_kiscom',
                                    boxLabel: '유해 사이트 데이터베이스 사용'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    handler: function(checkbox, checked) {
                                        var me = checkbox.up('window[itemId="pnl_object_svc_http"]');
                                        if(checked === true)
                                        {
                                            me.down('combobox[itemId="cmb_site_nude"]').enable();
                                            me.down('combobox[itemId="cmb_site_sex"]').enable();
                                            me.down('combobox[itemId="cmb_site_violence"]').enable();
                                            me.down('combobox[itemId="cmb_site_language"]').enable();
                                            me.down('checkbox[itemId="ck_site_drinking"]').enable();
                                            me.down('checkbox[itemId="ck_site_drug"]').enable();
                                        }
                                        else
                                        {
                                            me.down('combobox[itemId="cmb_site_nude"]').disable();
                                            me.down('combobox[itemId="cmb_site_sex"]').disable();
                                            me.down('combobox[itemId="cmb_site_violence"]').disable();
                                            me.down('combobox[itemId="cmb_site_language"]').disable();
                                            me.down('checkbox[itemId="ck_site_drinking"]').disable();
                                            me.down('checkbox[itemId="ck_site_drug"]').disable();
                                        }
                                    },
                                    itemId: 'ck_site_safenet',
                                    boxLabel: '인터넷 자율등급 사용'
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 10 40',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 0.8,
                                            itemId: 'cmb_site_nude',
                                            margin: '0 10 0 0',
                                            fieldLabel: '노출',
                                            labelWidth: 30,
                                            editable: false,
                                            displayField: 'nude',
                                            store: 'st_HarmfulSite',
                                            valueField: 'num'
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            itemId: 'cmb_site_sex',
                                            fieldLabel: '성행위',
                                            labelWidth: 40,
                                            editable: false,
                                            displayField: 'sex',
                                            store: 'st_HarmfulSite',
                                            valueField: 'num'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 0 40',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 0.8,
                                            itemId: 'cmb_site_violence',
                                            margin: '0 10 0 0',
                                            fieldLabel: '폭력',
                                            labelWidth: 30,
                                            editable: false,
                                            displayField: 'violence',
                                            store: 'st_HarmfulSite',
                                            valueField: 'num'
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            itemId: 'cmb_site_language',
                                            fieldLabel: '언어',
                                            labelWidth: 40,
                                            editable: false,
                                            displayField: 'language',
                                            store: 'st_HarmfulSite',
                                            valueField: 'num'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_site_drinking',
                                    margin: '0 0 0 40',
                                    boxLabel: '음주조장, 흡연조장'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_site_drug',
                                    margin: '0 0 0 40',
                                    boxLabel: '마약사용, 무기사용조장, 도박'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_site_youth',
                                    boxLabel: '청소년 유해 사이트 차단'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            title: 'HTTP+ URL 그룹 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch',
                                padding: 10
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    flex: 0.1,
                                    text: '허용 / 차단 카테고리명'
                                },
                                {
                                    xtype: 'treepanel',
                                    flex: 1,
                                    header: false,
                                    title: 'My Tree Panel',
                                    useArrows: true,
                                    viewConfig: {

                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.1,
                                    items: [
                                        {
                                            xtype: 'button',
                                            text: '허용 체크 목록 이외 모두 차단'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.1,
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            fieldLabel: '승인 모드 ( 허용, 차단 DB 이외 모든 URL )',
                                            labelWidth: 250,
                                            boxLabel: '사용'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '10 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                var me = this.up('window[itemId="pnl_object_svc_httpplus"]');

                                var _svc = 'ftSMC',
                                    _func = 'modObject',
                                    _params = {
                                        obj : Ext.encode(me.httpplus_object)
                                    };

                                request_helper.xmlrpc_call_Ajax_Post(
                                _svc,
                                _func,
                                _params,
                                function(response){
                                    me.destroy();

                                }
                                );

                            },
                            margin: '0 20 0 0',
                            width: 100,
                            text: '저장'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                this.up('window[itemId="pnl_object_svc_httpplus"]').destroy();
                            },
                            width: 100,
                            text: '취소'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    loadData: function(record) {
        var me = this;
        me.httpplus_object = record;
        console.log('record - ', record );
        me.show();
    }

});