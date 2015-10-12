
Ext.define('SMC4ZEN.view.win_oid', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_oid',

    requires: [
        'SMC4ZEN.view.win_oidViewModel',
        'Ext.form.Panel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_oid'
    },
    cls: 'zen_win',
    id: 'win_oid',
    scrollable: true,
    width: 500,
    defaultListenerScope: true,

    items: [
        {
            xtype: 'form',
            id: 'fm_oid',
            bodyPadding: 10,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    id: 'old_list',
                    maxHeight: 400,
                    scrollable: true
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
                    flex: 1
                },
                {
                    xtype: 'button',
                    cls: 'ft_cancel',
                    id: 'btn_close',
                    bind: {
                        text: '{cancel}'
                    },
                    listeners: {
                        click: 'onBtn_closeClick'
                    }
                }
            ]
        }
    ],
    listeners: {
        afterrender: 'onZen_oidAfterRender'
    },

    onBtn_closeClick: function(button, e, eOpts) {
        this.close();
    },

    onZen_oidAfterRender: function(component, eOpts) {
        // this.setTitle(__zen('mib_list'));

        // request_helper.xmlrpc_call_JsonP(
        //     'ftuctrl',
        //     'get_system_snmp_oid_list',
        //     {},
        //     function(response){

        //         if(response){
        //             var n_str = response.split(/\n/g);
        //             var str_list = '';

        //             for(var i=0; i<n_str.length; i++){
        //                 var trim_ret = Ext.String.trim(n_str[i]);

        //                 if(trim_ret === ""){ continue; }
        //                 if(trim_ret.indexOf(":") > 0){
        //                     var str_line = trim_ret.split(":");
        //                     str_list += str_line[0]+' : '+str_line[1]+'<br>';
        //                 }else{
        //                     str_list += '<br>';
        //                     str_list += '[ '+trim_ret+' ]<br>';
        //                 }
        //             }

        //             Ext.getCmp("old_list").update(str_list);
        //         }
        //     }
        // );
    }

});