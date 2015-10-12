
Ext.define('SMC.view.win_policy_search_group', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View'
    ],

    height: 428,
    id: 'dlg_add_group1',
    width: 385,
    layout: 'hbox',
    title: '그룹 / 정책 검색',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'container',
                    margins: '10,10,10,10',
                    dock: 'top',
                    height: 41,
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            flex: 1,
                            margins: '10,10,10,10',
                            itemId: 'txt_search',
                            width: 216,
                            labelSeparator: ' ',
                            labelWidth: 50
                        },
                        {
                            xtype: 'button',
                            margins: '10,10,10,10',
                            width: 100,
                            text: '검색',
                            listeners: {
                                click: {
                                    fn: me.onButtonClick,
                                    scope: me
                                }
                            }
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'gridpanel',
                    flex: 1,
                    border: false,
                    itemId: 'grpn_search_list',
                    header: false,
                    title: 'My Grid Panel',
                    hideHeaders: true,
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            align: 'center',
                            dataIndex: 'text',
                            text: '그룹명',
                            flex: 1
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    },

    onButtonClick: function(button, e, eOpts) {
        var me = this;


        var _search_text = me.query('textfield[itemId=txt_search]')[0].getValue();
        var _search_list = me.query('gridpanel[itemId=grpn_search_list]')[0];

        _search_list.getStore().removeAll();

        var _tmp = search_tree(me._treepanel,  _search_text, _search_list);
        console.log('click : ', _tmp);

    }

});