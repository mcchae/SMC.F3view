
Ext.define('SMC4ZEN.view.ctn_xtm_route_iptypeclass', {
    extend: 'Ext.container.Container',
    alias: 'widget.ctn_xtm_route_iptypeclass1',

    requires: [
        'SMC4ZEN.view.ctn_xtm_route_iptypeclassViewModel',
        'Ext.form.RadioGroup',
        'Ext.form.field.Radio'
    ],

    viewModel: {
        type: 'ctn_xtm_route_iptypeclass1'
    },
    itemId: 'ctn_static_iptype',
    margin: '0, 0, 5, 0',

    items: [
        {
            xtype: 'radiogroup',
            itemId: 'rdg_iptype',
            width: 400,
            fieldLabel: 'IP 타입',
            items: [
                {
                    xtype: 'radiofield',
                    itemId: 'rd_ipv4',
                    name: 'iptype',
                    value: 'v4',
                    boxLabel: 'IPv4 추가',
                    checked: true,
                    inputValue: 'v4'
                },
                {
                    xtype: 'radiofield',
                    itemId: 'rd_ipv6',
                    name: 'iptype',
                    value: 'v6',
                    boxLabel: 'IPv6 추가',
                    inputValue: 'v6'
                }
            ]
        }
    ]

});