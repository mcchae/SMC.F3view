
Ext.define('SMC.view.pnl_object_ipv4_addr', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.button.Button',
        'Ext.form.Label'
    ],

    border: false,
    height: 400,
    itemId: 'pnl_object_ipv4_addr',
    minHeight: 400,
    minWidth: 700,
    width: 700,
    resizable: true,
    bodyPadding: '0 20 10 20',
    constrainHeader: true,
    title: 'IPv4 주소',
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
                    itemId: 'ctn_ipv4_addr',
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
                            title: 'IP 주소목록',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    flex: 0.4,
                                    margins: '5',
                                    itemId: 'gpn_ipAddress',
                                    autoScroll: true,
                                    header: false,
                                    title: 'My Grid Panel',
                                    store: 'st_ObjectIpGrid',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
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
                                                        view.up('window[itemId="pnl_object_ipv4_addr"]').down('gridpanel[itemId="gpn_ipAddress"]').getStore().removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        itemclick: {
                                            fn: me.onGpn_ipAddressItemClick,
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
                                                if(!CheckNotNull(value)){

                                                    return true;

                                                }

                                                if(value.match(',')){

                                                    var val_array = value.split(",");

                                                    for(var i=0; i<val_array.length; i++){

                                                        if(!validIPForm(val_array[i], 'v4')){

                                                            return false;

                                                        }

                                                        if(val_array[i].match("-")){

                                                            var ip_arr = val_array[i].split('-');
                                                            var first_arr = ip_arr[0].split('.');
                                                            var last_arr = ip_arr[1].split('.');

                                                            // 2015.07.09 김민수 IP 대역 유효성 검사 수정 ====================
                                                            //
                                                            // 코드의 가독성을 위해 따로 줄이지 않았음.
                                                            //
                                                            // ==========================================================

                                                            // 1. IP의 첫 번째 레벨의 수가 마지막 IP의 첫 번째 레벨의 수보다 작으면 통과

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

                                                    if(!validIPForm(value, 'v4')){

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
                                            fieldLabel: 'IP 주소',
                                            labelAlign: 'top',
                                            msgTarget: 'none',
                                            enableKeyEvents: true,
                                            listeners: {
                                                change: {
                                                    fn: me.onTxf_ipAddressChange,
                                                    scope: me
                                                },
                                                keydown: {
                                                    fn: me.onTxf_ipAddressKeydown,
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
                                                        var me = button.up('window[itemId="pnl_object_ipv4_addr"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
                                                        var arr_ip = [];
                                                        var ip_object;

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
                                                            arr_ip.push('0.0.0.0');
                                                        }

                                                        Ext.each(arr_ip, function(ip, idx){

                                                            if(Object_DuplicateCheck(ip, '#text', Object_Store))
                                                            {
                                                                ip_object = ipv4Calc(ip);

                                                                if(ip_object)
                                                                {
                                                                    Object_Store.add({
                                                                        "#text"	: ip_object.ip,
                                                                        "@version" : "v4",
                                                                        "@type"	: ip_object.type,
                                                                        "_start" : ip_object.start,
                                                                        "_end" : ip_object.end
                                                                    });
                                                                }
                                                            }
                                                            else
                                                            {
                                                                alertMessage('같은 IP주소가 이미 있습니다.', me.down('textfield[itemId="txf_ipAddress"]'));
                                                            }
                                                        });
                                                    },
                                                    margin: '1 10 1 1',
                                                    width: 100,
                                                    text: '추가'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_ipv4_addr"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();
                                                        var select_record = me.down('gridpanel[itemId="gpn_ipAddress"]').getSelectionModel().getSelection()[0];
                                                        var row = Object_Store.indexOf(select_record);
                                                        var arr_ip = [];
                                                        var ip_object;

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
                                                            arr_ip.push('0.0.0.0');
                                                        }

                                                        Ext.each(arr_ip, function(ip, idx){

                                                            if(Object_DuplicateCheck(ip, '#text', Object_Store))
                                                            {
                                                                if(select_record && ip)
                                                                {
                                                                    if(idx === 0)
                                                                    {
                                                                        Object_Store.each(function(record,idx2){

                                                                            if(record.data['#text'] === select_record.data['#text'] && idx2 === row)
                                                                            {
                                                                                ip_object = ipv4Calc(ip);

                                                                                if(ip_object)
                                                                                {
                                                                                    record.set('_start', ip_object.start);
                                                                                    record.set('_start', ip_object.end);
                                                                                    record.set('#text', ip_object.ip);
                                                                                    record.set('@type', ip_object.type);

                                                                                    record.commit();
                                                                                }

                                                                                return false;
                                                                            }
                                                                        });

                                                                        me.down('gridpanel[itemId="gpn_ipAddress"]').getView().refresh();
                                                                    }
                                                                    else
                                                                    {
                                                                        ip_object = ipv4Calc(ip);

                                                                        if(ip_object)
                                                                        {
                                                                            Object_Store.add({
                                                                                "#text" : ip_object.ip,
                                                                                "@version" : "v4",
                                                                                "@type"	: ip_object.type,
                                                                                "_start" : ip_object.start,
                                                                                "_end" : ip_object.end
                                                                            });
                                                                        }
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
                                                    margin: '1 10 1 0',
                                                    width: 100,
                                                    text: '수정'
                                                },
                                                {
                                                    xtype: 'button',
                                                    handler: function(button, e) {
                                                        var me = button.up('window[itemId="pnl_object_ipv4_addr"]');

                                                        var select_record = me.down('gridpanel[itemId="gpn_ipAddress"]').getSelectionModel().getSelection()[0];
                                                        var object_store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();

                                                        delObject(select_record, '#text', object_store);
                                                    },
                                                    margin: 1,
                                                    width: 100,
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
                                                        var me = button.up('window[itemId="pnl_object_ipv4_addr"]');

                                                        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();

                                                        var ip_object;
                                                        var arr_ip;

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

                                                                    arr_ip = response.split('\n');

                                                                    Ext.each(arr_ip, function(ip, idx){

                                                                        if(Object_DuplicateCheck(ip, '#text', Object_Store))
                                                                        {
                                                                            ip_object = ipv4Calc(ip);

                                                                            if(ip_object)
                                                                            {
                                                                                Object_Store.add({
                                                                                    "#text"	: ip_object.ip,
                                                                                    "@version" : "v4",
                                                                                    "@type"	: ip_object.type,
                                                                                    "_start" : ip_object.start,
                                                                                    "_end" : ip_object.end
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
                                                        }
                                                    },
                                                    margin: 1,
                                                    width: 100,
                                                    text: '제외 대역 추가'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '20 0 0 0',
                                            text: 'IP객체 입력형태 : '
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '10 0 10 0',
                                            text: 'ex) Single : 1.1.1.1 , Range : 1.1.1.1-1.1.1.100  '
                                        },
                                        {
                                            xtype: 'label',
                                            text: 'Netmask : 1.1.1.0/255.255.255.0 , Prefix : 1.1.1.0/24'
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
                                        button.up('window[itemId="pnl_object_ipv4_addr"]').saveData();
                                    },
                                    margin: '1 20 1 0',
                                    width: 100,
                                    text: '저장'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        button.up('window[itemId="pnl_object_ipv4_addr"]').destroy();
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
                    fn: me.onPnl_object_ipv4_addrAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_object_ipv4_addrBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onGpn_ipAddressItemClick: function(dataview, record, item, index, e, eOpts) {
        this.down('textfield[itemId="txf_ipAddress"]').setValue(record.data['#text']);
    },

    onTxf_ipAddressChange: function(field, newValue, oldValue, eOpts) {
        if(newValue.match(' '))
        {
            newValue = newValue.trim();
            field.setValue(newValue.split(' ').join(','));
        }
    },

    onTxf_ipAddressKeydown: function(textfield, e, eOpts) {
        if(e.browserEvent.keyCode === 32)
        {
            e.stopEvent();
        }
    },

    onPnl_object_ipv4_addrAfterRender: function(component, eOpts) {
        component.getEl().on('keypress', function(e) {

            if(e.getKey() == e.ENTER)
            {
                component.saveData();
            }
        });
    },

    onPnl_object_ipv4_addrBeforeDestroy: function(component, eOpts) {
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

        Ext.each(record.ip, function(data, idx){

            ip_grid_store.add(data);

        });

        me.object = record;

        me.show();
    },

    saveData: function() {
        var me = this;

        var Object_Store = me.down('gridpanel[itemId="gpn_ipAddress"]').getStore();

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

        if(Object_Store.getCount() >= 1)
        {
            var arr_ip = [];

            Object_Store.each(function(record, idx){

                arr_ip.push(record.data);
            });

            me.object.ip = arr_ip;
            me.object['@count'] = Object_Store.data.items.length;
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
                obj	: Ext.encode(me.object),
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