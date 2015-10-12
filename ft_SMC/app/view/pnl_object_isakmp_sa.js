
Ext.define('SMC.view.pnl_object_isakmp_sa', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.field.Number',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.grid.column.Action'
    ],

    border: false,
    height: 600,
    itemId: 'pnl_object_isakmp_sa',
    minHeight: 600,
    minWidth: 700,
    padding: '0 20 10 20',
    width: 700,
    resizable: true,
    constrainHeader: true,
    title: 'ISAKMP SA 설정',
    maximizable: true,
    modal: true,

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
                    flex: 1,
                    itemId: 'ctn_isakmp_sa',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            margin: '10 0 10 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!CheckNotNull(value)){return false; }
                                        return true;
                                    },
                                    flex: 0.2,
                                    itemId: 'txf_objectName',
                                    margin: '0 10 0 0 ',
                                    fieldLabel: '객체명',
                                    labelAlign: 'top',
                                    msgTarget: 'none',
                                    enforceMaxLength: true,
                                    maxLength: 31
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top',
                                    enforceMaxLength: true,
                                    maxLength: 127
                                }
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            flex: 1.2,
                            itemId: 'tpn_isakmp',
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    padding: 20,
                                    title: '기본 설정',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'radiogroup',
                                            itemId: 'rdg_ike',
                                            margin: '0 0 10 0',
                                            width: 400,
                                            fieldLabel: 'IKE 인증방식',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_ike_psk',
                                                    margin: '0 50 0 0',
                                                    name: 'ike',
                                                    boxLabel: 'Preshared Key',
                                                    checked: true,
                                                    listeners: {
                                                        change: {
                                                            fn: me.onRd_ike_pskChange,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_ike_cert',
                                                    name: 'ike',
                                                    boxLabel: 'Certificate'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'txf_presharedkey',
                                                    margin: '0 0 10 0',
                                                    fieldLabel: 'Preshared Key',
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    flex: 1,
                                                    hidden: true,
                                                    itemId: 'cmb_certificate',
                                                    margin: '0 0 10 0',
                                                    fieldLabel: 'Certificate',
                                                    value: 'FSCenter',
                                                    editable: false,
                                                    displayField: 'certificate',
                                                    queryMode: 'local',
                                                    store: 'st_ISAKMP_Certificate',
                                                    valueField: 'certificate'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.6
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'chk_nat',
                                            margin: '0 0 10 105',
                                            boxLabel: 'NAT 탐색 사용'
                                        },
                                        {
                                            xtype: 'radiogroup',
                                            itemId: 'rdg_mode',
                                            margin: '0 0 10 0',
                                            fieldLabel: '수행시점',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_mode_booting',
                                                    margin: '0 100 0 0',
                                                    labelWidth: 30,
                                                    name: 'mode',
                                                    boxLabel: '부팅 시',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    itemId: 'rd_mode_traffic',
                                                    labelWidth: 80,
                                                    name: 'mode',
                                                    boxLabel: '트래픽 발생 시'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    margin: '0 70 0 0',
                                                    text: 'DPD :'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return true; }

                                                        if(!LengthCheckFloat(value,0,255)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_dpd_period',
                                                    margin: '0 5 0 0',
                                                    maxWidth: 150,
                                                    msgTarget: 'none'
                                                },
                                                {
                                                    xtype: 'label',
                                                    margin: '0 10 0 10',
                                                    text: '초 간격으로 체크, 연속'
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    validator: function(value) {
                                                        if(!CheckNotNull(value)){return true; }

                                                        if(!LengthCheckFloat(value,0,255)){return false; }
                                                        return true;
                                                    },
                                                    flex: 1,
                                                    itemId: 'nfd_dpd_fail',
                                                    margin: '0 5 0 0',
                                                    maxWidth: 150,
                                                    width: 100
                                                },
                                                {
                                                    xtype: 'label',
                                                    text: '회 실패시 타임아웃'
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 1
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    padding: 20,
                                    title: 'ISAKMP SA',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cmb_mode',
                                                    margin: '0 0 10 0',
                                                    fieldLabel: 'Mode',
                                                    editable: false,
                                                    displayField: 'mode',
                                                    queryMode: 'local',
                                                    store: 'st_ISAKMP_Mode',
                                                    valueField: 'mode'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cmb_encryption',
                                                    margin: '0 0 10 0',
                                                    fieldLabel: '암호 알고리즘',
                                                    editable: false,
                                                    displayField: 'encryption',
                                                    queryMode: 'local',
                                                    store: 'st_ISAKMP_Encryption',
                                                    valueField: 'encryption'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cmb_auth',
                                                    margin: '0 0 10 0',
                                                    fieldLabel: '해쉬 알고리즘',
                                                    editable: false,
                                                    displayField: 'auth',
                                                    queryMode: 'local',
                                                    store: 'st_ISAKMP_Auth',
                                                    valueField: 'auth'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cmb_group',
                                                    margin: '0 0 10 0',
                                                    fieldLabel: '키 교환그룹',
                                                    editable: false,
                                                    displayField: 'group',
                                                    queryMode: 'local',
                                                    store: 'st_IPSec_KeyGroup',
                                                    valueField: 'group'
                                                },
                                                {
                                                    xtype: 'combobox',
                                                    itemId: 'cmb_time',
                                                    fieldLabel: 'Life Time',
                                                    editable: false,
                                                    displayField: 'time',
                                                    queryMode: 'local',
                                                    store: 'st_ISAKMP_Time',
                                                    valueField: 'time'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    title: 'IPSec SA',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch',
                                        padding: 20
                                    },
                                    items: [
                                        {
                                            xtype: 'treepanel',
                                            flex: 1,
                                            itemId: 'trpn_ipSec',
                                            autoScroll: true,
                                            useArrows: true,
                                            viewConfig: {
                                                itemId: 'trv_ipSec'
                                            },
                                            listeners: {
                                                itemdblclick: {
                                                    fn: me.onTrpn_ipSecItemDblClick,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            margin: '0 0 0 10',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 1,
                                                    itemId: 'gpn_ipsec_grid',
                                                    autoScroll: true,
                                                    title: '',
                                                    store: 'st_ISAKMP_IPSec',
                                                    columns: [
                                                        {
                                                            xtype: 'rownumberer',
                                                            width: 30,
                                                            align: 'center'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                                metaData.tdCls = 'ico_' + record.data.kind + '_16';
                                                                return value;
                                                            },
                                                            width: 288,
                                                            dataIndex: 'name',
                                                            text: '선택된 객체 목록',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            width: 30,
                                                            align: 'center',
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                        view.up('window[itemId="pnl_object_isakmp_sa"]').down('gridpanel[itemId="gpn_ipsec_grid"]').getStore().removeAt(rowIndex);
                                                                    },
                                                                    iconCls: 'ico_grid_row_delete'
                                                                }
                                                            ]
                                                        }
                                                    ],
                                                    listeners: {
                                                        itemdblclick: {
                                                            fn: me.onGpn_ipsec_gridItemDblClick,
                                                            scope: me
                                                        }
                                                    }
                                                },
                                                {
                                                    xtype: 'container',
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('window[itemId="pnl_object_isakmp_sa"]');

                                                                var object_tree = me.down('treepanel[itemId="trpn_ipSec"]');
                                                                var ipsec_store = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getStore();

                                                                if(object_tree.getSelectionModel().getSelection()[0])
                                                                {
                                                                    console.log(object_tree.getSelectionModel().getSelection()[0].raw);

                                                                    if(object_tree.getSelectionModel().getSelection()[0].raw._kind === "obj_ipsec_ipsecsa" ||
                                                                    object_tree.getSelectionModel().getSelection()[0].raw.gtype ==="obj_ipsec_ipsecsa")
                                                                    {
                                                                        return false;
                                                                    }

                                                                    if(!Object_DuplicateCheck(object_tree.getSelectionModel().getSelection()[0].raw.cid, '@cid', ipsec_store))
                                                                    {
                                                                        alertMessage('동일한 오브젝트를 사용하고 있습니다.');
                                                                        return false;
                                                                    }

                                                                    var _svc = 'ftSMC',
                                                                        _func = 'getObject',
                                                                        _params = {
                                                                            cid : Ext.encode(object_tree.getSelectionModel().getSelection()[0].raw.cid)
                                                                        };

                                                                    request_helper.xmlrpc_call_Ajax_Post(
                                                                    _svc,
                                                                    _func,
                                                                    _params,
                                                                    function(response){

                                                                        if(response.member)
                                                                        {
                                                                            if(response.member.length > 0)
                                                                            {
                                                                                alertMessage('그룹 오브젝트를 포함한 그룹 오브젝트는 추가할 수 없습니다.');
                                                                                return false;
                                                                            }
                                                                        }

                                                                        ipsec_store.add({
                                                                            'name': response.name,
                                                                            '@cid': response['@cid'],
                                                                            'kind': response._kind
                                                                        });
                                                                    }
                                                                    );
                                                                }
                                                            },
                                                            flex: 1,
                                                            margin: 1,
                                                            maxWidth: 100,
                                                            text: '추가'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('window[itemId="pnl_object_isakmp_sa"]');

                                                                var Object_Store = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getStore();
                                                                var select_tree = me.down('treepanel[itemId="trpn_ipSec"]').getSelectionModel().getSelection()[0];
                                                                var select_record = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getSelectionModel().getSelection()[0];
                                                                var row =  Object_Store.indexOf(select_record);

                                                                if(select_record && select_tree)
                                                                {
                                                                    if(select_tree.raw._kind === "obj_ipsec_ipsecsa" ||
                                                                    select_tree.raw.gtype ==="obj_ipsec_ipsecsa")
                                                                    {
                                                                        return false;
                                                                    }


                                                                    Object_Store.each(function(record,idx){

                                                                        if(record.data['@cid'] === select_record.data['@cid'] && idx === row)
                                                                        {
                                                                            if(!Object_DuplicateCheck(select_tree.raw.cid, '@cid', Object_Store))
                                                                            {
                                                                                alertMessage('동일한 오브젝트를 사용하고 있습니다.');
                                                                                return false;
                                                                            }

                                                                            var _svc = 'ftSMC',
                                                                                _func = 'getObject',
                                                                                _params = {
                                                                                    cid : Ext.encode(select_tree.raw.cid)
                                                                                };

                                                                            request_helper.xmlrpc_call_Ajax_Post(
                                                                            _svc,
                                                                            _func,
                                                                            _params,
                                                                            function(response){

                                                                                if(response.member)
                                                                                {
                                                                                    if(response.member.length > 0)
                                                                                    {
                                                                                        alertMessage('그룹 오브젝트를 포함한 그룹 오브젝트는 추가할 수 없습니다.');
                                                                                        return false;
                                                                                    }
                                                                                }

                                                                                record.set('name', response.name);
                                                                                record.set('@cid', response['@cid']);
                                                                                record.set('kind', response._kind);

                                                                                record.commit();

                                                                                me.down('gridpanel[itemId="gpn_ipsec_grid"]').getView().refresh();
                                                                            }
                                                                            );

                                                                            return false;
                                                                        }

                                                                    });
                                                                }

                                                            },
                                                            flex: 1,
                                                            margin: '1 5 1 5',
                                                            maxWidth: 100,
                                                            text: '수정'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('window[itemId="pnl_object_isakmp_sa"]');

                                                                var select_record = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getSelectionModel().getSelection()[0];
                                                                var Object_Store = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getStore();

                                                                delObject(select_record, '@cid', Object_Store);
                                                            },
                                                            flex: 1,
                                                            margin: 1,
                                                            maxWidth: 100,
                                                            text: '삭제'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    padding: 10,
                                    title: 'ETC',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            flex: 0.1,
                                            itemId: 'ck_use',
                                            fieldLabel: '수동설정',
                                            labelWidth: 135,
                                            boxLabel: '타사 장비연동',
                                            listeners: {
                                                change: {
                                                    fn: me.onCk_useChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            hidden: true,
                                            itemId: 'ctn_group',
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 0.1,
                                                    margin: '0 0 5 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                var retValue;

                                                                retValue = CheckNotNull(value);

                                                                if(!retValue){return true; }

                                                                if(value.match(','))
                                                                {
                                                                    var val_array = value.split(",");

                                                                    for(var i=0; i<val_array.length; i++)
                                                                    {
                                                                        retValue = validIPForm(val_array[i], 'v4');

                                                                        if(!retValue)
                                                                        {
                                                                            if(val_array[i].match('/'))
                                                                            {
                                                                                retValue = ValidIPv6(val_array[i].split('/')[0]);
                                                                            }
                                                                            else
                                                                            {
                                                                                retValue = ValidIPv6(val_array[i]);
                                                                            }
                                                                        }

                                                                        if(!retValue){ return false; }

                                                                        if(val_array[i].match("-")){
                                                                            var ip_arr = val_array[i].split('-');
                                                                            var first_arr = ip_arr[0].split('.');
                                                                            var last_arr = ip_arr[1].split('.');

                                                                            if(parseInt(first_arr[0]) > parseInt(last_arr[0])){return false;}
                                                                            else if(parseInt(first_arr[0]) === parseInt(last_arr[0]) && parseInt(first_arr[1]) > parseInt(last_arr[1])){return false;}
                                                                            else if(parseInt(first_arr[1]) === parseInt(last_arr[1]) && parseInt(first_arr[2]) > parseInt(last_arr[2])){return false;}
                                                                            else if(parseInt(first_arr[2]) === parseInt(last_arr[2]) && parseInt(first_arr[3]) > parseInt(last_arr[3])){return false;}
                                                                        }
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    retValue = validIPForm(value, 'v4');

                                                                    if(!retValue)
                                                                    {
                                                                        if(value.match('/'))
                                                                        {
                                                                            retValue = ValidIPv6(value.split('/')[0]);
                                                                        }
                                                                        else
                                                                        {
                                                                            retValue = ValidIPv6(value);
                                                                        }
                                                                    }

                                                                    if(!retValue){ return false; }

                                                                    if(value.match("-")){
                                                                        var ip_arr = value.split('-');
                                                                        var first_arr = ip_arr[0].split('.');
                                                                        var last_arr = ip_arr[1].split('.');

                                                                        if(parseInt(first_arr[0]) > parseInt(last_arr[0])){return false;}
                                                                        else if(parseInt(first_arr[0]) === parseInt(last_arr[0]) && parseInt(first_arr[1]) > parseInt(last_arr[1])){return false;}
                                                                        else if(parseInt(first_arr[1]) === parseInt(last_arr[1]) && parseInt(first_arr[2]) > parseInt(last_arr[2])){return false;}
                                                                        else if(parseInt(first_arr[2]) === parseInt(last_arr[2]) && parseInt(first_arr[3]) > parseInt(last_arr[3])){return false;}
                                                                    }
                                                                }

                                                                return true;
                                                            },
                                                            flex: 1,
                                                            itemId: 'txf_ipsec_host',
                                                            margin: '0 10 0 0',
                                                            fieldLabel: 'Remote IPSEC Host',
                                                            labelWidth: 135,
                                                            msgTarget: 'none'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('window[itemId="pnl_object_isakmp_sa"]');

                                                                var Object_Store = me.down('gridpanel[itemId="gpn_host_grid"]').getStore();
                                                                var ip = me.down('textfield[itemId="txf_ipsec_host"]').getValue();

                                                                if(ip)
                                                                {
                                                                    if(me.down('textfield[itemId="txf_ipsec_host"]').validate())
                                                                    {
                                                                        var obj_version_type = ipVersionType(me.down('textfield[itemId="txf_ipsec_host"]').getValue());
                                                                        var version = obj_version_type.version;
                                                                        var type = obj_version_type.type;

                                                                        if(!Object_DuplicateCheck(ip, '#text', Object_Store))
                                                                        {
                                                                            alertMessage('같은 IP주소가 이미 있습니다.', me.down('textfield[itemId="txf_ipsec_host"]'));
                                                                            return false;
                                                                        }

                                                                        Object_Store.add({
                                                                            '#text': ip,
                                                                            "@version": version,
                                                                            "@type": type
                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        alertMessage('IP주소가 올바르지 않습니다.', me.down('textfield[itemId="txf_ipsec_host"]'));
                                                                        return false;
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    alertMessage('IP주소를 입력하시오.', me.down('textfield[itemId="txf_ipsec_host"]'));
                                                                    return false;
                                                                }
                                                            },
                                                            flex: 0.2,
                                                            margin: '1 5 1 1 ',
                                                            maxWidth: 100,
                                                            text: '추가'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            handler: function(button, e) {
                                                                var me = button.up('window[itemId="pnl_object_isakmp_sa"]');

                                                                var select_record = me.down('gridpanel[itemId="gpn_host_grid"]').getSelectionModel().getSelection()[0];
                                                                var Object_Store = me.down('gridpanel[itemId="gpn_host_grid"]').getStore();

                                                                delObject(select_record, '#text', Object_Store);
                                                            },
                                                            flex: 0.2,
                                                            margin: 1,
                                                            maxWidth: 100,
                                                            text: '삭제'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 0.4,
                                                    itemId: 'gpn_host_grid',
                                                    margin: '0 0 0 140',
                                                    width: 630,
                                                    header: false,
                                                    title: 'My Grid Panel',
                                                    store: 'st_IPSec_Host',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 75,
                                                            dataIndex: '@version',
                                                            text: 'IP 버전'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 95,
                                                            dataIndex: '@type',
                                                            text: 'IP 타입'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            width: 314,
                                                            dataIndex: '#text',
                                                            text: 'IP 주소',
                                                            flex: 1
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.1,
                                                    margin: '5 0 0 0',
                                                    width: 100,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_id_change',
                                                            fieldLabel: 'ID 교환 Type 변경',
                                                            labelWidth: 135,
                                                            boxLabel: '사용',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCheckboxfieldChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'combobox',
                                                            flex: 1,
                                                            hidden: true,
                                                            itemId: 'cmb_id_change',
                                                            margin: '0 20 0 20',
                                                            editable: false,
                                                            displayField: 'type',
                                                            queryMode: 'local',
                                                            store: 'st_ISAKMP_IDType',
                                                            valueField: 'type'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(!CheckNotNull(value)){return false; }
                                                                return true;
                                                            },
                                                            flex: 1,
                                                            hidden: true,
                                                            itemId: 'txf_id_change',
                                                            fieldLabel: 'ID',
                                                            labelWidth: 20,
                                                            msgTarget: 'none'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.1,
                                                    margin: '5 0 0 0',
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'middle'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            itemId: 'ck_xauth',
                                                            fieldLabel: 'XAuth',
                                                            labelWidth: 135,
                                                            boxLabel: '사용',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onCheckboxfieldChange1,
                                                                    scope: me
                                                                }
                                                            }
                                                        },
                                                        {
                                                            xtype: 'radiogroup',
                                                            hidden: true,
                                                            itemId: 'rdg_xauth_type',
                                                            margin: '0 0 0 20',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_xauth_client',
                                                                    margin: '0 40 0 0',
                                                                    name: 'type',
                                                                    boxLabel: 'Client',
                                                                    checked: true,
                                                                    listeners: {
                                                                        change: {
                                                                            fn: me.onRd_xauth_clientChange,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    itemId: 'rd_xauth_server',
                                                                    name: 'type',
                                                                    boxLabel: 'Server'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.1,
                                                    hidden: true,
                                                    itemId: 'ctn_xauth',
                                                    margin: '5 0 0 140',
                                                    padding: '0 0 10 0',
                                                    layout: 'hbox',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(!CheckNotNull(value)){return false; }
                                                                return true;
                                                            },
                                                            flex: 1,
                                                            itemId: 'txf_xauth_id',
                                                            margin: '0 20 0 0',
                                                            fieldLabel: 'ID',
                                                            labelWidth: 65,
                                                            msgTarget: 'none'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            validator: function(value) {
                                                                if(!CheckNotNull(value)){return false; }
                                                                return true;
                                                            },
                                                            flex: 1,
                                                            itemId: 'txf_xauth_password',
                                                            fieldLabel: 'Password',
                                                            labelWidth: 65,
                                                            msgTarget: 'none',
                                                            inputType: 'password'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    flex: 0.1,
                                                    hidden: true,
                                                    itemId: 'rdg_xauth_location',
                                                    margin: '5 0 0 140',
                                                    fieldLabel: '인증',
                                                    labelWidth: 65,
                                                    layout: {
                                                        type: 'hbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            itemId: 'rd_xauth_local',
                                                            margin: '0 40 0 0',
                                                            name: 'location',
                                                            boxLabel: 'Local',
                                                            checked: true
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            itemId: 'rd_xauth_remote',
                                                            name: 'location',
                                                            boxLabel: 'Remote Radius'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    flex: 0.1,
                                                    itemId: 'ctn_xauth_false',
                                                    margin: '5 0 0 0 '
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
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
                                        button.up('window[itemId="pnl_object_isakmp_sa"]').saveData();
                                    },
                                    itemId: 'btn_save',
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_isakmp_sa"]').destroy();
                                    },
                                    margin: 1,
                                    width: 100,
                                    text: '취소'
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_object_isakmp_saAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_isakmp_saBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onRd_ike_pskChange: function(field, newValue, oldValue, eOpts) {
        var me = field.up('window[itemId="pnl_object_isakmp_sa"]');

        if(newValue === true)
        {
            me.down('textfield[itemId="txf_presharedkey"]').show();
            me.down('combobox[itemId="cmb_certificate"]').hide();
        }
        else
        {
            me.down('textfield[itemId="txf_presharedkey"]').hide();
            me.down('combobox[itemId="cmb_certificate"]').show();
        }
    },

    onTrpn_ipSecItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var ipsec_store = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getStore();

        if(record.raw._kind === "obj_ipsec_ipsecsa" || record.raw.gtype ==="obj_ipsec_ipsecsa")
        {
            return false;
        }

        if(!Object_DuplicateCheck(record.raw.cid, '@cid', ipsec_store))
        {
            alertMessage('동일한 오브젝트를 사용하고 있습니다.');
            return false;
        }

        var _svc = 'ftSMC',
            _func = 'getObject',
            _params = {
                cid : Ext.encode(record.raw.cid)
            };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response.member)
                {
                    if(response.member.length > 0)
                    {
                        alertMessage('그룹 오브젝트를 포함한 그룹 오브젝트는 추가할 수 없습니다.');
                        return false;
                    }
                }

                ipsec_store.add({
                    'name': response.name,
                    '@cid': response['@cid'],
                    'kind': response._kind
                });
            }
        );
    },

    onGpn_ipsec_gridItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var me = this;

        var select_record = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getSelectionModel().getSelection()[0];
        var Object_Store = me.down('gridpanel[itemId="gpn_ipsec_grid"]').getStore();

        delObject(select_record, '@cid', Object_Store);
    },

    onCk_useChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === true)
        {
            field.up('window[itemId="pnl_object_isakmp_sa"]').down('container[itemId="ctn_group"]').show();
        }
        else
        {
            field.up('window[itemId="pnl_object_isakmp_sa"]').down('container[itemId="ctn_group"]').hide();
        }
    },

    onCheckboxfieldChange: function(field, newValue, oldValue, eOpts) {
        var me = field.up('window[itemId="pnl_object_isakmp_sa"]');

        if(newValue === true)
        {
            me.down('combobox[itemId="cmb_id_change"]').show();
            me.down('textfield[itemId="txf_id_change"]').show();
            me.down('combobox[itemId="cmb_id_change"]').select(Ext.getStore('st_ISAKMP_IDType').getAt(0));
        }
        else
        {
            me.down('combobox[itemId="cmb_id_change"]').hide();
            me.down('textfield[itemId="txf_id_change"]').hide();
        }
    },

    onCheckboxfieldChange1: function(field, newValue, oldValue, eOpts) {
        var me = field.up('window[itemId="pnl_object_isakmp_sa"]');

        if(newValue === true)
        {
            me.down('radiogroup[itemId="rdg_xauth_type"]').show();
            if(me.down('radiogroup[itemId="rdg_xauth_type"]').getChecked()[0].itemId === 'rd_xauth_client')
            {
                me.down('container[itemId="ctn_xauth"]').show();
                me.down('radiogroup[itemId="rdg_xauth_location"]').hide();
            }
            else
            {
                me.down('container[itemId="ctn_xauth"]').hide();
                me.down('radiogroup[itemId="rdg_xauth_location"]').show();
            }
            me.down('container[itemId="ctn_xauth_false"]').hide();
        }
        else
        {
            me.down('radiogroup[itemId="rdg_xauth_type"]').hide();
            me.down('radiogroup[itemId="rdg_xauth_location"]').hide();
            me.down('container[itemId="ctn_xauth"]').hide();
            me.down('container[itemId="ctn_xauth_false"]').show();
        }
    },

    onRd_xauth_clientChange: function(field, newValue, oldValue, eOpts) {
        var me = field.up('window[itemId="pnl_object_isakmp_sa"]');

        if(newValue === true)
        {
            me.down('container[itemId="ctn_xauth"]').show();
            me.down('radiogroup[itemId="rdg_xauth_location"]').hide();
        }
        else
        {
            me.down('container[itemId="ctn_xauth"]').hide();
            me.down('radiogroup[itemId="rdg_xauth_location"]').show();
        }
    },

    onPnl_object_isakmp_saAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                if(!component.object._locked){
                    component.saveData();
                }
            }
        });
    },

    onPnl_object_isakmp_saBeforeDestroy: function(component, eOpts) {
        if(!component.isNew)
        {
            var _svc = 'ftSMC',
                _func = 'clrObject',
                _params = {
                    cid : Ext.encode(component.object['@cid'])
                };

            request_helper.xmlrpc_call_Ajax_Post(
                _svc,
                _func,
                _params,
                function(response){
                }
            );
        }
    },

    loadData: function(record) {
        var me = this;

        var ctn_group = me.down('container[itemId="ctn_isakmp_sa"]');

        Ext.getStore('st_ISAKMP_IPSec').removeAll();
        Ext.getStore('st_IPSec_Host').removeAll();

        me.object = record;

        if(record['@cid'] === record['@groupcid'])
        {
            me.down('textfield[itemId="txf_objectName"]').setReadOnly(true);
        }

        var _svc = 'ftSMC',
        _func = 'getGroup';
        _params = {
            gtype : Ext.encode('obj_ipsec_ipsecsa')
        };

        me.show();

        if(record._locked){

            Ext.Msg.show({

                title : 'WeGuardia™ SMC 2.0',
                msg : '해당 객체는 ' + record._locked + '에서</br> 사용중인 객체이므로 수정할 수 없습니다.',
                buttons : Ext.Msg.OK,
                alwaysOnTop : true,
                icon : Ext.Msg.INFO

            });

            me.setTitle(me.title + ' [읽기 전용]');

            me.down('button[itemId="btn_save"]').disable();
        }

        ctn_group.setLoading(true);

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(response){

                if(response)
                {
                    _func = 'getObjectList';
                    _params = {
                        g_cid : Ext.encode(response.cid),
                        isRecursive:true
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        _params,
                        function(response_data){

                            console.log('response_data - ', response_data);

                            ctn_group.setLoading(false);

                            me.make_ipsec_tree(response, response_data.result);

                            me.down('treepanel[itemId="trpn_ipSec"]').setRootNode(response);
                            me.down('treepanel[itemId="trpn_ipSec"]').getView().refresh();

                            me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
                            me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

                            if(record.setting['@ike_auth'] === "psk")
                            {
                                me.down('radiogroup[itemId="rdg_ike"]').items.items[0].setValue(true);
                                me.down('textfield[itemId="txf_presharedkey"]').setValue(record.presharedkey);
                                me.down('combobox[itemId="cmb_certificate"]').hide();
                            }
                            else if(record.setting['@ike_auth'] === "cert")
                            {
                                me.down('radiogroup[itemId="rdg_ike"]').items.items[1].setValue(true);

                                Ext.getStore('st_ISAKMP_Certificate').each(function(data, idx){

                                    if(data.data.certificate === record.certificate)
                                    {
                                        me.down('combobox[itemId="cmb_certificate"]').select(Ext.getStore('st_ISAKMP_Certificate').getAt(idx));
                                        return false;
                                    }
                                });

                                me.down('textfield[itemId="txf_presharedkey"]').hide();
                            }
                            else
                            {
                                if(record.certificate)
                                {
                                    me.down('radiogroup[itemId="rdg_ike"]').items.items[0].setValue(true);
                                    me.down('textfield[itemId="txf_presharedkey"]').setValue(record.presharedkey);
                                    me.down('combobox[itemId="cmb_certificate"]').hide();
                                }
                                else if(record.presharedkey)
                                {
                                    me.down('radiogroup[itemId="rdg_ike"]').items.items[1].setValue(true);

                                    Ext.getStore('st_ISAKMP_Certificate').each(function(data, idx){

                                        if(data.data.certificate === record.certificate)
                                        {
                                            me.down('combobox[itemId="cmb_certificate"]').select(Ext.getStore('st_ISAKMP_Certificate').getAt(idx));
                                            return false;
                                        }
                                    });

                                    me.down('textfield[itemId="txf_presharedkey"]').hide();
                                }
                            }

                            if(record.setting['@chk_nat'] === "on")
                            {
                                me.down('checkbox[itemId="chk_nat"]').setValue(true);
                            }

                            if(record.setting['@mode'] === "Booting")
                            {
                                me.down('radiogroup[itemId="rdg_mode"]').items.items[0].setValue(true);
                            }
                            else if(record.setting['@mode'] === "Traffic")
                            {
                                me.down('radiogroup[itemId="rdg_mode"]').items.items[1].setValue(true);
                            }

                            me.down('numberfield[itemId="nfd_dpd_period"]').setValue(record.dpd.period);
                            me.down('numberfield[itemId="nfd_dpd_fail"]').setValue(record.dpd.fail);

                            Ext.getStore('st_ISAKMP_Mode').each(function(data, idx){

                                if(data.data.mode === record.phase1['@mode'])
                                {
                                    me.down('combobox[itemId="cmb_mode"]').select(Ext.getStore('st_ISAKMP_Mode').getAt(idx));
                                    return false;
                                }
                            });

                            Ext.getStore('st_ISAKMP_Encryption').each(function(data, idx){

                                if(data.data.encryption === record.phase1['@encryption'])
                                {
                                    me.down('combobox[itemId="cmb_encryption"]').select(Ext.getStore('st_ISAKMP_Encryption').getAt(idx));
                                    return false;
                                }
                            });

                            Ext.getStore('st_ISAKMP_Auth').each(function(data, idx){

                                if(data.data.auth === record.phase1['@auth'])
                                {
                                    me.down('combobox[itemId="cmb_auth"]').select(Ext.getStore('st_ISAKMP_Auth').getAt(idx));
                                    return false;
                                }
                            });

                            Ext.getStore('st_IPSec_KeyGroup').each(function(data, idx){

                                if(data.data.group === record.phase1['@group'])
                                {
                                    me.down('combobox[itemId="cmb_group"]').select(Ext.getStore('st_IPSec_KeyGroup').getAt(idx));
                                    return false;
                                }
                            });

                            Ext.getStore('st_ISAKMP_Time').each(function(data, idx){

                                if(data.data.time === record.phase1['@time'])
                                {
                                    me.down('combobox[itemId="cmb_time"]').select(Ext.getStore('st_ISAKMP_Time').getAt(idx));
                                    return false;
                                }
                            });

                            if(record.passive['@chk_use'] === "on")
                            {
                                me.down('checkbox[itemId="ck_use"]').setValue(true);
                                me.down('container[itemId="ctn_group"]').show();
                            }
                            else if(record.passive['@chk_use'] === "off")
                            {
                                me.down('checkbox[itemId="ck_use"]').setValue(false);
                                me.down('container[itemId="ctn_group"]').hide();
                            }

                            if(record.host['@count'] > 0)
                            {
                                Ext.each(record.host.ip, function(data, idx){
                                    Ext.getStore('st_IPSec_Host').add(data);
                                });
                            }

                            if(record.id_change['@chk_use'] === "on")
                            {
                                me.down('checkbox[itemId="ck_id_change"]').setValue(true);
                                me.down('combobox[itemId="cmb_id_change"]').show();

                                if(record.id_change.id)
                                {
                                    Ext.getStore('st_ISAKMP_IDType').each(function(data, idx){

                                        if(data.data.type === record.id_change.id['@type'])
                                        {
                                            me.down('combobox[itemId="cmb_id_change"]').select(Ext.getStore('st_ISAKMP_IDType').getAt(idx));
                                            return false;
                                        }
                                    });

                                    me.down('textfield[itemId="txf_id_change"]').show();
                                    me.down('textfield[itemId="txf_id_change"]').setValue(record.id_change.id['#text']);
                                }
                            }
                            else if(record.id_change['@chk_use'] === "off")
                            {

                                me.down('checkbox[itemId="ck_id_change"]').setValue(false);
                                me.down('combobox[itemId="cmb_id_change"]').hide();
                                me.down('textfield[itemId="txf_id_change"]').hide();
                                if(record.id_change.id)
                                    me.down('textfield[itemId="txf_id_change"]').setValue(record.id_change.id['#text']);
                            }

                            if(record.xauth['@chk_use'] === "on")
                            {
                                me.down('checkbox[itemId="ck_xauth"]').setValue(true);
                                me.down('radiogroup[itemId="rdg_xauth_type"]').show();

                                if(record.xauth['@type'] === "client")
                                {
                                    me.down('radiogroup[itemId="rdg_xauth_type"]').items.items[0].setValue(true);
                                    me.down('container[itemId="ctn_xauth"]').show();
                                    me.down('radiogroup[itemId="rdg_xauth_location"]').hide();
                                    me.down('textfield[itemId="txf_xauth_id"]').setValue(record.xauth.id);
                                    me.down('textfield[itemId="txf_xauth_password"]').setValue(record.xauth.password);
                                }
                                else if(record.xauth['@type'] === "server")
                                {
                                    me.down('radiogroup[itemId="rdg_xauth_type"]').items.items[1].setValue(true);
                                    me.down('container[itemId="ctn_xauth"]').hide();
                                    me.down('radiogroup[itemId="rdg_xauth_location"]').show();

                                    if(record.xauth['@location'] === "local")
                                    {
                                        me.down('radiogroup[itemId="rdg_xauth_location"]').items.items[0].setValue(true);
                                    }
                                    else if(record.xauth['@location'] === "remote")
                                    {
                                        me.down('radiogroup[itemId="rdg_xauth_location"]').items.items[1].setValue(true);
                                    }
                                }

                                me.down('container[itemId="ctn_xauth_false"]').hide();
                            }
                            else if(record.xauth['@chk_use'] === "off")
                            {
                                me.down('checkbox[itemId="ck_xauth"]').setValue(false);
                                me.down('radiogroup[itemId="rdg_xauth_type"]').hide();
                                me.down('radiogroup[itemId="rdg_xauth_location"]').hide();
                                me.down('container[itemId="ctn_xauth"]').hide();
                                me.down('container[itemId="ctn_xauth_false"]').show();
                            }

                            _func = 'getObject';

                            if(record.ipsecsa.member.length > 0)
                            {
                                Ext.each(record.ipsecsa.member, function(data,idx){

                                    _params = {
                                        cid : Ext.encode(data)
                                    };

                                    request_helper.xmlrpc_call_Ajax_Post(
                                        _svc,
                                        _func,
                                        _params,
                                        function(response){

                                            Ext.getStore('st_ISAKMP_IPSec').add({
                                                'name': response.name,
                                                '@cid': response['@cid'],
                                                'kind': response._kind
                                            });

                                        });
                                });
                            }
                        }
                    );
                }
            }
        );
    },

    saveData: function() {
        var me = this;

        if(me.down('textfield[itemId="txf_objectName"]').validate())
        {
            me.object.name = me.down('textfield[itemId="txf_objectName"]').getValue();
        }
        else
        {
            alertMessage('오브젝트 이름을 입력하시오.', me.down('textfield[itemId="txf_objectName"]'));
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

        if(me.down('radiogroup[itemId="rdg_ike"]').getChecked()[0].itemId === "rd_ike_psk")
        {
            me.object.setting['@ike_auth'] = "psk";

            if(me.down('textfield[itemId="txf_presharedkey"]').validate())
            {
                me.object.presharedkey = me.down('textfield[itemId="txf_presharedkey"]').getValue();
            }
            else
            {
                me.down('tabpanel[itemId="tpn_isakmp"]').setActiveTab(0);
                alertMessage('Preshared Key 필수 입력 항목입니다.', me.down('textfield[itemId="txf_presharedkey"]'));
                return false;
            }
        }
        else if(me.down('radiogroup[itemId="rdg_ike"]').getChecked()[0].itemId === "rd_ike_cert")
        {
            me.object.setting['@ike_auth'] = "cert";
        }

        me.object.certificate = me.down('combobox[itemId="cmb_certificate"]').getValue();

        if(me.down('checkbox[itemId="chk_nat"]').checked)
        {
            me.object.setting['@chk_nat'] = "on";
        }
        else
        {
            me.object.setting['@chk_nat'] = "off";
        }

        if(me.down('radiogroup[itemId="rdg_mode"]').getChecked()[0].itemId === "rd_mode_booting")
        {
            me.object.setting['@mode'] = "Booting";
        }
        else if(me.down('radiogroup[itemId="rdg_mode"]').getChecked()[0].itemId === "rd_mode_traffic")
        {
            me.object.setting['@mode'] = "Traffic";
        }

        if(me.down('numberfield[itemId="nfd_dpd_period"]').getValue())
        {
            if(me.down('numberfield[itemId="nfd_dpd_period"]').validate())
            {
                me.object.dpd.period = me.down('numberfield[itemId="nfd_dpd_period"]').getValue();
            }
            else
            {
                me.down('tabpanel[itemId="tpn_isakmp"]').setActiveTab(0);
                alertMessage('0 ~ 255까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_dpd_period"]'));
                return false;
            }
        }
        else
        {
            me.object.dpd.period = null;
        }

        if(me.down('numberfield[itemId="nfd_dpd_fail"]').getValue())
        {
            if(me.down('numberfield[itemId="nfd_dpd_fail"]').validate())
            {
                me.object.dpd.fail = me.down('numberfield[itemId="nfd_dpd_fail"]').getValue();
            }
            else
            {
                me.down('tabpanel[itemId="tpn_isakmp"]').setActiveTab(0);
                alertMessage('0 ~ 255까지의 정수만 입력이 가능합니다.', me.down('numberfield[itemId="nfd_dpd_fail"]'));
                return false;
            }
        }
        else
        {
            me.object.dpd.fail = null;
        }

        me.object.phase1['@mode'] = me.down('combobox[itemId="cmb_mode"]').getValue();
        me.object.phase1['@encryption'] = me.down('combobox[itemId="cmb_encryption"]').getValue();
        me.object.phase1['@auth'] = me.down('combobox[itemId="cmb_auth"]').getValue();
        me.object.phase1['@group'] = me.down('combobox[itemId="cmb_group"]').getValue();
        me.object.phase1['@time'] = me.down('combobox[itemId="cmb_time"]').getValue();

        var ipsec_member;
        if(Ext.getStore('st_ISAKMP_IPSec').getCount() > 1)
        {
            ipsec_member = [];

            Ext.getStore('st_ISAKMP_IPSec').each(function(data, idx){

                ipsec_member.push(data.data['@cid']);
            });
        }
        else if(Ext.getStore('st_ISAKMP_IPSec').getCount() === 1)
        {
            ipsec_member = Ext.getStore('st_ISAKMP_IPSec').data.items[0].data['@cid'];
        }
        else
        {
            alertMessage('리스트에 데이터가 없습니다.');
            me.down('tabpanel[itemId="tpn_isakmp"]').setActiveTab(2);
            return false;
        }
        me.object.ipsecsa['@count'] = Ext.getStore('st_ISAKMP_IPSec').getCount();
        me.object.ipsecsa.member = ipsec_member;

        if(me.down('checkbox[itemId="ck_use"]').checked)
        {
            me.object.passive['@chk_use'] = "on";

            me.object.host['@count'] = Ext.getStore('st_IPSec_Host').getCount();

            var ipsec_host;
            if(Ext.getStore('st_IPSec_Host').getCount() > 1)
            {
                ipsec_host = [];

                Ext.getStore('st_IPSec_Host').each(function(data, idx){

                    ipsec_host.push(data.data);
                });

                me.object.host.ip = ipsec_host;
            }
            else if(Ext.getStore('st_IPSec_Host').getCount() == 1)
            {
                ipsec_host = Ext.getStore('st_IPSec_Host').data.items[0].data;
                me.object.host.ip = ipsec_host;
            }
            else
            {
                delete me.object.host.ip;
            }

            if(me.down('checkbox[itemId="ck_id_change"]').checked)
            {
                me.object.id_change['@chk_use'] = "on";
                if(me.down('textfield[itemId="txf_id_change"]').validate())
                {
                    var id_change_obj = {
                        '#text' : me.down('textfield[itemId="txf_id_change"]').getValue(),
                        '@type' : me.down('combobox[itemId="cmb_id_change"]').getValue()
                    };
                    me.object.id_change.id = id_change_obj;
                }
                else
                {
                    me.down('tabpanel[itemId="tpn_isakmp"]').setActiveTab(3);
                    alertMessage('ID교환 Type 변경 ID는 필수 입력 항목입니다.', me.down('textfield[itemId="txf_id_change"]'));
                    return false;
                }
            }
            else
            {
                me.object.id_change['@chk_use'] = "off";
            }

            if(me.down('checkbox[itemId="ck_xauth"]').checked)
            {
                me.object.xauth['@chk_use'] = "on";
                if(me.down('radiogroup[itemId="rdg_xauth_type"]').getChecked()[0].itemId === "rd_xauth_client")
                {
                    me.object.xauth['@type'] = "client";
                    me.down('container[itemId="ctn_xauth"]').show();
                    me.down('radiogroup[itemId="rdg_xauth_location"]').hide();

                    if(!me.down('textfield[itemId="txf_xauth_id"]').validate())
                    {
                        me.down('tabpanel[itemId="tpn_isakmp"]').setActiveTab(3);
                        alertMessage('XAuth ID는 필수 입력 항목입니다.', me.down('textfield[itemId="txf_xauth_id"]'));
                        return false;
                    }
                    if(!me.down('textfield[itemId="txf_xauth_password"]').validate())
                    {
                        me.down('tabpanel[itemId="tpn_isakmp"]').setActiveTab(3);
                        alertMessage('XAuth Password는 필수 입력 항목입니다.', me.down('textfield[itemId="txf_xauth_password"]'));
                        return false;
                    }

                    me.object.xauth.id = me.down('textfield[itemId="txf_xauth_id"]').getValue();
                    me.object.xauth.password = me.down('textfield[itemId="txf_xauth_password"]').getValue();
                }
                else
                {
                    me.object.xauth['@type'] = "server";
                    me.down('container[itemId="ctn_xauth"]').hide();
                    me.down('radiogroup[itemId="rdg_xauth_location"]').show();

                    if(me.down('radiogroup[itemId="rdg_xauth_location"]').getChecked()[0].itemId === "rd_xauth_local")
                    {
                        me.object.xauth['@location'] = "local";
                    }
                    else
                    {
                        me.object.xauth['@location'] = "remote";
                    }
                }
            }
            else
            {
                me.object.xauth['@chk_use'] = "off";
            }
        }
        else
        {
            me.object.passive['@chk_use'] = "off";
        }

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
            'chkDuplicateObject',
            {obj : Ext.encode(me.object)},
            function(response){

                if(response === true){
                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : '중복되는 객체명이 존재합니다. 저장하시겠습니까?',
                        buttonText: {
                            ok     : "저장",
                            cancel : "취소"
                        },

                        buttons : Ext.Msg.OKCANCEL,
                        alwaysOnTop : true,
                        icon : Ext.Msg.INFO,
                        fn: function(buttonId) {

                            if (buttonId === "ok") {
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
                                    }
                                );
                            }
                        }
                    });
                }
                else{
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
                        }
                    );
                }
            }
        );
    },

    make_ipsec_tree: function(children, list) {
        if(children['default'])
        {
            for(var j=0; j<list.length; j++)
            {
                if(children.cid === list[j]['@groupcid'])
                {
                    if(children.children === null ||
                       typeof children.children === 'undefined')
                    {
                        children.children = [];
                    }

                    var child_node = {
                        cid : list[j]['@cid'],
                        text : list[j].name,
                        leaf : true,
                        iconCls: 'ico_' + list[j]._kind + '_16'
                    };

                    children.children.push(child_node);

                    list.splice(j,1);

                    j = -1;
                }
            }

            if(children.children)
            {
                if(children.children.length > 0)
                {
                    this.make_ipsec_tree(children.children, list);
                }
            }
        }
        else
        {
            for(var i=0; i<children.length; i++)
            {
                for(var j=0; j<list.length; j++)
                {
                    if(children[i].cid === list[j]['@groupcid'])
                    {
                        if(children[i].children === null ||
                           typeof children[i].children === 'undefined')
                        {
                            children[i].children = [];
                        }

                        var child_node = {
                            cid : list[j]['@cid'],
                            text : list[j].name,
                            leaf : true,
                            iconCls: 'ico_' + list[j]._kind + '_16'
                        };

                        children[i].children.push(child_node);

                        list.splice(j,1);

                        j = -1;
                    }
                }

                if(children[i].children)
                {
                    if(children[i].children.length > 0)
                    {
                        this.make_ipsec_tree(children[i].children, list);
                    }
                }
            }
        }

        // for(var i=0; i<list.length; i++)
        // {
        //     var child_data = response_data.result[i];

        //     var child_node = {
        //         cid : child_data['@cid'],
        //         text : child_data.name,
        //         leaf : true,
        //         iconCls: 'ico_' + child_data._kind + '_16'
        //     };

        //     if(child_data['@groupcid'] === response.cid)
        //     {
        //         response.children.push(child_node);
        //     }
        //     else if(response.children.length > 0)
        //     {
        //         for(var j=0; j<response.children.length; j++)
        //         {
        //             if(child_data['@groupcid'] === response.children[j].cid)
        //             {
        //                 response.children[j].leaf = false;
        //                 response.children[j].expanded = true;
        //                 response.children[j].children.push(child_node);
        //             }
        //         }
        //     }
        // }
    }

});