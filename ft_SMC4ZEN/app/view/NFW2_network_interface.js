
Ext.define('SMC4ZEN.view.NFW2_network_interface', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_interface',

    requires: [
        'SMC4ZEN.view.NFW2_network_interfaceViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.panel.Tool'
    ],

    config: {
        selectedItemInfo: {
            //선택된 아이템의 정보를 담는 객체
            init: function(){
            	var me = this;
                me.selectednNetName = '';
                me.selectednNetType = '';
                
            }
        },
        multipath_cnt: 0,
        multipath_iface: 8
    },

    viewModel: {
        type: 'nfw2_network_interface'
    },
    // cls: 'zen_body',
    id: 'pnl_network_interface',
    scrollable: true,
    layout: 'anchor',
    title: '인터페이스',
    defaultListenerScope: true,
    bodyPadding: 5,
    overflowY: 'auto',
    items: [
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'toolbar',
                    flex: 1,
                    // cls: 'zen_toolbar',
                    margin : '0 5 0 -5',
                    items: [
                        {
                            xtype: 'button',
                            id: 'btn_add',
                            iconCls: 'ic_add',
                            bind: {
                                text: '{add}'
                            },
                            listeners: {
                                click: 'onBtn_addClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'btn_delete',
                            iconCls: 'ic_del',
                            bind: {
                                text: '{del}'
                            },
                            listeners: {
                                click: 'onBtn_deleteClick'
                            }
                        },
                        {
                            xtype: 'button',
                            componentCls: 'btn_auth',
                            text: '인터페이스 초기화',
                            listeners: {
                                click: 'onButtonClick'
                            }
                        }
                    ]
                },
                {
                    xtype: 'button',
                    hidden: true,
                    id: 'btn_update',
                    margin: 5,
                    text: '수정',
                    listeners: {
                        click: 'onBtn_updateClick'
                    }
                }
            ]
        },
        {
            xtype: 'gridpanel',
            id: 'grid_users',
            margin: '5 0 0 0',
            columnLines: true,
            store: 'store_getNetworkList',
            bind: {
                store: '{interface}'
            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'zone',
                    flex: 0.7,
                    bind: {
                        text: '{zone}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'net_name',
                    flex: 0.7,
                    bind: {
                        text: '{inter}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(value === null){ return "None"; }
                        return value;
                    },
                    dataIndex: 'type',
                    flex: 0.7,
                    bind: {
                        text: '{section}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

                        if(record.data.type === "Bonding"){
                            var bond_temp = record.data.net_info.split(',');
                            bond_temp.splice(0,1);

                            return bond_temp.join(', ');
                        }
                        else if(record.data.type === "Bridge"){
                            var bridge_temp = record.data.net_info.split(',');
                            var stp_temp = bridge_temp[0].split(':');

                            if(stp_temp[1] === "on"){
                                bridge_temp.splice(0,2);

                                return bridge_temp.join(', ');
                            }
                            else{
                                bridge_temp.splice(0,1);

                                return bridge_temp.join(', ');
                            }

                            return "";
                        }

                        return value;
                    },
                    dataIndex: 'net_info',
                    flex: 1.5,
                    bind: {
                        text: '{interface_info}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.type === null || record.data.type === "None"){ return ""; }
                        return value;
                    },
                    dataIndex: 'duplex',
                    flex: 1.5,
                    bind: {
                        text: '{dup_spe_mtu_mss}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'virtual_ip',
                    flex: 2,
                    bind: {
                        text: '{virtual_ip}'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                        if(record.data.zone !== ""){
                            var temp = value.split('/');
                            var total = [];
                            if(record.data.type === null || record.data.type === "None"){ return ""; }

                            if(temp[0] === "" || temp[0] === "X"){  }
                            else{ total.push("Multipath"); }
                            if(temp[1] === "Server"){ total.push("DHCP-S"); }
                            if(temp[1] === "Relay"){ total.push("DHCP-R"); }

                            return total.join(', ');
                        }
                        else{
                            if(record.data.type === "Bonding"){
                                var bond_temp = record.data.net_info.split(',');

                                return bond_temp[0];
                            }
                            else if(record.data.type === "Bridge"){
                                var bridge_temp = record.data.net_info.split(',');
                                var stp_temp = bridge_temp[0].split(':');

                                if(stp_temp[1] === "on"){
                                    var time_temp = bridge_temp[1].split(':');
                                    return "STP(" + time_temp[1] + __zen('sec') + ")";
                                }

                                return "";
                            }

                            return "";
                        }
                    },
                    dataIndex: 'etc',
                    flex: 2,
                    bind: {
                        text: '{etc}'
                    }
                }
            ],
            listeners: {
                cellclick: 'onGridpanelCellClick',
                itemdblclick: 'onGrid_usersItemDblClick'
            }
        }
    ],
    listeners: {
        afterrender: 'onViewportAfterRender',
        beforeclose: 'saveData'
    },
    tools: [
        {
            xtype: 'tool',
            callback: function() {
                var me = Ext.getCmp('NFW2_client');

                clearInterval(me.timer);

                Ext.getCmp('pnl_exec').removeAll();

                var _store = Ext.data.StoreManager.lookup('store_getMenuChildrenJson');

                _store.getProxy().setExtraParam('name',Ext.encode('NFW2_system'));

                _store.load(function(records, operation, success){

                    Ext.getCmp('pnl_menuTree').removeAll();

                    var treeData = {
                        xtype: 'treepanel',
                        useArrows:'true',
                        id: 'pnl_treeMenu',
                        animate:true,
                        autoScroll: true,
                        border: false,
                        rootVisible: true,
                        header: false,
                        root: records[0].raw,

                        listeners: {
                            itemclick: {
                                fn: me.pnlTreeMenuItemClick,
                                scope: me
                            }
                        }
                    };

                    Ext.getCmp('pnl_menuTree').add(treeData);

                    Ext.getCmp('pnl_treeMenu').expandAll();

                    /* 트리 연동 */

                    var treePanel = Ext.getCmp('pnl_treeMenu');

                    var findNode = treePanel.getStore().getNodeById('NFW2_system_equipmentState');

                    treePanel.getSelectionModel().select(findNode,true);

                    //네이게이션 초기화

                    me.navigationMenuController('true');


                    me.selectedMenuInfo.selected = true;
                    me.selectedMenuInfo.selectedMenuId = 'NFW2_system_equipmentState';
                    me.selectedMenuInfo.selectedMenuIsLeaf = true;
                    me.init_menuConfigView(me.selectedMenuInfo);

                });
            },
            type: 'next'
        }
    ],

    onBtn_addClick: function(button, e, eOpts) {
        var win = Ext.create('SMC4ZEN.view.win_logical_interface');
        win.show();
    },

    onBtn_deleteClick: function(button, e, eOpts) {
        var me = this;

        if(me.selectedItemInfo.selectednNetName === ""){

            Ext.Msg.alert("", get_msg("sel_del"));

        }else{
            Ext.MessageBox.confirm("", get_msg("conf_del"),function(btn){

                if(btn === "yes"){
                    var selectednNetName = me.selectedItemInfo.selectednNetName;

                    console.log('selectednNetName - ', selectednNetName);

                    var grid_chk = Ext.getCmp('grid_users').getSelectionModel().getSelection();

                    Ext.getCmp('grid_users').getStore().remove(grid_chk);

                    if(selectednNetName.substr(0,2) === "bo"){

                        var type = "bonding";

                    }else if(selectednNetName.substr(0,2) === "br"){

                        var type = "bridge";

                    }else if(selectednNetName.substr(0,2) === "vl"){

                        var type = "vlan";

                    }

                    delete me.getViewModel().data.network_interface.network[type][selectednNetName];

                    if(Object.getOwnPropertyNames(me.getViewModel().data.network_interface.network[type]).length < 1){
                    	delete me.getViewModel().data.network_interface.network[type];
                    }

                }
            });
        }
    },

    onButtonClick: function(button, e, eOpts) {
        Ext.MessageBox.confirm("", get_msg("conf_inter_reset"),function(btn){
            if(btn === "yes"){

            }
        });
    },

    onBtn_updateClick: function(button, e, eOpts) {

        if(this.selectedItemInfo.selectednNetName === ""){

            Ext.Msg.show({
                title: "System Message - ERROR",
                msg: "인터페이스를 선택하세요.",
                width: 300,
                buttons: Ext.Msg.OK,
                icon: Ext.window.MessageBox.INFO
            });

        }else if(this.selectedItemInfo.selectednNetType === "Ethernet"){

            var win = Ext.create('SMC4ZEN.view.win_physical_interface',{
 
                net_name : this.selectedItemInfo.selectednNetName,
                net_type : this.selectedItemInfo.selectednNetType
            });

            win.show();

        }else{

            var win = Ext.create('SMC4ZEN.view.win_logical_interface',{
                net_name : this.selectedItemInfo.selectednNetName,
                net_type : this.selectedItemInfo.selectednNetType
            });
            win.show();

        }
    },

    onGridpanelCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        var tempName = record.data.type;

        if(tempName === "Bonding"){

            this.selectedItemInfo.selectednNetType = "Bonding";

        }else if(tempName === "Bridge"){

            this.selectedItemInfo.selectednNetType = "Bridge";

        }else if(tempName === "VLAN"){

            this.selectedItemInfo.selectednNetType = "VLAN";

        }else{

            this.selectedItemInfo.selectednNetType = "Ethernet";

        }


        this.selectedItemInfo.selectednNetName = record.data.net_name;




        //물리적 인터페이스일 경우 추가, 삭제 버튼 disable
        if(record.data.net_name.substr(0,3) === "eth"){

            Ext.getCmp('btn_update').enable();

            Ext.getCmp('btn_add').enable();

            Ext.getCmp('btn_delete').disable();

        }else{

            Ext.getCmp('btn_update').enable();

            Ext.getCmp('btn_add').enable();

            Ext.getCmp('btn_delete').enable();


        }
    },

    onGrid_usersItemDblClick: function(dataview, record, item, index, e, eOpts) {
        var tempName = record.data.type;

        if(tempName === "Bonding"){

            this.selectedItemInfo.selectednNetType = "Bonding";

        }else if(tempName === "Bridge"){

            this.selectedItemInfo.selectednNetType = "Bridge";

        }else if(tempName === "VLAN"){

            this.selectedItemInfo.selectednNetType = "VLAN";

        }else{

            this.selectedItemInfo.selectednNetType = "Ethernet";

        }


        this.selectedItemInfo.selectednNetName = record.data.net_name;

        //물리적 인터페이스일 경우 추가, 삭제 버튼 disable
        if(record.data.net_name.substr(0,3) === "eth"){

            Ext.getCmp('btn_update').enable();

            Ext.getCmp('btn_add').enable();

            Ext.getCmp('btn_delete').disable();

        }else{

            Ext.getCmp('btn_update').enable();

            Ext.getCmp('btn_add').enable();

            Ext.getCmp('btn_delete').enable();


        }

        if(this.selectedItemInfo.selectednNetType === "Ethernet"){

            var win = Ext.create('SMC4ZEN.view.win_physical_interface',{
                edit : "edit",
                //menuGatewayUrl : me.menuGatewayUrl,
                //selectedMenuInfo : me.selectedMenuInfo,
                net_name : this.selectedItemInfo.selectednNetName,
                net_type : this.selectedItemInfo.selectednNetType
            });

            win.show();

        }else{

            var win = Ext.create('SMC4ZEN.view.win_logical_interface',{
                edit : "edit",
                net_name : this.selectedItemInfo.selectednNetName,
                net_type : this.selectedItemInfo.selectednNetType
            });
            win.show();

        }
    },

    onViewportAfterRender: function(component, eOpts) {
         var me = this;

         console.log('getViewModel - ', me.getViewModel());
    
        me.get_network_list();
        me.selectedItemInfo.init();


        // //공통에만 적용
        // // if(Ext.getCmp('NFW2_client').isCC === false){

        //     request_helper.xmlrpc_call_JsonP('ftuctrl','getFileContent', { filename : Ext.encode('/proc/ferret/datasheet/multipath_iface')},
        //         function(response){

        //             if(response !== undefined || response !== null){

        //                 me.multipath_iface = response[0];
        //             }
        //             request_helper.xmlrpc_call_JsonP(
        //                 'ftuctrl','getFileContent', { filename : Ext.encode('/proc/ferret/network/bypass')},
        //                 function(response){
        //                     if(response !== undefined || response !== null){
        // //                         me.bypass_port = response[0];
        //                     }

        //                 }
        //             );

        //         }
        //     );
        // // }
    },

    get_network_list: function() {
        var me = this;

        var dhcp_server_list = [];

        var dhcp_relay_list = [];

                if(me.getViewModel().data.network_dhcp_server.network.dhcp_server !== null){

                    dhcp_server_list = Object.getOwnPropertyNames(me.getViewModel().data.network_dhcp_server.network.dhcp_server);
                }

                if(me.getViewModel().data.network_dhcp_relay.network.dhcp_relay !== null){

                    dhcp_relay_list = Object.getOwnPropertyNames(me.getViewModel().data.network_dhcp_relay.network.dhcp_relay);
                }


        var iface_info;

        // //구분이 DHCP일 경우 자동으로 할당된 아이피 정보를 표시해주시위해 미리 정보를 가져옴.

                        var records = [];

        //                 //ethernet 있을 경우
                        if(me.getViewModel().data.network_interface.network.ethernet !== undefined){

                            var ethernetName = Object.getOwnPropertyNames(me.getViewModel().data.network_interface.network.ethernet).sort();
                            ethernetName.sort(function(a,b){
                                return a.substring(3) - b.substring(3);
                            });

                            for(var ethernet in ethernetName){

                                var _ethernet = me.getViewModel().data.network_interface.network.ethernet[ethernetName[ethernet]];


                                var _dhcp = "";

                                for(var i in dhcp_server_list){

                                    if(dhcp_server_list[i] === _ethernet['default'].name){

                                        _dhcp = 'Server';
                                    }
                                }

                                for(var i in dhcp_relay_list){

                                    if(dhcp_relay_list[i] === _ethernet['default'].name){

                                        if(_dhcp === 'Server'){

                                            _dhcp = _dhcp + ', Relay';

                                        }else{

                                            _dhcp = 'Relay';
                                        }
                                    }
                                }

                                var _duplex = _ethernet['default'].duplex === undefined ? "" : _ethernet['default'].duplex;

                                var _speed = _ethernet['default'].speed === undefined ? "" : _ethernet['default'].speed;

                                var _mtu = _ethernet['default'].mtu === undefined ? " " : _ethernet['default'].mtu;

                                var _mss = _ethernet['default'].mss === undefined ? " " : _ethernet['default'].mss;

                                var _mode = _ethernet['default'].mode === undefined ? "" : _ethernet['default'].mode;

                                var _zone = _ethernet['default'].zone === undefined ? "" : _ethernet['default'].zone;

                                var _multipath = _ethernet['default'].multipath === undefined ? "" : _ethernet['default'].multipath;

                                //멀티패스로 선언 가능한 인터페이스 개수 제한을 위해 현재 설정되어 있는 멀티패스 갯수 알아냄.
                                if(_multipath === 'on') me.multipath_cnt = me.multipath_cnt+1;

                                var _ipv4 = _ethernet['default'].ipv4 === undefined ? "" : _ethernet['default'].ipv4;

                                var _ipv6 = _ethernet['default'].ipv6 === undefined ? "" : _ethernet['default'].ipv6;

                                var _viptual_ipv4 = _ethernet.virtual_ip.ipv4;

                                var _viptual_ipv6 = _ethernet.virtual_ip.ipv6;


                                if(_viptual_ipv4 === null) _viptual_ipv4 = "";

                                if(_viptual_ipv6 === null) _viptual_ipv6 = "";

                                var _virtual_ip = _viptual_ipv4;

                                if(_virtual_ip === ""){

                                    _virtual_ip = _viptual_ipv6;

                                }else{

                                    if(_viptual_ipv6 !== ""){

                                        _virtual_ip = _virtual_ip + "," + _viptual_ipv6;
                                    }
                                }


                                if(_ipv4 === null) _ipv4 = "";

                                if(_ipv6 === null) _ipv6 = "";

                                var _net_info = "";
                                if(_mode === "static"){
                                    if(_ipv4 !== "" && _ipv6 === ""){

                                        _net_info = _ipv4;

                                    }else if(_ipv4 === "" && _ipv6 !== ""){

                                        _net_info = _ipv6;

                                    }else{

                                        _net_info = _ipv4 + "<br/>"+_ipv6;
                                    }
                                }
                                else if(_mode === "pppoe"){
                                    _net_info = "ID:" + _ethernet['default'].id;
                                }



                                if(_duplex === 'auto'){

                                    _duplex = 'Auto';

                                }else if(_duplex === 'full'){

                                    _duplex = 'Full';

                                }else if(_duplex === 'half'){

                                    _duplex = 'Hlalf';

                                }

                                if(_speed === 'auto'){

                                    _speed = 'Auto';

                                }else if(_speed === '10'){

                                    _speed = '10Mbps';
                                }else if(_speed === '100'){

                                    _speed = '100Mbps';

                                }else if(_speed === '1000'){

                                    _speed = '1Gbps';

                                }else if(_speed === '10000'){

                                    _speed = '10Gbps';

                                }else{

                                    _speed = " ";
                                }

                                _mtu = _mtu === null ? " " : _mtu;


                                _mss = _mss === null ? " " : _mss;

                                _duplex = _duplex + "/"+ _speed + "/" + _mtu + "/" + _mss;

                                if(_duplex=== " / / / "){

                                    _duplex = "";
                                }

                                if(_mode === 'static'){

                                    _mode = 'Static';

                                }else if(_mode === 'dhcp'){

                                    _mode = 'DHCP';

                                }else if(_mode === 'pppoe'){

                                    _mode = 'PPPoE';

                                }else if(_mode === 'none'){

                                    _mode = 'None';
                                }

                                if(_zone === 'internal'){

                                    _zone = 'Internal';


                                }else if(_zone === 'external'){

                                    _zone = 'External';


                                }else if(_zone === 'dmz'){

                                    _zone = 'DMZ';

                                }else if(_zone === 'pan'){

                                    _zone = 'PAN';

                                }

                                if(_multipath === "on"){

                                    _multipath = "O";

                                }else if(_multipath === "off"){

                                    _multipath = "X";

                                }else {

                                    _multipath = "";

                                }

                                var _etc = _multipath + "/" + _dhcp;

                                _etc = _etc === "/" ? "" : _etc;

                                //구분이 DHCP일 경우 자동으로 할당된 IP 정보를 표시
                                if(_mode === "DHCP"){

                                    // if(iface_info[_ethernet['default'].name].ip !== "None"){

                                    //     _net_info = iface_info[_ethernet['default'].name].ip;
                                    // }
                                }

                                records.push({

                                    zone : _zone,
                                    net_name : _ethernet['default'].name,
                                    type : _mode,
                                    net_info : _net_info,
                                    duplex : _duplex,
                                    virtual_ip : _virtual_ip,
                                    etc : _etc

                                });

                            }

                        }

        //                 //bonding 있을 경우
        					if(me.getViewModel().data.network_interface.network.bonding !== undefined){

                            var bondingName = Object.getOwnPropertyNames(me.getViewModel().data.network_interface.network.bonding).sort();

                            for(var bonding in bondingName){

                                _bonding = me.getViewModel().data.network_interface.network.bonding[bondingName[bonding]];

                                var _bondingMode = _bonding['default'].mode === undefined ? "" : _bonding['default'].mode;

                                var _member = _bonding['default'].member.toString();

                                var _viptual_ipv4 = _bonding.virtual_ip.ipv4;

                                var _viptual_ipv6 = _bonding.virtual_ip.ipv6;


                                if(_viptual_ipv4 === null) _viptual_ipv4 = "";

                                if(_viptual_ipv6 === null) _viptual_ipv6 = "";

                                var _virtual_ip = _viptual_ipv4;

                                if(_virtual_ip === ""){

                                    _virtual_ip = _viptual_ipv6;

                                }else{

                                    if(_viptual_ipv6 !== ""){

                                        _virtual_ip = _virtual_ip + "," + _viptual_ipv6;
                                    }


                                }


                                if(_bondingMode === "0"){

                                    _bondingMode = 'Round Robin';
                                }else if(_bondingMode === "1"){

                                    _bondingMode = 'Active Backup';
                                }else if(_bondingMode === "2"){

                                    _bondingMode = 'Balance XOR';
                                }else if(_bondingMode === "3"){

                                    _bondingMode = 'Broadcast';
                                }else if(_bondingMode === "4"){

                                    _bondingMode = '802.3ad';
                                }else if(_bondingMode === "5"){

                                    _bondingMode = 'Balance TLB';
                                }else if(_bondingMode === "6"){

                                    _bondingMode = 'Balance ALB';
                                }

                                _bondingMode = _bondingMode + "," + _member;

                                var _net_info = _bondingMode;


                                records.push({

                                    zone : '',
                                    net_name : _bonding['default'].name,
                                    type : 'Bonding',
                                    net_info : _net_info,
                                    duplex : '',
                                    virtual_ip : _virtual_ip,
                                    etc : ''

                                });
                            }

                        }

                        //bridge 있을 경우
                        if(me.getViewModel().data.network_interface.network.bridge !== undefined){

                            var bridgeName = Object.getOwnPropertyNames(me.getViewModel().data.network_interface.network.bridge).sort();

                            for(var bridge in bridgeName){

                                _bridge = me.getViewModel().data.network_interface.network.bridge[bridgeName[bridge]];

                                var _member = _bridge['default'].member.toString();

                                var _stp = _bridge['default'].stp;

                                var _time = _bridge['default'].time;

                                var _viptual_ipv4 = _bridge.virtual_ip.ipv4;

                                var _viptual_ipv6 = _bridge.virtual_ip.ipv6;

                                var _net_info = "";

                                if(_time === null){

                                    _net_info = "STP:"+_stp;

                                }else{

                                    _net_info = "STP:"+_stp + ",Time:" + _time;
                                }

                                _net_info = _net_info + "," + _member;


                                if(_viptual_ipv4 === null) _viptual_ipv4 = "";

                                if(_viptual_ipv6 === null) _viptual_ipv6 = "";

                                var _virtual_ip = _viptual_ipv4;

                                if(_virtual_ip === ""){

                                    _virtual_ip = _viptual_ipv6;

                                }else{

                                    if(_viptual_ipv6 !== ""){

                                        _virtual_ip = _virtual_ip + "," + _viptual_ipv6;
                                    }


                                }

                                records.push({

                                    zone : '',
                                    net_name : _bridge['default'].name,
                                    type : 'Bridge',
                                    net_info : _net_info,
                                    duplex : '',
                                    virtual_ip : _virtual_ip,
                                    etc : ''

                                });

                            }

                        }

                        //vlan 있을 경우
                        if(me.getViewModel().data.network_interface.network.vlan !== undefined){

                            var vlanName = Object.getOwnPropertyNames(me.getViewModel().data.network_interface.network.vlan).sort();

                            for(var vlan in vlanName){

                                _vlan = me.getViewModel().data.network_interface.network.vlan[vlanName[vlan]];

                                var _member = _vlan['default'].member.toString();

                                var _viptual_ipv4 = _vlan.virtual_ip.ipv4;

                                var _viptual_ipv6 = _vlan.virtual_ip.ipv6;

                                var _virtual_ip = "";

                                if(_viptual_ipv4 !== null){

                                    for(var i in _viptual_ipv4){

                                        if(_virtual_ip !== ""){

                                            _virtual_ip = _virtual_ip + "," + _viptual_ipv4[i];

                                        }else{

                                            _virtual_ip = _virtual_ip + _viptual_ipv4[i];
                                        }

                                    }
                                }

                                if(_viptual_ipv6 !== null){

                                    for(var i in _viptual_ipv6){

                                        if(_virtual_ip !== ""){

                                            _virtual_ip = _virtual_ip + "," + _viptual_ipv6[i];

                                        }else{

                                            _virtual_ip = _virtual_ip + _viptual_ipv6[i];
                                        }
                                    }
                                }

                                records.push({

                                    zone : '',
                                    net_name : _vlan['default'].name,
                                    type : 'VLAN',
                                    net_info : _member,
                                    duplex : '',
                                    virtual_ip : _virtual_ip,
                                    etc : ''

                                });
                            }

                        }

                        var store = Ext.data.StoreManager.lookup('store_getNetworkList');

                        store.loadData(records);

    },

    saveData: function() {

        Ext.getCmp('win_zen_device_set').viewState = true;
        return true;
    }

});