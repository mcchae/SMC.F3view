
Ext.define('SMC4ZEN.view.pnl_xtm_mgt_rtt', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_mgt_rttViewModel',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.grid.View',
        'Ext.grid.plugin.CellEditing'
    ],

    viewModel: {
        type: 'pnl_xtm_mgt_rtt'
    },
    height: 680,
    id: 'pnl_xtm_mgt_rtt',
    width: 800,
    layout: 'fit',
    bodyPadding: 10,
    title: 'RTT 설정',
    defaultListenerScope: true,

    listeners: {
        afterrender: 'onPnl_xtm_mgt_rttAfterRender',
        beforeclose: 'onPnl_xtm_mgt_rttBeforeClose'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {
                items: [
                    {
                        xtype: 'gridpanel',
                        itemId: 'gpn_log_rttset',
                        title: '트래픽 통계에 RTT 설정',
                        columns: [
                            {
                                xtype: 'gridcolumn',
                                width: 200,
                                align: 'center',
                                dataIndex: 'name',
                                text: '인터페이스',
                                flex: 1
                            },
                            {
                                xtype: 'gridcolumn',
                                width: 400,
                                dataIndex: 'ip',
                                text: 'IP 주소',
                                flex: 2,
                                editor: {
                                    xtype: 'textfield',
                                    validator: function(value) {
                                        var retValue = ValidIPAddress(value);

                                        if(!retValue){

                                            return false;

                                        }

                                        return true;
                                    },
                                    itemId: 'txf_ip'
                                }
                            }
                        ],
                        plugins: [
                            Ext.create('Ext.grid.plugin.CellEditing', {

                            })
                        ]
                    }
                ]
            };
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    onPnl_xtm_mgt_rttAfterRender: function(component, eOpts) {
        // onPnl_xtm_mgt_rttAfterRender =================================================================================================================================================
        //
        // 일시 : 2014.06.18
        //
        // 설명 : RTT 데이터를 그리드에 출력합니다. 파라미터는 log_rtt_setting 입니다.
        //
        // ==============================================================================================================================================================================

        var devStore = Ext.getStore('st_common_deveth');
        var rttStore = Ext.getStore('st_rtt_set');

        this.initStore();

        // 그리드 인터페이스 초기화 =========================================================================================================================================================
        //
        // 설명 : 공통 장비 인터페이스 값으로 name 필드를 초기화 한 후, ip를 초기화 합니다. 인터페이스 스토어가 rtt 데이터보다 많으면 devStore 기준으로 초기화됩니다.
        //
        // ==============================================================================================================================================================================

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                if(deviceData.rtt){

                    if(devStore.count() >= deviceData.rtt.length){

                        for(var i = 0; i < devStore.count(); i++){

                            var obj  = {};

                            obj.name = devStore.getAt(i).get('eth');
                            obj.ip   = null;

                            rttStore.add(obj);

                        }

                        for(var i = 0; i < deviceData.rtt.length; i++){

                            rttStore.getAt(i).set({		'ip' : deviceData.rtt[i].ip		});

                        }

                    }
                    else{

                        for(var i = 0; i < devStore.count(); i++){

                            var obj  = {};

                            try{

                                obj.name = devStore.getAt(i).get('eth');
                                obj.ip   = (deviceData.rtt[i].ip === null) ? null : deviceData.rtt[i].ip;

                                rttStore.add(obj);

                            }
                            catch(err){

                                break;

                            }

                        }

                    }

                }

            }

        }
        catch(err){

            console.log('RTT 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_mgt_rttBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    saveData: function() {
        var rttStore = Ext.getStore('st_rtt_set');

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        for(var i = 0; i < rttStore.count(); i++){

            deviceAllData.log_rtt_setting.rtt[i] = rttStore.getAt(i).data;

        }

        rttStore.sync();

        return true;
    },

    initStore: function() {
        var st_rtt = Ext.getStore('st_rtt_set');

        st_rtt.removeAll();

        this.down('[itemId=gpn_log_rttset]').bindStore(st_rtt);
    }

});