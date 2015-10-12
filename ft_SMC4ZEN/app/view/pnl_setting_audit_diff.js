
Ext.define('SMC4ZEN.view.pnl_setting_audit_diff', {
    extend: 'Ext.window.Window',
    alias: 'widget.pnl_setting_audit_diff',

    requires: [
        'SMC4ZEN.view.pnl_setting_audit_diffViewModel',
        'Ext.panel.Panel',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'pnl_setting_audit_diff'
    },
    height: 600,
    itemId: 'pnl_setting_audit_diff',
    resizable: true,
    scrollable: true,
    width: 950,
    bodyBorder: false,
    constrainHeader: true,
    title: '객체 변경 정보',
    maximizable: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'panel',
            flex: 1,
            itemId: 'pnl_audit_differ',
            margin: 10,
            scrollable: true
        },
        {
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'center'
            },
            items: [
                {
                    xtype: 'button',
                    handler: function(button, e) {
                        button.up('window[itemId="pnl_setting_audit_diff"]').destroy();
                    },
                    margin: '0 10 10 10',
                    width: 100,
                    text: '확인'
                }
            ]
        }
    ],

    loadData: function(obj_op, obj_ts) {
        var me = this;

        var _oldData = "";

        var _newData = "";

        if(obj_op === "hierarchy")
        {
            if(obj_ts.object.op === 'add')
            {
                _newData = obj_ts.object['new'];
            }
            else if(obj_ts.object.op === 'mod')
            {
                _newData = obj_ts.object['new'];
                _oldData = obj_ts.object['old'];
            }
            else if(obj_ts.object.op === 'del')
            {
                _oldData = obj_ts.object['old'];
            }

            me.title = '객체 변경 정보 : [ ' + obj_ts.event + ' ] - [ ' + obj_ts.object.name + ' ]';
        }
        else
        {
            var audit_store = Ext.getCmp('pnl_setting_audit').down('gridpanel[itemId="gpn_setting_audit"]').getStore();

            audit_store.each(function(record, idx){

                if(record.data.ts === obj_ts)
                {
                    if(record.data.object.op === 'add')
                    {
                        if(record.data.object['new'])
                        {
                            _newData = record.data.object['new'];
                        }
                    }
                    else if(record.data.object.op === 'mod')
                    {
                        if(record.data.object['new'])
                        {
                            _newData = record.data.object['new'];
                        }

                        if(record.data.object['old'])
                        {
                            _oldData = record.data.object['old'];
                        }
                    }
                    else if(record.data.object.op === 'del')
                    {
                        if(record.data.object['old'])
                        {
                            _oldData = record.data.object['old'];
                        }
                    }

                    me.title = '객체 변경 정보 : [ ' + record.data.event + ' ] - [ ' + record.data.object.name + ' ]';

                    return false;
                }
            });
        }

        var base = difflib.stringAsLines(JSON.stringify(_oldData,null,4));

        var newtxt = difflib.stringAsLines(JSON.stringify(_newData,null,4));

        var sm = new difflib.SequenceMatcher(base, newtxt);

        var opcodes = sm.get_opcodes();

        var contextSize = null;

        var _diff = diffview.buildView({
            baseTextLines: base,
            newTextLines: newtxt,
            opcodes: opcodes,
            baseTextName: "원본",
            newTextName: "수정본",
            contextSize: contextSize,
            viewType: 0
        });

        me.down('panel[itemId="pnl_audit_differ"]').update(_diff.outerHTML);

        me.show();
    }

});