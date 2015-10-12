
Ext.define('SMC.view.pnl_policy_search_rule_filter', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.container.Container',
        'Ext.form.field.ComboBox',
        'Ext.button.Button',
        'Ext.form.field.Checkbox'
    ],

    collapsed: true,
    collapsible: true,
    title: '정책검색',

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
                    margins: '0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            margins: '5',
                            itemId: 'txt_policy_name',
                            width: 220,
                            fieldLabel: '객체명',
                            labelAlign: 'right',
                            labelWidth: 80,
                            tabIndex: 1
                        },
                        {
                            xtype: 'textfield',
                            margins: '5',
                            itemId: 'txt_policy_src',
                            width: 220,
                            fieldLabel: '출발지 주소',
                            labelAlign: 'right',
                            labelWidth: 80,
                            tabIndex: 2
                        },
                        {
                            xtype: 'textfield',
                            margins: '5',
                            itemId: 'txt_policy_src_port',
                            width: 120,
                            fieldLabel: '포트',
                            labelAlign: 'right',
                            labelWidth: 50,
                            tabIndex: 3
                        },
                        {
                            xtype: 'combobox',
                            margins: '5',
                            itemId: 'cb_policy_protocol',
                            width: 182,
                            fieldLabel: '프로토콜',
                            labelAlign: 'right',
                            labelWidth: 60,
                            tabIndex: 4,
                            valueField: 'id'
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            itemId: 'btn_policy_search',
                            width: 75,
                            tabIndex: 9,
                            text: '검색',
                            listeners: {
                                click: {
                                    fn: me.onBtn_policy_searchClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    margins: '0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            margins: '5',
                            itemId: 'txt_policy_uid',
                            width: 220,
                            fieldLabel: '정책ID',
                            labelAlign: 'right',
                            labelWidth: 80,
                            tabIndex: 5
                        },
                        {
                            xtype: 'textfield',
                            margins: '5',
                            itemId: 'txt_policy_dest',
                            width: 220,
                            fieldLabel: '목적지 주소',
                            labelAlign: 'right',
                            labelWidth: 80,
                            tabIndex: 6
                        },
                        {
                            xtype: 'textfield',
                            margins: '5',
                            itemId: 'txt_policy_dest_port',
                            width: 120,
                            fieldLabel: '포트',
                            labelAlign: 'right',
                            labelWidth: 50,
                            tabIndex: 7
                        },
                        {
                            xtype: 'checkboxfield',
                            margins: '5',
                            itemId: 'chk_policy_isAny',
                            tabIndex: 8,
                            boxLabel: 'Any 포함'
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