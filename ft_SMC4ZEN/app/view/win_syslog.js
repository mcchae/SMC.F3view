
Ext.define('SMC4ZEN.view.win_syslog', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_syslog',

    requires: [
        'SMC4ZEN.view.win_syslogViewModel',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_syslog'
    },
    cls: 'zen_win',
    id: 'win_syslog',
    scrollable: true,
    width: 500,
    modal: true,
    defaultListenerScope: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            itemId: 'fm',
            scrollable: true,
            layout: 'auto',
            bodyPadding: 20,
            title: '',
            items: [
                {
                    xtype: 'container',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                        return true;
                                    },
                                    cls: 'lb_req',
                                    id: 's_ip',
                                    labelSeparator: ' ',
                                    labelWidth: 80,
                                    msgTarget: 'none',
                                    bind: {
                                        fieldLabel: '{ip}'
                                    },
                                    listeners: {
                                        errorchange: 'onS_ipErrorChange',
                                        focus: 'onS_ipFocus',
                                        blur: 'onS_ipBlur'
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                        if(!ValidNum(value)){ return get_msg('err_form'); }
                                        if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535); }

                                        return true;
                                    },
                                    fieldInfo: '',
                                    cls: 'lb_req',
                                    id: 's_port',
                                    width: 200,
                                    labelSeparator: ' ',
                                    labelWidth: 80,
                                    msgTarget: 'none',
                                    value: '514',
                                    enableKeyEvents: true,
                                    enforceMaxLength: true,
                                    maskRe: /[0-9.]/,
                                    maxLength: 5,
                                    bind: {
                                        fieldLabel: '{port}'
                                    },
                                    listeners: {
                                        errorchange: 'onS_portErrorChange',
                                        keydown: 'onS_portKeydown',
                                        focus: 'onS_portFocus',
                                        blur: 'onS_portBlur'
                                    }
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 's_chk_enc',
                                    style: 'color:#666',
                                    fieldLabel: '',
                                    boxLabelAlign: 'before',
                                    listeners: {
                                        beforerender: 'onS_chk_encBeforeRender'
                                    }
                                }
                            ]
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
            flex: 1,
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

    onS_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onS_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onS_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onS_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg2");
    },

    onS_portKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onS_portFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 65535';
        setTipFocus(this,component);
    },

    onS_portBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onS_chk_encBeforeRender: function(component, eOpts) {
        component.boxLabel = __zen('use_encryption');
    },

    onWindowAfterRender: function(component, eOpts) {
        
        var me = this;
        
        me.fieldInfo = makeZenTip();
        
        var NFW2 = Ext.getCmp("NFW2_log_config_logServer");

        // chk_zenauth(null);

        if(me.edit === "edit"){
        
             me.init_syslog();
        
        }
        else{
        
             me.setTitle(__zen('syslog_server_add'));
        
        }

    },

    onButtonClick1: function(button, e, eOpts) {

        // 공통변수 선언

        var me = this;
        var ip = Ext.getCmp("s_ip");
        var port = Ext.getCmp("s_port");
        var chk_enc = Ext.getCmp("s_chk_enc");
        var st_sysloglist = Ext.data.StoreManager.lookup("store_logserver_syslist");

        // 확인버튼 클릭시 유효성 검사

        if(!port.isValid()){ 

            port.focus(); 

            return false; 

        }

        if(!ip.isValid()){ 

            ip.focus();

            return false; 

        }

        // 스토어에 저장할 데이터 생성

        var obj = {};
        
        obj.ip = ip.getValue();
        obj.port = port.getValue();
        obj._num = st_sysloglist.count() + 1;
        obj._kind = 'syslog';
        obj.chk_enc = (chk_enc.getValue()) ? 'on' : 'off';

        if(me.edit === 'edit'){

            obj._id = me.record.get('_id');

            me.record.set(obj);
            me.record.commit();

        }
        else{

            st_sysloglist.add(obj);

        }

        me.close();

    },

    onButtonClick: function(button, e, eOpts) {

        this.close();

    },

    init_syslog: function() {

        var me = this;

        me.setTitle(__zen('syslog_server_edit') + " - " + me.record.num);

        Ext.getCmp("s_port").setValue(me.record.get('port'));
        Ext.getCmp("s_ip").setValue(me.record.get('ip'));

        if(me.record.get('chk_enc') === "on"){

            Ext.getCmp("s_chk_enc").setValue(true);

        }

        if(me.record.get('send_type') === "select"){

            Ext.getCmp("send_select").setValue(true);

        }

    }

});