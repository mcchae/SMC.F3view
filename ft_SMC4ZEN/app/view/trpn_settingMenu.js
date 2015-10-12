
Ext.define('SMC4ZEN.view.trpn_settingMenu', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.trpn_settingMenu',

    requires: [
        'SMC4ZEN.view.trpn_settingMenuViewModel',
        'Ext.tree.View'
    ],

    viewModel: {
        type: 'trpn_settingMenu'
    },
    height: 459,
    itemId: 'trpn_objectMenu',
    resizable: false,
    width: 250,
    animCollapse: true,
    bodyBorder: true,
    bodyStyle: {
        background: 'white',
        padding: '5px',
        'border-style': 'none'
    },
    collapsible: true,
    title: '환경 설정',
    hideHeaders: true,
    rootVisible: false,
    useArrows: true,
    defaultListenerScope: true,

    viewConfig: {
        id: 'trv_ssettingMenu',
        loadMask: true
    },
    listeners: {
        select: 'onTrpn_objectMenuSelect',
        afterrender: 'onTrpn_objectMenuAfterRender',
        expand: 'onTrpn_objectMenuExpand'
    },

    onTrpn_objectMenuSelect: function(rowmodel, record, index, eOpts) {
        var server_panel = Ext.getCmp('pnl_setting_server');
        var admin_panel = Ext.getCmp('pnl_setting_admin');

        var config_backup_panel = Ext.getCmp('pnl_setting_config_backup');
        //var audit_backup_panel = Ext.getCmp('pnl_setting_audit_backup');

        var audit_panel = Ext.getCmp('pnl_setting_audit');
        var report_panel = Ext.getCmp('pnl_setting_report');

        var panel_array = [server_panel, admin_panel, config_backup_panel,/* audit_backup_panel,*/ audit_panel, report_panel];
        var show_index;

        switch(record.data.id)
        {
            case 'id_setting_server':
                show_index = 0;
                break;
            case 'id_setting_admin':
                show_index = 1;
                break;
            case 'id_setting_backup':
            case 'id_setting_config_backup':
                show_index = 2;
                break;
        //     case 'id_setting_audit_backup':
        //         show_index = 3;
        //         break;
            case 'id_setting_audit':
            case 'id_setting_event':
                show_index = 3;
                break;
            case 'id_setting_report':
                show_index = 4;
                break;
        }

        for(var i=0; i<panel_array.length; i++)
        {
            if(i === show_index)
            {
                panel_array[i].show();
            }
            else
            {
                panel_array[i].hide();
            }
        }
    },

    onTrpn_objectMenuAfterRender: function(component, eOpts) {
        var tree_data = {
            text: '환경 설정',
            id: 'id_setting',
            expanded: true,
            expandable: false,
            children: [
                {
                    text: '환경 설정',
                    id: 'id_setting_server',
                    leaf: true
                },
                {
                    text: '관리자',
                    id: 'id_setting_admin',
                    leaf: true
                },
                {
                    text: '데이터 백업/복원',
                    id: 'id_setting_backup',
                    expanded: true,
                    children: [
                        {
                            text: '정책/설정 데이터',
                            id: 'id_setting_config_backup',
                            leaf: true
                         }
        //                 {
        //                     text: '감사 데이터',
        //                     id: 'id_setting_audit_backup',
        //                     leaf: true
        //                 }
                    ]
                },
                {
                    text: '로그',
                    id: 'id_setting_event',
                    expanded: true,
                    children: [
                        {
                            text: '감사 데이터',
                            id: 'id_setting_audit',
                            leaf: true
                        },
                        {
                            text: '감사 보고서',
                            id: 'id_setting_report',
                            leaf: true
                        }
                    ]
                }
            ]
        };

        component.setRootNode(tree_data);
        component.getSelectionModel().select(0);
        component.getView().refresh();
    },

    onTrpn_objectMenuExpand: function(p, eOpts) {
        var server_panel = Ext.getCmp('pnl_setting_server');
        var admin_panel = Ext.getCmp('pnl_setting_admin');

        var config_backup_panel = Ext.getCmp('pnl_setting_config_backup');
        //var audit_backup_panel = Ext.getCmp('pnl_setting_audit_backup');

        var audit_panel = Ext.getCmp('pnl_setting_audit');
        var report_panel = Ext.getCmp('pnl_setting_report');

        var record = this.getSelectionModel().getSelection()[0];
        var panel_array = [server_panel, admin_panel, config_backup_panel,/* audit_backup_panel,*/ audit_panel, report_panel];
        var show_index;

        switch(record.data.id)
        {
            case 'id_setting_server':
                show_index = 0;
                break;
            case 'id_setting_admin':
                show_index = 1;
                break;
            case 'id_setting_backup':
            case 'id_setting_config_backup':
                show_index = 2;
                break;
        //     case 'id_setting_audit_backup':
        //         show_index = 3;
        //         break;
            case 'id_setting_audit':
            case 'id_setting_event':
                show_index = 3;
                break;
            case 'id_setting_report':
                show_index = 4;
                break;
        }

        Ext.each(panel_array, function(data, idx){

            if(idx === show_index)
            {
                data.show();

            }else
            {
                data.hide();
            }
        });
    }

});