
Ext.define('SMC4ZEN.view.win_split_dns', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_split_dns',

    requires: [
        'SMC4ZEN.view.win_split_dnsViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_split_dns'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 530,
    title: '내부/외부 DNS 추가',
    modal: true,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            itemId: 'fm',
            scrollable: true,
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    minWidth: 460,
                    items: [
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'zone',
                                    labelSeparator: ' ',
                                    value: 'internal',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'store_split_zone',
                                    valueField: 'val',
                                    bind: {
                                        fieldLabel: '{direction}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidDomain(value,1)){ return get_msg('err_form'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'domain_name',
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            enforceMaxLength: true,
                            maxLength: 63,
                            bind: {
                                fieldLabel: '{domain_name}'
                            },
                            listeners: {
                                errorchange: 'onDomain_nameErrorChange',
                                blur: 'onDomain_nameBlur'
                            }
                        },
                        {
                            xtype: 'combobox',
                            id: 'type',
                            labelSeparator: ' ',
                            value: 'NS',
                            editable: false,
                            displayField: 'name',
                            store: 'store_split_type',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{type4}'
                            },
                            listeners: {
                                change: 'onTypeChange'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidDomain(value,2)){ return get_msg('err_form'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'host_name',
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 63,
                            bind: {
                                fieldLabel: '{host_name}'
                            },
                            listeners: {
                                errorchange: 'onHost_nameErrorChange',
                                blur: 'onHost_nameBlur'
                            }
                        },
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'ip',
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            bind: {
                                fieldLabel: '{host_ip}'
                            },
                            listeners: {
                                errorchange: 'onIpErrorChange',
                                focus: 'onIpFocus',
                                blur: 'onIpBlur'
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'table',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!LengthCheck(removeComma(value), 86400, 259200)){ return ValidLimit('86,400', '259,200'); }

                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'inp_unit',
                                    id: 'ttl',
                                    afterBodyEl: [
                                        '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                                    ],
                                    fieldLabel: 'TTL',
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    value: '259,200',
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 7,
                                    listeners: {
                                        errorchange: 'onTtlErrorChange',
                                        keydown: 'onTtlKeydown',
                                        focus: 'onTtlFocus',
                                        blur: 'onTtlBlur',
                                        change: 'onTtlChange'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'checkboxfield',
                            id: 'ptr',
                            fieldLabel: 'PTR',
                            labelSeparator: ' ',
                            listeners: {
                                beforerender: 'onPtrBeforeRender'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onWindowAfterRender'
    },
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
                        click: 'onButtonClick2'
                    }
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onButtonClick'
                    }
                }
            ]
        }
    ],

    onDomain_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onDomain_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onTypeChange: function(field, newValue, oldValue, eOpts) {
        var ptr = Ext.getCmp("ptr");

        if(newValue === "NS"){

            ptr.setDisabled(false);
            Ext.getCmp("ttl").setValue("259200");
        }else{

            ptr.setDisabled(true);
            Ext.getCmp("ttl").setValue("86400");
        }
    },

    onHost_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onHost_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onIpErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onIpFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        //setTipFocus(this,component);
    },

    onIpBlur: function(component, event, eOpts) {
        //setTipBlur(this,component);
        component.validateValue(true);
    },

    onTtlErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTtlKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onTtlFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'86,400 ~ 259,200';
        //setTipFocus(this,component);
    },

    onTtlBlur: function(component, event, eOpts) {
        //setTipBlur(this,component);
        component.validateValue(true);
    },

    onTtlChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));
    },

    onPtrBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('iodns_msg');
    },

    onWindowAfterRender: function(component, eOpts) {
        var me = this;

        me.fieldInfo = makeZenTip();

        // chk_zenauth(null);

        if(me.edit === "edit"){
            me.init_split_dns();
        }else{
            me.setTitle(__zen('iodns_add'));
        }
    },

    onButtonClick2: function(button, e, eOpts) {
        var me = this;

        var zone = Ext.getCmp("zone");
        var dname = Ext.getCmp("domain_name");
        var type = Ext.getCmp("type");
        var hname = Ext.getCmp("host_name");
        var ip = Ext.getCmp("ip");
        var ttl = Ext.getCmp("ttl");
        var ptr = Ext.getCmp("ptr");

        if(dname.isValid()===false){ dname.focus(); return false; }
        if(hname.isValid()===false){ hname.focus(); return false; }
        if(ip.isValid()===false){ ip.focus(); return false; }
        if(ttl.isValid()===false){ ttl.focus(); return false; }


        var obj = {
            'zone': zone.getValue(),
            'chk_use': 'on',
            'dname': dname.getValue(),
            'hname': hname.getValue(),
            'field': type.getValue(),
            'ip': ip.getValue(),
            'ttl': removeComma(ttl.getValue()),
            'ptr': (ptr.getValue())?'on':'off'
        };

        var update = (me.edit==="edit")?true:false;

        if(update === true){
            obj._id = me.record.data._id;
        }

        var _params = {
            basename: Ext.encode("splitdns_list"),
            obj: Ext.encode(obj),
            renum_info: Ext.encode({'fieldname':'_num'}),
            update: Ext.encode(update)
        };

        console.log('obj - ', obj);
        if(update){
            Ext.getStore('store_split_dns_list').each(function(data, idx){

                if(data.data.id === Ext.getCmp('grid_list').getSelectionModel().getSelection()[0].data.id){

                        data.data.chk_use = obj.chk_use;
                        data.data.dname = obj.dname;
                        data.data.field = obj.field;
                        data.data.hname = obj.hname;
                        data.data.ip = obj.ip;
                        data.data.ptr = obj.ptr;
                        data.data.ttl = obj.ttl;
                        data.data.zone = obj.zone;
                        data.commit();
                        return false;
                }
            });
        }
        else{
            Ext.getStore('store_split_dns_list').add(obj);
        }
        
        this.close();

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'setListTypeObj',
        //     _params,
        //     function(response){
        //         Ext.data.StoreManager.lookup("store_split_dns_list").load();

        //         if(update === true){

        //             Ext.Msg.show({
        //                 title: __weguardia,
        //                 msg: get_msg("msg_ok_edit"),
        //                 width: 300,
        //                 buttons: Ext.Msg.OK,
        //                 fn: setWinClose,
        //                 icon: Ext.window.MessageBox.INFO
        //             });
        //         }else{

        //             Ext.Msg.show({
        //                 title: __weguardia,
        //                 msg: get_msg("msg_ok_add"),
        //                 width: 300,
        //                 buttons: Ext.Msg.YESNO,
        //                 buttonText:{
        //                     yes: __zen('add_plus'),
        //                     no: __zen('close')
        //                 },
        //                 fn: setWinState,
        //                 icon: Ext.window.MessageBox.INFO
        //             });
        //         }
        //     }
        // );
    },

    onButtonClick: function(button, e, eOpts) {
        this.close();
    },

    init_split_dns: function() {
        var me = this;
        var record = me.record.data;

        me.setTitle(__zen('iodns_edit')+" - "+record._num);

        Ext.getCmp("zone").setValue(record.zone);
        Ext.getCmp("domain_name").setValue(record.dname);
        Ext.getCmp("type").setValue(record.field);
        Ext.getCmp("host_name").setValue(record.hname);
        Ext.getCmp("ip").setValue(record.ip);
        Ext.getCmp("ttl").setValue(record.ttl);

        if(record.ptr === "on"){
            Ext.getCmp("ptr").setValue(true);
        }
    }

});