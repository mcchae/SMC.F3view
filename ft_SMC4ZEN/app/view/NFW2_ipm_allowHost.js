
Ext.define('SMC4ZEN.view.NFW2_ipm_allowHost', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_ipm_allowhost',

    requires: [
        'SMC4ZEN.view.NFW2_ipm_allowHostViewModel',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.grid.column.RowNumberer',
        'Ext.view.Table',
        'Ext.selection.CheckboxModel',
        'Ext.grid.column.Action',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_ipm_allowhost'
    },
    //cls: 'zen_body',
    id: 'NFW2_ipm_allowHost',
    defaultListenerScope: true,
    overflowY: 'auto',
    title : '허용호스트 설정',
    items: [
        {
            xtype: 'form',
            header: false,
            bodyPadding: 5,
            layout:{
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'toolbar',
                    //cls: 'zen_toolbar',
                    margin : '0 5 0 -5',
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
                },
                {
                    xtype: 'container',
                    margin: '5 0 0 0',
                    items: [
                        {
                            xtype: 'gridpanel',
                            id: 'ipm_host_grid',
                            header: false,
                            columnLines: true,
                            store: 'store_ipm_host_list',
                            columns: [
                                {
                                    xtype: 'rownumberer',
                                    width: 60,
                                    align: 'center',
                                    dataIndex: 'string',
                                    text: 'N'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'interface',
                                    flex: 1,
                                    bind: {
                                        text: '{inter}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var result = [];

                                        for(var i in value){
                                            if(value[i] !== null){ result.push(value[i]); }
                                        }

                                        if(result.length === 1){
                                            return result[0];
                                        }
                                        else{
                                            console.log(1);
                                            return result.join('</br>');
                                        }
                                    },
                                    dataIndex: 'ip',
                                    flex: 1,
                                    bind: {
                                        text: '{ip}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        var result = [];

                                        for(var i in value){
                                            if(value[i] !== null){ result.push(value[i]); }
                                        }

                                        if(result.length === 1){
                                            return result[0];
                                        }
                                        else{
                                            return result.join('</br>');
                                        }
                                    },
                                    dataIndex: 'mac',
                                    flex: 1,
                                    bind: {
                                        text: '{mac}'
                                    }
                                },
                                {
                                    xtype: 'gridcolumn',
                                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                        
                                        if(value !== undefined && value.length > 0){

                                            console.log(value.time);
                                            
                                            var time = value.time.join('<br>');
                                            var temp = time.split(' ');

                                            return temp[0] +" "+ temp[1] + "시 " + temp[2] +" "+ temp[3] +" "+ temp[4] + "시";
                                        }
                                        else{

                                            return "";

                                        }

                                    },
                                    width: 230,
                                    dataIndex: 'schedule',
                                    text: '기간 설정'
                                },
                                {
                                    xtype: 'gridcolumn',
                                    hidden: true,
                                    flex: 1.5,
                                    bind: {
                                        text: '{schedule}'
                                    },
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var period = value.period.join('<br>');

                                                    return period;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 170,
                                            dataIndex: 'schedule',
                                            text: '기간'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var result = [];

                                                    var month = value.month.join(', ');

                                                    if(month !== ""){ result.push('월 : '+month); }

                                                    return result;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 110,
                                            dataIndex: 'schedule',
                                            text: '매년'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var result = [];

                                                    var day = value.day.join(', ');

                                                    if(day !== ""){ result.push('일 : '+day); }

                                                    return result;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 110,
                                            dataIndex: 'schedule',
                                            text: '매월'
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                                                if(value !== undefined){
                                                    var result = [];
                                                    var week_temp = [];
                                                    if(value.week_list[0].chk_sun === "on"){ week_temp.push("일"); }
                                                    if(value.week_list[0].chk_mon === "on"){ week_temp.push("월"); }
                                                    if(value.week_list[0].chk_tue === "on"){ week_temp.push("화"); }
                                                    if(value.week_list[0].chk_wed === "on"){ week_temp.push("수"); }
                                                    if(value.week_list[0].chk_thu === "on"){ week_temp.push("목"); }
                                                    if(value.week_list[0].chk_fri === "on"){ week_temp.push("금"); }
                                                    if(value.week_list[0].chk_sat === "on"){ week_temp.push("토"); }

                                                    var week = week_temp.join(', ');

                                                    if(week !== ""){ result.push('요일 : '+week); }

                                                    return result;
                                                }
                                                else{
                                                    return "";
                                                }
                                            },
                                            width: 110,
                                            dataIndex: 'schedule',
                                            text: '매주'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'gridcolumn',
                                    dataIndex: 'desc',
                                    flex: 3,
                                    bind: {
                                        text: '{desc}'
                                    }
                                },
                                {
                                    xtype: 'actioncolumn',
                                    width: 45,
                                    align: 'center',
                                    dataIndex: '@chk_use',
                                    bind: {
                                        text: '{use}'
                                    },
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                
                                                var me = this;
                                                var use = (record.get('@chk_use') ==="on") ? "off" : "on";

                                                var obj = {
                                                    '_id': record.data._id,
                                                    '@chk_use': use
                                                };

                                            },
                                            getClass: function(v, metadata, r, rowIndex, colIndex, store) {
                                                return (r.get('@chk_use') === 'on')? "b_sq_on":"b_sq_off";
                                            },
                                            getTip: function(v, metadatam, r) {
                                                return (r.get('@chk_use') === 'on')? "ON":"OFF";
                                            }
                                        }
                                    ]
                                }
                            ],
                            selModel: {
                                selType: 'checkboxmodel',
                                mode: 'SIMPLE'
                            },
                            listeners: {
                                celldblclick: 'onIpm_host_gridCellDblClick'
                            }
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender : 'onPanelAfterRender',
        beforeclose : 'saveData'
    },

    onIpm_host_gridCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if(cellIndex === 0 || cellIndex === 7){ return false; }

        var win = Ext.create('SMC4ZEN.view.win_ipm_allowHost',{

            edit : "edit",
            modal : true,
            record : record

        });

        win.show();

    },

    onButtonClick: function(button, e, eOpts) {

        var win = Ext.create('SMC4ZEN.view.win_ipm_allowHost',{

            modal : true

        });

        win.show();

    },

    onButtonClick1: function(button, e, eOpts) {

        var me = this;

        var gpn_selhost = Ext.getCmp("ipm_host_grid");
        var sel_hostlist = gpn_selhost.getSelection();
        var st_ipmhostlist = Ext.data.StoreManager.lookup('store_ipm_host_list');

        if(sel_hostlist.length === 0){

            Ext.Msg.alert(__weguardia, get_msg("sel_del"));

            return false;

        }
        else{

            Ext.MessageBox.confirm(__weguardia, get_msg("conf_del"),function(btn){

                if(btn === "yes"){

                    st_ipmhostlist.remove(sel_hostlist);
                    
                }

            });

        }

    },

    onPanelAfterRender: function(component, eOpts) {
        
        var me = this;
        var vm = me.getViewModel().getData();
        var st_ipmallow = Ext.data.StoreManager.lookup('store_ipm_host_list');
        var st_ipmanager = Ext.data.StoreManager.lookup('store_ipm_host_manager_list');
        
        this.fieldInfo = makeZenTip();

        // 관리네트워크 데이터 초기화

        if(vm.network_ipm_manager){

            var ip_array = [];

            if(vm.network_ipm_manager.length > 0){

                for(var i = 0, max = vm.network_ipm_manager.length; i < max; i++){

                    var tmp = {};

                    tmp.ip = vm.network_ipm_manager[i].ip;
                    tmp.name = vm.network_ipm_manager[i].name;
                    tmp.action = vm.network_ipm_manager[i].action;
                    tmp.interface = vm.network_ipm_manager[i].interface;

                    ip_array.push(tmp);

                }

            }

            st_ipmanager.loadData(ip_array);

        }

        if('network_ipm_host' in vm){

            var host_array = [];

            for(var i = 0; i < vm.network_ipm_host.length; i++){

                var tmp = {};
                var tmpip = [];
                var tmpmac = [];

                tmp['desc'] = vm.network_ipm_host[i].desc;
                tmp['name'] = vm.network_ipm_host[i].name;
                tmp['action'] = vm.network_ipm_host[i].action;
                tmp['@chk_use'] = vm.network_ipm_host[i]['@chk_use'];
                tmp['schedule'] = vm.network_ipm_host[i].schedule;
                tmp['interface'] = vm.network_ipm_host[i].interface;
                tmp['network_manager'] = vm.network_ipm_host[i].network_manager;

                for(var j = 1, max = 4; j <= max; j++){

                    tmpip.push(vm.network_ipm_host[i]['ip' + j]);
                    tmpmac.push(vm.network_ipm_host[i]['mac' + j]);

                }

                tmp.ip = tmpip;
                tmp.mac = tmpmac;

                host_array.push(tmp);

            }

            st_ipmallow.loadData(host_array);

        }

    },

    saveData : function(component, eOpts){

        var me = this;
        var vm = me.parentObj.getViewModel();
        var st_ipmallow = Ext.data.StoreManager.lookup('store_ipm_host_list');
        
        if('network_ipm_manager' in vm.getData()){

            var vm_savedata = [];
            var ipmallow_data = st_ipmallow.getData();

            for(var i = 0; i < ipmallow_data.items.length; i++){

                var tmp = {};

                tmp['desc'] = ipmallow_data.items[i].get('desc');
                tmp['name'] = ipmallow_data.items[i].get('name');
                tmp['action'] = ipmallow_data.items[i].get('action');
                tmp['schedule'] = ipmallow_data.items[i].get('schedule');
                tmp['@chk_use'] = ipmallow_data.items[i].get('@chk_use');
                tmp['interface'] = ipmallow_data.items[i].get('interface');
                tmp['network_manager'] = ipmallow_data.items[i].get('network_manager');

                for(var j = 1; j <= 4; j++){

                    tmp['ip' + j] = ipmallow_data.items[i].data.ip[j-1];
                    tmp['mac' + j] = ipmallow_data.items[i].data.mac[j-1];

                }

                vm_savedata.push(tmp);

            }

            vm.set('network_ipm_host', vm_savedata);

            st_ipmallow.removeAll();

        }

        me.parentObj.viewState = true;

        return true;

    }

});