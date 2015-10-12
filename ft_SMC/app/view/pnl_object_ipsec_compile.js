
Ext.define('SMC.view.pnl_object_ipsec_compile', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Number',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.CheckColumn',
        'Ext.grid.column.Action'
    ],

    border: false,
    height: 650,
    itemId: 'pnl_object_ipsec_compile',
    minHeight: 550,
    minWidth: 1000,
    width: 1000,
    resizable: true,
    layout: 'fit',
    bodyPadding: 10,
    constrainHeader: true,
    title: 'IPSEC 대상 일괄 편집',
    maximizable: true,
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    itemId: 'ctn_ipsec_gate',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'fieldset',
                            height: 245,
                            itemId: 'fds_ipsec_add',
                            title: 'IPSEC',
                            layout: {
                                type: 'hbox',
                                align: 'stretch',
                                padding: 5
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'ctn_vms_inputbox',
                                    margin: '0, 0, 5, 0',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_id',
                                            margin: 5,
                                            width: 400,
                                            fieldLabel: 'IPSEC 대상',
                                            value: 'Any'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txf_cid',
                                            margin: 5,
                                            width: 400,
                                            fieldLabel: 'CID',
                                            value: '00000000000000000000000000000000'
                                        },
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return true; }

                                                if(value === 'Any'){return true; }

                                                if(!ValidIPAddress(value)){

                                                    if(!ValidIPv6(value)){return false; }
                                                }
                                                return true;
                                            },
                                            itemId: 'txf_ipAddress',
                                            margin: 5,
                                            width: 400,
                                            fieldLabel: 'IP 주소',
                                            value: '0.0.0.0',
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_isakmp_sa',
                                            margin: 5,
                                            width: 400,
                                            fieldLabel: 'ISAKMP SA',
                                            editable: false,
                                            displayField: 'name',
                                            queryMode: 'local',
                                            store: 'st_IPSec_Gate_Isakmp_sa',
                                            valueField: '@cid'
                                        },
                                        {
                                            xtype: 'combobox',
                                            itemId: 'cmb_interface',
                                            margin: 5,
                                            width: 400,
                                            fieldLabel: '인터페이스',
                                            value: 'Any',
                                            editable: false,
                                            displayField: '#text',
                                            store: 'st_IPSec_Gate_Interface',
                                            valueField: '#text'
                                        },
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!CheckNotNull(value)){return true; }

                                                if(!LengthCheckFloat(value,0,255)){return false; }
                                                return true;
                                            },
                                            itemId: 'nfd_group_id',
                                            margin: 5,
                                            width: 400,
                                            fieldLabel: 'Group ID',
                                            value: 0
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margins: '0, 0, 5, 0',
                                    itemId: 'ctn_ipsec_control',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            handler: function(button, e) {
                                                Ext.create('SMC.view.pnl_object_select').loadData('obj_dev');
                                            },
                                            margin: 5,
                                            maxWidth: 100,
                                            width: 100,
                                            text: '장비 선택'
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 5 0',
                                            layout: {
                                                type: 'hbox',
                                                align: 'bottom'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_ipsec_gate"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipsec"]').getStore();

                                                        var ipsec_object = {
                                                            '@num': 0,
                                                            '@prioritytype': 'normal',
                                                            '@use': true,
                                                            '_id': {
                                                                '#text': 'Any',
                                                                '@cid': '00000000000000000000000000000000',
                                                                '@otype': 'Any'
                                                            },
                                                            'group': 0,
                                                            'interface': {
                                                                '#text': 'Any',
                                                                '@cid': '00000000000000000000000000000000',
                                                                '@otype': 'Any'
                                                            },
                                                            'ip': {
                                                                '#text': null,
                                                                '@type': null,
                                                                '@version': null
                                                            },
                                                            'isakmpsa': {
                                                                '#text': null,
                                                                '@cid': null,
                                                                '@otype': null
                                                            }
                                                        };

                                                        ipsec_object['@num'] = Object_Store.getCount() + 1;

                                                        if(me.down('numberfield[itemId="nfd_group_id"]').getValue() !== null)
                                                        {
                                                            if(me.down('numberfield[itemId="nfd_group_id"]').validate())
                                                            {
                                                                ipsec_object.group = me.down('numberfield[itemId="nfd_group_id"]').getValue();
                                                            }
                                                            else
                                                            {
                                                                alertMessage('0 ~ 255 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_group_id"]'));
                                                                return false;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            alertMessage('0 ~ 255 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_group_id"]'));
                                                            return false;
                                                        }

                                                        if(me.down('textfield[itemId="txf_id"]').getValue())
                                                        {
                                                            ipsec_object._id['#text'] = me.down('textfield[itemId="txf_id"]').getValue();
                                                        }
                                                        else
                                                        {
                                                            alertMessage('필수 입력 항목입니다.', me.down('textfield[itemId="txf_id"]'));
                                                            return false;
                                                        }

                                                        if(me.down('textfield[itemId="txf_cid"]').getValue())
                                                        {
                                                            if(me.down('textfield[itemId="txf_cid"]').getValue() === 'Any')
                                                            {
                                                                ipsec_object._id['@cid'] = '00000000000000000000000000000000';
                                                                ipsec_object.uuid = '00000000000000000000000000000000';
                                                            }
                                                            else
                                                            {
                                                                ipsec_object._id['@cid'] = me.down('textfield[itemId="txf_cid"]').getValue();
                                                                ipsec_object.uuid = me.down('textfield[itemId="txf_cid"]').getValue();
                                                            }
                                                        }
                                                        else
                                                        {
                                                            alertMessage('필수 입력 항목입니다.', me.down('textfield[itemId="txf_cid"]'));
                                                            return false;
                                                        }

                                                        ipsec_object['@use'] = true;

                                                        if(me.down('textfield[itemId="txf_ipAddress"]').getValue())
                                                        {
                                                            if(me.down('textfield[itemId="txf_ipAddress"]').validate())
                                                            {
                                                                ipsec_object.ip['#text'] = me.down('textfield[itemId="txf_ipAddress"]').getValue();

                                                                var ip_version_type = ipVersionType(me.down('textfield[itemId="txf_ipAddress"]').getValue());

                                                                if(ip_version_type)
                                                                {
                                                                    ipsec_object.ip['@version'] = ip_version_type.version;
                                                                    ipsec_object.ip['@type'] = ip_version_type.type;
                                                                }
                                                            }
                                                            else
                                                            {
                                                                alertMessage('유효하지 않은 IPAddress입니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                                return false;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            alertMessage('필수 입력 항목입니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                            return false;
                                                        }

                                                        ipsec_object.isakmpsa['#text'] = me.down('combobox[itemId="cmb_isakmp_sa"]').getRawValue();
                                                        ipsec_object.isakmpsa['@cid'] = me.down('combobox[itemId="cmb_isakmp_sa"]').getValue();
                                                        ipsec_object.isakmpsa['@otype'] = 'Any';

                                                        ipsec_object['interface']['#text'] = me.down('combobox[itemId="cmb_interface"]').getRawValue();
                                                        ipsec_object['interface']['@cid'] = '00000000000000000000000000000000';

                                                        if(ipsec_object['interface']['#text'] === 'Any')
                                                        {
                                                            ipsec_object['interface']['@otype'] = 'Any';
                                                        }
                                                        else
                                                        {
                                                            ipsec_object['interface']['@otype'] = 'ENV_VAR';
                                                        }

                                                        Object_Store.add(ipsec_object);
                                                    },
                                                    margin: 5,
                                                    width: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_ipsec_gate"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipsec"]').getStore();
                                                        var select_record = me.down('gridpanel[itemId="gpn_ipsec"]').getSelectionModel().getSelection()[0];

                                                        if(select_record)
                                                        {
                                                            var row =  Object_Store.indexOf(select_record);

                                                            Object_Store.data.each(function(record, idx){

                                                                if(record.data['@num'] === select_record.data['@num'] && idx === row)
                                                                {
                                                                    if(me.down('numberfield[itemId="nfd_group_id"]').getValue() !== null)
                                                                    {
                                                                        if(me.down('numberfield[itemId="nfd_group_id"]').validate())
                                                                        {
                                                                            record.data.group = me.down('numberfield[itemId="nfd_group_id"]').getValue();
                                                                        }
                                                                        else
                                                                        {
                                                                            alertMessage('0 ~ 255 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_group_id"]'));
                                                                            return false;
                                                                        }
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('0 ~ 255 까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_group_id"]'));
                                                                        return false;
                                                                    }

                                                                    if(me.down('textfield[itemId="txf_id"]').getValue())
                                                                    {
                                                                        record.data._id['#text'] = me.down('textfield[itemId="txf_id"]').getValue();
                                                                        record.raw._id['#text'] = me.down('textfield[itemId="txf_id"]').getValue();
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('필수 입력 항목입니다.', me.down('textfield[itemId="txf_id"]'));
                                                                        return false;
                                                                    }

                                                                    if(me.down('textfield[itemId="txf_cid"]').getValue())
                                                                    {
                                                                        record.data._id['@cid'] =  me.down('textfield[itemId="txf_cid"]').getValue();
                                                                        record.raw._id['@cid'] =  me.down('textfield[itemId="txf_cid"]').getValue();
                                                                        record.set('uuid', me.down('textfield[itemId="txf_cid"]').getValue());
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('필수 입력 항목입니다.', me.down('textfield[itemId="txf_cid"]'));
                                                                        return false;
                                                                    }

                                                                    if(me.down('textfield[itemId="txf_ipAddress"]').getValue())
                                                                    {
                                                                        if(me.down('textfield[itemId="txf_ipAddress"]').validate())
                                                                        {
                                                                            record.data.ip['#text'] = me.down('textfield[itemId="txf_ipAddress"]').getValue();
                                                                            record.raw.ip['#text'] = me.down('textfield[itemId="txf_ipAddress"]').getValue();

                                                                            var regexIPv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
                                                                            var regexIPv6 = /^((?=.*::)(?!.*::.+::)(::)?([\dA-F]{1,4}:(:|\b)|){5}|([\dA-F]{1,4}:){6})((([\dA-F]{1,4}((?!\3)::|:\b|$))|(?!\2\3)){2}|(((2[0-4]|1\d|[1-9])?\d|25[0-5])\.?\b){4})$/i;

                                                                            if(me.down('textfield[itemId="txf_ipAddress"]').getValue().match(regexIPv4))
                                                                            {
                                                                                record.data.ip['@version'] = 'v4';
                                                                                record.raw.ip['@version'] = 'v4';
                                                                            }
                                                                            else if(me.down('textfield[itemId="txf_ipAddress"]').getValue().match(regexIPv6))
                                                                            {
                                                                                record.data.ip['@version'] = 'v6';
                                                                                record.raw.ip['@version'] = 'v6';
                                                                            }
                                                                        }
                                                                        else
                                                                        {
                                                                            alertMessage('유효하지 않은 IPAddress입니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                                        }
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('필수 입력 항목입니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                                        return false;
                                                                    }

                                                                    record.data.isakmpsa['#text'] = me.down('combobox[itemId="cmb_isakmp_sa"]').getRawValue();
                                                                    record.raw.isakmpsa['#text'] = me.down('combobox[itemId="cmb_isakmp_sa"]').getRawValue();

                                                                    record.data.isakmpsa['@cid'] = me.down('combobox[itemId="cmb_isakmp_sa"]').getValue();
                                                                    record.raw.isakmpsa['@cid'] = me.down('combobox[itemId="cmb_isakmp_sa"]').getValue();

                                                                    record.data['interface']['#text'] = me.down('combobox[itemId="cmb_interface"]').getRawValue();
                                                                    record.raw['interface']['#text'] = me.down('combobox[itemId="cmb_interface"]').getRawValue();

                                                                    if(record.data['interface']['#text'] === 'Any')
                                                                    {
                                                                        record.data['interface']['@otype'] = 'Any';
                                                                        record.raw['interface']['@otype'] = 'Any';
                                                                    }
                                                                    else
                                                                    {
                                                                        record.data['interface']['@otype'] = 'ENV_VAR';
                                                                        record.raw['interface']['@otype'] = 'ENV_VAR';
                                                                    }

                                                                    record.commit();
                                                                    me.down('gridpanel[itemId="gpn_ipsec"]').getView().refresh();

                                                                    return false;
                                                                }
                                                            });
                                                        }
                                                    },
                                                    margin: 5,
                                                    width: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_ipsec_gate"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_ipsec"]').getSelectionModel().getSelection()[0];

                                                        if(select_record)
                                                        {
                                                            delObject(select_record, '@cid', me.down('gridpanel[itemId="gpn_ipsec"]').getStore());
                                                        }
                                                    },
                                                    margin: 5,
                                                    width: 100,
                                                    text: '삭제'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 1,
                            itemId: 'gpn_ipsec',
                            autoScroll: true,
                            header: false,
                            title: 'My Grid Panel',
                            store: 'st_IPSec_Gate',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 30,
                                    align: 'center'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    width: 123,
                                    defaultWidth: 220,
                                    dataIndex: '_id',
                                    text: 'IPSEC 대상'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['@cid'];
                                    },
                                    width: 270,
                                    dataIndex: '_id',
                                    text: 'CID',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    width: 140,
                                    defaultWidth: 220,
                                    dataIndex: 'ip',
                                    text: 'IP 주소'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    width: 140,
                                    dataIndex: 'isakmpsa',
                                    text: 'ISKAMP SA'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return value['#text'];
                                    },
                                    width: 85,
                                    defaultWidth: 220,
                                    dataIndex: 'interface',
                                    text: '인터페이스'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 85,
                                    defaultWidth: 220,
                                    dataIndex: 'group',
                                    text: 'Group ID'
                                },
                                {
                                    xtype: 'checkcolumn',
                                    width: 50,
                                    dataIndex: '@use',
                                    text: '사용'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 30,
                                    align: 'center',
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                view.up('window[itemId="pnl_object_ipsec_gate"]').down('gridpanel[itemId="gpn_ipsec"]').getStore().removeAt(rowIndex);
                                            },
                                            iconCls: 'ico_grid_row_delete'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                select: {
                                    fn: me.onGpn_ipsecSelect,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            margin: '10 0 0 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipsec_gate"]').saveData();
                                    },
                                    itemId: 'bt_batchsave',
                                    margin: '0 5 0 0',
                                    width: 100,
                                    text: '일괄 적용'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipsec_gate"]').saveData();
                                    },
                                    itemId: 'bt_batchsave1',
                                    margin: '0 5 0 0',
                                    width: 100,
                                    text: '일괄 삭제'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipsec_gate"]').destroy();
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onGpn_ipsecSelect: function(rowmodel, record, index, eOpts) {
        var me = this;

        me.down('textfield[itemId="txf_id"]').setValue(record.data._id['#text']);
        me.down('textfield[itemId="txf_cid"]').setValue(record.data._id['@cid']);
        me.down('textfield[itemId="txf_ipAddress"]').setValue(record.data.ip['#text']);

        var isakmp_combo = me.down('combobox[itemId="cmb_isakmp_sa"]');

        isakmp_combo.getStore().each(function(data, idx){

            if(data.data['@cid'] === record.data.isakmpsa['@cid'])
            {
                isakmp_combo.select(isakmp_combo.getStore().getAt(idx));
                return false;
            }
        });

        var interface_combo = me.down('combobox[itemId="cmb_interface"]');

        interface_combo.getStore().each(function(data, idx){

            if(data.data['#text'] === record.data['interface']['#text'])
            {
                interface_combo.select(interface_combo.getStore().getAt(idx));
                return false;
            }

        });

        me.down('numberfield[itemId="nfd_group_id"]').setValue(record.data.group);
    },

    loadData: function(record) {
        var me = this;

        var ctn_group = me.down('container[itemId="ctn_ipsec_gate"]');
        var ipsec_store = me.down('gridpanel[itemId="gpn_ipsec"]').getStore();

        me.object = record;

        ipsec_store.removeAll();

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        var _svc = 'ftSMC',
            isakmpsa_func = 'getGroup',
            isakmpsa_params = {
                gtype: Ext.encode('obj_ipsec_isakmpsa')
            };

        me.show();

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            isakmpsa_func,
            isakmpsa_params,
            function(response){

                isakmpsa_func = 'getObjectList';
                isakmpsa_params = {
                    g_cid: Ext.encode(response.cid),
                    isRecursive : true
                };

                request_helper.xmlrpc_call_Ajax_Post(
                    _svc,
                    isakmpsa_func,
                    isakmpsa_params,
                    function(response){

                        ctn_group.setLoading(false);

                        me.down('combobox[itemId="cmb_isakmp_sa"]').getStore().loadData(response.result);
                        me.down('combobox[itemId="cmb_isakmp_sa"]').select(me.down('combobox[itemId="cmb_isakmp_sa"]').getStore().getAt(0));

                        Ext.each(record.ipsec, function(data, idx){

                            data._id = data.id;
                            delete data.id;

                            if(data['@use'] === "on")
                                data['@use'] = true;
                            else
                                data['@use'] = false;

                            ipsec_store.add(data);

                        });
                    }
                );
            }
        );
    },

    saveData: function() {
        var me = this;

        var ipsec_store = me.down('gridpanel[itemId="gpn_ipsec"]').getStore();
        var ipsec_array = [];

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('객체명을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
            return false;
        }

        if(me.down('textfield[itemId="txf_objectDesc"]').getValue())
        {
            me.object.desc = me.down('textfield[itemId="txf_objectDesc"]').getValue();
        }
        else
        {
            me.object.desc = null;
        }

        ipsec_store.data.each(function(data, idx){

            if(data.data._id)
            {
                data.data.id = data.data._id;
                delete data.data._id;
            }

            if(data.data['@use'] === true)
                data.data['@use'] = "on";
            else
                data.data['@use'] = "off";

            ipsec_array.push(data.data);
        });

        me.object.ipsec = ipsec_array;

        if(me.object)
        {
            var _svc = 'ftSMC',
                _func,
                _params;

            if(me.isNew)
            {
                _func = 'addObject';
                _params = {
                    obj : Ext.encode(me.object),
                    g_cid : Ext.encode(me.object['@groupcid'])
                };
            }
            else
            {
                _func = 'modObject';
                _params = {
                    obj : Ext.encode(me.object)
                };
            }

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){

                    if(response)
                    {
                        if((_func === 'addObject') && response)
                        {
                            me.object['@cid'] = response;
                        }

                        if(typeof me.closeEvent === 'function'){
                            me.closeEvent();
                        }

                        me.destroy();
                    }
            });
        }
    }

});