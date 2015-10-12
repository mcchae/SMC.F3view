
Ext.define('SMC4ZEN.view.NFW2_log_config_logServer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_log_config_logserver',

    requires: [
        'SMC4ZEN.view.NFW2_log_config_logServerViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Separator',
        'Ext.grid.column.Action',
        'Ext.XTemplate'
    ],

    viewModel: {
        type: 'nfw2_log_config_logserver'
    },
    //cls: 'zen_body',
    id: 'NFW2_log_config_logServer',
    defaultListenerScope: true,
    overflowY: 'auto',
    title : '서버 설정',
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose : 'saveData'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        bind: {
                            title: '{weguardia_log_server}'
                        },
                        bodyPadding: 5,
                        items: [
                            {
                                xtype: 'combobox',
                                id: 'xtm_smc_use',
                                padding: '0 0 5 0',
                                fieldLabel: '',
                                value: 'off',
                                editable: false,
                                displayField: 'name',
                                store: 'store_logserver_xtm',
                                valueField: 'val',
                                listeners: {
                                    change: 'onXtm_smc_useChange'
                                }
                            },
                            {
                                xtype: 'textfield',
                                validator: function(value) {
                                    if(value === true){ return true; }
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(!ValidIPAddress(value)){ return get_msg('err_ip'); }

                                    return true;
                                },
                                cls: 'lb_req',
                                id: 'xtm_ip',
                                labelSeparator: ' ',
                                msgTarget: 'none',
                                bind: {
                                    fieldLabel: '{ip}'
                                },
                                listeners: {
                                    errorchange: 'onXtm_ipErrorChange',
                                    focus: 'onXtm_ipFocus',
                                    blur: 'onXtm_ipBlur'
                                }
                            },
                            {
                                xtype: 'textfield',
                                validator: function(value) {
                                    if(value === true){ return true; }
                                    if(!CheckNotNull(value)){ return get_msg('err_null'); }
                                    if(!ValidNum(value)){ return get_msg('err_form'); }
                                    if(!LengthCheck(value, 1, 65535)){ return ValidLimit(1, 65535); }

                                    return true;
                                },
                                fieldInfo: '',
                                cls: 'lb_req',
                                id: 'xtm_port',
                                labelSeparator: ' ',
                                msgTarget: 'none',
                                value: '514',
                                enableKeyEvents: true,
                                enforceMaxLength: true,
                                maskRe: /[0-9.]/,
                                maxLength: 5,
                                bind: {
                                    fieldLabel: '{port}'
                                },
                                listeners: {
                                    errorchange: 'onXtm_portErrorChange',
                                    keydown: 'onXtm_portKeydown',
                                    focus: 'onXtm_portFocus',
                                    blur: 'onXtm_portBlur'
                                }
                            },
                            {
                                xtype: 'checkboxfield',
                                id: 'xtm_chk_ipsec',
                                labelSeparator: ' ',
                                bind: {
                                    fieldLabel: '{use_encryption}'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'form',
                        id: 'fm_log',
                        bind: {
                            title: '{syslog_server}'
                        },
                        bodyPadding: 5,
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                cls: 'zen_toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_add',
                                        bind: {
                                            text: '{add}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick1'
                                        }
                                    }
                                ]
                            }
                        ],
                        items: [
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                columnLines: true,
                                store: 'store_logserver_syslist',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        width: 60,
                                        align: 'center',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'ip',
                                        flex: 0.5,
                                        bind: {
                                            text: '{ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'port',
                                        flex: 0.5,
                                        bind: {
                                            text: '{port}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            return value.toUpperCase();
                                        },
                                        id: 'c_ipsec',
                                        width: 100,
                                        align: 'center',
                                        dataIndex: 'chk_enc',
                                        bind: {
                                            text: '{encryption}'
                                        }
                                    }
                                ],
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    selType: 'checkboxmodel'
                                }),
                                listeners: {
                                    celldblclick: 'onGrid_listCellDblClick'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'form',
                        bind: {
                            title: '{snmp}'
                        },
                        bodyPadding: 5,
                        dockedItems: [
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                cls: 'zen_toolbar',
                                items: [
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_add',
                                        bind: {
                                            text: '{add}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick4'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        iconCls: 'ic_del',
                                        bind: {
                                            text: '{del}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick5'
                                        }
                                    },
                                    {
                                        xtype: 'tbseparator'
                                    },
                                    {
                                        xtype: 'button',
                                        bind: {
                                            text: '{mib_list}'
                                        },
                                        listeners: {
                                            click: 'onButtonClick6'
                                        }
                                    }
                                ]
                            }
                        ],
                        items: [
                            {
                                xtype: 'gridpanel',
                                cls: 'tbl_fw',
                                id: 'system_snmp_list',
                                columnLines: true,
                                store: 'store_system_snmp_list',
                                columns: [
                                    {
                                        xtype: 'rownumberer',
                                        width: 60,
                                        align: 'center',
                                        text: 'N'
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        minWidth: 100,
                                        dataIndex: 'ip_type',
                                        flex: 0.5,
                                        bind: {
                                            text: '{ip_type}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = view.getStore().getAt(rowIndex);

                                            if(rec.get('snmp_type') === 'snmpv3'){
                                                return rec.get('user_name');
                                            }else{
                                                return rec.get('community');
                                            }
                                        },
                                        minWidth: 150,
                                        dataIndex: 'community',
                                        flex: 1,
                                        bind: {
                                            text: '{user_name_comm}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = view.getStore().getAt(rowIndex);
                                            return (rec.get('trap_ip') === '')? "-":rec.get('trap_ip');
                                        },
                                        minWidth: 150,
                                        dataIndex: 'trap_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{trap_address}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            var rec = view.getStore().getAt(rowIndex);

                                            return (rec.get('snmp_type') === 'snmpv2')? "-":rec.get('auth_algo');
                                        },
                                        minWidth: 150,
                                        dataIndex: 'auth_algo',
                                        flex: 1,
                                        bind: {
                                            text: '{auth_algorithm}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                            
                                            var rec = view.getStore().getAt(rowIndex);

                                            return (rec.get('snmp_type') === 'snmpv2')? "-":rec.get('privacy_algo');

                                        },
                                        dataIndex: 'privacy_algo',
                                        flex: 1,
                                        bind: {
                                            text: '{pwd_algorithm}'
                                        }
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        id: 'action',
                                        width: 100,
                                        align: 'center',
                                        renderTpl: [
                                            '<div id="{id}-titleEl" data-ref="titleEl" {tipMarkup}class="',
                                            'x-',
                                            'column-header-inner<tpl if="!$comp.isContainer"> ',
                                            'x-',
                                            'leaf-column-header</tpl>',
                                            '<tpl if="empty"> ',
                                            'x-',
                                            'column-header-inner-empty</tpl>">',
                                            '<span class="',
                                            'x-',
                                            'column-header-text-container">',
                                            '<span class="',
                                            'x-',
                                            'column-header-text-wrapper">',
                                            '<span id="{id}-textEl" data-ref="textEl" class="',
                                            'x-',
                                            'column-header-text',
                                            '{childElCls}">',
                                            '{[__zen(\'operating\')]}',
                                            '</span>',
                                            '</span>',
                                            '</span>',
                                            '<tpl if="!menuDisabled">',
                                            '<div id="{id}-triggerEl" data-ref="triggerEl" role="presentation" class="',
                                            'x-',
                                            'column-header-trigger',
                                            '{childElCls}" style="{triggerStyle}"></div>',
                                            '</tpl>',
                                            '</div>',
                                            '{%this.renderContainer(out,values)%}'
                                        ],
                                        items: [
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {

                                                    return (r.get('snmp_type') === 'snmpv3')? "b_v3":"b_v3_off";

                                                }

                                            },
                                            {
                                                getClass: function(v, metadata, r, rowIndex, colIndex, store) {

                                                    return (r.get('snmp_use') === 'on')? "b_on":"b_off";

                                                },
                                                handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                    
                                                    var rec = view.getStore().getAt(rowIndex);
                                                    
                                                    snmp_use = rec.get("snmp_use");
                                                    snmp_use = (snmp_use === "on")? "off":"on";

                                                    record.set({'snmp_use' : snmp_use});

                                                }
                                            }
                                        ]
                                    }
                                ],
                                viewConfig: {
                                    getRowClass: function(record, rowIndex, rowParams, store) {
                                        
                                        if(record.get("snmp_use") === "off"){

                                            Ext.Function.defer(function(){

                                                this.removeRowCls(rowIndex, 'x-grid-row-alt');

                                            },100, this);

                                            return "stOff";
                                        }

                                    }
                                },
                                selModel: {
                                    selType: 'checkboxmodel'
                                },
                                listeners: {
                                    celldblclick: 'onSystem_snmp_listCellDblClick'
                                }
                            }
                        ]
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'bottom',
                        ui: 'footer',
                        items: [
                            {
                                xtype: 'container',
                                flex: 1,
                                cls: 'fld_msg',
                                itemId: 'fld_msg3'
                            }
                        ]
                    }
                ]

            };

        if (instanceConfig) {

            me.getConfigurator().merge(me, config, instanceConfig);

        }

        return me.callParent([config]);

    },

    onXtm_smc_useChange: function(field, newValue, oldValue, eOpts) {
        
        var ip = Ext.getCmp("xtm_ip");

        if(newValue === "on"){

            ip.disable();

        }
        else{

            ip.enable();

        }

    },

    onXtm_ipErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg3");
    },

    onXtm_ipFocus: function(component, event, eOpts) {
        var str = disp_help_ip('4s');
        component.fieldInfo = str;
        setTipFocus(this,component);
    },

    onXtm_ipBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onXtm_portErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, "fld_msg3");
    },

    onXtm_portKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){
            e.stopEvent();
        }
    },

    onXtm_portFocus: function(component, event, eOpts) {
        component.fieldInfo = __zen('input_range')+'1 ~ 65535';
        setTipFocus(this,component);
    },

    onXtm_portBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        component.validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        
        var _store = Ext.data.StoreManager.lookup("store_logserver_syslist");

        if(_store.getTotalCount() >= 5){

            Ext.Msg.alert("WeGuardia™ ZEN",ValidMaxCnt(5));

        }
        else{

            var win = Ext.create('SMC4ZEN.view.win_syslog');

            win.show();

        }

    },

    onButtonClick1: function(button, e, eOpts) {
        
        var me = this;

        var grid = Ext.getCmp("grid_list");
        var grid_chk = grid.getSelection();
        var st_sysloglist = Ext.data.StoreManager.lookup("store_logserver_syslist");

        if(grid_chk.length === 0){

            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));

            return false;

        }

        Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"), function(btn){
        
            if(btn === "yes"){

                st_sysloglist.remove(grid_chk);

            }

        });

    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        
        var win = Ext.create('SMC4ZEN.view.win_syslog',{

            edit: "edit",
            record: record

        });

        win.show();

    },

    onPanelAfterRender: function(component, eOpts) {

        var me = this;
        var vm = me.getViewModel();
        var vd = vm.getData();
        
        me.fieldInfo = makeZenTip();

        me.init_logserver(vd);

    },

    onButtonClick4: function(button, e, eOpts) {

        var win = Ext.create('SMC4ZEN.view.win_snmp',{

            modal : true

        });

        var totalv2 = 0;
        var totalv3 = 0;
        var dat_snmplist = Ext.getCmp('system_snmp_list').getStore().getData();

        for(var i = 0, max = dat_snmplist.length; i < max; i++){

            if(dat_snmplist.items[i].get('snmp_type') === 'snmpv2'){

                totalv2++;

            }
            else{

                totalv3++;

            }


        }

        if(totalv2 >= 5 && totalv3 >= 1){

            Ext.Msg.show({
                title: 'WeGuardia™ ZEN',
                msg: get_msg("err_snmpcnt"),
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

        }
        else{

            win.show();

        }

    },

    onButtonClick5: function(button, e, eOpts) {

        var tbl = Ext.getCmp("system_snmp_list");
        var tbl_sel = tbl.getSelection();
        var st_snmplist = Ext.data.StoreManager.lookup('store_system_snmp_list');

        if(tbl_sel.length === 0){

            Ext.Msg.alert("WeGuardia™ ZEN",get_msg("sel_del"));

            return false;

        }
        else{

            Ext.MessageBox.confirm("WeGuardia™ ZEN",get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    st_snmplist.remove(tbl_sel);

                }

            });

        }

    },

    onButtonClick6: function(button, e, eOpts) {
        
        var win = Ext.create('SMC4ZEN.view.win_oid',{
            
            modal : true

        });

        win.show();

    },

    onSystem_snmp_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        
        var win = Ext.create('SMC4ZEN.view.win_snmp',{
            
            edit : "edit",
            record: record,
            modal : true

        });

        win.show();

    },

    init_logserver: function(viewData) {
        
        // 로그서버 SYSLOG 초기화

        var sysloglist = [];
        var dat_syslog = viewData.syslog_setting;
        var st_sysloglist = Ext.data.StoreManager.lookup('store_logserver_syslist');

        if(dat_syslog.length > 0){

            for(var i = 0, max = dat_syslog.length; i < max; i++){

                var syslogTmp = {};

                if(dat_syslog[i]._kind === 'syslog'){

                    syslogTmp.ip = dat_syslog[i].ip;
                    syslogTmp.port = dat_syslog[i].port;
                    syslogTmp._kind = dat_syslog[i]._kind;
                    syslogTmp.chk_enc = dat_syslog[i].chk_enc;
                    syslogTmp.chk_ipsec = "";
                    syslogTmp.smc_use = "";

                    sysloglist.push(syslogTmp);

                }
                else{

                    Ext.getCmp("xtm_smc_use").setValue(dat_syslog[i].smc_use);
                    Ext.getCmp("xtm_port").setValue(dat_syslog[i].port);

                    if(dat_syslog[i].smc_use === "off"){

                        Ext.getCmp("xtm_ip").setValue(dat_syslog[i].ip);

                    }

                    Ext.getCmp("xtm_chk_ipsec").setValue((dat_syslog[i].chk_ipsec === 'on') ? true : false);

                }

            }

            st_sysloglist.loadData(sysloglist);

        }

        // SNMP 초기화

        var snmplist = [];
        var dat_snmp = viewData.system_snmp;
        var st_snmplist = Ext.data.StoreManager.lookup('store_system_snmp_list');

        if(dat_snmp.length > 0){

            for(var i = 0, max = dat_snmp.length; i < max; i++){

                // SNMPv2 /SNMPv3 구분

                var snmpTmp = {};

                snmpTmp.trap_ip = dat_snmp[i].trap_ip;
                snmpTmp.ip_type = dat_snmp[i].ip_type;
                snmpTmp.snmp_use = (dat_snmp[i].snmp_use === 'on') ? true : false;
                snmpTmp.snmp_type = dat_snmp[i].snmp_type;

                snmpTmp.community = (snmpTmp.snmp_type === 'snmpv2') ? dat_snmp[i].community : null;

                snmpTmp.user_name = (snmpTmp.snmp_type === 'snmpv3') ? dat_snmp[i].user_name : null;
                snmpTmp.auth_algo = (snmpTmp.snmp_type === 'snmpv3') ? dat_snmp[i].auth_algo : null;
                snmpTmp.auth_pass = (snmpTmp.snmp_type === 'snmpv3') ? dat_snmp[i].auth_pass : null;
                snmpTmp.privacy_algo = (snmpTmp.snmp_type === 'snmpv3') ? dat_snmp[i].privacy_algo : null;
                snmpTmp.privacy_pass = (snmpTmp.snmp_type === 'snmpv3') ? dat_snmp[i].privacy_pass : null;

                snmplist.push(snmpTmp);

            }

            st_snmplist.loadData(snmplist);

        }

    },

    saveData : function(){

        var me = this;
        var vm = me.parentObj.getViewModel();

        // 로그서버
        var sysloglist = [];
        var ip = Ext.getCmp("xtm_ip");
        var port = Ext.getCmp("xtm_port");
        var smc_use = Ext.getCmp("xtm_smc_use");       
        var chk_ipsec = Ext.getCmp("xtm_chk_ipsec");

        if(!port.isValid()){ 

            port.focus();

            me.parentObj.viewState = false;

            return false; 

        }

        if(smc_use.getValue() === "off"){

            if(!ip.isValid()){ 

                ip.focus();

                me.parentObj.viewState = false;

                return false; 

            }

        }

        var logserverObj = {};
        
        logserverObj.ip = (smc_use.getValue() === "off") ? ip.getValue() : "";
        logserverObj.port = port.getValue();
        logserverObj._kind = 'weguardia';
        logserverObj.smc_use = smc_use.getValue();
        logserverObj.chk_ipsec = (chk_ipsec.getValue()) ? "on":"off";

        sysloglist.push(logserverObj);

        // Syslog 설정
        
        var st_sysloglist = Ext.data.StoreManager.lookup('store_logserver_syslist').getData();

        for(var i = 0, max = st_sysloglist.count(); i < max; i++){

            var syslogTmp = {};

            if(st_sysloglist.items[i].get('_kind') === 'syslog'){

                syslogTmp.ip = st_sysloglist.items[i].get('ip');
                syslogTmp.port = st_sysloglist.items[i].get('port');
                syslogTmp._kind = "syslog";
                syslogTmp.chk_enc = (st_sysloglist.items[i].get('chk_enc')) ? 'on' : 'off';

            }
            else{

                syslogTmp.ip = st_sysloglist.items[i].get('ip');
                syslogTmp.port = st_sysloglist.items[i].get('port');
                syslogTmp._kind = "weguardia";
                syslogTmp.smc_use = st_sysloglist.items[i].get('smc_use');
                syslogTmp.chk_ipsec = (st_sysloglist.items[i].get('chk_ipsec')) ? 'on' : 'off';

            }

            sysloglist.push(syslogTmp);

        }

        vm.set('syslog_setting', sysloglist);

        // SNMP 저장

        var snmplist = [];
        var st_snmplist = Ext.data.StoreManager.lookup('store_system_snmp_list').getData();

        // snmpv2, snmpv3 데이터 타입 

        for(var i = 0, max = st_snmplist.count(); i < max; i++){

            var snmpTmp = {};

            snmpTmp.trap_ip = st_snmplist.items[i].get('trap_ip');
            snmpTmp.ip_type = st_snmplist.items[i].get('ip_type');
            snmpTmp.snmp_use = (st_snmplist.items[i].get('snmp_use')) ? 'on' : 'off';
            snmpTmp.snmp_type = st_snmplist.items[i].get('snmp_type');

            if(st_snmplist.items[i].get('snmp_type') === 'snmpv2'){

                snmpTmp.community = st_snmplist.items[i].get('community');

            }
            else{

                snmpTmp.user_name = st_snmplist.items[i].get('user_name');
                snmpTmp.auth_algo = st_snmplist.items[i].get('auth_algo');
                snmpTmp.auth_pass = st_snmplist.items[i].get('auth_pass');
                snmpTmp.privacy_algo = st_snmplist.items[i].get('privacy_algo');
                snmpTmp.privacy_pass = st_snmplist.items[i].get('privacy_pass');

            }

            snmplist.push(snmpTmp);

        }

        vm.set('system_snmp', snmplist);

        me.parentObj.viewState = true;

        return true;

    }

});