
Ext.define('SMC4ZEN.view.tool_smc_object_group_control', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.smc_object_group_control',

    requires: [
        'SMC4ZEN.view.tool_smc_object_group_controlViewModel',
        'Ext.button.Button'
    ],

    viewModel: {
        type: 'smc_object_group_control'
    },
    itemId: 'tool_smc_object_group_control',
    width: 400,

    items: [
        {
            xtype: 'button',
            border: false,
            cls: 'common_plus_disable',
            disabled: true,
            height: 24,
            itemId: 'addGroup',
            width: 24,
            tooltip: '그룹 추가'
        },
        {
            xtype: 'button',
            border: false,
            cls: 'common_modify_disable',
            disabled: true,
            height: 24,
            itemId: 'modGroup',
            width: 24,
            tooltip: '그룹 수정'
        },
        {
            xtype: 'button',
            border: false,
            cls: 'common_delete_disable',
            disabled: true,
            height: 24,
            itemId: 'delGroup',
            width: 24,
            tooltip: '그룹 삭제'
        },
        {
            xtype: 'button',
            border: false,
            cls: 'common_search_enable',
            height: 24,
            itemId: 'searchGroup',
            width: 24,
            tooltip: '그룹 검색'
        },
        {
            xtype: 'button',
            border: false,
            cls: 'common_rule_send',
            height: 24,
            itemId: 'recursiveGroup',
            width: 24,
            enableToggle: true,
            tooltip: '하위그룹 내용보기'
        },
        {
            xtype: 'button',
            border: false,
            cls: 'common_folder_open_disable',
            disabled: true,
            height: 24,
            itemId: 'openGroup',
            width: 24,
            tooltip: '그룹 열기'
        },
        {
            xtype: 'button',
            border: false,
            cls: 'common_folder_close_disable',
            disabled: true,
            height: 24,
            itemId: 'closeGroup',
            width: 24,
            tooltip: '그룹 닫기'
        }
    ]

});