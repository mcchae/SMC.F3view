
Ext.define('SMC4ZEN.view.pnl_object_script', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_object_script',

    requires: [
        'SMC4ZEN.view.pnl_object_scriptViewModel',
        'Ext.form.Label',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_object_script'
    },
    border: false,
    height: 600,
    itemId: 'pnl_object_script',
    minHeight: 600,
    minWidth: 700,
    resizable: true,
    width: 700,
    bodyPadding: '0 10 10 10',
    constrainHeader: true,
    title: '객체 일괄 등록',
    maximizable: true,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_script',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    margin: '10 0 10 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'label',
                            flex: 1,
                            text: '객체 일괄 등록 기능은 파일(.csv)에 저장된 객체 정보를 저장합니다. '
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            text: '( 파일(.csv) 인코딩 형식은 UTF-8 형식만 지원합니다. )'
                        },
                        {
                            xtype: 'label',
                            flex: 1,
                            margin: '5 0 5 0',
                            text: 'ex) 파일(.csv)에 다음과 같은 형태로 입력하여 사용합니다.'
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    itemId: 'fs_object1',
                                    margin: 0,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    }
                                },
                                {
                                    xtype: 'fieldset',
                                    flex: 1,
                                    border: 0,
                                    itemId: 'fs_object2',
                                    margin: '0 0 0 10',
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_objectScript',
                    margin: '0 0 10 0',
                    scrollable: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.data.error)
                                {
                                    metaData.style = 'background-color: #FFDFDD;';
                                }

                                return value;
                            },
                            dataIndex: 'name',
                            text: '객체명',
                            flex: 0.5
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                if(record.data.error)
                                {
                                    metaData.style = 'background-color: #FFDFDD;';
                                }

                                return value;
                            },
                            dataIndex: 'desc',
                            text: '설명',
                            flex: 0.5
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
                            xtype: 'container',
                            flex: 1,
                            html: '<input type="file" id="open_object_select" name="파일 열기" style="visibility:hidden;" accept=".csv"/>',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            listeners: {
                                afterrender: 'onContainerAfterRender'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    margin: 1,
                                    width: 100,
                                    text: '파일 열기',
                                    listeners: {
                                        click: 'onButtonClick'
                                    }
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    margin: 1,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'center'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            height: 20,
                                            style: {
                                                'background-color': '#FFDFDD;'
                                            },
                                            width: 40
                                        },
                                        {
                                            xtype: 'label',
                                            margin: '0 0 0 6',
                                            text: ': 객체 정보 오류'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_script"]').saveData();
                            },
                            margin: '1 10 1 0',
                            width: 100,
                            text: '저장'
                        },
                        {
                            xtype: 'button',
                            handler: function(button, e) {
                                button.up('window[itemId="pnl_object_script"]').destroy();
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

    onContainerAfterRender: function(component, eOpts) {
        var me = this;

        function trim(str) {

            return str.replace(/(\r\n| )/g,"");

        }

        function readScript(evt) {

            var files = evt.target.files,

                reader = new FileReader();

            reader.onload = function() {

                var result = this.result;
                var obj_data;
                var data_array;
                var ip_string;
                var result_array;
                var type_string;
                var version_string;

                if(result)
                {
                    result_array = result.split(/[\r\n]+/g);

                    for(var i=0; i<result_array.length; i++)
                    {
                        result_array[i] = trim(result_array[i]);

                        if(result_array[i] === '')
                        {
                            result_array.splice(i, 1);
                            i = -1;
                        }
                    }

                    switch(me.type)
                    {
                        case 'obj_ip_v4_addr':

                            Ext.each(result_array, function(data, idx){

                                obj_data = {};
                                ip_string = '';
                                data_array = data.split(',');
                                obj_data.error = false;

                                if(data_array.length < 3)
                                {
                                    obj_data.error = true;
                                }

                                obj_data.name = data_array[0];
                                obj_data.desc = data_array[1];

                                for(var i=2; i<data_array.length; i++)
                                {
                                    if(i === (data_array.length - 1))
                                    {
                                        if(!validIPForm(data_array[i], 'v4'))
                                        {
                                            obj_data.error = true;
                                        }

                                        ip_string += data_array[i];
                                    }
                                    else
                                    {
                                        if(!validIPForm(data_array[i], 'v4'))
                                        {
                                            obj_data.error = true;
                                        }

                                        ip_string += data_array[i] + ',';
                                    }
                                }

                                obj_data.ip = ip_string;

                                me.down('gridpanel[itemId="gpn_objectScript"]').getStore().add(obj_data);

                            });

                            break;
                        case 'obj_ip_v6_addr':

                            Ext.each(result_array, function(data, idx){

                                obj_data = {};
                                ip_string = '';
                                data_array = data.split(',');
                                obj_data.error = false;

                                if(data_array.length < 3)
                                {
                                    obj_data.error = true;
                                }

                                obj_data.name = data_array[0];
                                obj_data.desc = data_array[1];

                                for(var i=2; i<data_array.length; i++)
                                {
                                    if(i === (data_array.length - 1))
                                    {
                                        if(data_array[i].match('/'))
                                        {
                                            if(!ValidIPv6(data_array[i].split('/')[0]))
                                            {
                                                obj_data.error = true;
                                            }

                                            ip_string += data_array[i];
                                        }
                                        else
                                        {
                                            if(!ValidIPv6(data_array[i]))
                                            {
                                                obj_data.error = true;
                                            }

                                            ip_string += data_array[i];
                                        }
                                    }
                                    else
                                    {
                                        if(data_array[i].match('/'))
                                        {
                                            if(!ValidIPv6(data_array[i].split('/')[0]))
                                            {
                                                obj_data.error = true;
                                            }

                                            ip_string += data_array[i] + ',';
                                        }
                                        else
                                        {
                                            if(!ValidIPv6(data_array[i]))
                                            {
                                                obj_data.error = true;
                                            }

                                            ip_string += data_array[i] + ',';
                                        }
                                    }
                                }

                                obj_data.ip = ip_string;

                                me.down('gridpanel[itemId="gpn_objectScript"]').getStore().add(obj_data);

                            });

                            break;
                        case 'obj_svc_port':

                            Ext.each(result_array, function(data, idx){

                                obj_data = {};
                                ip_string = '';
                                data_array = data.split(',');
                                obj_data.error = false;

                                if(data_array.length < 5)
                                {
                                    obj_data.error = true;
                                }

                                obj_data.name = data_array[0];
                                obj_data.desc = data_array[1];

                                if(data_array[2].toUpperCase() !== 'TCP' && data_array[2].toUpperCase() !== 'UDP')
                                {
                                    obj_data.error = true;
                                }

                                obj_data.type = data_array[2].toUpperCase();

                                var SPort_array = [];

                                if(data_array[3].match('~'))
                                {
                                    SPort_array = data_array[3].split('~');
                                }
                                else if(data_array[3].match('-'))
                                {
                                    SPort_array = data_array[3].split('-');
                                }

                                if(SPort_array.length !== 2)
                                {
                                    obj_data.error = true;
                                }

                                for(i=0; i<SPort_array.length; i++)
                                {
                                    if(!LengthCheckFloat(parseInt(SPort_array[i]),1,65535) || isNaN(parseInt(SPort_array[i])))
                                    {
                                        obj_data.error = true;
                                    }
                                }

                                obj_data.sport = data_array[3];

                                var DPort_array = [];

                                if(data_array[4].match('~'))
                                {
                                    DPort_array = data_array[4].split('~');
                                }
                                else if(data_array[4].match('-'))
                                {
                                    DPort_array = data_array[4].split('-');
                                }

                                if(DPort_array.length !== 2)
                                {
                                    obj_data.error = true;
                                }

                                for(i=0; i<DPort_array.length; i++)
                                {
                                    if(!LengthCheckFloat(parseInt(DPort_array[i]),1,65535) || isNaN(parseInt(DPort_array[i])))
                                    {
                                        obj_data.error = true;
                                    }
                                }

                                obj_data.dport = data_array[4];

                                me.down('gridpanel[itemId="gpn_objectScript"]').getStore().add(obj_data);

                            });

                            break;
                        case 'obj_ipsec_host':

                            Ext.each(result_array, function(data, idx){

                                obj_data = {};
                                ip_string = '';
                                type_string = '';
                                version_string = '';
                                data_array = data.split(',');
                                obj_data.error = false;

                                if(data_array.length < 3)
                                {
                                    obj_data.error = true;
                                }

                                obj_data.name = data_array[0];
                                obj_data.desc = data_array[1];

                                for(var i=2; i<data_array.length; i++)
                                {
                                    if(i === (data_array.length - 1))
                                    {
                                        if(!validIPForm(data_array[i], 'v4'))
                                        {
                                            if(data_array[i].match('/'))
                                            {
                                                if(!ValidIPv6(data_array[i].split('/')[0]))
                                                {
                                                    obj_data.error = true;
                                                }
                                            }
                                            else
                                            {
                                                if(!ValidIPv6(data_array[i]))
                                                {
                                                    obj_data.error = true;
                                                }
                                            }
                                        }

                                        ip_string += data_array[i];
                                        type_string += ipVersionType(data_array[i]).type;
                                        version_string += ipVersionType(data_array[i]).version;
                                    }
                                    else
                                    {
                                        if(!validIPForm(data_array[i], 'v4'))
                                        {
                                            if(data_array[i].match('/'))
                                            {
                                                if(!ValidIPv6(data_array[i].split('/')[0]))
                                                {
                                                    obj_data.error = true;
                                                }
                                            }
                                            else
                                            {
                                                if(!ValidIPv6(data_array[i]))
                                                {
                                                    obj_data.error = true;
                                                }
                                            }
                                        }

                                        ip_string += data_array[i] + ',';
                                        type_string += ipVersionType(data_array[i]).type + ',';
                                        version_string += ipVersionType(data_array[i]).version + ',';
                                    }
                                }

                                obj_data.ip = ip_string;

                                obj_data.type = type_string;

                                obj_data.version = version_string;

                                me.down('gridpanel[itemId="gpn_objectScript"]').getStore().add(obj_data);

                            });

                            break;
                    }
                }
            };

           reader.readAsText(files[0]);
        }

        open_object_select.addEventListener("change", readScript, false);
    },

    onButtonClick: function(button, e, eOpts) {
        var evt = document.createEvent('MouseEvents');
        evt.initEvent("click", true, true);
        open_object_select.dispatchEvent(evt);
    },

    loadData: function(record) {
        var me  = this;

        var fs_object1 = me.down('fieldset[itemId="fs_object1"]');
        var fs_object2 = me.down('fieldset[itemId="fs_object2"]');
        var gpn_script = me.down('gridpanel[itemId="gpn_objectScript"]');

        me.type = record;

        switch(record)
        {
            case 'obj_ip_v4_addr':

                fs_object1.add({
                    xtype: 'label',
                    text: 'Object Name, Description, IP '
                },{
                    xtype: 'label',
                    text: 'Object Name, Description, IP '
                });

                fs_object2.add({
                    xtype: 'label',
                    text: '구분자(,)를 사용하여 추가 '
                },{
                    xtype: 'label',
                    text: 'IP : 1.1.1.1,2.2.2.2,...'
                },{
                    xtype: 'label',
                    text: 'IP주소 입력형태'
                },{
                    xtype: 'label',
                    text: 'Single : 1.1.1.1 , Range : 1.1.1.1-1.1.1.100 '
                },{
                    xtype: 'label',
                    text: 'Netmask : 1.1.1.0/255.255.255.0 , Prefix : 1.1.1.0/24 '
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: 'IP주소',
                    dataIndex: 'ip',
                    flex: 1,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.reconfigure(Ext.create('Ext.data.Store', {
                    storeId:'st_ObjectScript',
                    fields:['name', 'desc', 'ip', 'error']
                }));

                break;
            case 'obj_ip_v6_addr':

                fs_object1.add({
                    xtype: 'label',
                    text: 'Object Name, Description, IP '
                },{
                    xtype: 'label',
                    text: 'Object Name, Description, IP '
                });

                fs_object2.add({
                    xtype: 'label',
                    text: '구분자(,)를 사용하여 추가 '
                },{
                    xtype: 'label',
                    text: 'IP : 2001::1,3ffe:2e01::1,...'
                },	{
                    xtype: 'label',
                    text: 'IP주소 입력형태'
                },{
                    xtype: 'label',
                    text: 'Single : 2001::1 , Prefic : 2001::/64 '
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: 'IP주소',
                    dataIndex: 'ip',
                    flex: 1,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.reconfigure(Ext.create('Ext.data.Store', {
                    storeId:'st_ObjectScript',
                    fields:['name', 'desc', 'ip', 'error']
                }));

                break;
            case 'obj_svc_port':

                fs_object1.add({
                    xtype: 'label',
                    text: 'Object Name, Description, TCP, SPort, DPort '
                },{
                    xtype: 'label',
                    text: 'Object Name, Description, UDP, SPort, DPort '
                });

                fs_object2.add({
                    xtype: 'label',
                    text: '포트번호 입력형태'
                },{
                    xtype: 'label',
                    text: 'SPort : 1 ~ 65535 , DPort : 1 ~ 65535'
                },{
                    xtype: 'label',
                    text: '※ 서비스 포트 일괄등록은 TCP or UDP 만 지원됩니다. '
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: '목적지 포트',
                    dataIndex: 'dport',
                    flex: 0.8,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: '출발지 포트',
                    dataIndex: 'sport',
                    flex: 0.8,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: '종류',
                    dataIndex: 'type',
                    flex: 0.3,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.reconfigure(Ext.create('Ext.data.Store', {
                    storeId:'st_ObjectScript',
                    fields:['name', 'desc', 'type', 'sport', 'dport', 'error']
                }));

                break;
            case 'obj_ipsec_host':

                fs_object1.add({
                    xtype: 'label',
                    text: 'Object Name, Description, IP '
                },{
                    xtype: 'label',
                    text: 'Object Name, Description, IP '
                });

                fs_object2.add({
                    xtype: 'label',
                    text: '구분자(,)를 사용하여 추가 '
                },{
                    xtype: 'label',
                    text: 'IP : 1.1.1.1,2.2.2.2,...'
                },{
                    xtype: 'label',
                    text: 'IP주소 입력형태 : '
                },{
                    xtype: 'label',
                    text: 'Single : 1.1.1.1 , Range : 1.1.1.1-1.1.1.100 '
                },{
                    xtype: 'label',
                    text: 'Netmask : 1.1.1.0/255.255.255.0 , Prefix : 1.1.1.0/24 '
                },{
                    xtype: 'label',
                    text: 'Single : 2001::1 , Prefix : 2001::/64 '
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: 'IP주소',
                    dataIndex: 'ip',
                    flex: 1.2,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: '타입',
                    dataIndex: 'type',
                    flex: 0.4,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.headerCt.insert(gpn_script.columns.length, {
                    text: '버전',
                    dataIndex: 'version',
                    flex: 0.4,
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.error)
                        {
                            metaData.style = 'background-color: #FFDFDD;';
                        }

                        return value;
                    }
                });

                gpn_script.reconfigure(Ext.create('Ext.data.Store', {
                    storeId:'st_ObjectScript',
                    fields:['name', 'desc', 'type', 'version', 'ip', 'error']
                }));

                break;
        }

        me.show();
    },

    saveData: function() {
        var me = this;

        var treeObj = Ext.ComponentQuery.query('treepanel[itemId="trpn_objectMenu"]')[0];
        var record = treeObj.getSelectionModel().getSelection()[0];

        if(!record)
        {
            me.destroy();
        }

        var script_store = me.down('gridpanel[itemId="gpn_objectScript"]').getStore();

        var name,
            desc,
            group_cid,
            kind,
            ip,
            start,
            end,
            count,
            ip_object,
            ip_array,
            arr_ip,
            arr_version,
            arr_type,
            port_type,
            sport,
            dport,
            i,
            error_check = false,
            data_length = script_store.data.items.length,
            request_count = 0;

        group_cid = record.raw.cid;
        kind = record.raw._kind;

        if(script_store.data.items.length < 1)
        {
            return false;
        }

        var _svc = 'ftSMC',
            _func,
            _params;

        _func = 'getObjectDefault';

        _params = {
            kind : Ext.encode(kind)
        };

        request_helper.xmlrpc_call_Ajax_Post(
            _svc,
            _func,
            _params,
            function(default_object){

                if(!default_object)
                {
                    return false;
                }

                Ext.each(script_store.data.items, function(data, idx){

                    if(data.data.error)
                    {
                        error_check = true;
                        data_length = data_length - 1;
                        return true;
                    }

                    name = data.data.name;
                    desc = data.data.desc;

                    switch(me.type)
                    {
                        case 'obj_ip_v4_addr':

                            ip_array = [];

                            arr_ip = data.data.ip.split(",");

                            if(arr_ip.length > 1)
                            {
                                count = arr_ip.length;

                                for(i=0; i<arr_ip.length; i++)
                                {
                                    ip = arr_ip[i];

                                    ip_object = ipv4Calc(ip);

                                    if(ip_object)
                                    {
                                        ip_array.push({
                                            '#text': ip_object.ip,
                                            '@type': ip_object.type,
                                            '@version': 'v4',
                                            '_start': ip_object.start,
                                            '_end': ip_object.end
                                        });
                                    }
                                }
                            }
                            else
                            {
                                count = 1;

                                ip = data.data.ip;

                                ip_object = ipv4Calc(ip);

                                if(ip_object)
                                {
                                    ip_array.push({
                                        '#text': ip_object.ip,
                                        '@type': ip_object.type,
                                        '@version': 'v4',
                                        '_start': ip_object.start,
                                        '_end': ip_object.end
                                    });
                                }
                            }

                            default_object.name = name;
                            default_object.desc = desc;
                            default_object['@groupcid'] = group_cid;
                            default_object['@count'] = count;
                            default_object.ip = ip_array;

                            break;
                        case 'obj_ip_v6_addr':

                            ip_array = [];

                            arr_ip = data.data.ip.split(",");

                            if(arr_ip.length > 1)
                            {
                                count = arr_ip.length;

                                for(i=0; i<arr_ip.length; i++)
                                {
                                    ip_array.push({
                                        '#text': arr_ip[i],
                                        '@type': 'single',
                                        '@version': 'v6'
                                    });
                                }
                            }
                            else
                            {
                                count = 1;

                                ip_array.push({
                                    '#text': data.data.ip,
                                    '@type': 'single',
                                    '@version': 'v6'
                                });
                            }

                            default_object.name = name;
                            default_object.desc = desc;
                            default_object['@groupcid'] = group_cid;
                            default_object['@count'] = count;
                            default_object.ip = ip_array;

                            break;
                        case 'obj_svc_port':

                            port_type = data.data.type;

                            sport = {};
                            dport = {};

                            if(data.data.sport.match('~'))
                            {
                                sport.start = parseInt(data.data.sport.split('~')[0]);
                                sport.end = parseInt(data.data.sport.split('~')[1]);
                            }
                            else if(data.data.sport.match('-'))
                            {
                                sport.start = parseInt(data.data.sport.split('-')[0]);
                                sport.end = parseInt(data.data.sport.split('-')[1]);
                            }


                            if(data.data.dport.match('~'))
                            {
                                dport.start = parseInt(data.data.dport.split('~')[0]);
                                dport.end = parseInt(data.data.dport.split('~')[1]);
                            }
                            else if(data.data.dport.match('-'))
                            {
                                dport.start = parseInt(data.data.dport.split('-')[0]);
                                dport.end = parseInt(data.data.dport.split('-')[1]);
                            }

                            default_object.name = name;
                            default_object.desc = desc;
                            default_object['@groupcid'] = group_cid;

                            default_object.protocol['@type'] = port_type;

                            default_object.source.start = sport.start;
                            default_object.source.end = sport.end;

                            default_object.dest.start = dport.start;
                            default_object.dest.end = dport.end;

                            break;
                        case 'obj_ipsec_host':

                            ip_array = [];

                            arr_ip = data.data.ip.split(",");

                            arr_type = data.data.type.split(",");

                            arr_version = data.data.version.split(",");

                            count = arr_ip.length;

                            if(arr_ip.length > 1)
                            {

                                for(i=0; i<arr_ip.length; i++)
                                {
                                    ip_array.push({
                                        '@num': i+1,
                                        'ip':{
                                            '#text': arr_ip[i],
                                            '@type': arr_type[i],
                                            '@version': arr_version[i]
                                        }
                                    });
                                }
                            }
                            else
                            {

                                ip_array.push({
                                    '@num': arr_ip.length,
                                    'ip':{
                                        '#text': data.data.ip,
                                        '@type': data.data.type,
                                        '@version': data.data.version
                                    }
                                });
                            }

                            default_object.name = name;
                            default_object.desc = desc;
                            default_object['@groupcid'] = group_cid;

                            default_object.host =  ip_array;

                            break;
                    }

                    _func = 'addObject';

                    _params = {
                        obj : Ext.encode(default_object),
                        g_cid : Ext.encode(default_object['@groupcid'])
                    };

                    request_helper.xmlrpc_call_Ajax_Post(
                        _svc,
                        _func,
                        _params,
                        function(response){

                            if(response)
                            {
                                request_count += 1;

                                if(typeof me.closeEvent === 'function'){
                                    me.closeEvent();
                                }

                                if(request_count === data_length)
                                {
                                    me.request_count = request_count;

                                    if(error_check)
                                    {
                                        alertMessage('저장되었습니다. \n객체 정보가 올바르지 않은 객체는 저장되지 않았습니다.\n목록에서 객체 정보를 수정하고 다시 저장하십시오.');
                                    }
                                    else
                                    {
                                        alertMessage('저장되었습니다.');
                                    }

                                    me.destroy();
                                }
                            }
                        }
                    );

                });
        });
    }

});