
Ext.define('SMC4ZEN.view.pnl_xtm_route_script', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SMC4ZEN.view.pnl_xtm_route_scriptViewModel',
        'Ext.container.Container',
        'Ext.form.field.Checkbox',
        'Ext.form.field.TextArea'
    ],

    viewModel: {
        type: 'pnl_xtm_route_script'
    },
    height: 600,
    id: 'pnl_xtm_route_script',
    width: 800,
    layout: 'fit',
    title: 'Script',
    defaultListenerScope: true,

    items: [
        {
            xtype: 'container',
            itemId: 'ctn_script_main',
            padding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    html: '<input type="file" id="openselect" align="left"/>',
                    itemId: 'ctn_script_control',
                    margin: '0, 0, 10, 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'end'
                    },
                    items: [
                        {
                            xtype: 'checkboxfield',
                            itemId: 'ck_usescript',
                            margin: '0, 100, 0, 0',
                            fieldLabel: '',
                            boxLabel: '스크립트 사용',
                            listeners: {
                                change: 'onChk_usescriptChange'
                            }
                        }
                    ],
                    listeners: {
                        afterrender: 'onCtn_script_controlAfterRender'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'ctn_script_inputscript',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'textareafield',
                            disabled: true,
                            itemId: 'txa_usescript',
                            fieldLabel: '',
                            inputId: 'ta_script'
                        }
                    ]
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPnl_xtm_route_scriptAfterRender',
        beforeclose: 'onPnl_xtm_route_scriptBeforeClose'
    },

    onChk_usescriptChange: function(field, newValue, oldValue, eOpts) {

        var useScript = this.down('container[itemId=ctn_script_inputscript]').down();

        if(newValue === true){

            useScript.setDisabled(false);

        }
        else{

            useScript.setDisabled(true);
            useScript.setValue("");

        }
    },

    onCtn_script_controlAfterRender: function(component, eOpts) {
        var openbtn = document.getElementById("openselect");
        var scriptArea = component.up().down('container[itemId=ctn_script_inputscript]').down();
        var useScript = component.down('[itemId=ck_usescript]');

        scriptArea.setValue("");

        function readScript(evt) {

            if(!useScript.getValue()){

                Ext.Msg.show({  title : '스크립트 사용 에러',  msg : '스크립트 사용이 설정되어있지 않습니다.',  buttons : Ext.Msg.OK, icon : Ext.Msg.WARNING  });

                return;
            }

            var files = evt.target.files,

               reader = new FileReader();

            reader.onload = function() {

                scriptArea.setValue(this.result);

            };

            reader.readAsText(files[0]);
        }

        openselect.addEventListener("change", readScript, false);
    },

    onPnl_xtm_route_scriptAfterRender: function(component, eOpts) {
        // onPnl_xtm_route_scriptAfterRender =============================================================================================================================================
        //
        // 일시 :
        //
        // 설명 : 라우터 스크립트 데이터를 Text Area에 출력합니다.
        //
        // ===============================================================================================================================================================================

        var componentObj = this.componentStorage();

        try{

            var deviceData = component.deviceParams;

            if(deviceData){

                var routerScriptObj = deviceData.router_script;

                if(routerScriptObj){

                    componentObj.usescript.setValue((routerScriptObj.usescript === 'on') ? true : false);

                    componentObj.scriptarea.setValue(routerScriptObj.script);

                }

            }

        }
        catch(err){

            console.log('라우터 스크립트 데이터 초기화 중 catch 발생 : ', err);

        }
    },

    onPnl_xtm_route_scriptBeforeClose: function(panel, eOpts) {
        var deviceMain = Ext.getCmp('win_smc_device_set');

        this.saveData();

        deviceMain.viewState = true;
    },

    componentStorage: function() {
        var obj = {};

        var usescript  = this.down('[itemId=ctn_script_main]').down('[itemId=ctn_script_control]').down('[itemId=ck_usescript]');
        var scriptarea = this.down('[itemId=ctn_script_main]').down('[itemId=ctn_script_inputscript]').down('[itemId=txa_usescript]');

        return function(){

            obj.usescript  = usescript;
            obj.scriptarea = scriptarea;

            return obj;

        }();
    },

    saveData: function() {
        var component = this.componentStorage();

        var deviceAllData = Ext.getCmp('win_smc_device_set').deviceParams;

        if(component.usescript.getValue()){

            if(!deviceAllData.network_router_script){

                deviceAllData.network_router_script = {};

                deviceAllData.network_router_script.router_script = {};

            }

            deviceAllData.network_router_script.router_script.usescript = (component.usescript.getValue() === true) ? 'on' : 'off';

            deviceAllData.network_router_script.router_script.script    = component.scriptarea.getValue();

        }
        else{

            if(deviceAllData.network_router_script){

                delete deviceAllData.network_router_script.router_script;

                deviceAllData.network_router_script = null;

            }

        }

        return true;
    }

});