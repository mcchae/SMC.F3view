
Ext.define('SMC4ZEN.view.win_policy_search_group', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_policy_search_group',

    requires: [
        'SMC4ZEN.view.win_policy_search_groupViewModel',
        'Ext.form.field.Text',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.view.Table'
    ],

    viewModel: {
        type: 'win_policy_search_group'
    },
    height: 428,
    id: 'dlg_add_group1',
    width: 385,
    layout: 'hbox',
    bodyPadding: 5,
    title: '그룹 / 정책 검색',
    defaultListenerScope: true,

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
                    margins: '0 10 0 0',
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
                        click: 'onButtonClick'
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
    ],

    onButtonClick: function(button, e, eOpts) {
        var me = this;


        var _search_text = me.query('textfield[itemId=txt_search]')[0].getValue();
        var _search_list = me.query('gridpanel[itemId=grpn_search_list]')[0];

        _search_list.getStore().removeAll();

        var _tmp = search_tree(me._treepanel,  _search_text, _search_list);
        console.log('click : ', _tmp);

    }

});