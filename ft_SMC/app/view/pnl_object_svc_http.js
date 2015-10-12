
Ext.define('SMC.view.pnl_object_svc_http', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox'
    ],

    border: false,
    height: 600,
    itemId: 'pnl_object_svc_http',
    minHeight: 600,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: 'HTTP',
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
                    itemId: 'ctn_svc_http',
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
                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 0.2,
                                    itemId: 'txf_objectName',
                                    margin: '0 10 0 0 ',
                                    fieldLabel: '객체명',
                                    labelAlign: 'top',
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                }
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            flex: 1.2,
                            itemId: 'tpn_http',
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    padding: 20,
                                    title: '기본 설정',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            margin: '0 0 10 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    width: 100,
                                                    text: '프로토콜 타입 :'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    flex: 0.5,
                                                    itemId: 'cmb_protocol',
                                                    value: 'TCP',
                                                    editable: false,
                                                    displayField: 'name',
                                                    store: 'st_HttpProtocolType',
                                                    valueField: 'name'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
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
                                                    xtype: 'label',
                                                    width: 100,
                                                    text: '출발지 포트 :'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_source_start',
                                                    msgTarget: 'none',
                                                    value: 1024
                                                },
                                                {
                                                    xtype: 'label',
                                                    height: 12,
                                                    margin: '0 10 0 10',
                                                    text: ' ~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_source_end',
                                                    fieldLabel: '',
                                                    msgTarget: 'none',
                                                    value: 65535
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.81
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
                                                    xtype: 'label',
                                                    width: 100,
                                                    text: '목적지 포트 :'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_dest_start',
                                                    msgTarget: 'none',
                                                    value: 80
                                                },
                                                {
                                                    xtype: 'label',
                                                    height: 12,
                                                    margin: '0 10 0 10',
                                                    text: ' ~'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }

                                                        if(!LengthCheckFloat(value,1,65535)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_dest_end',
                                                    fieldLabel: '',
                                                    msgTarget: 'none',
                                                    value: 80
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.81
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    padding: 20,
                                    title: '컨텐츠 필터링',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_content',
                                            margin: '0 0 10 0',
                                            fieldLabel: 'URL 컨텐츠 필터',
                                            labelWidth: 125
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '0 0 20 0',
                                            text: 'ex) *future.co.kr*,*weguardia.com*'
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return true; }

                                                if(value.substring(0,7) === 'http://')
                                                {
                                                    value = value.substring(7,value.length);
                                                }

                                                if(value.substr(0,8) === 'https://')
                                                {
                                                    value = value.substring(8,value.length);
                                                }

                                                if(value === '')
                                                {
                                                    return true;
                                                }

                                                if(!ValidURL(value)){return false; }
                                                return true;
                                            },
                                            itemId: 'txf_content_redirection',
                                            margin: '0 0 10 0',
                                            fieldLabel: 'Redirection',
                                            labelWidth: 125,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '미 입력시 기본 페이지로 이동'
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
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return true; }

                                                if(value.substring(0,7) === 'http://')
                                                {
                                                    value = value.substring(7,value.length);
                                                }

                                                if(value.substr(0,8) === 'https://')
                                                {
                                                    value = value.substring(8,value.length);
                                                }

                                                if(value === '')
                                                {
                                                    return true;
                                                }

                                                if(!ValidURL(value)){return false; }
                                                return true;
                                            },
                                            itemId: 'txf_site_redirection',
                                            fieldLabel: 'Redirection',
                                            labelWidth: 125,
                                            msgTarget: 'none'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                var me = checkbox.up('window[itemId="pnl_object_svc_http"]');

                                                if(checked === true || me.down('checkbox[itemId="ck_site_safenet"]').checked === true)
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
                                            itemId: 'ck_site_kiscom',
                                            boxLabel: '유해 사이트 데이터베이스 사용'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                var me = checkbox.up('window[itemId="pnl_object_svc_http"]');

                                                if(checked === true || me.down('checkbox[itemId="ck_site_kiscom"]').checked === true)
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
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    disabled: true,
                                                    itemId: 'cmb_site_nude',
                                                    margin: '0 10 0 0',
                                                    width: 200,
                                                    fieldLabel: '노출',
                                                    labelWidth: 40,
                                                    value: 0,
                                                    editable: false,
                                                    displayField: 'nude',
                                                    store: 'st_HarmfulSite',
                                                    valueField: 'num'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    disabled: true,
                                                    itemId: 'cmb_site_sex',
                                                    width: 300,
                                                    fieldLabel: '성행위',
                                                    labelWidth: 50,
                                                    value: 0,
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
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    disabled: true,
                                                    itemId: 'cmb_site_violence',
                                                    margin: '0 10 0 0',
                                                    width: 200,
                                                    fieldLabel: '폭력',
                                                    labelWidth: 40,
                                                    value: 0,
                                                    editable: false,
                                                    displayField: 'violence',
                                                    store: 'st_HarmfulSite',
                                                    valueField: 'num'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    disabled: true,
                                                    itemId: 'cmb_site_language',
                                                    width: 300,
                                                    fieldLabel: '언어',
                                                    labelWidth: 50,
                                                    value: 0,
                                                    editable: false,
                                                    displayField: 'language',
                                                    store: 'st_HarmfulSite',
                                                    valueField: 'num'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            disabled: true,
                                            itemId: 'ck_site_drinking',
                                            margin: '0 0 0 40',
                                            boxLabel: '음주조장, 흡연조장'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            disabled: true,
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
                                    title: 'URL 차단 그룹',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        padding: 10
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    flex: 0.7,
                                                    text: '차단사용 설정'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    text: 'Redirection Page'
                                                },
                                                {
                                                    xtype: 'label',
                                                    flex: 1,
                                                    text: '미 입력시 기본 페이지로 이동'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_game',
                                                            boxLabel: '게임'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_game',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_stock',
                                                            boxLabel: '증권'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_stock',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_news',
                                                            boxLabel: '인터넷신문'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_news',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_itv',
                                                            boxLabel: '인터넷방송'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_itv',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_email',
                                                            boxLabel: '이메일'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_email',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_webhard',
                                                            boxLabel: '웹하드'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_webhard',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_p2p',
                                                            boxLabel: 'P2P'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_p2p',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_malware',
                                                            boxLabel: '악성코드 배포지'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_malware',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 20',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.15,
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_url_user',
                                                            boxLabel: '사용자정의 그룹'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6,
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'fit',
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    validator: function(value) {
                                                                        if(!CheckNotNull(value)){return true; }

                                                                        if(value.substring(0,7) === 'http://')
                                                                        {
                                                                            value = value.substring(7,value.length);
                                                                        }

                                                                        if(value.substr(0,8) === 'https://')
                                                                        {
                                                                            value = value.substring(8,value.length);
                                                                        }

                                                                        if(value === '')
                                                                        {
                                                                            return true;
                                                                        }

                                                                        if(!ValidURL(value)){return false; }
                                                                        return true;
                                                                    },
                                                                    itemId: 'txf_url_user',
                                                                    labelSeparator: '/',
                                                                    labelWidth: 40,
                                                                    msgTarget: 'none'
                                                                }
                                                            ]
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
                            xtype: 'container',
                            margin: '10 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_svc_http"]').saveData();
                                    },
                                    itemId: 'btn_save',
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_svc_http"]').destroy();
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
                afterrender: {
                    fn: me.onPnl_object_svc_httpAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_svc_httpBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_object_svc_httpAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                if(!component.object._locked){
                    component.saveData();
                }
            }
        });
    },

    onPnl_object_svc_httpBeforeDestroy: function(component, eOpts) {
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

        var protocol_store = me.down('combobox[itemId="cmb_protocol"]').getStore();
        var harmful_store = Ext.getStore('st_HarmfulSite');

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        protocol_store.each(function(data, idx){

            if(data.data.name === record.protocol)
            {
                me.down('combobox[itemId="cmb_protocol"]').select(protocol_store.getAt(idx));
                return false;
            }
        });

        me.down('numberfield[itemId="nfd_source_start"]').setValue(record.source.start);
        me.down('numberfield[itemId="nfd_source_end"]').setValue(record.source.end);
        me.down('numberfield[itemId="nfd_dest_start"]').setValue(record.dest.start);
        me.down('numberfield[itemId="nfd_dest_end"]').setValue(record.dest.end);

        me.down('textfield[itemId="txf_content"]').setValue(record.content);

        if(record.content_redirection === null || typeof record.content_redirection === 'undefined' ||
           record.content_redirection === '')
        {
            me.down('textfield[itemId="txf_content_redirection"]').setValue('http://');
        }
        else
        {
            me.down('textfield[itemId="txf_content_redirection"]').setValue(record.content_redirection);
        }

        harmful_store.each(function(data, idx){

            if(data.data.num === record.option['@nude'])
            {
                me.down('combobox[itemId="cmb_site_nude"]').select(harmful_store.getAt(idx));
            }
            if(data.data.num === record.option['@sex'])
            {
                me.down('combobox[itemId="cmb_site_sex"]').select(harmful_store.getAt(idx));
            }
            if(data.data.num === record.option['@violence'])
            {
                me.down('combobox[itemId="cmb_site_violence"]').select(harmful_store.getAt(idx));
            }
            if(data.data.num === record.option['@language'])
            {
                me.down('combobox[itemId="cmb_site_language"]').select(harmful_store.getAt(idx));
            }
        });

        if(record.option['@chk_etc1'] === "on")
        {
            me.down('checkbox[itemId="ck_site_drinking"]').setValue(true);
        }
        if(record.option['@chk_etc2'] === "on")
        {
            me.down('checkbox[itemId="ck_site_drug"]').setValue(true);
        }
        if(record.site['@chk_kiscom'] === "on")
        {
            me.down('checkbox[itemId="ck_site_kiscom"]').setValue(true);
        }
        if(record.site['@chk_safenet'] === "on")
        {
            me.down('checkbox[itemId="ck_site_safenet"]').setValue(true);
        }

        if(record.site['@chk_kiscom'] === "on" || record.site['@chk_safenet'] === "on")
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

        if(record.site['@chk_youth'] === "on")
        {
            me.down('checkbox[itemId="ck_site_youth"]').setValue(true);
        }

        if(record.site_redirection === null || typeof record.site_redirection === 'undefined' ||
           record.site_redirection === '')
        {
            me.down('textfield[itemId="txf_site_redirection"]').setValue('http://');
        }
        else
        {
            me.down('textfield[itemId="txf_site_redirection"]').setValue(record.content_redirection);
        }

        if(record.url.game['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_game"]').setValue(true);

            if(record.url.game['#text'] === null || typeof record.url.game['#text'] === 'undefined' ||
               record.url.game['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_game"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_game"]').setValue(record.url.game['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_game"]').setValue('http://');
        }

        if(record.url.stock['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_stock"]').setValue(true);

            if(record.url.stock['#text'] === null || typeof record.url.stock['#text'] === 'undefined' ||
               record.url.stock['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_stock"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_stock"]').setValue(record.url.stock['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_stock"]').setValue('http://');
        }

        if(record.url.news['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_news"]').setValue(true);

            if(record.url.news['#text'] === null || typeof record.url.news['#text'] === 'undefined' ||
               record.url.news['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_news"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_news"]').setValue(record.url.news['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_news"]').setValue('http://');
        }

        if(record.url.itv['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_itv"]').setValue(true);

            if(record.url.itv['#text'] === null || typeof record.url.itv['#text'] === 'undefined' ||
               record.url.itv['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_itv"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_itv"]').setValue(record.url.itv['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_itv"]').setValue('http://');
        }

        if(record.url.email['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_email"]').setValue(true);

            if(record.url.email['#text'] === null || typeof record.url.email['#text'] === 'undefined' ||
               record.url.email['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_email"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_email"]').setValue(record.url.email['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_email"]').setValue('http://');
        }

        if(record.url.webhard['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_webhard"]').setValue(true);

            if(record.url.webhard['#text'] === null || typeof record.url.webhard['#text'] === 'undefined' ||
               record.url.webhard['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_webhard"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_webhard"]').setValue(record.url.webhard['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_webhard"]').setValue('http://');
        }

        if(record.url.p2p['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_p2p"]').setValue(true);

            if(record.url.p2p['#text'] === null || typeof record.url.p2p['#text'] === 'undefined' ||
               record.url.p2p['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_p2p"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_p2p"]').setValue(record.url.p2p['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_p2p"]').setValue('http://');
        }

        if(record.url.malware['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_malware"]').setValue(true);

            if(record.url.malware['#text'] === null || typeof record.url.malware['#text'] === 'undefined' ||
               record.url.malware['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_malware"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_malware"]').setValue(record.url.malware['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_malware"]').setValue('http://');
        }

        if(record.url.user['@chk_use'] === "on")
        {
            me.down('checkbox[itemId="ck_url_user"]').setValue(true);

            if(record.url.user['#text'] === null || typeof record.url.user['#text'] === 'undefined' ||
               record.url.user['#text'] === '')
            {
                me.down('textfield[itemId="txf_url_user"]').setValue('http://');
            }
            else
            {
                me.down('textfield[itemId="txf_url_user"]').setValue(record.url.user['#text']);
            }
        }
        else
        {
            me.down('textfield[itemId="txf_url_user"]').setValue('http://');
        }

        me.object = record;

        me.show();

        if(record._locked){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '해당 객체는 ' + record._locked + '에서</br> 사용중인 객체이므로 수정할 수 없습니다.',
                buttons : Ext.Msg.OK,
                alwaysOnTop : true,
                icon : Ext.Msg.INFO

            });

            me.setTitle(me.title + ' [읽기 전용]');

            me.down('button[itemId="btn_save"]').disable();
        }
    },

    saveData: function() {
        var me = this;

        if(me.down('textfield[itemId="txf_objectName"]').getValue())
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

        me.object.protocol = me.down('combobox[itemId="cmb_protocol"]').getValue();

        if(me.down('numberfield[itemId="nfd_source_start"]').validate())
        {
            if(me.down('numberfield[itemId="nfd_source_end"]').validate())
            {
                if(me.down('numberfield[itemId="nfd_source_start"]').getValue() <= me.down('numberfield[itemId="nfd_source_end"]').getValue())
                {
                    me.object.source.start = me.down('numberfield[itemId="nfd_source_start"]').getValue();
                    me.object.source.end = me.down('numberfield[itemId="nfd_source_end"]').getValue();
                }
                else
                {
                    alertMessage('포트번호가 올바르지 않습니다.');
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(0);
                    return false;
                }
            }
            else
            {
                me.down('tabpanel[itemId="tpn_http"]').setActiveTab(0);
                alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_source_end"]'));
                return false;
            }
        }
        else
        {
            me.down('tabpanel[itemId="tpn_http"]').setActiveTab(0);
            alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_source_start"]'));
            return false;
        }

        if(me.down('numberfield[itemId="nfd_dest_start"]').validate())
        {
            if(me.down('numberfield[itemId="nfd_dest_end"]').validate())
            {
                if(me.down('numberfield[itemId="nfd_dest_start"]').getValue() <= me.down('numberfield[itemId="nfd_dest_end"]').getValue())
                {
                    me.object.dest.start = me.down('numberfield[itemId="nfd_dest_start"]').getValue();
                    me.object.dest.end	= me.down('numberfield[itemId="nfd_dest_end"]').getValue();
                }
                else
                {
                    alertMessage('포트번호가 올바르지 않습니다.');
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(0);
                    return false;
                }
            }
            else
            {
                me.down('tabpanel[itemId="tpn_http"]').setActiveTab(0);
                alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_dest_end"]'));
                return false;
            }
        }
        else
        {
            me.down('tabpanel[itemId="tpn_http"]').setActiveTab(0);
            alertMessage('1 ~ 65535 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_dest_start"]'));
            return false;
        }


        if(me.down('textfield[itemId="txf_content"]').getValue())
        {
            me.object.content = me.down('textfield[itemId="txf_content"]').getValue();
        }
        else
        {
            me.object.content = null;
        }

        if(me.down('textfield[itemId="txf_content_redirection"]').getValue())
        {
            if(me.down('textfield[itemId="txf_content_redirection"]').validate())
            {
                me.object.content_redirection = me.down('textfield[itemId="txf_content_redirection"]').getValue();
            }
            else
            {
                me.down('tabpanel[itemId="tpn_http"]').setActiveTab(1);
                alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_content_redirection"]'));
                return false;
            }
        }
        else
        {
            me.object.content_redirection = null;
        }

        if(me.down('textfield[itemId="txf_site_redirection"]').getValue())
        {
            if(me.down('textfield[itemId="txf_site_redirection"]').validate())
            {
                me.object.site_redirection = me.down('textfield[itemId="txf_site_redirection"]').getValue();
            }
            else
            {
                me.down('tabpanel[itemId="tpn_http"]').setActiveTab(2);
                alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_site_redirection"]'));
                return false;
            }
        }
        else
        {
            me.object.site_redirection = null;
        }


        if(me.down('checkbox[itemId="ck_site_kiscom"]').checked)
        {
            me.object.site['@chk_kiscom'] = "on";
        }
        else
        {
            me.object.site['@chk_kiscom'] = "off";
        }

        if(me.down('checkbox[itemId="ck_site_safenet"]').checked)
        {
            me.object.site['@chk_safenet'] = "on";
        }
        else
        {
            me.object.site['@chk_safenet'] = "off";
        }

        if(me.down('checkbox[itemId="ck_site_youth"]').checked)
        {
            me.object.site['@chk_youth'] = "on";
        }
        else
        {
            me.object.site['@chk_youth'] = "off";
        }

        me.object.option['@nude'] = me.down('combobox[itemId="cmb_site_nude"]').getValue();
        me.object.option['@sex'] = me.down('combobox[itemId="cmb_site_sex"]').getValue();
        me.object.option['@violence'] = me.down('combobox[itemId="cmb_site_violence"]').getValue();
        me.object.option['@language'] = me.down('combobox[itemId="cmb_site_language"]').getValue();

        if(me.down('checkbox[itemId="ck_site_drinking"]').checked)
        {
            me.object.option['@chk_etc1'] = "on";
        }
        else
        {
            me.object.option['@chk_etc1'] = "off";
        }

        if(me.down('checkbox[itemId="ck_site_drug"]').checked)
        {
            me.object.option['@chk_etc2'] = "on";
        }
        else
        {
            me.object.option['@chk_etc2'] = "off";
        }

        if(me.down('checkbox[itemId="ck_url_game"]').checked)
        {
            me.object.url.game['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_game"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_game"]').validate())
                {
                    me.object.url.game['#text'] = me.down('textfield[itemId="txf_url_game"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_game"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.game['#text'];
            }
        }
        else
        {
            me.object.url.game['@chk_use'] = "off";
            delete me.object.url.game['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_stock"]').checked)
        {
            me.object.url.stock['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_stock"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_stock"]').validate())
                {
                    me.object.url.stock['#text'] = me.down('textfield[itemId="txf_url_stock"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_stock"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.stock['#text'];
            }
        }
        else
        {
            me.object.url.stock['@chk_use'] = "off";
            delete me.object.url.stock['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_news"]').checked)
        {
            me.object.url.news['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_news"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_news"]').validate())
                {
                    me.object.url.news['#text'] = me.down('textfield[itemId="txf_url_news"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_news"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.news['#text'];
            }
        }
        else
        {
            me.object.url.news['@chk_use'] = "off";
            delete me.object.url.news['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_itv"]').checked)
        {
            me.object.url.itv['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_itv"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_itv"]').validate())
                {
                    me.object.url.itv['#text'] = me.down('textfield[itemId="txf_url_itv"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_itv"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.itv['#text'];
            }
        }
        else
        {
            me.object.url.itv['@chk_use'] = "off";
            delete me.object.url.itv['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_email"]').checked)
        {
            me.object.url.email['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_email"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_email"]').validate())
                {
                    me.object.url.email['#text'] = me.down('textfield[itemId="txf_url_email"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_email"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.email['#text'];
            }
        }
        else
        {
            me.object.url.email['@chk_use'] = "off";
            delete me.object.url.email['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_webhard"]').checked)
        {
            me.object.url.webhard['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_webhard"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_webhard"]').validate())
                {
                    me.object.url.webhard['#text'] = me.down('textfield[itemId="txf_url_webhard"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_webhard"]').getValue());
                    return false;
                }
            }
            else
            {
                delete me.object.url.webhard['#text'];
            }
        }
        else
        {
            me.object.url.webhard['@chk_use'] = "off";
            delete me.object.url.webhard['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_p2p"]').checked)
        {
            me.object.url.p2p['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_p2p"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_p2p"]').validate())
                {
                    me.object.url.p2p['#text'] = me.down('textfield[itemId="txf_url_p2p"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_p2p"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.p2p['#text'];
            }
        }
        else
        {
            me.object.url.p2p['@chk_use'] = "off";
            delete me.object.url.p2p['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_malware"]').checked)
        {
            me.object.url.malware['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_malware"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_malware"]').validate())
                {
                    me.object.url.malware['#text'] = me.down('textfield[itemId="txf_url_malware"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_malware"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.malware['#text'];
            }
        }
        else
        {
            me.object.url.malware['@chk_use'] = "off";
            delete me.object.url.malware['#text'];
        }

        if(me.down('checkbox[itemId="ck_url_user"]').checked)
        {
            me.object.url.user['@chk_use'] = "on";
            if(me.down('textfield[itemId="txf_url_user"]').getValue())
            {
                if(me.down('textfield[itemId="txf_url_user"]').validate())
                {
                    me.object.url.user['#text'] = me.down('textfield[itemId="txf_url_user"]').getValue();
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_http"]').setActiveTab(3);
                    alertMessage('URL 주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_url_user"]'));
                    return false;
                }
            }
            else
            {
                delete me.object.url.user['#text'];
            }
        }
        else
        {
            me.object.url.user['@chk_use'] = "off";
            delete me.object.url.user['#text'];
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
            'chkDuplicateObject',
            {obj : Ext.encode(me.object)},
            function(response){

                if(response === true){
                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '중복되는 객체명이 존재합니다. 저장하시겠습니까?',
                        buttonText: {
                            ok     : "저장",
                            cancel : "취소"
                        },

                        buttons : Ext.Msg.OKCANCEL,
                        alwaysOnTop : true,
                        icon : Ext.Msg.INFO,
                        fn: function(buttonId) {

                            if (buttonId === "ok") {
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
                        }
                    });
                }
                else{
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
            }
        );
    }

});