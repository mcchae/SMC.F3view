
Ext.define('SMC4ZEN.view.NFW2_network_router_script', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.nfw2_network_router_script',

    requires: [
        'SMC4ZEN.view.NFW2_network_router_scriptViewModel',
        'Ext.form.Label',
        'Ext.form.field.TextArea',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'nfw2_network_router_script'
    },
    // cls: 'zen_body',
    id: 'ScriptPanel',
    width: 500,
    layout: 'anchor',
    defaultListenerScope: true,
    bodyPadding: 5,
    overflowY: 'auto',
    title : '스크립트',
    items: [
        {
            xtype: 'container',
            style: 'background-color:#f1f3f9; border:1px solid #c1cae6; padding:7px; color:#069; font-size:12px;',
            layout: {
                type: 'hbox',
                align: 'stretch',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'label',
                    bind: {
                        text: '{script}'
                    }
                },
                {
                    xtype: 'container',
                    html: '<div id="script_chk"/>',
                    listeners: {
                        render: 'onContainerRender'
                    }
                }
            ]
        },
        {
            xtype: 'textareafield',
            validator: function(value) {
                if(value === true){ return true; }
                if(!ValidNotKor(value)){ return get_msg(err_notkor); }
                if(!_valid(value)){ return get_msg(err_notkor); }

                return true;

                function _valid(value){

                    return (/^[a-zA-Z0-9 `~!@#$%^&*()-_=+,<.>;:'"/?[|\]]*$/).test(value)? true:false;
                }
            },
            disabled: true,
            height: 400,
            id: 'ScriptArea',
            margin: '5 0 0 -10',
            width: 510,
            hideLabel: true,
            msgTarget: 'none',
            enableKeyEvents: true,
            enforceMaxLength: true,
            maxLength: 4096,
            listeners: {
                keyup: 'onScriptAreaKeyup',
                errorchange: 'onScriptAreaErrorChange',
                blur: 'onScriptAreaBlur'
            },
            bind: {
                value: '{network_router_script.network_router_script.router_script.contents}'
            }
        },
        {
            xtype: 'container',
            margin: 0,
            width: 500,
            layout: {
                type: 'hbox',
                align: 'stretchmax',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'label',
                    id: 'nowcount'
                },
                {
                    xtype: 'label',
                    margin: '0 0 0 5',
                    text: '/ 4096'
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onPanelAfterRender',
        beforeclose: 'saveData'
    },
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
                    itemId: 'fld_msg'
                }//,
    //             {
    //                 xtype: 'button',
    //                 cls: 'ft_confirm',
    //                 id: 'btn_submit',
    //                 iconCls: 'ft_confirm_icl',
    //                 bind: {
    //                     text: '{confirm}'
    //                 },
    //                 listeners: {
    //                     click: 'onBtn_submitClick'
    //                 }
    //             },
    //             {
    //                 xtype: 'button',
    //                 cls: 'ft_cancel',
    //                 id: 'btn_reset',
    //                 bind: {
    //                     text: '{cancel}'
    //                 },
    //                 listeners: {
    //                     click: 'onBtn_resetClick'
    //                 }
    //             }
            ]
        }
    ],

    onContainerRender: function(component, eOpts) {

        var tbutton_checked = false;
        console.log(this.getViewModel().data);
        if(this.getViewModel().data.network_router_script.network_router_script.router_script.chk_script !== undefined && this.getViewModel().data.network_router_script.network_router_script.router_script.chk_script === true){
            tbutton_checked = true;

            Ext.getCmp('ScriptArea').enable();
        }

        var tbutton = Ext.create('Ext.ux.toggleslide.ToggleSlide',{
            onText: __zen('toggle_on'),
            offText: __zen('toggle_off'),
            id:'chk_script',
            renderTo:'script_chk',
            style:'margin-left:10px',
            resizeHandle: false,
            state: tbutton_checked,
            listeners: {
                change: function(field, newValue, oldValue, eOpts){
                    var script = Ext.getCmp("ScriptArea");

                    if(newValue === true){
                        script.enable();
                    }else{
                        script.disable();
                    }

                    Ext.getCmp('ScriptPanel').getViewModel().data.network_router_script.network_router_script.router_script.chk_script = newValue;
                }
            }
        });
    },

    onScriptAreaKeyup: function(textfield, e, eOpts) {
        var li_str = Ext.getCmp('ScriptArea').getRawValue();
        var li_str_len = li_str.length;

        if(li_str === ''){
            Ext.getCmp('nowcount').setText('0');
        }else{
            Ext.getCmp('nowcount').setText(li_str_len);
        }
    },

    onScriptAreaErrorChange: function(labelable, error, eOpts) {
        prt_errMsg(error, null);
    },

    onScriptAreaBlur: function(component, event, eOpts) {
        component.validateValue(true);
    },

    onPanelAfterRender: function(component, eOpts) {

        console.log('getViewModel - ', this.getViewModel());
        console.log('main getViewModel - ', Ext.getCmp('win_zen_device_set').getViewModel());

        if(this.getViewModel().data.network_router_script.network_router_script.router_script.contents === null){
            this.getViewModel().data.network_router_script.network_router_script.router_script.contents = '';
            this.getViewModel().data.network_router_script.network_router_script.router_script.chk_script = false;
        }
        // this.init_script();
    },

    onBtn_submitClick: function(button, e, eOpts) {
        var chk_script = Ext.getCmp("chk_script");
        var script_id = Ext.getCmp('ScriptArea');
        var script_val = Ext.getCmp('ScriptArea').getRawValue();

        if(script_id.isValid() === false){ script_id.focus(); return false; }

        var obj = {
            'network_router_script': {
                'router_script': {
                    'chk_script': (chk_script.getValue())?true:false,
                    'contents': script_val
                }
            }
        };

        var _params = {
            basename: Ext.encode('network_router_script'),
            obj: Ext.encode(obj)
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'setObject',
            _params,
            function(response){

                Ext.Msg.show({
                    title: __weguardia,
                    msg: get_msg("msg_ok_add"),
                    width: 300,
                    buttons: Ext.Msg.OK,
                    icon: Ext.window.MessageBox.INFO
                });
            }
        );
    },

    onBtn_resetClick: function(button, e, eOpts) {
        this.init_script();

        var errUI = Ext.getCmp('errorBox');
        errUI.hide();

    },

    init_script: function() {
        var _params = {
            'basename': Ext.encode('network_router_script')
        };

        request_helper.xmlrpc_call_JsonP(
            'ftuctrl',
            'getObject',
            _params,
            function(response){

                hideLoadMask();

                if(response === null || response === undefined){

                    Ext.getCmp('ScriptArea').setRawValue('');
                    Ext.getCmp('nowcount').setText('0');

                }else{
                    response = response.network_router_script.router_script;

                    if(response.chk_script){
                        Ext.getCmp("chk_script").state = true;
                        Ext.getCmp("chk_script").moveHandle(true);
                        Ext.getCmp("ScriptArea").enable();
                    }
                    if(response.contents !== null){
                        Ext.getCmp('ScriptArea').setRawValue(response.contents);
                        Ext.getCmp('nowcount').setText(response.contents.length.toString());
                    }

                }
            }
        );
    },

    saveData: function() {

        Ext.getCmp('win_zen_device_set').viewState = true;
        return true;
    }

});