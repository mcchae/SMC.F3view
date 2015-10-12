
Ext.define('SMC.view.win_xtm_mgt_tracker', {
    extend: 'Ext.window.Window',
    alias: 'widget.xtm_mgt_tracker',

    requires: [
        'Ext.form.FieldSet',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.form.CheckboxGroup',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Number',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
        'Ext.grid.View',
        'Ext.selection.RowModel'
    ],

    height: 550,
    itemId: 'win_xtm_mgt_tracker',
    width: 750,
    overflowY: 'auto',
    bodyPadding: 10,
    title: '트래커',
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
                    itemId: 'ctn_tracker_name',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'txf_name',
                            width: 500,
                            fieldLabel: '트래커 설명'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_tracker_basic',
                    margin: '0, 0, 10, 0',
                    title: '기본 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            itemId: 'ctn_tracker_top',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_time',
                                    margin: '0, 10, 0, 0',
                                    width: 180,
                                    fieldLabel: '시간',
                                    value: 0,
                                    editable: false,
                                    store: [
                                        0,
                                        1,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6,
                                        7,
                                        8,
                                        9,
                                        10,
                                        11,
                                        12,
                                        13,
                                        14,
                                        15,
                                        16,
                                        17,
                                        18,
                                        19,
                                        20,
                                        21,
                                        22,
                                        23
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    margin: '0, 10, 0, 0',
                                    text: '~'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_time2',
                                    margin: '0, 10, 0, 0',
                                    width: 80,
                                    fieldLabel: '',
                                    value: 1,
                                    editable: false,
                                    store: [
                                        1,
                                        2,
                                        3,
                                        4,
                                        5,
                                        6,
                                        7,
                                        8,
                                        9,
                                        10,
                                        11,
                                        12,
                                        13,
                                        14,
                                        15,
                                        16,
                                        17,
                                        18,
                                        19,
                                        20,
                                        21,
                                        22,
                                        23,
                                        24
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_count',
                                    width: 180,
                                    fieldLabel: '출력 개수',
                                    value: 10,
                                    editable: false,
                                    store: [
                                        10,
                                        20,
                                        30,
                                        40,
                                        50,
                                        100
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_tracker_bottom',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'checkboxgroup',
                                    itemId: 'ckg_tracker_time',
                                    margin: '0, 0, 10, 0',
                                    width: 400,
                                    fieldLabel: '',
                                    items: [
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_now',
                                            boxLabel: 'Time Chart'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_before',
                                            boxLabel: '이전 Time Chart'
                                        },
                                        {
                                            xtype: 'checkboxfield',
                                            itemId: 'ck_day',
                                            boxLabel: '일별 Time Chart'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'label',
                                    flex: 1,
                                    text: '( Time Chart-PDF, EXCEL, DOC 미지원 )'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    itemId: 'fds_tracker_setting',
                    title: '상세 설정',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_tracker_top',
                            margin: '10, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_type',
                                    margin: '0, 10, 0, 0',
                                    width: 200,
                                    fieldLabel: '트래커 타입',
                                    labelWidth: 80,
                                    value: 'fw',
                                    editable: false,
                                    displayField: 'name',
                                    store: 'st_tracker_type',
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_typeChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_basic',
                                    margin: '0, 10, 0, 0',
                                    width: 200,
                                    fieldLabel: '검색 기준',
                                    labelWidth: 80,
                                    value: 'sipv4',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_tracker_search',
                                    valueField: 'value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmp_basicChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txf_ip',
                                    width: 250,
                                    fieldLabel: 'IP',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'textfield',
                                    hidden: true,
                                    itemId: 'txf_fsid',
                                    width: 250,
                                    fieldLabel: 'FSID',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'cmb_protocol',
                                    margin: '0, 10, 0, 0',
                                    width: 150,
                                    fieldLabel: 'Protocol',
                                    labelWidth: 50,
                                    value: 0,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_tracker_protocol',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'nfd_port',
                                    fieldLabel: 'Port',
                                    labelWidth: 40
                                },
                                {
                                    xtype: 'textfield',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'txf_uid',
                                    width: 250,
                                    fieldLabel: 'UID',
                                    labelWidth: 80
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'txf_countrycode',
                                    fieldLabel: '일 남음'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'ctn_tracker_bottom',
                            margin: '0, 0, 10, 0',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_act',
                                    margin: '0, 10, 0, 0',
                                    width: 270,
                                    fieldLabel: '행위',
                                    labelWidth: 80,
                                    value: 5,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_tracker_act',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_sort',
                                    margin: '0, 10, 0, 0',
                                    width: 200,
                                    fieldLabel: '정렬 기준',
                                    labelWidth: 80,
                                    value: 'packet',
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_tracker_sort',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_guard',
                                    width: 200,
                                    fieldLabel: '경계 구분',
                                    labelWidth: 80,
                                    value: 0,
                                    editable: false,
                                    displayField: 'name',
                                    queryMode: 'local',
                                    store: 'st_tracker_guard',
                                    valueField: 'value'
                                },
                                {
                                    xtype: 'combobox',
                                    flex: 1,
                                    hidden: true,
                                    itemId: 'cmb_work',
                                    fieldLabel: '업무 구분',
                                    labelWidth: 70,
                                    value: 0,
                                    editable: false,
                                    displayField: 'name',
                                    store: 'st_tracker_work',
                                    valueField: 'value'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_tracker_control',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'button',
                            itemId: 'bt_add',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '추 가',
                            listeners: {
                                click: {
                                    fn: me.onBt_addClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_mod',
                            margin: '0, 10, 0, 0',
                            width: 100,
                            text: '수 정',
                            listeners: {
                                click: {
                                    fn: me.onBt_modClick,
                                    scope: me
                                }
                            }
                        },
                        {
                            xtype: 'button',
                            itemId: 'bt_del',
                            width: 100,
                            text: '삭 제',
                            listeners: {
                                click: {
                                    fn: me.onBt_delClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                },
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    itemId: 'gpn_tracker_list',
                    margin: '0, 0, 10, 0',
                    title: '',
                    columns: [
                        {
                            xtype: 'rownumberer',
                            text: 'N'
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'desc',
                            text: '트래커 설명',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                return value['@start'] + ' ~ ' + value['@end'];
                            },
                            dataIndex: 'time',
                            text: '시간',
                            flex: 1
                        },
                        {
                            xtype: 'gridcolumn',
                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                // renderer ======================================================================================================================================================================
                                //
                                // 일시 : 2014.11.11
                                //
                                // 설명 : 트래커 타입, 검색 기준 텍스트를 출력합니다.
                                //
                                // ===============================================================================================================================================================================

                                var trackerType  = (value['@type'] === 'fw') ? '방화벽' : ((value['@type'] === 'vpn') ? 'VPN' : 'DPI');
                                var searchString = (value['#text'] === 'sipv4' ? '출발지' : (value['#text'] === 'dipv4') ? '목적지' : (value['#text'] === 'service') ? '서비스' : (value['#text'] === 'uid') ? '정책' : '국가코드');

                                return trackerType + ', ' + searchString;
                            },
                            dataIndex: 'setting',
                            text: '트래커 타입, 검색 기준',
                            flex: 2
                        }
                    ],
                    listeners: {
                        itemclick: {
                            fn: me.onGpn_tracker_listItemClick,
                            scope: me
                        },
                        render: {
                            fn: me.onGpn_tracker_listRender,
                            scope: me
                        }
                    },
                    selModel: Ext.create('Ext.selection.RowModel', {
                        mode: 'MULTI'
                    })
                },
                {
                    xtype: 'container',
                    itemId: 'ctn_tracker_save',
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
                            itemId: 'bt_cancel',
                            width: 100,
                            text: '취 소',
                            listeners: {
                                click: {
                                    fn: me.onBt_cancelClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            listeners: {
                afterrender: {
                    fn: me.onWin_xtm_mgt_trackerAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_typeChange: function(field, newValue, oldValue, eOpts) {
        // onCmb_typeChange =====================================================================================================================
        //
        // 일시 : 2014.06.26
        //
        // 설명 : 트래커 타입을 초기화 합니다. 트래커 타입에 따라 설정할 수 있는 옵션이 달라집니다.
        //
        // 예외 : 방화벽에서는 경계 구분 컴포넌트를 사용합니다. VPN 에서는 업무구분 컴포넌트를 사용합니다.
        //
        // ======================================================================================================================================

        var searchStore = Ext.getStore('st_tracker_search');
        var actStore    = Ext.getStore('st_tracker_act');
        var sortStore   = Ext.getStore('st_tracker_sort');

        var component   = this.componentStorage();

        if(newValue === 'fw'){

            var searchArray = [];
            var actArray    = [];
            var sortArray   = [];

            searchArray.push({	'name' : '출발지' , 'value' : 'sipv4' });
            searchArray.push({	'name' : '목적지' , 'value' : 'dipv4' });
            searchArray.push({	'name' : '서비스' , 'value' : 'service' });
            searchArray.push({	'name' : '정책' , 'value' : 'uid' });
            searchArray.push({	'name' : '국가코드', 'value' : 'country' });

            actArray.push({	'name' : '통과', 'value' : 5 });
            actArray.push({	'name' : '- 정상 종료' , 'value' : 0 });
            actArray.push({	'name' : '- 비정상 종료 ESTABLISH 전' , 'value' : 1 });
            actArray.push({	'name' : '- 비정상 종료 ESTABLISH 후' , 'value' : 2 });
            actArray.push({	'name' : '차단' , 'value' : 6 });
            actArray.push({	'name' : '- 룰에 의한 차단' , 'value' : 3 });
            actArray.push({	'name' : '- 비정상 차단' , 'value' : 4 });

            sortArray.push({'name' : '누적 패킷', 'value' : 'packet' });
            sortArray.push({'name' : '전체 누적 사용량', 'value' : 'bytes' });
            sortArray.push({'name' : 'Tx' , 'value' : 'out_bytes' });
            sortArray.push({'name' : 'Rx' , 'value' : 'in_bytes' });
            sortArray.push({'name' : '누적 세션', 'value' : 'session' });

            searchStore.loadData(searchArray);
            actStore.loadData(actArray);
            sortStore.loadData(sortArray);

            component.trackerguard.setVisible(true);
            component.trackerwork.setVisible(false);

            component.trackerbasic.setValue('sipv4');
            component.trackeract.setValue(5);
            component.trackersort.setValue('packet');

        }
        else if(newValue === 'vpn'){

            var searchArray = [];
            var actArray    = [];
            var sortArray   = [];

            searchArray.push({	'name' : '출발지' , 'value' : 'sipv4' });
            searchArray.push({	'name' : '목적지' , 'value' : 'dipv4' });
            searchArray.push({	'name' : '서비스' , 'value' : 'service' });
            searchArray.push({	'name' : '국가코드', 'value' : 'country' });

            actArray.push({	'name' : '암호화 + 복호화', 'value' : 2 });
            actArray.push({	'name' : '암호화' , 'value' : 0 });
            actArray.push({	'name' : '복호화' , 'value' : 1 });

            sortArray.push({'name' : '누적 패킷', 'value' : 'packet' });
            sortArray.push({'name' : '전체 누적 사용량', 'value' : 'bytes' });
            sortArray.push({'name' : '누적 세션', 'value' : 'session' });

            searchStore.loadData(searchArray);
            actStore.loadData(actArray);
            sortStore.loadData(sortArray);

            component.trackerguard.setVisible(false);
            component.trackerwork.setVisible(true);

            component.trackerbasic.setValue('sipv4');
            component.trackeract.setValue(2);
            component.trackersort.setValue('packet');

        }
        else{

            var searchArray = [];
            var actArray    = [];
            var sortArray   = [];

            searchArray.push({	'name' : '공격자' , 'value' : 'sipv4' });
            searchArray.push({	'name' : '공격목적지' , 'value' : 'dipv4' });
            searchArray.push({	'name' : '서비스' , 'value' : 'service' });
            searchArray.push({	'name' : '공격명', 'value' : 'fsid' });

            actArray.push({	'name' : '탐지', 'value' : 0 });
            actArray.push({	'name' : '차단', 'value' : 1 });

            sortArray.push({'name' : '탐지 건수', 'value' : 'packet' });
            sortArray.push({'name' : '탐지 바이트', 'value' : 'bytes' });

            searchStore.loadData(searchArray);
            actStore.loadData(actArray);
            sortStore.loadData(sortArray);

            component.trackerguard.setVisible(false);
            component.trackerwork.setVisible(false);

            component.trackerbasic.setValue('sipv4');
            component.trackeract.setValue(0);
            component.trackersort.setValue('packet');

        }
    },

    onCmp_basicChange: function(field, newValue, oldValue, eOpts) {
        // onCmp_basicChange =====================================================================================================================
        //
        // 일시 : 2014.06.26
        //
        // 설명 : 검색 기준이 변경 될 경우 프로토콜, 포트, UID, 국가코드 스토어 초기화 작업을 진행합니다.
        //
        // ======================================================================================================================================

        var component = this.componentStorage();

        var trackerType = field.up().down('[itemId=cmb_type]').getValue();

        if(trackerType === 'fw'){

            if(newValue === 'sipv4' || newValue === 'dipv4'){

                component.trackerip.setVisible(true);
                component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(false);
                component.trackerport.setVisible(false);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(false);

            }
            else if(newValue === 'service'){

                component.trackerip.setVisible(false);
                 component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(true);
                component.trackerport.setVisible(true);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(false);

            }
            else if(newValue === 'uid'){

                component.trackerip.setVisible(false);
                 component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(false);
                component.trackerport.setVisible(false);
                component.trackeruid.setVisible(true);
                component.trackercountry.setVisible(false);

            }
            else{

                component.trackerip.setVisible(false);
                 component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(false);
                component.trackerport.setVisible(false);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(true);

            }

        }
        else if(trackerType === 'vpn'){

            if(newValue === 'sipv4' || newValue === 'dipv4'){

                component.trackerip.setVisible(true);
                component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(false);
                component.trackerport.setVisible(false);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(false);

            }
            else if(newValue === 'service'){

                component.trackerip.setVisible(false);
                component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(true);
                component.trackerport.setVisible(true);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(false);

            }
            else{

                component.trackerip.setVisible(false);
                component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(false);
                component.trackerport.setVisible(false);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(true);

            }

        }
        else{

            if(newValue === 'sipv4' || newValue === 'dipv4'){

                component.trackerip.setVisible(true);
                component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(false);
                component.trackerport.setVisible(false);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(false);

            }
            else if(newValue === 'service'){

                component.trackerip.setVisible(false);
                component.trackerfsid.setVisible(false);
                component.trackerprotocol.setVisible(true);
                component.trackerport.setVisible(true);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(false);

            }
            else{

                component.trackerip.setVisible(false);
                component.trackerprotocol.setVisible(false);
                component.trackerport.setVisible(false);
                component.trackeruid.setVisible(false);
                component.trackercountry.setVisible(false);
                component.trackerfsid.setVisible(true);

            }

        }
    },

    onBt_addClick: function(button, e, eOpts) {
        // onBt_addClick ================================================================================================================================================================
        //
        // 일시 : 2014.06.26
        //
        // 설명 : 트래커 객체를 추가합니다.
        //
        // ==============================================================================================================================================================================

        var trackerStore = Ext.getStore('st_tracker_list');

        var component = this.componentStorage();

        var obj  = {};

        obj.desc = component.trackername.getValue();

        if(component.trackerbasic.getValue() === 'country'){

            obj.option = component.trackercountry.getValue();

        }
        else{

            var optionObj = {};

            optionObj['#text'] = (component.trackertype.getValue() === 'fsid') ? component.trackerfsid.getValue() : component.trackerip.getValue();

            optionObj['@protocol'] = (component.trackerbasic.getValue() === 'service') ? component.trackerbasic.getValue() : '';

            obj.option = optionObj;

        }

        // Setting 추가 ==================================================================================================================================================================

        var settingObj = {};

        settingObj['#text']  = component.trackerbasic.getValue();
        settingObj['@action'] = component.trackeract.getValue();

        if(component.trackertype.getValue() !== 'dpi'){

            settingObj['@op_mode'] = component.trackerguard.getValue();

        }

        settingObj['@order_type'] = component.trackersort.getValue();
        settingObj['@type'] = component.trackertype.getValue();

        obj.setting = settingObj;

        // 출력 갯수 =====================================================================================================================================================================

        obj.show_count = component.printcount.getValue();

        // 시간 설정 =====================================================================================================================================================================

        var timeObj = {};

        timeObj['@start'] = component.starttime.getValue();
        timeObj['@end'] = component.endtime.getValue();

        obj.time = timeObj;

        // 시간 체크 설정 =================================================================================================================================================================

        var timechartObj = {};

        timechartObj['@chk_basic'] = (component.timechart.getValue() === true) ? 'on' : 'off';
        timechartObj['@chk_daily'] = (component.daytimechart.getValue() === true) ? 'on' : 'off';
        timechartObj['@chk_prev'] = (component.beforetimechart.getValue() === true) ? 'on' : 'off';

        obj.time_chart = timechartObj;

        // 그리드 추가 ====================================================================================================================================================================

        gridData_Add(component.tracker_grid, obj);
    },

    onBt_modClick: function(button, e, eOpts) {
        // onBt_modClick ================================================================================================================================================================
        //
        // 일시 : 2014.06.30
        //
        // 설명 : 트래커 객체를 수정합니다.
        //
        // ==============================================================================================================================================================================

        var trackerStore = Ext.getStore('st_tracker_list');

        var component = this.componentStorage();

        var obj  = {};

        obj.desc = component.trackername.getValue();

        if(component.trackerbasic.getValue() === 'country'){

            obj.option = component.trackercountry.getValue();

        }
        else{

            var optionObj = {};

            optionObj['#text'] = (component.trackertype.getValue() === 'fsid') ? component.trackerfsid.getValue() : component.trackerip.getValue();

            optionObj['@protocol'] = (component.trackerbasic.getValue() === 'service') ? component.trackerbasic.getValue() : '';

            obj.option = optionObj;

        }

        // Setting 추가 ==================================================================================================================================================================

        var settingObj = {};

        settingObj['#text'] = component.trackerbasic.getValue();
        settingObj['@action'] = component.trackeract.getValue();

        if(component.trackertype.getValue() !== 'dpi'){

            settingObj['@op_mode'] = component.trackerguard.getValue();

        }

        settingObj['@order_type'] = component.trackersort.getValue();
        settingObj['@type'] = component.trackertype.getValue();

        obj.setting = settingObj;

        // 출력 갯수 =====================================================================================================================================================================

        obj.show_count = component.printcount.getValue();

        // 시간 수정 =====================================================================================================================================================================

        var timeObj = {};

        timeObj['@start'] = component.starttime.getValue();
        timeObj['@end'] = component.endtime.getValue();

        obj.time = timeObj;

        // 시간 체크 수정 =================================================================================================================================================================

        var timechartObj = {};

        timechartObj['@chk_basic'] = (component.timechart.getValue() === true) ? 'on' : 'off';
        timechartObj['@chk_daily'] = (component.daytimechart.getValue() === true) ? 'on' : 'off';
        timechartObj['@chk_prev'] = (component.beforetimechart.getValue() === true) ? 'on' : 'off';

        obj.time_chart = timechartObj;

        // 그리드 수정 ====================================================================================================================================================================

        selectionGrid_Mod(component.tracker_grid, obj);
    },

    onBt_delClick: function(button, e, eOpts) {
        // onBt_delClick =================================================================================================================================================================
        //
        // 일시 : 2014.11.11
        //
        // 설명 : 저장된 트래커 설정을 삭제합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        selectionGrid_Del(component.tracker_grid);
    },

    onGpn_tracker_listItemClick: function(dataview, record, item, index, e, eOpts) {
        // onGpn_tracker_listItemClick =================================================================================================================================================
        //
        // 일시 : 2014.06.30
        //
        // 설명 : 트래커 객체를 조회합니다.
        //
        // =============================================================================================================================================================================

        var trackerStore = Ext.getStore('st_tracker_list');

        var component    = this.componentStorage();

        // 트래커 설명 ===================================================================================================================================================================

        component.trackername.setValue(record.data.desc);

        // 기본 설정 조회 ================================================================================================================================================================

        component.starttime.setValue(record.data.time['@start']);
        component.endtime.setValue(record.data.time['@end']);
        component.printcount.setValue(record.data.show_count);

        component.timechart.setValue((record.data.time_chart['@chk_basic'] === 'on') ? true : false);
        component.beforetimechart.setValue((record.data.time_chart['@chk_prev'] === 'on') ? true : false);
        component.daytimechart.setValue((record.data.time_chart['@chk_daily'] === 'on') ? true : false);

        // 상세 설정 ====================================================================================================================================================================

        component.trackertype.setValue(record.data.setting['@type']);
        component.trackerbasic.setValue(record.data.setting['#text']);

        if(record.data.setting['#text'] === 'sipv4' || record.data.setting['#text'] === 'dipv4'){

            component.trackerip.setValue(record.data.option['#text']);

        }
        else if(record.data.setting['#text'] === 'service'){

            component.trackerprotocol.setValue(record.data.option['@protocol']);
            component.trackerport.setValue(record.data.option['#text']);

        }
        else if(record.data.setting['#text'] === 'uid'){

            component.trackeruid.setValue(record.data.option['#text']);

        }
        else if(record.data.setting['#text'] === 'country'){

            component.trackercountry.setValue(record.data.option);

        }
        else{

            component.trackerfsid.setValue(record.data.option['#text']);

        }

        // 행위 설정 ====================================================================================================================================================================

        component.trackeract.setValue(record.data.setting['@action']);
        component.trackersort.setValue(record.data.setting['@order_type']);
        component.trackerguard.setValue(record.data.setting['@op_mode']);

        // 경계 구분 및 업무 구분 조회 =====================================================================================================================================================

        if(record.data.setting['@type'] === 'fw'){

            component.trackerguard.setValue(record.data.setting['@op_mode']);

        }
        else if(record.data.setting['@type'] === 'vpn'){

            component.trackerwork.setValue(record.data.setting['@op_mode']);

        }
    },

    onGpn_tracker_listRender: function(component, eOpts) {
        component.bindStore(Ext.create('Ext.data.Store', {

            storeId : 'st_tracker_list',
            fields: [
                {
                    name: 'desc'
                },
                {
                    name: 'option'
                },
                {
                    name: 'setting'
                },
                {
                    name: 'show_count'
                },
                {
                    name: 'time'
                },
                {
                    name: 'time_chart'
                }
            ]

        }));
    },

    onBt_saveClick: function(button, e, eOpts) {
        // onBt_saveClick ===============================================================================================================================================================
        //
        // 일시 : 2014.06.30
        //
        // 설명 : 트래커 객체를 저장합니다.
        //
        // ==============================================================================================================================================================================

        var tmpArray = [];
        var component = this.componentStorage();
        var trackerStore = component.tracker_grid.getStore();

        if(trackerStore.count() <= 0){

            if(this.selectRecord.data.tracker){

                delete this.selectRecord.data.tracker;

            }

        }
        else{

            if(!this.selectRecord.data.tracker){

                this.selectRecord.data.tracker = [];

            }

            for(var i = 0; i < trackerStore.count(); i++){

                tmpArray.push(trackerStore.getAt(i).data);

            }

            this.selectRecord.data.tracker = tmpArray;

        }

        this.destroy();
    },

    onBt_cancelClick: function(button, e, eOpts) {
        // onBt_cancelClick =============================================================================================================================================================
        //
        // 일시 : 2014.11.11
        //
        // 설명 : 트래커 설정 윈도우를 종료합니다.
        //
        // ==============================================================================================================================================================================

        this.destroy();
    },

    onWin_xtm_mgt_trackerAfterRender: function(component, eOpts) {
        // onWin_xtm_mgt_trackerAfterRender =============================================================================================================================================
        //
        // 일시 : 2014.06.26
        //
        // 설명 : 트래커 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var trackerStore = Ext.getStore('st_tracker_list');

        try{

            if(component.selectRecord.data.tracker){

                Ext.each(component.selectRecord.data.tracker, function(trackerData){

                    trackerStore.add(trackerData);

                });

            }

        }
        catch(err){

            console.log('트래커 윈도우 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    componentStorage: function() {
        var obj          = {};

        var ctn_name     = this.down('[itemId=ctn_tracker_name]');

        var fds_basic    = this.down('[itemId=fds_tracker_basic]');
        var fds_setting  = this.down('[itemId=fds_tracker_setting]');

        var tracker_grid = this.down('[itemId=gpn_tracker_list]');

        var trackername  = ctn_name.down('[itemId=txf_name]');

        var starttime    = fds_basic.down('[itemId=ctn_tracker_top]').down('[itemId=cmb_time]');
        var endtime      = fds_basic.down('[itemId=ctn_tracker_top]').down('[itemId=cmb_time2]');
        var printcount   = fds_basic.down('[itemId=ctn_tracker_top]').down('[itemId=cmb_count]');

        var timechart    = fds_basic.down('[itemId=ctn_tracker_bottom]').down('[itemId=ckg_tracker_time]').down('[itemId=ck_now]');
        var beforetimechart = fds_basic.down('[itemId=ctn_tracker_bottom]').down('[itemId=ckg_tracker_time]').down('[itemId=ck_before]');
        var daytimechart = fds_basic.down('[itemId=ctn_tracker_bottom]').down('[itemId=ckg_tracker_time]').down('[itemId=ck_day]');

        var trackertype  = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=cmb_type]');
        var trackerbasic = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=cmb_basic]');
        var trackerip    = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=txf_ip]');
        var trackerfsid  = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=txf_fsid]');
        var trackerprotocol = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=cmb_protocol]');
        var trackerport  = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=nfd_port]');
        var trackeruid   = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=txf_uid]');
        var trackercountry = fds_setting.down('[itemId=ctn_tracker_top]').down('[itemId=txf_countrycode]');

        var trackeract   = fds_setting.down('[itemId=ctn_tracker_bottom]').down('[itemId=cmb_act]');
        var trackersort  = fds_setting.down('[itemId=ctn_tracker_bottom]').down('[itemId=cmb_sort]');
        var trackerguard = fds_setting.down('[itemId=ctn_tracker_bottom]').down('[itemId=cmb_guard]');
        var trackerwork  = fds_setting.down('[itemId=ctn_tracker_bottom]').down('[itemId=cmb_work]');

        obj.trackername = trackername;

        obj.starttime   = starttime;
        obj.endtime     = endtime;
        obj.printcount  = printcount;

        obj.timechart   = timechart;
        obj.beforetimechart = beforetimechart;
        obj.daytimechart = daytimechart;

        obj.trackertype = trackertype;
        obj.trackerbasic = trackerbasic;

        obj.trackerip   = trackerip;
        obj.trackerfsid = trackerfsid;
        obj.trackerprotocol = trackerprotocol;
        obj.trackerport = trackerport;
        obj.trackeruid  = trackeruid;
        obj.trackercountry = trackercountry;

        obj.trackeract  = trackeract;
        obj.trackersort = trackersort;
        obj.trackerguard = trackerguard;
        obj.trackerwork = trackerwork;

        obj.tracker_grid = tracker_grid;

        return obj;
    }

});