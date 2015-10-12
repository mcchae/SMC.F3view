
Ext.define('SMC4ZEN.view.win_zen_deviceset', {
    extend: 'Ext.window.Window',
    alias: 'widget.win_zen_deviceset',

    requires: [
        'SMC4ZEN.view.win_zen_devicesetViewModel',
        'SMC4ZEN.view.win_zen_devicesetViewController',
        'Ext.container.Container',
        'Ext.button.Button'
    ],

    controller: 'win_zen_deviceset',
    viewModel: {
        type: 'win_zen_deviceset'
    },
    height: 700,
    id: 'win_zen_deviceset',
    width: 1280,
    bodyPadding: 5,
    title: 'WeGuardia ZEN',
    modal: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'container',
            flex: 1,
            itemId: 'ctn_zen_devicesetview',
            margin: '5, 0, 5, 0',
            layout: 'fit',
            listeners: {
                beforerender: 'onCtn_zen_devicesetviewBeforeRender'
            }
        },
        {
            xtype: 'container',
            itemId: 'ctn_zen_devicesetctrl',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items: [
                {
                    xtype: 'button',
                    itemId: 'bt_close',
                    width: 100,
                    text: '닫 기',
                    listeners: {
                        click: 'onBt_closeClick'
                    }
                }
            ]
        }
    ]

});