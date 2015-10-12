
Ext.define('SMC4ZEN.view.NFW2_system_admin_adminConfig', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_system_admin_adminconfig',

    requires: [
        'SMC4ZEN.view.NFW2_system_admin_adminConfigViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.selection.CheckboxModel'
    ],
    config: {
        obj_d: {
            root: '',
            sub: ''
        },
        limitCount: 5
    },
    viewModel: {
        type: 'nfw2_system_admin_adminconfig'
    },
    //cls: 'zen_body',
    bodyPadding : 5,
    id: 'NFW2_system_admin_adminConfig',
    overflowY : 'auto',
    defaultListenerScope: true,
    title : '관리자',
    // SMC4ZEN에서는 관리자를 추가할 수 없습니다.
    /*
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            cls: 'zen_toolbar',
            items: [
                {
                    xtype: 'button',
                    iconCls: 'ic_add',
                    bind: {
                        text: '{add}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'ic_del',
                    bind: {
                        text: '{del}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    */
    listeners: {
        afterrender: 'onViewportAfterRender'
    },
    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        id: 'grid_users',
                        margin: '5 0 0 0',
                        columnLines: true,
                        store: 'store_usersList',
                        columns: [
                            {
                                xtype: 'rownumberer',
                                align: 'center',
                                text: 'N'
                            },
                            {
                                xtype: 'gridcolumn',
                                hidden: true,
                                dataIndex: 'role',
                                bind: {
                                    text: '{section}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                    if(record.get('role') === 'Super'){

                                        return value;
                                        //return value + '<img src="../../resources/images/dot_super.gif/>';

                                    }else{

                                        return value;

                                    }

                                },
                                dataIndex: 'id',
                                flex: 1,
                                bind: {
                                    text: '{id}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'email',
                                flex: 1,
                                bind: {
                                    text: '{e_mail}'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                id: 'grid_column_mail',
                                align: 'center',
                                dataIndex: 'email_check',
                                flex: 1.2,
                                bind: {
                                    text: '{receiving_log_alarm_mail}'
                                },
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
                                bind: {
                                    text: '{access_authority}'
                                },
                                columns: [
                                    {
                                        xtype: 'actioncolumn',
                                        align: 'center',
                                        dataIndex: 'config',
                                        flex: 1.3,
                                        bind: {
                                            text: '{set}'
                                        },
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
                                        align: 'center',
                                        dataIndex: 'log',
                                        flex: 1.3,
                                        bind: {
                                            text: '{log}'
                                        },
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
                                        align: 'center',
                                        dataIndex: 'monitor',
                                        flex: 1.3,
                                        bind: {
                                            text: '{monitor}'
                                        },
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
                                dataIndex: 'tel',
                                flex: 1,
                                bind: {
                                    text: '{contact_num}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'pwExpiryDate',
                                flex: 1.5,
                                bind: {
                                    text: '{pwd_period}'
                                }
                            },
                            {
                                xtype: 'gridcolumn',
                                id: 'grid_column_host',
                                dataIndex: 'host',
                                flex: 2,
                                bind: {
                                    text: '{trusted_network}'
                                }
                            },
                            {
                                xtype: 'actioncolumn',
                                align: 'center',
                                dataIndex: 'otp',
                                text: 'OTP',
                                flex : 1,
                                items: [
                                    {
                                        getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                            return (r.get('otp') === 'true')? "b_on":"b_off";
                                        }
                                    }
                                ]
                            }
                        ],
                        // listeners: {
                        //     celldblclick: 'onGrid_usersCellDblClick'
                        // },
                        selModel: Ext.create('Ext.selection.CheckboxModel', {
                            selType: 'checkboxmodel'
                        })
                    }
                ]
            };

        if (instanceConfig) {

            me.getConfigurator().merge(me, config, instanceConfig);

        }

        return me.callParent([config]);
    },
    // SMC4ZEN 에서 계정은 추가할 수 없습니다.
    /*
    onButtonClick: function(button, e, eOpts) {

        var me = this;

        var win = Ext.create('SMC4ZEN.view.win_admin_config',{

            'parent' : me

        });

        win.show();

    },
    */
    // SMC4ZEN 에서 계정은 삭제할 수 없습니다.
    /*
    onButtonClick1: function(button, e, eOpts) {
        var me = this;

        var grid_chk = Ext.getCmp('grid_users').getSelectionModel().getSelection();

        Ext.MessageBox.confirm(__weguardia,get_msg('conf_del'),function(btn){

            if(btn === "yes"){

                for(var i in grid_chk){
                    if(grid_chk[i].data.role === 'Super'){
                        Ext.MessageBox.alert(__weguardia, get_msg('err_super_admin'));
                        continue;
                    }else{

                        var _params = {
                            userid : Ext.encode(grid_chk[i].data.id)
                        };

                        request_helper.xmlrpc_call_JsonP(
                            'ftuctrl',
                            'delUser',
                            _params,
                            function(response){
                                me.getUsersList();
                            }
                        );
                    }
                }
            }else{
                return false;
            }
        });
    },
    */
    // SMC4ZEN 에서 계정은 수정할 수 없습니다.
    /*
    onGrid_usersCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var me = this;

        var win = Ext.create('SMC4ZEN.view.win_admin_config',{
            edit : "edit",
            num : rowIndex + 1
        });

        win.obj_d.data = record.data;

        win.show();
    },
    */
    onViewportAfterRender: function(component, eOpts) {
        var me = this;

        me.getUsersList();

        Ext.suspendLayouts();
        me.limitCount = 5;
        Ext.resumeLayouts(true);

    },

    getUsersList: function() {
        
        var me = this;
        var vm = me.getViewModel();
        var users = vm.getData().mgtable_users;
        var store = Ext.data.StoreManager.lookup('store_usersList');
        var records = [];

        // var _params = {
        //     basename : Ext.encode('mgtable_users')
        // };

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'getObjects',
        //     _params,
        //     function(response){

        if(users){

            for(var i = 0, max = users.length; i < max; i++){

                var _role = "";
                var _trusted_hosts = "";
                var userid = users[i].userid;
                var authorization_log = "off";
                var authorization_set = "off";
                var authorization_mon = "off";
                var email_check = "off";
                var _authorization = users[i].authorization;

                if(users[i].role === 1){

                    _role = "Super";

               }
                else{

                    _role = "Admin";

                }

                if(_authorization === 7){

                    _log = "on";
                    _config = "on";
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

                if(users[i].email_check === undefined || users[i].email_check === false){

                    _email_check = "off";

                }else{

                    _email_check = "on";

                }

                // OTP

                var _otp = "";

                if(users[i].otp_check === undefined || users[i].otp_check === false){

                    _otp = "false";


                }else{

                    _otp = "true";

                }

                if(users[i].trusted_hosts.length > 0){

                    for(var k = 0; k < users[i].trusted_hosts.length; k++){

                        if(parseInt(k) === parseInt(users[i].trusted_hosts.length)-parseInt(1)){

                            _trusted_hosts = _trusted_hosts + users[i].trusted_hosts[k];

                        }else{

                            _trusted_hosts = _trusted_hosts + users[i].trusted_hosts[k] + ",";

                        }


                    }
                }

                records.push({
                    id : userid,
                    pwExpiryDate : users[i].pass_days,
                    tel : users[i].phone,
                    email : users[i].email,
                    email_check : _email_check,
                    config : _config,
                    log : _log,
                    monitor : _monitor,
                    host : _trusted_hosts,
                    role : _role,
                    otp : _otp,
                    md_passwd : users[i].md_passwd,
                        //pass_days: response.list[i].pass_days
                    _pass_limit_days_ts : (users[i]._pass_limit_days_ts)?unixTimeConvert(users[i]._pass_limit_days_ts,'YMD',''):''
                });
        
                store.add(records);

            }

        }
            
    }

});