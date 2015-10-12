
Ext.define('SMC.view.pnl_rtm_main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rtm_main',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.field.Display',
        'Ext.form.field.Number',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.grid.RowNumberer',
        'Ext.form.field.Date'
    ],

    tick: 5000,
    border: false,
    height: 1000,
    id: 'pnl_rtm_main',
    layout: 'border',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    flex: 8,
                    region: 'center',
                    id: 'pnl_rtm_device',
                    layout: 'fit',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            border: false,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'txf_rtm_state_all',
                                    fieldLabel: '전체 장비',
                                    labelAlign: 'right',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txf_rtm_state_normal',
                                    fieldLabel: '정상동작',
                                    labelAlign: 'right',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txf_rtm_state_no_response',
                                    fieldLabel: '응답없음',
                                    labelAlign: 'right',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txf_rtm_state_line_error',
                                    fieldLabel: '회선장애',
                                    labelAlign: 'right',
                                    labelWidth: 60
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'txf_rtm_state_login_fail',
                                    fieldLabel: '로그인 실패',
                                    labelAlign: 'right',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'container',
                                    flex: 1
                                },
                                {
                                    xtype: 'numberfield',
                                    id: 'txf_rtm_interval',
                                    width: 200,
                                    fieldLabel: '업데이트 주기(초)',
                                    labelWidth: 120,
                                    value: 10,
                                    enableKeyEvents: true,
                                    maxValue: 600,
                                    minValue: 0,
                                    listeners: {
                                        focus: {
                                            fn: me.onTxf_rtm_intervalFocus,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    width: 60,
                                    text: '변경',
                                    listeners: {
                                        click: {
                                            fn: me.onButtonClick1,
                                            scope: me
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    refreshObstacle: function() {
                        // refreshObstacle ========================================================================================================================================================
                        //
                        // 일시 : 2015.01.17
                        //
                        // 설명 : 장애장비의 목록을 새로 고치는 타이머를 동작합니다.
                        //
                        // 수정 :
                        //
                        // - (2015.01.17 김민수 : 타이머 기능을 동작시키는 메서드 정의)
                        //
                        // ========================================================================================================================================================================

                        var obstacleObj = Ext.getCmp('gpn_rtm_obstacle');

                        // 타이머가 이미 설정되어있다면 타이머 종료

                        if(obstacleObj.refreshObj){

                            clearInterval(obstacleObj.refreshObj);

                        }

                        // 타이머 동작

                        var tick = Ext.getCmp('txf_rtm_interval').getValue();

                        obstacleObj.refreshObj = setInterval(refreshObstacle, (tick === null) ? 10 * 1000 : tick * 1000);

                        // 장비장애 타이머 콜백 메서드

                        function refreshObstacle(){

                            var obstacle_grid = Ext.getCmp('gpn_rtm_obstacle');

                            obstacle_grid.selectRecords = obstacle_grid.getSelectionModel().getSelection();

                            var obstacle_array = [];

                            for(i = 0; i < obstacle_grid.selectRecords.length; i++){

                                obstacle_array.push(obstacle_grid.getStore().indexOf(obstacle_grid.selectRecords[i]));

                            }

                            obstacle_grid.selectIndex = obstacle_array;

                            Ext.Ajax.request({

                                url : '/api/ftRTM/SeekObstacle',
                                params : {

                                    noresponse : Ext.getCmp('btn_rtm_error').pressed,
                                    warning : Ext.getCmp('btn_rtm_warning').pressed,
                                    other : Ext.getCmp('btn_rtm_other').pressed,
                                    login : Ext.getCmp('btn_rtm_login').pressed

                                },
                                success : function(res_data){
                                    var resObj = JSON.parse(res_data.responseText);
                                    Ext.getStore('st_rtm_obstacle').loadData(resObj);
                                }
                            }
                            );
                        }
                    },
                    refreshObj: null,
                    flex: 2,
                    region: 'east',
                    split: true,
                    itemId: 'gpn_rtm_obstacle',
                    width: 137,
                    layout: 'fit',
                    collapsed: true,
                    collapsible: true,
                    title: '장애현황',
                    dockedItems: [
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            id: 'tlb_rtm_obstacle',
                            items: [
                                {
                                    xtype: 'button',
                                    toggleHandler: function(button, state) {
                                        Ext.Ajax.request(
                                        {
                                            url : '/api/ftRTM/SeekObstacle',
                                            params : {
                                                noresponse : Ext.getCmp('btn_rtm_error').pressed,
                                                warning : Ext.getCmp('btn_rtm_warning').pressed,
                                                other : Ext.getCmp('btn_rtm_other').pressed,
                                                login : Ext.getCmp('btn_rtm_login').pressed
                                            },
                                            success : function(res_data)
                                            {
                                                var resObj = JSON.parse(res_data.responseText);
                                                Ext.getStore('st_rtm_obstacle').loadData(resObj);
                                            }
                                        }
                                        );
                                    },
                                    cls: 'ico_2u_24px_block',
                                    height: 28,
                                    id: 'btn_rtm_error',
                                    width: 28,
                                    enableToggle: true,
                                    pressed: true,
                                    tooltip: '응답없음'
                                },
                                {
                                    xtype: 'button',
                                    toggleHandler: function(button, state) {
                                        Ext.Ajax.request(
                                        {
                                            url : '/api/ftRTM/SeekObstacle',
                                            params : {
                                                noresponse : Ext.getCmp('btn_rtm_error').pressed,
                                                warning : Ext.getCmp('btn_rtm_warning').pressed,
                                                other : Ext.getCmp('btn_rtm_other').pressed,
                                                login : Ext.getCmp('btn_rtm_login').pressed
                                            },
                                            success : function(res_data)
                                            {
                                                var resObj = JSON.parse(res_data.responseText);
                                                Ext.getStore('st_rtm_obstacle').loadData(resObj);
                                            }
                                        }
                                        );
                                    },
                                    cls: 'ico_2u_24px_alert',
                                    height: 28,
                                    id: 'btn_rtm_warning',
                                    width: 28,
                                    enableToggle: true,
                                    pressed: true,
                                    tooltip: '회선장애'
                                },
                                {
                                    xtype: 'button',
                                    toggleHandler: function(button, state) {
                                        Ext.Ajax.request(
                                        {
                                            url : '/api/ftRTM/SeekObstacle',
                                            params : {
                                                noresponse : Ext.getCmp('btn_rtm_error').pressed,
                                                warning : Ext.getCmp('btn_rtm_warning').pressed,
                                                other : Ext.getCmp('btn_rtm_other').pressed,
                                                login : Ext.getCmp('btn_rtm_login').pressed
                                            },
                                            success : function(res_data)
                                            {
                                                var resObj = JSON.parse(res_data.responseText);
                                                Ext.getStore('st_rtm_obstacle').loadData(resObj);
                                            }
                                        }
                                        );
                                    },
                                    cls: 'ico_2u_24px_unfit',
                                    height: 28,
                                    id: 'btn_rtm_login',
                                    width: 28,
                                    enableToggle: true,
                                    pressed: true,
                                    tooltip: '로그인 실패'
                                },
                                {
                                    xtype: 'button',
                                    toggleHandler: function(button, state) {
                                        Ext.Ajax.request(
                                        {
                                            url : '/api/ftRTM/SeekObstacle',
                                            params : {
                                                noresponse : Ext.getCmp('btn_rtm_error').pressed,
                                                warning : Ext.getCmp('btn_rtm_warning').pressed,
                                                other : Ext.getCmp('btn_rtm_other').pressed,
                                                login : Ext.getCmp('btn_rtm_login').pressed
                                            },
                                            success : function(res_data)
                                            {
                                                var resObj = JSON.parse(res_data.responseText);
                                                Ext.getStore('st_rtm_obstacle').loadData(resObj);
                                            }
                                        }
                                        );
                                    },
                                    cls: 'ico_2u_24px_unaccredited',
                                    height: 28,
                                    id: 'btn_rtm_other',
                                    width: 28,
                                    enableToggle: true,
                                    pressed: true,
                                    tooltip: '다른 RTM에서 사용중'
                                }
                            ]
                        }
                    ],
                    items: [
                        {
                            xtype: 'gridpanel',
                            viewConfig: {
                                loadMask: false
                            },
                            id: 'gpn_rtm_obstacle',
                            autoScroll: true,
                            title: '',
                            store: 'st_rtm_obstacle',
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        if (record.get('state') === '응답없음')
                                        metaData.tdCls = 'ico_2u_block';

                                        if (record.get('state') === '회선장애')
                                        metaData.tdCls = 'ico_2u_alert';

                                        if (record.get('state') === '로그인 실패')
                                        metaData.tdCls = 'ico_2u_unfit';

                                        if (record.get('state') === '다른 RTM에서 사용중')
                                        metaData.tdCls = 'ico_2u_unaccredited';

                                        return value;
                                    },
                                    width: 160,
                                    dataIndex: 'name',
                                    text: '장비명'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 120,
                                    dataIndex: 'gate_ip',
                                    text: 'IP 주소'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'state',
                                    text: '장애 내용'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 160,
                                    dataIndex: 'occur',
                                    text: '장애 발생 시간'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    width: 140,
                                    dataIndex: 'pass',
                                    text: '장애 경과 시간'
                                }
                            ],
                            viewConfig: {
                                id: 'gdv_rtm_obstacle',
                                preserveScrollOnRefresh: true,
                                listeners: {
                                    refresh: {
                                        fn: me.onGdv_rtm_obstacleRefresh,
                                        scope: me
                                    }
                                }
                            }
                        }
                    ],
                    listeners: {
                        collapse: {
                            fn: me.onGpn_rtm_obstacle_Collapse,
                            scope: me
                        },
                        expand: {
                            fn: me.onGpn_rtm_obstacle_Expand,
                            scope: me
                        }
                    }
                },
                {
                    xtype: 'panel',
                    time: 0,
                    region: 'south',
                    split: true,
                    height: 300,
                    hidden: true,
                    id: 'pnl_rtm_event',
                    layout: 'fit',
                    collapsed: true,
                    collapsible: true,
                    title: '시스템 로그',
                    listeners: {
                        afterrender: {
                            fn: me.onPnl_rtm_eventAfterRender,
                            scope: me
                        }
                    },
                    items: [
                        {
                            xtype: 'tabpanel',
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    layout: 'fit',
                                    title: '시스템 로그',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            id: 'gpn_rtm_event',
                                            store: 'st_rtm_event',
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                // 2015.01.19 김민수 - 요청에 의해 SeekEventLog 이벤트 주석처리

                                                                // Ext.Ajax.request(
                                                                //         {
                                                                //             url : '/api/ftRTM/SeekEventLog',
                                                                //             params : {
                                                                //                 ts : Ext.getCmp('pnl_rtm_event').time,
                                                                //                 info : Ext.getCmp('bt_rtm_information').pressed,
                                                                //                 warning : Ext.getCmp('bt_rtm_warning').pressed,
                                                                //                 critical : Ext.getCmp('bt_rtm_critical').pressed,
                                                                //                 device : Ext.getCmp('bt_rtm_device').pressed
                                                                //             },
                                                                //             success : function(res_data)
                                                                //             {
                                                                //                 var resObj = JSON.parse(res_data.responseText);
                                                                //                 Ext.getStore('st_rtm_event').loadData(resObj);
                                                                //             }
                                                                //         }
                                                                //     );
                                                            },
                                                            id: 'bt_rtm_information',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_information',
                                                            pressed: true,
                                                            text: '정보',
                                                            textAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                // 2015.01.19 김민수 - 요청에 의해 SeekEventLog 이벤트 주석처리

                                                                // Ext.Ajax.request(
                                                                //         {
                                                                //             url : '/api/ftRTM/SeekEventLog',
                                                                //             params : {
                                                                //                 ts : Ext.getCmp('pnl_rtm_event').time,
                                                                //                 info : Ext.getCmp('bt_rtm_information').pressed,
                                                                //                 warning : Ext.getCmp('bt_rtm_warning').pressed,
                                                                //                 critical : Ext.getCmp('bt_rtm_critical').pressed,
                                                                //                 device : Ext.getCmp('bt_rtm_device').pressed
                                                                //             },
                                                                //             success : function(res_data)
                                                                //             {
                                                                //                 var resObj = JSON.parse(res_data.responseText);
                                                                //                 Ext.getStore('st_rtm_event').loadData(resObj);
                                                                //             }
                                                                //         }
                                                                //     );
                                                            },
                                                            id: 'bt_rtm_warning',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_warning',
                                                            pressed: true,
                                                            text: '경고',
                                                            textAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                // 2015.01.19 김민수 - 요청에 의해 SeekEventLog 이벤트 주석처리

                                                                // Ext.Ajax.request(
                                                                //         {
                                                                //             url : '/api/ftRTM/SeekEventLog',
                                                                //             params : {
                                                                //                 ts : Ext.getCmp('pnl_rtm_event').time,
                                                                //                 info : Ext.getCmp('bt_rtm_information').pressed,
                                                                //                 warning : Ext.getCmp('bt_rtm_warning').pressed,
                                                                //                 critical : Ext.getCmp('bt_rtm_critical').pressed,
                                                                //                 device : Ext.getCmp('bt_rtm_device').pressed
                                                                //             },
                                                                //             success : function(res_data)
                                                                //             {
                                                                //                 var resObj = JSON.parse(res_data.responseText);
                                                                //                 Ext.getStore('st_rtm_event').loadData(resObj);
                                                                //             }
                                                                //         }
                                                                //     );
                                                            },
                                                            id: 'bt_rtm_critical',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_critical',
                                                            pressed: true,
                                                            text: '중요',
                                                            textAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                // 2015.01.19 김민수 - 요청에 의해 SeekEventLog 이벤트 주석처리

                                                                // Ext.Ajax.request(
                                                                //         {
                                                                //             url : '/api/ftRTM/SeekEventLog',
                                                                //             params : {
                                                                //                 ts : Ext.getCmp('pnl_rtm_event').time,
                                                                //                 info : Ext.getCmp('bt_rtm_information').pressed,
                                                                //                 warning : Ext.getCmp('bt_rtm_warning').pressed,
                                                                //                 critical : Ext.getCmp('bt_rtm_critical').pressed,
                                                                //                 device : Ext.getCmp('bt_rtm_device').pressed
                                                                //             },
                                                                //             success : function(res_data)
                                                                //             {
                                                                //                 var resObj = JSON.parse(res_data.responseText);
                                                                //                 Ext.getStore('st_rtm_event').loadData(resObj);
                                                                //             }
                                                                //         }
                                                                //     );
                                                            },
                                                            id: 'bt_rtm_device',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_event_device',
                                                            pressed: true,
                                                            text: '장비',
                                                            textAlign: 'left'
                                                        }
                                                    ]
                                                }
                                            ],
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 60,
                                                    text: '번호'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value === '정보')
                                                        metaData.tdCls = 'ico_information';

                                                        if (value === '경고')
                                                        metaData.tdCls = 'ico_warning';

                                                        if (value === '중요')
                                                        metaData.tdCls = 'ico_critical';

                                                        if (value === '장비')
                                                        metaData.tdCls = 'ico_event_device';

                                                        return value;
                                                    },
                                                    dataIndex: 'log_type',
                                                    text: '로그종류'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'day',
                                                    text: '날짜'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 100,
                                                    dataIndex: 'time',
                                                    text: '시간'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 200,
                                                    dataIndex: 'name',
                                                    text: '장비 이름'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 140,
                                                    dataIndex: 'ip',
                                                    text: 'IP 주소'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 400,
                                                    dataIndex: 'content',
                                                    text: '내용'
                                                }
                                            ],
                                            viewConfig: {
                                                preserveScrollOnRefresh: true
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    layout: 'fit',
                                    title: '로그 히스토리',
                                    items: [
                                        {
                                            xtype: 'gridpanel',
                                            id: 'gpn_rtm_history',
                                            store: 'st_rtm_history',
                                            dockedItems: [
                                                {
                                                    xtype: 'toolbar',
                                                    dock: 'top',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                if(Ext.getCmp('txt_rtm_history_content').getValue() === '')
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );

                                                                }
                                                                else
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed,
                                                                            content : Ext.encode(Ext.getCmp('txt_rtm_history_content').getValue())
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );
                                                                }

                                                            },
                                                            id: 'bt_rtm_history_info',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_information',
                                                            pressed: true,
                                                            text: '정보',
                                                            textAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                if(Ext.getCmp('txt_rtm_history_content').getValue() === '')
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );

                                                                }
                                                                else
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed,
                                                                            content : Ext.encode(Ext.getCmp('txt_rtm_history_content').getValue())
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );
                                                                }

                                                            },
                                                            id: 'bt_rtm_history_warning',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_warning',
                                                            pressed: true,
                                                            text: '경고',
                                                            textAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                if(Ext.getCmp('txt_rtm_history_content').getValue() === '')
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );

                                                                }
                                                                else
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed,
                                                                            content : Ext.encode(Ext.getCmp('txt_rtm_history_content').getValue())
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );
                                                                }

                                                            },
                                                            id: 'bt_rtm_history_critical',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_critical',
                                                            pressed: true,
                                                            text: '중요',
                                                            textAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            toggleHandler: function(button, state) {
                                                                if(Ext.getCmp('txt_rtm_history_content').getValue() === '')
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );

                                                                }
                                                                else
                                                                {
                                                                    Ext.Ajax.request(
                                                                    {
                                                                        url : '/api/ftRTM/SeekHistory',
                                                                        params : {
                                                                            st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                                                                            et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                                                                            info : Ext.getCmp('bt_rtm_history_info').pressed,
                                                                            warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                                                                            critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                                                                            device : Ext.getCmp('bt_rtm_history_device').pressed,
                                                                            content : Ext.encode(Ext.getCmp('txt_rtm_history_content').getValue())
                                                                        },
                                                                        success : function(res_data)
                                                                        {
                                                                            var resObj = JSON.parse(res_data.responseText);
                                                                            Ext.getStore('st_rtm_history').loadData(resObj);
                                                                        }
                                                                    }
                                                                    );
                                                                }

                                                            },
                                                            id: 'bt_rtm_history_device',
                                                            width: 70,
                                                            enableToggle: true,
                                                            iconCls: 'ico_event_device',
                                                            pressed: true,
                                                            text: '장비',
                                                            textAlign: 'left'
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            id: 'dt_rtm_history_start',
                                                            width: 140,
                                                            format: 'Y-m-d'
                                                        },
                                                        {
                                                            xtype: 'datefield',
                                                            id: 'dt_rtm_history_end',
                                                            width: 140,
                                                            format: 'Y-m-d'
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txt_rtm_history_content',
                                                            width: 300
                                                        },
                                                        {
                                                            xtype: 'button',
                                                            id: 'bt_rtm_history_search',
                                                            width: 70,
                                                            text: '검색',
                                                            listeners: {
                                                                click: {
                                                                    fn: me.onBt_rtm_history_searchClick,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            columns: [
                                                {
                                                    xtype: 'rownumberer',
                                                    width: 60,
                                                    text: '번호'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        if (value === '정보')
                                                        metaData.tdCls = 'ico_information';

                                                        if (value === '경고')
                                                        metaData.tdCls = 'ico_warning';

                                                        if (value === '중요')
                                                        metaData.tdCls = 'ico_critical';

                                                        if (value === '장비')
                                                        metaData.tdCls = 'ico_event_device';

                                                        return value;
                                                    },
                                                    dataIndex: 'log_type',
                                                    text: '로그종류'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'day',
                                                    text: '날짜'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 100,
                                                    dataIndex: 'time',
                                                    text: '시간'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 200,
                                                    dataIndex: 'name',
                                                    text: '장비 이름'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 140,
                                                    dataIndex: 'ip',
                                                    text: 'IP 주소'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 400,
                                                    dataIndex: 'content',
                                                    text: '내용'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onPnl_rtm_mainAfterRender,
                    scope: me
                },
                beforedestroy: {
                    fn: me.onPnl_rtm_mainBeforeDestroy,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onTxf_rtm_intervalFocus: function(component, e, eOpts) {
        var device_grid = Ext.getCmp('gpn_rtm_devicelist');
        device_grid.getSelectionModel().deselectAll();

        var obstacle_grid = Ext.getCmp('gpn_rtm_obstacle');
        obstacle_grid.getSelectionModel().deselectAll();

        // 2015.01.17 김민수 - 장비 버전정보 요청사항에 따라 삭제
    },

    onButtonClick1: function(button, e, eOpts) {
        value = Ext.getCmp('txf_rtm_interval').getValue();

        if (value > 600)
        {
            Ext.Msg.alert('경고','0 ~ 600 사이의 정수만 입력이 가능합니다.');
            return;
        }

        if (value < 0)
        {
            Ext.Msg.alert('경고','0 ~ 600 사이의 정수만 입력이 가능합니다.');
            return;
        }

        if (value === 0)
        {
            Ext.Msg.alert('경고','0으로 설정하시면 업데이트 하지 않습니다.');

            Ext.Ajax.request(
                {
                    url : 'api/ftRTM/SetInterval',
                    params :
                    {
                        interval : Ext.encode(value)
                    },
                    success : function(res_data)
                    {
                        var pnl_smc_device_center = Ext.getCmp('pnl_smc_device_center');
                        if (pnl_smc_device_center.taskObj)
                        {
                            clearInterval(pnl_smc_device_center.taskObj);
                        }
                    }
                }
            );

            return;
        }


        var pnl_smc_device_center = Ext.getCmp('pnl_smc_device_center');
        if (pnl_smc_device_center.taskObj)
        {
            clearInterval(pnl_smc_device_center.taskObj);
        }

        Ext.Ajax.request(
            {
                url : 'api/ftRTM/SetInterval',
                params :
                {
                    interval : Ext.encode(value)
                },
                success : function(res_data)
                {
                    Ext.getCmp('pnl_rtm_main').timer_tick();
                }
            }
        );
    },

    onGdv_rtm_obstacleRefresh: function(dataview, eOpts) {
        var component = Ext.getCmp('gpn_rtm_obstacle');

        if ( component.selectRecords === undefined)
            return;

        if (0 >= component.selectRecords.length)
            return;

        var newRecordsToSelect = [];

        for (var i = 0; i < component.selectIndex.length; i++)
        {
            var record = component.getStore().getAt(component.selectIndex[i]);
            if (!Ext.isEmpty(record))
            {
                newRecordsToSelect.push(record);
            }
        }

        component.getSelectionModel().select(newRecordsToSelect);


    },

    onGpn_rtm_obstacle_Collapse: function(p, eOpts) {
        // onPanelCollapse ========================================================================================================================================================
        //
        // 일시 : 2015.01.17
        //
        // 설명 : 패널에서 Collapse 이벤트가 발생하면 장애 현황을 Refresh 합니다.
        //
        // 수정 :
        //
        // - (2015.01.17 김민수 : Collapse 이벤트 발생시 장애현황 Refresh 기능 수행)
        //
        // ========================================================================================================================================================================

        // 타이머가 동작하고 있으면 Clear

        var obstacleObj = Ext.getCmp('gpn_rtm_obstacle');

        if(obstacleObj.refreshObj){
            clearInterval(obstacleObj.refreshObj);
        }
    },

    onGpn_rtm_obstacle_Expand: function(p, eOpts) {
        // onPanelExpand ==========================================================================================================================================================
        //
        // 일시 : 2015.01.17
        //
        // 설명 : 패널에서 Expand 이벤트가 발생하면 장애 현황을 Refresh 합니다.
        //
        // 수정 :
        //
        // - (2015.01.17 김민수 : expand 이벤트 발생시 장애현황 Refresh 기능 수행)
        //
        // ========================================================================================================================================================================

        // 타이머 동작

        var obstacle_grid = Ext.getCmp('gpn_rtm_obstacle');

        obstacle_grid.selectRecords = obstacle_grid.getSelectionModel().getSelection();

        var obstacle_array = [];

        for(i = 0; i < obstacle_grid.selectRecords.length; i++)
        {
            obstacle_array.push(obstacle_grid.getStore().indexOf(obstacle_grid.selectRecords[i]));
        }

        obstacle_grid.selectIndex = obstacle_array;

        Ext.Ajax.request({

            url : '/api/ftRTM/SeekObstacle',
            params : {

                noresponse : Ext.getCmp('btn_rtm_error').pressed,
                warning : Ext.getCmp('btn_rtm_warning').pressed,
                other : Ext.getCmp('btn_rtm_other').pressed,
                login : Ext.getCmp('btn_rtm_login').pressed

            },
            success : function(res_data)
            {
                var resObj = JSON.parse(res_data.responseText);
                Ext.getStore('st_rtm_obstacle').loadData(resObj);
            }
        });

        p.refreshObstacle();
    },

    onPnl_rtm_mainAfterRender: function(component, eOpts) {
        SMC_VIEW.create_grid_panel(
            'rtm',
            G_TYPE.RTM,
            'gpn_rtm_devicelist',
            false,
            function(_grid_tpl)
            {
                var _dynamicGrid = Ext.create(_grid_tpl,{

                    'id'            : 'gpn_rtm_devicelist',
                    'selectRecords' : [],
                    'selectIndex'   : [],
                    'border'        : false,
                    'viewConfig'	:
                    {
                        id: 'gdv_rtm_device',
                        preserveScrollOnRefresh: true,
                        listeners: {
                            refresh: {
                                fn : function()
                                {
                                    var grid = Ext.getCmp('gpn_rtm_devicelist');

                                    if ( grid.selectRecords === undefined)
                                        return;

                                    if (0 >= grid.selectRecords.length)
                                        return;

                                    var newRecordsToSelect = [];

                                    for (var i = 0; i < grid.selectIndex.length; i++)
                                    {
                                        var record = grid.getStore().getAt(grid.selectIndex[i]);
                                        if (!Ext.isEmpty(record))
                                        {
                                            newRecordsToSelect.push(record);
                                        }
                                    }

                                    grid.getSelectionModel().select(newRecordsToSelect);
                                }
                            }
                        }
                    }
                });

                Ext.getCmp('pnl_rtm_device').add(_dynamicGrid);

                var deviceSearch = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]');
                searchDeviceName(_dynamicGrid.getStore(), deviceSearch.getValue(), ['name', 'gate_ip']);

                _dynamicGrid.on('itemdblclick', function(obj, record, item, index, e, eOpts){

                    if (record.raw.state === 8)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0', 'RTM 서버와 통신하는 포트가 단락되어 정보를 수신 할 수 없습니다.');
                        return false;
                    }

                    if (record.raw.activation === false)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0', '장비가 응답이 없습니다.');
                        return false;
                    }

                    if (record.raw.state === 7)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0', '점검제외 장비는 상세정보를 요청할 수 없습니다.');
                        return false;
                    }

                    var win = Ext.create('SMC.view.win_rtm_detail');

                    var detail = Ext.getCmp('win_rtm_detail');
                    detail.objid = record.raw._id;
                    detail.objcid = record.raw['@cid'];

                    win.show();
                });

                component.contextRTM = new contextMenu();
                component.contextRTM.addItem('mi_rtm_modify', '장비 수정', function(){

                    var grid = Ext.getCmp('gpn_rtm_devicelist');

                    if (grid.getSelectionModel().getSelection()[0] === undefined)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0','수정할 장비를 선택하세요');
                        return false;
                    }
                    else
                    {
                        Ext.create('SMC.view.win_rtm_device').show();
                    }

                }, true);

                component.contextRTM.addItem('mi_rtm_detail', '상세 정보', function(){

                    var grid = Ext.getCmp('gpn_rtm_devicelist');

                    if (grid.getSelectionModel().getSelection()[0] === undefined)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0','수정할 장비를 선택하세요');
                        return false;
                    }
                    else
                    {
                        var item = grid.getSelectionModel().getSelection()[0].raw;

                        if (item.state === 8)
                        {
                            Ext.Msg.alert('WeGuardia SMC2.0', 'RTM 서버와 통신하는 포트가 단락되어 정보를 수신 할 수 없습니다.');
                            return false;
                        }

                        if (item.activation === false)
                        {
                            Ext.Msg.alert('WeGuardia SMC2.0', '장비가 응답이 없습니다.');
                            return false;
                        }

                        if (item.state === 7)
                        {
                            Ext.Msg.alert('WeGuardia SMC2.0', '점검제외 장비는 상세정보를 요청할 수 없습니다.');
                            return false;
                        }

                        var win = Ext.create('SMC.view.win_rtm_detail');

                        var detail = Ext.getCmp('win_rtm_detail');
                        detail.objid = item._id;
                        detail.objcid = item['@cid'];

                        win.show();
                    }

                }, true);

                component.contextRTM.addItem('mi_rtm_log', '실시간 로그', function(){

                    var grid = Ext.getCmp('gpn_rtm_devicelist');

                    if (grid.getSelectionModel().getSelection()[0] === undefined)
                    {
                        Ext.Msg.alert('WeGuardia SMC2.0','장비를 선택하세요');
                        return false;
                    }
                    else
                    {
                        var item = grid.getSelectionModel().getSelection()[0].raw;

                        if (item.state === 8)
                        {
                            Ext.Msg.alert('WeGuardia SMC2.0', 'RTM 서버와 통신하는 포트가 단락되어 로그를 수신 할 수 없습니다.');
                            return false;
                        }

                        if (item.activation === false)
                        {
                            Ext.Msg.alert('WeGuardia SMC2.0', '장비가 응답이 없습니다.');
                            return false;
                        }

                        if (item.state === 7)
                        {
                            Ext.Msg.alert('WeGuardia SMC2.0', '점검제외 장비는 로그를 요청할 수 없습니다.');
                            return false;
                        }

                        var win = Ext.create('SMC.view.win_rtm_log');
                        win.show();
                    }


                }, true);

                component.contextRTM.addItem('mi_rtm_refresh', '정보 재 요청', function(){

                    var item = Ext.getCmp('gpn_rtm_devicelist').getSelectionModel().getSelection()[0].raw;

                    Ext.Ajax.request(
                        {
                            url : 'api/ftRtmMsgMgr/SendRandomReq',
                            params :
                            {
                                cid : Ext.encode(item['@cid'])
                            },
                            success : function(res_data)
                            {
                            }
                        }
                    );

                }, true);

                component.contextRTM.addItem('mi_rtm_terminal', '터미널', function() {
                    var item = Ext.getCmp('gpn_rtm_devicelist').getSelectionModel().getSelection();
                    openRTMTerm(item, 0);
                }, true);


                component.contextRTM.connectGrid(_dynamicGrid, function(){

                    var contextInstance = component.contextRTM.getContextMenu();
                    var deviceGrid = Ext.getCmp('gpn_rtm_devicelist');
                });

                component.contextRTM.connectContainer(_dynamicGrid, function(){

                    var contextInstance = component.contextRTM.getContextMenu();
                    var deviceGrid = Ext.getCmp('gpn_rtm_devicelist');

                });

                // 2015.01.16 김민수 - isRecursive 파라미터 추가

                var showMode = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]').pressed;

                console.log('Select CID -> ', Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].raw.cid);

                Ext.Ajax.request(
                    {
                        url : 'api/ftRTM/SeekDeviceList',
                        params :
                        {
                            group_cid : Ext.encode(Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].raw.cid),
                            isRecursive : Ext.encode(showMode)
                        },
                        success : function(res_data)
                        {
                            var resObj = JSON.parse(res_data.responseText);
                            Ext.getCmp('gpn_rtm_devicelist').getStore().loadData(resObj);

                            console.log('Select CID -> ', Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].raw.cid);

                            var deviceSearch = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]');
                            searchDeviceName(Ext.getCmp('gpn_rtm_devicelist').getStore(), deviceSearch.getValue(), ['name', 'gate_ip']);
                        }
                    }
                );

                Ext.Ajax.request(
                    {
                        url : 'api/ftRTM/SeekDeviceState',
                        success : function(res_data)
                        {
                            var resObj = JSON.parse(res_data.responseText);
                            Ext.getCmp('txf_rtm_state_all').setValue(resObj.count);
                            Ext.getCmp('txf_rtm_state_normal').setValue(resObj.normal);
                            Ext.getCmp('txf_rtm_state_no_response').setValue(resObj.no_response);
                            Ext.getCmp('txf_rtm_state_line_error').setValue(resObj.line_error);
                            Ext.getCmp('txf_rtm_state_login_fail').setValue(resObj.login_fail);

                        }
                    }

                );
            }
        );

        /*

        2015.01.17 김민수

        장애장비 Refresh는 요청에 따라 패널이 펼쳐질 경우에만 동작합니다.

        */

        Ext.Ajax.request(
            {
                url : 'api/ftRTM/GetInterval',
                success : function(res_data)
                {
                    var resObj = JSON.parse(res_data.responseText);
                    Ext.getCmp('txf_rtm_interval').setValue(resObj);
                    component.timer_tick();
                }
            }
        );


    },

    onPnl_rtm_mainBeforeDestroy: function(component, eOpts) {
        var pnl_smc_device_center = Ext.getCmp('pnl_smc_device_center');
        if (pnl_smc_device_center.taskObj)
        {
            clearInterval(pnl_smc_device_center.taskObj);
        }

        if(component.contextRTM !== undefined)
        {
            component.contextRTM.destroy();
            delete component.contextRTM;
        }
    },

    onPnl_rtm_eventAfterRender: function(component, eOpts) {
        component.time = Math.floor(new Date().getTime() / 1000) - 2;

        Ext.getCmp('dt_rtm_history_start').setValue(new Date());
        Ext.getCmp('dt_rtm_history_end').setValue(new Date());

        Ext.Ajax.request(
            {
                url : '/api/ftRTM/InsertLog',
                params : {
                    content : Ext.encode("WeGuardia™ SMC2.0 로그인 성공")
                },
                success : function(res_data)
                {
                }
            }
        );

        // 2015.01.19 김민수 - 요청에 의해 SeekEventLog 이벤트 제거

        // Ext.Ajax.request(
        //     {
        //         url : '/api/ftRTM/SeekEventLog',
        //         params : {
        //             ts : component.time,
        //             info : Ext.getCmp('bt_rtm_information').pressed,
        //             warning : Ext.getCmp('bt_rtm_warning').pressed,
        //             critical : Ext.getCmp('bt_rtm_critical').pressed,
        //             device : Ext.getCmp('bt_rtm_device').pressed
        //         },
        //         success : function(res_data)
        //         {
        //             var resObj = JSON.parse(res_data.responseText);
        //             Ext.getStore('st_rtm_event').loadData(resObj);
        //         }
        //     }
        // );
    },

    onBt_rtm_history_searchClick: function(button, e, eOpts) {
        if(Ext.getCmp('txt_rtm_history_content').getValue() === '')
        {
            Ext.Ajax.request(
                {
                    url : '/api/ftRTM/SeekHistory',
                    params : {
                        st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                        et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                        info : Ext.getCmp('bt_rtm_history_info').pressed,
                        warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                        critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                        device : Ext.getCmp('bt_rtm_history_device').pressed
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_rtm_history').loadData(resObj);
                    }
                }
            );

        }
        else
        {
            Ext.Ajax.request(
                {
                    url : '/api/ftRTM/SeekHistory',
                    params : {
                        st : Ext.getCmp('dt_rtm_history_start').getValue().getTime() / 1000,
                        et : (Ext.getCmp('dt_rtm_history_end').getValue().getTime() / 1000) + 86400,
                        info : Ext.getCmp('bt_rtm_history_info').pressed,
                        warning : Ext.getCmp('bt_rtm_history_warning').pressed,
                        critical : Ext.getCmp('bt_rtm_history_critical').pressed,
                        device : Ext.getCmp('bt_rtm_history_device').pressed,
                        content : Ext.encode(Ext.getCmp('txt_rtm_history_content').getValue())
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getStore('st_rtm_history').loadData(resObj);
                    }
                }
            );
        }

    },

    timer_tick: function() {
        var tick = Ext.getCmp('txf_rtm_interval').getValue();
        var component = Ext.getCmp('pnl_rtm_main');

        component.timer = function()
        {
            ///////////////////////////////////////////////////////////////////
            //	장비 목록 업데이트
            ///////////////////////////////////////////////////////////////////
            var device_grid = Ext.getCmp('gpn_rtm_devicelist');

            if(device_grid){

                device_grid.selectRecords = device_grid.getSelectionModel().getSelection();

            }
            else{

                return;

            }

            var grid_array = [];

            for(var i = 0; i < device_grid.selectRecords.length; i++)
                grid_array.push(device_grid.getStore().indexOf(device_grid.selectRecords[i]));

            device_grid.selectIndex = grid_array;

            var group_cid = Ext.getCmp(DEVICE_COMMON_ID.devicegroup).getSelectionModel().getSelection()[0].raw.cid;

            var showMode = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]').pressed;

            // 2015.01.19 김민수 - Session Ping 추가

            Ext.Ajax.request(
                {
                    url : 'api/ftSMC/session_ping',
                    params : {

                        sid : Ext.encode(session_id)

                    },
                    success : function(res_data){

                        console.log('RTM Sesstion ping return success ... ');

                    }
                }
            );

            Ext.Ajax.request(
                {
                    url : 'api/ftRTM/SeekDeviceList',
                    params :
                    {
                        group_cid : Ext.encode(group_cid),
                        isRecursive : Ext.encode(showMode)
                    },
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        device_grid.getStore().loadData(resObj);

                        var deviceSearch = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]');
                        searchDeviceName(device_grid.getStore(), deviceSearch.getValue(), ['name', 'gate_ip']);
                    }
                }
            );

            ///////////////////////////////////////////////////////////////////
            //	장비 상태 업데이트
            ///////////////////////////////////////////////////////////////////
            Ext.Ajax.request(
                {
                    url : 'api/ftRTM/SeekDeviceState',
                    success : function(res_data)
                    {
                        var resObj = JSON.parse(res_data.responseText);
                        Ext.getCmp('txf_rtm_state_all').setValue(resObj.count);
                        Ext.getCmp('txf_rtm_state_normal').setValue(resObj.normal);
                        Ext.getCmp('txf_rtm_state_no_response').setValue(resObj.no_response);
                        Ext.getCmp('txf_rtm_state_line_error').setValue(resObj.line_error);
                        Ext.getCmp('txf_rtm_state_login_fail').setValue(resObj.login_fail);

                    }
                }
            );


            /*

            2015.01.17 김민수

            장애장비 Refresh 는 요청사항에 따라 패널이 펼쳐질때만 동작합니다.

            */

            // 2015.01.19 김민수 - 요청에 의해 SeekEventLog 주석 처리

        //     var event_panel = Ext.getCmp('pnl_rtm_event');

        //     Ext.Ajax.request(
        //         {
        //             url : '/api/ftRTM/SeekEventLog',
        //             params : {
        //                 ts : event_panel.time,
        //                 info : Ext.getCmp('bt_rtm_information').pressed,
        //                 warning : Ext.getCmp('bt_rtm_warning').pressed,
        //                 critical : Ext.getCmp('bt_rtm_critical').pressed,
        //                 device : Ext.getCmp('bt_rtm_device').pressed
        //             },
        //             success : function(res_data)
        //             {
        //                 var resObj = JSON.parse(res_data.responseText);
        //                 Ext.getStore('st_rtm_event').loadData(resObj);
        //             }
        //         }
        //     );
        };

        //component.timer = setInterval(component.timer, (tick === null) ? 10 * 1000 : tick * 1000);
        var pnl_smc_device_center = Ext.getCmp('pnl_smc_device_center');
        if (pnl_smc_device_center.taskObj)
        {
            clearInterval(pnl_smc_device_center.taskObj);
        }

        pnl_smc_device_center.taskObj = setInterval(component.timer, (tick === null) ? 10 * 1000 : tick * 1000);

    },

    reloadDevicelist: function() {
        // reloadDevicelist ========================================================================================================================================================
        //
        // 일시 : 2015.01.17
        //
        // 설명 :
        //
        // 수정 :
        //
        // =========================================================================================================================================================================

        var westGroup = Ext.getCmp(DEVICE_COMMON_ID.devicegroup);
        var device_grid = Ext.getCmp('gpn_rtm_devicelist');

        if(device_grid){

            var grid_array = [];

            for(var i = 0; i < device_grid.selectRecords.length; i++){

                grid_array.push(device_grid.getStore().indexOf(device_grid.selectRecords[i]));

            }

            device_grid.selectIndex = grid_array;

            var group_cid = westGroup.getSelectionModel().getSelection()[0].raw.cid;
            var showMode = Ext.getCmp('tb_smc_device_groupctrl').down('[itemId=bt_showall]').pressed;

            Ext.Ajax.request(
                {
                    url : 'api/ftRTM/SeekDeviceList',
                    params : {
                        group_cid : Ext.encode(group_cid),
                        isRecursive : Ext.encode(showMode)
                    },
                    success : function(res_data){

                        var resObj = JSON.parse(res_data.responseText);
                        device_grid.getStore().loadData(resObj);

                        var deviceSearch = Ext.getCmp(DEVICE_COMMON_ID.devicecenter).down('[itemId=tb_smc_device_search]').down('[itemId=txf_searchstr]');
                        searchDeviceName(device_grid.getStore(), deviceSearch.getValue(), ['name', 'gate_ip']);

                    }
                }
            );
        }
    }

});