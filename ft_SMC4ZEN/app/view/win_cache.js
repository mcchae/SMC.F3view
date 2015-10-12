
Ext.define('SMC4ZEN.view.win_cache', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_cache',

    requires: [
        'SMC4ZEN.view.win_cacheViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_cache'
    },
    cls: 'zen_win',
    id: 'win_cache',
    scrollable: true,
    width: 380,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            border: false,
            id: 'fm',
            scrollable: true,
            layout: 'auto',
            bodyPadding: 10,
            titleCollapse: true,
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'add_combo',
                            margin: '8 0 0 0',
                            width: 350,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            value: 'eth0',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'add_ip_popup',
                            margin: '8 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        // var me = Ext.getCmp('win_cache');

                                        // var setipValue = ValidIPAddress(value);
                                        // var setipNull = CheckNotNull(value);

                                        // if(!setipValue && !setipNull){ return get_msg('err_null'); }
                                        // if(!setipValue){ return get_msg('err_ip'); }

                                        // if(me.edit !== "edit"){
                                        //     for(var i in Ext.getCmp('cache_list').getStore().data.items){
                                        //         if(value === Ext.getCmp('cache_list').getStore().data.items[i].data.ip){ return get_msg('err_configdob'); }
                                        //     }
                                        // }
                                        // else{
                                        //     var cnt = 0;
                                        //     for(var i in Ext.getCmp('cache_list').getStore().data.items){
                                        //         if(value === Ext.getCmp('cache_list').getStore().data.items[i].data.ip){ cnt++; }
                                        //     }

                                        //     if(value === Ext.getCmp('cache_list').getStore().data.items[me.index].data.ip){
                                        //         if(cnt > 1){ return get_msg('err_configdob'); }
                                        //     }
                                        //     else{
                                        //         if(cnt > 0){ return get_msg('err_configdob'); }
                                        //     }

                                        // }

                                        // return true;


                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            ip_mask = value.split('/');

                                            var dstip = ValidIPAddress(ip_mask[0]);
                                            var dstmask = ValidIPAddress(ip_mask[1]);
                                            var dstipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);
                                            if(value !== ""){
                                                if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                                if(!dstip){ return get_msg('err_ip'); }
                                                if(!dstmask){ return get_msg('err_form'); }
                                            }
                                        }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 'add_IP',
                                    width: 350,
                                    labelSeparator: ' ',
                                    labelWidth: 120,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.\/]/,
                                    maxLength: 31,
                                    minLength: 1,
                                    bind: {
                                        fieldLabel: '{ip_mask}'
                                    },
                                    listeners: {
                                        errorchange: 'onObj_IP_errorcheck',
                                        focus: 'onAdd_IPFocus',
                                        blur: 'onAdd_IPBlur',
                                        keydown: 'onAdd_IPKeydown'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'container',
                    dock: 'bottom',
                    id: 'win_btn_group',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            flex: 1,
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
                                        click: 'onBtn_ok',
                                        blur: 'onButtonBlur'
                                    }
                                },
                                {
                                    xtype: 'button',
                                    cls: 'ft_cancel',
                                    bind: {
                                        text: '{cancel}'
                                    },
                                    listeners: {
                                        click: 'onBtn_cancel'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onForm_AfterRender'
            }
        }
    ],

    onObj_IP_errorcheck: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onAdd_IPFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s2m');
        component.fieldInfo = str;
        // setTipFocus(this,component);
    },

    onAdd_IPBlur: function(component, event, eOpts) {
        // setTipBlur(this,component);
        Ext.getCmp('add_IP').validateValue(true);
    },

    onAdd_IPKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }
    },

    onBtn_ok: function(button, e, eOpts) {
        var dns_cache = Ext.getCmp('NFW2_network_dns_cache');
        var me = this;

        var ip = Ext.getCmp("add_IP");

        if(ip.isValid() === false){ ip.focus(); return false; }

        var obj = {};
        var ipmask = ip.getValue().split('/');
        obj = {
            'interface' : Ext.getCmp('add_combo').getValue(),
            'ip' : ipmask[0],
            'chk_use' : "on",
            'netmask' : ipmask[1]
        };

        if(me.edit === "edit"){
            obj['_id'] = me.cid;
        }

        if(me.edit !== "edit"){
            for(var i in Ext.getCmp('cache_list').getStore().data.items){
                if(ipmask[0] === Ext.getCmp('cache_list').getStore().data.items[i].data.ip){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_configdob'));
                    me.set_btn = true;
                    return false;
                }
            }
        }
        else{
            var cnt = 0;
            for(var i in Ext.getCmp('cache_list').getStore().data.items){
                if(ipmask[0] === Ext.getCmp('cache_list').getStore().data.items[i].data.ip){ cnt++; }
            }

            if(ipmask[0] === Ext.getCmp('cache_list').getStore().data.items[me.index].data.ip){
                if(cnt > 1){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_configdob'));
                }
            }
            else{
                if(cnt > 0){
                    var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

                    err_fl.addCls('ic_msg_err');
                    err_fl.update(get_msg('err_configdob'));
                }
            }

        }

        var update = (me.edit==="edit")?true:false;

        // showLoadMask();

        // var _params = {
        //     basename : Ext.encode('dns_cache'),
        //     obj : Ext.encode(obj),
        //     renum_info : Ext.encode({'fieldname':'_num'}),
        //     update : Ext.encode(update)
        // };

        console.log('obj - ', obj);
        if(update){
            Ext.getStore('store_network_dnscache_list').each(function(data, idx){

                if(data.data.id === Ext.getCmp('cache_list').getSelectionModel().getSelection()[0].data.id){

                        data.data.interface = obj.interface;
                        data.data.ip = obj.ip;
                        data.data.chk_use = obj.chk_use;
                        data.data.netmask = obj.netmask;
                        data.commit();
                        return false;
                }
            });
        }
        else{
            Ext.getStore('store_network_dnscache_list').add(obj);
        }
        
        me.close();

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'setListTypeObj',
        //     _params,
        //     function(response){
        //         hideLoadMask();
        //         if(me.edit === "edit"){
        //             Ext.Msg.show({
        //                 title: __weguardia,
        //                 msg: get_msg("msg_ok_edit"),
        //                 width: 300,
        //                 buttons: Ext.Msg.OK,
        //                 fn: setWinClose,
        //                 icon: Ext.window.MessageBox.INFO
        //             });
        //         }
        //         else{
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

        //         Ext.getCmp('NFW2_network_dns_cache').get_dnscache();
        //     }
        // );

        // dns_cache.get_dnscache();
    },

    onButtonBlur: function(component, event, eOpts) {
        var me = this;

        if(me.set_btn === true){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
            me.set_btn = false;
        }
    },

    onBtn_cancel: function(button, e, eOpts) {
        this.close();
    },

    onForm_AfterRender: function(component, eOpts) {

        this.fieldInfo = makeZenTip();
        this.set_btn = false;
        var me = this;

        // chk_zenauth(null);

        if(this.edit === "edit"){
            me.setTitle(__zen('dns_cache_mod'));

            Ext.getCmp("add_combo").setValue(me.record.data.interface);
            Ext.getCmp("add_IP").setValue(me.record.data.ip+"/"+me.record.data.netmask);

        //     var _params = {
        //         basename : Ext.encode("dns_cache"),
        //         key : Ext.encode({'_id' : me.cid})
        //     };

        //     request_helper.xmlrpc_call_JsonP(
        //         'ftuctrl',
        //         'getObject',
        //         _params,

        //         function(data){
        //             Ext.getCmp("add_combo").setValue(data.interface);
        //             Ext.getCmp("add_IP").setValue(data.ip+"/"+data.netmask);
        //         }
        //     );

        }
        else{ me.setTitle(__zen('dns_cache_add')); }
    },

    set_win: function(btn) {
        if(btn === "yes"){
            var win = Ext.create('SMC4ZEN.view.win_cache',{
                modal : true
            });

            win.show();
        }
        else{
        }
    }

});