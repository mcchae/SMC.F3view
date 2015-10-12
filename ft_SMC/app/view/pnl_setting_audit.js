
Ext.define('SMC.view.pnl_setting_audit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pnl_setting_audit',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.form.Label',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ext.button.Button',
        'Ext.tree.Panel',
        'Ext.tree.View',
        'Ext.form.FieldSet',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio'
    ],

    id: 'pnl_setting_audit',
    bodyBorder: false,
    title: '감사 데이터',

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
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'toolbar',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmb_audit_period',
                                    width: 80,
                                    editable: false,
                                    displayField: 'period_text',
                                    queryMode: 'local',
                                    store: 'st_SettingPeriod',
                                    valueField: 'period_value',
                                    listeners: {
                                        change: {
                                            fn: me.onCmb_audit_periodChange,
                                            scope: me
                                        }
                                    }
                                },
                                {
                                    xtype: 'label',
                                    text: '시작 시간 : '
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'dtf_period_start',
                                    width: 120,
                                    labelPad: 1,
                                    editable: false,
                                    format: 'Y-m-d '
                                },
                                {
                                    xtype: 'timefield',
                                    itemId: 'tmf_time_start',
                                    width: 80,
                                    editable: false,
                                    typeAhead: true,
                                    format: 'H:i',
                                    increment: 1
                                },
                                {
                                    xtype: 'label',
                                    text: '~'
                                },
                                {
                                    xtype: 'label',
                                    text: '끝 시간 : '
                                },
                                {
                                    xtype: 'datefield',
                                    itemId: 'dtf_period_end',
                                    width: 120,
                                    labelPad: 1,
                                    labelSeparator: '',
                                    labelWidth: 10,
                                    editable: false,
                                    format: 'Y-m-d'
                                },
                                {
                                    xtype: 'timefield',
                                    itemId: 'tmf_time_end',
                                    width: 80,
                                    editable: false,
                                    typeAhead: true,
                                    format: 'H:i',
                                    increment: 1
                                },
                                {
                                    xtype: 'button',
                                    toggleHandler: function(button, state) {
                                        if(state)
                                        {
                                            Ext.getCmp('pnl_setting_audit').down('container[itemId="ctn_audit_condition"]').show();
                                        }
                                        else
                                        {
                                            Ext.getCmp('pnl_setting_audit').down('container[itemId="ctn_audit_condition"]').hide();
                                        }
                                    },
                                    width: 100,
                                    enableToggle: true,
                                    text: '상세 검색'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        var me = Ext.getCmp('pnl_setting_audit');

                                        var option_store = me.down('gridpanel[itemId="gpn_addOption"]').getStore();
                                        var start = me.down('datefield[itemId="dtf_period_start"]').getValue();
                                        var end = me.down('datefield[itemId="dtf_period_end"]').getValue();
                                        var start_time = me.down('timefield[itemId="tmf_time_start"]').getSubmitValue().split(':');
                                        var end_time = me.down('timefield[itemId="tmf_time_end"]').getSubmitValue().split(':');
                                        var condition = {};
                                        var tree = me.down('treepanel[itemId="trpn_event"]');
                                        var event_code_list = [];
                                        var level_list = [];
                                        var user_list = [];

                                        start.setHours(start_time[0], start_time[1], 00);

                                        end.setHours(end_time[0], end_time[1], 00);

                                        if(me.down('checkbox[itemId="ck_event"]').getValue())
                                        {
                                            for(var i=0; i<tree.getChecked().length; i++){
                                                var raw = tree.getChecked()[i].raw;

                                                if(raw.evcode){
                                                    event_code_list.push(raw.evcode);
                                                }
                                            }
                                        }

                                        if(me.down('checkbox[itemId="ck_logLevel"]').getValue())
                                        {
                                            Ext.each(me.down('checkboxgroup[itemId="ckg_logLevel"]').getChecked(), function(data, idx){

                                                level_list.push(parseInt(data.inputValue));
                                            });
                                        }

                                        if(me.down('fieldset[itemId="fs_addOption"]').checkboxCmp.checked)
                                        {
                                            if(option_store.getCount() > 0)
                                            {
                                                option_store.each(function(record,idx){

                                                    var record_arr = record.data.option.split(" ");
                                                    var record_str = '';

                                                    if(record_arr.length > 3)
                                                    {
                                                        for(var i = 2; i < record_arr.length; i++)
                                                        {
                                                            if(i === record_arr.length - 1)
                                                            {
                                                                record_str += record_arr[i];
                                                            }
                                                            else
                                                            {
                                                                record_str += record_arr[i] + ' ';
                                                            }
                                                        }
                                                    }
                                                    else if(record_arr.length === 3)
                                                    {
                                                        record_str = record_arr[2];
                                                    }

                                                    if(record_str !== '')
                                                    {
                                                        Ext.each(record_str.split(','), function(data, index){

                                                            user_list.push(data);
                                                        });
                                                    }
                                                });
                                            }
                                        }

                                        function removeArrayDuplicate(array) {

                                            var a = {};

                                            for(var i=0; i <array.length; i++){

                                                if(typeof a[array[i]] == "undefined")
                                                a[array[i]] = 1;
                                            }

                                            array.length = 0;

                                            for(var i in a)
                                            array[array.length] = i;

                                            return array;
                                        }

                                        user_list = removeArrayDuplicate(user_list);

                                        if(start && end)
                                        {
                                            condition.s_ts = start.getTime()/1000;
                                            condition.e_ts = end.getTime()/1000;
                                        }

                                        if(event_code_list.length > 0)
                                        {
                                            condition.events = event_code_list;
                                        }

                                        if(level_list.length > 0)
                                        {
                                            condition.level = level_list;
                                        }

                                        if(user_list.length > 0)
                                        {
                                            condition.userid = user_list;
                                        }

                                        if(!me.down('gridpanel[itemId="gpn_setting_audit"]'))
                                        {
                                            var tmp = new Ext.XTemplate(
                                            '<tpl>',
                                            '<table width="100%" cellpadding="3" border="1" id="logtable" style="border-collapse:collapse;border:1px solid gray; font-size: 12px;">',
                                            '<tr><td><b>생성시간</b></td><td width="40%">{ts}</td>',
                                            '<td><b>레벨</b></td><td width="40%">{level}</td></tr>',
                                            '<tr><td><b>관리자ID</b></td><td width="40%">{user}</td>',
                                            '<td><b>이벤트</b></td><td width="40%">{event}</td></tr>',
                                            '<tr><td><b>결과코드</b></td><td width="40%">{error}</td>',
                                            '<td><b>대상</b></td><td width="40%">{object.name}</td></tr>',
                                            '<tr><td width="100"><b>설명</b></td><td colspan="3" style="width: 50%;"><pre><![CDATA[</pre>{desc}</td></tr>',
                                            '</table>',
                                            '</tpl>'
                                            );

                                            var grid = new Ext.grid.GridPanel({
                                                itemId : 'gpn_setting_audit',
                                                border: false,
                                                flex: 1,
                                                header: false,
                                                scroll : 'both',
                                                store : 'st_SettingAudit',
                                                autoScroll : true,
                                                collapsible: true,
                                                animCollapse: false,
                                                overflowX: 'auto',
                                                columns: [
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 220,
                                                    dataIndex: 'ts',
                                                    text: '생성시간'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'level',
                                                    text: '레벨'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'user',
                                                    text: '관리자ID'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 150,
                                                    dataIndex: 'event',
                                                    text: '이벤트'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 80,
                                                    dataIndex: 'error',
                                                    text: '결과코드'
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    width: 180,
                                                    dataIndex: 'object',
                                                    text: '대상',
                                                    renderer: function(value, metaData, record, row, col, store, gridView){
                                                        return value.name;
                                                    }
                                                },
                                                {
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'desc',
                                                    text: '설명',
                                                    flex: 1,
                                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                        var opt = "";
                                                        var obj_op = record.data.object.op;

                                                        if(obj_op === 'add' || obj_op === 'mod' || obj_op === 'del'){

                                                            var obj_ts_year =  record.data.ts.split(/\s/gi)[0];
                                                            var obj_ts_time =  record.data.ts.split(/\s/gi)[1];

                                                            opt = '<img width="13" height="13" style="margin-right:3px;margin-bottom:-2px;cursor:pointer" src="../resources/images/icon_option.png" onclick=get_objectlog(\"'+obj_op+'\",\"'+obj_ts_year+'\",\"'+obj_ts_time+'\") />';
                                                        }
                                                        return opt+value;
                                                    }
                                                }
                                                ],
                                                viewConfig: {
                                                    forceFit:true,
                                                    enableRowBody:true,
                                                    showPreview:false
                                                },
                                                plugins: [{
                                                    ptype: 'rowexpander',
                                                    rowBodyTpl : tmp
                                                }],
                                                dockedItems: [
                                                {
                                                    xtype: 'pagingtoolbar',
                                                    dock: 'bottom',
                                                    itemId: 'ptb_setting_audit',
                                                    width: 360,
                                                    afterPageText: '전체 페이지 {0}',
                                                    beforePageText: '페이지',
                                                    displayInfo: true,
                                                    displayMsg: '{2} 결과 중 {0} - {1}',
                                                    emptyMsg: '결과 없음',
                                                    firstText: '처음 페이지',
                                                    lastText: '마지막 페이지',
                                                    nextText: '다음 페이지',
                                                    prevText: '이전 페이지',
                                                    refreshText: '새로고침',
                                                    store: 'st_SettingAudit'
                                                }
                                                ],
                                                listeners: {
                                                    afterrender: {
                                                        fn: me.onGpn_setting_auditAfterRender,
                                                        scope: me
                                                    }
                                                }
                                            });

                                            grid.on('afterrender', function(component, eOpts) {
                                                addExporter(Ext.getCmp('pnl_setting_audit'), 'exportGrid', '#gpn_setting_audit', '', 'excel');
                                                component.getStore().removeAll();

                                                Ext.data.JsonP.request({

                                                    url : '/api/ftSMC/session_ping',
                                                    params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                    success : function(response){

                                                        if(response.retcode){

                                                            component.down('pagingtoolbar[itemId="ptb_setting_audit"]').onLoad();
                                                        }
                                                        else{

                                                            if(response.errcode === 268435490){

                                                                Ext.getCmp('vp_SMC_mainView').logout(true);

                                                            }
                                                            else if(response.errcode === 268435489){

                                                                Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                Ext.Msg.show({
                                                                    title: 'WeGuardia™ SMC',
                                                                    msg: response.errmsg,
                                                                    width: 300,
                                                                    buttons: Ext.Msg.OK,
                                                                    icon: Ext.window.MessageBox.INFO
                                                                });
                                                            }
                                                            else if(response.errcode === 268435527){

                                                                Ext.getCmp('vp_SMC_mainView').logout(false);

                                                                Ext.Msg.show({
                                                                    title: 'WeGuardia™ SMC',
                                                                    msg: response.errmsg,
                                                                    width: 300,
                                                                    buttons: Ext.Msg.OK,
                                                                    icon: Ext.window.MessageBox.INFO
                                                                });
                                                            }

                                                        }

                                                    },
                                                    failure : function(response){

                                                        console.log(response);

                                                    }

                                                });

                                            });

                                            me.add(grid);
                                        }

                                        if(me.down('gridpanel[itemId="gpn_setting_audit"]'))
                                        {
                                            var audit_store = me.down('gridpanel[itemId="gpn_setting_audit"]').getStore();

                                            audit_store.getProxy().setExtraParam('condition', Ext.encode(condition));

                                            Ext.data.JsonP.request({

                                                url : '/api/ftSMC/session_ping',
                                                params : {sid : Ext.encode(Ext.getCmp('vp_SMC_mainView').clientInfo.sessionInfo)},
                                                success : function(response){

                                                    if(response.retcode){

                                                        audit_store.loadPage(1, {
                                                            callback: function(){

                                                                if(audit_store.getCount() > 0)
                                                                {
                                                                    me.down('button[itemId="btn_save"]').enable();
                                                                }
                                                                else
                                                                {
                                                                    me.down('button[itemId="btn_save"]').disable();
                                                                }
                                                            }
                                                        });
                                                    }
                                                    else{

                                                        if(response.errcode === 268435490){

                                                            Ext.getCmp('vp_SMC_mainView').logout(true);

                                                        }
                                                        else if(response.errcode === 268435489){

                                                            Ext.getCmp('vp_SMC_mainView').logout(false);

                                                            Ext.Msg.show({
                                                                title: 'WeGuardia™ SMC',
                                                                msg: response.errmsg,
                                                                width: 300,
                                                                buttons: Ext.Msg.OK,
                                                                icon: Ext.window.MessageBox.INFO
                                                            });
                                                        }
                                                        else if(response.errcode === 268435527){

                                                            Ext.getCmp('vp_SMC_mainView').logout(false);

                                                            Ext.Msg.show({
                                                                title: 'WeGuardia™ SMC',
                                                                msg: response.errmsg,
                                                                width: 300,
                                                                buttons: Ext.Msg.OK,
                                                                icon: Ext.window.MessageBox.INFO
                                                            });
                                                        }

                                                    }

                                                },
                                                failure : function(response){

                                                    console.log(response);

                                                }

                                            });

                                        }
                                    },
                                    width: 100,
                                    text: '검색'
                                },
                                {
                                    xtype: 'button',
                                    handler: function(button, e) {
                                        exportGrid(Ext.getCmp('pnl_setting_audit'), 'exportGrid');
                                    },
                                    disabled: true,
                                    itemId: 'btn_save',
                                    margin: 1,
                                    width: 100,
                                    text: '파일 저장'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            hidden: true,
                            itemId: 'ctn_audit_condition',
                            margin: 1,
                            padding: 10,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'stretch'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            width: 70,
                                                            allowDepress: false,
                                                            text: '이벤트'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            itemId: 'ck_event',
                                                            boxLabel: '선택',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onChk_eventChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'treepanel',
                                                    disabled: true,
                                                    height: 150,
                                                    itemId: 'trpn_event',
                                                    margin: '0 10 0 10',
                                                    width: 420,
                                                    viewConfig: {

                                                    },
                                                    listeners: {
                                                        checkchange: {
                                                            fn: me.onTrpn_eventCheckChange,
                                                            scope: me
                                                        }
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    layout: 'vbox',
                                                    items: [
                                                        {
                                                            xtype: 'button',
                                                            width: 70,
                                                            allowDepress: false,
                                                            text: '로그 레벨'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            flex: 1,
                                                            itemId: 'ck_logLevel',
                                                            boxLabel: '선택',
                                                            listeners: {
                                                                change: {
                                                                    fn: me.onChk_logLevelChange,
                                                                    scope: me
                                                                }
                                                            }
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    margin: '0 10 0 10',
                                                    items: [
                                                        {
                                                            xtype: 'checkboxgroup',
                                                            disabled: true,
                                                            itemId: 'ckg_logLevel',
                                                            columns: 1,
                                                            layout: {
                                                                type: 'checkboxgroup',
                                                                autoFlex: false
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    width: 120,
                                                                    boxLabel: '1. Debug',
                                                                    inputValue: '10'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    width: 120,
                                                                    boxLabel: '2. Information',
                                                                    inputValue: '20'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    width: 120,
                                                                    boxLabel: '3. Warning',
                                                                    inputValue: '30'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    boxLabel: '4. Error',
                                                                    inputValue: '40'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    boxLabel: '5. Serious',
                                                                    inputValue: '50'
                                                                },
                                                                {
                                                                    xtype: 'checkboxfield',
                                                                    boxLabel: '6. Critical',
                                                                    inputValue: '60'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    itemId: 'fs_addOption',
                                    margin: '10 0 1 0',
                                    padding: '0 10 10 10',
                                    layout: 'auto',
                                    checkboxToggle: true,
                                    collapsed: true,
                                    title: '옵션 추가',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    height: 100,
                                                    itemId: 'gpn_addOption',
                                                    width: 500,
                                                    autoScroll: true,
                                                    header: false,
                                                    title: 'My Grid Panel',
                                                    hideHeaders: true,
                                                    store: 'st_SettingAuditOption',
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            dataIndex: 'option',
                                                            flex: 1
                                                        },
                                                        {
                                                            xtype: 'actioncolumn',
                                                            width: 30,
                                                            align: 'center',
                                                            items: [
                                                                {
                                                                    handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                                        Ext.getCmp('pnl_setting_audit').down('gridpanel[itemId="gpn_addOption"]').getStore().removeAt(rowIndex);
                                                                    },
                                                                    iconCls: 'ico_grid_row_delete'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'radiogroup',
                                                    itemId: 'rdg_addOption',
                                                    margin: '0 10 0 10',
                                                    items: [
                                                        {
                                                            xtype: 'radiofield',
                                                            width: 50,
                                                            name: 'option',
                                                            readOnly: true,
                                                            boxLabel: 'AND',
                                                            checked: true,
                                                            inputValue: 'AND'
                                                        },
                                                        {
                                                            xtype: 'radiofield',
                                                            width: 50,
                                                            name: 'option',
                                                            readOnly: true,
                                                            boxLabel: 'OR',
                                                            inputValue: 'OR'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'container',
                                                    layout: {
                                                        type: 'vbox',
                                                        align: 'center'
                                                    },
                                                    items: [
                                                        {
                                                            xtype: 'container',
                                                            layout: 'hbox',
                                                            items: [
                                                                {
                                                                    xtype: 'combobox',
                                                                    itemId: 'cmb_type',
                                                                    margin: '0 10 0 0',
                                                                    width: 100,
                                                                    editable: false,
                                                                    displayField: 'type_text',
                                                                    queryMode: 'local',
                                                                    store: 'st_SettingAuditType',
                                                                    valueField: 'type_value',
                                                                    listeners: {
                                                                        change: {
                                                                            fn: me.onCmb_typeChange,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                },
                                                                {
                                                                    xtype: 'combobox',
                                                                    itemId: 'cmb_option',
                                                                    width: 100,
                                                                    editable: false,
                                                                    displayField: 'option_text',
                                                                    queryMode: 'local',
                                                                    valueField: 'option_value',
                                                                    listeners: {
                                                                        change: {
                                                                            fn: me.onCmb_optionChange,
                                                                            scope: me
                                                                        }
                                                                    }
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'textfield',
                                                            itemId: 'txf_option',
                                                            margin: '10 0 10 0',
                                                            width: 210
                                                        },
                                                        {
                                                            xtype: 'container',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'middle',
                                                                pack: 'center'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'button',
                                                                    handler: function(button, e) {
                                                                        var me = Ext.getCmp('pnl_setting_audit');

                                                                        var option_store = me.down('gridpanel[itemId="gpn_addOption"]').getStore();
                                                                        var type_text = me.down('combobox[itemId="cmb_type"]').getRawValue();
                                                                        var addOption = me.down('radiogroup[itemId="rdg_addOption"]').getValue().option;
                                                                        var option = me.down('textfield[itemId="txf_option"]').getValue();
                                                                        var option_string = '';

                                                                        if(me.down('combobox[itemId="cmb_type"]').getValue() === 0)
                                                                        {
                                                                            if(option !== '')
                                                                            {
                                                                                option_string += addOption + ' ' + type_text + ' ' + option;

                                                                                option_store.add({
                                                                                    'option' : option_string
                                                                                });
                                                                            }
                                                                        }
                                                                    },
                                                                    margin: '1 10 1 0',
                                                                    width: 100,
                                                                    text: '추가'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    handler: function(button, e) {
                                                                        var me = Ext.getCmp('pnl_setting_audit');

                                                                        var option_store = me.down('gridpanel[itemId="gpn_addOption"]').getStore();
                                                                        var select_record = me.down('gridpanel[itemId="gpn_addOption"]').getSelectionModel().getSelection()[0];

                                                                        if(select_record)
                                                                        {
                                                                            var row = option_store.indexOf(select_record);

                                                                            option_store.each(function(record,idx){

                                                                                if(record.data.option === select_record.data.option && idx === row){

                                                                                    option_store.removeAt(idx);
                                                                                    return false;
                                                                                }
                                                                            });
                                                                        }
                                                                    },
                                                                    margin: 1,
                                                                    width: 100,
                                                                    text: '삭제'
                                                                }
                                                            ]
                                                        }
                                                    ]
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
                show: {
                    fn: me.onPnl_setting_auditShow,
                    scope: me
                },
                afterrender: {
                    fn: me.onPnl_setting_auditAfterRender,
                    scope: me
                }
            }
        });

        me.callParent(arguments);
    },

    onCmb_audit_periodChange: function(field, newValue, oldValue, eOpts) {
        var me = this;

        var today = new Date();
        var start;

        switch(newValue)
        {
            case 'day':

                start = new Date(today.getFullYear(), today.getMonth(), today.getDate());

                me.down('datefield[itemId="dtf_period_start"]').setValue(start);
                me.down('datefield[itemId="dtf_period_end"]').setValue(today);

                me.down('timefield[itemId="tmf_time_start"]').setValue('00:00');
                me.down('timefield[itemId="tmf_time_end"]').setValue('23:59');
                break;
            case 'week':

                start = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay()+1);

                me.down('datefield[itemId="dtf_period_start"]').setValue(start);
                me.down('datefield[itemId="dtf_period_end"]').setValue(today);

                me.down('timefield[itemId="tmf_time_start"]').setValue('00:00');
                me.down('timefield[itemId="tmf_time_end"]').setValue('23:59');
                break;
            case 'month':

                start = new Date(today.getFullYear(), today.getMonth(), 1);

                me.down('datefield[itemId="dtf_period_start"]').setValue(start);
                me.down('datefield[itemId="dtf_period_end"]').setValue(today);

                me.down('timefield[itemId="tmf_time_start"]').setValue('00:00');
                me.down('timefield[itemId="tmf_time_end"]').setValue('23:59');
                break;
        }
    },

    onChk_eventChange: function(field, newValue, oldValue, eOpts) {
        if(newValue)
        {
            Ext.getCmp('pnl_setting_audit').down('treepanel[itemId="trpn_event"]').enable();
        }
        else
        {
            Ext.getCmp('pnl_setting_audit').down('treepanel[itemId="trpn_event"]').disable();
        }
    },

    onTrpn_eventCheckChange: function(node, checked, eOpts) {
        if(node.childNodes)
        {
            for(var i in node.childNodes)
            {
                node.childNodes[i].set('checked',checked);

                if(node.childNodes[i].childNodes)
                {
                    for(var l in node.childNodes[i].childNodes)
                    {
                        node.childNodes[i].childNodes[l].set('checked',checked);
                    }
                }
            }
        }
    },

    onChk_logLevelChange: function(field, newValue, oldValue, eOpts) {
        if(newValue)
        {
            Ext.getCmp('pnl_setting_audit').down('checkboxgroup[itemId="ckg_logLevel"]').enable();
        }
        else
        {
            Ext.getCmp('pnl_setting_audit').down('checkboxgroup[itemId="ckg_logLevel"]').disable();
        }
    },

    onCmb_typeChange: function(field, newValue, oldValue, eOpts) {
        if(newValue === 0)
        {
            Ext.getCmp('pnl_setting_audit').down('combobox[itemId="cmb_option"]').bindStore(Ext.data.StoreManager.lookup("st_SettingAuditUser"));
        }
        else
        {
            Ext.getCmp('pnl_setting_audit').down('combobox[itemId="cmb_option"]').bindStore();
        }
    },

    onCmb_optionChange: function(field, newValue, oldValue, eOpts) {
        var me = Ext.getCmp('pnl_setting_audit');

        var option_arr = [];
        var duplicate_check = true;

        if(me.down('textfield[itemId="txf_option"]').getValue() === '')
        {
            me.down('textfield[itemId="txf_option"]').setValue(newValue);
        }
        else
        {
            option_arr = me.down('textfield[itemId="txf_option"]').getValue().split(',');

            for(var i in option_arr)
            {
                if(option_arr[i] === newValue)
                {
                    duplicate_check = false;
                    break;
                }
            }

            if(duplicate_check)
            {
                me.down('textfield[itemId="txf_option"]').setValue(me.down('textfield[itemId="txf_option"]').getValue() + ',' + newValue);
            }
        }
    },

    onPnl_setting_auditShow: function(component, eOpts) {
        var tree = component.down('treepanel[itemId="trpn_event"]');

        if(tree.getView().store.getCount() < 1)
        {
            request_helper.xmlrpc_call_JsonP(
                'ftSMC',
                'getEventCodeGroup',
                {},
                function(response){

                    response.checked = false;

                    if(response.children)
                    {
                        for(var i in response.children)
                        {
                            response.children[i].checked = false;

                            if(response.children[i].children)
                            {
                                for(var l in response.children[i].children)
                                {
                                    response.children[i].children[l].checked = false;
                                }
                            }
                        }
                    }

                    if(tree)
                    {
                        tree.setRootNode(response);
                        if(tree.getView().store)
                        {
                            tree.getView().refresh();
                        }
                    }
                }
            );
        }

        if(Ext.data.StoreManager.lookup("st_SettingAuditUser").getCount() < 1)
        {
            request_helper.xmlrpc_call_JsonP(
                'ftSMC',
                'getUsers',
                {},
                function(response2){

                    var user_list = [{
                        'option_text' : "SYSTEM",
                        'option_value' : "SYSTEM"
                    }];

                    for(var i in response2)
                    {
                        user_list.push({
                            'option_text' : response2[i].userid,
                            'option_value' : response2[i].userid
                        });
                    }

                    Ext.data.StoreManager.lookup("st_SettingAuditUser").loadData(user_list);
                }
            );
        }
    },

    onPnl_setting_auditAfterRender: function(component, eOpts) {
        component.down('combobox[itemId="cmb_audit_period"]').select(component.down('combobox[itemId="cmb_audit_period"]').getStore().getAt(0));

        component.down('gridpanel[itemId="gpn_addOption"]').getStore().removeAll();

        component.down('combobox[itemId="cmb_type"]').select(component.down('combobox[itemId="cmb_type"]').getStore().getAt(0));
    }

});