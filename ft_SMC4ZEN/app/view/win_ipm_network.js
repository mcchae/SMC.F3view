
Ext.define('SMC4ZEN.view.win_ipm_network', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ipm_network',

    requires: [
        'SMC4ZEN.view.win_ipm_networkViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.button.Segmented',
        'Ext.button.Button',
        'Ext.XTemplate',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'win_ipm_network'
    },
    cls: 'zen_win',
    id: 'win_ipm_network',
    title: '관리 네트워크 추가',
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
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'lb_req',
                            width: 125,
                            bind: {
                                text: '{obj_name}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                }

                                return true;
                            },
                            id: 'ipm_network_name',
                            width: 250,
                            labelSeparator: ' ',
                            enforceMaxLength: true,
                            maxLength: 160,
                            listeners: {
                                errorchange: 'onIpm_network_nameErrorChange',
                                blur: 'onIpm_network_nameBlur'
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
                            id: 'ipm_inter',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            }
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
                            width: 135,
                            bind: {
                                text: '{network}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value !== true){
                                    var me = Ext.getCmp('win_ipm_network');
                                    var store = Ext.data.StoreManager.lookup('store_ipm_network_list');
                                    var r_temp = value.split('-');
                                    var m_temp = value.split('/');

                                    if(r_temp[1] === undefined && m_temp[1] === undefined){
                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                        return get_msg('err_form');
                                    }
                                    else if(r_temp[1] !== undefined){
                                        if(!ValidIPAddress(r_temp[0])){ return get_msg('err_ip'); }
                                        if(!ValidIPAddress(r_temp[1])){ return get_msg('err_ip'); }
                                    }
                                    else if(m_temp[1] !== undefined){
                                        if(!ValidIPAddress(m_temp[0])){ return get_msg('err_ip'); }
                                        var m_dot_temp = m_temp[1].split('.');

                                        if(m_dot_temp[1] === undefined && m_temp[1] !== ""){ if(Number(m_temp[1]) < 0 || Number(m_temp[1]) > 24){ return ValidLimit(0,24); } }
                                        else{ if(!ValidNetMask(value)){ return get_msg('err_form'); } }
                                    }

                                    var chk_num = 0;
                                    for(var i in store.data.items){
                                        if(store.data.items[i].data.ip === value){ chk_num++; }
                                    }

                                    if(me.edit === "edit"){
                                        if(chk_num > 1){ return get_msg('err_configdob'); }
                                    }
                                    else{
                                        if(chk_num > 0){ return get_msg('err_configdob'); }
                                    }
                                }

                                return true;
                            },
                            id: 'ipm_network',
                            margin: '0 0 0 -10',
                            width: 250,
                            labelSeparator: ' ',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.\-\/]/,
                            maxLength: 31,
                            maxLengthText: ' ',
                            listeners: {
                                focus: 'onIpm_networkFocus',
                                blur: 'onIpm_networkBlur',
                                keydown: 'onIpm_networkKeydown',
                                errorchange: 'onIpm_networkErrorChange'
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
                            margin: '0 0 0 10',
                            width: 125,
                            text: '기본 행위'
                        },
                        {
                            xtype: 'segmentedbutton',
                            cls: 'zen_seg',
                            items: [
                                {
                                    id: 'ipm_network_seg1',
                                    enableToggle: true,
                                    pressed: true,
                                    bind: {
                                        text: '{detect}'
                                    }
                                },
                                {
                                    id: 'ipm_network_seg2',
                                    bind: {
                                        text: '{deny}'
                                    }
                                }
                            ]
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
                            xtype: 'combobox',
                            id: 'network_ipscan_com',
                            width: 250,
                            fieldLabel: 'IP Scan 실행 주기',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: {
                                data: [
                                    {
                                        name: '사용 안함',
                                        value: null
                                    },
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
                                        name: '60분',
                                        value: 60
                                    },
                                    {
                                        name: '직접 입력',
                                        value: 0
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
                                change: 'onComboboxChange'
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
                            fieldInfo: '입력범위 : 1 ~ 120',
                            cls: 'inp_unit',
                            disabled: true,
                            id: 'network_ipscan_cnt',
                            margin: '0 0 0 5',
                            width: 120,
                            afterBodyEl: [
                                '<div class="inp_after">{[__zen(\'min\')]}</div>'
                            ],
                            enforceMaxLength: true,
                            maxLength: 3,
                            listeners: {
                                focus: 'onNetwork_ipscan_cntFocus',
                                blur: 'onNetwork_ipscan_cntBlur',
                                errorchange: 'onNetwork_ipscan_cntErrorChange'
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
                            id: 'network_ipscan_sec',
                            width: 250,
                            fieldLabel: '초당 IP Scan 개수',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            editable: false,
                            displayField: 'value',
                            queryMode: 'local',
                            value : 1,
                            store: {
                                data: [
                                    {
                                        value: 1
                                    },
                                    {
                                        value: 5
                                    },
                                    {
                                        value: 10
                                    },
                                    {
                                        value: 20
                                    },
                                    {
                                        value: 25
                                    },
                                    {
                                        value: 30
                                    }
                                ],
                                fields: [
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
                    margin: '0 10 0 0',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'ipm_network_desc',
                            width: 450,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            enforceMaxLength: true,
                            maxLength: 160,
                            bind: {
                                fieldLabel: '{desc}'
                            }
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
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWin_ipm_networkAfterRender'
    },

    onIpm_network_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIpm_network_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onIpm_networkFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4mrp');
        component.fieldInfo = str;
        setTipFocus(this, component);
    },

    onIpm_networkBlur: function(component, event, eOpts) {
        component.validateValue(true);
        setTipBlur(this, component);
    },

    onIpm_networkKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onIpm_networkErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        
        if(newValue === 0){

            Ext.getCmp('network_ipscan_cnt').enable(true);
            Ext.getCmp('network_ipscan_sec').show();

        }
        else if(newValue === null){

            Ext.getCmp('network_ipscan_cnt').disable(true);
            Ext.getCmp('network_ipscan_sec').hide();

        }
        else{

            Ext.getCmp('network_ipscan_cnt').disable(true);
            Ext.getCmp('network_ipscan_sec').show();

        }

    },

    onNetwork_ipscan_cntFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onNetwork_ipscan_cntBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onNetwork_ipscan_cntErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onButtonClick: function(button, e, eOpts) {
        
        var me = this;
        var obj = {};
        var cycle = "";
        var action = "accept";
        var update = (me.edit==="edit") ? true : false;
        var obj_scan = {};
        var cycle_chk = false;
        var st_ipmanager = Ext.data.StoreManager.lookup('store_ipm_network_list');

        if(Ext.getCmp('ipm_network_name').isValid() === false){ Ext.getCmp('ipm_network_name').focus(); return false; }
        if(Ext.getCmp('ipm_network').isValid() === false){ Ext.getCmp('ipm_network').focus(); return false; }
        if(Ext.getCmp('ipm_network_seg1').pressed){ action = "accept"; }
        else{ action = "deny"; }

        if(Ext.getCmp('network_ipscan_com').getValue() === 0){
            if(Ext.getCmp('network_ipscan_cnt').isValid() === false){ Ext.getCmp('network_ipscan_cnt').focus(); return false; }
            cycle = Ext.getCmp('network_ipscan_cnt').getValue();
            cycle_chk = true;
        }
        else{
            cycle = Ext.getCmp('network_ipscan_com').getValue();
            cycle_chk = false;
        }

        obj = {
            'name' : Ext.getCmp('ipm_network_name').getValue(),
            'interface' : Ext.getCmp('ipm_inter').getValue(),
            'ip' : Ext.getCmp('ipm_network').getValue(),
            'action' : action,
            'desc' : Ext.getCmp('ipm_network_desc').getValue(),
            'cycle' : cycle,
            'cycle_chk' : cycle_chk,
            'count' : Ext.getCmp('network_ipscan_sec').getValue()
        };

        // obj_scan = {
        //     'interface' : Ext.getCmp('ipm_inter').getValue(),
        //     'ip' : Ext.getCmp('ipm_network').getValue(),

        //     'desc' : Ext.getCmp('ipm_network_desc').getValue()
        // };

        if(me.edit === "edit"){

            me.record.set(obj);
            me.record.commit();
            Ext.getCmp('ipm_network_grid').getView().refresh();

        }
        else{

            st_ipmanager.add(obj);

        }

        me.close();

        // SMC4ZEN 에서 더이상 사용하지 않습니다.

        // var _params = {
        //     basename : Ext.encode('network_ipm_manager'),
        //     obj : Ext.encode(obj),
        //     update : Ext.encode(update)
        // };

        // request_helper.xmlrpc_call_JsonP(

        //     'ftuctrl',
        //     'setListTypeObj',
        //     _params,

        //     function(response){
        //         Ext.getCmp('NFW2_ipm_network').get_ipm_network();

        //         if(me.edit !== "edit"){
        //             Ext.Msg.show({
        //                 title: __weguardia,
        //                 msg: get_msg("msg_ok_add"),
        //                 width: 300,
        //                 buttons: Ext.Msg.YESNO,
        //                 buttonText:{
        //                     yes: __zen('add_plus'),
        //                     no: __zen('close')
        //                 },
        //                 fn: me.set_win,
        //                 icon: Ext.window.MessageBox.INFO
        //             });

        //         }
        //         else{
        //             Ext.Msg.show({
        //                 title: __weguardia,
        //                 width: 300,
        //                 msg: get_msg('msg_ok_edit'),
        //                 buttons: Ext.Msg.OK,
        //                 fn: setWinClose,
        //                 icon: Ext.window.MessageBox.INFO
        //             });
        //         }
        //     }
        // );
    },

    onButtonClick1: function(button, e, eOpts) {

        this.close();

    },

    onWin_ipm_networkAfterRender: function(component, eOpts) {

        var me = this;
        
        this.fieldInfo = makeZenTip();

        // 컴포넌트 변수 선언

        var txf_objname = Ext.getCmp('ipm_network_name');
        var cmb_interface = Ext.getCmp('ipm_inter');
        var txf_network = Ext.getCmp('ipm_network');
        var cmb_ipmperiod = Ext.getCmp('network_ipscan_com');
        var txf_ipmperiod = Ext.getCmp('network_ipscan_cnt');
        var cmb_ipmnum = Ext.getCmp('network_ipscan_sec');
        var txf_ipmdesc = Ext.getCmp('ipm_network_desc');

        cmb_ipmperiod.setValue(null);

        if(me.edit === "edit"){

            txf_objname.setValue(me.record.get('name'));
            cmb_interface.setValue(me.record.get('interface'));
            txf_network.setValue(me.record.get('ip'));
            
            if(me.record.get('action') === 'accept')   
                Ext.getCmp('ipm_network_seg1').toggle(true);
            else                                            
                Ext.getCmp('ipm_network_seg2').toggle(true);

            if(me.record.get('cycle_chk')){
                cmb_ipmperiod.setValue(0);
                txf_ipmperiod.setValue(me.record.get('cycle'));
            }
            else{
                cmb_ipmperiod.setValue(me.record.get('cycle'));
            }

            cmb_ipmnum.setValue(me.record.get('count'));
            txf_ipmdesc.setValue(me.record.get('desc'));

        }

        // chk_zenauth(null);
        
        // SMC4ZEN 에서 더이상 사용하지 않습니다.
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
        //         Ext.getCmp('ipm_inter').setValue(record[0].name);
        //         if(me.edit === "edit"){
        //             me.setTitle("관리 네트워크 수정");

        //             Ext.getCmp('ipm_inter').setValue(me.record.data.interface);
        //             Ext.getCmp('ipm_network_name').setValue(me.record.data.name);
        //             Ext.getCmp('ipm_network').setValue(me.record.data.ip);
        //             Ext.getCmp('ipm_network_desc').setValue(me.record.data.desc);
        //             if(me.record.data.cycle_chk === true){
        //                 Ext.getCmp('network_ipscan_com').setValue(0);
        //                 Ext.getCmp('network_ipscan_cnt').setValue(me.record.data.cycle);
        //             }
        //             else{
        //                 Ext.getCmp('network_ipscan_com').setValue(me.record.data.cycle);
        //             }
        //             Ext.getCmp('network_ipscan_sec').setValue(me.record.data.count);

        //             if(me.record.data.action === "deny"){ Ext.getCmp('ipm_network_seg2').toggle(true); }
        //             else{ Ext.getCmp('ipm_network_seg1').toggle(true); }
        //         }
        //         else{
        //             Ext.getCmp('network_ipscan_com').setValue(Ext.getCmp('network_ipscan_com').getStore().data.items[1].data.value);
        //             Ext.getCmp('network_ipscan_sec').setValue(Ext.getCmp('network_ipscan_sec').getStore().data.items[0].data.value);
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
    }

    // SMC4ZEN에서 더이상 사용하지 않습니다.
    /*
    set_win: function(btn) {

        if(btn==="no"){

            var win = Ext.WindowManager.getActive();

            if (win) {

                win.close();

            }

        }
        else{

            var store = Ext.data.StoreManager.lookup('store_ipm_network_list');

            var me = Ext.getCmp('NFW2_ipm_network');

            if(store.getCount() >= me.network_cnt){

                var win = Ext.WindowManager.getActive();

                win.close();

                Ext.MessageBox.alert(__weguardia,ValidMaxCnt(me.network_cnt));

            }
            else{

                Ext.ComponentQuery.query('container[itemId="fm"]').forEach(function(fm){ fm.getForm().reset();});
                Ext.ComponentQuery.query('container[cls="fld_msg"]').forEach(function(cls){ cls.removeCls('ic_msg_err'); cls.update(''); });
                Ext.getCmp('ipm_inter').setValue(Ext.getCmp('ipm_inter').getStore().data.items[0].data.name);
                Ext.getCmp('network_ipscan_com').setValue(Ext.getCmp('network_ipscan_com').getStore().data.items[0].data.value);
                Ext.getCmp('network_ipscan_sec').setValue(Ext.getCmp('network_ipscan_sec').getStore().data.items[0].data.value);

            }
        }
    }
    */

});