
Ext.define('SMC4ZEN.view.win_ha_lb', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_ha_lb',

    requires: [
        'SMC4ZEN.view.win_ha_lbViewModel',
        'Ext.form.Panel',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_ha_lb'
    },
    cls: 'zen_win',
    scrollable: true,
    width: 550,
    title: '부하분산 추가',
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
                    margin: '8 0 10 0',
                    items: [
                        {
                            xtype : 'label',
                            margin : '0 0 10 0',
                            cls : 'lb_req',
                            width : 200,
                            text : '순위는 그리드의 Row를 드래그 & 드롭하여 변경할 수 있습니다.'
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
                                    bind: {
                                        text: '{rank}'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    disabled : true,
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                            if(!ValidNum(value)){ return get_msg('err_form'); }

                                            var tbl = Ext.getCmp("grid_list");

                                            var n = tbl.getStore().data.length;

                                            if(value < 1 || value > n+1){

                                                return ValidLimit(1,n+1);

                                            }

                                        }
                                        return true;
                                    },
                                    id: 'num',
                                    width: 80,
                                    labelSeparator: ' ',
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onVirtual_a_ipErrorChange',
                                        focus: 'onNumFocus',
                                        blur: 'onNumBlur'
                                    }
                                },
                                {
                                    xtype: 'label',
                                    cls: 'mt_info',
                                    id: 'l_num',
                                    bind: {
                                        text: '{ha_msg3}'
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
                                    id: 'com_source_lb',
                                    width: 125,
                                    bind: {
                                        text: '{src}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'com_source',
                                    labelSeparator: ' ',
                                    value: 'Any',
                                    editable: false,
                                    displayField: 'val',
                                    store: 'store_ha_lb_type',
                                    valueField: 'val',
                                    listeners: {
                                        change: 'onComboboxChange'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                            var source = Ext.getCmp("com_source").getValue();

                                            if(source === "Single"){
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                            }else if(source === "Range"){
                                                if(!ValidRange(value)){ return ValidIP('Range'); }
                                            }else if(source === "Netmask"){
                                                if(!ValidNetMask(value)){ return ValidIP('Netmask'); }
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'source',
                                    style: 'margin-left:5px',
                                    fieldLabel: '',
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onSourceErrorChange',
                                        focus: 'onSourceFocus',
                                        blur: 'onSourceBlur'
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
                                        text: '{dest}'
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'com_dest',
                                    labelSeparator: ' ',
                                    value: 'Any',
                                    editable: false,
                                    displayField: 'val',
                                    store: 'store_ha_lb_type',
                                    valueField: 'val',
                                    listeners: {
                                        change: 'onComboboxChange1'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value !== true){
                                            if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                            var dest = Ext.getCmp("com_dest").getValue();

                                            if(dest === "Single"){
                                                if(!ValidIPAddress(value)){ return get_msg('err_ip'); }
                                            }else if(dest === "Range"){
                                                if(!ValidRange(value)){ return ValidIP('Range'); }
                                            }else if(dest === "Netmask"){
                                                if(!ValidNetMask(value)){ return ValidIP('Netmask'); }
                                            }
                                        }
                                        return true;
                                    },
                                    id: 'dest',
                                    style: 'margin-left:5px',
                                    fieldLabel: '',
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onDestErrorChange',
                                        focus: 'onDestFocus',
                                        blur: 'onDestBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'combobox',
                            id: 'com_action',
                            margin: '8 0 0 0',
                            labelSeparator: ' ',
                            labelWidth: 120,
                            value: 'Accept',
                            editable: false,
                            displayField: 'val',
                            store: 'store_ha_lb_action',
                            valueField: 'val',
                            bind: {
                                fieldLabel: '{action}'
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
                    itemId: 'fld_msg1'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick1'
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

    onVirtual_a_ipErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onNumFocus: function(component, event, eOpts) {
        var tbl = Ext.getCmp("grid_list");

        var n = tbl.getStore().data.length;
        var cnt = (this.edit==="edit")?Number(n):Number(n)+1;
        var str = __zen('input_range')+'1 ~ ' + cnt;
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onNumBlur: function(component, event, eOpts) {
        setTipBlur(this, component);
        Ext.getCmp('num').validateValue(true);
    },

    onComboboxChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === "Single" || newValue === "Range" || newValue === "Netmask"){
            Ext.getCmp("source").show();
        //     Ext.getCmp("com_source_lb").setFieldLabel("출발지"+required());
        }else{
            Ext.getCmp("source").hide();
        //     Ext.getCmp("com_source_lb").setFieldLabel("출발지");
        }
    },

    onSourceErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onSourceFocus: function(component, event, eOpts) {
        var source = Ext.getCmp("com_source").getValue();
        var str;
        if(source === "Single"){
            str = disp_help_ip('4s');
        }else if(source === "Range"){
            str = disp_help_ip('4r');
        }else if(source === "Netmask"){
            str = disp_help_ip('4m');
        }
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onSourceBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('source').validateValue(true);
    },

    onComboboxChange1: function(field, newValue, oldValue, eOpts) {
        if(newValue === "Single" || newValue === "Range" || newValue === "Netmask"){
            Ext.getCmp("dest").show();
        //     Ext.getCmp("com_dest").setFieldLabel("목적지"+required());
        }else{
            Ext.getCmp("dest").hide();
        //     Ext.getCmp("com_dest").setFieldLabel("목적지");
        }
    },

    onDestErrorChange: function(labelable, error, eOpts) {
        if(error){
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.addCls('ic_msg_err');
            err_fl.update(labelable.activeErrors[0]);
        }
        else{
            var err_fl = Ext.ComponentQuery.query('container[itemId="fld_msg1"]')[0];

            err_fl.removeCls('ic_msg_err');
            err_fl.update('');
        }
    },

    onDestFocus: function(component, event, eOpts) {
        
        var str = '';
        var source = Ext.getCmp("com_dest").getValue();

        if(source === "Single"){

            str = disp_help_ip('4s');

        }
        else if(source === "Range"){

            str = disp_help_ip('4r');

        }
        else if(source === "Netmask"){

            str = disp_help_ip('4m');

        }

        component.fieldInfo = str;

        setTipFocus(this, component);

    },

    onDestBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('dest').validateValue(true);
    },

    onWindowAfterRender: function(component, eOpts) {

        this.fieldInfo = makeZenTip();

        var gpn_lblist = Ext.getCmp("grid_list");
        var seq = gpn_lblist.getStore().count();

        //chk_zenauth(null);

        Ext.getCmp("num").setValue(seq + 1);
        Ext.getCmp("source").hide();
        Ext.getCmp("dest").hide();

        if(this.edit === "edit"){

            this.init_ha_lb();

        }
        else{

            this.setTitle(__zen('lb_add'));

        }

    },

    onButtonClick1: function(button, e, eOpts) {

        var me = this;

        var inter = Ext.getCmp("inter");
        var target_ip = Ext.getCmp("target_ip");
        var target_mac = Ext.getCmp('target_mac');
        var period = Ext.getCmp('period');
        var timeout = Ext.getCmp('timeout');

        var num = Ext.getCmp("num");
        var s_type = Ext.getCmp("com_source");
        var source = Ext.getCmp("source");
        var d_type = Ext.getCmp("com_dest");
        var dest = Ext.getCmp("dest");
        var action = Ext.getCmp("com_action");

        var _store = Ext.data.StoreManager.lookup("store_ha_lb_list");

        if(num.isValid()===false){ 

            num.focus(); 

            return false; 

        }

        if(s_type.getValue() === "Single" || s_type.getValue() === "Range" || s_type.getValue() === "Netmask"){
            
            if(source.isValid()===false){ 

                source.focus(); 

                return false; 

            }
        }

        if(d_type.getValue() === "Single" || d_type.getValue() === "Range" || d_type.getValue() === "Netmask"){
            
            if(dest.isValid()===false){ 

                dest.focus(); 

                return false; 

            }

        }

        var obj = {};

        obj.cid = me.cid;
        obj.num = Number(num.getValue());
        obj.action = action.getValue();
        obj.s_type = s_type.getValue();
        obj.d_type = d_type.getValue();
        obj.dest = dest.getValue();
        obj.source = source.getValue();

        if(me.edit === "edit"){

            me.record.set(obj);
            me.record.commit();
            Ext.getCmp('grid_list').getView().refresh();

        }
        else{

            _store.add(obj);

        }

        me.close();

    },

    onButtonClick: function(button, e, eOpts) {

        this.close();

    },

    init_ha_lb: function() {

        var me = this;

        me.setTitle(__zen('lb_edit') + " - " + me.record.get('num'));

        me.cid = me.record.get('cid');
        Ext.getCmp("num").setValue(me.record.get('num'));
        Ext.getCmp("com_action").setValue(me.record.get('action'));

        // Source 데이터 초기화

        var s_type = me.record.get('s_type');
        
        Ext.getCmp("com_source").setValue(s_type);
        
        if(s_type === "Single" || s_type === "Range" || s_type === "Netmask"){
        
            Ext.getCmp("source").setValue(me.record.get('source')).show();
        
        }

        // Dest 데이터 초기화

        var d_type = me.record.get('d_type');
        
        Ext.getCmp("com_dest").setValue(d_type);
        
        if(d_type === "Single" || d_type === "Range" || d_type === "Netmask"){
        
            Ext.getCmp("dest").setValue(me.record.get('dest')).show();
        
        }

    }

});