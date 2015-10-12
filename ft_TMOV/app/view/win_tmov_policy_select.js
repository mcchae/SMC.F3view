
Ext.define('TMOV.view.win_tmov_policy_select', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.grid.View',
        'Ext.grid.column.Column'
    ],

    height: 550,
    id: 'win_tmov_policy_select',
    minHeight: 500,
    minWidth: 800,
    width: 980,
    layout: 'border',
    constrainHeader: true,
    title: '정책 선택',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'treepanel',
                    region: 'west',
                    split: true,
                    id: 'tpn_policy_select_tree',
                    width: 280,
                    collapsible: true,
                    title: '장비 그룹',
                    viewConfig: {

                    },
                    listeners: {
                        afterrender: {
                            fn: me.onTreepanelAfterRender,
                            scope: me
                        },
                        itemclick: {
                            fn: me.onTreepanelItemClick,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    region: 'center',
                    id: 'gpn_policy_select_view',
                    title: '정책 목록',
                    store: 'st_tmov_policy_select',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
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
                                            text: '추가',
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
                                        },
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '수정',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick1,
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
                                            text: '삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick2,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_policy_select_search',
                                            width: 260,
                                            fieldLabel: '검색',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            listeners: {
                                                specialkey: {
                                                    fn: me.onTxf_policy_select_searchSpecialkey,
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
                                                    fn: me.onButtonClick4,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: [
                                {
                                    xtype: 'container',
                                    items: [
                                        {
                                            xtype: 'button',
                                            width: 80,
                                            text: '선택',
                                            listeners: {
                                                click: {
                                                    fn: me.onButtonClick3,
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
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                return value;
                            },
                            width: 120,
                            dataIndex: 'name',
                            text: '정책 이름'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                if (value >= (1024 * 1024 * 1024))
                                return (value / (1024 * 1024 * 1024)) + ' GByte';

                                if (value >= (1024 * 1024))
                                return (value / (1024 * 1024)) + ' MByte';

                                if (value >= (1024))
                                return (value / (1024)) + ' KByte';

                                return value + ' Byte';
                            },
                            width: 140,
                            align: 'right',
                            dataIndex: 'alw_fl_sz',
                            text: '최대 허용 파일 크기'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                return value;
                            },
                            width: 140,
                            align: 'right',
                            dataIndex: 'dwi_lmt_cnt',
                            text: '다운로드 제한 건수'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                if (value === '')
                                return '사용 안함';
                                else
                                return value;
                            },
                            width: 140,
                            dataIndex: 'plc_vld_perd',
                            text: '정책 유효기간'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                return value;
                            },
                            width: 140,
                            align: 'right',
                            dataIndex: 'auto_logout_tm',
                            text: '자동 로그아웃 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                if (value === false)
                                return '양방향';
                                else
                                return '단방향';
                            },
                            dataIndex: 'owy_yn',
                            text: '단방향 여부'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                return value;
                            },
                            width: 200,
                            dataIndex: 'extension_name',
                            text: '확장자'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                return value;
                            },
                            width: 160,
                            dataIndex: 'cr_dtm',
                            text: '등록 시간'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.raw.expired === true)
                                {
                                    metaData.style = 'background-color:#BDBDBD;';
                                }

                                return value;
                            },
                            width: 160,
                            dataIndex: 'fnl_edt_dtm',
                            text: '수정 시간'
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGridpanelItemDblClick,
                            scope: me
                        }
                    }
                }
            ]
        });

        me.callParent(arguments);
    },

    onTreepanelAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetGroup',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    component.setRootNode(resObj);
                    component.getSelectionModel().select(0);

                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/GetPolicy',
                            params :
                            {
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
            }
        );


    },

    onTreepanelItemClick: function(dataview, record, item, index, e, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetPolicy',
                params : {
                    parent : Ext.encode(record.raw._id),
                    user : Ext.encode(Ext.getCmp('main').user)
                },
                success : function(res)
                {
                    var retVal = JSON.parse(res.responseText);
                    Ext.getStore('st_tmov_policy_select').loadData(retVal);
                }
            }
        );
    },

    onButtonClick: function(button, e, eOpts) {
        var component = Ext.getCmp('tpn_policy_select_tree');

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 추가', msg: '정책을 추가할 그룹을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var item = component.getSelectionModel().getSelection()[0].raw;

        Ext.create('TMOV.view.win_tmov_policy_setting',{
            isModify : false,
            group : item._id
        }).show();
    },

    onButtonClick1: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_policy_select_view');

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 수정', msg: '수정할 정책을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.create('TMOV.view.win_tmov_policy_setting',{
            isModify : true,
            item : component.getSelectionModel().getSelection()[0].raw,
            group : component.getSelectionModel().getSelection()[0].raw.parent
        }).show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_policy_select_view');

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 삭제', msg: '삭제할 정책을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var selectedItems = component.getSelectionModel().getSelection();
        var items = [];

        for (var i in selectedItems)
        {
            items.push(selectedItems[i].raw);
        }

        Ext.Msg.confirm('정책 삭제', '삭제 하시겠습니까?',function(btn) {
            if (btn === 'yes')
            {
                Ext.Ajax.request(
                    {
                        url : 'api/ftTMOV/RemovePolicy',
                        params : {
                            'items' : Ext.encode(items),
                            'userid' : Ext.encode(Ext.getCmp('main').user['@id'])
                        },
                        success : function(res)
                        {
                            var result = JSON.parse(res.responseText);

                            Ext.Ajax.request(
                                {
                                    url : 'api/ftTMOV/GetPolicy',
                                    params : {
                                        parent : Ext.encode(Ext.getCmp('tpn_policy_select_tree').getSelectionModel().getSelection()[0].raw._id)
                                    },
                                    success : function(res_data)
                                    {
                                        var resObj = JSON.parse(res_data.responseText);
                                        Ext.getStore('st_tmov_policy_select').loadData(resObj);
                                    }
                                }
                            );

                            if (result.retVal === false)
                            {
                                Ext.MessageBox.show({ title: '정책 삭제', msg: '서버팜 또는 사용자 정책에서 사용중 입니다. (' + result.usedItems + ')', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                return;
                            }
                        }
                    }
                );
            }
        });
    },

    onTxf_policy_select_searchSpecialkey: function(field, e, eOpts) {
        if(e.keyCode === 13)
        {
            var search_text = Ext.getCmp('txf_policy_select_search').getValue();

            var store = [];

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
                        for (var i in resObj)
                        {
                            if (resObj[i].name.indexOf(search_text) > -1)
                            {
                                store.push(resObj[i]);
                            }
                        }

                        Ext.getStore('st_tmov_policy_select').loadData(store);
                    }
                }
            );
        }

    },

    onButtonClick4: function(button, e, eOpts) {
        var search_text = Ext.getCmp('txf_policy_select_search').getValue();

        var store = [];

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
                    for (var i in resObj)
                    {
                        if (resObj[i].name.indexOf(search_text) > -1)
                        {
                            store.push(resObj[i]);
                        }
                    }

                    Ext.getStore('st_tmov_policy_select').loadData(store);
                }
            }
        );
    },

    onGridpanelItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var component = Ext.getCmp('win_tmov_policy_select');

        if (component.type === 'server_farm')
        {
            if (component.mode === 'inner')
            {
                Ext.getCmp('txt_inner_policy').setValue(record.raw.name);
                Ext.getCmp('win_tmov_server_list').inner_id = record.raw._id;
            }
            else
            {
                Ext.getCmp('txt_outer_policy').setValue(record.raw.name);
                Ext.getCmp('win_tmov_server_list').outer_id = record.raw._id;
            }

        }
        else if(component.type === 'user_policy')
        {
            if (component.mode === 'inner')
            {
                Ext.getCmp('txf_user_policy_inner').setValue(record.raw.name);
                Ext.getCmp('win_tmov_user_setting').inner_id = record.raw._id;
            }
            else
            {
                Ext.getCmp('txf_user_policy_outer').setValue(record.raw.name);
                Ext.getCmp('win_tmov_user_setting').outer_id = record.raw._id;
            }
        }
            else //batch_policy
            {
                if (component.mode === 'inner')
                {
                    Ext.getCmp('txf_batch_policy_inner').setValue(record.raw.name);
                    Ext.getCmp('win_tmov_batch_policy_setting').inner_id = record.raw._id;
                }
                else
                {
                    Ext.getCmp('txf_batch_policy_outer').setValue(record.raw.name);
                    Ext.getCmp('win_tmov_batch_policy_setting').outer_id = record.raw._id;
                }
            }

        component.close();
    },

    onButtonClick3: function(button, e, eOpts) {
        var component = Ext.getCmp('win_tmov_policy_select');

        if (Ext.getCmp('gpn_policy_select_view').getSelectionModel().getSelection().length ===0 )
        {
            Ext.MessageBox.show({ title: '정책 선택', msg: '정책을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var record = Ext.getCmp('gpn_policy_select_view').getSelectionModel().getSelection()[0];

        if (component.type === 'server_farm')
        {
            if (component.mode === 'inner')
            {
                Ext.getCmp('txt_inner_policy').setValue(record.raw.name);
                Ext.getCmp('win_tmov_server_list').inner_id = record.raw._id;
            }
            else
            {
                Ext.getCmp('txt_outer_policy').setValue(record.raw.name);
                Ext.getCmp('win_tmov_server_list').outer_id = record.raw._id;
            }

        }
        else if (component.type === 'user_policy')
        {
            if (component.mode === 'inner')
            {
                Ext.getCmp('txf_user_policy_inner').setValue(record.raw.name);
                Ext.getCmp('win_tmov_user_setting').inner_id = record.raw._id;
            }
            else
            {
                Ext.getCmp('txf_user_policy_outer').setValue(record.raw.name);
                Ext.getCmp('win_tmov_user_setting').outer_id = record.raw._id;
            }
        }
        else //batch_policy
        {
            if (component.mode === 'inner')
            {
                Ext.getCmp('txf_batch_policy_inner').setValue(record.raw.name);
                Ext.getCmp('win_tmov_batch_policy_setting').inner_id = record.raw._id;
            }
            else
            {
                Ext.getCmp('txf_batch_policy_outer').setValue(record.raw.name);
                Ext.getCmp('win_tmov_batch_policy_setting').outer_id = record.raw._id;
            }
        }

        component.close();
    }

});