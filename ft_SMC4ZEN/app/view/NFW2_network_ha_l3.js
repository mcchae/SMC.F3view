
Ext.define('SMC4ZEN.view.NFW2_network_ha_l3', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_ha_l3',

    requires: [
        'SMC4ZEN.view.NFW2_network_ha_l3ViewModel',
        'Ext.form.Panel',
        'Ext.form.field.ComboBox',
        'Ext.form.Label',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.toolbar.Toolbar'
    ],

    viewModel: {
        type: 'nfw2_network_ha_l3'
    },
    //cls: 'zen_body',
    id: 'NFW2_network_ha_l3',
    defaultListenerScope: true,
    title : 'L3',
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose : 'saveData'
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            margin: '10 0 0 0',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                }
            ]
        }
    ],
    overflowY: 'auto',
    bodyPadding: 5,
    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'form',
                        id : 'frp_hal3',
                        layout: 'auto',
                        items: [
                            {
                                xtype: 'combobox',
                                id: 'compose',
                                margin: '5 0 0 0',
                                width: 300,
                                labelSeparator: ' ',
                                labelWidth: 120,
                                value: 'Active-Active',
                                editable: false,
                                displayField: 'val',
                                store: 'store_l3_compose',
                                valueField: 'val',
                                bind: {
                                    fieldLabel: '{config}'
                                },
                                listeners: {
                                    change: 'onComposeChange'
                                }
                            },
                            {
                                xtype: 'combobox',
                                id: 'config',
                                margin: '5 0 0 0',
                                width: 300,
                                labelSeparator: ' ',
                                labelWidth: 120,
                                value: 'Active(Master)',
                                editable: false,
                                displayField: 'val',
                                store: 'store_l3_config_a',
                                valueField: 'val',
                                bind: {
                                    fieldLabel: '{set}',
                                    value : '{ha_head_script.head_mode.config}'
                                },
                                listeners: {
                                    change: 'onConfigChange'
                                }
                            },
                            {
                                xtype: 'combobox',
                                id: 'way',
                                margin: '5 0 0 0',
                                width: 300,
                                labelSeparator: ' ',
                                labelWidth: 120,
                                value: 'Keep Synchronous',
                                editable: false,
                                displayField: 'name',
                                store: 'store_l3_way_a',
                                valueField: 'val',
                                bind: {
                                    fieldLabel: '{method}',
                                    value : '{ha_head_script.head_mode.way}'
                                }
                            },
                            {
                                xtype: 'container',
                                margin: '5 0 8 0',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                },
                                items: [
                                    {
                                        xtype: 'label',
                                        cls: 'lb_req',
                                        width: 125,
                                        bind: {
                                            text: '{basic_group_num}'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        validator: function(value) {
                                            if(value !== true){
                                                if(!CheckNotNull(value)){ return get_error_msg('err_required'); }
                                                if(!ValidNum(value)){ return get_error_msg('err_form'); }
                                                if(!LengthCheck(value, 1, 254)){ return ValidLimit(1, 254); }
                                            }
                                            return true;
                                        },
                                        fieldInfo: '',
                                        id: 'group_n',
                                        width: 80,
                                        labelSeparator: ' ',
                                        labelWidth: 120,
                                        msgTarget: 'none',
                                        value: 100,
                                        enforceMaxLength: true,
                                        maskRe: /[0-9]/,
                                        maxLength: 3,
                                        minLength: 1,
                                        listeners: {
                                            errorchange: 'onGroup_nErrorChange',
                                            keydown: 'onGroup_nKeydown',
                                            focus: 'onGroup_nFocus',
                                            blur: 'onGroup_nBlur'
                                        },
                                        bind : {
                                            value : '{ha_head_script.head_mode.group_num}'
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                cls: 'btn_b',
                                componentCls: 'btn_auth',
                                id: 'btn_add',
                                iconCls: 'icb_add',
                                bind: {
                                    text: '{add}'
                                },
                                listeners: {
                                    click: 'onButtonClick'
                                }
                            },
                            {
                                xtype: 'button',
                                cls: 'btn_b',
                                componentCls: 'btn_auth',
                                margin: '0 0 0 5',
                                iconCls: 'icb_del',
                                bind: {
                                    text: '{del}'
                                },
                                listeners: {
                                    click: 'onButtonClick2'
                                }
                            },
                            {
                                xtype: 'gridpanel',
                                id: 'grid_list',
                                margin: '5 0 0 0',
                                title: '',
                                columnLines: true,
                                store: 'store_ha_head_list',
                                columns: [
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'inter',
                                        flex: 1,
                                        bind: {
                                            text: '{inter}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_vir_back',
                                        dataIndex: 'virtual_a_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{active_virtual_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'machine_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{l3_device_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_back',
                                        dataIndex: 'virtual_b_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{backup_virtual_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        id: 'col_bm',
                                        dataIndex: 'master_b_ip',
                                        flex: 1,
                                        bind: {
                                            text: '{backup_device_ip}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'period',
                                        flex: 1,
                                        bind: {
                                            text: '{check_period}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'timeout',
                                        flex: 1,
                                        bind: {
                                            text: '{timeout}'
                                        }
                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'group_num',
                                        flex: 1,
                                        bind: {
                                            text: '{group_num}'
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
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onComposeChange: function(field, newValue, oldValue, eOpts) {
        
        var me = this;
        var way = Ext.getCmp("way");
        var config = Ext.getCmp("config");
        var group_n = Ext.getCmp("group_n");
        var compose = Ext.getCmp("compose");

        var way_a = Ext.data.StoreManager.lookup("store_l3_way_a");
        var way_s = Ext.data.StoreManager.lookup("store_l3_way_s");
        var config_a = Ext.data.StoreManager.lookup("store_l3_config_a");
        var config_s = Ext.data.StoreManager.lookup("store_l3_config_s");

        var st_haheadlist = Ext.getCmp("grid_list").getStore();

        if(newValue === "Active-Active"){

            config.bindStore(config_a);
            way.bindStore(way_a);
            config.setValue("Active(Master)");
            way.setValue("Keep Synchronous");
            Ext.getCmp("col_back").show();

        }
        else{

            config.bindStore(config_s);
            way.bindStore(way_s);
            config.setValue("Active(Master)");
            way.setValue("Keep Setting");
            Ext.getCmp("col_back").hide();

        }

        if(me.compose !== newValue){

            if(st_haheadlist.data.length > 0){
                
                Ext.Msg.confirm(__weguardia,"구성을 바꾸면, 현재 구성의 내용이 모두 삭제됩니다.<br>계속 하시겠습니까?", function(btn){
                    
                    if(btn === "yes"){

                        var parentViewData = me.parentObj.getViewModel().getData();

                        parentViewData.ha_head_script.aa_checkers = [];
                        parentViewData.ha_head_script.as_checkers = [];

                        st_haheadlist.removeAll();

                    }
                    else{

                        Ext.getCmp("compose").setValue(oldValue);

                    }

                });

            }

        }

    },

    onConfigChange: function(field, newValue, oldValue, eOpts) {
        
        var compose = Ext.getCmp("compose");
        var col_bm = Ext.getCmp("col_bm");
        var col_back = Ext.getCmp("col_back");
        var col_vir_back = Ext.getCmp("col_vir_back");

        if(newValue === "Active(Master)"){

            col_bm.setText("Backup 장비 IP");
            col_vir_back.setText("Active 가상 IP");

        }
        else{

            col_bm.setText("Master 장비 IP");

            if(compose.getValue() === "Active-Standby"){

                col_vir_back.setText("Backup 가상 IP");

            }

        }

    },

    onGroup_nErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onGroup_nKeydown: function(textfield, e, eOpts) {
        var code = e.getCharCode();

        if(ValidNumKeydown(code)===false){

            e.stopEvent();

        }
    },

    onGroup_nFocus: function(component, event, eOpts) {
        setTipFocus(this,component);
        component.fieldInfo = __zen('input_range')+'1 ~ 254';
    },

    onGroup_nBlur: function(component, event, eOpts) {
        setTipBlur(this,component);
        Ext.getCmp('group_n').validateValue(true);
    },

    onButtonClick: function(button, e, eOpts) {
        
        var me = this;

        var way = Ext.getCmp("way");
        var config = Ext.getCmp("config");
        var compose = Ext.getCmp("compose");
        var group_n = Ext.getCmp("group_n");

        var groupNum = group_n.getValue();

        var win = Ext.create("SMC4ZEN.view.win_ha_l3", {

            'parentObj' : me.parentObj,
            'group_num' : groupNum

        });

        win.show();

    },

    onButtonClick2: function(button, e, eOpts) {

        var me = this;
        var gpn_halist = Ext.getCmp("grid_list");
        var st_halist = gpn_halist.getStore();
        var sel_hadata = gpn_halist.getSelection();

        if(sel_hadata.length === 0){

            Ext.Msg.alert(__weguardia, get_msg("sel_del"));

            return false;

        }

        Ext.MessageBox.confirm(__weguardia,get_msg("conf_del"),function(btn){
            
            if(btn === "yes"){

                st_halist.remove(sel_hadata);

                me.setGroupNumbers();

            }

        });

    },

    onGrid_listCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        
        var group_n = Ext.getCmp('group_n');

        var win = Ext.create("SMC4ZEN.view.win_ha_l3",{

            'edit' : "edit",
            'record' : record,
            'group_num' : group_n.getValue()

        });

        win.show();

    },

    onPanelAfterRender: function(component, eOpts) {

        var me = this;

        me.fieldInfo = makeZenTip();

        me.get_ha_head_list();

    },

    get_ha_head_list: function(type) {

        var me = this;
        var vm = me.getViewModel();
        var vd = vm.getData();
        var vd_hascript = vd.ha_head_script;
        var vd_brscript = vd.ha_branch_script;

        var way_a = Ext.data.StoreManager.lookup("store_l3_way_a");
        var way_s = Ext.data.StoreManager.lookup("store_l3_way_s");
        var config_a = Ext.data.StoreManager.lookup("store_l3_config_a");
        var config_s = Ext.data.StoreManager.lookup("store_l3_config_s");

        var _store = Ext.data.StoreManager.lookup("store_ha_head_list");

        if(vd_brscript.aa_main_checkers.length > 0 || vd_brscript.as_main_checkers.length > 0){

            prt_errMsg(get_msg('err_ha'),null);

        }

        _store.removeAll();

        var ar_c = [];
        var checkers = null;
        var compose = Ext.getCmp('compose');

        me.compose = vd_hascript.head_mode.compose;
        compose.setValue(me.compose);

        if(vd_hascript.head_mode.compose === "Active-Active"){

            checkers = vd_hascript.aa_checkers;
            Ext.getCmp("col_back").show();

        }
        else{

            checkers = vd_hascript.as_checkers;
            Ext.getCmp("col_back").hide();
            Ext.getCmp("col_bm").show();

        }

        var group_number = Number(vd_hascript.head_mode.group_num);

        for(var i = 0; i < checkers.length; i++){

            if(compose === "Active-Active"){

                var virtual_ip = checkers[i].virtual_active_ip;

            }
            else{

                var virtual_ip = checkers[i].virtual_active_ip;

            }

            var obj = {};
            var groupNum = (group_number + i * 2);

            obj.inter = checkers[i]['interface'];
            obj.period = checkers[i].period;
            obj.timeout = checkers[i].timeout;
            obj.group_num = groupNum.toString() + ', ' + (groupNum + 1).toString();
            obj.machine_ip = checkers[i].machine_ip;
            obj.master_b_ip = checkers[i].master_backup_ip;
            obj.virtual_a_ip = virtual_ip;
            obj.virtual_b_ip = checkers[i].virtual_backup_ip;

            ar_c.push(obj);

        }

        _store.loadData(ar_c);

    },

    setGroupNumbers : function(){

        var me = this;
        var groupn = Ext.getCmp('group_n');
        var gpn_halist = Ext.getCmp('grid_list');
        var st_halist = gpn_halist.getStore();
        var groupNumber = Number(groupn.getValue());

        me.setLoading('그룹번호를 재설정 하는 중 ...', true);

        var haData = st_halist.getData();

        for(var i = 0, max = st_halist.count(); i < max; i++){

            var groupNum = (groupNumber + i * 2);
            var groupnumber = groupNum.toString() + ', ' + (groupNum + 1).toString();

            haData.items[i].set({'group_num' : groupnumber});
            haData.items[i].commit();

        }

        me.setLoading(false);

    },

    saveData : function(component, eOpts){

        // 공통 변수 모음

        var me = this;
        var vm = me.parentObj.getViewModel();
        var vd = vm.getData().ha_head_script;

        // 유효성 검사 컴포넌트 모음

        var way = Ext.getCmp("way");
        var config = Ext.getCmp("config");
        var compose = Ext.getCmp("compose");
        var group_n = Ext.getCmp("group_n");

        // 뷰-모델 스토어 데이터

        var st_haheadlist = Ext.data.StoreManager.lookup("store_ha_head_list");
        var hahead_data = st_haheadlist.getData();

        // 유효성 검사 수행

        if(group_n.isValid()===false){ 

            group_n.focus();

            me.parentObj.viewState = false;

            return false; 

        }

        if(me.compose === compose.getValue() && me.config === config.getValue() && me.way === way.getValue() && me.group_num === group_n.getValue()){
            
            me.parentObj.viewState = false;

            return false;

        }

        // 데이터 저장

        var aa_checkers = [];
        var as_checkers = [];

        if(compose.getValue() === 'Active-Active'){

            for(var i = 0, max = hahead_data.items.length; i < max; i++){

                var aa_obj = {};

                aa_obj.period = hahead_data.items[i].get('period');
                aa_obj.timeout = hahead_data.items[i].get('timeout');
                aa_obj.interface = hahead_data.items[i].get('inter');
                aa_obj.machine_ip = hahead_data.items[i].get('machine_ip');
                aa_obj.master_backup_ip = hahead_data.items[i].get('master_b_ip');
                aa_obj.virtual_active_ip = hahead_data.items[i].get('virtual_a_ip');
                aa_obj.virtual_backup_ip = hahead_data.items[i].get('virtual_b_ip');
                
                aa_checkers.push(aa_obj);

            }

            vd.aa_checkers = aa_checkers;

        }
        else{

            for(var i = 0, max = hahead_data.items.length; i < max; i++){

                var as_obj = {};

                as_obj.period = hahead_data.items[i].get('period');
                as_obj.timeout = hahead_data.items[i].get('timeout');
                as_obj.interface = hahead_data.items[i].get('inter');
                as_obj.machine_ip = hahead_data.items[i].get('machine_ip');
                as_obj.master_backup_ip = hahead_data.items[i].get('master_b_ip');
                as_obj.virtual_active_ip = hahead_data.items[i].get('virtual_a_ip');
                aa_obj.virtual_backup_ip = "";

                as_checkers.push(as_obj);

            }

            vd.as_checkers = as_checkers;

        }

        vd.head_mode.compose = compose.getValue();

        vm.set('ha_head_script', vd);

        me.parentObj.viewState = true;

        return true;

    }

});