
Ext.define('SMC.view.tool_smc_device_control', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.smc_device_control',

    requires: [
        'Ext.button.Button'
    ],

    width: 400,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_add',
                    text: '',
                    tooltip: '그룹 추가'
                },
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_mod',
                    text: '',
                    tooltip: '그룹 수정'
                },
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_del',
                    text: '',
                    tooltip: '그룹 삭제'
                },
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_search',
                    text: '',
                    tooltip: '그룹 검색'
                },
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_showall',
                    enableToggle: true,
                    text: '',
                    tooltip: '하위그룹 내용보기'
                },
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_open',
                    tooltip: '그룹 열기'
                },
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_close',
                    tooltip: '그룹 닫기'
                },
                {
                    xtype: 'button',
                    border: false,
                    itemId: 'bt_refresh',
                    tooltip: '새로고침'
                }
            ]
        });

        me.callParent(arguments);
    }

});