
Ext.define('SMC.view.pnl_policy_ipv6_filtering', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Ext.button.Button',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.selection.CheckboxModel'
    ],

    id: 'pnl_policy_ipv6_filtering',
    closable: true,
    title: 'IPv6 필터링',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            listeners: {
                afterrender: {
                    fn: me.onNFW2_firewall_filtering_ipv4FilteringAfterRender,
                    scope: me
                }
            },
            items: [
                {
                    xtype: 'container',
                    margins: '3',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'button',
                            margins: '5',
                            id: 'btn_insert',
                            width: 100,
                            text: '추가',
                            listeners: {
                                click: {
                                    fn: me.onBtn_insertClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            id: 'btn_update',
                            width: 100,
                            text: '수정'
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            id: 'btn_delete',
                            width: 100,
                            text: '삭제'
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            itemId: 'btn_policy_checkRedundant',
                            width: 100,
                            text: '규칙중복검사',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick3,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            itemId: 'btn_policy_output',
                            width: 100,
                            text: '규칙출력',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick4,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            margins: '5',
                            disabled: true,
                            itemId: 'btn_policy_rule_save',
                            width: 100,
                            text: '저장',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick5,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            collapsed: true,
                            collapsible: true,
                            title: '정책검색',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
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
                                            height: 24,
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
                                            text: '검색'
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
                                            fieldLabel: 'Label',
                                            hideLabel: true,
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
                        },
                        {
                            xtype: 'gridpanel',
                            flex: 0.7,
                            id: 'pnl_policy_ipv6_list',
                            bodyBorder: true,
                            header: false,
                            title: '',
                            columnLines: true,
                            store: 'st_policy_ipv6_list',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    dataIndex: '@num',
                                    text: '순위'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: '@use',
                                    text: '사용'
                                },
                                {
                                    xtype: 'actioncolumn',
                                    hidden: true,
                                    width: 50,
                                    align: 'center',
                                    dataIndex: '@use',
                                    menuText: '사용',
                                    items: [
                                        {
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                if(r.get("@use") === 'on'){
                                                    return (r.raw.etc["@cross_spd"] === 'on')? "b_policy_on_cross":"b_policy_on";
                                                }else{
                                                    return (r.raw.etc["@cross_spd"] === 'on')? "b_policy_off_cross":"b_policy_off";
                                                }
                                            },
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {


                                                var rec = view.getStore().getAt(rowIndex);
                                                use = rec.get("@use");
                                                use = (use === "on")? "off":"on";


                                                var rule = {};

                                                rule["@use"] = use;
                                                rule["@uid"] = record.raw["@uid"];

                                                var _params = {
                                                    basename : Ext.encode('firewall_filter_ipv6'),
                                                    obj : Ext.encode(rule),
                                                    id_info : Ext.encode({'fieldname':'@uid'}),
                                                    num_info : Ext.encode({'fieldname':'@num'}),
                                                    update : Ext.encode(true)

                                                };



                                                request_helper.xmlrpc_call_JsonP('ftuctrl','setPolicy',_params,

                                                function(response){

                                                    var _store = Ext.data.StoreManager.lookup('store_spd_ipv6_list');
                                                    _store.load();


                                                });
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 80,
                                    dataIndex: '@uid',
                                    text: 'UID'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    dataIndex: 'src',
                                    text: '출발지'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    dataIndex: 'dest',
                                    text: '목적지'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 100,
                                    dataIndex: 'service',
                                    text: '서비스'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: '방향'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // return value["@action"];
                                    },
                                    width: 80,
                                    dataIndex: 'etc',
                                    text: '행위'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // return value["#text"];
                                    },
                                    dataIndex: 'header',
                                    text: '헤더',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // return value["#text"];
                                    },
                                    dataIndex: 'schedule',
                                    text: '스케쥴',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'QoS'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // return value["@timeout"];
                                    },
                                    width: 80,
                                    dataIndex: 'etc',
                                    text: '타임아웃'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // metaData.tdAttr = 'data-qtip="' + value["@loglevel"] + '"';
                                        // return '<div class="lv '+ value["@loglevel"] +'"/>';
                                    },
                                    width: 65,
                                    dataIndex: 'etc',
                                    text: '로그레벨'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'DPI 사용'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: 'DPI 그룹'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    text: '생성시간'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // return (value)?unixTimeConvert(value,"","GMT"):"";
                                    },
                                    dataIndex: 'lasthit',
                                    text: 'LastHit',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        // return value["@date"] + " "+((value["@time"]!=="")?value["@time"]+":00":"");
                                    },
                                    dataIndex: 'expire',
                                    text: '정책유효기간',
                                    flex: 1
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    text: '설명',
                                    flex: 1
                                }
                            ],
                            viewConfig: {
                                getRowClass: function(record, rowIndex, rowParams, store) {
                                    // var rowcls = "";

                                    // if(record.get("@use") === "off"){
                                    //     rowcls = "stOff";
                                    // }else if(record.raw.etc["@action"]==="Deny"){
                                    //     rowcls = "stDeny";
                                    // }else if(record.raw.etc["@action"]==="IPSec"){
                                    //     rowcls = "stIPSec";
                                    // }

                                    //     Ext.Function.defer(function(){
                                    //         this.removeRowCls(rowIndex, 'x-grid-row-alt');
                                    //     },100, this);

                                    //     return rowcls;
                                }
                            },
                            selModel: Ext.create('Ext.selection.CheckboxModel', {
                                checkOnly: true,
                                listeners: {
                                    selectionchange: {
                                        fn: me.onCheckboxModelSelectionChange,
                                        scope: me
                                    }
                                }
                            })
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onNFW2_firewall_filtering_ipv4FilteringAfterRender: function(component, eOpts) {

        // var me = this;
        // request_helper.xmlrpc_call_JsonP('ftuctrl','getFileContent', { filename : Ext.encode('/proc/ferret/datasheet/spd_rule_line')},
        //      function(response){
        //          me.max = response[0];
        //      }
        // );

        // request_helper.xmlrpc_call_JsonP('ftuctrl','get_license_info', {},
        //      function(response){
        //          me.license = response.module;
        //      }
        // );


        // me.filter = false;
        // me.get_list();


        var me = this;
        console.log('me', me);
        console.log('component', component);
        console.log('eOpts', eOpts);
    },

    onBtn_insertClick: function(button, e, eOpts) {
        // var me = Ext.getCmp('pnl_policy_ipv6_filtering');

        // console.log(me._kind);

        // var _spd_kind = me.fn_KindMatch(me._kind);

        // var _params = {
        //     kind : Ext.encode(_spd_kind)
        // };

        // request_helper.xmlrpc_call_Ajax_Post(
        //     'ftSMC',
        //     'getRuleDefault',
        //     _params,
        //     function(response){

        //         console.log('getRuleDefault', response);

        // //         var _pwin = createEditWin(_type, _win_title, _rule_list_store, _pos, _spd_kind, response);
        // //         _pwin.show();
        //     }
        // );

        Ext.create('SMC.view.win_policy_ipv6_setting').show();

    },

    onButtonClick3: function(button, e, eOpts) {

    },

    onButtonClick4: function(button, e, eOpts) {

    },

    onButtonClick5: function(button, e, eOpts) {

    },

    onPanelAfterRender: function(component, eOpts) {
        var me = this;
        var _protocol = me.query('combobox[itemId=cb_policy_protocol]')[0];

        var _stor = Ext.create('Ext.data.Store', {
            fields : ['id', 'text'],
            data : PROTOCOL_LIST
        });

        _protocol.bindStore(_stor);


    },

    onCheckboxModelSelectionChange: function(model, selected, eOpts) {

    },

    get_list: function() {
        var _store = Ext.data.StoreManager.lookup('store_spd_ipv6_list');
        _store.getProxy().url = "/api/ftuctrl/getObjects";
        _store.getProxy().setExtraParam("basename",  Ext.encode("firewall_filter_ipv6"));
        _store.getProxy().setExtraParam('filter_info',Ext.encode([]));
        _store.load();

        return _store.getTotalCount();
    },

    export_rule: function(id) {
        var currentDate = new Date();

        var fileName = Ext.Date.format(currentDate, 'Ymd')+"_"+currentDate.getHours()+currentDate.getMinutes()+currentDate.getSeconds()+"_MyNFW_IPv6Filtering."+id;

        var path = '/mnt/ramdisk/do/F3view/nodeapps/deploy/public/javascripts/attachments/';


        var _params = {
            basename : Ext.encode('firewall_filter_ipv6'),
            filename : Ext.encode(path+fileName)
        };

        showLoadMask();

        request_helper.xmlrpc_call_JsonP('ftuctrl','exportPolicyList', _params,
             function(response){
                 hideLoadMask();
                 console.log(response);
                document.location.href = '/fileDownloadCommon?filePath='+ Ext.encode(path)+"&fileName="+Ext.encode(fileName)+"&filePathFlag="+Ext.encode('true');
             }
        );
    },

    fn_KindMatch: function(source) {
        var targetList = [
            OBJECT_SPD_IP_V4_FILTER.TEXT,
            OBJECT_SPD_IP_V4_NAT.TEXT,
            OBJECT_SPD_IP_V6_FILTER.TEXT,
            OBJECT_SPD_IP_V6_NAT.TEXT,
            OBJECT_SPD_IPS.TEXT,
            OBJECT_SPD_WHITEBLACK.TEXT
        ];

        var i = 0;
        var _t = targetList[i];

        while(source.indexOf(_t) < 0){
            _t = targetList[++i];
        }

        return _t;
    }

});