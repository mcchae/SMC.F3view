
Ext.define('SMC.view.pnl_policy_rule_adv', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.form.Label'
    ],

    border: false,
    minWidth: 200,
    autoScroll: true,
    bodyBorder: false,
    header: false,
    title: 'My Panel',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    weight: 20,
                    hidden: true,
                    margin: '2 5 1 5',
                    width: 350,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            margins: '5',
                            itemId: 'cb_policy_rule_adv_app',
                            width: 350,
                            fieldLabel: '어플리케이션',
                            labelSeparator: ' ',
                            displayField: 'appName',
                            valueField: 'appCid',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_rule_adv_appChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    weight: 10,
                    margin: '2 5 1 5',
                    width: 350,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            margins: '5',
                            itemId: 'cb_policy_rule_adv_sch',
                            width: 350,
                            fieldLabel: '스케쥴',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'schName',
                            valueField: 'schCid',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_rule_adv_schChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            border: 0,
                            padding: 0,
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = button.up('panel');

                                        me.query('combobox[itemId="cb_policy_rule_adv_sch"]')[0].setValue('Any');
                                    },
                                    margin: '0 10 0 10',
                                    width: 24,
                                    iconCls: 'ico_grid_row_delete',
                                    text: 'MyButton'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margins: '',
                    weight: 30,
                    margin: '2 5 1 5',
                    width: 350,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            margins: '5',
                            itemId: 'cb_policy_rule_adv_qos',
                            width: 350,
                            fieldLabel: 'QoS',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'qosName',
                            valueField: 'qosCid',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_rule_adv_qosChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'toolbar',
                            flex: 1,
                            border: 0,
                            padding: 0,
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = button.up('panel');

                                        me.query('combobox[itemId="cb_policy_rule_adv_qos"]')[0].setValue('Any');
                                    },
                                    margin: '0 10 0 10',
                                    width: 24,
                                    iconCls: 'ico_grid_row_delete',
                                    text: 'MyButton'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    weight: 30,
                    margin: '2 5 1 5',
                    width: 350,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            margins: '5',
                            itemId: 'chk_policy_rule_adv_IPS',
                            fieldLabel: 'DPI',
                            labelSeparator: ' ',
                            boxLabel: 'IPS',
                            listeners: {
                                change: {
                                    fn: me.onChk_policy_rule_adv_IPSChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'combobox',
                            margins: '5',
                            itemId: 'cb_policy_rule_adv_IPS_type',
                            margin: '',
                            width: 193,
                            labelPad: 1,
                            labelSeparator: ' ',
                            readOnly: true,
                            editable: false,
                            displayField: 'ipsName',
                            valueField: 'ipsVal',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_rule_adv_IPS_typeChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    weight: 30,
                    margin: '2 5 1 5',
                    width: 350,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            margins: '5',
                            itemId: 'chk_policy_rule_adv_expire',
                            fieldLabel: '정책유효기간',
                            labelSeparator: ' ',
                            listeners: {
                                change: {
                                    fn: me.onChk_policy_rule_adv_expireChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'dt_policy_rule_adv_expire_date',
                            labelSeparator: ' ',
                            readOnly: true,
                            editable: false,
                            format: 'Y/m/d',
                            listeners: {
                                change: {
                                    fn: me.onDt_policy_rule_adv_expire_dateChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            margins: '5',
                            text: '일'
                        },
                        {
                            xtype: 'combobox',
                            margins: '5',
                            itemId: 'cb_policy_rule_adv_expire_hour',
                            margin: '',
                            width: 80,
                            labelPad: 1,
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'hour',
                            valueField: 'hour',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_rule_adv_expire_hourChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            margins: '5',
                            text: '시'
                        },
                        {
                            xtype: 'checkboxfield',
                            margins: '5',
                            itemId: 'chk_policy_rule_adv_expire_now',
                            readOnly: true,
                            boxLabel: '유효기간 만료시 즉시 적용',
                            listeners: {
                                change: {
                                    fn: me.onChk_policy_rule_adv_expire_nowChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPanelAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCb_policy_rule_adv_appChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.fn_combo_change(field.getStore(), newValue, 'appName','appCid', 'application');

    },

    onCb_policy_rule_adv_schChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.fn_combo_change(field.getStore(), newValue, 'schName','schCid', 'schedule');
    },

    onCb_policy_rule_adv_qosChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.fn_combo_change(field.getStore(), newValue, 'qosName','qosCid', 'qos');
    },

    onChk_policy_rule_adv_IPSChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.fn_DPI_init(newValue);

    },

    onCb_policy_rule_adv_IPS_typeChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var _chk_ips = me.query('checkbox[itemId=chk_policy_rule_adv_IPS]')[0];
        var _val = {};

        if(newValue === '' || typeof newValue === 'undefined' || newValue == null || newValue === DEFAULT.TEXT || newValue === DEFAULT.CID){
            _val['#text'] = 'off';
            _val['@pid'] = 0;
        }
        else {
            if(_chk_ips.getValue()){
                _val['#text'] = 'on';
            } else {
                _val['#text'] = 'off';
            }
            _val['@pid'] = newValue;
        }

        if(typeof _val['#text'] !== 'undefined' && typeof _val['@pid'] !== 'undefined')
        {
            me.policyWin.fn_set_policy_rule_obj({key : 'ips', val : _val});
        }
    },

    onChk_policy_rule_adv_expireChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var _date = me.query('datefield[itemId=dt_policy_rule_adv_expire_date]')[0];
        var _hour = me.query('combobox[itemId=cb_policy_rule_adv_expire_hour]')[0];
        var _now = me.query('checkboxfield[itemId=chk_policy_rule_adv_expire_now]')[0];
        _hour.setReadOnly(!newValue);
        _date.setReadOnly(!newValue);
        console.log('_date - ', _date);
        console.log('_now - ', _now);
        _now.setReadOnly(!newValue);
        me.fn_set_policy_rule_adv_setExpire();
    },

    onDt_policy_rule_adv_expire_dateChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.fn_set_policy_rule_adv_setExpire();
    },

    onCb_policy_rule_adv_expire_hourChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.fn_set_policy_rule_adv_setExpire();
    },

    onChk_policy_rule_adv_expire_nowChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        me.fn_set_policy_rule_adv_setExpire();
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        //me.fn_view_init(me.rawData);
        /*
        var _data = me.rawData,
            _svc = 'ftSMC';

        function bindList(node, vField, dField, comp, res, confName, isCheck){
             request_helper.xmlrpc_call_Ajax_Post(
                 _svc,
                 'getObjectList',
                 {g_cid : Ext.encode(node.cid)},
                 function(response){
                     var _result = response.result;
                     for(var i in _result){
                         var _tmp = _result[i];
                         var _tmpObj = {};
                         _tmpObj[vField] = _tmp['@cid'];
                         _tmpObj[dField] = _tmp['name'];

                         res.push(_tmpObj);
                     }

                     var _stor = Ext.create('Ext.data.Store', {
                         fields : [dField, vField],
                         data : res
                     });
                     comp.bindStore(_stor);
                     if(isCheck){
                         if(typeof _data[confName] === 'undefined' || _data[confName]['#text'] === DEFAULT.TEXT){
                             comp.setValue(DEFAULT.TEXT);
                         } else {
                             comp.setValue(_data[confName]['#text']);
                         }
                     }
                 }
             );
        }

        //application
        var _appcb = me.query('combobox[itemId=cb_policy_rule_adv_app]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_application')},
            function(response){
                bindList(response, 'appCid', 'appName', _appcb, [], 'application', true);
            }
        );

        //schedule
        var _schcb = me.query('combobox[itemId=cb_policy_rule_adv_sch]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_schedule')},
            function(response){
                bindList(response, 'schCid', 'schName', _schcb, [], 'schedule', true);
            }
        );

        //qos
        var _qoscb = me.query('combobox[itemId=cb_policy_rule_adv_qos]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_qos')},
            function(response){
                bindList(response, 'qosCid', 'qosName', _qoscb, [], 'qos', true);
            }
        );

        //DPI
        var _dpicb = me.query('combobox[itemId=cb_policy_rule_adv_IPS_type]')[0];
        var _dpiStore = Ext.create('Ext.data.Store',{
            fields : ['ipsVal', 'ipsName'],
            data : [
                {'ipsVal' : DPI_TYPE.ALL.VAL		, 'ipsName' : DPI_TYPE.ALL.NAME },
                {'ipsVal' : DPI_TYPE.WEBSERVER.VAL	, 'ipsName' : DPI_TYPE.WEBSERVER.NAME },
                {'ipsVal' : DPI_TYPE.SERVER.VAL		, 'ipsName' : DPI_TYPE.SERVER.NAME },
                {'ipsVal' : DPI_TYPE.PC.VAL			, 'ipsName' : DPI_TYPE.PC.NAME }
            ]
        });

        _dpicb.bindStore(_dpiStore);

        var _chk_ips = me.query('checkbox[itemId=chk_policy_rule_adv_IPS]')[0];

        me.fn_DPI_init(_chk_ips.getValue());


        //ipsec sa
        var _ipsec_cb = me.query('combobox[itemId=cb_policy_rule_adv_IPSECSA]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_ipsec_ipsecsa')},
            function(response){
                bindList(response, 'ipsecsaCid', 'ipsecsaName', _ipsec_cb, [], 'ipsecsa');
            }
        );

        //expire
        var _timeStore = Ext.create('Ext.data.Store',{
            fields : ['hour'],
            data : [
                {'hour' : '00'},
                {'hour' : '01'},
                {'hour' : '02'},
                {'hour' : '03'},
                {'hour' : '04'},
                {'hour' : '05'},
                {'hour' : '06'},
                {'hour' : '07'},
                {'hour' : '08'},
                {'hour' : '09'},
                {'hour' : '10'},
                {'hour' : '11'},
                {'hour' : '12'},
                {'hour' : '13'},
                {'hour' : '14'},
                {'hour' : '15'},
                {'hour' : '16'},
                {'hour' : '17'},
                {'hour' : '18'},
                {'hour' : '19'},
                {'hour' : '20'},
                {'hour' : '21'},
                {'hour' : '22'},
                {'hour' : '23'}
            ]
        });

        var _expire_check = me.query('checkbox[itemId=chk_policy_rule_adv_expire]')[0];
        var _expire_date = me.query('datefield[itemId=dt_policy_rule_adv_expire_date]')[0];
        var _expire_time = me.query('combobox[itemId=cb_policy_rule_adv_expire_hour]')[0];
        var _expire_now = me.query('checkbox[itemId=chk_policy_rule_adv_expire_now]')[0];

        _expire_time.bindStore(_timeStore);

        if (_data['expire']['@date'] === '' && _data['expire']['@time'] === ''){
            _expire_check.setValue(false);

        } else {

            _expire_check.setValue(true);
            var _str = _data['expire']['@date'];
            _str = Ext.String.insert(_str, '/', 4);
            _str = Ext.String.insert(_str, '/', -2);
            var dt = new Date(_str);

            _expire_date.setValue(dt);
            _expire_time.setValue(_data['expire']['@time']);

            if(_data['expire']['@chk_use'] === DEFAULT.ON){
                _expire_now.setValue(true);
            } else {
                _expire_now.setValue(false);
            }
        }
        */


    },

    fn_combo_change: function(_store, newValue, displayField, valueField, _key) {
        var me = this,
            _val;

        if(newValue === '' || typeof newValue === 'undefined' || newValue == null || newValue === DEFAULT.TEXT || newValue === DEFAULT.CID){
            _val = {
                '#text' : DEFAULT.TEXT,
                '@cid' : DEFAULT.CID
            };
        } else {
            var _objList = _store.query(valueField, newValue).items;

            if(_objList.length > 0)
            {
                var _raw = _objList[0].raw;
                _val = {
                    '#text' : _raw[displayField],
                    '@cid' :  _raw[valueField]

                };
            } else {
                _val = {
                    '#text' : DEFAULT.TEXT,
                    '@cid' : DEFAULT.CID
                };
            }
        }


        me.policyWin.fn_set_policy_rule_obj({key : _key, val : _val});
    },

    fn_DPI_init: function(checkState) {
        var me = this;
        var _ipstypecb = me.query('combobox[itemId=cb_policy_rule_adv_IPS_type]')[0];

        var _val = {};

        if(checkState){
            _ipstypecb.setReadOnly(false);

            _val['#text'] = 'on';

        } else {
            _ipstypecb.setReadOnly(true);

            _val['#text'] = 'off';
        }

        if(_ipstypecb.getValue())
        {
            _val['@pid'] = _ipstypecb.getValue();
        }

        if(typeof _val['#text'] !== 'undefined' && typeof _val['@pid'] !== 'undefined')
        {
            me.policyWin.fn_set_policy_rule_obj({key : 'ips', val : _val});
        }
    },

    fn_set_policy_rule_adv_setExpire: function(obj_name, newValue) {
        var me = this, _val, _key = 'expire';

        var _expire_check = me.query('checkbox[itemId=chk_policy_rule_adv_expire]')[0];
        var _expire_date = me.query('datefield[itemId=dt_policy_rule_adv_expire_date]')[0];
        var _expire_time = me.query('combobox[itemId=cb_policy_rule_adv_expire_hour]')[0];
        var _expire_now = me.query('checkbox[itemId=chk_policy_rule_adv_expire_now]')[0];

        if(_expire_check.getValue()){
            var _date = _expire_date.getRawValue();
            if(_date === '' || _date === null || typeof _date === 'undefined'){
                _date = '';
            }
            var _time = _expire_time.getValue();
            if(_time === '' || _time === null || typeof _time === 'undefined'){
                _time = '00';
            }
            var _now = _expire_now.getValue();
            if(_now === '' || _now === null || typeof _time === 'undefined' || !_now){
                _now = 'off';
            } else {
                _now = 'on';
            }
            _val = {
                '@chk_use' : _now,
                '@date' : _date,
                '@time' : _time
            };

        } else {
            _val = {
                '@chk_use' : 'off',
                '@date' : '',
                '@time' : ''
            };
        }

        if(me.exfire_count >= 3)
        {
            me.policyWin.fn_set_policy_rule_obj({key : _key, val : _val});
        }
        else
        {
            me.exfire_count++;
        }
    },

    fn_view_init: function(_raw) {
        var me = this;
        var _svc = 'ftSMC';

        function bindList(node, vField, dField, comp, res, confName, isCheck){
             request_helper.xmlrpc_call_Ajax_Post(
                 _svc,
                 'getObjectList',
                 {g_cid : Ext.encode(node.cid),
                  isRecursive : Ext.encode(true)},
                 function(response){
                     var _result = response.result;
                     for(var i in _result){
                         var _tmp = _result[i];
                         var _tmpObj = {};
                         _tmpObj[vField] = _tmp['@cid'];
                         _tmpObj[dField] = _tmp['name'];

                         res.push(_tmpObj);
                     }

                     var _stor = Ext.create('Ext.data.Store', {
                         fields : [dField, vField],
                         data : res
                     });
                     comp.bindStore(_stor);
                     if(isCheck){
                         if(typeof _raw[confName] === 'undefined' || _raw[confName]['@cid'] === DEFAULT.CID){
                             //comp.setValue(DEFAULT.CID);
                             comp.setRawValue(DEFAULT.TEXT);
                         } else {

                             if(_raw[confName]['@cid'] === DEFAULT.CID)
                             {
                                 comp.setRawValue(DEFAULT.TEXT);
                             }
                             else
                             {
                                 comp.setValue(_raw[confName]['@cid']);
                             }
                         }
                     }
                 }
             );
        }

        //application
        var _appcb = me.query('combobox[itemId=cb_policy_rule_adv_app]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_application')},
            function(response){
                bindList(response, 'appCid', 'appName', _appcb, [], 'application', true);
            }
        );

        //schedule
        var _schcb = me.query('combobox[itemId=cb_policy_rule_adv_sch]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_schedule')},
            function(response){
                bindList(response, 'schCid', 'schName', _schcb, [], 'schedule', true);
            }
        );

        //qos
        var _qoscb = me.query('combobox[itemId=cb_policy_rule_adv_qos]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_qos')},
            function(response){
                bindList(response, 'qosCid', 'qosName', _qoscb, [], 'qos', true);
            }
        );

        //DPI
        var _dpicb = me.query('combobox[itemId=cb_policy_rule_adv_IPS_type]')[0];
        var _dpiStore = Ext.create('Ext.data.Store',{
            fields : ['ipsVal', 'ipsName'],
            data : [
                {'ipsVal' : DPI_TYPE.ALL.VAL		, 'ipsName' : DPI_TYPE.ALL.NAME },
                {'ipsVal' : DPI_TYPE.WEBSERVER.VAL	, 'ipsName' : DPI_TYPE.WEBSERVER.NAME },
                {'ipsVal' : DPI_TYPE.SERVER.VAL		, 'ipsName' : DPI_TYPE.SERVER.NAME },
                {'ipsVal' : DPI_TYPE.PC.VAL			, 'ipsName' : DPI_TYPE.PC.NAME }
            ]
        });

        _dpicb.bindStore(_dpiStore);

        var _chk_ips = me.query('checkbox[itemId=chk_policy_rule_adv_IPS]')[0];

        if(_raw['ips']['#text'] === "on"){
            _chk_ips.setValue(true);
        } else {
            _chk_ips.setValue(false);
        }

        if(_raw['ips']['@pid']){
            _dpicb.setValue(_raw['ips']['@pid']);
        } else{
            _dpicb.setValue(0);
        }

        //expire
        var _timeStore = Ext.create('Ext.data.Store',{
            fields : ['hour'],
            data : [
                {'hour' : '00'},
                {'hour' : '01'},
                {'hour' : '02'},
                {'hour' : '03'},
                {'hour' : '04'},
                {'hour' : '05'},
                {'hour' : '06'},
                {'hour' : '07'},
                {'hour' : '08'},
                {'hour' : '09'},
                {'hour' : '10'},
                {'hour' : '11'},
                {'hour' : '12'},
                {'hour' : '13'},
                {'hour' : '14'},
                {'hour' : '15'},
                {'hour' : '16'},
                {'hour' : '17'},
                {'hour' : '18'},
                {'hour' : '19'},
                {'hour' : '20'},
                {'hour' : '21'},
                {'hour' : '22'},
                {'hour' : '23'}
            ]
        });

        var _expire_check = me.query('checkbox[itemId=chk_policy_rule_adv_expire]')[0];
        var _expire_date = me.query('datefield[itemId=dt_policy_rule_adv_expire_date]')[0];
        var _expire_time = me.query('combobox[itemId=cb_policy_rule_adv_expire_hour]')[0];
        var _expire_now = me.query('checkbox[itemId=chk_policy_rule_adv_expire_now]')[0];

        _expire_time.bindStore(_timeStore);

        var _exp = _raw['expire'];

        if(typeof _exp === 'undefined'){
            _raw['expire'] = {
                '@date' : '',
                '@time' : ''
            };
        }

        me.exfire_count = 0;

        if (_raw['expire']['@date'] === '' && _raw['expire']['@time'] === ''){
            _expire_check.setValue(false);

        } else {

            _expire_check.setValue(true);
            var _str = _raw['expire']['@date'];
            _str = Ext.String.insert(_str, '/', 4);
            _str = Ext.String.insert(_str, '/', -2);
            var dt = new Date(_str);

            console.log('first me.exfire_count - ', me.exfire_count);
            _expire_date.setValue(dt);
            _expire_time.setValue(_raw['expire']['@time']);

            if(_raw['expire']['@chk_use'] === DEFAULT.ON){
                _expire_now.setValue(true);
            } else {
                _expire_now.setValue(false);
            }

            _expire_now.setReadOnly(false);
        }

    }

});