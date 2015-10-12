
Ext.define('TMOV.view.win_tmov_manager', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    draggable: false,
    height: 580,
    id: 'win_tmov_manager',
    width: 1000,
    resizable: false,
    layout: 'fit',
    constrainHeader: true,
    title: '관리자 설정',
    maximized: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    id: 'ctn_tmov_manager',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            id: 'fds_tmov_manager',
                            margin: 5,
                            title: '관리자 설정',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_manager_id',
                                            fieldLabel: '관리자 아이디'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 40
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_manager_password',
                                            fieldLabel: '비밀번호',
                                            inputType: 'password'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 40
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_manager_confirm',
                                            fieldLabel: '비밀번호 확인',
                                            inputType: 'password'
                                        }
                                    ]
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
                                            xtype: 'textfield',
                                            id: 'txf_tmov_manager_name',
                                            fieldLabel: '이름'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 40
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_manager_tel',
                                            fieldLabel: '전화번호'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 40
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txf_tmov_manager_email',
                                            fieldLabel: '이메일'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    height: 10
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdo_tmov_manager_super',
                                            fieldLabel: '권한',
                                            name: 'level',
                                            boxLabel: '최상위 관리자',
                                            checked: true
                                        },
                                        {
                                            xtype: 'container',
                                            width: 40
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdo_tmov_manager_monitor',
                                            name: 'level',
                                            boxLabel: '모니터링'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 40
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdo_tmov_manager_account',
                                            name: 'level',
                                            boxLabel: '계정 관리자'
                                        },
                                        {
                                            xtype: 'container',
                                            width: 40
                                        },
                                        {
                                            xtype: 'fieldset',
                                            width: 365,
                                            title: '지역 관리자',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    width: 140,
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            id: 'rdo_tmov_manager_location',
                                                            name: 'level',
                                                            boxLabel: '설정 관리자'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            id: 'rdo_tmov_manager_location_mon',
                                                            name: 'level',
                                                            boxLabel: '모니터링 관리자'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container'
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        pack: 'center'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmb_tmov_manager_location',
                                                            width: 200,
                                                            editable: false,
                                                            valueField: 'text'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
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
                                    id: 'btn_tmov_manager_add',
                                    width: 80,
                                    text: '추가',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_tmov_manager_addClick,
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
                                    id: 'btn_tmov_manager_modify',
                                    width: 80,
                                    text: '수정',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_tmov_manager_modifyClick,
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
                                    id: 'btn_tmov_manager_del',
                                    width: 80,
                                    text: '삭제',
                                    listeners: {
                                        click: {
                                            fn: me.onBtn_tmov_manager_delClick,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    width: 8
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
                            id: 'gpn_tmov_manager_view',
                            autoScroll: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 200,
                                    dataIndex: 'userid',
                                    text: '관리자 아이디'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'name',
                                    text: '관리자 이름'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 180,
                                    dataIndex: 'phone',
                                    text: '전화번호'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 180,
                                    dataIndex: 'email',
                                    text: '이메일'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 260,
                                    dataIndex: 'etc',
                                    text: '권한',
                                    flex: 1
                                }
                            ],
                            listeners: {
                                cellclick: {
                                    fn: me.onGpn_tmov_manager_viewCellClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_tmov_managerAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onWin_tmov_managerBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBtn_tmov_manager_addClick: function(button, e, eOpts) {
        var gpn_tmov_manager_view = Ext.getCmp('gpn_tmov_manager_view');
        var store = gpn_tmov_manager_view.getStore();
        var id = Ext.getCmp('txf_tmov_manager_id').getValue();
        var password = Ext.getCmp('txf_tmov_manager_password').getValue();
        var confirm = Ext.getCmp('txf_tmov_manager_confirm').getValue();
        var name = Ext.getCmp('txf_tmov_manager_name').getValue();
        var phone = Ext.getCmp('txf_tmov_manager_tel').getValue();
        var email = Ext.getCmp('txf_tmov_manager_email').getValue();

        if ( id === '')
        {
            Ext.MessageBox.show({ title: '관리자 추가', msg: '관리자 ID를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var isExist = false;
        for (var i in store.data.items)
        {
            if(store.data.items[i].raw.userid === id)
            {
                isExist = true;
            }
        }

        if (isExist === true)
        {
            Ext.MessageBox.show({ title: '관리자 추가', msg: '중복된 관리자 ID가 있습니다', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if ( password === '')
        {
            Ext.MessageBox.show({ title: '관리자 추가', msg: '비밀번호를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if ( password !== confirm )
        {
            Ext.MessageBox.show({ title: '관리자 추가', msg: '비밀번호를 확인하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if ( name === '')
        {
            Ext.MessageBox.show({ title: '관리자 추가', msg: '관리자 이름을 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var level = 0;
        var level_super = Ext.getCmp('rdo_tmov_manager_super').getValue();
        var level_monitor = Ext.getCmp('rdo_tmov_manager_monitor').getValue();
        var level_location = Ext.getCmp('rdo_tmov_manager_location').getValue();
        var level_loc_mon = Ext.getCmp('rdo_tmov_manager_location_mon').getValue();
        var level_account = Ext.getCmp('rdo_tmov_manager_account').getValue();

        var etc = '';
        var location = '';

        if (level_super === true)
        {
            level = 0;
            etc = '최상위 관리자';
        }

        if (level_location === true)
        {
            level = 1;
            location = Ext.getCmp('cmb_tmov_manager_location').getValue();
            etc = '지역 설정 관리자 (' + location + ')';

            if (location === '' || location === undefined || location === null)
            {
                Ext.MessageBox.show({ title: '관리자 추가', msg: '지역을 선택 하셔야 합니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                return;
            }

            location = Ext.getCmp('cmb_tmov_manager_location').displayTplData[0]._id;
        }

        if (level_monitor === true)
        {
            level = 2;
            etc = '모니터링 관리자';
        }

        if (level_loc_mon === true)
        {
            level = 3;
            location = Ext.getCmp('cmb_tmov_manager_location').getValue();
            etc = '지역 모니터링 관리자 (' + location + ')';

            if (location === '' || location === undefined || location === null)
            {
                Ext.MessageBox.show({ title: '관리자 추가', msg: '지역을 선택 하셔야 합니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                return;
            }

            location = Ext.getCmp('cmb_tmov_manager_location').displayTplData[0]._id;
        }

        if (level_account === true)
        {
            Ext.MessageBox.show({ title: '관리자 추가', msg: '계정 관리자는 추가할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/AddUser',
                params : {
                    name : Ext.encode(name),
                    user_id : Ext.encode(id),
                    pwd : Ext.encode(password),
                    email : Ext.encode(email),
                    phone : Ext.encode(phone),
                    level : Ext.encode(level),
                    location : Ext.encode(location),
                    etc : Ext.encode(etc),
                    userid : Ext.encode(Ext.getCmp('main').user.userid)
                },
                success : function(res_data)
                {
                    Ext.Ajax.request(
                        {
                            url : 'api/ftTMOV/GetUsers',
                            success : function(res_data)
                            {
                                var resObj = JSON.parse(res_data.responseText);
                                store.loadData(resObj);
                            }
                        }
                    );
                }
            }
        );
    },

    onBtn_tmov_manager_modifyClick: function(button, e, eOpts) {
        var gpn_tmov_manager_view = Ext.getCmp('gpn_tmov_manager_view');
        var store = gpn_tmov_manager_view.getStore();

        var id = Ext.getCmp('txf_tmov_manager_id').getValue();
        var password = Ext.getCmp('txf_tmov_manager_password').getValue();
        var confirm = Ext.getCmp('txf_tmov_manager_confirm').getValue();
        var name = Ext.getCmp('txf_tmov_manager_name').getValue();
        var phone = Ext.getCmp('txf_tmov_manager_tel').getValue();
        var email = Ext.getCmp('txf_tmov_manager_email').getValue();

        if (gpn_tmov_manager_view.getSelectionModel().getSelection().length === 0)
        {
            Ext.MessageBox.show({ title: '관리자 수정', msg: '관리자를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        _id = gpn_tmov_manager_view.getSelectionModel().getSelection()[0].raw._id;

        if ( id === '')
        {
            Ext.MessageBox.show({ title: '관리자 수정', msg: '관리자 ID를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        var isExist = false;
        for (var i in store.data.items)
        {
            if(store.data.items[i].raw['@id'] === id && gpn_tmov_manager_view.getSelectionModel().getSelection()[0].raw.userid !== id)
            {
                isExist = true;
            }
        }

        if (isExist === true)
        {
            Ext.MessageBox.show({ title: '관리자 추가', msg: '중복된 관리자 ID가 있습니다', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }


        if ( password === '')
        {
            Ext.MessageBox.show({ title: '관리자 수정', msg: '비밀번호를 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if ( password !== confirm )
        {
            Ext.MessageBox.show({ title: '관리자 수정', msg: '비밀번호를 확인하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if ( name === '')
        {
            Ext.MessageBox.show({ title: '관리자 수정', msg: '관리자 이름을 입력하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        selectedItem = gpn_tmov_manager_view.getSelectionModel().getSelection();

        if (selectedItem[0].raw.level === 0)
        {
            var isExist = false;
            for (var i in store.data.items)
            {
                if(store.data.items[i].raw.level === 0 && selectedItem[0].raw._id !== store.data.items[i].raw._id)
                {
                    isExist = true;
                }
            }

            if (isExist === false)
            {
                Ext.MessageBox.show({ title: '관리자 수정', msg: '최상위 관리자는 최소 1명이상 등록 되어 있어야 합니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                return;
            }
        }

        if (selectedItem[0].raw.level === 4)
        {
            var isExist = false;
            for (var i in store.data.items)
            {
                if(store.data.items[i].raw.level === 4 && selectedItem[0].raw._id !== store.data.items[i].raw._id)
                {
                    isExist = true;
                }
            }

            if (isExist === true)
            {
                Ext.MessageBox.show({ title: '관리자 수정', msg: '계정 관리자는 최소 1명이상 등록할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                return;
            }
        }

        var level = 0;
        var level_super = Ext.getCmp('rdo_tmov_manager_super').getValue();
        var level_monitor = Ext.getCmp('rdo_tmov_manager_monitor').getValue();
        var level_location = Ext.getCmp('rdo_tmov_manager_location').getValue();
        var level_loc_mon = Ext.getCmp('rdo_tmov_manager_location_mon').getValue();
        var level_account = Ext.getCmp('rdo_tmov_manager_account').getValue();

        var etc = '';
        var location = '';

        if (level_super === true)
        {
            level = 0;
            etc = '최상위 관리자';
        }

        if (level_location === true)
        {
            level = 1;
            location = Ext.getCmp('cmb_tmov_manager_location').getValue();
            etc = '지역 관리자 (' + location + ')';
        }

        if (level_monitor === true)
        {
            level = 2;
            etc = '모니터링 관리자';
        }

        if (level_loc_mon === true)
        {
            level = 3;
            location = Ext.getCmp('cmb_tmov_manager_location').getValue();
            etc = '지역 모니터링 관리자 (' + location + ')';

            if (location === '' || location === undefined || location === null)
            {
                Ext.MessageBox.show({ title: '관리자 추가', msg: '지역을 선택 하셔야 합니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                return;
            }

            location = Ext.getCmp('cmb_tmov_manager_location').displayTplData[0]._id;
        }

        if (level_account === true)
        {
            level = 4;
            etc = '계정 관리자';
        }

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/ModifyUser',
                params : {
                    _id : Ext.encode(_id),
                    name : Ext.encode(name),
                    user_id : Ext.encode(id),
                    pwd : Ext.encode(password),
                    email : Ext.encode(email),
                    phone : Ext.encode(phone),
                    level : Ext.encode(level),
                    location : Ext.encode(location),
                    etc : Ext.encode(etc),
                    userid : Ext.encode(Ext.getCmp('main').user.userid)
                },
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    if (resObj === false)
                    {
                        Ext.MessageBox.show({ title: '관리자 수정', msg: '접속중인 사용자를 수정 할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                        return;
                    }
                    else
                    {
                        Ext.Ajax.request(
                            {
                                url : 'api/ftTMOV/GetUsers',
                                success : function(res_data)
                                {
                                    var resObj = JSON.parse(res_data.responseText);
                                    store.loadData(resObj);
                                }
                            }
                        );
                    }
                }
            }
        );
    },

    onBtn_tmov_manager_delClick: function(button, e, eOpts) {
        var gpn_tmov_manager_view = Ext.getCmp('gpn_tmov_manager_view');
        var store = gpn_tmov_manager_view.getStore();

        selectedItem = gpn_tmov_manager_view.getSelectionModel().getSelection();
        if (selectedItem.length === 0)
        {
            Ext.MessageBox.show({ title: '관리자 삭제', msg: '삭제할 관리자를 선택하세요', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        if (selectedItem[0].raw.level === 0)
        {
            var isExist = false;
            for (var i in store.data.items)
            {
                if(store.data.items[i].raw.level === 0 && selectedItem[0].raw._id !== store.data.items[i].raw._id)
                {
                    isExist = true;
                }
            }

            if (isExist === false)
            {
                Ext.MessageBox.show({ title: '관리자 삭제', msg: '최상위 관리자를 모두 삭제할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                return;
            }
        }

        if (selectedItem[0].raw.level === 4)
        {
            Ext.MessageBox.show({ title: '관리자 삭제', msg: '계정 관리자는 삭제할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
            return;
        }

        Ext.Msg.confirm('관리자 삭제', '삭제 하시겠습니까?',function(btn) {
            if (btn === 'yes')
            {
                console.log(btn);
                Ext.Ajax.request(
                    {
                        url : 'api/ftTMOV/RemoveUser',
                        params : {
                            user_id : Ext.encode(selectedItem[0].raw.userid),
                            userid : Ext.encode(Ext.getCmp('main').user.userid)
                        },
                        success : function(res_data)
                        {
                            var resObj = JSON.parse(res_data.responseText);
                            if (resObj === false)
                            {
                                Ext.MessageBox.show({ title: '관리자 삭제', msg: '접속중인 사용자를 삭제 할 수 없습니다.', buttons: Ext.MessageBox.OK, fn: function() { return; }, icon : Ext.Msg.ERROR });
                                return;
                            }
                            else
                            {
                                Ext.Ajax.request(
                                    {
                                        url : 'api/ftTMOV/GetUsers',
                                        success : function(res_data)
                                        {
                                            var resObj = JSON.parse(res_data.responseText);
                                            store.loadData(resObj);
                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
        });
    },

    onGpn_tmov_manager_viewCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Ext.getCmp('txf_tmov_manager_id').setValue(record.raw.userid);
        Ext.getCmp('txf_tmov_manager_name').setValue(record.raw.name);
        Ext.getCmp('txf_tmov_manager_tel').setValue(record.raw.phone);
        Ext.getCmp('txf_tmov_manager_email').setValue(record.raw.email);

        Ext.getCmp('txf_tmov_manager_password').setValue('');
        Ext.getCmp('txf_tmov_manager_confirm').setValue('');

        if (record.raw.level === 0)
        {
            Ext.getCmp('rdo_tmov_manager_super').setValue(true);
        }

        if (record.raw.level === 1)
        {
            Ext.getCmp('rdo_tmov_manager_location').setValue(true);
            var cmb_tmov_manager_location = Ext.getCmp('cmb_tmov_manager_location');

            store = cmb_tmov_manager_location.getStore();
            for (var i in store.data.items)
            {
                if (store.data.items[i].raw._id === record.raw.location)
                {
                    cmb_tmov_manager_location.setValue(store.data.items[i].raw.text);
                }
            }
        }

        if (record.raw.level === 2)
        {
            Ext.getCmp('rdo_tmov_manager_monitor').setValue(true);
        }

        if (record.raw.level === 3)
        {
            Ext.getCmp('rdo_tmov_manager_location_mon').setValue(true);
            var cmb_tmov_manager_location = Ext.getCmp('cmb_tmov_manager_location');

            store = cmb_tmov_manager_location.getStore();
            for (var i in store.data.items)
            {
                if (store.data.items[i].raw._id === record.raw.location)
                {
                    cmb_tmov_manager_location.setValue(store.data.items[i].raw.text);
                }
            }
        }

        if (record.raw.level === 4)
        {
            Ext.getCmp('rdo_tmov_manager_account').setValue(true);
        }
    },

    onWin_tmov_managerAfterRender: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');

        if (pnl_tmov_main !== undefined)
        {
            clearInterval(pnl_tmov_main.timer);
        }

        var data = [];

        var store = new Ext.data.Store({
            storeId: 'st_tmov_manager',
            fields: [
                {
                    name: 'name'
                },
                {
                    name: 'password'
                },
                {
                    name: 'userid'
                },
                {
                    name: 'email'
                },
                {
                    name: 'phone'
                },
                {
                    name: 'etc'
                }
            ]
        });

        var gpn_tmov_manager_view = Ext.getCmp('gpn_tmov_manager_view');

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetUsers',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    store.loadData(resObj);
                    gpn_tmov_manager_view.reconfigure(store);
                }
            }
        );

        Ext.Ajax.request(
            {
                url : 'api/ftTMOV/GetGroupList',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);

                    console.log(resObj);

                    for ( var i in resObj)
                        data.push(resObj[i]);

                    var location_store = Ext.create('Ext.data.Store', {
                        fields: ['text', '_id'],
                        data : data
                    });

                    var cmb_tmov_manager_location = Ext.getCmp('cmb_tmov_manager_location');
                    cmb_tmov_manager_location.bindStore(location_store);
                    cmb_tmov_manager_location.select(cmb_tmov_manager_location.getStore().getAt(0));
                    cmb_tmov_manager_location.updateLayout();
                }
            }
        );


    },

    onWin_tmov_managerBeforeDestroy: function(component, eOpts) {
        var pnl_tmov_main = Ext.getCmp('pnl_tmov_main');
        if (pnl_tmov_main !== undefined)
        {
            pnl_tmov_main.timer_tick();
        }

    }

});