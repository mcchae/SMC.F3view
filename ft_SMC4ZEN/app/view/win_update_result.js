
Ext.define('SMC4ZEN.view.win_update_result', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_update_result',

    requires: [
        'SMC4ZEN.view.win_update_resultViewModel',
        'Ext.toolbar.Toolbar',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'win_update_result'
    },
    cls: 'zen_win',
    width: 400,
    bodyPadding: 20,
    modal: true,
    defaultListenerScope: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        //afterrender: 'onWindowAfterRender'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            id: 'con_result'
        }
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            flex: 1,
            dock: 'bottom',
            ui: 'footer',
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    cls: 'fld_msg',
                    itemId: 'fld_msg'
                },
                {
                    xtype: 'button',
                    cls: 'ft_confirm',
                    iconCls: 'ft_confirm_icl',
                    bind: {
                        text: '{confirm}'
                    },
                    listeners: {
                        click: 'onButtonClick101'
                    }
                }
            ]
        }
    ],

    onWindowAfterRender: function(component, eOpts) {
        var me = this;
        var _result = me._result;
        var _ip = me._ip;

        me.setTitle(__weguardia);

        var app_list = {'app':__zen('update_info6'),
                        'kiscom':_zen('update_info7'),
                        'web':_zen('update_info8'),
                        'bad':_zen('update_info9'),
                        'ips':_zen('update_info10'),
                        'av_stream':zen('update_info11'),
                        'av_file':zen('update_info12'),
                        'as':zen('update_info13')};

        var list = (_result[0]===true)?__zen('update_msg3'):__zen('update_msg4');

        if(_result[0]===true){
            list += '<table id="sorttable">';
            for(var i in _result[1]){
                var _re = (_result[1][i] === true)?__zen('success'):__zen('fail');
                var color = (_result[1][i] === true)?'#000':'red';
                list += '<tr><td style="color:'+color+'">'+app_list[i]+'</td><td style="color:'+color+'"> : '+_re+'</td></tr>';
            }
            list += '</table>';
        }else{
             list += '<br/>'+errUpdateMsg(_result[1],_ip);
        }

        Ext.getCmp("con_result").update(list);
    },

    onButtonClick101: function(button, e, eOpts) {
        this.close();
    }

});