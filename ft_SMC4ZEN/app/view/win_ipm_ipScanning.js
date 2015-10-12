
Ext.define('SMC4ZEN.view.win_ipm_ipScanning', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipm_ipScanning',

    requires: [
        'SMC4ZEN.view.win_ipm_ipScanningViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ipm_ipscanning'
    },
    cls: 'zen_win',
    id: 'win_ipm_ipScanning',
    title: 'IP Scanning 추가',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            bodyPadding: 10,
            header: false,
            items: [
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'ipm_ipscanning_inter',
                            fieldLabel: '인터페이스',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name'
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
                            xtype: 'label',
                            cls: 'lb_req',
                            width: 125,
                            text: '네트워크'
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    var m_temp = value.split('/');

                                    if(m_temp[1] === undefined){
                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                        return get_msg('err_form');
                                    }
                                    else if(m_temp[1] !== undefined){
                                        if(!ValidIPAddress(m_temp[0])){ return get_msg('err_ip'); }
                                        var m_dot_temp = m_temp[1].split('.');

                                        if(m_dot_temp[1] === undefined && m_temp[1] === ""){ return get_msg('err_form'); }
                                        else if(m_dot_temp[1] === undefined && m_temp[1] !== ""){ if(Number(m_temp[1]) < 0 || Number(m_temp[1]) > 24){ return ValidLimit(0,24); } }
                                        else{ if(!ValidIPAddress(m_temp[1])){ return get_msg('err_netmask_form'); } }
                                    }
                                }

                                return true;
                            },
                            id: 'ipm_ipscanning_network',
                            width: 240,
                            enforceMaxLength: true,
                            maskRe: /[0-9.\/]/,
                            maxLength: 31,
                            maxLengthText: ' ',
                            listeners: {
                                focus: 'onIpm_ipscanning_networkFocus',
                                blur: 'onIpm_ipscanning_networkBlur',
                                errorchange: 'onIpm_ipscanning_networkErrorChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'lb_req',
                            width: 125,
                            text: '실행주기'
                        },
                        {
                            xtype: 'combobox',
                            id: 'ipm_ipscanning_cycle',
                            width: 130,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 5,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                data: [
                                    {
                                        name: '5분',
                                        value: 5
                                    },
                                    {
                                        name: '10분',
                                        value: 10
                                    },
                                    {
                                        name: '30분',
                                        value: 30
                                    },
                                    {
                                        name: '1시간',
                                        value: 60
                                    },
                                    {
                                        name: '직접 입력',
                                        value: 'input'
                                    }
                                ],
                                fields: [
                                    {
                                        name: 'name'
                                    },
                                    {
                                        name: 'value'
                                    }
                                ]
                            },
                            valueField: 'value',
                            listeners: {
                                change: 'onIpm_ipscanning_cycleChange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(Number(value) < 5 || Number(value) > 120){ return ValidLimit(5,120); }
                                }

                                return true;
                            },
                            fieldInfo: '입력 범위 : 5 ~ 120',
                            cls: 'inp_unit',
                            disabled: true,
                            id: 'ipm_ipscanning_self_cycle',
                            margin: '0 0 0 5',
                            width: 100,
                            afterBodyEl: [
                                '<div class="inp_after">분</div>'
                            ],
                            enforceMaxLength: true,
                            maskRe: /[0-9]/,
                            maxLength: 3,
                            maxLengthText: ' ',
                            listeners: {
                                blur: 'onTextfieldBlur',
                                focus: 'onTextfieldFocus',
                                errorchange: 'onIpm_ipscanning_self_cycleErrorChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '8 0 0 0',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'ipm_ipscanning_cnt',
                            width: 200,
                            fieldLabel: '개수',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 1,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                data: [
                                    {
                                        name: '1/s',
                                        value: 1
                                    },
                                    {
                                        name: '5/s',
                                        value: 5
                                    },
                                    {
                                        name: '10/s',
                                        value: 10
                                    },
                                    {
                                        name: '20/s',
                                        value: 20
                                    },
                                    {
                                        name: '25/s',
                                        value: 25
                                    },
                                    {
                                        name: '30/s',
                                        value: 30
                                    },
                                    
                                ],
                                fields: [
                                    {
                                        name: 'name'
                                    },
                                    {
                                        name: 'value'
                                    }
                                ]
                            },
                            valueField: 'value'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '0 20 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'ipm_ipscanning_desc',
                            width: 450,
                            fieldLabel: '설명',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            enforceMaxLength: true,
                            maxLength: 160,
                            maxLengthText: ' '
                        }
                    ]
                }
            ]
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            padding: 0,
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    text: '확인',
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    text: '취소',
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_ipm_ipScanningAfterRender'
    },

    onIpm_ipscanning_networkFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        var str2 = disp_help_ip('4s2p');
        component.fieldInfo = str + ", " + str2;
        setTipFocus(this,component);
    },

    onIpm_ipscanning_networkBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onIpm_ipscanning_networkErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIpm_ipscanning_cycleChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "input"){
            Ext.getCmp('ipm_ipscanning_self_cycle').enable();
        }
        else{
            Ext.getCmp('ipm_ipscanning_self_cycle').disable();
        }
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onTextfieldFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onIpm_ipscanning_self_cycleErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = Ext.getCmp('win_ipm_ipScanning');
        var scan_cycle = "";
        var cycle_chk = "";

        if(Ext.getCmp('ipm_ipscanning_network').isValid() === false){ Ext.getCmp('ipm_ipscanning_network').focus(); return false; }
        if(Ext.getCmp('ipm_ipscanning_cycle').getValue() === "input"){
            if(Ext.getCmp('ipm_ipscanning_self_cycle').isValid() === false){ Ext.getCmp('ipm_ipscanning_self_cycle').focus(); return false; }
            scan_cycle = Ext.getCmp('ipm_ipscanning_self_cycle').getValue();
            cycle_chk = true;
        }
        else{
            scan_cycle = Ext.getCmp('ipm_ipscanning_cycle').getValue();
            cycle_chk = false;
        }

        var update = (me.edit==="edit")?true:false;
        var obj = {};

        obj = {
            'interface' : Ext.getCmp('ipm_ipscanning_inter').getValue(),
            'ip' : Ext.getCmp('ipm_ipscanning_network').getValue(),
            'cycle' : scan_cycle,
            'count' : Ext.getCmp('ipm_ipscanning_cnt').getValue(),
            'desc' : Ext.getCmp('ipm_ipscanning_desc').getValue(),
            'cycle_chk' : cycle_chk
        };

        if(me.edit === "edit"){
            obj['_id'] = me.record.id;
        }

        var _params = {
            basename : Ext.encode('network_ipm_scan'),
            obj : Ext.encode(obj),
            update : Ext.encode(update)
        };

        request_helper.xmlrpc_call_JsonP(

            'ftuctrl',
            'setListTypeObj',
            _params,

            function(response){
                Ext.getCmp('NFW2_ipm_ipScanning').get_scanning();

                if(me.edit !== "edit"){
                    Ext.Msg.show({
                        title: 'WeGuardia™ ZEN',
                        msg: get_msg("msg_ok_add"),
                        width: 300,
                        buttons: Ext.Msg.YESNO,
                        buttonText:{
                            yes: "계속 추가",
                            no: "닫기"
                        },
                        fn: me.set_win,
                        icon: Ext.window.MessageBox.INFO
                    });

                }
                else{
                    Ext.Msg.show({
                        title: 'WeGuardia™ ZEN',
                        width: 300,
                        msg: get_msg('msg_ok_edit'),
                        buttons: Ext.Msg.OK,
                        fn: setWinClose,
                        icon: Ext.window.MessageBox.INFO
                    });
                }
            }
        );
    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWin_ipm_ipScanningAfterRender: function(component, eOpts) {

        // this.fieldInfo = makeZenTip();
        // var me = this;

        // var _params = {

        //     option : Ext.encode('all')

        // };

        // Ext.data.JsonP.request({
        //     url : "/api/ftuctrl/get_pname_list",
        //     params : _params,
        //     success : function(response){
        //         var record = [];
        //         for(var i in response.retval){
        //             record.push({
        //                 'name' : response.retval[i].name
        //             });
        //         }

        //         Ext.data.StoreManager.lookup('store_interface').loadData(record);
        //         Ext.getCmp('ipm_ipscanning_inter').setValue(record[0].name);

        //         if(me.edit === "edit"){
        //             me.setTitle("IP Scanning 수정");

        //             Ext.getCmp('ipm_ipscanning_inter').setValue(me.record.data.interface);
        //             Ext.getCmp('ipm_ipscanning_network').setValue(me.record.data.ip);
        //             if(me.record.data.cycle_chk){
        //                 Ext.getCmp('ipm_ipscanning_cycle').setValue("input");
        //                 Ext.getCmp('ipm_ipscanning_self_cycle').setValue(me.record.data.cycle);
        //             }
        //             else{ Ext.getCmp('ipm_ipscanning_cycle').setValue(me.record.data.cycle); }
        //             Ext.getCmp('ipm_ipscanning_cnt').setValue(me.record.data.count);
        //             Ext.getCmp('ipm_ipscanning_desc').setValue(me.record.data.desc);

        //         }
        //     },
        //     failure : function(response){
        //         hideLoadMask();
        //         Ext.Msg.show({
        //             title : 'Error message',
        //             msg : 'Error Message',
        //             width : 300,
        //             buttons : Ext.Msg.OK,
        //             icon:Ext.window.MessageBox.INFO
        //         });
        //     }
        // });
    },

    set_win: function(btn) {
        if(btn==="no"){
            var win = Ext.WindowManager.getActive();
            if (win) {
                win.close();
            }
        }else{
            var store = Ext.data.StoreManager.lookup('store_ipm_scanning_list');
            var me = Ext.getCmp('NFW2_ipm_ipScanning');

            if(store.getCount() >= me.scanning_cnt){
                var win = Ext.WindowManager.getActive();
                win.close();
                Ext.MessageBox.alert("WeGuardia™ ZEN",ValidMaxCnt(me.scanning_cnt));
            }
            else{
                Ext.ComponentQuery.query('container[itemId="fm"]').forEach(function(fm){ fm.getForm().reset(); });
                Ext.ComponentQuery.query('container[cls="fld_msg"]').forEach(function(cls){ cls.removeCls('ic_msg_err'); cls.update(''); });
                Ext.getCmp('ipm_ipscanning_inter').setValue(Ext.getCmp('ipm_ipscanning_inter').getStore().data.items[0].data.name);
            }
        }
    }
});