
Ext.define('SMC.view.win_xtm_waf_addserver', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_xtm_waf_addserver',

    requires: [
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    height: 255,
    id: 'win_xtm_waf_addserver',
    width: 700,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '웹 서버 추가',
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
                    itemId: 'ctn_waf_main',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_waf_west',
                            margin: '0, 50, 0, 0',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'ck_useweb',
                                    fieldLabel: '웹가속 사용',
                                    labelWidth: 90,
                                    boxLabel: ''
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_name',
                                    margin: '0, 0, 10, 0',
                                    fieldLabel: '서버명',
                                    labelWidth: 90
                                },
                                {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        if(!validIPForm(value, 'v4')){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_ip',
                                    margin: '0, 0, 10, 0',
                                    fieldLabel: '서버 IP',
                                    labelWidth: 90
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_domain',
                                    margin: '0, 0, 10, 0',
                                    fieldLabel: '도메인 이름',
                                    labelWidth: 90
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_desc',
                                    margin: '0, 0, 10, 0',
                                    fieldLabel: '기타 설명',
                                    labelWidth: 90
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            height: 123,
                            itemId: 'ctn_waf_port',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    itemId: 'ctn_waf_port',
                                    margin: '0, 0, 10, 0',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            validator: function(value) {
                                                if(!LengthCheck(value, 1, 65535)){

                                                    return false;

                                                }

                                                return true;
                                            },
                                            flex: 1,
                                            itemId: 'nfd_port',
                                            margin: '0, 5, 0, 0',
                                            fieldLabel: '포트',
                                            labelWidth: 50,
                                            enableKeyEvents: true
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'bt_add',
                                            width: 100,
                                            text: '추 가',
                                            listeners: {
                                                click: {
                                                    fn: me.onBt_addClick,
                                                    scope: me
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridpanel',
                                    flex: 1,
                                    itemId: 'gpn_waf_port',
                                    title: '',
                                    hideHeaders: true,
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            align: 'center',
                                            dataIndex: 'port',
                                            text: '포트 목록',
                                            flex: 0.8
                                        },
                                        {
                                            xtype: 'actioncolumn',
                                            align: 'center',
                                            flex: 0.2,
                                            items: [
                                                {
                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                        // remove handler ================================================================================================================================================================
                                                        //
                                                        // 일시 : 2014.10.27
                                                        //
                                                        // 설명 :
                                                        //
                                                        // ===============================================================================================================================================================================

                                                        var store = Ext.getStore('st_waf_port');

                                                        store.removeAt(rowIndex);
                                                    },
                                                    iconCls: 'ico_grid_row_delete'
                                                }
                                            ]
                                        }
                                    ],
                                    listeners: {
                                        render: {
                                            fn: me.onGpn_waf_portRender,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_waf_control',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_save',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '저 장',
                            listeners: {
                                click: {
                                    fn: me.onBt_saveClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_close',
                            width: 100,
                            text: '취 소',
                            listeners: {
                                click: {
                                    fn: me.onBt_closeClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_xtm_waf_addserverAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick =================================================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : 웹서버가 사용하는 포트를 입력합니다.
        //
        // ===============================================================================================================================================================================

        var store = Ext.getStore('st_waf_port');

        var nfd_port = button.up().down('[itemId=nfd_port]');

        if(!this.validityCheck().blankCheck(nfd_port) || !this.validityCheck().validateCheck(nfd_port, '포트의 범위는 1~65535 입니다.') ||
           !this.validityCheck().duplicateCheck('add', nfd_port.getValue(), null, 'port', 'st_waf_port', '같은 포트가 등록되어 있습니다.')){

            return;

        }

        store.add({	'port' : nfd_port.getValue() });
    },

    onGpn_waf_portRender: function(component, eOpts) {
        // onGpn_waf_portRender ==========================================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : WAF 포트를 저장할 스토어를 생성하여 그리드에 연결합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_port',
            fields: [
                {
                    name: 'port'
                }
            ]

        }));
    },

    onBt_saveClick: function(button, e, eOpts) {
        // onBt_saveClick ==============================================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : 웹 서버에 필요한 데이터를 저장합니다.
        //
        // 추가설명 : ADD 기능이 동작하면 다음 키값에 데이터를 생성합니다. 수정에서는 키값을 따로 생성하거나 수정하지 않습니다.
        //
        // waf_basic.pattern     = [{	웹서버의 CID	}];
        // waf_dir.pattern       = [{	웹서버의 CID	}];
        // waf_header.pattern    = [{	웹서버의 CID	}];
        // waf_http.pattern      = [{	웹서버의 CID	}];
        // waf_injection.pattern = [{	웹서버의 CID	}];
        // waf_outflow.pattern   = [{	웹서버의 CID	}];
        // waf_webserver.pattern = [{	웹서버의 CID	}];
        //
        // =============================================================================================================================================================================

        var component = this.componentStorage();

        var obj = {};

        var serverCid = getUuid();

        var portStore = component.gpn_port.getStore();

        var gpn_wafServer = this.parent.down('[itemId=fds_waf_list]').down('[itemId=gpn_waf_waflist]');

        // 유효성 검사 수행 ==============================================================================================================================================================

        if(!this.validityCheck().blankCheck(component.webname) || !this.validityCheck().blankCheck(component.webip) || !this.validityCheck().blankCheck(component.webdomain) ||
           !this.validityCheck().validateCheck(component.webip, 'IP 형식이 맞지 않습니다.')  || !this.validityCheck().storeEmptyCheck('st_waf_port', '포트는 필수 입력 항목입니다.')){

            return false;

        }

        // 추가할 객체 생성 ==============================================================================================================================================================

        if(!this.selectRecord){

            obj['@cid'] = serverCid;
            obj['@num'] = 0;

        }

        obj['@tag'] = '';
        obj['@zone'] = null;
        obj.domain = component.webdomain.getValue();
        obj.ip = component.webip.getValue();
        obj.name = component.webname.getValue();
        obj.desc = component.webdesc.getValue();
        obj.wa = component.webaccel.getValue();

        var portValue = null;

        // Port의 갯수는 최소 1개 입니다. 비워둘 수 없습니다. ================================================================================================================================

        if(portStore.count() === 1){

            portValue = Number(portStore.getAt(0).get('port'));

        }
        else{

            var tmp = '';

            for(var i = 0; i < portStore.count(); i++){

                tmp += String(portStore.getAt(i).get('port')) + ',';

            }

            portValue = tmp.substring(0, tmp.length - 1);

        }

        obj.port = portValue;

        // 서버 스토어에 추가, 수정 =======================================================================================================================================================

        if(!this.selectRecord){

            gridData_Add(gpn_wafServer, obj);

            reconfigNum(gpn_wafServer.getStore());

        // 추가된 서버에 대한 waf 데이터 구성 ==============================================================================================================================================

            createInitWafData(serverCid);

        }
        else{

            selectionGrid_Mod(gpn_wafServer, obj);

        }

        this.destroy();
    },

    onBt_closeClick: function(button, e, eOpts) {
        // onBt_closeClick ===============================================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : 추가, 수정 팝업을 종료합니다.
        //
        // ===============================================================================================================================================================================

        this.destroy();
    },

    onWin_xtm_waf_addserverAfterRender: function(component, eOpts) {
        // onWin_xtm_waf_addserverAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : Web 서버의 데이터를 컴포넌트에 설정합니다.
        //
        // ===============================================================================================================================================================================

        // 컴포넌트 Row 데이터를 수정 시 데이터를 스토어에 초기화 ================================================================================================================================

        var wafserverData = component.selectRecord;

        var componentObj = this.componentStorage();

        if(wafserverData){

            componentObj.webname.setValue(wafserverData.data.name);
            componentObj.webaccel.setValue(wafserverData.data.wa);
            componentObj.webip.setValue(wafserverData.data.ip);
            componentObj.webdomain.setValue(wafserverData.data.domain);
            componentObj.webdesc.setValue(wafserverData.data.desc);

            if(typeof wafserverData.data.port === 'string'){

                Ext.each(wafserverData.data.port.split(','), function(port){

                    componentObj.gpn_port.getStore().add({	'port' : port	});

                });

            }
            else{

                componentObj.gpn_port.getStore().add({	'port' : wafserverData.data.port	});

            }

        }
    },

    componentStorage: function() {
        var obj = {};

        var ctn_main = this.down('[itemId=ctn_waf_main]');

        var ctn_west = ctn_main.down('[itemId=ctn_waf_west]');
        var ctn_port = ctn_main.down('[itemId=ctn_waf_port]');

        obj.webname  = ctn_west.down('[itemId=txf_name]');
        obj.webaccel = ctn_west.down('[itemId=ck_useweb]');
        obj.webip    = ctn_west.down('[itemId=txf_ip]');
        obj.webdomain = ctn_west.down('[itemId=txf_domain]');
        obj.webdesc  = ctn_west.down('[itemId=txf_desc]');

        obj.gpn_port = ctn_port.down('[itemId=gpn_waf_port]');

        return obj;
    },

    validityCheck: function() {
        // validityCheck ===============================================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : WAF 웹서버 추가에 필요한 유효성 검사를 정의합니다.
        //
        // =============================================================================================================================================================================

        var component   = this.componentStorage();

        var validCheckObj = {

            'blankCheck' : function(component){

                var argument = (arguments[1] === undefined) ? true : arguments[1];

                if(component.getXType() === 'textfield'){

                    if(component.getValue() === '' && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn' : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }
                else{

                    if(component.getValue() === null && argument){

                        Ext.Msg.show({

                            'title' : 'WeGuardia™ SMC 2.0',
                            'msg' : '필수 입력 항목입니다.',
                            'buttons' : Ext.Msg.OK,
                            'icon' : Ext.Msg.ERROR,
                            'fn' : function(res){

                                component.focus();

                            }

                        });

                        return false;

                    }

                }

                return true;

            },
            'validateCheck' : function(component, msg){

                var argument = (arguments[2] === undefined) ? true : arguments[2];

                if(!component.validate() && argument){

                    Ext.Msg.show({

                        'title' : 'WeGuardia™ SMC 2.0',
                        'msg' : msg,
                        'buttons' : Ext.Msg.OK,
                        'icon' : Ext.Msg.ERROR,
                        'fn' : function(res){

                            component.focus();

                        }

                    });

                    return false;

                }

                return true;

            },
            'storeEmptyCheck' : function(storeId, msg){

                var storeObj = Ext.getStore(storeId);

                if(storeObj){

                    if(storeObj.count() <= 0){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                }
                else{

                    console.log('Store Object Undefined!!');

                    return false;

                }

                return true;

            },
            'duplicateCheck' : function(mode, value, value2, field, storeid, msg){

                var modeValue = mode || 'add';

                if(mode === 'add'){

                    if(!duplicationItem(value, field, storeid)){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }
                else{

                    if(!duplicationItem(value, field, storeid) && value !== value2){

                        Ext.Msg.show({

                            title : 'WeGuardia™ SMC 2.0',
                            msg : msg,
                            buttons : Ext.Msg.OK,
                            icon : Ext.Msg.ERROR

                        });

                        return false;

                    }

                    return true;

                }

            }

        };

        return validCheckObj;
    }

});