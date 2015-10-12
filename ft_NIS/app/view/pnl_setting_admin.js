
Ext.define('SMC.view.pnl_setting_admin', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_admin',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.selection.CheckboxModel'
    ],

    id: 'pnl_setting_admin',
    autoScroll: true,
    title: '관리자 ',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            obj_d: {
                root: '',
                sub: ''
            },
            dockedItems: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    dock: 'top',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'button',
                            width: 100,
                            text: '추가',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            width: 100,
                            text: '수정',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick2,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margin: 1,
                            width: 100,
                            text: '삭제',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    id: 'grid_users',
                    columnLines: true,
                    store: 'st_UserList',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            hidden: true,
                            align: 'center',
                            dataIndex: 'role',
                            text: '구분'
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.data.role === 'Super'){

                                    return value+'<img src="../../resources/images/dot_super.gif"/>';

                                }else{

                                    return value;
                                }


                            },
                            align: 'center',
                            dataIndex: 'id',
                            text: '아이디',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            align: 'center',
                            dataIndex: 'email',
                            text: 'E-Mail',
                            flex: 1
                        },
                        {
                            xtype: 'actioncolumn',
                            text: '로그알림메일수신',
                            hidden: true,
                            align: 'center',
                            dataIndex: 'email_check',
                            flex: 0.8,
                            items: [
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (r.get('email_check') === 'on')? "b_on":"b_off";
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'string',
                            text: '접근권한',
                            columns: [
                                {
                                    xtype: 'actioncolumn',
                                    text: '설정',
                                    align: 'center',
                                    dataIndex: 'config',
                                    flex: 1,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return (r.get('config') === 'on')? "b_on":"b_off";
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'actioncolumn',
                                    text: '로그',
                                    hidden: true,
                                    align: 'center',
                                    dataIndex: 'log',
                                    flex: 1,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return (r.get('log') === 'on')? "b_on":"b_off";
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'actioncolumn',
                                    text: '모니터',
                                    align: 'center',
                                    dataIndex: 'monitor',
                                    flex: 1,
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return (r.get('monitor') === 'on')? "b_on":"b_off";
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            align: 'center',
                            dataIndex: 'tel',
                            text: '연락처',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 150,
                            align: 'center',
                            dataIndex: 'pwExpiryDate',
                            text: '비밀번호유효기간',
                            flex: 0.8
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 200,
                            align: 'center',
                            dataIndex: 'host',
                            text: 'Trusted Host',
                            flex: 3
                        },
                        {
                            xtype: 'actioncolumn',
                            text: 'OPT',
                            hidden: true,
                            align: 'center',
                            dataIndex: 'otp',
                            items: [
                                {
                                    getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                        return (r.get('otp') === 'true')? "b_on":"b_off";
                                    }
                                }
                            ]
                        }
                    ],
                    selModel: Ext.create('Ext.selection.CheckboxModel', {

                    }),
                    listeners: {
                        itemdblclick: {
                            fn: me.onGrid_usersItemDblClick,
                            scope: me
                        }
                    }
                }
            ],
            listeners: {
                show: {
                    fn: me.onPnl_setting_adminShow,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.create('SMC.view.pnl_setting_admin_set').show();
    },

    onButtonClick2: function(button, e, eOpts) {
        var record =  Ext.getCmp("grid_users").getSelectionModel().getSelection()[0];

        if(record)
        {
            var win = Ext.create('SMC.view.pnl_setting_admin_set',{
                edit : "edit"
            });

            win.obj_d.data = record.data;

            win.show();
        }
    },

    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid_chk = Ext.getCmp('grid_users').getSelectionModel().getSelection();

        if(grid_chk.length > 0)
        {
            Ext.Msg.show({
                title:'WeGuardia™ SMC 2.0',
                msg: get_msg('conf_del'),
                buttonText: {yes: "확인",no: "취소"},
                fn: function(btn){
                    if(btn === 'yes'){

                        me.setLoading(true);

                        var first_del = true;

                        Ext.each(grid_chk, function(record, idx){

                            request_helper.xmlrpc_call_JsonP(
                                'ftSMC',
                                'delUser',
                                {
                                    userid : Ext.encode(record.data.id)
                                },
                                function(response){

                                    me.setLoading(false);

                                    if(first_del)
                                    {
                                        me.setLoading(false);
                                        if(response)
                                        {
                                            me.getUsersList();
                                        }
                                    }
                                }
                            );
                        });
                    }
                }
            });
        }
    },

    onGrid_usersItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var win = Ext.create('SMC.view.pnl_setting_admin_set',{
            edit : "edit"
        });

        win.obj_d.data = record.data;

        win.show();
    },

    onPnl_setting_adminShow: function(component, eOpts) {
        component.getUsersList();
    },

    getUsersList: function() {
        var me = this;

        var _params = {
        };

        me.setLoading(true);

        request_helper.xmlrpc_call_JsonP(
            'ftSMC',
            'getUsers',
            _params,
            function(response){

                console.log('response - ', response);

                me.setLoading(false);

                me.obj_d.root = response;

                var records = [];

                for(var i in response){

                    var _config = "off";

                    var _log = "off";

                    var _monitor = "off";

                    var _trusted_hosts = "";

                    var _id = response[i].userid;

                    var _role = "";

                    var _email_check = "off";

                    if(response[i].role === 1){

                        _role = "Super";

                    }else{

                        _role = "Admin";
                    }

                    var _authorization = response[i].authorization;

                    if(_authorization === 7){

                        _config = "on";

                        _log = "on";

                        _monitor = "on";

                    }else if(_authorization === 5){

                        _config = "on";

                        _monitor = "on";

                    }else if(_authorization === 3){

                        _log = "on";

                        _monitor = "on";
                    }else if(_authorization === 2){

                        _log = "on";

                    }else if(_authorization === 1){

                        _monitor = "on";
                    }

                    if(response[i].email_check === undefined || response[i].email_check === false){

                        _email_check = "off";

                    }else{

                        _email_check = "on";
                    }

                    var _otp = "";

                    if(response[i].otp_check === undefined || response[i].otp_check === false){

                        _otp = "false";

                    }else{

                        _otp = "true";
                    }

                    if(response[i].trusted_hosts.length > 0){

                        for(var k = 0; k < response[i].trusted_hosts.length; k++){

                            if(parseInt(k) === parseInt(response[i].trusted_hosts.length)-parseInt(1)){

                                _trusted_hosts = _trusted_hosts + response[i].trusted_hosts[k];

                            }else{

                                _trusted_hosts = _trusted_hosts + response[i].trusted_hosts[k] + ",";

                            }
                        }
                    }

                    var _passwdLimitedDate = "";

                    if(response[i]._pass_days_ts !== undefined && response[i].pass_days !== 0){

                        var _saveDate = unixTimeConvert(response[i]._pass_days_ts,'YMD','');

                        _passwdLimitedDate = new Date(_saveDate);

                        _passwdLimitedDate.setDate(_passwdLimitedDate.getDate()+response[i].pass_days);

                        var _year = _passwdLimitedDate.getFullYear();

                        var _month = _passwdLimitedDate.getMonth()+1;

                        if(parseInt(_month) < 10) _month = "0"+_month;

                        var _date = _passwdLimitedDate.getDate();

                        if(parseInt(_date) < 10) _date = "0"+_date;

                        _passwdLimitedDate = _year+"-"+_month+"-"+_date;
                    }


                    records.push({

                        id : _id,
                        pwExpiryDate : response[i].pass_days,
                        tel : response[i].phone,
                        email : response[i].email,
                        email_check : _email_check,
                        config : _config,
                        log : _log,
                        monitor : _monitor,
                        host : _trusted_hosts,
                        role : _role,
                        otp : _otp,
                        md_passwd : response[i].md_passwd,
                        passwdLimitedDate : _passwdLimitedDate

                    });

                }

                if(Ext.getCmp('grid_users'))
                {
                    var store = Ext.getCmp('grid_users').getStore();

                    store.loadData(records);
                }
            }
        );
    }

});