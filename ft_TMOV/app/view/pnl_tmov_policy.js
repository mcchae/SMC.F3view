
Ext.define('TMOV.view.pnl_tmov_policy', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.Text',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    border: false,
    id: 'pnl_tmov_policy',
    layout: 'border',
    header: false,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'gridpanel',
                    search: function() {
                        var search_text = Ext.getCmp('txf_tmov_policy_search').getValue();

                        var store = [];

                        Ext.getCmp('gpn_tmov_policy').isSearch = true;

                        Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/GetPolicy',
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

                                Ext.getStore('st_tmov_policy').loadData(store);
                            }
                        }
                        );
                    },
                    flex: 1,
                    region: 'center',
                    border: false,
                    id: 'gpn_tmov_policy',
                    title: '정책 목록',
                    store: 'st_tmov_policy',
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
                                            id: 'bt_add_policy',
                                            width: 80,
                                            text: '추가',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_add_policyClick,
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
                                            id: 'bt_mod_policy',
                                            width: 80,
                                            text: '수정',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_mod_policyClick,
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
                                            id: 'bt_del_policy',
                                            width: 80,
                                            text: '삭제',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_del_policyClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            width: 10,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            }
                                        },
                                        {
                                            xtype: 'exporterbutton',
                                            tree: '',
                                            format: 'excel',
                                            type: 'policy',
                                            width: 80,
                                            text: '저장'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_policy_search',
                                            fieldLabel: '정책 이름',
                                            labelAlign: 'right',
                                            labelWidth: 60,
                                            listeners: {
                                                specialkey: {
                                                    fn: me.onTxf_tmov_policy_searchSpecialkey,
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
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
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
                            width: 140,
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
                            width: 150,
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
                                return "양방향";
                                else
                                return "단방향";
                            },
                            width: 120,
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

                                var exts = '';

                                for (var i in value)
                                {
                                    if (exts !== '')
                                    exts = exts + ', ';

                                    exts = exts + value[i];
                                }

                                return exts;
                            },
                            width: 180,
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
                            width: 150,
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
                            width: 150,
                            dataIndex: 'fnl_edt_dtm',
                            text: '수정 시간'
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
                            width: 150,
                            dataIndex: 'fnl_edt_usr',
                            text: '관리자'
                        }
                    ],
                    listeners: {
                        itemdblclick: {
                            fn: me.onGpn_tmov_policyItemDblClick,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_tmov_policyAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_add_policyClick: function(button, e, eOpts) {
        var component = Ext.getCmp('tpn_tmov_tree');

        if(component.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '정책 추가', msg: '정책을 추가할 그룹을 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 추가', msg: '모니터링 관리자는 정책 추가 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var item = component.getSelectionModel().getSelection()[0].raw;

        Ext.create('TMOV.view.win_tmov_policy_setting',{
            isModify : false,
            group : item._id
        }).show();
    },

    onBt_mod_policyClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_policy');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 수정', msg: '모니터링 관리자는 정책 수정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

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

    onBt_del_policyClick: function(button, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_policy');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 삭제', msg: '모니터링 관리자는 정책 삭제 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

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
                            userid : Ext.encode(Ext.getCmp('main').user['@id'])
                        },
                        success : function(res)
                        {
                            var result = JSON.parse(res.responseText);


                            if (result.retVal === false)
                            {
                                Ext.MessageBox.show({ title: '정책 삭제', msg: '서버팜 또는 사용자 정책에서 사용중 입니다. (' + result.usedItems + ')', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                return;
                            }

                            Ext.Ajax.request(
                                {
                                    url : 'api/ftTMOV/GetPolicy',
                                    params : {
                                        parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                                        user : Ext.encode(Ext.getCmp('main').user)
                                    },
                                    success : function(res)
                                    {
                                        var retVal = JSON.parse(res.responseText);
                                        Ext.getStore('st_tmov_policy').loadData(retVal);
                                    }
                                }
                            );

                        }
                    }
                );
            }
        });
    },

    onTxf_tmov_policy_searchSpecialkey: function(field, e, eOpts) {
        if(e.keyCode === 13)
        {
            Ext.getCmp('gpn_tmov_policy').search();
        }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('gpn_tmov_policy').search();
    },

    onGpn_tmov_policyItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var component = Ext.getCmp('gpn_tmov_policy');

        if (Ext.getCmp('main').user.level === 2 || Ext.getCmp('main').user.level === 3)
        {
            Ext.MessageBox.show({ title: '정책 수정', msg: '모니터링 관리자는 정책 수정 권한이 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

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

    onPnl_tmov_policyAfterRender: function(component, eOpts) {
        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetPolicy',
                params : {
                    parent : Ext.encode(Ext.getCmp('tpn_tmov_tree').getSelectionModel().getSelection()[0].raw._id),
                    user : Ext.encode(Ext.getCmp('main').user)
                },
                success : function(res)
                {
                    var retVal = JSON.parse(res.responseText);
                    Ext.getStore('st_tmov_policy').loadData(retVal);
                }
            }
        );
    }

});