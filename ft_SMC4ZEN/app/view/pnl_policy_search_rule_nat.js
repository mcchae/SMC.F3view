
Ext.define('SMC4ZEN.view.pnl_policy_search_rule_nat', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_policy_search_rule_nat',

    requires: [
        'SMC4ZEN.view.pnl_policy_search_rule_natViewModel',
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.field.Checkbox'
    ],

    viewModel: {
        type: 'pnl_policy_search_rule_nat'
    },
    scrollable: true,
    collapsed: true,
    collapsible: true,
    title: '정책검색',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            margin: 0,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'textfield',
                    tabIndex: 1,
                    itemId: 'txt_policy_name',
                    margin: 5,
                    width: 220,
                    fieldLabel: '객체명',
                    labelAlign: 'right',
                    labelWidth: 80
                },
                {
                    xtype: 'textfield',
                    tabIndex: 2,
                    itemId: 'txt_policy_src',
                    margin: 5,
                    width: 220,
                    fieldLabel: '(변경)출발지 주소',
                    labelAlign: 'right',
                    labelWidth: 110
                },
                {
                    xtype: 'textfield',
                    tabIndex: 3,
                    itemId: 'txt_policy_src_port',
                    margin: 5,
                    width: 120,
                    fieldLabel: '포트',
                    labelAlign: 'right',
                    labelWidth: 50
                },
                {
                    xtype: 'combobox',
                    tabIndex: 4,
                    itemId: 'cb_policy_protocol',
                    margin: 5,
                    width: 182,
                    fieldLabel: '프로토콜',
                    labelAlign: 'right',
                    labelWidth: 60,
                    valueField: 'id'
                },
                {
                    xtype: 'button',
                    tabIndex: 9,
                    itemId: 'btn_policy_search',
                    margin: 5,
                    width: 75,
                    text: '검색',
                    listeners: {
                        click: 'onBtn_policy_searchClick'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            margin: 0,
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'textfield',
                    tabIndex: 5,
                    itemId: 'txt_policy_uid',
                    margin: 5,
                    width: 220,
                    fieldLabel: '정책ID',
                    labelAlign: 'right',
                    labelWidth: 80
                },
                {
                    xtype: 'textfield',
                    tabIndex: 6,
                    itemId: 'txt_policy_dest',
                    margin: 5,
                    width: 220,
                    fieldLabel: '(변경)목적지 주소',
                    labelAlign: 'right',
                    labelWidth: 110
                },
                {
                    xtype: 'textfield',
                    tabIndex: 7,
                    itemId: 'txt_policy_dest_port',
                    margin: 5,
                    width: 120,
                    fieldLabel: '포트',
                    labelAlign: 'right',
                    labelWidth: 50
                },
                {
                    xtype: 'checkboxfield',
                    tabIndex: 8,
                    itemId: 'chk_policy_isAny',
                    margin: 5,
                    boxLabel: 'Any 포함'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender'
    },

    onBtn_policy_searchClick: function(button, e, eOpts) {
        var me = this;
        var _name = me.query('textfield[itemId=txt_policy_name]')[0].getRawValue(),
            _src = me.query('textfield[itemId=txt_policy_src]')[0].getRawValue(),
            _srcPort = me.query('textfield[itemId=txt_policy_src_port]')[0].getRawValue(),
            _protocol = me.query('combobox[itemId=cb_policy_protocol]')[0].getValue(),
            _uid = me.query('textfield[itemId=txt_policy_uid]')[0].getRawValue(),
            _dest = me.query('textfield[itemId=txt_policy_dest]')[0].getRawValue(),
            _destPort = me.query('textfield[itemId=txt_policy_dest_port]')[0].getRawValue(),
            _isAny = me.query('checkbox[itemId=chk_policy_isAny]')[0].getValue();


        /*
        _cond = {
            name : '',//_name,
            sip : '',//_src,
            dip : '',//_dest,
            sport : '',//_srcPort,
            dport : '',//_destPort,
            uid : _uid, //parseInt(_uid, 10),
            proto : ''//_protocol
        };
        */
        var _cond = {};
        if(typeof _name !== 'undefined' && _name !== '' && _name !== null){
            _cond.name = _name;
        }
        if(typeof _src !== 'undefined' && _src !== '' && _src !== null){
            _cond.src = _src;
        }
        if(typeof _srcPort !== 'undefined' && _srcPort !== '' && _srcPort !== null){
            _cond.sport = parseInt(_srcPort, 10);
        }
        if(typeof _protocol !== 'undefined' && _protocol !== '' && _protocol !== null){
            _cond.proto = _protocol;
        }
        if(typeof _uid !== 'undefined' && _uid !== '' && _uid !== null){
            _cond.uid = parseInt(_uid, 10);
        }
        if(typeof _dest !== 'undefined' && _dest !== '' && _dest !== null){
            _cond.dest = _dest;
        }
        if(typeof _destPort !== 'undefined' && _destPort !== '' && _destPort !== null){
            _cond.dport = parseInt(_destPort, 10);
        }
        if(typeof _isAny !== 'undefined' && _isAny !== '' && _isAny !== null){

        }

        _params = {
            cid : Ext.encode(me._policy_cid),
            condition : Ext.encode(_cond)
        };

        console.log('params : ', _params);

        var grid = me.main_grid;
        console.log('grid : ', grid);
        ///*

        request_helper.xmlrpc_call_Ajax_Post(
            SMC_SERVICE_NAME,
            'findRuleList',
            _params,
            function(response){

                SMC_VIEW.make_rule_find_result_window('검색결과', response, grid).show();

        //         me.query('textfield[itemId=txt_policy_name]')[0].setRawValue('');
        //         me.query('textfield[itemId=txt_policy_src]')[0].setRawValue('');
        //         me.query('textfield[itemId=txt_policy_src_port]')[0].setRawValue('');
        //         me.query('combobox[itemId=cb_policy_protocol]')[0].setValue('');
        //         me.query('textfield[itemId=txt_policy_uid]')[0].setRawValue('');
        //         me.query('textfield[itemId=txt_policy_dest]')[0].setRawValue('');
        //         me.query('textfield[itemId=txt_policy_dest_port]')[0].setRawValue('');
        //         me.query('checkbox[itemId=chk_policy_isAny]')[0].setValue(false);

            }
        );
        //*/


        /*

        var me = this;
        var _name = me.query('textfield[itemId=txt_policy_name]')[0].getRawValue(),
            _src = me.query('textfield[itemId=txt_policy_src]')[0].getRawValue(),
            _srcPort = me.query('textfield[itemId=txt_policy_src_port]')[0].getRawValue(),
            _protocol = me.query('combobox[itemId=cb_policy_protocol]')[0].getValue(),
            _uid = me.query('textfield[itemId=txt_policy_uid]')[0].getRawValue(),
            _dest = me.query('textfield[itemId=txt_policy_dest]')[0].getRawValue(),
            _destPort = me.query('textfield[itemId=txt_policy_dest_port]')[0].getRawValue(),
            _isAny = me.query('checkbox[itemId=chk_policy_isAny]')[0].getValue();

        _cond = {
            name : _name,
            sip : _src,
            dip : _dest,
            sport : _srcPort,
            dport : _destPort,
            uid : _uid,
            proto : _protocol
        };

        _params = {
            cid : Ext.encode(me._policy_cid),
            condition : Ext.encode(_cond)
        };

        var grid = me.main_grid;
        ///*
        request_helper.xmlrpc_call_Ajax_Post(
            SMC_SERVICE_NAME,
            'findRuleList',
            _params,
            function(response){

                SMC_VIEW.make_rule_find_result_window('검색결과', response, grid).show();

                me.query('textfield[itemId=txt_policy_name]')[0].setRawValue('');
                me.query('textfield[itemId=txt_policy_src]')[0].setRawValue('');
                me.query('textfield[itemId=txt_policy_src_port]')[0].setRawValue('');
                me.query('combobox[itemId=cb_policy_protocol]')[0].setValue('');
                me.query('textfield[itemId=txt_policy_uid]')[0].setRawValue('');
                me.query('textfield[itemId=txt_policy_dest]')[0].setRawValue('');
                me.query('textfield[itemId=txt_policy_dest_port]')[0].setRawValue('');
                me.query('checkbox[itemId=chk_policy_isAny]')[0].setValue(false);

            }
        );

        //*/
    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        var _protocol = me.query('combobox[itemId=cb_policy_protocol]')[0];

        var _stor = Ext.create('Ext.data.Store', {
            fields : ['id', 'text'],
            data : PROTOCOL_LIST
        });

        _protocol.bindStore(_stor);
    }

});