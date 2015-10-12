
Ext.define('SMC4ZEN.view.pnl_xtm_waf_webserver', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_waf_webserverViewModel',
        'SMC4ZEN.view.ctn_network_controlclass',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.grid.column.Check',
        'Ext.grid.View',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],

    viewModel: {
        type: 'xtm_waf_webserver'
    },
    height: 680,
    id: 'pnl_xtm_waf_webserver',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: 'WAF',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'fieldset',
            height: 200,
            itemId: 'fds_waf_list',
            title: '웹서버 목록',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'ctn_network_controlclass1',
                    margin: '5, 0, 5, 0',
                    listeners: {
                        afterrender: 'onCtn_waf_controlAfterRender'
                    }
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_waf_waflist',
                    margin: '10, 0, 10, 0',
                    title: '',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'name',
                            text: '서버명',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'ip',
                            text: '서버 IP',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'domain',
                            text: '도메인 이름',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'port',
                            text: '포트',
                            flex: 1
                        },
                        {
                            xtype: 'checkcolumn',
                            dataIndex: 'wa',
                            text: '웹가속 사용',
                            flex: 0.7
                        }
                    ],
                    listeners: {
                        render: 'onGpn_waf_waflistRender',
                        select: 'onGpn_waf_waflistSelect',
                        deselect: 'onGpn_waf_waflistDeselect'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            hidden: true,
            itemId: 'ctn_waf_apply',
            margin: '0, 0, 10, 0',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_apply',
                    width: 100,
                    text: '설정 저장',
                    listeners: {
                        click: 'onBt_applyClick'
                    }
                }
            ]
        },
        {
            xtype: 'tabpanel',
            flex: 1,
            border: false,
            hidden: true,
            itemId: 'tpn_waf_setting',
            margin: '0, 0, 10, 0',
            activeTab: 0,
            items: [
                {
                    xtype: 'panel',
                    border: false,
                    itemId: 'pnl_waf_basic',
                    layout: 'fit',
                    title: '기본 설정',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_waf_basic',
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return DEVICE_WAF_ITEMNAME['id_' + value].ko;
                                    },
                                    dataIndex: '#text',
                                    text: '기본 설정',
                                    flex: 2
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@action',
                                    text: '차단',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@use',
                                    text: '동작',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 1) ? 'Normal' : '';
                                    },
                                    dataIndex: '@priority',
                                    text: '위험도',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    itemId: 'pnl_waf_http',
                    layout: 'fit',
                    title: 'HTTP Protocol 검사',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_waf_http',
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return DEVICE_WAF_ITEMNAME['id_' + value].ko;
                                    },
                                    dataIndex: '#text',
                                    text: 'HTTP Protocol 검사',
                                    flex: 2
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@action',
                                    text: '차단',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@use',
                                    text: '동작',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 1) ? 'Normal' : '';
                                    },
                                    dataIndex: '@priority',
                                    text: '위험도',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    itemId: 'pnl_waf_directory',
                    layout: 'fit',
                    title: '디렉토리 접근제어',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_waf_directory',
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return DEVICE_WAF_ITEMNAME['id_' + value].ko;
                                    },
                                    dataIndex: '#text',
                                    text: '디렉토리 접근제어',
                                    flex: 2
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@action',
                                    text: '차단',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@use',
                                    text: '동작',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 1) ? 'Normal' : '';
                                    },
                                    dataIndex: '@priority',
                                    text: '위험도',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    itemId: 'pnl_waf_inputvalue',
                    layout: 'fit',
                    title: '입력값 검증',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_waf_inputvalue',
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return DEVICE_WAF_ITEMNAME['id_' + value].ko;
                                    },
                                    dataIndex: '#text',
                                    text: '입력값 검증',
                                    flex: 2
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@action',
                                    text: '차단',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@use',
                                    text: '동작',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 1) ? 'Normal' : '';
                                    },
                                    dataIndex: '@priority',
                                    text: '위험도',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    itemId: 'pnl_waf_headbody',
                    layout: 'fit',
                    title: '헤더 / 본문 검사',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_waf_headbody',
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return DEVICE_WAF_ITEMNAME['id_' + value].ko;
                                    },
                                    dataIndex: '#text',
                                    text: '헤더 / 본문 검사',
                                    flex: 2
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@action',
                                    text: '차단',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@use',
                                    text: '동작',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 1) ? 'Normal' : '';
                                    },
                                    dataIndex: '@priority',
                                    text: '위험도',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    border: false,
                    itemId: 'pnl_waf_server',
                    layout: 'fit',
                    title: '서버 정보유출 검사',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_waf_server',
                            title: '',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return DEVICE_WAF_ITEMNAME['id_' + value].ko;
                                    },
                                    dataIndex: '#text',
                                    text: '서버 정보유출 검사',
                                    flex: 2
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@action',
                                    text: '차단',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'checkcolumn',
                                    dataIndex: '@use',
                                    text: '동작',
                                    flex: 0.5
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        return (value === 1) ? 'Normal' : '';
                                    },
                                    dataIndex: '@priority',
                                    text: '위험도',
                                    flex: 1
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: 'onTpn_waf_settingAfterRender'
            }
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_waf_webserverAfterRender',
        beforeclose: 'onPnl_xtm_waf_webserverBeforeClose'
    },

    onCtn_waf_controlAfterRender: function(component, eOpts) {
        // onCtn_waf_controlAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : 웹-서버를 추가, 수정, 삭제 작업을 진행합니다.
        //
        // ==============================================================================================================================================================================

        var bt_add = component.down('[itemId=bt_add]');
        var bt_mod = component.down('[itemId=bt_mod]');
        var bt_del = component.down('[itemId=bt_del]');

        var componentObj = this.componentStorage();

        var me = this;

        bt_add.on('click', function(){

            Ext.create('SMC4ZEN.view.win_xtm_waf_addserver', {

                'parent' : me

            }).show();

            reconfigNum(componentObj.gpn_waflist.getStore());

        });

        bt_mod.on('click', function(){

            if(!componentObj.gpn_waflist.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '수정할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            Ext.create('SMC4ZEN.view.win_xtm_waf_addserver', {

                'parent' : me,
                'selectRecord' : componentObj.gpn_waflist.getSelectionModel().getSelection()[0]

            }).show();

        });

        bt_del.on('click', function(){

            if(!componentObj.gpn_waflist.getSelectionModel().getSelection().length){

                Ext.Msg.show({

                    title : 'WeGuardia™ SMC 2.0',
                    msg : '삭제할 데이터를 선택하세요.',
                    buttons : Ext.Msg.OK,
                    icon : Ext.Msg.ERROR

                });

                return;

            }

            selectionGrid_Del(componentObj.gpn_waflist);

            reconfigNum(componentObj.gpn_waflist.getStore());

        });
    },

    onGpn_waf_waflistRender: function(component, eOpts) {
        // onGpn_waf_waflistRender =======================================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : WAF 서버리스트를 저장할 스토어를 추가합니다.
        //
        // ===============================================================================================================================================================================

        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_waflist',
            fields: [
                {
                    name: '@cid'
                },
                {
                    name: '@num'
                },
                {
                    name: '@tag'
                },
                {
                    name: '@zone'
                },
                {
                    name: 'desc'
                },
                {
                    name: 'domain'
                },
                {
                    name: 'ip'
                },
                {
                    name: 'name'
                },
                {
                    name: 'port'
                },
                {
                    name: 'wa'
                }
            ]

        }));
    },

    onGpn_waf_waflistSelect: function(rowmodel, record, index, eOpts) {
        // onGpn_waf_waflistSelect ======================================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : 추가된 웹-서버의 Row를 클릭시에
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 탭-패널 활성화 =================================================================================================================================================================

        component.ctn_wafapply.setVisible(true);

        component.tpn_wafset.setVisible(true);

        var waf_basic     = component.tpn_wafset.down('[itemId=pnl_waf_basic]').down('[itemId=gpn_waf_basic]');
        var waf_dir       = component.tpn_wafset.down('[itemId=pnl_waf_directory]').down('[itemId=gpn_waf_directory]');
        var waf_header    = component.tpn_wafset.down('[itemId=pnl_waf_headbody]').down('[itemId=gpn_waf_headbody]');
        var waf_http      = component.tpn_wafset.down('[itemId=pnl_waf_http]').down('[itemId=gpn_waf_http]');
        var waf_injection = component.tpn_wafset.down('[itemId=pnl_waf_inputvalue]').down('[itemId=gpn_waf_inputvalue]');
        var waf_outflow   = component.tpn_wafset.down('[itemId=pnl_waf_server]').down('[itemId=gpn_waf_server]');

        this.setWafData(deviceAllData.waf_basic, record, waf_basic.getStore());
        this.setWafData(deviceAllData.waf_dir, record, waf_dir.getStore());
        this.setWafData(deviceAllData.waf_header, record, waf_header.getStore());
        this.setWafData(deviceAllData.waf_http, record, waf_http.getStore());
        this.setWafData(deviceAllData.waf_injection, record, waf_injection.getStore());
        this.setWafData(deviceAllData.waf_outflow, record, waf_outflow.getStore());
    },

    onGpn_waf_waflistDeselect: function(rowmodel, record, index, eOpts) {
        // onGpn_waf_waflistDeselect =====================================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 :
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        component.ctn_wafapply.setVisible(false);

        component.tpn_wafset.setVisible(false);
    },

    onBt_applyClick: function(button, e, eOpts) {
        // onBt_applyClick ==============================================================================================================================================================
        //
        // 일시 : 2014.11.07
        //
        // 설명 : WAF 설정을 저장합니다.
        //
        // ==============================================================================================================================================================================

        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 0. SetLoadmask 실행

        this.setLoading(true);

        // 1. 저장할 서버의 CID 가져오기

        var selectRecord = component.gpn_waflist.getSelectionModel().getSelection()[0];

        // 2. 스토어의 데이터를 배열 -> 객체로 변환

        var waf_basic = this.getReverseWafData(component.gpn_basic.getStore(), selectRecord.raw['@cid']);
        var waf_http  = this.getReverseWafData(component.gpn_http.getStore(), selectRecord.raw['@cid']);
        var waf_dir   = this.getReverseWafData(component.gpn_dir.getStore(), selectRecord.raw['@cid']);
        var waf_input = this.getReverseWafData(component.gpn_input.getStore(), selectRecord.raw['@cid']);
        var waf_header = this.getReverseWafData(component.gpn_header.getStore(), selectRecord.raw['@cid']);
        var waf_server = this.getReverseWafData(component.gpn_server.getStore(), selectRecord.raw['@cid']);

        console.log('REVERSE WAF BASIC  -> ', waf_basic);
        console.log('REVERSE WAF HTTP   -> ', waf_http);
        console.log('REVERSE WAF DIR    -> ', waf_dir);
        console.log('REVERSE WAF INPUT  -> ', waf_input);
        console.log('REVERSE WAF HEADER -> ', waf_header);
        console.log('REVERSE WAF SERVER -> ', waf_server);

        // 3. CID 검색 후 데이터 수정

        for(var i = 0; i < deviceAllData.waf_basic.pattern.length; i++){

            if(deviceAllData.waf_basic.pattern[i]['@cid'] === selectRecord.get('@cid')){

                deviceAllData.waf_basic.pattern[i] = waf_basic;

                break;

            }

        }


        for(var i = 0; i < deviceAllData.waf_http.pattern.length; i++){

            if(deviceAllData.waf_http.pattern[i]['@cid'] === selectRecord.get('@cid')){

                deviceAllData.waf_http.pattern[i] = waf_http;

                break;

            }

        }

        for(var i = 0; i < deviceAllData.waf_dir.pattern.length; i++){

            if(deviceAllData.waf_dir.pattern[i]['@cid'] === selectRecord.get('@cid')){

                deviceAllData.waf_dir.pattern[i] = waf_dir;

                break;

            }

        }

        for(var i = 0; i < deviceAllData.waf_injection.pattern.length; i++){

            if(deviceAllData.waf_injection.pattern[i]['@cid'] === selectRecord.get('@cid')){

                deviceAllData.waf_injection.pattern[i] = waf_input;

                break;

            }

        }

        for(var i = 0; i < deviceAllData.waf_header.pattern.length; i++){

            if(deviceAllData.waf_header.pattern[i]['@cid'] === selectRecord.get('@cid')){

                deviceAllData.waf_header.pattern[i] = waf_header;

                break;

            }

        }

        for(var i = 0; i < deviceAllData.waf_outflow.pattern.length; i++){

            if(deviceAllData.waf_outflow.pattern[i]['@cid'] === selectRecord.get('@cid')){

                deviceAllData.waf_outflow.pattern[i] = waf_server;

                break;

            }

        }

        this.setLoading(false);
    },

    onTpn_waf_settingAfterRender: function(component, eOpts) {
        // onTpn_waf_settingAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : WAF 그리드에 사용되는 Store를 동적으로 연결합니다.
        //
        // ==============================================================================================================================================================================

        var waf_basic     = component.down('[itemId=pnl_waf_basic]').down('[itemId=gpn_waf_basic]');
        var waf_dir       = component.down('[itemId=pnl_waf_directory]').down('[itemId=gpn_waf_directory]');
        var waf_header    = component.down('[itemId=pnl_waf_headbody]').down('[itemId=gpn_waf_headbody]');
        var waf_http      = component.down('[itemId=pnl_waf_http]').down('[itemId=gpn_waf_http]');
        var waf_injection = component.down('[itemId=pnl_waf_inputvalue]').down('[itemId=gpn_waf_inputvalue]');
        var waf_outflow   = component.down('[itemId=pnl_waf_server]').down('[itemId=gpn_waf_server]');

        waf_basic.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_basic',
            fields: [
                {
                    name : '#text'
                },
                {
                    name : '@action'
                },
                {
                    name : '@use'
                },
                {
                    name : '@priority'
                }
            ]

        }));

        waf_dir.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_dir',
            fields: [
                {
                    name : '#text'
                },
                {
                    name : '@action'
                },
                {
                    name : '@use'
                },
                {
                    name : '@priority'
                }
            ]

        }));

        waf_header.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_header',
            fields: [
                {
                    name : '#text'
                },
                {
                    name : '@action'
                },
                {
                    name : '@use'
                },
                {
                    name : '@priority'
                }
            ]

        }));

        waf_http.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_http',
            fields: [
                {
                    name : '#text'
                },
                {
                    name : '@action'
                },
                {
                    name : '@use'
                },
                {
                    name : '@priority'
                }
            ]

        }));

        waf_injection.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_injection',
            fields: [
                {
                    name : '#text'
                },
                {
                    name : '@action'
                },
                {
                    name : '@use'
                },
                {
                    name : '@priority'
                }
            ]

        }));

        waf_outflow.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_waf_outflow',
            fields: [
                {
                    name : '#text'
                },
                {
                    name : '@action'
                },
                {
                    name : '@use'
                },
                {
                    name : '@priority'
                }
            ]

        }));
    },

    onPnl_xtm_waf_webserverAfterRender: function(component, eOpts) {
        // onPnl_xtm_waf_webserverAfterRender ============================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : WAF 웹 서버 데이터를 그리드에 출력합니다.
        //
        // 파라미터 :
        //
        // [0] waf_basic
        // [1] waf_dir
        // [2] waf_header
        // [3] waf_http
        // [4] waf_injection
        // [5] waf_outflow
        // [6] waf_webserver
        //
        // ===============================================================================================================================================================================

        var wafData = component.deviceParams;

        // 웹-서버 리스트 초기화 ============================================================================================================================================================

        if(wafData[6]){

            Ext.each(wafData[6].webserver, function(webserverData){

                var tmp = webserverData;

                tmp.wa = (tmp.wa['@chk_use'] === 'on') ? true : false;

                Ext.getStore('st_waf_waflist').add(tmp);

            });

        }
    },

    onPnl_xtm_waf_webserverBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_waf_webserverBeforeClose ============================================================================================================================================
        //
        // 일시 : 2014.10.27
        //
        // 설명 : WAF 화면이 닫히기 전 데이터 유효성 검사와 데이터를 임시 저장합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    getReverseWafData: function(store, cid) {
        // getReverseWafData =============================================================================================================================================================
        //
        // 일시 : 2014.11.07
        //
        // 설명 : 배열로 되어있는 WAF 데이터를 객체로 원상복구합니다.
        //
        // ===============================================================================================================================================================================

        var waf_object = {};

        // 데이터 저장 전 스토어의 수정된 데이터를 모두 동기화 합니다. =============================================================================================================================

        store.sync();

        for(var i = 0; i < store.count(); i++){

            waf_object['id_' + store.getAt(i).get('#text')] = {};

            waf_object['id_' + store.getAt(i).get('#text')]['#text']   = store.getAt(i).get('#text');
            waf_object['id_' + store.getAt(i).get('#text')]['@action'] = (store.getAt(i).get('@action') === true) ? 'deny' : 'pass';
            waf_object['id_' + store.getAt(i).get('#text')]['@use']    = (store.getAt(i).get('@use') === true) ? 'on' : 'off';
            waf_object['id_' + store.getAt(i).get('#text')]['@priority'] = store.getAt(i).get('@priority');

        }

        waf_object['@cid'] = cid;

        return waf_object;
    },

    componentStorage: function() {
        var obj = {};

        var fds_waflist = this.down('[itemId=fds_waf_list]');
        var ctn_wafapply = this.down('[itemId=ctn_waf_apply]');
        var tpn_wafset  = this.down('[itemId=tpn_waf_setting]');

        obj.ctn_wafapply = ctn_wafapply;

        obj.gpn_waflist = fds_waflist.down('[itemId=gpn_waf_waflist]');

        obj.tpn_wafset  = tpn_wafset;

        // WAF 설정 그리드 =================================================================================================================================================================

        obj.gpn_basic  = tpn_wafset.down('[itemId=pnl_waf_basic]').down('[itemId=gpn_waf_basic]');
        obj.gpn_http   = tpn_wafset.down('[itemId=pnl_waf_http]').down('[itemId=gpn_waf_http]');
        obj.gpn_dir    = tpn_wafset.down('[itemId=pnl_waf_directory]').down('[itemId=gpn_waf_directory]');
        obj.gpn_input  = tpn_wafset.down('[itemId=pnl_waf_inputvalue]').down('[itemId=gpn_waf_inputvalue]');
        obj.gpn_header = tpn_wafset.down('[itemId=pnl_waf_headbody]').down('[itemId=gpn_waf_headbody]');
        obj.gpn_server = tpn_wafset.down('[itemId=pnl_waf_server]').down('[itemId=gpn_waf_server]');

        return obj;
    },

    setWafData: function(params, record, store) {
        // setWafData ===================================================================================================================================================================
        //
        // 일시 : 2014.10.29
        //
        // 설명 : 웹서버의 CID와 일치하는 WAF 데이터를 검색하여 설정 그리드의 스토어에 Load 합니다.
        //
        // 수정 :
        //
        // (2014.11.07 김민수 - @cid도 스토어에 저장되도록 변경)
        //
        // ==============================================================================================================================================================================

        var wafData = [];

        // 0. WAF 파라미터 null 검사

        if(params){

            for(var i = 0; i < params.pattern.length; i++){

        // 1. WAF 데이터와 웹-서버 CID 일치하는지 조사

                if(params.pattern[i]['@cid'] === record.data['@cid']){

        // 2. 일치하면 WAF 객체의 키 이름을 배열로 분리 ※ 참고 - Object.getOwnPropertyNames 메서드는 리턴의 순서를 보장하지 않기 때문에 sort 메서드로 재정렬함

                    var wafArray = Object.getOwnPropertyNames(params.pattern[i]).sort();

        // 3. 분리한 키 이름으로 객체를 배열로 변환

                    for(var j = 0; j < wafArray.length; j++){

                        if(wafArray[j] === '@cid')	continue;

                        var tmp = callByValueObject(params.pattern[i][wafArray[j]]);

        // 4. 체크박스 값 타입이 string 이면 bool 형태로 변경

                        if(typeof tmp['@use'] === 'string' || typeof tmp['@action'] === 'string'){

                            tmp['@use'] = (params.pattern[i][wafArray[j]]['@use'] === 'on') ? true : false;
                            tmp['@action'] = (params.pattern[i][wafArray[j]]['@action'] === 'deny') ? true : false;

                        }

        // 5. 스토어에 로드할 데이터 배열에 추가

                        wafData.push(tmp);

                    }

        // 6. 스토어 로드

                    store.loadData(wafData);

                    break;

                }

            }

        }
    },

    saveData: function() {
        // saveWafServer ===============================================================================================================================================================
        //
        // 일시 : 2014.11.12
        //
        // 설명 : WAF 설정을 저장합니다.
        //
        // 파라미터 :
        //
        // [0] waf_basic
        // [1] waf_dir
        // [2] waf_header
        // [3] waf_http
        // [4] waf_injection
        // [5] waf_outflow
        // [6] waf_webserver
        //
        // =============================================================================================================================================================================

        var componentObj  = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 웹-서버 리스트 저장 ============================================================================================================================================================

        var serverStore = componentObj.gpn_waflist.getStore();

        if(serverStore.count() <= 0){

            if(deviceAllData.waf_webserver){

                delete deviceAllData.waf_webserver.webserver;

                deviceAllData.waf_webserver = null;

            }

        }
        else{

            var serverArray = [];

            if(!deviceAllData.waf_webserver){

                deviceAllData.waf_webserver = {};

            }

            for(var i = 0; i < serverStore.count(); i++){

                var tmp = serverStore.getAt(i).data;

                tmp.wa = {	'@chk_use' : (serverStore.getAt(i).data.wa === true) ? 'on' : 'off'	};

                console.log('tmp -> ', tmp);

                serverArray.push(tmp);

            }

            deviceAllData.waf_webserver.webserver = serverArray;

        }

        return true;
    }

});