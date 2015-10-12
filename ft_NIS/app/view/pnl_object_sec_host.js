
Ext.define('SMC.view.pnl_object_sec_host', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.button.Button'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_sec_host',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: '보안 호스트',
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
                    itemId: 'ctn_sec_host',
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
                                    msgTarget: 'none'
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 0.4,
                                    itemId: 'txf_objectDesc',
                                    fieldLabel: '기타 설명',
                                    labelAlign: 'top'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            flex: 1,
                            title: '보안 호스트',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 0.8,
                                    margins: '5',
                                    itemId: 'gpn_ipAddress',
                                    autoScroll: true,
                                    header: false,
                                    title: 'My Grid Panel',
                                    store: 'st_IPSec_Host',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            width: 68,
                                            defaultWidth: 220,
                                            dataIndex: '@version',
                                            text: 'IP 버전'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 78,
                                            defaultWidth: 220,
                                            dataIndex: '@type',
                                            text: 'IP 타입'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            width: 183,
                                            defaultWidth: 220,
                                            dataIndex: '#text',
                                            text: 'IP 주소',
                                            flex: 1
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            width: 30,
                                            align: 'center',
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        view.up('window[itemId="pnl_object_sec_host"]').down('gridpanel[itemId="gpn_ipAddress"]').getStore().removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        select: {
                                            fn: me.onGpn_ipAddressSelect,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 0.6,
                                    margins: '5',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            validator: function(value) {
                                                var retValue;

                                                retValue = CheckNotNull(value);

                                                if(!retValue){

                                                    return true;

                                                }

                                                if(value.match(',')){

                                                    var val_array = value.split(",");

                                                    for(var i=0; i<val_array.length; i++){

                                                        retValue = validIPForm(val_array[i], 'v4');

                                                        if(!retValue){

                                                            if(val_array[i].match('/')){

                                                                retValue = ValidIPv6(val_array[i].split('/')[0]);

                                                            }
                                                            else{

                                                                retValue = ValidIPv6(val_array[i]);

                                                            }

                                                        }

                                                        if(!retValue){

                                                            return false;

                                                        }

                                                        if(val_array[i].match("-")){

                                                            var ip_arr = val_array[i].split('-');
                                                            var first_arr = ip_arr[0].split('.');
                                                            var last_arr = ip_arr[1].split('.');

                                                            var result = (parseInt(first_arr[0]) < parseInt(last_arr[0])) ? true :
                                                            (parseInt(first_arr[0]) === parseInt(last_arr[0])) ? (parseInt(first_arr[1]) < parseInt(last_arr[1])) ? true :
                                                            (parseInt(first_arr[1]) === parseInt(last_arr[1])) ? (parseInt(first_arr[2]) < parseInt(last_arr[2])) ? true :
                                                            (parseInt(first_arr[2]) === parseInt(last_arr[2])) ? (parseInt(first_arr[3]) < parseInt(last_arr[3])) ? true :
                                                            (parseInt(first_arr[3]) <= parseInt(last_arr[3])) ? true : false : false: false: false;

                                                            return result;

                                                        }

                                                    }

                                                }

                                                else{

                                                    retValue = validIPForm(value, 'v4');

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    if(!retValue){

                                                        if(value.match('/')){

                                                            retValue = ValidIPv6(value.split('/')[0]);
                                                        }
                                                        else{

                                                            retValue = ValidIPv6(value);

                                                        }

                                                    }

                                                    if(!retValue){

                                                        return false;

                                                    }

                                                    if(value.match("-")){

                                                        var ip_arr = value.split('-');
                                                        var first_arr = ip_arr[0].split('.');
                                                        var last_arr = ip_arr[1].split('.');

                                                        var result = (parseInt(first_arr[0]) < parseInt(last_arr[0])) ? true :
                                                        (parseInt(first_arr[0]) === parseInt(last_arr[0])) ? (parseInt(first_arr[1]) < parseInt(last_arr[1])) ? true :
                                                        (parseInt(first_arr[1]) === parseInt(last_arr[1])) ? (parseInt(first_arr[2]) < parseInt(last_arr[2])) ? true :
                                                        (parseInt(first_arr[2]) === parseInt(last_arr[2])) ? (parseInt(first_arr[3]) < parseInt(last_arr[3])) ? true :
                                                        (parseInt(first_arr[3]) <= parseInt(last_arr[3])) ? true : false : false: false: false;

                                                        return result;

                                                    }

                                                }

                                                return true;
                                            },
                                            itemId: 'txf_ipAddress',
                                            width: 220,
                                            fieldLabel: 'IP 주소',
                                            labelAlign: 'top',
                                            msgTarget: 'none',
                                            listeners: {
                                                keydown: {
                                                    fn: me.onTxf_ipAddressKeydown,
                                                    scope: me
                                                },
                                                change: {
                                                    fn: me.onTxf_ipAddressChange,
                                                    scope: me
                                                }
                                            }
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_sec_host"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();

                                                        var arr_ip = [];
                                                        var ip_version_type;

                                                        if(me.down('textfield[itemId="txf_ipAddress"]').getValue())
                                                        {
                                                            if(me.down('textfield[itemId="txf_ipAddress"]').validate())
                                                            {
                                                                arr_ip = me.down('textfield[itemId="txf_ipAddress"]').getValue().split(",");
                                                            }
                                                            else
                                                            {
                                                                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                                return false;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            alertMessage('IP주소를 입력하시오.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                            return false;
                                                        }

                                                        Ext.each(arr_ip, function(ip, idx){

                                                            if(Object_DuplicateCheck(ip, '#text', Object_Store))
                                                            {
                                                                ip_version_type = ipVersionType(ip);

                                                                if(ip_version_type)
                                                                {
                                                                    Object_Store.add({
                                                                        '#text': ip,
                                                                        "@version": ip_version_type.version,
                                                                        "@type": ip_version_type.type
                                                                    });
                                                                }
                                                            }
                                                            else
                                                            {
                                                                alertMessage('같은 IP주소가 이미 있습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                            }

                                                        });
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 1',
                                                    maxWidth: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_sec_host"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
                                                        var select_record = me.down('gridpanel[itemId="gpn_ipAddress"]').getSelectionModel().getSelection()[0];
                                                        var row =  Object_Store.indexOf(select_record);
                                                        var arr_ip = [];
                                                        var ip_version_type;

                                                        if(me.down('textfield[itemId="txf_ipAddress"]').getValue())
                                                        {
                                                            if(me.down('textfield[itemId="txf_ipAddress"]').validate())
                                                            {
                                                                arr_ip = me.down('textfield[itemId="txf_ipAddress"]').getValue().split(",");
                                                            }
                                                            else
                                                            {
                                                                alertMessage('IP형식이 올바르지 않습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                                return false;
                                                            }
                                                        }
                                                        else
                                                        {
                                                            alertMessage('IP주소를 입력하시오.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                            return false;
                                                        }

                                                        Ext.each(arr_ip, function(ip, idx){

                                                            if(Object_DuplicateCheck(ip, '#text', Object_Store))
                                                            {
                                                                if(idx === 0)
                                                                {
                                                                    if(select_record && ip)
                                                                    {
                                                                        Object_Store.each(function(record,idx){

                                                                            if(record.data['#text'] === select_record.data['#text'] && idx === row)
                                                                            {
                                                                                ip_version_type = ipVersionType(ip);

                                                                                if(ip_version_type)
                                                                                {
                                                                                    record.set('#text', ip);
                                                                                    record.set('@type', ip_version_type.type);
                                                                                    record.set('@version', ip_version_type.version);

                                                                                    record.commit();
                                                                                }

                                                                                return false;
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                                else
                                                                {
                                                                    ip_version_type = ipVersionType(ip);

                                                                    if(ip_version_type)
                                                                    {
                                                                        Object_Store.add({
                                                                            '#text': ip,
                                                                            "@version": ip_version_type.version,
                                                                            "@type": ip_version_type.type
                                                                        });
                                                                    }
                                                                }
                                                            }
                                                            else
                                                            {
                                                                if(select_record.data['#text'] !== ip)
                                                                {
                                                                    alertMessage('같은 IP주소가 이미 있습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                                }
                                                            }
                                                        });

                                                        me.down('gridpanel[itemId="gpn_ipAddress"]').reconfigure();
                                                    },
                                                    flex: 1,
                                                    margin: '1 10 1 0',
                                                    maxWidth: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_sec_host"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_ipAddress"]').getSelectionModel().getSelection()[0];
                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();

                                                        delObject(select_record, '#text', Object_Store);
                                                    },
                                                    flex: 1,
                                                    margin: 1,
                                                    maxWidth: 100,
                                                    text: '삭제'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            margin: '5 0 0 0 ',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            },
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_sec_host"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
                                                        var ip_version_type;

                                                        if(me.down('textfield[itemId="txf_ipAddress"]').getValue())
                                                        {
                                                            if(me.down('textfield[itemId="txf_ipAddress"]').validate())
                                                            {
                                                                var _svc = 'ftSMC',
                                                                    _func = 'getComplementIPRange',
                                                                    _params = {
                                                                        ipaddr : Ext.encode(me.down('textfield[itemId="txf_ipAddress"]').getValue())
                                                                    };
                                                                request_helper.xmlrpc_call_Ajax_Post(
                                                                _svc,
                                                                _func,
                                                                _params,
                                                                function(response){

                                                                    var ip_array = response.split('\n');

                                                                    Ext.each(ip_array, function(ip, idx){

                                                                        if(Object_DuplicateCheck(ip, '#text', Object_Store))
                                                                        {
                                                                            ip_version_type = ipVersionType(ip);

                                                                            if(ip_version_type)
                                                                            {
                                                                                Object_Store.add({
                                                                                    "#text": ip,
                                                                                    "@version": ip_version_type.version,
                                                                                    "@type": ip_version_type.type
                                                                                });
                                                                            }
                                                                        }
                                                                        else
                                                                        {
                                                                            alertMessage('같은 IP주소가 이미 있습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                                        }
                                                                    });
                                                                }
                                                                );
                                                            }
                                                        }
                                                        else
                                                        {
                                                            alertMessage('IP주소를 입력하시오.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                            return false;
                                                        }
                                                    },
                                                    margin: 1,
                                                    width: 100,
                                                    text: '제외 대역 추가'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'end'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_sec_host"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_sec_host"]').destroy();
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
                    fn: me.onPnl_object_sec_hostAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_sec_hostBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_ipAddressSelect: function(rowmodel, record, index, eOpts) {
        this.down('textfield[itemId="txf_ipAddress"]').setValue(record.data['#text']);
    },

    onTxf_ipAddressKeydown: function(textfield, e, eOpts) {
        if(e.browserEvent.keyCode === 32)
        {
            e.stopEvent();
        }
    },

    onTxf_ipAddressChange: function(field, newValue, oldValue, eOpts) {
        if(newValue.match(' '))
        {
            newValue = newValue.trim();
            field.setValue(newValue.split(' ').join(','));
        }
    },

    onPnl_object_sec_hostAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_sec_hostBeforeDestroy: function(component, eOpts) {
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

        var ip_grid_store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
        ip_grid_store.removeAll();

        me.down('textfield[itemId="txf_objectName"]').setValue(record.name);
        me.down('textfield[itemId="txf_objectDesc"]').setValue(record.desc);

        Ext.each(record.host, function(data, idx){

            ip_grid_store.add(data.ip);

        });

        me.object = record;

        me.show();
    },

    saveData: function() {
        var me = this;

        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
        var object_ip;

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

        me.object['@count'] = Object_Store.getCount();

        if(Object_Store.getCount() > 1)
        {
            var object_array = [];

            Object_Store.each(function(record, idx){

                object_ip = {
                    '@num': idx+1,
                    'ip': record.data
                };

                object_array.push(object_ip);
            });

            me.object.host = object_array;
        }
        else if(Object_Store.getCount() === 1)
        {
            object_ip = {
                '@num': Object_Store.getCount(),
                'ip': Object_Store.data.items[0].data
            };
            me.object.host = object_ip;
        }
        else
        {
            alertMessage('리스트에 데이터가 없습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
            return false;
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

});