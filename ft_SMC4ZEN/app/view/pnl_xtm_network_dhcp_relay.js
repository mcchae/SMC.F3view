
Ext.define('SMC4ZEN.view.pnl_xtm_network_dhcp_relay', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_network_dhcp_relayViewModel',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.View'
    ],

    viewModel: {
        type: 'pnl_xtm_network_dhcp_relay'
    },
    height: 680,
    id: 'pnl_xtm_network_dhcp_relay',
    overflowY: 'auto',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: 'DHCP 릴레이',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'fieldset',
            itemId: 'fds_dhcprelay_cont',
            padding: 10,
            title: 'DHCP 릴레이',
            items: [
                {
                    xtype: 'checkboxfield',
                    itemId: 'ck_userelay',
                    margin: '0, 0, 10, 0',
                    fieldLabel: '',
                    boxLabel: ' DHCP 릴레이 사용'
                },
                {
                    xtype: 'textfield',
                    validator: function(value) {
                        var retValue = validIPForm(value, 'v4');

                        if(!retValue){

                            return false;

                        }

                        return true;
                    },
                    itemId: 'txf_serveraddr',
                    margin: '0, 0, 10, 0',
                    width: 250,
                    fieldLabel: 'DHCP 서버 주소'
                },
                {
                    xtype: 'combobox',
                    itemId: 'cmb_interface',
                    margin: '0, 0, 10, 0',
                    width: 250,
                    fieldLabel: '대상 인터페이스',
                    editable: false,
                    emptyText: 'Select interface ...',
                    displayField: 'eth',
                    queryMode: 'local',
                    store: 'st_common_deveth',
                    valueField: 'eth',
                    listeners: {
                        change: 'onCmb_dhcprelay_ethCange'
                    }
                },
                {
                    xtype: 'container',
                    height: 250,
                    itemId: 'ctn_dhcprelay_member',
                    width: 260,
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'gridpanel',
                            itemId: 'gpn_dhcprelay_member',
                            anchorSize: 10,
                            title: '',
                            hideHeaders: true,
                            columns: [
                                {
                                    xtype: 'gridcolumn',
                                    align: 'center',
                                    dataIndex: 'member',
                                    flex: 0.8
                                },
                                {
                                    xtype: 'actioncolumn',
                                    align: 'center',
                                    flex: 0.2,
                                    items: [
                                        {
                                            handler: function(view, rowIndex, colIndex, item, e, record, row) {
                                                var store = Ext.getStore('st_dhcprelay_member');

                                                store.removeAt(rowIndex);
                                            },
                                            iconCls: 'ico_grid_row_delete'
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
        afterrender: 'onPnl_xtm_network_dhcp_relayAfterRender',
        beforeclose: 'onPnl_xtm_network_dhcp_relayBeforeClose'
    },

    onCmb_dhcprelay_ethCange: function(field, newValue, oldValue, eOpts) {

        var memberlist = Ext.getStore('st_dhcprelay_member');

        if(duplicationItem(newValue, 'member', 'st_dhcprelay_member') === false){

            Ext.Msg.show({ title : '멤버 중복 에러', msg : '동일한 멤버가 이미 추가되어 있습니다.', buttons : Ext.Msg.OK, icon : Ext.Msg.ERROR });

            return;
        }

        memberlist.add({ 'member' : newValue });
    },

    onPnl_xtm_network_dhcp_relayAfterRender: function(component, eOpts) {
        // onPnl_xtm_network_dhcp_relayAfterRender ======================================================================================================================================
        //
        // 일시 : 2014.07.29
        //
        // 설명 : DHCP 릴레이 데이터를 그리드에 출력합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var memberStore = Ext.getStore('st_dhcprelay_member');

        this.initStore();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                if(deviceData.dhcrelay){

                    componentObj.userelay.setValue((deviceData.dhcrelay['@chk_use'] === "on") ? true : false);
                    componentObj.serveraddr.setValue(deviceData.dhcrelay.server);

                    Ext.each(deviceData.dhcrelay['interface'], function(ethData, idx){

                        memberStore.add({	'member' : ethData	});

                    });

                }

            }

        }
        catch(err){

            console.log('DHCP 릴레이 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_network_dhcp_relayBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var fds_userelay  = this.down('[itemId=fds_dhcprelay_cont]');

        var userelay    = fds_userelay.down('[itemId=ck_userelay]');
        var serveraddr  = fds_userelay.down('[itemId=txf_serveraddr]');
        var eth         = fds_userelay.down('[itemId=cmb_interface]');
        var membergrid  = fds_userelay.down('[itemId=gpn_dhcprelay_member]');

        return function(){

            obj.userelay    = userelay;
            obj.serveraddr  = serveraddr;
            obj.eth         = eth;
            obj.membergrid  = membergrid;

            return obj;

        }();
    },

    validityCheck: function() {
        // validityCheck =================================================================================================================================================================
        //
        // 일시 : 2014.07.29
        //
        // 설명 : DHCP 릴레이의 유효성을 검사합니다.
        //
        // ===============================================================================================================================================================================

        var component = this.componentStorage();

        var validCheckObj = {

            dhcpAddrCheck : function(){

                if(!component.serveraddr.validate() && component.serveraddr.getValue() !== ''){

                    Ext.Msg.show({

                        title : 'WeGuardia™ SMC 2.0',
                        msg : 'IP 형식에 맞지 않습니다.',
                        buttons : Ext.Msg.OK,
                        icon : Ext.Msg.ERROR

                    });

                    return false;

                }

                return true;

            }

        };

        return validCheckObj;
    },

    saveData: function() {
        // saveData ==============================================================================================================================================================
        //
        // 일시 : 2014.07.29
        //
        // 설명 : DHCP 릴레이 설정을 저장합니다.
        //
        // =======================================================================================================================================================================

        var component = this.componentStorage();

        var dhcpserverStore = Ext.getStore('st_dhcprelay_member');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        // 유효성 검사 =============================================================================================================================================================

        if(!this.validityCheck()){

            return false;

        }

        // 데이터 저장 부분 =========================================================================================================================================================

        deviceAllData.network_dhcp_relay.dhcrelay['@chk_use'] = (component.userelay.getValue() === true) ? 'on' : 'off';
        deviceAllData.network_dhcp_relay.dhcrelay['@count']   = dhcpserverStore.count();
        deviceAllData.network_dhcp_relay.dhcrelay.server      = (component.serveraddr.getValue() === '') ? null : component.serveraddr.getValue();

        if(dhcpserverStore.count() <= 0){

            if(deviceAllData.network_dhcp_relay.dhcrelay['interface']){

                delete deviceAllData.network_dhcp_relay.dhcrelay['interface'];

            }

        }
        else{

            if(dhcpserverStore.count() === 1){

                deviceAllData.network_dhcp_relay.dhcrelay['interface'] = dhcpserverStore.getAt(0).get('member');

            }
            else{

                var interfaceArray = [];

                for(var i = 0; i < dhcpserverStore.count(); i++){

                    interfaceArray.push(dhcpserverStore.getAt(i).get('member'));

                }

                deviceAllData.network_dhcp_relay.dhcrelay['interface'] = interfaceArray;
            }

        }

        return true;
    },

    initStore: function() {
        var component = this.componentStorage();
        var st_memberlist = Ext.getStore('st_dhcprelay_member');

        st_memberlist.removeAll();

        component.membergrid.bindStore(st_memberlist);
    }

});