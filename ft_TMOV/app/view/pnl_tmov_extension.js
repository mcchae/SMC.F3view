
Ext.define('TMOV.view.pnl_tmov_extension', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.form.Panel',
        'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.field.ComboBox',
        'Ext.selection.CheckboxModel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View'
    ],

    border: false,
    id: 'pnl_tmov_extension',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    region: 'center',
                    border: false,
                    id: 'gpn_tmov_extension_view',
                    title: '확장자 설정',
                    store: 'st_tmov_extension',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            border: false,
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'button',
                                            id: 'btn_tmov_extension_add',
                                            width: 80,
                                            text: '추가',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_extension_addClick,
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
                                            id: 'btn_tmov_extension_modify',
                                            width: 80,
                                            text: '수정',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_extension_modifyClick,
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
                                            id: 'btn_tmov_extension_remove',
                                            width: 80,
                                            text: '삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBtn_tmov_extension_removeClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'exporterbutton',
                                            type: 'extention',
                                            tree: '',
                                            format: 'excel',
                                            width: 80,
                                            text: '엑셀로 저장'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'form',
                                            border: false,
                                            id: 'form_ext',
                                            width: 90,
                                            items: [
                                                {
                                                    xtype: 'filefield',
                                                    id: 'ff_ext',
                                                    name: 'uploadfiles',
                                                    editable: false,
                                                    buttonOnly: true,
                                                    buttonText: '일괄 등록',
                                                    listeners: {
                                                        change: {
                                                            fn: me.onFf_extChange,
                                                            scope: me
                                                        }
                                                    },
                                                    buttonConfig: {
                                                        xtype: 'filebutton',
                                                        width: 80,
                                                        text: '일괄 등록'
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'combobox',
                                            id: 'cmb_tmov_extension_search_group',
                                            width: 200,
                                            fieldLabel: '그룹',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            editable: false
                                        },
                                        {
                                            xtype: 'container',
                                            width: 20
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_extension_search',
                                            width: 230,
                                            fieldLabel: '확장자 이름',
                                            labelAlign: 'right',
                                            labelWidth: 90,
                                            listeners: {
                                                specialkey: {
                                                    fn: me.onTxf_tmov_extension_searchSpecialkey,
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
                                            width: 80,
                                            text: '검색',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick,
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
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    columns: [
                        {
                            xtype: 'rownumberer',
                            width: 80,
                            text: '번호'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'group_name',
                            text: '그룹'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 160,
                            dataIndex: 'ext_name',
                            text: '확장자 이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 240,
                            dataIndex: 'ref_cnm',
                            text: 'MIME 유형'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 240,
                            dataIndex: 'ext_cmt',
                            text: '기타 설명'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            dataIndex: 'cr_dtm',
                            text: '등록 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            dataIndex: 'fnl_edt_dtm',
                            text: '수정 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            dataIndex: 'fnl_edt_usr',
                            text: '관리자'
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGpn_tmov_extension_viewItemDblClick,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_tmov_extensionAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_tmov_extension_addClick: function(button, e, eOpts) {
        var component = Ext.getCmp('tpn_tmov_extension');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '확장자 추가', msg: '모니터링 관리자는 확장자 추가 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '확장자 추가', msg: '확장자를 추가할 그룹을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var item = component.getSelectionModel().getSelection()[0].raw;

        var view = Ext.getCmp('gpn_tmov_extension_view');

        Ext.create('TMOV.view.win_tmov_extension', {
            isModify : false,
            group : item,
            view :  view
        }).show();
    },

    onBtn_tmov_extension_modifyClick: function(button, e, eOpts) {
        var gpn_tmov_extension_view = Ext.getCmp('gpn_tmov_extension_view');

        if (gpn_tmov_extension_view.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '확장자 수정', msg: '확장자를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '확장자 수정', msg: '모니터링 관리자는 확장자 수정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var tpn_tmov_extension = Ext.getCmp('tpn_tmov_extension');

        Ext.create('TMOV.view.win_tmov_extension', {
            isModify : true,
            item : gpn_tmov_extension_view.getSelectionModel().getSelection()[0].raw,
            group : tpn_tmov_extension.getSelectionModel().getSelection()[0].raw,
            view : gpn_tmov_extension_view
        }).show();
    },

    onBtn_tmov_extension_removeClick: function(button, e, eOpts) {
        var gpn_tmov_extension_view = Ext.getCmp('gpn_tmov_extension_view');
        var store = gpn_tmov_extension_view.getStore();

        selectedItem = gpn_tmov_extension_view.getSelectionModel().getSelection();
        if (selectedItem.length === 0)
        {
            Ext.MessageBox.show({ title: '확장자 삭제', msg: '확장자를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '확장자 삭제', msg: '모니터링 관리자는 확장자 삭제 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var items = [];

        for (var i in selectedItem)
        {
            items.push(selectedItem[i].raw);
        }

        var tpn_tmov_extension = Ext.getCmp('tpn_tmov_extension');
        var group = tpn_tmov_extension.getSelectionModel().getSelection();

        Ext.Msg.confirm('확장자 삭제', '삭제 하시겠습니까?',function(btn) {
            if (btn === 'yes')
            {
                Ext.Ajax.request(
                    {
                        url : 'api/ftTMOV/RemoveExtension',
                        params : {
                            items : Ext.encode(items),
                            userid : Ext.encode(Ext.getCmp('main').user.userid)
                        },
                        success : function(res_data)
                        {
                            var resObj = JSON.parse(res_data.responseText);

                            Ext.Ajax.request(
                                {
                                    url : 'api/ftTMOV/GetExtension',
                                    params : {
                                        parent : Ext.encode(group[0].raw._id)
                                    },
                                    success : function(res_data)
                                    {
                                        var resObj = JSON.parse(res_data.responseText);
                                        store.loadData(resObj);
                                        gpn_tmov_extension_view.reconfigure(store);
                                        return;
                                    }
                                }
                            );

                            if (resObj.retVal === false)
                            {
                                Ext.MessageBox.show({ title: '확장자 삭제', msg: '정책에서 사용중 입니다. (' + resObj.usedItems + ')', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                return;
                            }
                        }
                    }
                );
            }
        });

    },

    onFf_extChange: function(filefield, value, eOpts) {
        console.log("asdf");

        var _form = Ext.getCmp('form_ext').getForm();
        var _file = Ext.getCmp('ff_ext');

        if (Ext.getCmp('ff_ext').getValue() === '')
        {
            Ext.MessageBox.show({ title: '확장자 등록', msg: '추가할 확장자를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if(_form.isValid())
        {
            _form.submit({
                url: '/fileUpload',
                waitMsg: 'Uploading...',
                params: {filepath: '/tmp/'},
                success: function(fp, o) {

                    var _data = JSON.parse(o.response.responseText);
                    var _fileName = _data.data;

                    //             var _svc = 'ftTMOV',
                    //                 _func = 'ImportExtension',
                    //                 _params = {
                    //                     fileInfo : Ext.encode(_fileName)
                    //                 };

                    //             var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"등록중...."});
                    //             myMask.show();

                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/ImportExtension',
                            params : {
                                fileInfo : Ext.encode(_fileName)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);


                            }
                        }
                    );
                }
            });
        }
    },

    onTxf_tmov_extension_searchSpecialkey: function(field, e, eOpts) {
        if(e.keyCode === 13)
        {
            Ext.getCmp('pnl_tmov_extension').search();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('pnl_tmov_extension').search();
    },

    onGpn_tmov_extension_viewItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var gpn_tmov_extension_view = Ext.getCmp('gpn_tmov_extension_view');

        if (gpn_tmov_extension_view.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '확장자 수정', msg: '확장자를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '확장자 수정', msg: '모니터링 관리자는 확장자 수정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var tpn_tmov_extension = Ext.getCmp('tpn_tmov_extension');

        Ext.create('TMOV.view.win_tmov_extension', {
            isModify : true,
            item : gpn_tmov_extension_view.getSelectionModel().getSelection()[0].raw,
            group : tpn_tmov_extension.getSelectionModel().getSelection()[0].raw,
            view : gpn_tmov_extension_view
        }).show();



    },

    onPnl_tmov_extensionAfterRender: function(component, eOpts) {
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
                        fields: ['text', '_id'],
                        data : data
                    });

                    var cmb_tmov_extension_search_group = Ext.getCmp('cmb_tmov_extension_search_group');
                    cmb_tmov_extension_search_group.bindStore(extension_group_store);
                    cmb_tmov_extension_search_group.select("확장자 그룹");
                    cmb_tmov_extension_search_group.updateLayout();
                }
            }
        );

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetExtension',
                params : {
                    parent : Ext.encode(Ext.getCmp('tpn_tmov_extension').getSelectionModel().getSelection()[0].raw._id)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_extension').loadData(resObj);
                }
            }
        );

    },

    search: function() {
        var group = Ext.getCmp('cmb_tmov_extension_search_group').getValue();
        var search_text = Ext.getCmp('txf_tmov_extension_search').getValue();

        var store = [];

        Ext.getCmp('gpn_tmov_extension_view').isSearch = true;

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetExtension',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    for (var i in resObj)
                    {
                        if (group !== '확장자 그룹')
                        {
                            if (resObj[i].group_name === group)
                            {
                                if (resObj[i].ext_name.indexOf(search_text) > -1 || resObj[i].ext_name.indexOf(search_text.toUpperCase()) > -1)
                                {
                                    store.push(resObj[i]);
                                }
                            }
                        }
                        else
                        {
                            if (resObj[i].ext_name.indexOf(search_text) > -1 || resObj[i].ext_name.indexOf(search_text.toUpperCase()) > -1)
                            {
                                store.push(resObj[i]);
                            }
                        }
                    }

                    Ext.getStore('st_tmov_extension').loadData(store);
                }
            }
        );

    }

});