
Ext.define('SMC4ZEN.view.NFW2_system_basic', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.NFW2_system_basicViewModel',
        'Ext.form.Panel',
        'Ext.XTemplate',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.button.Segmented',
        'Ext.button.Button',
        'Ext.form.field.TextArea',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_system_basic'
    },
    //cls: 'zen_body',
    id: 'NFW2_basic',
    overflowY : 'auto',
    bodyPadding : 5,
    defaultListenerScope: true,
    title : '기본 설정',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'form',
            flex: 1,
            bodyPadding: 5,
            titleCollapse: true,
            id : 'system_basic_form',
            items: [
                {
                    xtype: 'container',
                    id: 'nfw_nameG',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg(err_null); }
                                //if(!_valid(value)){ return get_msg(err_mname); }

                                return true;

                                function _valid(value){

                                    return (/^\s*([0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣 ]+)\s*$/).test(value)? true:false;
                                }
                            },
                            cls: 'lb_req',
                            id: 'nfw_name',
                            width: 420,
                            labelSeparator: ' ',
                            labelWidth: 230,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maxLength: 31,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{device_name}'
                            },
                            listeners: {
                                errorchange: 'onNfw_nameErrorChange',
                                blur: 'onNfw_nameBlur',
                                focus: 'onNfw_nameFocus',
                                keydown: 'onNfw_nameKeydown'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'ssh_portG',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg(err_null); }
                                if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535); }

                                return true;

                            },
                            fieldInfo: '',
                            cls: 'lb_req',
                            id: 'ssh_port',
                            width: 420,
                            labelSeparator: ' ',
                            labelWidth: 230,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 5,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{ssh_connection_port}'
                            },
                            listeners: {
                                errorchange: 'onSsh_portErrorChange',
                                keydown: 'onSsh_portKeydown',
                                focus: 'onSsh_portFocus',
                                blur: 'onSsh_portBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'https_manageportG',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535); }
                                if(value === "8444"){ return get_msg('err_form'); }

                                return true;

                            },
                            fieldInfo: '',
                            cls: 'lb_req',
                            id: 'https_manageport',
                            width: 420,
                            labelSeparator: ' ',
                            labelWidth: 230,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 5,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{https_connection_port}'
                            },
                            listeners: {
                                errorchange: 'onHttps_manageportErrorChange',
                                keydown: 'onHttps_manageportKeydown',
                                focus: 'onHttps_manageportFocus',
                                blur: 'onHttps_manageportBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'https_timeoutG',
                    margin: '0 0 10 0',
                    items: [
                        {
                            xtype: 'textfield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(!CheckNotNull(value)){ return get_msg(err_null); }
                                if(!LengthCheck(removeComma(value), 0, 3600)){ return ValidLimit(0, '3,600'); }

                                return true;
                            },
                            fieldInfo: '',
                            cls: [
                                'lb_req',
                                'inp_unit'
                            ],
                            id: 'https_timeout',
                            width: 420,
                            afterBodyEl: [
                                '<div class="inp_after">{[__zen(\'sec\')]}</div>'
                            ],
                            labelSeparator: ' ',
                            labelWidth: 230,
                            msgTarget: 'none',
                            enableKeyEvents: true,
                            enforceMaxLength: true,
                            maskRe: /[0-9.]/,
                            maxLength: 5,
                            minLength: 1,
                            bind: {
                                fieldLabel: '{https_connection_timeout}'
                            },
                            listeners: {
                                errorchange: 'onHttps_timeoutErrorChange',
                                keydown: 'onHttps_timeoutKeydown',
                                focus: 'onHttps_timeoutFocus',
                                blur: 'onHttps_timeoutBlur',
                                change: 'onHttps_timeoutChange'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    componentCls: 'hr',
                    height: 1,
                    id: 'hr1',
                    margin: '0 0 10 0',
                    layout: 'border'
                },
                {
                    xtype: 'container',
                    id: 'timezoneG',
                    margin: '0 0 15 0',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'timezone',
                            width: 800,
                            labelSeparator: ' ',
                            labelWidth: 240,
                            editable: false,
                            store: 'store_timezone',
                            valueField: 'value',
                            bind: {
                                fieldLabel: '{standard_time_zone}'
                            }
                        },
                        {
                            xtype: 'label',
                            componentCls: 'mt_noti',
                            id: 'info5',
                            margin: '0 0 0 245',
                            bind: {
                                text: '{system_info1}'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    id: 'timesyncG',
                    margin: '0 0 15 0',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                            id: 'timesync',
                            width: 420,
                            labelSeparator: ' ',
                            labelWidth: 240,
                            editable: false,
                            store: 'store_timesync',
                            valueField: 'value',
                            bind: {
                                fieldLabel: '{time_sync}'
                            },
                            listeners: {
                                change: 'onTimesyncChange'
                            }
                        },
                        {
                            xtype: 'container',
                            id: 'staticG',
                            layout: {
                                type: 'hbox',
                                align: 'stretchmax'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(value === true){ return true; }
                                        if(!CheckNotNull(value)){ return get_msg('err_null'); }

                                        var valid = (/^(\d{4})[\/\-\.](0?[1-9]|1[012])[\/\-\.](0?[1-9]|[12][0-9]|3[01])\s([0-1][0-9]|[2][0-3])\:([0-5][0-9])\:([0-5][0-9])$/).test(value);
                                        if(!valid){ return get_msg('err_form'); }

                                        return true;
                                    },
                                    fieldInfo: 'YYYY-MM-DD HH:MM:SS',
                                    id: 'timestring',
                                    margin: '0 0 0 5',
                                    width: 200,
                                    hideLabel: true,
                                    msgTarget: 'none',
                                    listeners: {
                                        errorchange: 'onTimestringErrorChange',
                                        focus: 'onTimestringFocus',
                                        blur: 'onTimestringBlur'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            id: 'syncG',
                            items: [
                                {
                                    xtype: 'container',
                                    id: 'textG',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'combobox',
                                            id: 'timeserver',
                                            margin: '0 0 0 5',
                                            width: 200,
                                            labelSeparator: ' ',
                                            editable: false,
                                            autoSelect: false,
                                            store: 'store_timeserver',
                                            valueField: 'value',
                                            listeners: {
                                                change: 'onTimeserverChange'
                                            }                                        },
                                        {
                                            xtype: 'textfield',
                                            margin : '0 5 0 0',
                                            validator: function(value) {
                                                if(value === true){ return true; }
                                                if(Ext.getCmp('timeserver').getValue() === 'manual_input'){
                                                    if(!CheckNotNull(value)){
                                                        return get_msg(err_null);
                                                    }else{
                                                        if(ValidNum(value.charAt(0))){
                                                            if(!ValidIPAddress(value)){
                                                                return get_msg(err_ip);
                                                            }
                                                        }else{
                                                            if(!ValidURL(value)){
                                                                return get_msg(err_timezone);
                                                            }
                                                        }
                                                        return true;
                                                    }
                                                }

                                            },
                                            fieldInfo: 'URL Or IPv4',
                                            hidden: true,
                                            id: 'serverstring',
                                            margin: '0 0 0 5',
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            enforceMaxLength: true,
                                            maxLength: 31,
                                            minLength: 1,
                                            listeners: {
                                                errorchange: 'onServerstringErrorChange',
                                                focus: 'onServerstringFocus',
                                                blur: 'onServerstringBlur'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'segmentedbutton',
                                    cls: 'zen_seg',
                                    id: 'server_type',
                                    margin: '5 0 7 5',
                                    items: [
                                        {
                                            enableToggle: true,
                                            pressed: true,
                                            text: 'rdate (TCP 37)',
                                            value: 'rdate'
                                        },
                                        {
                                            text: 'ntpdate (UDP 123)',
                                            value: 'ntpdate'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    componentCls: 'mt_noti',
                                    id: 'info7',
                                    margin: '0 0 0 15',
                                    bind: {
                                        text: '{system_info2}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            cls: 'btn_b',
                            width : 100,
                            componentCls: 'btn_auth',
                            id: 'btn_nowrun',
                            margin: '0 5 0 5',
                            bind: {
                                text: '{immediate_execute}'
                            },
                            listeners: {
                                click: 'onBtn_nowrunClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    componentCls: 'hr',
                    height: 1,
                    id: 'hr2',
                    margin: '0 0 10 0',
                    layout: 'border'
                },
                {
                    xtype: 'container',
                    items: [
                        {
                            xtype: 'textareafield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(value===""){ return get_msg('err_null'); }
                                if(byteCheck(value)>511){ return ValidByte(511); }

                                return true;
                            },
                            cls: 'lb_req',
                            id: 'banner',
                            width: 800,
                            labelSeparator: ' ',
                            labelWidth: 230,
                            msgTarget: 'none',
                            bind: {
                                fieldLabel: '{banner_text}'
                            },
                            listeners: {
                                errorchange: 'onBannerErrorChange1',
                                blur: 'onBannerBlur1'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    hidden: true,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 200,
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'lb_req x-field x-form-item-label x-form-item-label-default',
                                    text: '배너 문구'
                                }
                            ]
                        },
                        {
                            xtype: 'textareafield',
                            validator: function(value) {
                                if(value === true){ return true; }
                                if(value===""){ return get_msg('err_null'); }
                                if(byteCheck(value)>511){ return ValidByte(511); }

                                return true;
                            },
                            cls: 'login_banner_w',
                            height: 125,
                            id: 'banner_',
                            width: 260,
                            labelSeparator: ' ',
                            msgTarget: 'none',
                            value: '※ 본 시스템은 허가된 사용자만 이용할 수 있습니다.\r\n부당한 방법으로 시스템에 접속하거나 정보를 삭제/변경/유출하는 사용자는 관련법령에 따라 처벌 받을 수 있으니 주의하시기 바랍니다.',
                            enableKeyEvents: true,
                            listeners: {
                                errorchange: 'onBannerErrorChange',
                                blur: 'onBannerBlur'
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    componentCls: 'hr',
                    height: 1,
                    hidden: true,
                    id: 'hr4',
                    margin: '0 0 10 0',
                    layout: 'border'
                },
                {
                    xtype: 'container',
                    hidden: true,
                    id: 'con_bypass',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            width: 230,
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    cls: 'x-field x-form-item-label x-form-item-label-default',
                                    bind: {
                                        text: '{bypass_set}'
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            disabled: true,
                                            id: 'p1',
                                            fieldLabel: '',
                                            boxLabel: 'B/P1',
                                            inputValue: '1'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '0 0 0 10',
                                            text: '(eth0/1)'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    layout: 'table',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            disabled: true,
                                            id: 'p2',
                                            fieldLabel: '',
                                            boxLabel: 'B/P2',
                                            inputValue: '2'
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '0 0 0 10',
                                            text: '(eth2/3)'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'checkboxfield',
                                    disabled: true,
                                    id: 'p3',
                                    fieldLabel: '',
                                    boxLabel: 'B/P3',
                                    inputValue: '4'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    disabled: true,
                                    id: 'p4',
                                    fieldLabel: '',
                                    boxLabel: 'B/P4',
                                    inputValue: '8'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onNFW2_basicAfterRender',
        beforeclose : 'saveData'
    },
    // 해당 UI는 SMC4ZEN에서 더이상 사용하지 않습니다.
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
                    itemId: 'fld_msg'
                }
            ]
        }
    ],
    onNfw_nameErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onNfw_nameBlur: function(component, event, eOpts) {
        component.validateValue(true);
        //setTipBlur(this,component);
    },

    onNfw_nameFocus: function(component, event, eOpts) {
        component.fieldInfo = "한글, 영어, 숫자, 공백 포함 31자";
        //setTipFocus(this,component);
    },

    onNfw_nameKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(code === 32){
            e.stopEvent();
        }
    },

    onSsh_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onSsh_portKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }
    },

    onSsh_portFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 65535';
        //setTipFocus(this,component);
    },

    onSsh_portBlur: function(component, event, eOpts) {
        //setTipBlur(this,component);
        component.validateValue(true);
    },

    onHttps_manageportErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onHttps_manageportKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }
    },

    onHttps_manageportFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 65535';
        //setTipFocus(this,component);
    },

    onHttps_manageportBlur: function(component, event, eOpts) {
        //setTipBlur(this,component);
        component.validateValue(true);
    },

    onHttps_timeoutErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onHttps_timeoutKeydown: function(textfield, e, eOpts) {
        var code = e.browserEvent.keyCode;

        if(ValidNumKeydown(code) === false){
            e.stopEvent();
        }
    },

    onHttps_timeoutFocus: function(component, event, eOpts) {
        if(component.getValue()==="0"){ component.reset(); }
        component.fieldInfo = msg_tip_length(0,3600,0);
        //setTipFocus(this,component);
    },

    onHttps_timeoutBlur: function(component, event, eOpts) {
        //setTipBlur(this,component);
        if(component.getValue()===""){
            component.setValue(0);
        }
        component.validateValue(true);
    },

    onHttps_timeoutChange: function(field, newValue, oldValue, eOpts) {
        var value = removeComma(newValue);
        field.setValue(addComma(value));
    },

    onTimesyncChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'static'){

            Ext.getCmp('staticG').show();
            Ext.getCmp('syncG').hide();

            if(oldValue === 'sync'){

                /*var currentDate = new Date();
                var myDate = Ext.Date.format(currentDate, 'Y:m:d:h:m:s');*/

                Ext.getCmp('timestring').setValue(this.init_setTime());

            }

        }else{

            Ext.getCmp('staticG').hide();
            Ext.getCmp('syncG').show();

            if(oldValue === 'static'){

                Ext.getCmp('timeserver').setValue('time.bora.net');

            }
        }
    },

    onTimestringErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onTimestringFocus: function(component, event, eOpts) {
        //setTipFocus(this,component);
    },

    onTimestringBlur: function(component, event, eOpts) {
        //setTipBlur(this,component);
        component.validateValue(true);
    },

    onTimeserverChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 'manual_input'){

            Ext.getCmp('serverstring').show();
            Ext.getCmp('serverstring').focus(true,10);

        }else{

            Ext.getCmp('serverstring').hide();
            Ext.getCmp('serverstring').reset();

        }
    },

    onServerstringErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onServerstringFocus: function(component, event, eOpts) {
        //setTipFocus(this,component);
    },

    onServerstringBlur: function(component, event, eOpts) {
        //setTipBlur(this,component);
        component.validateValue(true);
    },

    onBtn_nowrunClick: function(button, e, eOpts) {
        if(Ext.getCmp('timesync').getValue() === 'static'){

            if(Ext.getCmp("timestring").isValid() === false){ Ext.getCmp("timestring").focus(); return false; }

            var _params = {
                time: Ext.encode(Ext.getCmp('timestring').getValue())
            };

            Ext.data.JsonP.request({
                url: '/api/ftuctrl/exec_setting_usertime',
                params: _params,
                success: function(response){

                    if(response.retcode === true){
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            icon: Ext.window.MessageBox.INFO
                        });
                    }else{
                        prt_errMsg(response.errmsg, null);
                    }
                }
            });

        }else{

            if(Ext.getCmp("timeserver").getValue() === "manual_input"){

                var valid_id = Ext.getCmp('serverstring');

                if(valid_id.isValid() === false){
                    valid_id.focus();
                    return false;
                }else{

                    var _params = {
                        url : Ext.encode(Ext.getCmp("serverstring").getValue()),
                        check_host_ip : Ext.encode(true)
                    };
                }

            }else{

                var _params = {
                    url : Ext.encode(""),
                    check_host_ip : Ext.encode(false)
                };

            }

            Ext.data.JsonP.request({
                url : '/api/ftuctrl/exec_sync_timeserver',
                params : _params,
                success : function(response){

                    if(response.retcode === true){
                        Ext.Msg.show({
                            title: __weguardia,
                            msg: get_msg("msg_ok_add"),
                            width: 300,
                            buttons: Ext.Msg.OK,
                            icon: Ext.window.MessageBox.INFO
                        });

                    }else{
                        prt_errMsg(response.errmsg, null);
                    }

                },
                failure : function(response){
                    console.log("fail");
                }
            });
        }
    },

    onBannerErrorChange1: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBannerBlur1: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onBannerErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onBannerBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },
    onNFW2_basicAfterRender: function(component, eOpts) {
        
        // 공통변수 선언
        var me = this;
        var vm = me.getViewModel();
        var vd = vm.getData().system_basic;

        // Tip 설정
        me.fieldInfo = makeZenTip();

        // SMC4ZEN 배너 설정
        Ext.getCmp("banner").setValue(__zen('system_info3'));

        // 뷰-모델에서 데이터 가져오기
        me.init_system_basic(vd);

    },

    init_system_basic: function(viewData) {

        var me = this;

        /* Bypass Setting
        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'isTarget',
            {},
            function(response){
                if(response === 'x86'){

                    var _params = {
                        filename: Ext.encode('/proc/ferret/network/bypass')
                    };

                    request_helper.xmlrpc_call_JsonP(
                        'ftuctrl',
                        'getFileContent',
                        _params,
                        function(response){

                            var bypass = response[0];

                            var ar_by = bypass.split(",");
                            var show = ar_by[2].split(" : ");

                            if(show[1] === "on"){
                                Ext.getCmp("con_bypass").show();
                                Ext.getCmp("hr4").show();
                            }else{
                                return false;
                            }

                            var port = ar_by[1].split(":");
                            port = port[1];

                            for(var i=0; i<port; i++){

                                eval("Ext.getCmp('p"+(i+1)+"').setDisabled(false)");
                            }
                        }
                    );
                }
            }
        );
        */

        if(!viewData.system_basic){ 

            return false; 

        }

        var retval = viewData.system_basic;

        //me.name = retval.name;

        Ext.getCmp('nfw_name').setValue(retval.name);

        if(retval.ssh_port === null){

            Ext.getCmp('ssh_port').setValue('8022');

        }
        else{

            Ext.getCmp('ssh_port').setValue(retval.ssh_port);

        }

        if(retval.https_manageport === null){

            Ext.getCmp('https_manageport').setValue('8443');

        }
        else{

            Ext.getCmp('https_manageport').setValue(retval.https_manageport);

        }

        if(retval.https_timeout === null){

            Ext.getCmp('https_timeout').setValue(600);

        }
        else{

            Ext.getCmp('https_timeout').setValue(addComma(retval.https_timeout));

        }

        if(retval.timezone === null){

            Ext.getCmp('timezone').setValue(9);

        }
        else{

            Ext.getCmp('timezone').setValue(retval.timezone / 60);

        }

        if(retval.timesync["@type"] === null){

            Ext.getCmp('timesync').setValue("static");

        }
        else{

            if(retval.timesync["@type"] === "sync"){

                if(retval.timesync.server["@addr"] === null){

                    Ext.getCmp('timeserver').setValue("time.bora.net");

                }
                else{

                    Ext.getCmp('timeserver').setValue(retval.timesync.server["@addr"]);

                }

                Ext.getCmp("server_type").setValue(retval.timesync.server["@type"]);

            }
            else{

                Ext.getCmp('timestring').setValue(me.init_setTime());

            }

            Ext.getCmp('timesync').setValue(retval.timesync["@type"]);

        }

        if(retval.bypass){

            var bypass = retval.bypass;

            if(bypass["@bp1"] === "on"){ Ext.getCmp("p1").setValue(true); }
            if(bypass["@bp2"] === "on"){ Ext.getCmp("p2").setValue(true); }
            if(bypass["@bp3"] === "on"){ Ext.getCmp("p3").setValue(true); }
            if(bypass["@bp4"] === "on"){ Ext.getCmp("p4").setValue(true); }

        }

        if(retval.banner)
            Ext.getCmp("banner").setValue(retval.banner);

    },
    init_setTime: function() {

        var currentDate = new Date();

        var xb = currentDate.getFullYear();
        var xc = currentDate.getMonth()+1;
        var xd = currentDate.getDate();
        var xe = currentDate.getHours();
        var xf = currentDate.getMinutes();
        var xg = currentDate.getSeconds();

            xc = xc < 10 ? "0" + xc : xc;
            xd = xd < 10 ? "0" + xd : xd;
            xe = xe < 10 ? "0" + xe : xe;
            xf = xf < 10 ? "0" + xf : xf;
            xg = xg < 10 ? "0" + xg : xg;

        var tmval = xb+"-"+xc+"-"+xd + " " + xe+":"+xf+":"+xg;

        return tmval;

    },
    saveData : function(){

        var me = this;
        var vm = me.getViewModel();
        var parentVm = me.parentObj.getViewModel();

        // 데이터 저장

        var str = ['nfw_name','ssh_port','https_manageport','https_timeout','banner'];
        var valid_id = new Array(str.length);

        for(var i = 0; i < str.length; i++){

            valid_id[i] = Ext.getCmp(str[i]);

            if(valid_id[i].isValid() === false){ 

                Ext.getCmp(str[i]).focus(); 
                me.parentObj.viewState = false;

                return false; 

            }

        }

        var system_basic = {};

        system_basic.name = Ext.getCmp("nfw_name").getValue();
        system_basic.ssh_port = parseInt(Ext.getCmp("ssh_port").getValue());
        system_basic.https_manageport = parseInt(Ext.getCmp("https_manageport").getValue());
        system_basic.https_timeout = parseInt(removeComma(Ext.getCmp("https_timeout").getValue()));
        system_basic.timezone = parseInt(Ext.getCmp("timezone").getValue()) * 60;
        system_basic.timesync = {};

        system_basic.bypass = {};
        system_basic.bypass["@bp1"] = (Ext.getCmp("p1").getValue())?"on":"off";
        system_basic.bypass["@bp2"] = (Ext.getCmp("p2").getValue())?"on":"off";
        system_basic.bypass["@bp3"] = (Ext.getCmp("p3").getValue())?"on":"off";
        system_basic.bypass["@bp4"] = (Ext.getCmp("p4").getValue())?"on":"off";
        system_basic["banner"] = Ext.getCmp("banner").getValue();

        //시스템 시간 직접 설정
        if(Ext.getCmp("timesync").getValue() === "static"){

            if(Ext.getCmp("timestring").isValid() === false){

                Ext.getCmp("timestring").focus(); 

                me.parentObj.viewState = false;

                return false; 

            }

            system_basic.timesync["@type"] = "static";
            system_basic.timesync.timestring = Ext.getCmp("timestring").getValue();

        }
        //시간 서버와 동기화
        else{

            system_basic.timesync["@type"] = "sync";
            system_basic.timesync["server"] = {};

            if(Ext.getCmp("timeserver").getValue() === "manual_input"){

                system_basic.timesync.server["@addr"] = "manual_input";

                if(!Ext.getCmp('serverstring').isValid()){

                    me.parentObj.viewState = false;

                    return false;

                }
                else{

                    system_basic.timesync.server["#text"] = Ext.getCmp("serverstring").getValue();

                }

            }
            else{

                system_basic.timesync.server["@addr"] = Ext.getCmp("timeserver").getValue();

            }

            system_basic.timesync.server["@type"] = Ext.getCmp("server_type").getValue();

        }
        
        // System Basic 데이터 저장

        var saveBasicData = {};

        saveBasicData.system_basic = system_basic;

        parentVm.set('system_basic', saveBasicData);

        parentVm.set('name', system_basic.name);

        // 뷰-상태 변경

        me.parentObj.viewState = true;

        return true;

    }
    
});