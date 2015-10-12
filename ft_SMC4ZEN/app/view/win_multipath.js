
Ext.define('SMC4ZEN.view.win_multipath', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_multipath',

    requires: [
        'SMC4ZEN.view.win_multipathViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_multipath'
    },
    cls: 'zen_win',
    id: 'win_multipath',
    width: 500,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            header: false,
            title: 'My Form',
            items: [
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                var me = Ext.getCmp('win_multipath');

                                if(CheckNotNull(value)){
                                    if(value > 64 || value < 1){ return ValidLimit(1, 64); }
                                }

                                if(me.edit === "edit"){
                                    var _store = Ext.data.StoreManager.lookup('store_network_multipath_list');

                                    var max_num = 1;
                                    for(var i in _store.data.items){
                                        if(_store.data.items[i].data.num > max_num){ max_num = Number(_store.data.items[i].data.num); }
                                    }
                                    if(max_num === 64){ if(value > 63 || value < 1){ return ValidLimit(1, 63); } }
                                }

                                return true;
                            },
                            fieldInfo: {
                                txt: msg_tip_length(1,
                                64,
                                null)
                            },
                            id: 'win_num',
                            margin: '8 0 0 0',
                            width: 180,
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 2,
                            bind: {
                                fieldLabel: '{rank}'
                            },
                            listeners: {
                                afterrender: 'onTextfieldAfterRender',
                                errorchange: 'onTextfieldErrorChange',
                                focus: 'onWin_numFocus',
                                blur: 'onWin_numBlur',
                                keydown: 'onWin_numKeydown'
                            }
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
                                    bind: {
                                        text: '{src_ip}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var chk = false;
                                        var ip_ran = value.split('-');

                                        if(ip_ran[1] !== undefined){
                                            var dstip = ValidIPAddress(ip_ran[0]);
                                            var dstmask = ValidIPAddress(ip_ran[1]);
                                            var dstipv6 = ValidIPv6(ip_ran[0]);
                                            var nullChk_ip = CheckNotNull(ip_ran[0]);
                                            var nullChk_mask = CheckNotNull(ip_ran[1]);

                                            if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                            if(!dstip){ return get_msg('err_ip'); }
                                            if(!dstmask){ return get_msg('err_form'); }
                                            chk = true;
                                        }

                                        var ip_mask = value.split('/');

                                        if(ip_mask[1] !== undefined){
                                            var dstip = ValidIPAddress(ip_mask[0]);
                                            var dstmask = ValidIPAddress(ip_mask[1]);
                                            var dstipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);

                                            if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                            if(!dstip){ return get_msg('err_ip'); }
                                            if(!dstmask){ return get_msg('err_form'); }
                                            chk = true;
                                        }

                                        if(chk === false){
                                            //     if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(value !== ""){
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'win_src_ipmask',
                                    width: 250,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9.\/-]/,
                                    listeners: {
                                        focus: 'onTextfieldFocus',
                                        blur: 'onTextfieldBlur',
                                        errorchange: 'onWin_src_ipmaskErrorChange',
                                        keydown: 'onWin_src_ipmaskKeydown'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'mt_info',
                                    bind: {
                                        text: '{space_any}'
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
                                    bind: {
                                        text: '{dest_ip}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var chk = false;
                                        var ip_ran = value.split('-');

                                        if(ip_ran[1] !== undefined){
                                            var dstip = ValidIPAddress(ip_ran[0]);
                                            var dstmask = ValidIPAddress(ip_ran[1]);
                                            var dstipv6 = ValidIPv6(ip_ran[0]);
                                            var nullChk_ip = CheckNotNull(ip_ran[0]);
                                            var nullChk_mask = CheckNotNull(ip_ran[1]);

                                            if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                            if(!dstip){ return get_msg('err_ip'); }
                                            if(!dstmask){ return get_msg('err_form'); }
                                            chk = true;
                                        }

                                        var ip_mask = value.split('/');

                                        if(ip_mask[1] !== undefined){
                                            var dstip = ValidIPAddress(ip_mask[0]);
                                            var dstmask = ValidIPAddress(ip_mask[1]);
                                            var dstipv6 = ValidIPv6(ip_mask[0]);
                                            var nullChk_ip = CheckNotNull(ip_mask[0]);
                                            var nullChk_mask = CheckNotNull(ip_mask[1]);

                                            if(!nullChk_ip || !nullChk_mask){ return get_msg('err_null'); }
                                            if(!dstip){ return get_msg('err_ip'); }
                                            if(!dstmask){ return get_msg('err_form'); }
                                            chk = true;
                                        }

                                        if(chk === false){
                                            //     if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(value !== ""){
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                            }
                                        }

                                        return true;
                                    },
                                    id: 'win_dst_ipmask',
                                    width: 250,
                                    msgTarget: 'none',
                                    enableKeyEvents: true,
                                    maskRe: /[0-9.\/-]/,
                                    listeners: {
                                        focus: 'onWin_dst_ipmaskFocus',
                                        blur: 'onWin_dst_ipmaskBlur',
                                        errorchange: 'onWin_dst_ipmaskErrorChange',
                                        keydown: 'onWin_dst_ipmaskKeydown'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    cls: 'mt_info',
                                    bind: {
                                        text: '{space_any}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'win_interface',
                            margin: '8 0 10 0',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            msgTarget: 'none',
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            store: 'store_interface',
                            valueField: 'name',
                            bind: {
                                fieldLabel: '{inter}'
                            },
                            listeners: {
                                afterrender: 'onWin_interfaceAfterRender'
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
                    itemId: 'fld_msg2'
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
        afterrender: 'onWin_multipathAfterRender'
    },

    onTextfieldAfterRender: function(component, eOpts) {
        if(this.edit !== "edit"){
            var store = Ext.getCmp('multipath_grid').getStore();
            var chk = false;
            for(var i = 1;i < store.data.items.length+1;i++){
                if(store.data.items[i-1].data.num !== i && chk === false){
                    Ext.getCmp('win_num').setValue(i);
                    chk = true;
                }
            }
            if(chk === false){ Ext.getCmp('win_num').setValue(Ext.getCmp('multipath_grid').getStore().data.items.length+1); }
        }
    },

    onTextfieldErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_numFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
    },

    onWin_numBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onWin_numKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;
        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }

    },

    onTextfieldFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4asrm');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onTextfieldBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onWin_src_ipmaskErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_src_ipmaskKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }

    },

    onWin_dst_ipmaskFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4asrm');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onWin_dst_ipmaskBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
    },

    onWin_dst_ipmaskErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg2"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onWin_dst_ipmaskKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 229){
            e.stopEvent();
        }

    },

    onWin_interfaceAfterRender: function(component, eOpts) {
        var me = Ext.getCmp('win_multipath');

        if(me.edit !== "edit"){
            var inter = Ext.getCmp('win_interface').getStore().data;

            if(inter.length > 0){
                Ext.getCmp("win_interface").setValue(inter.items[0].data['name']);
            }
        }
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;
        var multipath_type = Ext.getCmp('line_select_box').getValue();
        var _store = Ext.data.StoreManager.lookup('store_network_multipath_list');

        var startip = Ext.getCmp('win_src_ipmask');
        var destip = Ext.getCmp('win_dst_ipmask');

        if(startip.isValid() === false){ startip.focus(); return false; }
        if(destip.isValid() === false){ destip.focus(); return false; }

        var num = Ext.getCmp('win_num').getValue();
        var src_type;
        var dst_type;
        var src_v;
        var dst_v;

        if(startip.getValue() === ""){ src_type = "any"; src_v = "";}
        else{
            src_v = "v4";
            var chk = false;
            var temp = startip.getValue().split('-');
            if(temp[1] !== undefined){ src_type = "range"; chk = true; }
            var temp = startip.getValue().split('/');
            if(temp[1] !== undefined){ src_type = "netmask"; chk = true;}
            if(chk === false){ src_type = "single"; }
        }

        if(destip.getValue() === ""){ dst_type = "any"; dst_v = ""; }
        else{
            dst_v = "v4";
            var chk = false;
            var temp = destip.getValue().split('-');
            if(temp[1] !== undefined){ dst_type = "range"; chk = true; }
            var temp = destip.getValue().split('/');
            if(temp[1] !== undefined){ dst_type = "netmask"; chk = true;}
            if(chk === false){ dst_type = "single"; }
        }

        var max_num = 1;
        for(var i in _store.data.items){
            if(_store.data.items[i].data.num > max_num){ max_num = _store.data.items[i].data.num; }
        }

        var record = [];
        if(me.edit === "edit"){
            _store.removeAt(me.index, 1);
        }

        if(num <= max_num){
            for(var i in _store.data.items){
                if(_store.data.items[i].data.num < num){
                    record.push({
                        'num' : _store.data.items[i].data.num,
                        'interface' : _store.data.items[i].data['interface'],
                        'src_version' : _store.data.items[i].data.src_version,
                        'src_type' : _store.data.items[i].data.src_type,
                        'src_ip' : _store.data.items[i].data.src_ip,
                        'dst_version' : _store.data.items[i].data.dst_version,
                        'dst_type' : _store.data.items[i].data.dst_type,
                        'dst_ip' : _store.data.items[i].data.dst_ip
                    });
                }
            }

            record.push({
                'num' : Number(num),
                'interface' : Ext.getCmp('win_interface').getValue(),
                'src_version' : src_v,
                'src_type' : src_type,
                'src_ip' : startip.getValue(),
                'dst_version' : dst_v,
                'dst_type' : dst_type,
                'dst_ip' : destip.getValue()
            });

            for(var i in _store.data.items){
                if(_store.data.items[i].data.num >= num){
                    record.push({
                        'num' : Number(_store.data.items[i].data.num+1),
                        'interface' : _store.data.items[i].data['interface'],
                        'src_version' : _store.data.items[i].data.src_version,
                        'src_type' : _store.data.items[i].data.src_type,
                        'src_ip' : _store.data.items[i].data.src_ip,
                        'dst_version' : _store.data.items[i].data.dst_version,
                        'dst_type' : _store.data.items[i].data.dst_type,
                        'dst_ip' : _store.data.items[i].data.dst_ip
                    });
                }
            }

            for(var m = 1;m <= record.length;m++){ record[m-1].num = m; }
            _store.loadData(record);
        }
        else{
            for(var i in _store.data.items){
                record.push({
                    'num' : _store.data.items[i].data.num,
                    'interface' : _store.data.items[i].data['interface'],
                    'src_version' : _store.data.items[i].data.src_version,
                    'src_type' : _store.data.items[i].data.src_type,
                    'src_ip' : _store.data.items[i].data.src_ip,
                    'dst_version' : _store.data.items[i].data.dst_version,
                    'dst_type' : _store.data.items[i].data.dst_type,
                    'dst_ip' : _store.data.items[i].data.dst_ip
                });
            }

            record.push({
                'num' : Number(max_num+1),
                'interface' : Ext.getCmp('win_interface').getValue(),
                'src_version' : src_v,
                'src_type' : src_type,
                'src_ip' : startip.getValue(),
                'dst_version' : dst_v,
                'dst_type' : dst_type,
                'dst_ip' : destip.getValue()
            });

            for(var m = 1;m <= record.length;m++){ record[m-1].num = m; }
            _store.loadData(record);
        }


        _store.sort('num','ASC');
        this.close();

    },

    onButtonClick1: function(button, e, eOpts) {
        this.close();
    },

    onWin_multipathAfterRender: function(component, eOpts) {
        this.fieldInfo = makeZenTip();

        var me = this;
        // chk_zenauth(null);

        if(me.edit === "edit"){
            me.setTitle(__zen('edit_multipath'));

            Ext.getCmp("win_num").setValue(me.record.data.num);
            //     Ext.getCmp("win_start").setValue(me.record.data.src_type);
            //     Ext.getCmp("win_destination").setValue(me.record.data.dst_type);
            Ext.getCmp("win_interface").setValue(me.record.data['interface']);

            Ext.getCmp("win_src_ipmask").setValue(me.record.data.src_ip);

            Ext.getCmp("win_dst_ipmask").setValue(me.record.data.dst_ip);

        }
        else{ me.setTitle(__zen('add_multipath')); }
    }

});