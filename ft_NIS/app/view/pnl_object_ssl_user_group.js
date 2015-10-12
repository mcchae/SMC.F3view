
Ext.define('SMC.view.pnl_object_ssl_user_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Action'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_ssl_user_group',
    minHeight: 400,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: '접근서버 사용자 관리',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch',
        padding: ''
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_ssl_user_group',
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
                                    msgTarget: 'none'
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
                            xtype: 'fieldset',
                            flex: 1,
                            itemId: 'fs_ssl_user_group',
                            title: '접근서버 사용자 관리',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 0.2,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            flex: 1,
                                            itemId: 'cmb_user',
                                            margin: '1 20 1 20',
                                            fieldLabel: '사용자',
                                            labelWidth: 50,
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            valueField: '@cid'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var me = button.up('window[itemId="pnl_object_ssl_user_group"]');

                                                var select_cmb_cid = me.down('combobox[itemId="cmb_user"]').getValue();

                                                var _svc = 'ftSMC',
                                                    _func = 'getObject',
                                                    _params = {
                                                        cid : Ext.encode(select_cmb_cid)
                                                    };

                                                request_helper.xmlrpc_call_Ajax_Post(
                                                _svc,
                                                _func,
                                                _params,
                                                function(response){

                                                    if(response.group['@cid'] === 'AAAAAAAAAAAAAAAAAAAAAA==')
                                                    {
                                                        alertMessage('선택된 사용자에 접근서버 그룹이 없습니다.');
                                                        return false;
                                                    }

                                                    var id = response.id;
                                                    delete response.id;
                                                    response['@id'] = id;

                                                    me.down('gridpanel[itemId="gpn_userGroup"]').getStore().add(response);
                                                }
                                                );
                                            },
                                            flex: 1,
                                            margin: 1,
                                            maxWidth: 100,
                                            text: '추가'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var me = button.up('window[itemId="pnl_object_ssl_user_group"]');

                                                var object_store = me.down('gridpanel[itemId="gpn_userGroup"]').getStore();
                                                var select_record = me.down('gridpanel[itemId="gpn_userGroup"]').getSelectionModel().getSelection()[0];
                                                var select_combo = me.down('combobox[itemId="cmb_user"]').getValue();

                                                if(select_combo && select_record)
                                                {
                                                    var _svc = 'ftSMC',
                                                        _func = 'getObject',
                                                        _params = {
                                                            cid : Ext.encode(select_combo)
                                                        };

                                                    request_helper.xmlrpc_call_Ajax_Post(
                                                    _svc,
                                                    _func,
                                                    _params,
                                                    function(response){

                                                        if(Object_DuplicateCheck(select_combo, '@cid', object_store))
                                                        {
                                                            select_record.data = {
                                                                '@cid': response['@cid'],
                                                                '@groupcid': response['@groupcid'],
                                                                '@num': response['@num'],
                                                                '@tag': response['@tag'],
                                                                '@zone': response['@zone'],
                                                                'desc': response.desc,
                                                                'group': response.group,
                                                                '@id': response.id,
                                                                'name': response.name,
                                                                'password': response.password,
                                                                'setting': response.setting
                                                            };

                                                            select_record.raw = {
                                                                '@cid': response['@cid'],
                                                                '@groupcid': response['@groupcid'],
                                                                '@num': response['@num'],
                                                                '@tag': response['@tag'],
                                                                '@zone': response['@zone'],
                                                                'desc': response.desc,
                                                                'group': response.group,
                                                                '@id': response.id,
                                                                'name': response.name,
                                                                'password': response.password,
                                                                'setting': response.setting
                                                            };

                                                            me.down('gridpanel[itemId="gpn_userGroup"]').reconfigure();
                                                        }
                                                    }
                                                    );
                                                }

                                            },
                                            flex: 1,
                                            margin: '1 10 1 10',
                                            maxWidth: 100,
                                            text: '수정'
                                        },
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                var me = this.up('window[itemId="pnl_object_ssl_user_group"]');

                                                var select_record = me.down('gridpanel[itemId="gpn_userGroup"]').getSelectionModel().getSelection()[0];
                                                var object_store = me.down('gridpanel[itemId="gpn_userGroup"]').getStore();

                                                delObject(select_record, '@cid', object_store);
                                            },
                                            flex: 1,
                                            margin: 1,
                                            maxWidth: 100,
                                            text: '삭제'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 0.6,
                                    itemId: 'gpn_userGroup',
                                    header: false,
                                    title: 'My Grid Panel',
                                    store: 'st_SSLUserGroup',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 145,
                                            dataIndex: 'name',
                                            text: '이름'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 157,
                                            dataIndex: '@id',
                                            text: '아이디'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                return value['#text'];
                                            },
                                            width: 159,
                                            dataIndex: 'group',
                                            text: '그룹'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value['@mode'] === 'allow')
                                                return '허용';
                                                else
                                                return '차단';
                                            },
                                            width: 150,
                                            dataIndex: 'setting',
                                            text: '접근 제한',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        view.up('window[itemId="pnl_object_ssl_user_group"]').down('gridpanel[itemId="gpn_userGroup"]').getStore().removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.03
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
                                        button.up('window[itemId="pnl_object_ssl_user_group"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ssl_user_group"]').destroy();
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
                    fn: me.onPnl_object_ssl_user_groupAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_ssl_user_groupBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onPnl_object_ssl_user_groupAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_ssl_user_groupBeforeDestroy: function(component, eOpts) {
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

        var ctn_group = me.down('container[itemId="ctn_ssl_user_group"]');
        var userGroup_store = me.down('gridpanel[itemId="gpn_userGroup"]').getStore();

        me.object = record;

        userGroup_store.removeAll();

        me.show();

        var _svc = 'ftSMC',
            _func = 'getGroup',
            _params = {
                gtype : Ext.encode('obj_usr_list')
            };

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                _func = 'getObjectList';
                _params = {
                    g_cid : Ext.encode(response.cid)
                };

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    _func,
                    _params,
                    function(response){

                        ctn_group.setLoading(false);

                        var combo_store = Ext.create('Ext.data.Store', {
                            storeId: 'st_SSLUser',
                            fields: [
                                {
                                    name: '@cid'
                                },
                                {
                                    name: 'name'
                                }
                            ]
                        });

                        combo_store.loadData(response.result);

                        me.down('combobox[itemId="cmb_user"]').bindStore(combo_store);

                        me.down('combobox[itemId="cmb_user"]').select(combo_store.getAt(0));

                        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
                        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

                        var id;

                        if(record.user.length > 1)
                        {
                            Ext.each(record.user, function(data, idx){

                                id = data.id;
                                delete data.id;
                                data['@id'] = id;

                                userGroup_store.add(data);
                            });
                        }
                        else
                        {
                            id = record.user.id;
                            delete record.user.id;
                            record.user['@id'] = id;

                            userGroup_store.add(record.user);
                        }
                    }
                );
            }
        );
    },

    saveData: function() {
        var me = this;

        var user_store = me.down('gridpanel[itemId="gpn_userGroup"]').getStore();

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

        var object_member = [];

        if(user_store.getCount() > 0)
        {
            user_store.each(function(record, idx){

                var id = record['@id'];
                delete record['@id'];
                record.id = id;

                object_member.push(record.data);
            });
        }
        else
        {
            alertMessage('리스트에 데이터가 없습니다.');
            return false;
        }

        me.object.user = object_member;

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