
Ext.define('SMC4ZEN.view.pnl_xtm_anomaly_ipspoofing', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_anomaly_ipspoofingViewModel',
        'Ext.form.field.Checkbox',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_xtm_anomaly_ipspoofing'
    },
    height: 680,
    id: 'pnl_xtm_anomaly_ipspoofing',
    overflowY: 'auto',
    width: 800,
    bodyPadding: 10,
    title: 'IP Spoofing',
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'checkboxfield',
            itemId: 'ck_checkspoofing',
            fieldLabel: '',
            boxLabel: 'IP Spoofing 검사'
        },
        {
            xtype: 'container',
            itemId: 'ctn_spoofing_ipv4',
            margin: '0, 0, 10, 0',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'txf_addr',
                    margin: '0, 10, 0, 0',
                    width: 400,
                    fieldLabel: 'IPv4 내부망',
                    labelWidth: 120,
                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                    listeners: {
                        focus: 'onTxf_addrFocus'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_clear',
                    width: 100,
                    text: '삭 제',
                    listeners: {
                        click: 'onBt_clearClick'
                    }
                }
            ]
        },
        {
            xtype: 'container',
            margins: '0, 0, 10, 0',
            itemId: 'ctn_spoofing_ipv6',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'txf_addr',
                    margin: '0, 10, 0, 0',
                    width: 400,
                    fieldLabel: 'IPv6 내부망',
                    labelWidth: 120,
                    emptyText: '정책을 추가하려면 필드를 클릭하세요.',
                    listeners: {
                        focus: 'onTxf_addrFocus1'
                    }
                },
                {
                    xtype: 'button',
                    itemId: 'bt_clear',
                    width: 100,
                    text: '삭 제',
                    listeners: {
                        click: 'onBt_clearClick1'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_anomaly_ipspoofingAfterRender',
        beforeclose: 'onPnl_xtm_anomaly_ipspoofingBeforeClose'
    },

    onTxf_addrFocus: function(component, event, eOpts) {
        // onTxf_addrFocus ===============================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : IPv4 오브젝트를 선택할 수 있는 팝업 창을 띄웁니다.
        //
        // ===============================================================================================================================================================================

        Ext.create('SMC4ZEN.view.win_smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_ip_v4_addr',
            'policyKey'     : 'v4',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick: function(button, e, eOpts) {
        // onBt_clearClick ==============================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : IPv4 오브젝트를 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var spoofingPanel    = Ext.getCmp('pnl_xtm_anomaly_ipspoofing');

        var displayComponent = button.up().down('[itemId=txf_addr]').setValue('');

        if(spoofingPanel.spoofingObj){

            if(Object.prototype.toString.call(spoofingPanel.spoofingObj) === "[object Array]"){

        // 저장된 spoofingObj 가 배열이라면 v6 버전을 검색하여 객체에 저장 후 v4 정보를 삭제합니다. ================================================================================================

                for(var i = 0; i < spoofingPanel.spoofingObj.length; i++){

                    if(spoofingPanel.spoofingObj[i]['@version'] === 'v6'){

                        var tmpSpoofing = spoofingPanel.spoofingObj[i];

                        spoofingPanel.spoofingObj = tmpSpoofing;

                        break;

                    }

                }

            }
            else{

        // 저장된 spoofingObj 가 배열이 아니고 v4 데이터라면 null로 초기화 합니다. ==============================================================================================================

                if(spoofingPanel.spoofingObj['@version'] === 'v4'){

                    spoofingPanel.spoofingObj = null;

                }

            }

        }
    },

    onTxf_addrFocus1: function(component, event, eOpts) {
        // onTxf_addrFocus1 ==============================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 :
        //
        // ===============================================================================================================================================================================

        Ext.create('SMC4ZEN.view.win_smc_object_set', {

            'service'       : 'ftSMC',
            'searchService' : 'getGroup',
            'openType'      : 'Object',
            'gtype'         : 'obj_ip_v6_addr',
            'policyKey'     : 'v6',
            'thisObj'       : this,
            'componentObj'  : component

        }).show();
    },

    onBt_clearClick1: function(button, e, eOpts) {
        // onBt_clearClick ==============================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : IPv6 오브젝트를 초기화 합니다.
        //
        // ==============================================================================================================================================================================

        var spoofingPanel    = Ext.getCmp('pnl_xtm_anomaly_ipspoofing');

        var displayComponent = button.up().down('[itemId=txf_addr]').setValue('');

        if(spoofingPanel.spoofingObj){

            if(Object.prototype.toString.call(spoofingPanel.spoofingObj) === "[object Array]"){

        // 저장된 spoofingObj 가 배열이라면 v4 버전을 검색하여 객체에 저장 후 v6 정보를 삭제합니다. ================================================================================================

                for(var i = 0; i < spoofingPanel.spoofingObj.length; i++){

                    if(spoofingPanel.spoofingObj[i]['@version'] === 'v4'){

                        var tmpSpoofing = spoofingPanel.spoofingObj[i];

                        spoofingPanel.spoofingObj = tmpSpoofing;

                        break;

                    }

                }

            }
            else{

        // 저장된 spoofingObj 가 배열이 아니고 v6 데이터라면 null로 초기화 합니다. ==============================================================================================================

                if(spoofingPanel.spoofingObj['@version'] === 'v6'){

                    spoofingPanel.spoofingObj = null;

                }

            }

        }
    },

    onPnl_xtm_anomaly_ipspoofingAfterRender: function(component, eOpts) {
        // onPnl_xtm_anomaly_ipspoofingAfterRender ======================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : IP Spoofing 데이터를 컴포넌트에 설정합니다.
        //
        // ==============================================================================================================================================================================

        var me = this;

        me.on('setPolicy', me.setPolicyData);

        var deviceData = component.deviceParams;

        var componentObj = me.componentStorage();

        // 객체를 저장할 변수 apply ========================================================================================================================================================

        Ext.applyIf(me, {

            'spoofingObj' : null

        });

        // 데이터 초기화 ==================================================================================================================================================================

        me.down('[itemId=ck_checkspoofing]').setValue((deviceData.spoofing['@chk_use'] === 'on') ? true : false);

        if(deviceData.spoofing.vnet){

            me.spoofingObj = deviceData.spoofing.vnet;

            if(Object.prototype.toString.call(deviceData.spoofing.vnet) === "[object Array]"){

                // 저장된 데이터가 배열형태인 경우 객체를 추가합니다. ===================================================================================================================================

                for(var i = 0; i < me.spoofingObj.length; i++){

                    if(me.spoofingObj[i]['@version'] === 'v4'){

                        componentObj.ipv4addr.setValue(me.spoofingObj[i]['@name']);

                    }
                    else{

                        componentObj.ipv6addr.setValue(me.spoofingObj[i]['@name']);

                    }

                }

            }
            else{

                // 저장된 데이터가 객체형태인 경우 객체를 대입합니다. ===================================================================================================================================

                me.spoofingObj = deviceData.spoofing.vnet;

                if(me.spoofingObj['@version'] === 'v4'){

                    componentObj.ipv4addr.setValue(me.spoofingObj['@name']);
                    componentObj.ipv4addr.policyCid = me.spoofingObj['@cid'];

                }
                else{

                    componentObj.ipv6addr.setValue(me.spoofingObj['@name']);
                    componentObj.ipv6addr.policyCid = me.spoofingObj['@cid'];

                }

            }

        }
    },

    onPnl_xtm_anomaly_ipspoofingBeforeClose: function(panel, eOpts) {
        // onPnl_xtm_anomaly_ipspoofingBeforeClose =======================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : 화면이 이동하거나 파괴될 때의 작업을 수행합니다.
        //
        // ===============================================================================================================================================================================

        var deviceMain = Ext.getCmp('win_smc_device_set');

        if(!this.saveData()){

            deviceMain.viewState = false;

            return false;

        }

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        obj.checkspoofing = this.down('[itemId=ck_checkspoofing]');
        obj.ipv4addr = this.down('[itemId=ctn_spoofing_ipv4]').down('[itemId=txf_addr]');
        obj.ipv6addr = this.down('[itemId=ctn_spoofing_ipv6]').down('[itemId=txf_addr]');

        return obj;
    },

    setPolicyData: function(component, objectKey, objectData) {
        // setPolicyData ================================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 : 선택한 오브젝트를 할당된 변수에 저장합니다.
        //
        // ==============================================================================================================================================================================

        var componentObj = this.componentStorage();

        var spoofingPanel = this;

        if(objectKey === 'v4'){

            componentObj.ipv4addr.setValue(objectData.name);
            componentObj.ipv4addr.policyCid = objectData['@cid'];

        }
        else{

            componentObj.ipv6addr.setValue(objectData.name);
            componentObj.ipv6addr.policyCid = objectData['@cid'];

        }

        if(spoofingPanel.spoofingObj){

            if(Object.prototype.toString.call(spoofingPanel.spoofingObj) === "[object Array]"){

        // 저장된 데이터가 배열이라면 objectKey와 맞는 버전을 검색하여 변경합니다. ================================================================================================================

                for(var i = 0; i < spoofingPanel.spoofingObj.length; i++){

                    if(spoofingPanel.spoofingObj[i]['@version'] === objectKey){

                        spoofingPanel.spoofingObj[i]['@cid']     = objectData['@cid'];
                        spoofingPanel.spoofingObj[i]['@name']    = objectData.name;
                        spoofingPanel.spoofingObj[i]['@version'] = objectKey;

                        break;

                    }

                }

            }
            else{

                if(spoofingPanel.spoofingObj['@version'] === objectKey){

        // 저장된 버전과 동일하다면 변경합니다. ===============================================================================================================================================

                    spoofingPanel.spoofingObj['@cid']     = objectData['@cid'];
                    spoofingPanel.spoofingObj['@name']    = objectData.name;
                    spoofingPanel.spoofingObj['@version'] = objectKey;

                }
                else{

        // 기존에 저장된 객체의 버전과 다르다면 배열로 변환합니다. ===============================================================================================================================

                    var tmpSpoofing = spoofingPanel.spoofingObj;

                    spoofingPanel.spoofingObj = [];

                    spoofingPanel.spoofingObj.push(tmpSpoofing);
                    spoofingPanel.spoofingObj.push({	'@cid' : objectData['@cid'], '@name' : objectData.name, '@version' : objectKey		});

                }

            }

        }
        else{

        // 데이터가 없을 경우 오브젝트의 형태로 저장합니다. =====================================================================================================================================

            spoofingPanel.spoofingObj = {

                '@cid'  : objectData['@cid'],
                '@name' : objectData.name,
                '@version' : objectKey

            };

        }
    },

    saveData: function() {
        // saveData =====================================================================================================================================================================
        //
        // 일시 : 2014.09.30
        //
        // 설명 :
        //
        // ==============================================================================================================================================================================

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        var component = this.componentStorage();

        deviceAllData.network_anomaly_spoofing.spoofing['@chk_use'] = (component.checkspoofing.getValue() === true) ? 'on' : 'off';

        if(this.spoofingObj){

            deviceAllData.network_anomaly_spoofing.spoofing.vnet = this.spoofingObj;

        }
        else{

            if(deviceAllData.network_anomaly_spoofing.spoofing.vnet){

                delete deviceAllData.network_anomaly_spoofing.spoofing.vnet;

            }

        }

        return true;
    }

});