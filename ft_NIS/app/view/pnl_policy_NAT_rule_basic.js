
Ext.define('SMC.view.pnl_policy_NAT_rule_basic', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    border: false,
    margin: '10,10,10,10',
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
                            itemId: 'chk_policy_NAT_use',
                            fieldLabel: '사용',
                            labelSeparator: ' ',
                            listeners: {
                                change: {
                                    fn: me.onChk_policy_NAT_useChange,
                                    scope: me
                                }
                            }
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
                            xtype: 'combobox',
                            itemId: 'cb_policy_NAT_type',
                            fieldLabel: '종류',
                            labelSeparator: ' ',
                            editable: false,
                            valueField: 'id',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_NAT_typeChange,
                                    scope: me
                                }
                            }
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
                            xtype: 'combobox',
                            itemId: 'cb_policy_NAT_iface',
                            fieldLabel: '인터페이스',
                            labelSeparator: ' ',
                            editable: false,
                            displayField: 'ifaceName',
                            valueField: 'ifaceCid',
                            listeners: {
                                change: {
                                    fn: me.onCb_policy_NAT_ifaceChange,
                                    scope: me
                                },
                                select: {
                                    fn: me.onCb_policy_NAT_ifaceSelect,
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

                                        me.query('combobox[itemId="cb_policy_NAT_iface"]')[0].setValue('Any');
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
                            listeners: {
                                change: {
                                    fn: me.onTxt_policy_NAT_rule_basic_descChange,
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

    onChk_policy_NAT_useChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            _val;

        if(newValue){
            _val = 'on';
        } else {
            _val = 'off';
        }

        me.policyWin.fn_set_policy_rule_obj({key : '@use', val : _val});
    },

    onCb_policy_NAT_typeChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            _val = newValue;

        switch(_val)
        {
            case 'DNAT':
                me.policyWin.query('combobox[itemId="cb_policy_NAT_iface"]')[0].setValue('Any');
                me.policyWin.query('combobox[itemId="cb_policy_NAT_iface"]')[0].disable();
                me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].disable();

                if(me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0])
                {
                    if(me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().getCount()>=1)
                    {
                        if(me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.obj !== "Any" &&
                           me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.cid !== "00000000000000000000000000000000")
                        {
                            me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().removeAll();
                            me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().add({
                                cid: "00000000000000000000000000000000",
                                obj: "Any",
                                kind: "obj_any"
                            });
                        }
                    }
                }

                me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].enable();

                if(me.policyWin.query('panel[itemId="pnl_object"]')[0])
                {
                    if(me.policyWin.query('panel[itemId="pnl_object"]')[0].items.items[0])
                    {
                        if(me.policyWin.query('panel[itemId="pnl_object"]')[0].items.items[0].obj_type === 'xsrc')
                        {
                            me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_src"]')[0].items.items[0].tools[0].handler();
                        }
                    }
                }

                me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].enable();

                break;
            case 'SNAT':
                me.policyWin.query('combobox[itemId="cb_policy_NAT_iface"]')[0].enable();
                me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].enable();
                me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].disable();
                me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].disable();

                if(me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0])
                {
                    if(me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().getCount()>=1)
                    {
                        if(me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.obj !== "Any" &&
                           me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.cid !== "00000000000000000000000000000000")
                        {
                            me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().removeAll();
                            me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().add({
                                cid: "00000000000000000000000000000000",
                                obj: "Any",
                                kind: "obj_any"
                            });
                        }
                    }
                }

                if(me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0])
                {
                    if(me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().getCount()>=1)
                    {
                        if(me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.obj !== "Any" &&
                           me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.cid !== "00000000000000000000000000000000")
                        {
                            me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().removeAll();
                            me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().add({
                                cid: "00000000000000000000000000000000",
                                obj: "Any",
                                kind: "obj_any"
                            });
                        }
                    }
                }

                if(me.policyWin.query('panel[itemId="pnl_object"]')[0])
                {
                    if(me.policyWin.query('panel[itemId="pnl_object"]')[0].items.items[0])
                    {
                        if(me.policyWin.query('panel[itemId="pnl_object"]')[0].items.items[0].obj_type === 'xdest')
                        {
                            me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_src"]')[0].items.items[0].tools[0].handler();
                        }
                    }
                }

                break;
            case 'FNAT':
                me.policyWin.query('combobox[itemId="cb_policy_NAT_iface"]')[0].enable();
                me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].enable();
                me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].enable();
                me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].enable();
                break;
            case 'XNAT':
                me.policyWin.query('combobox[itemId="cb_policy_NAT_iface"]')[0].setValue('Any');
                me.policyWin.query('combobox[itemId="cb_policy_NAT_iface"]')[0].disable();
                me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].disable();
                me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].disable();
                me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].disable();

                if(me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0])
                {
                    if(me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().getCount()>=1)
                    {
                        if(me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.obj !== "Any" &&
                           me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.cid !== "00000000000000000000000000000000")
                        {
                            me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().removeAll();
                            me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].query('panel[itemId="grid_object"]')[0].getStore().add({
                                cid: "00000000000000000000000000000000",
                                obj: "Any",
                                kind: "obj_any"
                            });
                        }
                    }
                }

                if(me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0])
                {
                    if(me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().getCount()>=1)
                    {
                        if(me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.obj !== "Any" &&
                           me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.cid !== "00000000000000000000000000000000")
                        {
                            me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().removeAll();
                            me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].query('panel[itemId="grid_object"]')[0].getStore().add({
                                cid: "00000000000000000000000000000000",
                                obj: "Any",
                                kind: "obj_any"
                            });
                        }
                    }
                }

                if(me.policyWin.query('panel[itemId="pnl_object"]')[0])
                {
                    if(me.policyWin.query('panel[itemId="pnl_object"]')[0].items.items[0])
                    {
                        if(me.policyWin.query('panel[itemId="pnl_object"]')[0].items.items[0].obj_type === 'xsrc' ||
                           me.policyWin.query('panel[itemId="pnl_object"]')[0].items.items[0].obj_type === 'xdest')
                        {
                            me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_src"]')[0].items.items[0].tools[0].handler();
                        }
                    }
                }

                if(me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0])
                {
                    if(me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().getCount()>=1)
                    {
                        if(me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.obj !== "Any" &&
                           me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().data.items[0].data.cid !== "00000000000000000000000000000000")
                        {
                            me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().removeAll();
                            me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].query('panel[itemId="grid_object"]')[0].getStore().add({
                                cid: "00000000000000000000000000000000",
                                obj: "Any",
                                kind: "obj_any"
                            });
                        }
                    }
                }

                break;
            case 'TNAT':
                me.policyWin.query('combobox[itemId="cb_policy_NAT_iface"]')[0].enable();
                me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]')[0].enable();
                me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]')[0].enable();
                me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]')[0].enable();

                break;
        }

        // console.log('newValue - ', newValue);
        // console.log('me.policyWin - ', me.policyWin);
        // console.log('col-1 - ', me.policyWin.query('panel[id="col-1"]')[0]);
        // console.log('grid_policy_src - ', me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_src"]'));
        // console.log('grid_policy_xsrc - ', me.policyWin.query('panel[id="col-1"]')[0].query('panel[itemId="grid_policy_xsrc"]'));
        // console.log('col-2 - ', me.policyWin.query('panel[id="col-2"]')[0]);
        // console.log('grid_policy_dest - ', me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_dest"]'));
        // console.log('grid_policy_xdest - ', me.policyWin.query('panel[id="col-2"]')[0].query('panel[itemId="grid_policy_xdest"]'));
        // console.log('col-3 - ', me.policyWin.query('panel[id="col-3"]')[0]);
        // console.log('grid_policy_service - ', me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="grid_policy_service"]'));
        // console.log('grid_policy_xservice - ', me.policyWin.query('panel[id="col-3"]')[0].query('panel[itemId="gird_policy_xservice"]'));
        // console.log('pnl_object - ', me.policyWin.query('panel[itemId="pnl_object"]'));

        me.policyWin.fn_set_policy_rule_obj({key : '@type', val : _val});

    },

    onCb_policy_NAT_ifaceChange: function(field, newValue, oldValue, eOpts) {
        var me = this,
            _val = newValue;

        //me.policyWin.fn_set_policy_rule_obj({key : 'interface', val : _val});

        if(_val == 'Any')
        {
            me.policyWin.fn_set_policy_rule_obj(
                {
                    key : 'interface',
                    val : {
                        '#text' : DEFAULT.TEXT,
                        '@cid' : DEFAULT.CID,
                        '@otype' : DEFAULT.TEXT
                    }
                });
        }

    },

    onCb_policy_NAT_ifaceSelect: function(combo, records, eOpts) {
        var me = this,
            _val = records[0].raw;

        me.policyWin.fn_set_policy_rule_obj(
            {
                key : 'interface',
                val : {
                    '#text' : _val.ifaceName,
                    '@cid' : _val.ifaceCid,
                    '@otype' : 'ENV_VAR'
                }
            });

    },

    onTxt_policy_NAT_rule_basic_descChange: function(field, newValue, oldValue, eOpts) {
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
        var _svc = SMC_SERVICE_NAME;

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
                         if(typeof _raw[confName] === 'undefined' || _raw[confName]['#text'] === DEFAULT.TEXT){
                             comp.setValue(DEFAULT.TEXT);
                         } else {
                             comp.select(_raw[confName]['#text']);
                             //comp.select(_raw[confName]);
                         }
                     }
                 }
             );
        }

        var _type = me.query('combobox[itemId=cb_policy_NAT_type]')[0];
        var _type_list = Ext.create('Ext.data.Store', {
            fields : ['id', 'text'],
            data : NAT_TYPE_LIST
        });

        _type.bindStore(_type_list);
        _type.setValue(_raw['@type']);

        //인터페이스
        var _iface = me.query('combobox[itemId=cb_policy_NAT_iface]')[0];
        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            'getGroup',
            {gtype : Ext.encode('obj_ip_eth')},
            function(response){
                bindList(response, 'ifaceCid', 'ifaceName', _iface, [], 'interface', true);
            }
        );
        //_iface.setValue(_raw['interface']['#text']);

        var _desc = me.query('textfield[itemId=txt_policy_rule_basic_desc]')[0];
        _desc.setRawValue(_raw['desc']);

        var _use = me.query('checkbox[itemId=chk_policy_NAT_use]')[0];
        _use.setValue(_raw['@use']);

    }

});