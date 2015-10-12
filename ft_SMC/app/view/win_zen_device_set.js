
Ext.define('SMC.view.win_zen_device_set', {
    extend: 'Ext.window.Window',
    alias: 'widget.zen_device_set',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    border: false,
    height: 360,
    id: 'win_zen_device_set',
    minHeight: 360,
    minWidth: 520,
    width: 520,
    bodyBorder: false,
    title: 'WeGuardia™ SMC2.0',
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
                    xtype: 'form',
                    flex: 1,
                    border: false,
                    id: 'form_equipment',
                    bodyBorder: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'ft_equipment_name',
                            margin: 20,
                            fieldLabel: '장비명 :',
                            labelAlign: 'right',
                            labelSeparator: ' ',
                            labelWidth: 80
                        },
                        {
                            xtype: 'textfield',
                            id: 'ft_equipment_desc',
                            margin: '0 20 0 20',
                            fieldLabel: '기타 정보 :',
                            labelAlign: 'right',
                            labelSeparator: ' ',
                            labelWidth: 80
                        },
                        {
                            xtype: 'fieldset',
                            margin: 20,
                            title: '장비 설정 정보',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!ValidIPAddress(value)){ return get_msg('err_ipv4');}

                                        return true;
                                    },
                                    id: 'ft_equipment_ip',
                                    margin: 10,
                                    fieldLabel: 'IP 주소 :',
                                    labelAlign: 'right',
                                    labelSeparator: ' ',
                                    labelWidth: 110,
                                    listeners: {
                                        errorchange: {
                                            fn: me.onFt_equipment_ipErrorChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'ft_equipment_id',
                                    margin: 10,
                                    fieldLabel: '사용자 아이디 :',
                                    labelAlign: 'right',
                                    labelSeparator: ' ',
                                    labelWidth: 110
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'ft_equipment_pw',
                                    margin: 10,
                                    fieldLabel: '사용자 패스워드 :',
                                    labelAlign: 'right',
                                    labelSeparator: ' ',
                                    labelWidth: 110,
                                    inputType: 'password'
                                }
                            ]
                        },
                        {
                            xtype: 'label',
                            cls: 'errorBox',
                            hidden: true,
                            id: 'errorBox',
                            margin: 10
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '0 15 10 15',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                Ext.getCmp('win_zen_device_set').saveData();

                            },
                            margin: 5,
                            width: 100,
                            text: '확인'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                Ext.getCmp('win_zen_device_set').close();
                            },
                            margin: 5,
                            width: 100,
                            text: '취소'
                        }
                    ]
                }
            ],
            listeners: {
                beforedestroy: {
                    fn: me.onWin_zen_device_setBeforeDestroy,
                    scope: me
                },
                afterrender: {
                    fn: me.onWin_zen_device_setAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onFt_equipment_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "errorBox");
    },

    onWin_zen_device_setBeforeDestroy: function(component, eOpts) {
        Ext.getCmp(DEVICE_COMMON_ID.devicecenter).fireEvent('zendevlistRefresh');
    },

    onWin_zen_device_setAfterRender: function(component, eOpts) {
        if(component.deviceMode === 'MOD'){

            console.log('selectRecord - ', component.deviceParams);

            Ext.getCmp('ft_equipment_name').setValue(component.deviceParams.name);
            Ext.getCmp('ft_equipment_desc').setValue(component.deviceParams.desc);
            Ext.getCmp('ft_equipment_ip').setValue(component.deviceParams.connection_info.ip);
            Ext.getCmp('ft_equipment_id').setValue(component.deviceParams.connection_info.id);
            Ext.getCmp('ft_equipment_pw').setValue(component.deviceParams.connection_info.pwd);

        }else{

            request_helper.xmlrpc_call_Ajax_Post(
                'ftSMC',
                'getDeviceDefault',
                {
                    'kind': Ext.encode('obj_dev_zen')
                },
                function(res){

                    component.deviceParams = res;

                }
            );
        }

        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    saveData: function() {
        if(Ext.getCmp('form_equipment').getForm().isValid()){

            var me = Ext.getCmp('win_zen_device_set');

            var _records = [];

            var _g_cid = Ext.getCmp('pnl_zen_device_tree_view').getSelectionModel().getSelection()[0].raw.cid;
            var _isRecursive = Ext.getCmp('tb_zen_device_groupctrl').down('[itemId=bt_showall]').pressed;
            var filterValue = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_zen_device_search]').down('[itemId=txf_searchstr]').getValue();

            me.deviceParams.name = Ext.getCmp('ft_equipment_name').getValue();
            me.deviceParams.desc = Ext.getCmp('ft_equipment_desc').getValue();
            me.deviceParams.connection_info.ip = Ext.getCmp('ft_equipment_ip').getValue();
            me.deviceParams.connection_info.id = Ext.getCmp('ft_equipment_id').getValue();
            me.deviceParams.connection_info.pwd = Ext.getCmp('ft_equipment_pw').getValue();
            me.deviceParams['@groupcid'] = _g_cid;

            if(me.deviceMode === 'ADD'){

                request_helper.xmlrpc_call_Ajax_Post(
                    'ftSMC',
                    'addDevice',
                    {
                        'obj': Ext.encode(me.deviceParams),
                        'g_cid': Ext.encode(_g_cid)
                    },
                    function(res){

                        if(res)
                        {
                            request_helper.xmlrpc_call_Ajax_Post(
                                'ftSMC',
                                'getDeviceList',
                                {
                                    'g_cid': Ext.encode(_g_cid),
                                    'isRecursive' : Ext.encode(_isRecursive)
                                },
                                function(response){

                                    if(response)
                                    {
                                        Ext.getCmp('gpn_zen_device_list').getStore().loadData(response);

                                        searchDeviceName(Ext.getCmp('gpn_zen_device_list').getStore(), filterValue, ['name', 'ip']);
                                    }
                                }
                            );
                        }
                    }
                );
            }
            else{

                request_helper.xmlrpc_call_Ajax_Post(
                    'ftSMC',
                    'modDevice',
                    {
                        'obj': Ext.encode(me.deviceParams)
                    },
                    function(res){

                        if(res)
                        {
                            request_helper.xmlrpc_call_Ajax_Post(
                                'ftSMC',
                                'getDeviceList',
                                {
                                    'g_cid': Ext.encode(_g_cid),
                                    'isRecursive' : Ext.encode(_isRecursive)
                                },
                                function(response){

                                    if(response)
                                    {
                                        Ext.getCmp('gpn_zen_device_list').getStore().loadData(response);
                                    }
                                }
                            );
                        }
                    }

                );
            }

            me.close();
        }

    }

});