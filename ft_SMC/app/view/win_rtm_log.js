
Ext.define('SMC.view.win_rtm_log', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.form.CheckboxGroup',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column'
    ],

    height: 700,
    id: 'win_rtm_log',
    width: 1020,
    title: '실시간 패킷 모니터',
    maximizable: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    height: 180,
                    id: 'fs_rtm_log',
                    style: {
                        'background-color': '#dfe9f6;'
                    },
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    margin: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                if(checked)
                                                {
                                                    Ext.getCmp('txt_src_ip1').enable();
                                                    Ext.getCmp('txt_src_ip2').enable();
                                                }
                                                else
                                                {
                                                    Ext.getCmp('txt_src_ip1').disable();
                                                    Ext.getCmp('txt_src_ip2').disable();

                                                    Ext.getCmp('txt_src_ip1').setValue('');
                                                    Ext.getCmp('txt_src_ip2').setValue('');
                                                }
                                            },
                                            id: 'chk_src_ip',
                                            boxLabel: '출발지 주소 (범위)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_src_ip1',
                                            width: 170,
                                            labelAlign: 'top'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '~'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_src_ip2',
                                            width: 170,
                                            labelSeparator: ' '
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                if(checked)
                                                {
                                                    Ext.getCmp('txt_src_port1').enable();
                                                    Ext.getCmp('txt_src_port2').enable();
                                                }
                                                else
                                                {
                                                    Ext.getCmp('txt_src_port1').disable();
                                                    Ext.getCmp('txt_src_port2').disable();

                                                    Ext.getCmp('txt_src_port1').setValue('');
                                                    Ext.getCmp('txt_src_port2').setValue('');
                                                }
                                            },
                                            id: 'chk_src_port',
                                            boxLabel: '출발지 포트 (범위)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_src_port1',
                                            width: 170,
                                            labelAlign: 'top'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '~'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_src_port2',
                                            width: 170,
                                            labelSeparator: ' '
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'cmb_direction',
                                            width: 80,
                                            fieldLabel: '방향',
                                            labelAlign: 'top',
                                            editable: false,
                                            displayField: 'direction',
                                            queryMode: 'local',
                                            store: 'st_rtm_direction',
                                            valueField: 'direction'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                if(checked)
                                                {
                                                    Ext.getCmp('txt_dst_ip1').enable();
                                                    Ext.getCmp('txt_dst_ip2').enable();
                                                }
                                                else
                                                {
                                                    Ext.getCmp('txt_dst_ip1').disable();
                                                    Ext.getCmp('txt_dst_ip2').disable();

                                                    Ext.getCmp('txt_dst_ip1').setValue('');
                                                    Ext.getCmp('txt_dst_ip2').setValue('');
                                                }
                                            },
                                            id: 'chk_dst_ip',
                                            boxLabel: '목적지 주소 (범위)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_dst_ip1',
                                            width: 170,
                                            labelAlign: 'top'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '~'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_dst_ip2',
                                            width: 170,
                                            labelSeparator: ' '
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    margin: 5,
                                    layout: {
                                        type: 'vbox',
                                        align: 'center',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            handler: function(checkbox, checked) {
                                                if(checked)
                                                {
                                                    Ext.getCmp('txt_dst_port1').enable();
                                                    Ext.getCmp('txt_dst_port2').enable();
                                                }
                                                else
                                                {
                                                    Ext.getCmp('txt_dst_port1').disable();
                                                    Ext.getCmp('txt_dst_port2').disable();

                                                    Ext.getCmp('txt_dst_port1').setValue('');
                                                    Ext.getCmp('txt_dst_port2').setValue('');
                                                }
                                            },
                                            id: 'chk_dst_port',
                                            boxLabel: '목적지 포트 (범위)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_dst_port1',
                                            width: 170,
                                            labelAlign: 'top'
                                        },
                                        {
                                            xtype: 'label',
                                            text: '~'
                                        },
                                        {
                                            xtype: 'textfield',
                                            disabled: true,
                                            id: 'txt_dst_port2',
                                            width: 170,
                                            labelSeparator: ' '
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            title: 'etc',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center',
                                padding: 5
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    handler: function(checkbox, checked) {
                                        if(checked)
                                        {
                                            Ext.getCmp('cmb_uid').enable();
                                            Ext.getCmp('txt_uid').enable();
                                        }
                                        else
                                        {
                                            Ext.getCmp('cmb_uid').disable();
                                            Ext.getCmp('txt_uid').disable();

                                            Ext.getCmp('cmb_uid').setValue('All');
                                            Ext.getCmp('txt_uid').setValue('');
                                        }
                                    },
                                    id: 'chk_uid',
                                    margin: '0 10 0 0',
                                    labelWidth: 200,
                                    boxLabel: 'UID 타입'
                                },
                                {
                                    xtype: 'combobox',
                                    disabled: true,
                                    id: 'cmb_uid',
                                    margin: '0 35 0 0',
                                    width: 140,
                                    editable: false,
                                    displayField: 'uid',
                                    queryMode: 'local',
                                    store: 'st_rtm_uid',
                                    valueField: 'uid'
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    margin: '0 10 0 0',
                                    text: 'UID :'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    disabled: true,
                                    id: 'txt_uid',
                                    padding: '0 20 0 0',
                                    width: 140,
                                    fieldLabel: 'Label',
                                    hideLabel: true
                                },
                                {
                                    xtype: 'checkboxgroup',
                                    margin: '0 35 0 0',
                                    width: 260,
                                    fieldLabel: '행위',
                                    labelWidth: 40,
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_accept',
                                            boxLabel: 'Accept',
                                            checked: true
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_drop',
                                            boxLabel: 'Drop',
                                            checked: true
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            id: 'chk_ipsec',
                                            boxLabel: 'IPSec',
                                            checked: true
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cmb_protocol',
                                    width: 200,
                                    fieldLabel: '프로토콜',
                                    labelWidth: 60,
                                    editable: false,
                                    displayField: 'protocol',
                                    queryMode: 'local',
                                    store: 'st_rtm_protocol',
                                    valueField: 'protocol'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    height: 40,
                    margin: '0 5 5 5',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end',
                        padding: 5
                    },
                    items: [
                        {
                            xtype: 'button',
                            toggleHandler: function(button, state) {
                                if(state)
                                {
                                    Ext.getCmp('fs_rtm_log').show();
                                }
                                else
                                {
                                    Ext.getCmp('fs_rtm_log').hide();
                                }
                            },
                            id: 'bt_rule_config',
                            margin: '0 10 0 0',
                            width: 120,
                            enableToggle: true,
                            pressed: true,
                            text: '필터설정'
                        },
                        {
                            xtype: 'button',
                            id: 'bt_rule_clear',
                            margin: '0 10 0 0',
                            width: 120,
                            text: '필터삭제',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            task: {
                                run: function() 
                                {
                                    var store = Ext.getStore('st_rtm_log');
                                    
                                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];
                                    
                                    Ext.data.JsonP.request(
                                        {
                                            url : '/api/ftRtmMsgMgr/getRTLog',
                                            params : {
                                                cid : Ext.encode(cid)
                                            },
                                            success : function(res_data){
                                                
                                                if(store.data.items.length > 5000)
                                                {
                                                    while(store.data.items.length < 5000)
                                                        store.removeAt(store.data.items.length-1);
                                                }
                                                else
                                                {
                                                    if (res_data != [])
                                                    {
                                                        store.insert(0,res_data);
                                                    }
                                                }
                                            },
                                            failure : function(res_data)
                                            {                    
                                                Ext.TaskManager.stop(this.task);                    
                                            }
                                        }
                                    );        
                                },
                                interval: 500
                            },
                            state: true,
                            id: 'bt_log_req',
                            margin: '0 10 0 0',
                            width: 120,
                            allowDepress: false,
                            text: '로그요청',
                            listeners: {
                                click: {
                                    fn: me.onId_log_reqClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            task: {
                                run: function() 
                                {
                                    var store = Ext.getStore('st_rtm_log');
                                    
                                    var grid = Ext.getCmp('gpn_rtm_devicelist');
                                    var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];
                                    
                                    Ext.data.JsonP.request(
                                        {
                                            url : '/api/ftRtmMsgMgr/getRTLog',
                                            params : {
                                                cid : Ext.encode(cid)
                                            },
                                            success : function(res_data){
                                                
                                                if(store.data.items.length > 5000)
                                                {
                                                    while(store.data.items.length < 5000)
                                                        store.removeAt(store.data.items.length-1);
                                                }
                                                else
                                                {
                                                    if (res_data != [])
                                                    {
                                                        store.insert(0,res_data);
                                                    }
                                                }
                                            },
                                            failure : function(res_data)
                                            {                    
                                                Ext.TaskManager.stop(this.task);                    
                                            }
                                        }
                                    );        
                                },
                                interval: 500
                            },
                            state: true,
                            id: 'bt_log_clear',
                            margin: '0 10 0 0',
                            width: 120,
                            allowDepress: false,
                            text: '로그삭제',
                            listeners: {
                                click: {
                                    fn: me.onId_log_reqClick1,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    viewConfig: {
                        loadMask: false,
                        preserveScrollOnRefresh: true,
                        
                    },
                    flex: 1,
                    id: 'grv_rtm_rtlog',
                    autoScroll: true,
                    header: false,
                    forceFit: false,
                    store: 'st_rtm_log',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'eth',
                            text: 'eth'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'Length',
                            text: '길이'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'src_ip1',
                            text: '출발지 IP'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'src_nat_ip',
                            text: '출발지 Nat IP'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'dst_ip1',
                            text: '목적지 IP'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'dst_nat_ip',
                            text: '목적지 Nat IP'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'protocol',
                            text: '프로토콜'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 110,
                            dataIndex: 'src_nat_port',
                            text: '출발지 Nat 포트'
                        },
                        {
                            xtype: 'gridcolumn',
                            width: 110,
                            dataIndex: 'dst_nat_port',
                            text: '목적지 Nat 포트'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'action',
                            text: '행위'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'nat_uid',
                            text: 'UID (Nat)'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'timeout',
                            text: 'Timeout'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'payload',
                            text: 'Payload'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'etc',
                            text: 'etc'
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_rtm_logAfterRender,
                    scope: me
                },
                destroy: {
                    fn: me.onWin_rtm_logDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.getCmp('chk_src_ip').setValue(false);
        Ext.getCmp('chk_src_port').setValue(false);
        Ext.getCmp('chk_dst_ip').setValue(false);
        Ext.getCmp('chk_dst_port').setValue(false);
        Ext.getCmp('chk_uid').setValue(false);
        Ext.getCmp('chk_uid').setValue(false);
        Ext.getCmp('chk_accept').setValue(true);
        Ext.getCmp('chk_drop').setValue(true);
        Ext.getCmp('chk_ipsec').setValue(true);
        Ext.getCmp('cmb_protocol').setValue('All');
        Ext.getCmp('cmb_direction').setValue('<========>');
    },

    onId_log_reqClick: function(button, e, eOpts) {
        var chk_src_ip = Ext.getCmp('chk_src_ip').getValue();
        var chk_src_port = Ext.getCmp('chk_src_port').getValue();
        var chk_dst_ip = Ext.getCmp('chk_dst_ip').getValue();
        var chk_dst_port = Ext.getCmp('chk_dst_port').getValue();
        var chk_uid = Ext.getCmp('chk_uid').getValue();

        var protocol_value = Ext.getCmp('cmb_protocol').getValue();
        var protocol_record = Ext.getCmp('cmb_protocol').findRecord(Ext.getCmp('cmb_protocol').valueField || Ext.getCmp('cmb_protocol').displayField, protocol_value);
        var protocol_index = Ext.getCmp('cmb_protocol').store.indexOf(protocol_record);

        var direction_value = Ext.getCmp('cmb_direction').getValue();
        var direction_record = Ext.getCmp('cmb_direction').findRecord(Ext.getCmp('cmb_direction').valueField || Ext.getCmp('cmb_direction').displayField, direction_value);
        var direction_index = Ext.getCmp('cmb_direction').store.indexOf(direction_record);

        var src_ip1 = Ext.getCmp('txt_src_ip1').getValue();
        var src_ip2 = Ext.getCmp('txt_src_ip2').getValue();

        var dst_ip1 = Ext.getCmp('txt_dst_ip1').getValue();
        var dst_ip2 = Ext.getCmp('txt_dst_ip2').getValue();

        var src_port1 = Ext.getCmp('txt_src_port1').getValue();
        var src_port2 = Ext.getCmp('txt_src_port2').getValue();

        var dst_port1 = Ext.getCmp('txt_dst_port1').getValue();
        var dst_port2 = Ext.getCmp('txt_dst_port2').getValue();

        var uid_value = Ext.getCmp('cmb_uid').getValue();
        var uid_record = Ext.getCmp('cmb_uid').findRecord(Ext.getCmp('cmb_uid').valueField || Ext.getCmp('cmb_uid').displayField, uid_value);
        var uid_index = Ext.getCmp('cmb_uid').store.indexOf(uid_record);

        var accept = 1;
        var drop = 1;
        var ipsec = 1;

        if (Ext.getCmp('chk_accept').getValue() === false)
            accept = 0;

        if (Ext.getCmp('chk_drop').getValue() === false)
            drop = 0;

        if (Ext.getCmp('chk_ipsec').getValue() === false)
            ipsec = 0;

        var uid = Ext.getCmp('txt_uid').getValue();

        if (chk_src_ip === false)
        {
            src_ip1 = '0.0.0.0';
            src_ip2 = '255.255.255.255';
        }

        if (chk_src_port === false)
        {
            src_port1 = 0;
            src_port2 = 65535;
        }

        if (chk_dst_ip === false)
        {
            dst_ip1 = '0.0.0.0';
            dst_ip2 = '255.255.255.255';
        }

        if (chk_dst_port === false)
        {
            dst_port1 = 0;
            dst_port2 = 65535;
        }

        if (Ext.getCmp('chk_uid').getValue() === false)
            uid = 0;

        if (uid === '')
            uid = 0;

        var taskbutton = Ext.getCmp('bt_log_req');

        if(taskbutton.state)
        {
            taskbutton.state = false;

            var grid = Ext.getCmp('gpn_rtm_devicelist');
            var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

            Ext.data.JsonP.request
            (
                {
                    url : '/api/ftRtmMsgMgr/SendReqLog',
                    params :
                    {
                        cid : Ext.encode(cid),
                        sip1 : Ext.encode(src_ip1),
                        sip2 : Ext.encode(src_ip2),
                        sport1 : src_port1,
                        sport2 : src_port2,
                        dip1 : Ext.encode(dst_ip1),
                        dip2 : Ext.encode(dst_ip2),
                        dport1 : dst_port1,
                        dport2 : dst_port2,
                        direction : direction_index+1,
                        accept : accept,
                        drop : drop,
                        ipsec : ipsec,
                        protocol : protocol_index,
                        uid_type : uid_index,
                        uid : uid
                    },
                    success : function(res_data)
                    {
                        if(res_data === true)
                        {
                            taskbutton.setText('로그중지');
                            Ext.TaskManager.start(taskbutton.task);
                        }
                        else
                        {
                            Ext.Msg.alert('Weguardia RTM2.0 Client','실시간 로그 필터에 유효하지 않은 값이 있습니다.');
                            taskbutton.state = true;
                        }
                    },
                    failure : function(res_data)
                    {
                        Ext.Msg.alert('Weguardia RTM2.0 Client','실시간 로그 필터에 유효하지 않은 값이 있습니다.');
                        taskbutton.state = true;
                    }
                }
            );
        }
        else
        {
            taskbutton.state = true;
            Ext.TaskManager.stop(taskbutton.task);
            taskbutton.setText('로그요청');

            var grid = Ext.getCmp('gpn_rtm_devicelist');
            var cid = grid.getSelectionModel().getSelection()[0].raw['@cid'];

            Ext.data.JsonP.request(
                {
                    url : '/api/ftRtmMsgMgr/SendEndLogReq',
                    params :
                    {
                        cid : Ext.encode(cid)
                    },
                    success : function(res_data)
                    {
                    },
                    failure : function(res_data)
                    {
                    }
                }
            );
        }
    },

    onId_log_reqClick1: function(button, e, eOpts) {
        var grid = Ext.getCmp('grv_rtm_rtlog');
        grid.getStore().removeAll();
    },

    onWin_rtm_logAfterRender: function(component, eOpts) {
        var pnl_smc_device_center = Ext.getCmp('pnl_smc_device_center');
        if (pnl_smc_device_center.taskObj)
        {
            clearInterval(pnl_smc_device_center.taskObj);
        }

        Ext.getCmp('cmb_protocol').select(Ext.getStore('st_rtm_protocol').getAt(0));
        Ext.getCmp('cmb_uid').select(Ext.getStore('st_rtm_uid').getAt(0));
        Ext.getCmp('cmb_direction').select(Ext.getStore('st_rtm_direction').getAt(2));
        var store = Ext.getStore('st_rtm_log');
        store.removeAll();
    },

    onWin_rtm_logDestroy: function(component, eOpts) {
        Ext.getCmp('pnl_rtm_main').timer_tick();
    }

});