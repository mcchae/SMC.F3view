
Ext.define('TMOV.view.win_tmov_extension', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.FieldSet',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 600,
    id: 'win_tmov_extension',
    width: 692,
    layout: 'fit',
    constrainHeader: true,
    title: '확장자 추가',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    margin: 5,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'txf_tmov_extension_name',
                            fieldLabel: '확장자 이름'
                        },
                        {
                            xtype: 'textfield',
                            id: 'txf_tmov_extension_desc',
                            width: 440,
                            fieldLabel: '확장자 설명'
                        },
                        {
                            xtype: 'textfield',
                            id: 'txf_tmov_extension_ref',
                            width: 440,
                            fieldLabel: 'MIME 유형'
                        },
                        {
                            xtype: 'combobox',
                            id: 'cmb_tmov_extension_group_select',
                            fieldLabel: '확장자 그룹',
                            editable: false,
                            valueField: 'text'
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: '시그니쳐',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txf_tmov_signature_start',
                                    fieldLabel: '시작 위치'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txf_tmov_signature_length',
                                    fieldLabel: '검증 길이'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txf_tmov_signature_code',
                                    width: 640,
                                    fieldLabel: '시그니쳐 코드'
                                },
                                {
                                    xtype: 'container',
                                    height: 10
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_tmov_signature_add',
                                            width: 80,
                                            text: '추가',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_signature_addClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_tmov_signature_modify',
                                            width: 80,
                                            text: '수정',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_signature_modifyClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'button',
                                            id: 'btn_tmov_signature_remove',
                                            width: 80,
                                            text: '삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_signature_removeClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 10
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    height: 232,
                                    id: 'gpn_tmov_signature_view',
                                    store: 'st_tmov_signature',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 100,
                                            dataIndex: 'st_offset',
                                            text: '시작 위치'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 100,
                                            dataIndex: 'chk_len',
                                            text: '검증 길이'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'signature',
                                            text: '시그니쳐 코드',
                                            flex: 1
                                        }
                                    ],
                                    listeners: {
                                        cellclick: {
                                            fn: me.onGpn_tmov_signature_viewCellClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    height: 10
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
                                    xtype: 'container',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_tmov_extension_ok',
                                    width: 80,
                                    text: '저장',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_tmov_extension_okClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                },
                                {
                                    xtype: 'button',
                                    id: 'btn_tmov_extension_cancel',
                                    width: 80,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_tmov_extension_cancelClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 10
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_extensionAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_tmov_signature_addClick: function(button, e, eOpts) {
        start = Ext.getCmp('txf_tmov_signature_start').getValue();
        len = Ext.getCmp('txf_tmov_signature_length').getValue();
        code = Ext.getCmp('txf_tmov_signature_code').getValue();

        if (start === '')
        {
            Ext.MessageBox.show({ title: '시그니쳐 추가', msg: '시작 위치를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (len === '')
        {
            Ext.MessageBox.show({ title: '시그니쳐 추가', msg: '검증 길이를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (code === '')
        {
            Ext.MessageBox.show({ title: '시그니쳐 추가', msg: '시그니쳐 코드를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }


        var store = Ext.getCmp('gpn_tmov_signature_view').getStore();
        store.add( {'st_offset' : start, 'chk_len' : len, 'signature' : code } );

    },

    onBtn_tmov_signature_modifyClick: function(button, e, eOpts) {
        start = Ext.getCmp('txf_tmov_signature_start').getValue();
        len = Ext.getCmp('txf_tmov_signature_length').getValue();
        code = Ext.getCmp('txf_tmov_signature_code').getValue();

        var store = Ext.getCmp('gpn_tmov_signature_view').getStore();
        var selectedItem = Ext.getCmp('gpn_tmov_signature_view').getSelectionModel().getSelection();

        if (selectedItem.length === 0)
        {
            Ext.MessageBox.show({ title: '시그니쳐 삭제', msg: '시그니쳐를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        index = store.indexOf(selectedItem[0]);
        store.remove(selectedItem[0]);
        store.insert(index, {'st_offset' : start, 'chk_len' : len, 'signature' : code });

    },

    onBtn_tmov_signature_removeClick: function(button, e, eOpts) {
        var store = Ext.getCmp('gpn_tmov_signature_view').getStore();
        var selectedItem = Ext.getCmp('gpn_tmov_signature_view').getSelectionModel().getSelection();

        if (selectedItem.length === 0)
        {
            Ext.MessageBox.show({ title: '시그니쳐 삭제', msg: '시그니쳐를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        store.remove(selectedItem[0]);
    },

    onGpn_tmov_signature_viewCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Ext.getCmp('txf_tmov_signature_start').setValue(record.raw.st_offset);
        Ext.getCmp('txf_tmov_signature_length').setValue(record.raw.chk_len);
        Ext.getCmp('txf_tmov_signature_code').setValue(record.raw.signature);
    },

    onBtn_tmov_extension_okClick: function(button, e, eOpts) {
        var component = Ext.getCmp('win_tmov_extension');
        var view = component.view;

        group_text = Ext.getCmp('cmb_tmov_extension_group_select').rawValue;
        name = Ext.getCmp('txf_tmov_extension_name').getValue();
        desc = Ext.getCmp('txf_tmov_extension_desc').getValue();
        ref = Ext.getCmp('txf_tmov_extension_ref').getValue();

        var st_tmov_signature = Ext.getCmp('gpn_tmov_signature_view').getStore();
        var signature = [];

        for (var i in st_tmov_signature.data.items)
        {
            signature.push(st_tmov_signature.data.items[i].raw);
        }

        if (name === '')
        {
            Ext.MessageBox.show({ title: '확장자 설정', msg: '확장자명을 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (component.isModify === false)
        {
            // 확장자 추가

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/AddExtension',
                    params : {
                        group_name : Ext.encode(group_text),
                        ext_name : Ext.encode(name),
                        ext_cmt : Ext.encode(desc),
                        ref_cnm : Ext.encode(ref),
                        signatures : Ext.encode(signature),
                        userid : Ext.encode(Ext.getCmp('main').user.userid)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);

                        if ( resObj.retVal === false)
                        {
                            Ext.MessageBox.show({ title: '확장자 설정', msg: '이미 등록된 확장자 입니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                            return;
                        }
                        else
                        {
                            Ext.Ajax.request(
                                {
                                    url : 'api/ftTMOV/GetExtension',
                                    params : {
                                        group_name : Ext.encode(component.group.name)
                                    },
                                    success : function(res_data)
                                    {
                                        var resObj = JSON.parse(res_data.responseText);
                                        var store = view.getStore();
                                        store.loadData(resObj);

                                        Ext.getCmp('win_tmov_extension').close();
                                    }
                                }
                            );
                        }
                    }
                }
            );
        }
        else
        {
            // 확장자 수정

            item = component.item;

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/ModifyExtension',
                    params : {
                        _id : Ext.encode(item._id),
                        group_name : Ext.encode(group_text),
                        ext_name : Ext.encode(name),
                        ext_cmt : Ext.encode(desc),
                        ref_cnm : Ext.encode(ref),
                        signatures : Ext.encode(signature),
                        userid : Ext.encode(Ext.getCmp('main').user.userid)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        if ( resObj.retVal === false)
                        {
                            Ext.MessageBox.show({ title: '확장자 설정', msg: '이미 등록된 확장자 입니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                            return;
                        }
                        else
                        {
                            Ext.Ajax.request(
                                {
                                    url : 'api/ftTMOV/GetExtension',
                                    params : {
                                        group_name : Ext.encode(component.group.name)
                                    },
                                    success : function(res_data)
                                    {
                                        var resObj = JSON.parse(res_data.responseText);
                                        var store = view.getStore();
                                        store.loadData(resObj);

                                        Ext.getCmp('win_tmov_extension').close();
                                    }
                                }
                            );
                        }

                    }
                }
            );
        }
    },

    onBtn_tmov_extension_cancelClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_extension').close();
    },

    onWin_tmov_extensionAfterRender: function(component, eOpts) {
        var data = [];


        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetExtensionGroupList',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    for ( var i in resObj)
                        data.push(resObj[i]);

                    var extension_group_store = Ext.create('Ext.data.Store', {
                        fields: ['text'],
                        data : data
                    });

                    var cmb_tmov_extension_group_select = Ext.getCmp('cmb_tmov_extension_group_select');
                    cmb_tmov_extension_group_select.bindStore(extension_group_store);


                    var st_tmov_signature = Ext.getStore('st_tmov_signature');
                    st_tmov_signature.loadData([]);

                    if (component.isModify === true)
                    {
                        component.title = "확장자 수정";
                        Ext.getCmp('txf_tmov_extension_name').setValue(component.item.ext_name);
                        Ext.getCmp('txf_tmov_extension_desc').setValue(component.item.ext_cmt);
                        Ext.getCmp('txf_tmov_extension_ref').setValue(component.item.ref_cnm);

                        for (var k in component.item.signatures)
                        {
                            st_tmov_signature.add(component.item.signatures[k]);
                        }

                        cmb_tmov_extension_group_select.select(component.item.group_name);
                        cmb_tmov_extension_group_select.updateLayout();
                    }
                    else
                    {
                        group_name = Ext.getCmp('tpn_tmov_extension').getSelectionModel().getSelection()[0].raw;
                        cmb_tmov_extension_group_select.select(group_name.text);
                        cmb_tmov_extension_group_select.updateLayout();
                    }
                }
            }
        );


    }

});