
Ext.define('TMOV.view.MyWindow1', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel',
        'Ext.tree.Panel',
        'Ext.grid.RowNumberer'
    ],

    border: false,
    height: 760,
    id: 'win_tmov_basic_policy',
    padding: '',
    width: 1024,
    layout: 'border',
    constrainHeader: true,
    title: '정책 설정',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    region: 'north',
                    split: true,
                    border: false,
                    height: 150,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            margin: 5,
                            width: 420,
                            title: '기본 설정',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            width: 310,
                                            fieldLabel: '최대 허용 파일 크기',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10
                                        },
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            fieldLabel: 'Label',
                                            hideLabel: true,
                                            editable: false,
                                            store: [
                                                'Byte',
                                                'KByte',
                                                'MByte',
                                                'GByte'
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            width: 310,
                                            fieldLabel: '다운로드 제한 건수',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 120
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            width: 150,
                                            fieldLabel: '정책 유효 기간',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            listeners: {
                                                change: {
                                                    fn: me.onCheckboxfieldChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'datefield',
                                            hidden: true,
                                            width: 160,
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            editable: false,
                                            format: 'Y-m-d H:i:s'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            width: 310,
                                            fieldLabel: '공지 상위 게시 건수',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 120
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            width: 310,
                                            fieldLabel: '결제선차수',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '4 0 0 5',
                                            text: '분'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            width: 310,
                                            fieldLabel: '자동 로그아웃 시간',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 120
                                        },
                                        {
                                            xtype: 'label',
                                            padding: '4 0 0 5',
                                            text: '분'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    margin: '0 0 5 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: '0 0 5 0'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            flex: 1,
                                            fieldLabel: '단방향 여부',
                                            labelAlign: 'right',
                                            labelPad: 10,
                                            labelSeparator: ' ',
                                            labelWidth: 120,
                                            checked: true
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            border: true,
                            margin: 5,
                            title: '등록된 확장자',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    id: 'gpn_basic_policy_extension_save',
                                    margin: '0 0 5 0',
                                    header: false,
                                    title: 'My Grid Panel',
                                    store: 'st_tmov_extension_list',
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            layout: {
                                                type: 'hbox',
                                                padding: '0 0 5 0'
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
                                                            xtype: 'button',
                                                            width: 80,
                                                            text: '삭제',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBtn_policy_ext_removeClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'group_name',
                                            text: '그룹',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ext_name',
                                            text: '확장자',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            dataIndex: 'ext_cmt',
                                            text: '설명',
                                            flex: 1
                                        }
                                    ],
                                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                                    })
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    flex: 1,
                    region: 'center',
                    layout: 'border',
                    header: false,
                    items: [
                        {
                            xtype: 'treepanel',
                            region: 'west',
                            split: true,
                            border: false,
                            width: 220,
                            collapsible: true,
                            title: '확장자 그룹',
                            listeners: {
                                afterrender: {
                                    fn: me.onTpn_policy_extensionAfterRender,
                                    scope: me
                                },
                                itemclick: {
                                    fn: me.onTpn_policy_extensionItemClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'gridpanel',
                            search: function() {
                                var group = Ext.getCmp('cmb_basic_policy_extension_group').getValue();
                                var search_text = Ext.getCmp('txf_basic_policy_extension_search').getValue();

                                var store = [];

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
                                                    if (resObj[i].ext_name.indexOf(search_text) > -1)
                                                    {
                                                        store.push(resObj[i]);
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                if (resObj[i].ext_name.indexOf(search_text) > -1)
                                                {
                                                    store.push(resObj[i]);
                                                }
                                            }
                                        }

                                        Ext.getStore('st_tmov_extension_window').loadData(store);
                                    }
                                }
                                );

                            },
                            flex: 1,
                            region: 'center',
                            border: false,
                            id: 'gpn_basic_policy_extension_view',
                            title: '확장자 설정',
                            store: 'st_tmov_extension_window',
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    dock: 'top',
                                    border: false,
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
                                                    xtype: 'button',
                                                    width: 80,
                                                    text: '선택 추가',
                                                    listeners: {
                                                        click: {
                                                            fn: me.onBtn_policy_extension_list_addClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmb_basic_policy_extension_group',
                                                    fieldLabel: '그룹',
                                                    labelAlign: 'right',
                                                    labelSeparator: ' ',
                                                    editable: false
                                                },
                                                {
                                                    xtype: 'container',
                                                    width: 10
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'txf_basic_policy_extension_search',
                                                    fieldLabel: '확장자 이름',
                                                    labelAlign: 'right',
                                                    labelSeparator: ' ',
                                                    listeners: {
                                                        specialkey: {
                                                            fn: me.onTxf_policy_extension_searchSpecialkey,
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
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ],
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 80,
                                    text: '번호'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'ext_name',
                                    text: '확장자 이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ref_cnm',
                                    text: 'MIME 유형',
                                    flex: 2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'ext_cmt',
                                    text: '기타 설명',
                                    flex: 2
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 220,
                                    dataIndex: 'cr_dtm',
                                    text: '등록 일'
                                }
                            ],
                            listeners: {
                                itemdblclick: {
                                    fn: me.onGpn_policy_extension_viewItemDblClick,
                                    scope: me
                                }
                            },
                            selModel: Ext.create('Ext.selection.CheckboxModel', {

                            })
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    region: 'south',
                    height: 30,
                    layout: 'fit',
                    header: false,
                    items: [
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
                                    width: 100,
                                    text: '저장',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_save_policyClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    margin: '0 10 0 10',
                                    width: 100,
                                    text: '취소',
                                    listeners: {
                                        click: {
                                            fn: me.onBt_cancel_policyClick,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_policy_settingAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_policy_settingBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        if (newValue === true)
        {
            Ext.getCmp('dtf_policy_expire_date').show();
        }
        else
        {
            Ext.getCmp('dtf_policy_expire_date').hide();
        }
    },

    onBtn_policy_ext_removeClick: function(button, e, eOpts) {
        var gpn_policy_extension_save = Ext.getCmp('gpn_policy_extension_save');
        store = gpn_policy_extension_save.getStore();
        var removeItem = gpn_policy_extension_save.getSelectionModel().selected.items;
        store.remove(removeItem);
    },

    onTpn_policy_extensionAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetExtensionGroup',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    component.setRootNode(resObj);
                    component.getSelectionModel().select(0);

                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/GetExtension',
                            params : {
                                parent : Ext.encode(component.getSelectionModel().getSelection()[0].raw._id)
                            },
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                Ext.getStore('st_tmov_extension_window').loadData(resObj);
                            }
                        }
                    );

                }
            }
        );
    },

    onTpn_policy_extensionItemClick: function(dataview, record, item, index, e, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetExtension',
                params : {
                    parent : Ext.encode(record.raw._id)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getStore('st_tmov_extension_window').loadData(resObj);
                }
            }
        );

    },

    onBtn_policy_extension_list_addClick: function(button, e, eOpts) {
        var gpn_policy_extension_view = Ext.getCmp('gpn_basic_policy_extension_view');
        var items = gpn_policy_extension_view.getSelectionModel().getSelection();

        var save_store = Ext.getCmp('gpn_basic_policy_extension_save').getStore();
        var save_items = save_store.data.items;

        var isExistExtensionName = [];

        for (var i in items)
        {
            var isExist = false;

            for (var j in save_items)
            {
                if (items[i].raw._id === save_items[j].raw._id)
                {
                    isExist = true;
                    isExistExtensionName.push(save_items[j].raw.ext_name);
                }
            }

            if (isExist === false)
            {
                save_store.add(items[i].raw);
            }
        }

        if (isExistExtensionName.length !== 0)
        {
            Ext.MessageBox.show({ title: '확장자 추가', msg: '등록된 확장자가 있습니다. ( ' + isExistExtensionName + ' )' , buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }
    },

    onTxf_policy_extension_searchSpecialkey: function(field, e, eOpts) {
        if(e.keyCode === 13)
        {
            Ext.getCmp('gpn_basic_policy_extension_view').search();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('gpn_basic_policy_extension_view').search();
    },

    onGpn_policy_extension_viewItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var store = Ext.getCmp('gpn_basic_policy_extension_save').getStore();

        var isExist = false;
        for (var i in store.data.items)
        {
            if (store.data.items[i].raw._id === record.raw._id)
            {
                isExist = true;
            }
        }

        if( isExist === true)
        {
            Ext.MessageBox.show({ title: '확장자 추가', msg: '등록된 확장자가 있습니다', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        store.add( record.raw );
    },

    onWin_tmov_policy_settingAfterRender: function(component, eOpts) {
        Ext.getCmp('cmb_policy_max_file_size').select('GByte');

        if (component.isModify === false)
        {
            Ext.getCmp('dtf_policy_expire_date').setValue('');
            var store = Ext.getStore('st_tmov_extension_list');
            store.loadData([]);

            Ext.getCmp('txt_policy_download_count').setValue(500);
            Ext.getCmp('txt_policy_logout_time').setValue(10);
        }
        else
        {
            var item = component.item;

            Ext.getCmp('txt_policy_name').setValue(item.name);

            var file_size = 0;

            if (item.alw_fl_sz >= 1024 * 1024 * 1024)
            {
                file_size = item.alw_fl_sz / (1024 * 1024 * 1024);
                Ext.getCmp('cmb_policy_max_file_size').setValue('GByte');
                Ext.getCmp('txt_policy_max_file_size').setValue(file_size);
            }
            else if (item.alw_fl_sz >= 1024 * 1024)
            {
                file_size = item.alw_fl_sz / (1024 * 1024);
                Ext.getCmp('cmb_policy_max_file_size').setValue('MByte');
                Ext.getCmp('txt_policy_max_file_size').setValue(file_size);
            }
            else if (item.alw_fl_sz >= 1024)
            {
                file_size = item.alw_fl_sz / (1024);
                Ext.getCmp('cmb_policy_max_file_size').setValue('KByte');
                Ext.getCmp('txt_policy_max_file_size').setValue(file_size);
            }
            else
            {
                file_size = item.alw_fl_sz;
                Ext.getCmp('cmb_policy_max_file_size').setValue('Byte');
                Ext.getCmp('txt_policy_max_file_size').setValue(file_size);
            }


            Ext.getCmp('txt_policy_download_count').setValue(item.dwi_lmt_cnt);

            if (item.plc_vld_perd === 0 || item.plc_vld_perd === '')
            {
                Ext.getCmp('dtf_policy_expire_date').setValue('');
            }
            else
            {
                Ext.getCmp('chk_policy_expire_date').setValue(true);
                Ext.getCmp('dtf_policy_expire_date').setValue(item.plc_vld_perd);
            }

            Ext.getCmp('txt_policy_logout_time').setValue(item.auto_logout_tm);
            Ext.getCmp('chk_policy_duplex').setValue(item.owy_yn);

            var gpn_policy_extension_save = Ext.getCmp('gpn_policy_extension_save');
            var store = Ext.getStore('st_tmov_extension_list');
            store.loadData([]);

            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetExtension',
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        var ext_list = item.exts;

                        for (var i in ext_list)
                        {
                            for (var k in resObj)
                            {
                                if (ext_list[i] === resObj[k]._id)
                                    store.add(resObj[k]);
                            }
                        }
                    }
                }
            );
        }

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

                    var cmb_policy_extension_group = Ext.getCmp('cmb_policy_extension_group');
                    cmb_policy_extension_group.bindStore(extension_group_store);
                    cmb_policy_extension_group.select("확장자 그룹");
                    cmb_policy_extension_group.updateLayout();
                }
            }
        );


    },

    onBt_save_policyClick: function(button, e, eOpts) {
        var win_tmov_policy_setting = Ext.getCmp('win_tmov_policy_setting');
        var parent = win_tmov_policy_setting.group;

        //기본 정책 설정
        var txt_policy_name = Ext.getCmp('txt_policy_name').getValue();
        var txt_policy_max_file_size = Ext.getCmp('txt_policy_max_file_size').getValue();
        var txt_policy_download_count = Ext.getCmp('txt_policy_download_count').getValue();
        var dtf_policy_expire_date = Ext.getCmp('dtf_policy_expire_date').getValue();
        var txt_policy_logout_time = Ext.getCmp('txt_policy_logout_time').getValue();
        var chk_policy_duplex = Ext.getCmp('chk_policy_duplex').getValue();

        if (txt_policy_name === '' || txt_policy_name === null)
        {
            Ext.MessageBox.show({ title: '정책 설정', msg: '정책이름을 입력 하세요.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (dtf_policy_expire_date === null)
        {
            dtf_policy_expire_date = '';
        }

        if (txt_policy_max_file_size < 0 || txt_policy_max_file_size === '' || txt_policy_max_file_size === null)
        {
            Ext.MessageBox.show({ title: '정책 설정', msg: '최대 허용 파일 크기를 입력 하세요.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (txt_policy_download_count < 0 || txt_policy_download_count === '' || txt_policy_download_count === null)
        {
            Ext.MessageBox.show({ title: '정책 설정', msg: '다운로드 제한 건수를 입력 하세요.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (Ext.getCmp('chk_policy_expire_date').getValue() === false)
        {
            dtf_policy_expire_date = '';
        }
        else
        {
            if (dtf_policy_expire_date === '')
            {
                Ext.MessageBox.show({ title: '정책 설정', msg: '정책 유효 기간을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                return;
            }
        }

        if (txt_policy_logout_time < 0 || txt_policy_logout_time === '' || txt_policy_logout_time === null)
        {
            Ext.MessageBox.show({ title: '정책 설정', msg: '자동 로그아웃 시간을 입력 하세요.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var exts = [];
        var items = Ext.getCmp('gpn_policy_extension_save').getStore().data.items;

        for (var i in items)
        {
            exts.push(items[i].raw._id);
        }

        var size_type = Ext.getCmp('cmb_policy_max_file_size').getValue();

        if (size_type === 'KByte')
        {
            txt_policy_max_file_size = txt_policy_max_file_size * 1024;
        }

        if (size_type === 'MByte')
        {
            txt_policy_max_file_size = txt_policy_max_file_size * 1024 * 1024;
        }

        if (size_type === 'GByte')
        {
            txt_policy_max_file_size = txt_policy_max_file_size * 1024 * 1024 * 1024;
        }

        console.log();

        if (win_tmov_policy_setting.isModify === false)
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/AddPolicy',
                    params : {
                        parent : Ext.encode(parent),
                        name : Ext.encode(txt_policy_name),
                        alw_fl_sz : Ext.encode(txt_policy_max_file_size),
                        dwi_lmt_cnt : Ext.encode(txt_policy_download_count),
                        plc_vld_perd : Ext.encode(dtf_policy_expire_date),
                        auto_logout_tm : Ext.encode(txt_policy_logout_time),
                        owy_yn : Ext.encode(chk_policy_duplex),
                        exts : Ext.encode(exts),
                        userid : Ext.encode(Ext.getCmp('main').user['@id'])
                    },
                    success : function(res_data)
                    {
                        win_tmov_policy_setting.close();
                    }
                }
            );
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/ModifyPolicy',
                    params : {
                        _id : Ext.encode(win_tmov_policy_setting.item._id),
                        name : Ext.encode(txt_policy_name),
                        alw_fl_sz : Ext.encode(txt_policy_max_file_size),
                        dwi_lmt_cnt : Ext.encode(txt_policy_download_count),
                        plc_vld_perd : Ext.encode(dtf_policy_expire_date),
                        auto_logout_tm : Ext.encode(txt_policy_logout_time),
                        owy_yn : Ext.encode(chk_policy_duplex),
                        exts : Ext.encode(exts),
                        userid : Ext.encode(Ext.getCmp('main').user['@id'])
                    },
                    success : function(res_data)
                    {
                        win_tmov_policy_setting.close();
                    }
                }
            );
        }
    },

    onBt_cancel_policyClick: function(button, e, eOpts) {
        Ext.getCmp('win_tmov_policy_setting').close();
    },

    onWin_tmov_policy_settingBeforeDestroy: function(component, eOpts) {
        if (Ext.getCmp('win_tmov_policy_select') !== undefined)
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetPolicy',
                    params : {
                        parent : Ext.encode(Ext.getCmp('tpn_policy_select_tree').getSelectionModel().getSelection()[0].raw._id),
                        user : Ext.encode(Ext.getCmp('main').user)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_tmov_policy_select').loadData(resObj);
                    }
                }
            );
        }
        else
        {
            Ext.Ajax.request(
                {
                    url : 'api/ftTMOV/GetPolicy',
                    params : {
                        parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                        user : Ext.encode(Ext.getCmp('main').user)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_tmov_policy').loadData(resObj);
                    }
                }
            );
        }
    }

});