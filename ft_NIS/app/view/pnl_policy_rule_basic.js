
Ext.define('SMC.view.pnl_policy_rule_basic', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.Label',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.form.field.Number'
    ],

    border: false,
    margin: '3 3 3 3',
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
                    margin: '2 5 1 5',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'chk_policy_rule_basic_use',
                            fieldLabel: '사용',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            listeners: {
                                change: {
                                    fn: me.onChk_policy_NAT_useChange1,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '2 5 1 5',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'chk_policy_rule_basic_direct',
                            fieldLabel: '양방향 정책',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            listeners: {
                                change: {
                                    fn: me.onChk_policy_rule_basic_directChange,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margins: '',
                    margin: '2 5 1 5',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'radiogroup',
                            flex: 1,
                            itemId: 'rbGrp_ploicy_rule_basic_act',
                            width: 400,
                            fieldLabel: '행위',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            items: [
                                {
                                    xtype: 'radiofield',
                                    itemId: 'Accept',
                                    name: 'act',
                                    boxLabel: 'Accept',
                                    inputValue: 'Accept'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'Deny',
                                    name: 'act',
                                    boxLabel: 'Deny',
                                    inputValue: 'Deny'
                                },
                                {
                                    xtype: 'radiofield',
                                    itemId: 'IPSec',
                                    name: 'act',
                                    boxLabel: 'IPSec',
                                    inputValue: 'IPSec',
                                    listeners: {
                                        change: {
                                            fn: me.onIPSecChange,
                                            scope: me
                                        }
                                    }
                                }
                            ],
                            listeners: {
                                change: {
                                    fn: me.onRbGrp_ploicy_rule_basic_actChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            itemId: 'cont_IPSEC_SA',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'label',
                                    margins: '5',
                                    text: 'IPSEC SA'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cb_policy_rule_adv_IPSECSA',
                                    width: 150,
                                    labelSeparator: '  ',
                                    editable: false,
                                    displayField: 'ipsecsaName',
                                    valueField: 'ipsecsaCid',
                                    listeners: {
                                        change: {
                                            fn: me.onCb_policy_rule_adv_IPSECSAChange,
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

                                                me.query('combobox[itemId="cb_policy_rule_adv_IPSECSA"]')[0].setValue('Any');
                                            },
                                            margin: '0 10 0 10',
                                            width: 24,
                                            iconCls: 'ico_grid_row_delete',
                                            text: 'MyButton'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'cont_policy_rule_log',
                    margin: '2 5 1 5',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'combobox',
                            itemId: 'cb_policy_rule_basic_log',
                            width: 220,
                            fieldLabel: '로그',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            editable: false,
                            displayField: 'name',
                            queryMode: 'local',
                            valueField: 'log',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_rule_basic_logChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'cont_policy_log_conf',
                            layout: 'fit'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '2 5 1 5',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            itemId: 'txt_policy_rule_basic_timeout',
                            width: 180,
                            fieldLabel: '타임아웃',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            listeners: {
                                change: {
                                    fn: me.onTxt_policy_rule_basic_timeoutChange,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'label',
                            margins: '5',
                            text: '초'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margin: '2 5 1 5',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            itemId: 'txt_policy_rule_basic_desc',
                            width: 180,
                            fieldLabel: '설명',
                            labelSeparator: ' ',
                            labelWidth: 80,
                            listeners: {
                                change: {
                                    fn: me.onTxt_policy_rule_basic_descChange,
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

    onChk_policy_NAT_useChange1: function(field, newValue, oldValue, eOpts) {
        var me = this,
            _val = "";

        if(newValue === true){
            _val = "on";
        }else{
            _val = "off";
        }

        me.policyWin.fn_set_policy_rule_obj({key : '@use', val : _val});
    },

    onChk_policy_rule_basic_directChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            _val;

        if(newValue){
            _val = 'on';
        } else {
            _val = 'off';
        }

        me.policyWin.fn_set_policy_rule_obj({key : 'cross_spd', val : _val});
    },

    onIPSecChange: function(field, newValue, oldValue, eOpts) {

        var me = this;
        var _cont = me.query('container[itemId=cont_IPSEC_SA]')[0];
        _cont.setVisible(newValue);

        if(!newValue){
            me.policyWin.fn_set_policy_rule_obj({key : 'ipsecsa', val : {
                '#text' : DEFAULT.TEXT,
                '@cid' : DEFAULT.CID
            }});
        }
    },

    onRbGrp_ploicy_rule_basic_actChange: function(field, newValue, oldValue, eOpts) {

        var me = this,
            _val = newValue.act;


        me.policyWin.fn_set_policy_rule_obj({key : 'action', val : _val});
    },

    onCb_policy_rule_adv_IPSECSAChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        me.fn_combo_change(field.getStore(), newValue, 'ipsecsaName','ipsecsaCid', 'ipsecsa');
    },

    onCb_policy_rule_basic_logChange: function(field, newValue, oldValue, eOpts) {
        //console.log(field, newValue, oldValue, eOpts);

        var me = this,
            _val = newValue,
            _isUserMode = true,
            _logItem = [],
            _userlev = {"@drop":"off","@create":"off","@close":"off","@accept":"off","@abnormal":"off"};

        var _cont = me.query('container[itemId=cont_policy_log_conf]')[0];
        _cont.removeAll(true);
        if(_val === 'NoLog'){

        } else if(_val === 'Debug'){

            _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : true, margin : '0 5 0 5'});
            _userlev = {"@drop":"on","@create":"on","@close":"on","@accept":"on","@abnormal":"on"};

        } else if(_val === 'Information') {

            _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : true, margin : '0 5 0 5'});
            _userlev = {"@drop":"on","@create":"on","@close":"on","@accept":"on","@abnormal":"on"};

        } else if(_val === 'Normal') {

            _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : true, margin : '0 5 0 5'});
            _userlev = {"@drop":"on","@create":"on","@close":"on","@accept":"on","@abnormal":"on"};

        } else if(_val === 'Warning') {

            _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : false, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : true, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : true, margin : '0 5 0 5'});
            _userlev = {"@drop":"on","@create":"off","@close":"on","@accept":"off","@abnormal":"on"};

        } else if(_val === 'Serious') {

            _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : false, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : false, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : false, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : false, margin : '0 5 0 5'});

        } else if(_val === 'Critical') {

            _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : false, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : false, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : false, margin : '0 5 0 5'});
            _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : false, margin : '0 5 0 5'});

        } else{

            _isUserMode = false;
            var comb = me.query('combobox[itemId=cb_policy_rule_basic_log]')[0];

            if(comb.first_userDefine)
            {
                comb.first_userDefine = false;

                if(comb.userlev['@accept'] === "on" && comb.userlev['@create'] === "on"){
                    _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : true, margin : '0 5 0 5'});
                    _userlev['@accept'] = "on";
                    _userlev['@create'] = "on";
                }else{
                    _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : false, margin : '0 5 0 5'});
                    _userlev['@accept'] = "off";
                    _userlev['@create'] = "off";
                }

                if(comb.userlev['@drop'] === "on"){
                    _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : true, margin : '0 5 0 5'});
                    _userlev['@drop'] = "on";
                }else{
                    _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : false, margin : '0 5 0 5'});
                    _userlev['@drop'] = "off";
                }

                if(comb.userlev['@close'] === "on"){
                    _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : true, margin : '0 5 0 5'});
                    _userlev['@close'] = "on";
                }else{
                    _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : false, margin : '0 5 0 5'});
                    _userlev['@close'] = "off";
                }

                if(comb.userlev['@abnormal'] === "on"){
                    _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : true, margin : '0 5 0 5'});
                    _userlev['@abnormal'] = "on";
                }else{
                    _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : false, margin : '0 5 0 5'});
                    _userlev['@abnormal'] = "off";
                }
            }
            else
            {
                _logItem.push({ boxLabel: '세션생성', name: 'logconf', inputValue: '1', checked : false, margin : '0 5 0 5'});
                _logItem.push({ boxLabel: '패킷드랍', name: 'logconf', inputValue: '2', checked : false, margin : '0 5 0 5'});
                _logItem.push({ boxLabel: '세션종료', name: 'logconf', inputValue: '3', checked : false, margin : '0 5 0 5'});
                _logItem.push({ boxLabel: '비정상세션종료'	, name: 'logconf', inputValue: '4', checked : false, margin : '0 5 0 5'});
            }
        }

        me.policyWin.fn_set_policy_rule_obj({key : 'userlev', val : _userlev});

        var _rbGrp = Ext.create('Ext.form.CheckboxGroup',{
            vertical : false,
            disabled : _isUserMode,
            items : _logItem,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            listeners : {
                change : function(field, newValue, oldValue, e0pts){

                    if(field.items.items[0].checked)
                    {
                        _userlev['@create'] = "on";
                        _userlev['@accept'] = "on";
                    }
                    else
                    {
                        _userlev['@create'] = "off";
                        _userlev['@accept'] = "off";
                    }

                    if(field.items.items[1].checked)
                    {
                        _userlev['@drop'] = "on";
                    }
                    else
                    {
                        _userlev['@drop'] = "off";
                    }

                    if(field.items.items[2].checked)
                    {
                        _userlev['@close'] = "on";
                    }
                    else
                    {
                        _userlev['@close'] = "off";
                    }

                    if(field.items.items[3].checked)
                    {
                        _userlev['@abnormal'] = "on";
                    }
                    else
                    {
                        _userlev['@abnormal'] = "off";
                    }

                    me.policyWin.fn_set_policy_rule_obj({key : 'userlev', val : _userlev});

                }
            }
        });

        _cont.add(_rbGrp);


        me.policyWin.fn_set_policy_rule_obj({key : 'loglevel', val : _val});
    },

    onTxt_policy_rule_basic_timeoutChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            _val = newValue;

        me.policyWin.fn_set_policy_rule_obj({key : 'timeout', val : parseInt(_val, 10)});
    },

    onTxt_policy_rule_basic_descChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            _val = newValue;

        me.policyWin.fn_set_policy_rule_obj({key : 'desc', val : _val});
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        //console.log('basic : ', me.rawData);
        //me.fn_view_init(me.rawData);
    },

    fn_view_init: function(_raw) {
        var me = this;
        var _cb = me.query('combobox[itemId=cb_policy_rule_basic_log]')[0];

        var _log_store = Ext.create('Ext.data.Store', {
            fields : ['log', 'name'],
            data : LOG_LEVEL
        });

        _cb.bindStore(_log_store);

        if(_raw['etc']['@loglevel'] === "user")
        {
            _cb.first_userDefine = true;
            _cb.userlev = _raw['userlev'];
        }

        _cb.setValue(_raw['etc']['@loglevel']);

        var _rb = me.query('radio[itemId=' + _raw['etc']['@action'] + ']')[0];
        _rb.setValue(true);

        var _txt = me.query('textfield[itemId=txt_policy_rule_basic_timeout]')[0];
        _txt.setRawValue(_raw['etc']['@timeout']);

        var _use = me.query('checkbox[itemId=chk_policy_rule_basic_use]')[0];
        _use.setValue(_raw['@use']);

        var _chk = me.query('checkbox[itemId=chk_policy_rule_basic_direct]')[0];
        _chk.setValue(_raw['etc']['@cross_spd']);

        var _desc = me.query('textfield[itemId=txt_policy_rule_basic_desc]')[0];
        _desc.setRawValue(_raw['desc']);

        function bindList(node, vField, dField, comp, res, confName, isCheck){
             request_helper.xmlrpc_call_Ajax_Post(
                 SMC_SERVICE_NAME,
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
                    console.log('isCheck - ', isCheck);
                     if(isCheck){
                         if(typeof _raw[confName] === 'undefined' || _raw[confName]['@cid'] === DEFAULT.CID){
                             //comp.setValue(DEFAULT.CID);
                             comp.setRawValue(DEFAULT.TEXT);
                         } else {

                             if(_raw['ipsecsa']['@cid'] === DEFAULT.CID)
                             {
                                 comp.setRawValue(_raw['ipsecsa']['#text']);
                             }
                             else
                             {
                                 comp.setValue(_raw[confName]['@cid']);
                             }
                         }
                     }
                     else{

                         if(_raw['ipsecsa']['@cid'] === DEFAULT.CID)
                         {
                             comp.setRawValue(_raw['ipsecsa']['#text']);
                         }
                         else
                         {
                             comp.setValue(_raw['ipsecsa']['@cid']);
                         }
                     }
                 }
             );
        }


        var _ipsec_cb = me.query('combobox[itemId=cb_policy_rule_adv_IPSECSA]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            SMC_SERVICE_NAME,
            'getGroup',
            {gtype : Ext.encode('obj_ipsec_ipsecsa')},
            function(response){
                bindList(response, 'ipsecsaCid', 'ipsecsaName', _ipsec_cb, [], 'ipsecsa');
            }
        );

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
        //_store, newValue, displayField, valueField, _key

        me.policyWin.fn_set_policy_rule_obj({key : _key, val : _val});
    }

});